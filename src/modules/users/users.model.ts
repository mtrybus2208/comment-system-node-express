import mongoose from 'mongoose';
import validators from 'mongoose-validators';

import { roles } from '../../config/roles';
import { UserModel, UserSchema } from '../../types/users/users.types';

const { Schema } = mongoose;

const User: mongoose.Schema = new Schema({
  userType: {
    type: String,
    default: 'base',
    enum: [roles.base.name, roles.admin.name],
  },
  password: {
    type: String,
    validate: validators.isLength(
      {
        message:
          'Incorrect password format. It must be between 5 and 15 digits long and include at least one numeric digit.',
      },
      5,
      15,
    ),
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [
      validators.isLength(
        {
          message: 'Email is too long, max 100.',
        },
        0,
        100,
      ),
      validators.isEmail({
        message: 'Email is not valid',
      }),
    ],
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  page: {
    type: String,
    required: false,
  },
  accessToken: {
    type: String,
  },
  tokens: {
    passwordReset: {
      type: String,
    },
  },
});

User.statics = {
  getWithComments(): void {},
};

export default mongoose.model<UserModel, UserSchema>('User', User, 'users');
