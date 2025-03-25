import { logout } from "../../app/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <button
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
