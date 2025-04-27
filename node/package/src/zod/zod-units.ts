import { z } from "zod";

export default z.string().min(1).max(128).nullable().describe("Units of measure.").default(null);
