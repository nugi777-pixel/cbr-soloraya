// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ message: "User tidak ditemukan" });
    if (!user.active) return res.status(403).json({ message: "Akun non-aktif" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Butuh hak akses admin" });
  }
  next();
}
