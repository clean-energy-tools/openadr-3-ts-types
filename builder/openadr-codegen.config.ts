import {
  generateSchemaTypes,
  generateFetchers
} from "@openapi-codegen/typescript";
import {
  defineConfig
} from "@openapi-codegen/cli";
export default defineConfig({
  openADR: {
    from: {
      relativePath: "../oadr3.0.1.yaml",
      source: "file",
    },
    outputDir: "./codegen-build",
    to: async (context) => {
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix: "openADR",
      });
      await generateFetchers(context, {
        /* config */
        schemasFiles,
      });
    },
  },
});
