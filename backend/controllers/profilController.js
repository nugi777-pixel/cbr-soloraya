import Profil from "../models/Profil.js";

export const getProfil = async (req, res) => {
  const profil = await Profil.findOne();
  res.json(profil ?? {});
};

export const saveProfil = async (req, res) => {
  let profil = await Profil.findOne();

  const data = {
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    visi: req.body.visi,
    misi: req.body.misi,
    logo: req.file ? "/uploads/" + req.file.filename : profil?.logo
  };

  if (profil) {
    await Profil.updateOne({}, data);
  } else {
    profil = new Profil(data);
    await profil.save();
  }

  res.json({ message: "Profil berhasil disimpan", profil: data });
};
