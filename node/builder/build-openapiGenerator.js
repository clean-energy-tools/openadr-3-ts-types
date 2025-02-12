import { cwd } from "process";

// https://openapi-generator.tech/
// https://github.com/OpenAPITools/openapi-generator

// Java-based tools that appear to be a fork of Swagger tools.
// Very massive tool.
// But difficult to configure for usefulness.

// await $`docker run --rm \
//   -v /home/david/Projects/openadr/openadr-3-ts-types:/local \
//   openapitools/openapi-generator-cli \
//   generate \
//   --skip-validate-spec  \
//   -i /local/oadr3.0.1.yaml \
//   -g typescript-axios \
//   -o /local/out/typescript-axios`



await $`docker run --rm \
  -v /home/david/Projects/openadr/openadr-3-ts-types:/local \
  openapitools/openapi-generator-cli \
  author template \
  -g typescript-axios \
  --library webclient`

