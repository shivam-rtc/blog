import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
const PrivateRoutes = () => {
  const { token } = useSelector((state: RootState) => state.auth);

console.log("private token",token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
