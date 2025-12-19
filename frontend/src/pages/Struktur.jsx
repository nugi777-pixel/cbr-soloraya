import logo from "../assets/logo-cbrsolo.png";

export default function Struktur() {
  // default structure; you can replace names later
  const struktur = [
    { title: "Ketua", name: "Nama Ketua" },
    { title: "Wakil", name: "Nama Wakil" },
    { title: "Sekretaris", name: "Nama Sekretaris" },
    { title: "Bendahara", name: "Nama Bendahara" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src="/logo-cbrsolo.png" alt="logo" className="w-32 mx-auto mb-4"/>
      <h1 className="text-2xl font-bold text-center mb-6">Struktur Organisasi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {struktur.map((s,i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{s.title}</h3>
            <p>{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
