import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./api/auth.js";
import adminRoutes from "./api/admin.js";

dotenv.config();

const app = express(); // ⬅️ INI YANG TADI HILANG

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

/* =======================
   DATABASE
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
