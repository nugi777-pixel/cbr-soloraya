import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";
import api from "../api";

export default function KegiatanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kegiatan, setKegiatan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/kegiatan/${id}`);

      if (res.data.success) {
        setKegiatan(res.data.data);
      } else {
        setError("Data kegiatan tidak ditemukan");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal memuat detail kegiatan");
    } finally {
      setLoading(false);
    }
  };

  const formatTanggal = (tgl) =>
    new Date(tgl).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Memuat detail kegiatan...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline"
        >
          Kembali
        </button>
      </div>
    );
  }

  if (!kegiatan) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
      >
        <FaArrowLeft /> Kembali
      </button>

      {/* GAMBAR */}
      <div className="rounded-xl overflow-hidden shadow mb-6">
        <img
          src={kegiatan.gambar}
          alt={kegiatan.judul}
          className="w-full h-72 object-cover"
          onError={(e) => {
            e.target.src = "/assets/default-event.jpg";
          }}
        />
      </div>

      {/* JUDUL */}
      <h1 className="text-3xl font-bold mb-2">
        {kegiatan.judul}
      </h1>

      <p className="text-gray-600 mb-6">
        {kegiatan.deskripsi_singkat}
      </p>

      {/* INFO */}
      <div className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
        <div className="flex items-center gap-2">
          <FaCalendar className="text-blue-600" />
          {formatTanggal(kegiatan.tanggal)}
        </div>

        <div className="flex items-center gap-2">
          <FaClock className="text-blue-600" />
          {kegiatan.waktu_mulai} – {kegiatan.waktu_selesai}
        </div>

        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-600" />
          {kegiatan.lokasi}
        </div>

        <div className="flex items-center gap-2">
          <FaUsers className="text-blue-600" />
          {kegiatan.jumlah_peserta} / {kegiatan.kuota_peserta} peserta
        </div>

        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-blue-600" />
          {kegiatan.biaya === 0 ? "Gratis" : `Rp ${kegiatan.biaya.toLocaleString("id-ID")}`}
        </div>
      </div>

      {/* DESKRIPSI LENGKAP */}
      <div className="prose max-w-none mb-8">
        {kegiatan.deskripsi_lengkap}
      </div>

      {/* GALERI */}
      {kegiatan.galeri?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Galeri</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {kegiatan.galeri.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`galeri-${i}`}
                className="rounded-lg h-40 w-full object-cover"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
