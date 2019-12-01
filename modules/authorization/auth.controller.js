import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import User from '../users/users.model';
import NotFoundError from '../../lib/logErrorMessage/NotFoundError';
import {
  invalidDataInformation
} from '../../lib/logErrorMessage/errorMessageObject';
import {
  userTokenConfig
} from '../../config/tokenConfig';

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

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

      const validPassword = await validatePassword(password, user.password);

      if (!validPassword) throw new NotFoundError('Password is not correct');

      const accessToken = jwt.sign({
        userId: user._id,
      }, userTokenConfig.secret, {
        expiresIn: userTokenConfig.expiresIn,
      });

      return res.status(200).json({
        data: {
          email: user.email,
          userType: user.userType
        },
        accessToken
      })

    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },
}

export default authController;
