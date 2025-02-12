
## Generating types using `openapi-typescript`

The [`openapi-typescript`](https://www.npmjs.com/package/openapi-typescript) is an interesting tool for generating declarations for not only the schemas, but for REST API parameters.

See [`build-openapi-typescript.js`](./build-openapi-typescript.js)

Usage:

```
npx openapi-typescript oadr3.0.1.yaml -o ./src/types/oadr3.ts
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
