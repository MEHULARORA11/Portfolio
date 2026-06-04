import nodemailer from "nodemailer";
import dns from "node:dns"; // Import the built-in Node DNS module
import 'dotenv/config' 

// Force Node.js to resolve addresses using IPv4 (ver: 4) instead of IPv6
const transportOptions = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
  // THIS IS THE FIX: Forces Nodemailer to bypass IPv6 on Render
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
  }
};

const transporter = nodemailer.createTransport(transportOptions);

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP ERROR =>", error);
  } else {
    console.log("SMTP SERVER READY");
  }
});

const sendEmail = async (from, subject, html) => {
  await transporter.sendMail({
    from,
    to: process.env.EMAIL_TO,
    subject,
    text: "html is not loaded", 
    html, 
  });
};

const sendEmailToMehul = async (name, email, message) => {
  await sendEmail(email, "Portfolio Interaction",
  `
  <div style="
    max-width: 600px;
    margin: auto;
    padding: 30px;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    border-radius: 12px;
    border: 1px solid #ddd;
  ">
    <h1 style="color: #7c3aed; text-align: center; margin-bottom: 30px;">
      New Portfolio Message
    </h1>
    <div style="background-color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <p style="font-size: 18px; margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 18px;"><strong>Email:</strong> ${email}</p>
    </div>
    <div style="background-color: white; padding: 20px; border-radius: 10px;">
      <h2 style="color: #7c3aed; margin-bottom: 15px;">Message</h2>
      <p style="font-size: 17px; line-height: 1.7; color: #333; white-space: pre-wrap;">${message}</p>
    </div>
  </div>
  `);
};

export {
  sendEmailToMehul,
};