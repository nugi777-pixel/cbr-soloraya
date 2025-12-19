// backend/api/admin.js
import express from "express";
import User from "../models/User.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// semua route ini membutuhkan admin
router.use(requireAuth, requireAdmin);

// GET /api/admin/users  -> list semua user (exclude password)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/admin/users/:id -> update role or active
router.patch("/users/:id", async (req, res) => {
  try {
    const { role, active } = req.body; // role optional, active optional
    const updates = {};
    if (role) updates.role = role;
    if (typeof active === "boolean") updates.active = active;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json({ message: "User diperbarui", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/admin/users/:id -> hapus user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json({ message: "User dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
