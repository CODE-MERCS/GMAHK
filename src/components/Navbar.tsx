import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah user sudah login dan ambil role dari localStorage
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/");
  };

  // Tentukan path home berdasarkan role pengguna
  const getHomePath = () => {
    if (role === "SEKRETARIS") return "/sekretaris";
    if (role === "KETUADEPARTEMEN") return "/ketuadepartemen";
    return "/"; // Default untuk PENDETA atau lainnya
  };

  return (
    <nav className="bg-green-800 fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="GMAHK Logo" className="h-10 w-10 object-contain" />
            <Link to={getHomePath()} className="text-white font-bold text-2xl hover:text-gray-300 transition">
              PELITA
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            {isLoggedIn && (
              <>
                <NavLink
                  to={getHomePath()}
                  end
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-semibold transition ${
                      isActive ? "text-white bg-green-600" : "text-gray-300 hover:bg-green-700"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to={`${getHomePath()}/history`}
                  end
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-semibold transition ${
                      isActive ? "text-white bg-green-600" : "text-gray-300 hover:bg-green-700"
                    }`
                  }
                >
                  History
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}

            {!isLoggedIn && (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition ${
                    isActive ? "text-white bg-green-600" : "text-gray-300 hover:bg-green-700"
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
