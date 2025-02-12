
// https://www.npmjs.com/package/openapi-ts-json-schema
//
// Generate TypeScript JSON schema files (.ts modules with as const assertions) from OpenAPI definitions.
//
// In components/schemas, files are generated that
// seemingly containing schema objects that look to
// be useful with AJV.
//
// In paths, files are generated that cover the
// REST operations.

import { spec } from './common.js';

import { openapiToTsJsonSchema } from 'openapi-ts-json-schema';

const { outputPath } = await openapiToTsJsonSchema({
  openApiSchema: spec,
  definitionPathsToGenerateFrom: ['paths', 'components.schemas'],
  outputPath: './openapi-ts-json-schema'
});

console.log(outputPath);
