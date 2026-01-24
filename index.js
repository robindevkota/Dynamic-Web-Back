// server.js - OPTIMIZED VERSION
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  🔧 MIDDLEWARE - ORDER MATTERS!
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1️⃣ CORS - MUST BE FIRST
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 2️⃣ Body Parsers - BEFORE routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3️⃣ Cookie Parser
app.use(cookieParser());

// 4️⃣ Request Logging (helpful for debugging)
app.use((req, res, next) => {
  console.log(`📍 ${req.method} ${req.path}`);
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    console.log('📦 Body keys:', Object.keys(req.body || {}));
  }
  next();
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  💾 MONGODB CONNECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in environment");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  🛣️ ROUTES - MUST COME AFTER MIDDLEWARE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const pageRoutes = require("./routes/pageConfigRoutes");
const apiConfigRoutes = require("./routes/apiConfigRoutes");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dynamicCrudRoutes = require("./routes/dynamicCrudRoutes");



// Health check - FIRST (no auth needed)
app.get("/", (req, res) => {
  res.json({
    message: "Dynamic Website Engine API Running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use("/api/crud", dynamicCrudRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/api-configs", apiConfigRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/ai", aiRoutes);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  🚫 404 HANDLER - Catch undefined routes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

app.use((req, res, next) => {
  console.warn(`⚠️ 404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.path,
    method: req.method
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  🛑 GLOBAL ERROR HANDLER - MUST BE LAST
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

app.use((err, req, res, next) => {
  console.error('🛑 GLOBAL ERROR:', err.message);
  console.error('📍 Path:', req.path);
  console.error('📦 Body:', req.body);
  console.error('🔍 Stack:', err.stack);

  // If headers already sent, delegate to Express
  if (res.headersSent) {
    return next(err);
  }

  // Determine status code
  const statusCode = err.statusCode || err.status || 500;

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    path: req.path,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  🚀 START SERVER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🤖 Ollama: ${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}`);
  console.log(`🎨 Model: ${process.env.OLLAMA_MODEL || 'qwen2.5-coder:7b'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⏹️ SIGTERM received, closing server...');
  mongoose.connection.close(false, () => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});