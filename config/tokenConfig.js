export const userTokenConfig = {
  secret: process.env.USER_TOKEN_SECRET || 'dev-user-token',
  expiresIn: '1d',
};
