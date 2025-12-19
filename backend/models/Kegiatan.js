import mongoose from 'mongoose';

const KegiatanSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: [true, 'Judul kegiatan harus diisi'],
    trim: true,
    maxlength: [200, 'Judul maksimal 200 karakter']
  },
  deskripsi_singkat: {
    type: String,
    required: [true, 'Deskripsi singkat harus diisi'],
    maxlength: [500, 'Deskripsi singkat maksimal 500 karakter']
  },
  deskripsi_lengkap: {
    type: String,
    required: [true, 'Deskripsi lengkap harus diisi']
  },
  kategori: {
    type: String,
    required: [true, 'Kategori harus diisi'],
    enum: ['kajian', 'pelatihan', 'sosial', 'bisnis', 'lainnya']
  },
  tanggal: {
    type: Date,
    required: [true, 'Tanggal harus diisi']
  },
  waktu_mulai: {
    type: String,
    required: [true, 'Waktu mulai harus diisi']
  },
  waktu_selesai: {
    type: String,
    required: [true, 'Waktu selesai harus diisi']
  },
  lokasi: {
    type: String,
    required: [true, 'Lokasi harus diisi']
  },
  maps_link: {
    type: String
  },
  pemateri: {
    type: String,
    required: [true, 'Pemateri harus diisi']
  },
  biaya: {
    type: Number,
    default: 0
  },
  kuota_peserta: {
    type: Number,
    default: 0
  },
  jumlah_peserta: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'buka', 'penuh', 'selesai', 'dibatalkan'],
    default: 'draft'
  },
  gambar: {
    type: String,
    default: '/uploads/events/default.jpg'
  },
  galeri: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tanggal_penutupan: {
    type: Date
  }
}, {
  timestamps: true
});

// Index untuk pencarian
KegiatanSchema.index({ judul: 'text', deskripsi_singkat: 'text' });
KegiatanSchema.index({ tanggal: -1 });
KegiatanSchema.index({ kategori: 1, status: 1 });

const Kegiatan = mongoose.model('Kegiatan', KegiatanSchema);
export default Kegiatan;