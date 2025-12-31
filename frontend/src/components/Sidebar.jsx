import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const menu = [
    {
      label: "Dashboard",
      to: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Statistik",
      to: "/admin/stats",
      icon: <BarChart3 size={18} />,
    },
    {
      label: "Manajemen User",
      to: "/admin/users",
      icon: <Users size={18} />,
    },
    {
      label: "Audit Log",
      to: "/admin/audit-log",
      icon: <FileText size={18} />,
    },
  ];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      {/* HEADER */}
      <div className="h-16 flex items-center px-6 border-b font-bold text-lg">
        CBR Admin
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-6 py-4 border-t text-sm text-red-600 hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
