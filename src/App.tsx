import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import DashboardPendetaPage from "./pages/PendetaPage";
import Register from "./pages/RegisterPage";
import HistoryPage from "./pages/HistoryPage";
import Laporan from "./components/Laporan";
import HistoryDetailPage from "./pages/HistoryDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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
