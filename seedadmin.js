require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = process.env;

    // Remove any existing super admins
    await User.deleteMany({ role: "SUPER_ADMIN" });

    // Create new super admin
    const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 12);

    await User.create({
      email: SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isEmailVerified: true,
      organizationId: null,
    });

    console.log("🚀 Super Admin seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding super admin:", err);
    process.exit(1);
  }
};

seedSuperAdmin();
