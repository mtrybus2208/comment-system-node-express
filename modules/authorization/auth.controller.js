import bcrypt from 'bcrypt';
import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import User from '../users/users.model';
import NotFoundError from '../../lib/logErrorMessage/NotFoundError';
import {
  invalidDataInformation,
  authenticationInformation,
} from '../../lib/logErrorMessage/errorMessageObject';

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const authController = {
  async login(req, res, next) {
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
  async logout(req, res, next) {
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
};

export default authController;
