import Joi from '@hapi/joi';
import { roles } from '../../../config/roles';

const commentSchema = {
  enterComments: Joi.object({
    createdAt: Joi.number().required(),
    name: Joi.string().required(),
    slug: Joi.string().required(),
    copy: Joi.string().required(),
  }),
  getCommentsAuth: Joi.object({
    userAccessLevel: Joi.string()
      .valid(roles.admin.name, roles.base.name)
      .required(),
  }),
};

export default commentSchema;
