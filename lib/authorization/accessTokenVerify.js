import jwt from 'jsonwebtoken';
import { userTokenConfig } from '../../config/tokenConfig';
import User from '../../modules/users/users.model';

const accessTokenVerify = async (req, res, next) => {
  try {
    const { secret } = userTokenConfig;
    const token = req.cookies['x-jwt-token'];

    const payload = await jwt.verify(token, secret);
    const user = await User.findById(payload.id);
    res.locals.loggedUser = user;

    next();
  } catch (e) {
    next(e);
  }
};

export default accessTokenVerify;
