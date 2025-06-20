import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, require: [true, "username is required"] },
  email: String,
  password: String,
  avatar: String,
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("User", userSchema);
