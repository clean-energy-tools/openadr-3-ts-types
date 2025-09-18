/**
 * Common configuration for OpenADR build scripts
 */

// Path to the OpenADR 3.1.0 specification
export const spec = '../../openadr3.1.0.yaml';

// Output directory for generated types
export const outputDir = '../package/src/generated';

// Type generation options for modern Node.js 22+ ESM
export const typeOptions = {
  filenamePrefix: 'openadr3',
  exportNamedSchemas: true,
  schemasOptions: {
    withDoc: true,
    withJSDoc: true,
  }
};