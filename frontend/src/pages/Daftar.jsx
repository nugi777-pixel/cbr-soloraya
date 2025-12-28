import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Daftar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", form);
      setMsg("Registrasi berhasil, silakan login");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Gagal mendaftar");
    }
  }

  return (
    <form onSubmit={submit}>
      <input name="name" placeholder="Nama" onChange={onChange} required />
      <input name="email" type="email" placeholder="Email" onChange={onChange} required />
      <input name="password" type="password" placeholder="Password" onChange={onChange} required />
      <button>Daftar</button>
      <p>{msg}</p>
    </form>
  );
}
