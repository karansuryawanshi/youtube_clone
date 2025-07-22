// https://github.com/karansuryawanshi/youtube_clone

import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// Create and upload a new video
export const createVideo = async (req, res) => {
  const { title, thumbnailUrl, category, videoDescription } = req.body;

  if (!req.file || !title) {
    return res.status(400).json({ message: "Video file or title is missing" });
  }

  try {
    const channel = await Channel.findOne({ owner: req.user.id });
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    const newVideo = new Video({
      title,
      thumbnailUrl,
      category,
      videoDescription,
      videoUrl: `/uploads/videos/${req.file.filename}`,
      uploader: req.user.id,
      channelId: channel._id,
      views: 0,
      likes: 0,
      dislikes: 0,
      uploadDate: new Date(),
    });

    const saved = await newVideo.save(); // Add video to channel
    channel.videos.push(saved._id);
    await channel.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error saving video", error: err });
  }
};

// Get videos with optional search and category filters
export const getVideos = async (req, res) => {
  const { search, category } = req.query;

  let query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (category) query.category = category;

  try {
    const videos = await Video.find(query)
      .populate("uploader", "username email avatar")
      .populate("channelId", "channelName channelBanner");

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching videos" });
  }
};

// Get video by ID with comments and uploader details
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("uploader", "username")
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "username",
        },
      });

    res.status(200).json(video);
  } catch (err) {
    res.status(404).json({ message: "Video not found" });
  }
};

// Increment like count
export const likeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.likes += 1;
  await video.save();
  res.json({ likes: video.likes });
};

// Increment dislike count
export const dislikeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.dislikes += 1;
  await video.save();
  res.json({ dislikes: video.dislikes });
};

// Get all videos uploaded by logged-in user
export const getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ uploader: req.user.id });

    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your videos" });
  }
};

// Delete video if it belongs to the user's channel
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const channel = await Channel.findById(video.channelId);
    if (!channel || channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update video if it belongs to the user
export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, thumbnailUrl, category, videoDescription } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.uploader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (title) video.title = title;
    if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;
    if (category) video.category = category;
    if (videoDescription) video.videoDescription = videoDescription;

    if (req.file) {
      video.videoUrl = `/uploads/videos/${req.file.filename}`;
    }

    const updatedVideo = await video.save();
    res.status(200).json(updatedVideo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating video", error: err.message });
  }
};
