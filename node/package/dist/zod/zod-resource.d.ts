import { z } from "zod";
declare const _default: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodObject<{
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
    venID?: string | undefined;
}, {
    resourceName: string;
    targets?: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null | undefined;
    venID?: string | undefined;
    attributes?: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null | undefined;
}>>>;
export default _default;
//# sourceMappingURL=zod-resource.d.ts.map