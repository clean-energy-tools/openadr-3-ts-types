import { z } from "zod";
declare const _default: z.ZodObject<{
    access_token: z.ZodString;
    token_type: z.ZodLiteral<"Bearer">;
    expires_in: z.ZodOptional<z.ZodNumber>;
    refresh_token: z.ZodOptional<z.ZodString>;
    scope: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    access_token: string;
    token_type: "Bearer";
    scope?: string | undefined;
    expires_in?: number | undefined;
    refresh_token?: string | undefined;
}, {
    access_token: string;
    token_type: "Bearer";
    scope?: string | undefined;
    expires_in?: number | undefined;
    refresh_token?: string | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-clientCredentialResponse.d.ts.map