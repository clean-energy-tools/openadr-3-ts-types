import { z } from "zod";

export default z
  .string()
  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
  .min(1)
  .max(128)
  .describe("URL safe VTN assigned object ID.");
