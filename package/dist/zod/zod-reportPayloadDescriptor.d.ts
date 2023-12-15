import { z } from "zod";
declare const _default: z.ZodObject<{
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
}>;
export default _default;
//# sourceMappingURL=zod-reportPayloadDescriptor.d.ts.map