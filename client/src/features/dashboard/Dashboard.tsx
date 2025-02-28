import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <p>Welcome to your dashboard! Here’s what you can do:</p>
      <ul className="mt-4 space-y-2">
        <li>
          <Link to="/dashboard/create-post" className="text-blue-500">
            ➡️ Create a New Post
          </Link>
        </li>
        <li>
          <Link to="/dashboard/profile" className="text-blue-500">
            🔍 View/Edit Your Profile
          </Link>
        </li>
        <li>
          <Link to="/dashboard/edit-post/1" className="text-blue-500">
            ✏️ Edit an Existing Post
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
