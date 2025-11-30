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

// In your seedAPIs.js, REPLACE the auth.login config with this:

{
  key: "auth.login",
  name: "User Login",
  isActive: true,
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
  
  // ✅ FIX: Proper array of objects format
  onSuccess: [
    {
      action: "setAuthToken",
      actionParams: { token: "mock-jwt-token-12345" }
    },
    {
      action: "setAuthUser",
      actionParams: {}
    },
    {
      action: "navigate",
      actionParams: { url: "/shopzone" }
    }
  ],
  
  onError: [{ action: "console", actionParams: { message: "Login failed" } }],
  onNetworkError: { action: "console", actionParams: { message: "Network error occurred" } },
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
 

// Add these to your apiConfigs array in seedAPIs.js

{
  key: "cart.get",
  name: "Get Cart Items",
  description: "Fetches current cart items from localStorage",
  url: "local://cart", // Special URL for local operations
  method: "GET",
  transformPayload: `
    (payload) => {
      // Return cart from localStorage
      try {
        const cart = JSON.parse(localStorage.getItem('shopzone_cart') || '[]');
        console.log('📦 Cart loaded:', cart);
        return { data: cart, count: cart.length };
      } catch (e) {
        console.error('Error loading cart:', e);
        return { data: [], count: 0 };
      }
    }
  `,
  successNotification: { type: "none" },
  storeResponse: true,
  storeKey: "cart",
  tags: ["cart", "ecommerce"],
  projectUUID: "global",
},

{
  key: "cart.add",
  name: "Add to Cart",
  description: "Adds product to shopping cart via API",
  url: "https://fakestoreapi.com/carts",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  transformPayload: `
    (payload) => {
      console.log("🛒 Adding to cart via API:", payload);
      
      const product = payload.selectedProduct || payload;
      
      return {
        userId: 1,
        date: new Date().toISOString(),
        products: [
          {
            productId: product.id,
            quantity: parseInt(payload.quantity) || 1
          }
        ]
      };
    }
  `,
  successNotification: {
    type: "toast",
    message: "✅ Added to cart!",
    background: "#10b981",
    duration: 2000,
  },
  errorNotification: {
    type: "toast",
    message: "❌ Failed to add to cart",
    background: "#ef4444",
    duration: 3000,
  },
  storeResponse: true,
  storeKey: "cartAddResponse",
  // ✅ After API success, store locally too
  onSuccess: [
    "storeCartLocally", // Custom action we'll handle
    "closeModal"
  ],
  tags: ["cart", "ecommerce"],
  projectUUID: "global",
},


{
  key: "cart.remove",
  name: "Remove from Cart",
  description: "Removes item from cart",
  url: "local://cart/remove",
  method: "DELETE",
  transformPayload: `
    (payload) => {
      console.log("🗑️ Removing from cart:", payload);
      
      try {
        const cart = JSON.parse(localStorage.getItem('shopzone_cart') || '[]');
        const productId = payload.productId || payload.id;
        
        // Filter out the item
        const newCart = cart.filter(item => item.id !== productId);
        
        // Save to localStorage
        localStorage.setItem('shopzone_cart', JSON.stringify(newCart));
        localStorage.setItem('shopzone_cart_count', newCart.length.toString());
        
        console.log('✅ Item removed, new cart:', newCart);
        
        return {
          success: true,
          cart: newCart,
          count: newCart.length
        };
      } catch (e) {
        console.error('❌ Error removing from cart:', e);
        return { success: false, error: e.message };
      }
    }
  `,
  successNotification: {
    type: "toast",
    message: "🗑️ Removed from cart",
    background: "#ef4444",
    duration: 2000,
  },
  storeResponse: true,
  storeKey: "cartResponse",
  onSuccess: [
    "setData:cart.count={{cartResponse.count}}",
    "setData:cart.items={{cartResponse.cart}}",
    "triggerRefresh:cartItems"
  ],
  tags: ["cart", "ecommerce"],
  projectUUID: "global",
},

{
  key: "cart.updateQuantity",
  name: "Update Cart Quantity",
  description: "Updates item quantity in cart",
  url: "local://cart/update",
  method: "PATCH",
  transformPayload: `
    (payload) => {
      console.log("🔢 Updating quantity:", payload);
      
      try {
        const cart = JSON.parse(localStorage.getItem('shopzone_cart') || '[]');
        const productId = payload.productId || payload.id;
        const newQuantity = parseInt(payload.quantity);
        
        // Find and update item
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
          if (newQuantity <= 0) {
            // Remove if quantity is 0
            cart.splice(itemIndex, 1);
          } else {
            cart[itemIndex].quantity = newQuantity;
          }
          
          localStorage.setItem('shopzone_cart', JSON.stringify(cart));
          localStorage.setItem('shopzone_cart_count', cart.length.toString());
          
          return {
            success: true,
            cart: cart,
            count: cart.length
          };
        }
        
        return { success: false, error: 'Item not found' };
      } catch (e) {
        console.error('❌ Error updating quantity:', e);
        return { success: false, error: e.message };
      }
    }
  `,
  successNotification: {
    type: "toast",
    message: "✅ Quantity updated",
    background: "#10b981",
    duration: 1500,
  },
  storeResponse: true,
  storeKey: "cartResponse",
  onSuccess: [
    "setData:cart.items={{cartResponse.cart}}",
    "setData:cart.count={{cartResponse.count}}"
  ],
  tags: ["cart", "ecommerce"],
  projectUUID: "global",
}
 
];

const seed = async () => {
  try {
    await APIConfig.deleteMany({});
    console.log("🗑️  Cleared old API configs");

    // ✅ FIX: Add isActive: true to ALL configs automatically
    const configsWithActive = apiConfigs.map(config => ({
      ...config,
      isActive: true
    }));

    await APIConfig.insertMany(configsWithActive);
    console.log("✅ Seeded", configsWithActive.length, "API configurations");
    
    // ✅ Verify they were saved with isActive
    const activeCount = await APIConfig.countDocuments({ isActive: true });
    console.log(`✅ Active APIs in database: ${activeCount}`);
    
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