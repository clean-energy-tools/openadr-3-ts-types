import { z } from "zod";

export default z.object({ "method": z.literal("CERTIFICATE").describe("Specifies certificate authentication"), "caCert": z.string().describe("String containing the Certificate Authority certificate"), "clientCert": z.string().describe("String containing the Client certificate"), "clientKey": z.string().describe("String containing the client certificate private key") }).describe("MQTT broker mTLS client certificate authentication details");
