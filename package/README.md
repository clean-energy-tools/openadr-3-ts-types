# openadr-3-ts-types
TypeScript validators (Zod) and type declarations for use with OpenADR v3.  These are derived from the OpenAPI spec for OpenADR v3.  Together they provide data types and data validation for implementing OpenADR v3 applications on the Node.js platform, using TypeScript.

# Installation

```
npm install openadr-3-ts-types --save  # npm
yarn add openadr-3-ts-types            # yarn
bun add openadr-3-ts-types             # bun
pnpm add openadr-3-ts-types            # pnpm
```

# Overview

The package exports two types of objects: type declarations, and Zod schema objects.

The base name for each is the OpenADR schema item as defined in the OpenAPI specification.  Each of these names start with a lower-case letter, such as `event`.

For type names, the base name is changed to start with an upper-case letter, such as `Event`.  This is a normal TypeScript type declaration, and includes JSDoc annotations for extra metadata.

FOr Zod schema objects, the base name is changed to the format `parseTypeName`, such as `parseEvent`.  This is a normal Zod schema object.  The Zod model is to "parse" an unknown object, using the `parseTypeName.parse` function, validating that the fields conform to the specification, producing an object with a known data type.

# USAGE

```js
import { Event, parseEvent } from 'openadr-3-ts-types';

const event: Event = parseEvent.parse({
    // OpenADR 3 Event object
});
```

The type `Event` declares the type for `event`.  This contains all the attributes of the OpenADR Event object.  Every attribute contains the documentation from the OpenADR specification, along with JSDoc annotations showing the allowed values and data types.

The object, `parseEvent`, is the Zod schema for Event.  it is used to validate an object, using the `parse` function, returning the object.  This function has the return type Event.  The other Zod functions are available for use, in addition to the `parse` function used here.

For example, by default Zod's `parse` function strips out any additional data fields.  In some cases it is desirable to keep any extra data fields.  The OpenADR spec explicitly encourages that OpenADR implementations add additional fields if required for a given project, for example.  In Zod, the `.passthrough()` function maintains any extra data.

```js
const event: Event = parseEvent
        .passthrough().parse({
    // EXTENDED OpenADR 3 Event object
});
```

Other Zod functions like `.strict()` are available in the same way.

## Using this in an OpenADR 3 VTN

The OpenADR _Virtual Top Node_ is what the REST world would call a _resource/information server_.  In practice that means it implements an HTTP listener, where the OpenADR endpoints invoke OpenADR handler functions.

This means an HTTP request body will contain JSON requiring validation.  For example, the POST handler on `/events` requests creation of a new Event in the VTN.  The handler function might look like:

```js
export async function createEvent(req, res) {
    let event: Event;
    try {
        event = parseEvent
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

The OpenADR _Virtual End Node_ is a client to the VTN.  Its focus is on making requests of the VTN, and receiving notifications from the VTN.  Therefore, the goal is make an HTTP request to the VTN using validated data.

For example, using the `got` package to create a new Event looks like:

```js
const VTNURL = new URL('https://...');
VTNURL.pathname = path.join(
    'path', 'to', 'openadr', 'events');

const ret = await got.post(VTNURL.href, {
    json: parseEvent.passthrough().parse({
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

npm Registry: https://npmjs.com/package/openadr-3-ts-types

Zod: https://zod.dev/

OpenADR 3 Specification: https://www.openadr.org/specification


