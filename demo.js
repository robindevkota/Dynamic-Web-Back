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
    title: "SmartWidget Showcase - Animations & Icons",
    slug: "smartwidget-demo",
    projectUUID: "smartwidget-showcase-001",
    taskUUID: "showcase001",
    status: "Active",
    isTemplate: false,
    templateCategory: "E-commerce", // Category (E-commerce, Portfolio, Dashboard, Landing Page, Blog, Other)
    organizationId: null,
    createdBy: "000000000000000000000000",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,
    requireAuth: false,

    initialization: {
      globalCSS: `/* SmartWidget Showcase Styles */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
  color: #1e293b;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Section backgrounds */
.glass-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 60px 40px;
  margin: 40px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.dark-section {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 60px 40px;
  margin: 40px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: #f8fafc;
}

/* Code blocks */
.code-block {
  background: #1e293b;
  color: #64ffda;
  padding: 20px;
  border-radius: 12px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  overflow-x: auto;
  margin: 20px 0;
  border: 2px solid #334155;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
  }
  50% { 
    box-shadow: 0 0 40px rgba(102, 126, 234, 0.8),
                0 0 60px rgba(102, 126, 234, 0.6);
  }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Interactive cards */
.showcase-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.showcase-card:hover {
  transform: translateY(-10px) scale(1.02);
}

/* Grid layouts */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin: 30px 0;
}

.animation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin: 30px 0;
}`,

      resources: [
        "demo.products.list",
        "demo.stats.dashboard",
        "demo.users.list",
      ],

      actions: {
        scrollToSection: `
        const sectionId = context.actionParams?.sectionId;
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      `,

        showDemo: `
        const demoType = context.actionParams?.type || 'default';
        context.handlers.showNotification({
          type: 'toast',
          message: \`🎨 \${demoType} demo activated!\`,
          background: '#667eea',
          duration: 2000
        });
      `,
      },
    },

    components: {
      navbar: {
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🎨 SmartWidget Demo",
            "ui:icon": {
              type: "fontawesome",
              value: "fas fa-palette",
            },
            "ui:iconPosition": "left",
            "ui:iconGap": "12px",
            "ui:animation": "fadeInDown",
            "ui:styles": {
              fontSize: "24px",
              fontWeight: "800",
              color: "white",
              cursor: "pointer",
            },
          },

          navLinks: {
            "ui:widget": "container",
            "ui:direction": "row",
            "ui:gap": "20px",
            "ui:styles": {
              marginLeft: "auto",
            },
            "ui:children": [
              {
                "ui:widget": "button",
                "ui:label": "Icons",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-icons",
                  color: "white",
                },
                "ui:iconPosition": "left",
                "ui:action": "scrollToSection",
                "ui:actionParams": { sectionId: "icons-section" },
                "ui:animateOnHover": "lift",
                "ui:styles": {
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  backdropFilter: "blur(10px)",
                },
              },
              {
                "ui:widget": "button",
                "ui:label": "Animations",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-magic",
                  color: "white",
                },
                "ui:iconPosition": "left",
                "ui:action": "scrollToSection",
                "ui:actionParams": { sectionId: "animations-section" },
                "ui:animateOnHover": "lift",
                "ui:styles": {
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  backdropFilter: "blur(10px)",
                },
              },
              {
                "ui:widget": "button",
                "ui:label": "Data Binding",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-database",
                  color: "white",
                },
                "ui:iconPosition": "left",
                "ui:action": "scrollToSection",
                "ui:actionParams": { sectionId: "data-section" },
                "ui:animateOnHover": "lift",
                "ui:styles": {
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  backdropFilter: "blur(10px)",
                },
              },
            ],
          },
        },
        styles: {
          background: "rgba(30, 41, 59, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "2px solid rgba(255,255,255,0.1)",
          padding: "20px 40px",
          position: "fixed",
          width: "100%",
          zIndex: "1000",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        },
      },

      main: {
        uiSchema: {
          heroSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "40px",
            "ui:styles": {
              padding: "140px 40px 80px",
              textAlign: "center",
              maxWidth: "1200px",
              margin: "0 auto",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "SmartWidget Showcase",
                "ui:level": "h1",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-star",
                  color: "#fbbf24",
                },
                "ui:iconPosition": "top",
                "ui:iconGap": "20px",
                "ui:animation": "fadeInUp",
                "ui:styles": {
                  fontSize: "4rem",
                  fontWeight: "900",
                  color: "white",
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                  fontFamily: "'Poppins', sans-serif",
                  marginBottom: "20px",
                },
              },

              {
                "ui:widget": "paragraph",
                "ui:text":
                  "Explore the power of icons, animations, and dynamic data binding",
                "ui:animation": "fadeInUp",
                "ui:styles": {
                  fontSize: "1.5rem",
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: "800px",
                  margin: "0 auto 40px",
                },
              },

              {
                "ui:widget": "container",
                "ui:direction": "row",
                "ui:gap": "20px",
                "ui:justify": "center",
                "ui:styles": {
                  flexWrap: "wrap",
                },
                "ui:children": [
                  {
                    "ui:widget": "button",
                    "ui:label": "Explore Icons",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-rocket",
                    },
                    "ui:iconPosition": "left",
                    "ui:action": "scrollToSection",
                    "ui:actionParams": { sectionId: "icons-section" },
                    "ui:animation": "scaleIn",
                    "ui:animateOnHover": "float",
                    "ui:styles": {
                      padding: "16px 32px",
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      background: "white",
                      color: "#667eea",
                      border: "none",
                      borderRadius: "16px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "See Animations",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-bolt",
                    },
                    "ui:iconPosition": "left",
                    "ui:action": "scrollToSection",
                    "ui:actionParams": { sectionId: "animations-section" },
                    "ui:animation": "scaleIn",
                    "ui:animateOnHover": "float",
                    "ui:styles": {
                      padding: "16px 32px",
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      border: "2px solid white",
                      borderRadius: "16px",
                      backdropFilter: "blur(10px)",
                    },
                  },
                ],
              },
            ],
          },

          iconsSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "50px",
            "ui:id": "icons-section",
            "ui:styles": {
              padding: "80px 40px",
              maxWidth: "1400px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "Icon Showcase",
                "ui:level": "h2",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-icons",
                  color: "#667eea",
                },
                "ui:iconPosition": "left",
                "ui:animation": "fadeInLeft",
                "ui:styles": {
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "#1e293b",
                  textAlign: "center",
                },
              },

              {
                "ui:widget": "paragraph",
                "ui:text":
                  "Icons can be positioned left, right, top, or bottom with customizable gaps and colors",
                "ui:animation": "fadeInUp",
                "ui:styles": {
                  fontSize: "1.1rem",
                  color: "#64748b",
                  textAlign: "center",
                  maxWidth: "700px",
                  margin: "0 auto",
                },
              },

              {
                "ui:widget": "gridLayout",
                "ui:columns": 4,
                "ui:gap": "24px",
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Heart Left",
                    "ui:description": "Icon on the left side",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-heart",
                      color: "#ef4444",
                    },
                    "ui:iconPosition": "left",
                    "ui:animation": "fadeInUp",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "white",
                      borderRadius: "16px",
                      border: "2px solid #e2e8f0",
                      transition: "all 0.3s",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Star Right",
                    "ui:description": "Icon on the right side",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-star",
                      color: "#fbbf24",
                    },
                    "ui:iconPosition": "right",
                    "ui:animation": "fadeInUp",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "white",
                      borderRadius: "16px",
                      border: "2px solid #e2e8f0",
                      transition: "all 0.3s",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Crown Top",
                    "ui:description": "Icon on top",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-crown",
                      color: "#f59e0b",
                    },
                    "ui:iconPosition": "top",
                    "ui:animation": "fadeInUp",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "white",
                      borderRadius: "16px",
                      border: "2px solid #e2e8f0",
                      transition: "all 0.3s",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Trophy Bottom",
                    "ui:description": "Icon on bottom",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-trophy",
                      color: "#8b5cf6",
                    },
                    "ui:iconPosition": "bottom",
                    "ui:animation": "fadeInUp",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      padding: "30px",
                      textAlign: "center",
                      background: "white",
                      borderRadius: "16px",
                      border: "2px solid #e2e8f0",
                      transition: "all 0.3s",
                    },
                  },
                ],
              },

              {
                "ui:widget": "divider",
                "ui:variant": "solid",
                "ui:color": "#e2e8f0",
                "ui:spacing": "large",
              },

              {
                "ui:widget": "heading",
                "ui:text": "Input Icons (Prefix & Suffix)",
                "ui:level": "h3",
                "ui:animation": "fadeInLeft",
                "ui:styles": {
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  marginTop: "20px",
                },
              },

              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "20px",
                "ui:styles": {
                  maxWidth: "600px",
                  margin: "0 auto",
                  width: "100%",
                },
                "ui:children": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email with Prefix Icon",
                    "ui:placeholder": "your.email@example.com",
                    "ui:name": "email",
                    "ui:prefixIcon": {
                      type: "fontawesome",
                      value: "fas fa-envelope",
                      color: "#667eea",
                    },
                    "ui:animation": "fadeInLeft",
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Search with Suffix Icon",
                    "ui:placeholder": "Search anything...",
                    "ui:name": "search",
                    "ui:suffixIcon": {
                      type: "fontawesome",
                      value: "fas fa-search",
                      color: "#10b981",
                    },
                    "ui:animation": "fadeInRight",
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Price with Both Icons",
                    "ui:placeholder": "0.00",
                    "ui:name": "price",
                    "ui:prefixIcon": {
                      type: "fontawesome",
                      value: "fas fa-dollar-sign",
                      color: "#059669",
                    },
                    "ui:suffixIcon": {
                      type: "fontawesome",
                      value: "fas fa-check-circle",
                      color: "#10b981",
                    },
                    "ui:animation": "fadeInUp",
                  },
                ],
              },
            ],
          },

          animationsSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "50px",
            "ui:id": "animations-section",
            "ui:styles": {
              padding: "80px 40px",
              maxWidth: "1400px",
              margin: "40px auto",
              background: "rgba(30, 41, 59, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              color: "white",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "Animation Showcase",
                "ui:level": "h2",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-magic",
                  color: "#a78bfa",
                },
                "ui:iconPosition": "left",
                "ui:animation": "rotateIn",
                "ui:styles": {
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "white",
                  textAlign: "center",
                },
              },

              {
                "ui:widget": "paragraph",
                "ui:text":
                  "SmartWidget supports entry animations and hover animations powered by Framer Motion",
                "ui:animation": "fadeInUp",
                "ui:styles": {
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.9)",
                  textAlign: "center",
                  maxWidth: "700px",
                  margin: "0 auto",
                },
              },

              {
                "ui:widget": "heading",
                "ui:text": "Entry Animations",
                "ui:level": "h3",
                "ui:animation": "slideInLeft",
                "ui:styles": {
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "white",
                  marginTop: "20px",
                },
              },

              {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "24px",
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Fade In",
                    "ui:description": "Smooth fade in effect",
                    "ui:animation": "fadeIn",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid rgba(255,255,255,0.2)",
                      color: "white",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Slide In Up",
                    "ui:description": "Slides from bottom",
                    "ui:animation": "slideInUp",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid rgba(255,255,255,0.2)",
                      color: "white",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Scale In",
                    "ui:description": "Scales from small",
                    "ui:animation": "scaleIn",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid rgba(255,255,255,0.2)",
                      color: "white",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Fade In Left",
                    "ui:description": "Fades from left side",
                    "ui:animation": "fadeInLeft",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid rgba(255,255,255,0.2)",
                      color: "white",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Fade In Right",
                    "ui:description": "Fades from right side",
                    "ui:animation": "fadeInRight",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid rgba(255,255,255,0.2)",
                      color: "white",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Rotate In",
                    "ui:description": "Rotates while fading",
                    "ui:animation": "rotateIn",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid rgba(255,255,255,0.2)",
                      color: "white",
                    },
                  },
                ],
              },

              {
                "ui:widget": "divider",
                "ui:variant": "dashed",
                "ui:color": "rgba(255,255,255,0.3)",
                "ui:spacing": "large",
              },

              {
                "ui:widget": "heading",
                "ui:text": "Hover Animations",
                "ui:level": "h3",
                "ui:animation": "slideInRight",
                "ui:styles": {
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "white",
                  marginTop: "20px",
                },
              },

              {
                "ui:widget": "gridLayout",
                "ui:columns": 4,
                "ui:gap": "24px",
                "ui:children": [
                  {
                    "ui:widget": "button",
                    "ui:label": "Lift",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-arrow-up",
                    },
                    "ui:iconPosition": "left",
                    "ui:animateOnHover": "lift",
                    "ui:animation": "fadeInUp",
                    "ui:styles": {
                      padding: "20px 30px",
                      background: "rgba(167, 139, 250, 0.2)",
                      color: "white",
                      border: "2px solid #a78bfa",
                      borderRadius: "12px",
                      fontWeight: "600",
                      width: "100%",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "Grow",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-expand",
                    },
                    "ui:iconPosition": "left",
                    "ui:animateOnHover": "grow",
                    "ui:animation": "fadeInUp",
                    "ui:styles": {
                      padding: "20px 30px",
                      background: "rgba(34, 197, 94, 0.2)",
                      color: "white",
                      border: "2px solid #22c55e",
                      borderRadius: "12px",
                      fontWeight: "600",
                      width: "100%",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "Tilt",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-undo",
                    },
                    "ui:iconPosition": "left",
                    "ui:animateOnHover": "tilt",
                    "ui:animation": "fadeInUp",
                    "ui:styles": {
                      padding: "20px 30px",
                      background: "rgba(59, 130, 246, 0.2)",
                      color: "white",
                      border: "2px solid #3b82f6",
                      borderRadius: "12px",
                      fontWeight: "600",
                      width: "100%",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "Float",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-cloud",
                    },
                    "ui:iconPosition": "left",
                    "ui:animateOnHover": "float",
                    "ui:animation": "fadeInUp",
                    "ui:styles": {
                      padding: "20px 30px",
                      background: "rgba(251, 191, 36, 0.2)",
                      color: "white",
                      border: "2px solid #fbbf24",
                      borderRadius: "12px",
                      fontWeight: "600",
                      width: "100%",
                    },
                  },
                ],
              },

              {
                "ui:widget": "divider",
                "ui:variant": "solid",
                "ui:color": "rgba(255,255,255,0.2)",
                "ui:spacing": "large",
              },

              {
                "ui:widget": "heading",
                "ui:text": "Continuous Animations",
                "ui:level": "h3",
                "ui:animation": "fadeInLeft",
                "ui:styles": {
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "white",
                  marginTop: "20px",
                },
              },

              {
                "ui:widget": "flexLayout",
                "ui:direction": "row",
                "ui:gap": "30px",
                "ui:justify": "center",
                "ui:wrap": true,
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Pulse",
                    "ui:description": "Continuous pulse animation",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-heart",
                      color: "#ef4444",
                    },
                    "ui:iconPosition": "top",
                    "ui:animation": "pulse",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(239, 68, 68, 0.2)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid #ef4444",
                      color: "white",
                      minWidth: "200px",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Bounce",
                    "ui:description": "Bouncing animation",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-basketball-ball",
                      color: "#f59e0b",
                    },
                    "ui:iconPosition": "top",
                    "ui:animation": "bounce",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(245, 158, 11, 0.2)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid #f59e0b",
                      color: "white",
                      minWidth: "200px",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Float",
                    "ui:description": "Floating up and down",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-feather",
                      color: "#8b5cf6",
                    },
                    "ui:iconPosition": "top",
                    "ui:animation": "float",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background: "rgba(139, 92, 246, 0.2)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid #8b5cf6",
                      color: "white",
                      minWidth: "200px",
                    },
                  },
                ],
              },
            ],
          },

          dataBindingSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "50px",
            "ui:id": "data-section",
            "ui:styles": {
              padding: "80px 40px",
              maxWidth: "1400px",
              margin: "40px auto",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "Dynamic Data Binding",
                "ui:level": "h2",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-database",
                  color: "#667eea",
                },
                "ui:iconPosition": "left",
                "ui:animation": "fadeInDown",
                "ui:styles": {
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "#1e293b",
                  textAlign: "center",
                },
              },

              {
                "ui:widget": "paragraph",
                "ui:text":
                  "SmartWidget automatically resolves templates and binds data from DataStore",
                "ui:animation": "fadeInUp",
                "ui:styles": {
                  fontSize: "1.1rem",
                  color: "#64748b",
                  textAlign: "center",
                  maxWidth: "700px",
                  margin: "0 auto",
                },
              },

              {
                "ui:widget": "heading",
                "ui:text": "Template Examples",
                "ui:level": "h3",
                "ui:animation": "fadeInLeft",
                "ui:styles": {
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  marginTop: "20px",
                },
              },

              {
                "ui:widget": "gridLayout",
                "ui:columns": 2,
                "ui:gap": "24px",
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "User Email",
                    "ui:description":
                      "{{auth.user.email || 'guest@example.com'}}",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-envelope",
                      color: "#3b82f6",
                    },
                    "ui:iconPosition": "top",
                    "ui:animation": "fadeInUp",
                    "ui:animateOnHover": "lift",
                    "ui:styles": {
                      padding: "30px",
                      background: "white",
                      borderRadius: "16px",
                      border: "2px solid #e2e8f0",
                    },
                    "ui:titleStyles": {
                      color: "#1e293b",
                      fontSize: "1.3rem",
                      fontWeight: "700",
                    },
                    "ui:descriptionStyles": {
                      color: "#3b82f6",
                      fontSize: "1.1rem",
                      fontFamily: "monospace",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Auth Status",
                    "ui:description":
                      "{{auth.isAuthenticated ? 'Logged In' : 'Guest'}}",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-user-shield",
                      color: "#10b981",
                    },
                    "ui:iconPosition": "top",
                    "ui:animation": "fadeInUp",
                    "ui:animateOnHover": "lift",
                    "ui:styles": {
                      padding: "30px",
                      background: "white",
                      borderRadius: "16px",
                      border: "2px solid #e2e8f0",
                    },
                    "ui:titleStyles": {
                      color: "#1e293b",
                      fontSize: "1.3rem",
                      fontWeight: "700",
                    },
                    "ui:descriptionStyles": {
                      color: "#10b981",
                      fontSize: "1.1rem",
                      fontFamily: "monospace",
                    },
                  },
                ],
              },

              {
                "ui:widget": "divider",
                "ui:variant": "solid",
                "ui:color": "#e2e8f0",
                "ui:spacing": "large",
              },

              {
                "ui:widget": "heading",
                "ui:text": "Stats Dashboard (Mock Data)",
                "ui:level": "h3",
                "ui:animation": "slideInRight",
                "ui:styles": {
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  marginTop: "20px",
                },
              },

              {
                "ui:widget": "gridLayout",
                "ui:columns": 4,
                "ui:gap": "24px",
                "ui:children": [
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "12,543",
                    "ui:label": "Total Users",
                    "ui:color": "#3b82f6",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-users",
                      color: "#3b82f6",
                    },
                    "ui:animation": "scaleIn",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      background:
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))",
                      borderRadius: "16px",
                      border: "2px solid #dbeafe",
                      padding: "30px",
                    },
                  },
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "8,492",
                    "ui:label": "Active Projects",
                    "ui:color": "#10b981",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-project-diagram",
                      color: "#10b981",
                    },
                    "ui:animation": "scaleIn",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      background:
                        "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))",
                      borderRadius: "16px",
                      border: "2px solid #d1fae5",
                      padding: "30px",
                    },
                  },
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "95.4%",
                    "ui:label": "Success Rate",
                    "ui:color": "#8b5cf6",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-chart-line",
                      color: "#8b5cf6",
                    },
                    "ui:animation": "scaleIn",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      background:
                        "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))",
                      borderRadius: "16px",
                      border: "2px solid #ede9fe",
                      padding: "30px",
                    },
                  },
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "$2.4M",
                    "ui:label": "Revenue",
                    "ui:color": "#f59e0b",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-dollar-sign",
                      color: "#f59e0b",
                    },
                    "ui:animation": "scaleIn",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      background:
                        "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))",
                      borderRadius: "16px",
                      border: "2px solid #fef3c7",
                      padding: "30px",
                    },
                  },
                ],
              },
            ],
          },

          combinedFeaturesSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "50px",
            "ui:styles": {
              padding: "80px 40px",
              maxWidth: "1400px",
              margin: "40px auto",
              background: "rgba(30, 41, 59, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              color: "white",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "Combined Features",
                "ui:level": "h2",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-layer-group",
                  color: "#a78bfa",
                },
                "ui:iconPosition": "left",
                "ui:animation": "fadeInDown",
                "ui:styles": {
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "white",
                  textAlign: "center",
                },
              },

              {
                "ui:widget": "paragraph",
                "ui:text":
                  "Icons + Animations + Data Binding working together seamlessly",
                "ui:animation": "fadeInUp",
                "ui:styles": {
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.9)",
                  textAlign: "center",
                  maxWidth: "700px",
                  margin: "0 auto",
                },
              },

              {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "24px",
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Premium User",
                    "ui:description":
                      "Animated card with icon and dynamic status",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-crown",
                      color: "#fbbf24",
                    },
                    "ui:iconPosition": "top",
                    "ui:animation": "fadeInUp",
                    "ui:animateOnHover": "float",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.1))",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid #fbbf24",
                      color: "white",
                    },
                    "ui:titleStyles": {
                      color: "#fbbf24",
                      fontSize: "1.5rem",
                      fontWeight: "800",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Verified Badge",
                    "ui:description": "Trust indicator with smooth animations",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-shield-check",
                      color: "#10b981",
                    },
                    "ui:iconPosition": "top",
                    "ui:animation": "scaleIn",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid #10b981",
                      color: "white",
                    },
                    "ui:titleStyles": {
                      color: "#10b981",
                      fontSize: "1.5rem",
                      fontWeight: "800",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Lightning Fast",
                    "ui:description": "Performance optimized components",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-bolt",
                      color: "#f59e0b",
                    },
                    "ui:iconPosition": "top",
                    "ui:animation": "rotateIn",
                    "ui:animateOnHover": "tilt",
                    "ui:styles": {
                      padding: "40px",
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1))",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      border: "2px solid #f59e0b",
                      color: "white",
                    },
                    "ui:titleStyles": {
                      color: "#f59e0b",
                      fontSize: "1.5rem",
                      fontWeight: "800",
                    },
                  },
                ],
              },

              {
                "ui:widget": "divider",
                "ui:variant": "dashed",
                "ui:color": "rgba(255,255,255,0.3)",
                "ui:spacing": "large",
              },

              {
                "ui:widget": "container",
                "ui:direction": "row",
                "ui:gap": "30px",
                "ui:justify": "center",
                "ui:wrap": true,
                "ui:children": [
                  {
                    "ui:widget": "button",
                    "ui:label": "Start Building",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-rocket",
                      color: "white",
                    },
                    "ui:iconPosition": "left",
                    "ui:action": "showDemo",
                    "ui:actionParams": { type: "Build" },
                    "ui:animation": "fadeInLeft",
                    "ui:animateOnHover": "float",
                    "ui:styles": {
                      padding: "18px 40px",
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      background: "white",
                      color: "#667eea",
                      border: "none",
                      borderRadius: "16px",
                      boxShadow: "0 8px 24px rgba(255,255,255,0.2)",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "View Documentation",
                    "ui:icon": {
                      type: "fontawesome",
                      value: "fas fa-book",
                      color: "white",
                    },
                    "ui:iconPosition": "left",
                    "ui:action": "showDemo",
                    "ui:actionParams": { type: "Docs" },
                    "ui:animation": "fadeInRight",
                    "ui:animateOnHover": "grow",
                    "ui:styles": {
                      padding: "18px 40px",
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      background: "rgba(255,255,255,0.1)",
                      color: "white",
                      border: "2px solid white",
                      borderRadius: "16px",
                      backdropFilter: "blur(10px)",
                    },
                  },
                ],
              },
            ],
          },

          footerCTA: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "30px",
            "ui:styles": {
              padding: "80px 40px",
              textAlign: "center",
              maxWidth: "900px",
              margin: "40px auto",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "Ready to Build Amazing UIs?",
                "ui:level": "h2",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-sparkles",
                  color: "#fbbf24",
                },
                "ui:iconPosition": "top",
                "ui:iconGap": "20px",
                "ui:animation": "pulse",
                "ui:styles": {
                  fontSize: "3rem",
                  fontWeight: "900",
                  color: "white",
                  fontFamily: "'Poppins', sans-serif",
                },
              },
              {
                "ui:widget": "paragraph",
                "ui:text":
                  "SmartWidget makes it easy to create beautiful, animated, and data-driven interfaces",
                "ui:animation": "fadeInUp",
                "ui:styles": {
                  fontSize: "1.3rem",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "20px",
                },
              },
              {
                "ui:widget": "button",
                "ui:label": "Get Started Now",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-arrow-right",
                  color: "#667eea",
                },
                "ui:iconPosition": "right",
                "ui:action": "showDemo",
                "ui:actionParams": { type: "Get Started" },
                "ui:animation": "scaleUp",
                "ui:animateOnHover": "float",
                "ui:styles": {
                  padding: "20px 50px",
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  background: "white",
                  color: "#667eea",
                  border: "none",
                  borderRadius: "50px",
                  boxShadow: "0 10px 40px rgba(255,255,255,0.3)",
                },
              },
            ],
          },
        },
        styles: {
          padding: "0",
          margin: "0",
        },
      },

      footer: {
        uiSchema: {
          footerContent: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "20px",
            "ui:styles": {
              textAlign: "center",
            },
            "ui:children": [
              {
                "ui:widget": "text",
                "ui:content": "© 2024 SmartWidget Showcase",
                "ui:icon": {
                  type: "fontawesome",
                  value: "fas fa-code",
                  color: "rgba(255,255,255,0.7)",
                },
                "ui:iconPosition": "left",
                "ui:styles": {
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "1rem",
                },
              },
              {
                "ui:widget": "text",
                "ui:content": "Built with SmartWidget & Framer Motion",
                "ui:styles": {
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.9rem",
                },
              },
            ],
          },
        },
        styles: {
          background: "rgba(30, 41, 59, 0.95)",
          backdropFilter: "blur(20px)",
          padding: "40px",
          borderTop: "2px solid rgba(255,255,255,0.1)",
        },
      },
    },

    resolvedAPIs: {},
  },
  {
    title: "FitZen - Premium Fitness & Wellness",
    slug: "fitzen",
    projectUUID: "fitzen-wellness",
    taskUUID: "fitzen001",
    status: "Active",
    isTemplate: true,
    templateCategory: "E-commerce",
    organizationId: "6981d54da9b6db6a9fd3cb5f",
    createdBy: "000000000000000000000000",
    accountValidation: true,
    otpValidation: false,
    isAnonymous: false,
    requireAuth: false,
    redirectIfNotAuth: "/fitzen/login",

    initialization: {
      globalCSS: `/* ============================================ */
/* FITZEN - PREMIUM FITNESS & WELLNESS PLATFORM */
/* Modern, Sophisticated UI with Advanced Animations */
/* ============================================ */

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

/* ============================================ */
/* RESET & BASE */
/* ============================================ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  background: #0A0E27 !important;
  color: #E8EAED !important;
  min-height: 100vh;
  transition: background 0.6s ease, color 0.6s ease;
  overflow-x: hidden;
}

/* ============================================ */
/* GLASSMORPHISM EFFECTS */
/* ============================================ */
.glass-card,
.feature-card,
.stats-card,
.workout-card,
.class-card {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(30px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(30px) saturate(180%) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
  border-radius: 24px !important;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

.glass-card:hover,
.feature-card:hover,
.workout-card:hover,
.class-card:hover {
  transform: translateY(-12px) scale(1.02) !important;
  box-shadow: 
    0 20px 60px 0 rgba(124, 58, 237, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(124, 58, 237, 0.3) !important;
}

/* ============================================ */
/* GRADIENT ACCENTS */
/* ============================================ */
.gradient-primary {
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%) !important;
}

.gradient-secondary {
  background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%) !important;
}

.gradient-success {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%) !important;
}

.gradient-text {
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ============================================ */
/* NAVBAR STYLING */
/* ============================================ */
nav,
header {
  background: rgba(10, 14, 39, 0.8) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border-bottom: 1px solid rgba(124, 58, 237, 0.2) !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5) !important;
}

nav a,
nav button,
header a,
header button {
  color: #E8EAED !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
}

nav a:hover,
nav button:hover {
  color: #EC4899 !important;
  transform: translateY(-2px) !important;
}

/* ============================================ */
/* BUTTON STYLES */
/* ============================================ */
.btn-primary {
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%) !important;
  color: white !important;
  border: none !important;
  border-radius: 16px !important;
  padding: 14px 32px !important;
  font-weight: 600 !important;
  font-size: 15px !important;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3) !important;
  position: relative !important;
  overflow: hidden !important;
}

.btn-primary:hover {
  transform: translateY(-4px) scale(1.05) !important;
  box-shadow: 0 20px 50px rgba(124, 58, 237, 0.5) !important;
}

.btn-primary:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn-primary:hover:before {
  left: 100%;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05) !important;
  color: white !important;
  border: 2px solid rgba(124, 58, 237, 0.5) !important;
  border-radius: 16px !important;
  padding: 14px 32px !important;
  font-weight: 600 !important;
  backdrop-filter: blur(10px) !important;
  transition: all 0.3s ease !important;
}

.btn-secondary:hover {
  background: rgba(124, 58, 237, 0.2) !important;
  border-color: #7C3AED !important;
  transform: translateY(-2px) !important;
}

/* ============================================ */
/* STATS CARDS */
/* ============================================ */
.stats-card {
  padding: 32px !important;
  text-align: center !important;
  position: relative !important;
  overflow: hidden !important;
}

.stats-card:before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
}

.stats-value {
  font-size: 3.5rem !important;
  font-weight: 900 !important;
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px !important;
  text-shadow: 0 0 30px rgba(124, 58, 237, 0.5) !important;
}

.stats-label {
  font-size: 1.1rem !important;
  color: rgba(232, 234, 237, 0.8) !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
}

/* ============================================ */
/* WORKOUT CARDS */
/* ============================================ */
.workout-card {
  position: relative !important;
  overflow: hidden !important;
  cursor: pointer !important;
}

.workout-card img {
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

.workout-card:hover img {
  transform: scale(1.15) rotate(2deg) !important;
}

.workout-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: rgba(236, 72, 153, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
}

/* ============================================ */
/* PROGRESS BARS */
/* ============================================ */
.progress-container {
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #7C3AED 0%, #EC4899 100%);
  border-radius: 20px;
  transition: width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.progress-bar:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s infinite;
}

/* ============================================ */
/* FORM INPUTS */
/* ============================================ */
input,
textarea,
select {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #E8EAED !important;
  padding: 14px 20px !important;
  border-radius: 12px !important;
  font-size: 15px !important;
  transition: all 0.3s ease !important;
  backdrop-filter: blur(10px) !important;
}

input:focus,
textarea:focus,
select:focus {
  outline: none !important;
  border-color: #7C3AED !important;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.2) !important;
  background: rgba(255, 255, 255, 0.08) !important;
}

input::placeholder,
textarea::placeholder {
  color: rgba(232, 234, 237, 0.5) !important;
}

/* ============================================ */
/* SCROLLBAR */
/* ============================================ */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: rgba(10, 14, 39, 0.5);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
  border-radius: 10px;
  border: 2px solid rgba(10, 14, 39, 0.5);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #9333EA 0%, #F472B6 100%);
}

/* ============================================ */
/* ANIMATIONS */
/* ============================================ */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
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
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(124, 58, 237, 0.8);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}

.animate-fadeInScale {
  animation: fadeInScale 0.6s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* ============================================ */
/* RESPONSIVE DESIGN */
/* ============================================ */
@media (max-width: 768px) {
  .stats-value {
    font-size: 2.5rem !important;
  }
  
  .hero-title {
    font-size: 2.5rem !important;
  }
  
  nav {
    padding: 15px 20px !important;
  }
  
  .glass-card,
  .feature-card {
    padding: 24px !important;
  }
}

/* ============================================ */
/* UTILITY CLASSES */
/* ============================================ */
.text-gradient-primary {
  background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient-secondary {
  background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.backdrop-blur {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.shadow-glow {
  box-shadow: 0 10px 40px rgba(124, 58, 237, 0.4);
}

.shadow-glow-hover:hover {
  box-shadow: 0 20px 60px rgba(124, 58, 237, 0.6);
}`,

      resources: [
        "global.enduser.signup",
        "global.enduser.login",
        "global.enduser.logout",
        "fitzen.workouts.list",
        "fitzen.classes.list",
        "fitzen.stats.get",
        "fitzen.workout.log",
      ],

      actions: {
        navigateToPage: `
  const url = context.actionParams?.url;
  if (!url) {
    console.error("❌ No URL provided");
    return;
  }
  console.log("🧭 Navigating to:", url);
  window.location.href = url;
`,

        handleLogin: `
  console.log("🔐 FitZen login action triggered");
  const email = context.formData?.email;
  const password = context.formData?.password;
  
  if (!email || !password) {
    context.handlers.showNotification({
      type: 'toast',
      message: '❌ Please enter email and password',
      background: '#7C3AED',
      duration: 3000
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
        websiteSlug: 'fitzen'
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      context.handlers.showNotification({
        type: 'toast',
        message: data.error || '❌ Login failed',
        background: '#7C3AED',
        duration: 3000
      });
      return;
    }
    
    console.log('✅ Login successful:', data);
    context.handlers.setData('user', data.user);
    
    context.handlers.showNotification({
      type: 'toast',
      message: \`✨ Welcome back, \${data.user.firstName || 'Champion'}!\`,
      background: '#10B981',
      duration: 2500
    });
    
    setTimeout(() => {
      window.location.href = '/fitzen/dashboard';
    }, 1000);
    
  } catch (error) {
    console.error('Login error:', error);
    context.handlers.showNotification({
      type: 'toast',
      message: '❌ Network error. Please try again.',
      background: '#EF4444',
      duration: 3000
    });
  }
`,

        handleSignup: `
  console.log("📝 FitZen signup action triggered");
  const formData = context.formData || {};
  
  const email = formData.email?.trim();
  const password = formData.password;
  const name = formData.name?.trim();
  const fitnessGoal = formData.fitnessGoal || 'general';
  
  if (!email || !password || !name) {
    context.handlers.showNotification({
      type: 'toast',
      message: '❌ Please fill all required fields',
      background: '#EF4444',
      duration: 3000
    });
    return;
  }
  
  const payload = {
    email: email.toLowerCase(),
    password: password,
    name: name,
    fitnessGoal: fitnessGoal,
    websiteSlug: 'fitzen'
  };
  
  try {
    const response = await fetch('/api/enduser-auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      context.handlers.showNotification({
        type: 'toast',
        message: data.error || '❌ Signup failed',
        background: '#EF4444',
        duration: 4000
      });
      return;
    }
    
    context.handlers.showNotification({
      type: 'toast',
      message: '✅ Account created! Welcome to FitZen! 🎉',
      background: '#10B981',
      duration: 3000
    });
    
    context.handlers.setFormData({});
    
    setTimeout(() => {
      window.location.href = '/fitzen/login';
    }, 2000);
    
  } catch (error) {
    console.error('Signup error:', error);
    context.handlers.showNotification({
      type: 'toast',
      message: '❌ Network error. Please try again.',
      background: '#EF4444',
      duration: 3000
    });
  }
`,

        clearAuth: `
  console.log("🚪 FitZen logout...");
  
  try {
    const response = await fetch('/api/enduser-auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ websiteSlug: 'fitzen' })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      context.handlers.clearAuthData();
      
      context.handlers.showNotification({
        type: "toast",
        message: "✅ Logged out successfully. See you soon! 👋",
        background: "#10B981",
        duration: 2000,
      });
      
      setTimeout(() => {
        window.location.href = data.redirectUrl || '/fitzen';
      }, 1000);
    }
  } catch (error) {
    console.error('Logout error:', error);
    context.handlers.showNotification({
      type: "toast",
      message: "❌ Logout failed",
      background: "#EF4444",
      duration: 3000
    });
  }
`,

        openModal: `
  const modalName = context.actionParams?.modal || context.actionParams?.modalName;
  if (!modalName) {
    console.error("❌ No modal name provided");
    return;
  }
  
  console.log("🎭 Opening modal:", modalName);
  context.handlers.setModalFormData({});
  context.handlers.setFieldErrors({});
  context.handlers.setActiveModal(modalName);
`,

        closeModal: `
  console.log("❌ Closing modal");
  context.handlers.setModalFormData({});
  context.handlers.setFieldErrors({});
  context.handlers.setActiveModal(null);
`,

        logWorkout: `
  console.log("📝 Logging workout");
  const formData = context.modalFormData || {};
  
  if (!formData.workoutType || !formData.duration) {
    context.handlers.showNotification({
      type: "toast",
      message: "❌ Please fill all fields",
      background: "#EF4444",
      duration: 3000
    });
    return;
  }
  
  // Simulated API call
  console.log("🚀 Workout logged:", formData);
  
  context.handlers.showNotification({
    type: "toast",
    message: "✅ Workout logged successfully! 💪",
    background: "#10B981",
    duration: 2500
  });
  
  context.handlers.setActiveModal(null);
  context.handlers.setModalFormData({});
`,
      },
    },

    pages: {
      login: {
        title: "Login - FitZen",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "💪 FitZen",
                "ui:styles": {
                  fontSize: "32px",
                  fontWeight: "900",
                  fontFamily: "'Poppins', sans-serif",
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                  letterSpacing: "-1px",
                },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "dark",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/fitzen" },
                    styles: { color: "#E8EAED", fontWeight: "600" },
                  },
                  {
                    label: "Sign Up",
                    action: "navigateToPage",
                    actionParams: { url: "/fitzen/signup" },
                    styles: {
                      color: "white",
                      background:
                        "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                      padding: "10px 24px",
                      borderRadius: "12px",
                      fontWeight: "600",
                    },
                  },
                ],
              },
            },
            styles: {
              background: "rgba(10, 14, 39, 0.8)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(124, 58, 237, 0.2)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80px",
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
                "ui:description": "Sign in to continue your fitness journey",
                "ui:id": "loginForm",
                "ui:styles": {
                  maxWidth: "480px",
                  margin: "140px auto 0",
                  padding: "48px 40px",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(30px)",
                  borderRadius: "24px",
                  boxShadow: "0 20px 60px rgba(124, 58, 237, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                },
                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "your.email@example.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                    "ui:labelStyles": {
                      color: "#E8EAED",
                      fontWeight: "600",
                      marginBottom: "8px",
                    },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "••••••••",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                    "ui:labelStyles": {
                      color: "#E8EAED",
                      fontWeight: "600",
                      marginBottom: "8px",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Sign In →",
                    action: "handleLogin",
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "16px 0",
                      background:
                        "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "16px",
                      border: "none",
                      cursor: "pointer",
                      marginTop: "8px",
                    },
                  },
                ],
                "ui:titleStyles": {
                  color: "#E8EAED",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "32px",
                  fontWeight: "800",
                  marginBottom: "12px",
                  textAlign: "center",
                },
                "ui:descriptionStyles": {
                  color: "rgba(232, 234, 237, 0.8)",
                  fontSize: "16px",
                  marginBottom: "36px",
                  textAlign: "center",
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
                    actionParams: { url: "/fitzen/signup" },
                  },
                ],
                "ui:styles": {
                  maxWidth: "480px",
                  margin: "24px auto",
                  padding: "20px",
                  background: "rgba(124, 58, 237, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(124, 58, 237, 0.2)",
                },
                "ui:linkStyles": {
                  color: "#EC4899",
                  fontWeight: "700",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background:
                "radial-gradient(ellipse at top, rgba(124, 58, 237, 0.15), transparent 50%), radial-gradient(ellipse at bottom, rgba(236, 72, 153, 0.15), transparent 50%), #0A0E27",
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
                  "© 2024 FitZen. Empowering your fitness journey. 💪",
                "ui:styles": {
                  textAlign: "center",
                  color: "rgba(232, 234, 237, 0.6)",
                  fontSize: "14px",
                },
              },
            },
            styles: {
              background: "rgba(10, 14, 39, 0.8)",
              padding: "32px",
              textAlign: "center",
              borderTop: "1px solid rgba(124, 58, 237, 0.2)",
            },
            triggers: [],
          },
        },
      },

      signup: {
        title: "Sign Up - FitZen",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "💪 FitZen",
                "ui:styles": {
                  fontSize: "32px",
                  fontWeight: "900",
                  fontFamily: "'Poppins', sans-serif",
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  cursor: "pointer",
                  letterSpacing: "-1px",
                },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "dark",
                "ui:links": [
                  {
                    label: "Home",
                    action: "navigateToPage",
                    actionParams: { url: "/fitzen" },
                  },
                  {
                    label: "Login",
                    action: "navigateToPage",
                    actionParams: { url: "/fitzen/login" },
                  },
                ],
              },
            },
            styles: {
              background: "rgba(10, 14, 39, 0.8)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(124, 58, 237, 0.2)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "80px",
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
                "ui:title": "✨ Start Your Journey",
                "ui:description":
                  "Create your account and transform your fitness",
                "ui:id": "signupForm",
                "ui:styles": {
                  maxWidth: "480px",
                  margin: "140px auto 0",
                  padding: "48px 40px",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(30px)",
                  borderRadius: "24px",
                  boxShadow: "0 20px 60px rgba(124, 58, 237, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                },
                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Full Name",
                    "ui:placeholder": "John Doe",
                    "ui:type": "text",
                    "ui:name": "name",
                    "ui:required": true,
                    "ui:labelStyles": { color: "#E8EAED", fontWeight: "600" },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "you@example.com",
                    "ui:type": "email",
                    "ui:name": "email",
                    "ui:required": true,
                    "ui:labelStyles": { color: "#E8EAED", fontWeight: "600" },
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Password",
                    "ui:placeholder": "Create strong password",
                    "ui:type": "password",
                    "ui:name": "password",
                    "ui:required": true,
                    "ui:labelStyles": { color: "#E8EAED", fontWeight: "600" },
                  },
                  {
                    "ui:widget": "selectField",
                    "ui:label": "Fitness Goal",
                    "ui:name": "fitnessGoal",
                    "ui:placeholder": "Select your goal",
                    "ui:options": [
                      { value: "weight_loss", label: "Weight Loss" },
                      { value: "muscle_gain", label: "Muscle Gain" },
                      { value: "endurance", label: "Build Endurance" },
                      { value: "flexibility", label: "Flexibility" },
                      { value: "general", label: "General Fitness" },
                    ],
                    "ui:labelStyles": { color: "#E8EAED", fontWeight: "600" },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Create Account →",
                    action: "handleSignup",
                    variant: "primary",
                    styles: {
                      width: "100%",
                      padding: "16px 0",
                      background:
                        "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "16px",
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
                    actionParams: { url: "/fitzen/login" },
                  },
                ],
                "ui:styles": {
                  maxWidth: "480px",
                  margin: "24px auto",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background:
                "radial-gradient(ellipse at top, rgba(124, 58, 237, 0.15), transparent 50%), #0A0E27",
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
                "ui:content": "© 2024 FitZen. All rights reserved.",
                "ui:styles": {
                  textAlign: "center",
                  color: "rgba(232, 234, 237, 0.6)",
                },
              },
            },
            styles: {
              background: "rgba(10, 14, 39, 0.8)",
              padding: "32px",
              borderTop: "1px solid rgba(124, 58, 237, 0.2)",
            },
            triggers: [],
          },
        },
      },

      dashboard: {
        title: "Dashboard - FitZen",
        requireAuth: true,
        redirectIfNotAuth: "/fitzen/login",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "💪 FitZen",
                "ui:styles": {
                  fontSize: "28px",
                  fontWeight: "900",
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              },
              userInfo: {
                "ui:widget": "navLinks",
                "ui:theme": "dark",
                "ui:links": [
                  {
                    label: "{{auth.user?.email || 'User'}}",
                    action: "",
                    styles: { color: "#E8EAED" },
                  },
                  {
                    label: "Logout",
                    action: "clearAuth",
                    styles: { color: "#EC4899", fontWeight: "700" },
                  },
                ],
              },
            },
            styles: {
              background: "rgba(10, 14, 39, 0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(124, 58, 237, 0.2)",
              padding: "18px 50px",
              position: "fixed",
              width: "100%",
              zIndex: "1000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "75px",
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
              logWorkout: {
                "ui:title": "Log Workout",
                "ui:theme": "dark",
                "ui:styles": {
                  maxWidth: "500px",
                  background: "rgba(10, 14, 39, 0.95)",
                  padding: "40px",
                },
                "ui:fields": [
                  {
                    name: "workoutType",
                    label: "Workout Type",
                    type: "text",
                    placeholder: "e.g., Running, Weightlifting",
                    required: true,
                  },
                  {
                    name: "duration",
                    label: "Duration (minutes)",
                    type: "number",
                    placeholder: "30",
                    required: true,
                  },
                  {
                    name: "caloriesBurned",
                    label: "Calories Burned",
                    type: "number",
                    placeholder: "250",
                    required: false,
                  },
                ],
                "ui:actions": [
                  {
                    label: "Log Workout",
                    action: "logWorkout",
                    variant: "primary",
                  },
                  {
                    label: "Cancel",
                    action: "closeModal",
                    variant: "outline",
                  },
                ],
              },
            },
            uiSchema: {
              welcomeCard: {
                "ui:widget": "card",
                "ui:title": "💪 Welcome Back, Champion!",
                "ui:description": "Let's crush today's goals together",
                "ui:styles": {
                  padding: "48px",
                  marginTop: "100px",
                  marginBottom: "40px",
                  background:
                    "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
                  backdropFilter: "blur(30px)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                  borderRadius: "24px",
                  textAlign: "center",
                },
              },

              statsGrid: {
                "ui:widget": "gridLayout",
                "ui:columns": 4,
                "ui:gap": "24px",
                "ui:styles": { marginBottom: "40px" },
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "🔥 245",
                    "ui:description": "Calories Burned Today",
                    "ui:styles": {
                      padding: "32px 24px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                    },
                    "ui:titleStyles": {
                      fontSize: "2.5rem",
                      fontWeight: "900",
                      background:
                        "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "💪 12",
                    "ui:description": "Workouts This Week",
                    "ui:styles": {
                      padding: "32px 24px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "⏱️ 45m",
                    "ui:description": "Average Duration",
                    "ui:styles": {
                      padding: "32px 24px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🏆 28",
                    "ui:description": "Day Streak",
                    "ui:styles": {
                      padding: "32px 24px",
                      textAlign: "center",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                    },
                  },
                ],
              },

              quickActions: {
                "ui:widget": "flexLayout",
                "ui:direction": "row",
                "ui:gap": "16px",
                "ui:styles": { marginBottom: "50px", justifyContent: "center" },
                "ui:children": [
                  {
                    "ui:widget": "button",
                    "ui:label": "📝 Log Workout",
                    "ui:action": "openModal",
                    "ui:actionParams": { modal: "logWorkout" },
                    "ui:styles": {
                      padding: "16px 32px",
                      background:
                        "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                      color: "white",
                      borderRadius: "16px",
                      fontSize: "16px",
                      fontWeight: "700",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "📊 View Progress",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/fitzen/progress" },
                    "ui:styles": {
                      padding: "16px 32px",
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                      border: "2px solid rgba(124, 58, 237, 0.5)",
                      borderRadius: "16px",
                      fontSize: "16px",
                      fontWeight: "700",
                    },
                  },
                ],
              },
            },
            styles: {
              padding: "90px 40px 50px",
              background:
                "radial-gradient(ellipse at top, rgba(124, 58, 237, 0.1), transparent 70%), #0A0E27",
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
                "ui:content": "© 2024 FitZen. All rights reserved.",
                "ui:styles": {
                  textAlign: "center",
                  color: "rgba(232, 234, 237, 0.6)",
                },
              },
            },
            styles: {
              background: "rgba(10, 14, 39, 0.8)",
              padding: "32px",
              borderTop: "1px solid rgba(124, 58, 237, 0.2)",
            },
            triggers: [],
          },
        },
      },
    },

    // HOME PAGE (Landing)
    components: {
      navbar: {
        table: {},
        modal: {},
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "💪 FitZen",
            "ui:styles": {
              fontSize: "32px",
              fontWeight: "900",
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
              letterSpacing: "-1px",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "dark",
            "ui:links": [
              {
                label: "Home",
                action: "navigateToPage",
                actionParams: { url: "/fitzen" },
                styles: { color: "#E8EAED", fontWeight: "600" },
              },
              {
                label: "Features",
                action: "navigateToPage",
                actionParams: { url: "/fitzen#features" },
                styles: { color: "#E8EAED", fontWeight: "600" },
              },
              {
                label: "Login",
                action: "navigateToPage",
                actionParams: { url: "/fitzen/login" },
                styles: { color: "#E8EAED", fontWeight: "600" },
              },
              {
                label: "Get Started",
                action: "navigateToPage",
                actionParams: { url: "/fitzen/signup" },
                styles: {
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                  color: "white",
                  padding: "12px 28px",
                  borderRadius: "14px",
                  fontWeight: "700",
                  border: "none",
                },
              },
            ],
          },
        },
        styles: {
          background: "rgba(10, 14, 39, 0.8)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(124, 58, 237, 0.2)",
          padding: "20px 50px",
          position: "fixed",
          width: "100%",
          zIndex: "1000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
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
          heroSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "40px",
            "ui:styles": {
              padding: "180px 40px 100px",
              textAlign: "center",
              background:
                "radial-gradient(ellipse at top, rgba(124, 58, 237, 0.2), transparent 70%), radial-gradient(ellipse at bottom, rgba(236, 72, 153, 0.15), transparent 70%)",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "Transform Your Body",
                "ui:level": "h1",
                "ui:styles": {
                  fontSize: "5rem",
                  fontWeight: "900",
                  fontFamily: "'Poppins', sans-serif",
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "24px",
                  lineHeight: "1.1",
                  letterSpacing: "-2px",
                },
              },
              {
                "ui:widget": "paragraph",
                "ui:text":
                  "Join thousands of people achieving their fitness goals with our AI-powered training platform",
                "ui:styles": {
                  fontSize: "1.5rem",
                  color: "rgba(232, 234, 237, 0.8)",
                  maxWidth: "800px",
                  lineHeight: "1.6",
                  marginBottom: "24px",
                },
              },
              {
                "ui:widget": "flexLayout",
                "ui:direction": "row",
                "ui:gap": "20px",
                "ui:justify": "center",
                "ui:children": [
                  {
                    "ui:widget": "button",
                    "ui:label": "Start Free Trial →",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "/fitzen/signup" },
                    "ui:styles": {
                      padding: "20px 48px",
                      fontSize: "1.2rem",
                      fontWeight: "800",
                      background:
                        "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "16px",
                      cursor: "pointer",
                      boxShadow: "0 10px 40px rgba(124, 58, 237, 0.4)",
                    },
                  },
                  {
                    "ui:widget": "button",
                    "ui:label": "Watch Demo",
                    "ui:action": "navigateToPage",
                    "ui:actionParams": { url: "#demo" },
                    "ui:styles": {
                      padding: "20px 48px",
                      fontSize: "1.2rem",
                      fontWeight: "800",
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                      border: "2px solid rgba(124, 58, 237, 0.5)",
                      borderRadius: "16px",
                      cursor: "pointer",
                      backdropFilter: "blur(10px)",
                    },
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
              padding: "80px 40px",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
              borderTop: "1px solid rgba(124, 58, 237, 0.1)",
              borderBottom: "1px solid rgba(124, 58, 237, 0.1)",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            },
            "ui:children": [
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "12px",
                "ui:styles": { textAlign: "center", minWidth: "200px" },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "50K+",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "4rem",
                      fontWeight: "900",
                      background:
                        "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    },
                  },
                  {
                    "ui:widget": "text",
                    "ui:content": "Active Users",
                    "ui:styles": {
                      fontSize: "1.2rem",
                      color: "rgba(232, 234, 237, 0.7)",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    },
                  },
                ],
              },
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "12px",
                "ui:styles": { textAlign: "center", minWidth: "200px" },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "200+",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "4rem",
                      fontWeight: "900",
                      background:
                        "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    },
                  },
                  {
                    "ui:widget": "text",
                    "ui:content": "Workout Programs",
                    "ui:styles": {
                      fontSize: "1.2rem",
                      color: "rgba(232, 234, 237, 0.7)",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    },
                  },
                ],
              },
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "12px",
                "ui:styles": { textAlign: "center", minWidth: "200px" },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "98%",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "4rem",
                      fontWeight: "900",
                      background:
                        "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    },
                  },
                  {
                    "ui:widget": "text",
                    "ui:content": "Success Rate",
                    "ui:styles": {
                      fontSize: "1.2rem",
                      color: "rgba(232, 234, 237, 0.7)",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    },
                  },
                ],
              },
            ],
          },

          featuresSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "80px",
            "ui:styles": {
              padding: "120px 40px",
              background: "transparent",
            },
            "ui:children": [
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:gap": "20px",
                "ui:styles": {
                  textAlign: "center",
                  maxWidth: "800px",
                  margin: "0 auto",
                },
                "ui:children": [
                  {
                    "ui:widget": "heading",
                    "ui:text": "Everything You Need",
                    "ui:level": "h2",
                    "ui:styles": {
                      fontSize: "3.5rem",
                      fontWeight: "900",
                      color: "#E8EAED",
                      fontFamily: "'Poppins', sans-serif",
                    },
                  },
                  {
                    "ui:widget": "paragraph",
                    "ui:text":
                      "Powerful features to help you achieve your fitness goals faster",
                    "ui:styles": {
                      fontSize: "1.3rem",
                      color: "rgba(232, 234, 237, 0.7)",
                      lineHeight: "1.6",
                    },
                  },
                ],
              },
              {
                "ui:widget": "gridLayout",
                "ui:columns": 3,
                "ui:gap": "32px",
                "ui:children": [
                  {
                    "ui:widget": "card",
                    "ui:title": "🏋️ Personalized Plans",
                    "ui:description":
                      "AI-powered workout plans tailored to your fitness level and goals",
                    "ui:styles": {
                      padding: "40px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "24px",
                      textAlign: "center",
                    },
                    "ui:titleStyles": {
                      fontSize: "1.8rem",
                      marginBottom: "16px",
                      color: "#E8EAED",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "📊 Progress Tracking",
                    "ui:description":
                      "Track your workouts, calories, and progress with detailed analytics",
                    "ui:styles": {
                      padding: "40px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "24px",
                      textAlign: "center",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "👥 Community",
                    "ui:description":
                      "Connect with like-minded people and stay motivated together",
                    "ui:styles": {
                      padding: "40px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "24px",
                      textAlign: "center",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🎯 Goal Setting",
                    "ui:description":
                      "Set SMART goals and get guided step-by-step to achieve them",
                    "ui:styles": {
                      padding: "40px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "24px",
                      textAlign: "center",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "🍎 Nutrition Plans",
                    "ui:description":
                      "Personalized meal plans and nutrition guidance from experts",
                    "ui:styles": {
                      padding: "40px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "24px",
                      textAlign: "center",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "⚡ Live Classes",
                    "ui:description":
                      "Join live workout sessions with certified trainers daily",
                    "ui:styles": {
                      padding: "40px",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(30px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "24px",
                      textAlign: "center",
                    },
                  },
                ],
              },
            ],
          },

          ctaSection: {
            "ui:widget": "container",
            "ui:direction": "column",
            "ui:gap": "32px",
            "ui:styles": {
              padding: "120px 40px",
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)",
              backdropFilter: "blur(20px)",
              borderRadius: "32px",
              margin: "80px 40px",
              border: "1px solid rgba(124, 58, 237, 0.2)",
            },
            "ui:children": [
              {
                "ui:widget": "heading",
                "ui:text": "Ready to Transform?",
                "ui:level": "h2",
                "ui:styles": {
                  fontSize: "3.5rem",
                  fontWeight: "900",
                  color: "#E8EAED",
                  marginBottom: "16px",
                  fontFamily: "'Poppins', sans-serif",
                },
              },
              {
                "ui:widget": "paragraph",
                "ui:text":
                  "Join FitZen today and start your journey to a healthier, stronger you",
                "ui:styles": {
                  fontSize: "1.3rem",
                  color: "rgba(232, 234, 237, 0.8)",
                  marginBottom: "24px",
                },
              },
              {
                "ui:widget": "button",
                "ui:label": "Get Started Free →",
                "ui:action": "navigateToPage",
                "ui:actionParams": { url: "/fitzen/signup" },
                "ui:styles": {
                  padding: "20px 50px",
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  boxShadow: "0 15px 50px rgba(124, 58, 237, 0.5)",
                  margin: "0 auto",
                },
              },
            ],
          },
        },
        styles: {
          padding: "0",
          background: "#0A0E27",
          minHeight: "100vh",
        },
        triggers: [],
      },

      footer: {
        table: {},
        modal: {},
        uiSchema: {
          footerHeading: {
            "ui:widget": "heading",
            "ui:text": "💪 FitZen",
            "ui:level": "h3",
            "ui:styles": {
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "900",
              background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "16px",
            },
          },
          footerDesc: {
            "ui:widget": "paragraph",
            "ui:text":
              "Empowering your fitness journey with AI-powered training and community support",
            "ui:styles": {
              textAlign: "center",
              color: "rgba(232, 234, 237, 0.6)",
              maxWidth: "600px",
              margin: "0 auto 32px",
            },
          },
          socialIcons: {
            "ui:widget": "socialIcons",
            "ui:size": "large",
            "ui:variant": "colored",
            "ui:icons": [
              { platform: "facebook", url: "https://facebook.com/fitzen" },
              { platform: "twitter", url: "https://twitter.com/fitzen" },
              { platform: "instagram", url: "https://instagram.com/fitzen" },
              { platform: "youtube", url: "https://youtube.com/fitzen" },
            ],
          },
          divider: {
            "ui:widget": "divider",
            "ui:spacing": "large",
            "ui:color": "rgba(124, 58, 237, 0.2)",
          },
          footerText: {
            "ui:widget": "text",
            "ui:content":
              "© 2024 FitZen. Transforming lives through fitness. All rights reserved.",
            "ui:styles": {
              textAlign: "center",
              color: "rgba(232, 234, 237, 0.5)",
              fontSize: "14px",
            },
          },
        },
        styles: {
          background: "rgba(10, 14, 39, 0.8)",
          backdropFilter: "blur(20px)",
          padding: "60px 40px 40px",
          borderTop: "1px solid rgba(124, 58, 237, 0.2)",
        },
        triggers: [],
      },
    },

    resolvedAPIs: {},
  },
  {
    title: "HotelHub - Reservation Management",
    slug: "hotelhub",
    projectUUID: "hotel-hotelhub",
    taskUUID: "hotel001",
    status: "Active",
    isTemplate: false,
    templateCategory: "E-commerce",
    organizationId: "6981d64fa9b6db6a9fd3cb9c",
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
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
                  background: "black",
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
    title: "ShopZone - Modern E-commerce",
    slug: "shopzone",
    projectUUID: "ecom-shopzone",
    taskUUID: "ecom001",
    status: "Active",
    accountValidation: true,
    otpValidation: false,
    isAnonymous: false,
    isTemplate: true, // Mark as global template
    templateCategory: "E-commerce", // Category (E-commerce, Portfolio, Dashboard, Landing Page, Blog, Other)
    organizationId: null,
    createdBy: "000000000000000000000000",

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
    isTemplate: true, // Mark as global template
    templateCategory: "E-commerce", // Category (E-commerce, Portfolio, Dashboard, Landing Page, Blog, Other)
    organizationId: null,
    createdBy: "000000000000000000000000",

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
    isTemplate: true, // Mark as global template
    templateCategory: "E-commerce", // Category (E-commerce, Portfolio, Dashboard, Landing Page, Blog, Other)
    organizationId: null,
    createdBy: "000000000000000000000000",
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
