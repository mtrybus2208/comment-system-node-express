import jwt from 'jsonwebtoken';
import {
  userTokenConfig
} from '../../config/tokenConfig';
import User from '../../modules/users/users.model';

const accessTokenVerify = async (req, res, next) => {
  if (req.headers['x-access-token']) {
    try {
      const accessToken = req.headers['x-access-token'];
      const {
        secret,
        expiresIn
      } = userTokenConfig;
      const {
        userId,
        exp
      } = await jwt.verify(accessToken, secret);
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: 'JWT token has expired, please login to obtain a new one'
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();

    } catch (e) {
      next(e);
    }
  } else {
    next();
  }
}

export default accessTokenVerify;
