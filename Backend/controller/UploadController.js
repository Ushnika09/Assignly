import fs from "fs";
import csv from "csv-parser";
import XLSX from "xlsx";
import Task from "../model/Taskmodel.js";
import Agent from "../model/AgentModel.js";

// Distribute tasks round-robin to agents
const distributeTasks = (tasks, agents) => {
  const distributed = [];
  const agentCount = agents.length;

  tasks.forEach((task, index) => {
    const assignedAgent = agents[index % agentCount]; // Round-robin
    distributed.push({
      ...task,
      assignedTo: assignedAgent._id,
    });
  });

  return distributed;
};

// Parse CSV as Promise
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

// Upload tasks controller
export const uploadList = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a CSV/XLSX file" });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const ext = filePath.split(".").pop().toLowerCase();

    if (!["csv", "xls", "xlsx"].includes(ext)) {
      return res.status(400).json({
        message: "Invalid file format. Only CSV, XLSX, or XLS allowed",
      });
    }

    let tasks = [];

    // Parse CSV
    if (ext === "csv") {
      const csvData = await parseCSV(filePath);
      tasks = csvData.map((item, i) => ({
        firstName: item.FirstName?.trim(),
        phone: item.Phone?.trim(),
        notes: item.Notes?.trim() || "",
      }));
    } else {
      // Parse Excel
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      tasks = jsonData.map((item, i) => ({
        firstName: item.FirstName?.trim(),
        phone: item.Phone?.trim(),
        notes: item.Notes?.trim() || "",
      }));
    }

    // Validate tasks
    const invalidRows = tasks
      .map((t, i) => (!t.firstName || !t.phone ? i + 2 : null))
      .filter((i) => i !== null);

    if (invalidRows.length) {
      return res.status(400).json({
        message: `Missing required fields (FirstName or Phone) at rows: ${invalidRows.join(", ")}`,
      });
    }

    // Validate phone number format
    const invalidPhones = tasks
      .map((t, i) => (!/^\+91[6-9]\d{9}$/.test(t.phone) ? i + 2 : null))
      .filter((i) => i !== null);

    if (invalidPhones.length) {
      return res.status(400).json({
        message: `Invalid phone numbers at rows: ${invalidPhones.join(", ")}`,
      });
    }

    // Fetch agents
    const agents = await Agent.find();
    if (!agents.length) {
      return res.status(400).json({ message: "No agents found in DB" });
    }

    // Create a unique batch ID for this upload
    const uploadBatchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Distribute tasks
    const distributedTasks = distributeTasks(tasks, agents);

    // Save tasks with batch information
    await Task.insertMany(
      distributedTasks.map((t) => ({
        firstName: t.firstName,
        phone: t.phone,
        notes: t.notes,
        assignedTo: t.assignedTo,
        uploadedBy: req.user?._id || null,
        uploadBatchId: uploadBatchId,
        uploadFileName: fileName,
      }))
    );

    return res.status(200).json({
      message: "Tasks uploaded and distributed successfully",
      total: distributedTasks.length,
      batchId: uploadBatchId,
      fileName: fileName,
      sample: distributedTasks.slice(0, 5),
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Error uploading tasks", error: err.message });
  } finally {
    // Remove uploaded file
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
  }
};