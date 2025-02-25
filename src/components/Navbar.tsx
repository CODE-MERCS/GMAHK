import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { User, LogOut, History, Home } from "lucide-react"; // Import icon dari Lucide React

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
    return "/dashboard"; // Default untuk PENDETA atau lainnya
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
                {/* Home */}
                <NavLink
                  to={getHomePath()}
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition ${
                      isActive ? "text-white bg-green-600" : "text-gray-300 hover:bg-green-700"
                    }`
                  }
                >
                  <Home size={18} />
                  <span>Home</span>
                </NavLink>

                {/* History */}
                <NavLink
                  to={`${getHomePath()}/history`}
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition ${
                      isActive ? "text-white bg-green-600" : "text-gray-300 hover:bg-green-700"
                    }`
                  }
                >
                  <History size={18} />
                  <span>History</span>
                </NavLink>

                {/* Profile */}
                <NavLink
                  to={`${getHomePath()}/profile`}
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition ${
                      isActive ? "text-white bg-green-600" : "text-gray-300 hover:bg-green-700"
                    }`
                  }
                >
                  <User size={18} />
                  <span>Profile</span>
                </NavLink>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!isLoggedIn && (
              <NavLink
                to="/login"
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
