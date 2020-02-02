import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import emailConfig from '../../../config/emailConfig';

const transporter = nodemailer.createTransport(smtpTransport(emailConfig));

const sendEmail = async (html, { from, recipients, subject }) => {
  const mailOptions = {
    from: from || process.env.NOTIFICATION_SOURCE,
    to: recipients,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

export default sendEmail;
