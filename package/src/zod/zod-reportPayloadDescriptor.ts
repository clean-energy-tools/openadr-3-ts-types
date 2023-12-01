import { z } from "zod";

export default z
  .object({
    objectType: z
      .string()
      .describe("Used as discriminator, e.g. program.payloadDescriptors")
      .default("REPORT_PAYLOAD_DESCRIPTOR"),
    payloadType: z
      .string()
      .min(1)
      .max(128)
      .describe(
        "Enumerated or private string signifying the nature of values."
      ),
    readingType: z
      .string()
      .describe("Enumerated or private string signifying the type of reading.")
      .default("DIRECT_READ")
      .nullable()
      .describe("Enumerated or private string signifying the type of reading.")
      .default("DIRECT_READ"),
    units: z
      .string()
      .describe("Units of measure.")
      .default("KWH")
      .nullable()
      .describe("Units of measure.")
      .default("KWH"),
    accuracy: z
      .number()
      .describe("A quantification of the accuracy of a set of payload values.")
      .default(0)
      .nullable()
      .describe("A quantification of the accuracy of a set of payload values.")
      .default(0),
    confidence: z
      .number()
      .int()
      .gte(0)
      .lte(100)
      .describe(
        "A quantification of the confidence in a set of payload values."
      )
      .default(100),
  })
  .describe(
    "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
  );
