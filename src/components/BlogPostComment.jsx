import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/blogSlice";

const BlogPostComment = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(
    (state) =>
      state.blog.posts.find((post) => post.id === postId)?.comments || []
  );
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const handleAddComment = () => {
    if (text.trim() && name.trim()) {
      dispatch(addComment({ postId, name, text }));
      setText("");
      setName("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-md font-semibold mb-4">Comments</h3>
      <ul className="space-y-4 mb-6">
        {!comments.length ? (
          <p className="text-gray-500 text-sm">
            No comments yet. Be the first!
          </p>
        ) : (
          comments.map((comment, index) => (
            <li key={index} className="">
              <div className="flex gap-3">
                <span className="text-[20px]">🗣️</span>
                <div className="border border-gray-400 rounded-md px-3 py-2">
                  <p className="text-xs font-bold text-gray-800 mb-1 uppercase">
                    {comment.name}
                  </p>
                  <p className="text-gray-800 ml-4 text-xs">{comment.text}</p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="flex flex-col gap-2 bg-gray-100 p-6 rounded-lg shadow-md">
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
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition self-end"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default BlogPostComment;