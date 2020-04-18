import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import User from './users.model';
import {
  invalidDataInformation,
  resetPasswordInformationEmail,
} from '../../lib/logErrorMessage/errorMessageObject';
import sendEmail from '../../lib/helpers/users/sendEmail';
import generateTemplate from '../../lib/helpers/emails/generateTemplate';
import { userTokenConfig } from '../../config/tokenConfig';
import usersValidation from './users.model.const';
import { hashPassword } from '../../lib/authorization/hashPassword';

const usersController = {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user } = req.body;
      const hashedPassword = await hashPassword(user.password);
      const newUser = new User({
        ...user,
        password: hashedPassword,
        apiKey: uuidv4(),
      });
      res.locals.user = newUser;
      next();
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async generateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
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

  async createUserSuccess(req: Request, res: Response): Promise<Response> {
    return res.status(201).json({
      message: 'User have been created',
      user: res.locals.user,
    });
  },

  async getUsers(req: Request, res: Response): Promise<Response> {
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

  async getUser(req: Request, res: Response): Promise<Response> {
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

  async findUserByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
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
  },

  async generatePasswordResetToken(req: Request, res: Response, next: NextFunction): Promise<void> {
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
  },

  async sendResetPasswordEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { token, user } = res.locals;

    const templateData = {
      link: `${process.env.UI_HOST || 'http://localhost:3000'}/password-reset/${token}`,
    };

    const emailData = {
      to: user.email,
      subject: 'Password reset',
    };

    try {
      const template = generateTemplate('passwordReset', templateData);
      await sendEmail(template, emailData);

      next();
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },

  async sendResetPasswordEmailSuccess(req: Request, res: Response): Promise<Response> {
    const { email }: { email: string } = req.body;
    try {
      return res.status(200).json({
        message: `Password reset email has been sent to: ${email}`,
      });
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },
  async getTokenPayload(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { secret } = userTokenConfig;
      const { token } = req.params;

      res.locals.tokenPayload = await jwt.verify(token, secret);
      next();
    } catch (error) {
      logAndSendMessage(req, res, error, invalidDataInformation);
    }
  },
};

export default usersController;
