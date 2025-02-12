
# Multi-way conversions with `typeconv`

Typeconv is a tool for bidirectional conversion between:

* JSON Schema
* OpenAPI
* TypeScript
* GraphQL
* SureType

Installation:

```shell
$ npm install typeconv --save
```

See [`build-typeconv.js`](./build-typeconv.js)

Generate JSON Schema from an OpenAPI spec:

```shell
$ npx typeconv -f oapi -t jsc -o typeconv oadr3.0.1.yaml
```

The input file must be in the current directory.  I was unable to get `../oadr3.0.1.yaml` to work, nor the full pathname.

The `-f` option is the input format, which is OpenAPI.  The `-t` option is the output format, which is JSON Schema in this case.

This generated a single JSON file containing good looking JSON schema definitions for every object type in the specification.  One should be able to use this with AJV to generate validation code.

```shell
$ npx typeconv -f oapi -t ts -o typeconv oadr3.0.1.yaml 
```

In this case `-t ts` means to generate TypeScript type definitions.  The generated file contains the expected type definitions.  The formatting is a little weird.  It does not have JSDOC annotations.

Hence -- with this we can generate decent quality type declarations, and JSON Schema which should be usable with AJV for data validation.
