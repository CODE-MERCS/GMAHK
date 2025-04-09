import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import withRole from "../middleware/WithRole";
import HeroSekretaris from "../components/HeroSekretaris";
import AppBar from "../components/AppBar";
import SidebarSekretaris from "../components/SidebarSekretaris";

const Sekretaris = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/sekretaris"; // Check if on dashboard page
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarSekretaris />

      {/* Main Content - Added flex and flex-col to create proper layout structure */}
      <div className="ml-64 w-full flex flex-col min-h-screen">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <AppBar />
        </div>
        
        {/* Main content area - Added flex-grow to push footer down */}
        <div className="p-4 flex-grow">
          <div className="mt-2 bg-white p-4 rounded-lg shadow-md">
            {/* Show Hero only on the main dashboard page */}
            {isDashboard && (
              <div className="flex items-center justify-center">
                <HeroSekretaris />
              </div>
            )}

            <div className="mt-3">
              <Outlet />
            </div>
          </div>
        </div>
        
        {/* Footer will now stay at bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default withRole(Sekretaris, "SEKRETARIS");