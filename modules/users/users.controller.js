import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import User from './users.model';
import { invalidDataInformation } from '../../lib/logErrorMessage/errorMessageObject';
import { userTokenConfig } from '../../config/tokenConfig';

const hashPassword = async password => {
  return await bcrypt.hash(password, 10);
};

const usersController = {
  async createUser(req, res, next) {
    try {
      const { user } = req.body;
      const hashedPassword = await hashPassword(user.password);
      const newUser = new User({
        ...user,
        password: hashedPassword,
      });
      res.locals.user = newUser;
      next();
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async generateToken(req, res, next) {
    try {
      const { user } = res.locals;

      const { secret, expiresIn } = userTokenConfig;

      const accessToken = jwt.sign(
        {
          userId: user._id,
        },
        secret,
        {
          expiresIn,
        },
      );

      user.accessToken = accessToken;
      await user.save();
      res.jwt({
        id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        ...(user.page && {
          user: user.page,
        }),
      });
      next();
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async createUserSuccess(req, res, next) {
    return res.status(201).json({
      message: 'User have been created',
      user: res.locals.user,
    });
  },

  async getUsers(req, res, next) {
    try {
      const users = await User.find({});
      return res.status(200).json({
        message: 'Successful operation',
        users,
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async getUser(req, res, next) {
    try {
      const { user, comments } = res.locals;
      return res.status(200).json({
        message: 'Successful operation',
        user,
        comments,
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },
};

export default usersController;
