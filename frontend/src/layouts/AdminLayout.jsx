import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-blue-600 text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            className="md:hidden px-2 py-1 border rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden md:inline">Admin</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar + Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-gray-100 w-64 p-6 space-y-4 transition-transform transform md:translate-x-0 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } md:block`}
        >
          <nav className="space-y-2">
            <a
              href="/admin/dashboard"
              className="block px-4 py-2 rounded hover:bg-blue-200"
            >
              Dashboard
            </a>
            <a
              href="/admin/users"
              className="block px-4 py-2 rounded hover:bg-blue-200"
            >
              Manajemen User
            </a>
            <a
              href="/admin/stats"
              className="block px-4 py-2 rounded hover:bg-blue-200"
            >
              Statistik
            </a>
            <a
              href="/admin/audit-log"
              className="block px-4 py-2 rounded hover:bg-blue-200"
            >
              Audit Log
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
