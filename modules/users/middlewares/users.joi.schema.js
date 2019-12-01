import Joi from '@hapi/joi';
import {
  EMAIL_REGEX
} from '../../../config/regularExpressions';

const usersSchema = {
  createUsers: Joi.object({
    userType: Joi.string(),
    password: Joi.string()
      .max(100)
      .required(),
    name: Joi.string().max(100).required(),
    email: Joi.string()
      .regex(EMAIL_REGEX)
      .max(100)
      .required(),
    page: Joi.string(),
    accessToken: Joi.string(),
  }),
};

export default usersSchema;
