import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import DashboardPendetaPage from "./pages/PendetaPage";
import Register from "./pages/RegisterPage";
import HistoryPage from "./pages/HistoryPage";
import Laporan from "./components/Laporan";
import HistoryDetailPage from "./pages/HistoryDetailPage";
import KetuaDepartemenPage from "./pages/KetuaDepartemenPage";
import SekertarisPage from "./pages/SekertarisPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="ketuadepartemen" element={<KetuaDepartemenPage />} />
          <Route path="sekretaris" element={<SekertarisPage />} />
          <Route path="/dashboard" element={<DashboardPendetaPage />}>
            <Route path="laporan" element={<Laporan />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="/dashboard/history/:id" element={<HistoryDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
