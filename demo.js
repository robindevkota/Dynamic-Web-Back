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
    // 🆕 NEW FORMAT: Just reference the keys!
    "auth.login",
    "auth.signup", 
    "auth.forgot",
    "products.api",
    "checkout.complete"
  ],
    },

    pages: {
      cart: {
        title: "Shopping Cart",
        components: {
          navbar: {
            table: {},
            modal: {
              // ✅ AUTH MODAL WITH VALIDATION
              authModal: {
                "ui:title": "🔐 Welcome to ShopZone",
                "ui:theme": "light",
                "ui:content": "Sign in to access your account and start shopping!",
                "ui:minHeight": "400px",
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
                      emailMessage: "Please enter a valid email address",
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

              // ✅ SIGNUP MODAL WITH VALIDATION
              signupModal: {
                "ui:title": "✨ Create Your Account",
                "ui:theme": "light",
                "ui:content": "Join ShopZone and start shopping today!",
                "ui:minHeight": "500px",
                "ui:fields": [
                  {
                    label: "Full Name",
                    type: "text",
                    placeholder: "John Doe",
                    name: "fullName",
                    required: true,
                    validation: {
                      required: true,
                      requiredMessage: "Full name is required",
                      minLength: 3,
                      minLengthMessage: "Name must be at least 3 characters",
                    },
                  },
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
                      emailMessage: "Please enter a valid email address",
                    },
                  },
                  {
                    label: "Password",
                    type: "password",
                    placeholder: "Create a strong password",
                    name: "password",
                    required: true,
                    validation: {
                      required: true,
                      requiredMessage: "Password is required",
                      minLength: 8,
                      minLengthMessage: "Password must be at least 8 characters",
                      pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$",
                      patternMessage: "Password must contain letters and numbers",
                    },
                  },
                  {
                    label: "Confirm Password",
                    type: "password",
                    placeholder: "Re-enter your password",
                    name: "confirmPassword",
                    required: true,
                    validation: {
                      required: true,
                      requiredMessage: "Please confirm your password",
                      match: "password",
                      matchMessage: "Passwords do not match",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Already have an account?",
                    action: "openModal:authModal",
                    variant: "secondary",
                  },
                  {
                    label: "Sign Up",
                    action: "api:auth.signup",
                    variant: "primary",
                    apiKey: "auth.signup",
                  },
                ],
              },

              // ✅ FORGOT PASSWORD MODAL WITH VALIDATION
              forgotModal: {
                "ui:title": "🔒 Reset Your Password",
                "ui:theme": "light",
                "ui:content": "Enter your email address and we'll send you an OTP to reset your password.",
                "ui:minHeight": "350px",
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
                      emailMessage: "Please enter a valid email address",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Back to Login",
                    action: "openModal:authModal",
                    variant: "secondary",
                  },
                  {
                    label: "Send OTP",
                    action: "api:auth.forgot",
                    variant: "primary",
                    apiKey: "auth.forgot",
                  },
                ],
              },

              // ✅ NEW: OTP VERIFICATION MODAL
              otpModal: {
                "ui:title": "📱 Verify OTP",
                "ui:theme": "light",
                "ui:content": "Enter the 6-digit OTP sent to your email address.",
                "ui:minHeight": "350px",
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
                      emailMessage: "Please enter a valid email address",
                    },
                  },
                  {
                    label: "OTP Code",
                    type: "text",
                    placeholder: "123456",
                    name: "otp",
                    required: true,
                    validation: {
                      required: true,
                      requiredMessage: "OTP is required",
                      pattern: "^[0-9]{6}$",
                      patternMessage: "OTP must be 6 digits",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Resend OTP",
                    action: "api:auth.forgot",
                    variant: "secondary",
                    apiKey: "auth.forgot",
                  },
                  {
                    label: "Verify OTP",
                    action: "api:auth.verifyOtp",
                    variant: "primary",
                    apiKey: "auth.verifyOtp",
                  },
                ],
              },

              // ✅ CHECKOUT MODAL WITH VALIDATION
              checkoutModal: {
                "ui:title": "💳 Checkout",
                "ui:theme": "light",
                "ui:content": "Complete your purchase securely. Total: $520.30",
                "ui:minHeight": "500px",
                "ui:fields": [
                  {
                    label: "Card Number",
                    type: "text",
                    placeholder: "1234 5678 9012 3456",
                    name: "cardNumber",
                    required: true,
                    validation: {
                      required: true,
                      requiredMessage: "Card number is required",
                      pattern: "^[0-9]{16}$",
                      patternMessage: "Card number must be 16 digits",
                    },
                  },
                  {
                    label: "Cardholder Name",
                    type: "text",
                    placeholder: "John Doe",
                    name: "cardName",
                    required: true,
                    validation: {
                      required: true,
                      requiredMessage: "Cardholder name is required",
                      minLength: 3,
                      minLengthMessage: "Name must be at least 3 characters",
                    },
                  },
                  {
                    label: "Expiry Date (MM/YY)",
                    type: "text",
                    placeholder: "12/25",
                    name: "expiry",
                    required: true,
                    validation: {
                      required: true,
                      requiredMessage: "Expiry date is required",
                      pattern: "^(0[1-9]|1[0-2])\\/[0-9]{2}$",
                      patternMessage: "Format must be MM/YY",
                    },
                  },
                  {
                    label: "CVV",
                    type: "password",
                    placeholder: "123",
                    name: "cvv",
                    required: true,
                    validation: {
                      required: true,
                      requiredMessage: "CVV is required",
                      pattern: "^[0-9]{3,4}$",
                      patternMessage: "CVV must be 3 or 4 digits",
                    },
                  },
                ],
                "ui:actions": [
                  {
                    label: "Cancel",
                    action: "closeModal",
                    variant: "secondary",
                  },
                  {
                    label: "Complete Purchase $520.30",
                    action: "api:checkout.complete",
                    variant: "primary",
                    apiKey: "checkout.complete",
                  },
                ],
              },
            },
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "🛒️ ShopZone",
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
                  { label: "Home", action: "navigate:/shopzone" },
                  { label: "Categories", action: "navigate:/shopzone/categories" },
                  { label: "Cart (3)", action: "navigate:/shopzone/cart" },
                  { label: "Login", action: "openModal:authModal" },
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
                "ui:description": "Premium noise-cancelling headphones with 30-hour battery life. Quantity: 1",
                "ui:image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
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
                "ui:description": "Fitness tracker with heart rate monitor and GPS. Quantity: 1",
                "ui:image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
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
                "ui:description": "Ergonomic adjustable laptop stand for desk. Quantity: 2",
                "ui:image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
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
                "ui:description": "Subtotal: $458.00 | Shipping: $15.00 | Tax: $47.30 | Total: $520.30",
                "ui:action": "openModal:checkoutModal",
                "ui:buttonLabel": "Proceed to Checkout 💳",
                "ui:styles": {
                  maxWidth: "900px",
                  margin: "0 auto",
                  padding: "30px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
    },

    components: {
      navbar: {
        table: {},
        modal: {
          authModal: {
            "ui:title": "🔐 Welcome to ShopZone",
            "ui:theme": "light",
            "ui:content": "Sign in to access your account and start shopping!",
            "ui:fields": [
              {
                label: "Email Address",
                type: "email",
                placeholder: "you@example.com",
                name: "email",
                validation: {
                  required: true,
                  requiredMessage: "Email is required",
                  email: true,
                  emailMessage: "Please enter a valid email address",
                },
              },
              {
                label: "Password",
                type: "password",
                placeholder: "Enter your password",
                name: "password",
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
              },
              {
                label: "Create Account",
                action: "openModal:signupModal",
                variant: "secondary",
              },
            ],
          },

          signupModal: {
            "ui:title": "✨ Create Your Account",
            "ui:theme": "light",
            "ui:content": "Join ShopZone and start shopping today!",
            "ui:fields": [
              {
                label: "Full Name",
                type: "text",
                placeholder: "John Doe",
                name: "fullName",
                validation: {
                  required: true,
                  requiredMessage: "Full name is required",
                  minLength: 3,
                  minLengthMessage: "Name must be at least 3 characters",
                },
              },
              {
                label: "Email Address",
                type: "email",
                placeholder: "you@example.com",
                name: "email",
                validation: {
                  required: true,
                  requiredMessage: "Email is required",
                  email: true,
                  emailMessage: "Please enter a valid email address",
                },
              },
              {
                label: "Password",
                type: "password",
                placeholder: "Create a strong password",
                name: "password",
                validation: {
                  required: true,
                  requiredMessage: "Password is required",
                  minLength: 8,
                  minLengthMessage: "Password must be at least 8 characters",
                },
              },
              {
                label: "Confirm Password",
                type: "password",
                placeholder: "Re-enter your password",
                name: "confirmPassword",
                validation: {
                  required: true,
                  requiredMessage: "Please confirm your password",
                  match: "password",
                  matchMessage: "Passwords do not match",
                },
              },
            ],
            "ui:actions": [
              {
                label: "Already have an account?",
                action: "openModal:authModal",
                variant: "secondary",
              },
              {
                label: "Sign Up",
                action: "api:auth.signup",
                variant: "primary",
              },
            ],
          },

          forgotModal: {
            "ui:title": "🔒 Reset Your Password",
            "ui:theme": "light",
            "ui:content": "Enter your email address and we'll send you a password reset link.",
            "ui:fields": [
              {
                label: "Email Address",
                type: "email",
                placeholder: "you@example.com",
                name: "email",
                validation: {
                  required: true,
                  requiredMessage: "Email is required",
                  email: true,
                  emailMessage: "Please enter a valid email address",
                },
              },
            ],
            "ui:actions": [
              {
                label: "Back to Login",
                action: "openModal:authModal",
                variant: "secondary",
              },
              {
                label: "Send Reset Link",
                action: "api:auth.forgot",
                variant: "primary",
              },
            ],
          },

          checkoutModal: {
            "ui:title": "💳 Checkout",
            "ui:theme": "light",
            "ui:content": "Complete your purchase securely",
            "ui:fields": [
              {
                label: "Card Number",
                type: "text",
                placeholder: "1234 5678 9012 3456",
                name: "cardNumber",
                validation: {
                  required: true,
                  requiredMessage: "Card number is required",
                  pattern: "^[0-9]{16}$",
                  patternMessage: "Card number must be 16 digits",
                },
              },
              {
                label: "Cardholder Name",
                type: "text",
                placeholder: "John Doe",
                name: "cardName",
                validation: {
                  required: true,
                  requiredMessage: "Cardholder name is required",
                },
              },
              {
                label: "Expiry Date",
                type: "text",
                placeholder: "MM/YY",
                name: "expiry",
                validation: {
                  required: true,
                  requiredMessage: "Expiry date is required",
                  pattern: "^(0[1-9]|1[0-2])\\/[0-9]{2}$",
                  patternMessage: "Format must be MM/YY",
                },
              },
              {
                label: "CVV",
                type: "text",
                placeholder: "123",
                name: "cvv",
                validation: {
                  required: true,
                  requiredMessage: "CVV is required",
                  pattern: "^[0-9]{3,4}$",
                  patternMessage: "CVV must be 3 or 4 digits",
                },
              },
            ],
            "ui:actions": [
              {
                label: "Cancel",
                action: "closeModal",
                variant: "secondary",
              },
              {
                label: "Complete Purchase $520.30",
                action: "api:/checkout/complete",
                variant: "primary",
              },
            ],
          },
        },
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🛒️ ShopZone",
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
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              { label: "Home", action: "navigate:/shopzone" },
              { label: "Categories", action: "navigate:/shopzone/categories" },
              { label: "Cart (3)", action: "navigate:/shopzone/cart" },
              { label: "Login", action: "openModal:authModal" },
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
            "ui:subtitle": "Up to 50% OFF on selected items. Limited time offer!",
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
            "ui:description": "Premium Wireless Earbuds - Now at $79.99 (was $149.99). Hurry, only 12 left in stock!",
            "ui:image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=400&fit=crop",
            "ui:action": "openModal:authModal",
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
            "ui:quote": "Amazing quality and fast shipping! Will definitely order again.",
            "ui:author": "Sarah Johnson",
            "ui:role": "Verified Buyer",
            "ui:avatar": "https://i.pravatar.cc/100?img=1",
            "ui:rating": 5,
            "ui:styles": { maxWidth: "600px", margin: "0 auto 30px" },
          },

          testimonial2: {
            "ui:widget": "testimonial",
            "ui:quote": "Best online shopping experience ever. Highly recommend ShopZone!",
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
            "ui:text": "🛒️ ShopZone",
            "ui:level": "h3",
            "ui:styles": {
              textAlign: "center",
              color: "#e2e8f0",
              marginBottom: "20px",
            },
          },
          footerDesc: {
            "ui:widget": "paragraph",
            "ui:text": "Your one-stop destination for quality products at unbeatable prices. Shop with confidence!",
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
                emoji: "🦋",
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
  } catch (err) {
    console.error("❌ Seed failed:", err);
    mongoose.disconnect();
  }
};

seed