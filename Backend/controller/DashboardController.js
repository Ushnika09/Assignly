import Agent from "../model/AgentModel.js";
import Task from "../model/Taskmodel.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; // Get the logged-in user's ID

    // Fetch all agents that belong to the current user
    const userAgents = await Agent.find({ userRef: userId }).sort({ createdAt: -1 });

    // Fetch tasks that are assigned to agents AND uploaded by the current user
    const userTasks = await Task.find({ 
      assignedTo: { $ne: null },
      uploadedBy: userId 
    });

    // Get unique upload batches (number of uploads by this user)
    const uniqueBatches = await Task.distinct('uploadBatchId', { uploadedBy: userId });
    const totalUploads = uniqueBatches.length;

    //upload timestamp
    const latestUpload = await Task.findOne({ uploadedBy: userId }).sort({ createdAt: -1 });
    const lastUploadTime = latestUpload ? latestUpload.createdAt : null;

    // Attach tasks and task count for each agent 
    const agentsWithTasks = userAgents.map((agent) => {
      const tasks = userTasks.filter(
        (task) => task.assignedTo.toString() === agent._id.toString()
      );
      
      return {
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        tasksAssigned: tasks.length,
        tasks,
      };
    });

    // Dashboard summary
    const totalAgents = userAgents.length; 
    const totalTasks = userTasks.length;
    const agentsWithTasksCount = agentsWithTasks.filter(agent => agent.tasksAssigned > 0).length; 

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalAgents: totalAgents, 
          agentsWithTasks: agentsWithTasksCount,
          tasks: totalTasks,
          uploads: totalUploads,
          lastUpload: lastUploadTime,
        },
        agents: agentsWithTasks,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};