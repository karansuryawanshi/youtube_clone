import express from "express";
import { getChannelById } from "../controllers/channelController.js";
import { createChannel } from "../controllers/channelController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getMyChannel } from "../controllers/channelController.js";

const router = express.Router();

router.get("/:id", getChannelById); // /api/channels/:id
router.post("/", verifyToken, createChannel);
router.get("/my/channel", verifyToken, getMyChannel);

export default router;
