/* eslint-disable */
/* prettier-ignore */
import Joi from "joi";
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
            createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
            modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                start: Joi.date().description("datetime in ISO 8601 format").required(),
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
            createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
            modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                    start: Joi.date()
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
                        start: Joi.date()
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
            createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
            modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                start: Joi.date().description("datetime in ISO 8601 format").required(),
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
                    start: Joi.date()
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
            createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
            modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
            createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
            modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
            createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
            modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                start: Joi.date().description("datetime in ISO 8601 format").required(),
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
            start: Joi.date().description("datetime in ISO 8601 format").required(),
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
                createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                    start: Joi.date()
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
                createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                        start: Joi.date()
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
                            start: Joi.date()
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
                createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                    start: Joi.date()
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
                        start: Joi.date()
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
                createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                    createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
                    modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
                createdDateTime: Joi.date().description("datetime in ISO 8601 format"),
                modificationDateTime: Joi.date().description("datetime in ISO 8601 format"),
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
        dateTime: Joi.date().description("datetime in ISO 8601 format"),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2FkcjMuMC4xLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pvaS9vYWRyMy4wLjEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLHFCQUFxQjtBQUNyQixPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUE7QUFFckIsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHO0lBQ3JCLFVBQVUsRUFBRTtRQUNWLGlCQUFpQixFQUFFO1lBQ2pCLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNwQixLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsWUFBWSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUU7cUJBQ3RCLFFBQVEsRUFBRTtxQkFDVixLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN4RCxDQUFDO1lBQ0YsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUN2QjtRQUNELGdCQUFnQixFQUFFO1lB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LENBQUM7YUFDQyxXQUFXLENBQ1YscUZBQXFGLENBQ3RGO2FBQ0EsT0FBTyxFQUFFO0tBQ2I7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIHByZXR0aWVyLWlnbm9yZSAqL1xuaW1wb3J0IEpvaSBmcm9tIFwiam9pXCJcblxuZXhwb3J0IGNvbnN0IHNjaGVtYXMgPSB7XG4gIHBhcmFtZXRlcnM6IHtcbiAgICBzZWFyY2hBbGxQcm9ncmFtczoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7XG4gICAgICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCkpLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIHNlYXJjaEFsbFJlcG9ydHM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgIC5taW4oMSksXG4gICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgICBzZWFyY2hBbGxFdmVudHM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgIC5taW4oMSksXG4gICAgICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCkpLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIHNlYXJjaFN1YnNjcmlwdGlvbnM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgIC5taW4oMSksXG4gICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VHlwZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRWYWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSksXG4gICAgICAgIG9iamVjdHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgICBzZWFyY2hWZW5zOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgdGFyZ2V0VHlwZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRWYWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSksXG4gICAgICAgIHNraXA6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5taW4oMCksXG4gICAgICAgIGxpbWl0OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWF4KDUwKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgc2VhcmNoVmVuUmVzb3VyY2VzOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgdGFyZ2V0VHlwZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRWYWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSksXG4gICAgICAgIHNraXA6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5taW4oMCksXG4gICAgICAgIGxpbWl0OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWF4KDUwKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgZmV0Y2hUb2tlbjoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7fSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe1xuICAgICAgICBjbGllbnRJRDogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLnJlcXVpcmVkKCkubWluKDApLFxuICAgICAgICBjbGllbnRTZWNyZXQ6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5yZXF1aXJlZCgpLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgcHJvZ3JhbTogSm9pLm9iamVjdCh7XG4gICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICksXG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiUFJPR1JBTVwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgICAub25seSgpLFxuICAgICAgcHJvZ3JhbU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJTaG9ydCBuYW1lIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHByb2dyYW0uXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcHJvZ3JhbUxvbmdOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkxvbmcgbmFtZSBvZiBwcm9ncmFtIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHJldGFpbGVyTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJTaG9ydCBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBwcm92aWRpbmcgdGhlIHByb2dyYW0uXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICByZXRhaWxlckxvbmdOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkxvbmcgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgcHJvZ3JhbVR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBwcm9ncmFtIGRlZmluZWQgY2F0ZWdvcml6YXRpb24uXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBjb3VudHJ5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkFscGhhLTIgY29kZSBwZXIgSVNPIDMxNjYtMS5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHByaW5jaXBhbFN1YmRpdmlzaW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkNvZGluZyBwZXIgSVNPIDMxNjYtMi4gRS5nLiBzdGF0ZSBpbiBVUy5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHRpbWVab25lT2Zmc2V0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICB7fVxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLnJlcXVpcmVkKCksXG4gICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgfSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAudW5rbm93bigpLFxuICAgICAgcHJvZ3JhbURlc2NyaXB0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIFVSTDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgaHVtYW4gb3IgbWFjaGluZSByZWFkYWJsZSBwcm9ncmFtIGRlc2NyaXB0aW9uXCIpXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC51cmkoe30pLFxuICAgICAgICAgIH0pLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgYmluZGluZ0V2ZW50czogSm9pLmJvb2xlYW4oKVxuICAgICAgICAuZGVmYXVsdChmYWxzZSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHJ1ZSBpZiBldmVudHMgYXJlIGZpeGVkIG9uY2UgdHJhbnNtaXR0ZWQuXCIpLFxuICAgICAgbG9jYWxQcmljZTogSm9pLmJvb2xlYW4oKVxuICAgICAgICAuZGVmYXVsdChmYWxzZSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHJ1ZSBpZiBldmVudHMgaGF2ZSBiZWVuIGFkYXB0ZWQgZnJvbSBhIGdyaWQgZXZlbnQuXCIpLFxuICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMTAwKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcIlByb3ZpZGVzIHByb2dyYW0gc3BlY2lmaWMgbWV0YWRhdGEgZnJvbSBWVE4gdG8gVkVOLlwiKVxuICAgICAgLnVua25vd24oKSxcbiAgICByZXBvcnQ6IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICApLFxuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlJFUE9SVFwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgICAub25seSgpLFxuICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBldmVudElEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllcjsgbWF5IGJlIFZFTiBJRCBwcm92aXNpb25lZCBkdXJpbmcgcHJvZ3JhbSBlbnJvbGxtZW50LlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICByZXBvcnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZGVmaW5lZCBzdHJpbmcgZm9yIHVzZSBpbiBkZWJ1Z2dpbmcgb3IgVXNlciBJbnRlcmZhY2UuXCJcbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHJlcG9ydFBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAuZGVmYXVsdChcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICBhY2N1cmFjeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KDEwMClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgLm1heCgxMDApXG4gICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICByZXNvdXJjZXM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgbGlzdCBvZiBvYmplY3RzIGNvbnRhaW5pbmcgcmVwb3J0IGRhdGEgZm9yIGEgc2V0IG9mIHJlc291cmNlcy5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIuIEEgdmFsdWUgb2YgQUdHUkVHQVRFRF9SRVBPUlQgaW5kaWNhdGVzIGFuIGFnZ3JlZ2F0aW9uIG9mIG1vcmUgdGhhdCBvbmUgcmVzb3VyY2UncyBkYXRhXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICBpbnRlcnZhbHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgIHBheWxvYWRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJSZXBvcnQgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSByZXNvdXJjZS5cIilcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFwicmVwb3J0IG9iamVjdC5cIilcbiAgICAgIC51bmtub3duKCksXG4gICAgZXZlbnQ6IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICApLFxuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIkVWRU5UXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGV2ZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHByaW9yaXR5OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlJlbGF0aXZlIHByaW9yaXR5IG9mIGV2ZW50LiBBIGxvd2VyIG51bWJlciBpcyBhIGhpZ2hlciBwcmlvcml0eS5cIlxuICAgICAgICApXG4gICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcmVwb3J0RGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgICApXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBhZ2dyZWdhdGU6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlRydWUgaWYgcmVwb3J0IHNob3VsZCBhZ2dyZWdhdGUgcmVzdWx0cyBmcm9tIGFsbCB0YXJnZXRlZCByZXNvdXJjZXMuXFxuRmFsc2UgaWYgcmVwb3J0IGluY2x1ZGVzIHJlc3VsdHMgZm9yIGVhY2ggcmVzb3VyY2UuXFxuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXJ0SW50ZXJ2YWw6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVGhlIGludGVydmFsIG9uIHdoaWNoIHRvIGdlbmVyYXRlIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyBnZW5lcmF0ZSByZXBvcnQgYXQgZW5kIG9mIGxhc3QgaW50ZXJ2YWwuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgbnVtSW50ZXJ2YWxzOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgaGlzdG9yaWNhbDogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAuZGVmYXVsdCh0cnVlKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJUcnVlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIHByZWNlZGluZyBzdGFydEludGVydmFsLlxcbkZhbHNlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIGZvbGxvd2luZyBzdGFydEludGVydmFsIChlLmcuIGZvcmVjYXN0KS5cXG5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgZnJlcXVlbmN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICByZXBlYXQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAuZGVmYXVsdCgxKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkFuIG9iamVjdCB0aGF0IG1heSBiZSB1c2VkIHRvIHJlcXVlc3QgYSByZXBvcnQgZnJvbSBhIFZFTi5cXG5TZWUgT3BlbkFEUiBSRVNUIFVzZXIgR3VpZGUgZm9yIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIGhvdyBjb25maWd1cmUgYSByZXBvcnQgcmVxdWVzdC5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgLmRlZmF1bHQoXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKS5yZXF1aXJlZCgpLFxuICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5taW4oMCksXG4gICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgIH0pXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnVua25vd24oKSxcbiAgICAgIGludGVydmFsczogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIGlkOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgcGF5bG9hZHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJFdmVudCBvYmplY3QgdG8gY29tbXVuaWNhdGUgYSBEZW1hbmQgUmVzcG9uc2UgcmVxdWVzdCB0byBWRU4uXFxuSWYgaW50ZXJ2YWxQZXJpb2QgaXMgcHJlc2VudCwgc2V0cyBzdGFydCB0aW1lIGFuZCBkdXJhdGlvbiBvZiBpbnRlcnZhbHMuXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgc3Vic2NyaXB0aW9uOiBKb2kub2JqZWN0KHtcbiAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgKSxcbiAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJTVUJTQ1JJUFRJT05cIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgICAgLm9ubHkoKSxcbiAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBvYmplY3RPcGVyYXRpb25zOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9iamVjdHMgYW5kIG9wZXJhdGlvbnMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBvYmplY3RzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9iamVjdHMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIm9iamVjdCBvcGVyYXRpb24gdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgY2FsbGJhY2tVcmw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VyIHByb3ZpZGVkIHdlYmhvb2sgVVJMLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICAgIGJlYXJlclRva2VuOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlVzZXIgcHJvdmlkZWQgdG9rZW4uXFxuVG8gYXZvaWQgY3VzdG9tIGludGVncmF0aW9ucywgY2FsbGJhY2sgZW5kcG9pbnRzXFxuc2hvdWxkIGFjY2VwdCB0aGUgcHJvdmlkZWQgYmVhcmVyIHRva2VuIHRvIGF1dGhlbnRpY2F0ZSBWVE4gcmVxdWVzdHMuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3QgdHlwZSwgb3BlcmF0aW9ucywgYW5kIGNhbGxiYWNrVXJsLlwiKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy4gVXNlZCBieSBzZXJ2ZXIgdG8gZmlsdGVyIGNhbGxiYWNrcy5cIlxuICAgICAgICApXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQW4gb2JqZWN0IGNyZWF0ZWQgYnkgYSBjbGllbnQgdG8gcmVjZWl2ZSBub3RpZmljYXRpb24gb2Ygb3BlcmF0aW9ucyBvbiBvYmplY3RzLlxcbkNsaWVudHMgbWF5IHN1YnNjcmliZSB0byBiZSBub3RpZmllZCB3aGVuIGEgdHlwZSBvZiBvYmplY3QgaXMgY3JlYXRlZCxcXG51cGRhdGVkLCBvciBkZWxldGVkLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIHZlbjogSm9pLm9iamVjdCh7XG4gICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICksXG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiVkVOXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0LlwiKVxuICAgICAgICAub25seSgpLFxuICAgICAgdmVuTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBkdXJpbmcgcHJvZ3JhbSBlbnJvbGxtZW50LlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICByZXNvdXJjZXM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2YgcmVzb3VyY2Ugb2JqZWN0cyByZXByZXNlbnRpbmcgZW5kLWRldmljZXMgb3Igc3lzdGVtcy5cIlxuICAgICAgICApXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJSRVNPVVJDRVwiKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgcmVzb3VyY2UgbWF5IGJlIGNvbmZpZ3VyZWQgd2l0aCBpZGVudGlmaWVyIG91dC1vZi1iYW5kLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2ZW5JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgYXR0cmlidXRlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIilcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcIlZlbiByZXByZXNlbnRzIGEgY2xpZW50IHdpdGggdGhlIHZlbiByb2xlLlwiKVxuICAgICAgLnVua25vd24oKSxcbiAgICByZXNvdXJjZTogSm9pLm9iamVjdCh7XG4gICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICksXG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiUkVTT1VSQ0VcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgICAgLm9ubHkoKSxcbiAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIHJlc291cmNlIG1heSBiZSBjb25maWd1cmVkIHdpdGggaWRlbnRpZmllciBvdXQtb2YtYmFuZC5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgdmVuSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIGludGVydmFsOiBKb2kub2JqZWN0KHtcbiAgICAgIGlkOiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLnJlcXVpcmVkKCksXG4gICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgfSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAudW5rbm93bigpLFxuICAgICAgcGF5bG9hZHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLnJlcXVpcmVkKCksXG4gICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAge31cbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgdmFsdWVzTWFwOiBKb2kub2JqZWN0KHtcbiAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBwb2ludDogSm9pLm9iamVjdCh7XG4gICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgZXZlbnRQYXlsb2FkRGVzY3JpcHRvcjogSm9pLm9iamVjdCh7XG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZWZhdWx0KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiKVxuICAgICAgICAubWluKDApLFxuICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcjogSm9pLm9iamVjdCh7XG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZWZhdWx0KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgKSxcbiAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVmYXVsdCgxMDApXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICByZXBvcnREZXNjcmlwdG9yOiBKb2kub2JqZWN0KHtcbiAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICBhZ2dyZWdhdGU6IEpvaS5ib29sZWFuKClcbiAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlRydWUgaWYgcmVwb3J0IHNob3VsZCBhZ2dyZWdhdGUgcmVzdWx0cyBmcm9tIGFsbCB0YXJnZXRlZCByZXNvdXJjZXMuXFxuRmFsc2UgaWYgcmVwb3J0IGluY2x1ZGVzIHJlc3VsdHMgZm9yIGVhY2ggcmVzb3VyY2UuXFxuXCJcbiAgICAgICAgKSxcbiAgICAgIHN0YXJ0SW50ZXJ2YWw6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVGhlIGludGVydmFsIG9uIHdoaWNoIHRvIGdlbmVyYXRlIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyBnZW5lcmF0ZSByZXBvcnQgYXQgZW5kIG9mIGxhc3QgaW50ZXJ2YWwuXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgbnVtSW50ZXJ2YWxzOiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgaGlzdG9yaWNhbDogSm9pLmJvb2xlYW4oKVxuICAgICAgICAuZGVmYXVsdCh0cnVlKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUcnVlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIHByZWNlZGluZyBzdGFydEludGVydmFsLlxcbkZhbHNlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIGZvbGxvd2luZyBzdGFydEludGVydmFsIChlLmcuIGZvcmVjYXN0KS5cXG5cIlxuICAgICAgICApLFxuICAgICAgZnJlcXVlbmN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICByZXBlYXQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVmYXVsdCgxKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkFuIG9iamVjdCB0aGF0IG1heSBiZSB1c2VkIHRvIHJlcXVlc3QgYSByZXBvcnQgZnJvbSBhIFZFTi5cXG5TZWUgT3BlbkFEUiBSRVNUIFVzZXIgR3VpZGUgZm9yIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIGhvdyBjb25maWd1cmUgYSByZXBvcnQgcmVxdWVzdC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBvYmplY3RJRDogSm9pLnN0cmluZygpXG4gICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLm1pbigxKSxcbiAgICBub3RpZmljYXRpb246IEpvaS5vYmplY3Qoe1xuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlBST0dSQU1cIiwgXCJFVkVOVFwiLCBcIlJFUE9SVFwiLCBcIlNVQlNDUklQVElPTlwiLCBcIlZFTlwiLCBcIlJFU09VUkNFXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgIC5vbmx5KClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBvcGVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcInRoZSBvcGVyYXRpb24gb24gb24gb2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoZSBub3RpZmljYXRpb24uXCJcbiAgICAgICAgKVxuICAgICAgICAub25seSgpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICBvYmplY3Q6IEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgLnRyeShcbiAgICAgICAgICBKb2kub2JqZWN0KHt9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwidGhlIG9iamVjdCB0aGF0IGlzIHRoZSBzdWJqZWN0IG9mIHRoZSBub3RpZmljYXRpb24uXCIpXG4gICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgLm1hdGNoKFwib25lXCIpXG4gICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiUFJPR1JBTVwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2hvcnQgbmFtZSB0byB1bmlxdWVseSBpZGVudGlmeSBwcm9ncmFtLlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtTG9uZ05hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiTG9uZyBuYW1lIG9mIHByb2dyYW0gZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICByZXRhaWxlck5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlNob3J0IG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIHByb3ZpZGluZyB0aGUgcHJvZ3JhbS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICByZXRhaWxlckxvbmdOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJMb25nIG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHByb2dyYW0gZGVmaW5lZCBjYXRlZ29yaXphdGlvbi5cIilcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgY291bnRyeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBbHBoYS0yIGNvZGUgcGVyIElTTyAzMTY2LTEuXCIpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHByaW5jaXBhbFN1YmRpdmlzaW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkNvZGluZyBwZXIgSVNPIDMxNjYtMi4gRS5nLiBzdGF0ZSBpbiBVUy5cIilcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgdGltZVpvbmVPZmZzZXQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbURlc2NyaXB0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIFVSTDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBodW1hbiBvciBtYWNoaW5lIHJlYWRhYmxlIHByb2dyYW0gZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51cmkoe30pLFxuICAgICAgICAgICAgICAgICAgICB9KS51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgYmluZGluZ0V2ZW50czogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJUcnVlIGlmIGV2ZW50cyBhcmUgZml4ZWQgb25jZSB0cmFuc21pdHRlZC5cIiksXG4gICAgICAgICAgICAgICAgbG9jYWxQcmljZTogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiBldmVudHMgaGF2ZSBiZWVuIGFkYXB0ZWQgZnJvbSBhIGdyaWQgZXZlbnQuXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IGV2ZW50IHZhbHVlc01hcCB2YWx1ZXMuXFxuRS5nLiBhIFBSSUNFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgcHJpY2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGN1cnJlbmN5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJQcm92aWRlcyBwcm9ncmFtIHNwZWNpZmljIG1ldGFkYXRhIGZyb20gVlROIHRvIFZFTi5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiUkVQT1JUXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIGV2ZW50SUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXI7IG1heSBiZSBWRU4gSUQgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICByZXBvcnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHBheWxvYWREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHJlc291cmNlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2Ygb2JqZWN0cyBjb250YWluaW5nIHJlcG9ydCBkYXRhIGZvciBhIHNldCBvZiByZXNvdXJjZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllci4gQSB2YWx1ZSBvZiBBR0dSRUdBVEVEX1JFUE9SVCBpbmRpY2F0ZXMgYW4gYWdncmVnYXRpb24gb2YgbW9yZSB0aGF0IG9uZSByZXNvdXJjZSdzIGRhdGFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJSZXBvcnQgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSByZXNvdXJjZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcInJlcG9ydCBvYmplY3QuXCIpXG4gICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIkVWRU5UXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiUmVsYXRpdmUgcHJpb3JpdHkgb2YgZXZlbnQuIEEgbG93ZXIgbnVtYmVyIGlzIGEgaGlnaGVyIHByaW9yaXR5LlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICByZXBvcnREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SW50ZXJ2YWw6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVGhlIGludGVydmFsIG9uIHdoaWNoIHRvIGdlbmVyYXRlIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyBnZW5lcmF0ZSByZXBvcnQgYXQgZW5kIG9mIGxhc3QgaW50ZXJ2YWwuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgbnVtSW50ZXJ2YWxzOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgaGlzdG9yaWNhbDogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUcnVlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIHByZWNlZGluZyBzdGFydEludGVydmFsLlxcbkZhbHNlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIGZvbGxvd2luZyBzdGFydEludGVydmFsIChlLmcuIGZvcmVjYXN0KS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiTnVtYmVyIG9mIGludGVydmFscyB0aGF0IGVsYXBzZSBiZXR3ZWVuIHJlcG9ydHMuXFxuLTEgaW5kaWNhdGVzIHNhbWUgYXMgbnVtSW50ZXJ2YWxzLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIk51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgcmVwb3J0LlxcbjEgaW5kaWNhdGVzIGdlbmVyYXRlIG9uZSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHJlcGVhdCBpbmRlZmluaXRlbHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuU2VlIE9wZW5BRFIgUkVTVCBVc2VyIEd1aWRlIGZvciBkZXRhaWxlZCBkZXNjcmlwdGlvbiBvZiBob3cgY29uZmlndXJlIGEgcmVwb3J0IHJlcXVlc3QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3Igb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWxzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiRXZlbnQgb2JqZWN0IHRvIGNvbW11bmljYXRlIGEgRGVtYW5kIFJlc3BvbnNlIHJlcXVlc3QgdG8gVkVOLlxcbklmIGludGVydmFsUGVyaW9kIGlzIHByZXNlbnQsIHNldHMgc3RhcnQgdGltZSBhbmQgZHVyYXRpb24gb2YgaW50ZXJ2YWxzLlxcblwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJTVUJTQ1JJUFRJT05cIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBkdXJpbmcgcHJvZ3JhbSBlbnJvbGxtZW50LlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgb2JqZWN0T3BlcmF0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJsaXN0IG9mIG9iamVjdHMgYW5kIG9wZXJhdGlvbnMgdG8gc3Vic2NyaWJlIHRvLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvYmplY3RzIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9wZXJhdGlvbnMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIm9iamVjdCBvcGVyYXRpb24gdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tVcmw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlciBwcm92aWRlZCB3ZWJob29rIFVSTC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICAgICAgICAgICAgICBiZWFyZXJUb2tlbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBwcm92aWRlZCB0b2tlbi5cXG5UbyBhdm9pZCBjdXN0b20gaW50ZWdyYXRpb25zLCBjYWxsYmFjayBlbmRwb2ludHNcXG5zaG91bGQgYWNjZXB0IHRoZSBwcm92aWRlZCBiZWFyZXIgdG9rZW4gdG8gYXV0aGVudGljYXRlIFZUTiByZXF1ZXN0cy5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3QgdHlwZSwgb3BlcmF0aW9ucywgYW5kIGNhbGxiYWNrVXJsLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuIFVzZWQgYnkgc2VydmVyIHRvIGZpbHRlciBjYWxsYmFja3MuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IGNyZWF0ZWQgYnkgYSBjbGllbnQgdG8gcmVjZWl2ZSBub3RpZmljYXRpb24gb2Ygb3BlcmF0aW9ucyBvbiBvYmplY3RzLlxcbkNsaWVudHMgbWF5IHN1YnNjcmliZSB0byBiZSBub3RpZmllZCB3aGVuIGEgdHlwZSBvZiBvYmplY3QgaXMgY3JlYXRlZCxcXG51cGRhdGVkLCBvciBkZWxldGVkLlxcblwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJWRU5cIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICB2ZW5OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHJlc291cmNlIG9iamVjdHMgcmVwcmVzZW50aW5nIGVuZC1kZXZpY2VzIG9yIHN5c3RlbXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlJFU09VUkNFXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIHJlc291cmNlIG1heSBiZSBjb25maWd1cmVkIHdpdGggaWRlbnRpZmllciBvdXQtb2YtYmFuZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICB2ZW5JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVmVuIHJlcHJlc2VudHMgYSBjbGllbnQgd2l0aCB0aGUgdmVuIHJvbGUuXCIpXG4gICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlJFU09VUkNFXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIHJlc291cmNlIG1heSBiZSBjb25maWd1cmVkIHdpdGggaWRlbnRpZmllciBvdXQtb2YtYmFuZC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICB2ZW5JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIlZUTiBnZW5lcmF0ZWQgb2JqZWN0IGluY2x1ZGVkIGluIHJlcXVlc3QgdG8gc3Vic2NyaXB0aW9uIGNhbGxiYWNrVXJsLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIG9iamVjdFR5cGVzOiBKb2kuc3RyaW5nKClcbiAgICAgIC5hbGxvdyhcIlBST0dSQU1cIiwgXCJFVkVOVFwiLCBcIlJFUE9SVFwiLCBcIlNVQlNDUklQVElPTlwiLCBcIlZFTlwiLCBcIlJFU09VUkNFXCIpXG4gICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgLm9ubHkoKSxcbiAgICBkYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAuYWxsb3coXCJcIilcbiAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAucGF0dGVybihcbiAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgICAubWluKDApLFxuICAgIHByb2JsZW06IEpvaS5vYmplY3Qoe1xuICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZWZhdWx0KFwiYWJvdXQ6YmxhbmtcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQW4gYWJzb2x1dGUgVVJJIHRoYXQgaWRlbnRpZmllcyB0aGUgcHJvYmxlbSB0eXBlLlxcbldoZW4gZGVyZWZlcmVuY2VkLCBpdCBTSE9VTEQgcHJvdmlkZSBodW1hbi1yZWFkYWJsZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgcHJvYmxlbSB0eXBlXFxuKGUuZy4sIHVzaW5nIEhUTUwpLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnVyaSh7fSksXG4gICAgICB0aXRsZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIHNob3J0LCBzdW1tYXJ5IG9mIHRoZSBwcm9ibGVtIHR5cGUuIFdyaXR0ZW4gaW4gZW5nbGlzaCBhbmQgcmVhZGFibGVcXG5mb3IgZW5naW5lZXJzICh1c3VhbGx5IG5vdCBzdWl0ZWQgZm9yIG5vbiB0ZWNobmljYWwgc3Rha2Vob2xkZXJzIGFuZFxcbm5vdCBsb2NhbGl6ZWQpOyBleGFtcGxlOiBTZXJ2aWNlIFVuYXZhaWxhYmxlLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHN0YXR1czogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlRoZSBIVFRQIHN0YXR1cyBjb2RlIGdlbmVyYXRlZCBieSB0aGUgb3JpZ2luIHNlcnZlciBmb3IgdGhpcyBvY2N1cnJlbmNlXFxub2YgdGhlIHByb2JsZW0uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgIC5tYXgoNjAwKVxuICAgICAgICAubWluKDEwMCksXG4gICAgICBkZXRhaWw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBodW1hbiByZWFkYWJsZSBleHBsYW5hdGlvbiBzcGVjaWZpYyB0byB0aGlzIG9jY3VycmVuY2Ugb2YgdGhlXFxucHJvYmxlbS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBpbnN0YW5jZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkFuIGFic29sdXRlIFVSSSB0aGF0IGlkZW50aWZpZXMgdGhlIHNwZWNpZmljIG9jY3VycmVuY2Ugb2YgdGhlIHByb2JsZW0uXFxuSXQgbWF5IG9yIG1heSBub3QgeWllbGQgZnVydGhlciBpbmZvcm1hdGlvbiBpZiBkZXJlZmVyZW5jZWQuXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAudXJpKHt9KSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcInJldXNhYmxlIGVycm9yIHJlc3BvbnNlLiBGcm9tIGh0dHBzOi8vb3BlbnNvdXJjZS56YWxhbmRvLmNvbS9wcm9ibGVtL3NjaGVtYS55YW1sLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICB9LFxufTtcbiJdfQ==