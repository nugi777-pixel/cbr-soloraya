import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Daftar from "./pages/Daftar";

import AdminRoute from "./components/AdminRoute";
import MemberRoute from "./components/MemberRoute";

import AdminLayout from "./layouts/AdminLayout";
import MemberLayout from "./layouts/MemberLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DashboardStats from "./pages/admin/DashboardStats";
import Users from "./pages/admin/Users";
import AuditLog from "./pages/admin/AuditLog";

import MemberDashboard from "./pages/member/MemberDashboard";
import SmartRedirect from "./components/SmartRedirect";

function App() {
  return (
    <Routes>
      {/* ROOT */}
      <Route path="/" element={<SmartRedirect />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/daftar" element={<Daftar />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} /> {/* default /admin */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="stats" element={<DashboardStats />} />
        <Route path="users" element={<Users />} />
        <Route path="audit-log" element={<AuditLog />} />
      </Route>

      {/* MEMBER */}
      <Route
        path="/member"
        element={
          <MemberRoute>
            <MemberLayout />
          </MemberRoute>
        }
      >
        <Route index element={<MemberDashboard />} />
        <Route path="dashboard" element={<MemberDashboard />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
