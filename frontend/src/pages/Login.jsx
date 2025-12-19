import { useState } from "react";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      alert("Login gagal! Periksa email & password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">

  {/* LOGO */}
  <img 
    src="/assets/logo-cbrsolo80b.png" 
    alt="CBR Soloraya"
    className="w-40 h-40 object-contain mb-6 drop-shadow-lg animate-fade-in"
  />

  <h2 className="text-2xl font-bold mb-4">Login Admin</h2>

  <form 
    onSubmit={handleLogin}
    className="w-full max-w-sm space-y-4"
  >
    <input
      type="email"
      className="w-full border p-2 rounded"
      value={email}
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      className="w-full border p-2 rounded"
      value={password}
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 transition"
      type="submit"
    >
      Login
    </button>
  </form>
</div>

  );
}
