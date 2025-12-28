import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/logo-cbrsolo80b.png";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="CBR Soloraya" className="h-12 w-auto" />
          <div className="hidden md:block">
            <h1 className="font-bold text-lg leading-none">CBR SOLORAYA</h1>
            <p className="text-[10px] text-yellow-600 font-semibold tracking-tighter uppercase">
              Camp Bebas Riba
            </p>
          </div>
        </Link>

        {/* Menu Tengah */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-yellow-600 transition">Surakarta</Link>
          <Link to="/Boyolali" className="hover:text-yellow-600 transition">Boyolali</Link>
          <Link to="/Klaten" className="hover:text-yellow-600 transition">Klaten</Link>
          <Link to="/Karanganyar" className="hover:text-yellow-600 transition">Karanganyar</Link>
          <Link to="/Sragen" className="hover:text-yellow-600 transition">Sragen</Link>
          <Link to="/Sukoharjo" className="hover:text-yellow-600 transition">Sukoharjo</Link>
          <Link to="/Wonogiri" className="hover:text-yellow-600 transition">Wonogiri</Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-semibold border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition"
              >
                Login
              </Link>
              <Link
                to="/daftar"
                className="px-5 py-2 text-sm font-semibold bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-md transition"
              >
                Daftar
              </Link>
            </>
          ) : (
            <>
              {role === "member" && (
                <Link
                  to="/member/dashboard"
                  className="px-5 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Dashboard
                </Link>
              )}

              {role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="px-5 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="px-5 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

