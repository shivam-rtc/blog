import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../app/slices/blogSlice";
import Select from "../../components/Select";
import { tags, category } from "../../data";
import { AppDispatch, RootState } from "../../app/store";

const CreateBlog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.blog);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState("");
console.log("title", title);
console.log("title", content);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }

    const newPost = {
      title,
      content,
      tags: selectedTags,
      status: "published",
    };

    dispatch(createPost(newPost));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      {error && <p className="text-red-500">{error}</p>}
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

        <Select title="Select tags" options={tags} onChange={setSelectedTags} />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

