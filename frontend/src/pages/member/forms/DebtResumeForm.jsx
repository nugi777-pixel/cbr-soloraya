export default function Step4ResumeAmanah({ next, back }) {
  return (
    <>
      <input required placeholder="Nama Pihak" />
      <select required>
        <option value="">Jenis</option>
        <option>Amanah</option>
        <option>Pinjaman</option>
        <option>Hutang</option>
      </select>
      <input type="number" required placeholder="Jumlah" />
      <textarea placeholder="Keterangan" />

      <div className="flex justify-between mt-4">
        <button onClick={back}>Kembali</button>
        <button onClick={next} className="btn-primary">Lanjut</button>
      </div>
    </>
  );
}
