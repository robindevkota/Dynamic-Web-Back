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
  // Add this to your demo.js websites array

  // Add this to your demo.js websites array

  // Add this to your demo.js websites array

  {
    title: "HotelHub - Reservation Management",
    slug: "hotelhub",
    projectUUID: "hotel-hotelhub",
    taskUUID: "hotel001",
    status: "Active",
    isTemplate: true,
    templateCategory: "E-commerce",
    organizationId: "696fd6f8a216cc192d63b84a",
    createdBy: "000000000000000000000000",
    accountValidation: true,
    otpValidation: false,
    isAnonymous: false,
    requireAuth: false,
    redirectIfNotAuth: "/hotelhub/login",

    initialization: {
      globalCSS: `
/* ============================================ */
/* HOTELHUB GLOBAL CSS - Enhanced Dark Mode */
/* ============================================ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ============================================ */
/* BASE STYLES - Light Mode (Default) */
/* ============================================ */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  background: #f8fafc !important;
  color: #1e293b !important;
  min-height: 100vh;
  transition: background 0.4s ease, color 0.4s ease;
}

h1 { font-size: 2.2rem; font-weight: 800; line-height: 1.2; }
h2 { font-size: 1.8rem; font-weight: 700; line-height: 1.3; }
h3 { font-size: 1.4rem; font-weight: 600; line-height: 1.4; }
h4 { font-size: 1.2rem; font-weight: 600; line-height: 1.4; }
p { font-size: 1rem; color: #64748b; }

/* ============================================ */
/* DARK MODE - Full Implementation */
/* ============================================ */
body.dark-mode {
  background: #0f172a !important;
  color: #f1f5f9 !important;
}

/* Force all major containers to transparent in dark mode */
body.dark-mode > div,
body.dark-mode section,
body.dark-mode main,
body.dark-mode aside {
  background: transparent !important;
}

/* ============================================ */
/* NAVBAR - Dark Mode */
/* ============================================ */
body.dark-mode nav,
body.dark-mode header,
body.dark-mode nav > div,
body.dark-mode header > div {
  background: rgba(17, 24, 39, 0.98) !important;
  border-bottom: 1px solid #374151 !important;
  backdrop-filter: blur(10px) !important;
}

body.dark-mode nav *,
body.dark-mode header * {
  color: #e5e7eb !important;
}

body.dark-mode nav a,
body.dark-mode header a {
  color: #e5e7eb !important;
  font-weight: 500 !important;
}

body.dark-mode nav a:hover,
body.dark-mode header a:hover {
  color: #60a5fa !important;
}

/* Light mode nav */
body:not(.dark-mode) nav,
body:not(.dark-mode) header {
  background: rgba(255, 255, 255, 0.98) !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

body:not(.dark-mode) nav a,
body:not(.dark-mode) header a {
  color: #4b5563 !important;
}

/* ============================================ */
/* SIDEBAR - Dark Mode FIX */
/* ============================================ */
body.dark-mode aside,
body.dark-mode aside > div,
body.dark-mode .sidebar-fixed {
  background: rgba(17, 24, 39, 0.95) !important;
  border-right: 1px solid #374151 !important;
}

body.dark-mode aside *,
body.dark-mode .sidebar-fixed * {
  color: #e5e7eb !important;
}

body.dark-mode aside button,
body.dark-mode .sidebar-fixed button {
  color: #e5e7eb !important;
  background: transparent !important;
}

body.dark-mode aside button:hover,
body.dark-mode .sidebar-fixed button:hover {
  background: rgba(59, 130, 246, 0.2) !important;
}

/* Active sidebar button */
body.dark-mode aside button[style*="background: #e0f2fe"],
body.dark-mode aside button[style*="background:#e0f2fe"] {
  background: rgba(59, 130, 246, 0.3) !important;
  color: #60a5fa !important;
}

/* Light mode sidebar */
body:not(.dark-mode) aside,
body:not(.dark-mode) .sidebar-fixed {
  background: #f8fafc !important;
  border-right: 1px solid #e2e8f0 !important;
}

.sidebar-fixed {
  position: fixed !important;
  left: 0 !important;
  top: 70px !important;
  height: calc(100vh - 70px) !important;
  width: 260px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  z-index: 50 !important;
  transition: all 0.3s ease !important;
}

.sidebar-fixed::-webkit-scrollbar {
  width: 4px;
}
.sidebar-fixed::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 2px;
}
.sidebar-fixed:hover::-webkit-scrollbar-thumb {
  background: #94a3b8;
}

/* ============================================ */
/* MAIN CONTENT - Dark Mode FIX */
/* ============================================ */
body.dark-mode main,
body.dark-mode main > div,
body.dark-mode [style*="marginLeft"] {
  background: transparent !important;
}

/* ============================================ */
/* CARDS & CONTAINERS - Dark Mode FIX */
/* ============================================ */
body.dark-mode article,
body.dark-mode [class*="card"],
body.dark-mode div[style*="background: white"],
body.dark-mode div[style*="background:white"],
body.dark-mode div[style*="background: #fff"],
body.dark-mode div[style*="background:#fff"],
body.dark-mode div[style*="background: rgba(255"],
body.dark-mode div[style*="background:rgba(255"] {
  background: rgba(30, 41, 59, 0.9) !important;
  border-color: #475569 !important;
  color: #f1f5f9 !important;
  backdrop-filter: blur(10px);
}

/* Force white backgrounds in dark mode to dark */
body.dark-mode [style*="background-color: white"],
body.dark-mode [style*="background-color:white"],
body.dark-mode [style*="backgroundColor: white"],
body.dark-mode [style*="backgroundColor:white"] {
  background: rgba(30, 41, 59, 0.9) !important;
  background-color: rgba(30, 41, 59, 0.9) !important;
}

/* ============================================ */
/* TEXT - Dark Mode */
/* ============================================ */
body.dark-mode p,
body.dark-mode span:not([class*="gradient"]),
body.dark-mode div,
body.dark-mode li,
body.dark-mode td {
  color: #cbd5e1 !important;
}

body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3,
body.dark-mode h4,
body.dark-mode h5,
body.dark-mode h6 {
  color: #ffffff !important;
}

/* ============================================ */
/* FORMS - Dark Mode */
/* ============================================ */
body.dark-mode input,
body.dark-mode textarea,
body.dark-mode select {
  background: rgba(30, 41, 59, 0.8) !important;
  border-color: #475569 !important;
  color: #f1f5f9 !important;
}

body.dark-mode input::placeholder,
body.dark-mode textarea::placeholder {
  color: #94a3b8 !important;
}

/* ============================================ */
/* BUTTONS - Dark Mode */
/* ============================================ */
body.dark-mode button {
  color: #f1f5f9 !important;
}

/* Primary buttons keep their gradient */
body.dark-mode button[style*="gradient"] {
  /* Keep gradient as is */
}

/* ============================================ */
/* TABLES - Dark Mode */
/* ============================================ */
body.dark-mode table {
  color: #f1f5f9 !important;
  background: rgba(30, 41, 59, 0.9) !important;
}

body.dark-mode th {
  background: rgba(51, 65, 85, 0.9) !important;
  color: #f1f5f9 !important;
}

body.dark-mode td {
  border-color: #475569 !important;
  color: #cbd5e1 !important;
}

body.dark-mode tr:hover {
  background: rgba(51, 65, 85, 0.5) !important;
}

/* ============================================ */
/* MODALS - Dark Mode */
/* ============================================ */
body.dark-mode [style*="position: fixed"][style*="z-index"] {
  background: rgba(30, 41, 59, 0.95) !important;
}

/* Modal overlay */
body.dark-mode div[style*="rgba(0,0,0,0.6)"] {
  background: rgba(0, 0, 0, 0.8) !important;
}

/* ============================================ */
/* BACKGROUND EFFECTS */
/* ============================================ */
.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.stars::before,
.stars::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 90px 40px, #ddd, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: twinkle 8s ease-in-out infinite;
}

.stars::after {
  background-image: 
    radial-gradient(1px 1px at 50px 160px, #ccc, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 90px 40px, #ddd, rgba(0,0,0,0));
  animation: twinkle 12s ease-in-out infinite;
  animation-delay: 4s;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.shooting-stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.shooting-star {
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0));
  animation: shooting 3s linear infinite;
}

@keyframes shooting {
  0% {
    transform: translateX(-100px) translateY(0) rotate(45deg);
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

.snowfall {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

.snowflake {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: fall linear infinite;
}

@keyframes fall {
  to {
    transform: translateY(100vh);
  }
}

/* ============================================ */
/* Z-INDEX MANAGEMENT */
/* ============================================ */
body.dark-mode > *:not(.stars):not(.shooting-stars):not(.snowfall) {
  position: relative;
  z-index: 10 !important;
}

/* ============================================ */
/* SCROLLBAR */
/* ============================================ */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

body.dark-mode::-webkit-scrollbar-track {
  background: #1e293b;
}

body.dark-mode::-webkit-scrollbar-thumb {
  background: #475569;
}

body.dark-mode::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* ============================================ */
/* UTILITY CLASSES */
/* ============================================ */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-center { text-align: center; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-6 { margin-top: 1.5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }

/* ============================================ */
/* GRADIENTS - Keep in both modes */
/* ============================================ */
.gradient-text,
[style*="WebkitBackgroundClip: text"],
[style*="-webkit-background-clip: text"] {
  /* Gradients are preserved */
}
  `,

      resources: [
        "global.enduser.signup",
        "global.enduser.login",
        "global.enduser.logout",
        "global.enduser.forgotPassword",
        "global.enduser.resetPassword",
        "global.enduser.verifyEmail",

        "rooms.api",
        "rooms.list",
        "rooms.create",
        "rooms.update",
        "rooms.delete",
      ],

      actions: {
        // ✅ Add this to your initialization.actions in HotelHub template
// In demo.js - handleLogin action
handleLogin: `
console.log('🔐 End-user login action triggered');
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
  const response = await fetch('/api/enduser-auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ 
      email, 
      password,
      websiteSlug: 'hotelhub'
    })
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

  // ✅ Store user data
  context.handlers.setData('user', data.user);

  // ✅ Show notification
  context.handlers.showNotification({
    type: 'toast',
    message: \`Welcome back, \${data.user.firstName || 'Guest'}! 🎉\`,
    background: '#10b981'
  });

  // ✅ Redirect to DASHBOARD (protected page)
  setTimeout(() => {
    window.location.href = '/hotelhub/dashboard';
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
        logout: `
  console.log("🚪 Calling logout API...");
  
  try {
    // Use the API resource from your seed file
    await context.handlers.handleApiCall('global.enduser.logout', {});
    
    // The onSuccess in the API resource will handle clearAuth and reload
  } catch (error) {
    console.error('❌ Logout API failed:', error);
    
    // Fallback: clear auth data locally
    context.handlers.clearAuthData();
    localStorage.removeItem('hotelhub_user');
    localStorage.removeItem('hotelhub_logged_in');
    localStorage.removeItem('hotelhub_org_id');
    
    context.handlers.showNotification({
      type: "toast",
      message: "✅ Logged out (local session cleared)",
      background: "#10b981",
      duration: 2000,
    });
    
    setTimeout(() => {
      window.location.href = '/hotelhub';
    }, 500);
  }
`,

        //     console.log('🏨 Initializing HotelHub template');

        //     // Get organizationId from page config
        //     const orgId = context.config?.organizationId ||
        //                   '{{config.organizationId}}' ||
        //                   localStorage.getItem('hotelhub_org_id');

        //     if (orgId && orgId !== '{{config.organizationId}}') {
        //       localStorage.setItem('hotelhub_org_id', orgId);
        //       console.log('✅ Stored organizationId:', orgId);
        //     } else {
        //       console.warn('⚠️ No organizationId found in template config');
        //     }
        //   `,

        // ✅ UPDATE THIS - Include organizationId in signup
handleSignup: `
  console.log('📝 Handling signup');
  const { email, password, firstName, lastName, name } = context.formData || {};
  
  if (!email || !password) {
    context.handlers.showNotification({
      type: 'toast',
      message: '❌ Email and password are required',
      background: '#ef4444'
    });
    return;
  }
  
  // ✅ AUTO-DETECT websiteSlug from current URL
  const currentPath = window.location.pathname;
  const websiteSlug = currentPath.split('/').filter(Boolean)[0]; // "hotelhub"
  
  console.log('🌐 Detected website:', websiteSlug);
  
  // ✅ Get organizationId from localStorage or config
  const organizationId = localStorage.getItem('hotelhub_org_id') ||
                        context.config?.organizationId ||
                        '696fd6f8a216cc192d63b84a';
  
  console.log('📦 Signup payload:', { 
    email, 
    organizationId,
    websiteSlug, // ✅ ADDED
    firstName: firstName || name 
  });
  
  try {
  // ✅ Use END USER signup endpoint
  const response = await fetch('/api/enduser-auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
      name: \`\${firstName?.trim() || ''} \${lastName?.trim() || ''}\`.trim(),
      organizationId: '696fd6f8a216cc192d63b84a',  // ✅ Your org ID
      websiteSlug: 'hotelhub'  // ✅ Pass slug!
    })
  });
    
    const data = await response.json();
    
    if (!response.ok) {
      context.handlers.showNotification({
        type: 'toast',
        message: data.error || '❌ Signup failed',
        background: '#ef4444',
        duration: 4000
      });
      return;
    }
    
    console.log('✅ Signup successful:', data);
    
    context.handlers.showNotification({
      type: 'toast',
      message: '✅ Account created! Check your email to verify.',
      background: '#10b981',
      duration: 4000
    });
    
  setTimeout(() => {
      window.location.href = '/hotelhub/login';  // ✅ Fixed
    }, 2000);
    
  } catch (error) {
    console.error('❌ Signup error:', error);
    context.handlers.showNotification({
      type: 'toast',
      message: '❌ Network error. Please try again.',
      background: '#ef4444'
    });
  }
`,
        showSignupSuccess: `
  context.handlers.showNotification({
    type: 'toast',
    message: '✅ Account created! Check your email.',
    background: '#10b981',
    duration: 4000
  });
  
  setTimeout(() => {
    window.location.href = '/hotelhub/login';
  }, 2000);
`,
        toggleTheme: `
    console.log('🌓 Toggling theme');
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');

    // Create stars container if it doesn't exist
    let starsContainer = document.querySelector('.stars');
    if (!starsContainer) {
        starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        document.body.appendChild(starsContainer);
    }

    // Create shooting stars
    let shootingStars = document.querySelector('.shooting-stars');
    if (!shootingStars) {
        shootingStars = document.createElement('div');
        shootingStars.className = 'shooting-stars';
        document.body.appendChild(shootingStars);
        
        // Add some shooting stars
        for (let i = 0; i < 3; i++) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDelay = Math.random() * 3 + 's';
            shootingStars.appendChild(star);
        }
    }

    // Create snowfall
    let snowfall = document.querySelector('.snowfall');
    if (!snowfall) {
        snowfall = document.createElement('div');
        snowfall.className = 'snowfall';
        document.body.appendChild(snowfall);
        
        // Add snowflakes
        for (let i = 0; i < 50; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.style.width = Math.random() * 5 + 2 + 'px';
            flake.style.height = flake.style.width;
            flake.style.left = Math.random() * 100 + 'vw';
            flake.style.opacity = Math.random() * 0.5 + 0.3;
            flake.style.animationDuration = Math.random() * 3 + 5 + 's';
            flake.style.animationDelay = Math.random() * 5 + 's';
            snowfall.appendChild(flake);
        }
    }

    if (isDark) {
        body.classList.remove('dark-mode');
        localStorage.setItem('hotelhub-theme', 'light');
        console.log('☀️ Light mode activated');
        // Remove effects in light mode
        if (starsContainer) starsContainer.remove();
        if (shootingStars) shootingStars.remove();
        if (snowfall) snowfall.remove();
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('hotelhub-theme', 'dark');
        console.log('🌙 Dark mode with effects activated');
        // Ensure effects are in body
        if (!document.querySelector('.stars')) document.body.appendChild(starsContainer);
        if (!document.querySelector('.shooting-stars')) document.body.appendChild(shootingStars);
        if (!document.querySelector('.snowfall')) document.body.appendChild(snowfall);
    }
`,

        loadTheme: `
    console.log('🎨 Loading theme');
    const saved = localStorage.getItem('hotelhub-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.body.classList.add('dark-mode');
        console.log('🌙 Dark mode with effects loaded');
        
        // Create effects containers
        let starsContainer = document.querySelector('.stars');
        if (!starsContainer) {
            starsContainer = document.createElement('div');
            starsContainer.className = 'stars';
            document.body.appendChild(starsContainer);
        }
        
        // Shooting stars
        let shootingStars = document.querySelector('.shooting-stars');
        if (!shootingStars) {
            shootingStars = document.createElement('div');
            shootingStars.className = 'shooting-stars';
            document.body.appendChild(shootingStars);
        }
        
        // Snowfall
        let snowfall = document.querySelector('.snowfall');
        if (!snowfall) {
            snowfall = document.createElement('div');
            snowfall.className = 'snowfall';
            document.body.appendChild(snowfall);
        }
    }
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

        openEditModal: `
    console.log("📝 Opening edit modal");
    const roomData = context.actionConfig?.row || context.payload;
    
    if (!roomData || !roomData._id) {
        console.error("❌ No room data provided");
        return;
    }
    
    // Clear and prefill
    context.handlers.setModalFormData({});
    context.handlers.setFieldErrors({});
    
    context.handlers.setModalFormData({
        _id: roomData._id,
        roomNumber: roomData.roomNumber,
        roomType: roomData.roomType,
        price: roomData.price,
        status: roomData.status,
        capacity: roomData.capacity,
        floor: roomData.floor,
        description: roomData.description || '',
        amenities: roomData.amenities || []
    });
    
    context.handlers.setActiveModal('editRoom');
    console.log("✅ Edit modal opened");
`,

        updateRoom: `
    console.log("📝 Updating room");
    const formData = context.modalFormData || {};
    
    if (!formData._id) {
        context.handlers.showNotification({
            type: "toast",
            message: "❌ Room ID missing",
            background: "#ef4444"
        });
        return;
    }
    
    const payload = {
        _id: formData._id,
        roomNumber: formData.roomNumber,
        roomType: formData.roomType,
        price: parseFloat(formData.price),
        status: formData.status,
        capacity: parseInt(formData.capacity),
        floor: parseInt(formData.floor),
        description: formData.description || '',
        amenities: formData.amenities || []
    };
    
    console.log("🚀 Sending:", payload);
    await context.handlers.handleApiCall('rooms.update', payload);
    console.log("✅ Update completed");
`,

        deleteRoom: `
    const roomId = context.row?._id || context.payload?._id;
    
    if (!roomId) {
        context.handlers.showNotification({
            type: "toast",
            message: "❌ Room ID missing",
            background: "#ef4444"
        });
        return;
    }

    if (!confirm('Delete this room? This cannot be undone.')) {
        console.log("🚫 Delete cancelled");
        return;
    }

    console.log("🗑️ Deleting:", roomId);
    await context.handlers.handleApiCall('rooms.delete', { _id: roomId });
`,

        searchRooms: `
    console.log("🔍 Searching rooms");
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
    await context.handlers.handleApiCall('rooms.list', payload);
`,

        resetFilters: `
    console.log("🔄 Resetting filters");
    context.handlers.setFormData({});
    await context.handlers.handleApiCall('rooms.list', { page: 1, limit: 10 });
`,

        changePage: `
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
    await context.handlers.handleApiCall('rooms.list', payload);
`,

        navigateToPage: `
    const url = context.actionParams?.url;
    if (!url) {
        console.error("❌ No URL provided");
        return;
    }
    console.log("🧭 Navigating to:", url);
    window.location.href = url;
`,

        validateThenApi: `
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
    
    console.log("✅ Validation passed");
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
  console.log("🚪 End-user logging out from hotelhub...");
  
  try {
    // ✅ Call end-user logout API with websiteSlug
    const response = await fetch('/api/enduser-auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ websiteSlug: 'hotelhub' })  // ✅ Pass slug!
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Clear local auth state
      context.handlers.clearAuthData();
      
      context.handlers.showNotification({
        type: "toast",
        message: "✅ Logged out successfully",
        background: "#10b981",
        duration: 2000,
      });
      
      // ✅ Redirect to website home
      setTimeout(() => {
        window.location.href = data.redirectUrl || '/hotelhub';
      }, 1000);
    }
  } catch (error) {
    console.error('Logout error:', error);
    context.handlers.showNotification({
      type: "toast",
      message: "❌ Logout failed",
      background: "#ef4444"
    });
  }
`,
handleLoginSuccess: `
  // ✅ After end user logs in, redirect to dashboard
  const user = context.payload?.user;
  
  if (user) {
    context.handlers.showNotification({
      type: 'toast',
      message: \`Welcome back, \${user.firstName || 'Guest'}! 🎉\`,
      background: '#10b981'
    });
    
    // ✅ Redirect to dashboard (protected page)
    setTimeout(() => {
      window.location.href = '/hotelhub/dashboard';
    }, 1000);
  }
`,
        // Replace the existing clearAuth action with this
// In demo.js - clearAuth action

        api: `
    const apiKey = context.actionParams?.apiKey;
    const formDataToUse = context.payload
        || context.actionConfig?.row
        || context.modalFormData
        || context.formData
        || {};

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

    pages: {
      // ✅ FIXED Login Page for HotelHub (End User Auth)

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
                  fontSize: "26px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/hotelhub" },
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
              background: "rgba(255, 255, 255, 0.95)",
              borderBottom: "1px solid #e2e8f0",
              padding: "18px 40px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backdropFilter: "blur(8px)",
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
                "ui:title": "🏨 Welcome Back",
                "ui:description": "Sign in to manage your hotel",
                "ui:id": "loginForm",
                "ui:styles": {
                  maxWidth: "420px",
                  margin: "100px auto 0",
                  padding: "40px 36px",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                },
                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "manager@hotelhub.com",
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
                // ✅ FIXED: Removed validation fields and wrong apiKey
                "ui:actions": [
                  {
                    label: "Sign In",
                    action: "handleLogin", // ✅ CHANGED: Custom action instead of validateThenApi
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
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
                  maxWidth: "420px",
                  margin: "24px auto",
                  padding: "16px",
                  background: "rgba(248, 250, 252, 0.8)",
                  borderRadius: "12px",
                },
              },
            },
            styles: {
              padding: "100px 40px 60px",
              background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
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
                "ui:styles": {
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "14px",
                },
              },
            },
            styles: {
              background: "#1e293b",
              padding: "24px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

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
                  fontSize: "26px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/hotelhub" },
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
              background: "rgba(255, 255, 255, 0.95)",
              borderBottom: "1px solid #e2e8f0",
              padding: "18px 40px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backdropFilter: "blur(8px)",
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
                "ui:title": "✨ Create Account",
                "ui:description": "Join HotelHub and start managing",
                "ui:id": "signupForm",
                "ui:styles": {
                  maxWidth: "420px",
                  margin: "100px auto 0",
                  padding: "40px 36px",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
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
                    actionParams: {
                      apiKey: "global.enduser.signup",
                    },
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 0",
                      background:
                        "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                      color: "white",
                      fontSize: "15px",
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
                  maxWidth: "420px",
                  margin: "24px auto",
                  padding: "16px",
                  background: "rgba(248, 250, 252, 0.8)",
                  borderRadius: "12px",
                },
              },
            },
            styles: {
              padding: "100px 40px 60px",
              background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
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
                "ui:styles": {
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "14px",
                },
              },
            },
            styles: {
              background: "#1e293b",
              padding: "24px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

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
                  fontSize: "24px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/hotelhub/dashboard" },
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
      label: "{{auth.user?.email || 'User'}}",
      action: "",
      actionParams: {},
      styles: {
        fontWeight: "500",
        color: "inherit",
      },
    },
    {
      label: "Logout",
      action: "clearAuth",  // ✅ FIXED - removed +reload
      actionParams: {},
      styles: {
        color: "#ef4444",
        fontWeight: "500",
      },
    },
  ],
},
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              borderBottom: "1px solid #e2e8f0",
              padding: "16px 40px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backdropFilter: "blur(8px)",
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
                "ui:text": "📋 Menu",
                "ui:level": "h3",
                "ui:styles": {
                  marginBottom: "24px",
                  fontSize: "1.1rem",
                  color: "inherit",
                  padding: "0 12px",
                },
              },
              menuContainer: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "6px",
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
                      padding: "12px 16px",
                      background: "#e0f2fe",
                      color: "#0284c7",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.2s",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "🛏️ Rooms",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/rooms" },
                    "ui:styles": {
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      color: "inherit",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.2s",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "📅 Reservations",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/reservations" },
                    "ui:styles": {
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      color: "inherit",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.2s",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "👥 Guests",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/guests" },
                    "ui:styles": {
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      color: "inherit",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.2s",
                    },
                  },
                ],
              },
            },
            styles: {
              width: "260px",
              background: "#f8fafc",
              padding: "90px 16px 20px",
              minHeight: "calc(100vh - 70px)",
              borderRight: "1px solid #e2e8f0",
              position: "fixed",
              top: "70px",
              left: "0",
              className: "sidebar-fixed",
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
                  padding: "32px",
                  textAlign: "left",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  color: "white",
                  border: "none",
                  marginBottom: "24px",
                  borderRadius: "12px",
                },
              },
              statsGrid: {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "20px",
                "ui:styles": {
                  marginBottom: "32px",
                },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "🛏️ Total Rooms",
                    "ui:description": "15 Rooms",
                    "ui:styles": {
                      padding: "24px",
                      textAlign: "center",
                      background: "#e0f2fe",
                      border: "1px solid #0ea5e9",
                      borderRadius: "12px",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "✅ Available",
                    "ui:description": "10 Rooms",
                    "ui:styles": {
                      padding: "24px",
                      textAlign: "center",
                      background: "#d1fae5",
                      border: "1px solid #10b981",
                      borderRadius: "12px",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🔒 Occupied",
                    "ui:description": "5 Rooms",
                    "ui:styles": {
                      padding: "24px",
                      textAlign: "center",
                      background: "#fee2e2",
                      border: "1px solid #ef4444",
                      borderRadius: "12px",
                    },
                  },
                ],
              },
              recentActivity: {
                "ui:widget": "card",
                "ui:title": "📈 Recent Activity",
                "ui:description":
                  "• 5 new reservations today\\n• 2 rooms cleaned\\n• 1 maintenance request\\n• Revenue: $2,450",
                "ui:styles": {
                  padding: "24px",
                  background: "inherit",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                },
              },
            },
            styles: {
              marginLeft: "260px",
              padding: "90px 32px 40px",
              background: "inherit",
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
                "ui:content": "© 2024 HotelHub. All rights reserved.",
                "ui:styles": {
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "14px",
                },
              },
            },
            styles: {
              marginLeft: "260px",
              background: "#1e293b",
              padding: "24px",
              textAlign: "center",
            },
            triggers: [],
          },
        },
      },

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
                  fontSize: "24px",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                },
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/hotelhub/dashboard" },
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
                    label: "{{auth.user?.email || 'User'}}",
                    action: "",
                    actionParams: {},
                    styles: {
                      fontWeight: "500",
                      color: "inherit",
                    },
                  },
                  {
                    label: "Logout",
                    action: "clearAuth+reload",
                    actionParams: {},
                    styles: {
                      color: "#ef4444",
                      fontWeight: "500",
                    },
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              borderBottom: "1px solid #e2e8f0",
              padding: "16px 40px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backdropFilter: "blur(8px)",
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
                "ui:text": "📋 Menu",
                "ui:level": "h3",
                "ui:styles": {
                  marginBottom: "24px",
                  fontSize: "1.1rem",
                  color: "inherit",
                  padding: "0 12px",
                },
              },
              menuContainer: {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "6px",
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
                      padding: "12px 16px",
                      background: "transparent",
                      color: "inherit",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.2s",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "🛏️ Rooms",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/rooms" },
                    "ui:styles": {
                      width: "100%",
                      padding: "12px 16px",
                      background: "#e0f2fe",
                      color: "#0284c7",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.2s",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "📅 Reservations",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/reservations" },
                    "ui:styles": {
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      color: "inherit",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.2s",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "👥 Guests",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/hotelhub/guests" },
                    "ui:styles": {
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      color: "inherit",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.2s",
                    },
                  },
                ],
              },
            },
            styles: {
              width: "260px",
              background: "#f8fafc",
              padding: "90px 16px 20px",
              minHeight: "calc(100vh - 70px)",
              borderRight: "1px solid #e2e8f0",
              position: "fixed",
              top: "70px",
              left: "0",
              className: "sidebar-fixed",
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {
              editRoom: {
                "ui:title": "Edit Room",
                "ui:theme": "light",
                "ui:entityName": "room",
                "ui:styles": {
                  maxWidth: "480px",
                  padding: "32px",
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
                    placeholder: "Select room type",
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
                    placeholder: "Select status",
                    required: true,
                  },
                  {
                    name: "capacity",
                    label: "Capacity",
                    type: "number",
                    placeholder: "2",
                    required: true,
                  },
                  {
                    name: "floor",
                    label: "Floor",
                    type: "number",
                    placeholder: "1",
                    required: true,
                  },
                  {
                    name: "description",
                    label: "Description",
                    type: "text",
                    placeholder: "Room description",
                    required: false,
                  },
                  {
                    name: "_id",
                    type: "hidden",
                  },
                ],
                "ui:actions": [
                  {
                    label: "Update Room",
                    action: "updateRoom",
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "14px 24px",
                      background: "#667eea",
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
                      color: "#64748b",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    },
                  },
                ],
              },
              addRoom: {
                "ui:title": "Add New Room",
                "ui:theme": "light",
                "ui:entityName": "room",
                "ui:styles": {
                  maxWidth: "480px",
                  padding: "32px",
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
                    placeholder: "Select room type",
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
                    placeholder: "Select status",
                    required: true,
                  },
                  {
                    name: "capacity",
                    label: "Capacity",
                    type: "number",
                    placeholder: "2",
                    required: true,
                  },
                  {
                    name: "floor",
                    label: "Floor",
                    type: "number",
                    placeholder: "1",
                    required: true,
                  },
                  {
                    name: "description",
                    label: "Description",
                    type: "text",
                    placeholder: "Room description",
                    required: false,
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
                      border: "1px solid #e2e8f0",
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
                    "ui:text": "🛏️ Rooms Management",
                    "ui:level": "h1",
                    "ui:styles": {
                      margin: "0",
                      fontSize: "1.8rem",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "➕ Add Room",
                    "ui:action": "openModal",
                    "ui:actionParams": { modal: "addRoom" },
                    "ui:variant": "primary",
                    "ui:styles": {
                      padding: "10px 20px",
                      background: "#0ea5e9",
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
                "ui:title": "🔍 Search & Filter Rooms",
                "ui:styles": {
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  marginBottom: "24px",
                  border: "1px solid #e2e8f0",
                },
                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Search",
                    "ui:placeholder":
                      "Search by room number, type, or description...",
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
                    "ui:label": "Room Type",
                    "ui:name": "roomType",
                    "ui:placeholder": "All Types",
                    "ui:flex": "1",
                    "ui:minWidth": "140px",
                    "ui:options": [
                      { value: "", label: "All Types" },
                      { value: "Standard", label: "Standard" },
                      { value: "Deluxe", label: "Deluxe" },
                      { value: "Suite", label: "Suite" },
                      { value: "Presidential", label: "Presidential" },
                    ],
                    "ui:styles": {
                      marginBottom: "0",
                    },
                  },
                  {
                    "ui:widget": "selectField",
                    "ui:label": "Status",
                    "ui:name": "status",
                    "ui:placeholder": "All Statuses",
                    "ui:flex": "1",
                    "ui:minWidth": "140px",
                    "ui:options": [
                      { value: "", label: "All Statuses" },
                      { value: "Available", label: "Available" },
                      { value: "Occupied", label: "Occupied" },
                      { value: "Maintenance", label: "Maintenance" },
                      { value: "Reserved", label: "Reserved" },
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
                      apiKey: "rooms.list",
                    },
                    styles: {
                      padding: "10px 20px",
                      background: "#0ea5e9",
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
                      apiKey: "rooms.list",
                      payload: { page: 1, limit: 10 },
                    },
                    styles: {
                      padding: "10px 20px",
                      background: "transparent",
                      color: "#64748b",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "14px",
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
                "ui:emptyText":
                  "No rooms found. Try adjusting your filters or click 'Add Room' to create one.",
                "ui:dataSource": "rooms.api",
                "ui:apiKey": "rooms.list",
                "ui:searchEnabled": false,
                "ui:pagination": {
                  enabled: true,
                  pageSize: 10,
                  serverSide: true,
                },
                "ui:columns": [
                  {
                    key: "roomNumber",
                    title: "Room #",
                    dataIndex: "roomNumber",
                    width: "100px",
                  },
                  {
                    key: "roomType",
                    title: "Type",
                    dataIndex: "roomType",
                    width: "120px",
                  },
                  {
                    key: "price",
                    title: "Price/Night",
                    dataIndex: "price",
                    width: "120px",
                  },
                  {
                    key: "status",
                    title: "Status",
                    dataIndex: "status",
                    width: "120px",
                  },
                  {
                    key: "capacity",
                    title: "Capacity",
                    dataIndex: "capacity",
                    width: "100px",
                  },
                  {
                    key: "floor",
                    title: "Floor",
                    dataIndex: "floor",
                    width: "80px",
                  },
                  {
                    key: "description",
                    title: "Description",
                    dataIndex: "description",
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
                        action: "openEditModal",
                        variant: "primary",
                      },
                      {
                        label: "Delete",
                        action: "deleteRoom",
                        variant: "danger",
                        confirm: true,
                      },
                    ],
                  },
                ],
              },
            },
            styles: {
              marginLeft: "260px",
              padding: "90px 32px 40px",
              background: "inherit",
              minHeight: "calc(100vh - 70px)",
            },
            triggers: [
              {
                event: "load",
                action: "api",
                source: "rooms.api",
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
                "ui:content": "© 2024 HotelHub. All rights reserved.",
                "ui:styles": {
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "14px",
                },
              },
            },
            styles: {
              marginLeft: "260px",
              background: "#1e293b",
              padding: "24px",
              textAlign: "center",
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
            "ui:content": "🏨 HotelHub",
            "ui:styles": {
              fontSize: "26px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            },
            "ui:action": "navigateToPage",
            "ui:actionParams": { url: "/hotelhub" },
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
      actionParams: { url: "/hotelhub/login" },
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
          background: "rgba(255, 255, 255, 0.95)",
          borderBottom: "1px solid #e2e8f0",
          padding: "18px 40px",
          position: "fixed",
          width: "100%",
          zIndex: "1000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(8px)",
          height: "70px",
        },
        triggers: [
          {
            event: "load",
            action: "loadTheme",
          },
          {
            event: "load",
            action: "initializeTemplate", // ✅ ADD THIS
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
          hero: {
            backgroundEffect: {
              "ui:widget": "backgroundEffect",
              "ui:effect": "bubbles",
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
              "ui:animationMode": "both",
            },
            "ui:widget": "hero",
            "ui:title": "Welcome to HotelHub",
            "ui:subtitle":
              "Modern hotel management made simple. Manage rooms, reservations, and guests all in one place.",
            "ui:cta": {
              label: "Get Started",
              action: "navigateToPage",
              actionParams: { url: "/hotelhub/login" },
            },
            "ui:styles": {
              textAlign: "center",
              padding: "150px 40px 100px",
              background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
              color: "white",
              minHeight: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          featuresSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "40px",
            "ui:styles": {
              padding: "80px 40px",
              background: "#f8fafc",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "✨ Features",
                "ui:level": "h2",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "40px",
                },
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "30px",
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "🛏️ Room Management",
                    "ui:description":
                      "Easily manage all your hotel rooms with our intuitive interface",
                    "ui:styles": {
                      padding: "32px",
                      textAlign: "center",
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "📅 Reservations",
                    "ui:description":
                      "Track and manage reservations with real-time availability",
                    "ui:styles": {
                      padding: "32px",
                      textAlign: "center",
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "👥 Guest Management",
                    "ui:description":
                      "Keep track of all your guests and their preferences",
                    "ui:styles": {
                      padding: "32px",
                      textAlign: "center",
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    },
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
            "ui:content": "© 2024 HotelHub. All rights reserved.",
            "ui:styles": {
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "14px",
            },
          },
        },
        styles: {
          background: "#1e293b",
          padding: "32px",
          textAlign: "center",
        },
        triggers: [],
      },
    },

    resolvedAPIs: {},
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
        // ✅ ADD: handleSignup
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

  // Redirect to check-email page with email parameter
  setTimeout(() => {
    window.location.href = '/check-email?email=' + encodeURIComponent(email.trim().toLowerCase());
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
                "ui:condition":
                  "{{data.authMode === 'login' || !data.authMode}}",
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
                "ui:condition": "{{data.authMode === 'signup'}}",
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
                "ui:condition": "{{data.authMode === 'forgot'}}",
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
