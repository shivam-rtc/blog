import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-4">
      <Link to="/dashboard" className="hover:text-gray-400">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      </Link>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/" className="hover:text-gray-400">Home</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/create-post" className="hover:text-gray-400">Create Post</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/edit-post/1" className="hover:text-gray-400">Edit Post</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/profile" className="hover:text-gray-400">Profile</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
