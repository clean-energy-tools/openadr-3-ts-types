import { z } from "zod";
declare const _default: z.ZodObject<{
    objectType: z.ZodOptional<z.ZodLiteral<"EVENT_PAYLOAD_DESCRIPTOR">>;
    payloadType: z.ZodString;
    units: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    currency: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    currency: string | null;
    payloadType: string;
    units: string | null;
    objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
}, {
    payloadType: string;
    objectType?: "EVENT_PAYLOAD_DESCRIPTOR" | undefined;
    units?: string | null | undefined;
    currency?: string | null | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-eventPayloadDescriptor.d.ts.map