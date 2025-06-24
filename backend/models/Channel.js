import mongoose from "mongoose";

// Schema for Channel model
const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    require: [true, "Channel name is required"], // Validation
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
  },
  description: {
    type: String,
    require: [true, "Description is required"],
  },
  channelBanner: {
    type: String,
    require: [true, "Channel banner is required"],
  },
  subscribers: Number,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], // References to videos
});

export default mongoose.model("Channel", channelSchema);
