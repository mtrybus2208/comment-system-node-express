import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { userTokenConfig } from '../../config/tokenConfig';
import User from '../../modules/users/users.model';

const accessTokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { secret } = userTokenConfig;
    const token: string = req.cookies['x-jwt-token'];

    const payload: any = await jwt.verify(token, secret);
    const user = await User.findById(payload.id);
    res.locals.loggedUser = user;

    next();
  } catch (e) {
    next(e);
  }
};

export default accessTokenVerify;
