import express from 'express';
import {
  createUser,
  generateToken,
  createUserSuccess,
  getUsers,
  getUser,
  findUserByEmail
} from './users.controller';
import { populateDetails, populateComments } from './middlewares/users.populate';
import { createUsersValidation } from './middlewares/users.joi.validation';
import { userEmailAuth, getUsersAuth, getUserAuth } from './middlewares/users.authorization';
import accessTokenVerify from '../../lib/authorization/accessTokenVerify';

const router = express.Router();
const subRouter = express.Router();

router.use('/users', subRouter);

/**
 * @swagger
 * /users:
 *  $ref: ./swagger/users.yaml/#/createUser
 */
subRouter.post('/', createUsersValidation, createUser, generateToken, createUserSuccess);

/**
 * @swagger
 * /users:
 *  $ref: ./swagger/users.yaml/#/getUsers
 */
subRouter.get('/', accessTokenVerify, getUsersAuth, getUsers);

/**
 * @swagger
 * /users/{id}:
 *  $ref: ./swagger/users.yaml/#/getUser
 */
subRouter.get('/:id', accessTokenVerify, getUserAuth, populateDetails, populateComments, getUser);

/**
 * @swagger
 * /users/password-reset:
 *  $ref: ./swagger/users.yaml/#/passwordReset
 */
subRouter.post('/password-reset', userEmailAuth, findUserByEmail, (req, res) =>
  res.status(200).json({
    message: '[send]',
  }),
);
export default router;
