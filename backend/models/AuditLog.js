import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    email: String,
    role: String,

    action: {
      type: String,
      required: true,
      enum: [
        "LOGIN_SUCCESS",
        "LOGIN_FAILED",
        "LOGOUT",
        "CHANGE_PASSWORD",
        "FORCE_PASSWORD_CHANGE",
      ],
    },

    ipAddress: String,
    userAgent: String,
    detail: String,
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
