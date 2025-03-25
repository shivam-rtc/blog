import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { logout } from "../app/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";

const Header = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  return (
    <header className="bg-white shadow-md">
      <div className="px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          <img
            src="https://rtctek.com/wp-content/uploads/2020/07/MicrosoftTeams-image-63.png"
            className="mr-3 h-6 sm:h-9"
            alt="RTC Tek"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search for anything"
              className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <FaSearch
              className="absolute right-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>

          <FaShoppingCart
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            size={24}
          />
          {!token ? (
            <>
              <Link
                to="/login"
                className="hidden md:inline-block px-4 py-2 bg-blue-500 text-white border border-blue-600 rounded hover:bg-purple-600 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Sign up
              </Link>
            </>
          ) : (
            // Profile Dropdown when authenticated
            <div className="relative">
              <FaUserCircle
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
                size={24}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-6 w-48 bg-white border rounded-lg shadow-lg">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(logout()); // Call logout function
                      setDropdownOpen(false);
                      navigate("/")
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
