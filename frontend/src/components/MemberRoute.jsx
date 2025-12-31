import { Navigate } from "react-router-dom";

export default function MemberRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/login" replace />;

  if (user?.role !== "member") {
    return <Navigate to="/" replace />;
  }

  return children;
}
