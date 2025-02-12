
# Generating TypeScript types using the `@openapi-codegen/cli` package

With `@openapi-codegen/cli`, one can generate several kinds of assets from an OpenAPI specification.  We're interested in the data types it generates, and possibly the Fetcher functions which constitute a REST API client as defined in the specification.

## Installation

```shell
$ npm install @openapi-codegen/cli \
        @openapi-codegen/typescript --save
```

## Usage

See [`build-codegen.js`](./build-codegen.js)

```shell
$ npx openapi-codegen gen OADR -c codegen-openadr.config.ts
```

The configuration file can be generated this way:

```shell
$ npx @openapi-codegen/cli init
? Select the source of your OpenAPI Url
? Relative path ../../../specification/3.1.0/openadr3.yaml
? What namespace do you want for your API? OADR3
? What do you want to generate? Generic Fetchers
? Which folder do you want to generate? openapi-codegen-2025-02-12 

# When that finishes it prints the following:

A new config file has been created!

  Next steps:
   - npx openapi-codegen gen oadr3

# The file looks like this in the filesystem

$ ls -l openapi-codegen.config.ts 
-rw-rw-r-- 1 david david 617 Feb 12 15:45 openapi-codegen.config.ts
```

With the `init` command one goes through an interactive questionnaire, with those as sample answers.  The result is a configuration file, which looks like this:

```js
import {
  generateSchemaTypes,
  generateFetchers,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  oadr3: {
    from: {
      relativePath: "../../../specification/3.1.0/openadr3.yaml",
      source: "file",
    },
    outputDir: "openapi-codegen-2025-02-12",
    to: async (context) => {
      const filenamePrefix = "oadr3";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateFetchers(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
```

The filesystem content looks like:

```shell
$ ls openapi-codegen-2025-02-12/
oadr3Components.ts  oadr3Fetcher.ts  oadr3Responses.ts
oadr3Schemas.ts
```

The file `oadr3Schemas.ts` are very nicely presented data types.  The type declarations have a full list of JSDOC annotations.  An example is:

```js
/**
 * A resource is an energy device or system subject to control by a VEN.
 */
export type ResourceRequest = {
  /**
   * User generated identifier, resource may be configured with identifier out-of-band.
   * resourceName is expected to be unique within the scope of the associated VEN.
   *
   * @minLength 1
   * @maxLength 128
   * @example RESOURCE-999
   */
  resourceName: string;
  venID?: ObjectID;
  /**
   * A list of valuesMap objects describing attributes.
   *
   * @default null
   */
  attributes?: ValuesMap[] | null;
  /**
   * A list of valuesMap objects describing target criteria.
   *
   * @default null
   */
  targets?: ValuesMap[] | null;
};
```

In `oadr3Components.ts` we have declarations for the API functions.  This is essence a REST API Client library.

API parameters are nicely declared, like so:

```js
export type SearchAllProgramsQueryParams = {
  /**
   * Indicates targeting type, e.g. GROUP
   */
  targetType?: string;
  /**
   * List of target values, e.g. group names
   */
  targetValues?: string[];
  /**
   * number of records to skip for pagination.
   *
   * @format int32
   * @minimum 0
   */
  skip?: number;
  /**
   * maximum number of records to return.
   *
   * @format int32
   * @maximum 50
   * @minimum 0
   */
  limit?: number;
};
```

The API function itself looks like this:

```js
/**
 * List all programs known to the server.
 * May filter results by targetType and targetValues as query params.
 * Use skip and pagination query params to limit response size.
 */
export const searchAllPrograms = (
  variables: SearchAllProgramsVariables,
  signal?: AbortSignal,
) =>
  oadr3Fetch<
    SearchAllProgramsResponse,
    SearchAllProgramsError,
    undefined,
    {},
    SearchAllProgramsQueryParams,
    {}
  >({ url: "/programs", method: "get", ...variables, signal });
```

In other words, a function named `oadr3Fetch` was defined somewhere.  It is a generic function that is configured with these settings.

That function is in `oadr3Fetcher.ts`.  It is not directly usable on Node.js and seems meant for browser usage.  For example when the function invokes the server function it uses `window.fetch` like so:

```js
const response = await window.fetch(
    `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
    {
    signal,
    method: method.toUpperCase(),
    body: body
        ? body instanceof FormData
        ? body
        : JSON.stringify(body)
        : undefined,
    headers: requestHeaders,
    },
);
```

There is no global variable `window` on Node.js.

For use on Node.js this function must be rewritten.  In fact, that's what is recommended in its [Git repository](https://github.com/fabien0102/openapi-codegen#readme):

> Configure the Fetcher (optional)

> After the first step you should see a file called {namespace}Fetcher.ts in your ouput directory. This file

> By default it uses the built-in Fetch API, you are free to change this to your fetching library of choice (Axios, Got etc.)

> If your Open API spec contains a configured server, then the base URL for all requests will default to that server's URL. If no such configuration exists, you'll need to specify the base URL value.





