import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, LogOut } from "lucide-react";

const NavbarKetuaDepartemen: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-green-100 p-2 border-b border-green-300 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex space-x-8">
          <Link 
            to="/ketuadepartemen/approved" 
            className="flex items-center text-green-800 px-4 py-2 rounded-md hover:bg-green-200 transition-colors"
          >
            <FileText className="mr-2" size={20} />
            <span>Laporan</span>
          </Link>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut className="mr-2" size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </nav>
  );
};

export default NavbarKetuaDepartemen;