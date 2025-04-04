import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../redux/blogSlice";
import ImageUpload from "../Utils/ImageUpload";
import { convertImageToBase64 } from "../Utils/ConvertImageToBase64";
import toast from "react-hot-toast";

const EditPostModal = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(post.imageUrl || null);
  const categories = useSelector((state) => state.blog.categories);

  const formik = useFormik({
    initialValues: {
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl || "",
      imageFile: null,
      category: post.category,
      author: post.author,
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      imageUrl: Yup.string().url("Must be a valid URL").nullable(),
      category: Yup.string().required("Category is required"),
      author: Yup.string().required("Author name is required"),
    }),

    onSubmit: async (values) => {
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
      dispatch(updatePost({ id: post.id, ...values, imageUrl: finalImageUrl }));
      toast.success("Post successfully edited!");
      onClose();
      navigate("/");
    },
  });

  const removeImage = () => {
    formik.setFieldValue("imageFile", null);
    formik.setFieldValue("imageUrl", "");
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="title"
                placeholder="Post Title"
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

          {imagePreview ? (
            <div className="relative mb-4">
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
                placeholder="Image URL (optional)"
                onChange={formik.handleChange}
                value={formik.values.imageUrl}
                className="input pl-12"
              />
              {formik.errors.imageUrl && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.imageUrl}
                </div>
              )}
            </div>
          )}

          <div>
            <textarea
              name="content"
              placeholder="Post Content"
              onChange={formik.handleChange}
              value={formik.values.content}
              className="input h-40"
            />
            {formik.errors.content && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.content}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button type="submit" className="btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
