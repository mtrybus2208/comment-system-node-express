import fs from 'fs';
import path from 'path';
import mjml2html from 'mjml';

import templatesMapper from './templatesMapper';

const resolveTemplate = (type: string): string | undefined => {
  const emailTemplateFile: string = fs.readFileSync(path.resolve(`src/${templatesMapper[type]}`), {
    encoding: 'utf8',
  });

  return mjml2html(emailTemplateFile).html;
};

export default resolveTemplate;
