import { z } from "zod";
declare const _default: z.ZodObject<{
    WEBHOOK: z.ZodBoolean;
    MQTT: z.ZodOptional<z.ZodObject<{
        URIS: z.ZodArray<z.ZodString, "many">;
        serialization: z.ZodLiteral<"JSON">;
        authentication: z.ZodEffects<z.ZodAny, any, any>;
    }, "strip", z.ZodTypeAny, {
        URIS: string[];
        serialization: "JSON";
        authentication?: any;
    }, {
        URIS: string[];
        serialization: "JSON";
        authentication?: any;
    }>>;
}, "strip", z.ZodTypeAny, {
    WEBHOOK: boolean;
    MQTT?: {
        URIS: string[];
        serialization: "JSON";
        authentication?: any;
    } | undefined;
}, {
    WEBHOOK: boolean;
    MQTT?: {
        URIS: string[];
        serialization: "JSON";
        authentication?: any;
    } | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-notifiersResponse.d.ts.map