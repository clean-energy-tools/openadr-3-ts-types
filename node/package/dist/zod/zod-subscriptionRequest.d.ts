import { z } from "zod";
declare const _default: z.ZodObject<{
    clientName: z.ZodString;
    programID: z.ZodOptional<z.ZodString>;
    objectOperations: z.ZodArray<z.ZodObject<{
        objects: z.ZodArray<z.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>, "many">;
        operations: z.ZodArray<z.ZodEnum<["READ", "CREATE", "UPDATE", "DELETE"]>, "many">;
        callbackUrl: z.ZodString;
        bearerToken: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        objects: ("PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("READ" | "CREATE" | "UPDATE" | "DELETE")[];
        callbackUrl: string;
        bearerToken: string | null;
    }, {
        objects: ("PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("READ" | "CREATE" | "UPDATE" | "DELETE")[];
        callbackUrl: string;
        bearerToken?: string | null | undefined;
    }>, "many">;
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
    clientName: string;
    objectOperations: {
        objects: ("PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("READ" | "CREATE" | "UPDATE" | "DELETE")[];
        callbackUrl: string;
        bearerToken: string | null;
    }[];
    programID?: string | undefined;
}, {
    clientName: string;
    objectOperations: {
        objects: ("PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE")[];
        operations: ("READ" | "CREATE" | "UPDATE" | "DELETE")[];
        callbackUrl: string;
        bearerToken?: string | null | undefined;
    }[];
    programID?: string | undefined;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-subscriptionRequest.d.ts.map