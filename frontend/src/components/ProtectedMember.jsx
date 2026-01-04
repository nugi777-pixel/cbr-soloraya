import { Navigate } from "react-router-dom";

export default function ProtectedMember({ children }) {
  // 🔴 NANTI DIGANTI DARI API / CONTEXT
  const member = {
    isLoggedIn: true,
    formCompleted: true,
    status: "PENDING",
  };

  if (!member.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!member.formCompleted) {
    return <Navigate to="/member/dashboard" replace />;
  }

  if (member.status === "PENDING") {
    return <Navigate to="/member/status" replace />;
  }

  return children;
}
