import { z } from "zod";

export default z.string().datetime({ offset: true }).describe("datetime in ISO 8601 format");
