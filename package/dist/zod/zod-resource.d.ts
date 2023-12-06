import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodString>;
    modificationDateTime: z.ZodOptional<z.ZodString>;
    objectType: z.ZodOptional<z.ZodLiteral<"RESOURCE">>;
    resourceName: z.ZodString;
    venID: z.ZodOptional<z.ZodString>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    targets: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdDateTime?: string;
    modificationDateTime?: string;
    objectType?: "RESOURCE";
    resourceName?: string;
    venID?: string;
    attributes?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
    targets?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
}, {
    id?: string;
    createdDateTime?: string;
    modificationDateTime?: string;
    objectType?: "RESOURCE";
    resourceName?: string;
    venID?: string;
    attributes?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
    targets?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
}>;
export default _default;
//# sourceMappingURL=zod-resource.d.ts.map