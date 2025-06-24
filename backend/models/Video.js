import mongoose from "mongoose";

// Schema for Video model
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Title is required"], // Title is mandatory
  },
  thumbnailUrl: {
    type: String,
    require: [true, "Thumbnail is required is required"], // Thumbnail is required (typo in message)
  },
  videoUrl: {
    type: String,
    require: [true, "Video is required"], // Video URL must be present
  },
  videoDescription: {
    type: String,
    require: [true, "Video Description is required"], // Description is mandatory
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the uploader
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel", // Channel this video belongs to
  },
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
  category: {
    type: String,
    require: [true, "__ is required"], // Validation message is incomplete
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Video comments
});

export default mongoose.model("Video", videoSchema);
