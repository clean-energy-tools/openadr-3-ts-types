import { z } from "zod";
declare const _default: z.ZodObject<{
    grant_type: z.ZodLiteral<"client_credentials">;
    client_id: z.ZodString;
    client_secret: z.ZodString;
    scope: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    grant_type: "client_credentials";
    client_id: string;
    client_secret: string;
    scope?: string | undefined;
}, {
    grant_type: "client_credentials";
    client_id: string;
    client_secret: string;
    scope?: string | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-clientCredentialRequest.d.ts.map