import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const {logout} = useAuth();
  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <button onClick={()=>logout()} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </header>
  );
};

export default Header;
