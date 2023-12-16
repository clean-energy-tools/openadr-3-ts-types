import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodNumber;
    intervalPeriod: z.ZodOptional<z.ZodObject<{
        start: z.ZodString;
        duration: z.ZodDefault<z.ZodString>;
        randomizeStart: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        start: string;
        duration: string;
        randomizeStart: string;
    }, {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    }>>;
    payloads: z.ZodArray<z.ZodObject<{
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
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    payloads: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[];
    intervalPeriod?: {
        start: string;
        duration: string;
        randomizeStart: string;
    } | undefined;
}, {
    id: number;
    payloads: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[];
    intervalPeriod?: {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-interval.d.ts.map