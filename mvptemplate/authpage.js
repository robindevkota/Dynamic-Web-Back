const mongoose = require("mongoose");
const PageConfig = require("../models/PageConfig");

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
        "checkout.complete",
      ],
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
                  { label: "Home", action: "navigate:/shopzone" },
                  { label: "Sign Up", action: "navigate:/shopzone/signup" },
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
                    action: "api:auth.login",
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
                    action: "navigate:/shopzone/forgot-password",
                  },
                  {
                    prefix: "Don't have an account?",
                    label: "Sign Up",
                    action: "navigate:/shopzone/signup",
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
                  { label: "Home", action: "navigate:/shopzone" },
                  { label: "Login", action: "navigate:/shopzone/login" },
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
                    action: "api:auth.signup",
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
                    action: "navigate:/shopzone/login",
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
                  { label: "Home", action: "navigate:/shopzone" },
                  { label: "Login", action: "navigate:/shopzone/login" },
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
                    action: "api:auth.forgot",
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
                    action: "navigate:/shopzone/login",
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

      // 🔹 EXISTING PAGES (Cart, Categories) remain the same but with updated navbar
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
                  { label: "Home", action: "navigate:/shopzone" },
                  {
                    label: "Categories",
                    action: "navigate:/shopzone/categories",
                  },
                  { label: "Cart (3)", action: "navigate:/shopzone/cart" },
                  {
                    label:
                      "{{auth.token ? 'Welcome, ' + auth.user.email : 'Login'}}",
                    action: "{{auth.token ? '' : 'navigate:/shopzone/login'}}",
                  },
                  {
                    label: "{{auth.token ? 'Logout' : ''}}",
                    action: "clearAuth+reload",
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

              cartItem1: {
                "ui:widget": "card",
                "ui:title": "Wireless Headphones",
                "ui:description":
                  "Premium noise-cancelling headphones with 30-hour battery life. Quantity: 1",
                "ui:image":
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
                "ui:styles": {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  maxWidth: "900px",
                  margin: "0 auto 20px",
                  padding: "25px",
                },
              },

              cartItem2: {
                "ui:widget": "card",
                "ui:title": "Smart Watch Series 7",
                "ui:description":
                  "Fitness tracker with heart rate monitor and GPS. Quantity: 1",
                "ui:image":
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
                "ui:styles": {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  maxWidth: "900px",
                  margin: "0 auto 20px",
                  padding: "25px",
                },
              },

              cartItem3: {
                "ui:widget": "card",
                "ui:title": "Laptop Stand Aluminum",
                "ui:description":
                  "Ergonomic adjustable laptop stand for desk. Quantity: 2",
                "ui:image":
                  "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
                "ui:styles": {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  maxWidth: "900px",
                  margin: "0 auto 20px",
                  padding: "25px",
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
                  "Subtotal: $458.00 | Shipping: $15.00 | Tax: $47.30 | Total: $520.30",
                "ui:action": "navigate:/shopzone/checkout",
                "ui:buttonLabel": "Proceed to Checkout 💳",
                "ui:styles": {
                  maxWidth: "900px",
                  margin: "0 auto",
                  padding: "30px",
                  background:
                    "linear-gradient(135deg, #47b81aff 0%, #764ba2 100%)",
                  color: "white",
                  textAlign: "center",
                },
              },
            },
            styles: {
              padding: "120px 40px 80px",
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
              padding: "40px",
              borderTop: "3px solid #667eea",
            },
            triggers: [],
          },
        },
      },

      categories: {
        title: "Product Categories",
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
                },
              },
              links: {
                "ui:widget": "navLinks",
                "ui:theme": "light",
                "ui:links": [
                  { label: "Home", action: "navigate:/shopzone" },
                  {
                    label: "Categories",
                    action: "navigate:/shopzone/categories",
                  },
                  { label: "Cart (3)", action: "navigate:/shopzone/cart" },
                  {
                    label:
                      "{{auth.token ? 'Welcome, ' + auth.user.email : 'Login'}}",
                    action: "{{auth.token ? '' : 'navigate:/shopzone/login'}}",
                  },
                  {
                    label: "{{auth.token ? 'Logout' : ''}}",
                    action: "clearAuth+reload",
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
            modal: {},
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

              spacer1: { "ui:widget": "spacer", "ui:height": 80 },

              electronicsCard: {
                "ui:widget": "card",
                "ui:title": "💻 Electronics",
                "ui:description":
                  "Latest gadgets, smartphones, laptops, and tech accessories",
                "ui:image":
                  "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
                "ui:action": "navigate:/shopzone",
                "ui:buttonLabel": "Browse Electronics",
                "ui:styles": {
                  maxWidth: "800px",
                  margin: "0 auto 40px",
                  minHeight: "280px",
                },
                "ui:imageStyles": {
                  height: "250px",
                  objectFit: "cover",
                },
              },

              fashionCard: {
                "ui:widget": "card",
                "ui:title": "👗 Fashion & Apparel",
                "ui:description":
                  "Trending clothing, shoes, and accessories for every style",
                "ui:image":
                  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
                "ui:action": "navigate:/shopzone",
                "ui:buttonLabel": "Browse Fashion",
                "ui:styles": {
                  maxWidth: "800px",
                  margin: "0 auto 40px",
                  minHeight: "280px",
                },
                "ui:imageStyles": {
                  height: "250px",
                  objectFit: "cover",
                },
              },

              homeCard: {
                "ui:widget": "card",
                "ui:title": "🏠 Home & Living",
                "ui:description":
                  "Furniture, decor, kitchen essentials, and more for your space",
                "ui:image":
                  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=400&fit=crop",
                "ui:action": "navigate:/shopzone",
                "ui:buttonLabel": "Browse Home & Living",
                "ui:styles": {
                  maxWidth: "800px",
                  margin: "0 auto 40px",
                  minHeight: "280px",
                },
                "ui:imageStyles": {
                  height: "250px",
                  objectFit: "cover",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
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
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              { label: "Home", action: "navigate:/shopzone" },
              { label: "Categories", action: "navigate:/shopzone/categories" },
              { label: "Cart (3)", action: "navigate:/shopzone/cart" },

              // ✅ Show "Welcome, User" if logged in, else "Login"
              {
                label:
                  "{{auth.token ? 'Welcome, ' + auth.user.email : 'Login'}}",
                action: "{{auth.token ? '' : 'navigate:/shopzone/login'}}",
              },

              // ✅ Show Logout button if logged in
              {
                label: "{{auth.token ? 'Logout' : ''}}",
                action: "clearAuth+reload",
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
 {
    title: "Ultimate Widget Showcase - Complete Component Library",
    slug: "widget-showcase",
    projectUUID: "showcase-master",
    taskUUID: "master001",
    status: "Active",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,

    initialization: {
      globalCSS:
        "/* Modern CSS Reset & Base Styles */ * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 16px; line-height: 1.6; color: #1e293b; background: #ffffff; overflow-x: hidden; } html { scroll-behavior: smooth; } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } } @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } } @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } } @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } } .animate-fade-in { animation: fadeInUp 0.8s ease-out forwards; } .animate-slide-left { animation: slideInLeft 0.8s ease-out forwards; } .animate-slide-right { animation: slideInRight 0.8s ease-out forwards; } .animate-pulse { animation: pulse 2s ease-in-out infinite; } .animate-float { animation: float 3s ease-in-out infinite; } button { cursor: pointer; transition: all 0.3s ease; } button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); } section { animation: fadeInUp 1s ease-out; } .card { transition: all 0.3s ease; } .card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); } .gradient-text { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }",
      resources: [
        "api.users",
        "api.products",
        "api.posts",
        "api.analytics",
        "auth.login",
        "auth.signup",
      ],
    },

    pages: {
      home: {
        title: "Home - Widget Showcase",
        components: {
          navbar: {
            table: {},
            modal: {
              welcomeModal: {
                "ui:title": "🚀 Welcome to Widget Showcase",
                "ui:theme": "light",
                "ui:content":
                  "Explore 50+ interactive widgets and components for your next project.",
                "ui:fields": [
                  {
                    label: "Your Name",
                    type: "text",
                    placeholder: "Enter your name",
                    name: "name",
                    required: true,
                  },
                  {
                    label: "Email",
                    type: "email",
                    placeholder: "your@email.com",
                    name: "email",
                    required: true,
                  },
                ],
                "ui:actions": [
                  {
                    label: "Skip Tour",
                    action: "closeModal",
                    variant: "secondary",
                  },
                  {
                    label: "Start Exploring",
                    action: "closeModal",
                    variant: "primary",
                  },
                ],
              },
            },
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🎨 WidgetMaster",
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
                  { label: "Home", action: "navigate:/widget-showcase" },
                  {
                    label: "Basic UI",
                    action: "navigate:/widget-showcase/basic",
                  },
                  {
                    label: "Layout",
                    action: "navigate:/widget-showcase/layout",
                  },
                  { label: "Data", action: "navigate:/widget-showcase/data" },
                  {
                    label: "Interactive",
                    action: "navigate:/widget-showcase/interactive",
                  },
                  { label: "Forms", action: "navigate:/widget-showcase/forms" },
                  {
                    label: "Social",
                    action: "navigate:/widget-showcase/social",
                  },
                  {
                    label: "Pricing",
                    action: "navigate:/widget-showcase/pricing",
                  },
                  {
                    label: "Advanced",
                    action: "navigate:/widget-showcase/advanced",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
            triggers: [
              { event: "load", action: "openModal:welcomeModal", delay: 1000 },
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
                "ui:widget": "hero",
                "ui:title": "Build Anything 🎨",
                "ui:subtitle":
                  "50+ interactive widgets, 15 layout components, and endless possibilities for your next project.",
                "ui:cta": {
                  label: "Explore Widgets",
                  action: "navigate:/widget-showcase/basic",
                },
                "ui:secondaryCta": {
                  label: "View Demos",
                  action: "scroll:#demos",
                },
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  minHeight: "80vh",
                  padding: "180px 40px 100px",
                  textAlign: "center",
                  color: "white",
                },
              },
              statsSection: {
                "ui:widget": "columns",
                "ui:ratio": "1:1:1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "50+",
                    "ui:label": "Widgets",
                    "ui:color": "#667eea",
                  },
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "15+",
                    "ui:label": "Layouts",
                    "ui:color": "#764ba2",
                  },
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "10+",
                    "ui:label": "Animations",
                    "ui:color": "#f093fb",
                  },
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "∞",
                    "ui:label": "Possibilities",
                    "ui:color": "#4facfe",
                  },
                ],
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "80px auto",
                },
              },
              featureGrid: {
                "ui:widget": "responsiveGrid",
                "ui:columns": { desktop: 3, tablet: 2, mobile: 1 },
                "ui:gap": "30px",
                "ui:items": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Drag & Drop Builder",
                    "ui:description":
                      "Intuitive visual editor with real-time preview",
                    "ui:icon": "🎯",
                    "ui:styles": { animation: "fadeInUp 0.6s ease-out" },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Responsive Design",
                    "ui:description": "Auto-adapting layouts for all devices",
                    "ui:icon": "📱",
                    "ui:styles": {
                      animation: "fadeInUp 0.6s ease-out 0.2s both",
                    },
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Advanced Animations",
                    "ui:description":
                      "Smooth transitions and interactive effects",
                    "ui:icon": "✨",
                    "ui:styles": {
                      animation: "fadeInUp 0.6s ease-out 0.4s both",
                    },
                  },
                ],
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "60px auto",
                  padding: "40px 20px",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background:
                "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)",
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
                  "© 2024 WidgetMaster - The Ultimate Component Library",
                "ui:styles": {
                  textAlign: "center",
                  color: "#94a3b8",
                },
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
      basic: {
        title: "Basic UI Widgets",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🎨 WidgetMaster",
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
                  { label: "Home", action: "navigate:/widget-showcase" },
                  {
                    label: "Basic UI",
                    action: "navigate:/widget-showcase/basic",
                  },
                  {
                    label: "Layout",
                    action: "navigate:/widget-showcase/layout",
                  },
                  { label: "Data", action: "navigate:/widget-showcase/data" },
                  {
                    label: "Interactive",
                    action: "navigate:/widget-showcase/interactive",
                  },
                  { label: "Forms", action: "navigate:/widget-showcase/forms" },
                  {
                    label: "Social",
                    action: "navigate:/widget-showcase/social",
                  },
                  {
                    label: "Pricing",
                    action: "navigate:/widget-showcase/pricing",
                  },
                  {
                    label: "Advanced",
                    action: "navigate:/widget-showcase/advanced",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              hero: {
                "ui:widget": "hero",
                "ui:title": "Basic UI Components ✨",
                "ui:subtitle":
                  "Essential building blocks for your interface - text, images, icons and more",
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  minHeight: "300px",
                  padding: "150px 40px 80px",
                  textAlign: "center",
                  color: "white",
                },
              },
              textComponents: {
                "ui:widget": "columns",
                "ui:ratio": "1:1:1",
                "ui:gap": "30px",
                "ui:columns": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Text Widget",
                    "ui:description":
                      "Simple text content with rich styling options",
                    "ui:styles": { animation: "fadeInUp 0.6s ease-out" },
                    "ui:children": [
                      {
                        "ui:widget": "text",
                        "ui:content":
                          "This is a sample text widget with customizable content and styling options for your interface.",
                        "ui:styles": {
                          fontSize: "16px",
                          color: "#64748b",
                          lineHeight: "1.6",
                        },
                      },
                    ],
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Heading Widget",
                    "ui:description":
                      "Section headings with multiple levels (h1-h6)",
                    "ui:styles": {
                      animation: "fadeInUp 0.6s ease-out 0.2s both",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "heading",
                        "ui:text": "Sample Heading",
                        "ui:level": "h3",
                        "ui:styles": {
                          color: "#1e293b",
                          marginBottom: "15px",
                        },
                      },
                    ],
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Paragraph Widget",
                    "ui:description": "Styled paragraph text with formatting",
                    "ui:styles": {
                      animation: "fadeInUp 0.6s ease-out 0.4s both",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "paragraph",
                        "ui:text":
                          "This is a paragraph widget perfect for longer text content with proper spacing and readability.",
                        "ui:styles": {
                          lineHeight: "1.8",
                          color: "#64748b",
                        },
                      },
                    ],
                  },
                ],
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "60px auto",
                },
              },
              mediaComponents: {
                "ui:widget": "columns",
                "ui:ratio": "1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Image Widget",
                    "ui:description":
                      "Images with captions and advanced styling",
                    "ui:styles": { animation: "fadeInUp 0.8s ease-out" },
                    "ui:children": [
                      {
                        "ui:widget": "image",
                        "ui:src":
                          "https://images.unsplash.com/photo-1682687980961-78fa83781450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        "ui:alt": "Beautiful landscape",
                        "ui:caption": "Sample image with caption",
                        "ui:styles": {
                          textAlign: "center",
                        },
                        "ui:imageStyles": {
                          maxWidth: "100%",
                          borderRadius: "8px",
                        },
                      },
                    ],
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Video Widget",
                    "ui:description":
                      "Embedded videos from YouTube and other platforms",
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "video",
                        "ui:url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        "ui:autoplay": false,
                        "ui:styles": {
                          borderRadius: "8px",
                          overflow: "hidden",
                        },
                      },
                    ],
                  },
                ],
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "60px auto",
                },
              },
              iconShowcase: {
                "ui:widget": "card",
                "ui:title": "Icon Widget",
                "ui:description":
                  "Display icons using emojis, Font Awesome, or Material icons",
                "ui:styles": {
                  maxWidth: "600px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out",
                  textAlign: "center",
                },
                "ui:children": [
                  {
                    "ui:widget": "flexLayout",
                    "ui:direction": "row",
                    "ui:justify": "center",
                    "ui:align": "center",
                    "ui:gap": "30px",
                    "ui:wrap": true,
                    "ui:children": [
                      {
                        "ui:widget": "icon",
                        "ui:emoji": "🚀",
                        "ui:size": "large",
                        "ui:styles": {
                          fontSize: "48px",
                        },
                      },
                      {
                        "ui:widget": "icon",
                        "ui:emoji": "⭐",
                        "ui:size": "large",
                        "ui:styles": {
                          fontSize: "48px",
                        },
                      },
                      {
                        "ui:widget": "icon",
                        "ui:emoji": "🎯",
                        "ui:size": "large",
                        "ui:styles": {
                          fontSize: "48px",
                        },
                      },
                      {
                        "ui:widget": "icon",
                        "ui:emoji": "✨",
                        "ui:size": "large",
                        "ui:styles": {
                          fontSize: "48px",
                        },
                      },
                    ],
                  },
                ],
              },
              alertShowcase: {
                "ui:widget": "card",
                "ui:title": "Alert Widget",
                "ui:description":
                  "Notification messages with different types and dismiss options",
                "ui:styles": {
                  maxWidth: "600px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out 0.2s both",
                },
                "ui:children": [
                  {
                    "ui:widget": "alert",
                    "ui:message":
                      "This is an information alert! It provides important context to your users.",
                    "ui:type": "info",
                    "ui:dismissible": true,
                    "ui:styles": {
                      marginBottom: "15px",
                    },
                  },
                  {
                    "ui:widget": "alert",
                    "ui:message":
                      "Success! Your action was completed successfully.",
                    "ui:type": "success",
                    "ui:dismissible": true,
                    "ui:styles": {
                      marginBottom: "15px",
                    },
                  },
                  {
                    "ui:widget": "alert",
                    "ui:message":
                      "Warning: Please check your configuration settings.",
                    "ui:type": "warning",
                    "ui:dismissible": true,
                    "ui:styles": {
                      marginBottom: "15px",
                    },
                  },
                ],
              },
              badgeShowcase: {
                "ui:widget": "card",
                "ui:title": "Badge Widget",
                "ui:description":
                  "Small tags and labels for status, categories, or counts",
                "ui:styles": {
                  maxWidth: "600px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out 0.4s both",
                  textAlign: "center",
                },
                "ui:children": [
                  {
                    "ui:widget": "flexLayout",
                    "ui:direction": "row",
                    "ui:justify": "center",
                    "ui:align": "center",
                    "ui:gap": "15px",
                    "ui:wrap": true,
                    "ui:children": [
                      {
                        "ui:widget": "badge",
                        "ui:text": "New",
                        "ui:variant": "primary",
                      },
                      {
                        "ui:widget": "badge",
                        "ui:text": "Featured",
                        "ui:variant": "success",
                      },
                      {
                        "ui:widget": "badge",
                        "ui:text": "Popular",
                        "ui:variant": "warning",
                      },
                      {
                        "ui:widget": "badge",
                        "ui:text": "Limited",
                        "ui:variant": "danger",
                      },
                    ],
                  },
                ],
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "#f8fafc",
              minHeight: "100vh",
            },
            triggers: [],
          },
        },
      },

      layout: {
        title: "Layout Components - Practical Examples",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🎨 WidgetMaster",
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
                  { label: "Home", action: "navigate:/widget-showcase" },
                  {
                    label: "Basic UI",
                    action: "navigate:/widget-showcase/basic",
                  },
                  {
                    label: "Layout",
                    action: "navigate:/widget-showcase/layout",
                  },
                  { label: "Data", action: "navigate:/widget-showcase/data" },
                  {
                    label: "Interactive",
                    action: "navigate:/widget-showcase/interactive",
                  },
                  { label: "Forms", action: "navigate:/widget-showcase/forms" },
                  {
                    label: "Social",
                    action: "navigate:/widget-showcase/social",
                  },
                  {
                    label: "Pricing",
                    action: "navigate:/widget-showcase/pricing",
                  },
                  {
                    label: "Advanced",
                    action: "navigate:/widget-showcase/advanced",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              hero: {
                "ui:widget": "hero",
                "ui:title": "Real Layout Examples 📐",
                "ui:subtitle":
                  "See how layout components work together to build complete pages",
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  minHeight: "300px",
                  padding: "150px 40px 80px",
                  textAlign: "center",
                  color: "#1e293b",
                },
              },

              // EXAMPLE 1: DASHBOARD LAYOUT
              dashboardExample: {
                "ui:widget": "card",
                "ui:title": "🚀 Dashboard Layout",
                "ui:description":
                  "Complete dashboard using sidebar layout, grids, and containers",
                "ui:styles": {
                  maxWidth: "1400px",
                  margin: "40px auto",
                  animation: "fadeInUp 0.8s ease-out",
                },
                "ui:children": [
                  {
                    "ui:widget": "sidebarLayout",
                    "ui:sidebar": {
                      "ui:widget": "container",
                      "ui:children": [
                        {
                          "ui:widget": "heading",
                          "ui:text": "Dashboard",
                          "ui:level": "h3",
                          "ui:styles": {
                            color: "#1e293b",
                            marginBottom: "30px",
                          },
                        },
                        {
                          "ui:widget": "navLinks",
                          "ui:links": [
                            {
                              label: "📊 Overview",
                              action: "navigate:dashboard",
                            },
                            { label: "👥 Users", action: "navigate:users" },
                            {
                              label: "📈 Analytics",
                              action: "navigate:analytics",
                            },
                            {
                              label: "⚙️ Settings",
                              action: "navigate:settings",
                            },
                            {
                              label: "📋 Projects",
                              action: "navigate:projects",
                            },
                            {
                              label: "🔔 Notifications",
                              action: "navigate:notifications",
                            },
                          ],
                          "ui:theme": "light",
                          "ui:direction": "column",
                        },
                      ],
                      "ui:styles": {
                        padding: "30px 20px",
                        background: "#f8fafc",
                        height: "100%",
                      },
                    },
                    "ui:main": {
                      "ui:widget": "container",
                      "ui:children": [
                        {
                          "ui:widget": "flexLayout",
                          "ui:direction": "row",
                          "ui:justify": "space-between",
                          "ui:align": "center",
                          "ui:children": [
                            {
                              "ui:widget": "heading",
                              "ui:text": "Overview",
                              "ui:level": "h2",
                            },
                            {
                              "ui:widget": "button",
                              "ui:label": "New Project",
                              "ui:action": "createProject",
                              "ui:variant": "primary",
                            },
                          ],
                        },
                        {
                          "ui:widget": "divider",
                          "ui:styles": { margin: "20px 0" },
                        },
                        {
                          "ui:widget": "responsiveGrid",
                          "ui:columns": { desktop: 4, tablet: 2, mobile: 1 },
                          "ui:gap": "20px",
                          "ui:items": [
                            {
                              "ui:widget": "card",
                              "ui:title": "Total Users",
                              "ui:description": "1,234",
                              "ui:styles": {
                                textAlign: "center",
                                background:
                                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                              },
                            },
                            {
                              "ui:widget": "card",
                              "ui:title": "Revenue",
                              "ui:description": "$45,678",
                              "ui:styles": {
                                textAlign: "center",
                                background:
                                  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                                color: "white",
                              },
                            },
                            {
                              "ui:widget": "card",
                              "ui:title": "Projects",
                              "ui:description": "89",
                              "ui:styles": {
                                textAlign: "center",
                                background:
                                  "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
                                color: "white",
                              },
                            },
                            {
                              "ui:widget": "card",
                              "ui:title": "Growth",
                              "ui:description": "+12.5%",
                              "ui:styles": {
                                textAlign: "center",
                                background:
                                  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                                color: "#1e293b",
                              },
                            },
                          ],
                        },
                        {
                          "ui:widget": "spacer",
                          "ui:height": 30,
                        },
                        {
                          "ui:widget": "gridLayout",
                          "ui:columns": 2,
                          "ui:gap": "30px",
                          "ui:children": [
                            {
                              "ui:widget": "card",
                              "ui:title": "Recent Activity",
                              "ui:description":
                                "User activity timeline and notifications",
                              "ui:styles": { padding: "20px" },
                            },
                            {
                              "ui:widget": "card",
                              "ui:title": "Performance",
                              "ui:description":
                                "System performance metrics and charts",
                              "ui:styles": { padding: "20px" },
                            },
                          ],
                        },
                      ],
                      "ui:styles": {
                        padding: "30px",
                      },
                    },
                    "ui:sidebarWidth": "280px",
                    "ui:gap": "0",
                    "ui:sidebarPosition": "left",
                    "ui:styles": {
                      minHeight: "600px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      overflow: "hidden",
                    },
                  },
                ],
              },

              // EXAMPLE 2: E-COMMERCE PRODUCT GRID
              ecommerceExample: {
                "ui:widget": "card",
                "ui:title": "🛒 E-commerce Product Grid",
                "ui:description":
                  "Product listing page with filters and responsive grid",
                "ui:styles": {
                  maxWidth: "1400px",
                  margin: "60px auto",
                  animation: "fadeInUp 0.8s ease-out 0.2s both",
                },
                "ui:children": [
                  {
                    "ui:widget": "flexLayout",
                    "ui:direction": "row",
                    "ui:justify": "space-between",
                    "ui:align": "center",
                    "ui:children": [
                      {
                        "ui:widget": "heading",
                        "ui:text": "Featured Products",
                        "ui:level": "h2",
                      },
                      {
                        "ui:widget": "text",
                        "ui:content": "24 products",
                        "ui:styles": { color: "#64748b" },
                      },
                    ],
                  },
                  {
                    "ui:widget": "divider",
                    "ui:styles": { margin: "20px 0" },
                  },
                  {
                    "ui:widget": "cardGrid",
                    "ui:cards": [
                      {
                        "ui:title": "Premium Headphones",
                        "ui:description":
                          "Noise-cancelling wireless headphones with premium sound quality",
                        "ui:image":
                          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        "ui:action": "viewProduct",
                        "ui:buttonLabel": "Add to Cart",
                        "ui:price": "$299",
                        "ui:rating": 5,
                      },
                      {
                        "ui:title": "Smart Watch",
                        "ui:description":
                          "Advanced fitness tracking and smartphone integration",
                        "ui:image":
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        "ui:action": "viewProduct",
                        "ui:buttonLabel": "Add to Cart",
                        "ui:price": "$199",
                        "ui:rating": 4,
                      },
                      {
                        "ui:title": "Camera Lens",
                        "ui:description":
                          "Professional 85mm portrait lens for DSLR cameras",
                        "ui:image":
                          "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        "ui:action": "viewProduct",
                        "ui:buttonLabel": "Add to Cart",
                        "ui:price": "$599",
                        "ui:rating": 5,
                      },
                      {
                        "ui:title": "Gaming Keyboard",
                        "ui:description":
                          "Mechanical RGB keyboard with customizable macros",
                        "ui:image":
                          "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        "ui:action": "viewProduct",
                        "ui:buttonLabel": "Add to Cart",
                        "ui:price": "$129",
                        "ui:rating": 4,
                      },
                      {
                        "ui:title": "Wireless Speaker",
                        "ui:description":
                          "360° surround sound with deep bass and long battery life",
                        "ui:image":
                          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        "ui:action": "viewProduct",
                        "ui:buttonLabel": "Add to Cart",
                        "ui:price": "$89",
                        "ui:rating": 4,
                      },
                      {
                        "ui:title": "Laptop Stand",
                        "ui:description":
                          "Adjustable aluminum stand for better ergonomics",
                        "ui:image":
                          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        "ui:action": "viewProduct",
                        "ui:buttonLabel": "Add to Cart",
                        "ui:price": "$49",
                        "ui:rating": 5,
                      },
                    ],
                    "ui:columns": 3,
                    "ui:gap": "25px",
                  },
                ],
              },

              // EXAMPLE 3: BLOG LAYOUT
              blogExample: {
                "ui:widget": "card",
                "ui:title": "📝 Blog Layout",
                "ui:description":
                  "Complete blog layout with main content and sidebar",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "60px auto",
                  animation: "fadeInUp 0.8s ease-out 0.4s both",
                },
                "ui:children": [
                  {
                    "ui:widget": "sidebarLayout",
                    "ui:sidebar": {
                      "ui:widget": "container",
                      "ui:children": [
                        {
                          "ui:widget": "card",
                          "ui:title": "About Author",
                          "ui:description":
                            "Tech enthusiast and content creator with 10+ years experience in web development.",
                          "ui:styles": { marginBottom: "20px" },
                        },
                        {
                          "ui:widget": "card",
                          "ui:title": "Categories",
                          "ui:styles": { marginBottom: "20px" },
                          "ui:children": [
                            {
                              "ui:widget": "navLinks",
                              "ui:links": [
                                {
                                  label: "Web Development",
                                  action: "filter:webdev",
                                },
                                {
                                  label: "UI/UX Design",
                                  action: "filter:design",
                                },
                                {
                                  label: "Mobile Apps",
                                  action: "filter:mobile",
                                },
                                { label: "DevOps", action: "filter:devops" },
                                { label: "Career", action: "filter:career" },
                              ],
                              "ui:theme": "light",
                              "ui:direction": "column",
                            },
                          ],
                        },
                        {
                          "ui:widget": "card",
                          "ui:title": "Popular Posts",
                          "ui:children": [
                            {
                              "ui:widget": "list",
                              "ui:items": [
                                "Getting Started with React",
                                "CSS Grid vs Flexbox",
                                "Building REST APIs",
                                "Mobile First Design",
                              ],
                              "ui:ordered": false,
                              "ui:icon": "📌",
                            },
                          ],
                        },
                      ],
                    },
                    "ui:main": {
                      "ui:widget": "container",
                      "ui:children": [
                        {
                          "ui:widget": "card",
                          "ui:title": "Building Scalable Web Applications",
                          "ui:description":
                            "Learn how to architect web applications that can handle millions of users with proper scaling techniques and best practices.",
                          "ui:image":
                            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                          "ui:styles": { marginBottom: "30px" },
                        },
                        {
                          "ui:widget": "gridLayout",
                          "ui:columns": 2,
                          "ui:gap": "25px",
                          "ui:children": [
                            {
                              "ui:widget": "card",
                              "ui:title": "Modern CSS Techniques",
                              "ui:description":
                                "Explore cutting-edge CSS features and how to use them in production.",
                              "ui:image":
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                            },
                            {
                              "ui:widget": "card",
                              "ui:title": "JavaScript Performance",
                              "ui:description":
                                "Optimize your JavaScript code for better runtime performance.",
                              "ui:image":
                                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                            },
                          ],
                        },
                      ],
                    },
                    "ui:sidebarWidth": "350px",
                    "ui:gap": "40px",
                    "ui:sidebarPosition": "right",
                  },
                ],
              },

              // EXAMPLE 4: PROFILE PAGE LAYOUT
              profileExample: {
                "ui:widget": "card",
                "ui:title": "👤 User Profile Layout",
                "ui:description":
                  "User profile page with flexible layout components",
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "60px auto",
                  animation: "fadeInUp 0.8s ease-out 0.6s both",
                },
                "ui:children": [
                  {
                    "ui:widget": "flexLayout",
                    "ui:direction": "row",
                    "ui:align": "flex-start",
                    "ui:gap": "40px",
                    "ui:styles": {
                      padding: "40px",
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "container",
                        "ui:children": [
                          {
                            "ui:widget": "image",
                            "ui:src":
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
                            "ui:alt": "Profile picture",
                            "ui:styles": {
                              textAlign: "center",
                            },
                            "ui:imageStyles": {
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            },
                          },
                          {
                            "ui:widget": "spacer",
                            "ui:height": 20,
                          },
                          {
                            "ui:widget": "heading",
                            "ui:text": "Alex Johnson",
                            "ui:level": "h3",
                            "ui:styles": { textAlign: "center" },
                          },
                          {
                            "ui:widget": "text",
                            "ui:content": "Senior Frontend Developer",
                            "ui:styles": {
                              textAlign: "center",
                              color: "#64748b",
                            },
                          },
                        ],
                        "ui:styles": {
                          flex: "0 0 250px",
                        },
                      },
                      {
                        "ui:widget": "container",
                        "ui:children": [
                          {
                            "ui:widget": "heading",
                            "ui:text": "About Me",
                            "ui:level": "h3",
                          },
                          {
                            "ui:widget": "paragraph",
                            "ui:text":
                              "Passionate frontend developer with 8+ years of experience building scalable web applications. Specialized in React, TypeScript, and modern CSS. Love creating intuitive user interfaces and mentoring junior developers.",
                          },
                          {
                            "ui:widget": "divider",
                            "ui:styles": { margin: "25px 0" },
                          },
                          {
                            "ui:widget": "gridLayout",
                            "ui:columns": 2,
                            "ui:gap": "20px",
                            "ui:children": [
                              {
                                "ui:widget": "card",
                                "ui:title": "Skills",
                                "ui:children": [
                                  {
                                    "ui:widget": "list",
                                    "ui:items": [
                                      "React & Next.js",
                                      "TypeScript",
                                      "CSS/SASS",
                                      "UI/UX Design",
                                      "Performance Optimization",
                                    ],
                                    "ui:ordered": false,
                                    "ui:icon": "⭐",
                                  },
                                ],
                              },
                              {
                                "ui:widget": "card",
                                "ui:title": "Contact",
                                "ui:children": [
                                  {
                                    "ui:widget": "list",
                                    "ui:items": [
                                      "alex@example.com",
                                      "+1 (555) 123-4567",
                                      "San Francisco, CA",
                                    ],
                                    "ui:ordered": false,
                                    "ui:icon": "📧",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        "ui:styles": {
                          flex: "1",
                        },
                      },
                    ],
                  },
                ],
              },

              // EXAMPLE 5: RESPONSIVE FEATURE GRID
              responsiveExample: {
                "ui:widget": "card",
                "ui:title": "📱 Responsive Feature Grid",
                "ui:description":
                  "See how the same layout adapts to different screen sizes",
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "60px auto",
                  animation: "fadeInUp 0.8s ease-out 0.8s both",
                },
                "ui:children": [
                  {
                    "ui:widget": "responsiveGrid",
                    "ui:items": [
                      {
                        "ui:widget": "card",
                        "ui:title": "Mobile First",
                        "ui:description":
                          "Optimized for smartphones with single column layout",
                        "ui:icon": "📱",
                        "ui:styles": {
                          textAlign: "center",
                          padding: "30px 20px",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "Tablet Ready",
                        "ui:description":
                          "Adapts to tablets with 2-column layout",
                        "ui:icon": "💻",
                        "ui:styles": {
                          textAlign: "center",
                          padding: "30px 20px",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "Desktop Perfect",
                        "ui:description":
                          "Full 3-column layout on desktop screens",
                        "ui:icon": "🖥️",
                        "ui:styles": {
                          textAlign: "center",
                          padding: "30px 20px",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "Fast Loading",
                        "ui:description":
                          "Optimized performance across all devices",
                        "ui:icon": "⚡",
                        "ui:styles": {
                          textAlign: "center",
                          padding: "30px 20px",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "SEO Friendly",
                        "ui:description":
                          "Clean markup for better search engine visibility",
                        "ui:icon": "🔍",
                        "ui:styles": {
                          textAlign: "center",
                          padding: "30px 20px",
                        },
                      },
                      {
                        "ui:widget": "card",
                        "ui:title": "Accessible",
                        "ui:description": "WCAG compliant for all users",
                        "ui:icon": "♿",
                        "ui:styles": {
                          textAlign: "center",
                          padding: "30px 20px",
                        },
                      },
                    ],
                    "ui:columns": {
                      desktop: 3,
                      tablet: 2,
                      mobile: 1,
                    },
                    "ui:gap": "25px",
                  },
                ],
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "#f8fafc",
              minHeight: "100vh",
            },
            triggers: [],
          },
        },
      },

      interactive: {
        title: "Interactive Components",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🎨 WidgetMaster",
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
                  { label: "Home", action: "navigate:/widget-showcase" },
                  {
                    label: "Basic UI",
                    action: "navigate:/widget-showcase/basic",
                  },
                  {
                    label: "Layout",
                    action: "navigate:/widget-showcase/layout",
                  },
                  { label: "Data", action: "navigate:/widget-showcase/data" },
                  {
                    label: "Interactive",
                    action: "navigate:/widget-showcase/interactive",
                  },
                  { label: "Forms", action: "navigate:/widget-showcase/forms" },
                  {
                    label: "Social",
                    action: "navigate:/widget-showcase/social",
                  },
                  {
                    label: "Pricing",
                    action: "navigate:/widget-showcase/pricing",
                  },
                  {
                    label: "Advanced",
                    action: "navigate:/widget-showcase/advanced",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              hero: {
                "ui:widget": "hero",
                "ui:title": "Interactive Components 🎮",
                "ui:subtitle":
                  "Engaging widgets with animations, transitions, and user interactions",
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
                  minHeight: "300px",
                  padding: "150px 40px 80px",
                  textAlign: "center",
                  color: "#1e293b",
                },
              },
              buttonShowcase: {
                "ui:widget": "card",
                "ui:title": "Button Variants",
                "ui:description": "Different button styles and interactions",
                "ui:styles": {
                  maxWidth: "800px",
                  margin: "40px auto",
                  animation: "fadeInUp 0.8s ease-out",
                },
                "ui:children": [
                  {
                    "ui:widget": "flexLayout",
                    "ui:direction": "row",
                    "ui:justify": "center",
                    "ui:align": "center",
                    "ui:gap": "15px",
                    "ui:wrap": true,
                    "ui:children": [
                      {
                        "ui:widget": "button",
                        "ui:label": "Primary",
                        "ui:action": "buttonClick",
                        "ui:variant": "primary",
                      },
                      {
                        "ui:widget": "button",
                        "ui:label": "Secondary",
                        "ui:action": "buttonClick",
                        "ui:variant": "secondary",
                      },
                      {
                        "ui:widget": "button",
                        "ui:label": "Success",
                        "ui:action": "buttonClick",
                        "ui:variant": "success",
                      },
                      {
                        "ui:widget": "button",
                        "ui:label": "Warning",
                        "ui:action": "buttonClick",
                        "ui:variant": "warning",
                      },
                      {
                        "ui:widget": "button",
                        "ui:label": "Danger",
                        "ui:action": "buttonClick",
                        "ui:variant": "danger",
                      },
                    ],
                  },
                ],
              },
              progressIndicators: {
                "ui:widget": "columns",
                "ui:ratio": "1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Progress Bar",
                    "ui:description": "Visual progress indicators",
                    "ui:styles": { animation: "fadeInUp 0.8s ease-out" },
                    "ui:children": [
                      {
                        "ui:widget": "progressBar",
                        "ui:value": 75,
                        "ui:max": 100,
                        "ui:label": "Project Completion",
                        "ui:color": "#667eea",
                        "ui:showPercentage": true,
                      },
                      {
                        "ui:widget": "progressBar",
                        "ui:value": 45,
                        "ui:max": 100,
                        "ui:label": "Upload Progress",
                        "ui:color": "#43e97b",
                        "ui:showPercentage": true,
                        "ui:styles": { marginTop: "20px" },
                      },
                    ],
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Animated Progress",
                    "ui:description": "Progress bars with animations",
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "progressBar",
                        "ui:value": 90,
                        "ui:max": 100,
                        "ui:label": "Loading Complete",
                        "ui:color": "linear-gradient(90deg, #667eea, #764ba2)",
                        "ui:showPercentage": true,
                        "ui:styles": {
                          marginBottom: "20px",
                        },
                        "ui:barStyles": {
                          background:
                            "linear-gradient(90deg, #667eea, #764ba2)",
                          transition: "width 2s ease-in-out",
                        },
                      },
                    ],
                  },
                ],
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "60px auto",
                },
              },
              accordionShowcase: {
                "ui:widget": "card",
                "ui:title": "Accordion Components",
                "ui:description":
                  "Collapsible content sections for organized information",
                "ui:styles": {
                  maxWidth: "800px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out",
                },
                "ui:children": [
                  {
                    "ui:widget": "accordion",
                    "ui:items": [
                      {
                        title: "How do I get started?",
                        content:
                          "Getting started is easy! Simply sign up for an account, choose your plan, and begin building with our drag-and-drop interface. No coding experience required.",
                      },
                      {
                        title: "Can I customize the components?",
                        content:
                          "Absolutely! All components are fully customizable. You can modify colors, sizes, animations, and even create your own custom components using our API.",
                      },
                      {
                        title: "Is there mobile support?",
                        content:
                          "Yes, all components are fully responsive and work perfectly on mobile devices. Our layouts automatically adapt to different screen sizes.",
                      },
                      {
                        title: "What about browser compatibility?",
                        content:
                          "We support all modern browsers including Chrome, Firefox, Safari, and Edge. Our components are built with cross-browser compatibility in mind.",
                      },
                    ],
                    "ui:allowMultiple": false,
                    "ui:styles": {
                      marginBottom: "0",
                    },
                  },
                ],
              },
              tabsShowcase: {
                "ui:widget": "card",
                "ui:title": "Tabbed Content",
                "ui:description": "Organize content into easily navigable tabs",
                "ui:styles": {
                  maxWidth: "800px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out 0.2s both",
                },
                "ui:children": [
                  {
                    "ui:widget": "tabs",
                    tabs: [
                      {
                        label: "Overview",
                        content:
                          "This is the overview tab content. You can add any widgets or content here to provide a high-level summary of your product or service.",
                      },
                      {
                        label: "Features",
                        content:
                          "Detailed features tab. List all the amazing features of your product with descriptions, images, and interactive elements.",
                      },
                      {
                        label: "Documentation",
                        content:
                          "Technical documentation and guides. Perfect for API references, setup instructions, and troubleshooting information.",
                      },
                      {
                        label: "Support",
                        content:
                          "Customer support information. Include contact details, FAQs, and resources to help users get the assistance they need.",
                      },
                    ],
                  },
                ],
              },
              interactiveDemo: {
                "ui:widget": "card",
                "ui:title": "Interactive Demo",
                "ui:description":
                  "See our interactive components in action with real-time updates",
                "ui:styles": {
                  maxWidth: "600px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out 0.4s both",
                  textAlign: "center",
                },
                "ui:children": [
                  {
                    "ui:widget": "alert",
                    "ui:message":
                      "Try clicking the buttons below to see interactive effects!",
                    "ui:type": "info",
                    "ui:dismissible": true,
                  },
                  {
                    "ui:widget": "flexLayout",
                    "ui:direction": "column",
                    "ui:gap": "20px",
                    "ui:align": "center",
                    "ui:children": [
                      {
                        "ui:widget": "button",
                        "ui:label": "Animated Button",
                        "ui:action": "showNotification",
                        "ui:variant": "primary",
                        "ui:hoverTransform": "translateY(-3px)",
                        "ui:hoverShadow": "0 8px 25px rgba(0,0,0,0.15)",
                      },
                      {
                        "ui:widget": "progressBar",
                        "ui:value": 35,
                        "ui:max": 100,
                        "ui:label": "Interactive Progress",
                        "ui:color": "#f093fb",
                        "ui:showPercentage": true,
                      },
                      {
                        "ui:widget": "badge",
                        "ui:text": "Interactive",
                        "ui:variant": "success",
                        "ui:styles": {
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        },
                      },
                    ],
                  },
                ],
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "#f8fafc",
              minHeight: "100vh",
            },
            triggers: [
              {
                event: "click",
                action: "showNotification",
                message: "Button clicked! Interactive components working.",
              },
            ],
          },
        },
      },

      data: {
        title: "Data Display Widgets",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🎨 WidgetMaster",
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
                  { label: "Home", action: "navigate:/widget-showcase" },
                  {
                    label: "Basic UI",
                    action: "navigate:/widget-showcase/basic",
                  },
                  {
                    label: "Layout",
                    action: "navigate:/widget-showcase/layout",
                  },
                  { label: "Data", action: "navigate:/widget-showcase/data" },
                  {
                    label: "Interactive",
                    action: "navigate:/widget-showcase/interactive",
                  },
                  { label: "Forms", action: "navigate:/widget-showcase/forms" },
                  {
                    label: "Social",
                    action: "navigate:/widget-showcase/social",
                  },
                  {
                    label: "Pricing",
                    action: "navigate:/widget-showcase/pricing",
                  },
                  {
                    label: "Advanced",
                    action: "navigate:/widget-showcase/advanced",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          main: {
            table: {
              usersTable: {
                title: "📊 User Management",
                dataKey: "api.users",
                columns: [
                  { title: "ID", dataIndex: "id", key: "id" },
                  { title: "Name", dataIndex: "name", key: "name" },
                  { title: "Email", dataIndex: "email", key: "email" },
                  { title: "Role", dataIndex: "role", key: "role" },
                  { title: "Status", dataIndex: "status", key: "status" },
                ],
                actions: [
                  { label: "Edit", action: "openModal:editUser" },
                  {
                    label: "Delete",
                    action: "api:users.delete",
                    variant: "danger",
                  },
                ],
              },
              productsTable: {
                title: "📦 Product Inventory",
                dataKey: "api.products",
                columns: [
                  { title: "SKU", dataIndex: "sku", key: "sku" },
                  { title: "Name", dataIndex: "name", key: "name" },
                  { title: "Price", dataIndex: "price", key: "price" },
                  { title: "Stock", dataIndex: "stock", key: "stock" },
                  { title: "Category", dataIndex: "category", key: "category" },
                ],
              },
            },
            modal: {
              editUser: {
                "ui:title": "✏️ Edit User",
                "ui:theme": "light",
                "ui:fields": [
                  {
                    label: "Full Name",
                    type: "text",
                    name: "name",
                    required: true,
                  },
                  {
                    label: "Email",
                    type: "email",
                    name: "email",
                    required: true,
                  },
                  {
                    label: "Role",
                    type: "select",
                    name: "role",
                    options: ["User", "Admin", "Moderator"],
                  },
                  {
                    label: "Status",
                    type: "select",
                    name: "status",
                    options: ["Active", "Inactive", "Suspended"],
                  },
                ],
                "ui:actions": [
                  {
                    label: "Cancel",
                    action: "closeModal",
                    variant: "secondary",
                  },
                  {
                    label: "Save Changes",
                    action: "api:users.update",
                    variant: "primary",
                  },
                ],
              },
            },
            uiSchema: {
              hero: {
                "ui:widget": "hero",
                "ui:title": "Data Visualization 📈",
                "ui:subtitle": "Tables, charts, and data display components",
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  minHeight: "300px",
                  padding: "150px 40px 80px",
                  textAlign: "center",
                  color: "white",
                },
              },
              statsOverview: {
                "ui:widget": "columns",
                "ui:ratio": "1:1:1:1",
                "ui:gap": "30px",
                "ui:columns": [
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "1,234",
                    "ui:label": "Total Users",
                    "ui:color": "#667eea",
                    "ui:styles": { animation: "fadeInUp 0.6s ease-out" },
                  },
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "567",
                    "ui:label": "Active Sessions",
                    "ui:color": "#764ba2",
                    "ui:styles": {
                      animation: "fadeInUp 0.6s ease-out 0.2s both",
                    },
                  },
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "89%",
                    "ui:label": "Success Rate",
                    "ui:color": "#f093fb",
                    "ui:styles": {
                      animation: "fadeInUp 0.6s ease-out 0.4s both",
                    },
                  },
                  {
                    "ui:widget": "statsCounter",
                    "ui:value": "24/7",
                    "ui:label": "Uptime",
                    "ui:color": "#4facfe",
                    "ui:styles": {
                      animation: "fadeInUp 0.6s ease-out 0.6s both",
                    },
                  },
                ],
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "60px auto",
                },
              },
              chartsSection: {
                "ui:widget": "columns",
                "ui:ratio": "1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "chart",
                    "ui:type": "bar",
                    "ui:title": "Monthly Revenue",
                    "ui:data": [65, 59, 80, 81, 56, 55, 40],
                    "ui:labels": [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                    ],
                    "ui:styles": { animation: "fadeInUp 0.8s ease-out" },
                  },
                  {
                    "ui:widget": "chart",
                    "ui:type": "line",
                    "ui:title": "User Growth",
                    "ui:data": [25, 30, 45, 60, 75, 90, 100],
                    "ui:labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                    },
                  },
                ],
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "60px auto",
                },
              },
              progressSection: {
                "ui:widget": "columns",
                "ui:ratio": "1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "progressBar",
                    "ui:value": 75,
                    "ui:max": 100,
                    "ui:label": "Project Completion",
                    "ui:color": "#667eea",
                    "ui:showPercentage": true,
                    "ui:styles": { animation: "fadeInUp 0.8s ease-out" },
                  },
                  {
                    "ui:widget": "skillRadar",
                    "ui:skills": [
                      { name: "Web Design", level: 85 },
                      { name: "Development", level: 92 },
                      { name: "Marketing", level: 78 },
                      { name: "SEO", level: 88 },
                    ],
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                    },
                  },
                ],
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "60px auto",
                },
              },
              listShowcase: {
                "ui:widget": "columns",
                "ui:ratio": "1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "list",
                    "ui:items": [
                      "Real-time data synchronization",
                      "Advanced filtering options",
                      "Export to multiple formats",
                      "Custom column ordering",
                      "Bulk action support",
                    ],
                    "ui:ordered": false,
                    "ui:icon": "✓",
                    "ui:styles": { animation: "fadeInUp 0.8s ease-out" },
                  },
                  {
                    "ui:widget": "kanbanBoard",
                    columns: [
                      {
                        title: "To Do",
                        cards: [
                          {
                            title: "Design Homepage",
                            description:
                              "Create initial homepage design mockups",
                          },
                          {
                            title: "Setup Database",
                            description:
                              "Configure database schema and connections",
                          },
                        ],
                      },
                      {
                        title: "In Progress",
                        cards: [
                          {
                            title: "User Authentication",
                            description:
                              "Implement login and registration system",
                          },
                        ],
                      },
                      {
                        title: "Done",
                        cards: [
                          {
                            title: "Project Setup",
                            description:
                              "Initialize project structure and dependencies",
                          },
                        ],
                      },
                    ],
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                    },
                  },
                ],
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "60px auto",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "#f8fafc",
              minHeight: "100vh",
            },
            triggers: [
              { event: "load", action: "fetchData", source: "api.users" },
              { event: "load", action: "fetchData", source: "api.products" },
            ],
          },
        },
      },

      forms: {
        title: "Form Components",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🎨 WidgetMaster",
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
                  { label: "Home", action: "navigate:/widget-showcase" },
                  {
                    label: "Basic UI",
                    action: "navigate:/widget-showcase/basic",
                  },
                  {
                    label: "Layout",
                    action: "navigate:/widget-showcase/layout",
                  },
                  { label: "Data", action: "navigate:/widget-showcase/data" },
                  {
                    label: "Interactive",
                    action: "navigate:/widget-showcase/interactive",
                  },
                  { label: "Forms", action: "navigate:/widget-showcase/forms" },
                  {
                    label: "Social",
                    action: "navigate:/widget-showcase/social",
                  },
                  {
                    label: "Pricing",
                    action: "navigate:/widget-showcase/pricing",
                  },
                  {
                    label: "Advanced",
                    action: "navigate:/widget-showcase/advanced",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {
              multiStepForm: {
                "ui:title": "🚀 Multi-Step Registration",
                "ui:theme": "light",
                "ui:steps": [
                  {
                    title: "Account Setup",
                    fields: [
                      {
                        label: "Username",
                        type: "text",
                        name: "username",
                        required: true,
                        placeholder: "Choose a username",
                      },
                      {
                        label: "Email",
                        type: "email",
                        name: "email",
                        required: true,
                        placeholder: "your@email.com",
                      },
                      {
                        label: "Password",
                        type: "password",
                        name: "password",
                        required: true,
                        placeholder: "Create a password",
                      },
                    ],
                  },
                  {
                    title: "Profile Information",
                    fields: [
                      {
                        label: "Full Name",
                        type: "text",
                        name: "fullName",
                        required: true,
                      },
                      { label: "Company", type: "text", name: "company" },
                      {
                        label: "Role",
                        type: "select",
                        name: "role",
                        options: ["Developer", "Designer", "Manager", "Other"],
                      },
                    ],
                  },
                  {
                    title: "Preferences",
                    fields: [
                      {
                        label: "Newsletter",
                        type: "checkbox",
                        name: "newsletter",
                        default: true,
                      },
                      {
                        label: "Notifications",
                        type: "checkbox",
                        name: "notifications",
                        default: true,
                      },
                      {
                        label: "Theme Preference",
                        type: "radio",
                        name: "theme",
                        options: ["Light", "Dark", "Auto"],
                      },
                    ],
                  },
                ],
                "ui:actions": [
                  {
                    label: "Previous",
                    action: "prevStep",
                    variant: "secondary",
                  },
                  { label: "Next", action: "nextStep", variant: "primary" },
                  {
                    label: "Complete Registration",
                    action: "api:auth.register",
                    variant: "success",
                  },
                ],
              },
            },
            uiSchema: {
              hero: {
                "ui:widget": "hero",
                "ui:title": "Form Components 📝",
                "ui:subtitle":
                  "Complete form solutions with validation and interactivity",
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                  minHeight: "300px",
                  padding: "150px 40px 80px",
                  textAlign: "center",
                  color: "#1e293b",
                },
              },
              contactForm: {
                "ui:widget": "formContainer",
                "ui:title": "Contact Us",
                "ui:description":
                  "We'd love to hear from you! Please fill out this form and we'll get in touch soon.",
                "ui:actions": [
                  {
                    label: "Send Message",
                    action: "submitContactForm",
                    variant: "primary",
                  },
                  {
                    label: "Cancel",
                    action: "cancelForm",
                    variant: "secondary",
                  },
                ],
                "ui:fields": [
                  {
                    "ui:widget": "formRow",
                    "ui:fields": [
                      {
                        "ui:widget": "inputField",
                        "ui:label": "First Name",
                        "ui:placeholder": "Enter your first name",
                        "ui:type": "text",
                        "ui:required": true,
                        "ui:name": "firstName",
                      },
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Last Name",
                        "ui:placeholder": "Enter your last name",
                        "ui:type": "text",
                        "ui:required": true,
                        "ui:name": "lastName",
                      },
                    ],
                    "ui:gap": "20px",
                  },
                  {
                    "ui:widget": "inputField",
                    "ui:label": "Email Address",
                    "ui:placeholder": "Enter your email",
                    "ui:type": "email",
                    "ui:required": true,
                    "ui:name": "email",
                  },
                  {
                    "ui:widget": "selectField",
                    "ui:label": "Inquiry Type",
                    "ui:options": [
                      { label: "General Question", value: "general" },
                      { label: "Technical Support", value: "support" },
                      { label: "Feature Request", value: "feature" },
                      { label: "Partnership", value: "partnership" },
                    ],
                    "ui:placeholder": "Select inquiry type",
                    "ui:required": true,
                    "ui:name": "inquiryType",
                  },
                  {
                    "ui:widget": "textareaField",
                    "ui:label": "Message",
                    "ui:placeholder":
                      "Tell us about your project or inquiry...",
                    "ui:rows": 4,
                    "ui:required": true,
                    "ui:name": "message",
                  },
                  {
                    "ui:widget": "checkbox",
                    "ui:label": "Subscribe to newsletter for updates and tips",
                    "ui:name": "newsletter",
                    "ui:required": false,
                  },
                ],
                "ui:styles": {
                  maxWidth: "600px",
                  margin: "40px auto",
                  animation: "fadeInUp 0.8s ease-out",
                },
              },
              formElementsShowcase: {
                "ui:widget": "columns",
                "ui:ratio": "1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Input Variants",
                    "ui:description": "Different input field types and styles",
                    "ui:styles": { animation: "fadeInUp 0.8s ease-out" },
                    "ui:children": [
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Text Input",
                        "ui:placeholder": "Regular text input",
                        "ui:type": "text",
                        "ui:name": "textExample",
                      },
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Email Input",
                        "ui:placeholder": "email@example.com",
                        "ui:type": "email",
                        "ui:name": "emailExample",
                      },
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Number Input",
                        "ui:placeholder": "Enter a number",
                        "ui:type": "number",
                        "ui:name": "numberExample",
                      },
                    ],
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Selection Elements",
                    "ui:description": "Various selection input types",
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "selectField",
                        "ui:label": "Dropdown Select",
                        "ui:options": [
                          { label: "Option 1", value: "opt1" },
                          { label: "Option 2", value: "opt2" },
                          { label: "Option 3", value: "opt3" },
                        ],
                        "ui:placeholder": "Choose an option",
                        "ui:name": "selectExample",
                      },
                      {
                        "ui:widget": "radioGroup",
                        "ui:label": "Radio Group",
                        "ui:options": [
                          { label: "Choice A", value: "A" },
                          { label: "Choice B", value: "B" },
                          { label: "Choice C", value: "C" },
                        ],
                        "ui:name": "radioExample",
                      },
                      {
                        "ui:widget": "checkbox",
                        "ui:label": "Single Checkbox",
                        "ui:name": "singleCheckbox",
                      },
                    ],
                  },
                ],
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "40px auto",
                },
              },
              fileUploadSection: {
                "ui:widget": "card",
                "ui:title": "File Upload Demo",
                "ui:description":
                  "Advanced file upload with drag & drop support",
                "ui:styles": {
                  maxWidth: "600px",
                  margin: "40px auto",
                  animation: "fadeInUp 0.8s ease-out 0.4s both",
                },
                "ui:children": [
                  {
                    "ui:widget": "fileUpload",
                    "ui:label": "Upload Documents",
                    "ui:accept": ".pdf,.doc,.docx,.jpg,.png",
                    "ui:multiple": true,
                    "ui:name": "documents",
                  },
                ],
              },
              multiStepDemo: {
                "ui:widget": "card",
                "ui:title": "Multi-Step Form Demo",
                "ui:description":
                  "Experience our advanced multi-step form with progress tracking and validation",
                "ui:action": "openModal:multiStepForm",
                "ui:buttonLabel": "Start Multi-Step Form",
                "ui:styles": {
                  maxWidth: "500px",
                  margin: "40px auto",
                  textAlign: "center",
                  animation: "fadeInUp 0.8s ease-out 0.6s both",
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
        },
      },

      social: {
        title: "Social & Navigation",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🎨 WidgetMaster",
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
                  { label: "Home", action: "navigate:/widget-showcase" },
                  {
                    label: "Basic UI",
                    action: "navigate:/widget-showcase/basic",
                  },
                  {
                    label: "Layout",
                    action: "navigate:/widget-showcase/layout",
                  },
                  { label: "Data", action: "navigate:/widget-showcase/data" },
                  {
                    label: "Interactive",
                    action: "navigate:/widget-showcase/interactive",
                  },
                  { label: "Forms", action: "navigate:/widget-showcase/forms" },
                  {
                    label: "Social",
                    action: "navigate:/widget-showcase/social",
                  },
                  {
                    label: "Pricing",
                    action: "navigate:/widget-showcase/pricing",
                  },
                  {
                    label: "Advanced",
                    action: "navigate:/widget-showcase/advanced",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {},
            uiSchema: {
              hero: {
                "ui:widget": "hero",
                "ui:title": "Social & Navigation 🌐",
                "ui:subtitle":
                  "Connectivity components for engagement and user interaction",
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                  minHeight: "300px",
                  padding: "150px 40px 80px",
                  textAlign: "center",
                  color: "#1e293b",
                },
              },
              socialIconsShowcase: {
                "ui:widget": "columns",
                "ui:ratio": "1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Social Media Icons",
                    "ui:description":
                      "Connect with us on various social platforms",
                    "ui:styles": { animation: "fadeInUp 0.8s ease-out" },
                    "ui:children": [
                      {
                        "ui:widget": "socialIcons",
                        "ui:icons": [
                          {
                            platform: "facebook",
                            url: "https://facebook.com",
                            fontAwesome: "fab fa-facebook-f",
                          },
                          {
                            platform: "twitter",
                            url: "https://twitter.com",
                            fontAwesome: "fab fa-twitter",
                          },
                          {
                            platform: "instagram",
                            url: "https://instagram.com",
                            fontAwesome: "fab fa-instagram",
                          },
                          {
                            platform: "linkedin",
                            url: "https://linkedin.com",
                            fontAwesome: "fab fa-linkedin-in",
                          },
                          {
                            platform: "github",
                            url: "https://github.com",
                            fontAwesome: "fab fa-github",
                          },
                        ],
                        "ui:size": "large",
                        "ui:variant": "colored",
                      },
                    ],
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Share Buttons",
                    "ui:description": "Let users share your content easily",
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "socialIcons",
                        "ui:icons": [
                          {
                            platform: "share",
                            url: "#share",
                            fontAwesome: "fas fa-share-alt",
                            label: "Share",
                          },
                          {
                            platform: "email",
                            url: "mailto:",
                            fontAwesome: "fas fa-envelope",
                            label: "Email",
                          },
                          {
                            platform: "link",
                            url: "#copy",
                            fontAwesome: "fas fa-link",
                            label: "Copy Link",
                          },
                        ],
                        "ui:size": "medium",
                        "ui:variant": "outline",
                      },
                    ],
                  },
                ],
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "40px auto",
                },
              },
              testimonialShowcase: {
                "ui:widget": "responsiveGrid",
                "ui:columns": { desktop: 2, tablet: 1, mobile: 1 },
                "ui:gap": "30px",
                "ui:items": [
                  {
                    "ui:widget": "testimonial",
                    "ui:quote":
                      "This platform has completely transformed how we build our websites. The drag-and-drop interface is intuitive and powerful!",
                    "ui:author": "Sarah Johnson",
                    "ui:role": "Marketing Director",
                    "ui:avatar":
                      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
                    "ui:rating": 5,
                    "ui:styles": { animation: "fadeInUp 0.8s ease-out" },
                  },
                  {
                    "ui:widget": "testimonial",
                    "ui:quote":
                      "The component library is extensive and well-designed. We've cut our development time by 60% since switching to WidgetMaster.",
                    "ui:author": "Michael Chen",
                    "ui:role": "Lead Developer",
                    "ui:avatar":
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
                    "ui:rating": 5,
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                    },
                  },
                ],
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "40px auto",
                },
              },
              navigationShowcase: {
                "ui:widget": "columns",
                "ui:ratio": "1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "card",
                    "ui:title": "Navigation Links",
                    "ui:description":
                      "Various navigation link styles and configurations",
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.4s both",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "navLinks",
                        "ui:links": [
                          {
                            label: "Home",
                            action: "navigateHome",
                            fontAwesome: "fas fa-home",
                          },
                          {
                            label: "Products",
                            action: "navigateProducts",
                            fontAwesome: "fas fa-shopping-bag",
                          },
                          {
                            label: "Services",
                            action: "navigateServices",
                            fontAwesome: "fas fa-cog",
                          },
                          {
                            label: "Contact",
                            action: "navigateContact",
                            fontAwesome: "fas fa-envelope",
                          },
                        ],
                        "ui:theme": "light",
                        "ui:direction": "column",
                      },
                    ],
                  },
                  {
                    "ui:widget": "card",
                    "ui:title": "Authentication Links",
                    "ui:description": "Login and signup navigation options",
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.6s both",
                    },
                    "ui:children": [
                      {
                        "ui:widget": "authLinks",
                        "ui:links": [
                          {
                            label: "Login",
                            action: "showLogin",
                            prefix: "Already have an account?",
                          },
                          {
                            label: "Sign Up",
                            action: "showSignup",
                            prefix: "New user?",
                          },
                        ],
                        "ui:alignment": "center",
                        "ui:direction": "column",
                      },
                    ],
                  },
                ],
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "40px auto",
                },
              },
              projectGridShowcase: {
                "ui:widget": "projectGrid",
                "ui:animated": true,
                "ui:styles": {
                  padding: "80px 40px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  animation: "fadeInUp 1s ease-out",
                },
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "#ffffff",
              minHeight: "100vh",
            },
            triggers: [],
          },
        },
      },

      pricing: {
        title: "Pricing Components",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🎨 WidgetMaster",
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
                  { label: "Home", action: "navigate:/widget-showcase" },
                  {
                    label: "Basic UI",
                    action: "navigate:/widget-showcase/basic",
                  },
                  {
                    label: "Layout",
                    action: "navigate:/widget-showcase/layout",
                  },
                  { label: "Data", action: "navigate:/widget-showcase/data" },
                  {
                    label: "Interactive",
                    action: "navigate:/widget-showcase/interactive",
                  },
                  { label: "Forms", action: "navigate:/widget-showcase/forms" },
                  {
                    label: "Social",
                    action: "navigate:/widget-showcase/social",
                  },
                  {
                    label: "Pricing",
                    action: "navigate:/widget-showcase/pricing",
                  },
                  {
                    label: "Advanced",
                    action: "navigate:/widget-showcase/advanced",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          main: {
            table: {},
            modal: {
              purchaseModal: {
                "ui:title": "🎉 Choose Your Plan",
                "ui:theme": "light",
                "ui:content":
                  "Select the plan that best fits your needs. You can upgrade or downgrade at any time.",
                "ui:actions": [
                  {
                    label: "Cancel",
                    action: "closeModal",
                    variant: "secondary",
                  },
                  {
                    label: "Continue to Payment",
                    action: "api:purchase.plan",
                    variant: "primary",
                  },
                ],
              },
            },
            uiSchema: {
              hero: {
                "ui:widget": "hero",
                "ui:title": "Pricing Plans 💰",
                "ui:subtitle":
                  "Choose the perfect plan for your needs with transparent pricing",
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  minHeight: "300px",
                  padding: "150px 40px 80px",
                  textAlign: "center",
                  color: "white",
                },
              },
              pricingCards: {
                "ui:widget": "responsiveGrid",
                "ui:columns": { desktop: 3, tablet: 2, mobile: 1 },
                "ui:gap": "30px",
                "ui:items": [
                  {
                    "ui:widget": "pricingCard",
                    "ui:title": "Starter",
                    "ui:price": "$19",
                    "ui:period": "/month",
                    "ui:features": [
                      "5 GB Storage",
                      "10 Projects",
                      "Basic Support",
                      "Standard Components",
                      "Community Access",
                    ],
                    "ui:highlighted": false,
                    "ui:action": "selectPlan:starter",
                    "ui:buttonLabel": "Get Started",
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out",
                      transform: "scale(0.95)",
                    },
                  },
                  {
                    "ui:widget": "pricingCard",
                    "ui:title": "Professional",
                    "ui:price": "$49",
                    "ui:period": "/month",
                    "ui:features": [
                      "50 GB Storage",
                      "Unlimited Projects",
                      "Priority Support",
                      "Advanced Components",
                      "API Access",
                      "Custom Domains",
                    ],
                    "ui:highlighted": true,
                    "ui:action": "openModal:purchaseModal",
                    "ui:buttonLabel": "Most Popular",
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                      transform: "scale(1.02)",
                      border: "3px solid #667eea",
                    },
                  },
                  {
                    "ui:widget": "pricingCard",
                    "ui:title": "Enterprise",
                    "ui:price": "$99",
                    "ui:period": "/month",
                    "ui:features": [
                      "500 GB Storage",
                      "Unlimited Everything",
                      "24/7 Support",
                      "All Components",
                      "White Label",
                      "Custom Integrations",
                      "Dedicated Manager",
                    ],
                    "ui:highlighted": false,
                    "ui:action": "contactSales",
                    "ui:buttonLabel": "Contact Sales",
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.4s both",
                      transform: "scale(0.95)",
                    },
                  },
                ],
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "60px auto",
                  padding: "40px 20px",
                },
              },
              featureComparison: {
                "ui:widget": "card",
                "ui:title": "Plan Comparison",
                "ui:description":
                  "Detailed feature comparison across all pricing tiers",
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out",
                },
                "ui:children": [
                  {
                    "ui:widget": "dataTable",
                    columns: [
                      {
                        title: "Feature",
                        dataIndex: "feature",
                        key: "feature",
                      },
                      {
                        title: "Starter",
                        dataIndex: "starter",
                        key: "starter",
                      },
                      {
                        title: "Professional",
                        dataIndex: "professional",
                        key: "professional",
                      },
                      {
                        title: "Enterprise",
                        dataIndex: "enterprise",
                        key: "enterprise",
                      },
                    ],
                  },
                ],
              },
              faqSection: {
                "ui:widget": "accordion",
                "ui:items": [
                  {
                    title: "Can I change plans later?",
                    content:
                      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the billing accordingly.",
                  },
                  {
                    title: "Is there a free trial?",
                    content:
                      "We offer a 14-day free trial on all paid plans. No credit card required to start your trial.",
                  },
                  {
                    title: "What payment methods do you accept?",
                    content:
                      "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.",
                  },
                  {
                    title: "Do you offer discounts for nonprofits?",
                    content:
                      "Yes, we offer a 50% discount for registered nonprofit organizations. Contact our sales team for verification.",
                  },
                ],
                "ui:allowMultiple": true,
                "ui:styles": {
                  maxWidth: "800px",
                  margin: "60px auto",
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
        },
      },

      advanced: {
        title: "Advanced Components",
        components: {
          navbar: {
            table: {},
            modal: {},
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🎨 WidgetMaster",
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
                  { label: "Home", action: "navigate:/widget-showcase" },
                  {
                    label: "Basic UI",
                    action: "navigate:/widget-showcase/basic",
                  },
                  {
                    label: "Layout",
                    action: "navigate:/widget-showcase/layout",
                  },
                  { label: "Data", action: "navigate:/widget-showcase/data" },
                  {
                    label: "Interactive",
                    action: "navigate:/widget-showcase/interactive",
                  },
                  { label: "Forms", action: "navigate:/widget-showcase/forms" },
                  {
                    label: "Social",
                    action: "navigate:/widget-showcase/social",
                  },
                  {
                    label: "Pricing",
                    action: "navigate:/widget-showcase/pricing",
                  },
                  {
                    label: "Advanced",
                    action: "navigate:/widget-showcase/advanced",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "20px 50px",
              position: "fixed",
              width: "100%",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            },
            triggers: [],
          },
          main: {
            table: {
              advancedTable: {
                title: "🚀 Advanced Data Table",
                dataKey: "api.analytics",
                columns: [
                  { title: "ID", dataIndex: "id", key: "id", sortable: true },
                  {
                    title: "User",
                    dataIndex: "user",
                    key: "user",
                    sortable: true,
                  },
                  { title: "Action", dataIndex: "action", key: "action" },
                  {
                    title: "Timestamp",
                    dataIndex: "timestamp",
                    key: "timestamp",
                    sortable: true,
                  },
                  { title: "Status", dataIndex: "status", key: "status" },
                  {
                    title: "Duration",
                    dataIndex: "duration",
                    key: "duration",
                    sortable: true,
                  },
                ],
                actions: [
                  { label: "View Details", action: "openModal:detailView" },
                  {
                    label: "Export",
                    action: "api:export.data",
                    variant: "secondary",
                  },
                  {
                    label: "Archive",
                    action: "api:archive.item",
                    variant: "danger",
                  },
                ],
                features: [
                  "pagination",
                  "search",
                  "filter",
                  "sort",
                  "bulkActions",
                ],
              },
            },
            modal: {
              detailView: {
                "ui:title": "📊 Detailed Analytics View",
                "ui:theme": "dark",
                "ui:content":
                  "Comprehensive analytics and performance metrics for the selected item.",
                "ui:actions": [
                  {
                    label: "Close",
                    action: "closeModal",
                    variant: "secondary",
                  },
                  {
                    label: "Generate Report",
                    action: "api:generate.report",
                    variant: "primary",
                  },
                ],
              },
            },
            uiSchema: {
              hero: {
                "ui:widget": "hero",
                "ui:title": "Advanced Components 🚀",
                "ui:subtitle":
                  "Sophisticated widgets for complex applications and enterprise use cases",
                "ui:styles": {
                  background:
                    "linear-gradient(135deg, #434343 0%, #000000 100%)",
                  minHeight: "400px",
                  padding: "180px 40px 100px",
                  textAlign: "center",
                  color: "white",
                },
              },
              kanbanBoard: {
                "ui:widget": "kanbanBoard",
                columns: [
                  {
                    title: "Backlog",
                    cards: [
                      {
                        title: "Research New Features",
                        description:
                          "Investigate potential new features for Q4 release",
                        tags: ["research", "planning"],
                        assignee: "Sarah M.",
                        dueDate: "2024-12-15",
                      },
                      {
                        title: "Update Documentation",
                        description:
                          "Revise API documentation with new endpoints",
                        tags: ["documentation"],
                        assignee: "Mike T.",
                        dueDate: "2024-11-30",
                      },
                    ],
                  },
                  {
                    title: "In Progress",
                    cards: [
                      {
                        title: "Implement Dark Mode",
                        description:
                          "Add dark theme support across all components",
                        tags: ["feature", "ui"],
                        assignee: "Alex K.",
                        dueDate: "2024-11-25",
                      },
                      {
                        title: "Performance Optimization",
                        description: "Improve loading times for large datasets",
                        tags: ["performance", "optimization"],
                        assignee: "Jordan L.",
                        dueDate: "2024-11-28",
                      },
                    ],
                  },
                  {
                    title: "Review",
                    cards: [
                      {
                        title: "Code Review - Auth Module",
                        description: "Review new authentication implementation",
                        tags: ["code-review", "security"],
                        assignee: "Taylor R.",
                        dueDate: "2024-11-20",
                      },
                    ],
                  },
                  {
                    title: "Done",
                    cards: [
                      {
                        title: "Mobile Responsive Fixes",
                        description: "Completed responsive design improvements",
                        tags: ["mobile", "ui"],
                        assignee: "Casey P.",
                        dueDate: "2024-11-15",
                      },
                    ],
                  },
                ],
                "ui:styles": {
                  maxWidth: "1400px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out",
                },
              },
              advancedCharts: {
                "ui:widget": "columns",
                "ui:ratio": "1:1",
                "ui:gap": "40px",
                "ui:columns": [
                  {
                    "ui:widget": "chart",
                    "ui:type": "radar",
                    "ui:title": "Skill Assessment",
                    "ui:data": [85, 92, 78, 88, 95, 70],
                    "ui:labels": [
                      "Design",
                      "Development",
                      "Marketing",
                      "SEO",
                      "UX",
                      "Analytics",
                    ],
                    "ui:styles": { animation: "fadeInUp 0.8s ease-out" },
                  },
                  {
                    "ui:widget": "chart",
                    "ui:type": "doughnut",
                    "ui:title": "Project Distribution",
                    "ui:data": [35, 25, 20, 15, 5],
                    "ui:labels": ["Web", "Mobile", "Desktop", "API", "Other"],
                    "ui:styles": {
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                    },
                  },
                ],
                "ui:styles": {
                  maxWidth: "1200px",
                  margin: "60px auto",
                },
              },
              complexForm: {
                "ui:widget": "formContainer",
                "ui:title": "Advanced Configuration",
                "ui:description":
                  "Complex form with multiple sections, conditional fields, and advanced validation",
                "ui:actions": [
                  {
                    label: "Save Draft",
                    action: "saveDraft",
                    variant: "secondary",
                  },
                  {
                    label: "Validate",
                    action: "validateForm",
                    variant: "primary",
                  },
                  {
                    label: "Deploy",
                    action: "deployConfig",
                    variant: "success",
                  },
                ],
                "ui:fields": [
                  {
                    "ui:widget": "formRow",
                    "ui:fields": [
                      {
                        "ui:widget": "inputField",
                        "ui:label": "Project Name",
                        "ui:placeholder": "Enter project identifier",
                        "ui:type": "text",
                        "ui:required": true,
                        "ui:name": "projectName",
                      },
                      {
                        "ui:widget": "selectField",
                        "ui:label": "Environment",
                        "ui:options": [
                          { label: "Development", value: "dev" },
                          { label: "Staging", value: "staging" },
                          { label: "Production", value: "prod" },
                        ],
                        "ui:required": true,
                        "ui:name": "environment",
                      },
                    ],
                    "ui:gap": "20px",
                  },
                  {
                    "ui:widget": "textareaField",
                    "ui:label": "Configuration JSON",
                    "ui:placeholder": "Paste your configuration JSON here...",
                    "ui:rows": 6,
                    "ui:required": true,
                    "ui:name": "configJson",
                  },
                  {
                    "ui:widget": "fileUpload",
                    "ui:label": "Upload Assets",
                    "ui:accept": ".json,.yaml,.yml,.zip",
                    "ui:multiple": true,
                    "ui:name": "assets",
                  },
                  {
                    "ui:widget": "checkbox",
                    "ui:label": "Enable advanced features (requires restart)",
                    "ui:name": "advancedFeatures",
                  },
                  {
                    "ui:widget": "radioGroup",
                    "ui:label": "Deployment Strategy",
                    "ui:options": [
                      {
                        label: "Blue-Green (Zero downtime)",
                        value: "bluegreen",
                      },
                      { label: "Canary (Gradual rollout)", value: "canary" },
                      { label: "Recreate (Simple restart)", value: "recreate" },
                    ],
                    "ui:name": "deploymentStrategy",
                    "ui:required": true,
                  },
                ],
                "ui:styles": {
                  maxWidth: "800px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out",
                },
              },
              interactiveDemo: {
                "ui:widget": "card",
                "ui:title": "Real-time Data Stream",
                "ui:description":
                  "Live data visualization with interactive controls",
                "ui:styles": {
                  maxWidth: "1000px",
                  margin: "40px auto",
                  animation: "fadeInUp 1s ease-out 0.2s both",
                },
                "ui:children": [
                  {
                    "ui:widget": "flexLayout",
                    "ui:direction": "row",
                    "ui:justify": "space-between",
                    "ui:align": "center",
                    "ui:gap": "20px",
                    "ui:children": [
                      {
                        "ui:widget": "progressBar",
                        "ui:value": 65,
                        "ui:max": 100,
                        "ui:label": "Live Data Feed",
                        "ui:color": "#43e97b",
                        "ui:showPercentage": true,
                        "ui:styles": { flex: "2" },
                      },
                      {
                        "ui:widget": "button",
                        "ui:label": "Refresh Data",
                        "ui:action": "refreshData",
                        "ui:variant": "primary",
                        "ui:styles": { flex: "1" },
                      },
                    ],
                  },
                  {
                    "ui:widget": "chart",
                    "ui:type": "line",
                    "ui:title": "Real-time Metrics",
                    "ui:data": [
                      25, 30, 45, 60, 75, 90, 100, 95, 85, 110, 125, 115,
                    ],
                    "ui:labels": [
                      "00:00",
                      "02:00",
                      "04:00",
                      "06:00",
                      "08:00",
                      "10:00",
                      "12:00",
                      "14:00",
                      "16:00",
                      "18:00",
                      "20:00",
                      "22:00",
                    ],
                    "ui:styles": { marginTop: "20px" },
                  },
                ],
              },
            },
            styles: {
              padding: "100px 40px 80px",
              background: "#0f172a",
              color: "white",
              minHeight: "100vh",
            },
            triggers: [
              { event: "load", action: "fetchData", source: "api.analytics" },
              { event: "load", action: "initializeCharts", delay: 500 },
            ],
          },
        },
      },
    },

    components: {
      navbar: {
        table: {},
        modal: {
          authModal: {
            "ui:title": "🔐 Welcome to WidgetMaster",
            "ui:theme": "light",
            "ui:content":
              "Sign in to access all features and save your widget configurations.",
            "ui:fields": [
              {
                label: "Email Address",
                type: "email",
                placeholder: "you@example.com",
                name: "email",
                required: true,
                validation: {
                  required: true,
                  requiredMessage: "Email is required",
                  email: true,
                  emailMessage: "Please enter a valid email",
                },
              },
              {
                label: "Password",
                type: "password",
                placeholder: "Enter your password",
                name: "password",
                required: true,
                validation: {
                  required: true,
                  requiredMessage: "Password is required",
                  minLength: 6,
                  minLengthMessage: "Password must be at least 6 characters",
                },
              },
            ],
            "ui:actions": [
              {
                label: "Forgot Password?",
                action: "openModal:forgotModal",
                variant: "secondary",
              },
              {
                label: "Sign In",
                action: "api:auth.login",
                variant: "primary",
                apiKey: "auth.login",
              },
              {
                label: "Create Account",
                action: "openModal:signupModal",
                variant: "secondary",
              },
            ],
          },
        },
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🎨 WidgetMaster",
            "ui:styles": {
              fontSize: "28px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              { label: "Home", action: "navigate:/widget-showcase" },
              { label: "Basic UI", action: "navigate:/widget-showcase/basic" },
              { label: "Layout", action: "navigate:/widget-showcase/layout" },
              { label: "Data", action: "navigate:/widget-showcase/data" },
              {
                label: "Interactive",
                action: "navigate:/widget-showcase/interactive",
              },
              { label: "Forms", action: "navigate:/widget-showcase/forms" },
              { label: "Social", action: "navigate:/widget-showcase/social" },
              { label: "Pricing", action: "navigate:/widget-showcase/pricing" },
              {
                label: "Advanced",
                action: "navigate:/widget-showcase/advanced",
              },
              {
                label: "{{auth.token ? 'Dashboard' : 'Login'}}",
                action:
                  "{{auth.token ? 'navigate:/dashboard' : 'openModal:authModal'}}",
              },
            ],
          },
        },
        styles: {
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          padding: "20px 50px",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
        triggers: [],
      },
      main: {
        table: {},
        modal: {},
        uiSchema: {
          hero: {
            "ui:widget": "hero",
            "ui:title": "Ultimate Widget Library 🎨",
            "ui:subtitle":
              "50+ components, 15+ layouts, endless possibilities. Build anything you can imagine.",
            "ui:cta": {
              label: "Get Started",
              action: "navigate:/widget-showcase/basic",
            },
            "ui:secondaryCta": {
              label: "View Demos",
              action: "scroll:#demos",
            },
            "ui:styles": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              minHeight: "600px",
              padding: "150px 40px 100px",
            },
          },
        },
        styles: {
          padding: "100px 40px 80px",
          background:
            "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)",
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
              "© 2024 WidgetMaster - The Complete Component Library | Built with ❤️ for developers",
            "ui:styles": {
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "14px",
            },
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
