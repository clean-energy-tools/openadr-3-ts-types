


import { spec } from './common.js';

const outDir = './openapi-to-zod-3.1';
const pkgDir = '../package/src/zod/';

await $`mkdir -p ${outDir}`;

try {
    await $`npx openapi-to-zod -x ts -i ${spec} -o ${outDir}`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

await $`cp ${outDir}/* ${pkgDir}`;

