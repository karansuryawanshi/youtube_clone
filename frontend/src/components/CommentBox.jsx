import { useState } from "react";
import axios from "axios";

const CommentBox = ({ videoId, onCommentAdded, commentDetails }) => {
  const [text, setText] = useState("");

  const handlePost = async () => {
    const token = localStorage.getItem("token");
    // console.log("[Token]", token);

    const res = await axios.post(
      `http://localhost:5000/api/comments/${videoId}`,
      { text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("[res.data in commentBox]", res.data);

    setText("");
    onCommentAdded(res.data);
  };

  return (
    <div className="my-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="w-full border p-2 rounded"
      />
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
