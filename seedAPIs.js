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
  {
    key: "auth.login",
    name: "User Login",
    description: "Authenticates user and returns JWT token",
    url: "https://jsonplaceholder.typicode.com/posts", // ✅ Correct endpoint
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // 🔥 FIX: ReqRes expects just { email, password }
    transformPayload:
      "(payload) => ({ email: payload.email, password: payload.password })",
    successNotification: {
      type: "toast",
      message: "Welcome back! Login successful!",
      background: "#10b981",
      duration: 2000,
    },
    errorNotification: {
      type: "toast",
      message: "Invalid credentials. Use eve.holt@reqres.in",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: true,
    storeResponse: true,
    storeKey: "user",
    onSuccess: ["console:Login successful!"], // Changed to console for testing
    onError: ["console:Login failed"],
    onNetworkError: "console:Network error occurred",
    tags: ["auth", "login", "authentication"],
    projectUUID: "global",
  },

  {
    key: "auth.signup",
    name: "User Registration",
    description: "Creates new user account",
    url: "https://jsonplaceholder.typicode.com/posts", // ✅ Correct endpoint
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // 🔥 FIX: ReqRes expects just { email, password }
    transformPayload:
      "(payload) => ({ email: payload.email, password: payload.password })",
    successNotification: {
      type: "toast",
      message: "Account created successfully!",
      background: "#10b981",
      duration: 3000,
    },
    errorNotification: {
      type: "toast",
      message: "Signup failed. Use eve.holt@reqres.in",
      background: "#ef4444",
      duration: 4000,
    },
    closeModalOnSuccess: true,
    storeResponse: true,
    storeKey: "user",
    onSuccess: ["console:Signup successful!"],
    onError: ["console:Signup failed"],
    onNetworkError: "console:Network error during signup",
    tags: ["auth", "signup", "registration"],
    projectUUID: "global",
  },

  {
    key: "auth.forgot",
    name: "Forgot Password",
    description: "Sends OTP to user email for password reset",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    transformPayload: "(payload) => ({ email: payload.email })",
    successNotification: {
      type: "toast",
      message: "OTP sent to your email!",
      background: "#10b981",
      duration: 2500,
    },
    errorNotification: {
      type: "toast",
      message: "Failed to send OTP. Please try again.",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: true,
    storeResponse: true,
    storeKey: "otpSession",
    onSuccess: ["openModal:otpModal"],
    onError: ["console:Failed to send OTP"],
    onNetworkError: "console:Network error while sending OTP",
    tags: ["auth", "password", "reset"],
    projectUUID: "global",
  },

  {
    key: "products.api",
    name: "Get Products",
    description: "Fetches product list from API",
    url: "https://fakestoreapi.com/products",
    method: "GET",
    headers: {},
    transformPayload: "",
    successNotification: {
      type: "none",
    },
    errorNotification: {
      type: "toast",
      message: "Failed to load products",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: false,
    storeResponse: true,
    storeKey: "products",
    onSuccess: [],
    onError: ["console:Failed to fetch products"],
    onNetworkError: "console:Network error while fetching products",
    tags: ["ecommerce", "products", "catalog"],
    projectUUID: "global",
  },

  {
    key: "checkout.complete",
    name: "Complete Checkout",
    description: "Processes payment and creates order",
    url: "https://api.example.com/checkout/complete",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer {{token}}",
    },
    transformPayload:
      "(payload) => ({ cardNumber: payload.cardNumber, cardName: payload.cardName, expiry: payload.expiry, cvv: payload.cvv, amount: 520.30 })",
    successNotification: {
      type: "alert",
      message: "Payment successful! Your order has been placed.",
      background: "#10b981",
      duration: 4000,
    },
    errorNotification: {
      type: "alert",
      message: "Payment failed. Please check your card details.",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: true,
    storeResponse: true,
    storeKey: "order",
    onSuccess: ["navigate:/order-confirmation", "console:Order placed"],
    onError: ["console:Payment failed"],
    onNetworkError: "console:Network error during checkout",
    tags: ["ecommerce", "checkout", "payment"],
    projectUUID: "global",
  },
];

const seed = async () => {
  try {
    await APIConfig.deleteMany({});
    console.log("🗑️  Cleared old API configs");

    await APIConfig.insertMany(apiConfigs);
    console.log("✅ Seeded", apiConfigs.length, "API configurations");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    mongoose.disconnect();
  }
};

seed();
