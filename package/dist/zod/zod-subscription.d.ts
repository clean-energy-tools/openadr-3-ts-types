import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodString>;
    modificationDateTime: z.ZodOptional<z.ZodString>;
    objectType: z.ZodOptional<z.ZodLiteral<"SUBSCRIPTION">>;
    clientName: z.ZodString;
    programID: z.ZodString;
    objectOperations: z.ZodArray<z.ZodObject<{
        objects: z.ZodArray<z.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>, "many">;
        operations: z.ZodArray<z.ZodEnum<["GET", "POST", "PUT", "DELETE"]>, "many">;
        callbackUrl: z.ZodString;
        bearerToken: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("GET" | "POST" | "PUT" | "DELETE")[];
        callbackUrl: string;
        bearerToken: string | null;
    }, {
        objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("GET" | "POST" | "PUT" | "DELETE")[];
        callbackUrl: string;
        bearerToken?: string | null | undefined;
    }>, "many">;
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
}, "strip", z.ZodTypeAny, {
    programID: string;
    targets: {
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
        type: string;
    }[] | null;
    clientName: string;
    objectOperations: {
        objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("GET" | "POST" | "PUT" | "DELETE")[];
        callbackUrl: string;
        bearerToken: string | null;
    }[];
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "SUBSCRIPTION" | undefined;
}, {
    programID: string;
    clientName: string;
    objectOperations: {
        objects: ("PROGRAM" | "REPORT" | "EVENT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("GET" | "POST" | "PUT" | "DELETE")[];
        callbackUrl: string;
        bearerToken?: string | null | undefined;
    }[];
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "SUBSCRIPTION" | undefined;
    targets?: {
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
        type: string;
    }[] | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-subscription.d.ts.map