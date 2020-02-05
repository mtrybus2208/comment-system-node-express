const { DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

export const devConfig = {
  database: {
    name: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
  },
};
