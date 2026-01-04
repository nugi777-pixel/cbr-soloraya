import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  // 🔴 nanti dari auth backend
  const user = {
    isLoggedIn: true,
    role: "admin", // member | admin
  };

  if (!user.isLoggedIn) return <Navigate to="/login" />;

  if (user.role !== "admin") return <Navigate to="/login" />;

  return children;
}
