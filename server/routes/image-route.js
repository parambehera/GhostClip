// routes/imageRoutes.js
import express from "express";
import { uploadImage, getImage } from "../controllers/image-contoller.js";

const router = express.Router();

router.post("/image", uploadImage);
router.get("/image/:pin", getImage);

export default router;
