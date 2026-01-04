import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },

    memberNumber: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "waiting_review", "approved", "rejected"],
      default: "pending",
    },      
    
    upgradeRequest: {
      fullName: String,
      phone: String,
      address: String,
      occupation: String,
      reason: String,
      submittedAt: Date,
    },

    rejectReason: {
      type: String,
      default: null,
    },

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
