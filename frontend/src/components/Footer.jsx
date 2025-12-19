import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Kolom 1: Tentang */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-500">CBR SOLORAYA</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Komunitas yang berfokus pada gerakan sosial dan edukasi ekonomi syariah tanpa riba di wilayah Solo Raya.
          </p>
        </div>

        {/* Kolom 2: Navigasi Cepat */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-yellow-500">Beranda</Link></li>
            <li><Link to="/tentang" className="hover:text-yellow-500">Tentang Kami</Link></li>
            <li><Link to="/kegiatan" className="hover:text-yellow-500">Kegiatan</Link></li>
            <li><Link to="/kontak" className="hover:text-yellow-500">Kontak</Link></li>
          </ul>
        </div>

        {/* Kolom 3: Kontak & Alamat */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
          <p className="text-gray-400 text-sm">Jl. Contoh No. 123, Solo, Jawa Tengah</p>
          <p className="text-gray-400 text-sm mt-2">Email: info@cbrsoloraya.id</p>
          <p className="text-gray-400 text-sm">WhatsApp: 0812-3456-7890</p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} CBR Soloraya. All Rights Reserved.</p>
        <p className="mt-1 italic">Membangun Ekonomi Berkah Tanpa Riba.</p>
      </div>
    </footer>
  );
};

export default Footer;