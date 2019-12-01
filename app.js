import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';

import accessTokenVerify from './lib/authorization/accessTokenVerify';
import errorHandler from './lib/middleware/errorHandler';
import {
  swaggerOptions,
  getSwaggerDocWithRefs
} from './config/swaggerConfig';
import {
  dbInitializeConnection
} from './lib/dbConnection';
import commentsRouter from './modules/comments/comments.route';
import usersRouter from './modules/users/users.route';
import authRouter from './modules/authorization/auth.route';

const app = express();

/**
 * Parse request and cookies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


/**
 * path to root of project
 */
global.appRoot = path.resolve(__dirname);

/**
 * Initialize database connection
 */
dbInitializeConnection();

/**
 * JWT verification
 */

app.use(accessTokenVerify);

/**
 * Load all routes from /routes folder
 */

app.use("/api/v1", commentsRouter);
app.use("/api/v1", usersRouter);
app.use("/api/v1", authRouter);


app.use(errorHandler());
/**
 * API Documentation
 */

app.use("/api-docs", swaggerUi.serve, async (req, res, next) => {
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  const swaggerDoc = await getSwaggerDocWithRefs(swaggerSpec);

  return swaggerUi.setup(swaggerDoc)(req, res, next);
});

/**
 * Catch 404 and forward to error handler
 */

app.use((req, res) => {
  res.status(404).json({

    message: "not found"
  });
});

export default app;
