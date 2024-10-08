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
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }, {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    payloads: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[];
    intervalPeriod?: {
        start: string;
        duration: string;
        randomizeStart: string;
    } | undefined;
}, {
    id: number;
    payloads: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[];
    intervalPeriod?: {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-interval.d.ts.map