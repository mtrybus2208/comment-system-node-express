import mongoose from 'mongoose';
import validators from 'mongoose-validators';
import roles from '../../config/roles';

const { Schema } = mongoose;

const User = new Schema({
  userType: {
    type: String,
    default: 'base',
    enum: [roles.base.name, roles.admin.name],
  },
  password: {
    type: String,
    validate: validators.isLength(
      {
        message: 'Password is too long, max 50.',
      },
      1,
      100,
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
});

User.statics = {
  getWithComments(query) {},
};

export default mongoose.model('User', User, 'users');
