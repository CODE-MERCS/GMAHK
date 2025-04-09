import { NavLink } from "react-router-dom";
import { Home, FileText, LogOut, User } from "lucide-react";
import { clearSession } from "../utils/session";

const SidebarKetuaDepartemen = () => {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen p-5 fixed">
      {/* Logo */}
      <div className="mb-6 text-center">
        <img src="/logo.png" alt="GMAHK Logo" className="w-20 mx-auto" />
        <h2 className="text-lg font-bold text-gray-700 mt-2">
          Dashboard Ketua Departemen
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-4">
        <NavLink
          to="/ketuadepartemen"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition ${
              isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          <Home className="mr-3" size={20} />
          Dashboard
        </NavLink>
        
        <NavLink
          to="/ketuadepartemen/approved"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition ${
              isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          <FileText className="mr-3" size={20} />
          Lihat Laporan
        </NavLink>
        
        <NavLink
          to="/ketuadepartemen/profile"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition ${
              isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          <User className="mr-3" size={20} />
          Profil
        </NavLink>
        
        {/* Logout Button */}
        <button
          onClick={() => {
            clearSession();
            window.location.href = "/";
          }}
          className="flex items-center p-3 rounded-lg text-red-600 hover:bg-gray-200 w-full"
        >
          <LogOut className="mr-3" size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default SidebarKetuaDepartemen;