import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailToMehul = async (name, email, message) => {
  try {
    const response = await resend.emails.send({
      from: "contact@mehularora.dev",
      // AFTER DOMAIN VERIFICATION USE:
      // from: "Portfolio <contact@mehularora.dev>",

      to: "mehularora505@gmail.com",

      reply_to: email,

      subject: "Portfolio Interaction",

      html: `
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

        <div style="
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        ">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>

        <div style="
          background-color: white;
          padding: 20px;
          border-radius: 10px;
        ">
          <h2 style="color: #7c3aed;">Message</h2>
          <p style="
            white-space: pre-wrap;
            line-height: 1.7;
          ">
            ${message}
          </p>
        </div>
      </div>
      `,
    });


    return response;
  } catch (err) {
    console.log("EMAIL ERROR =>", err);
  }
};

export {
  sendEmailToMehul,
};