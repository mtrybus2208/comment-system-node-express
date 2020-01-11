import { validEmailSchema } from './users.joi.schema';
import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';

export const userEmailAuth = (req, res, next) =>
  validEmailSchema
    .validateAsync(req.body.email)
    .then(() => next())
    .catch(err => logAndSendMessage(req, res, err, responseAuthInformation));
