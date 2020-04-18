import bcrypt from 'bcryptjs';

import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import User from '../users/users.model';
import NotFoundError from '../../lib/logErrorMessage/NotFoundError';
import {
  invalidDataInformation,
  authenticationInformation,
} from '../../lib/logErrorMessage/errorMessageObject';
import { apiKeyEncryption } from '../../lib/authorization/clientApiKeyValidation';

const validatePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) throw new NotFoundError('Email does not exist');

      const validPassword = await validatePassword(password, user.password);

      if (!validPassword) throw new NotFoundError('Password is not correct');

      const { payload } = res.jwt({
        id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        ...(user.page && {
          page: user.page,
        }),
      });

      const { stales, ...userData } = payload;

      res.status(200).send(userData);
    } catch (error) {
      logAndSendMessage(req, res, error, authenticationInformation);
    }
  },
  async logout(req, res) {
    try {
      res
        .clearCookie('x-jwt-token')
        .status(200)
        .json({
          message: 'Logout.',
        });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async generateClientApiKey(req, res) {
    try {
      const { apiKey } = res.locals.loggedUser;

      if (!apiKey) {
        throw new NotFoundError('apiKey');
      }
      const encryptedApiKey = apiKeyEncryption(apiKey);

      return res.status(200).json({
        message: 'Successful operation',
        apiKey: encryptedApiKey,
      });
    } catch (error) {
      logAndSendMessage(req, res, error, authenticationInformation);
    }
  },
};

export default authController;
