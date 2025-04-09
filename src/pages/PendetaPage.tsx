import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import HeroPendeta from "../components/HeroPendeta";
import withRole from "../middleware/WithRole";
import AppBar from "../components/AppBar";

const DashboardPendetaPage = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard"; // Cek jika sedang di halaman dashboard

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-full flex flex-col min-h-screen">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <AppBar />
        </div>
        
        <div className="p-6 flex-grow">
          <div className="bg-white rounded-lg shadow-md">
            {/* Tampilkan hanya di halaman Dashboard */}
            {isDashboard && (
              <HeroPendeta />
            )}

            {/* Outlet untuk halaman lain seperti Laporan dan History */}
            <div className={!isDashboard ? "p-6" : ""}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRole(DashboardPendetaPage, "PENDETA");