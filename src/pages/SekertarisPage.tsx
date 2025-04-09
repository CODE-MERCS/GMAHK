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

      {/* Main Content */}
      <div className="ml-64 w-full">
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <AppBar />
        </div>
        
        {/* Reduced padding from p-6 to p-4 */}
        <div className="p-4">
          {/* Reduced margin-top from mt-6 to mt-2 and padding from p-6 to p-4 */}
          <div className="mt-2 bg-white p-4 rounded-lg shadow-md">
            {/* Show Hero only on the main dashboard page */}
            {isDashboard && (
              <div className="flex items-center justify-center">
                <HeroSekretaris />
              </div>
            )}

            {/* Reduced margin-top from mt-6 to mt-3 */}
            <div className="mt-3">
              <Outlet />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default withRole(Sekretaris, "SEKRETARIS");