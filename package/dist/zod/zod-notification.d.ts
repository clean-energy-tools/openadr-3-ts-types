import { z } from "zod";
declare const _default: z.ZodObject<{
    objectType: z.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>;
    operation: z.ZodEnum<["GET", "POST", "PUT", "DELETE"]>;
    object: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodEffects<z.ZodAny, any, any>>;
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
    objectType: "PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    targets: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null;
    operation: "GET" | "POST" | "PUT" | "DELETE";
    object?: any;
}, {
    objectType: "PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    operation: "GET" | "POST" | "PUT" | "DELETE";
    object?: any;
    targets?: {
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
        type: string;
    }[] | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-notification.d.ts.map