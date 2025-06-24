import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, "SecretKey"); // Verify token
    req.user = decoded; // Attach user info to request
    next();
  } catch {
    res.status(403).json({ msg: "Invalid token" });
  }
};
