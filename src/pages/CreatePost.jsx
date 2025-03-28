import BlogForm from "../components/BlogForm";

const CreatePost = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Create New Post</h1>
      <div className="max-w-2xl mx-auto">
        <BlogForm />
      </div>
    </div>
  );
};

export default CreatePost;
