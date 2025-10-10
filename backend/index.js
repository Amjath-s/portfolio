


import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

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
        htmlContent: `
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b><br>${message}</p>
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.brevo_api_key,
        },
      }
    );

    console.log("✅ Brevo response:", response.data);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Brevo API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(3001, () => console.log("✅ Server running on http://localhost:3001"));

export default app;