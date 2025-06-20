import Channel from "../models/Channel.js";

export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("owner", "username email")
      .populate("videos");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: "Failed to get channel details" });
  }
};

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    const existing = await Channel.findOne({ owner: req.user.id });
    if (existing)
      return res.status(400).json({ message: "Channel already exists" });

    const channel = await Channel.create({
      channelName,
      description,
      channelBanner,
      owner: req.user.id,
      subscribers: 0,
      videos: [],
    });

    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: "Failed to create channel", error: err });
  }
};

export const getMyChannel = async (req, res) => {
  console.log("REQ.USER:");
  const userId = req.user.id;
  console.log(userId);
  try {
    const channel = await Channel.findOne({ owner: req.user.id })
      .populate("videos")
      .populate("owner", "username email");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(channel);
  } catch (err) {
    console.error("Error in getMyChannel:", err);
    res.status(500).json({ message: "Failed to get channel details" });
  }
};
