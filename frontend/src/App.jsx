import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Daftar from './pages/Daftar';
import AdminDashboard from "./pages/admin/AdminDashboard";
// import komponen lainnya...

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/daftar" element={<Daftar />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* Route lainnya */}
    </Routes>
  );
}

export default App;