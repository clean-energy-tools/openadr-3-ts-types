# Build scripts for the `openadr-3-ts-types` package

The package `openadr-3-ts-types` contains JavaScript and TypeScript files which are automatically built from the OpenADR v3 specification.  That specification is a YAML file available through the [OpenADR Alliance](https://www.openadr.org/).  The specification itself is available under the Apache 2 license.

OpenADR is a trademark of the OpenADR alliance.

The intent of this package is providing type declarations and data validation functions corresponding to the OpenADR 3 schema.

The scripts in this directory build the source code which is in the `../package` directory.

The build process is:

```shell
$ npm run build
$ npm run build:zod
$ npm run build:joi
$ npm run build:codegen
```

The `build:xyzzy` scripts handle building each part of `../package/src`.  The `build` script runs all three in turn.

In `package.json`, the `config` section contains variables listing the pathname for the OpenADR source file, and output directories for each output:

```json
  "config": {
    "openadryaml": "../oadr3.0.1.yaml",
    "zodoutput": "../package/zod/",
    "zodoutput_dev": "./zod/",
    "joioutput": "../package/src/joi/oadr3.ts",
    "joioutput_dev": "./oadr3.ts"
  },
```

For development one can easily change the output by changing the variables.  It is meant that `zodoutput` and `joioutput` can be renamed with `_save` on the end, and that the `_dev` variables be renamed to `zodoutput` and `joioutput`.  Hence, during development one can change the output locations without overwriting existing code in `../package`.

The output for Zod and Joi code lands directly into the correct places in `../package/src`.

The `build:codegen` step uses `@openapi-codegen/cli` to build TypeScript classes for OpenADR data types.  The configuration file `openadr-codegen.config.ts` controls what to generate and influences the filenames.  The generated files are are `./codegen-build/openadr3ApiComponents.ts`, `./codegen-build/openadr3ApiFetcher.ts`, and `./codegen-build/openAdRSchemas.ts`.  Processing these files require some manual intervention and is not automated.

The latter is the type declarations for OpenADR schema objects, and it is directly copied to `../package/src/codegen`, while correcting the file name to `openADRSchemas.ts`.

In `openadr3ApiComponents.ts` are type declarations for the API methods, as well as functions comprising an OpenADR client.  This file can be directly copied to `../package/src/codegen`, but the functions for the client API are commented out.  As a result, `openadr3ApiFetcher.ts` is not copied to `../package/src/codegen`.

# Generating an equivalent package for an extended version of OpenADR

Your application may wish to extend OpenADR with additional objects, API methods, or fields on the schema objects.  You should therefore generate a package like `openadr-3-ts-types` supporting your extended version of OpenADR.

The steps to follow are:

* Clone the `openadr-3-ts-types` GitHub repository.
* In `../package/package.json`, change the `name` field and other fields appropriately to your OpenADR extension.
* Download the OpenADR specification from `openadr.org`.
* Modify the OpenAPI YAML specification as needed for your application.
* Use the `build:xyzzy` scripts in `builder/package.json` to generate code for your package.  The value for `openadryaml` should change to point to your extended specification file.
* Modify the tests in `../test/lib` to match the changes you've made.
* Make sure the README's in your cloned repository explain that the package is derived from `openadr-3-ts-types`, and what are the differences.  In other words, give credit (and a link) to this project, while clearly saying that it is different, why it is different, and that it has a different name.
* Package and distribute the resulting package.

# Reviewing technologies for autogenerating TypeScript code from OpenAPI achema's

While creating this package, I evaluated a big range of tools for processing OpenAPI specifications into code for TypeScript programming.

The goal of the build scripts is to auto-generate TypeScript type declarations, and corresponding data validation using Zod. 

Several routes were tested for that purpose.  Let's go over the techniques and results which were found.

## Using `openapi-to-zod` to generate Zod validation from OpenAPI

The `openapi-to-zod` package looked like a single-stop-shopping experience.  In one step, it generates Zod validation objects, and supports generating TypeScript types from the validators.  But ...

Usage with the OpenADR specification:

```
npx openapi-to-zod -x ts -i oadr3.0.1.yaml -o a
```

The `-i` option names the input file, and `-o` names an output directory where generated files land.  The `-x` option is where you specify the file extension.

The output directory looks like:

```
$ ls a
zod-dateTime.ts                zod-intervalPeriod.ts
zod-objectTypes.ts             zod-reportDescriptor.ts
zod-subscription.ts            zod-duration.ts
zod-interval.ts                zod-point.ts
zod-reportPayloadDescriptor.ts zod-valuesMap.ts
zod-eventPayloadDescriptor.ts  zod-notification.ts
zod-problem.ts                 zod-report.ts
zod-ven.ts                     zod-event.ts
zod-objectID.ts                zod-program.ts
zod-resource.ts
```

There is one output file per schema declaration.  The contents look like this:

```js
import { z } from "zod";

export default z
  .string()
  .regex(
    new RegExp(
      "/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"
    )
  )
  .describe("duration in ISO 8601 format")
  .default("PT0S");
```

The code is straight-forward, and the Zod validator object is exported as the default from the module.  There is an issue here that we'll get to later.

```js
import Duration from './zod/zod-duration.js';
export { default as Duration } from './zod/zod-duration.js';
export type Duration = z.infer<typeof Duration>;
```

This is how I decided to put this to use.  There are two thingies named _Duration_.  The first is the validator/parser shown above.  The second is a TypeScript type _inferred_ from the validator/parser.

One attraction of Zod is not having to write a type declaration.  Instead, you write a validator, from which Zod can generate the _type_.

This looks cool and straightforward.  You auto-generate the validator/parser code, and from that generate types.  But, there are problems.

First issue is this error:

```
{
    "code": "invalid_string",
    "validation": "datetime",
    "message": "Invalid datetime",
    "path": [
        "createdDateTime"
    ]
}
```

This is an obtuse error, but it arises from this:

```js
createdDateTime: z
    .string()
    .datetime()
    .describe("datetime in ISO 8601 format")
    .default("0000-00-00")
```

The `dateTime` schema is a string declared with `format: date-time`.  This means the string must match the ISO8601 date format, a widely used standard for date/time/duration strings.

The problem here is that this field is optional, but the validator/parser shown here makes it a required thing.  The declaration should end with `.optional()`, but it doesn't.

The second is this error:

```
{
    "validation": "regex",
    "code": "invalid_string",
    "message": "Invalid",
    "path": [
      "timeZoneOffset"
    ]
}
```

The `timeZoneOffset` is uses the ISO 8601 Duration string format.  The generated code for this is shown above.

Notice that the code includes a string containing a regular expression, and that the string includes an opening and closing slash, inside the string.

The `timeZoneOffset` field uses this schema by reference:

```yaml
duration:
    type: string
    pattern: /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
    description: duration in ISO 8601 format
    example: PT1H
    default: PT0S
```

It's cool to put slashes before and after a regular expression.  Doing so refers back to text editors of yore, like `/bin/ed` and `/usr/bin/vi`.  The JavaScript language recognizes a regular expression inside slashes, directly converting that to a RegExp object.  But, it does not do so for a quoted string that contains a regular expression that has slashes.

There's either a problem with the specification, or a problem with code generation.  The `openapi-to-zod` package could recognize that a `pattern` element is supposed to have a regular expression, and to look for the slashes, and to generate different code than what you see above.

But, it doesn't do so.  Instead, incorrect code is generated, and an error is thrown.

Between the above issues, and the fact that `openapi-to-zod` is at version 0.0.5, I decided to try other things.

## Generating types using `openadr-typescript`

The [`openapi-typescript`](https://www.npmjs.com/package/openapi-typescript) is an interesting tool for generating declarations for not the schemas, but for REST API parameters.

Usage:

```
npx openapi-typescript oadr3.0.1.yaml -o ./src/zod
```

For example:

```js
import { paths, components } from "./path/to/my/schema";

// Schema Obj
type MyType = components["schemas"]["MyType"];

// Path params
type EndpointParams = paths["/my/endpoint"]["parameters"];
```

The first line imports the generated code, focusing on the `paths` and `components` objects.  These are nested data structures structured something like this:

```js
export interface paths {
  "/programs": {
    /**
     * searches all programs
     * @description List all programs known to the server.
     * Use skip and pagination query params to limit response size.
     */
    get: operations["searchAllPrograms"];
    /**
     * create a program
     * @description Create a new program in the server.
     */
    post: operations["createProgram"];
  };
  // ...
};

export interface operations {

  /**
   * searches all programs
   * @description List all programs known to the server.
   * Use skip and pagination query params to limit response size.
   */
  searchAllPrograms: {
    parameters: {
      query?: {
        /** @description Indicates targeting type, e.g. GROUP */
        targetType?: string;
        /** @description List of target values, e.g. group names */
        targetValues?: string[];
        /** @description number of records to skip for pagination. */
        skip?: number;
        /** @description maximum number of records to return. */
        limit?: number;
      };
    };
    responses: {
      /** @description OK. */
      200: {
        content: {
          "application/json": components["schemas"]["program"][];
        };
      };
      // ...
    }
  }
  // ...
};
```

At `operations.searchAllPrograms.parameters.query`, there is a nice type declaration of the parameters.  And in the `responses` section, there is a nice declaration of the schema for the HTTP response body.  At `components.schemas.program`, there is likewise a nice type declaration of the object structure.

It's nice and easy to use when writing code.  But I did not find a Zod generator which could handle these type declarations to generate Zod code.

## Kicking the tires of `openapi-client-axios-typegen`

The [`openapi-client-axios-typegen`](https://www.npmjs.com/package/openapi-client-axios-typegen) is the core of the [`openapicmd typegen`](https://openapistack.co/docs/openapicmd/typegen/) tool.  Openapicmd is part of the OpenAPI Stack suite of tools.

It generates type declarations from an OpenAPI specification.  And it appears there is an easy way to use that in an OpenAPI client library.

But, it was non-obvious how to put the thing to use.

## Generating Zod code using `ts-to-zod`

The [`ts-to-zod`](https://www.npmjs.com/package/ts-to-zod) package generates very nice Zod code from TypeScript type declarations.  You simply give it a source file containing types, and it generates a file containing Zod validator/parser code.

The question was how to auto-generate TypeScript types from the OpenADR specification.  Nothing could be found.

Instead, a source file was semi-manually constructed from the output of `openadr-typescript`.  The type declarations it produced were excellent, but not correctly positioned for use with `ts-to-zod`.

Usage:

```
npx ts-to-zod ./src/types.ts ./src/zod-types.ts
```

A nice feature of `ts-to-zod` is using JSDoc tags for describing the types.  For example, here is the Duration declaration:

```js
/**
 * duration in ISO 8601 format
 * @pattern ^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$
 */
export type Duration = string;
```

Very straightforward.  Another benefit is the possibility of generating HTML documentation from this code.

The generated Zod validator/parser is equally good:

```js
export const durationSchema = z
  .string()
  .regex(
    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
  );
```

Notice that it recognizes that a `@pattern` takes a regular expression, and that the generated code uses the JavaScript syntax for this.

Another issue with `openapi-to-zod` not mentioned earlier is that it did not reuse existing declarations.  There are many OpenADR objects using the Duration object.  The `openapi-to-zod` code did not reference the Duration definition, and instead repeated the code generation each time.  OpenADR contains many object defintions that are reused multiple time.  This meant its generated code was more than bloated.

By contrast:

```js
export const intervalPeriodSchema = z.object({
  start: dateTimeSchema,
  duration: durationSchema.optional(),
  randomizeStart: durationSchema.optional(),
});
```

In `ts-to-zod`, code is routinely reused, and there's no code bloat.

