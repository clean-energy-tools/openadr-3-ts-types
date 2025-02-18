
//    https://www.npmjs.com/package/typeconv

import { spec } from './common.js';
const lSpec = 'oadr3.1.yaml';
const outDir = 'typeconv-3.1';
try {
    await $`cp ${spec} ${lSpec}`;
    await $`npx typeconv -f oapi -t jsc -o ${outDir} ${lSpec}`;
    await $`npx typeconv -f oapi -t ts -o ${outDir} ${lSpec}`;
    await $`rm ${lSpec}`;
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

await $`mkdir -p ../package/src/typeconv`;
await $`cp ${outDir}/oadr3.1.json ../package/src/typeconv/oadr3.1.json`;

