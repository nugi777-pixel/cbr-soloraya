import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function DashboardMember() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) navigate("/login");
    else setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard Member</h1>

        <p className="mb-2">Nama: <b>{user.name}</b></p>
        <p>Status:
          <b className="ml-1">
            {user.status === "approved"
              ? "Anggota Penuh"
              : "Menunggu Verifikasi Admin"}

              {user.status === "waiting_review" && (
                <p className="text-yellow-600 mt-2">
                  Pengajuan upgrade sedang ditinjau admin
                </p>
              )}

              {user.status === "rejected" && (
                <p className="text-red-600 mt-2">
                  Pengajuan ditolak: {user.rejectReason}
                </p>
              )}

          </b>
        </p>


        {!user.memberNumber && (
          <Link
            to="/member/upgrade"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajukan Upgrade Keanggotaan
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="block w-full mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
