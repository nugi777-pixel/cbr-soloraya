import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4100/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login berhasil!");
        if (data.user.role === "admin") navigate("/dashboard/admin");
        else navigate("/member/dashboard");
      } else alert(`Login gagal: ${data.message}`);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat login");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Member</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="w-full border rounded px-3 py-2"/>
          <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required className="w-full border rounded px-3 py-2"/>
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded">{loading ? "Login..." : "Login"}</button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Belum punya akun? <Link to="/register" className="text-green-500">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}
