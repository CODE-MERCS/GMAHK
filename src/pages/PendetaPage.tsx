import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardPendetaPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-full p-6">
        {/* Router Outlet untuk Konten */}
        <div className="mt-6 bg-white p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPendetaPage;
