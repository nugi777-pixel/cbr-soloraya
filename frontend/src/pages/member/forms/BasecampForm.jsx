export default function Step8Basecamp({ back, submit }) {
  return (
    <>
      <label>
        <input type="checkbox" required /> Saya mengikuti kegiatan Base Camp
      </label>

      <button onClick={submit} className="btn-primary mt-6 w-full">
        AJUKAN VERIFIKASI KEANGGOTAAN
      </button>
    </>
  );
}
