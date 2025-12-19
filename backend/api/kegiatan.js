import express from 'express';
const router = express.Router();
import Kegiatan from '../models/Kegiatan.js'; 
import { requireAuth, requireAdmin } from '../middleware/auth.js';

// GET detail kegiatan by ID
router.get('/:id', async (req, res) => {
  try {
    const kegiatan = await Kegiatan.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('pemateri', 'name bidang');
    
    if (!kegiatan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kegiatan tidak ditemukan' 
      });
    }
    
    res.json({
      success: true,
      data: kegiatan
    });
  } catch (error) {
    console.error('Error fetching kegiatan detail:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// GET semua kegiatan
router.get('/', async (req, res) => {
  try {
    const { kategori, status, limit = 10, page = 1 } = req.query;
    const query = {};
    
    if (kategori) query.kategori = kategori;
    if (status) query.status = status;
    
    const skip = (page - 1) * limit;
    
    const kegiatan = await Kegiatan.find(query)
      .sort({ tanggal: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name');
    
    const total = await Kegiatan.countDocuments(query);
    
    res.json({
      success: true,
      data: kegiatan,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// POST create kegiatan (admin only)
router.post('/', requireAuth, async (req, res) => {
  try {
    // Cek role admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized' 
      });
    }
    
    const kegiatanData = {
      ...req.body,
      createdBy: req.user.id
    };
    
    const kegiatan = new Kegiatan(kegiatanData);
    await kegiatan.save();
    
    res.status(201).json({
      success: true,
      message: 'Kegiatan berhasil dibuat',
      data: kegiatan
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Gagal membuat kegiatan',
      error: error.message 
    });
  }
});

// PUT update kegiatan (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized' 
      });
    }
    
    const kegiatan = await Kegiatan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!kegiatan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kegiatan tidak ditemukan' 
      });
    }
    
    res.json({
      success: true,
      message: 'Kegiatan berhasil diperbarui',
      data: kegiatan
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Gagal memperbarui kegiatan',
      error: error.message 
    });
  }
});

// DELETE kegiatan (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized' 
      });
    }
    
    const kegiatan = await Kegiatan.findByIdAndDelete(req.params.id);
    
    if (!kegiatan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kegiatan tidak ditemukan' 
      });
    }
    
    res.json({
      success: true,
      message: 'Kegiatan berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Gagal menghapus kegiatan',
      error: error.message 
    });
  }
});

export default router;