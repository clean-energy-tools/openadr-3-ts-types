import { z } from "zod";
declare const _default: z.ZodObject<{
    access_token: z.ZodString;
    token_type: z.ZodOptional<z.ZodLiteral<"Bearer">>;
    expires_in: z.ZodOptional<z.ZodNumber>;
    refresh_token: z.ZodOptional<z.ZodString>;
    scope: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    access_token: string;
    token_type?: "Bearer" | undefined;
    expires_in?: number | undefined;
    refresh_token?: string | undefined;
    scope?: string | undefined;
}, {
    access_token: string;
    token_type?: "Bearer" | undefined;
    expires_in?: number | undefined;
    refresh_token?: string | undefined;
    scope?: string | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-clientCredentialResponse.d.ts.map