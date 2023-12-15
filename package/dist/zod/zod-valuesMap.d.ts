import { z } from "zod";
declare const _default: z.ZodObject<{
    type: z.ZodString;
    values: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodNumber, z.ZodString, z.ZodBoolean, z.ZodObject<{
        x: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        y: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        x: number | null;
        y: number | null;
    }, {
        x?: number | null | undefined;
        y?: number | null | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    values: (string | number | boolean | {
        x: number | null;
        y: number | null;
    })[];
    type: string;
}, {
    values: (string | number | boolean | {
        x?: number | null | undefined;
        y?: number | null | undefined;
    })[];
    type: string;
}>;
export default _default;
//# sourceMappingURL=zod-valuesMap.d.ts.map