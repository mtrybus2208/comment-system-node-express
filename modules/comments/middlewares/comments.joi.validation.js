import Joi from '@hapi/joi';
import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';
import {
  invalidDataInformation
} from '../../../lib/logErrorMessage/errorMessageObject';
import {
  enterComments
} from './comments.joi.schema';

const commentsValidation = {
  async enterCommentsValidation(req, res, next) {
    try {
      await enterComments.validateAsync(req.body.comment);

      next();
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },
}

export default commentsValidation;
