import {
  generateSchemaTypes,
  generateFetchers,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
import { spec, outputDir, typeOptions } from "./common.js";

export default defineConfig({
  openadr3: {
    from: {
      relativePath: spec,
      source: "file",
    },
    outputDir: "generated",
    to: async (context) => {
      // Generate schema types with JSDoc validation constraints
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix: typeOptions.filenamePrefix,
        exportNamedSchemas: typeOptions.exportNamedSchemas,
      });
      
      // Generate API components (endpoint parameters, response types, but not fetcher functions)
      await generateFetchers(context, {
        filenamePrefix: typeOptions.filenamePrefix,
        schemasFiles,
      });
      
      console.log(`Generated OpenADR schema types and API components with JSDoc validation constraints`);
    },
  },
});