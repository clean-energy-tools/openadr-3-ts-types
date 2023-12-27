# openadr-3-ts-types

This package contains OpenADR v3 validation schema's (Zod) and type declarations, implemented in TypeScript, for use on Node.js.  These facilitate implementation of OpenADR applications with pretested data types and data validation, derived from the OpenAPI spec for OpenADR v3.  The types include all metadata (as JSDoc tags) defined in the specification, the data validation ensures all values fit the constraints defined in the specification, and all default values are filled in as necessary.

NOTE: OpenADR is a trademark of the [OpenADR Alliance](https://www.openadr.org/).  The software in this project has not been presented for certification.  While the code is automatically generated from the OpenADR 3 specification, and one should be able to build OpenADR 3 compliant software using this package, no claim of compliance is made.

The use of the name OpenADR is in reference to the OpenADR trademark.

# Installation

```shell
npm install \
        openadr-3-ts-types \
        zod joi \
        --save
```

This package does not directly depend on Zod or Joi, your application must do so.  It should be sufficient to install Zod or Joi, and to not install both.

# Overview

The package exports two types of objects: type declarations, and Zod schema objects.

_Naming Scheme_ -- The OpenADR schema items are defined with names, such as `event`, `interval`, or `program`, all of which start with a lower case letter.  The names for type declarations starts with an upper-case character, using the CamelCase pattern, with names like `Event`, `IntervalPeriod`, and `EventPayloadDescriptor`.  The names for Zod schema objects are the type name, prefixed with `parse`, such as `parseEvent`, `parseIntervalPeriod`, and `parseEventPayloadDescriptor`.

The type declaration is a normal TypeScript type declaration, and include JSDoc annotations for extra metadata.

The Zod schema objects are as described in the Zod documentation.  They are ready to be used with the [Zod schema methods](https://zod.dev/?id=schema-methods).

# USAGE

The OpenADR types in this package could be used as so:

```js
import { Event, parseEvent } from 'openadr-3-ts-types';

const event: Event = {
    // OpenADR 3 Event object
    programID: 'program-harlem-ev-management',
    retailerName: 'ConEd',
    programType: 'PRICING_TARIFF',
    country: 'US',
    principalSubdivision: 'NY',
    timeZoneOffset: '-PT5H'
};
```

The fields shown here correspond to the Event type, and this is correct.  However, a best practice is to verify data validity before using it or committing it to persistent storage.

This is therefore the recommended best practice

```js
import { Event, parseEvent } from 'openadr-3-ts-types';

const event: Event = parseEvent.parse({
    // OpenADR 3 Event object
    programID: 'program-harlem-ev-management',
    retailerName: 'ConEd',
    programType: 'PRICING_TARIFF',
    country: 'US',
    principalSubdivision: 'NY',
    timeZoneOffset: '-PT5H'
});
```

The rule to follow is:  _To store data in a variable typed with an OpenADR type, always verify data validity using the corresponding `parseDataType` object_.

The type `Event` declares the type for `event`.  This contains all the attributes of the OpenADR Event object.  Every attribute contains the documentation from the OpenADR specification, along with JSDoc annotations showing the allowed values and data types.

The object, `parseEvent`, is the Zod schema for Event.  it is used to validate an object, using one of the functions listed below, returning the object.  This function has the return type Event.  The other Zod functions are available for use, in addition to the `parse` function used here.

Zod validates data using a _parse_ function.  There are four such functions:

* `parseDataType.parse(obj: unknown): DataType` -- Parses & validates `obj`.  Throws an error if there's a problem.
* `parseDataType.parseAsync(obj: unknown): Promise<DataType>` -- Parses & validates `obj` asynchronously, returning the result or error via a Promise.
* `parseDataType.safeParse(obj: unknown): { success: true; data: DataType; } | { success: false; error: ZodError; }` -- Instead of throwing an error, this function returns an object indicating success or failure.  If `success` is `true`, the object is valid, and `data` contains the parsed data.  Otherwise, `success` is `false`, and `error` contains a `ZodError` object.
* `parseDataType.safeParseAsync(obj: unknown): Promise<{ success: true; data: DataType; } | { success: false; error: ZodError; }>` -- Same, but asynchronously.

Additional functions are available and described in the Zod documentation.

One that's useful is `.passthrough()`.  The default action of the `parse` functions is to strip out any additional data fields.  In some cases it is desirable to keep any extra data fields.  The OpenADR spec explicitly encourages that OpenADR implementations add additional fields if required for a given project, for example.  In Zod, the `.passthrough()` function maintains any extra data.

That function is used this way:

```js
const event: Event
            = parseEvent.passthrough().parse({
    // EXTENDED OpenADR 3 Event object
});
```

Other Zod functions like `.strict()` are available in the same way.

There is a problem that the `passthrough` and `strict` functions only affect the top-level of the Zod schema.  They are not passed down to any nested schema objects.

# Using this in an OpenADR 3 VTN

The OpenADR _Virtual Top Node_ is what the REST world would call a _resource/information server_.  In practice that means it implements the HTTP listener endpoints in the OpenADR 3 specification.

Each such endpoint receives data that must be validated, and produces results which must be validated.

For example, the POST handler on `/events` requests creation of a new Event in the VTN.  The response just also be validated.  The handler function might look like:

```js
export async function createEvent(req, res) {
    let event: Event;
    try {
        event
            = parseEvent.passthrough().parse(req.body);
    } catch (err) {
        // determine correct status code
        // determine error message
        res.status(statusCode).json({
            title: 'Error message',
            status: statusCode
        } as Problem)
    }
    // ... business logic
    // Validate the response object
    try {
        const response: Event
            = parseEvent.passthrough().parse(...);
        res.status(201).json(response);
    } catch (err) {
        // determine correct status code
        // determine error message
        res.status(statusCode).json({
            title: 'Error message',
            status: statusCode
        } as Problem)
    }
}
```

The incoming data is parsed and validated.  If that fails, the error is caught, and an error status is returned to the caller.  For the Event that will be returned, it is also validated and returned if correct, and an error status is returned if it does not validate.

# Using this in an OpenADR VEN

The OpenADR _Virtual End Node_ is a client to the VTN.  Its focus is on making requests of the VTN, and receiving notifications from the VTN.  Therefore, the goal is make an HTTP request to the VTN using validated data.

For example, using the `got` package to create a new Event, with a POST to `/events`, looks like:

```js
const VTNURL = new URL('https://...');
VTNURL.pathname = path.join(
    'path', 'to', 'openadr', 'events');

let res;
try {
    res = await got.post(VTNURL.href, {
        json: parseEvent.passthrough().parse({
            // event object
        })
    });
} catch (err) {
    // handle errors
}
// res has the response
```

# Experimental support for Joi validation

[Joi](https://joi.dev) is another popular package for data validation in JavaScript and TypeScript.

This package exports a collection of Joi schema's alongside the Zod schema's.  The naming pattern for Joi schema's is `joiTypeName`, such as `joiEvent`, `joiVen`, or `joiIntervalPeriod`.

The usage pattern is:

```js
const { error, value } = joiEvent.validate({
    // Event object
});
if (error) {
    // error handling
}
```

The Joi `validate` function does not throw exceptions.  Instead, it returns an object with `error` and `value` fields.  If `error` is `undefined`, no error was detected, and `value` contains the validated object.

The `error` object is a Joi _ValidationError_ object and contains a lot of useful information.

As of this writing, the Joi schema's have been tested. but issues have been found.  They are automatically generated from the OpenADR specification and one expected better results.

Known issues are:

1. The `stripUnknown` option is not stripping unknown fields.
2. The `allowUnknoown` option is not erroring when there are unknown fields.

# Implementing private OpenADR extensions

As said earlier, the OpenADR v3 specification encourages adding fields or values if required by a given OpenADR implementation.  While the specification covers lots of demand/response use case requirements, there can easily be needs not covered by the spec.

The first step is to make a private copy of the OpenADR v3 specification.  You must retrieve a copy of the specification through the OpenADR website.  The specification itself is covered by the Apache 2 open source license, allowing anyone to modify the specification.

Then, modify the spec as you see fit.  Because it is covered by an open source license, you are free to distribute the modified specification.  Use of the trademark is subject to the OpenADR Alliance licensing terms, however.

Next, download the source for [the `openadr-3-ts-types` project](https://github.com/robogeek/openadr-3-ts-types).

```shell
$ git clone https://github.com/robogeek/openadr-3-ts-types.git
```

In the `builder` directory you'll find the scripts for building the package source code.  Study the `scripts` section, and read the README in that directory to learn the build procedure.

It is important that your package have a different name than `openadr-3-ts-types`.  To avoid confusion, you must change the package name by changing the `name` field in `package.json`.  A likely package name is `YOUR-PROJECT-ts-types`.

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

Joi: https://joi.dev/

OpenADR 3 Specification: https://www.openadr.org/specification


