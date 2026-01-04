import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpgradeMember() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    occupation: "",
    reason: "",
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    const res = await fetch("http://localhost:4100/api/member/upgrade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Pengajuan upgrade berhasil dikirim");
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/member/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Form Upgrade Keanggotaan
        </h1>

        <input name="fullName" placeholder="Nama Lengkap"
          onChange={handleChange} required className="input w-full" />

        <input name="phone" placeholder="No HP"
          onChange={handleChange} required className="input w-full" />

        <input name="occupation" placeholder="Pekerjaan"
          onChange={handleChange} className="input w-full" />

        <textarea name="address" placeholder="Alamat Lengkap"
          onChange={handleChange} required className="input w-full" />

        <textarea name="reason" placeholder="Alasan ingin menjadi anggota penuh"
          onChange={handleChange} className="input w-full" />

        <button className="btn-primary w-full">
          Kirim Pengajuan
        </button>
      </form>
    </div>
  );
}
