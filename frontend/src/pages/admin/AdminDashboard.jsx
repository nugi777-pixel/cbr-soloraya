import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [memberNumber, setMemberNumber] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    fetch("http://localhost:4100/api/admin/members/pending", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMembers(data.members));
  }, []);

  const approve = async id => {
    const res = await fetch(
      `http://localhost:4100/api/admin/members/${id}/approve`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ memberNumber }),
      }
    );

    if (res.ok) {
      alert("Member disetujui");
      setMembers(members.filter(m => m._id !== id));
      setMemberNumber("");
    }
  };

  const reject = async id => {
    const res = await fetch(
      `http://localhost:4100/api/admin/members/${id}/reject`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: rejectReason }),
      }
    );

    if (res.ok) {
      alert("Member ditolak");
      setMembers(members.filter(m => m._id !== id));
      setRejectReason("");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Review Member</h1>

      {members.length === 0 && (
        <p className="text-gray-600">Tidak ada pengajuan upgrade</p>
      )}

      {members.map(m => (
        <div
          key={m._id}
          className="border rounded p-4 mb-4 bg-white shadow"
        >
          <h2 className="font-semibold text-lg">{m.upgradeRequest?.fullName}</h2>
          <p>Email: {m.email}</p>
          <p>HP: {m.upgradeRequest?.phone}</p>
          <p>Pekerjaan: {m.upgradeRequest?.occupation}</p>
          <p>Alamat: {m.upgradeRequest?.address}</p>
          <p className="italic text-gray-600 mt-2">
            "{m.upgradeRequest?.reason}"
          </p>

          {/* APPROVE */}
          <div className="mt-4">
            <input
              placeholder="Member Number"
              value={memberNumber}
              onChange={e => setMemberNumber(e.target.value)}
              className="border px-2 py-1 mr-2"
            />
            <button
              onClick={() => approve(m._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>
          </div>

          {/* REJECT */}
          <div className="mt-3">
            <input
              placeholder="Alasan penolakan"
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              className="border px-2 py-1 mr-2 w-64"
            />
            <button
              onClick={() => reject(m._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
