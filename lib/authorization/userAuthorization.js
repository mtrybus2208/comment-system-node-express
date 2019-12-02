 import logAndSendMessage from '../../lib/logErrorMessage/logErrorReturnMessage';
 import {
   jwtPayloadGetUserType
 } from '../jwtPayloadHandler';
 import response from '../../config/response';

 const userAuthorization = (schema, options) => async (req, res, next) => {
   try {
     await schema.validateAsync({
       userAccessLevel: jwtPayloadGetUserType(res),
       ...options,
     });

     next();
   } catch (error) {
     logAndSendMessage(req, res, error, response.authorizationFail)
   }
 }

 export default userAuthorization;
