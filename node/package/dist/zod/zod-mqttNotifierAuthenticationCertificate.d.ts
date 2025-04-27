import { z } from "zod";
declare const _default: z.ZodObject<{
    method: z.ZodLiteral<"CERTIFICATE">;
    caCert: z.ZodString;
    clientCert: z.ZodString;
    clientKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    method: "CERTIFICATE";
    caCert: string;
    clientCert: string;
    clientKey: string;
}, {
    method: "CERTIFICATE";
    caCert: string;
    clientCert: string;
    clientKey: string;
}>;
export default _default;
//# sourceMappingURL=zod-mqttNotifierAuthenticationCertificate.d.ts.map