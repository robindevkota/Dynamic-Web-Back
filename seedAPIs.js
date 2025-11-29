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
  key: "products.filter",
  name: "Filter Products",
  description: "Filter products with multiple criteria",
  url: "https://fakestoreapi.com/products",
  method: "GET",
  transformPayload: `(function(payload) {
    console.log("=== TRANSFORM_PAYLOAD DEBUG ===");
    console.log("📦 Payload received:", payload);
    
    const baseUrl = "https://fakestoreapi.com/products";
    const params = new URLSearchParams();
    
    if (payload.category && payload.category !== "") {
      console.log("✅ Adding category:", payload.category);
      params.append('category', payload.category);
    }
    if (payload.search && payload.search !== "") {
      console.log("✅ Adding search:", payload.search);
      params.append('title', payload.search);
    }
    if (payload.fromDate) {
      console.log("✅ Adding fromDate:", payload.fromDate);
      params.append('from_date', payload.fromDate);
    }
    if (payload.toDate) {
      console.log("✅ Adding toDate:", payload.toDate);
      params.append('to_date', payload.toDate);
    }
    
    const queryString = params.toString();
    console.log("🔗 Query string built:", queryString);
    
    let finalUrl = baseUrl;
    if (queryString) {
      finalUrl = baseUrl + '?' + queryString;
    }
    
    console.log("🚀 Final URL to return:", finalUrl);
    console.log("=== TRANSFORM_PAYLOAD END ===\\n");
    
    return finalUrl;
  })`,
  successNotification: {
    type: "toast", 
    message: "Filters applied successfully",
    background: "#10b981",
  },
  storeResponse: true,
  storeKey: "products.api_filtered",
},

  
  {
    key: "auth.login",
    name: "User Login",
    description: "Authenticates user and returns JWT token",
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
    closeModalOnSuccess: false,
    storeResponse: true,
    storeKey: "authResponse",
    onSuccess: [
      "setAuth:token=mock-jwt-token-{{$random}}",
      "setAuth:user={{email}}",
      "navigate:/shopzone"
    ],
    onError: ["console:Login failed"],
    onNetworkError: "console:Network error occurred",
    tags: ["auth", "login", "authentication"],
    projectUUID: "global",
  },

  // ✅ FIXED: SIGNUP API - Now sends name, email, and password correctly
  {
    key: "auth.signup",
    name: "User Registration",
    description: "Creates new user account",
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
    closeModalOnSuccess: false,
    storeResponse: true,
    storeKey: "signupResponse",
    onSuccess: ["navigate:/shopzone/login"],
    onError: ["console:Signup failed"],
    onNetworkError: "console:Network error during signup",
    tags: ["auth", "signup", "registration"],
    projectUUID: "global",
  },

  // ✅ FIXED: FORGOT PASSWORD API - Now sends email correctly
  {
    key: "auth.forgot",
    name: "Forgot Password",
    description: "Sends OTP to user email for password reset",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    transformPayload: `
      (payload) => ({
        email: payload.email
      })
    `,
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
    closeModalOnSuccess: false,
    storeResponse: true,
    storeKey: "forgotResponse",
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

  // ✅ CHECKOUT API - Fixed payload structure
  {
    key: "checkout.complete",
    name: "Complete Checkout",
    description: "Processes payment and creates order",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    transformPayload: `
      (payload) => ({
        cardNumber: payload.cardNumber,
        cardName: payload.cardName, 
        expiry: payload.expiry,
        cvv: payload.cvv,
        amount: 520.30,
        items: [
          { id: 1, name: "Wireless Headphones", quantity: 1, price: 199.99 },
          { id: 2, name: "Smart Watch", quantity: 1, price: 259.99 },
          { id: 3, name: "Laptop Stand", quantity: 2, price: 59.99 }
        ]
      })
    `,
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

  // ✅ NEW: GET USER PROFILE
  {
    key: "user.profile",
    name: "Get User Profile", 
    description: "Fetches current user profile data",
    url: "https://jsonplaceholder.typicode.com/users/1",
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    transformPayload: "",
    successNotification: {
      type: "none",
    },
    errorNotification: {
      type: "toast", 
      message: "Failed to load profile",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: false,
    storeResponse: true,
    storeKey: "userProfile",
    onSuccess: ["console:User profile loaded successfully"],
    onError: ["console:Failed to load user profile"],
    onNetworkError: "console:Network error while loading profile", 
    tags: ["user", "profile", "account"],
    projectUUID: "global",
  },

  // ✅ NEW: UPDATE USER PROFILE
  {
    key: "user.update",
    name: "Update User Profile",
    description: "Updates user profile information", 
    url: "https://jsonplaceholder.typicode.com/users/1",
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    transformPayload: `
      (payload) => ({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        address: {
          street: payload.street,
          city: payload.city,
          zipcode: payload.zipcode
        }
      })
    `,
    successNotification: {
      type: "toast",
      message: "Profile updated successfully!",
      background: "#10b981", 
      duration: 3000,
    },
    errorNotification: {
      type: "toast",
      message: "Failed to update profile",
      background: "#ef4444",
      duration: 3000,
    },
    closeModalOnSuccess: false,
    storeResponse: true,
    storeKey: "updatedProfile",
    onSuccess: [
      "setAuth:user={{updatedProfile}}",
      "console:Profile updated successfully"
    ],
    onError: ["console:Failed to update profile"],
    onNetworkError: "console:Network error while updating profile",
    tags: ["user", "profile", "update"],
    projectUUID: "global",
  },
 


 
];

const seed = async () => {
  try {
    await APIConfig.deleteMany({});
    console.log("🗑️  Cleared old API configs");

    await APIConfig.insertMany(apiConfigs);
    console.log("✅ Seeded", apiConfigs.length, "API configurations");
    
    console.log("\n📝 AUTH API PAYLOAD INFO:");
    console.log("   🔐 LOGIN (auth.login):");
    console.log("      Sends: { email: payload.email, password: payload.password }");
    console.log("   👤 SIGNUP (auth.signup):"); 
    console.log("      Sends: { name: payload.name, email: payload.email, password: payload.password, username: ... }");
    console.log("   🔑 FORGOT PASSWORD (auth.forgot):");
    console.log("      Sends: { email: payload.email }");
    console.log("\n💡 Using JSONPlaceholder - any email/password will work!");
    console.log("💡 Form field names must match payload keys (email, password, name, etc.)");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    mongoose.disconnect();
  }
};

seed();