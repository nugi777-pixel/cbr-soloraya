import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <header className="bg-yellow-500 py-20 px-6 text-center shadow-inner">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">CBR SOLORAYA</h1>
          <p className="text-xl text-yellow-900 font-medium tracking-wide">Camp Bebas Riba</p>
          <p className="max-w-2xl mx-auto mt-4 text-yellow-950 leading-relaxed font-light">
            Gerakan sosial & komunitas hijrah ekonomi untuk membangun masyarakat Solo Raya yang bebas riba, mandiri, dan penuh keberkahan.
          </p>
          <button className="mt-8 bg-white text-yellow-600 px-10 py-3 rounded-full font-bold hover:bg-yellow-50 transition-all shadow-lg hover:scale-105 active:scale-95">
            Gabung Sekarang
          </button>
        </header>

        {/* Visi & Misi Section */}
        <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-2xl shadow-sm border-t-8 border-yellow-500 hover:shadow-xl transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2 inline-block">Visi</h2>
            <p className="text-gray-600 italic text-xl leading-relaxed">
              "Mewujudkan masyarakat Solo Raya yang mandiri, berkah, dan bebas riba."
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-sm border-t-8 border-yellow-500 hover:shadow-xl transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2 inline-block">Misi</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-600 text-lg">
              <li>Menumbuhkan kesadaran bahaya riba</li>
              <li>Membentuk ekosistem usaha halal</li>
              <li>Menggerakkan solidaritas sosial</li>
              <li>Menyediakan solusi pembiayaan syariah</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-8 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-500 tracking-tighter">CBR SOLORAYA</h3>
            <p className="text-gray-400 text-sm leading-loose">
              Komunitas yang berfokus pada gerakan sosial dan edukasi ekonomi syariah tanpa riba di wilayah Solo Raya.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-widest">Navigasi</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-yellow-500 transition-colors">Beranda</Link></li>
              <li><Link to="/about" className="hover:text-yellow-500 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/kegiatan" className="hover:text-yellow-500 transition-colors">Kegiatan</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-widest">Hubungi Kami</h3>
            <p className="text-gray-400 text-sm">📍 Solo, Jawa Tengah</p>
            <p className="text-gray-400 text-sm mt-3 font-semibold">info@cbrsoloraya.id</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} CBR Soloraya. Membangun Ekonomi Berkah.
        </div>
      </footer>
    </div>
  );
};

export default Home;