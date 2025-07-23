// https://github.com/karansuryawanshi/youtube_clone

// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// app.use(cors());

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use("/uploads", express.static("uploads")); // Serve uploaded files

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/channels", channelRoutes);

// Connect to MongoDB and start server
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//   console.log("Database connected");
// });

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("DB connected");
} catch (err) {
  console.error("MongoDB connection failed", err);
}

// app.listen(5000, () => console.log("Server running on port 5000"));

app.get("/", (req, res) => {
  res.send("Hello from Node.js on Vercel!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// export default app;
