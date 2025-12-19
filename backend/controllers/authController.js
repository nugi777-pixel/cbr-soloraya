import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const seedAdmin = async () => {
  const exist = await User.findOne({ email: "admin@cbrsoloraya.id" });
  if (exist) return;

  const hash = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin CBR",
    email: "admin@cbrsoloraya.id",
    password: hash,
    role: "admin",
  });

  console.log("✅ Admin seeded");
};
