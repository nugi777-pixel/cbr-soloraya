import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4100/api/admin/stats", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) {
    return <div className="p-6 text-lg">Memuat statistik...</div>;
  }

  const roleData = [
    { name: "Member", value: stats.totalMembers },
    { name: "Admin", value: stats.totalAdmins },
  ];

  const statusData = [
    { name: "Aktif", value: stats.activeUsers },
    { name: "Nonaktif", value: stats.inactiveUsers },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatBox title="Total User" value={stats.totalUsers} />
        <StatBox title="Member" value={stats.totalMembers} />
        <StatBox title="Admin" value={stats.totalAdmins} />
        <StatBox title="Nonaktif" value={stats.inactiveUsers} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Distribusi Role">
          <PieChartView data={roleData} />
        </ChartCard>

        <ChartCard title="Status User">
          <PieChartView data={statusData} />
        </ChartCard>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatBox({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-semibold mb-4">{title}</h2>
      <div className="h-64">{children}</div>
    </div>
  );
}

function PieChartView({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
