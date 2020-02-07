import { Document, Model } from 'mongoose';

export enum UserType {
  admin,
  base,
}

export interface User {
  userType: UserType;
  password: string;
  name: string;
  email: string;
  page?: string;
  accessToken: string;
  tokens: {
    passwordReset: string;
  };
}

export type UserModel = User & Document;

export type UserSchema = Model<UserModel> & {
  getWithComments: () => void;
};
