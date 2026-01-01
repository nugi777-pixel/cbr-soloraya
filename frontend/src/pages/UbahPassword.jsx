import { useState } from "react";
import api from "../api";

export default function UbahPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      return setError("Konfirmasi password tidak cocok");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        "/api/auth/ubah-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message || "Password berhasil diubah");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal mengubah password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow-md border"
      >
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-1">
          🔐 Ubah Password
        </h1>
        <p className="text-sm text-gray-500 text-center mb-4">
          Demi keamanan akun CBR Anda
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
            {success}
          </div>
        )}

        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">
            Password Lama
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">
            Password Baru
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimal 8 karakter, huruf besar, huruf kecil, dan angka
          </p>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-400"
              : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {loading ? "Memproses..." : "Simpan Password"}
        </button>
      </form>
    </div>
  );
}
