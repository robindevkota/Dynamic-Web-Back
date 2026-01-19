const jwt = require("jsonwebtoken");

exports.verifySuperAdmin = (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "SUPER_ADMIN") {
      return res.status(403).json({ error: "Forbidden: SUPER_ADMIN only" });
    }

    req.user = payload; // attach user info to req
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};


