// frontend/src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // Cek apakah user sudah login
  const isAuthenticated = localStorage.getItem('token') // atau dari context/state management
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute