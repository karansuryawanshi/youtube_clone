import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res) => {
  const { text } = req.body;
  const { id: videoId } = req.params;

  try {
    const comment = await Comment.create({
      text,
      userId: req.user.id,
      videoId,
    });

    await Video.findByIdAndUpdate(videoId, {
      $push: { comments: comment._id },
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (comment.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};
