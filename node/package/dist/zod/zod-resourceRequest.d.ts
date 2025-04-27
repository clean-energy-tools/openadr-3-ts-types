import { z } from "zod";
declare const _default: z.ZodObject<{
    resourceName: z.ZodString;
    venID: z.ZodOptional<z.ZodString>;
    attributes: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
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
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    targets: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null;
    resourceName: string;
    attributes: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null;
    venID?: string | undefined;
}, {
    resourceName: string;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null | undefined;
    attributes?: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null | undefined;
    venID?: string | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-resourceRequest.d.ts.map