import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// Custom Hook for using Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("useAuth", context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
