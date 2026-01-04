export default function MemberStatus() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-yellow-600">
          Status Keanggotaan
        </h1>

        <p className="mb-4 text-slate-600">
          Formulir Anda sudah lengkap.
        </p>

        <p className="mb-6">
          ⏳ Menunggu verifikasi admin CBR Soloraya.
        </p>

        <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
          PENDING ADMIN
        </span>
      </div>
    </div>
  );
}
