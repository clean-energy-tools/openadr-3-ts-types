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
      .literal("REPORT")
      .describe("Used as discriminator, e.g. notification.object")
      .optional(),
    programID: z
      .string()
      .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
      .min(1)
      .max(128)
      .describe("URL safe VTN assigned object ID."),
    eventID: z
      .string()
      .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
      .min(1)
      .max(128)
      .describe("URL safe VTN assigned object ID."),
    clientName: z
      .string()
      .min(1)
      .max(128)
      .describe(
        "User generated identifier; may be VEN ID provisioned during program enrollment."
      ),
    reportName: z
      .string()
      .describe("User defined string for use in debugging or User Interface.")
      .default(null)
      .nullable()
      .describe("User defined string for use in debugging or User Interface.")
      .default(null),
    payloadDescriptors: z
      .array(
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
          )
      )
      .describe("A list of reportPayloadDescriptors.")
      .default(null)
      .nullable()
      .describe("A list of reportPayloadDescriptors.")
      .default(null),
    resources: z
      .array(
        z
          .object({
            resourceName: z
              .string()
              .min(1)
              .max(128)
              .describe(
                "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
              ),
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
            intervals: z
              .array(
                z
                  .object({
                    id: z
                      .number()
                      .int()
                      .describe(
                        "A client generated number assigned an interval object. Not a sequence number."
                      ),
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
                    payloads: z
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
                      .describe("A list of valuesMap objects."),
                  })
                  .describe(
                    "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
                  )
              )
              .describe("A list of interval objects."),
          })
          .describe("Report data associated with a resource.")
      )
      .describe(
        "A list of objects containing report data for a set of resources."
      ),
  })
  .describe("report object.");
