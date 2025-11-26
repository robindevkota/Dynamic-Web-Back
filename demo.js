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
    title: "DevFolio - Creative Portfolio",
    slug: "devfolio",
    projectUUID: "portfolio-devfolio",
    taskUUID: "port001",
    status: "Active",
    accountValidation: true,
    otpValidation: false,
    isAnonymous: false,

    initialization: {
      globalCSS:
        "* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Inter', -apple-system, sans-serif; color: #1e293b; background: #ffffff; overflow-x: hidden; } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } } @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } } @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } } @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } } .animate-fade-in { animation: fadeInUp 0.8s ease-out forwards; } .animate-slide-left { animation: slideInLeft 0.8s ease-out forwards; } .animate-slide-right { animation: slideInRight 0.8s ease-out forwards; } button:hover { transform: translateY(-2px); transition: all 0.3s ease; } section { animation: fadeInUp 1s ease-out; } html { scroll-behavior: smooth; }",
      resources: ["auth.login", "auth.signup", "auth.forgot"],
    },

    pages: {
      about: {
        title: "About Me",
        components: {
          navbar: {
            table: {},
            modal: {
              authModal: {
                "ui:title": "🔐 Welcome Back",
                "ui:theme": "light",
                "ui:content":
                  "Sign in to access your dashboard and saved projects!",
                "ui:fields": [
                  {
                    label: "Email Address",
                    type: "email",
                    placeholder: "eve.holt@reqres.in",
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
                    placeholder: "cityslicka",
                    name: "password",
                    required: true,
                    validation: {
                      required: true,
                      requiredMessage: "Password is required",
                      minLength: 6,
                      minLengthMessage:
                        "Password must be at least 6 characters",
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
              signupModal: {
                "ui:title": "✨ Join DevFolio",
                "ui:theme": "light",
                "ui:content":
                  "Create your account and start building your portfolio!",
                "ui:fields": [
                  {
                    label: "Email Address",
                    type: "email",
                    placeholder: "eve.holt@reqres.in",
                    name: "email",
                    required: true,
                  },
                  {
                    label: "Password",
                    type: "password",
                    placeholder: "Create a strong password",
                    name: "password",
                    required: true,
                  },
                  {
                    label: "Confirm Password",
                    type: "password",
                    placeholder: "Re-enter your password",
                    name: "confirmPassword",
                    required: true,
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
              forgotModal: {
                "ui:title": "🔑 Reset Password",
                "ui:theme": "light",
                "ui:content": "Enter your email to receive reset instructions.",
                "ui:fields": [
                  {
                    label: "Email Address",
                    type: "email",
                    placeholder: "eve.holt@reqres.in",
                    name: "email",
                    required: true,
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
                    apiKey: "auth.forgot",
                  },
                ],
              },
            },
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "💼 DevFolio",
                "ui:styles": {
                  fontSize: "26px",
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
                  { label: "Home", action: "navigate:/devfolio" },
                  { label: "About", action: "navigate:/devfolio/about" },
                  { label: "Projects", action: "navigate:/devfolio/projects" },
                  {
                    label: "{{auth.token ? 'Dashboard' : 'Login'}}",
                    action:
                      "{{auth.token ? 'navigate:/dashboard' : 'openModal:authModal'}}",
                  },
                  {
                    label: "{{auth.token ? 'Logout' : ''}}",
                    action: "clearAuth+reload",
                  },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "2px solid #f0f0f0",
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
                "ui:text": "👨‍💻 About Me",
                "ui:level": "h1",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "60px",
                  marginTop: "140px",
                  fontSize: "3.5rem",
                  animation: "fadeInUp 0.8s ease-out",
                },
              },
              aboutCard: {
                "ui:widget": "card",
                "ui:title": "Full Stack Developer & Designer",
                "ui:description":
                  "I'm a passionate developer with 5+ years of experience building beautiful, functional web applications. I specialize in React, Node.js, and modern UI/UX design. My goal is to create digital experiences that make people's lives easier and more enjoyable.",
                "ui:image":
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                "ui:styles": {
                  maxWidth: "900px",
                  margin: "0 auto 60px",
                  padding: "40px",
                  animation: "slideInLeft 0.8s ease-out",
                  minHeight: "300px",
                },
                "ui:imageStyles": {
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  border: "5px solid #667eea",
                },
              },
              skillsHeading: {
                "ui:widget": "heading",
                "ui:text": "🚀 My Skills",
                "ui:level": "h2",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "50px",
                  fontSize: "2.5rem",
                  animation: "fadeInUp 1s ease-out",
                },
              },
              skillsCard: {
                "ui:widget": "skillRadar",
                "ui:skills": [
                  { name: "React & Next.js", level: 95 },
                  { name: "Node.js & Express", level: 90 },
                  { name: "UI/UX Design", level: 85 },
                  { name: "TypeScript", level: 88 },
                  { name: "MongoDB & PostgreSQL", level: 82 },
                  { name: "AWS & DevOps", level: 75 },
                ],
                "ui:styles": {
                  maxWidth: "800px",
                  margin: "0 auto",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  animation: "slideInRight 0.8s ease-out",
                },
              },
              spacer1: { "ui:widget": "spacer", "ui:height": 80 },
              testimonialsHeading: {
                "ui:widget": "heading",
                "ui:text": "💬 What People Say",
                "ui:level": "h2",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "50px",
                  fontSize: "2.5rem",
                },
              },
              testimonial1: {
                "ui:widget": "testimonial",
                "ui:quote":
                  "Incredible developer! Delivered our project ahead of schedule with exceptional quality. Highly recommended!",
                "ui:author": "Sarah Johnson",
                "ui:role": "CEO, TechStart",
                "ui:avatar": "https://i.pravatar.cc/100?img=1",
                "ui:rating": 5,
                "ui:styles": {
                  maxWidth: "700px",
                  margin: "0 auto 30px",
                  animation: "fadeInUp 0.8s ease-out 0.2s both",
                },
              },
              testimonial2: {
                "ui:widget": "testimonial",
                "ui:quote":
                  "Working with them was a game-changer for our business. Creative, professional, and always available.",
                "ui:author": "Michael Chen",
                "ui:role": "Product Manager, InnovateCo",
                "ui:avatar": "https://i.pravatar.cc/100?img=3",
                "ui:rating": 5,
                "ui:styles": {
                  maxWidth: "700px",
                  margin: "0 auto",
                  animation: "fadeInUp 0.8s ease-out 0.4s both",
                },
              },
            },
            styles: {
              padding: "120px 40px 80px",
              background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
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
                "ui:content": "© 2024 DevFolio. Crafted with ❤️",
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
      projects: {
        title: "My Projects",
        components: {
          navbar: {
            table: {},
            modal: {
              authModal: {
                "ui:title": "🔐 Welcome Back",
                "ui:theme": "light",
                "ui:content": "Sign in to access your dashboard!",
                "ui:fields": [
                  {
                    label: "Email Address",
                    type: "email",
                    placeholder: "eve.holt@reqres.in",
                    name: "email",
                    required: true,
                  },
                  {
                    label: "Password",
                    type: "password",
                    placeholder: "cityslicka",
                    name: "password",
                    required: true,
                  },
                ],
                "ui:actions": [
                  {
                    label: "Sign In",
                    action: "api:auth.login",
                    variant: "primary",
                    apiKey: "auth.login",
                  },
                ],
              },
            },
            uiSchema: {
              logo: {
                "ui:widget": "text",
                "ui:content": "💼 DevFolio",
                "ui:styles": {
                  fontSize: "26px",
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
                  { label: "Home", action: "navigate:/devfolio" },
                  { label: "About", action: "navigate:/devfolio/about" },
                  { label: "Projects", action: "navigate:/devfolio/projects" },
                  { label: "Login", action: "openModal:authModal" },
                ],
              },
            },
            styles: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "2px solid #f0f0f0",
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
                "ui:text": "🎨 Featured Projects",
                "ui:level": "h1",
                "ui:styles": {
                  textAlign: "center",
                  marginBottom: "70px",
                  marginTop: "140px",
                  fontSize: "3.5rem",
                  animation: "fadeInUp 0.8s ease-out",
                },
              },
              project1: {
                "ui:widget": "card",
                "ui:title": "🚀 SaaS Dashboard Platform",
                "ui:description":
                  "A comprehensive analytics dashboard built with React, Node.js, and PostgreSQL. Features real-time data visualization, user management, and API integrations. Served 10,000+ active users.",
                "ui:image":
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
                "ui:buttonLabel": "View Case Study",
                "ui:styles": {
                  maxWidth: "900px",
                  margin: "0 auto 50px",
                  padding: "35px",
                  animation: "fadeInUp 0.8s ease-out 0.2s both",
                  transform: "translateY(0)",
                  transition: "all 0.3s ease",
                },
                "ui:imageStyles": {
                  height: "300px",
                  objectFit: "cover",
                },
              },
              project2: {
                "ui:widget": "card",
                "ui:title": "🎵 Music Streaming App",
                "ui:description":
                  "Full-stack music streaming application with user authentication, playlist management, and social features. Built using Next.js, MongoDB, and AWS S3 for audio storage.",
                "ui:image":
                  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
                "ui:buttonLabel": "Explore Project",
                "ui:styles": {
                  maxWidth: "900px",
                  margin: "0 auto 50px",
                  padding: "35px",
                  animation: "fadeInUp 0.8s ease-out 0.4s both",
                },
                "ui:imageStyles": {
                  height: "300px",
                  objectFit: "cover",
                },
              },
              project3: {
                "ui:widget": "card",
                "ui:title": "🛒 E-commerce Mobile App",
                "ui:description":
                  "React Native mobile app with seamless checkout experience, push notifications, and offline mode. Integrated with Stripe for payments and Firebase for real-time updates.",
                "ui:image":
                  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
                "ui:buttonLabel": "See Details",
                "ui:styles": {
                  maxWidth: "900px",
                  margin: "0 auto 50px",
                  padding: "35px",
                  animation: "fadeInUp 0.8s ease-out 0.6s both",
                },
                "ui:imageStyles": {
                  height: "300px",
                  objectFit: "cover",
                },
              },
              spacer1: { "ui:widget": "spacer", "ui:height": 60 },
              ctaCard: {
                "ui:widget": "card",
                "ui:title": "💡 Have a Project in Mind?",
                "ui:description":
                  "Let's collaborate and bring your ideas to life! I'm available for freelance projects and consulting.",
                "ui:action": "openModal:authModal",
                "ui:buttonLabel": "Get in Touch",
                "ui:styles": {
                  maxWidth: "700px",
                  margin: "0 auto",
                  padding: "50px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  textAlign: "center",
                  border: "none",
                  animation: "pulse 2s ease-in-out infinite",
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
                "ui:content": "© 2024 DevFolio. Crafted with ❤️",
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
    },

    components: {
      navbar: {
        table: {},
        modal: {
          authModal: {
            "ui:title": "🔐 Welcome Back",
            "ui:theme": "light",
            "ui:content":
              "Sign in to access your dashboard and manage your portfolio!",
            "ui:fields": [
              {
                label: "Email Address",
                type: "email",
                placeholder: "eve.holt@reqres.in",
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
                placeholder: "cityslicka",
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
          signupModal: {
            "ui:title": "✨ Join DevFolio",
            "ui:theme": "light",
            "ui:content":
              "Create your account and start building your professional portfolio!",
            "ui:fields": [
              {
                label: "Full Name",
                type: "text",
                placeholder: "John Doe",
                name: "name",
                required: true,
              },
              {
                label: "Email Address",
                type: "email",
                placeholder: "eve.holt@reqres.in",
                name: "email",
                required: true,
              },
              {
                label: "Password",
                type: "password",
                placeholder: "Create a strong password",
                name: "password",
                required: true,
              },
              {
                label: "Confirm Password",
                type: "password",
                placeholder: "Re-enter your password",
                name: "confirmPassword",
                required: true,
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
          forgotModal: {
            "ui:title": "🔑 Reset Your Password",
            "ui:theme": "light",
            "ui:content":
              "Enter your email address and we'll send you instructions to reset your password.",
            "ui:fields": [
              {
                label: "Email Address",
                type: "email",
                placeholder: "eve.holt@reqres.in",
                name: "email",
                required: true,
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
                apiKey: "auth.forgot",
              },
            ],
          },
        },
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "💼 DevFolio",
            "ui:styles": {
              fontSize: "26px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
              animation: "slideInLeft 0.6s ease-out",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              { label: "Home", action: "navigate:/devfolio" },
              { label: "About", action: "navigate:/devfolio/about" },
              { label: "Projects", action: "navigate:/devfolio/projects" },
              {
                label:
                  "{{auth.token ? 'Welcome, ' + auth.user.email : 'Login'}}",
                action:
                  "{{auth.token ? 'console:logged-in' : 'openModal:authModal'}}",
              },
              {
                label: "{{auth.token ? 'Logout' : ''}}",
                action: "clearAuth+reload",
              },
            ],
          },
        },
        styles: {
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "2px solid #f0f0f0",
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
            "ui:title": "Hi, I'm Alex 👋",
            "ui:subtitle":
              "Full Stack Developer | UI/UX Enthusiast | Problem Solver",
            "ui:cta": {
              label: "View My Work",
              action: "navigate:/devfolio/projects",
            },
            "ui:styles": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              minHeight: "600px",
              padding: "150px 40px 100px",
              animation: "fadeInUp 1s ease-out",
            },
          },
          spacer1: { "ui:widget": "spacer", "ui:height": 80 },

          // 🆕 NEW COLUMNS WIDGET SHOWCASE
          servicesShowcase: {
            "ui:widget": "columns",
            "ui:ratio": "1:1:1",
            "ui:gap": "40px",
            "ui:responsive": { tablet: 2, mobile: 1 },
            "ui:columns": [
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:gap": "20px",
                "ui:children": [
                  {
                    "ui:widget": "icon",
                    "ui:emoji": "⚡",
                    "ui:size": "large",
                  },
                  {
                    "ui:widget": "heading",
                    "ui:text": "Fast Development",
                    "ui:level": "h3",
                  },
                  {
                    "ui:widget": "text",
                    "ui:content":
                      "Quick turnaround without compromising quality",
                  },
                ],
              },
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:gap": "20px",
                "ui:children": [
                  {
                    "ui:widget": "icon",
                    "ui:emoji": "🎨",
                    "ui:size": "large",
                  },
                  {
                    "ui:widget": "heading",
                    "ui:text": "Modern Design",
                    "ui:level": "h3",
                  },
                  {
                    "ui:widget": "text",
                    "ui:content":
                      "Clean, responsive designs that work everywhere",
                  },
                ],
              },
              {
                "ui:widget": "container",
                "ui:direction": "column",
                "ui:align": "center",
                "ui:gap": "20px",
                "ui:children": [
                  {
                    "ui:widget": "icon",
                    "ui:emoji": "🔧",
                    "ui:size": "large",
                  },
                  {
                    "ui:widget": "heading",
                    "ui:text": "Full Stack",
                    "ui:level": "h3",
                  },
                  {
                    "ui:widget": "text",
                    "ui:content":
                      "End-to-end solutions from frontend to backend",
                  },
                ],
              },
            ],
          },

          spacer2: { "ui:widget": "spacer", "ui:height": 80 },

          statsHeading: {
            "ui:widget": "heading",
            "ui:text": "📊 By The Numbers",
            "ui:level": "h2",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "60px",
              fontSize: "2.5rem",
              animation: "fadeInUp 0.8s ease-out 0.2s both",
            },
          },

          // 🆕 USING COLUMNS FOR STATS INSTEAD OF FLEXLAYOUT
          statsContainer: {
            "ui:widget": "columns",
            "ui:ratio": "1:1:1",
            "ui:gap": "40px",
            "ui:align": "center",
            "ui:columns": [
              {
                "ui:widget": "statsCounter",
                "ui:value": "50+",
                "ui:label": "Projects Completed",
                "ui:color": "#667eea",
                "ui:styles": {
                  animation: "float 3s ease-in-out infinite",
                },
              },
              {
                "ui:widget": "statsCounter",
                "ui:value": "30+",
                "ui:label": "Happy Clients",
                "ui:color": "#764ba2",
                "ui:styles": {
                  animation: "float 3s ease-in-out infinite 0.5s",
                },
              },
              {
                "ui:widget": "statsCounter",
                "ui:value": "5+",
                "ui:label": "Years Experience",
                "ui:color": "#f093fb",
                "ui:styles": {
                  animation: "float 3s ease-in-out infinite 1s",
                },
              },
            ],
          },

          spacer3: { "ui:widget": "spacer", "ui:height": 60 },

          featuredHeading: {
            "ui:widget": "heading",
            "ui:text": "🌟 Featured Work",
            "ui:level": "h2",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "50px",
              fontSize: "2.5rem",
            },
          },

          // 🆕 USING RESPONSIVE GRID FOR PROJECTS
          projectsGrid: {
            "ui:widget": "responsiveGrid",
            "ui:columns": { desktop: 3, tablet: 2, mobile: 1 },
            "ui:gap": "30px",
            "ui:items": [
              {
                "ui:widget": "card",
                "ui:title": "SaaS Dashboard",
                "ui:description":
                  "Real-time analytics platform serving 10K+ users",
                "ui:image":
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
                "ui:action": "navigate:/devfolio/projects",
                "ui:buttonLabel": "View Project",
              },
              {
                "ui:widget": "card",
                "ui:title": "Music Streaming App",
                "ui:description": "Full-stack app with social features",
                "ui:image":
                  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=250&fit=crop",
                "ui:action": "navigate:/devfolio/projects",
                "ui:buttonLabel": "View Project",
              },
              {
                "ui:widget": "card",
                "ui:title": "E-commerce Mobile",
                "ui:description": "React Native app with offline mode",
                "ui:image":
                  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
                "ui:action": "navigate:/devfolio/projects",
                "ui:buttonLabel": "View Project",
              },
            ],
          },

          spacer4: { "ui:widget": "spacer", "ui:height": 80 },

          // 🆕 SIDEBAR LAYOUT FOR ABOUT PREVIEW
          aboutPreview: {
            "ui:widget": "sidebarLayout",
            "ui:sidebarWidth": "300px",
            "ui:gap": "50px",
            "ui:sidebar": {
              "ui:widget": "image",
              "ui:src":
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
              "ui:styles": {
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              },
            },
            "ui:main": {
              "ui:widget": "container",
              "ui:direction": "column",
              "ui:gap": "20px",
              "ui:children": [
                {
                  "ui:widget": "heading",
                  "ui:text": "Why Work With Me?",
                  "ui:level": "h2",
                },
                {
                  "ui:widget": "text",
                  "ui:content":
                    "I combine technical expertise with creative problem-solving to deliver solutions that not only work flawlessly but also provide exceptional user experiences.",
                },
                {
                  "ui:widget": "columns",
                  "ui:ratio": "1:1",
                  "ui:gap": "30px",
                  "ui:columns": [
                    {
                      "ui:widget": "container",
                      "ui:direction": "column",
                      "ui:gap": "10px",
                      "ui:children": [
                        {
                          "ui:widget": "heading",
                          "ui:text": "Clean Code",
                          "ui:level": "h4",
                        },
                        {
                          "ui:widget": "text",
                          "ui:content":
                            "Maintainable, scalable, and well-documented",
                        },
                      ],
                    },
                    {
                      "ui:widget": "container",
                      "ui:direction": "column",
                      "ui:gap": "10px",
                      "ui:children": [
                        {
                          "ui:widget": "heading",
                          "ui:text": "User-Focused",
                          "ui:level": "h4",
                        },
                        {
                          "ui:widget": "text",
                          "ui:content":
                            "Designs that prioritize user experience",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },

          spacer5: { "ui:widget": "spacer", "ui:height": 80 },

          ctaSection: {
            "ui:widget": "card",
            "ui:title": "Let's Work Together! 🤝",
            "ui:description":
              "I'm currently available for freelance projects and consulting opportunities. Let's create something amazing!",
            "ui:action": "openModal:authModal",
            "ui:buttonLabel": "Get Started",
            "ui:styles": {
              maxWidth: "800px",
              margin: "0 auto",
              padding: "60px 40px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              textAlign: "center",
              border: "none",
              animation: "pulse 2s ease-in-out infinite",
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
          footerHeading: {
            "ui:widget": "heading",
            "ui:text": "💼 DevFolio",
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
              "Building digital experiences that inspire and deliver results.",
            "ui:styles": {
              textAlign: "center",
              color: "#94a3b8",
              maxWidth: "500px",
              margin: "0 auto 30px",
            },
          },
          socialIcons: {
            "ui:widget": "socialIcons",
            "ui:size": "medium",
            "ui:variant": "colored",
            "ui:icons": [
              { emoji: "💼", platform: "linkedin", url: "#" },
              { emoji: "🐙", platform: "github", url: "#" },
              { emoji: "🐦", platform: "twitter", url: "#" },
              {
                emoji: "📧",
                platform: "email",
                url: "mailto:alex@devfolio.com",
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
            "ui:content": "© 2024 DevFolio. Crafted with ❤️ and ☕",
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
    console.log("📡 Database disconnected");
  } catch (err) {
    console.error("❌ Seed failed:", err);
    mongoose.disconnect();
  }
};

seed();
