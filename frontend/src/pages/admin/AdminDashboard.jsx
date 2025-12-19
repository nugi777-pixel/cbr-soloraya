import { useEffect, useState } from "react";
import api from "../../api";
import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
  try {
    const res = await api.get("/api/members");
    console.log("Cek Data API:", res.data); // Lihat di F12 Console browser
    
    // Penanganan fleksibel untuk berbagai format respon
    const dataAnggota = res.data.data || res.data; 
    setMembers(Array.isArray(dataAnggota) ? dataAnggota : []);
    
    setLoading(false);
  } catch (err) {
    console.error("Gagal memuat data:", err);
    setLoading(false);
  }
};

  const handleVerify = async (id) => {
    try {
      // Logika untuk memverifikasi anggota (mengubah verified menjadi true)
      await api.put(`/api/members/${id}`, { verified: true });
      fetchMembers(); // Segarkan data
      alert("Anggota berhasil diverifikasi!");
    } catch (err) {
      alert("Gagal verifikasi");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Data Pendaftar CBR Soloraya</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-yellow-500 text-white">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">Email</th>
                <th className="p-3">WhatsApp</th>
                <th className="p-3">Wilayah</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">{m.phone}</td>
                  <td className="p-3">{m.wilayah}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${m.verified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {m.verified ? "Aktif" : "Pending"}
                    </span>
                  </td>
                  <td className="p-3">
                    {!m.verified && (
                      <button 
                        onClick={() => handleVerify(m._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Verifikasi
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && !loading && <p className="p-4 text-center">Belum ada data pendaftar.</p>}
        </div>
      </div>
    </div>
  );
}