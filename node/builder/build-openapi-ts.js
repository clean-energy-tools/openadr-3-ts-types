
import { createClient } from '@hey-api/openapi-ts';

/** @type {import('@hey-api/openapi-ts').UserConfig} */
const config = {
    client: '@hey-api/client-axios',
    input: '../../../specification/3.1.0/openadr3.yaml',
    output: {
      format: 'prettier',
      path: 'openapi-ts'
    },
    services: {
      asClass: false
    },
    schemas: {
      type: 'json'
    },
    plugins: [ 'zod' ]
};

createClient(config);

// createClient({
//   input: 'path/to/openapi.json',
//   output: 'src/client',
//   plugins: ['@hey-api/client-fetch'],
// });
