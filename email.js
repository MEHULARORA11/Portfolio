import nodemailer from "nodemailer";
import dns from "node:dns"; // 1. Import the built-in Node DNS module
import 'dotenv/config' 

// SMTP transporter — works with Mailtrap, Gmail, SendGrid, or any SMTP provider


// SMTP transporter — works with Mailtrap, Gmail, SendGrid, or any SMTP provider

// SMTP transporter — works with Mailtrap, Gmail, SendGrid, or any SMTP provider
const transporter = nodemailer.createTransport({
  // 1. Pass the direct IPv4 address for smtp.gmail.com instead of the domain name
  host: '74.125.142.108', 
  port: 465,
  secure: true, 

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  // Tells Nodemailer explicitly that this is an IPv4 string address
  family: 4, 

  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
  
  tls: {
    // 2. Crucial: Tell the TLS handshake to expect gmail's SSL certificate name
    servername: 'smtp.gmail.com',
    rejectUnauthorized: false
  }
});



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
    to:process.env.EMAIL_TO,
    subject,
    text:"html is not loaded", // as agar html load nahin hua so on fall back text jaata hain
    html, // there are websites that gives us html email templates
  });
};
// for testing use Mailtrap as it is free upto 500 emails
// u can also use resend.com
const sendEmailToMehul = async (name,email,message) => {
  await sendEmail(email,"Portfolio Interation",
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

    <h1 style="
      color: #7c3aed;
      text-align: center;
      margin-bottom: 30px;
    ">
      New Portfolio Message
    </h1>

    <div style="
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    ">
      <p style="font-size: 18px; margin-bottom: 10px;">
        <strong>Name:</strong> ${name}
      </p>

      <p style="font-size: 18px;">
        <strong>Email:</strong> ${email}
      </p>
    </div>

    <div style="
      background-color: white;
      padding: 20px;
      border-radius: 10px;
    ">
      <h2 style="
        color: #7c3aed;
        margin-bottom: 15px;
      ">
        Message
      </h2>

      <p style="
        font-size: 17px;
        line-height: 1.7;
        color: #333;
        white-space: pre-wrap;
      ">
        ${message}
      </p>
    </div>

  </div>
`


  )
};


export {
  sendEmailToMehul,
};
