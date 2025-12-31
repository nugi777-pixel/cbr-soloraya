import { useEffect, useState } from "react";

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/admin/audit-log", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Gagal mengambil audit log");
        }

        const data = await res.json();
        setLogs(data.logs || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLogs();
  }, [token]);

  /* ================= RENDER ================= */

  if (error) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Audit Log Admin
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Waktu</th>
              <th>Admin</th>
              <th>Aksi</th>
              <th>Target</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500"
                >
                  Belum ada aktivitas admin
                </td>
              </tr>
            ) : (
              logs.map((l) => (
                <tr key={l._id} className="border-t">
                  <td className="p-3">
                    {new Date(l.createdAt).toLocaleString()}
                  </td>
                  <td>{l.admin?.email || "-"}</td>
                  <td>{l.action}</td>
                  <td>{l.targetUser?.email || "-"}</td>
                  <td>{l.detail}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
