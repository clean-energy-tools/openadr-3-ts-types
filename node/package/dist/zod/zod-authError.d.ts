import { z } from "zod";
declare const _default: z.ZodObject<{
    error: z.ZodEnum<["invalid_request", "invalid_client", "invalid_grant", "invalid_scope", "unauthorized_client", "unsupported_grant_type"]>;
    error_description: z.ZodOptional<z.ZodString>;
    error_uri: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error: "invalid_request" | "invalid_client" | "invalid_grant" | "invalid_scope" | "unauthorized_client" | "unsupported_grant_type";
    error_description?: string | undefined;
    error_uri?: string | undefined;
}, {
    error: "invalid_request" | "invalid_client" | "invalid_grant" | "invalid_scope" | "unauthorized_client" | "unsupported_grant_type";
    error_description?: string | undefined;
    error_uri?: string | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-authError.d.ts.map