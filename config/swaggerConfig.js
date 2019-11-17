import JsonRefs from 'json-refs';
import YAML from 'js-yaml';
import { version } from '../package.json';


const yamlContentProcessor = (res, callback) => {
  callback(undefined, YAML.safeLoad(res.text));
}

export const getSwaggerDocWithRefs = async docs => {
  const swaggerDoc = await JsonRefs.resolveRefs(docs, {
    loaderOptions: {
      processContent: yamlContentProcessor,
    },
  });

  return swaggerDoc.resolved;
}

const swaggerDefinition = {
  info: {
    title: 'Comments API',
    version,
  },
  basePath: '/api/v1/',
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'x-jwt-token',
      in: 'cookie',
    },
  },
};

export const swaggerOptions = {
  swaggerDefinition,
  apis: ['./modules/**/*.route.js'],
};
