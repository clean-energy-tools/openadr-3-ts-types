import { z } from "zod";

export default z.object({ "method": z.literal("OAUTH2_BEARER_TOKEN").describe("Specifies OAuth2 bearer token authentication"), "username": z.string().describe("Either the distinguished string \"{clientID}\", or any other literal string") }).describe("MQTT broker OAuth2 Bearer Token authentication details");
