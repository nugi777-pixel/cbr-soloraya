import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Kegiatan(){
  const [list,setList] = useState([]);
  useEffect(() => {
-  api.get("/api/kegiatan").then(r => setList(r.data.kegiatan))
+  api.get("/api/kegiatan").then(r => setList(r.data.data))
}, []);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Kegiatan</h1>
      <div className="space-y-4">
        {list.map(k=>(
          <div key={k._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">
            -  {k.title}
            +  {k.judul}
            </h3>
            <p className="text-sm text-gray-600">
            -  {k.excerpt}
            +  {k.deskripsi_singkat}
            </p>
            <div className="mt-2">
              <Link to={`/kegiatan/${k._id}`} className="text-blue-600">Baca selengkapnya</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
