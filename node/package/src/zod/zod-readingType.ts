import { z } from "zod";

export default z.string().min(1).max(128).nullable().describe("Enumerated or private string signifying the type of reading.").default(null);
