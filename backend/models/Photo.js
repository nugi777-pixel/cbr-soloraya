import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  filename: String,
  caption: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Photo", photoSchema);
