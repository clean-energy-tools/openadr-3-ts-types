
// @savotije/openapi-to-joi
// https://www.npmjs.com/package/@savotije/openapi-to-joi
//
// Generates Joi validation code from OpenAPI specifications
// It appears this is used in generating the package

import { spec } from './common.js';

await $`mkdir -p ./openapi-to-joi-3.1`;

try {
    await $`npx openapi-to-joi ${spec} -o ./openapi-to-joi-3.1/oadr3.js`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}


