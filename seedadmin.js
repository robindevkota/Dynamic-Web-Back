require("dotenv").config();  // MUST be first line
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const seedSuperAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");

    const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = process.env;

    if (!SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
      throw new Error("SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD missing");
    }

    // 🔹 Delete existing Super Admin(s)
    const deleteResult = await User.deleteMany({ role: "SUPER_ADMIN" });
    if (deleteResult.deletedCount > 0) {
      console.log(`🗑 Deleted ${deleteResult.deletedCount} existing Super Admin(s)`);
    }

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 12);

    // 🔹 Create new Super Admin
    const superAdmin = await User.create({
      email: SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isEmailVerified: true,
      organizationId: null,
    });

    console.log(`🚀 Super Admin created: ${superAdmin.email}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding super admin:", err);
    process.exit(1);
  }
};

seedSuperAdmin();
