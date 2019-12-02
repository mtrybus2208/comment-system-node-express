import Joi from '@hapi/joi';

const commentSchema = {
  enterComments: Joi.object({
    createdAt: Joi.number()
      .required(),
    createdBy: Joi.string()
      .required(),
    name: Joi.string()
      .required(),
    slug: Joi.string()
      .required(),
    copy: Joi.string()
      .required(),
  }),
  getCommentsAuth: Joi.object({
    userAccessLevel: Joi.string()
      .valid('admin')
      .required(),
  }),
}

export default commentSchema;
