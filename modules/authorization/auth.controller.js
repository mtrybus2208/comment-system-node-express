import {
  ObjectId
} from 'mongodb';
import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import User from '../users/users.model';
import NotFoundError from '../../lib/logErrorMessage/NotFoundError';
import {
  invalidDataInformation
} from '../../lib/logErrorMessage/errorMessageObject';


const authController = {
  async login(req, res, next) {
    try {
      const {
        email,
        password
      } = req.body;
      const user = await User.findOne({
        email
      });
      if (!user) throw new NotFoundError('Email does not exist');
      //jwt!!!!!
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },
}

export default authController;
