import { z } from "zod";
declare const _default: z.ZodObject<{
    programName: z.ZodString;
    programLongName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    retailerName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    retailerLongName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    programType: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    country: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    principalSubdivision: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    intervalPeriod: z.ZodOptional<z.ZodObject<{
        start: z.ZodOptional<z.ZodString>;
        duration: z.ZodDefault<z.ZodString>;
        randomizeStart: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        duration: string;
        randomizeStart: string;
        start?: string | undefined;
    }, {
        duration?: string | undefined;
        start?: string | undefined;
        randomizeStart?: string | undefined;
    }>>;
    programDescriptions: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodAny, "many">>>;
    bindingEvents: z.ZodDefault<z.ZodNullable<z.ZodBoolean>>;
    localPrice: z.ZodDefault<z.ZodNullable<z.ZodBoolean>>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        objectType: z.ZodOptional<z.ZodLiteral<"EVENT_PAYLOAD_DESCRIPTOR">>;
        payloadType: z.ZodString;
        units: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        currency: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        payloadType: string;
        units: string | null;
        currency: string | null;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
    }, {
        payloadType: string;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
        units?: string | null | undefined;
        currency?: string | null | undefined;
    }>, z.ZodObject<{
        objectType: z.ZodOptional<z.ZodLiteral<"REPORT_PAYLOAD_DESCRIPTOR">>;
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        accuracy: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        confidence: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number | null;
        objectType?: "REPORT_PAYLOAD_DESCRIPTOR" | undefined;
    }, {
        payloadType: string;
        objectType?: "REPORT_PAYLOAD_DESCRIPTOR" | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | null | undefined;
    }>]>, "many">>>;
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
    payloadDescriptors: ({
        payloadType: string;
        units: string | null;
        currency: string | null;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
    } | {
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number | null;
        objectType?: "REPORT_PAYLOAD_DESCRIPTOR" | undefined;
    })[] | null;
    programName: string;
    programLongName: string | null;
    retailerName: string | null;
    retailerLongName: string | null;
    programType: string | null;
    country: string | null;
    principalSubdivision: string | null;
    programDescriptions: any[] | null;
    bindingEvents: boolean | null;
    localPrice: boolean | null;
    intervalPeriod?: {
        duration: string;
        randomizeStart: string;
        start?: string | undefined;
    } | undefined;
}, {
    programName: string;
    targets?: {
        type: string;
        values: (string | number | boolean | {
            x: number;
            y: number;
        })[];
    }[] | null | undefined;
    payloadDescriptors?: ({
        payloadType: string;
        objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
        units?: string | null | undefined;
        currency?: string | null | undefined;
    } | {
        payloadType: string;
        objectType?: "REPORT_PAYLOAD_DESCRIPTOR" | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | null | undefined;
    })[] | null | undefined;
    intervalPeriod?: {
        duration?: string | undefined;
        start?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
    programLongName?: string | null | undefined;
    retailerName?: string | null | undefined;
    retailerLongName?: string | null | undefined;
    programType?: string | null | undefined;
    country?: string | null | undefined;
    principalSubdivision?: string | null | undefined;
    programDescriptions?: any[] | null | undefined;
    bindingEvents?: boolean | null | undefined;
    localPrice?: boolean | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-programRequest.d.ts.map