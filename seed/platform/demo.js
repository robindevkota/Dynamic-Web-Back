const mongoose = require("mongoose");
const PageConfig = require("../../models/PageConfig"); // ✅ Fixed path from seed/platform to models

mongoose.connect(
  "mongodb+srv://admin:sjITV8nazkocOrCX@cluster0.sunkcl4.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const websites = [
  {
    title: "Chiyaz - Premium Tea & Coffee",
    slug: "chiyaz",
    projectUUID: "chiyaz-tea-coffee",
    taskUUID: "chiyaz001",
    status: "Active",
    isTemplate: false,
    templateCategory: "E-commerce",
    organizationId: "6981d54da9b6db6a9fd3cb5f",
    createdBy: "000000000000000000000000",
    accountValidation: true,
    otpValidation: false,
    isAnonymous: false,
    requireAuth: false,
    redirectIfNotAuth: "/chiyaz/login",

    initialization: {
      globalCSS: `/* ============================================ */
/* CHIYAZ TEA & COFFEE - PREMIUM STYLING */
/* ============================================ */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* These styles get applied automatically */
.chiyaz-review-card {
  background: rgba(44, 24, 16, 0.85) !important;
  border: 1px solid rgba(212, 185, 150, 0.2) !important;
  color: #F5E9D9 !important;
}

.chiyaz-rating-star {
  color: #D2691E !important;
}

.chiyaz-review-header {
  font-family: 'Playfair Display', serif !important;
}

/* ============================================ */
/* PROJECT GRID SPECIFIC STYLING - Tea & Coffee Cards */
/* ============================================ */

/* Override ALL project grid cards */
.project-grid-item,
.product-card,
.item-card,
.grid-item,
.project-card,
[class*="grid-item"],
[class*="product-card"],
[class*="item-card"] {
  background: rgba(44, 24, 16, 0.85) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(212, 185, 150, 0.2) !important;
  border-radius: 20px !important;
  color: #F5E9D9 !important;
  overflow: hidden !important;
  transition: all 0.3s ease !important;
}

.project-grid-item:hover,
.product-card:hover,
.item-card:hover {
  transform: translateY(-10px) !important;
  box-shadow: 0 20px 40px rgba(139, 69, 19, 0.3) !important;
  border: 1px solid rgba(212, 185, 150, 0.4) !important;
}

/* Project grid card content */
.project-grid-item h3,
.project-grid-item h4,
.product-card h3,
.product-card h4,
.item-card h3,
.item-card h4,
[class*="grid-item"] h3,
[class*="grid-item"] h4 {
  color: #F5E9D9 !important;
  font-family: 'Playfair Display', serif !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}

.project-grid-item p,
.product-card p,
.item-card p,
[class*="grid-item"] p {
  color: rgba(245, 233, 217, 0.9) !important;
}

.project-grid-item .price,
.product-card .price,
.item-card .price,
[class*="grid-item"] .price {
  color: #D2691E !important;
  font-weight: 700 !important;
}

/* Project grid container */
.project-grid-container {
  background: transparent !important;
  padding: 20px 0 !important;
}

/* ============================================ */
/* CUSTOMER REVIEWS SPECIFIC STYLING */
/* ============================================ */

/* Override ALL customer review cards */
.customer-review-card,
.review-card,
.testimonial-card,
[class*="review-card"],
[class*="testimonial-card"] {
  background: rgba(44, 24, 16, 0.85) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(212, 185, 150, 0.2) !important;
  border-radius: 20px !important;
  color: #F5E9D9 !important;
  padding: 30px !important;
  transition: all 0.3s ease !important;
}

.customer-review-card:hover,
.review-card:hover,
.testimonial-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 15px 30px rgba(139, 69, 19, 0.3) !important;
  border: 1px solid rgba(212, 185, 150, 0.4) !important;
}

/* Review card content */
.customer-review-card h4,
.review-card h4,
.testimonial-card h4,
[class*="review-card"] h4 {
  color: #F5E9D9 !important;
  font-family: 'Playfair Display', serif !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}

.customer-review-card p,
.review-card p,
.testimonial-card p,
[class*="review-card"] p {
  color: rgba(245, 233, 217, 0.9) !important;
  line-height: 1.6 !important;
}

.customer-review-card .rating,
.review-card .rating,
.testimonial-card .rating,
[class*="review-card"] .rating {
  color: #D2691E !important;
}

/* Review section container */
.reviews-section,
.customer-reviews-section,
[class*="reviews-section"] {
  background: transparent !important;
}

/* Review summary */
.review-summary,
.rating-summary,
[class*="summary"] {
  background: rgba(44, 24, 16, 0.85) !important;
  border: 1px solid rgba(212, 185, 150, 0.2) !important;
  border-radius: 20px !important;
  color: #F5E9D9 !important;
  padding: 25px !important;
}

.review-summary h3,
.rating-summary h3,
[class*="summary"] h3 {
  color: #F5E9D9 !important;
  font-family: 'Playfair Display', serif !important;
}

/* Write review button */
.write-review-btn,
[class*="write-review"] {
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%) !important;
  color: #F5E9D9 !important;
  border: none !important;
  border-radius: 25px !important;
  padding: 12px 30px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.write-review-btn:hover,
[class*="write-review"]:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 10px 20px rgba(139, 69, 19, 0.5) !important;
}

/* ============================================ */
/* BASE STYLES - Tea & Coffee Theme */
/* ============================================ */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%) !important;
  background-attachment: fixed !important;
  color: #2C1810 !important;
  min-height: 100vh;
  transition: background 0.6s ease, color 0.6s ease;
  overflow-x: hidden;
}

/* ============================================ */
/* DARK MODE - Coffee Shop Vibes */
/* ============================================ */
body.dark-mode {
  background: linear-gradient(135deg, #1A120B 0%, #3E2723 70%, #1A120B 100%) !important;
  background-attachment: fixed !important;
  color: #F5E9D9 !important;
}

/* Navbar links in dark mode */
body.dark-mode nav a,
body.dark-mode nav button {
  color: #F5E9D9 !important;
  transition: all 0.2s ease;
}

body.dark-mode nav a:hover,
body.dark-mode nav button:hover {
  color: #D2691E !important;
  background: rgba(212, 185, 150, 0.1) !important;
}

/* Glass card styling */
.glass-card {
  background: rgba(44, 24, 16, 0.85) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(212, 185, 150, 0.2) !important;
  box-shadow: 0 8px 32px 0 rgba(139, 69, 19, 0.25) !important;
  color: #F5E9D9 !important;
}

body.dark-mode .glass-card {
  background: rgba(30, 18, 11, 0.9) !important;
  border: 1px solid rgba(212, 185, 150, 0.3) !important;
  color: #F5E9D9 !important;
}

/* Card text visibility */
.glass-card h1,
.glass-card h2,
.glass-card h3,
.glass-card p,
.glass-card span {
  color: #F5E9D9 !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}

/* Navbar styling */
body nav,
body header {
  background: rgba(44, 24, 16, 0.95) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border-bottom: 2px solid rgba(212, 185, 150, 0.3) !important;
  color: #F5E9D9 !important;
}

body.dark-mode nav,
body.dark-mode header {
  background: rgba(30, 18, 11, 0.95) !important;
  border-bottom: 2px solid rgba(212, 185, 150, 0.3) !important;
}

body nav a,
body header a,
body nav button,
body header button {
  color: #F5E9D9 !important;
  font-weight: 500 !important;
}

/* Button styling */
.primary-btn {
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%) !important;
  color: #F5E9D9 !important;
  border: none !important;
  border-radius: 25px !important;
  padding: 12px 30px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.primary-btn:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 10px 20px rgba(139, 69, 19, 0.5) !important;
}

/* Features cards */
.feature-card {
  background: rgba(44, 24, 16, 0.85) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(212, 185, 150, 0.2) !important;
  border-radius: 20px !important;
  padding: 30px !important;
  color: #F5E9D9 !important;
  transition: all 0.3s ease !important;
}

.feature-card:hover {
  transform: translateY(-10px) !important;
  box-shadow: 0 20px 40px rgba(139, 69, 19, 0.3) !important;
}

/* Stats section styling */
.stats-card {
  background: rgba(44, 24, 16, 0.9) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(212, 185, 150, 0.3) !important;
  color: #F5E9D9 !important;
  border-radius: 20px !important;
  padding: 30px !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}

/* Feature cards dark background */
.feature-content-card {
  background: rgba(44, 24, 16, 0.9) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(212, 185, 150, 0.3) !important;
  color: #F5E9D9 !important;
  border-radius: 20px !important;
  padding: 40px !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(139, 69, 19, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  border-radius: 10px;
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
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Form styling */
.form-container {
  background: rgba(44, 24, 16, 0.95) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border: 2px solid rgba(212, 185, 150, 0.3) !important;
  color: #F5E9D9 !important;
}

body.dark-mode .form-container {
  background: rgba(30, 18, 11, 0.95) !important;
  border: 2px solid rgba(212, 185, 150, 0.3) !important;
}

/* Input fields */
input, textarea, select {
  background: rgba(245, 233, 217, 0.1) !important;
  border: 1px solid rgba(212, 185, 150, 0.3) !important;
  color: #F5E9D9 !important;
  padding: 12px 16px !important;
  border-radius: 10px !important;
}

input::placeholder,
textarea::placeholder {
  color: rgba(245, 233, 217, 0.6) !important;
}

/* Text colors for tea/coffee vibe */
.tea-brown-text {
  color: #8B4513 !important;
}

.coffee-gold-text {
  color: #D2691E !important;
}

.cream-text {
  color: #F5E9D9 !important;
}

.dark-brown-text {
  color: #2C1810 !important;
}

/* Menu buttons */
.menu-button {
  background: rgba(139, 69, 19, 0.15) !important;
  border: 1px solid rgba(212, 185, 150, 0.2) !important;
  color: #F5E9D9 !important;
  transition: all 0.3s ease !important;
}

.menu-button:hover {
  background: rgba(212, 185, 150, 0.25) !important;
  border-color: rgba(212, 185, 150, 0.4) !important;
  transform: translateX(5px);
}

.menu-button-active {
  background: rgba(212, 185, 150, 0.25) !important;
  border: 1px solid rgba(212, 185, 150, 0.4) !important;
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.25) !important;
}

/* Sidebar styling */
.sidebar-container {
  background: rgba(44, 24, 16, 0.9) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border-right: 2px solid rgba(212, 185, 150, 0.2) !important;
  color: #F5E9D9 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.1rem !important;
  }
  
  nav {
    padding: 15px 20px !important;
  }
  
  .glass-card {
    padding: 25px !important;
  }
  
  .project-grid-item,
  .customer-review-card {
    margin-bottom: 20px !important;
  }
}`,

      resources: [
        "global.enduser.signup",
        "global.enduser.login",
        "global.enduser.logout",
        "global.enduser.forgotPassword",
        "global.enduser.resetPassword",
        "global.enduser.verifyEmail",
        "chiyaz.reviews.list",
        "chiyaz.metadata",
        // "chiyaz.tea.list",
        // "chiyaz.coffee.list",
        "chiyaz.reviews.submit",

        "chiyaz.menu.api",
        "chiyaz.menu.list",
        "chiyaz.menu.create",
        "chiyaz.menu.update",
        "chiyaz.menu.delete",
      ],

      actions: {
        checkExistingAuth: `
  console.log('🔍 Checking for existing authentication...');
  
  try {
    // ✅ FIX: Add websiteSlug as query parameter too
    const response = await fetch('/api/enduser-auth/check-session?websiteSlug=chiyaz', {
      method: 'GET',
      credentials: 'include', // ✅ Send cookies
      headers: {
        'Content-Type': 'application/json',
        'x-website-slug': 'chiyaz', // ✅ Lowercase to match backend expectation
      }
    });
    
    console.log('📡 Session check response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('📦 Session data:', data);
      
      if (data.authenticated) {
        console.log('✅ User already authenticated:', data.user.email);
        
        // Store user data
        context.handlers.setData('user', data.user);
        
        // Show notification
        context.handlers.showNotification({
          type: 'toast',
          message: \`Welcome back, \${data.user.firstName || data.user.email || 'Tea Lover'}! 🍵\`,
          background: '#2E7D32',
          duration: 2000
        });
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/chiyaz/dashboard';
        }, 1000);
        
        return; // Stop here
      } else {
        console.log('ℹ️ No active session');
      }
    } else {
      console.log('⚠️ Session check failed with status:', response.status);
    }
    
    console.log('ℹ️ Showing login form');
    
  } catch (error) {
    console.error('❌ Session check failed:', error);
    // If check fails, just show login form (fail gracefully)
  }
`,
        api: `
    console.log("🔵 API action triggered");
    const apiKey = context.actionParams?.apiKey || context.actionConfig?.apiKey;
    const payload = context.payload || context.modalFormData || context.formData || {};
    
    if (!apiKey) {
      console.error("❌ No API key provided");
      return;
    }
    
    console.log("📡 Calling API:", apiKey, "with payload:", payload);
    await context.handlers.handleApiCall(apiKey, payload, context.actionConfig);
  `,

        // ✅ ADD THIS - Reload menu data action
        reloadMenuData: `
    console.log("🔄 Reloading menu data");
    await context.handlers.handleApiCall('chiyaz.menu.api', {});
    console.log("✅ Menu data reloaded");
  `,
        openModal: `
    const modalName = context.actionParams?.modal || context.actionParams?.modalName;
    if (!modalName) {
      console.error("❌ No modal name provided");
      return;
    }
    
    console.log("🎭 Opening modal:", modalName);
    
    // Clear modal data
    context.handlers.setModalFormData({});
    context.handlers.setFieldErrors({});
    
    // Open the modal
    context.handlers.setActiveModal(modalName);
    
    console.log("✅ Modal opened");
  `,

        closeModal: `
    console.log("❌ Closing modal");
    context.handlers.setModalFormData({});
    context.handlers.setFieldErrors({});
    context.handlers.setActiveModal(null);
    console.log("✅ Modal closed");
  `,
        openEditMenuModal: `
  console.log("🔄 Opening edit menu modal");
  const itemData = context.actionConfig?.row || context.payload;
  
  if (!itemData || !itemData._id) {
    console.error("❌ No menu item data provided");
    return;
  }
  
  // Clear and prefill
  context.handlers.setModalFormData({});
  context.handlers.setFieldErrors({});
  
  context.handlers.setModalFormData({
    _id: itemData._id,
    productName: itemData.productName,
    category: itemData.category,
    type: itemData.type,
    price: itemData.price,
    origin: itemData.origin,
    description: itemData.description || '',
    inStock: itemData.inStock,
    imageUrl: itemData.imageUrl || '',
    caffeineLevel: itemData.caffeineLevel || 'Medium',
    brewingTemp: itemData.brewingTemp || '',
    brewingTime: itemData.brewingTime || '',
    tastingNotes: itemData.tastingNotes || [],
    weight: itemData.weight || ''
  });
  
  context.handlers.setActiveModal('editMenuItem');
  console.log("✅ Edit modal opened");
`,

        updateMenuItem: `
  console.log("🔄 Updating menu item");
  const formData = context.modalFormData || {};
  
  if (!formData._id) {
    context.handlers.showNotification({
      type: "toast",
      message: "❌ Menu item ID missing",
      background: "#8B4513"
    });
    return;
  }
  
  const payload = {
    _id: formData._id,
    productName: formData.productName,
    category: formData.category,
    type: formData.type,
    price: parseFloat(formData.price),
    origin: formData.origin,
    description: formData.description || '',
    inStock: formData.inStock === 'true' || formData.inStock === true,
    imageUrl: formData.imageUrl || '',
    caffeineLevel: formData.caffeineLevel || 'Medium',
    brewingTemp: formData.brewingTemp || '',
    brewingTime: formData.brewingTime || '',
    tastingNotes: formData.tastingNotes || [],
    weight: formData.weight || ''
  };
  
  console.log("🚀 Sending:", payload);
  await context.handlers.handleApiCall('chiyaz.menu.update', payload);
  console.log("✅ Update completed");
`,

        deleteMenuItem: `
  const itemId = context.row?._id || context.payload?._id;
  
  if (!itemId) {
    context.handlers.showNotification({
      type: "toast",
      message: "❌ Menu item ID missing",
      background: "#8B4513"
    });
    return;
  }

  if (!confirm('Delete this menu item? This cannot be undone.')) {
    console.log("🚫 Delete cancelled");
    return;
  }

  console.log("🗑️ Deleting:", itemId);
  await context.handlers.handleApiCall('chiyaz.menu.delete', { _id: itemId });
`,

        searchMenu: `
  console.log("🔍 Searching menu");
  const filters = context.formData || {};
  const payload = {
    page: 1,
    limit: 10,
    ...filters
  };
  
  Object.keys(payload).forEach(key => {
    if (payload[key] === '' || payload[key] == null) {
      delete payload[key];
    }
  });
  
  console.log("🔍 Filters:", payload);
  await context.handlers.handleApiCall('chiyaz.menu.list', payload);
`,

        resetMenuFilters: `
  console.log("🔄 Resetting menu filters");
  context.handlers.setFormData({});
  await context.handlers.handleApiCall('chiyaz.menu.list', { page: 1, limit: 10 });
`,

        changeMenuPage: `
  const newPage = context.actionParams?.page || 1;
  const limit = context.actionParams?.limit || 10;
  const currentFilters = context.formData || {};
  
  const payload = {
    page: newPage,
    limit: limit,
    ...currentFilters
  };
  
  Object.keys(payload).forEach(key => {
    if (payload[key] === '' || payload[key] == null) {
      delete payload[key];
    }
  });
  
  console.log("📄 Changing to page:", newPage);
  await context.handlers.handleApiCall('chiyaz.menu.list', payload);
`,
        openReviewModal: `
  console.log("🎭 Opening review modal");
  
  // Clear previous modal data
  context.handlers.setModalFormData({});
  context.handlers.setFieldErrors({});
  
  // Open the writeReview modal
  context.handlers.setActiveModal("writeReview");
  
  console.log("✅ Review modal opened");
`,

        // ✅ ACTION 2: Submit Review
        submitReview: `
  console.log("📝 Submitting review");
  
  const formData = context.modalFormData || {};
  
  console.log("📦 Review form data:", formData);
  
  // Validate required fields
  const errors = {};
  
  if (!formData.reviewerName || formData.reviewerName.trim().length < 2) {
    errors.reviewerName = "Name must be at least 2 characters";
  }
  
  if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
    errors.rating = "Please select a rating (1-5 stars)";
  }
  
  if (!formData.comment || formData.comment.trim().length < 10) {
    errors.comment = "Review must be at least 10 characters";
  }
  
  // If validation fails, show errors
  if (Object.keys(errors).length > 0) {
    console.error("❌ Validation errors:", errors);
    context.handlers.setFieldErrors(errors);
    
    context.handlers.showNotification({
      type: "toast",
      message: "❌ Please fix the errors in the form",
      background: "#8B4513",
      duration: 3000
    });
    
    return;
  }
  
  // Clear errors if validation passes
  context.handlers.setFieldErrors({});
  
  // Call the API to submit the review
  console.log("🚀 Calling chiyaz.reviews.submit API");
  await context.handlers.handleApiCall('chiyaz.reviews.submit', formData);
  
  console.log("✅ Review submitted successfully");
`,

        // ✅ ACTION 3: Close Review Modal
        closeReviewModal: `
  console.log("❌ Closing review modal");
  
  // Clear modal data
  context.handlers.setModalFormData({});
  context.handlers.setFieldErrors({});
  
  // Close modal
  context.handlers.setActiveModal(null);
  
  console.log("✅ Modal closed and data cleared");
`,
        handleLogin: `console.log('🔐 Chiyaz login action triggered');
const email = context.formData?.email;
const password = context.formData?.password;

if (!email || !password) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Please enter email and password',
    background: '#8B4513'
  });
  return;
}

try {
  const response = await fetch('/api/enduser-auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ 
      email, 
      password,
      websiteSlug: 'chiyaz'
    })
  });

  const data = await response.json();

  if (!response.ok) {
    context.handlers.showNotification({
      type: 'toast',
      message: data.error || '❌ Login failed',
      background: '#8B4513'
    });
    return;
  }

  console.log('✅ Login successful:', data);
  context.handlers.setData('user', data.user);

  context.handlers.showNotification({
    type: 'toast',
    message: \`Welcome back, \${data.user.firstName || 'Tea Lover'}! 🍵\`,
    background: '#2E7D32'
  });

  setTimeout(() => {
    window.location.href = '/chiyaz/dashboard';
  }, 1000);

} catch (error) {
  console.error('Login error:', error);
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Network error. Please try again.',
    background: '#8B4513'
  });
}`,

        handleSignup: `console.log('📝 Chiyaz signup action triggered');

// ✅ Get ALL form data from context
const formData = context.formData || {};
console.log('📦 Full formData from DataStore:', formData);

// ✅ Extract fields with proper fallbacks
const email = formData.email?.trim();
const password = formData.password;
const name = formData.name?.trim();
const firstName = formData.firstName?.trim();
const lastName = formData.lastName?.trim();
const fullName = formData.fullName?.trim();

console.log('📋 Extracted fields:', { email, password, name, firstName, lastName, fullName });

// Validation
if (!email || !password) {
  console.error('❌ Validation failed: Missing email or password');
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Email and password are required',
    background: '#8B4513',
    duration: 3000
  });
  return;
}

// ✅ Build payload with ALL possible name variations
const payload = {
  email: email.toLowerCase(),
  password: password,
  websiteSlug: 'chiyaz'
};

// Add all name fields that exist (backend handles the parsing)
if (fullName) payload.fullName = fullName;
if (name) payload.name = name;
if (firstName) payload.firstName = firstName;
if (lastName) payload.lastName = lastName;

console.log('🚀 Sending signup payload:', payload);

try {
  const response = await fetch('/api/enduser-auth/signup', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
    
  const data = await response.json();
  console.log('📡 Signup API response:', { status: response.status, data });
    
  if (!response.ok) {
    console.error('❌ Signup failed:', data);
    context.handlers.showNotification({
      type: 'toast',
      message: data.error || '❌ Signup failed. Please try again.',
      background: '#8B4513',
      duration: 4000
    });
    return;
  }
    
  console.log('✅ Signup successful!');
    
  // Show success notification
  context.handlers.showNotification({
    type: 'toast',
    message: '✅ Account created! Please check your email to verify your account.',
    background: '#2E7D32',
    duration: 5000
  });
    
  // Clear the form
  context.handlers.setFormData({});
  console.log('🧹 Form data cleared');
  
  // Redirect to login after 2 seconds
  setTimeout(() => {
    console.log('🔄 Redirecting to login page...');
    window.location.href = '/chiyaz/login';
  }, 2000);
    
} catch (error) {
  console.error('❌ Network error during signup:', error);
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Network error. Please check your connection and try again.',
    background: '#8B4513',
    duration: 4000
  });
}`,

        toggleTheme: `const body = document.body;
const isDark = body.classList.contains('dark-mode');

if (isDark) {
  body.classList.remove('dark-mode');
  localStorage.setItem('chiyaz-theme', 'light');
  console.log('☀️ Light mode activated');
} else {
  body.classList.add('dark-mode');
  localStorage.setItem('chiyaz-theme', 'dark');
  console.log('🌙 Dark mode activated');
}`,

        loadTheme: `const saved = localStorage.getItem('chiyaz-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
if (saved === 'dark' || (!saved && prefersDark)) {
  document.body.classList.add('dark-mode');
  console.log('🌙 Dark mode loaded');
}`,

        navigateToPage: `const url = context.actionParams?.url;
if (!url) {
  console.error("❌ No URL provided");
  return;
}
console.log("🧭 Navigating to:", url);
window.location.href = url;`,

        clearAuth: `console.log("🚪 Chiyaz logout...");
  
try {
  const response = await fetch('/api/enduser-auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ websiteSlug: 'chiyaz' })
  });
    
  const data = await response.json();
    
  if (response.ok) {
    context.handlers.clearAuthData();
    
    context.handlers.showNotification({
      type: "toast",
      message: "✅ Logged out successfully",
      background: "#2E7D32",
      duration: 2000,
    });
    
    setTimeout(() => {
      window.location.href = data.redirectUrl || '/chiyaz';
    }, 1000);
  }
} catch (error) {
  console.error('Logout error:', error);
  context.handlers.showNotification({
    type: "toast",
    message: "❌ Logout failed",
    background: "#8B4513"
  });
}`,
        verifyEndUserEmail: `
console.log('🔐 End user email verification triggered');
const { token } = context.queryParams || {};

if (!token) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Invalid verification link',
    background: '#ef4444',
    duration: 5000
  });
  setTimeout(() => {
    window.location.href = '/chiyaz';
  }, 2000);
  return;
}

try {
  console.log('📡 Calling enduser-auth verify-email endpoint...');

  const response = await fetch('/api/enduser-auth/verify-email?token=' + encodeURIComponent(token), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  const data = await response.json();
  console.log('📦 Verification response:', data);

  if (response.ok && data.success) {
    context.handlers.showNotification({
      type: 'toast',
      message: '✅ Email verified successfully! Redirecting to login...',
      background: '#10b981',
      duration: 3000
    });

    // ✅ For end users, go directly to login (no payment needed!)
    setTimeout(() => {
      window.location.href = '/chiyaz';
    }, 3000);
  } else {
    throw new Error(data.error || 'Verification failed');
  }
} catch (error) {
  console.error('❌ Email verification error:', error);

  context.handlers.showNotification({
    type: 'toast',
    message: '❌ ' + (error.message || 'Verification failed. Link may be expired.'),
    background: '#ef4444',
    duration: 6000
  });

  setTimeout(() => {
    window.location.href = '/chiyaz';
  }, 3000);
}
`,
      },
    },

    pages: {
      // ✅ ENHANCED LOGIN PAGE WITH AUTO-LOGIN CHECK
      // Add this to your Chiyaz template in demo.js

      login: {
        title: "Login - Chiyaz",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🍵 Chiyaz",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  fontFamily: "'Playfair Display', serif",
                  background:
                    "linear-gradient(135deg, #F5E9D9 0%, #D2691E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/chiyaz" },
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
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/chiyaz" },
                    styles: {
                      color: "#F5E9D9",
                      fontWeight: "600",
                    },
                  },
                  {
                    label: "Sign Up",
                    action: "navigateToPage",
                    actionParams: { url: "/chiyaz/signup" },
                    styles: {
                      color: "#F5E9D9",
                      fontWeight: "600",
                    },
                  },
                ],
              },
            },
            styles: {
              background: "rgba(44, 24, 16, 0.95)",
              backdropFilter: "blur(20px) saturate(180%)",
              borderBottom: "2px solid rgba(212, 185, 150, 0.3)",
              padding: "18px 40px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "70px",
            },
            triggers: [
              {
                event: "load",
                action: "loadTheme",
              },
            ],
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
                "ui:title": "🍵 Welcome Back",
                "ui:description": "Sign in to your Chiyaz account",
                "ui:id": "loginForm",
                "ui:styles": {
                  maxWidth: "420px",
                  margin: "120px auto 0",
                  padding: "40px 36px",
                  background: "rgba(44, 24, 16, 0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  boxShadow: "0 15px 35px rgba(139, 69, 19, 0.4)",
                  border: "2px solid rgba(212, 185, 150, 0.3)",
                  color: "#F5E9D9",
                },
                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "tea.lover@example.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                    "ui:labelStyles": {
                      color: "#F5E9D9",
                      fontWeight: "500",
                    },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "Enter your password",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                    "ui:labelStyles": {
                      color: "#F5E9D9",
                      fontWeight: "500",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Sign In",
                    action: "handleLogin",
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                      color: "#F5E9D9",
                      fontSize: "15px",
                      fontWeight: "600",
                      borderRadius: "25px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    },
                    "ui:hoverTransform": "translateY(-2px)",
                    "ui:hoverShadow": "0 10px 20px rgba(139, 69, 19, 0.5)",
                  },
                ],
                "ui:titleStyles": {
                  color: "#F5E9D9",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  marginBottom: "10px",
                },
                "ui:descriptionStyles": {
                  color: "rgba(245, 233, 217, 0.9)",
                  fontSize: "16px",
                  marginBottom: "30px",
                },
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
                    actionParams: { url: "/chiyaz/signup" },
                  },
                ],
                "ui:styles": {
                  maxWidth: "420px",
                  margin: "24px auto",
                  padding: "16px",
                  background: "rgba(139, 69, 19, 0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  color: "#F5E9D9",
                  border: "1px solid rgba(212, 185, 150, 0.2)",
                },
                "ui:linkStyles": {
                  color: "#D2691E",
                  fontWeight: "600",
                },
              },
            },
            styles: {
              padding: "100px 40px 60px",
              backgroundImage:
                "linear-gradient(rgba(44, 24, 16, 0.9), rgba(44, 24, 16, 0.9)), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              minHeight: "100vh",
            },
            triggers: [
              // ✅ ADD THIS: Check for existing auth on page load
              {
                event: "load",
                action: "checkExistingAuth",
              },
            ],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content":
                  "© 2024 Chiyaz Tea & Coffee. All rights reserved.",
                "ui:styles": {
                  textAlign: "center",
                  color: "#F5E9D9",
                  fontSize: "14px",
                },
              },
            },
            styles: {
              background: "#2C1810",
              padding: "24px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      menu: {
        title: "Menu Management - Chiyaz",
        requireAuth: true,
        redirectIfNotAuth: "/chiyaz/login",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🍵 Chiyaz",
                "ui:styles": {
                  fontSize: "24px",
                  fontWeight: "800",
                  fontFamily: "'Playfair Display', serif",
                  background:
                    "linear-gradient(135deg, #F5E9D9 0%, #D2691E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/chiyaz/dashboard" },
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
              userInfo: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "{{auth.user?.email || 'Tea Lover'}}",
                    action: "",
                    actionParams: {},
                    styles: {
                      fontWeight: "500",
                      color: "#F5E9D9",
                    },
                  },
                  {
                    label: "Logout",
                    action: "clearAuth",
                    actionParams: {},
                    styles: {
                      color: "#D2691E",
                      fontWeight: "600",
                    },
                  },
                ],
              },
            },
            styles: {
              background: "rgba(44, 24, 16, 0.95)",
              backdropFilter: "blur(20px) saturate(180%)",
              borderBottom: "2px solid rgba(212, 185, 150, 0.3)",
              padding: "16px 40px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "70px",
            },
            triggers: [
              {
                event: "load",
                action: "loadTheme",
              },
            ],
          },
          sidebar: {
            table: {},
            modal: {},
            uiSchema: {
              menuHeading: {
                "ui:widget": "heading",
                "ui:text": "🍵 Menu",
                "ui:level": "h3",
                "ui:styles": {
                  marginBottom: "24px",
                  fontSize: "1.2rem",
                  color: "#F5E9D9",
                  padding: "0 12px",
                  fontFamily: "'Playfair Display', serif",
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
                    "ui:actionParams": { url: "/chiyaz/dashboard" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 20px",
                      background: "transparent",
                      color: "#F5E9D9",
                      border: "1px solid rgba(212, 185, 150, 0.1)",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverTransform": "translateX(5px)",
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "🍵 Menu",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/chiyaz/menu" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 20px",
                      background: "rgba(139, 69, 19, 0.15)",
                      color: "#F5E9D9",
                      border: "1px solid rgba(212, 185, 150, 0.2)",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverTransform": "translateX(5px)",
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "⚙️ Settings",
                    "ui:action": "",
                    "ui:actionParams": {},
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 20px",
                      background: "transparent",
                      color: "#F5E9D9",
                      border: "1px solid rgba(212, 185, 150, 0.1)",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverTransform": "translateX(5px)",
                  },
                ],
              },
            },
            styles: {
              width: "280px",
              background: "rgba(44, 24, 16, 0.9)",
              backdropFilter: "blur(20px) saturate(180%)",
              padding: "90px 20px 30px",
              minHeight: "calc(100vh - 70px)",
              borderRight: "2px solid rgba(212, 185, 150, 0.2)",
              position: "fixed",
              top: "70px",
              left: "0",
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {
              editMenuItem: {
                "ui:title": "Edit Menu Item",
                "ui:theme": "dark",
                "ui:entityName": "menu",
                "ui:styles": {
                  maxWidth: "480px",
                  padding: "32px",
                  background: "rgba(44, 24, 16, 0.95)",
                  color: "#F5E9D9",
                },
                "ui:fields": [
                  {
                    name: "productName",
                    label: "Product Name",
                    type: "text",
                    placeholder: "Ethiopian Yirgacheffe",
                    required: true,
                  },
                  {
                    name: "category",
                    label: "Category",
                    type: "text",
                    placeholder: "Select category",
                    required: true,
                  },
                  {
                    name: "type",
                    label: "Type",
                    type: "text",
                    placeholder: "Select type",
                    required: true,
                  },
                  {
                    name: "price",
                    label: "Price",
                    type: "number",
                    placeholder: "24.99",
                    required: true,
                  },
                  {
                    name: "origin",
                    label: "Origin",
                    type: "text",
                    placeholder: "Ethiopia",
                    required: true,
                  },
                  {
                    name: "description",
                    label: "Description",
                    type: "text",
                    placeholder: "Bright and fruity...",
                    required: false,
                  },
                  {
                    name: "inStock",
                    label: "In Stock",
                    type: "text",
                    placeholder: "true/false",
                    required: true,
                  },
                  {
                    name: "_id",
                    type: "hidden",
                  },
                ],
                "ui:actions": [
                  {
                    label: "Update Item",
                    action: "updateMenuItem",
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 24px",
                      background:
                        "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
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
                      color: "#F5E9D9",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "1px solid rgba(212, 185, 150, 0.3)",
                    },
                  },
                ],
              },
              addMenuItem: {
                "ui:title": "Add New Menu Item",
                "ui:theme": "dark",
                "ui:entityName": "menu",
                "ui:styles": {
                  maxWidth: "480px",
                  padding: "32px",
                  background: "rgba(44, 24, 16, 0.95)",
                  color: "#F5E9D9",
                },
                "ui:fields": [
                  {
                    name: "productName",
                    label: "Product Name",
                    type: "text",
                    placeholder: "Premium Darjeeling",
                    required: true,
                  },
                  {
                    name: "category",
                    label: "Category",
                    type: "select", // ✅ Dropdown instead of text
                    placeholder: "Select category",
                    required: true,
                    options: [
                      { value: "Tea", label: "Tea" },
                      { value: "Coffee", label: "Coffee" },
                      { value: "Specialty", label: "Specialty" },
                      { value: "Blend", label: "Blend" },
                    ],
                  },
                  {
                    name: "type",
                    label: "Type",
                    type: "text",
                    placeholder: "Black Tea / Arabica Coffee",
                    required: true,
                  },
                  {
                    name: "price",
                    label: "Price",
                    type: "number",
                    placeholder: "24.99",
                    required: true,
                  },
                  {
                    name: "origin",
                    label: "Origin",
                    type: "text",
                    placeholder: "Darjeeling, India",
                    required: true,
                  },
                  {
                    name: "description",
                    label: "Description",
                    type: "text",
                    placeholder: "Light and floral...",
                    required: false,
                  },
                  {
                    name: "imageUrl",
                    label: "Image URL",
                    type: "text",
                    placeholder: "https://...",
                    required: false,
                  },
                  {
                    name: "inStock",
                    label: "In Stock",
                    type: "checkbox",
                    required: false,
                  },
                  {
                    name: "tastingNotes",
                    label: "Tasting Notes (comma-separated)",
                    type: "text",
                    placeholder: "Floral, Sweet, Delicate",
                    required: false,
                  },
                ],
                "ui:actions": [
                  {
                    label: "Add Item",
                    action: "api",
                    actionParams: { apiKey: "chiyaz.menu.create" },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
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
                      color: "#F5E9D9",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "1px solid rgba(212, 185, 150, 0.3)",
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
                  marginBottom: "24px",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "🍵 Menu Management",
                    "ui:level": "h1",
                    "ui:styles": {
                      margin: "0",
                      fontSize: "1.8rem",
                      color: "#F5E9D9",
                      fontFamily: "'Playfair Display', serif",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "➕ Add Item",
                    "ui:action": "openModal",
                    "ui:actionParams": { modal: "addMenuItem" },
                    "ui:variant": "primary",
                    "ui:styles": {
                      padding: "10px 20px",
                      background:
                        "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                      color: "white",
                      borderRadius: "8px",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "14px",
                    },
                  },
                ],
              },
              searchFilters: {
                "ui:widget": "filterWidget",
                "ui:title": "🔍 Search & Filter Menu",
                "ui:styles": {
                  background: "rgba(44, 24, 16, 0.85)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(139, 69, 19, 0.3)",
                  marginBottom: "24px",
                  border: "1px solid rgba(212, 185, 150, 0.2)",
                  color: "#F5E9D9",
                },
                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Search",
                    "ui:placeholder":
                      "Search by name, origin, or description...",
                    "ui:type": "text",
                    "ui:name": "search",
                    "ui:flex": "2",
                    "ui:minWidth": "280px",
                    "ui:styles": {
                      marginBottom: "0",
                    },
                  },
                  {
                    "ui:widget": "selectField",
                    "ui:label": "Category",
                    "ui:name": "category",
                    "ui:placeholder": "All Categories",
                    "ui:flex": "1",
                    "ui:minWidth": "140px",
                    "ui:options": [
                      { value: "", label: "All Categories" },
                      { value: "Tea", label: "Tea" },
                      { value: "Coffee", label: "Coffee" },
                      { value: "Specialty", label: "Specialty" },
                      { value: "Blend", label: "Blend" },
                    ],
                    "ui:styles": {
                      marginBottom: "0",
                    },
                  },
                  {
                    "ui:widget": "selectField",
                    "ui:label": "Type",
                    "ui:name": "type",
                    "ui:placeholder": "All Types",
                    "ui:flex": "1",
                    "ui:minWidth": "140px",
                    "ui:options": [
                      { value: "", label: "All Types" },
                      { value: "Green Tea", label: "Green Tea" },
                      { value: "Black Tea", label: "Black Tea" },
                      { value: "Arabica Coffee", label: "Arabica Coffee" },
                      { value: "Espresso", label: "Espresso" },
                    ],
                    "ui:styles": {
                      marginBottom: "0",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "🔍 Apply",
                    variant: "filter",
                    action: "api",
                    actionParams: {
                      apiKey: "chiyaz.menu.list",
                    },
                    styles: {
                      padding: "10px 20px",
                      background:
                        "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                    },
                  },
                  {
                    label: "🔄 Reset",
                    variant: "reset",
                    action: "api",
                    actionParams: {
                      apiKey: "chiyaz.menu.list",
                      payload: { page: 1, limit: 10 },
                    },
                    styles: {
                      padding: "10px 20px",
                      background: "transparent",
                      color: "#F5E9D9",
                      border: "1px solid rgba(212, 185, 150, 0.3)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                    },
                  },
                ],
              },
              menuTable: {
                "ui:widget": "dataTable",
                "ui:title": "Menu List",
                "ui:id": "menuTable",
                "ui:description": "Manage all tea and coffee items",
                "ui:emptyText":
                  "No items found. Click 'Add Item' to create one.",
                "ui:dataSource": "chiyaz.menu.api",
                "ui:apiKey": "chiyaz.menu.list",
                "ui:searchEnabled": false,
                "ui:pagination": {
                  enabled: true,
                  pageSize: 10,
                  serverSide: true,
                },
                "ui:columns": [
                  {
                    key: "productName",
                    title: "Product Name",
                    dataIndex: "productName",
                    width: "200px",
                  },
                  {
                    key: "category",
                    title: "Category",
                    dataIndex: "category",
                    width: "100px",
                  },
                  {
                    key: "type",
                    title: "Type",
                    dataIndex: "type",
                    width: "120px",
                  },
                  {
                    key: "price",
                    title: "Price",
                    dataIndex: "price",
                    width: "80px",
                  },
                  {
                    key: "origin",
                    title: "Origin",
                    dataIndex: "origin",
                    width: "150px",
                  },
                  {
                    key: "inStock",
                    title: "In Stock",
                    dataIndex: "inStock",
                    width: "80px",
                  },
                  {
                    key: "actions",
                    title: "Actions",
                    type: "actions",
                    align: "center",
                    width: "200px",
                    actions: [
                      {
                        label: "✏️ Edit",
                        action: "openEditMenuModal",
                        variant: "primary",
                      },
                      {
                        label: "Delete",
                        action: "deleteMenuItem",
                        variant: "danger",
                        confirm: true,
                      },
                    ],
                  },
                ],
              },
            },
            styles: {
              marginLeft: "280px",
              padding: "90px 32px 40px",
              background:
                "linear-gradient(135deg, rgba(44, 24, 16, 0.7) 0%, rgba(139, 69, 19, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              minHeight: "calc(100vh - 70px)",
            },
            triggers: [
              {
                event: "load",
                source: "chiyaz.menu.api",
                params: {
                  page: 1,
                  limit: 10,
                },
              },
              {
                event: "load",
                action: "loadTheme",
              },
            ],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content":
                  "© 2024 Chiyaz Tea & Coffee. All rights reserved.",
                "ui:styles": {
                  textAlign: "center",
                  color: "#F5E9D9",
                  fontSize: "14px",
                },
              },
            },
            styles: {
              marginLeft: "280px",
              background: "#2C1810",
              padding: "24px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      signup: {
        title: "Sign Up - Chiyaz",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🍵 Chiyaz",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "800",
                  fontFamily: "'Playfair Display', serif",
                  background:
                    "linear-gradient(135deg, #F5E9D9 0%, #D2691E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/chiyaz" },
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
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/chiyaz" },
                    styles: {
                      color: "#F5E9D9",
                      fontWeight: "600",
                    },
                  },
                  {
                    label: "Login",
                    action: "navigateToPage",
                    actionParams: { url: "/chiyaz/login" },
                    styles: {
                      color: "#F5E9D9",
                      fontWeight: "600",
                    },
                  },
                ],
              },
            },
            styles: {
              background: "rgba(44, 24, 16, 0.95)",
              backdropFilter: "blur(20px) saturate(180%)",
              borderBottom: "2px solid rgba(212, 185, 150, 0.3)",
              padding: "18px 40px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "70px",
            },
            triggers: [
              {
                event: "load",
                action: "loadTheme",
              },
            ],
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
                "ui:title": "✨ Join Chiyaz",
                "ui:description":
                  "Create your account and discover premium tea & coffee",
                "ui:id": "signupForm",
                "ui:styles": {
                  maxWidth: "420px",
                  margin: "120px auto 0",
                  padding: "40px 36px",
                  background: "rgba(44, 24, 16, 0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  boxShadow: "0 15px 35px rgba(139, 69, 19, 0.4)",
                  border: "2px solid rgba(212, 185, 150, 0.3)",
                  color: "#F5E9D9",
                },
                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Full Name",
                    "ui:placeholder": "Alex Johnson",
                    "ui:type": "text",
                    "ui:name": "name",
                    "ui:required": true,
                    "ui:labelStyles": {
                      color: "#F5E9D9",
                      fontWeight: "500",
                    },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "you@example.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                    "ui:labelStyles": {
                      color: "#F5E9D9",
                      fontWeight: "500",
                    },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "Create a secure password",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                    "ui:labelStyles": {
                      color: "#F5E9D9",
                      fontWeight: "500",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Create Account",
                    action: "handleSignup",
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                      color: "#F5E9D9",
                      fontSize: "15px",
                      fontWeight: "600",
                      borderRadius: "25px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    },
                    "ui:hoverTransform": "translateY(-2px)",
                    "ui:hoverShadow": "0 10px 20px rgba(139, 69, 19, 0.5)",
                  },
                ],
                "ui:titleStyles": {
                  color: "#F5E9D9",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  marginBottom: "10px",
                },
                "ui:descriptionStyles": {
                  color: "rgba(245, 233, 217, 0.9)",
                  fontSize: "16px",
                  marginBottom: "30px",
                },
              },
              authLinks: {
                "ui:widget": "authLinks",
                "ui:alignment": "center",
                "ui:links": [
                  {
                    prefix: "Already have an account?",
                    label: "Login",
                    action: "navigateToPage",
                    actionParams: { url: "/chiyaz/login" },
                  },
                ],
                "ui:styles": {
                  maxWidth: "420px",
                  margin: "24px auto",
                  padding: "16px",
                  background: "rgba(139, 69, 19, 0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  color: "#F5E9D9",
                  border: "1px solid rgba(212, 185, 150, 0.2)",
                },
                "ui:linkStyles": {
                  color: "#D2691E",
                  fontWeight: "600",
                },
              },
            },
            styles: {
              padding: "100px 40px 60px",
              backgroundImage:
                "linear-gradient(rgba(44, 24, 16, 0.9), rgba(44, 24, 16, 0.9)), url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2067&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
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
                  "© 2024 Chiyaz Tea & Coffee. All rights reserved.",
                "ui:styles": {
                  textAlign: "center",
                  color: "#F5E9D9",
                  fontSize: "14px",
                },
              },
            },
            styles: {
              background: "#2C1810",
              padding: "24px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      dashboard: {
        title: "Dashboard - Chiyaz",
        requireAuth: true,
        redirectIfNotAuth: "/chiyaz/login",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🍵 Chiyaz",
                "ui:styles": {
                  fontSize: "24px",
                  fontWeight: "800",
                  fontFamily: "'Playfair Display', serif",
                  background:
                    "linear-gradient(135deg, #F5E9D9 0%, #D2691E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/chiyaz/dashboard" },
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
              userInfo: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  {
                    label: "{{auth.user?.email || 'Tea Lover'}}",
                    action: "",
                    actionParams: {},
                    styles: {
                      fontWeight: "500",
                      color: "#F5E9D9",
                    },
                  },
                  {
                    label: "Logout",
                    action: "clearAuth",
                    actionParams: {},
                    styles: {
                      color: "#D2691E",
                      fontWeight: "600",
                    },
                  },
                ],
              },
            },
            styles: {
              background: "rgba(44, 24, 16, 0.95)",
              backdropFilter: "blur(20px) saturate(180%)",
              borderBottom: "2px solid rgba(212, 185, 150, 0.3)",
              padding: "16px 40px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "70px",
            },
            triggers: [
              {
                event: "load",
                action: "loadTheme",
              },
            ],
          },
          sidebar: {
            table: {},
            modal: {},
            uiSchema: {
              menuHeading: {
                "ui:widget": "heading",
                "ui:text": "🍵 Menu",
                "ui:level": "h3",
                "ui:styles": {
                  marginBottom: "24px",
                  fontSize: "1.2rem",
                  color: "#F5E9D9",
                  padding: "0 12px",
                  fontFamily: "'Playfair Display', serif",
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
                    "ui:actionParams": { url: "/chiyaz/dashboard" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 20px",
                      background: "rgba(139, 69, 19, 0.15)",
                      color: "#F5E9D9",
                      border: "1px solid rgba(212, 185, 150, 0.2)",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverTransform": "translateX(5px)",
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "Menu",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/chiyaz/menu" },
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 20px",
                      background: "transparent",
                      color: "#F5E9D9",
                      border: "1px solid rgba(212, 185, 150, 0.1)",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverTransform": "translateX(5px)",
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "❤️ Favorites",
                    "ui:action": "",
                    "ui:actionParams": {},
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 20px",
                      background: "transparent",
                      color: "#F5E9D9",
                      border: "1px solid rgba(212, 185, 150, 0.1)",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverTransform": "translateX(5px)",
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "⚙️ Settings",
                    "ui:action": "",
                    "ui:actionParams": {},
                    "ui:styles": {
                      width: "100%",
                      padding: "14px 20px",
                      background: "transparent",
                      color: "#F5E9D9",
                      border: "1px solid rgba(212, 185, 150, 0.1)",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    },
                    "ui:hoverTransform": "translateX(5px)",
                  },
                ],
              },
            },
            styles: {
              width: "280px",
              background: "rgba(44, 24, 16, 0.9)",
              backdropFilter: "blur(20px) saturate(180%)",
              padding: "90px 20px 30px",
              minHeight: "calc(100vh - 70px)",
              borderRight: "2px solid rgba(212, 185, 150, 0.2)",
              position: "fixed",
              top: "70px",
              left: "0",
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              welcomeCard: {
                "ui:widget": "card",
                "ui:title": "🍵 Welcome to Chiyaz",
                "ui:description":
                  "Hello {{auth.user?.name || auth.user?.email || 'Tea Lover'}}! Explore our premium tea & coffee collection.",
                "ui:styles": {
                  padding: "40px",
                  textAlign: "left",
                  background: "rgba(44, 24, 16, 0.85)",
                  color: "#F5E9D9",
                  border: "1px solid rgba(212, 185, 150, 0.3)",
                  marginBottom: "30px",
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(139, 69, 19, 0.3)",
                },
                "ui:titleStyles": {
                  color: "#F5E9D9",
                  fontFamily: "'Playfair Display', serif",
                },
              },
              statsGrid: {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "25px",
                "ui:styles": {
                  marginBottom: "40px",
                },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "📦 Orders",
                    "ui:description": "5 Active",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "rgba(44, 24, 16, 0.85)",
                      border: "1px solid rgba(212, 185, 150, 0.2)",
                      borderRadius: "16px",
                      color: "#F5E9D9",
                    },
                    "ui:titleStyles": {
                      color: "#F5E9D9",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "❤️ Favorites",
                    "ui:description": "12 Items",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "rgba(44, 24, 16, 0.85)",
                      border: "1px solid rgba(210, 105, 30, 0.3)",
                      borderRadius: "16px",
                      color: "#F5E9D9",
                    },
                    "ui:titleStyles": {
                      color: "#F5E9D9",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "⭐ Rewards",
                    "ui:description": "350 Points",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "rgba(44, 24, 16, 0.85)",
                      border: "1px solid rgba(46, 125, 50, 0.3)",
                      borderRadius: "16px",
                      color: "#F5E9D9",
                    },
                    "ui:titleStyles": {
                      color: "#F5E9D9",
                    },
                  },
                ],
              },
              recommendations: {
                "ui:widget": "card",
                "ui:title": "🔥 Recommended for You",
                "ui:description":
                  "• Premium Darjeeling Tea\\n• Ethiopian Yirgacheffe Coffee\\n• Japanese Matcha Powder\\n• Colombian Supreme Beans",
                "ui:styles": {
                  padding: "30px",
                  background: "rgba(44, 24, 16, 0.85)",
                  border: "1px solid rgba(212, 185, 150, 0.2)",
                  borderRadius: "16px",
                  marginBottom: "30px",
                  color: "#F5E9D9",
                },
                "ui:titleStyles": {
                  color: "#F5E9D9",
                  fontFamily: "'Playfair Display', serif",
                },
              },
            },
            styles: {
              marginLeft: "280px",
              padding: "90px 40px 50px",
              background:
                "linear-gradient(135deg, rgba(44, 24, 16, 0.7) 0%, rgba(139, 69, 19, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              minHeight: "calc(100vh - 70px)",
            },
            triggers: [
              {
                event: "load",
                action: "loadTheme",
              },
            ],
          },
          footer: {
            table: {},
            modal: {},
            uiSchema: {
              footerText: {
                "ui:widget": "text",
                "ui:content":
                  "© 2024 Chiyaz Tea & Coffee. All rights reserved.",
                "ui:styles": {
                  textAlign: "center",
                  color: "#F5E9D9",
                  fontSize: "14px",
                },
              },
            },
            styles: {
              marginLeft: "280px",
              background: "#2C1810",
              padding: "30px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

      "check-email": {
        title: "Check Your Email",
        components: {
          main: {
            uiSchema: {
              container: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:justify": "center",
                "ui:gap": "30px",
                "ui:styles": {
                  minHeight: "100vh",
                  width: "100%",
                  display: "flex",
                  padding: "40px 20px",
                  background: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:align": "center",
                    "ui:gap": "20px",
                    "ui:styles": {
                      background: "#F5E9D9",
                      borderRadius: "16px",
                      padding: "60px 40px",
                      maxWidth: "500px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "text",
                        "ui:content": "📧",
                        "ui:styles": {
                          fontSize: "80px",
                          marginBottom: "20px",
                        },
                      },
                      {
                        "ui:widget": "heading",
                        "ui:text": "Check Your Email",
                        "ui:level": "h1",
                        "ui:styles": {
                          fontSize: "2rem",
                          fontWeight: "800",
                          color: "#8B4513",
                          marginBottom: "10px",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text": "We've sent a verification link to your email address.",
                        "ui:styles": {
                          fontSize: "1.1rem",
                          color: "#8B4513",
                          textAlign: "center",
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },

      "verify-email": {
        title: "Verifying Email...",
        queryParams: ["token"],
        requireParams: true,
        components: {
          main: {
            uiSchema: {
              container: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:justify": "center",
                "ui:gap": "30px",
                "ui:styles": {
                  minHeight: "100vh",
                  width: "100%",
                  display: "flex",
                  padding: "40px 20px",
                  background: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:align": "center",
                    "ui:gap": "20px",
                    "ui:styles": {
                      background: "#F5E9D9",
                      borderRadius: "16px",
                      padding: "60px 40px",
                      maxWidth: "500px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "text",
                        "ui:content": "⏳",
                        "ui:styles": {
                          fontSize: "80px",
                          marginBottom: "20px",
                        },
                      },
                      {
                        "ui:widget": "heading",
                        "ui:text": "Verifying Your Email...",
                        "ui:level": "h1",
                        "ui:styles": {
                          fontSize: "2rem",
                          fontWeight: "800",
                          color: "#8B4513",
                          marginBottom: "10px",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text": "Please wait while we verify your email address.",
                        "ui:styles": {
                          fontSize: "1.1rem",
                          color: "#8B4513",
                          textAlign: "center",
                        },
                      },
                    ],
                  },
                ],
              },
            },
            triggers: [
              {
                event: "load",
                action: "verifyEndUserEmail",
              },
            ],
          },
        },
      },
    },

    components: {
     navbar: {
  uiSchema: {
    logo: {
      "ui:widget": "image",
      "ui:src": "{{api.chiyaz.metadata.data.0.logo.url}}",
      "ui:alt": "Chiyaz Logo",
      "ui:width": "70px",
      "ui:height": "70px",
      "ui:objectFit": "contain", // ✅ Changed from "cover" to "contain"
      "ui:styles": {
        cursor: "pointer",
        borderRadius: "50%",
        marginTop:"20px",
        boxShadow: "0 4px 12px rgba(139, 69, 19, 0.25)",
        transition: "transform 0.3s ease",
      },
      "ui:action": "navigateToPage",
      "ui:actionParams": { url: "/chiyaz" },
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
    links: {
      "ui:widget": "navLinks",
      "ui:theme": "light",
      "ui:links": [
        {
          label: "Login",
          action: "navigateToPage",
          actionParams: { url: "/chiyaz/login" },
          styles: {
            color: "#F5E9D9",
            fontWeight: "600",
          },
        },
        {
          label: "Sign Up",
          action: "navigateToPage",
          actionParams: { url: "/chiyaz/signup" },
          styles: {
            color: "#F5E9D9",
            fontWeight: "600",
          },
        },
      ],
    },
  },
  styles: {
    background: "rgba(44, 24, 16, 0.95)",
    backdropFilter: "blur(20px) saturate(180%)",
    borderBottom: "2px solid rgba(212, 185, 150, 0.3)",
    padding: "18px 40px",
    position: "fixed",
    width: "100%",
    zIndex: "1000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 32px rgba(139, 69, 19, 0.25)",
    height: "70px",
  },
  triggers: [
    {
      event: "load",
      action: "loadTheme",
    },
  ],
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
          writeReview: {
            "ui:title": "Write a Review",
            "ui:theme": "dark",
            "ui:styles": {
              maxWidth: "600px",
              background: "rgba(44, 24, 16, 0.95)",
              color: "#F5E9D9",
              padding: "40px",
              borderRadius: "20px",
              border: "1px solid rgba(212, 185, 150, 0.3)",
            },
            "ui:fields": [
              {
                name: "reviewerName",
                label: "Your Name",
                type: "text",
                placeholder: "John Doe",
                required: true,
              },
              {
                name: "rating",
                label: "Rating",
                type: "number",
                placeholder: "5",
                required: true,
              },
              {
                name: "title",
                label: "Review Title",
                type: "text",
                placeholder: "Great product!",
                required: false,
              },
              {
                name: "comment",
                label: "Your Review",
                type: "text",
                placeholder: "Tell us about your experience...",
                required: true,
              },
              {
                name: "productName",
                label: "Product Name",
                type: "text",
                placeholder: "Ethiopian Coffee",
                required: false,
              },
            ],
            "ui:actions": [
              {
                label: "Submit Review",
                action: "submitReview",
                variant: "primary",
                styles: {
                  width: "100%",
                  padding: "14px 0",
                  background:
                    "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "600",
                  borderRadius: "25px",
                  border: "none",
                },
              },
              {
                label: "Cancel",
                action: "closeReviewModal",
                variant: "outline",
                styles: {
                  width: "100%",
                  padding: "14px 0",
                  background: "transparent",
                  color: "#F5E9D9",
                  fontSize: "15px",
                  fontWeight: "600",
                  borderRadius: "25px",
                  border: "1px solid rgba(212, 185, 150, 0.3)",
                },
              },
            ],
          },
        },
        uiSchema: {
          backgroundEffect: {
            "ui:widget": "backgroundEffect",
            "ui:effect": "bubbles",
            "ui:intensity": "high",
            "ui:color": [
              "#FFF8E1", // very light creamy honey
              "#FFECB3", // soft warm honey / light caramel
              "#FFE082", // bright golden honey
              "#FFD54F", // vivid honey-gold (strong pop)
              "#FFCA28", // intense warm gold
              "#FFB300", // rich amber / fresh honey
              "#FFA000", // deep warm amber (still glows)
              "#FFECB3", // repeated softer variant
              "#FFFDE7", // almost white-cream with yellow tint
              "#F5E8C7", // warm milky tea color (subtle)
            ],
            "ui:speed": "medium",
            "ui:animationMode": "both",
          },
          heroSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "0",
            "ui:id": "hero-container",
            "ui:styles": {
              position: "relative",
              width: "100%",
              minHeight: "100vh",
              overflow: "hidden",
              padding: "0",
              margin: "0",
              background: "transparent",
            },
            "ui:children": [
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:id": "hero-background",
                "ui:styles": {
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: "0",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:styles": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      background: "rgba(44, 24, 16, 0.8)",
                      backdropFilter: "blur(2px)",
                      zIndex: "1",
                    },
                  },
                ],
              },
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "50px",
                "ui:id": "hero-content",
                "ui:styles": {
                  position: "relative",
                  zIndex: "10",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100vh",
                  padding: "120px 40px 80px",
                  textAlign: "center",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:gap": "30px",
                    "ui:styles": {
                      background: "rgba(44, 24, 16, 0.85)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      border: "2px solid rgba(212, 185, 150, 0.3)",
                      borderRadius: "30px",
                      padding: "60px 50px",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      maxWidth: "900px",
                      animation: "fadeInUp 1s ease-out",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "heading",
                        "ui:text": "Chiyaz Premium Tea & Coffee",
                        "ui:level": "h1",
                        "ui:styles": {
                          fontSize: "4rem",
                          fontWeight: "900",
                          fontFamily: "'Playfair Display', serif",
                          color: "#F5E9D9",
                          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                          marginBottom: "0",
                          lineHeight: "1.1",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text":
                          "Discover the world's finest tea leaves and coffee beans",
                        "ui:styles": {
                          fontSize: "1.8rem",
                          color: "rgba(245, 233, 217, 0.95)",
                          lineHeight: "1.5",
                          marginBottom: "10px",
                          fontFamily: "'Playfair Display', serif",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text":
                          "Sourced from the best plantations, crafted for perfection",
                        "ui:styles": {
                          fontSize: "1.3rem",
                          color: "rgba(245, 233, 217, 0.9)",
                          lineHeight: "1.6",
                          marginBottom: "20px",
                        },
                      },
                    ],
                  },
                  {
                    "ui:widget": "flexLayout",
                    "ui:direction": "row",
                    "ui:gap": "25px",
                    "ui:justify": "center",
                    "ui:wrap": true,
                    "ui:styles": {
                      animation: "fadeInUp 1s ease-out 0.3s backwards",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "button",
                        "ui:icon": {
                          type: "fontawesome",
                          value: "fas fa-trash",
                          color: "#ef4444",
                        },
                        "ui:label": "Explore Collection",
                        "ui:action": "navigateToPage",
                        "ui:actionParams": { url: "/chiyaz/signup" },
                        "ui:styles": {
                          padding: "20px 45px",
                          fontSize: "1.2rem",
                          fontWeight: "700",
                          background: "rgba(245, 233, 217, 0.95)",
                          color: "#8B4513",
                          border: "2px solid rgba(212, 185, 150, 0.5)",
                          borderRadius: "50px",
                          cursor: "pointer",
                          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s ease",
                          transform: "translateY(0)",
                        },
                        "ui:hoverTransform": "translateY(-5px) scale(1.05)",
                        "ui:hoverShadow":
                          "0 15px 40px rgba(245, 233, 217, 0.4)",
                      },
                      {
                        "ui:widget": "button",
                        "ui:label": "☕ Join Community",
                        "ui:action": "navigateToPage",
                        "ui:actionParams": { url: "/chiyaz/login" },
                        "ui:styles": {
                          padding: "20px 45px",
                          fontSize: "1.2rem",
                          fontWeight: "700",
                          background: "rgba(245, 233, 217, 0.15)",
                          color: "#F5E9D9",
                          border: "2px solid rgba(212, 185, 150, 0.3)",
                          borderRadius: "50px",
                          cursor: "pointer",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s ease",
                          transform: "translateY(0)",
                        },
                        "ui:hoverTransform": "translateY(-5px) scale(1.05)",
                        "ui:hoverShadow":
                          "0 15px 40px rgba(245, 233, 217, 0.3)",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          statsSection: {
            "ui:widget": "container",
            "ui:direction": "row",
            "ui:gap": "60px",
            "ui:styles": {
              marginTop: "40px",
              animation: "fadeInUp 1s ease-out 0.6s backwards",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              background: "rgba(44, 24, 16, 0.85)",
              backdropFilter: "blur(15px) saturate(180%)",
              borderRadius: "25px",
              padding: "40px 50px",
              border: "2px solid rgba(212, 185, 150, 0.3)",
              maxWidth: "1000px",
              margin: "0 auto 80px",
              color: "#F5E9D9",
            },
            "ui:children": [
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "10px",
                "ui:styles": {
                  textAlign: "center",
                  minWidth: "180px",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "50+",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "3.5rem",
                      fontWeight: "900",
                      color: "#F5E9D9",
                      margin: "0",
                      textShadow: "0 0 20px rgba(245, 233, 217, 0.2)",
                    },
                  },
                  {
                    "ui:widget": "text",
                    "ui:content": "Tea Varieties",
                    "ui:styles": {
                      fontSize: "1.1rem",
                      color: "rgba(245, 233, 217, 0.95)",
                      fontWeight: "500",
                    },
                  },
                ],
              },
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "10px",
                "ui:styles": {
                  textAlign: "center",
                  minWidth: "180px",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "30+",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "3.5rem",
                      fontWeight: "900",
                      color: "#F5E9D9",
                      margin: "0",
                      textShadow: "0 0 20px rgba(245, 233, 217, 0.2)",
                    },
                  },
                  {
                    "ui:widget": "text",
                    "ui:content": "Coffee Origins",
                    "ui:styles": {
                      fontSize: "1.1rem",
                      color: "rgba(245, 233, 217, 0.95)",
                      fontWeight: "500",
                    },
                  },
                ],
              },
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "10px",
                "ui:styles": {
                  textAlign: "center",
                  minWidth: "180px",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "100%",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "3.5rem",
                      fontWeight: "900",
                      color: "#F5E9D9",
                      margin: "0",
                      textShadow: "0 0 20px rgba(245, 233, 217, 0.2)",
                    },
                  },
                  {
                    "ui:widget": "text",
                    "ui:content": "Organic Sourced",
                    "ui:styles": {
                      fontSize: "1.1rem",
                      color: "rgba(245, 233, 217, 0.95)",
                      fontWeight: "500",
                    },
                  },
                ],
              },
            ],
          },
          featuresSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "70px",
            "ui:styles": {
              padding: "100px 40px",
              background: "transparent",
              position: "relative",
            },
            "ui:children": [
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "25px",
                "ui:styles": {
                  textAlign: "center",
                  maxWidth: "900px",
                  margin: "0 auto",
                  background: "rgba(44, 24, 16, 0.85)",
                  backdropFilter: "blur(15px) saturate(180%)",
                  borderRadius: "25px",
                  padding: "50px 40px",
                  border: "2px solid rgba(212, 185, 150, 0.3)",
                  color: "#F5E9D9",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "✨ Premium Selection",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "3.5rem",
                      fontWeight: "900",
                      color: "#F5E9D9",
                      marginBottom: "10px",
                      fontFamily: "'Playfair Display', serif",
                    },
                  },
                  {
                    "ui:widget": "paragraph",
                    "ui:text":
                      "Experience the finest tea and coffee from around the world",
                    "ui:styles": {
                      fontSize: "1.4rem",
                      color: "rgba(245, 233, 217, 0.9)",
                      lineHeight: "1.6",
                    },
                  },
                ],
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 2,
                "ui:gap": "30px",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "0 auto",
                },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "🍵 Premium Tea Collection",
                    "ui:description":
                      "From delicate Darjeeling to robust Assam, discover teas sourced from the finest estates across India, China, and Japan.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(44, 24, 16, 0.85)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "2px solid rgba(212, 185, 150, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                      color: "#F5E9D9",
                    },
                    "ui:titleStyles": {
                      color: "#F5E9D9",
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      marginBottom: "15px",
                      fontFamily: "'Playfair Display', serif",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(245, 233, 217, 0.9)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(139, 69, 19, 0.4)",
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "☕ Artisan Coffee Beans",
                    "ui:description":
                      "Single-origin beans from Ethiopia, Colombia, Brazil, and more. Roasted to perfection for the ultimate coffee experience.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(44, 24, 16, 0.85)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "2px solid rgba(212, 185, 150, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                      color: "#F5E9D9",
                    },
                    "ui:titleStyles": {
                      color: "#F5E9D9",
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      marginBottom: "15px",
                      fontFamily: "'Playfair Display', serif",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(245, 233, 217, 0.9)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(139, 69, 19, 0.4)",
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🌱 Organic & Sustainable",
                    "ui:description":
                      "All our products are ethically sourced, organic, and sustainable. Supporting farmers and protecting the environment.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(44, 24, 16, 0.85)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "2px solid rgba(212, 185, 150, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                      color: "#F5E9D9",
                    },
                    "ui:titleStyles": {
                      color: "#F5E9D9",
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      marginBottom: "15px",
                      fontFamily: "'Playfair Display', serif",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(245, 233, 217, 0.9)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(139, 69, 19, 0.4)",
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🎁 Subscription Boxes",
                    "ui:description":
                      "Curated monthly boxes with new tea and coffee discoveries. Perfect for exploring different flavors and origins.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(44, 24, 16, 0.85)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "2px solid rgba(212, 185, 150, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                      color: "#F5E9D9",
                    },
                    "ui:titleStyles": {
                      color: "#F5E9D9",
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      marginBottom: "15px",
                      fontFamily: "'Playfair Display', serif",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(245, 233, 217, 0.9)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(139, 69, 19, 0.4)",
                  },
                ],
              },
            ],
          },
          menuSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "80px",
            "ui:styles": {
              padding: "100px 40px",
              background: "transparent",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "🍵 Our Premium Tea Collection",
                "ui:level": "h2",
                "ui:styles": {
                  fontSize: "3.5rem",
                  fontWeight: "900",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: "60px",
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                },
              },
              {
                "ui:widget": "projectGrid",
                "ui:dataSource": "chiyaz.menu.api", // ✅ FIX: Point to actual data location
                "ui:filterBy": { category: "Tea" }, // ✅ ADD: Filter for Tea only
                "ui:animated": true,
                "ui:fieldMap": {
                  // ✅ ADD: Map your menu fields to grid fields
                  name: "productName", // grid expects "name", you have "productName"
                  title: "productName", // also map to title
                  image: "imageUrl", // grid expects "image", you have "imageUrl"
                  description: "description",
                  price: "price",
                  category: "category",
                },
                "ui:cardStyles": {
                  background: "rgba(44, 24, 16, 0.85)",
                  border: "1px solid rgba(212, 185, 150, 0.2)",
                  borderRadius: "20px",
                  color: "#F5E9D9",
                  padding: "25px",
                },
                "ui:titleStyles": {
                  color: "#F5E9D9",
                  fontFamily: "'Playfair Display', serif",
                },
                "ui:descriptionStyles": {
                  color: "rgba(245, 233, 217, 0.9)",
                },
                "ui:priceStyles": {
                  color: "#D2691E",
                  fontWeight: "700",
                },
              },
              {
                "ui:widget": "heading",
                "ui:text": "☕ Our Premium Coffee Collection",
                "ui:level": "h2",
                "ui:styles": {
                  fontSize: "3.5rem",
                  fontWeight: "900",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "'Playfair Display', serif",
                  marginTop: "80px",
                  marginBottom: "60px",
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                },
              },
              {
                "ui:widget": "projectGrid",
                "ui:dataSource": "chiyaz.menu.api", // ✅ FIX: Point to actual data location
                "ui:filterBy": { category: "Coffee" }, // ✅ ADD: Filter for Coffee only
                "ui:animated": true,
                "ui:fieldMap": {
                  // ✅ ADD: Map your menu fields to grid fields
                  name: "productName", // grid expects "name", you have "productName"
                  title: "productName", // also map to title
                  image: "imageUrl", // grid expects "image", you have "imageUrl"
                  description: "description",
                  price: "price",
                  category: "category",
                },
                "ui:cardStyles": {
                  background: "rgba(44, 24, 16, 0.85)",
                  border: "1px solid rgba(212, 185, 150, 0.2)",
                  borderRadius: "20px",
                  color: "#F5E9D9",
                  padding: "25px",
                },
                "ui:titleStyles": {
                  color: "#F5E9D9",
                  fontFamily: "'Playfair Display', serif",
                },
                "ui:descriptionStyles": {
                  color: "rgba(245, 233, 217, 0.9)",
                },
                "ui:priceStyles": {
                  color: "#D2691E",
                  fontWeight: "700",
                },
              },
            ],
          },
          reviewsSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "70px",
            "ui:styles": {
              padding: "100px 40px",
              background: "transparent",
            },
            "ui:children": [
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "25px",
                "ui:styles": {
                  textAlign: "center",
                  maxWidth: "900px",
                  margin: "0 auto",
                  background: "rgba(44, 24, 16, 0.85)",
                  backdropFilter: "blur(15px) saturate(180%)",
                  borderRadius: "25px",
                  padding: "50px 40px",
                  border: "2px solid rgba(212, 185, 150, 0.3)",
                  color: "#F5E9D9",
                  boxShadow: "0 8px 32px rgba(139, 69, 19, 0.25)",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "⭐ Customer Reviews",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "3.5rem",
                      fontWeight: "900",
                      color: "#F5E9D9",
                      fontFamily: "'Playfair Display', serif",
                      textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                    },
                  },
                  {
                    "ui:widget": "paragraph",
                    "ui:text":
                      "See what our customers are saying about our premium tea & coffee",
                    "ui:styles": {
                      fontSize: "1.3rem",
                      color: "rgba(245, 233, 217, 0.9)",
                      lineHeight: "1.6",
                    },
                  },
                ],
              },
              {
                "ui:widget": "customerReviews",
                "ui:id": "chiyaz-reviews",
                "ui:dataSource": "chiyaz.reviews.list",
                "ui:maxReviews": 6,
                "ui:layout": "grid",
                "ui:showRatingSummary": true,
                "ui:showWriteReview": true,
                "ui:writeReviewAction": "openReviewModal",
                "ui:sectionBg": "transparent",
                "ui:cardStyles": {
                  background: "rgba(44, 24, 16, 0.85)",
                  border: "1px solid rgba(212, 185, 150, 0.2)",
                  borderRadius: "20px",
                  color: "#F5E9D9",
                  padding: "30px",
                  backdropFilter: "blur(20px) saturate(180%)",
                },
                "ui:titleStyles": {
                  color: "#F5E9D9",
                  fontFamily: "'Playfair Display', serif",
                },
                "ui:textStyles": {
                  color: "rgba(245, 233, 217, 0.9)",
                },
                "ui:ratingStyles": {
                  color: "#D2691E",
                },
                "ui:summaryStyles": {
                  background: "rgba(44, 24, 16, 0.85)",
                  border: "1px solid rgba(212, 185, 150, 0.2)",
                  borderRadius: "20px",
                  color: "#F5E9D9",
                  padding: "25px",
                },
              },
            ],
          },
          ctaSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "35px",
            "ui:styles": {
              padding: "80px 40px 100px",
              background: "transparent",
              textAlign: "center",
              position: "relative",
            },
            "ui:children": [
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "30px",
                "ui:styles": {
                  maxWidth: "900px",
                  margin: "0 auto",
                  background: "rgba(44, 24, 16, 0.85)",
                  backdropFilter: "blur(25px) saturate(180%)",
                  borderRadius: "30px",
                  padding: "60px 50px",
                  border: "2px solid rgba(212, 185, 150, 0.3)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  color: "#F5E9D9",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "Ready to Elevate Your Tea & Coffee Experience?",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "3.2rem",
                      fontWeight: "900",
                      color: "#F5E9D9",
                      marginBottom: "15px",
                      lineHeight: "1.2",
                      fontFamily: "'Playfair Display', serif",
                    },
                  },
                  {
                    "ui:widget": "paragraph",
                    "ui:text":
                      "Join thousands of tea and coffee lovers enjoying our premium collection",
                    "ui:styles": {
                      fontSize: "1.4rem",
                      color: "rgba(245, 233, 217, 0.95)",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "🌟 Start Your Journey",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/chiyaz/signup" },
                    "ui:styles": {
                      padding: "20px 55px",
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      background: "rgba(245, 233, 217, 0.95)",
                      color: "#8B4513",
                      border: "2px solid rgba(212, 185, 150, 0.5)",
                      borderRadius: "50px",
                      cursor: "pointer",
                      boxShadow: "0 10px 40px rgba(245, 233, 217, 0.3)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.4s ease",
                      margin: "0 auto",
                    },
                    "ui:hoverTransform": "translateY(-5px) scale(1.08)",
                    "ui:hoverShadow": "0 20px 60px rgba(245, 233, 217, 0.5)",
                  },
                ],
              },
            ],
          },
        },
        styles: {
          padding: "0",
          background: "rgba(44, 24, 16, 0.85)",
          minHeight: "100vh",
          margin: "0",
        },
        triggers: [
          {
            event: "load",
            action: "loadTheme",
          },
          {
            event: "load",
            source: "chiyaz.menu.api", // ✅ Load menu data on page load
          },
          {
            event: "load",
            source: "chiyaz.reviews.list",
          },
          {
            event: "load",
            source: "chiyaz.metadata",
          },
        ],
      },
      footer: {
        table: {},
        modal: {},
        uiSchema: {
          footerText: {
            "ui:widget": "text",
            "ui:content": "© 2024 Chiyaz Tea & Coffee. All rights reserved.",
            "ui:styles": {
              textAlign: "center",
              color: "#F5E9D9",
              fontSize: "14px",
            },
          },
        },
        styles: {
          background: "#2C1810",
          padding: "32px",
          textAlign: "center",
        },
        triggers: [],
      },
    },

    resolvedAPIs: {},
  },

  {
    title: "BuilderPlatform - Create Websites Without Code",
    slug: "auth",
    projectUUID: "platform-auth-001",
    taskUUID: "auth001",
    status: "Active",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,
    isTemplate: false, // Mark as global template
    templateCategory: "E-commerce", // Category (E-commerce, Portfolio, Dashboard, Landing Page, Blog, Other)
    organizationId: null,
    createdBy: "000000000000000000000000",

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

      /* Smooth form transitions */
.login-form-container {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
        initAuthMode: `
  console.log('🎬 Initializing authMode to login');
  context.handlers.setData('authMode', 'login');
`,
        handleSignup: `
console.log('📝 Signup action triggered');

const { email, password, firstName, lastName, organizationName, pricingPlan } = context.formData || {};

if (!email || !password || !organizationName || !pricingPlan) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Please fill all required fields (email, password, organization, plan)',
    background: '#ef4444'
  });
  return;
}

try {
  const response = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
      firstName: firstName?.trim() || '',
      lastName: lastName?.trim() || '',
      organizationName: organizationName.trim(),
      pricingPlan
    })
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle common backend errors with better messages
    let errorMsg = data.error || 'Signup failed';

    if (errorMsg.includes('Email already registered')) {
      errorMsg = 'This email is already in use. Try logging in?';
    } else if (errorMsg.includes('Invalid pricing plan')) {
      errorMsg = 'Please select a valid plan (Starter, Professional, Enterprise)';
    }

    context.handlers.showNotification({
      type: 'toast',
      message: '❌ ' + errorMsg,
      background: '#ef4444',
      duration: 6000
    });
    return;
  }

  console.log('✅ Signup response:', data);

  // ── Success path ──
  context.handlers.showNotification({
    type: 'toast',
    message: '🎉 Account created! Check your email to verify it',
    background: '#10b981',
    duration: 4000
  });

  // ✅ Redirect to check-email page (now in JSON config!)
  setTimeout(() => {
    window.location.href = '/auth/check-email?email=' + encodeURIComponent(email.trim().toLowerCase());
  }, 1500);

} catch (error) {
  console.error('Signup network error:', error);

  let msg = '❌ Something went wrong. Please check your connection.';
  if (error.message && error.message.includes('CORS')) {
    msg = '❌ Server connection issue (CORS). Is backend running?';
  } else if (error.message && error.message.includes('fetch')) {
    msg = '❌ Cannot connect to server. Is it running on localhost:5000?';
  }

  context.handlers.showNotification({
    type: 'toast',
    message: msg,
    background: '#ef4444'
  });
}
`,
        // ✅ ADD: handleForgotPassword
        handleForgotPassword: `
        console.log('🔑 Forgot password action triggered');
        const { email } = context.formData || {};

        if (!email) {
          context.handlers.showNotification({
            type: 'toast',
            message: '❌ Please enter your email address',
            background: '#ef4444'
          });
          return;
        }

        try {
          const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });

          const data = await response.json();

          if (!response.ok) {
            context.handlers.showNotification({
              type: 'toast',
              message: data.error || '❌ Request failed',
              background: '#ef4444'
            });
            return;
          }

          context.handlers.showNotification({
            type: 'toast',
            message: '✅ Password reset link sent to your email!',
            background: '#10b981'
          });

          // Switch back to login after sending reset link
          setTimeout(() => {
            context.handlers.setData('authMode', 'login');
          }, 2000);

        } catch (error) {
          console.error('Forgot password error:', error);
          context.handlers.showNotification({
            type: 'toast',
            message: '❌ Network error. Please try again.',
            background: '#ef4444'
          });
        }
      `,
        switchAuthMode: `
        const mode = context.actionParams?.mode || 'login';
        console.log('🔄 Switching auth mode to:', mode);
        
        // Store current mode in DataStore
        context.handlers.setData('authMode', mode);
        
        // Clear any previous form data
        context.handlers.setFormData({});
        context.handlers.setFieldErrors({});
      `,
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
  // ✅ CHANGED: Call /api instead of http://localhost:5000/api
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
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

  context.handlers.showNotification({
    type: 'toast',
    message: \`✅ Welcome back, \${data.user.firstName || 'User'}!\`,
    background: '#10b981'
  });

  setTimeout(() => {
    if (data.user.role === 'SUPER_ADMIN') {
      window.location.href = '/';
    } else if (data.user.role === 'CLIENT_ADMIN') {
      window.location.href = '/';
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

        // ✅ FIXED: Email verification handler (matches static page behavior)
        verifyEmailToken: `
console.log('🔐 Email verification triggered');
const { token } = context.queryParams || {};

if (!token) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Invalid verification link - No token provided',
    background: '#ef4444',
    duration: 5000
  });

  setTimeout(() => {
    window.location.href = '/auth';
  }, 2000);
  return;
}

try {
  console.log('📡 Calling verify-email endpoint with token:', token);

  // ✅ Use GET method with query param (matches backend route)
  const response = await fetch('/api/auth/verify-email?token=' + encodeURIComponent(token), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  const data = await response.json();
  console.log('📦 Verification response:', data);

  if (response.ok && data.success) {
    context.handlers.showNotification({
      type: 'toast',
      message: '✅ Email verified successfully! Redirecting to payment...',
      background: '#10b981',
      duration: 3000
    });

    // ✅ Redirect to payment page with organization ID
    setTimeout(() => {
      const paymentUrl = '/auth/payment?orgId=' + data.organization.id;
      console.log('🔄 Redirecting to:', paymentUrl);
      window.location.href = paymentUrl;
    }, 3000);
  } else {
    throw new Error(data.error || 'Verification failed');
  }
} catch (error) {
  console.error('❌ Email verification error:', error);

  context.handlers.showNotification({
    type: 'toast',
    message: '❌ ' + (error.message || 'Verification failed. Link may be expired.'),
    background: '#ef4444',
    duration: 6000
  });

  setTimeout(() => {
    window.location.href = '/auth';
  }, 3000);
}
`,

        // ✅ NEW: Stripe checkout handler
        handleStripeCheckout: `
console.log('💳 Stripe checkout triggered');
const { plan, organizationId } = context.queryParams || {};

if (!plan) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ No plan selected',
    background: '#ef4444'
  });
  return;
}

try {
  context.handlers.showNotification({
    type: 'toast',
    message: '🔄 Creating checkout session...',
    background: '#3b82f6',
    duration: 3000
  });

  const response = await fetch('/api/payment/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ plan, organizationId })
  });

  const data = await response.json();

  if (response.ok && data.url) {
    // Redirect to Stripe checkout
    window.location.href = data.url;
  } else {
    throw new Error(data.error || 'Failed to create checkout session');
  }
} catch (error) {
  console.error('Stripe checkout error:', error);

  context.handlers.showNotification({
    type: 'toast',
    message: '❌ ' + (error.message || 'Payment setup failed. Please try again.'),
    background: '#ef4444',
    duration: 5000
  });
}
`,

        // ✅ FIXED: Load payment data when payment page loads
        loadPaymentData: `
console.log('💳 Loading payment data...');
const { orgId } = context.queryParams || {};

if (!orgId) {
  console.error('❌ No orgId in URL');
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ No organization ID provided',
    background: '#ef4444',
    duration: 5000
  });
  setTimeout(() => {
    window.location.href = '/auth';
  }, 2000);
  return;
}

try {
  const response = await fetch('/api/organizations/payment/' + orgId, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  const data = await response.json();

  if (response.ok && data.organization) {
    console.log('✅ Payment data loaded:', data.organization);
    // Store org data for the activate button to use
    window.__paymentOrgData = data.organization;
  } else {
    throw new Error(data.error || 'Failed to load organization');
  }
} catch (error) {
  console.error('❌ Load payment data error:', error);
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ ' + (error.message || 'Failed to load organization details'),
    background: '#ef4444',
    duration: 5000
  });
  setTimeout(() => {
    window.location.href = '/auth';
  }, 3000);
}
`,

        // ✅ FIXED: Activate free trial (matches static page)
        activateFreeTrial: `
console.log('🚀 Activating free trial...');
const { orgId } = context.queryParams || {};

if (!orgId) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ No organization ID',
    background: '#ef4444',
    duration: 5000
  });
  return;
}

try {
  context.handlers.showNotification({
    type: 'toast',
    message: '⏳ Activating your account...',
    background: '#3b82f6',
    duration: 3000
  });

  const response = await fetch('/api/auth/payment-success', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      organizationId: orgId,
      stripeCustomerId: 'cus_test_' + Date.now(),
      stripeSubscriptionId: 'sub_test_' + Date.now()
    })
  });

  const data = await response.json();

  if (response.ok && data.success) {
    console.log('✅ Account activated!');
    context.handlers.showNotification({
      type: 'toast',
      message: '🎉 Welcome! Your account is now active.',
      background: '#10b981',
      duration: 4000
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 1800);
  } else {
    throw new Error(data.error || 'Activation failed');
  }
} catch (error) {
  console.error('❌ Activation error:', error);
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ ' + (error.message || 'Failed to activate account'),
    background: '#ef4444',
    duration: 5000
  });
}
`,
        handleAcceptInvitation: `
console.log('🎯 Accept invitation triggered');
const { password, confirmPassword } = context.formData || {};
const { token } = context.queryParams || {};

if (!token) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Invalid invitation link',
    background: '#ef4444',
    duration: 5000
  });
  setTimeout(() => {
    window.location.href = '/auth';
  }, 2000);
  return;
}

if (!password || !confirmPassword) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Please fill in all fields',
    background: '#ef4444',
    duration: 3000
  });
  return;
}

if (password !== confirmPassword) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Passwords do not match',
    background: '#ef4444',
    duration: 3000
  });
  return;
}

if (password.length < 8) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Password must be at least 8 characters',
    background: '#ef4444',
    duration: 3000
  });
  return;
}

try {
  const response = await fetch('/api/users/accept-invitation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ token, password })
  });

  const data = await response.json();

  if (response.ok) {
    context.handlers.showNotification({
      type: 'toast',
      message: '✅ Invitation accepted! Redirecting to login...',
      background: '#10b981',
      duration: 3000
    });

    setTimeout(() => {
      window.location.href = '/auth';
    }, 1500);
  } else {
    throw new Error(data.error || 'Failed to accept invitation');
  }
} catch (error) {
  console.error('Accept invitation error:', error);
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ ' + (error.message || 'Failed to accept invitation'),
    background: '#ef4444',
    duration: 5000
  });
}
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
          // ✅ FIXED LOGIN SECTION - All forms properly centered
          // ✅ FIXED LOGIN SECTION - Left-aligned labels, larger wrapper
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
              // ========== LOGIN FORM ==========
              {
                "ui:widget": "conditionalContent",
                "ui:condition": "{{api.authMode === 'login'}}",
                "ui:content": {
                  "ui:widget": "container",
                  "ui:direction": "column",
                  "ui:align": "flex-start", // Changed from "center" to "flex-start"
                  "ui:styles": {
                    width: "100%",
                    maxWidth: "500px", // Increased from 450px
                    margin: "0 auto",
                    background: "white",
                    padding: "50px", // Increased padding
                    borderRadius: "20px", // Slightly larger radius
                    boxShadow: "0 15px 50px rgba(0,0,0,0.12)", // Enhanced shadow
                    border: "1px solid #e2e8f0",
                    boxSizing: "border-box",
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
                        fontSize: "2.2rem", // Slightly larger
                        fontWeight: "800",
                        width: "100%",
                      },
                    },
                    {
                      "ui:widget": "paragraph",
                      "ui:text": "Login to your BuilderPlatform account",
                      "ui:className": "gray-text",
                      "ui:styles": {
                        textAlign: "center",
                        marginBottom: "40px", // Increased margin
                        width: "100%",
                        fontSize: "1.05rem", // Slightly larger
                      },
                    },
                    {
                      "ui:widget": "formContainer",
                      "ui:title": "",
                      "ui:styles": {
                        width: "100%",
                        border: "none",
                        padding: "0",
                        boxSizing: "border-box",
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
                            marginBottom: "20px",
                            width: "100%",
                            boxSizing: "border-box",
                            textAlign: "left",
                          },
                          "ui:labelStyles": {
                            // Added labelStyles
                            textAlign: "left",
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#334155",
                            fontSize: "0.95rem",
                          },
                          "ui:inputStyles": {
                            border: "2px solid #e2e8f0",
                            padding: "14px 18px", // Slightly larger padding
                            fontSize: "1.05rem", // Slightly larger
                            borderRadius: "10px", // Slightly larger radius
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
                            marginBottom: "30px", // Increased margin
                            width: "100%",
                            boxSizing: "border-box",
                            textAlign: "left",
                          },
                          "ui:labelStyles": {
                            // Added labelStyles
                            textAlign: "left",
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#334155",
                            fontSize: "0.95rem",
                          },
                          "ui:inputStyles": {
                            border: "2px solid #e2e8f0",
                            padding: "14px 18px", // Slightly larger padding
                            fontSize: "1.05rem", // Slightly larger
                            borderRadius: "10px", // Slightly larger radius
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
                            padding: "16px", // Slightly larger
                            fontSize: "1.05rem", // Slightly larger
                            fontWeight: "600",
                            background: "#1e40af",
                            border: "none",
                            borderRadius: "10px", // Slightly larger radius
                            color: "white",
                            cursor: "pointer",
                            boxSizing: "border-box",
                          },
                        },
                      ],
                    },
                    {
                      "ui:widget": "spacer",
                      "ui:height": 25, // Increased
                    },
                    {
                      "ui:widget": "authLinks",
                      "ui:alignment": "center",
                      "ui:direction": "column",
                      "ui:styles": {
                        width: "100%",
                        gap: "15px", // Increased gap
                      },
                      "ui:links": [
                        {
                          label: "Forgot Password?",
                          action: "switchAuthMode",
                          actionParams: { mode: "forgot" },
                        },
                        {
                          prefix: "Don't have an account?",
                          label: "Sign Up",
                          action: "switchAuthMode",
                          actionParams: { mode: "signup" },
                        },
                      ],
                    },
                  ],
                },
              },

              // ========== SIGNUP FORM ==========
              {
                "ui:widget": "conditionalContent",
                "ui:condition": "{{api.authMode === 'login'}}",
                "ui:content": {
                  "ui:widget": "container",
                  "ui:direction": "column",
                  "ui:align": "flex-start",
                  "ui:styles": {
                    width: "100%",
                    maxWidth: "520px",
                    margin: "0 auto",
                    background: "white",
                    padding: "50px",
                    borderRadius: "20px",
                    boxShadow: "0 15px 50px rgba(0,0,0,0.12)",
                    border: "1px solid #e2e8f0",
                    boxSizing: "border-box",
                  },
                  "ui:children": [
                    {
                      "ui:widget": "heading",
                      "ui:text": "✨ Create Your Account",
                      "ui:level": "h2",
                      "ui:className": "gradient-heading",
                      "ui:styles": {
                        textAlign: "center",
                        marginBottom: "10px",
                        fontSize: "2.2rem",
                        fontWeight: "800",
                        width: "100%",
                      },
                    },
                    {
                      "ui:widget": "paragraph",
                      "ui:text": "Join BuilderPlatform and start building",
                      "ui:className": "gray-text",
                      "ui:styles": {
                        textAlign: "center",
                        marginBottom: "40px",
                        width: "100%",
                        fontSize: "1.05rem",
                      },
                    },
                    {
                      "ui:widget": "formContainer",
                      "ui:title": "",
                      "ui:styles": {
                        width: "100%",
                        border: "none",
                        padding: "0",
                        boxSizing: "border-box",
                      },
                      "ui:fields": [
                        {
                          "ui:widget": "gridLayout",
                          "ui:columns": 2,
                          "ui:gap": "20px",
                          "ui:styles": {
                            marginBottom: "20px",
                            width: "100%",
                          },
                          "ui:children": [
                            {
                              "ui:widget": "inputField",
                              "ui:label": "First Name",
                              "ui:name": "firstName",
                              "ui:type": "text",
                              "ui:placeholder": "John",
                              "ui:required": true,
                              "ui:styles": {
                                width: "100%",
                                boxSizing: "border-box",
                              },
                              "ui:labelStyles": {
                                textAlign: "left",
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "#334155",
                                fontSize: "0.95rem",
                              },
                              "ui:inputStyles": {
                                border: "2px solid #e2e8f0",
                                padding: "14px 16px",
                                width: "100%",
                                boxSizing: "border-box",
                                borderRadius: "10px",
                                fontSize: "1.05rem",
                              },
                            },
                            {
                              "ui:widget": "inputField",
                              "ui:label": "Last Name",
                              "ui:name": "lastName",
                              "ui:type": "text",
                              "ui:placeholder": "Doe",
                              "ui:required": true,
                              "ui:styles": {
                                width: "100%",
                                boxSizing: "border-box",
                              },
                              "ui:labelStyles": {
                                textAlign: "left",
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "#334155",
                                fontSize: "0.95rem",
                              },
                              "ui:inputStyles": {
                                border: "2px solid #e2e8f0",
                                padding: "14px 16px",
                                width: "100%",
                                boxSizing: "border-box",
                                borderRadius: "10px",
                                fontSize: "1.05rem",
                              },
                            },
                          ],
                        },
                        {
                          "ui:widget": "inputField",
                          "ui:label": "Organization Name",
                          "ui:name": "organizationName",
                          "ui:type": "text",
                          "ui:placeholder": "Your Company Inc.",
                          "ui:required": true,
                          "ui:styles": {
                            marginBottom: "20px",
                            width: "100%",
                            boxSizing: "border-box",
                          },
                          "ui:labelStyles": {
                            textAlign: "left",
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#334155",
                            fontSize: "0.95rem",
                          },
                          "ui:inputStyles": {
                            border: "2px solid #e2e8f0",
                            padding: "14px 18px",
                            width: "100%",
                            boxSizing: "border-box",
                            borderRadius: "10px",
                            fontSize: "1.05rem",
                          },
                        },
                        {
                          "ui:widget": "selectField",
                          "ui:label": "Select Pricing Plan",
                          "ui:name": "pricingPlan",
                          "ui:placeholder": "Choose a plan",
                          "ui:required": true,
                          "ui:options": [
                            {
                              value: "starter",
                              label: "Starter - $200/month",
                            },
                            {
                              value: "professional",
                              label: "Professional - $400/month",
                            },
                            {
                              value: "enterprise",
                              label: "Enterprise - $800/month",
                            },
                          ],
                          "ui:styles": {
                            marginBottom: "20px",
                            width: "100%",
                            boxSizing: "border-box",
                          },
                          "ui:labelStyles": {
                            textAlign: "left",
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#334155",
                            fontSize: "0.95rem",
                          },
                          "ui:selectStyles": {
                            border: "2px solid #e2e8f0",
                            padding: "14px 18px",
                            width: "100%",
                            boxSizing: "border-box",
                            borderRadius: "10px",
                            fontSize: "1.05rem",
                            backgroundColor: "white",
                            cursor: "pointer",
                          },
                        },
                        {
                          "ui:widget": "inputField",
                          "ui:label": "Email Address",
                          "ui:name": "email",
                          "ui:type": "email",
                          "ui:placeholder": "you@company.com",
                          "ui:required": true,
                          "ui:styles": {
                            marginBottom: "20px",
                            width: "100%",
                            boxSizing: "border-box",
                          },
                          "ui:labelStyles": {
                            textAlign: "left",
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#334155",
                            fontSize: "0.95rem",
                          },
                          "ui:inputStyles": {
                            border: "2px solid #e2e8f0",
                            padding: "14px 18px",
                            width: "100%",
                            boxSizing: "border-box",
                            borderRadius: "10px",
                            fontSize: "1.05rem",
                          },
                        },
                        {
                          "ui:widget": "inputField",
                          "ui:label": "Password",
                          "ui:name": "password",
                          "ui:type": "password",
                          "ui:placeholder": "Create a strong password",
                          "ui:required": true,
                          "ui:styles": {
                            marginBottom: "30px",
                            width: "100%",
                            boxSizing: "border-box",
                          },
                          "ui:labelStyles": {
                            textAlign: "left",
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#334155",
                            fontSize: "0.95rem",
                          },
                          "ui:inputStyles": {
                            border: "2px solid #e2e8f0",
                            padding: "14px 18px",
                            width: "100%",
                            boxSizing: "border-box",
                            borderRadius: "10px",
                            fontSize: "1.05rem",
                          },
                        },
                      ],
                      "ui:actions": [
                        {
                          label: "Create Account",
                          action: "handleSignup",
                          variant: "primary",
                          styles: {
                            width: "100%",
                            padding: "16px",
                            fontSize: "1.05rem",
                            fontWeight: "600",
                            background: "#1e40af",
                            border: "none",
                            borderRadius: "10px",
                            color: "white",
                            cursor: "pointer",
                            boxSizing: "border-box",
                          },
                        },
                      ],
                    },
                    {
                      "ui:widget": "spacer",
                      "ui:height": 25,
                    },
                    {
                      "ui:widget": "authLinks",
                      "ui:alignment": "center",
                      "ui:styles": {
                        width: "100%",
                      },
                      "ui:links": [
                        {
                          prefix: "Already have an account?",
                          label: "Login",
                          action: "switchAuthMode",
                          actionParams: { mode: "login" },
                        },
                      ],
                    },
                  ],
                },
              },

              // ========== FORGOT PASSWORD FORM ==========
              {
                "ui:widget": "conditionalContent",
                "ui:condition": "{{api.authMode === 'login'}}",
                "ui:content": {
                  "ui:widget": "container",
                  "ui:direction": "column",
                  "ui:align": "flex-start", // Changed from "center" to "flex-start"
                  "ui:styles": {
                    width: "100%",
                    maxWidth: "500px", // Increased from 450px
                    margin: "0 auto",
                    background: "white",
                    padding: "50px", // Increased padding
                    borderRadius: "20px", // Slightly larger radius
                    boxShadow: "0 15px 50px rgba(0,0,0,0.12)", // Enhanced shadow
                    border: "1px solid #e2e8f0",
                    boxSizing: "border-box",
                  },
                  "ui:children": [
                    {
                      "ui:widget": "heading",
                      "ui:text": "🔑 Reset Password",
                      "ui:level": "h2",
                      "ui:className": "gradient-heading",
                      "ui:styles": {
                        textAlign: "center",
                        marginBottom: "10px",
                        fontSize: "2.2rem", // Slightly larger
                        fontWeight: "800",
                        width: "100%",
                      },
                    },
                    {
                      "ui:widget": "paragraph",
                      "ui:text": "Enter your email to receive a reset link",
                      "ui:className": "gray-text",
                      "ui:styles": {
                        textAlign: "center",
                        marginBottom: "40px", // Increased margin
                        width: "100%",
                        fontSize: "1.05rem", // Slightly larger
                      },
                    },
                    {
                      "ui:widget": "formContainer",
                      "ui:title": "",
                      "ui:styles": {
                        width: "100%",
                        border: "none",
                        padding: "0",
                        boxSizing: "border-box",
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
                            marginBottom: "30px", // Increased margin
                            width: "100%",
                            boxSizing: "border-box",
                          },
                          "ui:labelStyles": {
                            // Added labelStyles
                            textAlign: "left",
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#334155",
                            fontSize: "0.95rem",
                          },
                          "ui:inputStyles": {
                            border: "2px solid #e2e8f0",
                            padding: "14px 18px", // Slightly larger padding
                            fontSize: "1.05rem", // Slightly larger
                            borderRadius: "10px", // Slightly larger radius
                            width: "100%",
                            boxSizing: "border-box",
                          },
                        },
                      ],
                      "ui:actions": [
                        {
                          label: "Send Reset Link",
                          action: "handleForgotPassword",
                          variant: "primary",
                          styles: {
                            width: "100%",
                            padding: "16px", // Slightly larger
                            fontSize: "1.05rem", // Slightly larger
                            fontWeight: "600",
                            background: "#1e40af",
                            border: "none",
                            borderRadius: "10px", // Slightly larger radius
                            color: "white",
                            cursor: "pointer",
                            boxSizing: "border-box",
                          },
                        },
                      ],
                    },
                    {
                      "ui:widget": "spacer",
                      "ui:height": 25,
                    },
                    {
                      "ui:widget": "authLinks",
                      "ui:alignment": "center",
                      "ui:styles": {
                        width: "100%",
                      },
                      "ui:links": [
                        {
                          label: "← Back to Login",
                          action: "switchAuthMode",
                          actionParams: { mode: "login" },
                        },
                      ],
                    },
                  ],
                },
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
            action: "initAuthMode", // ✅ Initialize authMode on page load
          },
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

    // ✅ NEW: Auth flow sub-pages with query param support
    pages: {
      "check-email": {
        title: "Check Your Email",
        components: {
          main: {
            uiSchema: {
              container: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:justify": "center",
                "ui:gap": "30px",
                "ui:styles": {
                  minHeight: "100vh",
                  width: "100%",
                  display: "flex",
                  padding: "40px 20px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:align": "center",
                    "ui:gap": "20px",
                    "ui:styles": {
                      background: "white",
                      borderRadius: "16px",
                      padding: "60px 40px",
                      maxWidth: "500px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "text",
                        "ui:content": "📧",
                        "ui:styles": {
                          fontSize: "80px",
                          marginBottom: "20px",
                        },
                      },
                      {
                        "ui:widget": "heading",
                        "ui:text": "Check Your Email",
                        "ui:level": "h1",
                        "ui:styles": {
                          fontSize: "2rem",
                          fontWeight: "800",
                          color: "#1e293b",
                          marginBottom: "10px",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text": "We've sent a verification link to your email address. Please click the link to verify your account.",
                        "ui:styles": {
                          fontSize: "1.1rem",
                          color: "#64748b",
                          textAlign: "center",
                          lineHeight: "1.6",
                          marginBottom: "20px",
                        },
                      },
                      {
                        "ui:widget": "button",
                        "ui:text": "Back to Login",
                        "ui:action": "navigateToPage",
                        "ui:actionParams": { url: "/auth" },
                        "ui:styles": {
                          padding: "14px 32px",
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "white",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none",
                          borderRadius: "10px",
                          cursor: "pointer",
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },

      "verify-email": {
        title: "Verifying Email...",
        queryParams: ["token", "email"],
        requireParams: true,
        components: {
          main: {
            uiSchema: {
              container: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:justify": "center",
                "ui:gap": "30px",
                "ui:styles": {
                  minHeight: "100vh",
                  width: "100%",
                  display: "flex",
                  padding: "40px 20px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:align": "center",
                    "ui:gap": "20px",
                    "ui:styles": {
                      background: "white",
                      borderRadius: "16px",
                      padding: "60px 40px",
                      maxWidth: "500px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "text",
                        "ui:content": "⏳",
                        "ui:styles": {
                          fontSize: "80px",
                          marginBottom: "20px",
                          animation: "pulse 2s infinite",
                        },
                      },
                      {
                        "ui:widget": "heading",
                        "ui:text": "Verifying Your Email...",
                        "ui:level": "h1",
                        "ui:styles": {
                          fontSize: "2rem",
                          fontWeight: "800",
                          color: "#1e293b",
                          marginBottom: "10px",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text": "Please wait while we verify your email address.",
                        "ui:styles": {
                          fontSize: "1.1rem",
                          color: "#64748b",
                          textAlign: "center",
                          lineHeight: "1.6",
                        },
                      },
                    ],
                  },
                ],
              },
            },
            triggers: [
              {
                event: "load",
                action: "verifyEmailToken",
              },
            ],
          },
        },
      },

      payment: {
        title: "Activate Your Subscription",
        queryParams: ["orgId"], // ✅ FIXED: Use orgId to match static page
        requireParams: true,
        components: {
          main: {
            uiSchema: {
              container: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:justify": "center",
                "ui:gap": "30px",
                "ui:styles": {
                  minHeight: "100vh",
                  width: "100%",
                  display: "flex",
                  padding: "40px 20px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:align": "center",
                    "ui:gap": "20px",
                    "ui:styles": {
                      background: "white",
                      borderRadius: "16px",
                      padding: "60px 40px",
                      maxWidth: "600px",
                      width: "100%",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "text",
                        "ui:content": "💳",
                        "ui:styles": {
                          fontSize: "80px",
                          marginBottom: "20px",
                        },
                      },
                      {
                        "ui:widget": "heading",
                        "ui:text": "Activate Your Subscription",
                        "ui:level": "h1",
                        "ui:styles": {
                          fontSize: "2rem",
                          fontWeight: "800",
                          color: "#1e293b",
                          marginBottom: "10px",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text": "Start your 14-day free trial — no charge today",
                        "ui:styles": {
                          fontSize: "1.1rem",
                          color: "#64748b",
                          textAlign: "center",
                          lineHeight: "1.6",
                          marginBottom: "10px",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text": "✅ 14-Day Free Trial\n✅ No Payment Required Today\n✅ Cancel Anytime",
                        "ui:styles": {
                          fontSize: "1rem",
                          color: "#10b981",
                          textAlign: "center",
                          lineHeight: "1.8",
                          marginBottom: "30px",
                          whiteSpace: "pre-line",
                        },
                      },
                      {
                        "ui:widget": "button",
                        "ui:label": "→  Proceed to Activate Account",
                        "ui:action": "activateFreeTrial",
                        "ui:size": "large",
                        "ui:styles": {
                          padding: "18px 40px",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "12px",
                          cursor: "pointer",
                          width: "100%",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "white",
                          border: "none",
                          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                          transition: "all 0.3s ease",
                        },
                        "ui:hoverTransform": "translateY(-2px)",
                        "ui:hoverShadow": "0 6px 20px rgba(102, 126, 234, 0.6)",
                      },
                    ],
                  },
                ],
              },
            },
            triggers: [
              {
                event: "load",
                action: "loadPaymentData",
              },
            ],
          },
        },
      },

      "accept-invitation": {
        title: "Accept Invitation",
        queryParams: ["token"],
        requireParams: true,
        components: {
          main: {
            uiSchema: {
              container: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:justify": "center",
                "ui:gap": "30px",
                "ui:styles": {
                  minHeight: "100vh",
                  width: "100%",
                  display: "flex",
                  padding: "40px 20px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                },
                "ui:children": [
                  {
                    "ui:widget": "container",
                    "ui:direction": "column",
                    "ui:align": "center",
                    "ui:gap": "20px",
                    "ui:styles": {
                      background: "white",
                      borderRadius: "16px",
                      padding: "60px 40px",
                      maxWidth: "450px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "heading",
                        "ui:text": "Accept Invitation",
                        "ui:level": "h1",
                        "ui:styles": {
                          fontSize: "2rem",
                          fontWeight: "800",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          marginBottom: "10px",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text": "Set your password to join the team",
                        "ui:styles": {
                          color: "#6b7280",
                          marginBottom: "30px",
                        },
                      },
                      {
                        "ui:widget": "formContainer",
                        "ui:title": "",
                        "ui:styles": {
                          width: "100%",
                          border: "none",
                          padding: "0",
                          boxSizing: "border-box",
                        },
                        "ui:fields": [
                          {
                            "ui:widget": "inputField",
                            "ui:label": "Password",
                            "ui:name": "password",
                            "ui:type": "password",
                            "ui:placeholder": "Enter password",
                            "ui:required": true,
                            "ui:styles": {
                              marginBottom: "20px",
                              width: "100%",
                              boxSizing: "border-box",
                              textAlign: "left",
                            },
                            "ui:labelStyles": {
                              textAlign: "left",
                              display: "block",
                              marginBottom: "8px",
                              fontWeight: "600",
                              color: "#334155",
                              fontSize: "0.95rem",
                            },
                            "ui:inputStyles": {
                              border: "2px solid #e2e8f0",
                              padding: "14px 18px",
                              fontSize: "1rem",
                              borderRadius: "10px",
                              width: "100%",
                              boxSizing: "border-box",
                            },
                          },
                          {
                            "ui:widget": "inputField",
                            "ui:label": "Confirm Password",
                            "ui:name": "confirmPassword",
                            "ui:type": "password",
                            "ui:placeholder": "Confirm password",
                            "ui:required": true,
                            "ui:styles": {
                              marginBottom: "30px",
                              width: "100%",
                              boxSizing: "border-box",
                              textAlign: "left",
                            },
                            "ui:labelStyles": {
                              textAlign: "left",
                              display: "block",
                              marginBottom: "8px",
                              fontWeight: "600",
                              color: "#334155",
                              fontSize: "0.95rem",
                            },
                            "ui:inputStyles": {
                              border: "2px solid #e2e8f0",
                              padding: "14px 18px",
                              fontSize: "1rem",
                              borderRadius: "10px",
                              width: "100%",
                              boxSizing: "border-box",
                            },
                          },
                        ],
                        "ui:actions": [
                          {
                            label: "Accept Invitation",
                            action: "handleAcceptInvitation",
                            variant: "primary",
                            styles: {
                              width: "100%",
                              padding: "16px",
                              fontSize: "1rem",
                              fontWeight: "600",
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              border: "none",
                              borderRadius: "10px",
                              color: "white",
                              cursor: "pointer",
                              boxSizing: "border-box",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },

    resolvedAPIs: {},
  },

  // ═══════════════════════════════════════════════════════════
  // ACCEPT INVITATION - Standalone template for /accept-invitation
  // ═══════════════════════════════════════════════════════════
  {
    title: "Accept Invitation",
    slug: "accept-invitation",
    projectUUID: "accept-invitation-001",
    taskUUID: "accept-inv-001",
    status: "Active",
    isTemplate: false,
    templateCategory: "Other",
    organizationId: null,
    createdBy: "000000000000000000000000",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,
    requireAuth: false,

    initialization: {
      globalCSS: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Inter', sans-serif;
      }
      `,
      globalJS: `console.log('Accept Invitation page loaded');`,
      resources: [],
      actions: {
        handleAcceptInvitation: `
console.log('🎯 Accept invitation triggered');
const { password, confirmPassword } = context.formData || {};
const { token } = context.queryParams || {};

if (!token) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Invalid invitation link',
    background: '#ef4444',
    duration: 5000
  });
  setTimeout(() => {
    window.location.href = '/auth';
  }, 2000);
  return;
}

if (!password || !confirmPassword) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Please fill in all fields',
    background: '#ef4444',
    duration: 3000
  });
  return;
}

if (password !== confirmPassword) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Passwords do not match',
    background: '#ef4444',
    duration: 3000
  });
  return;
}

if (password.length < 8) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Password must be at least 8 characters',
    background: '#ef4444',
    duration: 3000
  });
  return;
}

try {
  const response = await fetch('/api/users/accept-invitation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ token, password })
  });

  const data = await response.json();

  if (response.ok) {
    context.handlers.showNotification({
      type: 'toast',
      message: '✅ Invitation accepted! Redirecting to login...',
      background: '#10b981',
      duration: 3000
    });

    setTimeout(() => {
      window.location.href = '/auth';
    }, 1500);
  } else {
    throw new Error(data.error || 'Failed to accept invitation');
  }
} catch (error) {
  console.error('Accept invitation error:', error);
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ ' + (error.message || 'Failed to accept invitation'),
    background: '#ef4444',
    duration: 5000
  });
}
`,
      },
    },

    components: {
      main: {
        uiSchema: {
          container: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:align": "center",
            "ui:justify": "center",
            "ui:gap": "30px",
            "ui:styles": {
              minHeight: "100vh",
              width: "100%",
              display: "flex",
              padding: "40px 20px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            },
            "ui:children": [
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:gap": "20px",
                "ui:styles": {
                  background: "white",
                  borderRadius: "16px",
                  padding: "60px 40px",
                  maxWidth: "450px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "Accept Invitation",
                    "ui:level": "h1",
                    "ui:styles": {
                      fontSize: "2rem",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "10px",
                    },
                  },
                  {
                    "ui:widget": "paragraph",
                    "ui:text": "Set your password to join the team",
                    "ui:styles": {
                      color: "#6b7280",
                      marginBottom: "30px",
                    },
                  },
                  {
                    "ui:widget": "formContainer",
                    "ui:title": "",
                    "ui:styles": {
                      width: "100%",
                      border: "none",
                      padding: "0",
                      boxSizing: "border-box",
                    },
                    "ui:fields": [
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Password",
                        "ui:name": "password",
                        "ui:type": "password",
                        "ui:placeholder": "Enter password",
                        "ui:required": true,
                        "ui:styles": {
                          marginBottom: "20px",
                          width: "100%",
                          boxSizing: "border-box",
                          textAlign: "left",
                        },
                        "ui:labelStyles": {
                          textAlign: "left",
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: "600",
                          color: "#334155",
                          fontSize: "0.95rem",
                        },
                        "ui:inputStyles": {
                          border: "2px solid #e2e8f0",
                          padding: "14px 18px",
                          fontSize: "1rem",
                          borderRadius: "10px",
                          width: "100%",
                          boxSizing: "border-box",
                        },
                      },
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Confirm Password",
                        "ui:name": "confirmPassword",
                        "ui:type": "password",
                        "ui:placeholder": "Confirm password",
                        "ui:required": true,
                        "ui:styles": {
                          marginBottom: "30px",
                          width: "100%",
                          boxSizing: "border-box",
                          textAlign: "left",
                        },
                        "ui:labelStyles": {
                          textAlign: "left",
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: "600",
                          color: "#334155",
                          fontSize: "0.95rem",
                        },
                        "ui:inputStyles": {
                          border: "2px solid #e2e8f0",
                          padding: "14px 18px",
                          fontSize: "1rem",
                          borderRadius: "10px",
                          width: "100%",
                          boxSizing: "border-box",
                        },
                      },
                    ],
                    "ui:actions": [
                      {
                        label: "Accept Invitation",
                        action: "handleAcceptInvitation",
                        variant: "primary",
                        styles: {
                          width: "100%",
                          padding: "16px",
                          fontSize: "1rem",
                          fontWeight: "600",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none",
                          borderRadius: "10px",
                          color: "white",
                          cursor: "pointer",
                          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    },

    resolvedAPIs: {},
  },

];

const seed = async () => {
  try {
    // ✅ Find a SUPER_ADMIN user
    const User = require("../../models/User"); // ✅ Fixed path
    let systemUser = await User.findOne({ role: "SUPER_ADMIN" });

    if (!systemUser) {
      console.error("❌ No SUPER_ADMIN user found. Please create one first.");
      mongoose.disconnect();
      return;
    }

    // ✅ Update createdBy for all websites
    websites.forEach((site) => {
      site.createdBy = systemUser._id;
    });

    await PageConfig.deleteMany({});
    console.log("🗑️  Cleared old data");

    await PageConfig.insertMany(websites);
    console.log("✅ Seeded", websites.length, "templates");
    console.log("👤 Created by:", systemUser.email);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    mongoose.disconnect();
  }
};

seed();
