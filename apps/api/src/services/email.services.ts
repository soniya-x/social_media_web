import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  // Check whether email credentials are available
  if (!emailUser || !emailPassword) {
    throw new Error("EMAIL_USER or EMAIL_PASSWORD is missing in .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  await transporter.sendMail({
    from: emailUser,
    to,
    subject,
    html,
  });
};