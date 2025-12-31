import { Link } from "react-router-dom";

// Fungsi download Excel
const exportExcel = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:4100/api/admin/users/export", {
      headers: { Authorization: "Bearer " + token },
    });

    if (!res.ok) throw new Error("Gagal mengunduh file");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.xlsx"; // nama file
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Gagal mengunduh file Excel");
  }
};

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      

      {/* Dashboard Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <DashboardCard
          title="Statistik"
          desc="Lihat grafik & ringkasan data"
          to="/admin/stats"
        />
        <DashboardCard
          title="Manajemen User"
          desc="Kelola member & admin"
          to="/admin/users"
        />
        <DashboardCard
          title="Audit Log"
          desc="Riwayat aktivitas admin"
          to="/admin/audit-log"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, desc, to }) {
  return (
    <Link
      to={to || "#"} // fallback jika `to` kosong
      className="bg-white shadow rounded-xl p-6 hover:ring-2 ring-blue-500 transition"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-500 mt-2">{desc}</p>
    </Link>
  );
}
