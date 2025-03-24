import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import { getProfile } from "../api/auth";
import { User } from "lucide-react";

// Tambahkan fungsi getHomePath
const getHomePath = () => {
  const role = localStorage.getItem("role");
  if (role === "SEKRETARIS") return "/sekretaris";
  if (role === "KETUADEPARTEMEN") return "/ketuadepartemen";
  return "/dashboard"; // Default
};

const AppBar: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        if (response?.user?.name) {
          setUserName(response.user.name);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="bg-green-700 py-2 px-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.png" alt="PELITA Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold">PELITA</h1>
      </div>
      <div className="flex items-center gap-2">
        {loading ? (
          <div className="animate-pulse bg-green-600 h-5 w-32 rounded"></div>
        ) : (
          <NavLink
            to={`${getHomePath()}/profile`} // Sekarang tidak error
            className={({ isActive }) =>
              `flex items-center space-x-1 px-4 py-2 rounded-lg font-semibold transition ${
                isActive ? "text-white bg-green-600" : "text-gray-300 hover:bg-green-700"
              }`
            }
          >
            <User size={20} />
            <span>Selamat Datang, {userName || "Pengguna"}</span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default AppBar;
