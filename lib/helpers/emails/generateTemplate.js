import { pipe, curry } from 'rambda';

import replaceValues from './replaceValues';
import resolveTemplate from './resolveTemplate';

const generateTemplate = (name, data) => pipe(resolveTemplate, curry(replaceValues)(data))(name);

export default generateTemplate;
