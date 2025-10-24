import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import Contact from "../models/Contact.js";

// ✅ Validation rules
export const validateContact = [
  body("name").isLength({ min: 2 }).trim().escape(),
  body("email").isEmail().trim(),
  body("subject").optional().trim().escape(),
  body("message").isLength({ min: 10 }).trim().escape(),
  body("token").exists(),
];

// ✅ Rate limiter: max 3 requests/min per IP
export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: {
    success: false,
    msg: "Too many submissions. Try again in a minute.",
  },
});

// ✅ Controller
export const sendMessage = async (req, res) => {
  try {
    console.log("✅ Incoming data:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("❌ Validation errors:", errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message, token } = req.body;

    // 🔐 Security check
    if (token !== "PRASANTA_PORTFOLIO_TOKEN_2025") {
      return res
        .status(403)
        .json({ success: false, msg: "Unauthorized request" });
    }

    // 🚫 Check if email already exists
    const existing = await Contact.findOne({ email });
    console.log("🔍 Existing email check:", existing ? "Found" : "Not found");

    if (existing) {
      return res.status(409).json({
        success: false,
        msg: "This email has already been used to send a message.",
      });
    }

    // ✅ Save new message
    const newMsg = new Contact({ name, email, subject, message });
    const saved = await newMsg.save();

    console.log("💾 Message saved:", saved);
    return res.json({ success: true, msg: "Message saved successfully." });
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ success: false, msg: "Database save error" });
  }
};
