import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }

    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending message:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
