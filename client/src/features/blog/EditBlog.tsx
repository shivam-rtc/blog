import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch post data by postId (Mocked)
    setTitle("Existing Post Title");
    setContent("Existing Post Content");
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Post:", { postId, title, content });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
