import { Request, Response, NextFunction } from 'express';

import usersSchema from './users.joi.schema';
import userAuthorization from '../../../lib/authorization/userAuthorization';
import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';
import {
  resetPasswordInformationEmail,
  newPasswordInformationFail,
} from '../../../lib/logErrorMessage/errorMessageObject';

export const userEmailAuth = (req: Request, res: Response, next: NextFunction): void =>
  usersSchema.validEmailSchema
    .validateAsync(req.body.email)
    .then(() => next())
    .catch(err => logAndSendMessage(req, res, err, resetPasswordInformationEmail));

export const getUsersAuth = userAuthorization(usersSchema.getUsers);

export const getUserAuth = userAuthorization(usersSchema.getUser);

export const userNewPasswordAuth = (req: Request, res: Response, next: NextFunction): void =>
  usersSchema.newPassword
    .validateAsync(req.body.newPassword)
    .then(() => next())
    .catch(err => logAndSendMessage(req, res, err, newPasswordInformationFail));
