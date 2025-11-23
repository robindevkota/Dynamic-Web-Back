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
    title: "Robin Devkota - Portfolio",
    slug: "robin-devkota",
    projectUUID: "portfolio",
    taskUUID: "001",
    status: "Active",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,
    initialization: {
      resources: [
        {
          key: "projects.api",
          url: "https://api.github.com/users/github/repos",
        },
        { key: "social.github", url: "https://github.com/robindevkota" },
      ],
    },
    components: {
      navbar: {
        table: {},
        modal: {},
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "Robin Devkota",
            "ui:styles": {
              fontSize: "24px",
              fontWeight: "bold",
              color: "#fff",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "dark",
            "ui:links": [
              { label: "Home", action: "navigate:/robin-devkota" },
              { label: "About", action: "scroll:#about" },
              { label: "Projects", action: "scroll:#projects" },
              { label: "Skills", action: "scroll:#skills" },
              { label: "Contact", action: "openModal:contactModal" },
            ],
          },
        },
        styles: {
          bg: "#0f172a",
          color: "#e2e8f0",
          position: "fixed",
          padding: "16px 32px",
          shadow: true,
          width: "100%",
          zIndex: 1000,
        },
        triggers: [{ event: "scroll", action: "fadeIn", threshold: 100 }],
      },
      sidebar: {
        table: {},
        modal: {},
        uiSchema: {
          skills: {
            "ui:widget": "skillRadar",
            "ui:skills": [
              { name: "React", level: 90 },
              { name: "Next.js", level: 85 },
              { name: "TypeScript", level: 80 },
              { name: "Node.js", level: 75 },
              { name: "MongoDB", level: 70 },
            ],
          },
        },
        styles: { width: "280px", bg: "#1e293b", padding: "24px" },
        triggers: [],
      },
      main: {
        table: {
          columns: [
            { title: "Name", dataIndex: "name", key: "name" },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
            },
          ],
          dataKey: "projects.api",
        },
        modal: {},
        uiSchema: {
          hero: {
            "ui:widget": "hero",
            "ui:title": "Full Stack Developer",
            "ui:subtitle":
              "Building modern web applications with passion and precision",
            "ui:cta": {
              label: "View My Work",
              action: "scroll:#projects",
            },
          },
          projects: {
            "ui:widget": "projectGrid",
            "ui:animated": true,
          },
        },
        styles: { padding: "80px 40px", bg: "#020617" },
        triggers: [
          { event: "load", action: "fetchProjects", source: "projects.api" },
        ],
      },
      modals: {
        table: {},
        modal: {
          contactModal: {
            "ui:widget": "modal",
            "ui:title": "Get In Touch",
            "ui:theme": "dark",
            "ui:content":
              "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
            "ui:fields": [
              {
                label: "Your Name",
                type: "text",
                placeholder: "John Doe",
              },
              {
                label: "Email Address",
                type: "email",
                placeholder: "john@example.com",
              },
              {
                label: "Message",
                type: "textarea",
                placeholder: "Tell me about your project...",
              },
            ],
            "ui:actions": [
              {
                label: "Cancel",
                action: "closeModal",
                variant: "secondary",
              },
              {
                label: "Send Message",
                action: "api:/contact/send",
                variant: "primary",
              },
            ],
          },
        },
        uiSchema: {},
        styles: {},
        triggers: [],
      },
      footer: {
        table: {},
        modal: {},
        uiSchema: {},
        styles: {},
        triggers: [],
      },
    },
  },
  {
    title: "TechVibe - Modern Tech Blog",
    slug: "techvibe-blog",
    projectUUID: "blog-orange-blue",
    taskUUID: "blog001",
    status: "Active",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,
    initialization: {
      resources: [
        { key: "posts.api", url: "https://jsonplaceholder.typicode.com/posts" },
        {
          key: "comments.api",
          url: "https://jsonplaceholder.typicode.com/comments",
        },
      ],
    },
    components: {
      navbar: {
        table: {},
        modal: {
          subscribeModal: {
            "ui:widget": "modal",
            "ui:title": "📧 Subscribe to TechVibe",
            "ui:theme": "light",
            "ui:content":
              "Get the latest tech articles, tutorials, and industry insights delivered to your inbox every week!",
            "ui:fields": [
              { label: "Your Name", type: "text", placeholder: "John Doe" },
              {
                label: "Email Address",
                type: "email",
                placeholder: "john@example.com",
              },
              {
                label: "Interests",
                type: "text",
                placeholder: "AI, Web Dev, Mobile...",
              },
            ],
            "ui:actions": [
              {
                label: "Maybe Later",
                action: "closeModal",
                variant: "secondary",
              },
              {
                label: "Subscribe Now",
                action: "api:/newsletter/subscribe",
                variant: "primary",
              },
            ],
          },
          searchModal: {
            "ui:widget": "modal",
            "ui:title": "🔍 Search Articles",
            "ui:theme": "light",
            "ui:content": "Find the perfect article from our extensive library",
            "ui:fields": [
              {
                label: "Search Keywords",
                type: "text",
                placeholder: "React, Node.js, Python...",
              },
              {
                label: "Category",
                type: "text",
                placeholder: "All Categories",
              },
            ],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              {
                label: "Search",
                action: "api:/articles/search",
                variant: "primary",
              },
            ],
          },
          contactModal: {
            "ui:widget": "modal",
            "ui:title": "✉️ Get in Touch",
            "ui:theme": "light",
            "ui:content":
              "Have a question, suggestion, or want to contribute? We'd love to hear from you!",
            "ui:fields": [
              { label: "Your Name", type: "text", placeholder: "Jane Smith" },
              {
                label: "Email",
                type: "email",
                placeholder: "jane@example.com",
              },
              {
                label: "Subject",
                type: "text",
                placeholder: "Guest Post Inquiry",
              },
              {
                label: "Message",
                type: "textarea",
                placeholder: "Tell us what's on your mind...",
              },
            ],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              {
                label: "Send Message",
                action: "api:/contact/send",
                variant: "primary",
              },
            ],
          },
        },
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🚀 TechVibe",
            "ui:styles": {
              fontSize: "28px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #FF6B35 0%, #1E88E5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              { label: "Home", action: "navigate:/techvibe-blog" },
              { label: "Articles", action: "scroll:#articles" },
              { label: "Categories", action: "scroll:#categories" },
              { label: "Search", action: "openModal:searchModal" },
              { label: "Subscribe", action: "openModal:subscribeModal" },
              { label: "Contact", action: "openModal:contactModal" },
            ],
          },
        },
        styles: {
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(30,136,229,0.05) 100%)",
          backdropFilter: "blur(10px)",
          borderBottom: "2px solid #FF6B35",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 4px 20px rgba(255,107,53,0.1)",
        },
        triggers: [],
      },

      sidebar: {
        table: {},
        modal: {},
        uiSchema: {
          categories: {
            "ui:widget": "skillRadar",
            "ui:skills": [
              { name: "🤖 AI & ML", level: 95 },
              { name: "⚛️ React & Next.js", level: 90 },
              { name: "🐍 Python", level: 85 },
              { name: "☁️ Cloud & DevOps", level: 80 },
              { name: "📱 Mobile Dev", level: 75 },
              { name: "🔐 Cybersecurity", level: 70 },
            ],
          },
        },
        styles: {
          width: "320px",
          background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
          padding: "120px 24px 24px 24px",
          borderRight: "1px solid #e0e0e0",
          minHeight: "100vh",
        },
        triggers: [],
      },

      main: {
        table: {
          featuredPosts: {
            title: "📰 Featured Articles",
            dataKey: "posts.api",
            columns: [
              { title: "ID", dataIndex: "id", key: "id" },
              { title: "Article Title", dataIndex: "title", key: "title" },
              { title: "Preview", dataIndex: "body", key: "body" },
            ],
          },
        },
        modal: {},
        uiSchema: {
          hero: {
            "ui:widget": "hero",
            "ui:title": "Welcome to TechVibe 🚀",
            "ui:subtitle":
              "Your daily dose of tech insights, tutorials, and industry trends. Stay ahead with cutting-edge content from expert developers and tech enthusiasts.",
            "ui:cta": {
              label: "Explore Articles",
              action: "scroll:#articles",
            },
          },
          posts: {
            "ui:widget": "projectGrid",
            "ui:animated": true,
          },
        },
        styles: {
          padding: "100px 40px 60px",
          background: "linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)",
          minHeight: "100vh",
        },
        triggers: [
          { event: "load", action: "fetchProjects", source: "posts.api" },
        ],
      },

      modals: {
        table: {},
        modal: {
          shareModal: {
            "ui:widget": "modal",
            "ui:title": "📤 Share This Article",
            "ui:theme": "light",
            "ui:content":
              "Spread the knowledge! Share this article with your network.",
            "ui:fields": [
              {
                label: "Platform",
                type: "text",
                placeholder: "Twitter, LinkedIn, Facebook...",
              },
              {
                label: "Add a comment",
                type: "textarea",
                placeholder: "What did you think?",
              },
            ],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              { label: "Share", action: "api:/share/post", variant: "primary" },
            ],
          },
          bookmarkModal: {
            "ui:widget": "modal",
            "ui:title": "🔖 Bookmark Article",
            "ui:theme": "light",
            "ui:content":
              "Save this article to read later or organize it into collections.",
            "ui:fields": [
              {
                label: "Collection Name",
                type: "text",
                placeholder: "Reading List, Favorites...",
              },
              {
                label: "Notes",
                type: "textarea",
                placeholder: "Add personal notes...",
              },
            ],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              {
                label: "Save Bookmark",
                action: "api:/bookmarks/add",
                variant: "primary",
              },
            ],
          },
        },
        uiSchema: {},
        styles: {},
        triggers: [],
      },

      footer: {
        table: {},
        modal: {},
        uiSchema: {
          footerContent: {
            "ui:widget": "text",
            "ui:content":
              "© 2024 TechVibe - Powered by passion for technology | Follow us on Twitter, LinkedIn & GitHub",
            "ui:styles": {
              textAlign: "center",
              padding: "40px 20px",
              color: "#64748b",
              fontSize: "15px",
              lineHeight: "1.8",
              borderTop: "3px solid",
              borderImage: "linear-gradient(90deg, #FF6B35, #1E88E5) 1",
            },
          },
        },
        styles: {
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(30,136,229,0.05) 100%)",
          marginTop: "80px",
        },
        triggers: [],
      },
    },
  },
  {
    title: "TechBit - Modern Blog",
    slug: "techbit-blog",
    projectUUID: "blog",
    taskUUID: "2025",
    status: "Active",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,
    initialization: {
      resources: [
        { key: "posts.api", url: "https://jsonplaceholder.typicode.com/posts" },
      ],
    },
    components: {
      navbar: {
        table: {},
        modal: {},
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "TechBit",
            "ui:styles": {
              fontSize: "28px",
              fontWeight: "bold",
              color: "#1f2937",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              { label: "Home", action: "navigate:/techbit-blog" },
              { label: "Articles", action: "scroll:#articles" },
              { label: "Categories", action: "scroll:#categories" },
              { label: "About", action: "navigate:/about" },
              { label: "Subscribe", action: "openModal:subscribeModal" },
            ],
          },
        },
        styles: {
          bg: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 32px",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
        },
        triggers: [],
      },
      sidebar: {
        table: {},
        modal: {},
        uiSchema: {
          categories: {
            "ui:widget": "skillRadar",
            "ui:skills": [
              { name: "JavaScript", level: 85 },
              { name: "React", level: 90 },
              { name: "DevOps", level: 70 },
              { name: "AI/ML", level: 65 },
            ],
          },
        },
        styles: { width: "300px", bg: "#f9fafb", padding: "24px" },
        triggers: [],
      },
      main: {
        table: {},
        modal: {},
        uiSchema: {
          posts: {
            "ui:widget": "projectGrid",
          },
        },
        styles: { flex: 1, padding: "80px 40px", bg: "#fff" },
        triggers: [
          { event: "load", action: "fetchProjects", source: "posts.api" },
        ],
      },
      modals: {
        table: {},
        modal: {
          subscribeModal: {
            "ui:widget": "modal",
            "ui:title": "Subscribe to TechBit",
            "ui:theme": "light",
            "ui:content":
              "Get the latest tech articles delivered to your inbox weekly!",
            "ui:fields": [
              { label: "Email", type: "email", placeholder: "you@example.com" },
            ],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              {
                label: "Subscribe",
                action: "api:/subscribe",
                variant: "primary",
              },
            ],
          },
        },
        uiSchema: {},
        styles: {},
        triggers: [],
      },
      footer: {
        table: {},
        modal: {},
        uiSchema: {},
        styles: {},
        triggers: [],
      },
    },
  },

  {
    title: "NepaShop - Ecommerce Store",
    slug: "nepa-shop",
    projectUUID: "ecomm",
    taskUUID: "shop001",
    status: "Active",
    accountValidation: true,
    otpValidation: true,
    isAnonymous: false,
    initialization: {
      resources: [
        { key: "products.api", url: "https://fakestoreapi.com/products" },
      ],
    },
    components: {
      navbar: {
        table: {},
        modal: {},
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🛍️ NepaShop",
            "ui:styles": {
              fontSize: "24px",
              fontWeight: "bold",
              color: "#fff",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "dark",
            "ui:links": [
              { label: "Shop", action: "navigate:/nepa-shop" },
              { label: "Electronics", action: "scroll:#electronics" },
              { label: "Clothing", action: "scroll:#clothing" },
              { label: "Deals", action: "scroll:#deals" },
              { label: "Cart (0)", action: "openModal:cartModal" },
            ],
          },
        },
        styles: {
          bg: "#1f2937",
          color: "white",
          padding: "16px 32px",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
        },
        triggers: [{ event: "click_cart", action: "openModal:cartModal" }],
      },
      sidebar: {
        table: {},
        modal: {},
        uiSchema: {
          filters: {
            "ui:widget": "skillRadar",
            "ui:skills": [
              { name: "Electronics", level: 100 },
              { name: "Fashion", level: 85 },
              { name: "Home", level: 70 },
              { name: "Sports", level: 60 },
            ],
          },
        },
        styles: { width: "320px", bg: "#f3f4f6", padding: "24px" },
        triggers: [],
      },
      main: {
        table: {},
        modal: {},
        uiSchema: {
          hero: {
            "ui:widget": "hero",
            "ui:title": "Shop Smart, Shop NepaShop",
            "ui:subtitle": "Best deals on electronics, fashion, and more!",
            "ui:cta": {
              label: "Browse Products",
              action: "scroll:#products",
            },
          },
          products: {
            "ui:widget": "projectGrid",
            "ui:animated": true,
          },
        },
        styles: { padding: "80px 20px", bg: "#fff" },
        triggers: [
          { event: "load", action: "fetchProjects", source: "products.api" },
        ],
      },
      modals: {
        table: {},
        modal: {
          cartModal: {
            "ui:widget": "modal",
            "ui:title": "Shopping Cart",
            "ui:theme": "light",
            "ui:content": "Your cart is currently empty.",
            "ui:fields": [],
            "ui:actions": [
              {
                label: "Continue Shopping",
                action: "closeModal",
                variant: "secondary",
              },
              {
                label: "Checkout",
                action: "navigate:/checkout",
                variant: "primary",
              },
            ],
          },
        },
        uiSchema: {},
        styles: {},
        triggers: [],
      },
      footer: {
        table: {},
        modal: {},
        uiSchema: {},
        styles: {},
        triggers: [],
      },
    },
  },
  {
    title: "Enterprise Dashboard - Multi Table & Modal Demo",
    slug: "enterprise-dashboard",
    projectUUID: "enterprise",
    taskUUID: "demo001",
    status: "Active",
    accountValidation: true,
    otpValidation: true,
    isAnonymous: false,
    initialization: {
      resources: [
        { key: "users.api", url: "https://jsonplaceholder.typicode.com/users" },
        { key: "posts.api", url: "https://jsonplaceholder.typicode.com/posts" },
        { key: "todos.api", url: "https://jsonplaceholder.typicode.com/todos" },
        {
          key: "albums.api",
          url: "https://jsonplaceholder.typicode.com/albums",
        },
      ],
    },
    components: {
      navbar: {
        // 🔥 NAVBAR: Multiple Modals
        table: {},
        modal: {
          profileModal: {
            "ui:widget": "modal",
            "ui:title": "User Profile",
            "ui:theme": "dark",
            "ui:content": "View and edit your profile information",
            "ui:fields": [
              { label: "Full Name", type: "text", placeholder: "John Doe" },
              {
                label: "Email",
                type: "email",
                placeholder: "john@example.com",
              },
              { label: "Phone", type: "tel", placeholder: "+1234567890" },
            ],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              {
                label: "Save Changes",
                action: "api:/profile/update",
                variant: "primary",
              },
            ],
          },
          settingsModal: {
            "ui:widget": "modal",
            "ui:title": "Settings",
            "ui:theme": "dark",
            "ui:content": "Configure your dashboard preferences",
            "ui:fields": [
              { label: "Theme", type: "text", placeholder: "Dark/Light" },
              { label: "Language", type: "text", placeholder: "English" },
              { label: "Notifications", type: "text", placeholder: "Enabled" },
            ],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              {
                label: "Apply",
                action: "api:/settings/save",
                variant: "primary",
              },
            ],
          },
          helpModal: {
            "ui:widget": "modal",
            "ui:title": "Help & Support",
            "ui:theme": "light",
            "ui:content":
              "Get help with using the dashboard. Our support team is here 24/7 to assist you.",
            "ui:fields": [
              {
                label: "Subject",
                type: "text",
                placeholder: "What do you need help with?",
              },
              {
                label: "Description",
                type: "textarea",
                placeholder: "Describe your issue...",
              },
            ],
            "ui:actions": [
              { label: "Close", action: "closeModal", variant: "secondary" },
              {
                label: "Submit Ticket",
                action: "api:/support/create",
                variant: "primary",
              },
            ],
          },
        },
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🏢 Enterprise Dashboard",
            "ui:styles": {
              fontSize: "24px",
              fontWeight: "bold",
              color: "#fff",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "dark",
            "ui:links": [
              { label: "Dashboard", action: "navigate:/enterprise-dashboard" },
              { label: "Profile", action: "openModal:profileModal" },
              { label: "Settings", action: "openModal:settingsModal" },
              { label: "Help", action: "openModal:helpModal" },
              { label: "Logout", action: "api:/auth/logout" },
            ],
          },
        },
        styles: {
          bg: "#0f172a",
          color: "#e2e8f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          padding: "16px 32px",
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
        triggers: [],
      },

      sidebar: {
        table: {},
        modal: {},
        uiSchema: {
          menu: {
            "ui:widget": "skillRadar",
            "ui:skills": [
              { name: "Users", level: 100 },
              { name: "Posts", level: 85 },
              { name: "Tasks", level: 70 },
              { name: "Analytics", level: 60 },
            ],
          },
        },
        styles: {
          width: "280px",
          bg: "#1e293b",
          padding: "24px",
          minHeight: "calc(100vh - 80px)",
        },
        triggers: [],
      },

      main: {
        // 🔥 MAIN: Multiple Tables
        table: {
          usersTable: {
            title: "👥 Users Management",
            dataKey: "users.api",
            columns: [
              { title: "ID", dataIndex: "id", key: "id" },
              { title: "Name", dataIndex: "name", key: "name" },
              { title: "Email", dataIndex: "email", key: "email" },
              { title: "Company", dataIndex: "company", key: "company" },
            ],
          },
          postsTable: {
            title: "📝 Recent Posts",
            dataKey: "posts.api",
            columns: [
              { title: "ID", dataIndex: "id", key: "id" },
              { title: "User ID", dataIndex: "userId", key: "userId" },
              { title: "Title", dataIndex: "title", key: "title" },
              { title: "Body", dataIndex: "body", key: "body" },
            ],
          },
          todosTable: {
            title: "✅ Task Overview",
            dataKey: "todos.api",
            columns: [
              { title: "ID", dataIndex: "id", key: "id" },
              { title: "User", dataIndex: "userId", key: "userId" },
              { title: "Task", dataIndex: "title", key: "title" },
              { title: "Status", dataIndex: "completed", key: "completed" },
            ],
          },
        },
        modal: {},
        uiSchema: {
          hero: {
            "ui:widget": "hero",
            "ui:title": "Enterprise Dashboard",
            "ui:subtitle": "Manage your entire organization from one place",
            "ui:cta": {
              label: "View Analytics",
              action: "scroll:#analytics",
            },
          },
        },
        styles: {
          padding: "100px 40px 40px",
          bg: "#f8fafc",
          minHeight: "100vh",
        },
        triggers: [{ event: "load", action: "fetchData", source: "users.api" }],
      },

      modals: {
        // 🔥 GLOBAL MODALS: Shared across all components
        table: {},
        modal: {
          createUserModal: {
            "ui:widget": "modal",
            "ui:title": "Create New User",
            "ui:theme": "light",
            "ui:content": "Add a new user to the system",
            "ui:fields": [
              { label: "Full Name", type: "text", placeholder: "Jane Doe" },
              {
                label: "Email",
                type: "email",
                placeholder: "jane@company.com",
              },
              { label: "Role", type: "text", placeholder: "Admin/User/Guest" },
              { label: "Department", type: "text", placeholder: "Engineering" },
            ],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              {
                label: "Create User",
                action: "api:/users/create",
                variant: "primary",
              },
            ],
          },
          deleteConfirmModal: {
            "ui:widget": "modal",
            "ui:title": "⚠️ Confirm Deletion",
            "ui:theme": "light",
            "ui:content":
              "Are you sure you want to delete this item? This action cannot be undone.",
            "ui:fields": [],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              {
                label: "Delete",
                action: "api:/items/delete + closeModal",
                variant: "primary",
              },
            ],
          },
          exportModal: {
            "ui:widget": "modal",
            "ui:title": "📊 Export Data",
            "ui:theme": "light",
            "ui:content": "Choose the format and data range for export",
            "ui:fields": [
              { label: "Format", type: "text", placeholder: "CSV/Excel/PDF" },
              {
                label: "Date Range",
                type: "text",
                placeholder: "Last 30 days",
              },
            ],
            "ui:actions": [
              { label: "Cancel", action: "closeModal", variant: "secondary" },
              {
                label: "Export",
                action: "api:/export/generate",
                variant: "primary",
              },
            ],
          },
        },
        uiSchema: {},
        styles: {},
        triggers: [],
      },

      footer: {
        table: {},
        modal: {},
        uiSchema: {
          copyright: {
            "ui:widget": "text",
            "ui:content": "© 2024 Enterprise Dashboard. All rights reserved.",
            "ui:styles": {
              textAlign: "center",
              padding: "20px",
              color: "#166de7ff",
              fontSize: "14px",
            },
          },
        },
        styles: {
          bg: "#bb0fe6ff",
          borderTop: "1px solid #e2e8f0",
          marginTop: "40px",
        },
        triggers: [],
      },
    },
  },
  {
    title: "Widget Library Showcase - 15+ Components",
    slug: "widget-showcase",
    projectUUID: "showcase",
    taskUUID: "widgets001",
    status: "Active",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,
    initialization: {
      resources: [],
    },
    components: {
      navbar: {
        table: {},
        modal: {},
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "🎨 Widget Showcase",
            "ui:styles": {
              fontSize: "24px",
              fontWeight: "bold",
              color: "#667eea",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              { label: "Home", action: "navigate:/widget-showcase" },
              { label: "Basic", action: "scroll:#basic" },
              { label: "Layout", action: "scroll:#layout" },
              { label: "Interactive", action: "scroll:#interactive" },
              { label: "Data", action: "scroll:#data" },
            ],
          },
        },
        styles: {
          background: "white",
          borderBottom: "2px solid #e2e8f0",
          padding: "16px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
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
            "ui:widget": "hero",
            "ui:title": "Widget Library Showcase 🎨",
            "ui:subtitle":
              "Explore 15+ pre-built components ready to use in your JSON configs",
            "ui:cta": {
              label: "Explore Widgets",
              action: "scroll:#basic",
            },
          },

          // ===== BASIC WIDGETS =====
          basicHeading: {
            "ui:widget": "heading",
            "ui:text": "📝 Basic Content Widgets",
            "ui:level": "h2",
            "ui:styles": {
              marginTop: "60px",
              marginBottom: "40px",
              textAlign: "center",
            },
          },

          divider1: {
            "ui:widget": "divider",
            "ui:variant": "solid",
            "ui:color": "#667eea",
          },

          textExample: {
            "ui:widget": "text",
            "ui:content": "This is a text widget - perfect for any content!",
            "ui:styles": {
              fontSize: "18px",
              color: "#64748b",
              textAlign: "center",
              marginBottom: "30px",
            },
          },

          headingH3Example: {
            "ui:widget": "heading",
            "ui:text": "Subheading Example (H3)",
            "ui:level": "h3",
          },

          paragraphExample: {
            "ui:widget": "paragraph",
            "ui:text":
              "This is a paragraph widget with proper line height and spacing. It's designed for longer text content with better readability. Use it for descriptions, articles, and body text throughout your pages.",
          },

          spacer1: {
            "ui:widget": "spacer",
            "ui:height": 40,
          },

          // ===== BUTTON VARIANTS =====
          buttonHeading: {
            "ui:widget": "heading",
            "ui:text": "🔘 Button Variants",
            "ui:level": "h3",
          },

          buttonContainer: {
            "ui:widget": "container",
            "ui:maxWidth": "800px",
            "ui:padding": "30px",
            "ui:styles": {
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
              background: "#f8fafc",
              borderRadius: "12px",
            },
            "ui:content": "",
          },

          buttonPrimary: {
            "ui:widget": "button",
            "ui:label": "Primary Button",
            "ui:variant": "primary",
            "ui:size": "medium",
            "ui:action": "scroll:#interactive",
          },

          buttonSecondary: {
            "ui:widget": "button",
            "ui:label": "Secondary Button",
            "ui:variant": "secondary",
            "ui:size": "medium",
            "ui:action": "scroll:#data",
          },

          buttonOutline: {
            "ui:widget": "button",
            "ui:label": "Outline Button",
            "ui:variant": "outline",
            "ui:size": "medium",
            "ui:action": "scroll:#basic",
          },

          buttonLarge: {
            "ui:widget": "button",
            "ui:label": "Large Button",
            "ui:variant": "primary",
            "ui:size": "large",
            "ui:action": "navigate:/widget-showcase",
          },

          buttonSmall: {
            "ui:widget": "button",
            "ui:label": "Small Button",
            "ui:variant": "primary",
            "ui:size": "small",
            "ui:action": "navigate:/widget-showcase",
          },

          spacer2: {
            "ui:widget": "spacer",
            "ui:height": 60,
          },

          // ===== MEDIA WIDGETS =====
          mediaHeading: {
            "ui:widget": "heading",
            "ui:text": "🖼️ Media Widgets",
            "ui:level": "h3",
          },

          imageExample: {
            "ui:widget": "image",
            "ui:src":
              "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800",
            "ui:alt": "Beautiful landscape",
            "ui:caption": "This is an image widget with caption support",
          },

          spacer3: {
            "ui:widget": "spacer",
            "ui:height": 40,
          },

          videoExample: {
            "ui:widget": "video",
            "ui:url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "ui:autoplay": false,
            "ui:controls": true,
          },

          spacer4: {
            "ui:widget": "spacer",
            "ui:height": 60,
          },

          // ===== CARD EXAMPLES =====
          cardHeading: {
            "ui:widget": "heading",
            "ui:text": "🎴 Card Widgets",
            "ui:level": "h3",
          },

          cardContainer: {
            "ui:widget": "container",
            "ui:maxWidth": "1200px",
            "ui:styles": {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              marginBottom: "40px",
            },
            "ui:content": "",
          },

          card1: {
            "ui:widget": "card",
            "ui:title": "Feature Card 1",
            "ui:description":
              "This card has a title, description, and action button. Perfect for features, products, or blog posts.",
            "ui:image":
              "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
            "ui:action": "scroll:#basic",
            "ui:buttonLabel": "Learn More",
          },

          card2: {
            "ui:widget": "card",
            "ui:title": "Feature Card 2",
            "ui:description":
              "Cards are highly versatile components that can display any type of content with consistent styling.",
            "ui:image":
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
            "ui:action": "scroll:#interactive",
            "ui:buttonLabel": "Explore",
          },

          card3: {
            "ui:widget": "card",
            "ui:title": "Feature Card 3",
            "ui:description":
              "Use cards for pricing plans, team members, testimonials, or any grid-based content layout.",
            "ui:image":
              "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400",
            "ui:action": "scroll:#data",
            "ui:buttonLabel": "View Details",
          },

          spacer5: {
            "ui:widget": "spacer",
            "ui:height": 60,
          },

          // ===== ALERTS & BADGES =====
          alertsHeading: {
            "ui:widget": "heading",
            "ui:text": "⚠️ Alerts & Badges",
            "ui:level": "h3",
          },

          alertSuccess: {
            "ui:widget": "alert",
            "ui:message":
              "✅ Success! Your changes have been saved successfully.",
            "ui:type": "success",
            "ui:dismissible": true,
          },

          alertWarning: {
            "ui:widget": "alert",
            "ui:message":
              "⚠️ Warning! Please review your settings before proceeding.",
            "ui:type": "warning",
            "ui:dismissible": true,
          },

          alertDanger: {
            "ui:widget": "alert",
            "ui:message": "❌ Error! Something went wrong. Please try again.",
            "ui:type": "danger",
            "ui:dismissible": true,
          },

          alertInfo: {
            "ui:widget": "alert",
            "ui:message":
              "ℹ️ Info: New features are available in the latest update!",
            "ui:type": "info",
            "ui:dismissible": true,
          },

          spacer6: {
            "ui:widget": "spacer",
            "ui:height": 40,
          },

          badgeHeading: {
            "ui:widget": "heading",
            "ui:text": "Badge Examples:",
            "ui:level": "h4",
          },

          badgeContainer: {
            "ui:widget": "container",
            "ui:styles": {
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "40px",
            },
            "ui:content": "",
          },

          badgePrimary: {
            "ui:widget": "badge",
            "ui:text": "Primary",
            "ui:variant": "primary",
          },

          badgeSuccess: {
            "ui:widget": "badge",
            "ui:text": "Success",
            "ui:variant": "success",
          },

          badgeWarning: {
            "ui:widget": "badge",
            "ui:text": "Warning",
            "ui:variant": "warning",
          },

          badgeDanger: {
            "ui:widget": "badge",
            "ui:text": "Danger",
            "ui:variant": "danger",
          },

          badgeInfo: {
            "ui:widget": "badge",
            "ui:text": "Info",
            "ui:variant": "info",
          },

          spacer7: {
            "ui:widget": "spacer",
            "ui:height": 60,
          },

          // ===== PROGRESS BARS =====
          progressHeading: {
            "ui:widget": "heading",
            "ui:text": "📊 Progress Indicators",
            "ui:level": "h3",
          },

          progress1: {
            "ui:widget": "progressBar",
            "ui:label": "JavaScript",
            "ui:value": 90,
            "ui:max": 100,
            "ui:color": "#667eea",
            "ui:showPercentage": true,
          },

          progress2: {
            "ui:widget": "progressBar",
            "ui:label": "React",
            "ui:value": 85,
            "ui:max": 100,
            "ui:color": "#61dafb",
            "ui:showPercentage": true,
          },

          progress3: {
            "ui:widget": "progressBar",
            "ui:label": "TypeScript",
            "ui:value": 75,
            "ui:max": 100,
            "ui:color": "#3178c6",
            "ui:showPercentage": true,
          },

          progress4: {
            "ui:widget": "progressBar",
            "ui:label": "Node.js",
            "ui:value": 80,
            "ui:max": 100,
            "ui:color": "#68a063",
            "ui:showPercentage": true,
          },

          spacer8: {
            "ui:widget": "spacer",
            "ui:height": 60,
          },

          // ===== LISTS =====
          listHeading: {
            "ui:widget": "heading",
            "ui:text": "📋 List Widgets",
            "ui:level": "h3",
          },

          listUnordered: {
            "ui:widget": "list",
            "ui:ordered": false,
            "ui:icon": "✓",
            "ui:items": [
              "Clean, modern design system",
              "15+ pre-built components",
              "Fully customizable with JSON",
              "Responsive and mobile-friendly",
              "Zero code deployment needed",
            ],
          },

          spacer9: {
            "ui:widget": "spacer",
            "ui:height": 30,
          },

          listOrdered: {
            "ui:widget": "list",
            "ui:ordered": true,
            "ui:items": [
              "Choose your widget from the library",
              "Configure it using JSON",
              "Save to database",
              "Your site updates instantly",
              "No deployment required!",
            ],
          },

          spacer10: {
            "ui:widget": "spacer",
            "ui:height": 60,
          },

          // ===== ICONS & DIVIDERS =====
          dividerHeading: {
            "ui:widget": "heading",
            "ui:text": "🎨 Decorative Elements",
            "ui:level": "h3",
          },

          iconContainer: {
            "ui:widget": "container",
            "ui:styles": {
              display: "flex",
              gap: "30px",
              justifyContent: "center",
              marginBottom: "40px",
            },
            "ui:content": "",
          },

          icon1: {
            "ui:widget": "icon",
            "ui:emoji": "🚀",
            "ui:size": "large",
          },

          icon2: {
            "ui:widget": "icon",
            "ui:emoji": "⭐",
            "ui:size": "large",
          },

          icon3: {
            "ui:widget": "icon",
            "ui:emoji": "💎",
            "ui:size": "large",
          },

          icon4: {
            "ui:widget": "icon",
            "ui:emoji": "🔥",
            "ui:size": "large",
          },

          divider2: {
            "ui:widget": "divider",
            "ui:variant": "solid",
            "ui:spacing": "large",
          },

          divider3: {
            "ui:widget": "divider",
            "ui:variant": "dashed",
            "ui:color": "#667eea",
            "ui:spacing": "large",
          },

          // ===== FINAL CTA =====
          finalHeading: {
            "ui:widget": "heading",
            "ui:text": "Ready to Build? 🎉",
            "ui:level": "h2",
            "ui:styles": {
              textAlign: "center",
              marginTop: "80px",
            },
          },

          finalParagraph: {
            "ui:widget": "paragraph",
            "ui:text":
              "All these widgets are available in your JSON configs right now. Just add the widget type and configuration, and they'll render automatically!",
            "ui:styles": {
              textAlign: "center",
              fontSize: "1.1rem",
              maxWidth: "700px",
              margin: "0 auto 40px",
            },
          },

          finalButton: {
            "ui:widget": "button",
            "ui:label": "Start Building",
            "ui:variant": "primary",
            "ui:size": "large",
            "ui:action": "navigate:/",
            "ui:styles": {
              display: "block",
              margin: "0 auto",
            },
          },
        },
        styles: {
          padding: "100px 40px 80px",
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          minHeight: "100vh",
        },
        triggers: [],
      },

      modals: {
        table: {},
        modal: {},
        uiSchema: {},
        styles: {},
        triggers: [],
      },

      footer: {
        table: {},
        modal: {},
        uiSchema: {
          footerText: {
            "ui:widget": "text",
            "ui:content":
              "🎨 Widget Library Showcase | Built with JSON-Driven Architecture",
            "ui:styles": {
              textAlign: "center",
              padding: "30px",
              color: "#64748b",
              fontSize: "14px",
            },
          },
        },
        styles: {
          borderTop: "2px solid #e2e8f0",
          marginTop: "60px",
        },
        triggers: [],
      },
    },
  },
  {
    title: "Contact Us - Get In Touch",
    slug: "contact-us",
    projectUUID: "contact",
    taskUUID: "contact001",
    status: "Active",
    accountValidation: false,
    otpValidation: false,
    isAnonymous: true,
    initialization: {
      resources: [],
    },
    components: {
      navbar: {
        table: {},
        modal: {},
        uiSchema: {
          logo: {
            "ui:widget": "text",
            "ui:content": "💼 Company Name",
            "ui:styles": {
              fontSize: "24px",
              fontWeight: "bold",
              color: "#667eea",
            },
          },
          links: {
            "ui:widget": "navLinks",
            "ui:theme": "light",
            "ui:links": [
              { label: "Home", action: "navigate:/" },
              { label: "About", action: "navigate:/about" },
              { label: "Services", action: "navigate:/services" },
              { label: "Contact", action: "navigate:/contact-us" },
            ],
          },
        },
        styles: {
          background: "white",
          borderBottom: "2px solid #e2e8f0",
          padding: "16px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
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
          // Hero Section
          heroSection: {
            "ui:widget": "hero",
            "ui:title": "Get In Touch 📬",
            "ui:subtitle":
              "Have a question or want to work together? We'd love to hear from you!",
            "ui:cta": {
              label: "Scroll to Form",
              action: "scroll:#contact-form",
            },
          },

          spacer1: {
            "ui:widget": "spacer",
            "ui:height": 60,
          },

          // Contact Form Section
          formHeading: {
            "ui:widget": "heading",
            "ui:text": "Send Us a Message",
            "ui:level": "h2",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "20px",
            },
          },

          formDescription: {
            "ui:widget": "paragraph",
            "ui:text":
              "Fill out the form below and we'll get back to you within 24 hours. All fields marked with * are required.",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "40px",
              color: "#64748b",
            },
          },

          // Main Contact Form
          contactForm: {
            "ui:widget": "formContainer",
            "ui:id": "contact-form",
            "ui:title": "Contact Form",
            "ui:description":
              "We're here to help! Please provide as much detail as possible.",
            "ui:action": "api:/contact/submit",
          },

          // Form Fields
          nameField: {
            "ui:widget": "inputField",
            "ui:label": "Full Name",
            "ui:name": "fullName",
            "ui:placeholder": "John Doe",
            "ui:type": "text",
            "ui:required": true,
          },

          emailField: {
            "ui:widget": "inputField",
            "ui:label": "Email Address",
            "ui:name": "email",
            "ui:placeholder": "john@example.com",
            "ui:type": "email",
            "ui:required": true,
          },

          phoneField: {
            "ui:widget": "inputField",
            "ui:label": "Phone Number",
            "ui:name": "phone",
            "ui:placeholder": "+1 (555) 123-4567",
            "ui:type": "tel",
            "ui:required": false,
          },

          companyField: {
            "ui:widget": "inputField",
            "ui:label": "Company Name",
            "ui:name": "company",
            "ui:placeholder": "Acme Corp",
            "ui:type": "text",
            "ui:required": false,
          },

          subjectSelect: {
            "ui:widget": "selectField",
            "ui:label": "Subject",
            "ui:name": "subject",
            "ui:placeholder": "Select a topic",
            "ui:required": true,
            "ui:options": [
              { value: "general", label: "General Inquiry" },
              { value: "support", label: "Technical Support" },
              { value: "sales", label: "Sales Question" },
              { value: "partnership", label: "Partnership Opportunity" },
              { value: "feedback", label: "Feedback" },
              { value: "other", label: "Other" },
            ],
          },

          budgetRadio: {
            "ui:widget": "radioGroup",
            "ui:label": "Project Budget (Optional)",
            "ui:name": "budget",
            "ui:required": false,
            "ui:options": [
              { value: "small", label: "Under $5,000" },
              { value: "medium", label: "$5,000 - $20,000" },
              { value: "large", label: "$20,000 - $50,000" },
              { value: "enterprise", label: "Over $50,000" },
            ],
          },

          messageField: {
            "ui:widget": "textareaField",
            "ui:label": "Message",
            "ui:name": "message",
            "ui:placeholder": "Tell us more about your project or inquiry...",
            "ui:rows": 6,
            "ui:required": true,
          },

          fileUpload: {
            "ui:widget": "fileUpload",
            "ui:label": "Attach Files (Optional)",
            "ui:name": "attachments",
            "ui:accept": ".pdf,.doc,.docx,.jpg,.png",
            "ui:multiple": true,
          },

          newsletterCheckbox: {
            "ui:widget": "checkbox",
            "ui:label": "Yes, I'd like to receive updates and newsletters",
            "ui:name": "newsletter",
            "ui:required": false,
          },

          privacyCheckbox: {
            "ui:widget": "checkbox",
            "ui:label": "I agree to the Privacy Policy and Terms of Service",
            "ui:name": "privacy",
            "ui:required": true,
          },

          submitButton: {
            "ui:widget": "button",
            "ui:label": "Send Message",
            "ui:variant": "primary",
            "ui:size": "large",
            "ui:action": "api:/contact/submit",
            "ui:styles": {
              width: "100%",
              marginTop: "20px",
            },
          },

          spacer3: {
            "ui:widget": "spacer",
            "ui:height": 80,
          },

          // FAQ Section with Accordion
          faqHeading: {
            "ui:widget": "heading",
            "ui:text": "Frequently Asked Questions",
            "ui:level": "h2",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "40px",
            },
          },

          faqAccordion: {
            "ui:widget": "accordion",
            "ui:id": "contact-faq",
            "ui:allowMultiple": false,
            "ui:items": [
              {
                title: "📧 What's the best way to reach you?",
                content:
                  "You can use this contact form for general inquiries. For urgent matters, call us at +1 (555) 123-4567. We typically respond to emails within 24 hours during business days.",
              },
              {
                title: "⏰ What are your business hours?",
                content:
                  "We're available Monday through Friday, 9 AM to 6 PM EST. However, we check emails regularly and will get back to you as soon as possible, even outside business hours.",
              },
              {
                title: "💰 Do you offer free consultations?",
                content:
                  "Yes! We offer a free 30-minute consultation for all new clients. This helps us understand your needs and determine if we're a good fit for your project.",
              },
              {
                title: "🌍 Do you work with international clients?",
                content:
                  "Absolutely! We work with clients from all over the world. We're experienced in managing remote projects and can accommodate different time zones.",
              },
              {
                title: "📝 What information should I include in my message?",
                content:
                  "Please provide as much detail as possible about your project: goals, timeline, budget, and any specific requirements. This helps us give you the most accurate response.",
              },
            ],
          },

          spacer4: {
            "ui:widget": "spacer",
            "ui:height": 80,
          },

          // Testimonials Section
          testimonialsHeading: {
            "ui:widget": "heading",
            "ui:text": "What Our Clients Say",
            "ui:level": "h2",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "50px",
            },
          },

          testimonialGrid: {
            "ui:widget": "gridLayout",
            "ui:columns": 3,
            "ui:gap": "30px",
            "ui:children": [],
          },

          testimonial1: {
            "ui:widget": "testimonial",
            "ui:quote":
              "Working with this team was an absolute pleasure. They delivered our project on time and exceeded all expectations. Highly recommended!",
            "ui:author": "Sarah Johnson",
            "ui:role": "CEO, TechStart Inc",
            "ui:avatar": "https://i.pravatar.cc/100?img=1",
            "ui:rating": 5,
          },

          testimonial2: {
            "ui:widget": "testimonial",
            "ui:quote":
              "The attention to detail and communication throughout the project was outstanding. They really understood our vision and brought it to life.",
            "ui:author": "Michael Chen",
            "ui:role": "Founder, Digital Ventures",
            "ui:avatar": "https://i.pravatar.cc/100?img=12",
            "ui:rating": 5,
          },

          testimonial3: {
            "ui:widget": "testimonial",
            "ui:quote":
              "Professional, creative, and always available when we needed them. We've worked together on multiple projects and they never disappoint!",
            "ui:author": "Emma Williams",
            "ui:role": "Marketing Director, GrowthCo",
            "ui:avatar": "https://i.pravatar.cc/100?img=5",
            "ui:rating": 5,
          },

          spacer5: {
            "ui:widget": "spacer",
            "ui:height": 80,
          },

          // Contact Info Section
          contactInfoHeading: {
            "ui:widget": "heading",
            "ui:text": "Other Ways to Reach Us",
            "ui:level": "h2",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "40px",
            },
          },

          contactCards: {
            "ui:widget": "gridLayout",
            "ui:columns": 3,
            "ui:gap": "30px",
            "ui:children": [],
          },

          emailCard: {
            "ui:widget": "card",
            "ui:title": "📧 Email Us",
            "ui:description": "support@company.com",
            "ui:action": "api:mailto:support@company.com",
          },

          phoneCard: {
            "ui:widget": "card",
            "ui:title": "📞 Call Us",
            "ui:description": "+1 (555) 123-4567",
            "ui:action": "api:tel:+15551234567",
          },

          locationCard: {
            "ui:widget": "card",
            "ui:title": "📍 Visit Us",
            "ui:description":
              "123 Business St, Suite 100, San Francisco, CA 94105",
          },

          spacer6: {
            "ui:widget": "spacer",
            "ui:height": 60,
          },

          // Social Media
          socialHeading: {
            "ui:widget": "heading",
            "ui:text": "Follow Us",
            "ui:level": "h3",
            "ui:styles": {
              textAlign: "center",
              marginBottom: "30px",
            },
          },

          socialIcons: {
            "ui:widget": "socialIcons",
            "ui:size": "large",
            "ui:variant": "colored",
            "ui:icons": [
              { platform: "facebook", emoji: "f", url: "https://facebook.com" },
              { platform: "twitter", emoji: "🐦", url: "https://twitter.com" },
              {
                platform: "linkedin",
                emoji: "in",
                url: "https://linkedin.com",
              },
              {
                platform: "instagram",
                emoji: "📷",
                url: "https://instagram.com",
              },
              { platform: "youtube", emoji: "▶️", url: "https://youtube.com" },
            ],
          },
        },
        styles: {
          padding: "100px 40px 60px",
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          minHeight: "100vh",
        },
        triggers: [],
      },

      modals: {
        table: {},
        modal: {},
        uiSchema: {},
        styles: {},
        triggers: [],
      },

      footer: {
        table: {},
        modal: {},
        uiSchema: {
          footerText: {
            "ui:widget": "text",
            "ui:content":
              "© 2024 Company Name. All rights reserved. | Privacy Policy | Terms of Service",
            "ui:styles": {
              textAlign: "center",
              padding: "30px",
              color: "#64748b",
              fontSize: "14px",
            },
          },
        },
        styles: {
          borderTop: "2px solid #e2e8f0",
          marginTop: "80px",
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

seed();
