import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/assets/logo-cbrsolo80b.png';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-20 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="CBR Soloraya" className="h-12 w-auto" />
          <div className="hidden md:block">
            <h1 className="font-bold text-lg leading-none">CBR SOLORAYA</h1>
            <p className="text-[10px] text-yellow-600 font-semibold tracking-tighter uppercase">Kamp Bebas Riba</p>
          </div>
        </Link>

        {/* Menu Section */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-yellow-600 transition">Beranda</Link>
          <Link to="/tentang" className="hover:text-yellow-600 transition">Tentang</Link>
          <Link to="/kegiatan" className="hover:text-yellow-600 transition">Kegiatan</Link>
          <Link to="/galeri" className="hover:text-yellow-600 transition">Galeri</Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-5 py-2 text-sm font-semibold border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition">
            Login
          </Link>
          <Link to="/Daftar" className="px-5 py-2 text-sm font-semibold bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-md transition">
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;