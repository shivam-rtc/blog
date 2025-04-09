import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../../app/slices/blogSlice";
import Select from "../../components/Select";
import Alert from "../../components/Alert";
import { category } from "../../data";
import { AppDispatch, RootState } from "../../app/store";

const EditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { postDetail, loading, error } = useSelector(
    (state: RootState) => state.blog
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState("published");
  const [image, setImage] = useState<File | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (id) dispatch(getPostById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (postDetail) {
      setTitle(postDetail.title);
      setContent(postDetail.content);
      setSelectedCategory(postDetail.category[0]);
      setStatus(postDetail.status);
    }
  }, [postDetail]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!title || !content || !selectedCategory) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", selectedCategory);
    formData.append("status", status);
    if (image) formData.append("image", image);

    await dispatch(updatePost({ id: id!, updatedData: formData }));
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      {showSuccessMessage && (
        <Alert title="Post updated successfully" type="success" />
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
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
