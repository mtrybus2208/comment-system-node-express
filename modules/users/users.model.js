const mongoose = require("mongoose");
const validators = require("mongoose-validators");

const {
  Schema
} = mongoose;

const User = new Schema({
  userType: {
    type: String,
    default: 'base',
    enum: [
      'base',
      'admin',
    ],
  },
  password: {
    type: String,
    validate: validators.isLength({
        message: 'Password is too long, max 50.',
      },
      1,
      100,
    ),
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: [
      validators.isLength({
          message: "usersValidation.email.validate.EN.message.length"
        },
        0,
        100
      ),
      validators.isEmail({
        message: "usersValidation.email.validate.EN.message.regex"
      })
    ],
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  page: {
    type: String,
    required: false
  },
  accessToken: {
    type: String
  }
});

User.statics = {
  getWithComments(query) {}
};

export default mongoose.model("User", User, "users");
