import { z } from "zod";
declare const _default: z.ZodObject<{
    objectType: z.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>;
    operation: z.ZodEnum<["CREATE", "READ", "UPDATE", "DELETE"]>;
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
    objectType: "PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    targets: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null;
    operation: "READ" | "CREATE" | "UPDATE" | "DELETE";
    object?: any;
}, {
    objectType: "PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
    operation: "READ" | "CREATE" | "UPDATE" | "DELETE";
    object?: any;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-notification.d.ts.map