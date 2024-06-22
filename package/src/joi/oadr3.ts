import _Joi from "joi";
import { Extension, ExtensionFactory } from "joi";
import { isoDate, isoDateTime, isoTime, isoYearMonth } from 'joi-iso-datestring';
// The treatment for the first .extend comes from:
//   https://stackoverflow.com/questions/67132969/typescript-joi-date-validation
// By default the compiler insisted it had to be:
//
//   const Joi = _Joi.extend(isoDate(_Joi))
//        .extend(isoDateTime)
//        .extend(isoTime)
//        .extend(isoYearMonth);
//
// Calling `isoDate(_Joi)` was done to avoid this error:
//
// src/joi/oadr3.ts:8:25 - error TS2345: Argument of type '(joi: Root) => Extension | ExtensionFactory' is not assignable to parameter of type 'Extension | ExtensionFactory'.
//  Type '(joi: Root) => Extension | ExtensionFactory' is not assignable to type 'ExtensionFactory'.
//    Type 'Extension | ExtensionFactory' is not assignable to type 'Extension'.
//      Type 'ExtensionFactory' is not assignable to type 'Extension'.
//
// 8 const Joi = _Joi.extend(isoDate)
//                           ~~~~~~~
//
// Having to call isoDate did not make sense.  None of the documentation
// said anything like this.  The examples show simply listing
// the Joi extension.
//
// The following casts it to be what it is, a Joi Extension.
const Joi = _Joi.extend(isoDate as ExtensionFactory)
    .extend(isoDateTime)
    .extend(isoTime)
    .extend(isoYearMonth);


export const schemas = {
  parameters: {
    searchAllPrograms: {
      path: Joi.object({}),
      query: Joi.object({
        targetType: Joi.string().allow("").optional().min(0),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().allow("").min(0)),
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
        clientName: Joi.string().allow("").optional().min(0),
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
        targetType: Joi.string().allow("").optional().min(0),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().allow("").min(0)),
        skip: Joi.number().optional().integer().min(0),
        limit: Joi.number().optional().integer().max(50).min(0),
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
        clientName: Joi.string().allow("").optional().min(0),
        targetType: Joi.string().allow("").optional().min(0),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().allow("").min(0)),
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
        venName: Joi.string().allow("").optional().min(0),
        targetType: Joi.string().allow("").optional().min(0),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().allow("").min(0)),
        skip: Joi.number().optional().integer().min(0),
        limit: Joi.number().optional().integer().max(50).min(0),
      }),
      header: Joi.object({}),
      cookie: Joi.object({}),
    },
    searchVenResources: {
      path: Joi.object({}),
      query: Joi.object({
        resourceName: Joi.string().allow("").optional().min(0),
        targetType: Joi.string().allow("").optional().min(0),
        targetValues: Joi.array()
          .optional()
          .items(Joi.string().allow("").min(0)),
        skip: Joi.number().optional().integer().min(0),
        limit: Joi.number().optional().integer().max(50).min(0),
      }),
      header: Joi.object({}),
      cookie: Joi.object({}),
    },
  },
  components: {
    program: Joi.object({
      id: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
      modificationDateTime: Joi.isoDateTime().description(
        "datetime in ISO 8601 format"
      ),
      objectType: Joi.string()
        .allow("PROGRAM")
        .description("Used as discriminator")
        .only(),
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
      timeZoneOffset: Joi.string()
        .default("PT0S")
        .description("duration in ISO 8601 format")
        .pattern(
          /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
          {}
        )
        .min(0),
      intervalPeriod: Joi.object({
        start: Joi.isoDateTime().description("datetime in ISO 8601 format").required(),
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
          "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
                  .allow("", null)
                  .default(null)
                  .description("Units of measure.")
                  .min(0),
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
                  .allow("", null)
                  .default(null)
                  .description(
                    "Enumerated or private string signifying the type of reading."
                  )
                  .min(0),
                units: Joi.string()
                  .allow("", null)
                  .default(null)
                  .description("Units of measure.")
                  .min(0),
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
      .description("Provides program specific metadata from VTN to VEN.")
      .unknown(),
    report: Joi.object({
      id: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
      modificationDateTime: Joi.isoDateTime().description(
        "datetime in ISO 8601 format"
      ),
      objectType: Joi.string()
        .allow("REPORT")
        .description("Used as discriminator")
        .only(),
      programID: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .required()
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      eventID: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .required()
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      clientName: Joi.string()
        .description(
          "User generated identifier; may be VEN ID provisioned out-of-band."
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
              .allow("", null)
              .default(null)
              .description(
                "Enumerated or private string signifying the type of reading."
              )
              .min(0),
            units: Joi.string()
              .allow("", null)
              .default(null)
              .description("Units of measure.")
              .min(0),
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
              start: Joi.isoDateTime()
                .description("datetime in ISO 8601 format")
                .required(),
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
                "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
                    start: Joi.isoDateTime()
                      .description("datetime in ISO 8601 format")
                      .required(),
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
                      "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
    event: Joi.object({
      id: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
      modificationDateTime: Joi.isoDateTime().description(
        "datetime in ISO 8601 format"
      ),
      objectType: Joi.string()
        .allow("EVENT")
        .description("Used as discriminator")
        .only(),
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
              .allow("", null)
              .default(null)
              .description(
                "Enumerated or private string signifying the type of reading."
              )
              .min(0),
            units: Joi.string()
              .allow("", null)
              .default(null)
              .description("Units of measure.")
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
              .allow("", null)
              .default(null)
              .description("Units of measure.")
              .min(0),
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
        start: Joi.isoDateTime().description("datetime in ISO 8601 format").required(),
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
          "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
              start: Joi.isoDateTime()
                .description("datetime in ISO 8601 format")
                .required(),
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
                "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
    subscription: Joi.object({
      id: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
      modificationDateTime: Joi.isoDateTime().description(
        "datetime in ISO 8601 format"
      ),
      objectType: Joi.string()
        .allow("SUBSCRIPTION")
        .description("Used as discriminator.")
        .only(),
      clientName: Joi.string()
        .description(
          "User generated identifier, may be VEN identifier provisioned out-of-band."
        )
        .required()
        .max(128)
        .min(1),
      programID: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .required()
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
                  .allow("GET", "POST", "PUT", "DELETE")
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
    ven: Joi.object({
      id: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
      modificationDateTime: Joi.isoDateTime().description(
        "datetime in ISO 8601 format"
      ),
      objectType: Joi.string()
        .allow("VEN")
        .description("Used as discriminator.")
        .only(),
      venName: Joi.string()
        .description(
          "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unqiue within the scope of a VTN\n"
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
          Joi.object({
            id: Joi.string()
              .description("URL safe VTN assigned object ID.")
              .pattern(/^[a-zA-Z0-9_-]*$/, {})
              .max(128)
              .min(1),
            createdDateTime: Joi.isoDateTime().description(
              "datetime in ISO 8601 format"
            ),
            modificationDateTime: Joi.isoDateTime().description(
              "datetime in ISO 8601 format"
            ),
            objectType: Joi.string()
              .allow("RESOURCE")
              .description("Used as discriminator.")
              .only(),
            resourceName: Joi.string()
              .description(
                "User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n"
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
        ),
    })
      .description("Ven represents a client with the ven role.")
      .unknown(),
    resource: Joi.object({
      id: Joi.string()
        .description("URL safe VTN assigned object ID.")
        .pattern(/^[a-zA-Z0-9_-]*$/, {})
        .max(128)
        .min(1),
      createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
      modificationDateTime: Joi.isoDateTime().description(
        "datetime in ISO 8601 format"
      ),
      objectType: Joi.string()
        .allow("RESOURCE")
        .description("Used as discriminator.")
        .only(),
      resourceName: Joi.string()
        .description(
          "User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n"
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
    interval: Joi.object({
      id: Joi.number()
        .description(
          "A client generated number assigned an interval object. Not a sequence number."
        )
        .required()
        .integer(),
      intervalPeriod: Joi.object({
        start: Joi.isoDateTime().description("datetime in ISO 8601 format").required(),
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
          "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
      start: Joi.isoDateTime().description("datetime in ISO 8601 format").required(),
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
        "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
        .allow("", null)
        .default(null)
        .description("Units of measure.")
        .min(0),
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
        .allow("", null)
        .default(null)
        .description(
          "Enumerated or private string signifying the type of reading."
        )
        .min(0),
      units: Joi.string()
        .allow("", null)
        .default(null)
        .description("Units of measure.")
        .min(0),
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
        .allow("", null)
        .default(null)
        .description(
          "Enumerated or private string signifying the type of reading."
        )
        .min(0),
      units: Joi.string()
        .allow("", null)
        .default(null)
        .description("Units of measure.")
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
    notification: Joi.object({
      objectType: Joi.string()
        .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
        .description("Types of objects addressable through API.")
        .only()
        .required(),
      operation: Joi.string()
        .allow("GET", "POST", "PUT", "DELETE")
        .description(
          "the operation on on object that triggered the notification."
        )
        .only()
        .required(),
      object: Joi.alternatives()
        .match("all")
        .try(
          Joi.object({})
            .description("the object that is the subject of the notification.")
            .unknown(),
          Joi.alternatives()
            .match("one")
            .try(
              Joi.object({
                id: Joi.string()
                  .description("URL safe VTN assigned object ID.")
                  .pattern(/^[a-zA-Z0-9_-]*$/, {})
                  .max(128)
                  .min(1),
                createdDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                modificationDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                objectType: Joi.string()
                  .allow("PROGRAM")
                  .description("Used as discriminator")
                  .only(),
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
                timeZoneOffset: Joi.string()
                  .allow("")
                  .default("PT0S")
                  .description("duration in ISO 8601 format")
                  .pattern(
                    /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/,
                    {}
                  )
                  .min(0),
                intervalPeriod: Joi.object({
                  start: Joi.isoDateTime()
                    .description("datetime in ISO 8601 format")
                    .required(),
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
                    "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
                            .allow("", null)
                            .default(null)
                            .description("Units of measure.")
                            .min(0),
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
                            .allow("", null)
                            .default(null)
                            .description(
                              "Enumerated or private string signifying the type of reading."
                            )
                            .min(0),
                          units: Joi.string()
                            .allow("", null)
                            .default(null)
                            .description("Units of measure.")
                            .min(0),
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
                .description(
                  "Provides program specific metadata from VTN to VEN."
                )
                .unknown(),
              Joi.object({
                id: Joi.string()
                  .description("URL safe VTN assigned object ID.")
                  .pattern(/^[a-zA-Z0-9_-]*$/, {})
                  .max(128)
                  .min(1),
                createdDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                modificationDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                objectType: Joi.string()
                  .allow("REPORT")
                  .description("Used as discriminator")
                  .only(),
                programID: Joi.string()
                  .description("URL safe VTN assigned object ID.")
                  .required()
                  .pattern(/^[a-zA-Z0-9_-]*$/, {})
                  .max(128)
                  .min(1),
                eventID: Joi.string()
                  .description("URL safe VTN assigned object ID.")
                  .required()
                  .pattern(/^[a-zA-Z0-9_-]*$/, {})
                  .max(128)
                  .min(1),
                clientName: Joi.string()
                  .description(
                    "User generated identifier; may be VEN ID provisioned out-of-band."
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
                        .allow("", null)
                        .default(null)
                        .description(
                          "Enumerated or private string signifying the type of reading."
                        )
                        .min(0),
                      units: Joi.string()
                        .allow("", null)
                        .default(null)
                        .description("Units of measure.")
                        .min(0),
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
                        start: Joi.isoDateTime()
                          .description("datetime in ISO 8601 format")
                          .required(),
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
                          "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
                              start: Joi.isoDateTime()
                                .description("datetime in ISO 8601 format")
                                .required(),
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
                                "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
                      .description("Report data associated with a resource.")
                      .unknown()
                  ),
              })
                .description("report object.")
                .unknown(),
              Joi.object({
                id: Joi.string()
                  .description("URL safe VTN assigned object ID.")
                  .pattern(/^[a-zA-Z0-9_-]*$/, {})
                  .max(128)
                  .min(1),
                createdDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                modificationDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                objectType: Joi.string()
                  .allow("EVENT")
                  .description("Used as discriminator")
                  .only(),
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
                        .allow("", null)
                        .default(null)
                        .description(
                          "Enumerated or private string signifying the type of reading."
                        )
                        .min(0),
                      units: Joi.string()
                        .allow("", null)
                        .default(null)
                        .description("Units of measure.")
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
                        .allow("", null)
                        .default(null)
                        .description("Units of measure.")
                        .min(0),
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
                  start: Joi.isoDateTime()
                    .description("datetime in ISO 8601 format")
                    .required(),
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
                    "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
                        start: Joi.isoDateTime()
                          .description("datetime in ISO 8601 format")
                          .required(),
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
                          "Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n"
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
              Joi.object({
                id: Joi.string()
                  .description("URL safe VTN assigned object ID.")
                  .pattern(/^[a-zA-Z0-9_-]*$/, {})
                  .max(128)
                  .min(1),
                createdDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                modificationDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                objectType: Joi.string()
                  .allow("SUBSCRIPTION")
                  .description("Used as discriminator.")
                  .only(),
                clientName: Joi.string()
                  .description(
                    "User generated identifier, may be VEN identifier provisioned out-of-band."
                  )
                  .required()
                  .max(128)
                  .min(1),
                programID: Joi.string()
                  .description("URL safe VTN assigned object ID.")
                  .required()
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
                        .description("list of operations to subscribe to.")
                        .required()
                        .items(
                          Joi.string()
                            .allow("GET", "POST", "PUT", "DELETE")
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
              Joi.object({
                id: Joi.string()
                  .description("URL safe VTN assigned object ID.")
                  .pattern(/^[a-zA-Z0-9_-]*$/, {})
                  .max(128)
                  .min(1),
                createdDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                modificationDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                objectType: Joi.string()
                  .allow("VEN")
                  .description("Used as discriminator.")
                  .only(),
                venName: Joi.string()
                  .description(
                    "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unqiue within the scope of a VTN\n"
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
                    Joi.object({
                      id: Joi.string()
                        .description("URL safe VTN assigned object ID.")
                        .pattern(/^[a-zA-Z0-9_-]*$/, {})
                        .max(128)
                        .min(1),
                      createdDateTime: Joi.isoDateTime().description(
                        "datetime in ISO 8601 format"
                      ),
                      modificationDateTime: Joi.isoDateTime().description(
                        "datetime in ISO 8601 format"
                      ),
                      objectType: Joi.string()
                        .allow("RESOURCE")
                        .description("Used as discriminator.")
                        .only(),
                      resourceName: Joi.string()
                        .description(
                          "User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n"
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
                  ),
              })
                .description("Ven represents a client with the ven role.")
                .unknown(),
              Joi.object({
                id: Joi.string()
                  .description("URL safe VTN assigned object ID.")
                  .pattern(/^[a-zA-Z0-9_-]*$/, {})
                  .max(128)
                  .min(1),
                createdDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                modificationDateTime: Joi.isoDateTime().description(
                  "datetime in ISO 8601 format"
                ),
                objectType: Joi.string()
                  .allow("RESOURCE")
                  .description("Used as discriminator.")
                  .only(),
                resourceName: Joi.string()
                  .description(
                    "User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n"
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
    dateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
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
        .only(),
      clientID: Joi.string()
        .description("client ID to exchange for bearer token.")
        .required()
        .max(128)
        .min(1),
      clientSecret: Joi.string()
        .description("client secret to exchange for bearer token.")
        .required()
        .max(128)
        .min(1),
      scope: Joi.string()
        .description("application defined scope.")
        .max(128)
        .min(1),
    })
      .description("Body of POST request to /auth/token.\n")
      .unknown(),
    clientCredentialResponse: Joi.object({
      access_token: Joi.string()
        .description("access token povided by Authorization service")
        .required()
        .max(128)
        .min(1),
      token_type: Joi.string()
        .allow("Bearer")
        .description("token type, must be Bearer.")
        .only(),
      expires_in: Joi.number()
        .description("expiration period in seconds.")
        .integer(),
      refresh_token: Joi.string()
        .description("refresh token povided by Authorization service")
        .max(128)
        .min(1),
      scope: Joi.string()
        .description("application defined scope.")
        .max(128)
        .min(1),
    })
      .description("Body response from /auth/token.\n")
      .unknown(),
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
  },
};
