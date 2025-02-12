

## Using `openapi-to-zod` to generate Zod validation from OpenAPI

The `openapi-to-zod` package looked like a single-stop-shopping experience.  In one step, it generates Zod validation objects, and supports generating TypeScript types from the validators.  But ...

See: [`build-openapi-to-zod`](./build-openapi-to-zod.js)

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

