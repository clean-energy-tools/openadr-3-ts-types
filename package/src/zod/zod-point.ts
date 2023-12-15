import { z } from "zod";

export default z
  .object({
    x: z
      .number()
      .describe("A value on an x axis.")
      // .default(null)
      .nullable()
      .describe("A value on an x axis.")
      .default(null),
    y: z
      .number()
      .describe("A value on a y axis.")
      // .default(null)
      .nullable()
      .describe("A value on a y axis.")
      .default(null),
  })
  .describe(
    "A pair of floats typically used as a point on a 2 dimensional grid."
  );
