import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import DashboardPendetaPage from "./pages/DashboardPendetaPage";
import Register from "./pages/RegisterPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<DashboardPendetaPage />} />
      </Routes>
    </Router>
  );
};

export default App;
