import { z } from "zod";

export default z.object({ "tokenURL": z.string().url().min(2).max(8000).describe("URL of the token endpoint.") });
