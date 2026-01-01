import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4100/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/member/dashboard");
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
          Login CBR Soloraya
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            loading
              ? "bg-gray-400"
              : "bg-blue-800 hover:bg-blue-700"
          }`}
        >
          {loading ? "Memproses..." : "Login"}
        </button>

        <p className="text-sm text-gray-500 mt-3 text-center">
          Belum punya akun?{" "}
          <a href="/daftar" className="text-blue-800 hover:underline">
            Daftar
          </a>
        </p>
      </form>
    </div>
  );
}
