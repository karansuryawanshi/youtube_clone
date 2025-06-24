import mongoose from "mongoose";

// Schema for User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "username is required"], // Username validation
    minlength: [5, "Username must be at least 5 characters long"],
    match: [
      /^[a-zA-Z0-9_]+$/, // Alphanumeric and underscores only
      "Username can only contain letters, numbers, and underscores",
    ],
    unique: true,
  },

  email: {
    type: String,
    require: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Invalid email address"], // Email format check
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    require: [true, "password is required"],
    minlength: [5, "password must be at least 5 characters long"],
  },

  avatar: String, // Optional profile image
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel", // User's channels
    },
  ],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Redundant field (can be removed if unused)
  },
});

export default mongoose.model("User", userSchema);
