import { Navigate } from "react-router-dom";

export default function SmartRedirect() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  if (role === "member") return <Navigate to="/member/dashboard" replace />;
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;

  return <Navigate to="/login" replace />;
}
