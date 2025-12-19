export default function Services() {
  const services = [
    {
      title: "Edukasi Bebas Riba",
      desc: "Pembelajaran intensif dan konsultasi terkait ekonomi syariah, manajemen finansial halal, dan strategi hidup bebas riba.",
      icon: "📘",
    },
    {
      title: "Bimbingan Komunitas",
      desc: "Pendampingan bagi anggota komunitas untuk menjaga konsistensi dalam perjalanan hijrah bebas riba.",
      icon: "🤝",
    },
    {
      title: "Program Kegiatan Sosial",
      desc: "Aksi sosial, bakti masyarakat, dan kegiatan positif dalam memberdayakan umat.",
      icon: "🌱",
    },
    {
      title: "Pendampingan Bisnis Halal",
      desc: "Membantu UMKM menuju bisnis halal, jujur, dan berkah tanpa riba.",
      icon: "💼",
    },
  ];

  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Layanan Kami
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        CBR Soloraya menyediakan beragam layanan untuk membantu masyarakat 
        memahami, menjalani, dan menegakkan kehidupan bebas riba dalam keluarga, 
        bisnis, dan komunitas.
      </p>

      {/* GRID SERVICES */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-md rounded-xl hover:shadow-lg transition border border-gray-100"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-blue-600 text-white p-10 rounded-xl text-center shadow">
        <h2 className="text-2xl font-semibold mb-3">Tertarik Bergabung?</h2>
        <p className="mb-5 text-blue-100">
          Jadilah bagian dari komunitas yang saling mendukung dalam perjalanan 
          menuju hidup bebas riba.
        </p>
        <a
          href="/register"
          className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Daftar Sekarang
        </a>
      </div>
    </div>
  );
}
