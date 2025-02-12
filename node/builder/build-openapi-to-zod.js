


import { spec } from './common.js';

await $`mkdir -p ./openapi-to-zod-3.1`;

try {
    await $`npx openapi-to-zod -x ts -i ${spec} -o ./openapi-to-zod-3.1`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}


