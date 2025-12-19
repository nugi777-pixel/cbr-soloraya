// frontend/src/layouts/PublicLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer' // Buat komponen Footer jika belum ada

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Ini akan merender halaman child */}
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout