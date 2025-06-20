import express from "express";
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
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.put("/:id/like", verifyToken, likeVideo);
router.put("/:id/dislike", verifyToken, dislikeVideo);
router.get("/user/videos", verifyToken, getUserVideos);

// import express from "express";
// import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

// const router = express.Router();

// Upload video file
// import { upload } from "../middleware/upload.js";
// router.post("/upload", verifyToken, upload.single("video"), (req, res) => {
//   res.json({ videoUrl: `/uploads/videos/${req.file.filename}` });
// });

// import { verifyToken } from "../middleware/authMiddleware.js";
// import { upload } from "../middleware/upload.js";
// import { createVideo } from "../controllers/videoController.js";

// router.post("/upload", verifyToken, upload.single("video"), createVideo);

router.post(
  "/upload",
  verifyToken,
  upload.single("video"), // Multer must come before the controller
  createVideo
);

export default router;
