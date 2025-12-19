import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./api/auth.js";
import adminRoutes from "./api/admin.js";
import membersRoutes from "./api/members.js";
import kegiatanRoutes from "./api/kegiatan.js";
import profilRoutes from "./routes/profilRoutes.js";   // <= INI WAJIB
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// STATIC UPLOADS
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/kegiatan", kegiatanRoutes);
app.use("/api/profil", profilRoutes);   // <= API PROFIL SUDah AKTIF

const PORT = process.env.PORT || 5000;

// CONNECT MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
