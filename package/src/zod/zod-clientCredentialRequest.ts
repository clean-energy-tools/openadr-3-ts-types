import { z } from "zod";

export default z.object({ "grant_type": z.literal("client_credentials").describe("OAuth2 grant type, must be 'client_credentials'"), "client_id": z.string().min(1).max(4096).describe("client ID to exchange for bearer token."), "client_secret": z.string().min(1).max(4096).describe("client secret to exchange for bearer token."), "scope": z.string().min(1).max(4096).describe("application defined scope.").optional() }).describe("Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n");
