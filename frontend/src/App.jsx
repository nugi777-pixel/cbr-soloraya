import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DashboardMember from "./pages/member/DashboardMember";
import UpgradeMember from "./pages/member/UpgradeMember";

import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/member/dashboard" element={<DashboardMember />} />
        <Route path="/member/upgrade" element={<UpgradeMember />} />

        <Route path="/dashboard/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}
