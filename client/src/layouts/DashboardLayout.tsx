import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../features/dashboard/Sidebar";
import Header from "../features/dashboard/Header";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
