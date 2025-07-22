// https://github.com/karansuryawanshi/youtube_clone

import express from "express";
import { register, login, myDetails } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register); // Register new user
router.post("/login", login); // User login
router.get("/me", verifyToken, myDetails); // Get current user details (protected)

export default router;
