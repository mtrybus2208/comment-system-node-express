import {
  ObjectId
} from 'mongodb';

export const userObjectId = res => ObjectId(res.locals.loggedUser._id);

export const jwtPayloadGetUserType = res => `${res.locals.loggedUser.userType}`;
