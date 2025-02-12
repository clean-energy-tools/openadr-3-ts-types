
// https://www.npmjs.com/package/openapi-json-schema
//
// Minimalistic OpenAPI 3 ⬌ JSON Schema (draft 7) conversion.


import { promises as fsp } from 'node:fs';

import { spec } from './common.js';

import * as OSJ from 'openapi-json-schema';
import { YAML } from 'zx';

const _SPEC = await fsp.readFile(spec, 'utf-8');
const SPEC = YAML.parse(_SPEC);

// JSON Schema to Open API
// const openApi = jsonSchemaToOpenApiSchema( jsonSchema );

// Open API to JSON Schema
const jsonSchema = OSJ.openApiToJsonSchema(SPEC);

console.log(YAML.stringify(jsonSchema));


// const foo = {
//     "/paths": {
//         gronk: 1,

//     },
//     "/paths/{path_id}": {
//         gronk: 2
//     }
// };
