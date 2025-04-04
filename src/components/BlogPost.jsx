import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/blogSlice";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../Utils/ImageUpload";
import { convertImageToBase64 } from "../Utils/ConvertImageToBase64";
import toast from "react-hot-toast";

const BlogPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const categories = useSelector((state) => state.blog.categories);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      imageUrl: "",
      imageFile: null,
      category: "",
      author: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      imageUrl: Yup.string().url("Must be a valid URL").nullable(),
      category: Yup.string().required("Category is required"),
      author: Yup.string().required("Author name is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      let finalImageUrl = values.imageUrl;
      if (values.imageFile) {
        try {
          finalImageUrl = await convertImageToBase64(values.imageFile);
        } catch (e) {
          console.log(e);
          toast.error("Error processing image. Please try again.");
          return;
        }
      }
      dispatch(
        addPost({
          title: values.title,
          content: values.content,
          imageUrl: finalImageUrl,
          category: values.category,
          author: values.author,
        })
      );

      toast.success("Post created successfully!");
      resetForm();
      setImagePreview(null);
      navigate("/");
    },
  });

  const removeImage = () => {
    formik.setFieldValue("imageFile", null);
    formik.setFieldValue("imageUrl", "");
    setImagePreview(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter your blog title"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="input"
            />
            {formik.errors.title && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.title}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              placeholder="Your name"
              onChange={formik.handleChange}
              value={formik.values.author}
              className="input"
            />
            {formik.errors.author && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.author}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            className="input"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {formik.errors.category && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.category}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cover Image
          </label>
          <div className="space-y-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ) : (
              <ImageUpload
                formik={formik}
                setFieldValue={formik.setFieldValue}
                setImagePreview={setImagePreview}
              />
            )}
            {!formik.values.imageFile && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">OR</span>
                </div>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Enter image URL"
                  onChange={formik.handleChange}
                  value={formik.values.imageUrl}
                  className="input pl-12"
                />
              </div>
            )}
          </div>
          {formik.errors.imageUrl && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.imageUrl}
            </div>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            name="content"
            placeholder="Write your blog content here..."
            onChange={formik.handleChange}
            value={formik.values.content}
            className="input h-64"
            rows="10"
          />
          {formik.errors.content && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.content}
            </div>
          )}
        </div>

        <button type="submit" className="btn w-full">
          Publish Blog Post
        </button>
      </form>
    </div>
  );
};

export default BlogPost;
