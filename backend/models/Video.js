import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Title is required"],
  },
  thumbnailUrl: {
    type: String,
    require: [true, "Thumbnail is required is required"],
  },
  videoUrl: {
    type: String,
    require: [true, "Video is required"],
  },
  videoDescription: {
    type: String,
    require: [true, "Video Description is required"],
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  },
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
  category: { type: String, require: [true, "__ is required"] },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Video", videoSchema);
