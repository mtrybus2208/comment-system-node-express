import Joi from '@hapi/joi';

import { roles } from '../../../config/roles';

const authSchema = {
  generateClientApiKey: Joi.object({
    userAccessLevel: Joi.string()
      .valid(roles.admin.name, roles.base.name)
      .required(),
  }),
};

export default authSchema;
