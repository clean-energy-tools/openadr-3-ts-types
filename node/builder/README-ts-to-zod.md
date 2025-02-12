

## Generating Zod code using `ts-to-zod`

The [`ts-to-zod`](https://www.npmjs.com/package/ts-to-zod) package generates very nice Zod code from TypeScript type declarations.  You simply give it a source file containing types, and it generates a file containing Zod validator/parser code.

Good quality TypeScript types can be generated using [`@openadr-codegen`](./README-codegen.md). In `build-ts-to-zod.js` that is what's done.

At some time this was true: "_Instead, a source file was semi-manually constructed from the output of `openapi-typescript`.  The type declarations it produced were excellent, but not correctly positioned for use with `ts-to-zod`._"

The actual result working from the Codegen-generated types looks very good.

See: [`build-ts-to-zod.js`](./build-ts-to-zod.js)

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
