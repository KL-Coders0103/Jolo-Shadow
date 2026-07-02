import { transporter } from "./transporter";

import { env } from "../../config/env";

interface SendEmailOptions {
  to: string;

  subject: string;

  html: string;

  attachments?: {
    filename: string;
    path: string;
  }[];
}

class EmailService {
  async sendEmail(
    options: SendEmailOptions,
  ) {
    await transporter.sendMail({
      from: env.SMTP_FROM,

      to: options.to,

      subject: options.subject,

      html: options.html,

      attachments:
        options.attachments,
    });
  }
}

export const emailService =
  new EmailService();