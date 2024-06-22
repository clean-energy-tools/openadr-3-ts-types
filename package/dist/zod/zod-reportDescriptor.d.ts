import { z } from "zod";
declare const _default: z.ZodObject<{
    payloadType: z.ZodString;
    readingType: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    units: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    targets: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
    aggregate: z.ZodDefault<z.ZodBoolean>;
    startInterval: z.ZodDefault<z.ZodNumber>;
    numIntervals: z.ZodDefault<z.ZodNumber>;
    historical: z.ZodDefault<z.ZodBoolean>;
    frequency: z.ZodDefault<z.ZodNumber>;
    repeat: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    repeat: number;
    targets: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null;
    payloadType: string;
    readingType: string | null;
    units: string | null;
    aggregate: boolean;
    startInterval: number;
    numIntervals: number;
    historical: boolean;
    frequency: number;
}, {
    payloadType: string;
    readingType?: string | null | undefined;
    units?: string | null | undefined;
    targets?: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null | undefined;
    aggregate?: boolean | undefined;
    startInterval?: number | undefined;
    numIntervals?: number | undefined;
    historical?: boolean | undefined;
    frequency?: number | undefined;
    repeat?: number | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-reportDescriptor.d.ts.map