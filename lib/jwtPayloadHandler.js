import {
  ObjectId
} from 'mongodb';

export const userObjectId = req => ObjectId(req.locals.loggedUser._id);

export const jwtPayloadGetUserType = req => `${req.locals.loggedUser.userType}`;
