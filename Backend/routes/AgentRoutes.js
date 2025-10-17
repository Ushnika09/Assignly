import express from "express";
import { addAgent, getAgents, deleteAgent, getUserAgents } from "../controller/AgentController.js";
import { protect } from "../middlewears/AuthMiddlewear.js";

const router = express.Router();

// Routes
router.post("/add", protect, addAgent);
router.get("/", protect, getAgents); 
router.get("/user-agents", protect, getUserAgents); 
router.delete("/:id", protect, deleteAgent);

export default router;