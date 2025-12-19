import { useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function Daftar() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", wilayah: "", alasan: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/members", form);
      setMsg("✅ Pendaftaran sukses. Selamat bergabung!");
      setForm({ name: "", email: "", phone: "", wilayah: "", alasan: "" });
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Gagal daftar, coba lagi nanti."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto py-12 px-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 border-t-8 border-yellow-500">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Pendaftaran</h1>
          <p className="text-gray-500 mb-8">Lengkapi data Anda untuk bergabung dengan CBR Soloraya.</p>
          
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
              <input name="name" value={form.name} onChange={onChange} placeholder="Contoh: Budi Santoso" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 outline-none transition" required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input type="email" name="email" value={form.email} onChange={onChange} placeholder="email@anda.com" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 outline-none transition" required />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Nomor WhatsApp</label>
                <input name="phone" value={form.phone} onChange={onChange} placeholder="0812..." className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 outline-none transition" required />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Wilayah (Kecamatan/Kota)</label>
              <input name="wilayah" value={form.wilayah} onChange={onChange} placeholder="Misal: Banjarsari, Solo" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 outline-none transition" required />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Alasan Bergabung</label>
              <textarea name="alasan" value={form.alasan} onChange={onChange} placeholder="Ceritakan motivasi Anda..." rows="3" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 outline-none transition" required />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input 
                type="password" 
                name="password" 
                value={form.password} 
                onChange={onChange} 
                placeholder="Minimal 6 karakter" 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 outline-none transition" 
                required 
              />
            </div>

            <button 
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-all ${loading ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600 active:scale-95'}`}
            >
              {loading ? "Mengirim..." : "Daftar Sekarang"}
            </button>

            {msg && (
              <div className={`mt-4 p-3 rounded-lg text-center font-medium ${msg.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}