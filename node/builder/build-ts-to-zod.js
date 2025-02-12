

import { spec } from './common.js';

const oadrTypes = './openapi-codegen-2025-02-12/oadr3Schemas.ts';

await $`mkdir -p ./ts-to-zod`;

try {
    await $`npx ts-to-zod ${oadrTypes} ./ts-to-zod/zod-types.ts`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}


