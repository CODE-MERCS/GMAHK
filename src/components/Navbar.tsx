import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah user sudah login berdasarkan localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-green-800 fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="GMAHK Logo" className="h-10 w-10 object-contain" />
            <Link to="/" className="text-white font-bold text-2xl hover:text-gray-300 transition">
              GMAHK
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
