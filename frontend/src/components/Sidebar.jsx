import { NavLink } from "react-router-dom";

const menus = [
  { name: "Dashboard", path: "/admin" },
  { name: "Profil", path: "/admin/profil" },
  { name: "Kegiatan", path: "/admin/kegiatan" },
  { name: "Member", path: "/admin/members" },
  { name: "User", path: "/admin/users" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-gray-100 min-h-screen">
      <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
        Admin CBR
      </div>

      <nav className="p-4 space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded text-sm ${
                isActive
                  ? "bg-red-600 text-white"
                  : "hover:bg-gray-800"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
