export default function About() {
  return (
    <div className="pt-24 pb-16 max-w-5xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Tentang CBR Soloraya
      </h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        CBR Soloraya adalah platform layanan komunikasi, bantuan, dan informasi
        berbasis digital untuk masyarakat di wilayah Soloraya. Kami hadir untuk
        memberikan akses informasi yang cepat, mudah, dan terpercaya.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
        Misi Kami
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Memberikan layanan berbasis teknologi yang membantu masyarakat dalam 
        mengakses informasi secara efektif, sekaligus meningkatkan keterhubungan 
        antar pengguna, admin, dan lembaga terkait.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
        Apa yang Kami Tawarkan?
      </h2>
      <ul className="text-gray-700 leading-relaxed list-disc ml-6 space-y-2">
        <li>Informasi layanan publik wilayah Soloraya</li>
        <li>Dashboard untuk admin dan pengguna terverifikasi</li>
        <li>Data dan laporan terpusat secara real-time</li>
        <li>Antarmuka sederhana yang mudah digunakan</li>
      </ul>

      <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          Komitmen Kami
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Kami berkomitmen memberikan pengalaman terbaik bagi pengguna melalui
          sistem yang aman, modern, dan terus diperbarui sesuai kebutuhan 
          masyarakat Soloraya.
        </p>
      </div>
    </div>
  );
}
