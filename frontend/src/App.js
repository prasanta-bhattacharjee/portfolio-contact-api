import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await axios.post("http://localhost:5000/api/contact", form);
      if (res.data.success) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else setStatus("❌ Failed to send message.");
    } catch {
      setStatus("⚠️ Server error. Check backend connection.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b1220, #0f766e)",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>Contact Me</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: 350,
          background: "#1e293b",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 0 20px #10b98150",
        }}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          required
        />
        <button
          type="submit"
          style={{
            background: "#10b981",
            color: "white",
            padding: 10,
            border: "none",
            borderRadius: 5,
          }}
        >
          Send Message
        </button>
        {status && (
          <p style={{ textAlign: "center", color: "#a7f3d0" }}>{status}</p>
        )}
      </form>
    </div>
  );
}

export default App;
