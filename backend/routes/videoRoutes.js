import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  getUserVideos,
} from "../controllers/videoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createVideo); // Create video (without file middleware)
router.get("/", getVideos); // Get all videos
router.get("/:id", getVideoById); // Get video by ID
router.put("/edit/:id", verifyToken, upload.single("video"), updateVideo); // Update video

router.delete("/:id", verifyToken, deleteVideo); // Delete video
router.put("/:id/like", verifyToken, likeVideo); // Like a video
router.put("/:id/dislike", verifyToken, dislikeVideo); // Dislike a video
router.get("/user/videos", verifyToken, getUserVideos); // Get user's uploaded videos

router.post("/upload", verifyToken, upload.single("video"), createVideo); // Upload video file and create

router.put("/videos/:id", verifyToken, upload.single("video"), updateVideo); // Update video file and data

export default router;
