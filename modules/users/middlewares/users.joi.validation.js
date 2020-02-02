import logAndSendMessage from '../../../lib/logErrorMessage/logErrorReturnMessage';
import { invalidDataInformation } from '../../../lib/logErrorMessage/errorMessageObject';
import usersSchema from './users.joi.schema';

const { createUsers } = usersSchema;

export const createUsersValidation = async (req, res, next) => {
  try {
    const { user } = req.body;
    await createUsers.validateAsync(user);

    next();
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};
