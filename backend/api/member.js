import express from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * Submit upgrade request
 */
router.post("/upgrade", requireAuth, async (req, res) => {
  const { fullName, phone, address, occupation, reason } = req.body;

  if (!fullName || !phone || !address) {
    return res.status(400).json({ message: "Data wajib belum lengkap" });
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      upgradeRequest: {
        fullName,
        phone,
        address,
        occupation,
        reason,
        submittedAt: new Date(),
      },
      status: "waiting_review",
    },
    { new: true }
  ).select("-password");

  res.json({ success: true, user });
});

export default router;
