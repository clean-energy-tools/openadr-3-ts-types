import { z } from "zod";
declare const _default: z.ZodObject<{
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
}>;
export default _default;
//# sourceMappingURL=zod-reportPayloadDescriptor.d.ts.map