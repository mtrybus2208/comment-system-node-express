import fs from 'fs';
import path from 'path';
import mjml from 'mjml';

import templatesMapper from './templatesMapper';

const resolveTemplate = type => {
  const emailTemplateFile = fs.readFileSync(path.resolve(templatesMapper[type]), {
    encoding: 'utf8',
  });

  return mjml(emailTemplateFile).html;
};

export default resolveTemplate;
