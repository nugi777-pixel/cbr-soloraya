import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("PENDING");
  const [note, setNote] = useState("");
  const [memberNumber, setMemberNumber] = useState(null);

  const approve = () => {
    const generated = `CBR-${Math.floor(10000 + Math.random() * 90000)}`;
    setMemberNumber(generated);
    setStatus("ACTIVE");
  };

  const reject = () => {
    if (!note) {
      alert("Catatan penolakan wajib diisi");
      return;
    }
    setStatus("REJECTED");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Detail Verifikasi Member
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <p><strong>ID Member:</strong> {id}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="font-semibold">{status}</span>
        </p>

        {memberNumber && (
          <p className="text-green-600 font-medium">
            Nomor Anggota: {memberNumber}
          </p>
        )}

        {status === "PENDING" && (
          <>
            <textarea
              className="input"
              placeholder="Catatan (wajib jika ditolak)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex gap-4">
              <button
                className="btn-primary"
                onClick={approve}
              >
                Approve & Generate Nomor
              </button>

              <button
                className="px-6 py-3 rounded-lg border border-red-500 text-red-600 hover:bg-red-50"
                onClick={reject}
              >
                Reject
              </button>
            </div>
          </>
        )}

        {status === "ACTIVE" && (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg">
            Member telah disetujui dan aktif 🎉
          </div>
        )}

        {status === "REJECTED" && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            Member ditolak dengan catatan admin.
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 text-blue-600 hover:underline"
      >
        ← Kembali ke Dashboard Admin
      </button>
    </div>
  );
}
