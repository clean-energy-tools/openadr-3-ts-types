import { z } from "zod";
declare const _default: z.ZodObject<{
    payloadType: z.ZodString;
    readingType: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    units: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    targets: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>>;
    aggregate: z.ZodDefault<z.ZodBoolean>;
    startInterval: z.ZodDefault<z.ZodNumber>;
    numIntervals: z.ZodDefault<z.ZodNumber>;
    historical: z.ZodDefault<z.ZodBoolean>;
    frequency: z.ZodDefault<z.ZodNumber>;
    repeat: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    payloadType?: string;
    readingType?: string;
    units?: string;
    targets?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
    aggregate?: boolean;
    startInterval?: number;
    numIntervals?: number;
    historical?: boolean;
    frequency?: number;
    repeat?: number;
}, {
    payloadType?: string;
    readingType?: string;
    units?: string;
    targets?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
    aggregate?: boolean;
    startInterval?: number;
    numIntervals?: number;
    historical?: boolean;
    frequency?: number;
    repeat?: number;
}>;
export default _default;
//# sourceMappingURL=zod-reportDescriptor.d.ts.map