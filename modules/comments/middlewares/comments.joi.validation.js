import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';
import { invalidDataInformation } from '../../../lib/logErrorMessage/errorMessageObject';
import { enterComments } from './comments.joi.schema';

export const enterCommentsValidation = async (req, res, next) => {
  try {
    await enterComments.validateAsync(req.body.comment);

    next();
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};
