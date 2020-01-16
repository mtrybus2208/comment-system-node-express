import usersSchema from './users.joi.schema';
import userAuthorization from '../../../lib/authorization/userAuthorization';
import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';
import { resetPasswordInformationEmail } from '../../../lib/logErrorMessage/errorMessageObject';

export const userEmailAuth = (req, res, next) =>
  usersSchema.validEmailSchema
    .validateAsync(req.body.email)
    .then(() => next())
    .catch(err => logAndSendMessage(req, res, err, resetPasswordInformationEmail));

export const getUsersAuth = userAuthorization(usersSchema.getUsers);

export const getUserAuth = userAuthorization(usersSchema.getUser);
