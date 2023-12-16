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
    }>, "many">>;
    targets: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    resourceName: string;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "RESOURCE" | undefined;
    venID?: string | undefined;
    attributes?: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[] | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
    }[] | undefined;
}, {
    resourceName: string;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "RESOURCE" | undefined;
    venID?: string | undefined;
    attributes?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
    }[] | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-resource.d.ts.map