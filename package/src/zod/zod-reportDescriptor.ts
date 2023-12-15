import { z } from "zod";

export default z
  .object({
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
      // .default(null)
      .nullable()
      .describe("Enumerated or private string signifying the type of reading.")
      .default(null),
    units: z
      .string()
      .describe("Units of measure.")
      // .default(null)
      .nullable()
      .describe("Units of measure.")
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
      // .default(null)
      .nullable()
      .describe("A list of valuesMap objects.")
      .default(null),
    aggregate: z
      .boolean()
      .describe(
        "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n"
      )
      .default(false),
    startInterval: z
      .number()
      .int()
      .describe(
        "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n"
      )
      .default(-1),
    numIntervals: z
      .number()
      .int()
      .describe(
        "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n"
      )
      .default(-1),
    historical: z
      .boolean()
      .describe(
        "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n"
      )
      .default(true),
    frequency: z
      .number()
      .int()
      .describe(
        "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n"
      )
      .default(-1),
    repeat: z
      .number()
      .int()
      .describe(
        "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n"
      )
      .default(1),
  })
  .describe(
    "An object that may be used to request a report from a VEN.\nSee OpenADR REST User Guide for detailed description of how configure a report request.\n"
  );
