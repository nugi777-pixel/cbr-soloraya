import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auditLogger from "../utils/auditLogger.js";

const router = express.Router();

/* =======================
   LOGIN
======================= */
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN ROUTE HIT");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    await auditLogger({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      action: "LOGIN",
      req,
      detail: "User login berhasil",
    });

    return res.json({
      message: "Login sukses",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        passwordLegacy: user.passwordLegacy,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Kesalahan server" });
  }
});

/* =======================
   AUTH MIDDLEWARE
======================= */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

/* =======================
   VALIDASI PASSWORD
======================= */
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

/* =======================
   UBAH PASSWORD
======================= */
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

    user.password = newPassword;
    user.passwordLegacy = false;
    await user.save();

    await auditLogger({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      action: "CHANGE_PASSWORD",
      req,
      detail: "User mengubah password",
    });

    return res.json({
      message: "Password berhasil diubah, silakan login ulang",
    });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    return res.status(500).json({ message: "Kesalahan server" });
  }
});

export default router;
