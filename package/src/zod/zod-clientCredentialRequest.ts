import { z } from "zod";

export default z.object({ "grant_type": z.literal("client_credentials").describe("OAuth2 grant type, must be 'client_credentials'").optional(), "clientID": z.string().min(1).max(128).describe("client ID to exchange for bearer token."), "clientSecret": z.string().min(1).max(128).describe("client secret to exchange for bearer token."), "scope": z.string().min(1).max(128).describe("application defined scope.").optional() }).describe("Body of POST request to /auth/token.\n");
