import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'



const app=express();

app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    
    res.send("Hello World");
  
})
app.get('/api/get',(req,res)=>res.send("sjfsdjfjflsjflsjf"))

app.post('/api/contact', async (req,res)=>{
  const {name,email,message}=req.body;
  console.log(req.body)
  console.log("Brevo user:", process.env.register_email);
  console.log("SMTP key length:", process.env.smtp_key?.length);
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.register_email,
      pass: process.env.smtp_key,      
    },
  });

  try {
   
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.send_mail, 
      subject: `Portfolio Contact Form: Message from ${name}`,
      text: message,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    // ✅ 3. Use 'await' before transporter.sendMail()
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});


const port =3001;
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});

// Optionally export app instance for testing
export default app;