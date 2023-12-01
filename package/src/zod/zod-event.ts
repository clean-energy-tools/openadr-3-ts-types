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
      .literal("EVENT")
      .describe("Used as discriminator, e.g. notification.object")
      .optional(),
    programID: z
      .string()
      .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
      .min(1)
      .max(128)
      .describe("URL safe VTN assigned object ID."),
    eventName: z
      .string()
      .describe("User defined string for use in debugging or User Interface.")
      .default(null)
      .nullable()
      .describe("User defined string for use in debugging or User Interface.")
      .default(null),
    priority: z
      .number()
      .int()
      .gte(0)
      .describe(
        "Relative priority of event. A lower number is a higher priority."
      )
      .default(null)
      .nullable()
      .describe(
        "Relative priority of event. A lower number is a higher priority."
      )
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
    reportDescriptors: z
      .array(
        z
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
              .describe(
                "Enumerated or private string signifying the type of reading."
              )
              .default(null)
              .nullable()
              .describe(
                "Enumerated or private string signifying the type of reading."
              )
              .default(null),
            units: z
              .string()
              .describe("Units of measure.")
              .default(null)
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
          )
      )
      .describe(
        "A list of reportDescriptor objects. Used to request reports from VEN."
      )
      .default(null)
      .nullable()
      .describe(
        "A list of reportDescriptor objects. Used to request reports from VEN."
      )
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
          )
      )
      .describe("A list of payloadDescriptor objects.")
      .default(null)
      .nullable()
      .describe("A list of payloadDescriptor objects.")
      .default(null),
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
  .describe(
    "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets start time and duration of intervals.\n"
  );
