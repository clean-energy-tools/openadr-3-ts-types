import { z } from "zod";
declare const _default: z.ZodObject<{
    grant_type: z.ZodOptional<z.ZodLiteral<"client_credentials">>;
    clientID: z.ZodString;
    clientSecret: z.ZodString;
    scope: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    clientID: string;
    clientSecret: string;
    grant_type?: "client_credentials" | undefined;
    scope?: string | undefined;
}, {
    clientID: string;
    clientSecret: string;
    grant_type?: "client_credentials" | undefined;
    scope?: string | undefined;
}>;
export default _default;
//# sourceMappingURL=zod-clientCredentialRequest.d.ts.map