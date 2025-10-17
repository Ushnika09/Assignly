import express from "express";
import { getDashboardData } from "../controller/DashboardController.js";
import { protect } from "../middlewears/AuthMiddlewear.js";

const router = express.Router();

// GET /api/dashboard
router.get("/", protect, getDashboardData);

export default router;
