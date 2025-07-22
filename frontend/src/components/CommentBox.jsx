// https://github.com/karansuryawanshi/youtube_clone

// Import hooks and axios
import { useState } from "react";
import axios from "axios";

// CommentBox component receives videoId, onCommentAdded (callback), and commentDetails (unused here)
const CommentBox = ({ videoId, onCommentAdded, commentDetails }) => {
  // State to track input text
  const [text, setText] = useState("");

  // Function to post the comment
  const handlePost = async () => {
    const token = localStorage.getItem("token"); // Get token from local storage

    // Make POST request to backend with the comment text
    const res = await axios.post(
      `http://localhost:5000/api/comments/${videoId}`,
      { text },
      {
        headers: { Authorization: `Bearer ${token}` }, // Send token in headers
      }
    );

    // Clear the textarea after posting
    setText("");

    // Call callback to add the new comment to the list
    onCommentAdded(res.data);
  };

  return (
    <div className="my-4">
      {/* Textarea for typing the comment */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)} // Update state on change
        placeholder="Add a comment..."
        className="w-full border p-2 rounded"
      />

      {/* Button to post the comment */}
      <button
        onClick={handlePost}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        Post
      </button>
    </div>
  );
};

export default CommentBox;
