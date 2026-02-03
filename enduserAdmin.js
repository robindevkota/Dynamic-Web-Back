// seeds/createEndUserAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // adjust path if needed

const seedEndUserAdmin = async () => {
  try {
    // Removed deprecated options – modern Mongoose doesn't need them
    await mongoose.connect(process.env.MONGO_URI);

    const {
      END_USER_ADMIN_EMAIL,
      END_USER_ADMIN_PASSWORD,
      END_USER_ADMIN_ORG_ID, // ← Organization ObjectId as string (24 hex chars)
    } = process.env;

    if (!END_USER_ADMIN_EMAIL || !END_USER_ADMIN_PASSWORD || !END_USER_ADMIN_ORG_ID) {
      throw new Error("Missing required env variables: END_USER_ADMIN_EMAIL, END_USER_ADMIN_PASSWORD, END_USER_ADMIN_ORG_ID");
    }

    // Validate that the org ID is a valid 24-hex string
    if (!/^[0-9a-fA-F]{24}$/.test(END_USER_ADMIN_ORG_ID)) {
      throw new Error("END_USER_ADMIN_ORG_ID must be a valid 24-character MongoDB ObjectId");
    }

    // Optional: Remove any existing END_USER_ADMIN with this email in this org
    await User.deleteMany({
      email: END_USER_ADMIN_EMAIL.toLowerCase(),
      organizationId: new mongoose.Types.ObjectId(END_USER_ADMIN_ORG_ID),
      role: "END_USER_ADMIN",
    });

    // Create new END_USER_ADMIN
    const hashedPassword = await bcrypt.hash(END_USER_ADMIN_PASSWORD, 12);

    await User.create({
      email: END_USER_ADMIN_EMAIL.toLowerCase(),
      password: hashedPassword,
      role: "END_USER_ADMIN",
      organizationId: new mongoose.Types.ObjectId(END_USER_ADMIN_ORG_ID), // ← fixed with 'new'
      firstName: "End User",
      lastName: "Admin",
      status: "ACTIVE",
      emailVerified: true,
    });

    console.log("🚀 END_USER_ADMIN seeded successfully");
    console.log(`   Email: ${END_USER_ADMIN_EMAIL}`);
    console.log(`   Org ID: ${END_USER_ADMIN_ORG_ID}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding END_USER_ADMIN:", err.message);
    process.exit(1);
  }
};

seedEndUserAdmin();