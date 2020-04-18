import express, { IRouter } from 'express';

import authController from './auth.controller';
import { generateClientApiKeyAuth } from './middlewares/auth.authorization';
import accessTokenVerify from '../../lib/authorization/accessTokenVerify';

const router: IRouter = express.Router();

/**
 * @swagger
 * /login:
 *  $ref: ./src/swagger/authorization.yaml/#/login
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /logout:
 *  $ref: ./src/swagger/authorization.yaml/#/logout
 */
router.post('/logout', authController.logout);

/**
 * generate client api key
 */
router.get(
  '/generate-client-api-key',
  accessTokenVerify,
  generateClientApiKeyAuth,
  authController.generateClientApiKey,
);

export default router;
