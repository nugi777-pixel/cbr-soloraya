import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cek user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email tidak ditemukan",
      });
    }

    // 2. Cek password (WAJIB bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. Response ke frontend
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
