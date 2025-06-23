import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addComment, deleteComment } from "../controllers/commentController.js";
import { editComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/:id", verifyToken, addComment);
router.delete("/:commentId", verifyToken, deleteComment);
router.put("/:id", verifyToken, editComment);

export default router;
