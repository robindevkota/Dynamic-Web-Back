// REPLACE YOUR ENTIRE actions: { } IN demo.js WITH THIS:

actions: {
  // ========== API ACTION ==========
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

  // ========== NAVIGATION ==========
  navigate: `
    let url = context.actionParams?.url;
    if (!url) {
      console.error("❌ No URL provided");
      return;
    }
    
    if (url.includes('{{')) {
      url = context.handlers.resolveTemplate(url, {
        auth: context.handlers.getAuthData(),
        data: context.data,
        formData: context.formData,
        modalFormData: context.modalFormData
      });
    }
    
    if (url && url !== 'undefined' && url.trim() !== '') {
      console.log("🚀 Navigating to:", url);
      window.location.href = url;
    }
  `,

  navigateToPage: `
    let url = context.actionParams?.url;
    if (!url) return;
    
    if (url.includes('{{')) {
      url = context.handlers.resolveTemplate(url, {
        auth: context.handlers.getAuthData(),
        data: context.data,
      });
    }
    
    window.location.href = url;
  `,

  scrollToElement: `
    const target = context.actionParams?.target || context.actionParams?.selector;
    if (!target) return;
    
    const selector = target.startsWith('#') ? target : '#' + target;
    const element = document.querySelector(selector);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  `,

  scrollToTop: `
    window.scrollTo({ top: 0, behavior: "smooth" });
  `,

  goBack: `
    window.history.back();
  `,

  reload: `
    window.location.reload();
  `,

  reloadPage: `
    window.location.reload();
  `,

  // ========== MODALS ==========
  openModal: `
    const modalName = context.actionParams?.modal;
    context.handlers.setActiveModal(modalName);
    context.handlers.setModalFormData({});
    context.handlers.setFieldErrors({});
    
    if (context.payload?.selectedProduct) {
      const product = context.payload.selectedProduct;
      context.handlers.setData('selectedProduct', product);
      window.selectedProduct = product;
    }
  `,

  closeModal: `
    context.handlers.setActiveModal(null);
    context.handlers.setModalFormData({});
    context.handlers.setFieldErrors({});
  `,

  // ========== AUTH ==========
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
    context.handlers.clearAuthData();
    context.handlers.showNotification({
      message: "Logged out successfully",
      background: "#10b981",
    });
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


  // ========== CART ==========
  loadCartFromLocal: `
    try {
      const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
      const count = cart.length;
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      context.handlers.setData('cartCount', count);
      context.handlers.setData('cartItems', cart);
      context.handlers.setData('cartTotal', total);
      
      return { success: true, cart, count, total };
    } catch (error) {
      context.handlers.setData('cartCount', 0);
      context.handlers.setData('cartItems', []);
      context.handlers.setData('cartTotal', 0);
      return { success: false };
    }
  `,

  storeCartLocally: `
    const product = context.data?.selectedProduct || window.selectedProduct;
    const quantity = parseInt(context.modalFormData?.quantity) || 1;

    if (!product || !product.id) {
      context.handlers.showNotification({
        message: "Error: Product data not found",
        background: "#ef4444"
      });
      return { success: false };
    }

    try {
      const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
      const existingIndex = cart.findIndex(item => item.id === product.id);

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: quantity,
          category: product.category,
        });
      }

      localStorage.setItem("shopzone_cart", JSON.stringify(cart));

      const newCount = cart.length;
      const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      context.handlers.setData('cartCount', newCount);
      context.handlers.setData('cartItems', cart);
      context.handlers.setData('cartTotal', newTotal);
      
      context.handlers.showNotification({
        message: \`✅ \${product.title} added to cart!\`,
        background: "#10b981"
      });
      
      return { success: true, cart, count: newCount };
    } catch (error) {
      context.handlers.showNotification({
        message: "Failed to add to cart",
        background: "#ef4444"
      });
      return { success: false };
    }
  `,

  refreshCart: `
    try {
      const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
      const count = cart.length;
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      context.handlers.setData('cartCount', count);
      context.handlers.setData('cartItems', cart);
      context.handlers.setData('cartTotal', total);
      
      return { success: true, count, items: cart, total };
    } catch (error) {
      return { success: false };
    }
  `,

  refreshCartDisplay: `
    try {
      const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
      const count = cart.length;
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      context.handlers.setData('cartCount', count);
      context.handlers.setData('cartItems', cart);
      context.handlers.setData('cartTotal', total);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  `,

  removeFromCart: `
    try {
      const productId = context.actionParams?.productId || context.payload?.id;
      if (!productId) return { success: false };
      
      const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
      const newCart = cart.filter(item => item.id !== productId);
      
      localStorage.setItem("shopzone_cart", JSON.stringify(newCart));
      
      const newCount = newCart.length;
      const newTotal = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      context.handlers.setData('cartCount', newCount);
      context.handlers.setData('cartItems', newCart);
      context.handlers.setData('cartTotal', newTotal);
      
      context.handlers.showNotification({
        message: "🗑️ Removed from cart",
        background: "#ef4444"
      });
      
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  `,

  updateCartQuantity: `
    try {
      const productId = context.actionParams?.productId || context.payload?.id;
      const newQuantity = parseInt(context.actionParams?.quantity || context.payload?.quantity);
      
      if (!productId || !newQuantity) return { success: false };
      
      const cart = JSON.parse(localStorage.getItem("shopzone_cart") || "[]");
      const itemIndex = cart.findIndex(item => item.id === productId);
      
      if (itemIndex === -1) return { success: false };
      
      if (newQuantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = newQuantity;
      }
      
      localStorage.setItem("shopzone_cart", JSON.stringify(cart));
      
      const newCount = cart.length;
      const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      context.handlers.setData('cartCount', newCount);
      context.handlers.setData('cartItems', cart);
      context.handlers.setData('cartTotal', newTotal);
      
      context.handlers.showNotification({
        message: "✅ Cart updated",
        background: "#10b981"
      });
      
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  `,

  clearCart: `
    try {
      localStorage.removeItem("shopzone_cart");
      
      context.handlers.setData('cartCount', 0);
      context.handlers.setData('cartItems', []);
      context.handlers.setData('cartTotal', 0);
      
      context.handlers.showNotification({
        message: "🗑️ Cart cleared",
        background: "#64748b"
      });
      
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  `,

  // ========== FORMS ==========
  resetForm: `
    const formType = context.actionParams?.formType || 'main';
    
    if (formType === 'modal') {
      context.handlers.setModalFormData({});
    } else {
      context.handlers.setFormData({});
    }
    
    context.handlers.setFieldErrors({});
    
    if (context.actionParams?.resetFilters) {
      const originalData = context.data?.['products.api'] || [];
      context.handlers.setData('products.api_filtered', originalData);
    }
  `,

  // ========== UTILITIES ==========
  notify: `
    const type = context.actionParams?.type || 'info';
    const message = context.actionParams?.message || 'Notification';
    
    const backgrounds = {
      success: "#10b981",
      error: "#ef4444", 
      warning: "#f59e0b",
      info: "#3b82f6"
    };
    
    context.handlers.showNotification({
      message: message,
      background: backgrounds[type] || "#3b82f6"
    });
  `,

  applyDiscount: `
    const percent = context.actionParams?.percent || 10;
    context.handlers.showNotification({
      message: \`🎉 \${percent}% discount applied!\`,
      background: "#10b981"
    });
  `,

  delay: `
    const ms = context.actionParams?.ms || 1000;
    await new Promise(resolve => setTimeout(resolve, ms));
  `,

  logDebug: `
    const message = context.actionParams?.message || "Debug log";
    console.log("🔍 DEBUG:", message);
    console.log("📊 Context:", {
      actionParams: context.actionParams,
      payload: context.payload,
      data: context.data,
    });
  `,
}