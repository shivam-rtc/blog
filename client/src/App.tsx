import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
// import { useLocation } from "react-router-dom";
const App = () => {
  // const location = useLocation();

  // Define routes where the Header and Footer should NOT be shown
  // const isDashboardRoute = location.pathname.startsWith("/dashboard");
  return (
    <>
      <div className="app-container">
          <AppRoutes />
      </div>
    </>
  );
};

export default App;
