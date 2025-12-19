// frontend/src/components/AdminRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  // Cek apakah user adalah admin
  const userRole = localStorage.getItem('role') // atau dari context
  
  if (userRole !== 'admin') {
    return <Navigate to="/" replace />
  }
  
  return children
}

export default AdminRoute