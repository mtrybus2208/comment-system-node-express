import express from 'express';
import authController from './auth.controller';
import authIsValid from './auth.validator';

const router = express.Router();

router.post('/auth', authController.login);

router.post('/logout', authController.logout);

export default router;
