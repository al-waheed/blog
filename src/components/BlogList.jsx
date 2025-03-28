import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { posts } = useSelector((state) => state.blog);
   console.log("state",posts);
  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {posts.length === 0 ? "No posts yet" : "No matching posts found"}
          </h2>
          <Link to="/create" className="btn">
            {posts.length === 0 ? "Create Your First Post" : "Create New Post"}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="card transform hover:scale-105 transition-transform duration-200">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  {post.author && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">By {post.author}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
