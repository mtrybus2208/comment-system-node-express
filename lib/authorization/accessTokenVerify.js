import jwt from 'jsonwebtoken';
import {
  userTokenConfig
} from '../../config/tokenConfig';
import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
import response from '../../config/response';
import User from '../../modules/users/users.model';

const accessTokenVerify = async (req, res, next) => {
  const {
    authorization
  } = req.headers;
  if (authorization) {
    try {
      const BEARER = 'Bearer';
      const accessToken = authorization.split(' ');

      if (accessToken[0] !== BEARER) {
        return logAndSendMessage(req, res, null, response.jwtTokenTokenNotComplete);
      }
      const {
        secret
      } = userTokenConfig;
      const {
        userId,
        exp
      } = await jwt.verify(accessToken[1], secret);
      if (exp < Date.now().valueOf() / 1000) {
        return logAndSendMessage(req, res, null, response.jwtExpired);
      }
      req.locals.loggedUser = await User.findById(userId); //???powinno byc w regest
      next();
    } catch (e) {
      next(e);
    }
  } else {
    next();
  }
};

export default accessTokenVerify;
