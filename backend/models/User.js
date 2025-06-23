import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "username is required"],
    minlength: [5, "Username must be at least 5 characters long"],
  },

  email: {
    type: String,
    require: [true, "Email is required"],
  },

  password: {
    type: String,
    require: [true, "password is required"],
    minlength: [5, "password must be at least 5 characters long"],
  },

  avatar: String,
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  ],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("User", userSchema);
