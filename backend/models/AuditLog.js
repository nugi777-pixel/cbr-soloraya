import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true, // contoh: "DELETE_USER", "UPDATE_ROLE"
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    detail: {
      type: String,
    },
    ip: String,
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
