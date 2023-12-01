import { z } from "zod";
declare const _default: z.ZodObject<{
    type: z.ZodString;
    values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
        x: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodNumber>>>;
        y: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodNumber>>>;
    }, "strip", z.ZodTypeAny, {
        x?: number;
        y?: number;
    }, {
        x?: number;
        y?: number;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    type?: string;
    values?: (string | number | boolean | {
        x?: number;
        y?: number;
    })[];
}, {
    type?: string;
    values?: (string | number | boolean | {
        x?: number;
        y?: number;
    })[];
}>;
export default _default;
//# sourceMappingURL=zod-valuesMap.d.ts.map