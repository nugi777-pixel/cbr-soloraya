import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import auditLogger from "../utils/auditLogger.js";


const router = express.Router();

/* ================================
   AUTH MIDDLEWARE
================================ */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

/* ================================
   VALIDASI PASSWORD
================================ */
const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

/* ================================
   PUT /api/auth/ubah-password
================================ */
router.put("/ubah-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        message:
          "Password minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Password lama salah" });
    }

    const isSame = await user.comparePassword(newPassword);
    if (isSame) {
      return res.status(400).json({
        message: "Password baru tidak boleh sama dengan password lama",
      });
    }

    user.password = newPassword;
    user.passwordLegacy = false;
    await user.save();

     // 🔐 AUDIT LOG KEAMANAN
    await auditLogger({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      action: "CHANGE_PASSWORD",
      req,
      detail: "User berhasil mengubah password",
    });

    return res.json({
      message: "Password berhasil diubah. Silakan login ulang.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Kesalahan server" });
  }
});

export default router;
