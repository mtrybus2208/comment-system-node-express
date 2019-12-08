import jwt from 'jsonwebtoken';
import jwtExpress from 'jwt-express';
import {
  userTokenConfig
} from '../../config/tokenConfig';
import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import response from '../../config/response';
import User from '../../modules/users/users.model';

const accesTokenInitialization = () => async (req, res, next) => {
  return jwtExpress.init(userTokenConfig.secret, {
    cookie: 'x-jwt-token',
    cookies: true,
    cookieOptions: {
      sameSite: true,
      httpOnly: true,
    },
    refresh: true,
  })(req, res, next);
};

export default accesTokenInitialization;
