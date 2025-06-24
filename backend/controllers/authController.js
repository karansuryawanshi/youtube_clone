import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Register a new user

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userNameExixst = await User.findOne({ username: username }); // Check for existing username

  if (userNameExixst) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const emailExixst = await User.findOne({ email }); // Check for existing email
  if (emailExixst) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10); // Hash password
  const user = await User.create({ username, email, password: hashed }); // Create user

  res.status(201).json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  const valid = await bcrypt.compare(password, user.password); // Validate password
  if (!valid) return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "SecretKey", {
    expiresIn: "15d",
  }); // Generate token
  res.json({ token, user });
};

// Get current user details
export const myDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user info" });
  }
};
