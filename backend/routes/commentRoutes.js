import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addComment, deleteComment } from "../controllers/commentController.js";
import { editComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/:id", verifyToken, addComment); // Add a comment to a video
router.delete("/:commentId", verifyToken, deleteComment); // Delete a comment
router.put("/:id", verifyToken, editComment); // Edit a comment

export default router;
