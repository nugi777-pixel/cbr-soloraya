import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Jika token tidak ada atau role bukan admin/superadmin → redirect login
  if (!token || !user || (user.role !== "admin" && user.role !== "superadmin")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
