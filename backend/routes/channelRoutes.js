// https://github.com/karansuryawanshi/youtube_clone

import express from "express";
import { getChannelById } from "../controllers/channelController.js";
import { createChannel } from "../controllers/channelController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getMyChannel } from "../controllers/channelController.js";
import { editMyChannel } from "../controllers/channelController.js";

const router = express.Router();

router.get("/:id", getChannelById); // Get channel by ID
router.post("/", verifyToken, createChannel); // Create a new channel
router.get("/my/channel", verifyToken, getMyChannel); // Get current user's channel
router.put("/my/channel", verifyToken, editMyChannel); // Update current user's channel

export default router;
