import { z } from "zod";

export default z
  .object({
    id: z
      .string()
      .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
      .min(1)
      .max(128)
      .describe("URL safe VTN assigned object ID.")
      .optional(),
    createdDateTime: z
      .string()
      .datetime()
      .describe("datetime in ISO 8601 format")
      .default("0000-00-00"),
    modificationDateTime: z
      .string()
      .datetime()
      .describe("datetime in ISO 8601 format")
      .default("0000-00-00"),
    objectType: z
      .literal("PROGRAM")
      .describe("Used as discriminator, e.g. notification.object")
      .optional(),
    programName: z
      .string()
      .min(1)
      .max(128)
      .describe("Short name to uniquely identify program."),
    programLongName: z
      .string()
      .describe("Long name of program for human readability.")
      .default(null)
      .nullable()
      .describe("Long name of program for human readability.")
      .default(null),
    retailerName: z
      .string()
      .describe("Short name of energy retailer providing the program.")
      .default(null)
      .nullable()
      .describe("Short name of energy retailer providing the program.")
      .default(null),
    retailerLongName: z
      .string()
      .describe("Long name of energy retailer for human readability.")
      .default(null)
      .nullable()
      .describe("Long name of energy retailer for human readability.")
      .default(null),
    programType: z
      .string()
      .describe("A program defined categorization.")
      .default(null)
      .nullable()
      .describe("A program defined categorization.")
      .default(null),
    country: z
      .string()
      .describe("Alpha-2 code per ISO 3166-1.")
      .default(null)
      .nullable()
      .describe("Alpha-2 code per ISO 3166-1.")
      .default(null),
    principalSubdivision: z
      .string()
      .describe("Coding per ISO 3166-2. E.g. state in US.")
      .default(null)
      .nullable()
      .describe("Coding per ISO 3166-2. E.g. state in US.")
      .default(null),
    timeZoneOffset: z
      .string()
      .regex(
        new RegExp(
          "/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"
        )
      )
      .describe("duration in ISO 8601 format")
      .default("PT0S"),
    intervalPeriod: z
      .object({
        start: z
          .string()
          .datetime()
          .describe("datetime in ISO 8601 format")
          .default("0000-00-00"),
        duration: z
          .string()
          .regex(
            new RegExp(
              "/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"
            )
          )
          .describe("duration in ISO 8601 format")
          .default("PT0S"),
        randomizeStart: z
          .string()
          .regex(
            new RegExp(
              "/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"
            )
          )
          .describe("duration in ISO 8601 format")
          .default("PT0S"),
      })
      .describe(
        "Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n"
      )
      .optional(),
    programDescriptions: z
      .array(z.any())
      .describe("A list of programDescriptions")
      .default(null)
      .nullable()
      .describe("A list of programDescriptions")
      .default(null),
    bindingEvents: z
      .boolean()
      .describe("True if events are fixed once transmitted.")
      .default(false),
    localPrice: z
      .boolean()
      .describe("True if events have been adapted from a grid event.")
      .default(false),
    payloadDescriptors: z
      .array(
        z.union([
          z
            .object({
              objectType: z
                .string()
                .describe(
                  "Used as discriminator, e.g. program.payloadDescriptors"
                )
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
                .default(null)
                .nullable()
                .describe("Units of measure.")
                .default(null),
              currency: z
                .string()
                .describe("Currency of price payload.")
                .default("USD")
                .nullable()
                .describe("Currency of price payload.")
                .default("USD"),
            })
            .describe(
              "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
            ),
          z
            .object({
              objectType: z
                .string()
                .describe(
                  "Used as discriminator, e.g. program.payloadDescriptors"
                )
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
                .describe(
                  "Enumerated or private string signifying the type of reading."
                )
                .default("DIRECT_READ")
                .nullable()
                .describe(
                  "Enumerated or private string signifying the type of reading."
                )
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
                .describe(
                  "A quantification of the accuracy of a set of payload values."
                )
                .default(0)
                .nullable()
                .describe(
                  "A quantification of the accuracy of a set of payload values."
                )
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
            ),
        ])
      )
      .describe("A list of payloadDescriptors.")
      .default(null)
      .nullable()
      .describe("A list of payloadDescriptors.")
      .default(null),
    targets: z
      .array(
        z
          .object({
            type: z
              .string()
              .min(1)
              .max(128)
              .describe(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              ),
            values: z
              .array(
                z.union([
                  z.number(),
                  z.number().int(),
                  z.string(),
                  z.boolean(),
                  z
                    .object({
                      x: z
                        .number()
                        .describe("A value on an x axis.")
                        .default(null)
                        .nullable()
                        .describe("A value on an x axis.")
                        .default(null),
                      y: z
                        .number()
                        .describe("A value on a y axis.")
                        .default(null)
                        .nullable()
                        .describe("A value on a y axis.")
                        .default(null),
                    })
                    .describe(
                      "A pair of floats typically used as a point on a 2 dimensional grid."
                    ),
                ])
              )
              .describe(
                "A list of data points. Most often a singular value such as a price."
              ),
          })
          .describe(
            "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
          )
      )
      .describe("A list of valuesMap objects.")
      .default(null)
      .nullable()
      .describe("A list of valuesMap objects.")
      .default(null),
  })
  .describe("Provides program specific metadata from VTN to VEN.");
