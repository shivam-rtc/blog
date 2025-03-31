import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { allPosts } from "../../app/slices/blogSlice";
import { AppDispatch } from "../../app/store";
import { RootState } from "../../app/store";

const EditBlog = () => {
  // const { postId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { posts } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(allPosts());
  }, []);
console.log("first", posts)
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-6 py-3 border text-left text-gray-600">Title</th>
          <th className="px-6 py-3 border text-left text-gray-600">Author</th>
          <th className="px-6 py-3 border text-left text-gray-600">Created</th>
          <th className="px-6 py-3 border text-left text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts?.map((post) => (
          <tr key={post._id} className="border-b">
            <td className="px-6 py-3">{post.title}</td>
            <td className="px-6 py-3">{post.author.name}</td>
            <td className="px-6 py-3">{post.createdAt}</td>
            <td className="px-6 py-3">
              <Link to="" className="text-blue-600 mr-3">
                Edit
              </Link>
              <button className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default EditBlog;
