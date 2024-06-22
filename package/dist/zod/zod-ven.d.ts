import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodString>;
    modificationDateTime: z.ZodOptional<z.ZodString>;
    objectType: z.ZodOptional<z.ZodLiteral<"VEN">>;
    venName: z.ZodString;
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
    resources: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        createdDateTime: z.ZodOptional<z.ZodString>;
        modificationDateTime: z.ZodOptional<z.ZodString>;
        objectType: z.ZodOptional<z.ZodLiteral<"RESOURCE">>;
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
    }, "strip", z.ZodTypeAny, {
        targets: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null;
        resourceName: string;
        attributes: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
    }, {
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null | undefined;
        targets?: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    targets: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null;
    resources: {
        targets: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null;
        resourceName: string;
        attributes: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
    }[] | null;
    venName: string;
    attributes: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "VEN" | undefined;
}, {
    venName: string;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "VEN" | undefined;
    attributes?: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null | undefined;
    targets?: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null | undefined;
    resources?: {
        resourceName: string;
        id?: string | undefined;
        createdDateTime?: string | undefined;
        modificationDateTime?: string | undefined;
        objectType?: "RESOURCE" | undefined;
        venID?: string | undefined;
        attributes?: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null | undefined;
        targets?: {
            values: (string | number | boolean | {
                x: number;
                y: number;
            })[];
            type: string;
        }[] | null | undefined;
    }[] | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-ven.d.ts.map