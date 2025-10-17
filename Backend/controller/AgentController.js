import Agent from "../model/AgentModel.js";
import Task from "../model/Taskmodel.js";
import bcrypt from "bcrypt";

// Add new agent
export const addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if agent already exists under this user
    const existingAgent = await Agent.findOne({ email, userRef: req.user._id });
    if (existingAgent)
      return res.status(400).json({ message: "Agent already exists for this user" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      userRef: req.user._id, // link agent to logged-in user
    });

    res.status(201).json({
      success: true,
      message: "Agent created successfully",
      data: {
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        tasksAssigned: 0, 
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get all agents for logged-in user 
export const getUserAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ userRef: req.user._id }).sort({ createdAt: -1 });
    
    // Fetch tasks to count assignments for each agent
    const userTasks = await Task.find({ 
      uploadedBy: req.user._id,
      assignedTo: { $ne: null }
    });

    // Add task count to each agent
    const agentsWithTaskCount = agents.map(agent => {
      const tasksAssigned = userTasks.filter(
        task => task.assignedTo.toString() === agent._id.toString()
      ).length;
      
      return {
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        tasksAssigned: tasksAssigned,
        createdAt: agent.createdAt
      };
    });

    res.status(200).json({
      success: true,
      data: agentsWithTaskCount
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get all agents for logged-in user
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ userRef: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete agent (only if belongs to user)
export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, userRef: req.user._id });
    if (!agent) return res.status(404).json({ message: "Agent not found or not authorized" });

    await agent.deleteOne();
    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};