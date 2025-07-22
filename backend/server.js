// https://github.com/karansuryawanshi/youtube_clone

// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import cors from "cors";
import commentRoutes from "./routes/commentRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use("/uploads", express.static("uploads")); // Serve uploaded files

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/channels", channelRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Database connected");
});

app.listen(5000, () => console.log("Server running on port 5000"));
