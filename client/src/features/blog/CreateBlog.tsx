import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../app/slices/blogSlice";
import Select from "../../components/Select";
import { category } from "../../data";
import { AppDispatch, RootState } from "../../app/store";
import Alert from "../../components/Alert";

const CreateBlog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.blog);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState("published");
  const [image, setImage] = useState<File | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("contents", title, content, category);
    e.preventDefault();
    if (!title || !content) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", selectedCategory);
    formData.append("status", status);
    if (image) formData.append("image", image);

    dispatch(createPost(formData));
    setTitle("");
    setContent("");
    setSelectedCategory("");
    setStatus("published");
    setImage(null);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      {showSuccessMessage && (
        <Alert title="Post created successfully" type="success" />
      )}
      {error && <p className="text-red-500">{error}</p>}
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />

        {/* Content Textarea */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full h-32 rounded"
        />

        {/* Category Select */}

        <Select
          title="Select Category"
          options={category}
          onChange={(value) => setSelectedCategory(value.target.value)}
        />

        {/* Status Selection */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 w-full rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
