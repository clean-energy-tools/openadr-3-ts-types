

import { spec } from './common.js';

await $`mkdir -p ./openapi-schema-to-json-schema`;

await $`yq -o json ${spec} >oadr3.json`;

try {
    await $`npx "@openapi-contrib/openapi-schema-to-json-schema" --input oadr3.json --output openapi-schema-to-json-schema/schema.json`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

await $`rm oadr3.json`;


