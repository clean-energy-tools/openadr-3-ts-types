
# Generating JSON Schema with `@openapi-contrib/openapi-schema-to-json-schema`

This is a Node.js tool for converting OpenAPI to JSON Schema

See: [`build-openapi-generator.js`](./build-openapi-generator.js)

See: [`build-openapi-schema-to-json-schema.js`](./build-openapi-schema-to-json-schema.js)

USAGE:

```shell
$ npm install @openapitools/openapi-generator-cli --save
$ npx "@openapi-contrib/openapi-schema-to-json-schema" --input ../oadr3.0.1.yaml --output ./openapi-schema-to-json-schema
```

Unfortunately this tool does not support YAML-formatted OpenAPI specifications.  WTF?

```shell
Error: Unexpected token 'o', "openapi: 3"... is not valid JSON
```

The script, `build-openapi-generator.js`, takes care of converting the YAML-formatted specification to JSON, running the conversion, putting it into an output directory.

But, the result is a JSON-formatted OpenAPI spec, and not a JSON Schema.