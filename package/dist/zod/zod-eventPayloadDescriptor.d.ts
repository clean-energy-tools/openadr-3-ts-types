import { z } from "zod";
declare const _default: z.ZodObject<{
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
}>;
export default _default;
//# sourceMappingURL=zod-eventPayloadDescriptor.d.ts.map