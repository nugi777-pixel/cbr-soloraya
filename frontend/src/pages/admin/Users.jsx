import { useEffect, useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";

const PAGE_SIZE = 8;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4100/api/admin/users", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();

      // Support backend yang mengirim array langsung atau { users: [...] }
      const usersArray = Array.isArray(data) ? data : data.users || [];

      setUsers(usersArray);
      setFiltered(usersArray);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= SEARCH & FILTER ================= */
  useEffect(() => {
    let data = [...users];

    if (search) {
      data = data.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter !== "all") data = data.filter((u) => u.role === roleFilter);
    if (statusFilter !== "all")
      data = data.filter((u) =>
        statusFilter === "active" ? u.active : !u.active
      );

    setFiltered(data);
    setCurrentPage(1);
  }, [search, roleFilter, statusFilter, users]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentData = filtered.slice(start, start + PAGE_SIZE);

  /* ================= CONFIRM ACTION ================= */
  const handleConfirm = async () => {
    if (!selectedUser) return;

    let url = `http://localhost:4100/api/admin/users/${selectedUser._id}`;
    let options = {
      method: modalType === "delete" ? "DELETE" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    if (modalType === "toggle") options.body = JSON.stringify({ active: !selectedUser.active });

    await fetch(url, options);
    setModalType(null);
    setSelectedUser(null);
    fetchUsers();
  };

  /* ================= EXPORT EXCEL ================= */
  const exportExcel = async () => {
    try {
      const res = await fetch("http://localhost:4100/api/admin/users/export", {
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error("Gagal mengunduh file");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Gagal mengunduh file Excel");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manajemen User</h1>

      <button
        onClick={exportExcel}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
      >
        Export Excel
      </button>

      {/* SEARCH & FILTER */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Cari nama / email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">Semua Role</option>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Nonaktif</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  Memuat data...
                </td>
              </tr>
            )}

            {!loading &&
              currentData.map((u) => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{u.name}</td>
                  <td>{u.email}</td>

                  {/* Role */}
                  <td className="p-2">
                    {u.role === "superadmin" ? (
                      <span>{u.role}</span>
                    ) : (
                      <select
                        value={u.role}
                        onChange={async (e) => {
                          const newRole = e.target.value;
                          if (newRole === u.role) return;
                          try {
                            await fetch(`http://localhost:4100/api/admin/users/${u._id}`, {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + token,
                              },
                              body: JSON.stringify({ role: newRole }),
                            });
                            fetchUsers();
                          } catch (err) {
                            console.error(err);
                            alert("Gagal mengubah role");
                          }
                        }}
                        disabled={
                          !currentUser ||
                          (currentUser.role === "admin" && u.role !== "member") ||
                          u._id === currentUser._id
                        }
                        className="border px-2 py-1 rounded text-sm"
                      >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                        {currentUser?.role === "superadmin" && (
                          <option value="superadmin">Superadmin</option>
                        )}
                      </select>
                    )}
                  </td>

                  <td>{u.active ? "Aktif" : "Nonaktif"}</td>

                  <td className="text-center space-x-2">
                    <button
                      disabled={u.role === "superadmin"}
                      onClick={() => {
                        setSelectedUser(u);
                        setModalType("toggle");
                      }}
                      className="px-3 py-1 border rounded text-xs"
                    >
                      {u.active ? "Nonaktifkan" : "Aktifkan"}
                    </button>

                    <button
                      disabled={u.role === "superadmin"}
                      onClick={() => {
                        setSelectedUser(u);
                        setModalType("delete");
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded text-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border text-sm ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODAL */}
      <ConfirmModal
        isOpen={!!modalType}
        onClose={() => {
          setModalType(null);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirm}
        danger={modalType === "delete"}
        title={modalType === "delete" ? "Hapus User" : "Ubah Status"}
        message={`Yakin ingin memproses user "${selectedUser?.email}"?`}
        confirmText={modalType === "delete" ? "Hapus" : "Ya"}
      />
    </div>
  );
}
