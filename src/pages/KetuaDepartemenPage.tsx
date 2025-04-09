import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import withRole from "../middleware/WithRole";
import Hero from "../components/HeroKetua";
import AppBar from "../components/AppBar";
import SidebarKetuaDepartemen from "../components/SidebarKetuaDepartemen";

const KetuaDepartemen = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/ketuadepartemen"; // Check if on dashboard page
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarKetuaDepartemen />

      {/* Main Content */}
      <div className="ml-64 w-full flex flex-col min-h-screen">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <AppBar />
        </div>
        
        <div className="p-6 flex-grow">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Show Hero only on the main dashboard page */}
            {isDashboard && (
              <div>
                <Hero />
              </div>
            )}

            {/* Outlet for other pages */}
            <div className={isDashboard ? "mt-6" : ""}>
              <Outlet />
            </div>
          </div>
        </div>
        
        {/* Footer will stay at the bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default withRole(KetuaDepartemen, "KETUADEPARTEMEN");