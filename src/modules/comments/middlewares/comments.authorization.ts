import userAuthorization from '../../../lib/authorization/userAuthorization';
import commentSchema from './comments.joi.schema';
import { AuthorizationTypes } from '../../../types/authorization/authorization.types';

export const getCommentsAuth = userAuthorization(
  commentSchema.getCommentsAuth,
  AuthorizationTypes.API_KEY,
);
