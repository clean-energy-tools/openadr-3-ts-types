import { z } from "zod";
declare const _default: z.ZodObject<{
    objectType: z.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>;
    operation: z.ZodEnum<["GET", "POST", "PUT", "DELETE"]>;
    targets: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
        type: string;
    }, {
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
        type: string;
    }>, "many">>>;
    object: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodEffects<z.ZodAny, any, any>>;
}, "strip", z.ZodTypeAny, {
    objectType: "PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    targets: {
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
        type: string;
    }[] | null;
    operation: "GET" | "POST" | "PUT" | "DELETE";
    object?: any;
}, {
    objectType: "PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    operation: "GET" | "POST" | "PUT" | "DELETE";
    targets?: {
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
        type: string;
    }[] | null | undefined;
    object?: any;
}>;
export default _default;
//# sourceMappingURL=zod-notification.d.ts.map