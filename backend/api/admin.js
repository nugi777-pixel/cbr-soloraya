import express from "express";
import User from "../models/User.js";
import AuditLog from "../models/AuditLog.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

import {
  getPendingMembers,
  approveMember,
  rejectMember
} from "../controllers/adminController.js";


import auditLogger from "../utils/auditLogger.js";

const router = express.Router();

/* ===================== PROTECT ALL ADMIN ROUTES ===================== */
router.use(requireAuth, requireAdmin);

/* ===================== MEMBER APPROVAL ===================== */

router.get("/members/pending", getPendingMembers);

router.post("/members/:id/approve", approveMember);
router.post("/members/:id/reject", rejectMember);

/* ===================== USERS ===================== */

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

router.patch("/users/:id", async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target)
      return res.status(404).json({ message: "User tidak ditemukan" });

    if (target.role === "superadmin")
      return res.status(403).json({ message: "Superadmin tidak bisa diubah" });

    if (req.user.role === "admin" && target.role === "admin")
      return res
        .status(403)
        .json({ message: "Admin tidak boleh mengubah admin lain" });

    const updates = {};
    if (req.body.role) updates.role = req.body.role;
    if (typeof req.body.active === "boolean")
      updates.active = req.body.active;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select("-password");

    await auditLogger({
      user: req.user,
      action: "UPDATE_USER",
      req,
      detail: `Update user ${target.email}`,
    });

    res.json({ message: "User diperbarui", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target)
      return res.status(404).json({ message: "User tidak ditemukan" });

    if (target.role === "superadmin")
      return res
        .status(403)
        .json({ message: "Superadmin tidak bisa dihapus" });

    if (req.user.role === "admin" && target.role === "admin")
      return res
        .status(403)
        .json({ message: "Admin tidak boleh menghapus admin lain" });

    await target.deleteOne();

    await auditLogger({
      user: req.user,
      action: "DELETE_USER",
      req,
      detail: `Hapus user ${target.email}`,
    });

    res.json({ message: "User dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===================== STATS ===================== */

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

/* ===================== AUDIT LOG ===================== */

router.get("/audit-log", async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("admin", "email role")
      .populate("targetUser", "email role")
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ logs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
