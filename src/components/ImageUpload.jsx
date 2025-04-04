import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ formik, setFieldValue, setImagePreview }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        const file = acceptedFiles[0];
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size too large. Please upload an image under 5MB.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        setFieldValue("imageFile", file);
        setFieldValue("imageUrl", "");
      }
    },
    [formik]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                  ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
    >
      <input {...getInputProps()} />
      <div>
        <p className="text-gray-600">
          Drag & drop an image here, or click to select
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Supports: JPG, PNG, GIF (max 5MB)
        </p>
      </div>
    </div>
  );
};
export default ImageUpload;
