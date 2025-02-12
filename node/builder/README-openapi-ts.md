

# Generating types, client, and schema, from OpenAPI with `openapi-ts`

This tool seems to be trying to supplant `@openapi-codegen/cli`.

As of this writing, `openapi-ts` is in early days, seems to be incomplete, and beta quality.  Given how popular this project is (almost 200,000 weekly downloads) there must be great big value, but the results I see are incomplete and not useful.

It is focusing on generating type declarations, client code, and JSON Schema, from OpenAPI specs.

Install:

```shell
$ npm install @hey-api/client-fetch --save && npm install @hey-api/openapi-ts --save-dev
$ npm install @hey-api/client-axios --save
```

The client code supports using any of several HTTP libraries, such as Fetch and Axios.

See: [`build-openapi-ts.js`](./build-openapi-ts.js)  -- This shows using the API with an in-line configuration object rather than an external object.

Usage:

```shell
$ npx openapi-ts -f openapi-ts.config.cjs 
```

You configure specifics either from command-line options or a config file in JavaScript format.  The latter seems to be more comprehensive 

```js
/** @type {import('@hey-api/openapi-ts').UserConfig} */
module.exports = {
  client: '@hey-api/client-axios',
  input: '../oadr3.0.1.yaml',
  output: {
    format: 'prettier',
    path: 'openapi-ts'
  },
  services: {
    asClass: false
  },
  schemas: {
    type: 'json'
  }
};
```

This takes a YAML-formatted OpenAPI file as input, producing code into a directory named `openapi-ts`.  The JSON schema is stored in a TypeScript file, rather than a JSON file.  The client code is very terse and not quite understandable.  The client code can be generated as a class, but with this setting it is simply functions.

The type declarations look very good, but do not have JSDOC tags.

The Zod plugin was enabled and it generated only a couple Zod validators.  Not useful.



