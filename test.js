"initialization": {
  "actions": {
    "openModal:authModal": "context.handlers.setActiveModal('authModal'); console.log('🔓 Opened auth modal');",
    
    "openModal:signupModal": "context.handlers.setActiveModal('signupModal'); console.log('📝 Opened signup modal');",
    
    "openModal:forgotModal": "context.handlers.setActiveModal('forgotModal'); console.log('🔑 Opened forgot password modal');",
    
    "openModal:profileModal": "context.handlers.setActiveModal('profileModal'); console.log('👤 Opened profile modal');",
    
    "openModal:aboutModal": "context.handlers.setActiveModal('aboutModal'); console.log('ℹ️ Opened about modal');",
    
    "closeModal": "context.handlers.setActiveModal(null); console.log('❌ Closed modal');",
    
    // API actions
    "api:auth.login": `
      console.log('🔐 API auth.login action triggered');
      const formData = context.modalFormData || context.payload || {};
      await context.handlers.handleApiCall('auth.login', formData, context.actionConfig);
      context.handlers.setActiveModal(null);
      console.log('✅ Login successful, modal closed');
    `,
    
    "api:auth.signup": `
      console.log('📝 API auth.signup action triggered');
      const formData = context.modalFormData || context.payload || {};
      await context.handlers.handleApiCall('auth.signup', formData, context.actionConfig);
      context.handlers.setActiveModal(null);
      console.log('✅ Signup successful, modal closed');
    `,
    
    "api:auth.forgot": `
      console.log('🔑 API auth.forgot action triggered');
      const formData = context.modalFormData || context.payload || {};
      await context.handlers.handleApiCall('auth.forgot', formData, context.actionConfig);
      console.log('✅ Reset link requested');
    `,
    
    // Navigation actions
    "navigate:/shopzone": "window.location.href = '/shopzone';",
    
    "navigate:/shopzone/categories": "window.location.href = '/shopzone/categories';",
    
    "navigate:/shopzone/cart": "window.location.href = '/shopzone/cart';",
    
    // Auth actions
    "clearAuth": `
      console.log('🚪 Clearing auth data');
      context.handlers.clearAuthData();
      context.handlers.showNotification({
        type: 'toast',
        message: '✅ Logged out successfully',
        background: '#10b981',
        duration: 2000
      });
    `,
    
    "reload": "window.location.reload();",
    
    "clearAuth+reload": `
      console.log('🚪 Logging out and reloading');
      context.handlers.clearAuthData();
      context.handlers.showNotification({
        type: 'toast',
        message: '✅ Logged out successfully',
        background: '#10b981',
        duration: 2000
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.reload();
    `,
    
    // Other actions you might need
    "scroll:#products": `
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    `
  }
}