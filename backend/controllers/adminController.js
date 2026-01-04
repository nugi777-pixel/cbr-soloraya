// controllers/adminController.js
import User from "../models/User.js";

// GET waiting review members
export const getPendingMembers = async (req, res) => {
  const members = await User.find({ status: "waiting_review" })
    .select("-password");
  res.json({ success: true, members });
};

// APPROVE
export const approveMember = async (req, res) => {
  const { memberNumber } = req.body;
  if (!memberNumber)
    return res.status(400).json({ message: "memberNumber wajib diisi" });

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      status: "approved",
      memberNumber,
      rejectReason: null,
    },
    { new: true }
  ).select("-password");

  res.json({ success: true, user });
};

// REJECT
export const rejectMember = async (req, res) => {
  const { reason } = req.body;
  if (!reason)
    return res.status(400).json({ message: "Alasan penolakan wajib diisi" });

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      status: "rejected",
      rejectReason: reason,
    },
    { new: true }
  ).select("-password");

  res.json({ success: true, user });
};

