import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import withRole from "../middleware/WithRole";
import { Outlet, useLocation } from "react-router-dom";
import Hero from "../components/Hero";
const KetuaDepartemen = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/ketuadepartemen"; // Cek jika sedang di halaman dashboard
  return (
      <div>
          <Navbar />
          {isDashboard && (
          <div>
            <Hero/>
          </div>
        )}
          <div>
              <Outlet />
          </div>
          <Footer />
      </div>
  );
};

export default withRole(KetuaDepartemen, "KETUADEPARTEMEN");