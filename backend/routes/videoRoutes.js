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

router.post("/", verifyToken, createVideo);
router.get("/", getVideos);
router.get("/:id", getVideoById);
router.put("/edit/:id", verifyToken, upload.single("video"), updateVideo);

router.delete("/:id", verifyToken, deleteVideo);
router.put("/:id/like", verifyToken, likeVideo);
router.put("/:id/dislike", verifyToken, dislikeVideo);
router.get("/user/videos", verifyToken, getUserVideos);

router.post("/upload", verifyToken, upload.single("video"), createVideo);

router.put("/videos/:id", verifyToken, upload.single("video"), updateVideo);

export default router;
