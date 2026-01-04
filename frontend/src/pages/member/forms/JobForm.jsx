export default function JobForm({ onNext, onPrev }) {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        Formulir Pekerjaan
      </h2>

      <input className="input" placeholder="Pekerjaan" required />
      <input className="input" placeholder="Penghasilan per bulan" required />

      <div className="flex justify-between">
        <button type="button" onClick={onPrev}>
          Kembali
        </button>
        <button type="button" className="btn-primary" onClick={onNext}>
          Simpan & Lanjut
        </button>
      </div>
    </form>
  );
}
