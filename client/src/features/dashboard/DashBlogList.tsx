import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userPosts, deletePost } from "../../app/slices/blogSlice";
import { AppDispatch } from "../../app/store";
import { RootState } from "../../app/store";

const DashBlogList = () => {
  // const { postId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(userPosts());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id));
    }
  };

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
              <Link
              to={`/dashboard/edit/${post._id}`}
               className="text-blue-600 mr-3">
                Edit
              </Link>
                <button onClick={()=> handleDelete(post._id)} className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default DashBlogList;
