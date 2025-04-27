import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodNumber;
    intervalPeriod: z.ZodOptional<z.ZodObject<{
        start: z.ZodOptional<z.ZodString>;
        duration: z.ZodDefault<z.ZodString>;
        randomizeStart: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        duration: string;
        randomizeStart: string;
        start?: string | undefined;
    }, {
        duration?: string | undefined;
        start?: string | undefined;
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
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }, {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    payloads: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[];
    intervalPeriod?: {
        duration: string;
        randomizeStart: string;
        start?: string | undefined;
    } | undefined;
}, {
    id: number;
    payloads: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[];
    intervalPeriod?: {
        duration?: string | undefined;
        start?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-interval.d.ts.map