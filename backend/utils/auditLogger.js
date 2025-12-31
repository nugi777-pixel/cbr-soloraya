import AuditLog from "../models/AuditLog.js";

export const logAdminAction = async ({
  req,
  action,
  targetUser,
  detail,
}) => {
  try {
    await AuditLog.create({
      admin: req.user.id,
      action,
      targetUser,
      detail,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  } catch (err) {
    console.error("Audit log error:", err.message);
  }
};
