import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodOptional<z.ZodString>;
    modificationDateTime: z.ZodOptional<z.ZodString>;
    objectType: z.ZodOptional<z.ZodLiteral<"PROGRAM">>;
    programName: z.ZodString;
    programLongName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    retailerName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    retailerLongName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    programType: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    country: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    principalSubdivision: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    timeZoneOffset: z.ZodDefault<z.ZodString>;
    intervalPeriod: z.ZodOptional<z.ZodObject<{
        start: z.ZodString;
        duration: z.ZodDefault<z.ZodString>;
        randomizeStart: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        start: string;
        duration: string;
        randomizeStart: string;
    }, {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    }>>;
    programDescriptions: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodAny, "many">>>;
    bindingEvents: z.ZodDefault<z.ZodBoolean>;
    localPrice: z.ZodDefault<z.ZodBoolean>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        objectType: z.ZodDefault<z.ZodString>;
        payloadType: z.ZodString;
        units: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        currency: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        objectType: string;
        payloadType: string;
        units: string | null;
        currency: string | null;
    }, {
        payloadType: string;
        objectType?: string | undefined;
        units?: string | null | undefined;
        currency?: string | null | undefined;
    }>, z.ZodObject<{
        objectType: z.ZodDefault<z.ZodString>;
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        accuracy: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        confidence: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        objectType: string;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number;
    }, {
        payloadType: string;
        objectType?: string | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | undefined;
    }>]>, "many">>>;
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
    targets: {
        values: (string | number | boolean | {
            x: number | null;
            y: number | null;
        })[];
        type: string;
    }[] | null;
    payloadDescriptors: ({
        objectType: string;
        payloadType: string;
        units: string | null;
        currency: string | null;
    } | {
        objectType: string;
        payloadType: string;
        readingType: string | null;
        units: string | null;
        accuracy: number | null;
        confidence: number;
    })[] | null;
    programName: string;
    programLongName: string | null;
    retailerName: string | null;
    retailerLongName: string | null;
    programType: string | null;
    country: string | null;
    principalSubdivision: string | null;
    timeZoneOffset: string;
    programDescriptions: any[] | null;
    bindingEvents: boolean;
    localPrice: boolean;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "PROGRAM" | undefined;
    intervalPeriod?: {
        start: string;
        duration: string;
        randomizeStart: string;
    } | undefined;
}, {
    programName: string;
    id?: string | undefined;
    createdDateTime?: string | undefined;
    modificationDateTime?: string | undefined;
    objectType?: "PROGRAM" | undefined;
    programLongName?: string | null | undefined;
    retailerName?: string | null | undefined;
    retailerLongName?: string | null | undefined;
    programType?: string | null | undefined;
    country?: string | null | undefined;
    principalSubdivision?: string | null | undefined;
    timeZoneOffset?: string | undefined;
    intervalPeriod?: {
        start: string;
        duration?: string | undefined;
        randomizeStart?: string | undefined;
    } | undefined;
    programDescriptions?: any[] | null | undefined;
    bindingEvents?: boolean | undefined;
    localPrice?: boolean | undefined;
    payloadDescriptors?: ({
        payloadType: string;
        objectType?: string | undefined;
        units?: string | null | undefined;
        currency?: string | null | undefined;
    } | {
        payloadType: string;
        objectType?: string | undefined;
        readingType?: string | null | undefined;
        units?: string | null | undefined;
        accuracy?: number | null | undefined;
        confidence?: number | undefined;
    })[] | null | undefined;
    targets?: {
        values: (string | number | boolean | {
            x?: number | null | undefined;
            y?: number | null | undefined;
        })[];
        type: string;
    }[] | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-program.d.ts.map