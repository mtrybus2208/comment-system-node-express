import express from 'express';
import {
  createUser,
  generateToken,
  createUserSuccess,
  getUsers,
  getUser,
} from './users.controller';
import { populateDetails, populateComments } from './middlewares/users.populate';
import { createUsersValidation } from './middlewares/users.joi.validation';
import { userEmailAuth } from './middlewares/users.authorization';

const router = express.Router();
const subRouter = express.Router();

router.use('/users', subRouter);

subRouter.post('/', createUsersValidation, createUser, generateToken, createUserSuccess);

subRouter.get('/', getUsers);

subRouter.get('/:id', populateDetails, populateComments, getUser);

/**
 * @swagger
 * /users/password-reset:
 *  $ref: ./swagger/users.yaml/#/passwordReset
 */
subRouter.post('/password-reset', userEmailAuth, (req, res) =>
  res.status(200).json({
    message: '[send]',
  }),
);
export default router;
