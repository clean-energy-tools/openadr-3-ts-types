import { z } from "zod";

export default z.string().min(1).max(128).describe("User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n");
