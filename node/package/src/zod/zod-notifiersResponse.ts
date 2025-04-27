import { z } from "zod";

export default z.object({ "WEBHOOK": z.boolean().describe("Currently MUST be true"), "MQTT": z.object({ "URIS": z.array(z.string().url().describe("URIs for connection to MQTT broker")), "serialization": z.literal("JSON").describe("Currently always JSON, perhaps other formats supported in future"), "authentication": z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "method": z.literal("ANONYMOUS").describe("Specifies anonymous authentication") }).describe("MQTT broker anonymous authentication details"), z.object({ "method": z.literal("OAUTH2_BEARER_TOKEN").describe("Specifies OAuth2 bearer token authentication"), "username": z.string().describe("Either the distinguished string \"{clientID}\", or any other literal string") }).describe("MQTT broker OAuth2 Bearer Token authentication details"), z.object({ "method": z.literal("CERTIFICATE").describe("Specifies certificate authentication"), "caCert": z.string().describe("String containing the Certificate Authority certificate"), "clientCert": z.string().describe("String containing the Client certificate"), "clientKey": z.string().describe("String containing the client certificate private key") }).describe("MQTT broker mTLS client certificate authentication details")];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        path: ctx.path,
        code: "invalid_union",
        unionErrors: errors,
        message: "Invalid input: Should pass single schema",
      });
    }
  }).describe("Authentication method supported for connection to MQTT broker") }).describe("Details of MQTT binding for messaging protocol support").optional() }).describe("Provides details of each notifier binding supported");
