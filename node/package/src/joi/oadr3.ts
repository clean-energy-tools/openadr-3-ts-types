import Joi from "joi";

export const schemas = {
  parameters: {
    searchAllPrograms: {
      path: Joi.object({}),
      query: Joi.object({
        targetType: Joi.string().optional().max(128).min(1),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().max(128).min(1)),
        skip: Joi.number().optional().integer().min(0),
        limit: Joi.number().optional().integer().max(50).min(0),
      }),
      header: Joi.object({}),
      cookie: Joi.object({}),
    },
    searchAllReports: {
      path: Joi.object({}),
      query: Joi.object({
        programID: Joi.string()
          .description("URL safe VTN assigned object ID.")
          .optional()
          .pattern(/^[a-zA-Z0-9_-]*$/, {})
          .max(128)
          .min(1),
        eventID: Joi.string()
          .description("URL safe VTN assigned object ID.")
          .optional()
          .pattern(/^[a-zA-Z0-9_-]*$/, {})
          .max(128)
          .min(1),
        clientName: Joi.string()
          .description(
            "User generated identifier, may be VEN identifier provisioned out-of-band."
          )
          .optional()
          .max(128)
          .min(1),
        skip: Joi.number().optional().integer().min(0),
        limit: Joi.number().optional().integer().max(50).min(0),
      }),
      header: Joi.object({}),
      cookie: Joi.object({}),
    },
    searchAllEvents: {
      path: Joi.object({}),
      query: Joi.object({
        programID: Joi.string()
          .description("URL safe VTN assigned object ID.")
          .optional()
          .pattern(/^[a-zA-Z0-9_-]*$/, {})
          .max(128)
          .min(1),
        targetType: Joi.string().optional().max(128).min(1),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().max(128).min(1)),
        skip: Joi.number().optional().integer().min(0),
        limit: Joi.number().optional().integer().max(50).min(0),
        active: Joi.boolean().optional(),
      }),
      header: Joi.object({}),
      cookie: Joi.object({}),
    },
    searchSubscriptions: {
      path: Joi.object({}),
      query: Joi.object({
        programID: Joi.string()
          .description("URL safe VTN assigned object ID.")
          .optional()
          .pattern(/^[a-zA-Z0-9_-]*$/, {})
          .max(128)
          .min(1),
        clientName: Joi.string()
          .description(
            "User generated identifier, may be VEN identifier provisioned out-of-band."
          )
          .optional()
          .max(128)
          .min(1),
        targetType: Joi.string().optional().max(128).min(1),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().max(128).min(1)),
        objects: Joi.array()
          .optional()
          .items(
            Joi.string()
              .allow(
                "PROGRAM",
                "EVENT",
                "REPORT",
                "SUBSCRIPTION",
                "VEN",
                "RESOURCE"
              )
              .description("Types of objects addressable through API.")
              .only()
          ),
        skip: Joi.number().optional().integer().min(0),
        limit: Joi.number().optional().integer().max(50).min(0),
      }),
      header: Joi.object({}),
      cookie: Joi.object({}),
    },
    searchVens: {
      path: Joi.object({}),
      query: Joi.object({
        venName: Joi.string()
          .description(
            "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n"
          )
          .optional()
          .max(128)
          .min(1),
        targetType: Joi.string().optional().max(128).min(1),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().max(128).min(1)),
        skip: Joi.number().optional().integer().min(0),
        limit: Joi.number().optional().integer().max(50).min(0),
      }),
      header: Joi.object({}),
      cookie: Joi.object({}),
    },
    searchVenResources: {
      path: Joi.object({}),
      query: Joi.object({
        resourceName: Joi.string()
          .description(
            "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
          )
          .optional()
          .max(128)
          .min(1),
        targetType: Joi.string().optional().max(128).min(1),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().max(128).min(1)),
        skip: Joi.number().optional().integer().min(0),
        limit: Joi.number().optional().integer().max(50).min(0),
      }),
      header: Joi.object({}),
      cookie: Joi.object({}),
    },
  },
  components: {
    program: Joi.alternatives()
      .match("all")
      .try(
        Joi.object()
          .description("Server provided representation of program")
          .unknown(),
        Joi.alternatives()
          .match("all")
          .try(
            Joi.object({
              id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              createdDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              modificationDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              objectType: Joi.string()
                .allow(
                  "PROGRAM",
                  "EVENT",
                  "REPORT",
                  "SUBSCRIPTION",
                  "VEN",
                  "RESOURCE"
                )
                .description("Types of objects addressable through API.")
                .only()
                .required(),
            })
              .description(
                "metadata common to all addressable objects. Values provided by VTN on object creation."
              )
              .unknown(),
            Joi.object({
              programName: Joi.string()
                .description("Short name to uniquely identify program.")
                .required()
                .max(128)
                .min(1),
              programLongName: Joi.string()
                .allow("", null)
                .default(null)
                .description("Long name of program for human readability.")
                .min(0),
              retailerName: Joi.string()
                .allow("", null)
                .default(null)
                .description(
                  "Short name of energy retailer providing the program."
                )
                .min(0),
              retailerLongName: Joi.string()
                .allow("", null)
                .default(null)
                .description(
                  "Long name of energy retailer for human readability."
                )
                .min(0),
              programType: Joi.string()
                .allow("", null)
                .default(null)
                .description("A program defined categorization.")
                .min(0),
              country: Joi.string()
                .allow("", null)
                .default(null)
                .description("Alpha-2 code per ISO 3166-1.")
                .min(0),
              principalSubdivision: Joi.string()
                .allow("", null)
                .default(null)
                .description("Coding per ISO 3166-2. E.g. state in US.")
                .min(0),
              intervalPeriod: Joi.object({
                start: Joi.date().description("datetime in RFC 3339 format"),
                duration: Joi.string()
                  .default("PT0S")
                  .description("duration in ISO 8601 format")
                  .pattern(
                    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                    {}
                  )
                  .min(0),
                randomizeStart: Joi.string()
                  .allow("")
                  .default("PT0S")
                  .description("duration in ISO 8601 format")
                  .pattern(
                    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                    {}
                  )
                  .min(0),
              })
                .description(
                  'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                )
                .unknown(),
              programDescriptions: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of programDescriptions")
                .items(
                  Joi.object({
                    URL: Joi.string()
                      .description(
                        "A human or machine readable program description"
                      )
                      .required()
                      .uri({}),
                  }).unknown()
                ),
              bindingEvents: Joi.boolean()
                .allow(null)
                .default(null)
                .description("True if events are fixed once transmitted."),
              localPrice: Joi.boolean()
                .allow(null)
                .default(null)
                .description(
                  "True if events have been adapted from a grid event."
                ),
              payloadDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of payloadDescriptors.")
                .items(
                  Joi.alternatives()
                    .match("any")
                    .try(
                      Joi.object({
                        objectType: Joi.string()
                          .allow("EVENT_PAYLOAD_DESCRIPTOR")
                          .description("Used as discriminator.")
                          .only(),
                        payloadType: Joi.string()
                          .description(
                            "Enumerated or private string signifying the nature of values."
                          )
                          .required()
                          .max(128)
                          .min(1),
                        units: Joi.string()
                          .allow(null)
                          .default(null)
                          .description("Units of measure.")
                          .max(128)
                          .min(1),
                        currency: Joi.string()
                          .allow("", null)
                          .default(null)
                          .description("Currency of price payload.")
                          .min(0),
                      })
                        .description(
                          "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
                        )
                        .unknown(),
                      Joi.object({
                        objectType: Joi.string()
                          .allow("REPORT_PAYLOAD_DESCRIPTOR")
                          .description("Used as discriminator.")
                          .only(),
                        payloadType: Joi.string()
                          .description(
                            "Enumerated or private string signifying the nature of values."
                          )
                          .required()
                          .max(128)
                          .min(1),
                        readingType: Joi.string()
                          .allow(null)
                          .default(null)
                          .description(
                            "Enumerated or private string signifying the type of reading."
                          )
                          .max(128)
                          .min(1),
                        units: Joi.string()
                          .allow(null)
                          .default(null)
                          .description("Units of measure.")
                          .max(128)
                          .min(1),
                        accuracy: Joi.number()
                          .allow(null)
                          .default(null)
                          .description(
                            "A quantification of the accuracy of a set of payload values."
                          ),
                        confidence: Joi.number()
                          .allow(null)
                          .default(null)
                          .description(
                            "A quantification of the confidence in a set of payload values."
                          )
                          .integer()
                          .max(100)
                          .min(0),
                      })
                        .description(
                          "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
                        )
                        .unknown()
                    )
                ),
              targets: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of valuesMap objects.")
                .items(
                  Joi.object({
                    type: Joi.string()
                      .description(
                        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                      )
                      .required()
                      .max(128)
                      .min(1),
                    values: Joi.array()
                      .description(
                        "A list of data points. Most often a singular value such as a price."
                      )
                      .required()
                      .items(
                        Joi.alternatives()
                          .match("any")
                          .try(
                            Joi.number(),
                            Joi.number().integer(),
                            Joi.string().allow("").min(0),
                            Joi.boolean(),
                            Joi.object({
                              x: Joi.number()
                                .description("A value on an x axis.")
                                .required(),
                              y: Joi.number()
                                .description("A value on a y axis.")
                                .required(),
                            })
                              .description(
                                "A pair of floats typically used as a point on a 2 dimensional grid."
                              )
                              .unknown()
                          )
                      ),
                  })
                    .description(
                      "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                    )
                    .unknown()
                ),
            })
              .description("Client provided description of program")
              .unknown()
          )
      ),
    programRequest: Joi.object({
      programName: Joi.string()
        .description("Short name to uniquely identify program.")
        .required()
        .max(128)
        .min(1),
      programLongName: Joi.string()
        .allow("", null)
        .default(null)
        .description("Long name of program for human readability.")
        .min(0),
      retailerName: Joi.string()
        .allow("", null)
        .default(null)
        .description("Short name of energy retailer providing the program.")
        .min(0),
      retailerLongName: Joi.string()
        .allow("", null)
        .default(null)
        .description("Long name of energy retailer for human readability.")
        .min(0),
      programType: Joi.string()
        .allow("", null)
        .default(null)
        .description("A program defined categorization.")
        .min(0),
      country: Joi.string()
        .allow("", null)
        .default(null)
        .description("Alpha-2 code per ISO 3166-1.")
        .min(0),
      principalSubdivision: Joi.string()
        .allow("", null)
        .default(null)
        .description("Coding per ISO 3166-2. E.g. state in US.")
        .min(0),
      intervalPeriod: Joi.object({
        start: Joi.date().description("datetime in RFC 3339 format"),
        duration: Joi.string()
          .allow("")
          .default("PT0S")
          .description("duration in ISO 8601 format")
          .pattern(
            /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
            {}
          )
          .min(0),
        randomizeStart: Joi.string()
          .allow("")
          .default("PT0S")
          .description("duration in ISO 8601 format")
          .pattern(
            /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
            {}
          )
          .min(0),
      })
        .description(
          'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
        )
        .unknown(),
      programDescriptions: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of programDescriptions")
        .items(
          Joi.object({
            URL: Joi.string()
              .description("A human or machine readable program description")
              .required()
              .uri({}),
          }).unknown()
        ),
      bindingEvents: Joi.boolean()
        .allow(null)
        .default(null)
        .description("True if events are fixed once transmitted."),
      localPrice: Joi.boolean()
        .allow(null)
        .default(null)
        .description("True if events have been adapted from a grid event."),
      payloadDescriptors: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of payloadDescriptors.")
        .items(
          Joi.alternatives()
            .match("any")
            .try(
              Joi.object({
                objectType: Joi.string()
                  .allow("EVENT_PAYLOAD_DESCRIPTOR")
                  .description("Used as discriminator.")
                  .only(),
                payloadType: Joi.string()
                  .description(
                    "Enumerated or private string signifying the nature of values."
                  )
                  .required()
                  .max(128)
                  .min(1),
                units: Joi.string()
                  .allow(null)
                  .default(null)
                  .description("Units of measure.")
                  .max(128)
                  .min(1),
                currency: Joi.string()
                  .allow("", null)
                  .default(null)
                  .description("Currency of price payload.")
                  .min(0),
              })
                .description(
                  "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
                )
                .unknown(),
              Joi.object({
                objectType: Joi.string()
                  .allow("REPORT_PAYLOAD_DESCRIPTOR")
                  .description("Used as discriminator.")
                  .only(),
                payloadType: Joi.string()
                  .description(
                    "Enumerated or private string signifying the nature of values."
                  )
                  .required()
                  .max(128)
                  .min(1),
                readingType: Joi.string()
                  .allow(null)
                  .default(null)
                  .description(
                    "Enumerated or private string signifying the type of reading."
                  )
                  .max(128)
                  .min(1),
                units: Joi.string()
                  .allow(null)
                  .default(null)
                  .description("Units of measure.")
                  .max(128)
                  .min(1),
                accuracy: Joi.number()
                  .allow(null)
                  .default(null)
                  .description(
                    "A quantification of the accuracy of a set of payload values."
                  ),
                confidence: Joi.number()
                  .allow(null)
                  .default(null)
                  .description(
                    "A quantification of the confidence in a set of payload values."
                  )
                  .integer()
                  .max(100)
                  .min(0),
              })
                .description(
                  "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
                )
                .unknown()
            )
        ),
      targets: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of valuesMap objects.")
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
    })
      .description("Client provided description of program")
      .unknown(),
    report: Joi.alternatives()
      .match("all")
      .try(
        Joi.object()
          .description("Server provided representation of report")
          .unknown(),
        Joi.alternatives()
          .match("all")
          .try(
            Joi.object({
              id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              createdDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              modificationDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              objectType: Joi.string()
                .allow(
                  "PROGRAM",
                  "EVENT",
                  "REPORT",
                  "SUBSCRIPTION",
                  "VEN",
                  "RESOURCE"
                )
                .description("Types of objects addressable through API.")
                .only()
                .required(),
            })
              .description(
                "metadata common to all addressable objects. Values provided by VTN on object creation."
              )
              .unknown(),
            Joi.object({
              eventID: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              clientName: Joi.string()
                .description(
                  "User generated identifier, may be VEN identifier provisioned out-of-band."
                )
                .required()
                .max(128)
                .min(1),
              reportName: Joi.string()
                .allow("", null)
                .default(null)
                .description(
                  "User defined string for use in debugging or User Interface."
                )
                .min(0),
              payloadDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of reportPayloadDescriptors.")
                .items(
                  Joi.object({
                    objectType: Joi.string()
                      .allow("REPORT_PAYLOAD_DESCRIPTOR")
                      .description("Used as discriminator.")
                      .only(),
                    payloadType: Joi.string()
                      .description(
                        "Enumerated or private string signifying the nature of values."
                      )
                      .required()
                      .max(128)
                      .min(1),
                    readingType: Joi.string()
                      .allow(null)
                      .default(null)
                      .description(
                        "Enumerated or private string signifying the type of reading."
                      )
                      .max(128)
                      .min(1),
                    units: Joi.string()
                      .allow(null)
                      .default(null)
                      .description("Units of measure.")
                      .max(128)
                      .min(1),
                    accuracy: Joi.number()
                      .allow(null)
                      .default(null)
                      .description(
                        "A quantification of the accuracy of a set of payload values."
                      ),
                    confidence: Joi.number()
                      .allow(null)
                      .default(null)
                      .description(
                        "A quantification of the confidence in a set of payload values."
                      )
                      .integer()
                      .max(100)
                      .min(0),
                  })
                    .description(
                      "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
                    )
                    .unknown()
                ),
              resources: Joi.array()
                .description(
                  "A list of objects containing report data for a set of resources."
                )
                .required()
                .items(
                  Joi.object({
                    resourceName: Joi.string()
                      .description(
                        "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                      )
                      .required()
                      .max(128)
                      .min(1),
                    intervalPeriod: Joi.object({
                      start: Joi.date().description(
                        "datetime in RFC 3339 format"
                      ),
                      duration: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(
                          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                          {}
                        )
                        .min(0),
                      randomizeStart: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(
                          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                          {}
                        )
                        .min(0),
                    })
                      .description(
                        'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                      )
                      .unknown(),
                    intervals: Joi.array()
                      .description("A list of interval objects.")
                      .required()
                      .items(
                        Joi.object({
                          id: Joi.number()
                            .description(
                              "A client generated number assigned an interval object. Not a sequence number."
                            )
                            .required()
                            .integer(),
                          intervalPeriod: Joi.object({
                            start: Joi.date().description(
                              "datetime in RFC 3339 format"
                            ),
                            duration: Joi.string()
                              .allow("")
                              .default("PT0S")
                              .description("duration in ISO 8601 format")
                              .pattern(
                                /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                                {}
                              )
                              .min(0),
                            randomizeStart: Joi.string()
                              .allow("")
                              .default("PT0S")
                              .description("duration in ISO 8601 format")
                              .pattern(
                                /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                                {}
                              )
                              .min(0),
                          })
                            .description(
                              'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                            )
                            .unknown(),
                          payloads: Joi.array()
                            .description("A list of valuesMap objects.")
                            .required()
                            .items(
                              Joi.object({
                                type: Joi.string()
                                  .description(
                                    'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                  )
                                  .required()
                                  .max(128)
                                  .min(1),
                                values: Joi.array()
                                  .description(
                                    "A list of data points. Most often a singular value such as a price."
                                  )
                                  .required()
                                  .items(
                                    Joi.alternatives()
                                      .match("any")
                                      .try(
                                        Joi.number(),
                                        Joi.number().integer(),
                                        Joi.string().allow("").min(0),
                                        Joi.boolean(),
                                        Joi.object({
                                          x: Joi.number()
                                            .description(
                                              "A value on an x axis."
                                            )
                                            .required(),
                                          y: Joi.number()
                                            .description("A value on a y axis.")
                                            .required(),
                                        })
                                          .description(
                                            "A pair of floats typically used as a point on a 2 dimensional grid."
                                          )
                                          .unknown()
                                      )
                                  ),
                              })
                                .description(
                                  "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                                )
                                .unknown()
                            ),
                        })
                          .description(
                            "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
                          )
                          .unknown()
                      ),
                  })
                    .description("Report data associated with a resource.")
                    .unknown()
                ),
            })
              .description("report object.")
              .unknown()
          )
      ),
    reportRequest: Joi.object({
      eventID: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .required()
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      clientName: Joi.string()
        .description(
          "User generated identifier, may be VEN identifier provisioned out-of-band."
        )
        .required()
        .max(128)
        .min(1),
      reportName: Joi.string()
        .allow("", null)
        .default(null)
        .description(
          "User defined string for use in debugging or User Interface."
        )
        .min(0),
      payloadDescriptors: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of reportPayloadDescriptors.")
        .items(
          Joi.object({
            objectType: Joi.string()
              .allow("REPORT_PAYLOAD_DESCRIPTOR")
              .description("Used as discriminator.")
              .only(),
            payloadType: Joi.string()
              .description(
                "Enumerated or private string signifying the nature of values."
              )
              .required()
              .max(128)
              .min(1),
            readingType: Joi.string()
              .allow(null)
              .default(null)
              .description(
                "Enumerated or private string signifying the type of reading."
              )
              .max(128)
              .min(1),
            units: Joi.string()
              .allow(null)
              .default(null)
              .description("Units of measure.")
              .max(128)
              .min(1),
            accuracy: Joi.number()
              .allow(null)
              .default(null)
              .description(
                "A quantification of the accuracy of a set of payload values."
              ),
            confidence: Joi.number()
              .allow(null)
              .default(null)
              .description(
                "A quantification of the confidence in a set of payload values."
              )
              .integer()
              .max(100)
              .min(0),
          })
            .description(
              "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
            )
            .unknown()
        ),
      resources: Joi.array()
        .description(
          "A list of objects containing report data for a set of resources."
        )
        .required()
        .items(
          Joi.object({
            resourceName: Joi.string()
              .description(
                "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
              )
              .required()
              .max(128)
              .min(1),
            intervalPeriod: Joi.object({
              start: Joi.date().description("datetime in RFC 3339 format"),
              duration: Joi.string()
                .allow("")
                .default("PT0S")
                .description("duration in ISO 8601 format")
                .pattern(
                  /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                  {}
                )
                .min(0),
              randomizeStart: Joi.string()
                .allow("")
                .default("PT0S")
                .description("duration in ISO 8601 format")
                .pattern(
                  /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                  {}
                )
                .min(0),
            })
              .description(
                'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
              )
              .unknown(),
            intervals: Joi.array()
              .description("A list of interval objects.")
              .required()
              .items(
                Joi.object({
                  id: Joi.number()
                    .description(
                      "A client generated number assigned an interval object. Not a sequence number."
                    )
                    .required()
                    .integer(),
                  intervalPeriod: Joi.object({
                    start: Joi.date().description(
                      "datetime in RFC 3339 format"
                    ),
                    duration: Joi.string()
                      .allow("")
                      .default("PT0S")
                      .description("duration in ISO 8601 format")
                      .pattern(
                        /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                        {}
                      )
                      .min(0),
                    randomizeStart: Joi.string()
                      .allow("")
                      .default("PT0S")
                      .description("duration in ISO 8601 format")
                      .pattern(
                        /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                        {}
                      )
                      .min(0),
                  })
                    .description(
                      'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                    )
                    .unknown(),
                  payloads: Joi.array()
                    .description("A list of valuesMap objects.")
                    .required()
                    .items(
                      Joi.object({
                        type: Joi.string()
                          .description(
                            'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                          )
                          .required()
                          .max(128)
                          .min(1),
                        values: Joi.array()
                          .description(
                            "A list of data points. Most often a singular value such as a price."
                          )
                          .required()
                          .items(
                            Joi.alternatives()
                              .match("any")
                              .try(
                                Joi.number(),
                                Joi.number().integer(),
                                Joi.string().allow("").min(0),
                                Joi.boolean(),
                                Joi.object({
                                  x: Joi.number()
                                    .description("A value on an x axis.")
                                    .required(),
                                  y: Joi.number()
                                    .description("A value on a y axis.")
                                    .required(),
                                })
                                  .description(
                                    "A pair of floats typically used as a point on a 2 dimensional grid."
                                  )
                                  .unknown()
                              )
                          ),
                      })
                        .description(
                          "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                        )
                        .unknown()
                    ),
                })
                  .description(
                    "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
                  )
                  .unknown()
              ),
          })
            .description("Report data associated with a resource.")
            .unknown()
        ),
    })
      .description("report object.")
      .unknown(),
    event: Joi.alternatives()
      .match("all")
      .try(
        Joi.object()
          .description("Server provided representation of event")
          .unknown(),
        Joi.alternatives()
          .match("all")
          .try(
            Joi.object({
              id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              createdDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              modificationDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              objectType: Joi.string()
                .allow(
                  "PROGRAM",
                  "EVENT",
                  "REPORT",
                  "SUBSCRIPTION",
                  "VEN",
                  "RESOURCE"
                )
                .description("Types of objects addressable through API.")
                .only()
                .required(),
            })
              .description(
                "metadata common to all addressable objects. Values provided by VTN on object creation."
              )
              .unknown(),
            Joi.object({
              programID: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              eventName: Joi.string()
                .allow("", null)
                .default(null)
                .description(
                  "User defined string for use in debugging or User Interface."
                )
                .min(0),
              duration: Joi.string()
                .allow("")
                .default("PT0S")
                .description("duration in ISO 8601 format")
                .pattern(
                  /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                  {}
                )
                .min(0),
              priority: Joi.number()
                .allow(null)
                .default(null)
                .description(
                  "Relative priority of event. A lower number is a higher priority."
                )
                .integer()
                .min(0),
              targets: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of valuesMap objects.")
                .items(
                  Joi.object({
                    type: Joi.string()
                      .description(
                        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                      )
                      .required()
                      .max(128)
                      .min(1),
                    values: Joi.array()
                      .description(
                        "A list of data points. Most often a singular value such as a price."
                      )
                      .required()
                      .items(
                        Joi.alternatives()
                          .match("any")
                          .try(
                            Joi.number(),
                            Joi.number().integer(),
                            Joi.string().allow("").min(0),
                            Joi.boolean(),
                            Joi.object({
                              x: Joi.number()
                                .description("A value on an x axis.")
                                .required(),
                              y: Joi.number()
                                .description("A value on a y axis.")
                                .required(),
                            })
                              .description(
                                "A pair of floats typically used as a point on a 2 dimensional grid."
                              )
                              .unknown()
                          )
                      ),
                  })
                    .description(
                      "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                    )
                    .unknown()
                ),
              reportDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description(
                  "A list of reportDescriptor objects. Used to request reports from VEN."
                )
                .items(
                  Joi.object({
                    payloadType: Joi.string()
                      .description(
                        "Enumerated or private string signifying the nature of values."
                      )
                      .required()
                      .max(128)
                      .min(1),
                    readingType: Joi.string()
                      .allow(null)
                      .default(null)
                      .description(
                        "Enumerated or private string signifying the type of reading."
                      )
                      .max(128)
                      .min(1),
                    units: Joi.string()
                      .allow(null)
                      .default(null)
                      .description("Units of measure.")
                      .max(128)
                      .min(1),
                    targets: Joi.array()
                      .allow(null)
                      .default(null)
                      .description("A list of valuesMap objects.")
                      .items(
                        Joi.object({
                          type: Joi.string()
                            .description(
                              'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                            )
                            .required()
                            .max(128)
                            .min(1),
                          values: Joi.array()
                            .description(
                              "A list of data points. Most often a singular value such as a price."
                            )
                            .required()
                            .items(
                              Joi.alternatives()
                                .match("any")
                                .try(
                                  Joi.number(),
                                  Joi.number().integer(),
                                  Joi.string().allow("").min(0),
                                  Joi.boolean(),
                                  Joi.object({
                                    x: Joi.number()
                                      .description("A value on an x axis.")
                                      .required(),
                                    y: Joi.number()
                                      .description("A value on a y axis.")
                                      .required(),
                                  })
                                    .description(
                                      "A pair of floats typically used as a point on a 2 dimensional grid."
                                    )
                                    .unknown()
                                )
                            ),
                        })
                          .description(
                            "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                          )
                          .unknown()
                      ),
                    aggregate: Joi.boolean()
                      .default(false)
                      .description(
                        "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n"
                      ),
                    startInterval: Joi.number()
                      .default(-1)
                      .description(
                        "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n"
                      )
                      .integer(),
                    numIntervals: Joi.number()
                      .default(-1)
                      .description(
                        "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n"
                      )
                      .integer(),
                    historical: Joi.boolean()
                      .default(true)
                      .description(
                        "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n"
                      ),
                    frequency: Joi.number()
                      .default(-1)
                      .description(
                        "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n"
                      )
                      .integer(),
                    repeat: Joi.number()
                      .default(1)
                      .description(
                        "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n"
                      )
                      .integer(),
                    reportIntervals: Joi.string()
                      .allow("INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS")
                      .default("INTERVALS")
                      .description(
                        "Indicates VEN report interval options. See User Guide."
                      )
                      .only(),
                  })
                    .description(
                      "An object that may be used to request a report from a VEN.\n"
                    )
                    .unknown()
                ),
              payloadDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of payloadDescriptor objects.")
                .items(
                  Joi.object({
                    objectType: Joi.string()
                      .allow("EVENT_PAYLOAD_DESCRIPTOR")
                      .description("Used as discriminator.")
                      .only(),
                    payloadType: Joi.string()
                      .description(
                        "Enumerated or private string signifying the nature of values."
                      )
                      .required()
                      .max(128)
                      .min(1),
                    units: Joi.string()
                      .allow(null)
                      .default(null)
                      .description("Units of measure.")
                      .max(128)
                      .min(1),
                    currency: Joi.string()
                      .allow("", null)
                      .default(null)
                      .description("Currency of price payload.")
                      .min(0),
                  })
                    .description(
                      "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
                    )
                    .unknown()
                ),
              intervalPeriod: Joi.object({
                start: Joi.date().description("datetime in RFC 3339 format"),
                duration: Joi.string()
                  .allow("")
                  .default("PT0S")
                  .description("duration in ISO 8601 format")
                  .pattern(
                    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                    {}
                  )
                  .min(0),
                randomizeStart: Joi.string()
                  .allow("")
                  .default("PT0S")
                  .description("duration in ISO 8601 format")
                  .pattern(
                    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                    {}
                  )
                  .min(0),
              })
                .description(
                  'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                )
                .unknown(),
              intervals: Joi.array()
                .description("A list of interval objects.")
                .items(
                  Joi.object({
                    id: Joi.number()
                      .description(
                        "A client generated number assigned an interval object. Not a sequence number."
                      )
                      .required()
                      .integer(),
                    intervalPeriod: Joi.object({
                      start: Joi.date().description(
                        "datetime in RFC 3339 format"
                      ),
                      duration: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(
                          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                          {}
                        )
                        .min(0),
                      randomizeStart: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(
                          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                          {}
                        )
                        .min(0),
                    })
                      .description(
                        'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                      )
                      .unknown(),
                    payloads: Joi.array()
                      .description("A list of valuesMap objects.")
                      .required()
                      .items(
                        Joi.object({
                          type: Joi.string()
                            .description(
                              'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                            )
                            .required()
                            .max(128)
                            .min(1),
                          values: Joi.array()
                            .description(
                              "A list of data points. Most often a singular value such as a price."
                            )
                            .required()
                            .items(
                              Joi.alternatives()
                                .match("any")
                                .try(
                                  Joi.number(),
                                  Joi.number().integer(),
                                  Joi.string().allow("").min(0),
                                  Joi.boolean(),
                                  Joi.object({
                                    x: Joi.number()
                                      .description("A value on an x axis.")
                                      .required(),
                                    y: Joi.number()
                                      .description("A value on a y axis.")
                                      .required(),
                                  })
                                    .description(
                                      "A pair of floats typically used as a point on a 2 dimensional grid."
                                    )
                                    .unknown()
                                )
                            ),
                        })
                          .description(
                            "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                          )
                          .unknown()
                      ),
                  })
                    .description(
                      "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
                    )
                    .unknown()
                ),
            })
              .description(
                "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n"
              )
              .unknown()
          )
      ),
    eventRequest: Joi.object({
      programID: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .required()
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      eventName: Joi.string()
        .allow("", null)
        .default(null)
        .description(
          "User defined string for use in debugging or User Interface."
        )
        .min(0),
      duration: Joi.string()
        .allow("")
        .default("PT0S")
        .description("duration in ISO 8601 format")
        .pattern(
          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
          {}
        )
        .min(0),
      priority: Joi.number()
        .allow(null)
        .default(null)
        .description(
          "Relative priority of event. A lower number is a higher priority."
        )
        .integer()
        .min(0),
      targets: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of valuesMap objects.")
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
      reportDescriptors: Joi.array()
        .allow(null)
        .default(null)
        .description(
          "A list of reportDescriptor objects. Used to request reports from VEN."
        )
        .items(
          Joi.object({
            payloadType: Joi.string()
              .description(
                "Enumerated or private string signifying the nature of values."
              )
              .required()
              .max(128)
              .min(1),
            readingType: Joi.string()
              .allow(null)
              .default(null)
              .description(
                "Enumerated or private string signifying the type of reading."
              )
              .max(128)
              .min(1),
            units: Joi.string()
              .allow(null)
              .default(null)
              .description("Units of measure.")
              .max(128)
              .min(1),
            targets: Joi.array()
              .allow(null)
              .default(null)
              .description("A list of valuesMap objects.")
              .items(
                Joi.object({
                  type: Joi.string()
                    .description(
                      'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                    )
                    .required()
                    .max(128)
                    .min(1),
                  values: Joi.array()
                    .description(
                      "A list of data points. Most often a singular value such as a price."
                    )
                    .required()
                    .items(
                      Joi.alternatives()
                        .match("any")
                        .try(
                          Joi.number(),
                          Joi.number().integer(),
                          Joi.string().allow("").min(0),
                          Joi.boolean(),
                          Joi.object({
                            x: Joi.number()
                              .description("A value on an x axis.")
                              .required(),
                            y: Joi.number()
                              .description("A value on a y axis.")
                              .required(),
                          })
                            .description(
                              "A pair of floats typically used as a point on a 2 dimensional grid."
                            )
                            .unknown()
                        )
                    ),
                })
                  .description(
                    "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                  )
                  .unknown()
              ),
            aggregate: Joi.boolean()
              .default(false)
              .description(
                "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n"
              ),
            startInterval: Joi.number()
              .default(-1)
              .description(
                "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n"
              )
              .integer(),
            numIntervals: Joi.number()
              .default(-1)
              .description(
                "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n"
              )
              .integer(),
            historical: Joi.boolean()
              .default(true)
              .description(
                "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n"
              ),
            frequency: Joi.number()
              .default(-1)
              .description(
                "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n"
              )
              .integer(),
            repeat: Joi.number()
              .default(1)
              .description(
                "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n"
              )
              .integer(),
            reportIntervals: Joi.string()
              .allow("INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS")
              .default("INTERVALS")
              .description(
                "Indicates VEN report interval options. See User Guide."
              )
              .only(),
          })
            .description(
              "An object that may be used to request a report from a VEN.\n"
            )
            .unknown()
        ),
      payloadDescriptors: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of payloadDescriptor objects.")
        .items(
          Joi.object({
            objectType: Joi.string()
              .allow("EVENT_PAYLOAD_DESCRIPTOR")
              .description("Used as discriminator.")
              .only(),
            payloadType: Joi.string()
              .description(
                "Enumerated or private string signifying the nature of values."
              )
              .required()
              .max(128)
              .min(1),
            units: Joi.string()
              .allow(null)
              .default(null)
              .description("Units of measure.")
              .max(128)
              .min(1),
            currency: Joi.string()
              .allow("", null)
              .default(null)
              .description("Currency of price payload.")
              .min(0),
          })
            .description(
              "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
            )
            .unknown()
        ),
      intervalPeriod: Joi.object({
        start: Joi.date().description("datetime in RFC 3339 format"),
        duration: Joi.string()
          .allow("")
          .default("PT0S")
          .description("duration in ISO 8601 format")
          .pattern(
            /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
            {}
          )
          .min(0),
        randomizeStart: Joi.string()
          .allow("")
          .default("PT0S")
          .description("duration in ISO 8601 format")
          .pattern(
            /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
            {}
          )
          .min(0),
      })
        .description(
          'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
        )
        .unknown(),
      intervals: Joi.array()
        .description("A list of interval objects.")
        .items(
          Joi.object({
            id: Joi.number()
              .description(
                "A client generated number assigned an interval object. Not a sequence number."
              )
              .required()
              .integer(),
            intervalPeriod: Joi.object({
              start: Joi.date().description("datetime in RFC 3339 format"),
              duration: Joi.string()
                .allow("")
                .default("PT0S")
                .description("duration in ISO 8601 format")
                .pattern(
                  /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                  {}
                )
                .min(0),
              randomizeStart: Joi.string()
                .allow("")
                .default("PT0S")
                .description("duration in ISO 8601 format")
                .pattern(
                  /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                  {}
                )
                .min(0),
            })
              .description(
                'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
              )
              .unknown(),
            payloads: Joi.array()
              .description("A list of valuesMap objects.")
              .required()
              .items(
                Joi.object({
                  type: Joi.string()
                    .description(
                      'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                    )
                    .required()
                    .max(128)
                    .min(1),
                  values: Joi.array()
                    .description(
                      "A list of data points. Most often a singular value such as a price."
                    )
                    .required()
                    .items(
                      Joi.alternatives()
                        .match("any")
                        .try(
                          Joi.number(),
                          Joi.number().integer(),
                          Joi.string().allow("").min(0),
                          Joi.boolean(),
                          Joi.object({
                            x: Joi.number()
                              .description("A value on an x axis.")
                              .required(),
                            y: Joi.number()
                              .description("A value on a y axis.")
                              .required(),
                          })
                            .description(
                              "A pair of floats typically used as a point on a 2 dimensional grid."
                            )
                            .unknown()
                        )
                    ),
                })
                  .description(
                    "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                  )
                  .unknown()
              ),
          })
            .description(
              "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
            )
            .unknown()
        ),
    })
      .description(
        "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n"
      )
      .unknown(),
    subscription: Joi.alternatives()
      .match("all")
      .try(
        Joi.object()
          .description("Server provided representation of subscription")
          .unknown(),
        Joi.alternatives()
          .match("all")
          .try(
            Joi.object({
              id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              createdDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              modificationDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              objectType: Joi.string()
                .allow(
                  "PROGRAM",
                  "EVENT",
                  "REPORT",
                  "SUBSCRIPTION",
                  "VEN",
                  "RESOURCE"
                )
                .description("Types of objects addressable through API.")
                .only()
                .required(),
            })
              .description(
                "metadata common to all addressable objects. Values provided by VTN on object creation."
              )
              .unknown(),
            Joi.object({
              clientName: Joi.string()
                .description(
                  "User generated identifier, may be VEN identifier provisioned out-of-band."
                )
                .required()
                .max(128)
                .min(1),
              programID: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              objectOperations: Joi.array()
                .description("list of objects and operations to subscribe to.")
                .required()
                .items(
                  Joi.object({
                    objects: Joi.array()
                      .description("list of objects to subscribe to.")
                      .required()
                      .items(
                        Joi.string()
                          .allow(
                            "PROGRAM",
                            "EVENT",
                            "REPORT",
                            "SUBSCRIPTION",
                            "VEN",
                            "RESOURCE"
                          )
                          .description(
                            "Types of objects addressable through API."
                          )
                          .only()
                      ),
                    operations: Joi.array()
                      .description("list of operations to subscribe to.")
                      .required()
                      .items(
                        Joi.string()
                          .allow("READ", "CREATE", "UPDATE", "DELETE")
                          .description("object operation to subscribe to.")
                          .only()
                      ),
                    callbackUrl: Joi.string()
                      .description("User provided webhook URL.")
                      .required()
                      .uri({}),
                    bearerToken: Joi.string()
                      .allow("", null)
                      .default(null)
                      .description(
                        "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n"
                      )
                      .min(0),
                  })
                    .description("object type, operations, and callbackUrl.")
                    .unknown()
                ),
              targets: Joi.array()
                .allow(null)
                .default(null)
                .description(
                  "A list of valuesMap objects. Used by server to filter callbacks."
                )
                .items(
                  Joi.object({
                    type: Joi.string()
                      .description(
                        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                      )
                      .required()
                      .max(128)
                      .min(1),
                    values: Joi.array()
                      .description(
                        "A list of data points. Most often a singular value such as a price."
                      )
                      .required()
                      .items(
                        Joi.alternatives()
                          .match("any")
                          .try(
                            Joi.number(),
                            Joi.number().integer(),
                            Joi.string().allow("").min(0),
                            Joi.boolean(),
                            Joi.object({
                              x: Joi.number()
                                .description("A value on an x axis.")
                                .required(),
                              y: Joi.number()
                                .description("A value on a y axis.")
                                .required(),
                            })
                              .description(
                                "A pair of floats typically used as a point on a 2 dimensional grid."
                              )
                              .unknown()
                          )
                      ),
                  })
                    .description(
                      "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                    )
                    .unknown()
                ),
            })
              .description(
                "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n"
              )
              .unknown()
          )
      ),
    subscriptionRequest: Joi.object({
      clientName: Joi.string()
        .description(
          "User generated identifier, may be VEN identifier provisioned out-of-band."
        )
        .required()
        .max(128)
        .min(1),
      programID: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      objectOperations: Joi.array()
        .description("list of objects and operations to subscribe to.")
        .required()
        .items(
          Joi.object({
            objects: Joi.array()
              .description("list of objects to subscribe to.")
              .required()
              .items(
                Joi.string()
                  .allow(
                    "PROGRAM",
                    "EVENT",
                    "REPORT",
                    "SUBSCRIPTION",
                    "VEN",
                    "RESOURCE"
                  )
                  .description("Types of objects addressable through API.")
                  .only()
              ),
            operations: Joi.array()
              .description("list of operations to subscribe to.")
              .required()
              .items(
                Joi.string()
                  .allow("READ", "CREATE", "UPDATE", "DELETE")
                  .description("object operation to subscribe to.")
                  .only()
              ),
            callbackUrl: Joi.string()
              .description("User provided webhook URL.")
              .required()
              .uri({}),
            bearerToken: Joi.string()
              .allow("", null)
              .default(null)
              .description(
                "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n"
              )
              .min(0),
          })
            .description("object type, operations, and callbackUrl.")
            .unknown()
        ),
      targets: Joi.array()
        .allow(null)
        .default(null)
        .description(
          "A list of valuesMap objects. Used by server to filter callbacks."
        )
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
    })
      .description(
        "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n"
      )
      .unknown(),
    ven: Joi.alternatives()
      .match("all")
      .try(
        Joi.object()
          .description("Server provided representation of ven")
          .unknown(),
        Joi.alternatives()
          .match("all")
          .try(
            Joi.object({
              id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              createdDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              modificationDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              objectType: Joi.string()
                .allow(
                  "PROGRAM",
                  "EVENT",
                  "REPORT",
                  "SUBSCRIPTION",
                  "VEN",
                  "RESOURCE"
                )
                .description("Types of objects addressable through API.")
                .only()
                .required(),
            })
              .description(
                "metadata common to all addressable objects. Values provided by VTN on object creation."
              )
              .unknown(),
            Joi.object({
              venName: Joi.string()
                .description(
                  "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n"
                )
                .required()
                .max(128)
                .min(1),
              attributes: Joi.array()
                .allow(null)
                .default(null)
                .description(
                  "A list of valuesMap objects describing attributes."
                )
                .items(
                  Joi.object({
                    type: Joi.string()
                      .description(
                        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                      )
                      .required()
                      .max(128)
                      .min(1),
                    values: Joi.array()
                      .description(
                        "A list of data points. Most often a singular value such as a price."
                      )
                      .required()
                      .items(
                        Joi.alternatives()
                          .match("any")
                          .try(
                            Joi.number(),
                            Joi.number().integer(),
                            Joi.string().allow("").min(0),
                            Joi.boolean(),
                            Joi.object({
                              x: Joi.number()
                                .description("A value on an x axis.")
                                .required(),
                              y: Joi.number()
                                .description("A value on a y axis.")
                                .required(),
                            })
                              .description(
                                "A pair of floats typically used as a point on a 2 dimensional grid."
                              )
                              .unknown()
                          )
                      ),
                  })
                    .description(
                      "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                    )
                    .unknown()
                ),
              targets: Joi.array()
                .allow(null)
                .default(null)
                .description(
                  "A list of valuesMap objects describing target criteria."
                )
                .items(
                  Joi.object({
                    type: Joi.string()
                      .description(
                        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                      )
                      .required()
                      .max(128)
                      .min(1),
                    values: Joi.array()
                      .description(
                        "A list of data points. Most often a singular value such as a price."
                      )
                      .required()
                      .items(
                        Joi.alternatives()
                          .match("any")
                          .try(
                            Joi.number(),
                            Joi.number().integer(),
                            Joi.string().allow("").min(0),
                            Joi.boolean(),
                            Joi.object({
                              x: Joi.number()
                                .description("A value on an x axis.")
                                .required(),
                              y: Joi.number()
                                .description("A value on a y axis.")
                                .required(),
                            })
                              .description(
                                "A pair of floats typically used as a point on a 2 dimensional grid."
                              )
                              .unknown()
                          )
                      ),
                  })
                    .description(
                      "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                    )
                    .unknown()
                ),
              resources: Joi.array()
                .allow(null)
                .default(null)
                .description(
                  "A list of resource objects representing end-devices or systems."
                )
                .items(
                  Joi.alternatives()
                    .match("all")
                    .try(
                      Joi.object()
                        .description(
                          "Server provided representation of resource"
                        )
                        .unknown(),
                      Joi.alternatives()
                        .match("all")
                        .try(
                          Joi.object({
                            id: Joi.string()
                              .description("URL safe VTN assigned object ID.")
                              .required()
                              .pattern(/^[a-zA-Z0-9_-]*$/, {})
                              .max(128)
                              .min(1),
                            createdDateTime: Joi.date()
                              .description("datetime in RFC 3339 format")
                              .required(),
                            modificationDateTime: Joi.date()
                              .description("datetime in RFC 3339 format")
                              .required(),
                            objectType: Joi.string()
                              .allow(
                                "PROGRAM",
                                "EVENT",
                                "REPORT",
                                "SUBSCRIPTION",
                                "VEN",
                                "RESOURCE"
                              )
                              .description(
                                "Types of objects addressable through API."
                              )
                              .only()
                              .required(),
                          })
                            .description(
                              "metadata common to all addressable objects. Values provided by VTN on object creation."
                            )
                            .unknown(),
                          Joi.object({
                            resourceName: Joi.string()
                              .description(
                                "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                              )
                              .required()
                              .max(128)
                              .min(1),
                            venID: Joi.string()
                              .description("URL safe VTN assigned object ID.")
                              .pattern(/^[a-zA-Z0-9_-]*$/, {})
                              .max(128)
                              .min(1),
                            attributes: Joi.array()
                              .allow(null)
                              .default(null)
                              .description(
                                "A list of valuesMap objects describing attributes."
                              )
                              .items(
                                Joi.object({
                                  type: Joi.string()
                                    .description(
                                      'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                    )
                                    .required()
                                    .max(128)
                                    .min(1),
                                  values: Joi.array()
                                    .description(
                                      "A list of data points. Most often a singular value such as a price."
                                    )
                                    .required()
                                    .items(
                                      Joi.alternatives()
                                        .match("any")
                                        .try(
                                          Joi.number(),
                                          Joi.number().integer(),
                                          Joi.string().allow("").min(0),
                                          Joi.boolean(),
                                          Joi.object({
                                            x: Joi.number()
                                              .description(
                                                "A value on an x axis."
                                              )
                                              .required(),
                                            y: Joi.number()
                                              .description(
                                                "A value on a y axis."
                                              )
                                              .required(),
                                          })
                                            .description(
                                              "A pair of floats typically used as a point on a 2 dimensional grid."
                                            )
                                            .unknown()
                                        )
                                    ),
                                })
                                  .description(
                                    "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                                  )
                                  .unknown()
                              ),
                            targets: Joi.array()
                              .allow(null)
                              .default(null)
                              .description(
                                "A list of valuesMap objects describing target criteria."
                              )
                              .items(
                                Joi.object({
                                  type: Joi.string()
                                    .description(
                                      'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                    )
                                    .required()
                                    .max(128)
                                    .min(1),
                                  values: Joi.array()
                                    .description(
                                      "A list of data points. Most often a singular value such as a price."
                                    )
                                    .required()
                                    .items(
                                      Joi.alternatives()
                                        .match("any")
                                        .try(
                                          Joi.number(),
                                          Joi.number().integer(),
                                          Joi.string().allow("").min(0),
                                          Joi.boolean(),
                                          Joi.object({
                                            x: Joi.number()
                                              .description(
                                                "A value on an x axis."
                                              )
                                              .required(),
                                            y: Joi.number()
                                              .description(
                                                "A value on a y axis."
                                              )
                                              .required(),
                                          })
                                            .description(
                                              "A pair of floats typically used as a point on a 2 dimensional grid."
                                            )
                                            .unknown()
                                        )
                                    ),
                                })
                                  .description(
                                    "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                                  )
                                  .unknown()
                              ),
                          })
                            .description(
                              "A resource is an energy device or system subject to control by a VEN.\n"
                            )
                            .unknown()
                        )
                    )
                ),
            })
              .description("Ven represents a client with the ven role.")
              .unknown()
          )
      ),
    venRequest: Joi.object({
      venName: Joi.string()
        .description(
          "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n"
        )
        .required()
        .max(128)
        .min(1),
      attributes: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of valuesMap objects describing attributes.")
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
      targets: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of valuesMap objects describing target criteria.")
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
      resources: Joi.array()
        .allow(null)
        .default(null)
        .description(
          "A list of resource objects representing end-devices or systems."
        )
        .items(
          Joi.alternatives()
            .match("all")
            .try(
              Joi.object()
                .description("Server provided representation of resource")
                .unknown(),
              Joi.alternatives()
                .match("all")
                .try(
                  Joi.object({
                    id: Joi.string()
                      .description("URL safe VTN assigned object ID.")
                      .required()
                      .pattern(/^[a-zA-Z0-9_-]*$/, {})
                      .max(128)
                      .min(1),
                    createdDateTime: Joi.date()
                      .description("datetime in RFC 3339 format")
                      .required(),
                    modificationDateTime: Joi.date()
                      .description("datetime in RFC 3339 format")
                      .required(),
                    objectType: Joi.string()
                      .allow(
                        "PROGRAM",
                        "EVENT",
                        "REPORT",
                        "SUBSCRIPTION",
                        "VEN",
                        "RESOURCE"
                      )
                      .description("Types of objects addressable through API.")
                      .only()
                      .required(),
                  })
                    .description(
                      "metadata common to all addressable objects. Values provided by VTN on object creation."
                    )
                    .unknown(),
                  Joi.object({
                    resourceName: Joi.string()
                      .description(
                        "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                      )
                      .required()
                      .max(128)
                      .min(1),
                    venID: Joi.string()
                      .description("URL safe VTN assigned object ID.")
                      .pattern(/^[a-zA-Z0-9_-]*$/, {})
                      .max(128)
                      .min(1),
                    attributes: Joi.array()
                      .allow(null)
                      .default(null)
                      .description(
                        "A list of valuesMap objects describing attributes."
                      )
                      .items(
                        Joi.object({
                          type: Joi.string()
                            .description(
                              'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                            )
                            .required()
                            .max(128)
                            .min(1),
                          values: Joi.array()
                            .description(
                              "A list of data points. Most often a singular value such as a price."
                            )
                            .required()
                            .items(
                              Joi.alternatives()
                                .match("any")
                                .try(
                                  Joi.number(),
                                  Joi.number().integer(),
                                  Joi.string().allow("").min(0),
                                  Joi.boolean(),
                                  Joi.object({
                                    x: Joi.number()
                                      .description("A value on an x axis.")
                                      .required(),
                                    y: Joi.number()
                                      .description("A value on a y axis.")
                                      .required(),
                                  })
                                    .description(
                                      "A pair of floats typically used as a point on a 2 dimensional grid."
                                    )
                                    .unknown()
                                )
                            ),
                        })
                          .description(
                            "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                          )
                          .unknown()
                      ),
                    targets: Joi.array()
                      .allow(null)
                      .default(null)
                      .description(
                        "A list of valuesMap objects describing target criteria."
                      )
                      .items(
                        Joi.object({
                          type: Joi.string()
                            .description(
                              'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                            )
                            .required()
                            .max(128)
                            .min(1),
                          values: Joi.array()
                            .description(
                              "A list of data points. Most often a singular value such as a price."
                            )
                            .required()
                            .items(
                              Joi.alternatives()
                                .match("any")
                                .try(
                                  Joi.number(),
                                  Joi.number().integer(),
                                  Joi.string().allow("").min(0),
                                  Joi.boolean(),
                                  Joi.object({
                                    x: Joi.number()
                                      .description("A value on an x axis.")
                                      .required(),
                                    y: Joi.number()
                                      .description("A value on a y axis.")
                                      .required(),
                                  })
                                    .description(
                                      "A pair of floats typically used as a point on a 2 dimensional grid."
                                    )
                                    .unknown()
                                )
                            ),
                        })
                          .description(
                            "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                          )
                          .unknown()
                      ),
                  })
                    .description(
                      "A resource is an energy device or system subject to control by a VEN.\n"
                    )
                    .unknown()
                )
            )
        ),
    })
      .description("Ven represents a client with the ven role.")
      .unknown(),
    resource: Joi.alternatives()
      .match("all")
      .try(
        Joi.object()
          .description("Server provided representation of resource")
          .unknown(),
        Joi.alternatives()
          .match("all")
          .try(
            Joi.object({
              id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              createdDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              modificationDateTime: Joi.date()
                .description("datetime in RFC 3339 format")
                .required(),
              objectType: Joi.string()
                .allow(
                  "PROGRAM",
                  "EVENT",
                  "REPORT",
                  "SUBSCRIPTION",
                  "VEN",
                  "RESOURCE"
                )
                .description("Types of objects addressable through API.")
                .only()
                .required(),
            })
              .description(
                "metadata common to all addressable objects. Values provided by VTN on object creation."
              )
              .unknown(),
            Joi.object({
              resourceName: Joi.string()
                .description(
                  "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                )
                .required()
                .max(128)
                .min(1),
              venID: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
              attributes: Joi.array()
                .allow(null)
                .default(null)
                .description(
                  "A list of valuesMap objects describing attributes."
                )
                .items(
                  Joi.object({
                    type: Joi.string()
                      .description(
                        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                      )
                      .required()
                      .max(128)
                      .min(1),
                    values: Joi.array()
                      .description(
                        "A list of data points. Most often a singular value such as a price."
                      )
                      .required()
                      .items(
                        Joi.alternatives()
                          .match("any")
                          .try(
                            Joi.number(),
                            Joi.number().integer(),
                            Joi.string().allow("").min(0),
                            Joi.boolean(),
                            Joi.object({
                              x: Joi.number()
                                .description("A value on an x axis.")
                                .required(),
                              y: Joi.number()
                                .description("A value on a y axis.")
                                .required(),
                            })
                              .description(
                                "A pair of floats typically used as a point on a 2 dimensional grid."
                              )
                              .unknown()
                          )
                      ),
                  })
                    .description(
                      "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                    )
                    .unknown()
                ),
              targets: Joi.array()
                .allow(null)
                .default(null)
                .description(
                  "A list of valuesMap objects describing target criteria."
                )
                .items(
                  Joi.object({
                    type: Joi.string()
                      .description(
                        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                      )
                      .required()
                      .max(128)
                      .min(1),
                    values: Joi.array()
                      .description(
                        "A list of data points. Most often a singular value such as a price."
                      )
                      .required()
                      .items(
                        Joi.alternatives()
                          .match("any")
                          .try(
                            Joi.number(),
                            Joi.number().integer(),
                            Joi.string().allow("").min(0),
                            Joi.boolean(),
                            Joi.object({
                              x: Joi.number()
                                .description("A value on an x axis.")
                                .required(),
                              y: Joi.number()
                                .description("A value on a y axis.")
                                .required(),
                            })
                              .description(
                                "A pair of floats typically used as a point on a 2 dimensional grid."
                              )
                              .unknown()
                          )
                      ),
                  })
                    .description(
                      "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                    )
                    .unknown()
                ),
            })
              .description(
                "A resource is an energy device or system subject to control by a VEN.\n"
              )
              .unknown()
          )
      ),
    resourceRequest: Joi.object({
      resourceName: Joi.string()
        .description(
          "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
        )
        .required()
        .max(128)
        .min(1),
      venID: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      attributes: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of valuesMap objects describing attributes.")
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
      targets: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of valuesMap objects describing target criteria.")
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
    })
      .description(
        "A resource is an energy device or system subject to control by a VEN.\n"
      )
      .unknown(),
    objectMetadata: Joi.object({
      id: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .required()
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      createdDateTime: Joi.date()
        .description("datetime in RFC 3339 format")
        .required(),
      modificationDateTime: Joi.date()
        .description("datetime in RFC 3339 format")
        .required(),
      objectType: Joi.string()
        .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
        .description("Types of objects addressable through API.")
        .only()
        .required(),
    })
      .description(
        "metadata common to all addressable objects. Values provided by VTN on object creation."
      )
      .unknown(),
    interval: Joi.object({
      id: Joi.number()
        .description(
          "A client generated number assigned an interval object. Not a sequence number."
        )
        .required()
        .integer(),
      intervalPeriod: Joi.object({
        start: Joi.date().description("datetime in RFC 3339 format"),
        duration: Joi.string()
          .allow("")
          .default("PT0S")
          .description("duration in ISO 8601 format")
          .pattern(
            /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
            {}
          )
          .min(0),
        randomizeStart: Joi.string()
          .allow("")
          .default("PT0S")
          .description("duration in ISO 8601 format")
          .pattern(
            /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
            {}
          )
          .min(0),
      })
        .description(
          'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
        )
        .unknown(),
      payloads: Joi.array()
        .description("A list of valuesMap objects.")
        .required()
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
    })
      .description(
        "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
      )
      .unknown(),
    intervalPeriod: Joi.object({
      start: Joi.date().description("datetime in RFC 3339 format"),
      duration: Joi.string()
        .allow("")
        .default("PT0S")
        .description("duration in ISO 8601 format")
        .pattern(
          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
          {}
        )
        .min(0),
      randomizeStart: Joi.string()
        .allow("")
        .default("PT0S")
        .description("duration in ISO 8601 format")
        .pattern(
          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
          {}
        )
        .min(0),
    })
      .description(
        'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
      )
      .unknown(),
    valuesMap: Joi.object({
      type: Joi.string()
        .description(
          'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
        )
        .required()
        .max(128)
        .min(1),
      values: Joi.array()
        .description(
          "A list of data points. Most often a singular value such as a price."
        )
        .required()
        .items(
          Joi.alternatives()
            .match("any")
            .try(
              Joi.number(),
              Joi.number().integer(),
              Joi.string().allow("").min(0),
              Joi.boolean(),
              Joi.object({
                x: Joi.number().description("A value on an x axis.").required(),
                y: Joi.number().description("A value on a y axis.").required(),
              })
                .description(
                  "A pair of floats typically used as a point on a 2 dimensional grid."
                )
                .unknown()
            )
        ),
    })
      .description(
        "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
      )
      .unknown(),
    point: Joi.object({
      x: Joi.number().description("A value on an x axis.").required(),
      y: Joi.number().description("A value on a y axis.").required(),
    })
      .description(
        "A pair of floats typically used as a point on a 2 dimensional grid."
      )
      .unknown(),
    eventPayloadDescriptor: Joi.object({
      objectType: Joi.string()
        .allow("EVENT_PAYLOAD_DESCRIPTOR")
        .description("Used as discriminator.")
        .only(),
      payloadType: Joi.string()
        .description(
          "Enumerated or private string signifying the nature of values."
        )
        .required()
        .max(128)
        .min(1),
      units: Joi.string()
        .allow(null)
        .default(null)
        .description("Units of measure.")
        .max(128)
        .min(1),
      currency: Joi.string()
        .allow("", null)
        .default(null)
        .description("Currency of price payload.")
        .min(0),
    })
      .description(
        "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
      )
      .unknown(),
    reportPayloadDescriptor: Joi.object({
      objectType: Joi.string()
        .allow("REPORT_PAYLOAD_DESCRIPTOR")
        .description("Used as discriminator.")
        .only(),
      payloadType: Joi.string()
        .description(
          "Enumerated or private string signifying the nature of values."
        )
        .required()
        .max(128)
        .min(1),
      readingType: Joi.string()
        .allow(null)
        .default(null)
        .description(
          "Enumerated or private string signifying the type of reading."
        )
        .max(128)
        .min(1),
      units: Joi.string()
        .allow(null)
        .default(null)
        .description("Units of measure.")
        .max(128)
        .min(1),
      accuracy: Joi.number()
        .allow(null)
        .default(null)
        .description(
          "A quantification of the accuracy of a set of payload values."
        ),
      confidence: Joi.number()
        .allow(null)
        .default(null)
        .description(
          "A quantification of the confidence in a set of payload values."
        )
        .integer()
        .max(100)
        .min(0),
    })
      .description(
        "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
      )
      .unknown(),
    reportDescriptor: Joi.object({
      payloadType: Joi.string()
        .description(
          "Enumerated or private string signifying the nature of values."
        )
        .required()
        .max(128)
        .min(1),
      readingType: Joi.string()
        .allow(null)
        .default(null)
        .description(
          "Enumerated or private string signifying the type of reading."
        )
        .max(128)
        .min(1),
      units: Joi.string()
        .allow(null)
        .default(null)
        .description("Units of measure.")
        .max(128)
        .min(1),
      targets: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of valuesMap objects.")
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
      aggregate: Joi.boolean()
        .default(false)
        .description(
          "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n"
        ),
      startInterval: Joi.number()
        .default(-1)
        .description(
          "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n"
        )
        .integer(),
      numIntervals: Joi.number()
        .default(-1)
        .description(
          "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n"
        )
        .integer(),
      historical: Joi.boolean()
        .default(true)
        .description(
          "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n"
        ),
      frequency: Joi.number()
        .default(-1)
        .description(
          "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n"
        )
        .integer(),
      repeat: Joi.number()
        .default(1)
        .description(
          "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n"
        )
        .integer(),
      reportIntervals: Joi.string()
        .allow("INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS")
        .default("INTERVALS")
        .description("Indicates VEN report interval options. See User Guide.")
        .only(),
    })
      .description(
        "An object that may be used to request a report from a VEN.\n"
      )
      .unknown(),
    objectID: Joi.string()
      .description("URL safe VTN assigned object ID.")
      .pattern(/^[a-zA-Z0-9_-]*$/, {})
      .max(128)
      .min(1),
    venName: Joi.string()
      .description(
        "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n"
      )
      .max(128)
      .min(1),
    clientName: Joi.string()
      .description(
        "User generated identifier, may be VEN identifier provisioned out-of-band."
      )
      .max(128)
      .min(1),
    targetType: Joi.string().max(128).min(1),
    targetValue: Joi.string().max(128).min(1),
    resourceName: Joi.string()
      .description(
        "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
      )
      .max(128)
      .min(1),
    units: Joi.string()
      .allow(null)
      .default(null)
      .description("Units of measure.")
      .max(128)
      .min(1),
    readingType: Joi.string()
      .allow(null)
      .default(null)
      .description(
        "Enumerated or private string signifying the type of reading."
      )
      .max(128)
      .min(1),
    notification: Joi.object({
      objectType: Joi.string()
        .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
        .description("Types of objects addressable through API.")
        .only()
        .required(),
      operation: Joi.string()
        .allow("CREATE", "READ", "UPDATE", "DELETE")
        .description(
          "the operation on on object that triggered the notification."
        )
        .only()
        .required(),
      object: Joi.alternatives()
        .match("all")
        .try(
          Joi.object()
            .description("the object that is the subject of the notification.")
            .unknown(),
          Joi.alternatives()
            .match("one")
            .try(
              Joi.alternatives()
                .match("all")
                .try(
                  Joi.object()
                    .description("Server provided representation of program")
                    .unknown(),
                  Joi.alternatives()
                    .match("all")
                    .try(
                      Joi.object({
                        id: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .required()
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        createdDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        modificationDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        objectType: Joi.string()
                          .allow(
                            "PROGRAM",
                            "EVENT",
                            "REPORT",
                            "SUBSCRIPTION",
                            "VEN",
                            "RESOURCE"
                          )
                          .description(
                            "Types of objects addressable through API."
                          )
                          .only()
                          .required(),
                      })
                        .description(
                          "metadata common to all addressable objects. Values provided by VTN on object creation."
                        )
                        .unknown(),
                      Joi.object({
                        programName: Joi.string()
                          .description(
                            "Short name to uniquely identify program."
                          )
                          .required()
                          .max(128)
                          .min(1),
                        programLongName: Joi.string()
                          .allow("", null)
                          .default(null)
                          .description(
                            "Long name of program for human readability."
                          )
                          .min(0),
                        retailerName: Joi.string()
                          .allow("", null)
                          .default(null)
                          .description(
                            "Short name of energy retailer providing the program."
                          )
                          .min(0),
                        retailerLongName: Joi.string()
                          .allow("", null)
                          .default(null)
                          .description(
                            "Long name of energy retailer for human readability."
                          )
                          .min(0),
                        programType: Joi.string()
                          .allow("", null)
                          .default(null)
                          .description("A program defined categorization.")
                          .min(0),
                        country: Joi.string()
                          .allow("", null)
                          .default(null)
                          .description("Alpha-2 code per ISO 3166-1.")
                          .min(0),
                        principalSubdivision: Joi.string()
                          .allow("", null)
                          .default(null)
                          .description(
                            "Coding per ISO 3166-2. E.g. state in US."
                          )
                          .min(0),
                        intervalPeriod: Joi.object({
                          start: Joi.date().description(
                            "datetime in RFC 3339 format"
                          ),
                          duration: Joi.string()
                            .allow("")
                            .default("PT0S")
                            .description("duration in ISO 8601 format")
                            .pattern(
                              /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                              {}
                            )
                            .min(0),
                          randomizeStart: Joi.string()
                            .allow("")
                            .default("PT0S")
                            .description("duration in ISO 8601 format")
                            .pattern(
                              /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                              {}
                            )
                            .min(0),
                        })
                          .description(
                            'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                          )
                          .unknown(),
                        programDescriptions: Joi.array()
                          .allow(null)
                          .default(null)
                          .description("A list of programDescriptions")
                          .items(
                            Joi.object({
                              URL: Joi.string()
                                .description(
                                  "A human or machine readable program description"
                                )
                                .required()
                                .uri({}),
                            }).unknown()
                          ),
                        bindingEvents: Joi.boolean()
                          .allow(null)
                          .default(null)
                          .description(
                            "True if events are fixed once transmitted."
                          ),
                        localPrice: Joi.boolean()
                          .allow(null)
                          .default(null)
                          .description(
                            "True if events have been adapted from a grid event."
                          ),
                        payloadDescriptors: Joi.array()
                          .allow(null)
                          .default(null)
                          .description("A list of payloadDescriptors.")
                          .items(
                            Joi.alternatives()
                              .match("any")
                              .try(
                                Joi.object({
                                  objectType: Joi.string()
                                    .allow("EVENT_PAYLOAD_DESCRIPTOR")
                                    .description("Used as discriminator.")
                                    .only(),
                                  payloadType: Joi.string()
                                    .description(
                                      "Enumerated or private string signifying the nature of values."
                                    )
                                    .required()
                                    .max(128)
                                    .min(1),
                                  units: Joi.string()
                                    .allow(null)
                                    .default(null)
                                    .description("Units of measure.")
                                    .max(128)
                                    .min(1),
                                  currency: Joi.string()
                                    .allow("", null)
                                    .default(null)
                                    .description("Currency of price payload.")
                                    .min(0),
                                })
                                  .description(
                                    "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
                                  )
                                  .unknown(),
                                Joi.object({
                                  objectType: Joi.string()
                                    .allow("REPORT_PAYLOAD_DESCRIPTOR")
                                    .description("Used as discriminator.")
                                    .only(),
                                  payloadType: Joi.string()
                                    .description(
                                      "Enumerated or private string signifying the nature of values."
                                    )
                                    .required()
                                    .max(128)
                                    .min(1),
                                  readingType: Joi.string()
                                    .allow(null)
                                    .default(null)
                                    .description(
                                      "Enumerated or private string signifying the type of reading."
                                    )
                                    .max(128)
                                    .min(1),
                                  units: Joi.string()
                                    .allow(null)
                                    .default(null)
                                    .description("Units of measure.")
                                    .max(128)
                                    .min(1),
                                  accuracy: Joi.number()
                                    .allow(null)
                                    .default(null)
                                    .description(
                                      "A quantification of the accuracy of a set of payload values."
                                    ),
                                  confidence: Joi.number()
                                    .allow(null)
                                    .default(null)
                                    .description(
                                      "A quantification of the confidence in a set of payload values."
                                    )
                                    .integer()
                                    .max(100)
                                    .min(0),
                                })
                                  .description(
                                    "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
                                  )
                                  .unknown()
                              )
                          ),
                        targets: Joi.array()
                          .allow(null)
                          .default(null)
                          .description("A list of valuesMap objects.")
                          .items(
                            Joi.object({
                              type: Joi.string()
                                .description(
                                  'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                )
                                .required()
                                .max(128)
                                .min(1),
                              values: Joi.array()
                                .description(
                                  "A list of data points. Most often a singular value such as a price."
                                )
                                .required()
                                .items(
                                  Joi.alternatives()
                                    .match("any")
                                    .try(
                                      Joi.number(),
                                      Joi.number().integer(),
                                      Joi.string().allow("").min(0),
                                      Joi.boolean(),
                                      Joi.object({
                                        x: Joi.number()
                                          .description("A value on an x axis.")
                                          .required(),
                                        y: Joi.number()
                                          .description("A value on a y axis.")
                                          .required(),
                                      })
                                        .description(
                                          "A pair of floats typically used as a point on a 2 dimensional grid."
                                        )
                                        .unknown()
                                    )
                                ),
                            })
                              .description(
                                "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                              )
                              .unknown()
                          ),
                      })
                        .description("Client provided description of program")
                        .unknown()
                    )
                ),
              Joi.alternatives()
                .match("all")
                .try(
                  Joi.object()
                    .description("Server provided representation of report")
                    .unknown(),
                  Joi.alternatives()
                    .match("all")
                    .try(
                      Joi.object({
                        id: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .required()
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        createdDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        modificationDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        objectType: Joi.string()
                          .allow(
                            "PROGRAM",
                            "EVENT",
                            "REPORT",
                            "SUBSCRIPTION",
                            "VEN",
                            "RESOURCE"
                          )
                          .description(
                            "Types of objects addressable through API."
                          )
                          .only()
                          .required(),
                      })
                        .description(
                          "metadata common to all addressable objects. Values provided by VTN on object creation."
                        )
                        .unknown(),
                      Joi.object({
                        eventID: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .required()
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        clientName: Joi.string()
                          .description(
                            "User generated identifier, may be VEN identifier provisioned out-of-band."
                          )
                          .required()
                          .max(128)
                          .min(1),
                        reportName: Joi.string()
                          .allow("", null)
                          .default(null)
                          .description(
                            "User defined string for use in debugging or User Interface."
                          )
                          .min(0),
                        payloadDescriptors: Joi.array()
                          .allow(null)
                          .default(null)
                          .description("A list of reportPayloadDescriptors.")
                          .items(
                            Joi.object({
                              objectType: Joi.string()
                                .allow("REPORT_PAYLOAD_DESCRIPTOR")
                                .description("Used as discriminator.")
                                .only(),
                              payloadType: Joi.string()
                                .description(
                                  "Enumerated or private string signifying the nature of values."
                                )
                                .required()
                                .max(128)
                                .min(1),
                              readingType: Joi.string()
                                .allow(null)
                                .default(null)
                                .description(
                                  "Enumerated or private string signifying the type of reading."
                                )
                                .max(128)
                                .min(1),
                              units: Joi.string()
                                .allow(null)
                                .default(null)
                                .description("Units of measure.")
                                .max(128)
                                .min(1),
                              accuracy: Joi.number()
                                .allow(null)
                                .default(null)
                                .description(
                                  "A quantification of the accuracy of a set of payload values."
                                ),
                              confidence: Joi.number()
                                .allow(null)
                                .default(null)
                                .description(
                                  "A quantification of the confidence in a set of payload values."
                                )
                                .integer()
                                .max(100)
                                .min(0),
                            })
                              .description(
                                "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
                              )
                              .unknown()
                          ),
                        resources: Joi.array()
                          .description(
                            "A list of objects containing report data for a set of resources."
                          )
                          .required()
                          .items(
                            Joi.object({
                              resourceName: Joi.string()
                                .description(
                                  "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                                )
                                .required()
                                .max(128)
                                .min(1),
                              intervalPeriod: Joi.object({
                                start: Joi.date().description(
                                  "datetime in RFC 3339 format"
                                ),
                                duration: Joi.string()
                                  .allow("")
                                  .default("PT0S")
                                  .description("duration in ISO 8601 format")
                                  .pattern(
                                    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                                    {}
                                  )
                                  .min(0),
                                randomizeStart: Joi.string()
                                  .allow("")
                                  .default("PT0S")
                                  .description("duration in ISO 8601 format")
                                  .pattern(
                                    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                                    {}
                                  )
                                  .min(0),
                              })
                                .description(
                                  'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                                )
                                .unknown(),
                              intervals: Joi.array()
                                .description("A list of interval objects.")
                                .required()
                                .items(
                                  Joi.object({
                                    id: Joi.number()
                                      .description(
                                        "A client generated number assigned an interval object. Not a sequence number."
                                      )
                                      .required()
                                      .integer(),
                                    intervalPeriod: Joi.object({
                                      start: Joi.date().description(
                                        "datetime in RFC 3339 format"
                                      ),
                                      duration: Joi.string()
                                        .allow("")
                                        .default("PT0S")
                                        .description(
                                          "duration in ISO 8601 format"
                                        )
                                        .pattern(
                                          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                                          {}
                                        )
                                        .min(0),
                                      randomizeStart: Joi.string()
                                        .allow("")
                                        .default("PT0S")
                                        .description(
                                          "duration in ISO 8601 format"
                                        )
                                        .pattern(
                                          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                                          {}
                                        )
                                        .min(0),
                                    })
                                      .description(
                                        'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                                      )
                                      .unknown(),
                                    payloads: Joi.array()
                                      .description(
                                        "A list of valuesMap objects."
                                      )
                                      .required()
                                      .items(
                                        Joi.object({
                                          type: Joi.string()
                                            .description(
                                              'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                            )
                                            .required()
                                            .max(128)
                                            .min(1),
                                          values: Joi.array()
                                            .description(
                                              "A list of data points. Most often a singular value such as a price."
                                            )
                                            .required()
                                            .items(
                                              Joi.alternatives()
                                                .match("any")
                                                .try(
                                                  Joi.number(),
                                                  Joi.number().integer(),
                                                  Joi.string().allow("").min(0),
                                                  Joi.boolean(),
                                                  Joi.object({
                                                    x: Joi.number()
                                                      .description(
                                                        "A value on an x axis."
                                                      )
                                                      .required(),
                                                    y: Joi.number()
                                                      .description(
                                                        "A value on a y axis."
                                                      )
                                                      .required(),
                                                  })
                                                    .description(
                                                      "A pair of floats typically used as a point on a 2 dimensional grid."
                                                    )
                                                    .unknown()
                                                )
                                            ),
                                        })
                                          .description(
                                            "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                                          )
                                          .unknown()
                                      ),
                                  })
                                    .description(
                                      "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
                                    )
                                    .unknown()
                                ),
                            })
                              .description(
                                "Report data associated with a resource."
                              )
                              .unknown()
                          ),
                      })
                        .description("report object.")
                        .unknown()
                    )
                ),
              Joi.alternatives()
                .match("all")
                .try(
                  Joi.object()
                    .description("Server provided representation of event")
                    .unknown(),
                  Joi.alternatives()
                    .match("all")
                    .try(
                      Joi.object({
                        id: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .required()
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        createdDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        modificationDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        objectType: Joi.string()
                          .allow(
                            "PROGRAM",
                            "EVENT",
                            "REPORT",
                            "SUBSCRIPTION",
                            "VEN",
                            "RESOURCE"
                          )
                          .description(
                            "Types of objects addressable through API."
                          )
                          .only()
                          .required(),
                      })
                        .description(
                          "metadata common to all addressable objects. Values provided by VTN on object creation."
                        )
                        .unknown(),
                      Joi.object({
                        programID: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .required()
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        eventName: Joi.string()
                          .allow("", null)
                          .default(null)
                          .description(
                            "User defined string for use in debugging or User Interface."
                          )
                          .min(0),
                        duration: Joi.string()
                          .allow("")
                          .default("PT0S")
                          .description("duration in ISO 8601 format")
                          .pattern(
                            /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                            {}
                          )
                          .min(0),
                        priority: Joi.number()
                          .allow(null)
                          .default(null)
                          .description(
                            "Relative priority of event. A lower number is a higher priority."
                          )
                          .integer()
                          .min(0),
                        targets: Joi.array()
                          .allow(null)
                          .default(null)
                          .description("A list of valuesMap objects.")
                          .items(
                            Joi.object({
                              type: Joi.string()
                                .description(
                                  'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                )
                                .required()
                                .max(128)
                                .min(1),
                              values: Joi.array()
                                .description(
                                  "A list of data points. Most often a singular value such as a price."
                                )
                                .required()
                                .items(
                                  Joi.alternatives()
                                    .match("any")
                                    .try(
                                      Joi.number(),
                                      Joi.number().integer(),
                                      Joi.string().allow("").min(0),
                                      Joi.boolean(),
                                      Joi.object({
                                        x: Joi.number()
                                          .description("A value on an x axis.")
                                          .required(),
                                        y: Joi.number()
                                          .description("A value on a y axis.")
                                          .required(),
                                      })
                                        .description(
                                          "A pair of floats typically used as a point on a 2 dimensional grid."
                                        )
                                        .unknown()
                                    )
                                ),
                            })
                              .description(
                                "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                              )
                              .unknown()
                          ),
                        reportDescriptors: Joi.array()
                          .allow(null)
                          .default(null)
                          .description(
                            "A list of reportDescriptor objects. Used to request reports from VEN."
                          )
                          .items(
                            Joi.object({
                              payloadType: Joi.string()
                                .description(
                                  "Enumerated or private string signifying the nature of values."
                                )
                                .required()
                                .max(128)
                                .min(1),
                              readingType: Joi.string()
                                .allow(null)
                                .default(null)
                                .description(
                                  "Enumerated or private string signifying the type of reading."
                                )
                                .max(128)
                                .min(1),
                              units: Joi.string()
                                .allow(null)
                                .default(null)
                                .description("Units of measure.")
                                .max(128)
                                .min(1),
                              targets: Joi.array()
                                .allow(null)
                                .default(null)
                                .description("A list of valuesMap objects.")
                                .items(
                                  Joi.object({
                                    type: Joi.string()
                                      .description(
                                        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                      )
                                      .required()
                                      .max(128)
                                      .min(1),
                                    values: Joi.array()
                                      .description(
                                        "A list of data points. Most often a singular value such as a price."
                                      )
                                      .required()
                                      .items(
                                        Joi.alternatives()
                                          .match("any")
                                          .try(
                                            Joi.number(),
                                            Joi.number().integer(),
                                            Joi.string().allow("").min(0),
                                            Joi.boolean(),
                                            Joi.object({
                                              x: Joi.number()
                                                .description(
                                                  "A value on an x axis."
                                                )
                                                .required(),
                                              y: Joi.number()
                                                .description(
                                                  "A value on a y axis."
                                                )
                                                .required(),
                                            })
                                              .description(
                                                "A pair of floats typically used as a point on a 2 dimensional grid."
                                              )
                                              .unknown()
                                          )
                                      ),
                                  })
                                    .description(
                                      "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                                    )
                                    .unknown()
                                ),
                              aggregate: Joi.boolean()
                                .default(false)
                                .description(
                                  "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n"
                                ),
                              startInterval: Joi.number()
                                .default(-1)
                                .description(
                                  "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n"
                                )
                                .integer(),
                              numIntervals: Joi.number()
                                .default(-1)
                                .description(
                                  "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n"
                                )
                                .integer(),
                              historical: Joi.boolean()
                                .default(true)
                                .description(
                                  "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n"
                                ),
                              frequency: Joi.number()
                                .default(-1)
                                .description(
                                  "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n"
                                )
                                .integer(),
                              repeat: Joi.number()
                                .default(1)
                                .description(
                                  "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n"
                                )
                                .integer(),
                              reportIntervals: Joi.string()
                                .allow(
                                  "INTERVALS",
                                  "SUB_INTERVALS",
                                  "OPEN_INTERVALS"
                                )
                                .default("INTERVALS")
                                .description(
                                  "Indicates VEN report interval options. See User Guide."
                                )
                                .only(),
                            })
                              .description(
                                "An object that may be used to request a report from a VEN.\n"
                              )
                              .unknown()
                          ),
                        payloadDescriptors: Joi.array()
                          .allow(null)
                          .default(null)
                          .description("A list of payloadDescriptor objects.")
                          .items(
                            Joi.object({
                              objectType: Joi.string()
                                .allow("EVENT_PAYLOAD_DESCRIPTOR")
                                .description("Used as discriminator.")
                                .only(),
                              payloadType: Joi.string()
                                .description(
                                  "Enumerated or private string signifying the nature of values."
                                )
                                .required()
                                .max(128)
                                .min(1),
                              units: Joi.string()
                                .allow(null)
                                .default(null)
                                .description("Units of measure.")
                                .max(128)
                                .min(1),
                              currency: Joi.string()
                                .allow("", null)
                                .default(null)
                                .description("Currency of price payload.")
                                .min(0),
                            })
                              .description(
                                "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
                              )
                              .unknown()
                          ),
                        intervalPeriod: Joi.object({
                          start: Joi.date().description(
                            "datetime in RFC 3339 format"
                          ),
                          duration: Joi.string()
                            .allow("")
                            .default("PT0S")
                            .description("duration in ISO 8601 format")
                            .pattern(
                              /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                              {}
                            )
                            .min(0),
                          randomizeStart: Joi.string()
                            .allow("")
                            .default("PT0S")
                            .description("duration in ISO 8601 format")
                            .pattern(
                              /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                              {}
                            )
                            .min(0),
                        })
                          .description(
                            'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                          )
                          .unknown(),
                        intervals: Joi.array()
                          .description("A list of interval objects.")
                          .items(
                            Joi.object({
                              id: Joi.number()
                                .description(
                                  "A client generated number assigned an interval object. Not a sequence number."
                                )
                                .required()
                                .integer(),
                              intervalPeriod: Joi.object({
                                start: Joi.date().description(
                                  "datetime in RFC 3339 format"
                                ),
                                duration: Joi.string()
                                  .allow("")
                                  .default("PT0S")
                                  .description("duration in ISO 8601 format")
                                  .pattern(
                                    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                                    {}
                                  )
                                  .min(0),
                                randomizeStart: Joi.string()
                                  .allow("")
                                  .default("PT0S")
                                  .description("duration in ISO 8601 format")
                                  .pattern(
                                    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                                    {}
                                  )
                                  .min(0),
                              })
                                .description(
                                  'Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n'
                                )
                                .unknown(),
                              payloads: Joi.array()
                                .description("A list of valuesMap objects.")
                                .required()
                                .items(
                                  Joi.object({
                                    type: Joi.string()
                                      .description(
                                        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                      )
                                      .required()
                                      .max(128)
                                      .min(1),
                                    values: Joi.array()
                                      .description(
                                        "A list of data points. Most often a singular value such as a price."
                                      )
                                      .required()
                                      .items(
                                        Joi.alternatives()
                                          .match("any")
                                          .try(
                                            Joi.number(),
                                            Joi.number().integer(),
                                            Joi.string().allow("").min(0),
                                            Joi.boolean(),
                                            Joi.object({
                                              x: Joi.number()
                                                .description(
                                                  "A value on an x axis."
                                                )
                                                .required(),
                                              y: Joi.number()
                                                .description(
                                                  "A value on a y axis."
                                                )
                                                .required(),
                                            })
                                              .description(
                                                "A pair of floats typically used as a point on a 2 dimensional grid."
                                              )
                                              .unknown()
                                          )
                                      ),
                                  })
                                    .description(
                                      "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                                    )
                                    .unknown()
                                ),
                            })
                              .description(
                                "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
                              )
                              .unknown()
                          ),
                      })
                        .description(
                          "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n"
                        )
                        .unknown()
                    )
                ),
              Joi.alternatives()
                .match("all")
                .try(
                  Joi.object()
                    .description(
                      "Server provided representation of subscription"
                    )
                    .unknown(),
                  Joi.alternatives()
                    .match("all")
                    .try(
                      Joi.object({
                        id: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .required()
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        createdDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        modificationDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        objectType: Joi.string()
                          .allow(
                            "PROGRAM",
                            "EVENT",
                            "REPORT",
                            "SUBSCRIPTION",
                            "VEN",
                            "RESOURCE"
                          )
                          .description(
                            "Types of objects addressable through API."
                          )
                          .only()
                          .required(),
                      })
                        .description(
                          "metadata common to all addressable objects. Values provided by VTN on object creation."
                        )
                        .unknown(),
                      Joi.object({
                        clientName: Joi.string()
                          .description(
                            "User generated identifier, may be VEN identifier provisioned out-of-band."
                          )
                          .required()
                          .max(128)
                          .min(1),
                        programID: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        objectOperations: Joi.array()
                          .description(
                            "list of objects and operations to subscribe to."
                          )
                          .required()
                          .items(
                            Joi.object({
                              objects: Joi.array()
                                .description("list of objects to subscribe to.")
                                .required()
                                .items(
                                  Joi.string()
                                    .allow(
                                      "PROGRAM",
                                      "EVENT",
                                      "REPORT",
                                      "SUBSCRIPTION",
                                      "VEN",
                                      "RESOURCE"
                                    )
                                    .description(
                                      "Types of objects addressable through API."
                                    )
                                    .only()
                                ),
                              operations: Joi.array()
                                .description(
                                  "list of operations to subscribe to."
                                )
                                .required()
                                .items(
                                  Joi.string()
                                    .allow("READ", "CREATE", "UPDATE", "DELETE")
                                    .description(
                                      "object operation to subscribe to."
                                    )
                                    .only()
                                ),
                              callbackUrl: Joi.string()
                                .description("User provided webhook URL.")
                                .required()
                                .uri({}),
                              bearerToken: Joi.string()
                                .allow("", null)
                                .default(null)
                                .description(
                                  "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n"
                                )
                                .min(0),
                            })
                              .description(
                                "object type, operations, and callbackUrl."
                              )
                              .unknown()
                          ),
                        targets: Joi.array()
                          .allow(null)
                          .default(null)
                          .description(
                            "A list of valuesMap objects. Used by server to filter callbacks."
                          )
                          .items(
                            Joi.object({
                              type: Joi.string()
                                .description(
                                  'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                )
                                .required()
                                .max(128)
                                .min(1),
                              values: Joi.array()
                                .description(
                                  "A list of data points. Most often a singular value such as a price."
                                )
                                .required()
                                .items(
                                  Joi.alternatives()
                                    .match("any")
                                    .try(
                                      Joi.number(),
                                      Joi.number().integer(),
                                      Joi.string().allow("").min(0),
                                      Joi.boolean(),
                                      Joi.object({
                                        x: Joi.number()
                                          .description("A value on an x axis.")
                                          .required(),
                                        y: Joi.number()
                                          .description("A value on a y axis.")
                                          .required(),
                                      })
                                        .description(
                                          "A pair of floats typically used as a point on a 2 dimensional grid."
                                        )
                                        .unknown()
                                    )
                                ),
                            })
                              .description(
                                "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                              )
                              .unknown()
                          ),
                      })
                        .description(
                          "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n"
                        )
                        .unknown()
                    )
                ),
              Joi.alternatives()
                .match("all")
                .try(
                  Joi.object()
                    .description("Server provided representation of ven")
                    .unknown(),
                  Joi.alternatives()
                    .match("all")
                    .try(
                      Joi.object({
                        id: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .required()
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        createdDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        modificationDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        objectType: Joi.string()
                          .allow(
                            "PROGRAM",
                            "EVENT",
                            "REPORT",
                            "SUBSCRIPTION",
                            "VEN",
                            "RESOURCE"
                          )
                          .description(
                            "Types of objects addressable through API."
                          )
                          .only()
                          .required(),
                      })
                        .description(
                          "metadata common to all addressable objects. Values provided by VTN on object creation."
                        )
                        .unknown(),
                      Joi.object({
                        venName: Joi.string()
                          .description(
                            "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n"
                          )
                          .required()
                          .max(128)
                          .min(1),
                        attributes: Joi.array()
                          .allow(null)
                          .default(null)
                          .description(
                            "A list of valuesMap objects describing attributes."
                          )
                          .items(
                            Joi.object({
                              type: Joi.string()
                                .description(
                                  'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                )
                                .required()
                                .max(128)
                                .min(1),
                              values: Joi.array()
                                .description(
                                  "A list of data points. Most often a singular value such as a price."
                                )
                                .required()
                                .items(
                                  Joi.alternatives()
                                    .match("any")
                                    .try(
                                      Joi.number(),
                                      Joi.number().integer(),
                                      Joi.string().allow("").min(0),
                                      Joi.boolean(),
                                      Joi.object({
                                        x: Joi.number()
                                          .description("A value on an x axis.")
                                          .required(),
                                        y: Joi.number()
                                          .description("A value on a y axis.")
                                          .required(),
                                      })
                                        .description(
                                          "A pair of floats typically used as a point on a 2 dimensional grid."
                                        )
                                        .unknown()
                                    )
                                ),
                            })
                              .description(
                                "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                              )
                              .unknown()
                          ),
                        targets: Joi.array()
                          .allow(null)
                          .default(null)
                          .description(
                            "A list of valuesMap objects describing target criteria."
                          )
                          .items(
                            Joi.object({
                              type: Joi.string()
                                .description(
                                  'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                )
                                .required()
                                .max(128)
                                .min(1),
                              values: Joi.array()
                                .description(
                                  "A list of data points. Most often a singular value such as a price."
                                )
                                .required()
                                .items(
                                  Joi.alternatives()
                                    .match("any")
                                    .try(
                                      Joi.number(),
                                      Joi.number().integer(),
                                      Joi.string().allow("").min(0),
                                      Joi.boolean(),
                                      Joi.object({
                                        x: Joi.number()
                                          .description("A value on an x axis.")
                                          .required(),
                                        y: Joi.number()
                                          .description("A value on a y axis.")
                                          .required(),
                                      })
                                        .description(
                                          "A pair of floats typically used as a point on a 2 dimensional grid."
                                        )
                                        .unknown()
                                    )
                                ),
                            })
                              .description(
                                "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                              )
                              .unknown()
                          ),
                        resources: Joi.array()
                          .allow(null)
                          .default(null)
                          .description(
                            "A list of resource objects representing end-devices or systems."
                          )
                          .items(
                            Joi.alternatives()
                              .match("all")
                              .try(
                                Joi.object()
                                  .description(
                                    "Server provided representation of resource"
                                  )
                                  .unknown(),
                                Joi.alternatives()
                                  .match("all")
                                  .try(
                                    Joi.object({
                                      id: Joi.string()
                                        .description(
                                          "URL safe VTN assigned object ID."
                                        )
                                        .required()
                                        .pattern(/^[a-zA-Z0-9_-]*$/, {})
                                        .max(128)
                                        .min(1),
                                      createdDateTime: Joi.date()
                                        .description(
                                          "datetime in RFC 3339 format"
                                        )
                                        .required(),
                                      modificationDateTime: Joi.date()
                                        .description(
                                          "datetime in RFC 3339 format"
                                        )
                                        .required(),
                                      objectType: Joi.string()
                                        .allow(
                                          "PROGRAM",
                                          "EVENT",
                                          "REPORT",
                                          "SUBSCRIPTION",
                                          "VEN",
                                          "RESOURCE"
                                        )
                                        .description(
                                          "Types of objects addressable through API."
                                        )
                                        .only()
                                        .required(),
                                    })
                                      .description(
                                        "metadata common to all addressable objects. Values provided by VTN on object creation."
                                      )
                                      .unknown(),
                                    Joi.object({
                                      resourceName: Joi.string()
                                        .description(
                                          "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                                        )
                                        .required()
                                        .max(128)
                                        .min(1),
                                      venID: Joi.string()
                                        .description(
                                          "URL safe VTN assigned object ID."
                                        )
                                        .pattern(/^[a-zA-Z0-9_-]*$/, {})
                                        .max(128)
                                        .min(1),
                                      attributes: Joi.array()
                                        .allow(null)
                                        .default(null)
                                        .description(
                                          "A list of valuesMap objects describing attributes."
                                        )
                                        .items(
                                          Joi.object({
                                            type: Joi.string()
                                              .description(
                                                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                              )
                                              .required()
                                              .max(128)
                                              .min(1),
                                            values: Joi.array()
                                              .description(
                                                "A list of data points. Most often a singular value such as a price."
                                              )
                                              .required()
                                              .items(
                                                Joi.alternatives()
                                                  .match("any")
                                                  .try(
                                                    Joi.number(),
                                                    Joi.number().integer(),
                                                    Joi.string()
                                                      .allow("")
                                                      .min(0),
                                                    Joi.boolean(),
                                                    Joi.object({
                                                      x: Joi.number()
                                                        .description(
                                                          "A value on an x axis."
                                                        )
                                                        .required(),
                                                      y: Joi.number()
                                                        .description(
                                                          "A value on a y axis."
                                                        )
                                                        .required(),
                                                    })
                                                      .description(
                                                        "A pair of floats typically used as a point on a 2 dimensional grid."
                                                      )
                                                      .unknown()
                                                  )
                                              ),
                                          })
                                            .description(
                                              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                                            )
                                            .unknown()
                                        ),
                                      targets: Joi.array()
                                        .allow(null)
                                        .default(null)
                                        .description(
                                          "A list of valuesMap objects describing target criteria."
                                        )
                                        .items(
                                          Joi.object({
                                            type: Joi.string()
                                              .description(
                                                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                              )
                                              .required()
                                              .max(128)
                                              .min(1),
                                            values: Joi.array()
                                              .description(
                                                "A list of data points. Most often a singular value such as a price."
                                              )
                                              .required()
                                              .items(
                                                Joi.alternatives()
                                                  .match("any")
                                                  .try(
                                                    Joi.number(),
                                                    Joi.number().integer(),
                                                    Joi.string()
                                                      .allow("")
                                                      .min(0),
                                                    Joi.boolean(),
                                                    Joi.object({
                                                      x: Joi.number()
                                                        .description(
                                                          "A value on an x axis."
                                                        )
                                                        .required(),
                                                      y: Joi.number()
                                                        .description(
                                                          "A value on a y axis."
                                                        )
                                                        .required(),
                                                    })
                                                      .description(
                                                        "A pair of floats typically used as a point on a 2 dimensional grid."
                                                      )
                                                      .unknown()
                                                  )
                                              ),
                                          })
                                            .description(
                                              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                                            )
                                            .unknown()
                                        ),
                                    })
                                      .description(
                                        "A resource is an energy device or system subject to control by a VEN.\n"
                                      )
                                      .unknown()
                                  )
                              )
                          ),
                      })
                        .description(
                          "Ven represents a client with the ven role."
                        )
                        .unknown()
                    )
                ),
              Joi.alternatives()
                .match("all")
                .try(
                  Joi.object()
                    .description("Server provided representation of resource")
                    .unknown(),
                  Joi.alternatives()
                    .match("all")
                    .try(
                      Joi.object({
                        id: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .required()
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        createdDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        modificationDateTime: Joi.date()
                          .description("datetime in RFC 3339 format")
                          .required(),
                        objectType: Joi.string()
                          .allow(
                            "PROGRAM",
                            "EVENT",
                            "REPORT",
                            "SUBSCRIPTION",
                            "VEN",
                            "RESOURCE"
                          )
                          .description(
                            "Types of objects addressable through API."
                          )
                          .only()
                          .required(),
                      })
                        .description(
                          "metadata common to all addressable objects. Values provided by VTN on object creation."
                        )
                        .unknown(),
                      Joi.object({
                        resourceName: Joi.string()
                          .description(
                            "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                          )
                          .required()
                          .max(128)
                          .min(1),
                        venID: Joi.string()
                          .description("URL safe VTN assigned object ID.")
                          .pattern(/^[a-zA-Z0-9_-]*$/, {})
                          .max(128)
                          .min(1),
                        attributes: Joi.array()
                          .allow(null)
                          .default(null)
                          .description(
                            "A list of valuesMap objects describing attributes."
                          )
                          .items(
                            Joi.object({
                              type: Joi.string()
                                .description(
                                  'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                )
                                .required()
                                .max(128)
                                .min(1),
                              values: Joi.array()
                                .description(
                                  "A list of data points. Most often a singular value such as a price."
                                )
                                .required()
                                .items(
                                  Joi.alternatives()
                                    .match("any")
                                    .try(
                                      Joi.number(),
                                      Joi.number().integer(),
                                      Joi.string().allow("").min(0),
                                      Joi.boolean(),
                                      Joi.object({
                                        x: Joi.number()
                                          .description("A value on an x axis.")
                                          .required(),
                                        y: Joi.number()
                                          .description("A value on a y axis.")
                                          .required(),
                                      })
                                        .description(
                                          "A pair of floats typically used as a point on a 2 dimensional grid."
                                        )
                                        .unknown()
                                    )
                                ),
                            })
                              .description(
                                "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                              )
                              .unknown()
                          ),
                        targets: Joi.array()
                          .allow(null)
                          .default(null)
                          .description(
                            "A list of valuesMap objects describing target criteria."
                          )
                          .items(
                            Joi.object({
                              type: Joi.string()
                                .description(
                                  'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
                                )
                                .required()
                                .max(128)
                                .min(1),
                              values: Joi.array()
                                .description(
                                  "A list of data points. Most often a singular value such as a price."
                                )
                                .required()
                                .items(
                                  Joi.alternatives()
                                    .match("any")
                                    .try(
                                      Joi.number(),
                                      Joi.number().integer(),
                                      Joi.string().allow("").min(0),
                                      Joi.boolean(),
                                      Joi.object({
                                        x: Joi.number()
                                          .description("A value on an x axis.")
                                          .required(),
                                        y: Joi.number()
                                          .description("A value on a y axis.")
                                          .required(),
                                      })
                                        .description(
                                          "A pair of floats typically used as a point on a 2 dimensional grid."
                                        )
                                        .unknown()
                                    )
                                ),
                            })
                              .description(
                                "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
                              )
                              .unknown()
                          ),
                      })
                        .description(
                          "A resource is an energy device or system subject to control by a VEN.\n"
                        )
                        .unknown()
                    )
                )
            )
        )
        .required(),
      targets: Joi.array()
        .allow(null)
        .default(null)
        .description("A list of valuesMap objects.")
        .items(
          Joi.object({
            type: Joi.string()
              .description(
                'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
              )
              .required()
              .max(128)
              .min(1),
            values: Joi.array()
              .description(
                "A list of data points. Most often a singular value such as a price."
              )
              .required()
              .items(
                Joi.alternatives()
                  .match("any")
                  .try(
                    Joi.number(),
                    Joi.number().integer(),
                    Joi.string().allow("").min(0),
                    Joi.boolean(),
                    Joi.object({
                      x: Joi.number()
                        .description("A value on an x axis.")
                        .required(),
                      y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                    })
                      .description(
                        "A pair of floats typically used as a point on a 2 dimensional grid."
                      )
                      .unknown()
                  )
              ),
          })
            .description(
              "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
            )
            .unknown()
        ),
    })
      .description(
        "VTN generated object included in request to subscription callbackUrl.\n"
      )
      .unknown(),
    objectTypes: Joi.string()
      .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
      .description("Types of objects addressable through API.")
      .only(),
    dateTime: Joi.date().description("datetime in RFC 3339 format"),
    duration: Joi.string()
      .allow("")
      .default("PT0S")
      .description("duration in ISO 8601 format")
      .pattern(
        /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
        {}
      )
      .min(0),
    clientCredentialRequest: Joi.object({
      grant_type: Joi.string()
        .allow("client_credentials")
        .description("OAuth2 grant type, must be 'client_credentials'")
        .only()
        .required(),
      client_id: Joi.string()
        .description("client ID to exchange for bearer token.")
        .required()
        .max(4096)
        .min(1),
      client_secret: Joi.string()
        .description("client secret to exchange for bearer token.")
        .required()
        .max(4096)
        .min(1),
      scope: Joi.string()
        .allow("")
        .description("application defined scope.")
        .max(4096)
        .min(0),
    })
      .description(
        "Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n"
      )
      .unknown(),
    clientCredentialResponse: Joi.object({
      access_token: Joi.string()
        .description("access token provided by Authorization service")
        .required()
        .max(4096)
        .min(1),
      token_type: Joi.string()
        .allow("Bearer")
        .description("token type, must be Bearer.")
        .only()
        .required(),
      expires_in: Joi.number()
        .description("expiration period in seconds.")
        .integer(),
      refresh_token: Joi.string()
        .description("refresh token provided by Authorization service")
        .max(4096)
        .min(1),
      scope: Joi.string()
        .allow("")
        .description("application defined scope.")
        .max(4096)
        .min(0),
    })
      .description(
        "Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n"
      )
      .unknown(),
    authError: Joi.object({
      error: Joi.string()
        .allow(
          "invalid_request",
          "invalid_client",
          "invalid_grant",
          "invalid_scope",
          "unauthorized_client",
          "unsupported_grant_type"
        )
        .description(
          "As described in rfc6749 | invalid_request – The request is missing a parameter so the server can’t proceed with the request. This may also be returned if the request includes an unsupported parameter or repeats a parameter. invalid_client – Client authentication failed, such as if the request contains an invalid client ID or secret. Send an HTTP 401 response in this case. invalid_grant – The authorization code (or user’s password for the password grant type) is invalid or expired. This is also the error you would return if the redirect URL given in the authorization grant does not match the URL provided in this access token request. invalid_scope – For access token requests that include a scope (password or client_credentials grants), this error indicates an invalid scope value in the request. unauthorized_client – This client is not authorized to use the requested grant type. For example, if you restrict which applications can use the Implicit grant, you would return this error for the other apps. unsupported_grant_type – If a grant type is requested that the authorization server doesn’t recognize, use this code. Note that unknown grant types also use this specific error code rather than using the invalid_request above."
        )
        .only()
        .required(),
      error_description: Joi.string()
        .allow("")
        .description(
          "Should be a sentence or two at most describing the circumstance of the error"
        )
        .min(0),
      error_uri: Joi.string()
        .description("Optional reference to more detailed error description")
        .uri({}),
    })
      .description(
        "error response on HTTP 400 from auth/token per https://www.rfc-editor.org/rfc/rfc6749"
      )
      .unknown(),
    authServerInfo: Joi.object({
      tokenURL: Joi.string()
        .description("URL of the token endpoint.")
        .required()
        .uri({}),
    }).unknown(),
    problem: Joi.object({
      type: Joi.string()
        .default("about:blank")
        .description(
          "An absolute URI that identifies the problem type.\nWhen dereferenced, it SHOULD provide human-readable documentation for the problem type\n(e.g., using HTML).\n"
        )
        .uri({}),
      title: Joi.string()
        .allow("")
        .description(
          "A short, summary of the problem type. Written in english and readable\nfor engineers (usually not suited for non technical stakeholders and\nnot localized); example: Service Unavailable.\n"
        )
        .min(0),
      status: Joi.number()
        .description(
          "The HTTP status code generated by the origin server for this occurrence\nof the problem.\n"
        )
        .integer()
        .max(600)
        .min(100),
      detail: Joi.string()
        .allow("")
        .description(
          "A human readable explanation specific to this occurrence of the\nproblem.\n"
        )
        .min(0),
      instance: Joi.string()
        .description(
          "An absolute URI that identifies the specific occurrence of the problem.\nIt may or may not yield further information if dereferenced.\n"
        )
        .uri({}),
    })
      .description(
        "reusable error response. From https://opensource.zalando.com/problem/schema.yaml.\n"
      )
      .unknown(),
    notifiersResponse: Joi.object({
      WEBHOOK: Joi.boolean().description("Currently MUST be true").required(),
      MQTT: Joi.object({
        URIS: Joi.array()
          .required()
          .items(
            Joi.string()
              .description("URIs for connection to MQTT broker")
              .uri({})
          ),
        serialization: Joi.string()
          .allow("JSON")
          .description(
            "Currently always JSON, perhaps other formats supported in future"
          )
          .only()
          .required(),
        authentication: Joi.alternatives()
          .match("one")
          .try(
            Joi.object({
              method: Joi.string()
                .allow("ANONYMOUS")
                .description("Specifies anonymous authentication")
                .only()
                .required(),
            })
              .description("MQTT broker anonymous authentication details")
              .unknown(),
            Joi.object({
              method: Joi.string()
                .allow("OAUTH2_BEARER_TOKEN")
                .description("Specifies OAuth2 bearer token authentication")
                .only()
                .required(),
              username: Joi.string()
                .allow("")
                .description(
                  'Either the distinguished string "{clientID}", or any other literal string'
                )
                .required()
                .min(0),
            })
              .description(
                "MQTT broker OAuth2 Bearer Token authentication details"
              )
              .unknown(),
            Joi.object({
              method: Joi.string()
                .allow("CERTIFICATE")
                .description("Specifies certificate authentication")
                .only()
                .required(),
              caCert: Joi.string()
                .allow("")
                .description(
                  "String containing the Certificate Authority certificate"
                )
                .required()
                .min(0),
              clientCert: Joi.string()
                .allow("")
                .description("String containing the Client certificate")
                .required()
                .min(0),
              clientKey: Joi.string()
                .allow("")
                .description(
                  "String containing the client certificate private key"
                )
                .required()
                .min(0),
            })
              .description(
                "MQTT broker mTLS client certificate authentication details"
              )
              .unknown()
          )
          .required(),
      })
        .description("Details of MQTT binding for messaging protocol support")
        .unknown(),
    })
      .description("Provides details of each notifier binding supported")
      .unknown(),
    mqttNotifierBindingObject: Joi.object({
      URIS: Joi.array()
        .required()
        .items(
          Joi.string().description("URIs for connection to MQTT broker").uri({})
        ),
      serialization: Joi.string()
        .allow("JSON")
        .description(
          "Currently always JSON, perhaps other formats supported in future"
        )
        .only()
        .required(),
      authentication: Joi.alternatives()
        .match("one")
        .try(
          Joi.object({
            method: Joi.string()
              .allow("ANONYMOUS")
              .description("Specifies anonymous authentication")
              .only()
              .required(),
          })
            .description("MQTT broker anonymous authentication details")
            .unknown(),
          Joi.object({
            method: Joi.string()
              .allow("OAUTH2_BEARER_TOKEN")
              .description("Specifies OAuth2 bearer token authentication")
              .only()
              .required(),
            username: Joi.string()
              .allow("")
              .description(
                'Either the distinguished string "{clientID}", or any other literal string'
              )
              .required()
              .min(0),
          })
            .description(
              "MQTT broker OAuth2 Bearer Token authentication details"
            )
            .unknown(),
          Joi.object({
            method: Joi.string()
              .allow("CERTIFICATE")
              .description("Specifies certificate authentication")
              .only()
              .required(),
            caCert: Joi.string()
              .allow("")
              .description(
                "String containing the Certificate Authority certificate"
              )
              .required()
              .min(0),
            clientCert: Joi.string()
              .allow("")
              .description("String containing the Client certificate")
              .required()
              .min(0),
            clientKey: Joi.string()
              .allow("")
              .description(
                "String containing the client certificate private key"
              )
              .required()
              .min(0),
          })
            .description(
              "MQTT broker mTLS client certificate authentication details"
            )
            .unknown()
        )
        .required(),
    })
      .description("Details of MQTT binding for messaging protocol support")
      .unknown(),
    mqttNotifierAuthenticationAnonymous: Joi.object({
      method: Joi.string()
        .allow("ANONYMOUS")
        .description("Specifies anonymous authentication")
        .only()
        .required(),
    })
      .description("MQTT broker anonymous authentication details")
      .unknown(),
    mqttNotifierAuthenticationOauth2BearerToken: Joi.object({
      method: Joi.string()
        .allow("OAUTH2_BEARER_TOKEN")
        .description("Specifies OAuth2 bearer token authentication")
        .only()
        .required(),
      username: Joi.string()
        .allow("")
        .description(
          'Either the distinguished string "{clientID}", or any other literal string'
        )
        .required()
        .min(0),
    })
      .description("MQTT broker OAuth2 Bearer Token authentication details")
      .unknown(),
    mqttNotifierAuthenticationCertificate: Joi.object({
      method: Joi.string()
        .allow("CERTIFICATE")
        .description("Specifies certificate authentication")
        .only()
        .required(),
      caCert: Joi.string()
        .allow("")
        .description("String containing the Certificate Authority certificate")
        .required()
        .min(0),
      clientCert: Joi.string()
        .allow("")
        .description("String containing the Client certificate")
        .required()
        .min(0),
      clientKey: Joi.string()
        .allow("")
        .description("String containing the client certificate private key")
        .required()
        .min(0),
    })
      .description("MQTT broker mTLS client certificate authentication details")
      .unknown(),
    notifierOperationsTopics: Joi.object({
      CREATE: Joi.string()
        .allow("")
        .description(
          "'Topic path for CREATE operations,\n not provided for notifications for a specific object ID,\n e.g. until programID foo is created, clients unable to\n request notifications of its creation'\n"
        )
        .min(0),
      UPDATE: Joi.string()
        .allow("")
        .description("Topic path for UPDATE operations")
        .required()
        .min(0),
      DELETE: Joi.string()
        .allow("")
        .description("Topic path for DELETE operations")
        .required()
        .min(0),
      ALL: Joi.string()
        .allow("")
        .description("Topic path for ALL operations, if supported by VTN")
        .min(0),
    })
      .description(
        "MQTT notifier topic names for notifications of subscribable-object operations"
      )
      .unknown(),
    notifierTopicsResponse: Joi.object({
      topics: Joi.object({
        CREATE: Joi.string()
          .allow("")
          .description(
            "'Topic path for CREATE operations,\n not provided for notifications for a specific object ID,\n e.g. until programID foo is created, clients unable to\n request notifications of its creation'\n"
          )
          .min(0),
        UPDATE: Joi.string()
          .allow("")
          .description("Topic path for UPDATE operations")
          .required()
          .min(0),
        DELETE: Joi.string()
          .allow("")
          .description("Topic path for DELETE operations")
          .required()
          .min(0),
        ALL: Joi.string()
          .allow("")
          .description("Topic path for ALL operations, if supported by VTN")
          .min(0),
      })
        .description(
          "MQTT notifier topic names for notifications of subscribable-object operations"
        )
        .required()
        .unknown(),
    }).unknown(),
  },
};
