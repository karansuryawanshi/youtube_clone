// https://github.com/karansuryawanshi/youtube_clone

import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// Add comment to a video
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
      $push: { comments: comment._id }, // Add comment reference to video
    });

    const populatedComment = await comment.populate("userId", "username"); // Populate username

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

// Edit user's own comment
export const editComment = async (req, res) => {
  const commentId = req.params.id;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this comment" });
    }

    comment.text = text; // Update text
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (err) {
    console.error("Error editing comment:", err);
    res.status(500).json({ message: "Failed to update comment" });
  }
};

// Delete user's own comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (comment.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await Comment.findByIdAndDelete(commentId); // Delete comment
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};
