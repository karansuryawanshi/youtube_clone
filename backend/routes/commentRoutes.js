import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addComment, deleteComment } from "../controllers/commentController.js";
import { editComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/:id", verifyToken, addComment); // POST /api/comments/:id
router.delete("/:commentId", verifyToken, deleteComment); // DELETE /api/comments/:commentId
router.put("/:id", verifyToken, editComment);
// router.delete("/:commentId", verifyToken, deleteComment);

export default router;
