// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Token tidak ada" });

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User tidak valid" });
    next();
  } catch {
    res.status(401).json({ message: "Token tidak valid" });
  }
}

export function requireAdmin(req, res, next) {
  // Superadmin juga bisa akses
  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Akses admin saja" });
  }
  next();
}
