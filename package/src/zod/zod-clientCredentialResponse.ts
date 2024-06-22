import { z } from "zod";

export default z.object({ "access_token": z.string().min(1).max(128).describe("access token povided by Authorization service"), "token_type": z.literal("Bearer").describe("token type, must be Bearer.").optional(), "expires_in": z.number().int().describe("expiration period in seconds.").optional(), "refresh_token": z.string().min(1).max(128).describe("refresh token povided by Authorization service").optional(), "scope": z.string().min(1).max(128).describe("application defined scope.").optional() }).describe("Body response from /auth/token.\n");
