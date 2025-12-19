import mongoose from "mongoose";

const ProfilSchema = new mongoose.Schema({
  nama: String,
  deskripsi: String,
  visi: String,
  misi: String,
  logo: String, // url gambar
});

export default mongoose.model("Profil", ProfilSchema);
