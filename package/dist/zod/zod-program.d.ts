import { z } from "zod";
declare const _default: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    createdDateTime: z.ZodDefault<z.ZodString>;
    modificationDateTime: z.ZodDefault<z.ZodString>;
    objectType: z.ZodOptional<z.ZodLiteral<"PROGRAM">>;
    programName: z.ZodString;
    programLongName: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    retailerName: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    retailerLongName: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    programType: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    country: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    principalSubdivision: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    timeZoneOffset: z.ZodDefault<z.ZodString>;
    intervalPeriod: z.ZodOptional<z.ZodObject<{
        start: z.ZodDefault<z.ZodString>;
        duration: z.ZodDefault<z.ZodString>;
        randomizeStart: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        start?: string;
        duration?: string;
        randomizeStart?: string;
    }, {
        start?: string;
        duration?: string;
        randomizeStart?: string;
    }>>;
    programDescriptions: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodArray<z.ZodAny, "many">>>>;
    bindingEvents: z.ZodDefault<z.ZodBoolean>;
    localPrice: z.ZodDefault<z.ZodBoolean>;
    payloadDescriptors: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        objectType: z.ZodDefault<z.ZodString>;
        payloadType: z.ZodString;
        units: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
        currency: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        objectType?: string;
        payloadType?: string;
        units?: string;
        currency?: string;
    }, {
        objectType?: string;
        payloadType?: string;
        units?: string;
        currency?: string;
    }>, z.ZodObject<{
        objectType: z.ZodDefault<z.ZodString>;
        payloadType: z.ZodString;
        readingType: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
        units: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
        accuracy: z.ZodDefault<z.ZodNullable<z.ZodDefault<z.ZodNumber>>>;
        confidence: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        objectType?: string;
        payloadType?: string;
        readingType?: string;
        units?: string;
        accuracy?: number;
        confidence?: number;
    }, {
        objectType?: string;
        payloadType?: string;
        readingType?: string;
        units?: string;
        accuracy?: number;
        confidence?: number;
    }>]>, "many">>>>;
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
    objectType?: "PROGRAM";
    programName?: string;
    programLongName?: string;
    retailerName?: string;
    retailerLongName?: string;
    programType?: string;
    country?: string;
    principalSubdivision?: string;
    timeZoneOffset?: string;
    intervalPeriod?: {
        start?: string;
        duration?: string;
        randomizeStart?: string;
    };
    programDescriptions?: any[];
    bindingEvents?: boolean;
    localPrice?: boolean;
    payloadDescriptors?: ({
        objectType?: string;
        payloadType?: string;
        units?: string;
        currency?: string;
    } | {
        objectType?: string;
        payloadType?: string;
        readingType?: string;
        units?: string;
        accuracy?: number;
        confidence?: number;
    })[];
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
    objectType?: "PROGRAM";
    programName?: string;
    programLongName?: string;
    retailerName?: string;
    retailerLongName?: string;
    programType?: string;
    country?: string;
    principalSubdivision?: string;
    timeZoneOffset?: string;
    intervalPeriod?: {
        start?: string;
        duration?: string;
        randomizeStart?: string;
    };
    programDescriptions?: any[];
    bindingEvents?: boolean;
    localPrice?: boolean;
    payloadDescriptors?: ({
        objectType?: string;
        payloadType?: string;
        units?: string;
        currency?: string;
    } | {
        objectType?: string;
        payloadType?: string;
        readingType?: string;
        units?: string;
        accuracy?: number;
        confidence?: number;
    })[];
    targets?: {
        type?: string;
        values?: (string | number | boolean | {
            x?: number;
            y?: number;
        })[];
    }[];
}>;
export default _default;
//# sourceMappingURL=zod-program.d.ts.map