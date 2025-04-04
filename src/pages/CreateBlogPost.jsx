import BlogPost from "../components/BlogPost";

const CreateBlogPost  = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Create New Post</h1>
      <div className="max-w-2xl mx-auto">
        <BlogPost />
      </div>
    </div>
  );
};

export default CreateBlogPost;