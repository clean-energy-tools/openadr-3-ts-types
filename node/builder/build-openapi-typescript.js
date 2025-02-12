

import { spec } from './common.js';

await $`mkdir -p openapi-typescript-3.1`
try {
    await $`npx openapi-typescript ${spec} >openapi-typescript-3.1/types.ts`
} catch (err) {
    console.log(`FAIL ${err.exitCode} ${err.stderr}`);
}

// await $`cp openapi-typescript-3.1/types.ts ../package/src/openapi-typescript/types.ts`;


// The following is an exploration of the
// possibility of using the openapiTS function
// to do deeper transformations.

// import YAML from 'js-yaml';
// import util from 'node:util';
// import fs from "node:fs";
// import openapiTS, { astToString } from "openapi-typescript";
// import { IndentStyle } from 'typescript';

// const ast = await openapiTS(new URL("../src/oadr3.0.1.yaml", import.meta.url), {
//     transform(schemaObject, metadata) {
//             console.log(YAML.dump({
//                 path: metadata.path,
//                 schema: schemaObject,
//                 metadata: util.inspect(metadata)
//             }, { indent: 4 }));
//             // console.log(util.inspect({
//             //     schemaObject,
//             //     metadata
//             // }));
//             return undefined;
//         }
//     });
// const contents = astToString(ast);

// // (optional) write to file
// fs.writeFileSync('./oadr3.ast.yaml', YAML.dump({
//     ast,
//     contents
// }, { indent: 4 }));
// fs.writeFileSync("./my-schema.ts", contents);
