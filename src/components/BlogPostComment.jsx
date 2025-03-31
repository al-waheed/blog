import { useState } from "react";

const BlogPostComment = () => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const addComment = () => {
    if (text.trim() && name.trim()) {
      setComments([{ name, text }, ...comments]); // Add to top
      setText("");
      setName("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addComment();
    }
  };

  return (
    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {/* Comments List */}
      <ul className="space-y-4 mb-4">
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm">
            No comments yet. Be the first!
          </p>
        )}
        {comments.map((comment, index) => (
          <li key={index}>
            <p className="text-sm font-semibold text-gray-700">
              {comment.name}
            </p>
            <p className="text-gray-800 ml-2">{comment.text}</p>
          </li>
        ))}
      </ul>

      {/* Comment Input */}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Add a comment..."
          rows="2"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
        />
        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition self-end"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default BlogPostComment;
