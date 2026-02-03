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
    title: "Chiyaz - Premium Tea & Coffee",
    slug: "chiyaz",
    projectUUID: "chiyaz-tea-coffee",
    taskUUID: "chiyaz001",
    status: "Active",
    isTemplate: true,
    templateCategory: "E-commerce",
    organizationId: "696fd6f8a216cc192d63b84a",
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
        "chiyaz.tea.list",
        "chiyaz.coffee.list",
        "chiyaz.reviews.submit",

        "chiyaz.menu.api",
        "chiyaz.menu.list",
        "chiyaz.menu.create",
        "chiyaz.menu.update",
        "chiyaz.menu.delete",
      ],

      actions: {
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

        handleSignup: `console.log('📝 Chiyaz signup handling');
const { email, password, firstName, lastName, name } = context.formData || {};

if (!email || !password) {
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Email and password are required',
    background: '#8B4513'
  });
  return;
}

try {
  const response = await fetch('/api/enduser-auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
      name: \`\${firstName?.trim() || ''} \${lastName?.trim() || ''}\`.trim(),
      organizationId: '696fd6f8a216cc192d63b84a',
      websiteSlug: 'chiyaz'
    })
  });
    
  const data = await response.json();
    
  if (!response.ok) {
    context.handlers.showNotification({
      type: 'toast',
      message: data.error || '❌ Signup failed',
      background: '#8B4513',
      duration: 4000
    });
    return;
  }
    
  console.log('✅ Signup successful:', data);
    
  context.handlers.showNotification({
    type: 'toast',
    message: '✅ Account created! Welcome to Chiyaz.',
    background: '#2E7D32',
    duration: 4000
  });
    
  setTimeout(() => {
    window.location.href = '/chiyaz/login';
  }, 2000);
    
} catch (error) {
  console.error('❌ Signup error:', error);
  context.handlers.showNotification({
    type: 'toast',
    message: '❌ Network error. Please try again.',
    background: '#8B4513'
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
      },
    },

    pages: {
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
      // ADD THIS TO YOUR CHIYAZ TEMPLATE IN demo.js
      // This is the MENU PAGE configuration - add it to the pages object

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
                    name: "inStock",
                    label: "In Stock",
                    type: "text",
                    placeholder: "true",
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
                action: "api",
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
    },

    components: {
      navbar: {
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🍵 Chiyaz",
            "ui:styles": {
              fontSize: "28px",
              fontWeight: "800",
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #F5E9D9 0%, #D2691E 100%)",
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
                        "ui:label": "🍵 Explore Collection",
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
              backgroundColor: "transparent",
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
                "ui:dataSource": "chiyaz.tea.list_filtered.data",
                "ui:animated": true,
                "ui:cardStyles": {
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
                "ui:dataSource": "chiyaz.coffee.list_filtered.data",
                "ui:animated": true,
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
            source: "chiyaz.reviews.list",
          },
          {
            event: "load",
            source: "chiyaz.tea.list",
          },
          {
            event: "load",
            source: "chiyaz.coffee.list",
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

 
];

const seed = async () => {
  try {
    // ✅ Find a SUPER_ADMIN user
    const User = require("./models/User");
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
