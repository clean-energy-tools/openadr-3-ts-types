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
      .optional(),
    modificationDateTime: z
      .string()
      .datetime()
      .describe("datetime in ISO 8601 format")
      .optional(),
    objectType: z
      .literal("SUBSCRIPTION")
      .describe("Used as discriminator, e.g. notification.object")
      .optional(),
    clientName: z
      .string()
      .min(1)
      .max(128)
      .describe(
        "User generated identifier, may be VEN identifier provisioned during program enrollment."
      ),
    programID: z
      .string()
      .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
      .min(1)
      .max(128)
      .describe("URL safe VTN assigned object ID."),
    objectOperations: z
      .array(
        z
          .object({
            objects: z
              .array(
                z
                  .enum([
                    "PROGRAM",
                    "EVENT",
                    "REPORT",
                    "SUBSCRIPTION",
                    "VEN",
                    "RESOURCE",
                  ])
                  .describe("Types of objects addressable through API.")
              )
              .describe("list of objects to subscribe to."),
            operations: z
              .array(
                z
                  .enum(["GET", "POST", "PUT", "DELETE"])
                  .describe("object operation to subscribe to.")
              )
              .describe("list of operations to subscribe to."),
            callbackUrl: z
              .string()
              .url()
              .describe("User provided webhook URL."),
            bearerToken: z
              .string()
              .describe(
                "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n"
              )
              .default(null)
              .nullable()
              .describe(
                "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n"
              )
              .default(null),
          })
          .describe("object type, operations, and callbackUrl.")
      )
      .describe("list of objects and operations to subscribe to."),
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
      .describe(
        "A list of valuesMap objects. Used by server to filter callbacks."
      )
      .default(null)
      .nullable()
      .describe(
        "A list of valuesMap objects. Used by server to filter callbacks."
      )
      .default(null),
  })
  .describe(
    "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n"
  );
