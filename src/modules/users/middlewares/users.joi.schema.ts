import Joi from '@hapi/joi';
import { EMAIL_REGEX, USER_PASSWORD } from '../../../config/regularExpressions';
import { roles } from '../../../config/roles';

const usersSchema = {
  createUsers: Joi.object({
    userType: Joi.string(),
    password: Joi.string()
      .regex(USER_PASSWORD)
      .required(),
    name: Joi.string()
      .max(100)
      .required(),
    email: Joi.string()
      .regex(EMAIL_REGEX)
      .max(100)
      .required(),
    page: Joi.string(),
    accessToken: Joi.string(),
    tokens: Joi.object({
      passwordReset: Joi.string(),
    }),
  }),
  getUser: Joi.object({
    userAccessLevel: Joi.string()
      .valid(roles.admin.name)
      .required(),
  }),
  getUsers: Joi.object({
    userAccessLevel: Joi.string()
      .valid(roles.admin.name)
      .required(),
  }),
  validEmailSchema: Joi.string()
    .regex(EMAIL_REGEX)
    .max(100)
    .required(),

  newPassword: Joi.string()
    .regex(USER_PASSWORD)
    .required(),
};

export default usersSchema;
