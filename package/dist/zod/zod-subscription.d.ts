import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodDefault<z.ZodString>;
    modificationDateTime: z.ZodDefault<z.ZodString>;
    objectType: z.ZodOptional<z.ZodLiteral<"SUBSCRIPTION">>;
    clientName: z.ZodString;
    programID: z.ZodString;
    objectOperations: z.ZodArray<z.ZodObject<{
        objects: z.ZodArray<z.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>, "many">;
        operations: z.ZodArray<z.ZodEnum<["GET", "POST", "PUT", "DELETE"]>, "many">;
        callbackUrl: z.ZodString;
        bearerToken: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        objects?: ("EVENT" | "PROGRAM" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations?: ("GET" | "DELETE" | "POST" | "PUT")[];
        callbackUrl?: string;
        bearerToken?: string;
    }, {
        objects?: ("EVENT" | "PROGRAM" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations?: ("GET" | "DELETE" | "POST" | "PUT")[];
        callbackUrl?: string;
        bearerToken?: string;
    }>, "many">;
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
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdDateTime?: string;
    modificationDateTime?: string;
    objectType?: "SUBSCRIPTION";
    clientName?: string;
    programID?: string;
    objectOperations?: {
        objects?: ("EVENT" | "PROGRAM" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations?: ("GET" | "DELETE" | "POST" | "PUT")[];
        callbackUrl?: string;
        bearerToken?: string;
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
    objectType?: "SUBSCRIPTION";
    clientName?: string;
    programID?: string;
    objectOperations?: {
        objects?: ("EVENT" | "PROGRAM" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations?: ("GET" | "DELETE" | "POST" | "PUT")[];
        callbackUrl?: string;
        bearerToken?: string;
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
//# sourceMappingURL=zod-subscription.d.ts.map