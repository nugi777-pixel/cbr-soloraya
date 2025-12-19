import React, { useEffect, useState } from "react";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Ambil semua user
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4100/api/admin/users", {
        headers: { Authorization: "Bearer " + token },
      });

      const data = await res.json();
      setUsers(data.users || []);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE user
  const deleteUser = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    try {
      await fetch(`http://localhost:4100/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });

      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.log("Error deleting:", err);
    }
  };

  // EDIT user (hanya contoh popup sederhana)
  const editUser = (user) => {
    alert(
      `Fitur EDIT dapat diarahkan ke halaman:
      /admin/users/edit/${user._id}
      
      atau tampilkan modal form edit.`
    );
  };

  if (loading)
    return (
      <div className="text-center p-6 text-lg font-semibold">
        Loading users...
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen User</h1>

      <div className="overflow-x-auto shadow-lg rounded-xl border">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  Tidak ada user.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>

                  <td className="px-4 py-3 flex gap-3">
                    {/* BUTTON EDIT */}
                    <button
                      onClick={() => editUser(user)}
                      className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      Edit
                    </button>

                    {/* BUTTON DELETE */}
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
