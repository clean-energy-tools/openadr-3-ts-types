
// @savotije/openapi-to-joi
// https://www.npmjs.com/package/@savotije/openapi-to-joi
//
// Generates Joi validation code from OpenAPI specifications
// It appears this is used in generating the package

import { spec } from './common.js';

const outDir = './openapi-to-joi-3.1';
const pkgDir = '../package/src/joi/';

await $`mkdir -p ${outDir}`;

try {
    await $`npx openapi-to-joi ${spec} -o ${outDir}/oadr3.ts`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

await $`cp ${outDir}/oadr3.ts ${pkgDir}`
