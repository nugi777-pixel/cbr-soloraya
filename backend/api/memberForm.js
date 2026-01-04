import express from "express";
import MemberForm from "../models/MemberForm.js";
import User from "../models/User.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/* ===============================
   SUBMIT / UPDATE FORM MEMBER
================================ */
router.post(
  "/",
  requireAuth,
  upload.fields([
    { name: "fotoKTP", maxCount: 1 },
    { name: "fotoDiri", maxCount: 1 },
    { name: "buktiAmanah", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const files = req.files || {};

      const data = {
        ...req.body,
        user: req.user._id,
        fotoKTP: files.fotoKTP?.[0]?.filename,
        fotoDiri: files.fotoDiri?.[0]?.filename,
        buktiAmanah: files.buktiAmanah?.map(f => f.filename),
        isComplete: true,
      };

      const form = await MemberForm.findOneAndUpdate(
        { user: req.user._id },
        data,
        { upsert: true, new: true }
      );

      // update status user → pending
      await User.findByIdAndUpdate(req.user._id, {
        membershipStatus: "pending",
      });

      res.json({
        message: "Formulir berhasil dikirim & menunggu verifikasi admin",
        form,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/* ===============================
   ADMIN - LIST FORM PENDING
================================ */
router.get("/pending", requireAuth, requireAdmin, async (req, res) => {
  const list = await MemberForm.find({ isComplete: true })
    .populate("user", "name email membershipStatus");

  res.json({ list });
});

/* ===============================
   ADMIN - VERIFIKASI FORM
================================ */
router.post("/:id/verify", requireAuth, requireAdmin, async (req, res) => {
  const form = await MemberForm.findByIdAndUpdate(
    req.params.id,
    { verifiedByAdmin: true },
    { new: true }
  );

  res.json({ message: "Form diverifikasi", form });
});

export default router;
