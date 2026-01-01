import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Daftar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔒 VALIDASI PASSWORD
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4100/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Daftar gagal");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">
          Daftar Member CBR
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-700"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-700"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-700"
          required
        />

        {/* INFO VALIDASI */}
        <p className="text-xs text-gray-500 mb-3">
          Minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka
        </p>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            loading
              ? "bg-gray-400"
              : "bg-emerald-700 hover:bg-emerald-600"
          }`}
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>

        <p className="text-sm text-gray-500 mt-3 text-center">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-800 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
