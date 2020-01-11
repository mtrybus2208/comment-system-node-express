import JsonRefs from 'json-refs';
import YAML from 'js-yaml';
import { version } from '../package.json';

const yamlContentProcessor = (res, callback) => {
  callback(undefined, YAML.safeLoad(res.text));
};

export const getSwaggerDocWithRefs = async docs => {
  const swaggerDoc = await JsonRefs.resolveRefs(docs, {
    loaderOptions: {
      processContent: yamlContentProcessor,
    },
  });

  return swaggerDoc.resolved;
};

const swaggerDefinition = {
  openapi: '3.0.0',
  servers: [
    {
      url: 'http://localhost:{port}/{basePath}',
      description: 'Development API server',
      variables: {
        port: {
          enum: ['5000'],
          default: '5000',
        },
        basePath: {
          enum: ['api/v1'],
          default: 'api/v1',
        },
      },
    },
  ],
  info: {
    title: 'Comments API',
    version,
  },
  components: {
    securitySchemes: {
      Bearer: {
        type: 'apiKey',
        name: 'x-jwt-token',
        in: 'cookie',
      },
    },
  },
};

export const swaggerOptions = {
  swaggerDefinition,
  apis: ['./modules/**/*.route.js'],
};
// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md
// https://swagger.io/docs/specification/authentication/
