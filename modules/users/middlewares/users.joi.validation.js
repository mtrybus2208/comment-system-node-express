import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';
import {
  invalidDataInformation
} from '../../../lib/logErrorMessage/errorMessageObject';
import {
  createUsers
} from './users.joi.schema';

const usersValidation = {
  async createUsersValidation(req, res, next) {
    try {
      const {
        user,
      } = req.body;
      await createUsers.validateAsync(user);

      next();
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },
}

export default usersValidation;
