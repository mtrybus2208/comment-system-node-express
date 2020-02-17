import express, { IRouter, Request } from 'express';

import usersController from './users.controller';
import { populateDetails, populateComments } from './middlewares/users.populate';
import { createUsersValidation } from './middlewares/users.joi.validation';
import {
  userNewPasswordAuth,
  userEmailAuth,
  getUsersAuth,
  getUserAuth,
} from './middlewares/users.authorization';
import accessTokenVerify from '../../lib/authorization/accessTokenVerify';

const {
  createUser,
  generateToken,
  createUserSuccess,
  getUsers,
  getUser,
  findUserByEmail,
  generatePasswordResetToken,
  sendResetPasswordEmail,
  sendResetPasswordEmailSuccess,
  getTokenPayload,
} = usersController;

const router = express.Router();
const subRouter = express.Router();

router.use('/users', subRouter);

/**
 * @swagger
 * /users:
 *  $ref: ./src/swagger/users.yaml/#/createUser
 */
subRouter.post('/', createUsersValidation, createUser, generateToken, createUserSuccess);

/**
 * @swagger
 * /users:
 *  $ref: ./src/swagger/users.yaml/#/getUsers
 */
subRouter.get('/', accessTokenVerify, getUsersAuth, getUsers);

/**
 * @swagger
 * /users/{id}:
 *  $ref: ./src/swagger/users.yaml/#/getUser
 */
subRouter.get('/:id', accessTokenVerify, getUserAuth, populateDetails, populateComments, getUser);

/**
 * @swagger
 * /users/password-reset:
 *  $ref: ./src/swagger/users.yaml/#/passwordReset
 */
subRouter.post(
  '/password-reset',
  userEmailAuth,
  findUserByEmail,
  generatePasswordResetToken,
  sendResetPasswordEmail,
  sendResetPasswordEmailSuccess,
);

/**
 * @swagger
 * /users/change-password/:token:
 *  $ref: ./src/swagger/users.yaml/#/changePassword
 */
subRouter.post(
  '/change-password/:token',
  userNewPasswordAuth,
  getTokenPayload,
  (request: Request, response) => {
    return response.status(200).json({
      message: 'change password',
    });
  },
);

export default router;
