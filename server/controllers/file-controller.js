import redis from "../config/redis.js"; // your Redis config
import crypto from "crypto";

// --- Upload / Create File ---
export const uploadFileController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileBuffer = req.file.buffer; // assuming you're using multer with memoryStorage
    const originalName = req.file.originalname;

    // Generate a random 4-digit PIN
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    // Store file in Redis as base64 string with 5-minute expiry
    const fileData = JSON.stringify({
      name: originalName,
      content: fileBuffer.toString("base64"),
    });

    await redis.setex(`file:${pin}`, 300, fileData); // 300 seconds = 5 minutes

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

    const { name, content } = JSON.parse(fileData);
    const buffer = Buffer.from(content, "base64");

    // Send file as attachment
    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(buffer);

    // Optional: delete from Redis immediately after retrieval
    await redis.del(`file:${pin}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve file" });
  }
};
