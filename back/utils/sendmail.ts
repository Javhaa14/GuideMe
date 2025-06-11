import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
export const sender = async (
  email: string,
  subject: string,
  htmlContent: string
) => {
  const info = {
    from: `Guide Me <${process.env.EMAIL}>`,
    to: email,
    subject: subject,
    html: htmlContent, // <-- use 'html' here, not 'text'
  };
  try {
    return await transporter.sendMail(info);
  } catch (error) {
    return error;
  }
};
