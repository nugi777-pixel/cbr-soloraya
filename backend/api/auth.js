import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap",
    });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      memberNumber: null, // BELUM ADA
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email tidak ditemukan",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Password salah",
      });
    }

    res.json({
      success: true,
      message: "Login berhasil",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        memberNumber: user.memberNumber,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * UPGRADE MEMBER
 */
router.patch("/upgrade/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    if (user.memberNumber) {
      return res.status(400).json({
        success: false,
        message: "Member sudah upgrade",
      });
    }

    let memberNumber;
    let exists = true;

    while (exists) {
      memberNumber = Math.floor(100000 + Math.random() * 900000);
      exists = await User.findOne({ memberNumber });
    }

    user.memberNumber = memberNumber;
    await user.save();

    res.json({
      success: true,
      message: "Upgrade berhasil",
      memberNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * ⬇⬇⬇ INI YANG PALING PENTING ⬇⬇⬇
 */
export default router;
