import { Navigate } from "react-router-dom";

export default function SmartRedirect() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin" || user.role === "superadmin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/member/dashboard" replace />;
}
