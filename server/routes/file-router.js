import express from "express";
import multer from "multer";
import { uploadFileController, getFileController } from "../controllers/file-controller.js";

const router = express.Router();

// --- Multer config for memory storage ---
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- Routes ---

// Upload file
router.post("/file", upload.single("file"), uploadFileController);

// Retrieve file by PIN
router.get("/file/:pin", getFileController);

export default router;
