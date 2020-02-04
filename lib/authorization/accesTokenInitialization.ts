import jwtExpress from 'jwt-express';
import { userTokenConfig } from '../../config/tokenConfig';

const accesTokenInitialization = () => async (req, res, next): Promise<Function> => {
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
