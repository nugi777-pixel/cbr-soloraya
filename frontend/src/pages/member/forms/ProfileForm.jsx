export default function ProfileForm({ onNext }) {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        Formulir Profil
      </h2>

      <input className="input" placeholder="Nama Lengkap" required />
      <input className="input" placeholder="Nama Panggilan" required />

      <label className="font-medium">Upload KTP</label>
      <input type="file" className="input-file" accept="image/*" required />

      <label className="font-medium">Upload Foto Diri</label>
      <input type="file" className="input-file" accept="image/*" required />

      <button
        type="button"
        className="btn-primary"
        onClick={onNext}
      >
        Simpan & Lanjut
      </button>
    </form>
  );
}
