import AuditLog from "../models/AuditLog.js";

const auditLogger = async ({
  user,
  action,
  req,
  detail = "",
}) => {
  try {
    await AuditLog.create({
      userId: user?.id || null,
      email: user?.email || null,
      role: user?.role || null,
      action,
      ipAddress:
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
      detail,
    });
  } catch (err) {
    console.error("Audit log gagal:", err.message);
  }
};

export default auditLogger;
