import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardPendeta from "../components/DashboardPendeta";

const DashboardPendetaPage: React.FC = () => {
  return (
    <div >
      <Navbar />
      <DashboardPendeta />
      <Footer/>
    </div>
  );
};

export default DashboardPendetaPage;
