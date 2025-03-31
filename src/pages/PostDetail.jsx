import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../redux/blogSlice";
import EditPostModal from "../components/EditPostModal";
import ShareBlogPost from "../components/ShareBlogPost";
import BlogPostComment from "../components/BlogPostComment";
import BlogEmojiReactions from "../components/BlogEmojiReaction";
import { useState } from "react";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const post = useSelector((state) =>
    state.blog.posts.find((post) => post.id === id)
  );

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Post not found</h2>
          <button onClick={() => navigate("/")} className="mt-4 btn">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id));
      navigate("/");
    }
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Action Buttons: Edit, Delete & Share */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={toggleEditModal}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
            >
              ✏️ Edit Post
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
            >
              🗑️ Delete Post
            </button>
          </div>
          <ShareBlogPost
            url={`${window.location.origin}${location.pathname}`}
            title={post.title}
          />
        </div>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        )}
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center mb-6 text-gray-500">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
          <ShareBlogPost
            url={`${window.location.origin}${location.pathname}`}
            title={post.title}
          />
          <BlogPostComment />
        </div>
      </div>
      {isEditModalOpen && (
        <EditPostModal post={post} onClose={toggleEditModal} />
      )}
    </div>
  );
};

export default PostDetail;
