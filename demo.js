const mongoose = require("mongoose");
const PageConfig = require("./models/PageConfig");

mongoose.connect(
  "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const websites = [
  {
    title: "ShopZone - Modern E-commerce",
    slug: "shopzone",
    projectUUID: "ecom-shopzone",
    taskUUID: "ecom001",
    status: "Active",
    accountValidation: true,
    otpValidation: false,
    isAnonymous: false,

    initialization: {
      globalCSS: `
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #1e293b;
  background: #ffffff;
}

/* Fix Navbar Spacing - Prevent Text Cutoff */
nav {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
  flex-wrap: wrap !important;
  padding: 16px 32px !important;
}

nav button {
  white-space: nowrap !important;
  min-width: fit-content !important;
  padding: 8px 16px !important;
  flex-shrink: 0 !important;
}

/* Ensure navbar container has enough space */
header {
  min-height: 70px !important;
  display: flex !important;
  align-items: center !important;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Better Button Styles */
button {
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Better Link Styles */
a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;
}

/* Responsive Typography */
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.2;
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  line-height: 1.3;
}

h3 {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  line-height: 1.4;
}

/* Card Shadows */
.card, article {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover, article:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Better Form Inputs */
input, textarea, select {
  font-family: inherit;
  font-size: inherit;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 12px 16px;
  transition: border-color 0.2s ease;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Responsive Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 2rem;
}

.mb-4 {
  margin-bottom: 2rem;
}
  `,
      resources: [
        "auth.login",
        "auth.signup",
        "auth.forgot",
        "products.api",
        "products.filter",
        "cart.add",
        "cart.get",
        "cart.remove",
        "cart.updateQuantity",
      ],
      // In your demo.js - COMPLETE replacement for all built-in actions
      // Add these to your initialization.actions in demo.js

      actions: {
        navigateToPage: `
    const url = context.actionParams?.url;
    
    if (!url) {
      console.error("❌ No URL provided");
      context.handlers.showNotification({
        message: "Navigation error: No URL specified",
        background: "#ef4444"
      });
      return;
    }
    
    console.log("🧭 Navigating to:", url);
    
    // Resolve templates if needed
    let resolvedUrl = url;
    if (url.includes('{{')) {
      const templateContext = {
        auth: context.handlers.getAuthData(),
        data: context.data,
        form: context.formData,
        modal: context.modalFormData,
      };
      resolvedUrl = context.handlers.resolveTemplate(url, templateContext);
    }
    
    // Navigate
    window.location.href = resolvedUrl;
  `,
        applyDiscount: `
    console.log("🎯 Testing Dynamic Discount Action!");
    
    // Get parameters from actionParams
    const percent = context.actionParams?.percent || 10;
    console.log("💰 Discount percent:", percent);
    
    // Get current cart total from DataStore
    const cartTotal = context.data.cartTotal || 0;
    console.log("🛒 Current cart total:", cartTotal);
    
    // Calculate discount
    const discountAmount = (cartTotal * percent) / 100;
    const newTotal = cartTotal - discountAmount;
    
    console.log("📊 Calculations:", {
      discountAmount,
      newTotal,
      percent
    });
    
    // Update DataStore
    context.handlers.setData('discountAmount', discountAmount);
    context.handlers.setData('discountPercent', percent);
    context.handlers.setData('discountApplied', true);
    
    // Show notification
    context.handlers.showNotification({
      type: "toast",
      message: \`🎉 \${percent}% discount applied! Saved $\${discountAmount.toFixed(2)}\`,
      background: "#10b981",
      duration: 3000,
    });
    
    console.log("✅ Discount action completed successfully!");
    
    return {
      success: true,
      discountAmount,
      newTotal,
      percent
    };
  `,

        // Scroll to element
        scrollToElement: `
    const target = context.actionParams?.target || context.actionParams?.selector;
    
    if (!target) {
      console.error("❌ No scroll target specified");
      return;
    }
    
    console.log("🎯 Scrolling to:", target);
    
    // Handle both ID and selector formats
    const selector = target.startsWith('#') ? target : '#' + target;
    const element = document.querySelector(selector);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
      console.log("✅ Scrolled to element");
    } else {
      console.error("❌ Element not found:", selector);
    }
  `,

        // Smooth scroll to top
        scrollToTop: `
    console.log("⬆️ Scrolling to top");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  `,

        // Open external link
        openLink: `
    const url = context.actionParams?.url;
    const newTab = context.actionParams?.newTab !== false; // default true
    
    if (!url) {
      console.error("❌ No URL provided");
      return;
    }
    
    console.log("🔗 Opening link:", url);
    
    if (newTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  `,

        // Go back in history
        goBack: `
    console.log("↩️ Going back");
    window.history.back();
  `,
        reload: `
    console.log("🔄 Reloading page");
    window.location.reload();
  `,

        // ✅ ADD THIS - Close modal action
        closeModal: `
    console.log("❌ Closing modal");
    context.handlers.setActiveModal(null);
  `,
        // Reload page
        reloadPage: `
    console.log("🔄 Reloading page");
    const force = context.actionParams?.force || false;
    if (force) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  `,

        // Combined actions (execute multiple)
        executeSequence: `
    const actions = context.actionParams?.actions || [];
    
    console.log("🎬 Executing action sequence:", actions.length);
    
    for (const actionItem of actions) {
      if (typeof actionItem === 'string') {
        await context.handlers.handleAction(actionItem, {}, context.payload);
      } else if (actionItem.action) {
        await context.handlers.handleAction(
          actionItem.action, 
          actionItem, 
          context.payload
        );
      }
    }
    
    console.log("✅ Sequence completed");
  `,

        // Conditional action
        conditionalAction: `
    const condition = context.actionParams?.condition;
    const ifTrue = context.actionParams?.ifTrue;
    const ifFalse = context.actionParams?.ifFalse;
    
    if (!condition) {
      console.error("❌ No condition provided");
      return;
    }
    
    // Resolve condition template
    const templateContext = {
      auth: context.handlers.getAuthData(),
      data: context.data,
      form: context.formData,
      modal: context.modalFormData,
    };
    
    const resolved = context.handlers.resolveTemplate(
      condition, 
      templateContext
    );
    
    const shouldExecute = resolved === true || 
                         resolved === 'true' || 
                         resolved === 1;
    
    console.log("🔀 Condition result:", shouldExecute);
    
    if (shouldExecute && ifTrue) {
      await context.handlers.handleAction(ifTrue, {}, context.payload);
    } else if (!shouldExecute && ifFalse) {
      await context.handlers.handleAction(ifFalse, {}, context.payload);
    }
  `,

        // Show/hide element
        toggleElement: `
    const selector = context.actionParams?.selector;
    const show = context.actionParams?.show;
    
    if (!selector) {
      console.error("❌ No selector provided");
      return;
    }
    
    const element = document.querySelector(selector);
    if (!element) {
      console.error("❌ Element not found:", selector);
      return;
    }
    
    if (show !== undefined) {
      element.style.display = show ? 'block' : 'none';
    } else {
      // Toggle
      element.style.display = 
        element.style.display === 'none' ? 'block' : 'none';
    }
  `,

        // Wait/delay
        delay: `
    const ms = context.actionParams?.ms || 1000;
    console.log(\`⏱️ Delaying \${ms}ms\`);
    await new Promise(resolve => setTimeout(resolve, ms));
  `,

        // Log to console
        logDebug: `
    const message = context.actionParams?.message || "Debug log";
    const data = context.actionParams?.data;
    
    console.log("🔍 DEBUG:", message);
    if (data) {
      console.log("📦 Data:", data);
    }
    console.log("📊 Full Context:", {
      actionParams: context.actionParams,
      payload: context.payload,
      formData: context.formData,
      modalFormData: context.modalFormData,
      data: context.data,
    });
  `,
        // In demo.js - Find and REPLACE the loadCartFromLocal action:

        loadCartFromLocal: `
  console.log("📥 Loading cart from localStorage");
  
  try {
    // Get cart from localStorage
    const cartJson = localStorage.getItem("shopzone_cart");
    console.log("📝 Raw cart JSON:", cartJson);
    
    const cart = JSON.parse(cartJson || "[]");
    console.log("📦 Parsed cart:", cart);
    
    // Calculate totals
    const count = cart.length;
    const total = cart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    console.log("📊 Cart stats:", { count, total, items: cart.length });
    
    // ✅ CRITICAL: Update DataStore with HANDLERS
    context.handlers.setData('cartCount', count);
    context.handlers.setData('cartItems', cart);
    context.handlers.setData('cartTotal', total);
    
    console.log("✅ Cart data loaded into DataStore");
    console.log("   - cartCount:", count);
    console.log("   - cartItems length:", cart.length);
    console.log("   - cartTotal:", total);
    
    // Force UI update
    if (context.handlers.setRenderKey) {
      context.handlers.setRenderKey(prev => prev + 1);
    }
    
    return { success: true, cart, count, total };
    
  } catch (error) {
    console.error("❌ Error loading cart:", error);
    
    // Reset on error
    context.handlers.setData('cartCount', 0);
    context.handlers.setData('cartItems', []);
    context.handlers.setData('cartTotal', 0);
    
    return { 
      success: false, 
      error: error.message, 
      cart: [], 
      count: 0, 
      total: 0 
    };
  }
`,

        // ✅ FIXED: Add to Cart
        // In demo.js - Find and REPLACE the storeCartLocally action:

        storeCartLocally: `
  console.log("💾 Storing cart locally - DATASTORE VERSION");
  
  // Get product from DataStore
  const product = context.data?.selectedProduct;
  const quantity = parseInt(context.modalFormData?.quantity) || 1;

  console.log("📦 Product from DataStore:", product);
  console.log("🔢 Quantity:", quantity);

  if (!product || !product.id) {
    console.error("❌ No product in DataStore");
    
    // Show error notification
    context.handlers.showNotification({
      type: "toast",
      message: "❌ Error: Product data not found",
      background: "#ef4444",
      duration: 3000,
    });
    
    return { success: false };
  }

  try {
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
    console.log("🛒 Current cart:", cart);

    // Check if product already exists
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
      // Update quantity
      cart[existingIndex].quantity += quantity;
      console.log(\`📦 Updated: \${product.title} -> qty: \${cart[existingIndex].quantity}\`);
    } else {
      // Add new item
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
        category: product.category,
      });
      console.log(\`🆕 Added: \${product.title}\`);
    }

    // Save to localStorage
    localStorage.setItem("shopzone_cart", JSON.stringify(cart));
    console.log("💾 Saved to localStorage:", cart);

    // Update DataStore
    const newCount = cart.length;
    const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    context.handlers.setData('cartCount', newCount);
    context.handlers.setData('cartItems', cart);
    context.handlers.setData('cartTotal', newTotal);
    
    console.log("✅ DataStore updated:", { 
      cartCount: newCount, 
      cartItems: cart.length + " items",
      cartTotal: newTotal 
    });
    
    // ✅ CRITICAL: Show success notification
    context.handlers.showNotification({
      type: "toast",
      message: \`✅ \${product.title} added to cart!\`,
      background: "#10b981",
      duration: 2500,
    });
    
    console.log("🎉 Notification shown!");
    
    return { success: true, cart, count: newCount, total: newTotal };

  } catch (error) {
    console.error("❌ Error storing cart:", error);
    
    // Show error notification
    context.handlers.showNotification({
      type: "toast",
      message: "❌ Failed to add to cart",
      background: "#ef4444",
      duration: 3000,
    });
    
    return { success: false, error: error.message };
  }
`,

        // ✅ FIXED: Refresh Cart Display
        refreshCartDisplay: `
  console.log("🔄 Refreshing cart display");
  
  try {
    const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
    const count = cart.length;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    console.log("📊 Refreshing with:", { count, items: cart.length, total });
    
    // ✅ FIX: Use handlers
    context.handlers.setData('cartCount', count);
    context.handlers.setData('cartItems', cart);
    context.handlers.setData('cartTotal', total);
    
    console.log("✅ Cart display refreshed in DataStore");
    
  } catch (error) {
    console.error("❌ Error refreshing cart:", error);
  }
`,

        // ✅ FIXED: Refresh Cart (alias)
        refreshCart: `
  console.log("🔄 Refreshing cart data");
  try {
    const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
    const count = cart.length;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    console.log("📊 Cart refresh:", { count, total, items: cart });
    
    // ✅ FIX: Use handlers
    context.handlers.setData('cartCount', count);
    context.handlers.setData('cartItems', cart);
    context.handlers.setData('cartTotal', total);
    
    console.log("✅ Cart refreshed");
    return { success: true, count, items: cart, total };
    
  } catch (error) {
    console.error("❌ Error refreshing cart:", error);
    return { success: false, error: error.message };
  }
`,

        // ✅ FIXED: Remove from Cart
        removeFromCart: `
    console.log("🗑️ Removing from cart");
    
    try {
      const productId = context.actionParams?.productId || context.payload?.id;
      
      if (!productId) {
        console.error("❌ No product ID provided");
        return { success: false };
      }
      
      const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
      const newCart = cart.filter(item => item.id !== productId);
      
      localStorage.setItem("shopzone_cart", JSON.stringify(newCart));
      
      // ✅ FIX: Update DataStore
      const newCount = newCart.length;
      const newTotal = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      context.handlers.setData('cartCount', newCount);
      context.handlers.setData('cartItems', newCart);
      context.handlers.setData('cartTotal', newTotal);
      
      console.log("✅ Item removed, cart updated");
      
      context.handlers.showNotification({
        message: "🗑️ Removed from cart",
        background: "#ef4444"
      });
      
      return { success: true, cart: newCart, count: newCount };
      
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
      return { success: false, error: error.message };
    }
  `,

        // ✅ FIXED: Update Quantity
        updateCartQuantity: `
    console.log("🔢 Updating cart quantity");
    
    try {
      const productId = context.actionParams?.productId || context.payload?.id;
      const newQuantity = parseInt(context.actionParams?.quantity || context.payload?.quantity);
      
      if (!productId || !newQuantity) {
        console.error("❌ Missing productId or quantity");
        return { success: false };
      }
      
      const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
      const itemIndex = cart.findIndex(item => item.id === productId);
      
      if (itemIndex === -1) {
        console.error("❌ Item not found in cart");
        return { success: false };
      }
      
      if (newQuantity <= 0) {
        // Remove item
        cart.splice(itemIndex, 1);
        console.log("🗑️ Quantity 0, removing item");
      } else {
        // Update quantity
        cart[itemIndex].quantity = newQuantity;
        console.log(\`🔢 Updated quantity to \${newQuantity}\`);
      }
      
      localStorage.setItem("shopzone_cart", JSON.stringify(cart));
      
      // ✅ FIX: Update DataStore
      const newCount = cart.length;
      const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      context.handlers.setData('cartCount', newCount);
      context.handlers.setData('cartItems', cart);
      context.handlers.setData('cartTotal', newTotal);
      
      console.log("✅ Quantity updated");
      
      context.handlers.showNotification({
        message: "✅ Cart updated",
        background: "#10b981"
      });
      
      return { success: true, cart, count: newCount };
      
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
      return { success: false, error: error.message };
    }
  `,

        // ✅ FIXED: Clear Cart
        clearCart: `
    console.log("🗑️ Clearing entire cart");
    
    try {
      localStorage.removeItem("shopzone_cart");
      
      // ✅ FIX: Reset DataStore
      context.handlers.setData('cartCount', 0);
      context.handlers.setData('cartItems', []);
      context.handlers.setData('cartTotal', 0);
      
      console.log("✅ Cart cleared");
      
      context.handlers.showNotification({
        message: "🗑️ Cart cleared",
        background: "#64748b"
      });
      
      return { success: true };
      
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
      return { success: false, error: error.message };
    }
  `,
        api: `
    console.log("🚀 === API ACTION START ===");
    const apiKey = context.actionParams?.apiKey;
    const formDataToUse = context.payload || context.modalFormData || context.formData || {};
    
    if (!apiKey) {
      console.error("❌ No apiKey provided");
      context.handlers.showNotification({
        message: "API configuration error: No API key",
        background: "#ef4444"
      });
      return;
    }

    const apiResource = context.config?.resolvedAPIs?.[apiKey];
    if (!apiResource) {
      console.error("❌ API not found:", apiKey);
      context.handlers.showNotification({
        message: \`API '\${apiKey}' not configured\`,
        background: "#ef4444"
      });
      return;
    }

    try {
      await context.handlers.handleApiCall(apiKey, formDataToUse, context.actionConfig);
      console.log("✅ API call completed");
    } catch (error) {
      console.error("❌ API call failed:", error);
    }
  `,
        navigate: `
    const url = context.actionParams?.url;
    
    if (!url) {
      console.error("❌ No URL provided");
      context.handlers.showNotification({
        message: "Navigation error: No URL specified",
        background: "#ef4444"
      });
      return;
    }
    
    console.log("🧭 Navigating to:", url);
    
    // Resolve templates if needed
    let resolvedUrl = url;
    if (url.includes('{{')) {
      const templateContext = {
        auth: context.handlers.getAuthData(),
        data: context.data,
        form: context.formData,
        modal: context.modalFormData,
      };
      resolvedUrl = context.handlers.resolveTemplate(url, templateContext);
    }
    
    // Navigate
    window.location.href = resolvedUrl;
  `,

        setAuthToken: `
    const token = context.actionParams?.token || \`mock-jwt-\${Date.now()}\`;
    context.handlers.setAuthData('token', token);
  `,

        setAuthUser: `
    const email = context.payload?.email || context.actionParams?.email;
    if (email) {
      context.handlers.setAuthData('user', email);
    }
  `,

        // In demo.js - REPLACE your clearAuth action:

        clearAuth: `
  console.log("🚪 Logging out...");
  
  // Clear auth data
  context.handlers.clearAuthData();
  
  // ✅ ADD: Show success notification
  context.handlers.showNotification({
    type: "toast",
    message: "✅ Logged out successfully",
    background: "#10b981",
    duration: 2000,
  });
  
  console.log("✅ Logout complete");
`,
      },
    },

    pages: {
      // 🔹 LOGIN PAGE
      login: {
        title: "Login - ShopZone",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🛍️ ShopZone",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone" },
                  },
                  {
                    label: "Sign Up",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/signup" },
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #f0f0f0",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          sidebar: {
            table: {},
            modal: {},
            uiSchema: {},
            styles: { display: "none" },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              loginForm: {
                "ui:widget": "formContainer",
                "ui:title": "🔐 Welcome Back",
                "ui:description": "Sign in to continue shopping",
                "ui:id": "loginForm",
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "150px auto 0",
                  padding: "40px",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },

                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "you@example.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "Enter your password",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                  },
                ],

                "ui:actions": [
                  {
                    label: "Sign In",
                    action: "api",
                    actionParams: {
                      apiKey: "auth.login", // ✅ FIX: Changed from 'url' to 'apiKey'
                    },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "none",
                    },
                  },
                ],
              },

              authLinks: {
                "ui:widget": "authLinks",
                "ui:alignment": "center",
                "ui:direction": "column",
                "ui:links": [
                  {
                    label: "Forgot Password?",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/forgot-password" },
                  },
                  {
                    prefix: "Don't have an account?",
                    label: "Sign Up",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/signup" },
                  },
                ],
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "20px auto",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "#f8fafc",
              minHeight: "100vh",
            },
            triggers: [],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content": "© 2024 ShopZone. All rights reserved.",
                "ui:styles": { textAlign: "center", color: "#94a3b8" },
              },
            },
            styles: {
              background: "#1e293b",
              padding: "30px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      // 🔹 SIGNUP PAGE
      signup: {
        title: "Sign Up - ShopZone",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🛍️ ShopZone",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone" },
                  },
                  {
                    label: "Login",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/login" },
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #f0f0f0",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          sidebar: {
            table: {},
            modal: {},
            uiSchema: {},
            styles: { display: "none" },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              signupForm: {
                "ui:widget": "formContainer",
                "ui:title": "✨ Create Your Account",
                "ui:description": "Join ShopZone and start shopping today!",
                "ui:id": "signupForm",
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "150px auto 0",
                  padding: "40px",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },

                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Full Name",
                    "ui:placeholder": "John Doe",
                    "ui:type": "text",
                    "ui:name": "name",
                    "ui:required": true,
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "you@example.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "Create a strong password",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Confirm Password",
                    "ui:placeholder": "Re-enter your password",
                    "ui:type": "password",
                    "ui:name": "confirmPassword",
                    "ui:required": true,
                  },
                ],

                "ui:actions": [
                  {
                    label: "Create Account",
                    action: "api",
                    actionParams: { apiKey: "auth.signup" },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "none",
                    },
                  },
                ],
              },

              authLinks: {
                "ui:widget": "authLinks",
                "ui:alignment": "center",
                "ui:links": [
                  {
                    prefix: "Already have an account?",
                    label: "Login",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/login" },
                  },
                ],
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "20px auto",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "#f8fafc",
              minHeight: "100vh",
            },
            triggers: [],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content": "© 2024 ShopZone. All rights reserved.",
                "ui:styles": { textAlign: "center", color: "#94a3b8" },
              },
            },
            styles: {
              background: "#1e293b",
              padding: "30px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      // 🔹 FORGOT PASSWORD PAGE
      "forgot-password": {
        title: "Reset Password - ShopZone",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🛍️ ShopZone",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone" },
                  },
                  {
                    label: "Login",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/login" },
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #f0f0f0",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          sidebar: {
            table: {},
            modal: {},
            uiSchema: {},
            styles: { display: "none" },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              forgotForm: {
                "ui:widget": "formContainer",
                "ui:title": "🔑 Reset Your Password",
                "ui:description":
                  "Enter your email to receive reset instructions",
                "ui:id": "forgotForm",
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "150px auto 0",
                  padding: "40px",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },

                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "you@example.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                  },
                ],

                "ui:actions": [
                  {
                    label: "Send Reset Link",
                    action: "api",
                    actionParams: { apiKey: "auth.forgot" },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "none",
                    },
                  },
                ],
              },

              authLinks: {
                "ui:widget": "authLinks",
                "ui:alignment": "center",
                "ui:links": [
                  {
                    label: "← Back to Login",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/login" },
                  },
                ],
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "20px auto",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "#f8fafc",
              minHeight: "100vh",
            },
            triggers: [],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content": "© 2024 ShopZone. All rights reserved.",
                "ui:styles": { textAlign: "center", color: "#94a3b8" },
              },
            },
            styles: {
              background: "#1e293b",
              padding: "30px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      // 🔹 CART PAGE
      cart: {
        title: "Shopping Cart",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🛍️ ShopZone",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone" },
                  },
                  {
                    label: "Categories",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/categories" },
                  },
                  {
                    label: "🛒 Cart ({{data.cartCount || 0}})",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/cart" },
                  },
                  {
                    label: "{{auth.token ? '' : 'Login'}}",
                    action: "{{auth.token ? '' : 'navigate'}}",
                    actionParams: {
                      url: "{{auth.token ? '' : '/shopzone/login'}}",
                    },
                  },
                  {
                    label:
                      "{{auth.token ? 'Welcome, ' + auth.user.email : ''}}",
                    action: "",
                    actionParams: {},
                  },
                  {
                    label: "{{auth.token ? 'Logout' : ''}}",
                    action: "{{auth.token ? 'clearAuth+reload' : ''}}",
                    actionParams: {},
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #f0f0f0",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          sidebar: {
            table: {},
            modal: {},
            uiSchema: {},
            styles: { display: "none" },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              testDiscountButton: {
                "ui:widget": "button",
                "ui:label": "Apply 10% Discount",
                "ui:action": "applyDiscount",
                "ui:actionParams": { percent: 20 },
                "ui:styles": {
                  background: "#667eea",
                  color: "white",
                  padding: "10px 20px",
                  margin: "10px",
                  borderRadius: "8px",
                },
              },

              pageTitle: {
                "ui:widget": "heading",
                "ui:text": "🛒 Your Shopping Cart",
                "ui:level": "h1",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "50px",
                  marginTop: "40px",
                  fontSize: "2.5rem",
                },
              },

              cartItems: {
                "ui:widget": "cartItemsGrid",
                "ui:dataKey": "cartItems",
                "ui:styles": {
                  padding: "0 40px",
                  maxWidth: "1200px",
                  margin: "0 auto",
                },
              },
              emptyCart: {
                "ui:widget": "conditionalContent",
                "ui:condition":
                  "{{!data.cartItems || data.cartItems.length === 0}}", // ✅ Changed from cart.items
                "ui:content": {
                  "ui:widget": "card",
                  "ui:title": "Your cart is empty",
                  "ui:description": "Start shopping to add items to your cart!",
                  "ui:action": "navigate",
                  "ui:actionParams": { url: "/shopzone/categories" },
                  "ui:buttonLabel": "Browse Products",
                  "ui:styles": {
                    maxWidth: "500px",
                    margin: "50px auto",
                    textAlign: "center",
                    padding: "40px",
                  },
                },
              },

              divider: {
                "ui:widget": "divider",
                "ui:spacing": "large",
                "ui:styles": { maxWidth: "900px", margin: "40px auto" },
              },

              totalCard: {
                "ui:widget": "cartSummary",
                "ui:dataKey": "cartItems",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "0 auto 40px",
                  padding: "30px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: "16px",
                },
              },
            },
            styles: {
              padding: "120px 40px 80px",
              background: "#f8fafc",
              minHeight: "100vh",
            },
            triggers: [
              {
                event: "load",
                action: "loadCartFromLocal",
              },
              {
                event: "load", // ✅ ADD THIS
                source: "products.api", // This will fetch products
              },
            ],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content": "© 2024 ShopZone. All rights reserved.",
                "ui:styles": { textAlign: "center", color: "#94a3b8" },
              },
            },
            styles: {
              background: "#1e293b",
              padding: "40px",
              borderTop: "3px solid #667eea",
            },
            triggers: [],
          },
        },
      },

      // 🔹 CATEGORIES PAGE
      categories: {
        title: "Product Categories",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🛒 ShopZone",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone" },
                  },
                  {
                    label: "Categories",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/categories" },
                  },
                  {
                    label: "🛒 Cart ({{data.cartCount || 0}})",
                    action: "navigateToPage",
                    actionParams: { url: "/shopzone/cart" },
                  },
                  {
                    label: "{{auth.token ? '' : 'Login'}}",
                    action: "{{auth.token ? '' : 'navigate'}}",
                    actionParams: {
                      url: "{{auth.token ? '' : '/shopzone/login'}}",
                    },
                  },
                  {
                    label:
                      "{{auth.token ? 'Welcome, ' + auth.user.email : ''}}",
                    action: "",
                    actionParams: {},
                  },
                  {
                    label: "{{auth.token ? 'Logout' : ''}}",
                    action: "{{auth.token ? 'clearAuth+reload' : ''}}",
                    actionParams: {},
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #f0f0f0",
              padding: "20px 50px",
              position: "sticky",
              top: 0,
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },

          sidebar: {
            table: {},
            modal: {},
            uiSchema: {},
            styles: { display: "none" },
            triggers: [],
          },

          main: {
            table: {},
            modal: {
              productDetail: {
                "ui:title": "Product Details",
                "ui:theme": "light",
                "ui:styles": {
                  maxWidth: "700px",
                  padding: "40px",
                },
                "ui:fields": [
                  {
                    name: "quantity",
                    label: "Quantity",
                    type: "number",
                    placeholder: "1",
                    required: true,
                    min: 1,
                    max: 10,
                  },
                ],
                "ui:actions": [
                  {
                    label: "🛒 Add to Cart",
                    action: "api",
                    actionParams: { apiKey: "cart.add" },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "none",
                      marginTop: "10px",
                    },
                  },
                  {
                    label: "Close",
                    action: "closeModal",
                    variant: "outline",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background: "transparent",
                      color: "#64748b",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "2px solid #e2e8f0",
                    },
                  },
                ],
              },
            },
            uiSchema: {
              hero: {
                "ui:widget": "hero",
                "ui:title": "Shop by Category 🏷️",
                "ui:subtitle":
                  "Discover amazing products across our curated collections",
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  minHeight: "400px",
                },
              },

              spacer1: { "ui:widget": "spacer", "ui:height": 60 },

              filterSection: {
                "ui:widget": "filterWidget",
                "ui:title": "Filter Products",
                "ui:filterOnChange": true,
                "ui:styles": {
                  padding: "30px 40px",
                  marginBottom: "40px",
                  background: "#f8fafc",
                  borderRadius: "12px",
                },
                "ui:fields": [
                  {
                    "ui:widget": "selectField",
                    "ui:name": "category",
                    "ui:label": "Category",
                    "ui:placeholder": "All Categories",
                    "ui:options": [
                      { label: "All Products", value: "" },
                      { label: "Electronics", value: "electronics" },
                      { label: "Jewelery", value: "jewelery" },
                      { label: "Men's Clothing", value: "men's clothing" },
                      { label: "Women's Clothing", value: "women's clothing" },
                    ],
                    "ui:styles": {
                      minWidth: "200px",
                      marginBottom: "0",
                    },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:name": "search",
                    "ui:label": "Search Products",
                    "ui:type": "text",
                    "ui:placeholder": "Search by name...",
                    "ui:styles": {
                      minWidth: "250px",
                      marginBottom: "0",
                    },
                  },
                  {
                    "ui:widget": "dateField",
                    "ui:name": "fromDate",
                    "ui:label": "From Date",
                    "ui:styles": {
                      minWidth: "150px",
                      marginBottom: "0",
                    },
                  },
                  {
                    "ui:widget": "dateField",
                    "ui:name": "toDate",
                    "ui:label": "To Date",
                    "ui:styles": {
                      minWidth: "150px",
                      marginBottom: "0",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Apply Filters",
                    action: "api",
                    actionParams: { apiKey: "products.filter" },
                    variant: "filter",
                    styles: {
                      background: "#667eea",
                      color: "white",
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      minWidth: "120px",
                      height: "44px",
                    },
                  },
                  {
                    label: "Reset",
                    action: "resetForm",
                    variant: "reset",
                    styles: {
                      background: "#e2e8f0",
                      color: "#64748b",
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                      minWidth: "100px",
                      height: "44px",
                    },
                  },
                  {
                    label: "🔄",
                    action: "reload",
                    variant: "refresh",
                    styles: {
                      background: "transparent",
                      border: "2px solid #e2e8f0",
                      borderRadius: "8px",
                      padding: "10px",
                      cursor: "pointer",
                      fontSize: "16px",
                      height: "44px",
                      width: "44px",
                    },
                  },
                ],
              },

              productsHeader: {
                "ui:widget": "heading",
                "ui:level": "h2",
                "ui:text": "All Products 🔥",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "#1f2937",
                  padding: "0 40px",
                },
              },

              productsSubtitle: {
                "ui:widget": "paragraph",
                "ui:text": "Browse our complete collection",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "40px",
                  color: "#6b7280",
                  fontSize: "1.1rem",
                  padding: "0 40px",
                },
              },

              featuredProducts: {
                "ui:widget": "projectGrid",
                "ui:animated": true,
                "ui:onItemClick": "openModal",
                "ui:actionParams": { modal: "productDetail" },
                "ui:dataPath": "products.api_filtered",
                "ui:styles": {
                  padding: "0 40px",
                  marginBottom: "60px",
                },
              },

              spacer2: { "ui:widget": "spacer", "ui:height": 60 },

              categoriesHeader: {
                "ui:widget": "heading",
                "ui:level": "h2",
                "ui:text": "Browse by Category",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "30px",
                  color: "#1f2937",
                  padding: "0 40px",
                },
              },

              categoriesGrid: {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "20px",
                "ui:styles": {
                  padding: "0 40px",
                },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "💻 Electronics",
                    "ui:description": "Latest gadgets, smartphones & tech",
                    "ui:image":
                      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=250&fit=crop",
                    "ui:buttonLabel": "Browse Electronics",
                    "ui:action": "navigate",
                    "ui:actionParams": {
                      url: "/shopzone/categories?filter=electronics",
                    },
                    "ui:styles": { minHeight: "200px" },
                    "ui:imageStyles": { height: "120px", objectFit: "cover" },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "💎 Jewelery",
                    "ui:description": "Beautiful jewelry & accessories",
                    "ui:image":
                      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=250&fit=crop",
                    "ui:buttonLabel": "Browse Jewelery",
                    "ui:action": "navigate",
                    "ui:actionParams": {
                      url: "/shopzone/categories?filter=jewelery",
                    },
                    "ui:styles": { minHeight: "200px" },
                    "ui:imageStyles": { height: "120px", objectFit: "cover" },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "👔 Men's Fashion",
                    "ui:description": "Clothing, shoes & accessories",
                    "ui:image":
                      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&h=250&fit=crop",
                    "ui:buttonLabel": "Browse Men's",
                    "ui:action": "navigate",
                    "ui:actionParams": {
                      url: "/shopzone/categories?filter=men's clothing",
                    },
                    "ui:styles": { minHeight: "200px" },
                    "ui:imageStyles": { height: "120px", objectFit: "cover" },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "👗 Women's Fashion",
                    "ui:description": "Latest trends & styles",
                    "ui:image":
                      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=250&fit=crop",
                    "ui:buttonLabel": "Browse Women's",
                    "ui:action": "navigate",
                    "ui:actionParams": {
                      url: "/shopzone/categories?filter=women's clothing",
                    },
                    "ui:styles": { minHeight: "200px" },
                    "ui:imageStyles": { height: "120px", objectFit: "cover" },
                  },
                ],
              },
            },
            styles: {
              padding: "0",
              background: "#ffffff",
              minHeight: "100vh",
            },
            triggers: [
              {
                event: "load",
                source: "products.api",
              },
              {
                event: "load",
                action: "loadCartFromLocal",
              },
            ],
          },

          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content": "© 2024 ShopZone. All rights reserved.",
                "ui:styles": { textAlign: "center", color: "#94a3b8" },
              },
            },
            styles: {
              background: "#1e293b",
              padding: "40px",
              borderTop: "3px solid #667eea",
            },
            triggers: [],
          },
        },
      },
    },

    components: {
      navbar: {
        table: {},
        modal: {}, // REMOVED ALL MODALS
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🛒 ShopZone",
            "ui:styles": {
              fontSize: "28px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            },
          },

          searchBar: {
            "ui:widget": "inputField",
            "ui:placeholder": "Search products...",
            "ui:type": "text",
            "ui:inputStyles": {
              border: "2px solid #e2e8f0",
              borderRadius: "25px",
              padding: "10px 20px",
              width: "400px",
            },
            "ui:styles": { marginBottom: "0" },
          },

          // ✅ NAV LINKS WITH AUTH CONDITIONAL
          // In demo.js, update the navbar links in the categories page to this:

          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              {
                label: "Home",
                action: "navigateToPage",
                actionParams: { url: "/shopzone" },
              },
              {
                label: "Categories",
                action: "navigateToPage",
                actionParams: { url: "/shopzone/categories" },
              },
              {
                label: "🛒 Cart ({{data.cartCount || 0}})",
                action: "navigateToPage",
                actionParams: { url: "/shopzone/cart" },
              },

              // ✅ Show only when NOT logged in
              {
                label: "Login",
                action: "navigateToPage",
                actionParams: { url: "/shopzone/login" },
                condition: "{{!auth.token}}", // Only show when not authenticated
              },

              // ✅ Show only when logged in
              {
                label: "Welcome, {{auth.user.email}}",
                action: "", // Display only
                condition: "{{auth.token}}", // Only show when authenticated
              },

              // ✅ Show only when logged in
              {
                label: "Logout",
                action: "clearAuth+reload",
                condition: "{{auth.token}}", // Only show when authenticated
              },
            ],
          },
        },
        styles: {
          background: "#ffffff",
          borderBottom: "2px solid #f0f0f0",
          padding: "20px 50px",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
        },
        triggers: [],
      },

      // ... rest of your existing components (sidebar, main, footer) remain exactly the same
      sidebar: {
        table: {},
        modal: {},
        uiSchema: {
          categoriesHeading: {
            "ui:widget": "heading",
            "ui:text": "📂 Categories",
            "ui:level": "h3",
            "ui:styles": { marginBottom: "20px", fontSize: "1.3rem" },
          },
          categoryList: {
            "ui:widget": "list",
            "ui:ordered": false,
            "ui:icon": "›",
            "ui:items": [
              "Electronics",
              "Fashion & Apparel",
              "Home & Living",
              "Sports & Outdoors",
              "Books & Media",
              "Beauty & Health",
            ],
            "ui:itemStyles": {
              cursor: "pointer",
              padding: "12px 0",
              transition: "all 0.2s",
            },
          },

          divider: {
            "ui:widget": "divider",
            "ui:spacing": "large",
          },

          priceHeading: {
            "ui:widget": "heading",
            "ui:text": "💰 Price Range",
            "ui:level": "h3",
            "ui:styles": { marginBottom: "20px", fontSize: "1.3rem" },
          },

          priceFilter: {
            "ui:widget": "checkbox",
            "ui:label": "Under $50",
            "ui:styles": { marginBottom: "12px" },
          },
          priceFilter2: {
            "ui:widget": "checkbox",
            "ui:label": "$50 - $100",
            "ui:styles": { marginBottom: "12px" },
          },
          priceFilter3: {
            "ui:widget": "checkbox",
            "ui:label": "$100 - $200",
            "ui:styles": { marginBottom: "12px" },
          },
          priceFilter4: {
            "ui:widget": "checkbox",
            "ui:label": "Above $200",
            "ui:styles": { marginBottom: "12px" },
          },

          divider2: {
            "ui:widget": "divider",
            "ui:spacing": "large",
          },

          ratingHeading: {
            "ui:widget": "heading",
            "ui:text": "⭐ Rating",
            "ui:level": "h3",
            "ui:styles": { marginBottom: "20px", fontSize: "1.3rem" },
          },

          rating5: {
            "ui:widget": "checkbox",
            "ui:label": "⭐⭐⭐⭐⭐ (5 stars)",
            "ui:styles": { marginBottom: "12px" },
          },
          rating4: {
            "ui:widget": "checkbox",
            "ui:label": "⭐⭐⭐⭐ (4+ stars)",
            "ui:styles": { marginBottom: "12px" },
          },
          rating3: {
            "ui:widget": "checkbox",
            "ui:label": "⭐⭐⭐ (3+ stars)",
            "ui:styles": { marginBottom: "12px" },
          },
        },
        styles: {
          width: "280px",
          background: "#f8fafc",
          padding: "120px 24px 24px",
          minHeight: "100vh",
          borderRight: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
        },
        triggers: [],
      },

      main: {
        table: {},
        modal: {},
        uiSchema: {
          hero: {
            "ui:widget": "hero",
            "ui:title": "Summer Sale 🔥",
            "ui:subtitle":
              "Up to 50% OFF on selected items. Limited time offer!",
            "ui:cta": {
              label: "Shop Now",
              action: "scroll:#products",
            },
            "ui:styles": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              minHeight: "500px",
              padding: "150px 40px 100px",
            },
          },

          spacer1: { "ui:widget": "spacer", "ui:height": 60 },

          featuredHeading: {
            "ui:widget": "heading",
            "ui:text": "✨ Featured Products",
            "ui:level": "h2",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "50px",
              fontSize: "2.5rem",
            },
          },

          productsGrid: {
            "ui:widget": "projectGrid",
            "ui:animated": true,
          },

          spacer2: { "ui:widget": "spacer", "ui:height": 80 },

          dealSection: {
            "ui:widget": "card",
            "ui:title": "⚡ Deal of the Day",
            "ui:description":
              "Premium Wireless Earbuds - Now at $79.99 (was $149.99). Hurry, only 12 left in stock!",
            "ui:image":
              "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=400&fit=crop",
            "ui:action": "navigate:/shopzone/login",
            "ui:buttonLabel": "Grab This Deal",
            "ui:styles": {
              maxWidth: "900px",
              margin: "0 auto",
              padding: "40px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              border: "none",
            },
          },

          spacer3: { "ui:widget": "spacer", "ui:height": 60 },

          testimonialsHeading: {
            "ui:widget": "heading",
            "ui:text": "💬 Customer Reviews",
            "ui:level": "h2",
            "ui:styles": { textAlign: "center", marginBottom: "50px" },
          },

          testimonial1: {
            "ui:widget": "testimonial",
            "ui:quote":
              "Amazing quality and fast shipping! Will definitely order again.",
            "ui:author": "Sarah Johnson",
            "ui:role": "Verified Buyer",
            "ui:avatar": "https://i.pravatar.cc/100?img=1",
            "ui:rating": 5,
            "ui:styles": { maxWidth: "600px", margin: "0 auto 30px" },
          },

          testimonial2: {
            "ui:widget": "testimonial",
            "ui:quote":
              "Best online shopping experience ever. Highly recommend ShopZone!",
            "ui:author": "Michael Chen",
            "ui:role": "Verified Buyer",
            "ui:avatar": "https://i.pravatar.cc/100?img=3",
            "ui:rating": 5,
            "ui:styles": { maxWidth: "600px", margin: "0 auto 30px" },
          },
        },
        styles: {
          padding: "100px 40px 80px",
          background: "#ffffff",
          flex: 1,
          minHeight: "100vh",
        },
        triggers: [
          { event: "load", action: "fetchProducts", source: "products.api" },
        ],
      },

      footer: {
        table: {},
        modal: {},
        uiSchema: {
          footerHeading: {
            "ui:widget": "heading",
            "ui:text": "🛍️ ShopZone",
            "ui:level": "h3",
            "ui:styles": {
              textAlign: "center",
              color: "#e2e8f0",
              marginBottom: "20px",
            },
          },
          footerDesc: {
            "ui:widget": "paragraph",
            "ui:text":
              "Your one-stop destination for quality products at unbeatable prices. Shop with confidence!",
            "ui:styles": {
              textAlign: "center",
              color: "#94a3b8",
              maxWidth: "600px",
              margin: "0 auto 30px",
            },
          },

          quickLinksHeading: {
            "ui:widget": "heading",
            "ui:text": "Quick Links",
            "ui:level": "h4",
            "ui:styles": {
              textAlign: "center",
              color: "#cbd5e1",
              marginBottom: "15px",
              fontSize: "1.1rem",
            },
          },

          quickLinks: {
            "ui:widget": "list",
            "ui:ordered": false,
            "ui:icon": "→",
            "ui:items": [
              "Track Order",
              "Return Policy",
              "Privacy Policy",
              "Terms & Conditions",
              "Contact Support",
            ],
            "ui:styles": {
              maxWidth: "300px",
              margin: "0 auto 30px",
            },
            "ui:itemStyles": {
              color: "#94a3b8",
              textAlign: "center",
              justifyContent: "center",
            },
          },

          socialIcons: {
            "ui:widget": "socialIcons",
            "ui:size": "medium",
            "ui:variant": "colored",
            "ui:icons": [
              {
                emoji: "📘",
                platform: "facebook",
                url: "https://facebook.com/shopzone",
              },
              {
                emoji: "🐦",
                platform: "twitter",
                url: "https://twitter.com/shopzone",
              },
              {
                emoji: "📷",
                platform: "instagram",
                url: "https://instagram.com/shopzone",
              },
              {
                emoji: "💼",
                platform: "linkedin",
                url: "https://linkedin.com/company/shopzone",
              },
            ],
          },

          divider: {
            "ui:widget": "divider",
            "ui:variant": "solid",
            "ui:color": "#475569",
            "ui:spacing": "large",
          },

          footerText: {
            "ui:widget": "text",
            "ui:content": "© 2024 ShopZone. All rights reserved. Made with ❤️",
            "ui:styles": {
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "14px",
            },
          },
        },
        styles: {
          background: "#1e293b",
          padding: "60px 40px 40px",
          borderTop: "3px solid #667eea",
        },
        triggers: [],
      },
    },
  },
];

const seed = async () => {
  try {
    await PageConfig.deleteMany({});
    console.log("🗑️  Cleared old data");

    await PageConfig.insertMany(websites);
    console.log("✅ Seeded", websites.length, "websites");

    mongoose.disconnect();
    console.log("📡 Database disconnected");
  } catch (err) {
    console.error("❌ Seed failed:", err);
    mongoose.disconnect();
  }
};

seed();
