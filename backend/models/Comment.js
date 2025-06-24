import mongoose from "mongoose";

// Schema for comments on videos
const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who commented
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" }, // Video being commented on
  text: {
    type: String,
    require: true, // Text is required
  },
  timestamp: { type: Date, default: Date.now }, // Default to current time
});

export default mongoose.model("Comment", commentSchema);
