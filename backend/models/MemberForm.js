import mongoose from "mongoose";

const memberFormSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    /* =====================
       1. PROFIL
    ====================== */
    namaLengkap: { type: String, required: true },
    namaPanggilan: String,
    alamatKTP: { type: String, required: true },
    alamatDomisili: { type: String, required: true },
    noHP: { type: String, required: true },
    email: { type: String, required: true },
    facebook: String,
    instagram: String,
    tiktok: String,
    fotoKTP: String,
    fotoDiri: String,

    /* =====================
       2. PEKERJAAN
    ====================== */
    pekerjaan: {
      nama: String,
      bidang: String,
      alamat: String,
    },

    /* =====================
       3 & 4. AMANAH / HUTANG
    ====================== */
    memilikiAmanah: { type: Boolean, default: false },
    buktiAmanah: [String],
    rincianAmanah: {
      totalHutang: Number,
      keterangan: String,
    },

    /* =====================
       5–8. KEGIATAN
    ====================== */
    ikutKajian: Boolean,
    ikutM3: Boolean,
    ikutSolunar: Boolean,
    ikutBasecamp: Boolean,

    /* =====================
       STATUS
    ====================== */
    isComplete: { type: Boolean, default: false },
    verifiedByAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("MemberForm", memberFormSchema);
