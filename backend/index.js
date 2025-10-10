import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();

// Use CORS for your frontend URL
app.use(cors({
  origin: "https://portfolio-six-sage-35.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Handle preflight requests
app.options("/api/contact", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://portfolio-six-sage-35.vercel.app");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Portfolio Contact", email: process.env.register_email },
        to: [{ email: process.env.send_mail }],
        subject: `Portfolio Contact Form: Message from ${name}`,
        htmlContent: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br>${message}</p>`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.brevo_api_key,
        },
      }
    );

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Full Error:", error);
    console.error("❌ Brevo response data:", error.response?.data);
    res.status(500).json({ error: "Failed to send email", details: error.response?.data });
  }
});

app.listen(process.env.PORT || 3001, () => console.log("✅ Server running"));
