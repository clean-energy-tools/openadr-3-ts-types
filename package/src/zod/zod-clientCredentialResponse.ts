import { z } from "zod";

export default z.object({ "access_token": z.string().min(1).max(4096).describe("access token povided by Authorization service"), "token_type": z.literal("Bearer").describe("token type, must be Bearer."), "expires_in": z.number().int().describe("expiration period in seconds.").optional(), "refresh_token": z.string().min(1).max(4096).describe("refresh token povided by Authorization service").optional(), "scope": z.string().min(0).max(4096).describe("application defined scope.").optional() }).describe("Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n");
