import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    // AUTH
    email: { type: String, required: true, unique: true },
    password: String,

    // STATUS
    status: {
      type: String,
      enum: ["INCOMPLETE", "PENDING", "ACTIVE", "REJECTED"],
      default: "INCOMPLETE",
    },
    memberNumber: String,

    // PROFILE
    profile: {
      fullName: String,
      nickName: String,
      addressKTP: String,
      addressDomisili: String,
      phone: String,
      facebook: String,
      instagram: String,
      tiktok: String,
      ktpFile: String,
      photoFile: String,
    },

    // JOB
    job: {
      name: String,
      income: String,
    },

    // AMANAH / HUTANG
    debt: {
      proofs: [String],
      resume: String,
      totalAmount: Number,
    },

    // KEGIATAN
    activities: {
      kajian: Boolean,
      m3: Boolean,
      solunar: Boolean,
      basecamp: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
