import authSchema from './auth.joi.schema';
import userAuthorization from '../../../lib/authorization/userAuthorization';

export const generateClientApiKeyAuth = userAuthorization(authSchema.generateClientApiKey);
