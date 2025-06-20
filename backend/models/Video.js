import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  thumbnailUrl: String,
  videoUrl: String,
  videoDescription: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" }, // ✅ New field
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
  category: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Video", videoSchema);
