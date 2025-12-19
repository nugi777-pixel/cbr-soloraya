import { useState } from "react";
import api from "../api";

export default function KegiatanAdmin() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    judul: "",
    deskripsi_singkat: "",
    deskripsi_lengkap: "",
    kategori: "kajian",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
    lokasi: "",
    maps_link: "",
    pemateri: "",
    biaya: 0,
    kuota_peserta: 0,
    status: "draft",
  });

  const [gambar, setGambar] = useState(null);
  const [galeri, setGaleri] = useState([]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) =>
        fd.append(key, value)
      );

      if (gambar) fd.append("gambar", gambar);
      Array.from(galeri).forEach((file) => fd.append("galeri", file));

      await api.post("/api/kegiatan", fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("✅ Kegiatan berhasil dibuat");

      // reset
      setForm({
        judul: "",
        deskripsi_singkat: "",
        deskripsi_lengkap: "",
        kategori: "kajian",
        tanggal: "",
        waktu_mulai: "",
        waktu_selesai: "",
        lokasi: "",
        maps_link: "",
        pemateri: "",
        biaya: 0,
        kuota_peserta: 0,
        status: "draft",
      });
      setGambar(null);
      setGaleri([]);
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan kegiatan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Buat Kegiatan Baru
      </h1>

      <form
        onSubmit={submit}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <input
          name="judul"
          value={form.judul}
          onChange={onChange}
          placeholder="Judul kegiatan"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="deskripsi_singkat"
          value={form.deskripsi_singkat}
          onChange={onChange}
          placeholder="Deskripsi singkat"
          className="w-full border p-2 rounded"
          rows={2}
          required
        />

        <textarea
          name="deskripsi_lengkap"
          value={form.deskripsi_lengkap}
          onChange={onChange}
          placeholder="Deskripsi lengkap"
          className="w-full border p-2 rounded"
          rows={5}
          required
        />

        <select
          name="kategori"
          value={form.kategori}
          onChange={onChange}
          className="w-full border p-2 rounded"
        >
          <option value="kajian">Kajian</option>
          <option value="pelatihan">Pelatihan</option>
          <option value="sosial">Sosial</option>
          <option value="bisnis">Bisnis</option>
          <option value="lainnya">Lainnya</option>
        </select>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={onChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className="border p-2 rounded"
          >
            <option value="draft">Draft</option>
            <option value="buka">Buka</option>
            <option value="penuh">Penuh</option>
            <option value="selesai">Selesai</option>
            <option value="dibatalkan">Dibatalkan</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="time"
            name="waktu_mulai"
            value={form.waktu_mulai}
            onChange={onChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="time"
            name="waktu_selesai"
            value={form.waktu_selesai}
            onChange={onChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <input
          name="lokasi"
          value={form.lokasi}
          onChange={onChange}
          placeholder="Lokasi"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="maps_link"
          value={form.maps_link}
          onChange={onChange}
          placeholder="Link Google Maps (opsional)"
          className="w-full border p-2 rounded"
        />

        <input
          name="pemateri"
          value={form.pemateri}
          onChange={onChange}
          placeholder="Pemateri"
          className="w-full border p-2 rounded"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="biaya"
            value={form.biaya}
            onChange={onChange}
            placeholder="Biaya"
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="kuota_peserta"
            value={form.kuota_peserta}
            onChange={onChange}
            placeholder="Kuota peserta"
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Gambar Utama</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
            className="block mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Galeri</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setGaleri(e.target.files)}
            className="block mt-1"
          />
        </div>

        <button
          disabled={loading}
          className={`w-full py-2 rounded font-semibold text-white ${
            loading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Menyimpan..." : "Simpan Kegiatan"}
        </button>
      </form>
    </div>
  );
}
