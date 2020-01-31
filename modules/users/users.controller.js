import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import User from './users.model';
import {
  invalidDataInformation,
  resetPasswordInformationEmail,
} from '../../lib/logErrorMessage/errorMessageObject';
import { userTokenConfig } from '../../config/tokenConfig';
import usersValidation from './users.model.const';

const hashPassword = async password => {
  return await bcrypt.hash(password, 10);
};

export const createUser = async (req, res, next) => {
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
};

export const generateToken = async (req, res, next) => {
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
};

export const createUserSuccess = async (req, res, next) => {
  return res.status(201).json({
    message: 'User have been created',
    user: res.locals.user,
  });
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      message: 'Successful operation',
      users,
    });
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};

export const getUser = async (req, res, next) => {
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
};

export const findUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, 'i') },
    });

    if (!user) {
      throw new Error(usersValidation.notFound.message);
    }

    res.locals.user = user;
    next();
  } catch (error) {
    logAndSendMessage(req, res, error, resetPasswordInformationEmail);
  }
};

export const generatePasswordResetToken = async (req, res, next) => {
  const {
    user: { _id: id },
  } = res.locals;

  const payload = {
    id,
  };

  const tokenOptions = {
    expiresIn: userTokenConfig.expiresIn,
  };

  try {
    const user = await User.findById(id);

    if (!user) throw new Error(usersValidation.notFound.message);

    const token = jwt.sign(payload, userTokenConfig.secret, tokenOptions);

    user.tokens.passwordReset = token;
    user.save();
    res.locals.token = token;

    next();
  } catch (error) {
    logAndSendMessage(req, res, error, invalidDataInformation);
  }
};
