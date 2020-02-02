const emailConfig = {
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS,
  },
};

export default emailConfig;
