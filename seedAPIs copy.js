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
    key: "contact.send",
    name: "Contact Form Submission",
    description: "Sends contact form message",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    transformPayload: "(payload) => ({ name: payload.name, email: payload.email, subject: payload.subject, message: payload.message })",
    
    successNotification: {
      type: "toast",
      message: "Message sent successfully! We'll get back to you soon.",
      background: "#10b981",
      duration: 3000,
    },
    errorNotification: {
      type: "toast",
      message: "Failed to send message. Please try again.",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: false,
    storeResponse: true,
    storeKey: "contactResponse",
    
    onSuccess: ["console:Message sent successfully"],
    onError: ["console:Failed to send message"],
    onNetworkError: "console:Network error while sending message",
    tags: ["contact", "form", "support"],
    projectUUID: "global",
  },
  
  // ✅ LOGIN API - Navigate to home on success
  {
    key: "auth.login",
    name: "User Login",
    description: "Authenticates user and returns JWT token",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    transformPayload: "(payload) => ({ email: payload.email, password: payload.password })",
    
    successNotification: {
      type: "toast",
      message: "Welcome back! Login successful!",
      background: "#10b981",
      duration: 2000,
    },
    errorNotification: {
      type: "toast",
      message: "Invalid credentials. Please try again.",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: false, // No modals to close
    storeResponse: true,
    storeKey: "authResponse",
    
    // ✅ Navigate to home page and set auth
    onSuccess: [
      "setAuth:token=mock-jwt-token-{{authResponse.id}}",
      "setAuth:user={{email}}",
      "navigate:/shopzone" // Navigate to home page
    ],
    onError: ["console:Login failed"],
    onNetworkError: "console:Network error occurred",
    tags: ["auth", "login", "authentication"],
    projectUUID: "global",
  },

  // ✅ SIGNUP API - Navigate to login on success
  {
    key: "auth.signup",
    name: "User Registration",
    description: "Creates new user account",
    url: "https://jsonplaceholder.typicode.com/users",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    transformPayload: "(payload) => ({ email: payload.email, password: payload.password, name: payload.email.split('@')[0] })",
    
    successNotification: {
      type: "toast",
      message: "Account created successfully! Please login.",
      background: "#10b981",
      duration: 3000,
    },
    errorNotification: {
      type: "toast",
      message: "Signup failed. Please try again.",
      background: "#ef4444",
      duration: 4000,
    },
    closeModalOnSuccess: false, // No modals to close
    storeResponse: true,
    storeKey: "signupResponse",
    
    // ✅ After signup, navigate to login page
    onSuccess: ["navigate:/shopzone/login"],
    onError: ["console:Signup failed"],
    onNetworkError: "console:Network error during signup",
    tags: ["auth", "signup", "registration"],
    projectUUID: "global",
  },

  // ✅ FORGOT PASSWORD API - Navigate to login on success
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
      message: "Password reset instructions sent to your email!",
      background: "#10b981",
      duration: 3000,
    },
    errorNotification: {
      type: "toast",
      message: "Failed to send reset email. Please try again.",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: false, // No modals to close
    storeResponse: true,
    storeKey: "forgotResponse",
    
    // ✅ Navigate to login page after sending reset email
    onSuccess: ["navigate:/shopzone/login"],
    onError: ["console:Failed to send reset email"],
    onNetworkError: "console:Network error while sending reset email",
    tags: ["auth", "password", "reset"],
    projectUUID: "global",
  },

  // ✅ PRODUCTS API
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

  // ✅ CHECKOUT API - Navigate to confirmation page
  {
    key: "checkout.complete",
    name: "Complete Checkout",
    description: "Processes payment and creates order",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    transformPayload: "(payload) => ({ cardNumber: payload.cardNumber, cardName: payload.cardName, expiry: payload.expiry, cvv: payload.cvv, amount: 520.30 })",
    
    successNotification: {
      type: "toast",
      message: "Payment successful! Order placed.",
      background: "#10b981",
      duration: 4000,
    },
    errorNotification: {
      type: "toast",
      message: "Payment failed. Please check your details.",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: false,
    storeResponse: true,
    storeKey: "order",
    onSuccess: ["navigate:/shopzone/order-confirmation"],
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
    
    console.log("\n📝 AUTH PAGES INFO:");
    console.log("   Login: /shopzone/login");
    console.log("   Signup: /shopzone/signup"); 
    console.log("   Forgot Password: /shopzone/forgot");
    console.log("   Using JSONPlaceholder - any email/password works!\n");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    mongoose.disconnect();
  }
};

seed();