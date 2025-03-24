import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import withRole from "../middleware/WithRole";
import Hero from "../components/Hero";
import AppBar from "../components/AppBar";
import NavbarSekretaris from "../components/NavbarSekretaris";


const Sekretaris = () => {
    const location = useLocation();
    const isDashboard = location.pathname === "/sekretaris"; // Cek jika sedang di halaman dashboard
    return (
      <div className="flex flex-col min-h-screen">
      <AppBar />
      <NavbarSekretaris />
    
      {/* Hero akan mengisi seluruh ruang kosong */}
      <div className="flex-grow">
        {isDashboard && <Hero />}
        <Outlet />
      </div>
    
      <Footer />
    </div>
    );
};

export default withRole(Sekretaris, "SEKRETARIS");