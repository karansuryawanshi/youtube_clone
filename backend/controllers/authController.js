import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const userNameExixst = await User.findOne({ username: username });
  // console.log(userNameExixst);
  if (userNameExixst) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const emailExixst = await User.findOne({ email });
  if (emailExixst) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });
  const token = jwt.sign({ id: user._id }, "SecretKey", { expiresIn: "7d" });

  res.status(201).json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "SecretKey", {
    expiresIn: "15d",
  });
  res.json({ token, user });
};

export const myDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user info" });
  }
};
