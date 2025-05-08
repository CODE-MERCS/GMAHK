import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import DashboardPendetaPage from "./pages/PendetaPage";
import Register from "./pages/RegisterPage";
import HistoryPage from "./pages/HistoryPage";
import Laporan from "./components/Laporan";
import ApprovedReportsPage from "./components/Approved";
import Draft from "./components/draft";
import DraftDetailPage from "./components/DraftDetailPage";
import HistoryDetailPage from "./pages/HistoryDetailPage";
import KetuaDepartemenPage from "./pages/KetuaDepartemenPage";
import SekertarisPage from "./pages/SekertarisPage";
import ProfilePage from "./pages/ProfilePage";

// Import Tutorial components
import TutorialHomePage from "./pages/TutorialHomePage";
import TutorialPendeta from "./components/TutorialPendeta";
import TutorialSekretaris from "./components/TutorialSekretaris";
import TutorialKetuaDepartemen from "./components/TutorialKetuaDepartemen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Ketua Departemen Routes */}
        <Route path="ketuadepartemen" element={<KetuaDepartemenPage />} >
          <Route path="history" element={<HistoryPage />} />
          <Route path="/ketuadepartemen/history/:id" element={<HistoryDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="approved" element={<ApprovedReportsPage />} />
          
          {/* Tutorial Routes for Ketua Departemen */}
          <Route path="tutorial" element={<TutorialHomePage role="KETUADEPARTEMEN" />} />
          <Route path="tutorial/laporan" element={<TutorialKetuaDepartemen />} />
          <Route path="tutorial/filter" element={<TutorialKetuaDepartemen />} />
          <Route path="tutorial/statistik" element={<TutorialKetuaDepartemen />} />
        </Route>
        
        {/* Sekretaris Routes */}
        <Route path="sekretaris" element={<SekertarisPage />}>
          <Route path="history" element={<HistoryPage />} />
          <Route path="/sekretaris/history/:id" element={<HistoryDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="approved" element={<ApprovedReportsPage />} />
          
          {/* Tutorial Routes for Sekretaris */}
          <Route path="tutorial" element={<TutorialHomePage role="SEKRETARIS" />} />
          <Route path="tutorial/verifikasi" element={<TutorialSekretaris />} />
          <Route path="tutorial/kelola" element={<TutorialSekretaris />} />
          <Route path="tutorial/statistik" element={<TutorialSekretaris />} />
        </Route>
        
        {/* Pendeta (Dashboard) Routes */}
        <Route path="/dashboard" element={<DashboardPendetaPage />}>
          <Route path="laporan" element={<Laporan />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="draft" element={<Draft />} />
          <Route path="draft/:id" element={<DraftDetailPage />} />
          <Route path="/dashboard/history/:id" element={<HistoryDetailPage />} />
          
          {/* Tutorial Routes for Pendeta */}
          <Route path="tutorial" element={<TutorialHomePage role="PENDETA" />} />
          <Route path="tutorial/laporan" element={<TutorialPendeta />} />
          <Route path="tutorial/draft" element={<TutorialPendeta />} />
          <Route path="tutorial/history" element={<TutorialPendeta />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;