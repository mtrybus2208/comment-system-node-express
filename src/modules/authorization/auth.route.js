import express from 'express';
import authController from './auth.controller';

const router = express.Router();

/**
 * @swagger
 * /login:
 *  $ref: ./swagger/authorization.yaml/#/login
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /logout:
 *  $ref: ./swagger/authorization.yaml/#/logout
 */
router.post('/logout', authController.logout);

export default router;
