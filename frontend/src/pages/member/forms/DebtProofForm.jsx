export default function DebtProofForm({ onNext, onPrev }) {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold">
        Bukti Amanah / Pinjaman / Hutang
      </h2>

      <label className="font-medium">
        Upload Bukti (Foto / PDF)
      </label>

      <input
        type="file"
        className="input-file"
        accept="image/*,application/pdf"
        required
      />

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
