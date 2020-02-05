export const generatePasswordResetEmail = (token, user) => {
  const link = `${host}/users/password-reset/${token}`;

  const messageText = `copy....`;

  return {};
};
