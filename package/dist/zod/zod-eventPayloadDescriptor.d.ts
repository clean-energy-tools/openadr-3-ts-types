import { z } from "zod";
declare const _default: z.ZodObject<{
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
}>;
export default _default;
//# sourceMappingURL=zod-eventPayloadDescriptor.d.ts.map