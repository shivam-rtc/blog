import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
// Import pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Signup from "../features/auth/Signup";
import Login from "../features/auth/Login";
import Profile from "../features/dashboard/Profile";
import NotFound from "../pages/NotFound";
import BlogDetails from "../features/blog/BlogDetails";
import { useAuth } from "../contexts/AuthContext";

// Dashboard Pages
import Dashboard from "../features/dashboard/Dashboard";
import CreateBlog from "../features/blog/CreateBlog";
import EditBlog from "../features/blog/EditBlog";

// Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course/:id" element={<BlogDetails />} />
      </Route>
      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-post" element={<CreateBlog />} />
          <Route path="edit-post/:postId" element={<EditBlog />} />
        </Route>
      </Route>
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
