import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

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
              <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-green-700">
                  Selamat Datang, Pendeta! 🙏
                </h1>
                <p className="text-lg text-gray-600 mt-4">
                  Semoga hari Anda penuh berkat dan kebijaksanaan dalam melayani
                  jemaat.
                </p>
              </div>
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

export default DashboardPendetaPage;
