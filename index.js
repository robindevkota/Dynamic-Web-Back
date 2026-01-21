// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // <-- important for cookies
  })
);

app.use(cookieParser());

app.use(express.json({ limit: '10mb' })); // Important for large JSON configs

// MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Missing MONGO_URI");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

// Routes
const pageRoutes = require("./routes/pageConfigRoutes");
const apiConfigRoutes = require("./routes/apiConfigRoutes");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/authRoutes");


const userRoutes = require("./routes/userRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/api-configs", apiConfigRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/ai", aiRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Dynamic Website Engine API Running" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🛑 GLOBAL ERROR caught in index.js:', err.message);
  console.error(err.stack);

  // If headers were already sent, delegate to default express handler
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500);
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: false,
    error: err.message || 'Internal Server Error',
    path: req.path
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
