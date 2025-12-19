export default function Dashboard() {
  return (
    <div className="p-6 animate-fade-in">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Admin CBR Soloraya
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow-lg p-6 rounded-2xl border-l-4 border-yellow-600">
          <h2 className="text-xl font-semibold text-gray-700">Jumlah Anggota</h2>
          <p className="text-3xl font-bold mt-2">128</p>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-2xl border-l-4 border-green-600">
          <h2 className="text-xl font-semibold text-gray-700">Kegiatan Aktif</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-2xl border-l-4 border-blue-600">
          <h2 className="text-xl font-semibold text-gray-700">Dokumen Profil</h2>
          <p className="text-3xl font-bold mt-2">Lengkap</p>
        </div>
      </div>

    </div>
  );
}
