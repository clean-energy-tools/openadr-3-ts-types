import { z } from "zod";

export default z.string().datetime().describe("datetime in ISO 8601 format");
