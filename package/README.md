# openadr-3-ts-types
TypeScript validators (Zod) and types for use with OpenADR v3.

The code is derived from the OpenAPI spec for OpenADR v3 using the [`openapi-to-zod
`](https://www.npmjs.com/package/openapi-to-zod) package.

Each schema object defined by OpenAPI has a name starting with a lower-case letter, such as `event` 
.  In this package those names are changed to start with an upper-case letter, such as `Event`.

For each schema object, two things are available.  One is a Zod parser/validator whose purpose is validating whether a data object matches the object schema.  The second is a type useful in TypeScript.  Both of these have the same name.

# Installation

```
npm install openadr-3-ts-types --save  # npm
yarn add openadr-3-ts-types            # yarn
bun add openadr-3-ts-types             # bun
pnpm add openadr-3-ts-types            # pnpm
```

# USAGE

```js
import * as OADR3 from 'openadr-3-ts-types';

const event: OADR3.Event = OADR3.Event.parse({
    // OpenADR 3 Event object
});
```

The first use of `OADR3.Event` is to declare the type for `event`.  The second use is to inspect an object, using the `parse` function, and to return the object.

The second object is a Zod parser/validator.  The other Zod functions are available for use, in addition to the `parse` function used here.

For example, by default Zod strips out any additional data fields.  In some cases it is desirable to keep those fields.  The OpenADR spec explicitly encourages that OpenADR implementations add additional fields if required for a given project.

```js
const event: OADR3.Event = OADR3.Event
        .passthrough().parse({
    // EXTENDED OpenADR 3 Event object
});
```

The Zod `passthrough` function allows additional fields to end up in the validated object.

## Using this in an OpenADR 3 VTN

The OpenADR _Virtual Top Node_ is what the REST world would call a _resource/information server_.  In practice that means it implements an HTTP listener, where the OpenADR endpoints invoke handler functions.

This means an HTTP request body will contain JSON requiring validation.  For example, the POST handler on `/events` requests creation of a new Event in the VTN.  The handler function might look like:

```js
export async function createEvent(req, res) {
    let event: OADR3.Event;
    try {
        event = OADR3.Event
            .passthrough().parse(req.body);
    } catch (err) {
        // determine correct status code
        // determine error message
        res.status(statusCode).json({
            title: 'Error message',
            status: statusCode
        } as OADR3.Problem)
    }
    // ... business logic
    res.status(201).json(event);
}
```

The incoming data is parsed and validated.  If that fails, the error is caught, and an error status is returned to the caller.

## Using this in an OpenADR VEN

The OpenADR _Virtual End Node_ is a client to the VTN.  Its focus is on making requests of the VTN, and receiving notifications from the VTN.  Therefore, the goal is make an HTTP request to the VTN using prevalidated data.

For example, using the `got` package to create a new Event looks like:

```js
    const VTNURL = new URL('https://...');
    VTNURL.pathname = path.join(
        'path', 'to', 'openadr', 'events');

    const ret = await got.post(VTNURL.href, {
        json: OADR3.Event.passthrough().parse({
            // event object
        })
    });
```

# Implementing private OpenADR extensions

As said earlier, the OpenADR v3 specification encourages adding fields or values if required by a given OpenADR implementation.  While the specification covers lots of demand/response use case requirements, there can easily be needs not covered by the spec.

The first step is to make a private copy of the OpenADR v3 specification.  You must retrieve a copy of the specification through the OpenADR website.  The specification itself is covered by the Apache 2 open source license, allowing anyone to modify the specification.

Then, modify the spec as you see fit.  Because it is covered by an open source license, you are free to distribute the modified specification.  Use of the trademark is subject to the OpenADR Alliance licensing terms, however.

Next, download the source for the `openadr-3-ts-types` project.  In the `builder` directory you'll find the scripts for building the npm package.  Study the `build:zod` script, since this is how the `zod` portion of the `openadr-3-ts-types` project is built.

After rebuilding the `zod` code the `package` directory can be built using the `build` script in `package/package.json`.  Once built, the `package` directory is suitable for distribution as a Node.js package.

To avoid confusion, you must change the package name by changing the `name` field in `package.json`.  A likely package name is `YOUR-PROJECT-ts-types`.

# Requirements

TypeScript 4.5.x or later is required by Zod.

You must enable `strict` mode in the TypeScript compiler.  This `tsconfig.json` snippet will do the trick:

```json
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "strict": true
  }
}
```


# Resources

GitHub: https://github.com/robogeek/openadr-3-ts-types

Zod: https://zod.dev/

OpenADR 3 Specification: https://www.openadr.org/specification


