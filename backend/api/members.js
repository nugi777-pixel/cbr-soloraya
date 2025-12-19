import express from "express";
import Member from "../models/Member.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// create member (public)
router.post("/",
  body("name").notEmpty(),
  body("email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const m = await Member.create(req.body);
      res.status(201).json({ message: "Terdaftar", member: m });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// list members (admin)
router.get("/", async (req, res) => {
  try {
    const list = await Member.find().sort({ createdAt: -1 });
    res.json({ members: list });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// verify member (admin)
router.patch("/:id/verify", async (req, res) => {
  try {
    const m = await Member.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    res.json({ message: "Member diverifikasi", member: m });
  } catch (err) { res.status(500).json({ message: err.message });}
});

export default router;
