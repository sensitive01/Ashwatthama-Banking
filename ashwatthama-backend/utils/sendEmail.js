const nodemailer = require("nodemailer");
require("dotenv").config();


const sendEmail = async (to, subject, htmlContent) => {
  console.log("to, subject, htmlContent",to, subject, htmlContent)
  console.log("process.env.EMAIL_USER_BANKING,process.env.EMAIL_PASS_BANKING",process.env.EMAIL_PASS_BANKING,process.env.EMAIL_USER_BANKING)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER_BANKING,
        pass: process.env.EMAIL_PASS_BANKING,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Savings Account Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;
