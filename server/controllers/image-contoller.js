// controllers/imageController.js
import crypto from "crypto";
import Redis from "../config/redis.js"; // your existing redis instance
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const uploadImage = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No image uploaded" });

      // Generate 4-digit PIN
      const pin = Math.floor(1000 + Math.random() * 9000).toString();

      // Store file buffer in Redis (Base64 encoded)
      await Redis.setex(`image:${pin}`, 300, req.file.buffer.toString("base64"));

      res.json({
        message: "Image uploaded successfully",
        pin,
        expiresIn: "5 minutes"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
];

export const getImage = async (req, res) => {
  try {
    const { pin } = req.params;
    const data = await Redis.get(`image:${pin}`);

    if (!data) return res.status(404).json({ error: "Image not found or expired" });

    // Delete after retrieval
    await Redis.del(`image:${pin}`);

    // Convert Base64 back to buffer
    const buffer = Buffer.from(data, "base64");

    res.setHeader("Content-Type", "image/jpeg"); // or detect type dynamically
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
