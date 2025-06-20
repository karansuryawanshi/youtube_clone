import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// export const createVideo = async (req, res) => {
//   const { title, thumbnailUrl } = req.body;
//   console.log("[title]", title);
//   console.log("[thumbnailUrl]", thumbnailUrl);

//   if (!req.file) {
//     return res.status(400).json({ message: "Video file is required" });
//   }

//   const newVideo = new Video({
//     title,
//     thumbnailUrl,
//     videoUrl: `/uploads/videos/${req.file.filename}`,
//     // videoUrl: video,
//     uploader: req.user.id,
//     views: 0,
//     likes: 0,
//     dislikes: 0,
//     uploadDate: new Date(),
//   });

//   try {
//     const saved = await newVideo.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ message: "Error saving video", err });
//   }
// };

export const createVideo = async (req, res) => {
  const { title, thumbnailUrl, category, videoDescription } = req.body;

  if (!req.file || !title) {
    return res.status(400).json({ message: "Video file or title is missing" });
  }

  try {
    // ✅ First, find the user's channel
    const channel = await Channel.findOne({ owner: req.user.id });
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    // ✅ Now it's safe to use channel._id
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

    const saved = await newVideo.save();

    // ✅ Push video into channel
    channel.videos.push(saved._id);
    await channel.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error saving video", error: err });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    // You can implement real delete logic later
    res.json({ message: "Video deleted successfully (placeholder)" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete video" });
  }
};

export const getVideos = async (req, res) => {
  const { search, category } = req.query;

  let query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (category) query.category = category;

  try {
    // const videos = await Video.find(query).populate("uploader", "username");

    const videos = await Video.find(query)
      .populate("uploader", "username email avatar")
      .populate("channelId", "channelName channelBanner");

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching videos" });
  }
};

export const getVideoById = async (req, res) => {
  // console.log("videosdddddd");
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

export const likeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.likes += 1;
  await video.save();
  res.json({ likes: video.likes });
};

export const dislikeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.dislikes += 1;
  await video.save();
  res.json({ dislikes: video.dislikes });
};

// export const getVideoById = async (req, res) => {
//   console.log("getVideoById");
// };
export const updateVideo = async (req, res) => {
  console.log("updateVideo");
};

export const getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ uploader: req.user.id });
    // console.log("[videos]", videos);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your videos" });
  }
};
