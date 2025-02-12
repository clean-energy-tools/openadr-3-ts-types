
//    https://www.npmjs.com/package/typeconv

import { spec } from './common.js';
const lSpec = 'oadr3.1.yaml';
try {
    await $`cp ${spec} ${lSpec}`;
    await $`npx typeconv -f oapi -t jsc -o typeconv-3.1 ${lSpec}`;
    await $`npx typeconv -f oapi -t ts -o typeconv-3.1 ${lSpec}`;
    await $`rm ${lSpec}`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

// await $`mkdir -p ../package/src/typeconv`;
// await $`cp typeconv/oadr3.0.1.json ../package/src/typeconv/oadr3.0.1.json`;

