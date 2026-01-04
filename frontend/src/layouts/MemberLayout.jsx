import { Outlet } from "react-router-dom";

export default function MemberLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-6">
        <h1 className="text-xl font-bold mb-6">CBR Soloraya</h1>
        <nav className="space-y-3 text-sm">
          <p className="opacity-70">Dashboard</p>
          <p className="opacity-70">Form Keanggotaan</p>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
