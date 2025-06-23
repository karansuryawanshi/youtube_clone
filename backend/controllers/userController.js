import cloudinary from "../utils/cloudinary.js";

export const uploadProfileImage = async (req, res) => {
  try {
    const fileStr = req.body.image;
    const uploaded = await cloudinary.uploader.upload(fileStr, {
      folder: "channel_profiles",
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: uploaded.secure_url },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    console.error("Upload failed", err);
    res.status(500).json({ message: "Failed to upload image" });
  }
};
