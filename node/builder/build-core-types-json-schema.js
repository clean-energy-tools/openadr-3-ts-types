
// Run using: npx zx build-core-types-json-schema.js

import { promises as fsp } from 'node:fs';

import { spec } from './common.js';

import { YAML } from 'zx';

const _SPEC = await fsp.readFile(spec, 'utf-8');
const SPEC = YAML.parse(_SPEC);

import {
    convertCoreTypesToJsonSchema,
    convertOpenApiToCoreTypes
} from 'core-types-json-schema'

let doc = convertOpenApiToCoreTypes(SPEC); // This core-types document comes from somewhere

// This conversion is fairly good, but it
// lacks some important things.  The spec
// includes format:date-time, format:uri,
// pattern, nullable, all of which are lost.
//
// Here are the core-types
//
// - description: datetime in ISO 8601 format
//   type: string
//   name: dateTime
// - default: PT0S
//   description: duration in ISO 8601 format
//   type: string
//   name: duration
//
// In this case dateTime must have format:date-time
// and duration must have a pattern containing
// the regular expression matching a Duration string.

// console.log(YAML.stringify(doc));

const { data: jsonSchema } = convertCoreTypesToJsonSchema(doc.data);

console.log(YAML.stringify({
    // data,
    core: doc,
    jsonSchema
}));
