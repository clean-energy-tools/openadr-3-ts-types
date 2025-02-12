

## Kicking the tires of `openapi-client-axios-typegen`

The [`openapi-client-axios-typegen`](https://www.npmjs.com/package/openapi-client-axios-typegen) is the core of the [`openapicmd typegen`](https://openapistack.co/docs/openapicmd/typegen/) tool.  Openapicmd is part of the OpenAPI Stack suite of tools.

It generates type declarations from an OpenAPI specification.  And it appears there is an easy way to use that in an OpenAPI client library.

See [`build-typegen.js`](./build-typegen.js)

Run this:

```shell
$ npx openapicmd typegen oadr3.0.1.yml >oadr3.0.1.d.ts
# Or
$ npx openapi-client-axios-typegen ${spec} -o typegen/openadr-3.d.ts
```

This generates type declarations in a file.  But, these do not include JSDOC tags.  That makes it difficult to use a tool like `ts-to-zod` which relies on JSDOC tags in type declarations to properly generate Zod schemas.

