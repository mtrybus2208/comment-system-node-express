import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';

import logAndSendMessage from '../logErrorMessage/logErrorReturnMessage';
import { AuthorizationTypes } from '../../types/authorization/authorization.types';
import { jwtPayloadGetUserType } from '../jwtPayloadHandler';
import response from '../../config/response';

const userAuthorization = (
  schema: Joi.Schema,
  type: AuthorizationTypes = AuthorizationTypes.JWT,
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await schema.validateAsync({
      userAccessLevel:
        type === AuthorizationTypes.JWT
          ? jwtPayloadGetUserType(res)
          : res.locals.loggedUser.userType,
    });
    next();
  } catch (error) {
    logAndSendMessage(req, res, error, response.authorizationFail);
  }
};

export default userAuthorization;
