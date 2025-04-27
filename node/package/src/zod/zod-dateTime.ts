import { z } from "zod";

export default z.string().datetime({ offset: true }).describe("datetime in RFC 3339 format");
