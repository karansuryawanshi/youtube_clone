import multer from "multer";
import path from "path";

// Configure disk storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos"); // Save files to 'uploads/videos' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.originalname}`; // Generate unique filename
    cb(null, name);
  },
});

export const upload = multer({ storage }); // Export multer upload instance
