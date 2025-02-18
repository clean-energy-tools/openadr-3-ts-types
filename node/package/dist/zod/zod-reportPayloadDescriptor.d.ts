import { z } from "zod";
declare const _default: z.ZodObject<{
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
}>;
export default _default;
//# sourceMappingURL=zod-reportPayloadDescriptor.d.ts.map