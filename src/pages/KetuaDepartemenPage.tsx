import { Home } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import withRole from "../middleware/WithRole";
const KetuaDepartemen = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer/>
    </div>
  );
}

export default withRole(KetuaDepartemen, "KETUADEPARTEMEN");