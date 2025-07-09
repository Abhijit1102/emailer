import nodemailer from "nodemailer";

export const ProviderB = {
  name: "MailtrapLiveSMTP",

  async sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587, 
      auth: {
        user: process.env.MAILTRAP_SMTP_USER ,
        pass: process.env.MAILTRAP_SMTP_PASS ,
      },
      secure: false, 
    });

    await transporter.sendMail({
      from: '"Mailtrap Live" <hello@demomailtrap.com>',
      to,
      subject,
      text,
    });

    return { success: true };
  },
};
