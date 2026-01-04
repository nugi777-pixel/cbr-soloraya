export default function Step5Kajian({ next, back }) {
  return (
    <>
      <label>
        <input type="checkbox" required /> Saya mengikuti kajian rutin/kopdar
      </label>

      <div className="flex justify-between mt-4">
        <button onClick={back}>Kembali</button>
        <button onClick={next} className="btn-primary">Lanjut</button>
      </div>
    </>
  );
}
