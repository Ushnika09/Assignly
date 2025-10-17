import express from "express";
import multer from "multer";
import path from "path";
import { uploadList } from "../controller/UploadController.js";
import { protect } from "../middlewears/AuthMiddlewear.js";

const router = express.Router();

// Multer storage: preserve original file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure uploads/ exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post("/upload", protect, upload.single("file"), uploadList);

export default router;
