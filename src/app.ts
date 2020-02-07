import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';

import accesTokenInitialization from './lib/authorization/accesTokenInitialization';
import errorHandler from './lib/middleware/errorHandler';
import CORS from './lib/middleware/CORS';
import { swaggerOptions, getSwaggerDocWithRefs } from './config/swaggerConfig';
import { dbInitializeConnection } from './lib/dbConnection';
import commentsRouter from './modules/comments/comments.route';
import usersRouter from './modules/users/users.route';
import authRouter from './modules/authorization/auth.route';

const app = express();

/**
 * Parse request and cookies
 */

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());

/**
 * Apply CORS
 */
app.use(CORS());

/**
 * Initialize database connection
 */

dbInitializeConnection();

/**
 * JWT verification
 */
// app.use(accessTokenVerify);
app.use(accesTokenInitialization());

/**
 * Load all routes from /routes folder
 */
app.use('/api/v1', commentsRouter);
app.use('/api/v1', usersRouter);
app.use('/api/v1', authRouter);
app.use(errorHandler());

/**
 * API Documentation
 */
app.use('/api-docs', swaggerUi.serve, async (req, res, next) => {
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  const swaggerDoc = await getSwaggerDocWithRefs(swaggerSpec);

  return swaggerUi.setup(swaggerDoc)(req, res, next);
});

/**
 * Catch 404 and forward to error handler
 */
app.use((req, res) => {
  res.status(404).json({
    message: 'not found',
  });
});

export default app;

// https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf
// https://medium.com/better-programming/8-best-practices-for-future-proofing-your-typescript-code-2600fb7d8063
// https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md
