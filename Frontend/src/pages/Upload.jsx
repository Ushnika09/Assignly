import React, { useState, useContext } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function Upload({ agents = [], setDistribution, setLastUploadName }) {
  const { user } = useContext(UserContext);
  const [dragOver, setDragOver] = useState(false);
  const [previewRows, setPreviewRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFiles = async (files) => {
    const file = files && files[0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    if (!["csv", "xlsx", "xls"].includes(ext)) {
      alert("Invalid file format! Only CSV/XLSX allowed.");
      return;
    }

    if (!user?.token) {
      alert("You must be logged in to upload tasks!");
      return;
    }

    setFileName(file.name);

    let rows = [];
    try {
      if (ext === "csv") {
        const text = await file.text();
        rows = text
          .split(/\r?\n/)
          .map((line) => line.split(","))
          .filter((r) => r.some((cell) => cell.trim() !== ""));
      } else {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      }

      if (!rows.length) {
        alert("No data found in file.");
        return;
      }

      setPreviewRows(rows);
      setShowOverlay(true);
      setDistribution && setDistribution(rows.length - 1);
      setLastUploadName && setLastUploadName(file.name);

      // --- Upload to backend ---
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${user.token}`,
  },
});

      alert(`Uploaded ${response.data.total} tasks successfully!`);
    } catch (err) {
      console.error("Upload error:", err);
      alert(
        "Failed to upload to backend: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-accent">Upload & Distribute Tasks</h2>

      {/* Drop Zone */}
      <div
        className={`rounded-2xl border-2 border-dashed p-10 text-center transition ${
          dragOver ? "bg-gray-100 border-blue-400" : "bg-white"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <p>Drag & drop a CSV/XLSX file here</p>
        <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          Choose File
        </label>
        {fileName && <p className="mt-2 text-sm">Selected: {fileName}</p>}
      </div>

      {/* Overlay Preview */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[90%] max-w-6xl max-h-[85vh] overflow-hidden shadow-lg relative">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg">
                Preview – {fileName} ({previewRows.length - 1} rows)
              </h3>
              <button
                onClick={() => setShowOverlay(false)}
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-auto max-h-[70vh] p-4">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    {previewRows[0].map((cell, idx) => (
                      <th
                        key={idx}
                        className="border px-3 py-1 text-left font-medium whitespace-nowrap"
                      >
                        {cell || `Column ${idx + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewRows.slice(1).map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="border px-3 py-1 whitespace-nowrap text-gray-700"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading && <p className="mt-2 text-center text-indigo-600">Uploading...</p>}
            </div>
          </div>
        </div>
      )}

      {/* Agent Cards */}
      {agents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {agents.map((agent) => (
            <div key={agent._id} className="rounded-lg border p-4 shadow-sm">
              <p className="text-xs text-gray-500">{agent.name}</p>
              <p className="mt-1 text-2xl font-bold">{agent.tasksAssigned || 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
