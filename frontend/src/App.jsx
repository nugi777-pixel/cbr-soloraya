import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Daftar from "./pages/Daftar";

import AdminRoute from "./components/AdminRoute";
import MemberRoute from "./components/MemberRoute";

import AdminLayout from "./layouts/AdminLayout";
import MemberLayout from "./layouts/MemberLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
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
        <Route path="dashboard" element={<AdminDashboard />} />
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
        <Route path="dashboard" element={<MemberDashboard />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
