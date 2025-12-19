import { useEffect, useState } from "react";
import api from "../api";

export default function Galeri() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const res = await api.get("/api/kegiatan");

      if (res.data.success) {
        const imgs = res.data.data.flatMap((k) =>
          (k.galeri || []).map((img) => ({
            src: img,
            judul: k.judul,
          }))
        );

        setImages(imgs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        Memuat galeri...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Galeri Kegiatan
      </h1>

      {images.length === 0 ? (
        <p className="text-gray-500">
          Belum ada galeri kegiatan.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={img.src}
                alt={img.judul}
                className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                onError={(e) => {
                  e.target.src = "/assets/default-event.jpg";
                }}
              />
              <div className="p-2 text-sm text-gray-600">
                {img.judul}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
