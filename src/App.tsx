import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import DashboardPendetaPage from "./pages/DashboardPendetaPage";
import Register from "./pages/RegisterPage";
import MainLayout from "./MainLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<DashboardPendetaPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
