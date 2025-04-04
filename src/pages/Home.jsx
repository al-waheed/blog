import { useState } from "react";
import BlogList from "../components/BlogList";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing");
      setEmail("");
    }
  };

  return (
    <div>
      <div
        className="relative min-h-[calc(100vh-5rem)] flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative w-full">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h1 className="text-6xl font-bold mb-6 leading-tight text-white">
                  Share Your Story with the World
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                  Create beautiful blog posts, share your thoughts, and connect
                  with readers worldwide.
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/create"
                    className="btn bg-white text-gray-900 hover:bg-gray-100"
                  >
                    Start Writing
                  </Link>
                  <a
                    href="#latest"
                    className="btn bg-transparent border-2 border-white text-white hover:bg-white/10"
                  >
                    Read Stories
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="latest" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-2 text-center">Latest Stories</h2>
        <p className="text-gray-600 text-center mb-12">
          Discover what others are writing about
        </p>
        <BlogList />
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Join Our Newsletter
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Get weekly updates on the best stories, writing tips, and
              community highlights.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="space-y-4 max-w-lg mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="input bg-white/10 text-white placeholder-gray-300 border-white/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn bg-white text-purple-600 hover:bg-gray-100 w-full md:w-auto"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;