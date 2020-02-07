import nodemailer, { Transporter } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import emailConfig from '../../../config/emailConfig';
import { EmailData, EmailOptions } from '../../../types/helpers/emails/emails.types';

const transporter: Transporter = nodemailer.createTransport(smtpTransport(emailConfig));

const sendEmail = async (html: string, emailData: EmailData): Promise<Transporter> => {
  const { from, to, subject } = emailData;

  const emailOptions: EmailOptions = {
    from: from || process.env.NOTIFICATION_SOURCE,
    to,
    subject,
    html,
  };

  return transporter.sendMail(emailOptions);
};

export default sendEmail;
