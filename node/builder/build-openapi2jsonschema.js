

import { spec } from './common.js';

await $`mkdir -p openapi2jsonschema`;

// SETUP: $ pip install openapi2jsonschema

try {
    await $`openapi2jsonschema -o openapi2jsonschema ${spec}`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

