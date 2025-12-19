import express from "express";
import multer from "multer";
import { getProfil, saveProfil } from "../controllers/profilController.js";

const router = express.Router();

// upload storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, "logo-" + Date.now() + ".png");
  }
});

const upload = multer({ storage });

// GET & POST
router.get("/", getProfil);
router.post("/", upload.single("logo"), saveProfil);

export default router;
