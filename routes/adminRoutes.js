const express = require("express");
const { authenticate } = require("../middleware/auth.js");
const { authorize } = require("../middleware/authorize.js");

const router = express.Router();

router.get(
  "/stats",
  authenticate,
  authorize("SUPER_ADMIN"),
  (req, res) => {
    res.json({ message: "Super Admin Stats" });
  }
);

export default router;
