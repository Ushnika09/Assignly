import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [
        /^\+91[6-9]\d{9}$/,
        "Please enter a valid Indian phone number starting with +91",
      ],
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: false, 
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    uploadBatchId: {
      type: String,
      required: true,
    },
    uploadFileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;