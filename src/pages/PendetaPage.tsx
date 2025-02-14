import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import HeroPendeta from "../components/HeroPendeta";
import withRole from "../middleware/WithRole";

const DashboardPendetaPage = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard"; // Cek jika sedang di halaman dashboard

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-full p-6">
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            Dashboard Pendeta
          </h1>

          {/* **Tampilkan hanya di halaman Dashboard** */}
          {isDashboard && (
            <div className="flex items-center justify-center h-screen">
              <HeroPendeta/>
            </div>
          )}

          {/* **Outlet untuk halaman lain seperti Laporan dan History** */}
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRole(DashboardPendetaPage, "PENDETA");
