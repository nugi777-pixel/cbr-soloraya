import React, { useEffect, useState } from "react";

export default function AdminProfil() {
  const [profil, setProfil] = useState({
    nama: "",
    deskripsi: "",
    alamat: "",
    kontak: "",
    logo: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  // Ambil data profil di awal
  const fetchProfil = async () => {
    try {
      const res = await fetch("http://localhost:4100/api/profil");
      const data = await res.json();

      if (data) {
        setProfil({
          nama: data.nama || "",
          deskripsi: data.deskripsi || "",
          alamat: data.alamat || "",
          kontak: data.kontak || "",
          logo: data.logo || "",
        });
      }

      setLoading(false);
    } catch (err) {
      console.log("Error fetch profil:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfil();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setProfil({ ...profil, [e.target.name]: e.target.value });
  };

  // Simpan update profil
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("http://localhost:4100/api/profil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(profil),
      });

      const result = await res.json();
      setSaving(false);

      if (res.ok) {
        alert("Profil organisasi berhasil diperbarui!");
      } else {
        alert("Gagal update: " + result.message);
      }
    } catch (err) {
      console.log("Error update:", err);
      setSaving(false);
    }
  };

  // Upload logo
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let formData = new FormData();
    formData.append("logo", file);

    try {
      const res = await fetch("http://localhost:4100/api/profil/logo", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setProfil({ ...profil, logo: data.logo });
        alert("Logo berhasil diperbarui");
      } else {
        alert("Upload gagal: " + data.message);
      }
    } catch (err) {
      console.log("Error upload:", err);
    }
  };

  if (loading)
    return <div className="p-6 text-center text-lg">Memuat data...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profil Organisasi</h1>

      <form
        onSubmit={handleSave}
        className="bg-white shadow-lg rounded-lg p-6 space-y-5"
      >
        {/* NAMA */}
        <div>
          <label className="font-semibold">Nama Organisasi</label>
          <input
            type="text"
            name="nama"
            value={profil.nama}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="font-semibold">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={profil.deskripsi}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded mt-1"
          ></textarea>
        </div>

        {/* ALAMAT */}
        <div>
          <label className="font-semibold">Alamat</label>
          <input
            type="text"
            name="alamat"
            value={profil.alamat}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* KONTAK */}
        <div>
          <label className="font-semibold">Kontak (No WA / Telp)</label>
          <input
            type="text"
            name="kontak"
            value={profil.kontak}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* LOGO */}
        <div>
          <label className="font-semibold">Logo Organisasi</label>
          <div className="flex items-center gap-4 mt-2">
            {profil.logo ? (
              <img
                src={`http://localhost:4100/${profil.logo}`}
                alt="logo"
                className="h-20 w-20 object-contain border rounded"
              />
            ) : (
              <div className="h-20 w-20 border rounded flex items-center justify-center text-gray-400">
                Tidak ada
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="border p-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
