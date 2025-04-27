import { z } from "zod";
declare const _default: z.ZodObject<{
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
}>;
export default _default;
//# sourceMappingURL=zod-mqttNotifierBindingObject.d.ts.map