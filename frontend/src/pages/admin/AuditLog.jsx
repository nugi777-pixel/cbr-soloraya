import { useEffect, useState } from "react";

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4100/api/admin/audit-logs", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => setLogs(data.logs || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Audit Log Admin</h1>

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
            {logs.map((l) => (
              <tr key={l._id} className="border-t">
                <td className="p-3">
                  {new Date(l.createdAt).toLocaleString()}
                </td>
                <td>{l.admin?.email}</td>
                <td>{l.action}</td>
                <td>{l.targetUser?.email || "-"}</td>
                <td>{l.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
