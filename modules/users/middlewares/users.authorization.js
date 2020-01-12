import usersSchema from './users.joi.schema';
import userAuthorization from '../../../lib/authorization/userAuthorization';
import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';

export const userEmailAuth = (req, res, next) =>
  usersSchema.validEmailSchema
    .validateAsync(req.body.email)
    .then(() => next())
    .catch(err => logAndSendMessage(req, res, err, responseAuthInformation));

export const getUsersAuth = userAuthorization(usersSchema.getUsers);

export const getUserAuth = userAuthorization(usersSchema.getUser);
