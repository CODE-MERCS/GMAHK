import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import withRole from "../middleware/WithRole";
import Hero from "../components/Hero";

const Sekretaris = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Footer />
        </div>
    )
}

export default withRole(Sekretaris, "SEKRETARIS");