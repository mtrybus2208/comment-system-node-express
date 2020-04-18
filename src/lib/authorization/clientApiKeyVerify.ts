import { Request, Response, NextFunction } from 'express';

import { apiKeyDecryption } from './clientApiKeyValidation';
import User from '../../modules/users/users.model';
import usersValidation from '../../modules/users/users.model.const';

const clientApiKeyVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = req.body;
    const decodedApiKey = apiKeyDecryption(data.apiKey);

    const user = await User.findOne({ apiKey: decodedApiKey });
    if (!user) {
      throw new Error(usersValidation.wrongApiKey.message);
    }

    res.locals.loggedUser = user;

    next();
  } catch (e) {
    next(e);
  }
};

export default clientApiKeyVerify;
