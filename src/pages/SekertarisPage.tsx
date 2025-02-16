import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import withRole from "../middleware/WithRole";
import Hero from "../components/Hero";

const Sekretaris = () => {
    const location = useLocation();
    const isDashboard = location.pathname === "/sekretaris"; // Cek jika sedang di halaman dashboard
    return (
        <div>
            <Navbar />
            {isDashboard && (
            <div>
              <Hero/>
            </div>
          )}
            {/* Outlet untuk menampilkan halaman dalam Sekretaris */}
            <div>
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default withRole(Sekretaris, "SEKRETARIS");
