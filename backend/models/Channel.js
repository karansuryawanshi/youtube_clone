import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    require: [true, "Channel name is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

export default mongoose.model("Channel", channelSchema);
