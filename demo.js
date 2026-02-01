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
/* ENHANCED HOTELHUB CSS - COMPLETE DARK MODE FIX */
/* ============================================ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ============================================ */
/* BASE STYLES - Fixed */
/* ============================================ */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  background-attachment: fixed !important;
  color: #1e293b !important;
  min-height: 100vh;
  transition: background 0.6s ease, color 0.6s ease;
  overflow-x: hidden;
}

/* ============================================ */
/* DARK MODE - COMPLETE REDESIGN */
/* ============================================ */
body.dark-mode {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 70%, #0f172a 100%) !important;
  background-attachment: fixed !important;
  color: #f1f5f9 !important;
}

/* Force ALL backgrounds to dark in dark mode */
body.dark-mode main,
body.dark-mode section,
body.dark-mode div:not(.glass):not(.card):not([class*="modal"]),
body.dark-mode [style*="background"]:not([style*="background: linear-gradient"]):not([style*="background: url"]),
body.dark-mode [style*="background:"]:not([style*="background: linear-gradient"]):not([style*="background: url"]) {
  background: transparent !important;
}

/* Fix hero background in dark mode */
body.dark-mode #hero-background {
  background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop') !important;
}

body.dark-mode #hero-background > div:first-child {
  background: rgba(15, 23, 42, 0.85) !important;
  backdrop-filter: blur(5px) !important;
}

/* ============================================ */
/* FIX: STATS CARDS TO MATCH FEATURES CARD */
/* ============================================ */

/* Target the stats container specifically */
body #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] {
  background: rgba(255, 255, 255, 0.1) !important; /* Same as features card */
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;
  border-radius: 25px !important;
}

/* Fix text in stats cards for light mode */
body #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] h2,
body #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] p,
body #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] span,
body #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] div {
  color: #1e293b !important;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8) !important;
}

/* Fix for dark mode stats cards */
body.dark-mode #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] {
  background: rgba(15, 23, 42, 0.7) !important;
  backdrop-filter: blur(25px) saturate(200%) !important;
  -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) !important;
}

/* Fix text in dark mode stats cards */
body.dark-mode #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] h2,
body.dark-mode #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] p,
body.dark-mode #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] span,
body.dark-mode #hero-content [style*="background: rgba(255, 255, 255, 0.08)"] div {
  color: #f1f5f9 !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}

/* ============================================ */
/* COMPLETE CARD FIX FOR DARK MODE */
/* ============================================ */

/* Base glass effect for all cards */
[style*="background: rgba(255, 255, 255, 0.1)"],
[style*="background: rgba(255, 255, 255, 0.08)"],
[style*="background: rgba(255, 255, 255, 0.15)"],
[style*="background: rgba(255,255,255,0.1)"],
[style*="background: rgba(255,255,255,0.08)"],
[style*="background: rgba(255,255,255,0.15)"],
.glass-card,
.card {
  position: relative;
  z-index: 2;
}

/* LIGHT MODE: Semi-transparent white with dark text */
[style*="background: rgba(255, 255, 255, 0.1)"],
[style*="background: rgba(255, 255, 255, 0.08)"],
[style*="background: rgba(255, 255, 255, 0.15)"] {
  background: rgba(255, 255, 255, 0.25) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2) !important;
}

/* Force text visibility in light mode cards */
[style*="background: rgba(255, 255, 255, 0.1)"] h1,
[style*="background: rgba(255, 255, 255, 0.1)"] h2,
[style*="background: rgba(255, 255, 255, 0.1)"] h3,
[style*="background: rgba(255, 255, 255, 0.1)"] h4,
[style*="background: rgba(255, 255, 255, 0.1)"] p,
[style*="background: rgba(255, 255, 255, 0.1)"] span,
[style*="background: rgba(255, 255, 255, 0.1)"] div:not([class]),
[style*="background: rgba(255, 255, 255, 0.08)"] h1,
[style*="background: rgba(255, 255, 255, 0.08)"] h2,
[style*="background: rgba(255, 255, 255, 0.08)"] h3,
[style*="background: rgba(255, 255, 255, 0.08)"] h4,
[style*="background: rgba(255, 255, 255, 0.08)"] p,
[style*="background: rgba(255, 255, 255, 0.08)"] span,
[style*="background: rgba(255, 255, 255, 0.08)"] div:not([class]),
[style*="background: rgba(255, 255, 255, 0.15)"] h1,
[style*="background: rgba(255, 255, 255, 0.15)"] h2,
[style*="background: rgba(255, 255, 255, 0.15)"] h3,
[style*="background: rgba(255, 255, 255, 0.15)"] h4,
[style*="background: rgba(255, 255, 255, 0.15)"] p,
[style*="background: rgba(255, 255, 255, 0.15)"] span,
[style*="background: rgba(255, 255, 255, 0.15)"] div:not([class]) {
  color: #1e293b !important;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8) !important;
}

/* DARK MODE: Complete card overhaul */
body.dark-mode [style*="background: rgba(255, 255, 255, 0.1)"],
body.dark-mode [style*="background: rgba(255, 255, 255, 0.08)"],
body.dark-mode [style*="background: rgba(255, 255, 255, 0.15)"],
body.dark-mode [style*="background: rgba(255,255,255,0.1)"],
body.dark-mode [style*="background: rgba(255,255,255,0.08)"],
body.dark-mode [style*="background: rgba(255,255,255,0.15)"] {
  background: rgba(15, 23, 42, 0.7) !important;
  backdrop-filter: blur(25px) saturate(200%) !important;
  -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) !important;
}

/* Force ALL text in dark mode cards to be visible */
body.dark-mode [style*="background: rgba(255, 255, 255, 0.1)"] *,
body.dark-mode [style*="background: rgba(255, 255, 255, 0.08)"] *,
body.dark-mode [style*="background: rgba(255, 255, 255, 0.15)"] *,
body.dark-mode [style*="background: rgba(255,255,255,0.1)"] *,
body.dark-mode [style*="background: rgba(255,255,255,0.08)"] *,
body.dark-mode [style*="background: rgba(255,255,255,0.15)"] * {
  color: #f1f5f9 !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
}

/* Special handling for specific card content */
body.dark-mode [style*="background: rgba(255, 255, 255, 0.1)"] h2,
body.dark-mode [style*="background: rgba(255, 255, 255, 0.1)"] h3,
body.dark-mode [style*="background: rgba(255, 255, 255, 0.1)"] p {
  color: #ffffff !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7) !important;
}

/* Features section specific fix */
body.dark-mode #featuresSection [style*="background: rgba(255, 255, 255, 0.1)"] {
  background: rgba(15, 23, 42, 0.75) !important;
  border: 1px solid rgba(148, 163, 184, 0.25) !important;
}

body.dark-mode #featuresSection [style*="background: rgba(255, 255, 255, 0.1)"] h2,
body.dark-mode #featuresSection [style*="background: rgba(255, 255, 255, 0.1)"] p {
  color: #e2e8f0 !important;
}

/* CTA section special styling */
body.dark-mode [style*="background: rgba(14, 165, 233, 0.2)"] {
  background: rgba(14, 165, 233, 0.15) !important;
  border: 1px solid rgba(14, 165, 233, 0.3) !important;
}

body.dark-mode [style*="background: rgba(14, 165, 233, 0.2)"] h2,
body.dark-mode [style*="background: rgba(14, 165, 233, 0.2)"] p {
  color: #ffffff !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5) !important;
}

/* ============================================ */
/* FIX: TABLE AND FILTER WIDGET IN DARK MODE */
/* ============================================ */

/* Filter widget in rooms page */
body.dark-mode [style*="background: white"] {
  background: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) !important;
}

/* Fix filter widget text in dark mode */
body.dark-mode [style*="background: white"] h1,
body.dark-mode [style*="background: white"] h2,
body.dark-mode [style*="background: white"] h3,
body.dark-mode [style*="background: white"] h4,
body.dark-mode [style*="background: white"] p,
body.dark-mode [style*="background: white"] span,
body.dark-mode [style*="background: white"] label,
body.dark-mode [style*="background: white"] div {
  color: #f1f5f9 !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5) !important;
}

/* Fix input fields in filter widget */
body.dark-mode [style*="background: white"] input,
body.dark-mode [style*="background: white"] select,
body.dark-mode [style*="background: white"] textarea {
  background: rgba(30, 41, 59, 0.8) !important;
  border: 1px solid rgba(148, 163, 184, 0.4) !important;
  color: #f1f5f9 !important;
}

body.dark-mode [style*="background: white"] input::placeholder,
body.dark-mode [style*="background: white"] select::placeholder,
body.dark-mode [style*="background: white"] textarea::placeholder {
  color: rgba(148, 163, 184, 0.7) !important;
}

/* Table styling for dark mode */
body.dark-mode table,
body.dark-mode .dataTable,
body.dark-mode [style*="border-collapse: collapse"],
body.dark-mode [role="table"] {
  background: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(10px) !important;
  color: #f1f5f9 !important;
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
}

/* Table header styling */
body.dark-mode table th,
body.dark-mode .dataTable th,
body.dark-mode [role="columnheader"] {
  background: rgba(30, 41, 59, 0.9) !important;
  color: #e2e8f0 !important;
  border-bottom: 2px solid rgba(148, 163, 184, 0.4) !important;
}

/* Table cell styling */
body.dark-mode table td,
body.dark-mode .dataTable td,
body.dark-mode [role="cell"] {
  background: rgba(15, 23, 42, 0.7) !important;
  color: #f1f5f9 !important;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2) !important;
}

/* Table row hover effect */
body.dark-mode table tr:hover,
body.dark-mode .dataTable tr:hover {
  background: rgba(148, 163, 184, 0.1) !important;
}

/* Table pagination and controls */
body.dark-mode .pagination,
body.dark-mode [class*="pagination"],
body.dark-mode [role="navigation"] {
  background: rgba(15, 23, 42, 0.8) !important;
  color: #f1f5f9 !important;
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
}

body.dark-mode .pagination button,
body.dark-mode [class*="pagination"] button {
  background: rgba(30, 41, 59, 0.9) !important;
  color: #f1f5f9 !important;
  border: 1px solid rgba(148, 163, 184, 0.4) !important;
}

body.dark-mode .pagination button:hover,
body.dark-mode [class*="pagination"] button:hover {
  background: rgba(14, 165, 233, 0.3) !important;
}

/* ============================================ */
/* COLORFUL SNOWFALL EFFECTS - DARK MODE ONLY */
/* ============================================ */
.stars,
.snowfall,
.shooting-stars {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

body.dark-mode .stars,
body.dark-mode .snowfall,
body.dark-mode .shooting-stars {
  display: block;
}

/* Colorful snowflake animations */
@keyframes colorfulFall {
  0% {
    transform: translateY(-100px) translateX(0) rotate(0deg);
    opacity: 0.8;
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(180deg);
  }
  100% {
    transform: translateY(100vh) translateX(100px) rotate(360deg);
    opacity: 0;
    filter: hue-rotate(360deg);
  }
}

.snowflake {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: colorfulFall linear infinite;
  background: radial-gradient(circle at 30% 30%, 
    var(--snow-color, #ff0080), 
    transparent 70%);
}

/* Create colorful snowflakes */
body.dark-mode .snowflake:nth-child(3n) {
  --snow-color: #ff0080; /* Pink */
}
body.dark-mode .snowflake:nth-child(3n+1) {
  --snow-color: #00ffff; /* Cyan */
}
body.dark-mode .snowflake:nth-child(3n+2) {
  --snow-color: #ffff00; /* Yellow */
}
body.dark-mode .snowflake:nth-child(5n) {
  --snow-color: #ff00ff; /* Magenta */
}
body.dark-mode .snowflake:nth-child(5n+1) {
  --snow-color: #00ff00; /* Green */
}
body.dark-mode .snowflake:nth-child(5n+2) {
  --snow-color: #ff6600; /* Orange */
}
body.dark-mode .snowflake:nth-child(5n+3) {
  --snow-color: #0080ff; /* Blue */
}
body.dark-mode .snowflake:nth-child(5n+4) {
  --snow-color: #ff0040; /* Red-Pink */
}

/* Shooting stars with rainbow trail */
@keyframes colorfulShoot {
  0% {
    transform: translateX(-100px) translateY(-100px) scale(0);
    opacity: 0;
    filter: hue-rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(100vw) translateY(100vh) scale(1.5);
    opacity: 0;
    filter: hue-rotate(360deg);
  }
}

.shooting-star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: linear-gradient(45deg, 
    #ff0080, #00ffff, #ffff00, #ff00ff, #00ff00);
  border-radius: 50%;
  box-shadow: 
    0 0 20px 8px rgba(255, 0, 128, 0.7),
    0 0 30px 12px rgba(0, 255, 255, 0.5),
    0 0 40px 16px rgba(255, 255, 0, 0.3),
    0 0 50px 20px rgba(255, 0, 255, 0.2);
  animation: colorfulShoot 4s linear infinite;
  animation-delay: var(--delay, 0s);
}

/* ============================================ */
/* NAVBAR - Fixed for both modes */
/* ============================================ */
body nav,
body header {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15) !important;
}

body.dark-mode nav,
body.dark-mode header {
  background: rgba(15, 23, 42, 0.9) !important;
  border-bottom: 1px solid rgba(148, 163, 184, 0.3) !important;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
}

body nav a,
body header a,
body nav button,
body header button,
body nav span,
body header span {
  color: #1e293b !important;
  font-weight: 600 !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8) !important;
}

body.dark-mode nav a,
body.dark-mode header a,
body.dark-mode nav button,
body.dark-mode header button,
body.dark-mode nav span,
body.dark-mode header span {
  color: #f1f5f9 !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5) !important;
}

/* ============================================ */
/* ANIMATIONS */
/* ============================================ */
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

@keyframes glow {
  0%, 100% {
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
  }
  50% {
    box-shadow: 0 8px 40px 0 rgba(14, 165, 233, 0.6);
  }
}

/* Apply float animation to cards */
[style*="backdropFilter"][style*="blur"] {
  animation: float 6s ease-in-out infinite;
}

/* ============================================ */
/* SCROLLBAR - Enhanced */
/* ============================================ */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

body.dark-mode::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.4);
}

body.dark-mode::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff0080, #00ffff, #ffff00);
  border-radius: 10px;
}

body.dark-mode::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #ff40a0, #40ffff, #ffff40);
}

/* ============================================ */
/* RESPONSIVE DESIGN */
/* ============================================ */
@media (max-width: 1024px) {
  #hero-content h1 {
    font-size: 3.5rem !important;
  }
  
  #hero-content p {
    font-size: 1.3rem !important;
  }
}

@media (max-width: 768px) {
  #hero-content h1 {
    font-size: 2.5rem !important;
  }
  
  #hero-content p {
    font-size: 1.1rem !important;
  }
  
  #hero-content button {
    padding: 16px 35px !important;
    font-size: 1rem !important;
  }
  
  #hero-content > div:first-child {
    padding: 40px 30px !important;
  }
  
  [style*="gridTemplateColumns"] {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 480px) {
  #hero-content h1 {
    font-size: 2rem !important;
  }
  
  #hero-content {
    padding: 100px 20px 60px !important;
  }
  
  #hero-content > div:first-child {
    padding: 30px 20px !important;
  }
}

/* ============================================ */
/* TEXT ENHANCEMENTS */
/* ============================================ */
h1, h2, h3, h4, h5, h6 {
  font-weight: 900 !important;
  letter-spacing: -0.5px !important;
}

p {
  font-weight: 400 !important;
  line-height: 1.7 !important;
}

/* ============================================ */
/* BUTTON ENHANCEMENTS */
/* ============================================ */
button {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  font-family: 'Inter', sans-serif !important;
}

button:hover {
  filter: brightness(1.1) !important;
  transform: translateY(-2px) !important;
}

button:active {
  transform: scale(0.95) !important;
}

/* ============================================ */
/* UTILITY CLASSES */
/* ============================================ */
.blur-effect {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.text-glow {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
               0 0 40px rgba(255, 255, 255, 0.3);
}

.card-glow:hover {
  animation: glow 2s ease-in-out infinite;
}

/* ============================================ */
/* SELECTION STYLING */
/* ============================================ */
::selection {
  background: rgba(14, 165, 233, 0.5);
  color: white;
}

::-moz-selection {
  background: rgba(14, 165, 233, 0.5);
  color: white;
}

body.dark-mode ::selection {
  background: rgba(255, 0, 128, 0.5);
  color: white;
}

body.dark-mode ::-moz-selection {
  background: rgba(255, 0, 128, 0.5);
  color: white;
}

/* ============================================ */
/* FOCUS STATES */
/* ============================================ */
*:focus {
  outline: 2px solid rgba(14, 165, 233, 0.5);
  outline-offset: 2px;
}

button:focus,
a:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
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
                    action: "clearAuth", // ✅ FIXED - removed +reload
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
          backgroundEffect: {
            "ui:widget": "backgroundEffect",
            "ui:effect": "snowfall",
            "ui:intensity": "high",
            "ui:color": [
              "#ff0080",
              "#00ffff",
              "#ffff00",
              "#ff00ff",
              "#00ff00",
              "#ff6600",
              "#0080ff",
              "#ff0040",
              "#80ff00",
              "#ff0080",
            ],
            "ui:speed": "medium",
            "ui:animationMode": "both",
          },
          backgroundEffect1: {
            "ui:widget": "backgroundEffect",
            "ui:effect": "bubbles",
            "ui:intensity": "high",
            "ui:color": [
              "#ff0080",
              "#00ffff",
              "#ffff00",
              "#ff00ff",
              "#00ff00",
              "#ff6600",
              "#0080ff",
              "#ff0040",
              "#80ff00",
              "#ff0080",
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
                    "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')",
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
                      background: "rgba(14, 165, 233, 0.3)",
                      backdropFilter: "blur(2px)",
                      zIndex: "1",
                    },
                    "ui:children": [],
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
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "30px",
                      padding: "60px 50px",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      maxWidth: "900px",
                      animation: "fadeInUp 1s ease-out",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "heading",
                        "ui:text": "Welcome to HotelHub",
                        "ui:level": "h1",
                        "ui:styles": {
                          fontSize: "4.5rem",
                          fontWeight: "900",
                          color: "white",
                          textShadow:
                            "0 4px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.3)",
                          marginBottom: "0",
                          letterSpacing: "-2px",
                          lineHeight: "1.1",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text": "Modern hotel management made simple",
                        "ui:styles": {
                          fontSize: "1.8rem",
                          color: "rgba(255, 255, 255, 0.95)",
                          lineHeight: "1.5",
                          marginBottom: "10px",
                          textShadow: "0 2px 15px rgba(0,0,0,0.4)",
                          fontWeight: "500",
                        },
                      },
                      {
                        "ui:widget": "paragraph",
                        "ui:text":
                          "Manage rooms, reservations, and guests all in one place",
                        "ui:styles": {
                          fontSize: "1.3rem",
                          color: "rgba(255, 255, 255, 0.9)",
                          lineHeight: "1.6",
                          marginBottom: "20px",
                          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                          fontWeight: "400",
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
                        "ui:label": "🚀 Get Started",
                        "ui:action": "navigateToPage",
                        "ui:actionParams": {
                          url: "/hotelhub/signup",
                        },
                        "ui:styles": {
                          padding: "20px 45px",
                          fontSize: "1.2rem",
                          fontWeight: "700",
                          background: "rgba(255, 255, 255, 0.95)",
                          color: "#0284c7",
                          border: "2px solid rgba(255, 255, 255, 0.5)",
                          borderRadius: "50px",
                          cursor: "pointer",
                          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s ease",
                          transform: "translateY(0)",
                        },
                        "ui:hoverTransform": "translateY(-5px) scale(1.05)",
                        "ui:hoverShadow": "0 15px 40px rgba(255,255,255,0.4)",
                      },
                      {
                        "ui:widget": "button",
                        "ui:label": "📖 Learn More",
                        "ui:action": "navigateToPage",
                        "ui:actionParams": {
                          url: "/hotelhub/login",
                        },
                        "ui:styles": {
                          padding: "20px 45px",
                          fontSize: "1.2rem",
                          fontWeight: "700",
                          background: "rgba(255, 255, 255, 0.15)",
                          color: "white",
                          border: "2px solid rgba(255, 255, 255, 0.5)",
                          borderRadius: "50px",
                          cursor: "pointer",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s ease",
                          transform: "translateY(0)",
                        },
                        "ui:hoverTransform": "translateY(-5px) scale(1.05)",
                        "ui:hoverShadow": "0 15px 40px rgba(255,255,255,0.3)",
                      },
                    ],
                  },
                  {
                    "ui:widget": "container",
                    "ui:direction": "row",
                    "ui:gap": "50px",
                    "ui:styles": {
                      marginTop: "40px",
                      animation: "fadeInUp 1s ease-out 0.6s backwards",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      background: "rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(15px)",
                      borderRadius: "25px",
                      padding: "40px 50px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "container",
                        "ui:direction": "column",
                        "ui:gap": "10px",
                        "ui:styles": {
                          textAlign: "center",
                          minWidth: "150px",
                        },
                        "ui:children": [
                          {
                            "ui:widget": "heading",
                            "ui:text": "500+",
                            "ui:level": "h2",
                            "ui:styles": {
                              fontSize: "3.5rem",
                              fontWeight: "900",
                              color: "white",
                              margin: "0",
                              textShadow: "0 0 20px rgba(255,255,255,0.5)",
                            },
                          },
                          {
                            "ui:widget": "text",
                            "ui:content": "Hotels Using HotelHub",
                            "ui:styles": {
                              fontSize: "1.1rem",
                              color: "rgba(255,255,255,0.95)",
                              fontWeight: "500",
                              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
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
                          minWidth: "150px",
                        },
                        "ui:children": [
                          {
                            "ui:widget": "heading",
                            "ui:text": "50K+",
                            "ui:level": "h2",
                            "ui:styles": {
                              fontSize: "3.5rem",
                              fontWeight: "900",
                              color: "white",
                              margin: "0",
                              textShadow: "0 0 20px rgba(255,255,255,0.5)",
                            },
                          },
                          {
                            "ui:widget": "text",
                            "ui:content": "Rooms Managed",
                            "ui:styles": {
                              fontSize: "1.1rem",
                              color: "rgba(255,255,255,0.95)",
                              fontWeight: "500",
                              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
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
                          minWidth: "150px",
                        },
                        "ui:children": [
                          {
                            "ui:widget": "heading",
                            "ui:text": "99.9%",
                            "ui:level": "h2",
                            "ui:styles": {
                              fontSize: "3.5rem",
                              fontWeight: "900",
                              color: "white",
                              margin: "0",
                              textShadow: "0 0 20px rgba(255,255,255,0.5)",
                            },
                          },
                          {
                            "ui:widget": "text",
                            "ui:content": "Uptime Guarantee",
                            "ui:styles": {
                              fontSize: "1.1rem",
                              color: "rgba(255,255,255,0.95)",
                              fontWeight: "500",
                              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
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
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(15px)",
                  borderRadius: "25px",
                  padding: "50px 40px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "✨ Powerful Features",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "3.5rem",
                      fontWeight: "900",
                      color: "white",
                      textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      marginBottom: "10px",
                    },
                  },
                  {
                    "ui:widget": "paragraph",
                    "ui:text":
                      "Everything you need to manage your hotel efficiently and professionally",
                    "ui:styles": {
                      fontSize: "1.4rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      lineHeight: "1.6",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    },
                  },
                ],
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "30px",
                "ui:styles": {
                  maxWidth: "1400px",
                  margin: "0 auto",
                },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "🛏️ Room Management",
                    "ui:description":
                      "Easily manage all your hotel rooms with our intuitive interface. Track availability, pricing, and room details in real-time.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                    },
                    "ui:titleStyles": {
                      color: "white",
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                      marginBottom: "15px",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(255, 255, 255, 0.85)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                      textShadow: "0 1px 5px rgba(0,0,0,0.1)",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(14, 165, 233, 0.4)",
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "📅 Smart Reservations",
                    "ui:description":
                      "Track and manage reservations with real-time availability. Automated booking confirmations and calendar sync.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                    },
                    "ui:titleStyles": {
                      color: "white",
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                      marginBottom: "15px",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(255, 255, 255, 0.85)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                      textShadow: "0 1px 5px rgba(0,0,0,0.1)",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(14, 165, 233, 0.4)",
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "👥 Guest Management",
                    "ui:description":
                      "Keep track of all your guests and their preferences. Build lasting relationships with personalized service.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                    },
                    "ui:titleStyles": {
                      color: "white",
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                      marginBottom: "15px",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(255, 255, 255, 0.85)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                      textShadow: "0 1px 5px rgba(0,0,0,0.1)",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(14, 165, 233, 0.4)",
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "📊 Analytics Dashboard",
                    "ui:description":
                      "Get insights into your hotel performance with detailed reports and analytics. Make data-driven decisions.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                    },
                    "ui:titleStyles": {
                      color: "white",
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                      marginBottom: "15px",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(255, 255, 255, 0.85)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                      textShadow: "0 1px 5px rgba(0,0,0,0.1)",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(14, 165, 233, 0.4)",
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "💳 Payment Processing",
                    "ui:description":
                      "Secure payment processing with multiple payment methods. Automated invoicing and receipt generation.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                    },
                    "ui:titleStyles": {
                      color: "white",
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                      marginBottom: "15px",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(255, 255, 255, 0.85)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                      textShadow: "0 1px 5px rgba(0,0,0,0.1)",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(14, 165, 233, 0.4)",
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🔔 Smart Notifications",
                    "ui:description":
                      "Stay informed with real-time notifications for bookings, check-ins, and important updates across all channels.",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "25px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                    },
                    "ui:titleStyles": {
                      color: "white",
                      fontSize: "1.6rem",
                      fontWeight: "700",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                      marginBottom: "15px",
                    },
                    "ui:descriptionStyles": {
                      color: "rgba(255, 255, 255, 0.85)",
                      fontSize: "1.05rem",
                      lineHeight: "1.6",
                      textShadow: "0 1px 5px rgba(0,0,0,0.1)",
                    },
                    "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                    "ui:hoverShadow": "0 20px 60px 0 rgba(14, 165, 233, 0.4)",
                  },
                ],
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
                  background: "rgba(14, 165, 233, 0.2)",
                  backdropFilter: "blur(25px) saturate(180%)",
                  borderRadius: "30px",
                  padding: "60px 50px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "Ready to Transform Your Hotel Management?",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "3.2rem",
                      fontWeight: "900",
                      color: "white",
                      marginBottom: "15px",
                      textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      lineHeight: "1.2",
                    },
                  },
                  {
                    "ui:widget": "paragraph",
                    "ui:text":
                      "Join hundreds of hotels already using HotelHub to streamline their operations",
                    "ui:styles": {
                      fontSize: "1.4rem",
                      color: "rgba(255,255,255,0.95)",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "🌟 Start Free Trial",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": {
                      url: "/hotelhub/signup",
                    },
                    "ui:styles": {
                      padding: "20px 55px",
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "#0284c7",
                      border: "2px solid rgba(255, 255, 255, 0.5)",
                      borderRadius: "50px",
                      cursor: "pointer",
                      boxShadow: "0 10px 40px rgba(255,255,255,0.3)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.4s ease",
                      margin: "0 auto",
                    },
                    "ui:hoverTransform": "translateY(-5px) scale(1.08)",
                    "ui:hoverShadow": "0 20px 60px rgba(255,255,255,0.5)",
                  },
                ],
              },
            ],
          },
        },
        styles: {
          padding: "0",
          background: "transparent",
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
{
  "title": "Chiyaz - Premium Tea & Coffee",
  "slug": "chiyaz",
  "projectUUID": "chiyaz-tea-coffee",
  "taskUUID": "chiyaz001",
  "status": "Active",
  "isTemplate": true,
  "templateCategory": "E-commerce",
  "organizationId": "696fd6f8a216cc192d63b84a",
  "createdBy": "000000000000000000000000",
  "accountValidation": true,
  "otpValidation": false,
  "isAnonymous": false,
  "requireAuth": false,
  "redirectIfNotAuth": "/chiyaz/login",

  "initialization": {
    "globalCSS": `/* ============================================ */
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

    "resources": [
      "global.enduser.signup",
      "global.enduser.login",
      "global.enduser.logout",
      "global.enduser.forgotPassword",
      "global.enduser.resetPassword",
      "global.enduser.verifyEmail",
      "chiyaz.reviews.list",
      "chiyaz.tea.list",
      "chiyaz.coffee.list"
    ],

    "actions": {

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
      "handleLogin": `console.log('🔐 Chiyaz login action triggered');
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

      "handleSignup": `console.log('📝 Chiyaz signup handling');
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

      "toggleTheme": `const body = document.body;
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

      "loadTheme": `const saved = localStorage.getItem('chiyaz-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
if (saved === 'dark' || (!saved && prefersDark)) {
  document.body.classList.add('dark-mode');
  console.log('🌙 Dark mode loaded');
}`,

      "navigateToPage": `const url = context.actionParams?.url;
if (!url) {
  console.error("❌ No URL provided");
  return;
}
console.log("🧭 Navigating to:", url);
window.location.href = url;`,

      "clearAuth": `console.log("🚪 Chiyaz logout...");
  
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
}`
    }
  },

  "pages": {
    "login": {
      "title": "Login - Chiyaz",
      "components": {
        "navbar": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "logo": {
              "ui:widget": "text",
              "ui:content": "🍵 Chiyaz",
              "ui:styles": {
                "fontSize": "28px",
                "fontWeight": "800",
                "fontFamily": "'Playfair Display', serif",
                "background": "linear-gradient(135deg, #F5E9D9 0%, #D2691E 100%)",
                "WebkitBackgroundClip": "text",
                "WebkitTextFillColor": "transparent",
                "cursor": "pointer"
              },
              "ui:action": "navigateToPage",
              "ui:actionParams": { "url": "/chiyaz" }
            },
            "themeToggle": {
              "ui:widget": "toggle",
              "ui:label": "",
              "ui:size": "medium",
              "ui:onChange": "toggleTheme",
              "ui:styles": {
                "marginLeft": "auto",
                "marginRight": "20px"
              }
            },
            "links": {
              "ui:widget": "navLinks",
              "ui:theme": "light",
              "ui:links": [
                {
                  "label": "Home",
                  "action": "navigateToPage",
                  "actionParams": { "url": "/chiyaz" },
                  "styles": {
                    "color": "#F5E9D9",
                    "fontWeight": "600"
                  }
                },
                {
                  "label": "Sign Up",
                  "action": "navigateToPage",
                  "actionParams": { "url": "/chiyaz/signup" },
                  "styles": {
                    "color": "#F5E9D9",
                    "fontWeight": "600"
                  }
                }
              ]
            }
          },
          "styles": {
            "background": "rgba(44, 24, 16, 0.95)",
            "backdropFilter": "blur(20px) saturate(180%)",
            "borderBottom": "2px solid rgba(212, 185, 150, 0.3)",
            "padding": "18px 40px",
            "position": "fixed",
            "width": "100%",
            "zIndex": "1000",
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center",
            "height": "70px"
          },
          "triggers": [
            {
              "event": "load",
              "action": "loadTheme"
            }
          ]
        },
        "sidebar": {
          "table": {},
          "modal": {},
          "uiSchema": {},
          "styles": { "display": "none" },
          "triggers": []
        },
        "main": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "loginForm": {
              "ui:widget": "formContainer",
              "ui:title": "🍵 Welcome Back",
              "ui:description": "Sign in to your Chiyaz account",
              "ui:id": "loginForm",
              "ui:styles": {
                "maxWidth": "420px",
                "margin": "120px auto 0",
                "padding": "40px 36px",
                "background": "rgba(44, 24, 16, 0.95)",
                "backdropFilter": "blur(20px)",
                "borderRadius": "20px",
                "boxShadow": "0 15px 35px rgba(139, 69, 19, 0.4)",
                "border": "2px solid rgba(212, 185, 150, 0.3)",
                "color": "#F5E9D9"
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
                    "color": "#F5E9D9",
                    "fontWeight": "500"
                  }
                },
                {
                  "ui:widget": "inputField",
                  "ui:label": "Password",
                  "ui:placeholder": "Enter your password",
                  "ui:type": "password",
                  "ui:name": "password",
                  "ui:required": true,
                  "ui:labelStyles": {
                    "color": "#F5E9D9",
                    "fontWeight": "500"
                  }
                }
              ],
              "ui:actions": [
                {
                  "label": "Sign In",
                  "action": "handleLogin",
                  "variant": "primary",
                  "styles": {
                    "width": "100%",
                    "padding": "14px 0",
                    "background": "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                    "color": "#F5E9D9",
                    "fontSize": "15px",
                    "fontWeight": "600",
                    "borderRadius": "25px",
                    "border": "none",
                    "cursor": "pointer",
                    "transition": "all 0.3s ease"
                  },
                  "ui:hoverTransform": "translateY(-2px)",
                  "ui:hoverShadow": "0 10px 20px rgba(139, 69, 19, 0.5)"
                }
              ],
              "ui:titleStyles": {
                "color": "#F5E9D9",
                "fontFamily": "'Playfair Display', serif",
                "fontSize": "28px",
                "marginBottom": "10px"
              },
              "ui:descriptionStyles": {
                "color": "rgba(245, 233, 217, 0.9)",
                "fontSize": "16px",
                "marginBottom": "30px"
              }
            },
            "authLinks": {
              "ui:widget": "authLinks",
              "ui:alignment": "center",
              "ui:direction": "column",
              "ui:links": [
                {
                  "prefix": "Don't have an account?",
                  "label": "Sign Up",
                  "action": "navigateToPage",
                  "actionParams": { "url": "/chiyaz/signup" }
                }
              ],
              "ui:styles": {
                "maxWidth": "420px",
                "margin": "24px auto",
                "padding": "16px",
                "background": "rgba(139, 69, 19, 0.15)",
                "backdropFilter": "blur(10px)",
                "borderRadius": "12px",
                "color": "#F5E9D9",
                "border": "1px solid rgba(212, 185, 150, 0.2)"
              },
              "ui:linkStyles": {
                "color": "#D2691E",
                "fontWeight": "600"
              }
            }
          },
          "styles": {
            "padding": "100px 40px 60px",
            "backgroundImage": "linear-gradient(rgba(44, 24, 16, 0.9), rgba(44, 24, 16, 0.9)), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop')",
            "backgroundSize": "cover",
            "backgroundPosition": "center",
            "backgroundAttachment": "fixed",
            "minHeight": "100vh"
          },
          "triggers": []
        },
        "footer": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "footerText": {
              "ui:widget": "text",
              "ui:content": "© 2024 Chiyaz Tea & Coffee. All rights reserved.",
              "ui:styles": {
                "textAlign": "center",
                "color": "#F5E9D9",
                "fontSize": "14px"
              }
            }
          },
          "styles": {
            "background": "#2C1810",
            "padding": "24px",
            "textAlign": "center"
          },
          "triggers": []
        }
      }
    },

    "signup": {
      "title": "Sign Up - Chiyaz",
      "components": {
        "navbar": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "logo": {
              "ui:widget": "text",
              "ui:content": "🍵 Chiyaz",
              "ui:styles": {
                "fontSize": "28px",
                "fontWeight": "800",
                "fontFamily": "'Playfair Display', serif",
                "background": "linear-gradient(135deg, #F5E9D9 0%, #D2691E 100%)",
                "WebkitBackgroundClip": "text",
                "WebkitTextFillColor": "transparent",
                "cursor": "pointer"
              },
              "ui:action": "navigateToPage",
              "ui:actionParams": { "url": "/chiyaz" }
            },
            "themeToggle": {
              "ui:widget": "toggle",
              "ui:label": "",
              "ui:size": "medium",
              "ui:onChange": "toggleTheme",
              "ui:styles": {
                "marginLeft": "auto",
                "marginRight": "20px"
              }
            },
            "links": {
              "ui:widget": "navLinks",
              "ui:theme": "light",
              "ui:links": [
                {
                  "label": "Home",
                  "action": "navigateToPage",
                  "actionParams": { "url": "/chiyaz" },
                  "styles": {
                    "color": "#F5E9D9",
                    "fontWeight": "600"
                  }
                },
                {
                  "label": "Login",
                  "action": "navigateToPage",
                  "actionParams": { "url": "/chiyaz/login" },
                  "styles": {
                    "color": "#F5E9D9",
                    "fontWeight": "600"
                  }
                }
              ]
            }
          },
          "styles": {
            "background": "rgba(44, 24, 16, 0.95)",
            "backdropFilter": "blur(20px) saturate(180%)",
            "borderBottom": "2px solid rgba(212, 185, 150, 0.3)",
            "padding": "18px 40px",
            "position": "fixed",
            "width": "100%",
            "zIndex": "1000",
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center",
            "height": "70px"
          },
          "triggers": [
            {
              "event": "load",
              "action": "loadTheme"
            }
          ]
        },
        "sidebar": {
          "table": {},
          "modal": {},
          "uiSchema": {},
          "styles": { "display": "none" },
          "triggers": []
        },
        "main": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "signupForm": {
              "ui:widget": "formContainer",
              "ui:title": "✨ Join Chiyaz",
              "ui:description": "Create your account and discover premium tea & coffee",
              "ui:id": "signupForm",
              "ui:styles": {
                "maxWidth": "420px",
                "margin": "120px auto 0",
                "padding": "40px 36px",
                "background": "rgba(44, 24, 16, 0.95)",
                "backdropFilter": "blur(20px)",
                "borderRadius": "20px",
                "boxShadow": "0 15px 35px rgba(139, 69, 19, 0.4)",
                "border": "2px solid rgba(212, 185, 150, 0.3)",
                "color": "#F5E9D9"
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
                    "color": "#F5E9D9",
                    "fontWeight": "500"
                  }
                },
                {
                  "ui:widget": "inputField",
                  "ui:label": "Email Address",
                  "ui:placeholder": "you@example.com",
                  "ui:type": "email",
                  "ui:name": "email",
                  "ui:required": true,
                  "ui:labelStyles": {
                    "color": "#F5E9D9",
                    "fontWeight": "500"
                  }
                },
                {
                  "ui:widget": "inputField",
                  "ui:label": "Password",
                  "ui:placeholder": "Create a secure password",
                  "ui:type": "password",
                  "ui:name": "password",
                  "ui:required": true,
                  "ui:labelStyles": {
                    "color": "#F5E9D9",
                    "fontWeight": "500"
                  }
                }
              ],
              "ui:actions": [
                {
                  "label": "Create Account",
                  "action": "handleSignup",
                  "variant": "primary",
                  "styles": {
                    "width": "100%",
                    "padding": "14px 0",
                    "background": "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
                    "color": "#F5E9D9",
                    "fontSize": "15px",
                    "fontWeight": "600",
                    "borderRadius": "25px",
                    "border": "none",
                    "cursor": "pointer",
                    "transition": "all 0.3s ease"
                  },
                  "ui:hoverTransform": "translateY(-2px)",
                  "ui:hoverShadow": "0 10px 20px rgba(139, 69, 19, 0.5)"
                }
              ],
              "ui:titleStyles": {
                "color": "#F5E9D9",
                "fontFamily": "'Playfair Display', serif",
                "fontSize": "28px",
                "marginBottom": "10px"
              },
              "ui:descriptionStyles": {
                "color": "rgba(245, 233, 217, 0.9)",
                "fontSize": "16px",
                "marginBottom": "30px"
              }
            },
            "authLinks": {
              "ui:widget": "authLinks",
              "ui:alignment": "center",
              "ui:links": [
                {
                  "prefix": "Already have an account?",
                  "label": "Login",
                  "action": "navigateToPage",
                  "actionParams": { "url": "/chiyaz/login" }
                }
              ],
              "ui:styles": {
                "maxWidth": "420px",
                "margin": "24px auto",
                "padding": "16px",
                "background": "rgba(139, 69, 19, 0.15)",
                "backdropFilter": "blur(10px)",
                "borderRadius": "12px",
                "color": "#F5E9D9",
                "border": "1px solid rgba(212, 185, 150, 0.2)"
              },
              "ui:linkStyles": {
                "color": "#D2691E",
                "fontWeight": "600"
              }
            }
          },
          "styles": {
            "padding": "100px 40px 60px",
            "backgroundImage": "linear-gradient(rgba(44, 24, 16, 0.9), rgba(44, 24, 16, 0.9)), url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2067&auto=format&fit=crop')",
            "backgroundSize": "cover",
            "backgroundPosition": "center",
            "backgroundAttachment": "fixed",
            "minHeight": "100vh"
          },
          "triggers": []
        },
        "footer": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "footerText": {
              "ui:widget": "text",
              "ui:content": "© 2024 Chiyaz Tea & Coffee. All rights reserved.",
              "ui:styles": {
                "textAlign": "center",
                "color": "#F5E9D9",
                "fontSize": "14px"
              }
            }
          },
          "styles": {
            "background": "#2C1810",
            "padding": "24px",
            "textAlign": "center"
          },
          "triggers": []
        }
      }
    },

    "dashboard": {
      "title": "Dashboard - Chiyaz",
      "requireAuth": true,
      "redirectIfNotAuth": "/chiyaz/login",
      "components": {
        "navbar": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "logo": {
              "ui:widget": "text",
              "ui:content": "🍵 Chiyaz",
              "ui:styles": {
                "fontSize": "24px",
                "fontWeight": "800",
                "fontFamily": "'Playfair Display', serif",
                "background": "linear-gradient(135deg, #F5E9D9 0%, #D2691E 100%)",
                "WebkitBackgroundClip": "text",
                "WebkitTextFillColor": "transparent",
                "cursor": "pointer"
              },
              "ui:action": "navigateToPage",
              "ui:actionParams": { "url": "/chiyaz/dashboard" }
            },
            "themeToggle": {
              "ui:widget": "toggle",
              "ui:label": "",
              "ui:size": "medium",
              "ui:onChange": "toggleTheme",
              "ui:styles": {
                "marginLeft": "auto",
                "marginRight": "20px"
              }
            },
            "userInfo": {
              "ui:widget": "navLinks",
              "ui:theme": "light",
              "ui:links": [
                {
                  "label": "{{auth.user?.email || 'Tea Lover'}}",
                  "action": "",
                  "actionParams": {},
                  "styles": {
                    "fontWeight": "500",
                    "color": "#F5E9D9"
                  }
                },
                {
                  "label": "Logout",
                  "action": "clearAuth",
                  "actionParams": {},
                  "styles": {
                    "color": "#D2691E",
                    "fontWeight": "600"
                  }
                }
              ]
            }
          },
          "styles": {
            "background": "rgba(44, 24, 16, 0.95)",
            "backdropFilter": "blur(20px) saturate(180%)",
            "borderBottom": "2px solid rgba(212, 185, 150, 0.3)",
            "padding": "16px 40px",
            "position": "fixed",
            "width": "100%",
            "zIndex": "1000",
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center",
            "height": "70px"
          },
          "triggers": [
            {
              "event": "load",
              "action": "loadTheme"
            }
          ]
        },
        "sidebar": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "menuHeading": {
              "ui:widget": "heading",
              "ui:text": "🍵 Menu",
              "ui:level": "h3",
              "ui:styles": {
                "marginBottom": "24px",
                "fontSize": "1.2rem",
                "color": "#F5E9D9",
                "padding": "0 12px",
                "fontFamily": "'Playfair Display', serif"
              }
            },
            "menuContainer": {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:gap": "8px",
              "ui:styles": {
                "width": "100%"
              },
              "ui:children": [
                {
                  "ui:widget": "button",
                  "ui:label": "🏠 Dashboard",
                  "ui:action": "navigateToPage",
                  "ui:actionParams": { "url": "/chiyaz/dashboard" },
                  "ui:styles": {
                    "width": "100%",
                    "padding": "14px 20px",
                    "background": "rgba(139, 69, 19, 0.15)",
                    "color": "#F5E9D9",
                    "border": "1px solid rgba(212, 185, 150, 0.2)",
                    "borderRadius": "12px",
                    "fontSize": "14px",
                    "fontWeight": "500",
                    "textAlign": "left",
                    "display": "flex",
                    "alignItems": "center",
                    "gap": "12px",
                    "transition": "all 0.2s"
                  },
                  "ui:hoverTransform": "translateX(5px)"
                },
                {
                  "ui:widget": "button",
                  "ui:label": "🛒 My Orders",
                  "ui:action": "",
                  "ui:actionParams": {},
                  "ui:styles": {
                    "width": "100%",
                    "padding": "14px 20px",
                    "background": "transparent",
                    "color": "#F5E9D9",
                    "border": "1px solid rgba(212, 185, 150, 0.1)",
                    "borderRadius": "12px",
                    "fontSize": "14px",
                    "fontWeight": "500",
                    "textAlign": "left",
                    "display": "flex",
                    "alignItems": "center",
                    "gap": "12px",
                    "transition": "all 0.2s"
                  },
                  "ui:hoverTransform": "translateX(5px)"
                },
                {
                  "ui:widget": "button",
                  "ui:label": "❤️ Favorites",
                  "ui:action": "",
                  "ui:actionParams": {},
                  "ui:styles": {
                    "width": "100%",
                    "padding": "14px 20px",
                    "background": "transparent",
                    "color": "#F5E9D9",
                    "border": "1px solid rgba(212, 185, 150, 0.1)",
                    "borderRadius": "12px",
                    "fontSize": "14px",
                    "fontWeight": "500",
                    "textAlign": "left",
                    "display": "flex",
                    "alignItems": "center",
                    "gap": "12px",
                    "transition": "all 0.2s"
                  },
                  "ui:hoverTransform": "translateX(5px)"
                },
                {
                  "ui:widget": "button",
                  "ui:label": "⚙️ Settings",
                  "ui:action": "",
                  "ui:actionParams": {},
                  "ui:styles": {
                    "width": "100%",
                    "padding": "14px 20px",
                    "background": "transparent",
                    "color": "#F5E9D9",
                    "border": "1px solid rgba(212, 185, 150, 0.1)",
                    "borderRadius": "12px",
                    "fontSize": "14px",
                    "fontWeight": "500",
                    "textAlign": "left",
                    "display": "flex",
                    "alignItems": "center",
                    "gap": "12px",
                    "transition": "all 0.2s"
                  },
                  "ui:hoverTransform": "translateX(5px)"
                }
              ]
            }
          },
          "styles": {
            "width": "280px",
            "background": "rgba(44, 24, 16, 0.9)",
            "backdropFilter": "blur(20px) saturate(180%)",
            "padding": "90px 20px 30px",
            "minHeight": "calc(100vh - 70px)",
            "borderRight": "2px solid rgba(212, 185, 150, 0.2)",
            "position": "fixed",
            "top": "70px",
            "left": "0"
          },
          "triggers": []
        },
        "main": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "welcomeCard": {
              "ui:widget": "card",
              "ui:title": "🍵 Welcome to Chiyaz",
              "ui:description": "Hello {{auth.user?.name || auth.user?.email || 'Tea Lover'}}! Explore our premium tea & coffee collection.",
              "ui:styles": {
                "padding": "40px",
                "textAlign": "left",
                "background": "rgba(44, 24, 16, 0.85)",
                "color": "#F5E9D9",
                "border": "1px solid rgba(212, 185, 150, 0.3)",
                "marginBottom": "30px",
                "borderRadius": "20px",
                "boxShadow": "0 10px 30px rgba(139, 69, 19, 0.3)"
              },
              "ui:titleStyles": {
                "color": "#F5E9D9",
                "fontFamily": "'Playfair Display', serif"
              }
            },
            "statsGrid": {
              "ui:widget": "gridLayout",
              "ui:columns": 3,
              "ui:gap": "25px",
              "ui:styles": {
                "marginBottom": "40px"
              },
              "ui:children": [
                {
                  "ui:widget": "card",
                  "ui:title": "📦 Orders",
                  "ui:description": "5 Active",
                  "ui:styles": {
                    "padding": "30px",
                    "textAlign": "center",
                    "background": "rgba(44, 24, 16, 0.85)",
                    "border": "1px solid rgba(212, 185, 150, 0.2)",
                    "borderRadius": "16px",
                    "color": "#F5E9D9"
                  },
                  "ui:titleStyles": {
                    "color": "#F5E9D9"
                  }
                },
                {
                  "ui:widget": "card",
                  "ui:title": "❤️ Favorites",
                  "ui:description": "12 Items",
                  "ui:styles": {
                    "padding": "30px",
                    "textAlign": "center",
                    "background": "rgba(44, 24, 16, 0.85)",
                    "border": "1px solid rgba(210, 105, 30, 0.3)",
                    "borderRadius": "16px",
                    "color": "#F5E9D9"
                  },
                  "ui:titleStyles": {
                    "color": "#F5E9D9"
                  }
                },
                {
                  "ui:widget": "card",
                  "ui:title": "⭐ Rewards",
                  "ui:description": "350 Points",
                  "ui:styles": {
                    "padding": "30px",
                    "textAlign": "center",
                    "background": "rgba(44, 24, 16, 0.85)",
                    "border": "1px solid rgba(46, 125, 50, 0.3)",
                    "borderRadius": "16px",
                    "color": "#F5E9D9"
                  },
                  "ui:titleStyles": {
                    "color": "#F5E9D9"
                  }
                }
              ]
            },
            "recommendations": {
              "ui:widget": "card",
              "ui:title": "🔥 Recommended for You",
              "ui:description": "• Premium Darjeeling Tea\\n• Ethiopian Yirgacheffe Coffee\\n• Japanese Matcha Powder\\n• Colombian Supreme Beans",
              "ui:styles": {
                "padding": "30px",
                "background": "rgba(44, 24, 16, 0.85)",
                "border": "1px solid rgba(212, 185, 150, 0.2)",
                "borderRadius": "16px",
                "marginBottom": "30px",
                "color": "#F5E9D9"
              },
              "ui:titleStyles": {
                "color": "#F5E9D9",
                "fontFamily": "'Playfair Display', serif"
              }
            }
          },
          "styles": {
            "marginLeft": "280px",
            "padding": "90px 40px 50px",
            "background": "linear-gradient(135deg, rgba(44, 24, 16, 0.7) 0%, rgba(139, 69, 19, 0.7) 100%)",
            "backdropFilter": "blur(10px)",
            "minHeight": "calc(100vh - 70px)"
          },
          "triggers": [
            {
              "event": "load",
              "action": "loadTheme"
            }
          ]
        },
        "footer": {
          "table": {},
          "modal": {},
          "uiSchema": {
            "footerText": {
              "ui:widget": "text",
              "ui:content": "© 2024 Chiyaz Tea & Coffee. All rights reserved.",
              "ui:styles": {
                "textAlign": "center",
                "color": "#F5E9D9",
                "fontSize": "14px"
              }
            }
          },
          "styles": {
            "marginLeft": "280px",
            "background": "#2C1810",
            "padding": "30px",
            "textAlign": "center"
          },
          "triggers": []
        }
      }
    }
  },

  "components": {
    "navbar": {
      "uiSchema": {
        "logo": {
          "ui:widget": "text",
          "ui:content": "🍵 Chiyaz",
          "ui:styles": {
            "fontSize": "28px",
            "fontWeight": "800",
            "fontFamily": "'Playfair Display', serif",
            "background": "linear-gradient(135deg, #F5E9D9 0%, #D2691E 100%)",
            "WebkitBackgroundClip": "text",
            "WebkitTextFillColor": "transparent",
            "cursor": "pointer"
          },
          "ui:action": "navigateToPage",
          "ui:actionParams": { "url": "/chiyaz" }
        },
        "themeToggle": {
          "ui:widget": "toggle",
          "ui:label": "",
          "ui:size": "medium",
          "ui:onChange": "toggleTheme",
          "ui:styles": {
            "marginLeft": "auto",
            "marginRight": "20px"
          }
        },
        "links": {
          "ui:widget": "navLinks",
          "ui:theme": "light",
          "ui:links": [
            {
              "label": "Login",
              "action": "navigateToPage",
              "actionParams": { "url": "/chiyaz/login" },
              "styles": {
                "color": "#F5E9D9",
                "fontWeight": "600"
              }
            },
            {
              "label": "Sign Up",
              "action": "navigateToPage",
              "actionParams": { "url": "/chiyaz/signup" },
              "styles": {
                "color": "#F5E9D9",
                "fontWeight": "600"
              }
            }
          ]
        }
      },
      "styles": {
        "background": "rgba(44, 24, 16, 0.95)",
        "backdropFilter": "blur(20px) saturate(180%)",
        "borderBottom": "2px solid rgba(212, 185, 150, 0.3)",
        "padding": "18px 40px",
        "position": "fixed",
        "width": "100%",
        "zIndex": "1000",
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "center",
        "boxShadow": "0 8px 32px rgba(139, 69, 19, 0.25)",
        "height": "70px"
      },
      "triggers": [
        {
          "event": "load",
          "action": "loadTheme"
        }
      ]
    },
    "sidebar": {
      "table": {},
      "modal": {},
      "uiSchema": {},
      "styles": { "display": "none" },
      "triggers": []
    },
    "main": {
      "table": {},
      "modal": {
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
                background: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
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
      "uiSchema": {
        backgroundEffect: {
            "ui:widget": "backgroundEffect",
            "ui:effect": "bubbles",
            "ui:intensity": "high",
            "ui:color": [
            "#F5E9D9",  // Cream - for milk/cream in tea & coffee
            "#DEB887",  // Burlywood - light tea color
            "#D2B48C",  // Tan - medium tea color
            "#8B4513",  // Saddle Brown - strong coffee/tea
            "#D2691E",  // Chocolate - coffee bean color
            "#A0522D",  // Sienna - medium roast coffee
            "#CD853F",  // Peru - chai tea color
            "#BC8F8F",  // Rosy Brown - hibiscus tea
            "#DAA520",  // Goldenrod - honey in tea
            "#F5DEB3"   // Wheat - green tea/matcha
          ],
            "ui:speed": "medium",
            "ui:animationMode": "both",
          },
        "heroSection": {
          "ui:widget": "container",
          "ui:direction": "column",
          "ui:gap": "0",
          "ui:id": "hero-container",
          "ui:styles": {
            "position": "relative",
            "width": "100%",
            "minHeight": "100vh",
            "overflow": "hidden",
            "padding": "0",
            "margin": "0"
          },
          "ui:children": [
            {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:id": "hero-background",
              "ui:styles": {
                "position": "absolute",
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                "backgroundImage": "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop')",
                "backgroundSize": "cover",
                "backgroundPosition": "center",
                "backgroundRepeat": "no-repeat",
                "zIndex": "0"
              },
              "ui:children": [
                {
                  "ui:widget": "container",
                  "ui:styles": {
                    "position": "absolute",
                    "top": "0",
                    "left": "0",
                    "width": "100%",
                    "height": "100%",
                    "background": "rgba(44, 24, 16, 0.8)",
                    "backdropFilter": "blur(2px)",
                    "zIndex": "1"
                  }
                }
              ]
            },
            {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:gap": "50px",
              "ui:id": "hero-content",
              "ui:styles": {
                "position": "relative",
                "zIndex": "10",
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "center",
                "justifyContent": "center",
                "minHeight": "100vh",
                "padding": "120px 40px 80px",
                "textAlign": "center"
              },
              "ui:children": [
                {
                  "ui:widget": "container",
                  "ui:direction": "column",
                  "ui:gap": "30px",
                  "ui:styles": {
                    "background": "rgba(44, 24, 16, 0.85)",
                    "backdropFilter": "blur(20px) saturate(180%)",
                    "border": "2px solid rgba(212, 185, 150, 0.3)",
                    "borderRadius": "30px",
                    "padding": "60px 50px",
                    "boxShadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    "maxWidth": "900px",
                    "animation": "fadeInUp 1s ease-out"
                  },
                  "ui:children": [
                    {
                      "ui:widget": "heading",
                      "ui:text": "Chiyaz Premium Tea & Coffee",
                      "ui:level": "h1",
                      "ui:styles": {
                        "fontSize": "4rem",
                        "fontWeight": "900",
                        "fontFamily": "'Playfair Display', serif",
                        "color": "#F5E9D9",
                        "textShadow": "0 4px 30px rgba(0,0,0,0.5)",
                        "marginBottom": "0",
                        "lineHeight": "1.1"
                      }
                    },
                    {
                      "ui:widget": "paragraph",
                      "ui:text": "Discover the world's finest tea leaves and coffee beans",
                      "ui:styles": {
                        "fontSize": "1.8rem",
                        "color": "rgba(245, 233, 217, 0.95)",
                        "lineHeight": "1.5",
                        "marginBottom": "10px",
                        "fontFamily": "'Playfair Display', serif"
                      }
                    },
                    {
                      "ui:widget": "paragraph",
                      "ui:text": "Sourced from the best plantations, crafted for perfection",
                      "ui:styles": {
                        "fontSize": "1.3rem",
                        "color": "rgba(245, 233, 217, 0.9)",
                        "lineHeight": "1.6",
                        "marginBottom": "20px"
                      }
                    }
                  ]
                },
                {
                  "ui:widget": "flexLayout",
                  "ui:direction": "row",
                  "ui:gap": "25px",
                  "ui:justify": "center",
                  "ui:wrap": true,
                  "ui:styles": {
                    "animation": "fadeInUp 1s ease-out 0.3s backwards"
                  },
                  "ui:children": [
                    {
                      "ui:widget": "button",
                      "ui:label": "🍵 Explore Collection",
                      "ui:action": "navigateToPage",
                      "ui:actionParams": { "url": "/chiyaz/signup" },
                      "ui:styles": {
                        "padding": "20px 45px",
                        "fontSize": "1.2rem",
                        "fontWeight": "700",
                        "background": "rgba(245, 233, 217, 0.95)",
                        "color": "#8B4513",
                        "border": "2px solid rgba(212, 185, 150, 0.5)",
                        "borderRadius": "50px",
                        "cursor": "pointer",
                        "boxShadow": "0 8px 32px rgba(31, 38, 135, 0.37)",
                        "backdropFilter": "blur(10px)",
                        "transition": "all 0.3s ease",
                        "transform": "translateY(0)"
                      },
                      "ui:hoverTransform": "translateY(-5px) scale(1.05)",
                      "ui:hoverShadow": "0 15px 40px rgba(245, 233, 217, 0.4)"
                    },
                    {
                      "ui:widget": "button",
                      "ui:label": "☕ Join Community",
                      "ui:action": "navigateToPage",
                      "ui:actionParams": { "url": "/chiyaz/login" },
                      "ui:styles": {
                        "padding": "20px 45px",
                        "fontSize": "1.2rem",
                        "fontWeight": "700",
                        "background": "rgba(245, 233, 217, 0.15)",
                        "color": "#F5E9D9",
                        "border": "2px solid rgba(212, 185, 150, 0.3)",
                        "borderRadius": "50px",
                        "cursor": "pointer",
                        "backdropFilter": "blur(10px)",
                        "transition": "all 0.3s ease",
                        "transform": "translateY(0)"
                      },
                      "ui:hoverTransform": "translateY(-5px) scale(1.05)",
                      "ui:hoverShadow": "0 15px 40px rgba(245, 233, 217, 0.3)"
                    }
                  ]
                }
              ]
            }
          ]
        },
        "statsSection": {
          "ui:widget": "container",
          "ui:direction": "row",
          "ui:gap": "60px",
          "ui:styles": {
            "marginTop": "40px",
            "animation": "fadeInUp 1s ease-out 0.6s backwards",
            "display": "flex",
            "flexWrap": "wrap",
            "justifyContent": "center",
            "background": "rgba(44, 24, 16, 0.85)",
            "backdropFilter": "blur(15px) saturate(180%)",
            "borderRadius": "25px",
            "padding": "40px 50px",
            "border": "2px solid rgba(212, 185, 150, 0.3)",
            "maxWidth": "1000px",
            "margin": "0 auto 80px",
            "color": "#F5E9D9"
          },
          "ui:children": [
            {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:gap": "10px",
              "ui:styles": {
                "textAlign": "center",
                "minWidth": "180px"
              },
              "ui:children": [
                {
                  "ui:widget": "heading",
                  "ui:text": "50+",
                  "ui:level": "h2",
                  "ui:styles": {
                    "fontSize": "3.5rem",
                    "fontWeight": "900",
                    "color": "#F5E9D9",
                    "margin": "0",
                    "textShadow": "0 0 20px rgba(245, 233, 217, 0.2)"
                  }
                },
                {
                  "ui:widget": "text",
                  "ui:content": "Tea Varieties",
                  "ui:styles": {
                    "fontSize": "1.1rem",
                    "color": "rgba(245, 233, 217, 0.95)",
                    "fontWeight": "500"
                  }
                }
              ]
            },
            {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:gap": "10px",
              "ui:styles": {
                "textAlign": "center",
                "minWidth": "180px"
              },
              "ui:children": [
                {
                  "ui:widget": "heading",
                  "ui:text": "30+",
                  "ui:level": "h2",
                  "ui:styles": {
                    "fontSize": "3.5rem",
                    "fontWeight": "900",
                    "color": "#F5E9D9",
                    "margin": "0",
                    "textShadow": "0 0 20px rgba(245, 233, 217, 0.2)"
                  }
                },
                {
                  "ui:widget": "text",
                  "ui:content": "Coffee Origins",
                  "ui:styles": {
                    "fontSize": "1.1rem",
                    "color": "rgba(245, 233, 217, 0.95)",
                    "fontWeight": "500"
                  }
                }
              ]
            },
            {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:gap": "10px",
              "ui:styles": {
                "textAlign": "center",
                "minWidth": "180px"
              },
              "ui:children": [
                {
                  "ui:widget": "heading",
                  "ui:text": "100%",
                  "ui:level": "h2",
                  "ui:styles": {
                    "fontSize": "3.5rem",
                    "fontWeight": "900",
                    "color": "#F5E9D9",
                    "margin": "0",
                    "textShadow": "0 0 20px rgba(245, 233, 217, 0.2)"
                  }
                },
                {
                  "ui:widget": "text",
                  "ui:content": "Organic Sourced",
                  "ui:styles": {
                    "fontSize": "1.1rem",
                    "color": "rgba(245, 233, 217, 0.95)",
                    "fontWeight": "500"
                  }
                }
              ]
            }
          ]
        },
        "featuresSection": {
          "ui:widget": "container",
          "ui:direction": "column",
          "ui:gap": "70px",
          "ui:styles": {
            "padding": "100px 40px",
            "background": "transparent",
            "position": "relative"
          },
          "ui:children": [
            {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:gap": "25px",
              "ui:styles": {
                "textAlign": "center",
                "maxWidth": "900px",
                "margin": "0 auto",
                "background": "rgba(44, 24, 16, 0.85)",
                "backdropFilter": "blur(15px) saturate(180%)",
                "borderRadius": "25px",
                "padding": "50px 40px",
                "border": "2px solid rgba(212, 185, 150, 0.3)",
                "color": "#F5E9D9"
              },
              "ui:children": [
                {
                  "ui:widget": "heading",
                  "ui:text": "✨ Premium Selection",
                  "ui:level": "h2",
                  "ui:styles": {
                    "fontSize": "3.5rem",
                    "fontWeight": "900",
                    "color": "#F5E9D9",
                    "marginBottom": "10px",
                    "fontFamily": "'Playfair Display', serif"
                  }
                },
                {
                  "ui:widget": "paragraph",
                  "ui:text": "Experience the finest tea and coffee from around the world",
                  "ui:styles": {
                    "fontSize": "1.4rem",
                    "color": "rgba(245, 233, 217, 0.9)",
                    "lineHeight": "1.6"
                  }
                }
              ]
            },
            {
              "ui:widget": "gridLayout",
              "ui:columns": 2,
              "ui:gap": "30px",
              "ui:styles": {
                "maxWidth": "1200px",
                "margin": "0 auto"
              },
              "ui:children": [
                {
                  "ui:widget": "card",
                  "ui:title": "🍵 Premium Tea Collection",
                  "ui:description": "From delicate Darjeeling to robust Assam, discover teas sourced from the finest estates across India, China, and Japan.",
                  "ui:styles": {
                    "padding": "40px",
                    "textAlign": "center",
                    "background": "rgba(44, 24, 16, 0.85)",
                    "backdropFilter": "blur(20px) saturate(180%)",
                    "borderRadius": "25px",
                    "border": "2px solid rgba(212, 185, 150, 0.3)",
                    "boxShadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    "transition": "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "cursor": "pointer",
                    "color": "#F5E9D9"
                  },
                  "ui:titleStyles": {
                    "color": "#F5E9D9",
                    "fontSize": "1.8rem",
                    "fontWeight": "700",
                    "marginBottom": "15px",
                    "fontFamily": "'Playfair Display', serif"
                  },
                  "ui:descriptionStyles": {
                    "color": "rgba(245, 233, 217, 0.9)",
                    "fontSize": "1.05rem",
                    "lineHeight": "1.6"
                  },
                  "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                  "ui:hoverShadow": "0 20px 60px 0 rgba(139, 69, 19, 0.4)"
                },
                {
                  "ui:widget": "card",
                  "ui:title": "☕ Artisan Coffee Beans",
                  "ui:description": "Single-origin beans from Ethiopia, Colombia, Brazil, and more. Roasted to perfection for the ultimate coffee experience.",
                  "ui:styles": {
                    "padding": "40px",
                    "textAlign": "center",
                    "background": "rgba(44, 24, 16, 0.85)",
                    "backdropFilter": "blur(20px) saturate(180%)",
                    "borderRadius": "25px",
                    "border": "2px solid rgba(212, 185, 150, 0.3)",
                    "boxShadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    "transition": "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "cursor": "pointer",
                    "color": "#F5E9D9"
                  },
                  "ui:titleStyles": {
                    "color": "#F5E9D9",
                    "fontSize": "1.8rem",
                    "fontWeight": "700",
                    "marginBottom": "15px",
                    "fontFamily": "'Playfair Display', serif"
                  },
                  "ui:descriptionStyles": {
                    "color": "rgba(245, 233, 217, 0.9)",
                    "fontSize": "1.05rem",
                    "lineHeight": "1.6"
                  },
                  "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                  "ui:hoverShadow": "0 20px 60px 0 rgba(139, 69, 19, 0.4)"
                },
                {
                  "ui:widget": "card",
                  "ui:title": "🌱 Organic & Sustainable",
                  "ui:description": "All our products are ethically sourced, organic, and sustainable. Supporting farmers and protecting the environment.",
                  "ui:styles": {
                    "padding": "40px",
                    "textAlign": "center",
                    "background": "rgba(44, 24, 16, 0.85)",
                    "backdropFilter": "blur(20px) saturate(180%)",
                    "borderRadius": "25px",
                    "border": "2px solid rgba(212, 185, 150, 0.3)",
                    "boxShadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    "transition": "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "cursor": "pointer",
                    "color": "#F5E9D9"
                  },
                  "ui:titleStyles": {
                    "color": "#F5E9D9",
                    "fontSize": "1.8rem",
                    "fontWeight": "700",
                    "marginBottom": "15px",
                    "fontFamily": "'Playfair Display', serif"
                  },
                  "ui:descriptionStyles": {
                    "color": "rgba(245, 233, 217, 0.9)",
                    "fontSize": "1.05rem",
                    "lineHeight": "1.6"
                  },
                  "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                  "ui:hoverShadow": "0 20px 60px 0 rgba(139, 69, 19, 0.4)"
                },
                {
                  "ui:widget": "card",
                  "ui:title": "🎁 Subscription Boxes",
                  "ui:description": "Curated monthly boxes with new tea and coffee discoveries. Perfect for exploring different flavors and origins.",
                  "ui:styles": {
                    "padding": "40px",
                    "textAlign": "center",
                    "background": "rgba(44, 24, 16, 0.85)",
                    "backdropFilter": "blur(20px) saturate(180%)",
                    "borderRadius": "25px",
                    "border": "2px solid rgba(212, 185, 150, 0.3)",
                    "boxShadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    "transition": "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "cursor": "pointer",
                    "color": "#F5E9D9"
                  },
                  "ui:titleStyles": {
                    "color": "#F5E9D9",
                    "fontSize": "1.8rem",
                    "fontWeight": "700",
                    "marginBottom": "15px",
                    "fontFamily": "'Playfair Display', serif"
                  },
                  "ui:descriptionStyles": {
                    "color": "rgba(245, 233, 217, 0.9)",
                    "fontSize": "1.05rem",
                    "lineHeight": "1.6"
                  },
                  "ui:hoverTransform": "translateY(-15px) scale(1.02)",
                  "ui:hoverShadow": "0 20px 60px 0 rgba(139, 69, 19, 0.4)"
                }
              ]
            }
          ]
        },
        "menuSection": {
          "ui:widget": "container",
          "ui:direction": "column",
          "ui:gap": "80px",
          "ui:styles": {
            "padding": "100px 40px",
            "background": "transparent"
          },
          "ui:children": [
            {
              "ui:widget": "heading",
              "ui:text": "🍵 Our Premium Tea Collection",
              "ui:level": "h2",
              "ui:styles": {
                "fontSize": "3.5rem",
                "fontWeight": "900",
                "color": "#F5E9D9",
                "textAlign": "center",
                "fontFamily": "'Playfair Display', serif",
                "marginBottom": "60px",
                "textShadow": "0 4px 20px rgba(0,0,0,0.5)"
              }
            },
            {
              "ui:widget": "projectGrid",
              "ui:dataSource": "chiyaz.tea.list_filtered.data",
              "ui:animated": true,
              "ui:cardStyles": {
                "background": "rgba(44, 24, 16, 0.85)",
                "border": "1px solid rgba(212, 185, 150, 0.2)",
                "borderRadius": "20px",
                "color": "#F5E9D9",
                "padding": "25px"
              },
              "ui:titleStyles": {
                "color": "#F5E9D9",
                "fontFamily": "'Playfair Display', serif"
              },
              "ui:descriptionStyles": {
                "color": "rgba(245, 233, 217, 0.9)"
              },
              "ui:priceStyles": {
                "color": "#D2691E",
                "fontWeight": "700"
              }
            },
            {
              "ui:widget": "heading",
              "ui:text": "☕ Our Premium Coffee Collection",
              "ui:level": "h2",
              "ui:styles": {
                "fontSize": "3.5rem",
                "fontWeight": "900",
                "color": "#F5E9D9",
                "textAlign": "center",
                "fontFamily": "'Playfair Display', serif",
                "marginTop": "80px",
                "marginBottom": "60px",
                "textShadow": "0 4px 20px rgba(0,0,0,0.5)"
              }
            },
            {
              "ui:widget": "projectGrid",
              "ui:dataSource": "chiyaz.coffee.list_filtered.data",
              "ui:animated": true,
              "ui:cardStyles": {
                "background": "rgba(44, 24, 16, 0.85)",
                "border": "1px solid rgba(212, 185, 150, 0.2)",
                "borderRadius": "20px",
                "color": "#F5E9D9",
                "padding": "25px"
              },
              "ui:titleStyles": {
                "color": "#F5E9D9",
                "fontFamily": "'Playfair Display', serif"
              },
              "ui:descriptionStyles": {
                "color": "rgba(245, 233, 217, 0.9)"
              },
              "ui:priceStyles": {
                "color": "#D2691E",
                "fontWeight": "700"
              }
            }
          ]
        },
        "reviewsSection": {
          "ui:widget": "container",
          "ui:direction": "column",
          "ui:gap": "70px",
          "ui:styles": {
            "padding": "100px 40px",
            "background": "transparent"
          },
          "ui:children": [
            {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:gap": "25px",
              "ui:styles": {
                "textAlign": "center",
                "maxWidth": "900px",
                "margin": "0 auto",
                "background": "rgba(44, 24, 16, 0.85)",
                "backdropFilter": "blur(15px) saturate(180%)",
                "borderRadius": "25px",
                "padding": "50px 40px",
                "border": "2px solid rgba(212, 185, 150, 0.3)",
                "color": "#F5E9D9",
                "boxShadow": "0 8px 32px rgba(139, 69, 19, 0.25)"
              },
              "ui:children": [
                {
                  "ui:widget": "heading",
                  "ui:text": "⭐ Customer Reviews",
                  "ui:level": "h2",
                  "ui:styles": {
                    "fontSize": "3.5rem",
                    "fontWeight": "900",
                    "color": "#F5E9D9",
                    "fontFamily": "'Playfair Display', serif",
                    "textShadow": "0 4px 20px rgba(0,0,0,0.5)"
                  }
                },
                {
                  "ui:widget": "paragraph",
                  "ui:text": "See what our customers are saying about our premium tea & coffee",
                  "ui:styles": {
                    "fontSize": "1.3rem",
                    "color": "rgba(245, 233, 217, 0.9)",
                    "lineHeight": "1.6"
                  }
                }
              ]
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
                "background": "rgba(44, 24, 16, 0.85)",
                "border": "1px solid rgba(212, 185, 150, 0.2)",
                "borderRadius": "20px",
                "color": "#F5E9D9",
                "padding": "30px",
                "backdropFilter": "blur(20px) saturate(180%)"
              },
              "ui:titleStyles": {
                "color": "#F5E9D9",
                "fontFamily": "'Playfair Display', serif"
              },
              "ui:textStyles": {
                "color": "rgba(245, 233, 217, 0.9)"
              },
              "ui:ratingStyles": {
                "color": "#D2691E"
              },
              "ui:summaryStyles": {
                "background": "rgba(44, 24, 16, 0.85)",
                "border": "1px solid rgba(212, 185, 150, 0.2)",
                "borderRadius": "20px",
                "color": "#F5E9D9",
                "padding": "25px"
              }
            }
          ]
        },
        "ctaSection": {
          "ui:widget": "container",
          "ui:direction": "column",
          "ui:gap": "35px",
          "ui:styles": {
            "padding": "80px 40px 100px",
            "background": "transparent",
            "textAlign": "center",
            "position": "relative"
          },
          "ui:children": [
            {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:gap": "30px",
              "ui:styles": {
                "maxWidth": "900px",
                "margin": "0 auto",
                "background": "rgba(44, 24, 16, 0.85)",
                "backdropFilter": "blur(25px) saturate(180%)",
                "borderRadius": "30px",
                "padding": "60px 50px",
                "border": "2px solid rgba(212, 185, 150, 0.3)",
                "boxShadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                "color": "#F5E9D9"
              },
              "ui:children": [
                {
                  "ui:widget": "heading",
                  "ui:text": "Ready to Elevate Your Tea & Coffee Experience?",
                  "ui:level": "h2",
                  "ui:styles": {
                    "fontSize": "3.2rem",
                    "fontWeight": "900",
                    "color": "#F5E9D9",
                    "marginBottom": "15px",
                    "lineHeight": "1.2",
                    "fontFamily": "'Playfair Display', serif"
                  }
                },
                {
                  "ui:widget": "paragraph",
                  "ui:text": "Join thousands of tea and coffee lovers enjoying our premium collection",
                  "ui:styles": {
                    "fontSize": "1.4rem",
                    "color": "rgba(245, 233, 217, 0.95)",
                    "lineHeight": "1.6",
                    "marginBottom": "20px"
                  }
                },
                {
                  "ui:widget": "button",
                  "ui:label": "🌟 Start Your Journey",
                  "ui:action": "navigateToPage",
                  "ui:actionParams": { "url": "/chiyaz/signup" },
                  "ui:styles": {
                    "padding": "20px 55px",
                    "fontSize": "1.3rem",
                    "fontWeight": "700",
                    "background": "rgba(245, 233, 217, 0.95)",
                    "color": "#8B4513",
                    "border": "2px solid rgba(212, 185, 150, 0.5)",
                    "borderRadius": "50px",
                    "cursor": "pointer",
                    "boxShadow": "0 10px 40px rgba(245, 233, 217, 0.3)",
                    "backdropFilter": "blur(10px)",
                    "transition": "all 0.4s ease",
                    "margin": "0 auto"
                  },
                  "ui:hoverTransform": "translateY(-5px) scale(1.08)",
                  "ui:hoverShadow": "0 20px 60px rgba(245, 233, 217, 0.5)"
                }
              ]
            }
          ]
        }
      },
      "styles": {
        "padding": "0",
        "background": "transparent",
        "minHeight": "100vh"
      },
      "triggers": [
        {
          "event": "load",
          "action": "loadTheme"
        },
        {
          "event": "load",
          "source": "chiyaz.reviews.list"
        },
        {
          "event": "load",
          "source": "chiyaz.tea.list"
        },
        {
          "event": "load",
          "source": "chiyaz.coffee.list"
        }
      ]
    },
    "footer": {
      "table": {},
      "modal": {},
      "uiSchema": {
        "footerText": {
          "ui:widget": "text",
          "ui:content": "© 2024 Chiyaz Tea & Coffee. All rights reserved.",
          "ui:styles": {
            "textAlign": "center",
            "color": "#F5E9D9",
            "fontSize": "14px"
          }
        }
      },
      "styles": {
        "background": "#2C1810",
        "padding": "32px",
        "textAlign": "center"
      },
      "triggers": []
    }
  },

  "resolvedAPIs": {}
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
