const mongoose = require("mongoose");
const PageConfig = require("./models/PageConfig");

mongoose.connect(
  "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
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
      globalCSS: `@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
      @keyframes flashIn {
  0%   { transform: translateX(-50%) translateY(-120px); opacity: 0; }
  100% { transform: translateX(-50%) translateY(0); opacity: 1; }
}

@keyframes flashOut {
  0%   { transform: translateX(-50%) translateY(0); opacity: 1; }
  100% { transform: translateX(-50%) translateY(-100px); opacity: 0; }
}
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
        // Auto-hide any element after X ms
        hideAfter: `
  const delay = context.actionParams?.delay || 3000;
  setTimeout(() => {
    const el = context.element;
    if (el && el.parentNode) {
      el.style.transition = "all 0.6s ease-out";
      el.style.opacity = "0";
      el.style.transform = "translateX(-50%) translateY(-100px)";
      setTimeout(() => el.remove(), 600);
    }
  }, delay);
`,
        validateThenApi: `
  console.log("✅ Validating form before API call");
  
  // Get fields from actionParams
  const fields = context.actionParams?.fields || [];
  const formData = context.formData || {};
  const apiKey = context.actionParams?.apiKey;
  
  console.log("📋 Fields to validate:", fields);
  console.log("📦 Form data:", formData);
  
  if (!fields || fields.length === 0) {
    console.warn("⚠️ No fields provided for validation");
    // Skip validation, just call API
    return await context.handlers.handleApiCall(apiKey, formData);
  }
  
  // ✅ Validate fields
  const { isValid, errors } = context.handlers.validateAllFields(fields, formData);
  
  if (!isValid) {
    console.error("❌ Validation failed:", errors);
    
    // ✅ Set field-level errors in DataStore (for UI display)
    context.handlers.setFieldErrors(errors);
    
    // ✅ Show notification with FIRST error only
    const firstError = Object.values(errors)[0];
    context.handlers.showNotification({
      type: "toast",
      message: firstError,
      background: "#ef4444",
      duration: 3000,
    });
    
    return { success: false, errors };
  }
  
  console.log("✅ Validation passed, calling API");
  
  // ✅ Clear any previous errors
  context.handlers.setFieldErrors({});
  
  // Call the actual API
  return await context.handlers.handleApiCall(apiKey, formData);
`,
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

        // Add these two actions to your initialization.actions object

        "api:cart.remove": `
  console.log("api:cart.remove triggered", context.payload);
  
  // Call the actual API
  await context.handlers.handleApiCall("cart.remove", context.payload);
`,

        "api:cart.updateQuantity": `
  console.log("api:cart.updateQuantity triggered", context.payload);
  
  // Call the actual API
  await context.handlers.handleApiCall("cart.updateQuantity", context.payload);
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
                    validation: {
                      required: true,
                      requiredMessage: "Email is required to continue",
                      email: true,
                      emailMessage: "Please enter a valid email address",
                    },
                    "ui:errorStyles": {
                      color: "#dc2626",
                      fontWeight: "600",
                    },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "Enter your password",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                    validation: {
                      required: true,
                      requiredMessage: "🔒 Password is required",
                      minLength: 6,
                      minLengthMessage:
                        "🔒 Password must be at least 6 characters",
                    },
                  },
                ],

                "ui:actions": [
                  {
                    label: "Sign In",
                    action: "validateThenApi",
                    actionParams: {
                      apiKey: "auth.login",
                      fields: [
                        {
                          name: "email",
                          label: "Email",
                          validation: {
                            required: true,
                            requiredMessage: "🌿 Email is required to continue",
                            email: true,
                            emailMessage:
                              "🌿 Please enter a valid email address",
                          },
                        },
                        {
                          name: "password",
                          label: "Password",
                          validation: {
                            required: true,
                            requiredMessage: "🔒 Password is required",
                            minLength: 6,
                            minLengthMessage:
                              "🔒 Password must be at least 6 characters",
                          },
                        },
                      ], // ✅ FIX: Changed from 'url' to 'apiKey'
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
            modal: {},
            uiSchema: {
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
                "ui:dataKey": "cart.get",
                "ui:styles": {
                  padding: "0 40px",
                  maxWidth: "1200px",
                  margin: "0 auto",
                },
              },

              divider: {
                "ui:widget": "divider",
                "ui:spacing": "large",
                "ui:styles": { maxWidth: "900px", margin: "40px auto" },
              },
            },
            styles: {
              padding: "120px 40px 80px",
              background: "#f8fafc",
              minHeight: "100vh",
            },
            triggers: [
              {
                event: "load", // ✅ ADD THIS
                source: "cart.get", // This will fetch products
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
      dashboard: {
        title: "Admin Dashboard",
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

              testTable: {
                "ui:widget": "dataTable",
                "ui:title": "Products List",
                "ui:id": "productsTable",
                "ui:description": "Manage your products",
                "ui:emptyText": "No products found",
                "ui:dataSource": "products.api_filtered",
                "ui:pagination": {
                  enabled: true,
                  pageSize: 3,
                },
                "ui:columns": [
                  {
                    key: "id",
                    title: "ID",
                    dataIndex: "id",
                    width: "80px",
                  },
                  {
                    key: "name",
                    title: "Product Name",
                    dataIndex: "title",
                  },
                  {
                    key: "price",
                    title: "Price",
                    dataIndex: "price",
                    align: "right",
                  },
                  {
                    key: "status",
                    title: "Status",
                    dataIndex: "status",
                  },
                  {
                    key: "actions",
                    title: "Actions",
                    type: "actions",
                    align: "center",
                    actions: [
                      {
                        label: "View",
                        action: "openModal:productDetail", // ✅ Fixed modal name
                        variant: "secondary",
                        condition:
                          "function(row) { return row.status === 'active'; }",
                      },
                      {
                        label: "Edit",
                        action: "openModal:productDetail", // This opens same modal
                        variant: "primary",
                        condition: "function(row) { return row.id > 0; }",
                        actionParams: {
                          // Optional: add params to differentiate
                          mode: "edit",
                        },
                      },
                      {
                        label: "Delete",
                        action: "api:deleteProduct",
                        variant: "danger",
                        condition:
                          "function(row) { return row.status !== 'archived'; }",
                        confirm: true,
                        confirmMessage:
                          "Are you sure you want to delete this product?",
                      },
                    ],
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

              // ✅ Show only when logged in
              {
                label: "{{auth.token ? '👤 ' + auth.user?.email : 'Login'}}",
                action: "{{auth.token ? '' : 'navigateToPage'}}",
                actionParams: { url: "/shopzone/login" },
                // Only show when authenticated
              },

              {
                label: "{{auth.token ? 'Logout' : ''}}",
                action: "{{auth.token ? 'clearAuth+reload' : ''}}",
              },
            ],
          },
          notificationsDropdown: {
            "ui:widget": "dropdown",
            "ui:label": "🔔",
            "ui:icon": "", // Remove default icon since we're using emoji
            "ui:position": "bottom-right",
            "ui:width": "320px",
            "ui:styles": {
              marginLeft: "12px", // ✅ Space from previous nav items
              marginRight: "0", // No space on right edge
            },
            "ui:buttonStyles": {
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              border: "2px solid #e2e8f0",
              background: "white",
            },
            "ui:items": [
              {
                type: "header",
                label: "Notifications",
              },
              {
                icon: "📦",
                label: "Your order has shipped",
                action: "navigateToPage",
                actionParams: { url: "/shopzone/order/123" },
              },
              {
                icon: "💰",
                label: "New discount available",
                badge: "New",
                action: "navigateToPage",
                actionParams: { url: "/shopzone/deals" },
              },
              {
                type: "divider",
              },
              {
                label: "View All Notifications",
                action: "navigateToPage",
                actionParams: { url: "/shopzone/notifications" },
              },
            ],
          },

          // ✅ Language Selector
          languageDropdown: {
            "ui:widget": "dropdown",
            "ui:label": "🌐 English",
            "ui:position": "bottom-right",
            "ui:width": "200px",
            "ui:styles": {
              marginLeft: "12px",
            },
            "ui:buttonStyles": {
              padding: "10px 16px",
              borderRadius: "8px",
            },
            "ui:items": [
              {
                icon: "🇺🇸",
                label: "English",
                action: "setLanguage",
                actionParams: { lang: "en" },
              },
              {
                icon: "🇪🇸",
                label: "Español",
                action: "setLanguage",
                actionParams: { lang: "es" },
              },
              {
                icon: "🇫🇷",
                label: "Français",
                action: "setLanguage",
                actionParams: { lang: "fr" },
              },
            ],
          },
        },
        styles: {
          background: "#ffffff",
          borderBottom: "2px solid #f0f0f0",
          marginTop: 40,
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
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:iconStyles": {
              transition: "all 0.3s ease",
              color: "#64748b",
            },
            "ui:linkStyles": {
              transition: "all 0.3s ease",
              borderRadius: "8px",
              padding: "10px 12px",
            },
            "ui:hoverStyles": {
              background: "rgba(102, 126, 234, 0.08)",
            },
            "ui:links": [
              {
                label: "Home",
                action: "navigate:/devfolio",
                fontAwesome: "fas fa-home",
                iconHoverStyles: {
                  color: "#667eea",
                  transform: "scale(1.2)",
                },
              },
              {
                label: "About",
                action: "openModal:aboutModal",
                fontAwesome: "fas fa-user",
                iconHoverStyles: {
                  color: "#764ba2",
                  transform: "scale(1.2)",
                },
              },
              {
                label: "Projects",
                action: "openModal:projectsModal",
                fontAwesome: "fas fa-briefcase",
                iconHoverStyles: {
                  color: "#f093fb",
                  transform: "scale(1.2)",
                },
              },
              {
                label: "Dashboard",
                action: "navigateToPage",
                actionParams: { url: "shopzone/dashboard" },
                fontAwesome:
                  "{{auth.token ? 'fas fa-tachometer-alt' : 'fas fa-sign-in-alt'}}",
                iconHoverStyles: {
                  transform: "scale(1.2)",
                  color: "{{auth.token ? '#10b981' : '#6366f1'}}",
                },
              },
              {
                label: "{{auth.token ? 'Logout' : ''}}",
                action: "clearAuth+reload",
                fontAwesome: "{{auth.token ? 'fas fa-sign-out-alt' : ''}}",
                iconHoverStyles: {
                  color: "#ef4444",
                  transform: "scale(1.2)",
                },
              },
            ],
          },
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
          padding: "12px 24px 24px",
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
          welcomeFlash: {
            "ui:widget": "card",
            "ui:title": "Added to cart!",
            "ui:description": "Monstera Deliciosa × 1",
            "ui:styles": {
              position: "fixed",
              top: "30%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              background: "#10b981",
              color: "white",
              padding: "20px 48px",
              borderRadius: "16px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              textAlign: "center",
              fontWeight: "600",
              minWidth: "320px",
              animation: "flashIn 0.5s ease-out, flashOut 0.8s 3.2s forwards",
              pointerEvents: "none",
            },
            "ui:triggers": [
              {
                event: "load",
                action: "noop",
              },
            ],
          },
          hero: {
            "ui:widget": "hero",
            "ui:title": "Summer Sale",
            "ui:subtitle":
              "Up to 50% OFF on selected items. Limited time offer!",
            "ui:cta": {
              label: "Shop Now",
              action: "scroll:#products",
            },
            "ui:styles": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              minHeight: "520px",
              height: "auto",
              width: "100vw",
              position: "relative",
              left: "50%",
              right: "50%",
              marginLeft: "-50vw",
              marginRight: "-50vw",
              padding: "140px 20px 80px",
              textAlign: "center",
              color: "white",
              boxSizing: "border-box",
              overflow: "hidden",
            },
            "ui:titleStyles": {
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontWeight: "800",
              marginBottom: "16px",
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
            },
            "ui:subtitleStyles": {
              fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
              marginBottom: "32px",
              opacity: "0.95",
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
          padding: "0",
          margin: "0",
          background: "#ffffff",
          flex: 1,
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
        },
        triggers: [
          { event: "load", action: "fetchProducts", source: "products.api" },
          {
            event: "load",
            action: "hideAfter",
            actionParams: { delay: 3500 },
          },
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
  {
    title: "GreenHaven - Premium Plant Store",
    slug: "greenhaven",
    projectUUID: "plantstore-greenhaven",
    taskUUID: "plant001",
    status: "Active",
    accountValidation: true,
    otpValidation: false,
    isAnonymous: false,

    initialization: {
      globalCSS: `
/* Font Awesome CDN */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

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
  color: #2d4a3a;
  background: #f8fdf9;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Better Button Styles */
button {
  cursor: pointer;
  transition: all 0.4s ease;
  border: none;
  outline: none;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Better Link Styles */
a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
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

/* Card Styles with Plant Theme */
.card, article {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  border-radius: 16px;
  overflow: hidden;
  background: white;
}

.card:hover, article:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  transform: translateY(-8px) scale(1.02);
}

/* Better Form Inputs */
input, textarea, select {
  font-family: inherit;
  font-size: inherit;
  border: 2px solid #c8e6c9;
  border-radius: 12px;
  padding: 14px 18px;
  transition: all 0.3s ease;
  background: white;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

/* Responsive Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes leafShake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  75% { transform: rotate(-2deg); }
}

@keyframes grow {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-leaf {
  animation: leafShake 4s ease-in-out infinite;
}

.animate-grow {
  animation: grow 0.6s ease-out;
}

/* Utility Classes */
.text-center { text-align: center; }
.mt-4 { margin-top: 2rem; }
.mb-4 { margin-bottom: 2rem; }
.p-4 { padding: 2rem; }

/* Plant Store Specific Styles */
.plant-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 2px solid #e8f5e9;
}

.plant-card:hover {
  border-color: #4caf50;
  transform: translateY(-10px) scale(1.03);
}

.price-tag {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.1rem;
}

.category-badge {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
}

.plant-grid {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Table Styles */
.plant-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.plant-table th,
.plant-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #e8f5e9;
}

.plant-table th {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  color: white;
  font-weight: 600;
}

.plant-table tr:hover {
  background: #f1f8e9;
  transform: scale(1.01);
  transition: all 0.3s ease;
}

/* Care Level Badges */
.care-easy { background: #e8f5e9; color: #2e7d32; }
.care-medium { background: #fff3e0; color: #ef6c00; }
.care-hard { background: #ffebee; color: #c62828; }
    `,
      resources: [
        "auth.login",
        "auth.signup",
        "auth.forgot",
        "plants.api",
        "cart.api",
      ],

      // ✅ ADD ACTIONS FROM YOUR DEMO.JS
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
        validateThenApi: `
  console.log("✅ Validating form before API call");
  
  // Get fields from actionParams
  const fields = context.actionParams?.fields || [];
  const formData = context.formData || {};
  const apiKey = context.actionParams?.apiKey;
  
  console.log("📋 Fields to validate:", fields);
  console.log("📦 Form data:", formData);
  
  if (!fields || fields.length === 0) {
    console.warn("⚠️ No fields provided for validation");
    // Skip validation, just call API
    return await context.handlers.handleApiCall(apiKey, formData);
  }
  
  // ✅ Validate fields
  const { isValid, errors } = context.handlers.validateAllFields(fields, formData);
  
  if (!isValid) {
    console.error("❌ Validation failed:", errors);
    
    // ✅ Set field-level errors in DataStore (for UI display)
    context.handlers.setFieldErrors(errors);
    
    // ✅ Show notification with FIRST error only
    const firstError = Object.values(errors)[0];
    context.handlers.showNotification({
      type: "toast",
      message: firstError,
      background: "#ef4444",
      duration: 3000,
    });
    
    return { success: false, errors };
  }
  
  console.log("✅ Validation passed, calling API");
  
  // ✅ Clear any previous errors
  context.handlers.setFieldErrors({});
  
  // Call the actual API
  return await context.handlers.handleApiCall(apiKey, formData);
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
      // 🔹 LOGIN PAGE - FIXED ACTIONS
      login: {
        title: "Login - GreenHaven",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🌿 GreenHaven",
                "ui:styles": {
                  fontSize: "32px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/greenhaven" },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven" },
                  },
                  {
                    label: "Sign Up",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven/signup" },
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #e8f5e9",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 20px rgba(76, 175, 80, 0.1)",
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
                "ui:title": "🌱 Welcome Back Plant Lover!",
                "ui:description": "Sign in to continue your green journey",
                "ui:id": "loginForm",
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "150px auto 0",
                  padding: "40px",
                  background: "white",
                  borderRadius: "20px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                },

                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "plantlover@example.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                    validation: {
                      required: true,
                      requiredMessage: "🌿 Email is required to continue",
                      email: true,
                      emailMessage: "🌿 Please enter a valid email address",
                    },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "Enter your secret garden key",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                    validation: {
                      required: true,
                      requiredMessage: "🔒 Password is required",
                      minLength: 6,
                      minLengthMessage:
                        "🔒 Password must be at least 6 characters",
                    },
                  },
                ],

                "ui:actions": [
                  {
                    label: "Sign In & Grow 🌿",
                    action: "validateThenApi", // ✅ Changed from "api" to "validateThenApi"
                    actionParams: {
                      apiKey: "auth.login",
                      fields: [
                        // ✅ Pass fields for validation
                        {
                          name: "email",
                          label: "Email",
                          validation: {
                            required: true,
                            requiredMessage: "🌿 Email is required",
                            email: true,
                            emailMessage: "🌿 Please enter a valid email",
                          },
                        },
                        {
                          name: "password",
                          label: "Password",
                          validation: {
                            required: true,
                            requiredMessage: "🔒 Password is required",
                            minLength: 6,
                            minLengthMessage:
                              "🔒 Password must be at least 6 characters",
                          },
                        },
                      ],
                    },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "16px 0",
                      background:
                        "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "700",
                      borderRadius: "12px",
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
                    actionParams: { url: "/greenhaven/forgot-password" },
                  },
                  {
                    prefix: "New plant parent?",
                    label: "Join GreenHaven",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven/signup" },
                  },
                ],
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "25px auto",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
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
                "ui:content":
                  "© 2024 GreenHaven Plant Store. Cultivated with ❤️ and 🌱",
                "ui:styles": { textAlign: "center", color: "#689f38" },
              },
            },
            styles: {
              background: "#2d4a3a",
              padding: "30px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      // 🔹 SIGNUP PAGE - FIXED ACTIONS
      signup: {
        title: "Join GreenHaven - Create Account",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🌿 GreenHaven",
                "ui:styles": {
                  fontSize: "32px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/greenhaven" },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven" },
                  },
                  {
                    label: "Login",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven/login" },
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #e8f5e9",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 20px rgba(76, 175, 80, 0.1)",
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
                "ui:title": "🌻 Join Our Plant Family!",
                "ui:description":
                  "Create your account and discover amazing plants",
                "ui:id": "signupForm",
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "150px auto 0",
                  padding: "40px",
                  background: "white",
                  borderRadius: "20px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                },

                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Full Name",
                    "ui:placeholder": "Leafy Greens",
                    "ui:type": "text",
                    "ui:name": "name",
                    "ui:required": true,
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "leafy@greenhaven.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "Create your garden password",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Confirm Password",
                    "ui:placeholder": "Repeat your garden password",
                    "ui:type": "password",
                    "ui:name": "confirmPassword",
                    "ui:required": true,
                  },
                ],

                "ui:actions": [
                  {
                    label: "Create Account & Explore 🌸",
                    action: "api",
                    actionParams: { apiKey: "auth.signup" },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "16px 0",
                      background:
                        "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "700",
                      borderRadius: "12px",
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
                    prefix: "Already a plant parent?",
                    label: "Sign In",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven/login" },
                  },
                ],
                "ui:styles": {
                  maxWidth: "450px",
                  margin: "25px auto",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
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
                "ui:content":
                  "© 2024 GreenHaven Plant Store. Cultivated with ❤️ and 🌱",
                "ui:styles": { textAlign: "center", color: "#689f38" },
              },
            },
            styles: {
              background: "#2d4a3a",
              padding: "30px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      // 🔹 MAIN LANDING PAGE (HOME) - FIXED ACTIONS

      // 🔹 PLANTS CATALOG PAGE - FIXED ACTIONS
      plants: {
        title: "Plant Catalog - GreenHaven",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🌿 GreenHaven",
                "ui:styles": {
                  fontSize: "32px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/greenhaven" },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven" },
                  },
                  {
                    label: "Plants",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven/plants" },
                  },
                  {
                    label: "🛒 Cart ({{data.cartCount || 0}})",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven/cart" },
                  },
                  {
                    label:
                      "{{auth.token ? '👤 ' + auth.user?.email : 'Login'}}",
                    action: "{{auth.token ? '' : 'navigateToPage'}}",
                    actionParams: {
                      url: "{{auth.token ? '' : '/greenhaven/login'}}",
                    },
                  },
                  {
                    label: "{{auth.token ? 'Logout' : ''}}",
                    action: "{{auth.token ? 'clearAuth+reload' : ''}}",
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #e8f5e9",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 20px rgba(76, 175, 80, 0.1)",
            },
            triggers: [],
          },
          sidebar: {
            table: {},
            modal: {},
            uiSchema: {
              categoriesHeading: {
                "ui:widget": "heading",
                "ui:text": "📁 Plant Categories",
                "ui:level": "h3",
                "ui:styles": { marginBottom: "20px", fontSize: "1.3rem" },
              },
              categoryList: {
                "ui:widget": "list",
                "ui:ordered": false,
                "ui:icon": "🌱",
                "ui:items": [
                  "Indoor Plants 🏠",
                  "Succulents 🌵",
                  "Flowering Plants 🌸",
                  "Air Purifying 💨",
                  "Pet Safe 🐾",
                  "Low Maintenance ⚡",
                ],
                "ui:itemStyles": {
                  cursor: "pointer",
                  padding: "12px 0",
                  transition: "all 0.2s",
                  fontSize: "1.1rem",
                },
              },

              divider: {
                "ui:widget": "divider",
                "ui:spacing": "large",
              },

              careLevelHeading: {
                "ui:widget": "heading",
                "ui:text": "🌡️ Care Level",
                "ui:level": "h3",
                "ui:styles": { marginBottom: "20px", fontSize: "1.3rem" },
              },

              careEasy: {
                "ui:widget": "checkbox",
                "ui:label": "Easy Care 🌟",
                "ui:styles": { marginBottom: "12px" },
              },
              careMedium: {
                "ui:widget": "checkbox",
                "ui:label": "Medium Care 💪",
                "ui:styles": { marginBottom: "12px" },
              },
              careHard: {
                "ui:widget": "checkbox",
                "ui:label": "Expert Level 🏆",
                "ui:styles": { marginBottom: "12px" },
              },
            },
            styles: {
              width: "280px",
              background: "#f1f8e9",
              padding: "120px 24px 24px",
              minHeight: "100vh",
              borderRight: "1px solid #e8f5e9",
              position: "sticky",
              top: 0,
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              catalogHeading: {
                "ui:widget": "heading",
                "ui:text": "🌿 Plant Catalog",
                "ui:level": "h1",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "50px",
                  marginTop: "40px",
                  fontSize: "2.8rem",
                  color: "#2d4a3a",
                },
              },

              // Table View for Plant Comparison
              plantTable: {
                "ui:widget": "dataTable",
                "ui:columns": [
                  {
                    title: "Plant Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Price",
                    dataIndex: "price",
                    key: "price",
                  },
                  {
                    title: "Care Level",
                    dataIndex: "care",
                    key: "care",
                  },
                  {
                    title: "Light",
                    dataIndex: "light",
                    key: "light",
                  },
                  {
                    title: "Action",
                    dataIndex: "action",
                    key: "action",
                  },
                ],
                "ui:data": [
                  {
                    key: "1",
                    name: "Monstera Deliciosa 🍃",
                    price: "$45",
                    care: "Easy",
                    light: "Bright Indirect",
                    action: {
                      label: "Add to Cart",
                      action: "storeCartLocally",
                      actionParams: {
                        productId: "monstera-001",
                        name: "Monstera Deliciosa",
                        price: 45,
                        image:
                          "https://images.unsplash.com/photo-1525498128493-380d1990a112?w=200&h=200&fit=crop",
                        category: "Indoor Plants",
                      },
                    },
                  },
                  {
                    key: "2",
                    name: "Fiddle Leaf Fig 🎻",
                    price: "$65",
                    care: "Medium",
                    light: "Bright Light",
                    action: {
                      label: "Add to Cart",
                      action: "storeCartLocally",
                      actionParams: {
                        productId: "fiddle-002",
                        name: "Fiddle Leaf Fig",
                        price: 65,
                        image:
                          "https://images.unsplash.com/photo-1593482892290-9d013abb8a22?w=200&h=200&fit=crop",
                        category: "Indoor Plants",
                      },
                    },
                  },
                  {
                    key: "3",
                    name: "Snake Plant 🐍",
                    price: "$28",
                    care: "Easy",
                    light: "Low to Bright",
                    action: {
                      label: "Add to Cart",
                      action: "storeCartLocally",
                      actionParams: {
                        productId: "snake-003",
                        name: "Snake Plant",
                        price: 28,
                        image:
                          "https://images.unsplash.com/photo-1585350927251-3ab67c4d4e5a?w=200&h=200&fit=crop",
                        category: "Indoor Plants",
                      },
                    },
                  },
                ],
                "ui:styles": {
                  marginBottom: "50px",
                },
              },

              gridHeading: {
                "ui:widget": "heading",
                "ui:text": "🪴 Popular Plants Grid",
                "ui:level": "h2",
                "ui:styles": { marginBottom: "30px", color: "#4caf50" },
              },

              plantsGrid: {
                "ui:widget": "gridLayout",
                "ui:columns": 4,
                "ui:gap": "25px",
                "ui:styles": {
                  marginBottom: "60px",
                },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "ZZ Plant 💎",
                    "ui:description":
                      "Extremely low maintenance with glossy leaves. Perfect for beginners.",
                    "ui:image":
                      "https://images.unsplash.com/photo-1596541223130-5ccd0ddbf94f?w=300&h=200&fit=crop",
                    "ui:buttonLabel": "Add - $32",
                    "ui:action": "storeCartLocally",
                    "ui:actionParams": {
                      productId: "zz-004",
                      name: "ZZ Plant",
                      price: 32,
                      image:
                        "https://images.unsplash.com/photo-1596541223130-5ccd0ddbf94f?w=300&h=200&fit=crop",
                      category: "Indoor Plants",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Pothos 🌿",
                    "ui:description":
                      "Fast-growing trailing plant. Great for shelves and hanging baskets.",
                    "ui:image":
                      "https://images.unsplash.com/photo-1596464716127-f2a5e19d3c6e?w=300&h=200&fit=crop",
                    "ui:buttonLabel": "Add - $18",
                    "ui:action": "storeCartLocally",
                    "ui:actionParams": {
                      productId: "pothos-005",
                      name: "Pothos",
                      price: 18,
                      image:
                        "https://images.unsplash.com/photo-1596464716127-f2a5e19d3c6e?w=300&h=200&fit=crop",
                      category: "Indoor Plants",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Rubber Plant 🌳",
                    "ui:description":
                      "Large leaves with deep green color. Makes a bold statement.",
                    "ui:image":
                      "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=300&h=200&fit=crop",
                    "ui:buttonLabel": "Add - $55",
                    "ui:action": "storeCartLocally",
                    "ui:actionParams": {
                      productId: "rubber-006",
                      name: "Rubber Plant",
                      price: 55,
                      image:
                        "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=300&h=200&fit=crop",
                      category: "Indoor Plants",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Chinese Money Plant 💰",
                    "ui:description":
                      "Unique circular leaves. Believed to bring good fortune.",
                    "ui:image":
                      "https://images.unsplash.com/photo-1517191439909-5b94d8e93f4c?w=300&h=200&fit=crop",
                    "ui:buttonLabel": "Add - $38",
                    "ui:action": "storeCartLocally",
                    "ui:actionParams": {
                      productId: "money-007",
                      name: "Chinese Money Plant",
                      price: 38,
                      image:
                        "https://images.unsplash.com/photo-1517191439909-5b94d8e93f4c?w=300&h=200&fit=crop",
                      category: "Indoor Plants",
                    },
                  },
                ],
              },
            },
            styles: {
              padding: "120px 40px 80px",
              background: "#f8fdf9",
              minHeight: "100vh",
            },
            triggers: [
              { event: "load", action: "loadCartFromLocal" },
              { event: "load", source: "plants.api" },
            ],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content":
                  "© 2024 GreenHaven Plant Store. Cultivated with ❤️ and 🌱",
                "ui:styles": { textAlign: "center", color: "#689f38" },
              },
            },
            styles: {
              background: "#2d4a3a",
              padding: "40px",
            },
            triggers: [],
          },
        },
      },

      // 🔹 CART PAGE - FIXED ACTIONS
      cart: {
        title: "Your Cart - GreenHaven",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🌿 GreenHaven",
                "ui:styles": {
                  fontSize: "32px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/greenhaven" },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven" },
                  },
                  {
                    label: "Plants",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven/plants" },
                  },
                  {
                    label: "🛒 Cart ({{data.cartCount || 0}})",
                    action: "navigateToPage",
                    actionParams: { url: "/greenhaven/cart" },
                  },
                  {
                    label:
                      "{{auth.token ? '👤 ' + auth.user?.email : 'Login'}}",
                    action: "{{auth.token ? '' : 'navigateToPage'}}",
                    actionParams: {
                      url: "{{auth.token ? '' : '/greenhaven/login'}}",
                    },
                  },
                  {
                    label: "{{auth.token ? 'Logout' : ''}}",
                    action: "{{auth.token ? 'clearAuth+reload' : ''}}",
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #e8f5e9",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 20px rgba(76, 175, 80, 0.1)",
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
              cartTitle: {
                "ui:widget": "heading",
                "ui:text": "🛒 Your Plant Cart",
                "ui:level": "h1",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "50px",
                  marginTop: "40px",
                  fontSize: "2.5rem",
                },
              },

              // Display cart items from DataStore
              cartItemsDisplay: {
                "ui:widget": "conditionalContent",
                "ui:condition":
                  "{{data.cartItems && data.cartItems.length > 0}}",
                "ui:content": {
                  "ui:widget": "repeater",
                  "ui:dataKey": "cartItems",
                  "ui:template": {
                    "ui:widget": "card",
                    "ui:title": "{{item.name}}",
                    "ui:description":
                      "Price: ${{item.price}} | Quantity: {{item.quantity}} | Total: ${{item.price * item.quantity}}",
                    "ui:image": "{{item.image}}",
                    "ui:actions": [
                      {
                        label: "❌ Remove",
                        action: "removeFromCart",
                        actionParams: { productId: "{{item.id}}" },
                      },
                    ],
                    "ui:styles": {
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      maxWidth: "900px",
                      margin: "0 auto 20px",
                      padding: "25px",
                    },
                  },
                },
                "ui:fallback": {
                  "ui:widget": "card",
                  "ui:title": "Your cart is empty 🌱",
                  "ui:description": "Start adding some green to your life!",
                  "ui:action": "navigateToPage",
                  "ui:actionParams": { url: "/greenhaven/plants" },
                  "ui:buttonLabel": "Browse Plants",
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
                "ui:widget": "card",
                "ui:title": "Order Summary",
                "ui:description":
                  "Subtotal: ${{data.cartTotal || 0}} | Shipping: $15.00 | Tax: ${{(data.cartTotal || 0) * 0.1}} | Total: ${{(data.cartTotal || 0) + 15 + ((data.cartTotal || 0) * 0.1)}}",
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/greenhaven/checkout" },
                "ui:buttonLabel": "Proceed to Checkout 💳",
                "ui:styles": {
                  maxWidth: "900px",
                  margin: "0 auto",
                  padding: "30px",
                  background:
                    "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                  color: "white",
                  textAlign: "center",
                },
              },
            },
            styles: {
              padding: "120px 40px 80px",
              background: "#f8fdf9",
              minHeight: "100vh",
            },
            triggers: [
              { event: "load", action: "loadCartFromLocal" },
              { event: "load", source: "plants.api" },
            ],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content":
                  "© 2024 GreenHaven Plant Store. Cultivated with ❤️ and 🌱",
                "ui:styles": { textAlign: "center", color: "#689f38" },
              },
            },
            styles: {
              background: "#2d4a3a",
              padding: "40px",
            },
            triggers: [],
          },
        },
      },
    },

    components: {
      navbar: {
        table: {},
        modal: {},
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🌿 GreenHaven",
            "ui:styles": {
              fontSize: "32px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            },
            "ui:action": "navigateToPage",
            "ui:actionParams": { url: "/greenhaven" },
          },

          searchBar: {
            "ui:widget": "inputField",
            "ui:placeholder": "Search plants...",
            "ui:type": "text",
            "ui:inputStyles": {
              border: "2px solid #e8f5e9",
              borderRadius: "25px",
              padding: "12px 20px",
              width: "300px",
            },
            "ui:styles": { marginBottom: "0" },
          },

          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              {
                label: "Home",
                action: "navigateToPage",
                actionParams: { url: "/greenhaven" },
              },
              {
                label: "Plants",
                action: "navigateToPage",
                actionParams: { url: "/greenhaven/plants" },
              },
              {
                label: "🛒 Cart ({{data.cartCount || 0}})",
                action: "navigateToPage",
                actionParams: { url: "/greenhaven/cart" },
              },
              {
                label: "{{auth.token ? '👤 ' + auth.user?.email : 'Login'}}",
                action: "{{auth.token ? '' : 'navigateToPage'}}",
                actionParams: {
                  url: "{{auth.token ? '' : '/greenhaven/login'}}",
                },
              },
              {
                label: "{{auth.token ? 'Logout' : ''}}",
                action: "{{auth.token ? 'clearAuth+reload' : ''}}",
              },
            ],
          },
        },
        styles: {
          background: "#ffffff",
          borderBottom: "2px solid #e8f5e9",
          padding: "20px 50px",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 20px rgba(76, 175, 80, 0.1)",
        },
        triggers: [],
      },

      sidebar: {
        table: {},
        modal: {},
        uiSchema: {
          categoriesHeading: {
            "ui:widget": "heading",
            "ui:text": "📁 Plant Categories",
            "ui:level": "h3",
            "ui:styles": { marginBottom: "20px", fontSize: "1.3rem" },
          },
          categoryList: {
            "ui:widget": "list",
            "ui:ordered": false,
            "ui:icon": "🌱",
            "ui:items": [
              "Indoor Plants 🏠",
              "Succulents 🌵",
              "Flowering Plants 🌸",
              "Air Purifying 💨",
              "Pet Safe 🐾",
              "Low Maintenance ⚡",
            ],
            "ui:itemStyles": {
              cursor: "pointer",
              padding: "12px 0",
              transition: "all 0.2s",
              fontSize: "1.1rem",
            },
          },

          divider: {
            "ui:widget": "divider",
            "ui:spacing": "large",
          },

          careLevelHeading: {
            "ui:widget": "heading",
            "ui:text": "🌡️ Care Level",
            "ui:level": "h3",
            "ui:styles": { marginBottom: "20px", fontSize: "1.3rem" },
          },

          careEasy: {
            "ui:widget": "checkbox",
            "ui:label": "Easy Care 🌟",
            "ui:styles": { marginBottom: "12px" },
          },
          careMedium: {
            "ui:widget": "checkbox",
            "ui:label": "Medium Care 💪",
            "ui:styles": { marginBottom: "12px" },
          },
          careHard: {
            "ui:widget": "checkbox",
            "ui:label": "Expert Level 🏆",
            "ui:styles": { marginBottom: "12px" },
          },
        },
        styles: {
          width: "280px",
          background: "#f1f8e9",
          padding: "120px 24px 24px",
          minHeight: "100vh",
          borderRight: "1px solid #e8f5e9",
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
            "ui:title": "Grow Your Indoor Jungle 🌿",
            "ui:subtitle":
              "Discover rare and beautiful plants to transform your space into a green paradise",
            "ui:cta": {
              label: "Explore Plants 🌸",
              action: "navigateToPage",
              actionParams: { url: "/greenhaven/plants" },
            },
            "ui:styles": {
              background: "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
              minHeight: "600px",
              padding: "180px 40px 100px",
              textAlign: "center",
              color: "white",
            },
          },

          spacer1: { "ui:widget": "spacer", "ui:height": 80 },

          featuredHeading: {
            "ui:widget": "heading",
            "ui:text": "✨ Featured Plants",
            "ui:level": "h2",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "50px",
              fontSize: "2.5rem",
              color: "#2d4a3a",
            },
          },

          featuredGrid: {
            "ui:widget": "gridLayout",
            "ui:columns": 3,
            "ui:gap": "30px",
            "ui:styles": {
              marginBottom: "60px",
            },
            "ui:children": [
              {
                "ui:widget": "card",
                "ui:title": "Monstera Deliciosa 🍃",
                "ui:description":
                  "Large tropical plant with unique leaf patterns. Perfect for bright spaces.",
                "ui:image":
                  "https://images.unsplash.com/photo-1525498128493-380d1990a112?w=400&h=300&fit=crop",
                "ui:buttonLabel": "Add to Cart - $45",
                "ui:action": "storeCartLocally",
                "ui:actionParams": {
                  productId: "monstera-001",
                  name: "Monstera Deliciosa",
                  price: 45,
                  image:
                    "https://images.unsplash.com/photo-1525498128493-380d1990a112?w=400&h=300&fit=crop",
                  category: "Indoor Plants",
                },
                "ui:styles": {
                  textAlign: "center",
                },
              },
              {
                "ui:widget": "card",
                "ui:title": "Fiddle Leaf Fig 🎻",
                "ui:description":
                  "Elegant tree with large violin-shaped leaves. Statement piece for any room.",
                "ui:image":
                  "https://images.unsplash.com/photo-1593482892290-9d013abb8a22?w=400&h=300&fit=crop",
                "ui:buttonLabel": "Add to Cart - $65",
                "ui:action": "storeCartLocally",
                "ui:actionParams": {
                  productId: "fiddle-002",
                  name: "Fiddle Leaf Fig",
                  price: 65,
                  image:
                    "https://images.unsplash.com/photo-1593482892290-9d013abb8a22?w=400&h=300&fit=crop",
                  category: "Indoor Plants",
                },
                "ui:styles": {
                  textAlign: "center",
                },
              },
              {
                "ui:widget": "card",
                "ui:title": "Snake Plant 🐍",
                "ui:description":
                  "Low maintenance, air-purifying plant. Thrives in low light conditions.",
                "ui:image":
                  "https://images.unsplash.com/photo-1585350927251-3ab67c4d4e5a?w=400&h=300&fit=crop",
                "ui:buttonLabel": "Add to Cart - $28",
                "ui:action": "storeCartLocally",
                "ui:actionParams": {
                  productId: "snake-003",
                  name: "Snake Plant",
                  price: 28,
                  image:
                    "https://images.unsplash.com/photo-1585350927251-3ab67c4d4e5a?w=400&h=300&fit=crop",
                  category: "Indoor Plants",
                },
                "ui:styles": {
                  textAlign: "center",
                },
              },
            ],
          },
        },
        styles: {
          padding: "100px 40px 80px",
          background: "#f8fdf9",
          flex: 1,
          minHeight: "100vh",
        },
        triggers: [
          { event: "load", action: "loadCartFromLocal" },
          { event: "load", source: "plants.api" },
        ],
      },

      footer: {
        table: {},
        modal: {},
        uiSchema: {
          footerContent: {
            "ui:widget": "gridLayout",
            "ui:columns": 3,
            "ui:gap": "40px",
            "ui:styles": {
              marginBottom: "40px",
            },
            "ui:children": [
              {
                "ui:widget": "text",
                "ui:content": "🌿 GreenHaven<br>Premium Plant Store",
                "ui:styles": {
                  color: "#e8f5e9",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                },
              },
              {
                "ui:widget": "text",
                "ui:content":
                  "Plant Care<br>Delivery Info<br>Returns<br>Contact",
                "ui:styles": { color: "#c8e6c9" },
              },
              {
                "ui:widget": "text",
                "ui:content": "Privacy Policy<br>Terms of Service<br>FAQ",
                "ui:styles": { color: "#c8e6c9" },
              },
            ],
          },
          footerText: {
            "ui:widget": "text",
            "ui:content":
              "© 2024 GreenHaven Plant Store. Cultivated with ❤️ and 🌱",
            "ui:styles": {
              textAlign: "center",
              color: "#a5d6a7",
              marginTop: "40px",
            },
          },
        },
        styles: {
          background: "#2d4a3a",
          padding: "60px 40px 40px",
        },
        triggers: [],
      },
    },
  },
  {
    title: "Robin Devkota - Frontend Developer",
    slug: "robin-portfolio",
    projectUUID: "portfolio-robin",
    taskUUID: "portfolio001",
    status: "Active",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,

    initialization: {
      // In your JSON config, UPDATE the globalCSS to this:

      globalCSS: `
/* ============================================ */
/* GLOBAL CSS - Enhanced Dark Winter Night Theme */
/* ============================================ */

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ============================================ */
/* BASE STYLES - Light Mode (Default)           */
/* ============================================ */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: #1e293b !important;
  position: relative;
  min-height: 100vh;
  transition: background 0.5s ease, color 0.5s ease;
}

/* Light mode logo fix */
body:not(.dark-mode) nav [class*="logo"],
body:not(.dark-mode) nav [style*="gradient"],
body:not(.dark-mode) .navbar-logo {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

/* ============================================ */
/* NAVIGATION LINKS - UPDATED FIX               */
/* ============================================ */
/* NAVBAR - HIGHER CONTRAST IN DARK MODE */
body.dark-mode nav,
body.dark-mode header,
body.dark-mode nav > *,
body.dark-mode header > *,
body.dark-mode .navbar {
  background: rgba(17, 24, 39, 0.98) !important;
  border-bottom: 2px solid #4b5563 !important;
  backdrop-filter: blur(12px) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
}

/* Ensure all text inside navbar is visible */
body.dark-mode nav *,
body.dark-mode header *,
body.dark-mode .navbar * {
  color: #ffffff !important;
}

/* Specific nav links styling */
body.dark-mode nav a,
body.dark-mode .nav-links a,
body.dark-mode [class*="navLink"],
body.dark-mode [class*="nav-link"],
body.dark-mode .navbar-links a,
body.dark-mode .ui-navLinks a {
  color: #ffffff !important;
  text-shadow: 0 1px 3px rgba(0,0,0,0.7);
  opacity: 1 !important;
  font-weight: 600 !important;
}

/* Hover state */
body.dark-mode nav a:hover,
body.dark-mode .nav-links a:hover,
body.dark-mode [class*="navLink"]:hover,
body.dark-mode [class*="nav-link"]:hover {
  color: #60a5fa !important;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* Light mode nav */
body:not(.dark-mode) nav,
body:not(.dark-mode) header,
body:not(.dark-mode) nav > *,
body:not(.dark-mode) header > * {
  background: rgba(255, 255, 255, 0.98) !important;
  border-bottom-color: #e2e8f0 !important;
  backdrop-filter: blur(10px);
}

body:not(.dark-mode) nav a,
body:not(.dark-mode) .nav-links a,
body:not(.dark-mode) [class*="navLink"],
body:not(.dark-mode) [class*="nav-link"] {
  color: #0e5ad4 !important;
  font-weight: 600 !important;
}

body:not(.dark-mode) nav a:hover {
  color: #2563eb !important;
}

/* ============================================ */
/* DARK MODE - True Black + Winter Sky          */
/* ============================================ */
body.dark-mode {
  background: #000000 !important;
  color: #ffffff !important;
  /* REMOVED: overflow: hidden; - This was causing the scrolling issue */
}

body.dark-mode > div,
body.dark-mode section,
body.dark-mode main,
body.dark-mode aside,
body.dark-mode article {
  background: transparent !important;
}

/* Better dark mode border consistency */
body.dark-mode * {
  border-color: #4b5563 !important;
}

/* ============================================ */
/* Z-INDEX MANAGEMENT                           */
/* ============================================ */
body.dark-mode > *:not(.stars):not(.shooting-stars):not(.snow-layer3) {
  position: relative;
  z-index: 10 !important;
}

/* ============================================ */
/* CARDS & OTHER COMPONENTS                     */
/* ============================================ */
body.dark-mode article,
body.dark-mode [class*="card"],
body.dark-mode div[style*="background: white"],
body.dark-mode div[style*="background:white"] {
  background: rgba(17, 24, 39, 0.94) !important;
  border-color: #4b5563 !important;
  color: #ffffff !important;
  backdrop-filter: blur(10px);
}

/* Headings & Text */
body.dark-mode h1, body.dark-mode h2, body.dark-mode h3,
body.dark-mode h4, body.dark-mode h5, body.dark-mode h6 {
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
}

body.dark-mode p,
body.dark-mode span:not(.gradient-text),
body.dark-mode div {
  color: #e5e7eb !important;
}

/* Forms */
body.dark-mode input,
body.dark-mode textarea,
body.dark-mode select {
  background: rgba(31, 41, 55, 0.92) !important;
  border-color: #4b5563 !important;
  color: #ffffff !important;
}

body.dark-mode input::placeholder,
body.dark-mode textarea::placeholder {
  color: #9ca3af !important;
}

/* Gradient text */
.gradient-text,
span[style*="gradient"],
h2[style*="gradient"] {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

/* Scrollbar */
body.dark-mode::-webkit-scrollbar-track {
  background: #111827;
}
body.dark-mode::-webkit-scrollbar-thumb {
  background: #4b5563;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
}

/* Smooth scrolling & fade animation */
html {
  scroll-behavior: smooth;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeInUp 0.8s ease-out;
}

      `,

      actions: {
        toggleTheme: `console.log('🌓 Toggling theme');
const body = document.body;
const isDark = body.classList.contains('dark-mode');

// Create stars container if it doesn't exist
let starsContainer = document.querySelector('.stars');
if (!starsContainer) {
  starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  document.body.appendChild(starsContainer);
}

if (isDark) {
  body.classList.remove('dark-mode');
  localStorage.setItem('theme', 'light');
  console.log('☀️ Light mode');
  // Remove stars container in light mode
  if (starsContainer) {
    starsContainer.remove();
  }
} else {
  body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
  console.log('🌙 Dark mode with snowfall');
  // Ensure stars container is in body
  if (!document.querySelector('.stars')) {
    document.body.appendChild(starsContainer);
  }
}`,

        loadTheme: `console.log('🎨 Loading theme');
const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  document.body.classList.add('dark-mode');
  console.log('🌙 Dark mode with snowfall loaded');
  
  // Create stars container for dark mode
  let starsContainer = document.querySelector('.stars');
  if (!starsContainer) {
    starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);
  }
}`,

        scrollToSection: `const section = context.actionParams?.section;
if (!section) return;
console.log('🎯 Scrolling to:', section);
const el = document.getElementById(section);
if (el) {
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}`,

        logContactForm: `console.log('📧 === CONTACT FORM ===');
console.log('📦 Data:', context.formData);
console.log('📧 Email:', context.formData?.email);
console.log('💬 Message:', context.formData?.message);
context.handlers.showNotification({
  type: 'toast',
  message: '✅ Message sent successfully!',
  background: '#10b981',
  duration: 3000
});
context.handlers.setFormData({});`,
      },
    },

    components: {
      navbar: {
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "👨‍💻 Robin Devkota",
            "ui:styles": {
              fontSize: "24px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              cursor: "pointer",
              transition: "all 0.3s ease",
            },
            "ui:action": "scrollToSection",
            "ui:actionParams": { section: "home" },
          },

          themeToggle: {
            "ui:widget": "toggle",
            "ui:label": "",
            "ui:size": "medium",
            "ui:onChange": "toggleTheme",
            "ui:styles": {
              marginLeft: "auto",
              marginRight: "20px",
            },
          },

          navLinks: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:styles": {
              color: "#374151",
              fontWeight: "600",
            },
            "ui:links": [
              {
                label: "Home",
                action: "scrollToSection",
                actionParams: { section: "home" },
                styles: {
                  color: "inherit",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                },
              },
              {
                label: "Projects",
                action: "scrollToSection",
                actionParams: { section: "projects" },
                styles: {
                  color: "inherit",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                },
              },
              {
                label: "Contact",
                action: "scrollToSection",
                actionParams: { section: "contact" },
                styles: {
                  color: "inherit",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                },
              },
            ],
          },
        },
        styles: {
          borderBottom: "2px solid #e2e8f0",
          padding: "16px 50px",
          position: "fixed",
          width: "100%",
          top: "0",
          zIndex: "10000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        },
        triggers: [
          {
            event: "load",
            action: "loadTheme",
          },
        ],
      },
      main: {
        uiSchema: {
          backgroundEffect: {
            "ui:widget": "backgroundEffect",
            "ui:effect": "snowfall",
            "ui:intensity": "high",
            "ui:color": [
              "#ff0000",
              "#ff9900",
              "#ffff00",
              "#00ff00",
              "#0099ff",
              "#6600ff",
              "#ff00ff",
            ],
            "ui:speed": "medium",
          },
          backgroundEffectt: {
            "ui:widget": "backgroundEffect",
            "ui:effect": "shootingStars",
            "ui:intensity": "medium",
            "ui:color": "#9ff00a",
          },
          backgroundEffecttt: {
            "ui:widget": "backgroundEffect",
            "ui:effect": "stars",
            "ui:intensity": "high",
            "ui:color": "#380ff0",
          },

          homeSection: {
            "ui:widget": "container",
            "ui:id": "home",
            "ui:children": [
              {
                "ui:widget": "gridLayout",
                "ui:columns": 2,
                "ui:gap": "60px",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "0 auto",
                  alignItems: "center",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:gap": "24px",
                    "ui:children": [
                      {
                        "ui:widget": "heading",
                        "ui:text": "Hi, I'm Robin Devkota 👋",
                        "ui:level": "h1",
                        "ui:styles": {
                          fontSize: "3.5rem",
                          fontWeight: "800",
                          marginBottom: "0",
                        },
                      },
                      {
                        "ui:widget": "heading",
                        "ui:text": "Frontend Developer",
                        "ui:level": "h2",
                        "ui:styles": {
                          fontSize: "2rem",
                          fontWeight: "600",

                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          marginBottom: "0",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text":
                          "Frontend Developer with 2+ years of experience building scalable web applications using React, MERN, and RJSF. Skilled in reusable UI component development, form automation, and enhancing UX flows. Passionate about problem solving and writing clean, maintainable code.",
                        "ui:styles": {
                          fontSize: "1.1rem",
                          lineHeight: "1.8",
                          color: "#64748b",
                          fontWeight: "400",
                        },
                      },
                      {
                        "ui:widget": "flexLayout",
                        "ui:direction": "row",
                        "ui:gap": "16px",
                        "ui:children": [
                          {
                            "ui:widget": "button",
                            "ui:label": "View Projects",
                            "ui:action": "scrollToSection",
                            "ui:actionParams": { section: "projects" },
                            "ui:variant": "primary",
                            "ui:styles": {
                              padding: "14px 32px",
                              fontSize: "1.1rem",

                              color: "white",
                              borderRadius: "8px",
                              border: "none",
                              fontWeight: "600",
                              className: "btn-primary",
                            },
                          },
                          {
                            "ui:widget": "button",
                            "ui:label": "Contact Me",
                            "ui:action": "scrollToSection",
                            "ui:actionParams": { section: "contact" },
                            "ui:variant": "outline",
                            "ui:styles": {
                              padding: "14px 32px",
                              fontSize: "1.1rem",

                              color: "#3b82f6",
                              borderRadius: "8px",
                              border: "2px solid #3b82f6",
                              fontWeight: "600",
                              className: "btn-outline",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    "ui:widget": "gridLayout",
                    "ui:columns": 2,
                    "ui:gap": "20px",
                    "ui:children": [
                      {
                        "ui:widget": "card",
                        "ui:title": "🎨 Frontend",
                        "ui:description":
                          "React, JavaScript, HTML/CSS, React Native",
                        "ui:styles": {
                          padding: "24px",

                          border: "2px solid #3b82f6",
                          fontWeight: "500",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "⚙️ Backend",
                        "ui:description": "Node.js, Express, MongoDB, SQL",
                        "ui:styles": {
                          padding: "24px",

                          border: "2px solid #10b981",
                          fontWeight: "500",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "🛠️ Tools",
                        "ui:description": "Git, VS Code, Postman, Figma",
                        "ui:styles": {
                          padding: "24px",

                          border: "2px solid #f59e0b",
                          fontWeight: "500",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "📚 Learning",
                        "ui:description": "TypeScript, Next.js, GraphQL",
                        "ui:styles": {
                          padding: "24px",

                          border: "2px solid #a855f7",
                          fontWeight: "500",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                "ui:widget": "spacer",
                "ui:height": 60,
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 2,
                "ui:gap": "40px",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "0 auto",
                },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "💼 Experience",
                    "ui:description":
                      "Associate Software Engineer\n\n• Pharma Release Management System\n• Account Opening CMS\n• Reduced form errors by 30%+\n• Optimized workflows saving 40% time",
                    "ui:styles": {
                      padding: "32px",
                      minHeight: "250px",
                      fontWeight: "500",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🎓 Education",
                    "ui:description":
                      "Bachelor of Science in Computer Science and IT\nPrime College (2019-2024)\nGrade: A\n\nHigh School Science\nKIST College (2017-2019)\nGrade: A",
                    "ui:styles": {
                      padding: "32px",
                      minHeight: "250px",
                      fontWeight: "500",
                    },
                  },
                ],
              },
            ],
            "ui:styles": {
              padding: "120px 40px 80px",

              minHeight: "100vh",
            },
          },

          projectsSection: {
            "ui:widget": "container",
            "ui:id": "projects",
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "🚀 Featured Projects",
                "ui:level": "h2",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "60px",
                  fontSize: "2.8rem",
                  fontWeight: "800",
                },
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 1,
                "ui:gap": "40px",
                "ui:styles": {
                  maxWidth: "900px",
                  margin: "0 auto",
                },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "🏥 Pharma Release Management",
                    "ui:description":
                      "Dynamic multi-role system for streamlining version and release workflows. Built with React, implemented RBAC, integrated APIs for version control. Reduced manual effort by 40%.",
                    "ui:image":
                      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
                    "ui:styles": {
                      padding: "40px",
                      fontWeight: "500",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🏦 Account Opening CMS",
                    "ui:description":
                      "Multi-step account opening form using React and RJSF. Enhanced validation logic and conditional rendering. Reduced form submission errors by 30%+.",
                    "ui:image":
                      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
                    "ui:styles": {
                      padding: "40px",
                      fontWeight: "500",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🎨 Pixel History",
                    "ui:description":
                      "Full-stack MERN application with integrated payment gateway. E-commerce platform for digital art. Complete authentication, cart system, and order management.",
                    "ui:image":
                      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
                    "ui:styles": {
                      padding: "40px",
                      fontWeight: "500",
                    },
                  },
                ],
              },
              {
                "ui:widget": "spacer",
                "ui:height": 40,
              },
              {
                "ui:widget": "heading",
                "ui:text": "🛠️ Technologies I Use",
                "ui:level": "h3",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "30px",
                  fontWeight: "700",
                },
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 4,
                "ui:gap": "20px",
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "0 auto",
                },
                "ui:children": [
                  {
                    "ui:widget": "badge",
                    "ui:text": "React",
                    "ui:variant": "info",
                    "ui:styles": {
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  },
                  {
                    "ui:widget": "badge",
                    "ui:text": "Node.js",
                    "ui:variant": "success",
                    "ui:styles": {
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  },
                  {
                    "ui:widget": "badge",
                    "ui:text": "MongoDB",
                    "ui:variant": "success",
                    "ui:styles": {
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  },
                  {
                    "ui:widget": "badge",
                    "ui:text": "Express",
                    "ui:variant": "primary",
                    "ui:styles": {
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  },
                  {
                    "ui:widget": "badge",
                    "ui:text": "JavaScript",
                    "ui:variant": "warning",
                    "ui:styles": {
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  },
                  {
                    "ui:widget": "badge",
                    "ui:text": "SQL",
                    "ui:variant": "info",
                    "ui:styles": {
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  },
                  {
                    "ui:widget": "badge",
                    "ui:text": "Python",
                    "ui:variant": "primary",
                    "ui:styles": {
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  },
                  {
                    "ui:widget": "badge",
                    "ui:text": "C++",
                    "ui:variant": "danger",
                    "ui:styles": {
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "600",
                    },
                  },
                ],
              },
            ],
            "ui:styles": {
              padding: "100px 40px",

              minHeight: "100vh",
            },
          },

          contactSection: {
            "ui:widget": "container",
            "ui:id": "contact",
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "📬 Get In Touch",
                "ui:level": "h2",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "60px",
                  fontSize: "2.8rem",
                  fontWeight: "800",
                },
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 2,
                "ui:gap": "60px",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "0 auto",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:gap": "30px",
                    "ui:children": [
                      {
                        "ui:widget": "card",
                        "ui:title": "📧 Email",
                        "ui:description": "robindevkta0@gmail.com",
                        "ui:styles": {
                          padding: "24px",

                          border: "2px solid #3b82f6",
                          fontWeight: "500",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "📱 Phone",
                        "ui:description": "+977 9813025452",
                        "ui:styles": {
                          padding: "24px",

                          border: "2px solid #10b981",
                          fontWeight: "500",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "📍 Location",
                        "ui:description": "Thamel, Kathmandu, Nepal",
                        "ui:styles": {
                          padding: "24px",

                          border: "2px solid #f59e0b",
                          fontWeight: "500",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "🌐 Portfolio",
                        "ui:description": "robindevkota.com.np",
                        "ui:styles": {
                          padding: "24px",

                          border: "2px solid #a855f7",
                          fontWeight: "500",
                        },
                      },
                    ],
                  },
                  {
                    "ui:widget": "formContainer",
                    "ui:title": "Send Me a Message",
                    "ui:description":
                      "I'll get back to you as soon as possible!",
                    "ui:styles": {
                      padding: "40px",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    },
                    "ui:fields": [
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Your Email",
                        "ui:placeholder": "your.email@example.com",
                        "ui:type": "email",
                        "ui:name": "email",
                        "ui:required": true,
                      },
                      {
                        "ui:widget": "textareaField",
                        "ui:label": "Your Message",
                        "ui:placeholder": "Type your message here...",
                        "ui:name": "message",
                        "ui:required": true,
                        "ui:rows": 6,
                      },
                    ],
                    "ui:actions": [
                      {
                        label: "Send Message 📤",
                        action: "logContactForm",
                        variant: "primary",
                        styles: {
                          width: "100%",
                          padding: "14px 0",

                          color: "white",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          borderRadius: "8px",
                          border: "none",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                "ui:widget": "spacer",
                "ui:height": 60,
              },
              {
                "ui:widget": "socialIcons",
                "ui:size": "large",
                "ui:variant": "colored",
                "ui:icons": [
                  {
                    platform: "linkedin",
                    url: "https://linkedin.com/in/robin-devkota",
                    fontAwesome: "fab fa-linkedin-in",
                  },
                  {
                    platform: "github",
                    url: "https://github.com/robindevkota",
                    fontAwesome: "fab fa-github",
                  },
                  {
                    platform: "email",
                    url: "mailto:robindevkta0@gmail.com",
                    fontAwesome: "fas fa-envelope",
                  },
                  {
                    platform: "website",
                    url: "https://robindevkota.com.np",
                    fontAwesome: "fas fa-globe",
                  },
                ],
                "ui:styles": {
                  marginTop: "40px",
                },
              },
            ],
            "ui:styles": {
              padding: "100px 40px",

              minHeight: "100vh",
            },
          },
        },
        styles: {
          paddingTop: "80px",
        },
        triggers: [
          {
            event: "load",
            action: "loadTheme",
          },
        ],
      },

      footer: {
        uiSchema: {
          footerContent: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:align": "center",
            "ui:gap": "20px",
            "ui:children": [
              {
                "ui:widget": "text",
                "ui:content": "© 2024 Robin Devkota. All rights reserved.",
                "ui:styles": {
                  color: "#94a3b8",
                  fontSize: "0.95rem",
                  fontWeight: "400",
                },
              },
              {
                "ui:widget": "text",
                "ui:content":
                  "Built with ❤️ using React & JSON-driven architecture",
                "ui:styles": {
                  color: "#64748b",
                  fontSize: "0.9rem",
                  fontWeight: "400",
                },
              },
            ],
          },
        },
        styles: {
          background: "#1e293b",
          padding: "40px 20px",
          textAlign: "center",
        },
      },
    },

    resolvedAPIs: {},
  },
  // Add this to your demo.js websites array

  // Add this to your demo.js websites array

  // Add this to your demo.js websites array

  {
    title: "HotelHub - Reservation Management",
    slug: "hotelhub",
    projectUUID: "hotel-hotelhub",
    taskUUID: "hotel001",
    status: "Active",
    accountValidation: true,
    otpValidation: false,
    isAnonymous: false,
    requireAuth: false, // Allow access to login page
    redirectIfNotAuth: "/hotelhub/login",

    initialization: {
      globalCSS: `
/* HotelHub Global Styles */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

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
  background: #f8fafc;
}

html {
  scroll-behavior: smooth;
}

button {
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;
}

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

.card, article {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover, article:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

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
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-center { text-align: center; }
.mt-4 { margin-top: 2rem; }
.mb-4 { margin-bottom: 2rem; }
    `,

      resources: ["auth.login", "auth.signup", "rooms.api", "rooms.create"],

      actions: {
        // Navigation actions
        navigateToPage: `
        const url = context.actionParams?.url;
        if (!url) {
          console.error("❌ No URL provided");
          return;
        }
        console.log("🧭 Navigating to:", url);
        window.location.href = url;
      `,

        // Auth actions
        validateThenApi: `
        console.log("✅ Validating form before API call");
        const fields = context.actionParams?.fields || [];
        const formData = context.formData || {};
        const apiKey = context.actionParams?.apiKey;
        
        if (!fields || fields.length === 0) {
          return await context.handlers.handleApiCall(apiKey, formData);
        }
        
        const { isValid, errors } = context.handlers.validateAllFields(fields, formData);
        
        if (!isValid) {
          console.error("❌ Validation failed:", errors);
          context.handlers.setFieldErrors(errors);
          const firstError = Object.values(errors)[0];
          context.handlers.showNotification({
            type: "toast",
            message: firstError,
            background: "#ef4444",
            duration: 3000,
          });
          return { success: false, errors };
        }
        
        console.log("✅ Validation passed, calling API");
        context.handlers.setFieldErrors({});
        return await context.handlers.handleApiCall(apiKey, formData);
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

        clearAuth: `
        console.log("🚪 Logging out...");
        context.handlers.clearAuthData();
        context.handlers.showNotification({
          type: "toast",
          message: "✅ Logged out successfully",
          background: "#10b981",
          duration: 2000,
        });
        console.log("✅ Logout complete");
      `,

        // Modal actions
        openModal: `
        const modalName = context.actionParams?.modal || context.actionParams?.modalName;
        if (!modalName) {
          console.error("❌ No modal name provided");
          return;
        }
        console.log("🎭 Opening modal:", modalName);
        context.handlers.setActiveModal(modalName);
      `,

        closeModal: `
        console.log("❌ Closing modal");
        context.handlers.setActiveModal(null);
        context.handlers.setFormData({});
      `,

        // API action
        api: `
        console.log("🚀 === API ACTION START ===");
        const apiKey = context.actionParams?.apiKey;
        const formDataToUse = context.payload || context.modalFormData || context.formData || {};
        
        if (!apiKey) {
          console.error("❌ No apiKey provided");
          return;
        }

        try {
          await context.handlers.handleApiCall(apiKey, formDataToUse, context.actionConfig);
          console.log("✅ API call completed");
        } catch (error) {
          console.error("❌ API call failed:", error);
        }
      `,

        reload: `
        console.log("🔄 Reloading page");
        window.location.reload();
      `,
      },
    },

    // 📄 LOGIN PAGE
    pages: {
      login: {
        title: "Login - HotelHub",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🏨 HotelHub",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
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
                    actionParams: { url: "/hotelhub" },
                  },
                  {
                    label: "Sign Up",
                    action: "navigateToPage",
                    actionParams: { url: "/hotelhub/signup" },
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #e2e8f0",
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
                "ui:title": "🏨 Welcome Back",
                "ui:description": "Sign in to manage your hotel",
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
                    "ui:placeholder": "manager@hotelhub.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                    validation: {
                      required: true,
                      requiredMessage: "📧 Email is required",
                      email: true,
                      emailMessage: "📧 Please enter a valid email",
                    },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "Enter your password",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                    validation: {
                      required: true,
                      requiredMessage: "🔒 Password is required",
                      minLength: 6,
                      minLengthMessage:
                        "🔒 Password must be at least 6 characters",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Sign In",
                    action: "validateThenApi",
                    actionParams: {
                      apiKey: "auth.login",
                      fields: [
                        {
                          name: "email",
                          label: "Email",
                          validation: {
                            required: true,
                            requiredMessage: "📧 Email is required",
                            email: true,
                            emailMessage: "📧 Please enter a valid email",
                          },
                        },
                        {
                          name: "password",
                          label: "Password",
                          validation: {
                            required: true,
                            requiredMessage: "🔒 Password is required",
                            minLength: 6,
                            minLengthMessage:
                              "🔒 Password must be at least 6 characters",
                          },
                        },
                      ],
                    },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
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
                    prefix: "Don't have an account?",
                    label: "Sign Up",
                    action: "navigateToPage",
                    actionParams: { url: "/hotelhub/signup" },
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
                "ui:content": "© 2024 HotelHub. All rights reserved.",
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

      // 📄 SIGNUP PAGE
      signup: {
        title: "Sign Up - HotelHub",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🏨 HotelHub",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
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
                    actionParams: { url: "/hotelhub" },
                  },
                  {
                    label: "Login",
                    action: "navigateToPage",
                    actionParams: { url: "/hotelhub/login" },
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #e2e8f0",
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
                "ui:title": "✨ Create Account",
                "ui:description": "Join HotelHub and start managing",
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
                    "ui:placeholder": "Create a password",
                    "ui:type": "password",
                    "ui:name": "password",
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
                        "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
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
                    actionParams: { url: "/hotelhub/login" },
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
                "ui:content": "© 2024 HotelHub. All rights reserved.",
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

      // 📄 DASHBOARD PAGE (Protected)
      dashboard: {
        title: "Dashboard - HotelHub",
        requireAuth: true,
        redirectIfNotAuth: "/hotelhub/login",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🏨 HotelHub",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
              },
              userInfo: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "{{auth.user?.email || 'User'}}",
                    action: "",
                    actionParams: {},
                  },
                  {
                    label: "Logout",
                    action: "clearAuth+reload",
                    actionParams: {},
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #e2e8f0",
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
            uiSchema: {
              menuHeading: {
                "ui:widget": "heading",
                "ui:text": "📋 Menu",
                "ui:level": "h3",
                "ui:styles": {
                  marginBottom: "30px",
                  fontSize: "1.2rem",
                  color: "#1e293b",
                  textAlign: "center",
                },
              },
              menuContainer: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "8px",
                "ui:styles": {
                  width: "100%",
                },
                "ui:children": [
                  {
                    "ui:widget": "button",
                    "ui:label": "🏠 Dashboard",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/dashboard" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 16px",
                      background: "transparent",
                      color: "#334155",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverStyles": {
                      background: "#e0f2fe",
                      color: "#0284c7",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "🛏️ Rooms",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/rooms" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 16px",
                      background: "transparent",
                      color: "#334155",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverStyles": {
                      background: "#e0f2fe",
                      color: "#0284c7",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "📅 Reservations",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/reservations" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 16px",
                      background: "transparent",
                      color: "#334155",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverStyles": {
                      background: "#e0f2fe",
                      color: "#0284c7",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "👥 Guests",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/guests" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 16px",
                      background: "transparent",
                      color: "#334155",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverStyles": {
                      background: "#e0f2fe",
                      color: "#0284c7",
                    },
                  },
                ],
              },
            },
            styles: {
              width: "250px",
              background: "#f8fafc",
              padding: "100px 20px 20px",
              minHeight: "100vh",
              borderRight: "1px solid #e2e8f0",
              position: "fixed",
              top: 0,
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              welcomeCard: {
                "ui:widget": "card",
                "ui:title": "👋 Welcome to HotelHub Dashboard",
                "ui:description":
                  "Logged in as: {{auth.user?.email || 'User'}}",
                "ui:styles": {
                  padding: "40px",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  color: "white",
                  border: "none",
                  marginBottom: "30px",
                },
              },
              statsGrid: {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "20px",
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "🛏️ Total Rooms",
                    "ui:description": "25 Rooms",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "#e0f2fe",
                      border: "2px solid #0ea5e9",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "✅ Available",
                    "ui:description": "18 Rooms",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "#d1fae5",
                      border: "2px solid #10b981",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🔒 Occupied",
                    "ui:description": "7 Rooms",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "#fee2e2",
                      border: "2px solid #ef4444",
                    },
                  },
                ],
              },
            },
            styles: {
              marginLeft: "250px",
              padding: "120px 40px 40px",
              background: "#ffffff",
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
                "ui:content": "© 2024 HotelHub. All rights reserved.",
                "ui:styles": { textAlign: "center", color: "#94a3b8" },
              },
            },
            styles: {
              marginLeft: "250px",
              background: "#1e293b",
              padding: "30px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      // 📄 ROOMS PAGE (Protected)
      rooms: {
        title: "Rooms - HotelHub",
        requireAuth: true,
        redirectIfNotAuth: "/hotelhub/login",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🏨 HotelHub",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
              },
              userInfo: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "{{auth.user?.email || 'User'}}",
                    action: "",
                    actionParams: {},
                  },
                  {
                    label: "Logout",
                    action: "clearAuth+reload",
                    actionParams: {},
                  },
                ],
              },
            },
            styles: {
              background: "#ffffff",
              borderBottom: "2px solid #e2e8f0",
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
            uiSchema: {
              menuHeading: {
                "ui:widget": "heading",
                "ui:text": "📋 Menu",
                "ui:level": "h3",
                "ui:styles": {
                  marginBottom: "30px",
                  fontSize: "1.2rem",
                  color: "#1e293b",
                  textAlign: "center",
                },
              },
              menuContainer: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "8px",
                "ui:styles": {
                  width: "100%",
                },
                "ui:children": [
                  {
                    "ui:widget": "button",
                    "ui:label": "🏠 Dashboard",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/dashboard" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 16px",
                      background: "transparent",
                      color: "#334155",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverStyles": {
                      background: "#e0f2fe",
                      color: "#0284c7",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "🛏️ Rooms",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/rooms" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 16px",
                      background: "transparent",
                      color: "#334155",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverStyles": {
                      background: "#e0f2fe",
                      color: "#0284c7",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "📅 Reservations",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/reservations" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 16px",
                      background: "transparent",
                      color: "#334155",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverStyles": {
                      background: "#e0f2fe",
                      color: "#0284c7",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "👥 Guests",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/guests" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 16px",
                      background: "transparent",
                      color: "#334155",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverStyles": {
                      background: "#e0f2fe",
                      color: "#0284c7",
                    },
                  },
                ],
              },
            },
            styles: {
              width: "250px",
              background: "#f8fafc",
              padding: "100px 20px 20px",
              minHeight: "100vh",
              borderRight: "1px solid #e2e8f0",
              position: "fixed",
              top: 0,
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {
              addRoom: {
                "ui:title": "Add New Room",
                "ui:theme": "light",
                "ui:styles": {
                  maxWidth: "500px",
                  padding: "40px",
                },
                "ui:fields": [
                  {
                    name: "roomNumber",
                    label: "Room Number",
                    type: "text",
                    placeholder: "101",
                    required: true,
                  },
                  {
                    name: "roomType",
                    label: "Room Type",
                    type: "text",
                    placeholder: "Deluxe, Suite, Standard",
                    required: true,
                  },
                  {
                    name: "price",
                    label: "Price per Night",
                    type: "number",
                    placeholder: "150",
                    required: true,
                  },
                  {
                    name: "status",
                    label: "Status",
                    type: "text",
                    placeholder: "Available",
                    required: true,
                  },
                ],
                "ui:actions": [
                  {
                    label: "Add Room",
                    action: "api",
                    actionParams: { apiKey: "rooms.create" },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "none",
                      marginTop: "10px",
                    },
                  },
                  {
                    label: "Cancel",
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
              pageHeader: {
                "ui:widget": "flexLayout",
                "ui:direction": "row",
                "ui:justify": "space-between",
                "ui:align": "center",
                "ui:styles": {
                  marginBottom: "30px",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "🛏️ Rooms Management",
                    "ui:level": "h1",
                    "ui:styles": {
                      margin: "0",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "➕ Add Room",
                    "ui:action": "openModal",
                    "ui:actionParams": { modal: "addRoom" },
                    "ui:variant": "primary",
                    "ui:styles": {
                      padding: "12px 24px",
                      background: "#0ea5e9",
                      color: "white",
                      borderRadius: "8px",
                      border: "none",
                      fontWeight: "600",
                    },
                  },
                ],
              },
              roomsTable: {
                "ui:widget": "dataTable",
                "ui:title": "Room List",
                "ui:id": "roomsTable",
                "ui:description": "Manage all hotel rooms",
                "ui:emptyText": "No rooms found",
                "ui:dataSource": "rooms.api",
                "ui:pagination": {
                  enabled: true,
                  pageSize: 10,
                },
                "ui:columns": [
                  {
                    key: "id",
                    title: "ID",
                    dataIndex: "id",
                    width: "80px",
                  },
                  {
                    key: "title",
                    title: "Room Number",
                    dataIndex: "title",
                  },
                  {
                    key: "body",
                    title: "Description",
                    dataIndex: "body",
                  },
                  {
                    key: "userId",
                    title: "Status",
                    dataIndex: "userId",
                  },
                  {
                    key: "actions",
                    title: "Actions",
                    type: "actions",
                    align: "center",
                    actions: [
                      {
                        label: "Edit",
                        action: "openModal",
                        actionParams: { modal: "addRoom" },
                        variant: "primary",
                      },
                      {
                        label: "Delete",
                        action: "api:deleteRoom",
                        variant: "danger",
                        confirm: true,
                        confirmMessage:
                          "Are you sure you want to delete this room?",
                      },
                    ],
                  },
                ],
              },
            },
            styles: {
              marginLeft: "250px",
              padding: "120px 40px 40px",
              background: "#ffffff",
              minHeight: "100vh",
            },
            triggers: [
              {
                event: "load",
                source: "rooms.api",
              },
            ],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content": "© 2024 HotelHub. All rights reserved.",
                "ui:styles": { textAlign: "center", color: "#94a3b8" },
              },
            },
            styles: {
              marginLeft: "250px",
              background: "#1e293b",
              padding: "30px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },
    },

    // 🏠 MAIN LANDING PAGE
    components: {
      navbar: {
        table: {},
        modal: {},
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🏨 HotelHub",
            "ui:styles": {
              fontSize: "28px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
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
                label: "{{auth.token ? '' : 'Login'}}",
                action: "{{auth.token ? '' : 'navigateToPage'}}",
                actionParams: { url: "/hotelhub/login" },
              },
              {
                label: "{{auth.token ? 'Dashboard' : ''}}",
                action: "{{auth.token ? 'navigateToPage' : ''}}",
                actionParams: { url: "/hotelhub/dashboard" },
              },
              {
                label: "{{auth.token ? 'Logout' : ''}}",
                action: "{{auth.token ? 'clearAuth+reload' : ''}}",
              },
            ],
          },
        },
        styles: {
          background: "#ffffff",
          borderBottom: "2px solid #e2e8f0",
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
          hero: {
            "ui:widget": "hero",
            "ui:title": "Welcome to HotelHub",
            "ui:subtitle": "Modern Hotel Management System",
            "ui:cta": {
              label: "Get Started",
              action: "navigateToPage",
              actionParams: { url: "/hotelhub/login" },
            },
            "ui:styles": {
              background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
              minHeight: "600px",
              padding: "180px 40px 100px",
            },
          },
        },
        styles: {
          padding: "0",
          background: "#ffffff",
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
            "ui:content": "© 2024 HotelHub. All rights reserved.",
            "ui:styles": { textAlign: "center", color: "#94a3b8" },
          },
        },
        styles: {
          background: "#1e293b",
          padding: "40px",
          textAlign: "center",
        },
        triggers: [],
      },
    },
  },

  // backend/seeds/platform-auth.js (REPLACE ENTIRE FILE)
  {
    title: "BuilderPlatform - Create Websites Without Code",
    slug: "auth",
    projectUUID: "platform-auth-001",
    taskUUID: "auth001",
    status: "Active",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,

    initialization: {
      globalCSS: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      /* ============================================ */
      /* BASE STYLES - Light Mode (Default)           */
      /* ============================================ */
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        background: #ffffff !important;
        color: #1e293b !important;
        position: relative;
        min-height: 100vh;
        transition: background 0.5s ease, color 0.5s ease;
        overflow-x: hidden;
      }

      /* Light mode logo fix */
      body:not(.dark-mode) nav [class*="logo"],
      body:not(.dark-mode) nav [style*="gradient"],
      body:not(.dark-mode) .navbar-logo {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }

      /* ============================================ */
      /* NAVIGATION LINKS - UPDATED FIX               */
      /* ============================================ */
      /* NAVBAR - DARK MODE - TRUE BLACK */
      body.dark-mode nav,
      body.dark-mode header,
      body.dark-mode nav > *,
      body.dark-mode header > *,
      body.dark-mode .navbar {
        background: #000000 !important;
        border-bottom: 2px solid #333333 !important;
        backdrop-filter: blur(12px) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6) !important;
      }

      /* FOOTER - DARK MODE - TRUE BLACK */
      body.dark-mode footer,
      body.dark-mode footer > * {
        background: #000000 !important;
        border-top: 2px solid #333333 !important;
      }

      /* Ensure all text inside navbar/footer is visible */
      body.dark-mode nav *,
      body.dark-mode header *,
      body.dark-mode .navbar *,
      body.dark-mode footer * {
        color: #ffffff !important;
      }

      /* Specific nav links styling */
      body.dark-mode nav a,
      body.dark-mode .nav-links a,
      body.dark-mode [class*="navLink"],
      body.dark-mode [class*="nav-link"],
      body.dark-mode .navbar-links a,
      body.dark-mode .ui-navLinks a {
        color: #ffffff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.7);
        opacity: 1 !important;
        font-weight: 600 !important;
      }

      /* Hover state */
      body.dark-mode nav a:hover,
      body.dark-mode .nav-links a:hover,
      body.dark-mode [class*="navLink"]:hover,
      body.dark-mode [class*="nav-link"]:hover {
        color: #60a5fa !important;
        transform: translateY(-2px);
        transition: all 0.3s ease;
      }

      /* Light mode nav */
      body:not(.dark-mode) nav,
      body:not(.dark-mode) header,
      body:not(.dark-mode) nav > *,
      body:not(.dark-mode) header > * {
        background: rgba(255, 255, 255, 0.98) !important;
        border-bottom-color: #e2e8f0 !important;
        backdrop-filter: blur(10px);
      }

      body:not(.dark-mode) nav a,
      body:not(.dark-mode) .nav-links a,
      body:not(.dark-mode) [class*="navLink"],
      body:not(.dark-mode) [class*="nav-link"] {
        color: #0e5ad4 !important;
        font-weight: 600 !important;
      }

      body:not(.dark-mode) nav a:hover {
        color: #2563eb !important;
      }

      /* ============================================ */
      /* DARK MODE - True Black + Winter Sky          */
      /* ============================================ */
      body.dark-mode {
        background: #000000 !important;
        color: #ffffff !important;
      }

      /* Fix ALL sections for dark mode */
      body.dark-mode #home,
      body.dark-mode #features,
      body.dark-mode #pricing,
      body.dark-mode #login {
        background: #000000 !important;
        position: relative;
        z-index: 10;
      }

      /* Pricing section specific dark mode */
      body.dark-mode .pricing-section-bg {
        background: #000000 !important;
      }

      /* ============================================ */
      /* ANIMATIONS - FIXED FOR DARK MODE             */
      /* ============================================ */
      
      /* Stars container - FIXED POSITIONING */
      .stars-container {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 1 !important;
        pointer-events: none !important;
        overflow: hidden !important;
      }

      /* Star animation - FIXED */
      .star {
        position: absolute !important;
        background-color: white !important;
        border-radius: 50% !important;
        animation: twinkle 3s infinite !important;
      }

      @keyframes twinkle {
        0%, 100% { 
          opacity: 0.2; 
          transform: scale(1);
        }
        50% { 
          opacity: 1; 
          transform: scale(1.1);
        }
      }

      /* Shooting star animation - FIXED */
      .shooting-star {
        position: absolute !important;
        width: 100px !important;
        height: 2px !important;
        background: linear-gradient(90deg, rgba(255,255,255,0), white, rgba(255,255,255,0)) !important;
        border-radius: 50% !important;
        animation: shootingStar 3s infinite !important;
        z-index: 2 !important;
      }

      @keyframes shootingStar {
        0% {
          transform: translateX(-100px) translateY(0px) rotate(45deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateX(calc(100vw + 100px)) translateY(calc(100vh + 100px)) rotate(45deg);
          opacity: 0;
        }
      }

      /* Snowflake animation - FIXED */
      .snowflake {
        position: absolute !important;
        background-color: white !important;
        border-radius: 50% !important;
        opacity: 0.8 !important;
        animation: fall linear infinite !important;
        z-index: 2 !important;
      }

      @keyframes fall {
        0% {
          transform: translateY(-100px) translateX(0px) rotate(0deg);
          opacity: 0.8;
        }
        100% {
          transform: translateY(100vh) translateX(calc(100px * var(--random-x))) rotate(360deg);
          opacity: 0;
        }
      }

      /* Ensure content is above stars/snow */
      body.dark-mode > div,
      body.dark-mode section,
      body.dark-mode main,
      body.dark-mode aside,
      body.dark-mode article {
        background: transparent !important;
        position: relative;
        z-index: 20 !important;
      }

      /* Better dark mode border consistency */
      body.dark-mode * {
        border-color: #333333 !important;
      }

      /* ============================================ */
      /* CARDS & OTHER COMPONENTS - DARK MODE         */
      /* ============================================ */
      body.dark-mode article,
      body.dark-mode [class*="card"],
      body.dark-mode div[style*="background: white"],
      body.dark-mode div[style*="background:white"],
      body.dark-mode .white-bg-section {
        background: rgba(0, 0, 0, 0.8) !important;
        border-color: #333333 !important;
        color: #ffffff !important;
        backdrop-filter: blur(10px);
      }

      /* Specific pricing cards */
      body.dark-mode .pricing-card {
        background: rgba(0, 0, 0, 0.9) !important;
        border-color: #333333 !important;
      }

      /* Headings & Text */
      body.dark-mode h1, body.dark-mode h2, body.dark-mode h3,
      body.dark-mode h4, body.dark-mode h5, body.dark-mode h6 {
        color: #ffffff !important;
        text-shadow: 0 2px 4px rgba(0,0,0,0.8);
      }

      body.dark-mode p,
      body.dark-mode span:not(.gradient-text),
      body.dark-mode div:not(.star):not(.shooting-star):not(.snowflake) {
        color: #e5e7eb !important;
      }

      /* Forms */
      body.dark-mode input,
      body.dark-mode textarea,
      body.dark-mode select {
        background: rgba(0, 0, 0, 0.8) !important;
        border-color: #333333 !important;
        color: #ffffff !important;
      }

      body.dark-mode input::placeholder,
      body.dark-mode textarea::placeholder {
        color: #9ca3af !important;
      }

      /* Gradient text - Robin Devkota style */
      .gradient-text,
      span[style*="gradient"],
      h2[style*="gradient"] {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }

      /* Light mode gradient text */
      body:not(.dark-mode) h1.gradient-heading,
      body:not(.dark-mode) h2.gradient-heading,
      body:not(.dark-mode) h3.gradient-heading {
        background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }

      /* Gray text color */
      .gray-text {
        color: #64748b !important;
      }

      body.dark-mode .gray-text {
        color: #94a3b8 !important;
      }

      /* Section backgrounds */
      .white-bg-section {
        background: #ffffff !important;
      }

      body.dark-mode .white-bg-section {
        background: #000000 !important;
      }

      /* Hero Image Styling */
      .hero-image {
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        transition: transform 0.3s ease;
      }

      .hero-image:hover {
        transform: translateY(-5px);
      }

      body.dark-mode .hero-image {
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        filter: brightness(0.8) contrast(1.2);
      }

      /* CENTERED FORM STYLING - CRITICAL FIX */
      #login {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        text-align: center !important;
        width: 100% !important;
      }

      .login-form-container {
        width: 100% !important;
        max-width: 450px !important;
        margin: 0 auto !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }

      /* Scrollbar */
      body.dark-mode::-webkit-scrollbar-track {
        background: #000000;
      }
      body.dark-mode::-webkit-scrollbar-thumb {
        background: #333333;
      }
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 5px;
      }

      /* Smooth scrolling & fade animation */
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(40px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .fade-in {
        animation: fadeInUp 0.8s ease-out;
      }

      /* Smooth scroll padding for fixed navbar */
      section {
        scroll-margin-top: 80px;
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .hero-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          text-align: center !important;
        }
        
        .hero-image {
          order: -1;
          max-width: 100% !important;
        }
        
        .hero-content {
          padding: 0 20px !important;
        }
      }
    `,

      actions: {
        toggleTheme: `
        console.log('🌓 Toggling theme');
        const body = document.body;
        const isDark = body.classList.contains('dark-mode');

        if (isDark) {
          // Switching to LIGHT mode
          body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
          console.log('☀️ Light mode');
          
          // Remove effects container
          const effectsContainer = document.querySelector('.stars-container');
          if (effectsContainer) {
            effectsContainer.remove();
          }
          
        } else {
          // Switching to DARK mode
          body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
          console.log('🌙 Dark mode with stars and snow');
          
          // Create effects container
          let effectsContainer = document.querySelector('.stars-container');
          if (!effectsContainer) {
            effectsContainer = document.createElement('div');
            effectsContainer.className = 'stars-container';
            effectsContainer.style.position = 'fixed';
            effectsContainer.style.top = '0';
            effectsContainer.style.left = '0';
            effectsContainer.style.width = '100vw';
            effectsContainer.style.height = '100vh';
            effectsContainer.style.zIndex = '1';
            effectsContainer.style.pointerEvents = 'none';
            effectsContainer.style.overflow = 'hidden';
            document.body.appendChild(effectsContainer);
            
            // Create stars
            for (let i = 0; i < 150; i++) {
              const star = document.createElement('div');
              star.className = 'star';
              star.style.width = Math.random() * 3 + 1 + 'px';
              star.style.height = star.style.width;
              star.style.left = Math.random() * 100 + '%';
              star.style.top = Math.random() * 100 + '%';
              star.style.animationDuration = (Math.random() * 2 + 1) + 's';
              star.style.animationDelay = Math.random() * 5 + 's';
              star.style.animationTimingFunction = 'ease-in-out';
              star.style.animationIterationCount = 'infinite';
              effectsContainer.appendChild(star);
            }
            
            // Create shooting stars
            for (let i = 0; i < 5; i++) {
              const shootingStar = document.createElement('div');
              shootingStar.className = 'shooting-star';
              shootingStar.style.left = Math.random() * 100 + '%';
              shootingStar.style.top = Math.random() * 100 + '%';
              shootingStar.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
              shootingStar.style.animationDelay = Math.random() * 8 + 's';
              shootingStar.style.animationIterationCount = 'infinite';
              effectsContainer.appendChild(shootingStar);
            }
            
            // Create snowflakes
            for (let i = 0; i < 80; i++) {
              const snowflake = document.createElement('div');
              snowflake.className = 'snowflake';
              const size = Math.random() * 4 + 2;
              snowflake.style.width = size + 'px';
              snowflake.style.height = size + 'px';
              snowflake.style.left = Math.random() * 100 + '%';
              snowflake.style.top = Math.random() * -100 + 'px';
              const duration = Math.random() * 4 + 6;
              snowflake.style.animationDuration = duration + 's';
              snowflake.style.animationDelay = Math.random() * 5 + 's';
              snowflake.style.animationIterationCount = 'infinite';
              snowflake.style.setProperty('--random-x', Math.random() * 2 - 1);
              effectsContainer.appendChild(snowflake);
            }
            
            console.log('✨ Created effects: 150 stars, 5 shooting stars, 80 snowflakes');
          }
        }
      `,

        loadTheme: `
        console.log('🎨 Loading theme');
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
          document.body.classList.add('dark-mode');
          console.log('🌙 Dark mode loaded with stars and snow');
          
          // Create effects container after a short delay to ensure DOM is ready
          setTimeout(() => {
            let effectsContainer = document.querySelector('.stars-container');
            if (!effectsContainer) {
              effectsContainer = document.createElement('div');
              effectsContainer.className = 'stars-container';
              effectsContainer.style.position = 'fixed';
              effectsContainer.style.top = '0';
              effectsContainer.style.left = '0';
              effectsContainer.style.width = '100vw';
              effectsContainer.style.height = '100vh';
              effectsContainer.style.zIndex = '1';
              effectsContainer.style.pointerEvents = 'none';
              effectsContainer.style.overflow = 'hidden';
              document.body.appendChild(effectsContainer);
              
              // Create stars
              for (let i = 0; i < 150; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.width = Math.random() * 3 + 1 + 'px';
                star.style.height = star.style.width;
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDuration = (Math.random() * 2 + 1) + 's';
                star.style.animationDelay = Math.random() * 5 + 's';
                star.style.animationTimingFunction = 'ease-in-out';
                star.style.animationIterationCount = 'infinite';
                effectsContainer.appendChild(star);
              }
              
              // Create shooting stars
              for (let i = 0; i < 5; i++) {
                const shootingStar = document.createElement('div');
                shootingStar.className = 'shooting-star';
                shootingStar.style.left = Math.random() * 100 + '%';
                shootingStar.style.top = Math.random() * 100 + '%';
                shootingStar.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
                shootingStar.style.animationDelay = Math.random() * 8 + 's';
                shootingStar.style.animationIterationCount = 'infinite';
                effectsContainer.appendChild(shootingStar);
              }
              
              // Create snowflakes
              for (let i = 0; i < 80; i++) {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                const size = Math.random() * 4 + 2;
                snowflake.style.width = size + 'px';
                snowflake.style.height = size + 'px';
                snowflake.style.left = Math.random() * 100 + '%';
                snowflake.style.top = Math.random() * -100 + 'px';
                const duration = Math.random() * 4 + 6;
                snowflake.style.animationDuration = duration + 's';
                snowflake.style.animationDelay = Math.random() * 5 + 's';
                snowflake.style.animationIterationCount = 'infinite';
                snowflake.style.setProperty('--random-x', Math.random() * 2 - 1);
                effectsContainer.appendChild(snowflake);
              }
              
              console.log('✨ Created effects: 150 stars, 5 shooting stars, 80 snowflakes');
            }
          }, 100);
        }
      `,

        scrollToSection: `
        const section = context.actionParams?.section;
        if (!section) return;
        console.log('🎯 Scrolling to:', section);
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      `,
        // In platform-auth.js - Update handleLogin to call real API

        handleLogin: `
console.log('🔐 Login action triggered');
const email = context.formData?.email;
const password = context.formData?.password;

if (!email || !password) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Please enter email and password',
    background: '#ef4444'
  });
  return;
}

try {
  // ✅ Call real backend API
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // Important for cookies
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    context.handlers.showNotification({
      type: 'toast',
      message: data.error || '❌ Login failed',
      background: '#ef4444'
    });
    return;
  }

  console.log('✅ Login successful:', data);

  // ✅ Cookie is set automatically by backend
  // Optionally store user data in localStorage for client-side access
  localStorage.setItem('user_email', data.user.email);
  localStorage.setItem('user_role', data.user.role);
  localStorage.setItem('user_id', data.user.id);

  context.handlers.showNotification({
    type: 'toast',
    message: \`✅ Welcome back, \${data.user.firstName || 'User'}!\`,
    background: '#10b981'
  });

  // Redirect based on role
  setTimeout(() => {
    if (data.user.role === 'SUPER_ADMIN') {
      window.location.href = '/dashboard';
    } else if (data.user.role === 'CLIENT_ADMIN') {
      window.location.href = '/dashboard';
    } else if (data.user.role === 'DEVELOPER') {
      window.location.href = '/projects';
    }
  }, 1000);

} catch (error) {
  console.error('Login error:', error);
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Network error. Please try again.',
    background: '#ef4444'
  });
}
`,

        handleSignup: `
        console.log('📝 Platform Signup');
        const formData = context.formData;

        if (!formData?.email || !formData?.password || !formData?.organizationName) {
          context.handlers.showNotification({
            type: 'toast',
            message: '❌ Please fill all fields',
            background: '#ef4444'
          });
          return;
        }

        context.handlers.showNotification({
          type: 'toast',
          message: '✅ Account created! Please login.',
          background: '#10b981'
        });

        setTimeout(() => {
          const loginSection = document.getElementById('login');
          if (loginSection) {
            loginSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1500);
      `,
      },
    },

    components: {
      navbar: {
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🚀 BuilderPlatform",
            "ui:styles": {
              fontSize: "24px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              cursor: "pointer",
            },
            "ui:action": "scrollToSection",
            "ui:actionParams": { section: "home" },
          },

          themeToggle: {
            "ui:widget": "toggle",
            "ui:label": "",
            "ui:size": "medium",
            "ui:onChange": "toggleTheme",
            "ui:styles": {
              marginLeft: "auto",
              marginRight: "20px",
            },
          },

          navLinks: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              {
                label: "Home",
                action: "scrollToSection",
                actionParams: { section: "home" },
                styles: {
                  color: "#475569",
                  fontWeight: "600",
                  padding: "10px 15px",
                  cursor: "pointer",
                },
              },
              {
                label: "Features",
                action: "scrollToSection",
                actionParams: { section: "features" },
                styles: {
                  color: "#475569",
                  fontWeight: "600",
                  padding: "10px 15px",
                  cursor: "pointer",
                },
              },
              {
                label: "Pricing",
                action: "scrollToSection",
                actionParams: { section: "pricing" },
                styles: {
                  color: "#475569",
                  fontWeight: "600",
                  padding: "10px 15px",
                  cursor: "pointer",
                },
              },
              {
                label: "Login",
                action: "scrollToSection",
                actionParams: { section: "login" },
                styles: {
                  color: "#1e40af",
                  fontWeight: "600",
                  padding: "10px 20px",
                  border: "2px solid #1e40af",
                  borderRadius: "8px",
                  cursor: "pointer",
                },
              },
            ],
          },
        },
        styles: {
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 10000,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        },
        triggers: [
          {
            event: "load",
            action: "loadTheme",
          },
        ],
      },

      main: {
        uiSchema: {
          // ========== HOME SECTION (2-COLUMN LAYOUT) ==========
          homeSection: {
            "ui:widget": "container",
            "ui:id": "home",
            "ui:className": "white-bg-section",
            "ui:styles": {
              minHeight: "100vh",
              padding: "120px 40px 80px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              zIndex: 20,
            },
            "ui:children": [
              {
                "ui:widget": "gridLayout",
                "ui:className": "hero-grid",
                "ui:columns": 2,
                "ui:gap": "80px",
                "ui:alignItems": "center",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "0 auto",
                  width: "100%",
                  zIndex: 20,
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:className": "hero-content",
                    "ui:direction": "column",
                    "ui:gap": "24px",
                    "ui:styles": {
                      textAlign: "left",
                      zIndex: 20,
                    },
                    "ui:children": [
                      {
                        "ui:widget": "heading",
                        "ui:text": "Build Websites Without Code",
                        "ui:level": "h1",
                        "ui:className": "gradient-heading",
                        "ui:styles": {
                          fontSize: "3.5rem",
                          fontWeight: "800",
                          lineHeight: "1.2",
                          marginBottom: "0",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text":
                          "The fastest way to create beautiful, dynamic websites using JSON configurations. Perfect for agencies, developers, and businesses.",
                        "ui:className": "gray-text",
                        "ui:styles": {
                          fontSize: "1.3rem",
                          lineHeight: "1.8",
                          marginBottom: "0",
                        },
                      },
                      {
                        "ui:widget": "flexLayout",
                        "ui:direction": "row",
                        "ui:gap": "20px",
                        "ui:styles": {
                          marginTop: "10px",
                          zIndex: 20,
                        },
                        "ui:children": [
                          {
                            "ui:widget": "button",
                            "ui:label": "Get Started Free",
                            "ui:action": "scrollToSection",
                            "ui:actionParams": { section: "pricing" },
                            "ui:styles": {
                              padding: "16px 32px",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              background: "#1e40af",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              cursor: "pointer",
                              boxShadow: "0 4px 14px rgba(30, 64, 175, 0.2)",
                              transition: "all 0.3s ease",
                              zIndex: 20,
                            },
                          },
                          {
                            "ui:widget": "button",
                            "ui:label": "View Demo",
                            "ui:action": "navigate",
                            "ui:actionParams": { url: "/shopzone" },
                            "ui:styles": {
                              padding: "16px 32px",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              background: "transparent",
                              color: "#1e40af",
                              border: "2px solid #1e40af",
                              borderRadius: "8px",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              zIndex: 20,
                            },
                          },
                        ],
                      },
                      {
                        "ui:widget": "spacer",
                        "ui:height": 30,
                      },
                      {
                        "ui:widget": "text",
                        "ui:content":
                          "✨ Trusted by 500+ agencies and developers worldwide",
                        "ui:className": "gray-text",
                        "ui:styles": {
                          fontSize: "0.95rem",
                          opacity: "0.9",
                        },
                      },
                    ],
                  },
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:alignItems": "center",
                    "ui:justifyContent": "center",
                    "ui:styles": {
                      position: "relative",
                      zIndex: 20,
                    },
                    "ui:children": [
                      {
                        "ui:widget": "image",
                        "ui:src":
                          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80",
                        "ui:alt": "BuilderPlatform Dashboard",
                        "ui:className": "hero-image",
                        "ui:styles": {
                          width: "100%",
                          maxWidth: "600px",
                          height: "auto",
                          borderRadius: "16px",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                          zIndex: 20,
                        },
                      },
                      {
                        "ui:widget": "container",
                        "ui:styles": {
                          position: "absolute",
                          bottom: "-30px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "white",
                          borderRadius: "12px",
                          padding: "20px",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          border: "1px solid #e2e8f0",
                          width: "80%",
                          maxWidth: "400px",
                          zIndex: 20,
                        },
                        "ui:children": [
                          {
                            "ui:widget": "text",
                            "ui:content": "🚀 Live Preview",
                            "ui:styles": {
                              fontSize: "1rem",
                              fontWeight: "600",
                              color: "#1e40af",
                              marginBottom: "5px",
                            },
                          },
                          {
                            "ui:widget": "text",
                            "ui:content":
                              "See real-time JSON configuration changes",
                            "ui:className": "gray-text",
                            "ui:styles": {
                              fontSize: "0.9rem",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // ========== FEATURES SECTION ==========
          featuresSection: {
            "ui:widget": "container",
            "ui:id": "features",
            "ui:className": "white-bg-section",
            "ui:styles": {
              minHeight: "100vh",
              padding: "100px 40px",
              zIndex: 20,
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "⚡ Powerful Features",
                "ui:level": "h2",
                "ui:className": "gradient-heading",
                "ui:styles": {
                  textAlign: "center",
                  fontSize: "2.8rem",
                  fontWeight: "800",
                  marginBottom: "20px",
                },
              },
              {
                "ui:widget": "paragraph",
                "ui:text":
                  "Everything you need to build and manage beautiful websites",
                "ui:className": "gray-text",
                "ui:styles": {
                  textAlign: "center",
                  fontSize: "1.2rem",
                  marginBottom: "60px",
                  maxWidth: "600px",
                  margin: "0 auto 60px",
                },
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "40px",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "0 auto",
                },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "🎨 50+ Widgets",
                    "ui:description":
                      "Pre-built components for forms, cards, tables, modals, and more. Build complex UIs without code.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "⚡ JSON Config",
                    "ui:description":
                      "Everything is JSON. Version control, easy updates, no code. Perfect for teams and agencies.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🚀 Instant Deploy",
                    "ui:description":
                      "Custom domains, SSL, CDN included. Your site live in minutes, not hours.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "👥 Team Collaboration",
                    "ui:description":
                      "Invite developers, assign projects, manage permissions. Built for teams.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🔌 API Integration",
                    "ui:description":
                      "Connect to any API. Built-in handlers for authentication, data fetching, and more.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "📊 Analytics",
                    "ui:description":
                      "Track page views, user behavior, and performance. Make data-driven decisions.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                    },
                  },
                ],
              },
            ],
          },

          // ========== PRICING SECTION ==========
          pricingSection: {
            "ui:widget": "container",
            "ui:id": "pricing",
            "ui:className": "pricing-section-bg",
            "ui:styles": {
              minHeight: "100vh",
              padding: "100px 40px",
              zIndex: 20,
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "💰 Simple, Transparent Pricing",
                "ui:level": "h2",
                "ui:className": "gradient-heading",
                "ui:styles": {
                  textAlign: "center",
                  fontSize: "2.8rem",
                  fontWeight: "800",
                  marginBottom: "20px",
                },
              },
              {
                "ui:widget": "paragraph",
                "ui:text":
                  "Choose the plan that fits your needs. Upgrade or downgrade anytime.",
                "ui:className": "gray-text",
                "ui:styles": {
                  textAlign: "center",
                  fontSize: "1.2rem",
                  marginBottom: "60px",
                  maxWidth: "600px",
                  margin: "0 auto 60px",
                },
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "40px",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "0 auto",
                },
                "ui:children": [
                  {
                    "ui:widget": "pricingCard",
                    "ui:title": "Starter",
                    "ui:price": "$99",
                    "ui:period": "/month",
                    "ui:features": [
                      "5 websites",
                      "4 team members",
                      "10 pages per site",
                      "1GB storage",
                      "Email support",
                      "Custom domains",
                    ],
                    "ui:buttonLabel": "Start Free Trial",
                    "ui:action": "scrollToSection",
                    "ui:actionParams": { section: "login" },
                    "ui:styles": {
                      border: "2px solid #e2e8f0",
                    },
                  },
                  {
                    "ui:widget": "pricingCard",
                    "ui:title": "Professional",
                    "ui:price": "$249",
                    "ui:period": "/month",
                    "ui:highlighted": true,
                    "ui:features": [
                      "15 websites",
                      "10 team members",
                      "50 pages per site",
                      "5GB storage",
                      "Priority support",
                      "White-label option",
                      "Advanced analytics",
                    ],
                    "ui:buttonLabel": "Get Started",
                    "ui:action": "scrollToSection",
                    "ui:actionParams": { section: "login" },
                    "ui:styles": {
                      border: "2px solid #1e40af",
                    },
                  },
                  {
                    "ui:widget": "pricingCard",
                    "ui:title": "Enterprise",
                    "ui:price": "$599",
                    "ui:period": "/month",
                    "ui:features": [
                      "Unlimited websites",
                      "25 team members",
                      "Unlimited pages",
                      "20GB storage",
                      "Dedicated support",
                      "Custom integrations",
                      "SLA guarantee",
                      "On-premise option",
                    ],
                    "ui:buttonLabel": "Contact Sales",
                    "ui:action": "scrollToSection",
                    "ui:actionParams": { section: "login" },
                    "ui:styles": {
                      border: "2px solid #e2e8f0",
                    },
                  },
                ],
              },
            ],
          },

          // ========== LOGIN SECTION (CENTERED - FIXED) ==========
          loginSection: {
            "ui:widget": "container",
            "ui:id": "login",
            "ui:className": "white-bg-section",
            "ui:styles": {
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "120px 20px 80px",
              width: "100%",
              boxSizing: "border-box",
              zIndex: 20,
            },
            "ui:children": [
              {
                "ui:widget": "container",
                "ui:className": "login-form-container",
                "ui:styles": {
                  width: "100%",
                  maxWidth: "450px",
                  background: "white",
                  borderRadius: "16px",
                  padding: "40px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                  margin: "0 auto",
                  zIndex: 20,
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "🚀 Welcome Back!",
                    "ui:level": "h2",
                    "ui:className": "gradient-heading",
                    "ui:styles": {
                      textAlign: "center",
                      marginBottom: "10px",
                      fontSize: "2rem",
                      fontWeight: "800",
                      width: "100%",
                    },
                  },
                  {
                    "ui:widget": "paragraph",
                    "ui:text": "Sign in to access your dashboard",
                    "ui:className": "gray-text",
                    "ui:styles": {
                      textAlign: "center",
                      marginBottom: "30px",
                      width: "100%",
                    },
                  },
                  {
                    "ui:widget": "formContainer",
                    "ui:title": "",
                    "ui:styles": {
                      border: "none",
                      padding: "0",
                      width: "100%",
                    },
                    "ui:fields": [
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Email Address",
                        "ui:name": "email",
                        "ui:type": "email",
                        "ui:placeholder": "you@company.com",
                        "ui:required": true,
                        "ui:styles": {
                          border: "2px solid #e2e8f0",
                          padding: "12px 16px",
                          width: "100%",
                          boxSizing: "border-box",
                        },
                      },
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Password",
                        "ui:name": "password",
                        "ui:type": "password",
                        "ui:placeholder": "Enter your password",
                        "ui:required": true,
                        "ui:styles": {
                          border: "2px solid #e2e8f0",
                          padding: "12px 16px",
                          width: "100%",
                          boxSizing: "border-box",
                        },
                      },
                    ],
                    "ui:actions": [
                      {
                        label: "Login",
                        action: "handleLogin",
                        variant: "primary",
                        styles: {
                          width: "100%",
                          padding: "14px",
                          fontSize: "1rem",
                          fontWeight: "600",
                          background: "#1e40af",
                          border: "none",
                          borderRadius: "8px",
                          color: "white",
                          cursor: "pointer",
                          boxSizing: "border-box",
                        },
                      },
                    ],
                  },
                  {
                    "ui:widget": "spacer",
                    "ui:height": 20,
                  },
                  {
                    "ui:widget": "text",
                    "ui:content":
                      "Don't have an account? Start with our free trial!",
                    "ui:className": "gray-text",
                    "ui:styles": {
                      textAlign: "center",
                      fontSize: "0.9rem",
                      width: "100%",
                    },
                  },
                ],
              },
            ],
          },
        },
        styles: {
          paddingTop: "80px",
          width: "100%",
          position: "relative",
          zIndex: 20,
        },
        triggers: [
          {
            event: "load",
            action: "loadTheme",
          },
        ],
      },

      footer: {
        uiSchema: {
          footerContent: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:align": "center",
            "ui:gap": "20px",
            "ui:children": [
              {
                "ui:widget": "text",
                "ui:content": "© 2025 BuilderPlatform. All rights reserved.",
                "ui:styles": {
                  color: "#94a3b8",
                  fontSize: "0.95rem",
                },
              },
              {
                "ui:widget": "text",
                "ui:content": "Built with ❤️ using JSON-driven architecture",
                "ui:styles": {
                  color: "#64748b",
                  fontSize: "0.9rem",
                },
              },
            ],
          },
        },
        styles: {
          background: "#1e293b",
          padding: "40px 20px",
          textAlign: "center",
          borderTop: "3px solid #1e40af",
          position: "relative",
          zIndex: 20,
        },
      },
    },

    resolvedAPIs: {},
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
