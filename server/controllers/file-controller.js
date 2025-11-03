import redis from "../config/redis.js"; // your Redis config
import crypto from "crypto";

// --- Upload / Create File ---
export const uploadFileController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileBuffer = req.file.buffer; // multer memoryStorage
    const originalName = req.file.originalname;
    const mimeType = req.file.mimetype; // <— grab this

    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    const fileData = JSON.stringify({
      name: originalName,
      content: fileBuffer.toString("base64"),
      mimeType, // <— store it
    });

    await redis.setex(`file:${pin}`, 300, fileData); // expires after 5 min

    res.json({ pin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

// --- Retrieve File ---
export const getFileController = async (req, res) => {
  try {
    const { pin } = req.params;
    if (!pin) return res.status(400).json({ error: "PIN is required" });

    const fileData = await redis.get(`file:${pin}`);
    if (!fileData) return res.status(404).json({ error: "File not found or expired" });

    const { name, content, mimeType } = JSON.parse(fileData);
    const buffer = Buffer.from(content, "base64");

    // Use correct MIME type
    res.setHeader("Content-Type", mimeType || "application/octet-stream");

    // Option 1: open directly in browser
    res.setHeader("Content-Disposition", `inline; filename="${name}"`);

    // Option 2: force download
    // res.setHeader("Content-Disposition", `attachment; filename="${name}"`);

    res.send(buffer);

    // Optional — delete after successful retrieval
    await redis.del(`file:${pin}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve file" });
  }
};
