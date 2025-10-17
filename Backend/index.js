
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config.js";
import userRoutes from "./routes/UserRoutes.js"
import agentRoutes from "./routes/AgentRoutes.js";
import uploadRoutes from "./routes/UploadRoutes.js";
import dashboardRoutes from "./routes/DashboardRoutes.js";
import cors from "cors"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
  res.send("Backend Running...");
});

// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
