// backend/seeds/globalEndUserAuthResources.js

const mongoose = require('mongoose');
const APIConfig = require('./models/APIConfig'); // ✅ Fixed path

const GLOBAL_ORG_ID = "000000000000000000000001";

const globalEndUserAuthResources = [
 {
  key: "global.enduser.signup",
  name: "End User Signup",
  description: "Signup for client website users",
  type: "global",
  url: "http://localhost:5000/api/enduser-auth/signup",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  
  // ✅ UPDATED: Extract websiteSlug from current URL
  transformPayload: `
    (payload) => {
      console.log('🔄 Signup Transform - Input:', payload);
      
      // ✅ Extract websiteSlug from current URL path
      const currentPath = window.location.pathname;
      const websiteSlug = currentPath.split('/').filter(Boolean)[0]; // "hotelhub"
      
      console.log('🌐 Detected websiteSlug:', websiteSlug);
      
      const transformed = {
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName || payload.name || '',
        lastName: payload.lastName || '',
        organizationId: '696fd6f8a216cc192d63b84a', // Your real org ID
        websiteSlug: websiteSlug || 'hotelhub' // ✅ ADD THIS
      };
      
      console.log('✅ Transformed payload:', transformed);
      return transformed;
    }
  `,
  
  successNotification: {
    type: "toast",
    message: "✅ Account created! Please check your email to verify.",
    background: "#10b981",
    duration: 4000
  },
  
  errorNotification: {
    type: "toast",
    message: "❌ Signup failed. Please try again.",
    background: "#ef4444",
    duration: 3000
  },
  
  onSuccess: [],
  
  organizationId: GLOBAL_ORG_ID,
  category: "Authentication",
  tags: ["global", "enduser", "auth", "signup"],
  isActive: true,
  authRequired: false
},
  
  {
    key: "global.enduser.login",
    name: "End User Login",
    description: "Login for client website users",
    type: "global",
    url: "http://localhost:5000/api/enduser-auth/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    
    successNotification: {
      type: "toast",
      message: "✅ Welcome back!",
      background: "#10b981",
      duration: 2000
    },
    
    errorNotification: {
      type: "toast",
      message: "❌ Invalid email or password",
      background: "#ef4444",
      duration: 3000
    },
    
    onSuccess: ["handleLoginSuccess"],
    
    organizationId: GLOBAL_ORG_ID,
    category: "Authentication",
    tags: ["global", "enduser", "auth", "login"],
    isActive: true,
    authRequired: false
  },
  
  {
    key: "global.enduser.logout",
    name: "End User Logout",
    description: "Logout for client website users",
    type: "global",
    url: "http://localhost:5000/api/enduser-auth/logout",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    
    successNotification: {
      type: "toast",
      message: "✅ Logged out successfully",
      background: "#10b981",
      duration: 2000
    },
    
    onSuccess: ["clearAuth", "reload"],
    
    organizationId: GLOBAL_ORG_ID,
    category: "Authentication",
    tags: ["global", "enduser", "auth", "logout"],
    isActive: true,
    authRequired: true
  },
  
  {
    key: "global.enduser.forgotPassword",
    name: "End User Forgot Password",
    description: "Send password reset email",
    type: "global",
    url: "http://localhost:5000/api/enduser-auth/forgot-password",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    
    successNotification: {
      type: "toast",
      message: "✅ If that email exists, a reset link has been sent",
      background: "#10b981",
      duration: 4000
    },
    
    errorNotification: {
      type: "toast",
      message: "❌ Failed to send reset email",
      background: "#ef4444",
      duration: 3000
    },
    
    onSuccess: [],
    
    organizationId: GLOBAL_ORG_ID,
    category: "Authentication",
    tags: ["global", "enduser", "auth", "password"],
    isActive: true,
    authRequired: false
  },
  
  {
    key: "global.enduser.resetPassword",
    name: "End User Reset Password",
    description: "Reset password with token",
    type: "global",
    url: "http://localhost:5000/api/enduser-auth/reset-password",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    
    successNotification: {
      type: "toast",
      message: "✅ Password reset successfully! Please login.",
      background: "#10b981",
      duration: 3000
    },
    
    errorNotification: {
      type: "toast",
      message: "❌ Invalid or expired reset token",
      background: "#ef4444",
      duration: 3000
    },
    
    onSuccess: [],
    
    organizationId: GLOBAL_ORG_ID,
    category: "Authentication",
    tags: ["global", "enduser", "auth", "password"],
    isActive: true,
    authRequired: false
  },
  
  {
    key: "global.enduser.verifyEmail",
    name: "End User Verify Email",
    description: "Verify user email with token",
    type: "global",
    url: "http://localhost:5000/api/enduser-auth/verify-email",
    method: "GET",
    
    transformPayload: `
      (payload) => {
        const token = new URLSearchParams(window.location.search).get('token');
        return payload.url + '?token=' + token;
      }
    `,
    
    successNotification: {
      type: "toast",
      message: "✅ Email verified! You can now login.",
      background: "#10b981",
      duration: 3000
    },
    
    errorNotification: {
      type: "toast",
      message: "❌ Invalid or expired verification link",
      background: "#ef4444",
      duration: 3000
    },
    
    onSuccess: [],
    
    organizationId: GLOBAL_ORG_ID,
    category: "Authentication",
    tags: ["global", "enduser", "auth", "verification"],
    isActive: true,
    authRequired: false
  }
];

// ═══════════════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════════════
async function seedGlobalEndUserAuth() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 
      "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/",
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
      }
    );
    
    console.log("\n👤 === SEEDING GLOBAL END USER AUTH RESOURCES ===\n");
    
    // Delete old ones
    await APIConfig.deleteMany({ 
      key: { $in: globalEndUserAuthResources.map(r => r.key) } 
    });
    console.log('🗑️  Cleared old auth resources\n');
    
    // Insert new ones
    for (const resource of globalEndUserAuthResources) {
      const created = await APIConfig.create(resource);
      console.log(`✅ ${created.key}`);
    }
    
    console.log("\n✅ All global end user auth resources seeded!\n");
    console.log("📋 Resources:");
    globalEndUserAuthResources.forEach(r => {
      console.log(`   - ${r.key}`);
    });
    console.log("\n🏢 Using Organization ID: 696fd6f8a216cc192d63b84a");
    console.log("🔗 API Endpoint: /api/enduser-auth/*\n");
    
    await mongoose.disconnect();
    console.log("✅ Database disconnected\n");
    
  } catch (error) {
    console.error("❌ Error seeding:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run if called directl
if (require.main === module) {
  seedGlobalEndUserAuth();
}

module.exports = { seedGlobalEndUserAuth, globalEndUserAuthResources };