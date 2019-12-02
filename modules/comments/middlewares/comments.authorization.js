import userAuthorization from '../../../lib/authorization/userAuthorization';
import commentSchema from './comments.joi.schema';

export const getCommentsAuth = userAuthorization(commentSchema.getCommentsAuth);
