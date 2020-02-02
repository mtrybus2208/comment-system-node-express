import nodemailer from 'nodemailer';

var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'test@gmail.com',
      pass: 'pass',
    },
  }),
);

const sendEmail = async () => {
  var mailOptions = {
    from: '"Example Team" <from@example.com>',
    to: 'test@gmail.com, test@gmail.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer',
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
};

export default sendEmail;
// https://blog.mailtrap.io/sending-emails-with-nodemailer/
// https://mailtrap.io/inboxes/813852/messages
// https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799
// https://stackoverflow.com/questions/19877246/nodemailer-with-gmail-and-nodejs
// https://stackoverflow.com/questions/19877246/nodemailer-with-gmail-and-nodejs
