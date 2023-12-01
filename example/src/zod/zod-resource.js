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
      .literal("RESOURCE")
      .describe("Used as discriminator, e.g. notification.object")
      .optional(),
    resourceName: z
      .string()
      .min(1)
      .max(128)
      .describe(
        "User generated identifier, resource may be configured with identifier out-of-band."
      ),
    venID: z
      .string()
      .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
      .min(1)
      .max(128)
      .describe("URL safe VTN assigned object ID.")
      .optional(),
    attributes: z
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
      .describe("A list of valuesMap objects describing attributes.")
      .optional(),
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
      .describe("A list of valuesMap objects describing target criteria.")
      .optional(),
  })
  .describe(
    "A resource is an energy device or system subject to control by a VEN.\n"
  );
