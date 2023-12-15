import { z } from "zod";

export default z
  .object({
    objectType: z
      .string()
      .describe("Used as discriminator, e.g. program.payloadDescriptors")
      .default("EVENT_PAYLOAD_DESCRIPTOR"),
    payloadType: z
      .string()
      .min(1)
      .max(128)
      .describe(
        "Enumerated or private string signifying the nature of values."
      ),
    units: z
      .string()
      .describe("Units of measure.")
      // .default(null)
      .nullable()
      .describe("Units of measure.")
      .default(null),
    currency: z
      .string()
      .describe("Currency of price payload.")
      // .default(null)
      .nullable()
      .describe("Currency of price payload.")
      .default(null),
  })
  .describe(
    "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
  );
