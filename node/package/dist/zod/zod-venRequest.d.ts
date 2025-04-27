import { z } from "zod";
declare const _default: z.ZodObject<{
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
    resources: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodObject<{
        id: z.ZodString;
        createdDateTime: z.ZodString;
        modificationDateTime: z.ZodString;
        objectType: z.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdDateTime: string;
        modificationDateTime: string;
        objectType: "PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    }, {
        id: string;
        createdDateTime: string;
        modificationDateTime: string;
        objectType: "PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    }>, z.ZodObject<{
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
    }>>>, "many">>>;
}, "strip", z.ZodTypeAny, {
    targets: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null;
    resources: (Record<string, any> & {
        id: string;
        createdDateTime: string;
        modificationDateTime: string;
        objectType: "PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    } & {
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
    })[] | null;
    venName: string;
    attributes: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null;
}, {
    venName: string;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null | undefined;
    resources?: (Record<string, any> & {
        id: string;
        createdDateTime: string;
        modificationDateTime: string;
        objectType: "PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    } & {
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
    })[] | null | undefined;
    attributes?: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-venRequest.d.ts.map