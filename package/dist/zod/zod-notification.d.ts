import { z } from "zod";
declare const _default: z.ZodObject<{
    objectType: z.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>;
    operation: z.ZodEnum<["GET", "POST", "PUT", "DELETE"]>;
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
    object: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodEffects<z.ZodAny, any, any>>;
}, "strip", z.ZodTypeAny, {
    objectType?: "EVENT" | "PROGRAM" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    operation?: "GET" | "POST" | "PUT" | "DELETE";
    targets?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
    object?: any;
}, {
    objectType?: "EVENT" | "PROGRAM" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    operation?: "GET" | "POST" | "PUT" | "DELETE";
    targets?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
    object?: any;
}>;
export default _default;
//# sourceMappingURL=zod-notification.d.ts.map