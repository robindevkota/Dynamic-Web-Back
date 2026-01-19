const mongoose = require("mongoose");
const APIConfig = require("./models/APIConfig");

mongoose.connect(
  "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const apiConfigs = [
// Add these to your seedAPIs.js apiConfigs array

// 🔐 AUTHENTICATION APIs
{
  key: "auth.login",
  name: "Hotel Login",
  isActive: true,
  description: "Authenticates hotel manager",
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  transformPayload: `
    (payload) => ({
      email: payload.email,
      password: payload.password
    })
  `,
  successNotification: {
    type: "toast",
    message: "✅ Welcome back! Login successful!",
    background: "#10b981",
    duration: 2000,
  },
  errorNotification: {
    type: "toast",
    message: "❌ Invalid credentials. Please try again.",
    background: "#ef4444",
    duration: 3000,
  },
  closeModalOnSuccess: false,
  storeResponse: true,
  storeKey: "authResponse",
  onSuccess: [
    {
      action: "setAuthToken",
      actionParams: { token: "mock-jwt-hotel-12345" },
    },
    {
      action: "setAuthUser",
      actionParams: {},
    },
    {
      action: "navigateToPage",
      actionParams: { url: "/hotelhub/dashboard" },
    },
  ],
  onError: [{ action: "console", actionParams: { message: "Login failed" } }],
  tags: ["auth", "login", "hotel"],
  projectUUID: "global",
},

{
  key: "auth.signup",
  name: "Hotel Signup",
  description: "Creates new hotel manager account",
  url: "https://jsonplaceholder.typicode.com/users",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  transformPayload: `
    (payload) => ({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      username: payload.email.split('@')[0]
    })
  `,
  successNotification: {
    type: "toast",
    message: "✅ Account created successfully! Please login.",
    background: "#10b981",
    duration: 3000,
  },
  errorNotification: {
    type: "toast",
    message: "❌ Signup failed. Please try again.",
    background: "#ef4444",
    duration: 4000,
  },
  closeModalOnSuccess: false,
  storeResponse: true,
  storeKey: "signupResponse",
  onSuccess: [
    {
      action: "navigateToPage",
      actionParams: { url: "/hotelhub/login" },
    }
  ],
  onError: ["console:Signup failed"],
  tags: ["auth", "signup", "hotel"],
  projectUUID: "global",
},

// 🛏️ ROOMS APIs
{
  key: "rooms.api",
  name: "Get All Rooms",
  description: "Fetches all hotel rooms",
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  headers: {},
  transformPayload: "",
  successNotification: {
    type: "none",
  },
  errorNotification: {
    type: "toast",
    message: "❌ Failed to load rooms",
    background: "#ef4444",
    duration: 3000,
  },
  closeModalOnSuccess: false,
  storeResponse: true,
  storeKey: "rooms",
  onSuccess: [],
  onError: ["console:Failed to fetch rooms"],
  tags: ["rooms", "hotel"],
  projectUUID: "global",
},

{
  key: "rooms.create",
  name: "Create Room",
  description: "Adds a new room to the hotel",
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  transformPayload: `
    (payload) => ({
      title: payload.roomNumber || 'Room',
      body: \`Type: \${payload.roomType}, Price: $\${payload.price}, Status: \${payload.status}\`,
      userId: 1
    })
  `,
  successNotification: {
    type: "toast",
    message: "✅ Room added successfully!",
    background: "#10b981",
    duration: 3000,
  },
  errorNotification: {
    type: "toast",
    message: "❌ Failed to add room",
    background: "#ef4444",
    duration: 3000,
  },
  closeModalOnSuccess: false,
  storeResponse: true,
  storeKey: "roomCreateResponse",
  onSuccess: [
    {
      action: "closeModal",
      actionParams: {},
    },
    {
      action: "reload",
      actionParams: {},
    }
  ],
  onError: ["console:Failed to create room"],
  tags: ["rooms", "hotel", "create"],
  projectUUID: "global",
},

{
  key: "rooms.update",
  name: "Update Room",
  description: "Updates room details",
  url: "https://jsonplaceholder.typicode.com/posts/1",
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  transformPayload: `
    (payload) => ({
      title: payload.roomNumber,
      body: \`Type: \${payload.roomType}, Price: $\${payload.price}, Status: \${payload.status}\`,
      userId: 1
    })
  `,
  successNotification: {
    type: "toast",
    message: "✅ Room updated successfully!",
    background: "#10b981",
    duration: 3000,
  },
  errorNotification: {
    type: "toast",
    message: "❌ Failed to update room",
    background: "#ef4444",
    duration: 3000,
  },
  closeModalOnSuccess: false,
  storeResponse: true,
  storeKey: "roomUpdateResponse",
  onSuccess: [
    {
      action: "closeModal",
      actionParams: {},
    },
    {
      action: "reload",
      actionParams: {},
    }
  ],
  tags: ["rooms", "hotel", "update"],
  projectUUID: "global",
},

{
  key: "rooms.delete",
  name: "Delete Room",
  description: "Deletes a room",
  url: "https://jsonplaceholder.typicode.com/posts/1",
  method: "DELETE",
  successNotification: {
    type: "toast",
    message: "✅ Room deleted successfully!",
    background: "#10b981",
    duration: 2000,
  },
  errorNotification: {
    type: "toast",
    message: "❌ Failed to delete room",
    background: "#ef4444",
    duration: 3000,
  },
  storeResponse: true,
  storeKey: "roomDeleteResponse",
  onSuccess: [
    {
      action: "reload",
      actionParams: {},
    }
  ],
  tags: ["rooms", "hotel", "delete"],
  projectUUID: "global",
}

];

const seed = async () => {
  try {
    await APIConfig.deleteMany({});
    console.log("🗑️  Cleared old API configs");

    // ✅ FIX: Add isActive: true to ALL configs automatically
    const configsWithActive = apiConfigs.map((config) => ({
      ...config,
      isActive: true,
    }));

    await APIConfig.insertMany(configsWithActive);
    console.log("✅ Seeded", configsWithActive.length, "API configurations");

    // ✅ Verify they were saved with isActive
    const activeCount = await APIConfig.countDocuments({ isActive: true });
    console.log(`✅ Active APIs in database: ${activeCount}`);

    console.log("\n📝 AUTH API PAYLOAD INFO:");
    console.log("   🔐 LOGIN (auth.login):");
    console.log(
      "      Sends: { email: payload.email, password: payload.password }"
    );
    console.log("   👤 SIGNUP (auth.signup):");
    console.log(
      "      Sends: { name: payload.name, email: payload.email, password: payload.password, username: ... }"
    );
    console.log("   🔑 FORGOT PASSWORD (auth.forgot):");
    console.log("      Sends: { email: payload.email }");
    console.log("\n💡 Using JSONPlaceholder - any email/password will work!");
    console.log(
      "💡 Form field names must match payload keys (email, password, name, etc.)"
    );

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    mongoose.disconnect();
  }
};

seed();
