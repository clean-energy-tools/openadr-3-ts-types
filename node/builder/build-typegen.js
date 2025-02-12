


import { spec } from './common.js';

await $`mkdir -p ./typegen`;

try {
    await $`npx openapi-client-axios-typegen ${spec} -o typegen/openadr-3.d.ts`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}


