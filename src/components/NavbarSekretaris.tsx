import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, FileText, History, LogOut } from "lucide-react";

const NavbarSekretaris: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-green-100 border-b border-green-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Navigation Links */}
          <div className="flex-1 flex items-center space-x-6">
            <Link
              to="/sekretaris"
              className="flex items-center text-green-800 px-3 py-2 rounded-md hover:bg-green-200 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Home</span>
            </Link>

            <Link
              to="/sekretaris/approved"
              className="flex items-center text-green-800 px-3 py-2 rounded-md hover:bg-green-200 transition-colors"
            >
              <FileText className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Approved Laporan</span>
            </Link>

            <Link
              to="/sekretaris/history"
              className="flex items-center text-green-800 px-3 py-2 rounded-md hover:bg-green-200 transition-colors"
            >
              <History className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Riwayat Laporan</span>
            </Link>
          </div>

          {/* Right Section - Logout */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSekretaris;