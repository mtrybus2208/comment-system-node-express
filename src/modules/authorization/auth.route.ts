import express, { IRouter } from 'express';
import authController from './auth.controller';

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

export default router;
