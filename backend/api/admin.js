import express from "express";
import User from "../models/User.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { logAdminAction } from "../utils/auditLogger.js";

const router = express.Router();

// semua route ini membutuhkan admin
router.use(requireAuth, requireAdmin);

// GET /api/admin/users  -> list semua user (exclude password)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/stats
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMembers = await User.countDocuments({ role: "member" });
    const totalAdmins = await User.countDocuments({
      role: { $in: ["admin", "superadmin"] },
    });
    const activeUsers = await User.countDocuments({ active: true });
    const inactiveUsers = await User.countDocuments({ active: false });

    res.json({
      totalUsers,
      totalMembers,
      totalAdmins,
      activeUsers,
      inactiveUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// PATCH role / active
router.patch("/users/:id", async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target)
      return res.status(404).json({ message: "User tidak ditemukan" });

    // ❌ tidak boleh mengubah superadmin
    if (target.role === "superadmin") {
      return res
        .status(403)
        .json({ message: "Superadmin tidak bisa diubah" });
    }

    // ❌ admin tidak boleh ubah admin lain
    if (req.user.role === "admin" && target.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admin tidak boleh mengubah admin lain" });
    }

    const updates = {};
    if (req.body.role) updates.role = req.body.role;
    if (typeof req.body.active === "boolean")
      updates.active = req.body.active;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select("-password");

    res.json({ message: "User diperbarui", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  await logAdminAction({
  req,
  action: "UPDATE_USER",
  targetUser: target._id,
  detail: `Update role/status user ${target.email}`,
});

// DELETE
router.delete("/users/:id", async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target)
      return res.status(404).json({ message: "User tidak ditemukan" });

    // ❌ tidak boleh hapus superadmin
    if (target.role === "superadmin") {
      return res
        .status(403)
        .json({ message: "Superadmin tidak bisa dihapus" });
    }

    // ❌ admin tidak boleh hapus admin lain
    if (req.user.role === "admin" && target.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admin tidak boleh menghapus admin lain" });
    }

    await target.deleteOne();
    res.json({ message: "User dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  await logAdminAction({
  req,
  action: "DELETE_USER",
  targetUser: target._id,
  detail: `Hapus user ${target.email}`,
});

export default router; 
