import { z } from "zod";

export default z
  .string()
  .regex(
    new RegExp(
      "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"
    )
  )
  .describe("duration in ISO 8601 format")
  .default("PT0S");
