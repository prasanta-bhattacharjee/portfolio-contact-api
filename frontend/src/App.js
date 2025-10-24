import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captchaAnswer: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [errors, setErrors] = useState({});

  const SECURE_TOKEN = "PRASANTA_PORTFOLIO_TOKEN_2025";

  useEffect(() => {
    generateCaptcha();
  }, []);

  // 🧮 Generate number captcha
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ a, b });
    setForm((prev) => ({ ...prev, captchaAnswer: "" }));
  };

  // 🧩 Validate inputs
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email address.";
    if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    if (parseInt(form.captchaAnswer) !== captcha.a + captcha.b)
      newErrors.captcha = "Captcha is incorrect.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/<[^>]*>/g, ""); // sanitize HTML
    setForm({ ...form, [e.target.name]: value });
  };

  // 📨 Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!validateForm()) return;

    setLoading(true);
    setStatus("Sending...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        { ...form, token: SECURE_TOKEN },
        { timeout: 8000, validateStatus: () => true }
      );

      if (res.status === 409) {
        setStatus("⚠️ " + res.data.msg);
        setLoading(false);
        return;
      }

      if (res.data.success) {
        setStatus("✅ Message sent successfully!");
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
          captchaAnswer: "",
        });
        generateCaptcha();
      } else {
        setStatus("❌ " + (res.data.msg || "Failed to send. Try again."));
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Server error. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  // ⏱ Auto-hide message after 8 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 8000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "8px",
    borderRadius: "8px",
    border: "1px solid #10b98140",
    background: "#0f172a",
    color: "white",
    fontSize: "15px",
  };

  const errorStyle = {
    color: "#f87171",
    fontSize: "13px",
    marginBottom: "8px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b1220, #064e3b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{
          background: "rgba(30,41,59,0.9)",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 0 25px rgba(16,185,129,0.3)",
          width: "100%",
          maxWidth: 420,
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#10b981",
            marginBottom: "1.5rem",
          }}
        >
          Contact Me
        </h2>

        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          autoComplete="off"
          style={inputStyle}
        />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}

        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="off"
          style={inputStyle}
        />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          autoComplete="off"
          style={inputStyle}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          autoComplete="off"
          style={{ ...inputStyle, resize: "none" }}
        />
        {errors.message && <p style={errorStyle}>{errors.message}</p>}

        {/* Number Captcha */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "8px",
          }}
        >
          <label style={{ color: "#10b981", fontWeight: "bold" }}>
            {captcha.a} + {captcha.b} =
          </label>
          <input
            type="number"
            name="captchaAnswer"
            placeholder="?"
            value={form.captchaAnswer}
            onChange={handleChange}
            autoComplete="off"
            style={{
              flex: "1",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #10b98140",
              background: "#0f172a",
              color: "white",
            }}
            required
          />
          <button
            type="button"
            onClick={generateCaptcha}
            style={{
              background: "transparent",
              border: "none",
              color: "#34d399",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ↻
          </button>
        </div>
        {errors.captcha && <p style={errorStyle}>{errors.captcha}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#059669" : "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.3s",
            marginTop: "10px",
          }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p
            style={{
              marginTop: 15,
              textAlign: "center",
              color: status.includes("✅")
                ? "#10b981"
                : status.includes("⚠️")
                ? "#facc15"
                : "#f87171",
              transition: "opacity 0.5s ease",
            }}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

export default App;
