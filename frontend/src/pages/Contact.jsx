export default function Contact() {
  return (
    <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Kontak Kami</h1>

      <p className="text-gray-700 leading-relaxed mb-8">
        Silakan hubungi kami melalui form berikut atau melalui informasi kontak 
        yang tersedia. Tim kami akan merespon secepat mungkin.
      </p>

      {/* FORM KONTAK */}
      <div className="bg-white shadow rounded-lg p-6 mb-12">
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Masukkan nama anda"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Pesan</label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Tulis pesan anda disini..."
            ></textarea>
          </div>

          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Kirim Pesan
          </button>
        </form>
      </div>

      {/* INFORMASI KONTAK */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Informasi Kontak
        </h2>

        <ul className="text-gray-700 space-y-2">
          <li><strong>Alamat:</strong> Soloraya, Jawa Tengah</li>
          <li><strong>Email:</strong> support@cbrsoloraya.com</li>
          <li><strong>Telepon:</strong> +62 812-3456-7890</li>
        </ul>
      </div>
    </div>
  );
}
