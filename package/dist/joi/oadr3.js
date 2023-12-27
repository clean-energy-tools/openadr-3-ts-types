import _Joi from "joi";
import { isoDate, isoDateTime, isoTime, isoYearMonth } from 'joi-iso-datestring/dist/index.js';
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
const Joi = _Joi.extend(isoDate)
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
                    .items(Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()),
                skip: Joi.number().optional().integer().min(0),
                limit: Joi.number().optional().integer().max(50).min(0),
            }),
            header: Joi.object({}),
            cookie: Joi.object({}),
        },
        searchVens: {
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
        searchVenResources: {
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
        fetchToken: {
            path: Joi.object({}),
            query: Joi.object({}),
            header: Joi.object({
                clientID: Joi.string().allow("").required().min(0),
                clientSecret: Joi.string().allow("").required().min(0),
            }),
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
            modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
            objectType: Joi.string()
                .allow("PROGRAM")
                .description("Used as discriminator, e.g. notification.object")
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
                .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                .min(0),
            intervalPeriod: Joi.object({
                start: Joi.isoDateTime().description("datetime in ISO 8601 format").required(),
                duration: Joi.string()
                    .allow("")
                    .default("PT0S")
                    .description("duration in ISO 8601 format")
                    .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                    .min(0),
                randomizeStart: Joi.string()
                    .allow("")
                    .default("PT0S")
                    .description("duration in ISO 8601 format")
                    .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                    .min(0),
            })
                .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                .unknown(),
            programDescriptions: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of programDescriptions")
                .items(Joi.object({
                URL: Joi.string()
                    .description("A human or machine readable program description")
                    .required()
                    .uri({}),
            }).unknown()),
            bindingEvents: Joi.boolean()
                .default(false)
                .description("True if events are fixed once transmitted."),
            localPrice: Joi.boolean()
                .default(false)
                .description("True if events have been adapted from a grid event."),
            payloadDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of payloadDescriptors.")
                .items(Joi.alternatives()
                .match("any")
                .try(Joi.object({
                objectType: Joi.string()
                    .allow("")
                    .default("EVENT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator, e.g. program.payloadDescriptors")
                    .min(0),
                payloadType: Joi.string()
                    .description("Enumerated or private string signifying the nature of values.")
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
                .description("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n")
                .unknown(), Joi.object({
                objectType: Joi.string()
                    .allow("")
                    .default("REPORT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator, e.g. program.payloadDescriptors")
                    .min(0),
                payloadType: Joi.string()
                    .description("Enumerated or private string signifying the nature of values.")
                    .required()
                    .max(128)
                    .min(1),
                readingType: Joi.string()
                    .allow("", null)
                    .default(null)
                    .description("Enumerated or private string signifying the type of reading.")
                    .min(0),
                units: Joi.string()
                    .allow("", null)
                    .default(null)
                    .description("Units of measure.")
                    .min(0),
                accuracy: Joi.number()
                    .allow(null)
                    .default(null)
                    .description("A quantification of the accuracy of a set of payload values."),
                confidence: Joi.number()
                    .default(100)
                    .description("A quantification of the confidence in a set of payload values.")
                    .integer()
                    .max(100)
                    .min(0),
            })
                .description("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n")
                .unknown())),
            targets: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of valuesMap objects.")
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
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
            modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
            objectType: Joi.string()
                .allow("REPORT")
                .description("Used as discriminator, e.g. notification.object")
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
                .description("User generated identifier; may be VEN ID provisioned during program enrollment.")
                .required()
                .max(128)
                .min(1),
            reportName: Joi.string()
                .allow("", null)
                .default(null)
                .description("User defined string for use in debugging or User Interface.")
                .min(0),
            payloadDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of reportPayloadDescriptors.")
                .items(Joi.object({
                objectType: Joi.string()
                    .allow("")
                    .default("REPORT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator, e.g. program.payloadDescriptors")
                    .min(0),
                payloadType: Joi.string()
                    .description("Enumerated or private string signifying the nature of values.")
                    .required()
                    .max(128)
                    .min(1),
                readingType: Joi.string()
                    .allow("", null)
                    .default(null)
                    .description("Enumerated or private string signifying the type of reading.")
                    .min(0),
                units: Joi.string()
                    .allow("", null)
                    .default(null)
                    .description("Units of measure.")
                    .min(0),
                accuracy: Joi.number()
                    .allow(null)
                    .default(null)
                    .description("A quantification of the accuracy of a set of payload values."),
                confidence: Joi.number()
                    .default(100)
                    .description("A quantification of the confidence in a set of payload values.")
                    .integer()
                    .max(100)
                    .min(0),
            })
                .description("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n")
                .unknown()),
            resources: Joi.array()
                .description("A list of objects containing report data for a set of resources.")
                .required()
                .items(Joi.object({
                resourceName: Joi.string()
                    .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
                        .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                        .min(0),
                    randomizeStart: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                        .min(0),
                })
                    .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                    .unknown(),
                intervals: Joi.array()
                    .description("A list of interval objects.")
                    .required()
                    .items(Joi.object({
                    id: Joi.number()
                        .description("A client generated number assigned an interval object. Not a sequence number.")
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
                            .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                            .min(0),
                        randomizeStart: Joi.string()
                            .allow("")
                            .default("PT0S")
                            .description("duration in ISO 8601 format")
                            .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                            .min(0),
                    })
                        .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                        .unknown(),
                    payloads: Joi.array()
                        .description("A list of valuesMap objects.")
                        .required()
                        .items(Joi.object({
                        type: Joi.string()
                            .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                            .required()
                            .max(128)
                            .min(1),
                        values: Joi.array()
                            .description("A list of data points. Most often a singular value such as a price.")
                            .required()
                            .items(Joi.alternatives()
                            .match("any")
                            .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                            x: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on a y axis.")
                                .required(),
                        })
                            .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                            .unknown())),
                    })
                        .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                        .unknown()),
                })
                    .description("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n")
                    .unknown()),
            })
                .description("Report data associated with a resource.")
                .unknown()),
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
            modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
            objectType: Joi.string()
                .allow("EVENT")
                .description("Used as discriminator, e.g. notification.object")
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
                .description("User defined string for use in debugging or User Interface.")
                .min(0),
            priority: Joi.number()
                .allow(null)
                .default(null)
                .description("Relative priority of event. A lower number is a higher priority.")
                .integer()
                .min(0),
            targets: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of valuesMap objects.")
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            reportDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of reportDescriptor objects. Used to request reports from VEN.")
                .items(Joi.object({
                payloadType: Joi.string()
                    .description("Enumerated or private string signifying the nature of values.")
                    .required()
                    .max(128)
                    .min(1),
                readingType: Joi.string()
                    .allow("", null)
                    .default(null)
                    .description("Enumerated or private string signifying the type of reading.")
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
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                aggregate: Joi.boolean()
                    .default(false)
                    .description("True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n"),
                startInterval: Joi.number()
                    .default(-1)
                    .description("The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n")
                    .integer(),
                numIntervals: Joi.number()
                    .default(-1)
                    .description("The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n")
                    .integer(),
                historical: Joi.boolean()
                    .default(true)
                    .description("True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n"),
                frequency: Joi.number()
                    .default(-1)
                    .description("Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n")
                    .integer(),
                repeat: Joi.number()
                    .default(1)
                    .description("Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n")
                    .integer(),
            })
                .description("An object that may be used to request a report from a VEN.\nSee OpenADR REST User Guide for detailed description of how configure a report request.\n")
                .unknown()),
            payloadDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of payloadDescriptor objects.")
                .items(Joi.object({
                objectType: Joi.string()
                    .allow("")
                    .default("EVENT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator, e.g. program.payloadDescriptors")
                    .min(0),
                payloadType: Joi.string()
                    .description("Enumerated or private string signifying the nature of values.")
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
                .description("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n")
                .unknown()),
            intervalPeriod: Joi.object({
                start: Joi.isoDateTime().description("datetime in ISO 8601 format").required(),
                duration: Joi.string()
                    .allow("")
                    .default("PT0S")
                    .description("duration in ISO 8601 format")
                    .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                    .min(0),
                randomizeStart: Joi.string()
                    .allow("")
                    .default("PT0S")
                    .description("duration in ISO 8601 format")
                    .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                    .min(0),
            })
                .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                .unknown(),
            intervals: Joi.array()
                .description("A list of interval objects.")
                .required()
                .items(Joi.object({
                id: Joi.number()
                    .description("A client generated number assigned an interval object. Not a sequence number.")
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
                        .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                        .min(0),
                    randomizeStart: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                        .min(0),
                })
                    .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                    .unknown(),
                payloads: Joi.array()
                    .description("A list of valuesMap objects.")
                    .required()
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
            })
                .description("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n")
                .unknown()),
        })
            .description("Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets start time and duration of intervals.\n")
            .unknown(),
        subscription: Joi.object({
            id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
            modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
            objectType: Joi.string()
                .allow("SUBSCRIPTION")
                .description("Used as discriminator, e.g. notification.object")
                .only(),
            clientName: Joi.string()
                .description("User generated identifier, may be VEN identifier provisioned during program enrollment.")
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
                .items(Joi.object({
                objects: Joi.array()
                    .description("list of objects to subscribe to.")
                    .required()
                    .items(Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()),
                operations: Joi.array()
                    .description("list of operations to subscribe to.")
                    .required()
                    .items(Joi.string()
                    .allow("GET", "POST", "PUT", "DELETE")
                    .description("object operation to subscribe to.")
                    .only()),
                callbackUrl: Joi.string()
                    .description("User provided webhook URL.")
                    .required()
                    .uri({}),
                bearerToken: Joi.string()
                    .allow("", null)
                    .default(null)
                    .description("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
                    .min(0),
            })
                .description("object type, operations, and callbackUrl.")
                .unknown()),
            targets: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of valuesMap objects. Used by server to filter callbacks.")
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
        })
            .description("An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n")
            .unknown(),
        ven: Joi.object({
            id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
            modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
            objectType: Joi.string()
                .allow("VEN")
                .description("Used as discriminator, e.g. notification.object.")
                .only(),
            venName: Joi.string()
                .description("User generated identifier, may be VEN identifier provisioned during program enrollment.")
                .required()
                .max(128)
                .min(1),
            attributes: Joi.array()
                .description("A list of valuesMap objects describing attributes.")
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            targets: Joi.array()
                .description("A list of valuesMap objects describing target criteria.")
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            resources: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of resource objects representing end-devices or systems.")
                .items(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                objectType: Joi.string()
                    .allow("RESOURCE")
                    .description("Used as discriminator, e.g. notification.object")
                    .only(),
                resourceName: Joi.string()
                    .description("User generated identifier, resource may be configured with identifier out-of-band.")
                    .required()
                    .max(128)
                    .min(1),
                venID: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                attributes: Joi.array()
                    .description("A list of valuesMap objects describing attributes.")
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                targets: Joi.array()
                    .description("A list of valuesMap objects describing target criteria.")
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
            })
                .description("A resource is an energy device or system subject to control by a VEN.\n")
                .unknown()),
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
            modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
            objectType: Joi.string()
                .allow("RESOURCE")
                .description("Used as discriminator, e.g. notification.object")
                .only(),
            resourceName: Joi.string()
                .description("User generated identifier, resource may be configured with identifier out-of-band.")
                .required()
                .max(128)
                .min(1),
            venID: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            attributes: Joi.array()
                .description("A list of valuesMap objects describing attributes.")
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            targets: Joi.array()
                .description("A list of valuesMap objects describing target criteria.")
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
        })
            .description("A resource is an energy device or system subject to control by a VEN.\n")
            .unknown(),
        interval: Joi.object({
            id: Joi.number()
                .description("A client generated number assigned an interval object. Not a sequence number.")
                .required()
                .integer(),
            intervalPeriod: Joi.object({
                start: Joi.isoDateTime().description("datetime in ISO 8601 format").required(),
                duration: Joi.string()
                    .allow("")
                    .default("PT0S")
                    .description("duration in ISO 8601 format")
                    .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                    .min(0),
                randomizeStart: Joi.string()
                    .allow("")
                    .default("PT0S")
                    .description("duration in ISO 8601 format")
                    .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                    .min(0),
            })
                .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                .unknown(),
            payloads: Joi.array()
                .description("A list of valuesMap objects.")
                .required()
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
        })
            .description("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n")
            .unknown(),
        intervalPeriod: Joi.object({
            start: Joi.isoDateTime().description("datetime in ISO 8601 format").required(),
            duration: Joi.string()
                .allow("")
                .default("PT0S")
                .description("duration in ISO 8601 format")
                .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                .min(0),
            randomizeStart: Joi.string()
                .allow("")
                .default("PT0S")
                .description("duration in ISO 8601 format")
                .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                .min(0),
        })
            .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
            .unknown(),
        valuesMap: Joi.object({
            type: Joi.string()
                .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                .required()
                .max(128)
                .min(1),
            values: Joi.array()
                .description("A list of data points. Most often a singular value such as a price.")
                .required()
                .items(Joi.alternatives()
                .match("any")
                .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                x: Joi.number()
                    .allow(null)
                    .default(null)
                    .description("A value on an x axis.")
                    .required(),
                y: Joi.number()
                    .allow(null)
                    .default(null)
                    .description("A value on a y axis.")
                    .required(),
            })
                .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                .unknown())),
        })
            .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
            .unknown(),
        point: Joi.object({
            x: Joi.number()
                .allow(null)
                .default(null)
                .description("A value on an x axis.")
                .required(),
            y: Joi.number()
                .allow(null)
                .default(null)
                .description("A value on a y axis.")
                .required(),
        })
            .description("A pair of floats typically used as a point on a 2 dimensional grid.")
            .unknown(),
        eventPayloadDescriptor: Joi.object({
            objectType: Joi.string()
                .allow("")
                .default("EVENT_PAYLOAD_DESCRIPTOR")
                .description("Used as discriminator, e.g. program.payloadDescriptors")
                .min(0),
            payloadType: Joi.string()
                .description("Enumerated or private string signifying the nature of values.")
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
            .description("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n")
            .unknown(),
        reportPayloadDescriptor: Joi.object({
            objectType: Joi.string()
                .allow("")
                .default("REPORT_PAYLOAD_DESCRIPTOR")
                .description("Used as discriminator, e.g. program.payloadDescriptors")
                .min(0),
            payloadType: Joi.string()
                .description("Enumerated or private string signifying the nature of values.")
                .required()
                .max(128)
                .min(1),
            readingType: Joi.string()
                .allow("", null)
                .default(null)
                .description("Enumerated or private string signifying the type of reading.")
                .min(0),
            units: Joi.string()
                .allow("", null)
                .default(null)
                .description("Units of measure.")
                .min(0),
            accuracy: Joi.number()
                .allow(null)
                .default(null)
                .description("A quantification of the accuracy of a set of payload values."),
            confidence: Joi.number()
                .default(100)
                .description("A quantification of the confidence in a set of payload values.")
                .integer()
                .max(100)
                .min(0),
        })
            .description("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n")
            .unknown(),
        reportDescriptor: Joi.object({
            payloadType: Joi.string()
                .description("Enumerated or private string signifying the nature of values.")
                .required()
                .max(128)
                .min(1),
            readingType: Joi.string()
                .allow("", null)
                .default(null)
                .description("Enumerated or private string signifying the type of reading.")
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
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            aggregate: Joi.boolean()
                .default(false)
                .description("True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n"),
            startInterval: Joi.number()
                .default(-1)
                .description("The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n")
                .integer(),
            numIntervals: Joi.number()
                .default(-1)
                .description("The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n")
                .integer(),
            historical: Joi.boolean()
                .default(true)
                .description("True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n"),
            frequency: Joi.number()
                .default(-1)
                .description("Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n")
                .integer(),
            repeat: Joi.number()
                .default(1)
                .description("Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n")
                .integer(),
        })
            .description("An object that may be used to request a report from a VEN.\nSee OpenADR REST User Guide for detailed description of how configure a report request.\n")
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
                .description("the operation on on object that triggered the notification.")
                .only()
                .required(),
            targets: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of valuesMap objects.")
                .items(Joi.object({
                type: Joi.string()
                    .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                    .required()
                    .max(128)
                    .min(1),
                values: Joi.array()
                    .description("A list of data points. Most often a singular value such as a price.")
                    .required()
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                    x: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            object: Joi.alternatives()
                .match("all")
                .try(Joi.object({})
                .description("the object that is the subject of the notification.")
                .unknown(), Joi.alternatives()
                .match("one")
                .try(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                objectType: Joi.string()
                    .allow("PROGRAM")
                    .description("Used as discriminator, e.g. notification.object")
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
                    .allow("")
                    .default("PT0S")
                    .description("duration in ISO 8601 format")
                    .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                    .min(0),
                intervalPeriod: Joi.object({
                    start: Joi.isoDateTime()
                        .description("datetime in ISO 8601 format")
                        .required(),
                    duration: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                        .min(0),
                    randomizeStart: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                        .min(0),
                })
                    .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                    .unknown(),
                programDescriptions: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of programDescriptions")
                    .items(Joi.object({
                    URL: Joi.string()
                        .description("A human or machine readable program description")
                        .required()
                        .uri({}),
                }).unknown()),
                bindingEvents: Joi.boolean()
                    .default(false)
                    .description("True if events are fixed once transmitted."),
                localPrice: Joi.boolean()
                    .default(false)
                    .description("True if events have been adapted from a grid event."),
                payloadDescriptors: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of payloadDescriptors.")
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.object({
                    objectType: Joi.string()
                        .allow("")
                        .default("EVENT_PAYLOAD_DESCRIPTOR")
                        .description("Used as discriminator, e.g. program.payloadDescriptors")
                        .min(0),
                    payloadType: Joi.string()
                        .description("Enumerated or private string signifying the nature of values.")
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
                    .description("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n")
                    .unknown(), Joi.object({
                    objectType: Joi.string()
                        .allow("")
                        .default("REPORT_PAYLOAD_DESCRIPTOR")
                        .description("Used as discriminator, e.g. program.payloadDescriptors")
                        .min(0),
                    payloadType: Joi.string()
                        .description("Enumerated or private string signifying the nature of values.")
                        .required()
                        .max(128)
                        .min(1),
                    readingType: Joi.string()
                        .allow("", null)
                        .default(null)
                        .description("Enumerated or private string signifying the type of reading.")
                        .min(0),
                    units: Joi.string()
                        .allow("", null)
                        .default(null)
                        .description("Units of measure.")
                        .min(0),
                    accuracy: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A quantification of the accuracy of a set of payload values."),
                    confidence: Joi.number()
                        .default(100)
                        .description("A quantification of the confidence in a set of payload values.")
                        .integer()
                        .max(100)
                        .min(0),
                })
                    .description("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n")
                    .unknown())),
                targets: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of valuesMap objects.")
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
            })
                .description("Provides program specific metadata from VTN to VEN.")
                .unknown(), Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                objectType: Joi.string()
                    .allow("REPORT")
                    .description("Used as discriminator, e.g. notification.object")
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
                    .description("User generated identifier; may be VEN ID provisioned during program enrollment.")
                    .required()
                    .max(128)
                    .min(1),
                reportName: Joi.string()
                    .allow("", null)
                    .default(null)
                    .description("User defined string for use in debugging or User Interface.")
                    .min(0),
                payloadDescriptors: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of reportPayloadDescriptors.")
                    .items(Joi.object({
                    objectType: Joi.string()
                        .allow("")
                        .default("REPORT_PAYLOAD_DESCRIPTOR")
                        .description("Used as discriminator, e.g. program.payloadDescriptors")
                        .min(0),
                    payloadType: Joi.string()
                        .description("Enumerated or private string signifying the nature of values.")
                        .required()
                        .max(128)
                        .min(1),
                    readingType: Joi.string()
                        .allow("", null)
                        .default(null)
                        .description("Enumerated or private string signifying the type of reading.")
                        .min(0),
                    units: Joi.string()
                        .allow("", null)
                        .default(null)
                        .description("Units of measure.")
                        .min(0),
                    accuracy: Joi.number()
                        .allow(null)
                        .default(null)
                        .description("A quantification of the accuracy of a set of payload values."),
                    confidence: Joi.number()
                        .default(100)
                        .description("A quantification of the confidence in a set of payload values.")
                        .integer()
                        .max(100)
                        .min(0),
                })
                    .description("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n")
                    .unknown()),
                resources: Joi.array()
                    .description("A list of objects containing report data for a set of resources.")
                    .required()
                    .items(Joi.object({
                    resourceName: Joi.string()
                        .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
                            .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                            .min(0),
                        randomizeStart: Joi.string()
                            .allow("")
                            .default("PT0S")
                            .description("duration in ISO 8601 format")
                            .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                            .min(0),
                    })
                        .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                        .unknown(),
                    intervals: Joi.array()
                        .description("A list of interval objects.")
                        .required()
                        .items(Joi.object({
                        id: Joi.number()
                            .description("A client generated number assigned an interval object. Not a sequence number.")
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
                                .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                                .min(0),
                            randomizeStart: Joi.string()
                                .allow("")
                                .default("PT0S")
                                .description("duration in ISO 8601 format")
                                .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                                .min(0),
                        })
                            .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                            .unknown(),
                        payloads: Joi.array()
                            .description("A list of valuesMap objects.")
                            .required()
                            .items(Joi.object({
                            type: Joi.string()
                                .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                                .required()
                                .max(128)
                                .min(1),
                            values: Joi.array()
                                .description("A list of data points. Most often a singular value such as a price.")
                                .required()
                                .items(Joi.alternatives()
                                .match("any")
                                .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                                x: Joi.number()
                                    .allow(null)
                                    .default(null)
                                    .description("A value on an x axis.")
                                    .required(),
                                y: Joi.number()
                                    .allow(null)
                                    .default(null)
                                    .description("A value on a y axis.")
                                    .required(),
                            })
                                .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                                .unknown())),
                        })
                            .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                            .unknown()),
                    })
                        .description("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n")
                        .unknown()),
                })
                    .description("Report data associated with a resource.")
                    .unknown()),
            })
                .description("report object.")
                .unknown(), Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                objectType: Joi.string()
                    .allow("EVENT")
                    .description("Used as discriminator, e.g. notification.object")
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
                    .description("User defined string for use in debugging or User Interface.")
                    .min(0),
                priority: Joi.number()
                    .allow(null)
                    .default(null)
                    .description("Relative priority of event. A lower number is a higher priority.")
                    .integer()
                    .min(0),
                targets: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of valuesMap objects.")
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                reportDescriptors: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of reportDescriptor objects. Used to request reports from VEN.")
                    .items(Joi.object({
                    payloadType: Joi.string()
                        .description("Enumerated or private string signifying the nature of values.")
                        .required()
                        .max(128)
                        .min(1),
                    readingType: Joi.string()
                        .allow("", null)
                        .default(null)
                        .description("Enumerated or private string signifying the type of reading.")
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
                        .items(Joi.object({
                        type: Joi.string()
                            .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                            .required()
                            .max(128)
                            .min(1),
                        values: Joi.array()
                            .description("A list of data points. Most often a singular value such as a price.")
                            .required()
                            .items(Joi.alternatives()
                            .match("any")
                            .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                            x: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on a y axis.")
                                .required(),
                        })
                            .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                            .unknown())),
                    })
                        .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                        .unknown()),
                    aggregate: Joi.boolean()
                        .default(false)
                        .description("True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n"),
                    startInterval: Joi.number()
                        .default(-1)
                        .description("The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n")
                        .integer(),
                    numIntervals: Joi.number()
                        .default(-1)
                        .description("The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n")
                        .integer(),
                    historical: Joi.boolean()
                        .default(true)
                        .description("True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n"),
                    frequency: Joi.number()
                        .default(-1)
                        .description("Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n")
                        .integer(),
                    repeat: Joi.number()
                        .default(1)
                        .description("Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n")
                        .integer(),
                })
                    .description("An object that may be used to request a report from a VEN.\nSee OpenADR REST User Guide for detailed description of how configure a report request.\n")
                    .unknown()),
                payloadDescriptors: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of payloadDescriptor objects.")
                    .items(Joi.object({
                    objectType: Joi.string()
                        .allow("")
                        .default("EVENT_PAYLOAD_DESCRIPTOR")
                        .description("Used as discriminator, e.g. program.payloadDescriptors")
                        .min(0),
                    payloadType: Joi.string()
                        .description("Enumerated or private string signifying the nature of values.")
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
                    .description("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n")
                    .unknown()),
                intervalPeriod: Joi.object({
                    start: Joi.isoDateTime()
                        .description("datetime in ISO 8601 format")
                        .required(),
                    duration: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                        .min(0),
                    randomizeStart: Joi.string()
                        .allow("")
                        .default("PT0S")
                        .description("duration in ISO 8601 format")
                        .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                        .min(0),
                })
                    .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                    .unknown(),
                intervals: Joi.array()
                    .description("A list of interval objects.")
                    .required()
                    .items(Joi.object({
                    id: Joi.number()
                        .description("A client generated number assigned an interval object. Not a sequence number.")
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
                            .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                            .min(0),
                        randomizeStart: Joi.string()
                            .allow("")
                            .default("PT0S")
                            .description("duration in ISO 8601 format")
                            .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
                            .min(0),
                    })
                        .description("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                        .unknown(),
                    payloads: Joi.array()
                        .description("A list of valuesMap objects.")
                        .required()
                        .items(Joi.object({
                        type: Joi.string()
                            .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                            .required()
                            .max(128)
                            .min(1),
                        values: Joi.array()
                            .description("A list of data points. Most often a singular value such as a price.")
                            .required()
                            .items(Joi.alternatives()
                            .match("any")
                            .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                            x: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on a y axis.")
                                .required(),
                        })
                            .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                            .unknown())),
                    })
                        .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                        .unknown()),
                })
                    .description("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n")
                    .unknown()),
            })
                .description("Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets start time and duration of intervals.\n")
                .unknown(), Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                objectType: Joi.string()
                    .allow("SUBSCRIPTION")
                    .description("Used as discriminator, e.g. notification.object")
                    .only(),
                clientName: Joi.string()
                    .description("User generated identifier, may be VEN identifier provisioned during program enrollment.")
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
                    .items(Joi.object({
                    objects: Joi.array()
                        .description("list of objects to subscribe to.")
                        .required()
                        .items(Joi.string()
                        .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                        .description("Types of objects addressable through API.")
                        .only()),
                    operations: Joi.array()
                        .description("list of operations to subscribe to.")
                        .required()
                        .items(Joi.string()
                        .allow("GET", "POST", "PUT", "DELETE")
                        .description("object operation to subscribe to.")
                        .only()),
                    callbackUrl: Joi.string()
                        .description("User provided webhook URL.")
                        .required()
                        .uri({}),
                    bearerToken: Joi.string()
                        .allow("", null)
                        .default(null)
                        .description("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
                        .min(0),
                })
                    .description("object type, operations, and callbackUrl.")
                    .unknown()),
                targets: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of valuesMap objects. Used by server to filter callbacks.")
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
            })
                .description("An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n")
                .unknown(), Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                objectType: Joi.string()
                    .allow("VEN")
                    .description("Used as discriminator, e.g. notification.object.")
                    .only(),
                venName: Joi.string()
                    .description("User generated identifier, may be VEN identifier provisioned during program enrollment.")
                    .required()
                    .max(128)
                    .min(1),
                attributes: Joi.array()
                    .description("A list of valuesMap objects describing attributes.")
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                targets: Joi.array()
                    .description("A list of valuesMap objects describing target criteria.")
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                resources: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of resource objects representing end-devices or systems.")
                    .items(Joi.object({
                    id: Joi.string()
                        .description("URL safe VTN assigned object ID.")
                        .pattern(/^[a-zA-Z0-9_-]*$/, {})
                        .max(128)
                        .min(1),
                    createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                    modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                    objectType: Joi.string()
                        .allow("RESOURCE")
                        .description("Used as discriminator, e.g. notification.object")
                        .only(),
                    resourceName: Joi.string()
                        .description("User generated identifier, resource may be configured with identifier out-of-band.")
                        .required()
                        .max(128)
                        .min(1),
                    venID: Joi.string()
                        .description("URL safe VTN assigned object ID.")
                        .pattern(/^[a-zA-Z0-9_-]*$/, {})
                        .max(128)
                        .min(1),
                    attributes: Joi.array()
                        .description("A list of valuesMap objects describing attributes.")
                        .items(Joi.object({
                        type: Joi.string()
                            .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                            .required()
                            .max(128)
                            .min(1),
                        values: Joi.array()
                            .description("A list of data points. Most often a singular value such as a price.")
                            .required()
                            .items(Joi.alternatives()
                            .match("any")
                            .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                            x: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on a y axis.")
                                .required(),
                        })
                            .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                            .unknown())),
                    })
                        .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                        .unknown()),
                    targets: Joi.array()
                        .description("A list of valuesMap objects describing target criteria.")
                        .items(Joi.object({
                        type: Joi.string()
                            .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                            .required()
                            .max(128)
                            .min(1),
                        values: Joi.array()
                            .description("A list of data points. Most often a singular value such as a price.")
                            .required()
                            .items(Joi.alternatives()
                            .match("any")
                            .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                            x: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
                                .allow(null)
                                .default(null)
                                .description("A value on a y axis.")
                                .required(),
                        })
                            .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                            .unknown())),
                    })
                        .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                        .unknown()),
                })
                    .description("A resource is an energy device or system subject to control by a VEN.\n")
                    .unknown()),
            })
                .description("Ven represents a client with the ven role.")
                .unknown(), Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.isoDateTime().description("datetime in ISO 8601 format"),
                objectType: Joi.string()
                    .allow("RESOURCE")
                    .description("Used as discriminator, e.g. notification.object")
                    .only(),
                resourceName: Joi.string()
                    .description("User generated identifier, resource may be configured with identifier out-of-band.")
                    .required()
                    .max(128)
                    .min(1),
                venID: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                attributes: Joi.array()
                    .description("A list of valuesMap objects describing attributes.")
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                targets: Joi.array()
                    .description("A list of valuesMap objects describing target criteria.")
                    .items(Joi.object({
                    type: Joi.string()
                        .description('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n')
                        .required()
                        .max(128)
                        .min(1),
                    values: Joi.array()
                        .description("A list of data points. Most often a singular value such as a price.")
                        .required()
                        .items(Joi.alternatives()
                        .match("any")
                        .try(Joi.number(), Joi.number().integer(), Joi.string().allow("").min(0), Joi.boolean(), Joi.object({
                        x: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .allow(null)
                            .default(null)
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
            })
                .description("A resource is an energy device or system subject to control by a VEN.\n")
                .unknown()))
                .required(),
        })
            .description("VTN generated object included in request to subscription callbackUrl.\n")
            .unknown(),
        objectTypes: Joi.string()
            .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
            .description("Types of objects addressable through API.")
            .only(),
        dateTime: Joi.string().isoDate().description("datetime in ISO 8601 format"),
        duration: Joi.string()
            .allow("")
            .default("PT0S")
            .description("duration in ISO 8601 format")
            .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
            .min(0),
        problem: Joi.object({
            type: Joi.string()
                .default("about:blank")
                .description("An absolute URI that identifies the problem type.\nWhen dereferenced, it SHOULD provide human-readable documentation for the problem type\n(e.g., using HTML).\n")
                .uri({}),
            title: Joi.string()
                .allow("")
                .description("A short, summary of the problem type. Written in english and readable\nfor engineers (usually not suited for non technical stakeholders and\nnot localized); example: Service Unavailable.\n")
                .min(0),
            status: Joi.number()
                .description("The HTTP status code generated by the origin server for this occurrence\nof the problem.\n")
                .integer()
                .max(600)
                .min(100),
            detail: Joi.string()
                .allow("")
                .description("A human readable explanation specific to this occurrence of the\nproblem.\n")
                .min(0),
            instance: Joi.string()
                .description("An absolute URI that identifies the specific occurrence of the problem.\nIt may or may not yield further information if dereferenced.\n")
                .uri({}),
        })
            .description("reusable error response. From https://opensource.zalando.com/problem/schema.yaml.\n")
            .unknown(),
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2FkcjMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvam9pL29hZHIzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBbUIsTUFBTSxLQUFLLENBQUM7QUFDdEMsT0FBTyxFQUNILE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFDOUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUUxQyxrREFBa0Q7QUFDbEQsZ0ZBQWdGO0FBQ2hGLGlEQUFpRDtBQUNqRCxFQUFFO0FBQ0YsMkNBQTJDO0FBQzNDLDhCQUE4QjtBQUM5QiwwQkFBMEI7QUFDMUIsZ0NBQWdDO0FBQ2hDLEVBQUU7QUFDRix3REFBd0Q7QUFDeEQsRUFBRTtBQUNGLDhLQUE4SztBQUM5SyxvR0FBb0c7QUFDcEcsZ0ZBQWdGO0FBQ2hGLHNFQUFzRTtBQUN0RSxFQUFFO0FBQ0YscUNBQXFDO0FBQ3JDLG9DQUFvQztBQUNwQyxFQUFFO0FBQ0Ysd0VBQXdFO0FBQ3hFLDZEQUE2RDtBQUM3RCxxQkFBcUI7QUFDckIsRUFBRTtBQUNGLDREQUE0RDtBQUU1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQStCLENBQUM7S0FDdkMsTUFBTSxDQUFDLFdBQVcsQ0FBQztLQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDO0tBQ2YsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUNyQixVQUFVLEVBQUU7UUFDVixpQkFBaUIsRUFBRTtZQUNqQixJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDcEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLFVBQVUsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFlBQVks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Q25LO2lCQUNBLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtpQkFDaEIsS0FBSyxDQUFDLEVBQUUsQ0FBQztpQkFDVCxXQUFXLENBQ1YsOExBQThMLENBQy9MO2lCQUNBLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtpQkFDakIsV0FBVyxDQUNWLDRGQUE0RixDQUM3RjtpQkFDQSxPQUFPLEVBQUU7aUJBQ1QsR0FBRyxDQUFDLEdBQUcsQ0FBQztpQkFDUixHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ1gsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7aUJBQ2pCLEtBQUssQ0FBQyxFQUFFLENBQUM7aUJBQ1QsV0FBVyxDQUNWLDZFQUE2RSxDQUM5RTtpQkFDQSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1QsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7aUJBQ25CLFdBQVcsQ0FDVix5SUFBeUksQ0FDMUk7aUJBQ0EsR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNYLENBQUM7YUFDQyxXQUFXLENBQ1YscUZBQXFGLENBQ3RGO2FBQ0EsT0FBTyxFQUFFO0tBQ2I7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9Kb2ksIHsgRXh0ZW5zaW9uIH0gZnJvbSBcImpvaVwiO1xuaW1wb3J0IHtcbiAgICBpc29EYXRlLCBpc29EYXRlVGltZSwgaXNvVGltZSwgaXNvWWVhck1vbnRoXG59IGZyb20gJ2pvaS1pc28tZGF0ZXN0cmluZy9kaXN0L2luZGV4LmpzJztcblxuLy8gVGhlIHRyZWF0bWVudCBmb3IgdGhlIGZpcnN0IC5leHRlbmQgY29tZXMgZnJvbTpcbi8vICAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjcxMzI5NjkvdHlwZXNjcmlwdC1qb2ktZGF0ZS12YWxpZGF0aW9uXG4vLyBCeSBkZWZhdWx0IHRoZSBjb21waWxlciBpbnNpc3RlZCBpdCBoYWQgdG8gYmU6XG4vL1xuLy8gICBjb25zdCBKb2kgPSBfSm9pLmV4dGVuZChpc29EYXRlKF9Kb2kpKVxuLy8gICAgICAgIC5leHRlbmQoaXNvRGF0ZVRpbWUpXG4vLyAgICAgICAgLmV4dGVuZChpc29UaW1lKVxuLy8gICAgICAgIC5leHRlbmQoaXNvWWVhck1vbnRoKTtcbi8vXG4vLyBDYWxsaW5nIGBpc29EYXRlKF9Kb2kpYCB3YXMgZG9uZSB0byBhdm9pZCB0aGlzIGVycm9yOlxuLy9cbi8vIHNyYy9qb2kvb2FkcjMudHM6ODoyNSAtIGVycm9yIFRTMjM0NTogQXJndW1lbnQgb2YgdHlwZSAnKGpvaTogUm9vdCkgPT4gRXh0ZW5zaW9uIHwgRXh0ZW5zaW9uRmFjdG9yeScgaXMgbm90IGFzc2lnbmFibGUgdG8gcGFyYW1ldGVyIG9mIHR5cGUgJ0V4dGVuc2lvbiB8IEV4dGVuc2lvbkZhY3RvcnknLlxuLy8gIFR5cGUgJyhqb2k6IFJvb3QpID0+IEV4dGVuc2lvbiB8IEV4dGVuc2lvbkZhY3RvcnknIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHR5cGUgJ0V4dGVuc2lvbkZhY3RvcnknLlxuLy8gICAgVHlwZSAnRXh0ZW5zaW9uIHwgRXh0ZW5zaW9uRmFjdG9yeScgaXMgbm90IGFzc2lnbmFibGUgdG8gdHlwZSAnRXh0ZW5zaW9uJy5cbi8vICAgICAgVHlwZSAnRXh0ZW5zaW9uRmFjdG9yeScgaXMgbm90IGFzc2lnbmFibGUgdG8gdHlwZSAnRXh0ZW5zaW9uJy5cbi8vXG4vLyA4IGNvbnN0IEpvaSA9IF9Kb2kuZXh0ZW5kKGlzb0RhdGUpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5cbi8vXG4vLyBIYXZpbmcgdG8gY2FsbCBpc29EYXRlIGRpZCBub3QgbWFrZSBzZW5zZS4gIE5vbmUgb2YgdGhlIGRvY3VtZW50YXRpb25cbi8vIHNhaWQgYW55dGhpbmcgbGlrZSB0aGlzLiAgVGhlIGV4YW1wbGVzIHNob3cgc2ltcGx5IGxpc3Rpbmdcbi8vIHRoZSBKb2kgZXh0ZW5zaW9uLlxuLy9cbi8vIFRoZSBmb2xsb3dpbmcgY2FzdHMgaXQgdG8gYmUgd2hhdCBpdCBpcywgYSBKb2kgRXh0ZW5zaW9uLlxuXG5jb25zdCBKb2kgPSBfSm9pLmV4dGVuZChpc29EYXRlIGFzIHVua25vd24gYXMgRXh0ZW5zaW9uKVxuICAgICAgICAgICAgICAgIC5leHRlbmQoaXNvRGF0ZVRpbWUpXG4gICAgICAgICAgICAgICAgLmV4dGVuZChpc29UaW1lKVxuICAgICAgICAgICAgICAgIC5leHRlbmQoaXNvWWVhck1vbnRoKTtcblxuZXhwb3J0IGNvbnN0IHNjaGVtYXMgPSB7XG4gIHBhcmFtZXRlcnM6IHtcbiAgICBzZWFyY2hBbGxQcm9ncmFtczoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7XG4gICAgICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCkpLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIHNlYXJjaEFsbFJlcG9ydHM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgIC5taW4oMSksXG4gICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgICBzZWFyY2hBbGxFdmVudHM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgIC5taW4oMSksXG4gICAgICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCkpLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIHNlYXJjaFN1YnNjcmlwdGlvbnM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgIC5taW4oMSksXG4gICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VHlwZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRWYWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSksXG4gICAgICAgIG9iamVjdHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgICBzZWFyY2hWZW5zOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgdGFyZ2V0VHlwZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRWYWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSksXG4gICAgICAgIHNraXA6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5taW4oMCksXG4gICAgICAgIGxpbWl0OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWF4KDUwKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgc2VhcmNoVmVuUmVzb3VyY2VzOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgdGFyZ2V0VHlwZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRWYWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSksXG4gICAgICAgIHNraXA6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5taW4oMCksXG4gICAgICAgIGxpbWl0OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWF4KDUwKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgZmV0Y2hUb2tlbjoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7fSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe1xuICAgICAgICBjbGllbnRJRDogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLnJlcXVpcmVkKCkubWluKDApLFxuICAgICAgICBjbGllbnRTZWNyZXQ6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5yZXF1aXJlZCgpLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgcHJvZ3JhbTogSm9pLm9iamVjdCh7XG4gICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuaXNvRGF0ZVRpbWUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuaXNvRGF0ZVRpbWUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgKSxcbiAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJQUk9HUkFNXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICBwcm9ncmFtTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlNob3J0IG5hbWUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgcHJvZ3JhbS5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBwcm9ncmFtTG9uZ05hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiTG9uZyBuYW1lIG9mIHByb2dyYW0gZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgcmV0YWlsZXJOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlNob3J0IG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIHByb3ZpZGluZyB0aGUgcHJvZ3JhbS5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHJldGFpbGVyTG9uZ05hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiTG9uZyBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBwcm9ncmFtVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHByb2dyYW0gZGVmaW5lZCBjYXRlZ29yaXphdGlvbi5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIGNvdW50cnk6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQWxwaGEtMiBjb2RlIHBlciBJU08gMzE2Ni0xLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgcHJpbmNpcGFsU3ViZGl2aXNpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ29kaW5nIHBlciBJU08gMzE2Ni0yLiBFLmcuIHN0YXRlIGluIFVTLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgdGltZVpvbmVPZmZzZXQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgc3RhcnQ6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLnJlcXVpcmVkKCksXG4gICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgfSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAudW5rbm93bigpLFxuICAgICAgcHJvZ3JhbURlc2NyaXB0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIFVSTDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgaHVtYW4gb3IgbWFjaGluZSByZWFkYWJsZSBwcm9ncmFtIGRlc2NyaXB0aW9uXCIpXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC51cmkoe30pLFxuICAgICAgICAgIH0pLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgYmluZGluZ0V2ZW50czogSm9pLmJvb2xlYW4oKVxuICAgICAgICAuZGVmYXVsdChmYWxzZSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHJ1ZSBpZiBldmVudHMgYXJlIGZpeGVkIG9uY2UgdHJhbnNtaXR0ZWQuXCIpLFxuICAgICAgbG9jYWxQcmljZTogSm9pLmJvb2xlYW4oKVxuICAgICAgICAuZGVmYXVsdChmYWxzZSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHJ1ZSBpZiBldmVudHMgaGF2ZSBiZWVuIGFkYXB0ZWQgZnJvbSBhIGdyaWQgZXZlbnQuXCIpLFxuICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMTAwKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcIlByb3ZpZGVzIHByb2dyYW0gc3BlY2lmaWMgbWV0YWRhdGEgZnJvbSBWVE4gdG8gVkVOLlwiKVxuICAgICAgLnVua25vd24oKSxcbiAgICByZXBvcnQ6IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICksXG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiUkVQT1JUXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGV2ZW50SUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyOyBtYXkgYmUgVkVOIElEIHByb3Zpc2lvbmVkIGR1cmluZyBwcm9ncmFtIGVucm9sbG1lbnQuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHJlcG9ydE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcmVwb3J0UGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIGFjY3VyYWN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoMTAwKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAgICAgICAubWF4KDEwMClcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHJlc291cmNlczogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBsaXN0IG9mIG9iamVjdHMgY29udGFpbmluZyByZXBvcnQgZGF0YSBmb3IgYSBzZXQgb2YgcmVzb3VyY2VzLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllci4gQSB2YWx1ZSBvZiBBR0dSRUdBVEVEX1JFUE9SVCBpbmRpY2F0ZXMgYW4gYWdncmVnYXRpb24gb2YgbW9yZSB0aGF0IG9uZSByZXNvdXJjZSdzIGRhdGFcIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBzdGFydDogSm9pLmlzb0RhdGVUaW1lKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICBpbnRlcnZhbHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmlzb0RhdGVUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiUmVwb3J0IGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgcmVzb3VyY2UuXCIpXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcInJlcG9ydCBvYmplY3QuXCIpXG4gICAgICAudW5rbm93bigpLFxuICAgIGV2ZW50OiBKb2kub2JqZWN0KHtcbiAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICApLFxuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIkVWRU5UXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGV2ZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHByaW9yaXR5OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlJlbGF0aXZlIHByaW9yaXR5IG9mIGV2ZW50LiBBIGxvd2VyIG51bWJlciBpcyBhIGhpZ2hlciBwcmlvcml0eS5cIlxuICAgICAgICApXG4gICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcmVwb3J0RGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgICApXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBhZ2dyZWdhdGU6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlRydWUgaWYgcmVwb3J0IHNob3VsZCBhZ2dyZWdhdGUgcmVzdWx0cyBmcm9tIGFsbCB0YXJnZXRlZCByZXNvdXJjZXMuXFxuRmFsc2UgaWYgcmVwb3J0IGluY2x1ZGVzIHJlc3VsdHMgZm9yIGVhY2ggcmVzb3VyY2UuXFxuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXJ0SW50ZXJ2YWw6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVGhlIGludGVydmFsIG9uIHdoaWNoIHRvIGdlbmVyYXRlIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyBnZW5lcmF0ZSByZXBvcnQgYXQgZW5kIG9mIGxhc3QgaW50ZXJ2YWwuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgbnVtSW50ZXJ2YWxzOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgaGlzdG9yaWNhbDogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAuZGVmYXVsdCh0cnVlKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJUcnVlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIHByZWNlZGluZyBzdGFydEludGVydmFsLlxcbkZhbHNlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIGZvbGxvd2luZyBzdGFydEludGVydmFsIChlLmcuIGZvcmVjYXN0KS5cXG5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgZnJlcXVlbmN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICByZXBlYXQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAuZGVmYXVsdCgxKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkFuIG9iamVjdCB0aGF0IG1heSBiZSB1c2VkIHRvIHJlcXVlc3QgYSByZXBvcnQgZnJvbSBhIFZFTi5cXG5TZWUgT3BlbkFEUiBSRVNUIFVzZXIgR3VpZGUgZm9yIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIGhvdyBjb25maWd1cmUgYSByZXBvcnQgcmVxdWVzdC5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgLmRlZmF1bHQoXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICBzdGFydDogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIikucmVxdWlyZWQoKSxcbiAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5taW4oMCksXG4gICAgICB9KVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC51bmtub3duKCksXG4gICAgICBpbnRlcnZhbHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBzdGFydDogSm9pLmlzb0RhdGVUaW1lKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkV2ZW50IG9iamVjdCB0byBjb21tdW5pY2F0ZSBhIERlbWFuZCBSZXNwb25zZSByZXF1ZXN0IHRvIFZFTi5cXG5JZiBpbnRlcnZhbFBlcmlvZCBpcyBwcmVzZW50LCBzZXRzIHN0YXJ0IHRpbWUgYW5kIGR1cmF0aW9uIG9mIGludGVydmFscy5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBzdWJzY3JpcHRpb246IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICksXG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiU1VCU0NSSVBUSU9OXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIGR1cmluZyBwcm9ncmFtIGVucm9sbG1lbnQuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgb2JqZWN0T3BlcmF0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgb2JqZWN0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvYmplY3RzIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBvcGVyYXRpb25zOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9wZXJhdGlvbnMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3Qgb3BlcmF0aW9uIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNhbGxiYWNrVXJsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlciBwcm92aWRlZCB3ZWJob29rIFVSTC5cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLnVyaSh7fSksXG4gICAgICAgICAgICBiZWFyZXJUb2tlbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwib2JqZWN0IHR5cGUsIG9wZXJhdGlvbnMsIGFuZCBjYWxsYmFja1VybC5cIilcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuIFVzZWQgYnkgc2VydmVyIHRvIGZpbHRlciBjYWxsYmFja3MuXCJcbiAgICAgICAgKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkFuIG9iamVjdCBjcmVhdGVkIGJ5IGEgY2xpZW50IHRvIHJlY2VpdmUgbm90aWZpY2F0aW9uIG9mIG9wZXJhdGlvbnMgb24gb2JqZWN0cy5cXG5DbGllbnRzIG1heSBzdWJzY3JpYmUgdG8gYmUgbm90aWZpZWQgd2hlbiBhIHR5cGUgb2Ygb2JqZWN0IGlzIGNyZWF0ZWQsXFxudXBkYXRlZCwgb3IgZGVsZXRlZC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICB2ZW46IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICksXG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiVkVOXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0LlwiKVxuICAgICAgICAub25seSgpLFxuICAgICAgdmVuTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBkdXJpbmcgcHJvZ3JhbSBlbnJvbGxtZW50LlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICByZXNvdXJjZXM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2YgcmVzb3VyY2Ugb2JqZWN0cyByZXByZXNlbnRpbmcgZW5kLWRldmljZXMgb3Igc3lzdGVtcy5cIlxuICAgICAgICApXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlJFU09VUkNFXCIpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZlbklEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiQSByZXNvdXJjZSBpcyBhbiBlbmVyZ3kgZGV2aWNlIG9yIHN5c3RlbSBzdWJqZWN0IHRvIGNvbnRyb2wgYnkgYSBWRU4uXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFwiVmVuIHJlcHJlc2VudHMgYSBjbGllbnQgd2l0aCB0aGUgdmVuIHJvbGUuXCIpXG4gICAgICAudW5rbm93bigpLFxuICAgIHJlc291cmNlOiBKb2kub2JqZWN0KHtcbiAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICApLFxuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlJFU09VUkNFXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHZlbklEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBpbnRlcnZhbDogSm9pLm9iamVjdCh7XG4gICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICBzdGFydDogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIikucmVxdWlyZWQoKSxcbiAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5taW4oMCksXG4gICAgICB9KVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC51bmtub3duKCksXG4gICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgc3RhcnQ6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLnJlcXVpcmVkKCksXG4gICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAge31cbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgdmFsdWVzTWFwOiBKb2kub2JqZWN0KHtcbiAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBwb2ludDogSm9pLm9iamVjdCh7XG4gICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgZXZlbnRQYXlsb2FkRGVzY3JpcHRvcjogSm9pLm9iamVjdCh7XG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZWZhdWx0KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiKVxuICAgICAgICAubWluKDApLFxuICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcjogSm9pLm9iamVjdCh7XG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZWZhdWx0KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgKSxcbiAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVmYXVsdCgxMDApXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICByZXBvcnREZXNjcmlwdG9yOiBKb2kub2JqZWN0KHtcbiAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICBhZ2dyZWdhdGU6IEpvaS5ib29sZWFuKClcbiAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlRydWUgaWYgcmVwb3J0IHNob3VsZCBhZ2dyZWdhdGUgcmVzdWx0cyBmcm9tIGFsbCB0YXJnZXRlZCByZXNvdXJjZXMuXFxuRmFsc2UgaWYgcmVwb3J0IGluY2x1ZGVzIHJlc3VsdHMgZm9yIGVhY2ggcmVzb3VyY2UuXFxuXCJcbiAgICAgICAgKSxcbiAgICAgIHN0YXJ0SW50ZXJ2YWw6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVGhlIGludGVydmFsIG9uIHdoaWNoIHRvIGdlbmVyYXRlIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyBnZW5lcmF0ZSByZXBvcnQgYXQgZW5kIG9mIGxhc3QgaW50ZXJ2YWwuXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgbnVtSW50ZXJ2YWxzOiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgaGlzdG9yaWNhbDogSm9pLmJvb2xlYW4oKVxuICAgICAgICAuZGVmYXVsdCh0cnVlKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUcnVlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIHByZWNlZGluZyBzdGFydEludGVydmFsLlxcbkZhbHNlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIGZvbGxvd2luZyBzdGFydEludGVydmFsIChlLmcuIGZvcmVjYXN0KS5cXG5cIlxuICAgICAgICApLFxuICAgICAgZnJlcXVlbmN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICByZXBlYXQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVmYXVsdCgxKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkFuIG9iamVjdCB0aGF0IG1heSBiZSB1c2VkIHRvIHJlcXVlc3QgYSByZXBvcnQgZnJvbSBhIFZFTi5cXG5TZWUgT3BlbkFEUiBSRVNUIFVzZXIgR3VpZGUgZm9yIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIGhvdyBjb25maWd1cmUgYSByZXBvcnQgcmVxdWVzdC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBvYmplY3RJRDogSm9pLnN0cmluZygpXG4gICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLm1pbigxKSxcbiAgICBub3RpZmljYXRpb246IEpvaS5vYmplY3Qoe1xuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlBST0dSQU1cIiwgXCJFVkVOVFwiLCBcIlJFUE9SVFwiLCBcIlNVQlNDUklQVElPTlwiLCBcIlZFTlwiLCBcIlJFU09VUkNFXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgIC5vbmx5KClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBvcGVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcInRoZSBvcGVyYXRpb24gb24gb24gb2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoZSBub3RpZmljYXRpb24uXCJcbiAgICAgICAgKVxuICAgICAgICAub25seSgpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICBvYmplY3Q6IEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgLnRyeShcbiAgICAgICAgICBKb2kub2JqZWN0KHt9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwidGhlIG9iamVjdCB0aGF0IGlzIHRoZSBzdWJqZWN0IG9mIHRoZSBub3RpZmljYXRpb24uXCIpXG4gICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgLm1hdGNoKFwib25lXCIpXG4gICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJQUk9HUkFNXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTaG9ydCBuYW1lIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHByb2dyYW0uXCIpXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIHByb2dyYW1Mb25nTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJMb25nIG5hbWUgb2YgcHJvZ3JhbSBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCIpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHJldGFpbGVyTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiU2hvcnQgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgcHJvdmlkaW5nIHRoZSBwcm9ncmFtLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHJldGFpbGVyTG9uZ05hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkxvbmcgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHByb2dyYW1UeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgcHJvZ3JhbSBkZWZpbmVkIGNhdGVnb3JpemF0aW9uLlwiKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkFscGhhLTIgY29kZSBwZXIgSVNPIDMxNjYtMS5cIilcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcHJpbmNpcGFsU3ViZGl2aXNpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ29kaW5nIHBlciBJU08gMzE2Ni0yLiBFLmcuIHN0YXRlIGluIFVTLlwiKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICB0aW1lWm9uZU9mZnNldDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuaXNvRGF0ZVRpbWUoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbURlc2NyaXB0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIFVSTDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBodW1hbiBvciBtYWNoaW5lIHJlYWRhYmxlIHByb2dyYW0gZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51cmkoe30pLFxuICAgICAgICAgICAgICAgICAgICB9KS51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgYmluZGluZ0V2ZW50czogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJUcnVlIGlmIGV2ZW50cyBhcmUgZml4ZWQgb25jZSB0cmFuc21pdHRlZC5cIiksXG4gICAgICAgICAgICAgICAgbG9jYWxQcmljZTogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiBldmVudHMgaGF2ZSBiZWVuIGFkYXB0ZWQgZnJvbSBhIGdyaWQgZXZlbnQuXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IGV2ZW50IHZhbHVlc01hcCB2YWx1ZXMuXFxuRS5nLiBhIFBSSUNFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgcHJpY2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGN1cnJlbmN5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJQcm92aWRlcyBwcm9ncmFtIHNwZWNpZmljIG1ldGFkYXRhIGZyb20gVlROIHRvIFZFTi5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJSRVBPUlRcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgZXZlbnRJRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllcjsgbWF5IGJlIFZFTiBJRCBwcm92aXNpb25lZCBkdXJpbmcgcHJvZ3JhbSBlbnJvbGxtZW50LlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIHJlcG9ydE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZGVmaW5lZCBzdHJpbmcgZm9yIHVzZSBpbiBkZWJ1Z2dpbmcgb3IgVXNlciBJbnRlcmZhY2UuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHJlcG9ydFBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBvYmplY3RzIGNvbnRhaW5pbmcgcmVwb3J0IGRhdGEgZm9yIGEgc2V0IG9mIHJlc291cmNlcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuaXNvRGF0ZVRpbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5pc29EYXRlVGltZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiUmVwb3J0IGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgcmVzb3VyY2UuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJyZXBvcnQgb2JqZWN0LlwiKVxuICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmlzb0RhdGVUaW1lKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIkVWRU5UXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiUmVsYXRpdmUgcHJpb3JpdHkgb2YgZXZlbnQuIEEgbG93ZXIgbnVtYmVyIGlzIGEgaGlnaGVyIHByaW9yaXR5LlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICByZXBvcnREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SW50ZXJ2YWw6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVGhlIGludGVydmFsIG9uIHdoaWNoIHRvIGdlbmVyYXRlIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyBnZW5lcmF0ZSByZXBvcnQgYXQgZW5kIG9mIGxhc3QgaW50ZXJ2YWwuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgbnVtSW50ZXJ2YWxzOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgaGlzdG9yaWNhbDogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUcnVlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIHByZWNlZGluZyBzdGFydEludGVydmFsLlxcbkZhbHNlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIGZvbGxvd2luZyBzdGFydEludGVydmFsIChlLmcuIGZvcmVjYXN0KS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiTnVtYmVyIG9mIGludGVydmFscyB0aGF0IGVsYXBzZSBiZXR3ZWVuIHJlcG9ydHMuXFxuLTEgaW5kaWNhdGVzIHNhbWUgYXMgbnVtSW50ZXJ2YWxzLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIk51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgcmVwb3J0LlxcbjEgaW5kaWNhdGVzIGdlbmVyYXRlIG9uZSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHJlcGVhdCBpbmRlZmluaXRlbHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuU2VlIE9wZW5BRFIgUkVTVCBVc2VyIEd1aWRlIGZvciBkZXRhaWxlZCBkZXNjcmlwdGlvbiBvZiBob3cgY29uZmlndXJlIGEgcmVwb3J0IHJlcXVlc3QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3Igb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmlzb0RhdGVUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgIGludGVydmFsczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuaXNvRGF0ZVRpbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJFdmVudCBvYmplY3QgdG8gY29tbXVuaWNhdGUgYSBEZW1hbmQgUmVzcG9uc2UgcmVxdWVzdCB0byBWRU4uXFxuSWYgaW50ZXJ2YWxQZXJpb2QgaXMgcHJlc2VudCwgc2V0cyBzdGFydCB0aW1lIGFuZCBkdXJhdGlvbiBvZiBpbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuaXNvRGF0ZVRpbWUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuaXNvRGF0ZVRpbWUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiU1VCU0NSSVBUSU9OXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIG9iamVjdE9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImxpc3Qgb2Ygb2JqZWN0cyB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3Qgb3BlcmF0aW9uIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrVXJsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZXIgcHJvdmlkZWQgd2ViaG9vayBVUkwuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVyaSh7fSksXG4gICAgICAgICAgICAgICAgICAgICAgYmVhcmVyVG9rZW46IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgcHJvdmlkZWQgdG9rZW4uXFxuVG8gYXZvaWQgY3VzdG9tIGludGVncmF0aW9ucywgY2FsbGJhY2sgZW5kcG9pbnRzXFxuc2hvdWxkIGFjY2VwdCB0aGUgcHJvdmlkZWQgYmVhcmVyIHRva2VuIHRvIGF1dGhlbnRpY2F0ZSBWVE4gcmVxdWVzdHMuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwib2JqZWN0IHR5cGUsIG9wZXJhdGlvbnMsIGFuZCBjYWxsYmFja1VybC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLiBVc2VkIGJ5IHNlcnZlciB0byBmaWx0ZXIgY2FsbGJhY2tzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBjcmVhdGVkIGJ5IGEgY2xpZW50IHRvIHJlY2VpdmUgbm90aWZpY2F0aW9uIG9mIG9wZXJhdGlvbnMgb24gb2JqZWN0cy5cXG5DbGllbnRzIG1heSBzdWJzY3JpYmUgdG8gYmUgbm90aWZpZWQgd2hlbiBhIHR5cGUgb2Ygb2JqZWN0IGlzIGNyZWF0ZWQsXFxudXBkYXRlZCwgb3IgZGVsZXRlZC5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJWRU5cIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICB2ZW5OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHJlc291cmNlIG9iamVjdHMgcmVwcmVzZW50aW5nIGVuZC1kZXZpY2VzIG9yIHN5c3RlbXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuaXNvRGF0ZVRpbWUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuaXNvRGF0ZVRpbWUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiUkVTT1VSQ0VcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgcmVzb3VyY2UgbWF5IGJlIGNvbmZpZ3VyZWQgd2l0aCBpZGVudGlmaWVyIG91dC1vZi1iYW5kLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHZlbklEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSByZXNvdXJjZSBpcyBhbiBlbmVyZ3kgZGV2aWNlIG9yIHN5c3RlbSBzdWJqZWN0IHRvIGNvbnRyb2wgYnkgYSBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJWZW4gcmVwcmVzZW50cyBhIGNsaWVudCB3aXRoIHRoZSB2ZW4gcm9sZS5cIilcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5pc29EYXRlVGltZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJSRVNPVVJDRVwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgdmVuSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJWVE4gZ2VuZXJhdGVkIG9iamVjdCBpbmNsdWRlZCBpbiByZXF1ZXN0IHRvIHN1YnNjcmlwdGlvbiBjYWxsYmFja1VybC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBvYmplY3RUeXBlczogSm9pLnN0cmluZygpXG4gICAgICAuYWxsb3coXCJQUk9HUkFNXCIsIFwiRVZFTlRcIiwgXCJSRVBPUlRcIiwgXCJTVUJTQ1JJUFRJT05cIiwgXCJWRU5cIiwgXCJSRVNPVVJDRVwiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgIC5vbmx5KCksXG4gICAgZGF0ZVRpbWU6IEpvaS5zdHJpbmcoKS5pc29EYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLnBhdHRlcm4oXG4gICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgICAgLm1pbigwKSxcbiAgICBwcm9ibGVtOiBKb2kub2JqZWN0KHtcbiAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVmYXVsdChcImFib3V0OmJsYW5rXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkFuIGFic29sdXRlIFVSSSB0aGF0IGlkZW50aWZpZXMgdGhlIHByb2JsZW0gdHlwZS5cXG5XaGVuIGRlcmVmZXJlbmNlZCwgaXQgU0hPVUxEIHByb3ZpZGUgaHVtYW4tcmVhZGFibGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIHByb2JsZW0gdHlwZVxcbihlLmcuLCB1c2luZyBIVE1MKS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC51cmkoe30pLFxuICAgICAgdGl0bGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBzaG9ydCwgc3VtbWFyeSBvZiB0aGUgcHJvYmxlbSB0eXBlLiBXcml0dGVuIGluIGVuZ2xpc2ggYW5kIHJlYWRhYmxlXFxuZm9yIGVuZ2luZWVycyAodXN1YWxseSBub3Qgc3VpdGVkIGZvciBub24gdGVjaG5pY2FsIHN0YWtlaG9sZGVycyBhbmRcXG5ub3QgbG9jYWxpemVkKTsgZXhhbXBsZTogU2VydmljZSBVbmF2YWlsYWJsZS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBzdGF0dXM6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUaGUgSFRUUCBzdGF0dXMgY29kZSBnZW5lcmF0ZWQgYnkgdGhlIG9yaWdpbiBzZXJ2ZXIgZm9yIHRoaXMgb2NjdXJyZW5jZVxcbm9mIHRoZSBwcm9ibGVtLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAubWF4KDYwMClcbiAgICAgICAgLm1pbigxMDApLFxuICAgICAgZGV0YWlsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgaHVtYW4gcmVhZGFibGUgZXhwbGFuYXRpb24gc3BlY2lmaWMgdG8gdGhpcyBvY2N1cnJlbmNlIG9mIHRoZVxcbnByb2JsZW0uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgICAgaW5zdGFuY2U6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBbiBhYnNvbHV0ZSBVUkkgdGhhdCBpZGVudGlmaWVzIHRoZSBzcGVjaWZpYyBvY2N1cnJlbmNlIG9mIHRoZSBwcm9ibGVtLlxcbkl0IG1heSBvciBtYXkgbm90IHlpZWxkIGZ1cnRoZXIgaW5mb3JtYXRpb24gaWYgZGVyZWZlcmVuY2VkLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnVyaSh7fSksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJyZXVzYWJsZSBlcnJvciByZXNwb25zZS4gRnJvbSBodHRwczovL29wZW5zb3VyY2UuemFsYW5kby5jb20vcHJvYmxlbS9zY2hlbWEueWFtbC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgfSxcbn07XG4iXX0=