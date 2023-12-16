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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2FkcjMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvam9pL29hZHIzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQUNwQixxQkFBcUI7QUFDckIsT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFBO0FBRXJCLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUNyQixVQUFVLEVBQUU7UUFDVixpQkFBaUIsRUFBRTtZQUNqQixJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDcEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLFVBQVUsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFlBQVksRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFO3FCQUN0QixRQUFRLEVBQUU7cUJBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDeEQsQ0FBQztZQUNGLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUN0QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDdkI7UUFDRCxnQkFBZ0IsRUFBRTtZQUNoQixJQUFJ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Q0MsV0FBVyxDQUNWLHFGQUFxRixDQUN0RjthQUNBLE9BQU8sRUFBRTtLQUNiO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG4vKiBwcmV0dGllci1pZ25vcmUgKi9cbmltcG9ydCBKb2kgZnJvbSBcImpvaVwiXG5cbmV4cG9ydCBjb25zdCBzY2hlbWFzID0ge1xuICBwYXJhbWV0ZXJzOiB7XG4gICAgc2VhcmNoQWxsUHJvZ3JhbXM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICB0YXJnZXRUeXBlOiBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikub3B0aW9uYWwoKS5taW4oMCksXG4gICAgICAgIHRhcmdldFZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgICBzZWFyY2hBbGxSZXBvcnRzOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAubWluKDEpLFxuICAgICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikub3B0aW9uYWwoKS5taW4oMCksXG4gICAgICAgIHNraXA6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5taW4oMCksXG4gICAgICAgIGxpbWl0OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWF4KDUwKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgc2VhcmNoQWxsRXZlbnRzOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAubWluKDEpLFxuICAgICAgICB0YXJnZXRUeXBlOiBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikub3B0aW9uYWwoKS5taW4oMCksXG4gICAgICAgIHRhcmdldFZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgICBzZWFyY2hTdWJzY3JpcHRpb25zOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAubWluKDEpLFxuICAgICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikub3B0aW9uYWwoKS5taW4oMCksXG4gICAgICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCkpLFxuICAgICAgICBvYmplY3RzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICksXG4gICAgICAgIHNraXA6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5taW4oMCksXG4gICAgICAgIGxpbWl0OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWF4KDUwKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgc2VhcmNoVmVuczoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7XG4gICAgICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCkpLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIHNlYXJjaFZlblJlc291cmNlczoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7XG4gICAgICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCkpLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIGZldGNoVG9rZW46IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHtcbiAgICAgICAgY2xpZW50SUQ6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5yZXF1aXJlZCgpLm1pbigwKSxcbiAgICAgICAgY2xpZW50U2VjcmV0OiBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikucmVxdWlyZWQoKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIHByb2dyYW06IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICApLFxuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlBST0dSQU1cIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgICAgLm9ubHkoKSxcbiAgICAgIHByb2dyYW1OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2hvcnQgbmFtZSB0byB1bmlxdWVseSBpZGVudGlmeSBwcm9ncmFtLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHByb2dyYW1Mb25nTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJMb25nIG5hbWUgb2YgcHJvZ3JhbSBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICByZXRhaWxlck5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2hvcnQgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgcHJvdmlkaW5nIHRoZSBwcm9ncmFtLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgcmV0YWlsZXJMb25nTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJMb25nIG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHByb2dyYW1UeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgcHJvZ3JhbSBkZWZpbmVkIGNhdGVnb3JpemF0aW9uLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgY291bnRyeTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBbHBoYS0yIGNvZGUgcGVyIElTTyAzMTY2LTEuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBwcmluY2lwYWxTdWJkaXZpc2lvbjogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJDb2RpbmcgcGVyIElTTyAzMTY2LTIuIEUuZy4gc3RhdGUgaW4gVVMuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICB0aW1lWm9uZU9mZnNldDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAge31cbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKS5yZXF1aXJlZCgpLFxuICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5taW4oMCksXG4gICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgIH0pXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnVua25vd24oKSxcbiAgICAgIHByb2dyYW1EZXNjcmlwdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcHJvZ3JhbURlc2NyaXB0aW9uc1wiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBVUkw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGh1bWFuIG9yIG1hY2hpbmUgcmVhZGFibGUgcHJvZ3JhbSBkZXNjcmlwdGlvblwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICB9KS51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIGJpbmRpbmdFdmVudHM6IEpvaS5ib29sZWFuKClcbiAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlRydWUgaWYgZXZlbnRzIGFyZSBmaXhlZCBvbmNlIHRyYW5zbWl0dGVkLlwiKSxcbiAgICAgIGxvY2FsUHJpY2U6IEpvaS5ib29sZWFuKClcbiAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlRydWUgaWYgZXZlbnRzIGhhdmUgYmVlbiBhZGFwdGVkIGZyb20gYSBncmlkIGV2ZW50LlwiKSxcbiAgICAgIHBheWxvYWREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIGFjY3VyYWN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KDEwMClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAubWF4KDEwMClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXCJQcm92aWRlcyBwcm9ncmFtIHNwZWNpZmljIG1ldGFkYXRhIGZyb20gVlROIHRvIFZFTi5cIilcbiAgICAgIC51bmtub3duKCksXG4gICAgcmVwb3J0OiBKb2kub2JqZWN0KHtcbiAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgKSxcbiAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJSRVBPUlRcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgICAgLm9ubHkoKSxcbiAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgZXZlbnRJRDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXI7IG1heSBiZSBWRU4gSUQgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcmVwb3J0TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHBheWxvYWREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgLmRlZmF1bHQoXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAuZGVmYXVsdCgxMDApXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2Ygb2JqZWN0cyBjb250YWluaW5nIHJlcG9ydCBkYXRhIGZvciBhIHNldCBvZiByZXNvdXJjZXMuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgaW50ZXJ2YWxzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgaW50ZXJ2YWwgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIGNsaWVudCBnZW5lcmF0ZWQgbnVtYmVyIGFzc2lnbmVkIGFuIGludGVydmFsIG9iamVjdC4gTm90IGEgc2VxdWVuY2UgbnVtYmVyLlwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiUmVwb3J0IGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgcmVzb3VyY2UuXCIpXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcInJlcG9ydCBvYmplY3QuXCIpXG4gICAgICAudW5rbm93bigpLFxuICAgIGV2ZW50OiBKb2kub2JqZWN0KHtcbiAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgKSxcbiAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJFVkVOVFwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgICAub25seSgpLFxuICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBldmVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBwcmlvcml0eTogSm9pLm51bWJlcigpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJSZWxhdGl2ZSBwcmlvcml0eSBvZiBldmVudC4gQSBsb3dlciBudW1iZXIgaXMgYSBoaWdoZXIgcHJpb3JpdHkuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgIC5taW4oMCksXG4gICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHJlcG9ydERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBsaXN0IG9mIHJlcG9ydERlc2NyaXB0b3Igb2JqZWN0cy4gVXNlZCB0byByZXF1ZXN0IHJlcG9ydHMgZnJvbSBWRU4uXCJcbiAgICAgICAgKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgYWdncmVnYXRlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KGZhbHNlKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGFydEludGVydmFsOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlRoZSBpbnRlcnZhbCBvbiB3aGljaCB0byBnZW5lcmF0ZSBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgcmVwb3J0IGF0IGVuZCBvZiBsYXN0IGludGVydmFsLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgIG51bUludGVydmFsczogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJUaGUgbnVtYmVyIG9mIGludGVydmFscyB0byBpbmNsdWRlIGluIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyB0aGF0IGFsbCBpbnRlcnZhbHMgYXJlIHRvIGJlIGluY2x1ZGVkLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgIGhpc3RvcmljYWw6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQodHJ1ZSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVHJ1ZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBwcmVjZWRpbmcgc3RhcnRJbnRlcnZhbC5cXG5GYWxzZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBmb2xsb3dpbmcgc3RhcnRJbnRlcnZhbCAoZS5nLiBmb3JlY2FzdCkuXFxuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGZyZXF1ZW5jeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgaW50ZXJ2YWxzIHRoYXQgZWxhcHNlIGJldHdlZW4gcmVwb3J0cy5cXG4tMSBpbmRpY2F0ZXMgc2FtZSBhcyBudW1JbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgcmVwZWF0OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoMSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiTnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCByZXBvcnQuXFxuMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgb25lIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgcmVwZWF0IGluZGVmaW5pdGVseS5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuU2VlIE9wZW5BRFIgUkVTVCBVc2VyIEd1aWRlIGZvciBkZXRhaWxlZCBkZXNjcmlwdGlvbiBvZiBob3cgY29uZmlndXJlIGEgcmVwb3J0IHJlcXVlc3QuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHBheWxvYWREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwYXlsb2FkRGVzY3JpcHRvciBvYmplY3RzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIikucmVxdWlyZWQoKSxcbiAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5taW4oMCksXG4gICAgICB9KVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC51bmtub3duKCksXG4gICAgICBpbnRlcnZhbHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgIHBheWxvYWRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiRXZlbnQgb2JqZWN0IHRvIGNvbW11bmljYXRlIGEgRGVtYW5kIFJlc3BvbnNlIHJlcXVlc3QgdG8gVkVOLlxcbklmIGludGVydmFsUGVyaW9kIGlzIHByZXNlbnQsIHNldHMgc3RhcnQgdGltZSBhbmQgZHVyYXRpb24gb2YgaW50ZXJ2YWxzLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIHN1YnNjcmlwdGlvbjogSm9pLm9iamVjdCh7XG4gICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICksXG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiU1VCU0NSSVBUSU9OXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIGR1cmluZyBwcm9ncmFtIGVucm9sbG1lbnQuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgb2JqZWN0T3BlcmF0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgb2JqZWN0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvYmplY3RzIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBvcGVyYXRpb25zOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9wZXJhdGlvbnMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3Qgb3BlcmF0aW9uIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNhbGxiYWNrVXJsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlciBwcm92aWRlZCB3ZWJob29rIFVSTC5cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLnVyaSh7fSksXG4gICAgICAgICAgICBiZWFyZXJUb2tlbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwib2JqZWN0IHR5cGUsIG9wZXJhdGlvbnMsIGFuZCBjYWxsYmFja1VybC5cIilcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuIFVzZWQgYnkgc2VydmVyIHRvIGZpbHRlciBjYWxsYmFja3MuXCJcbiAgICAgICAgKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkFuIG9iamVjdCBjcmVhdGVkIGJ5IGEgY2xpZW50IHRvIHJlY2VpdmUgbm90aWZpY2F0aW9uIG9mIG9wZXJhdGlvbnMgb24gb2JqZWN0cy5cXG5DbGllbnRzIG1heSBzdWJzY3JpYmUgdG8gYmUgbm90aWZpZWQgd2hlbiBhIHR5cGUgb2Ygb2JqZWN0IGlzIGNyZWF0ZWQsXFxudXBkYXRlZCwgb3IgZGVsZXRlZC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICB2ZW46IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICApLFxuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlZFTlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdC5cIilcbiAgICAgICAgLm9ubHkoKSxcbiAgICAgIHZlbk5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgYXR0cmlidXRlczogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBsaXN0IG9mIHJlc291cmNlIG9iamVjdHMgcmVwcmVzZW50aW5nIGVuZC1kZXZpY2VzIG9yIHN5c3RlbXMuXCJcbiAgICAgICAgKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiUkVTT1VSQ0VcIilcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIHJlc291cmNlIG1heSBiZSBjb25maWd1cmVkIHdpdGggaWRlbnRpZmllciBvdXQtb2YtYmFuZC5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmVuSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCIpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXCJWZW4gcmVwcmVzZW50cyBhIGNsaWVudCB3aXRoIHRoZSB2ZW4gcm9sZS5cIilcbiAgICAgIC51bmtub3duKCksXG4gICAgcmVzb3VyY2U6IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICApLFxuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlJFU09VUkNFXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHZlbklEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBpbnRlcnZhbDogSm9pLm9iamVjdCh7XG4gICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKS5yZXF1aXJlZCgpLFxuICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5taW4oMCksXG4gICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgIH0pXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnVua25vd24oKSxcbiAgICAgIHBheWxvYWRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKS5yZXF1aXJlZCgpLFxuICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICB7fVxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIHZhbHVlc01hcDogSm9pLm9iamVjdCh7XG4gICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgcG9pbnQ6IEpvaS5vYmplY3Qoe1xuICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIGV2ZW50UGF5bG9hZERlc2NyaXB0b3I6IEpvaS5vYmplY3Qoe1xuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVmYXVsdChcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgcmVwb3J0UGF5bG9hZERlc2NyaXB0b3I6IEpvaS5vYmplY3Qoe1xuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVmYXVsdChcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIGFjY3VyYWN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICksXG4gICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoMTAwKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAubWF4KDEwMClcbiAgICAgICAgLm1pbigwKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgcmVwb3J0RGVzY3JpcHRvcjogSm9pLm9iamVjdCh7XG4gICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgYWdncmVnYXRlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgIC5kZWZhdWx0KGZhbHNlKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICksXG4gICAgICBzdGFydEludGVydmFsOiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlRoZSBpbnRlcnZhbCBvbiB3aGljaCB0byBnZW5lcmF0ZSBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgcmVwb3J0IGF0IGVuZCBvZiBsYXN0IGludGVydmFsLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICAgIG51bUludGVydmFsczogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUaGUgbnVtYmVyIG9mIGludGVydmFscyB0byBpbmNsdWRlIGluIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyB0aGF0IGFsbCBpbnRlcnZhbHMgYXJlIHRvIGJlIGluY2x1ZGVkLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICAgIGhpc3RvcmljYWw6IEpvaS5ib29sZWFuKClcbiAgICAgICAgLmRlZmF1bHQodHJ1ZSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVHJ1ZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBwcmVjZWRpbmcgc3RhcnRJbnRlcnZhbC5cXG5GYWxzZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBmb2xsb3dpbmcgc3RhcnRJbnRlcnZhbCAoZS5nLiBmb3JlY2FzdCkuXFxuXCJcbiAgICAgICAgKSxcbiAgICAgIGZyZXF1ZW5jeTogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJOdW1iZXIgb2YgaW50ZXJ2YWxzIHRoYXQgZWxhcHNlIGJldHdlZW4gcmVwb3J0cy5cXG4tMSBpbmRpY2F0ZXMgc2FtZSBhcyBudW1JbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgcmVwZWF0OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoMSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiTnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCByZXBvcnQuXFxuMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgb25lIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgcmVwZWF0IGluZGVmaW5pdGVseS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5pbnRlZ2VyKCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuU2VlIE9wZW5BRFIgUkVTVCBVc2VyIEd1aWRlIGZvciBkZXRhaWxlZCBkZXNjcmlwdGlvbiBvZiBob3cgY29uZmlndXJlIGEgcmVwb3J0IHJlcXVlc3QuXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgb2JqZWN0SUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5taW4oMSksXG4gICAgbm90aWZpY2F0aW9uOiBKb2kub2JqZWN0KHtcbiAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJQUk9HUkFNXCIsIFwiRVZFTlRcIiwgXCJSRVBPUlRcIiwgXCJTVUJTQ1JJUFRJT05cIiwgXCJWRU5cIiwgXCJSRVNPVVJDRVwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgICAub25seSgpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgb3BlcmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJ0aGUgb3BlcmF0aW9uIG9uIG9uIG9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGUgbm90aWZpY2F0aW9uLlwiXG4gICAgICAgIClcbiAgICAgICAgLm9ubHkoKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgb2JqZWN0OiBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgIC50cnkoXG4gICAgICAgICAgSm9pLm9iamVjdCh7fSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcInRoZSBvYmplY3QgdGhhdCBpcyB0aGUgc3ViamVjdCBvZiB0aGUgbm90aWZpY2F0aW9uLlwiKVxuICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgIC5tYXRjaChcIm9uZVwiKVxuICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlBST0dSQU1cIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgIHByb2dyYW1OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNob3J0IG5hbWUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgcHJvZ3JhbS5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbUxvbmdOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkxvbmcgbmFtZSBvZiBwcm9ncmFtIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIilcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcmV0YWlsZXJOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJTaG9ydCBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBwcm92aWRpbmcgdGhlIHByb2dyYW0uXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcmV0YWlsZXJMb25nTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiTG9uZyBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbVR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBwcm9ncmFtIGRlZmluZWQgY2F0ZWdvcml6YXRpb24uXCIpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIGNvdW50cnk6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQWxwaGEtMiBjb2RlIHBlciBJU08gMzE2Ni0xLlwiKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBwcmluY2lwYWxTdWJkaXZpc2lvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDb2RpbmcgcGVyIElTTyAzMTY2LTIuIEUuZy4gc3RhdGUgaW4gVVMuXCIpXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHRpbWVab25lT2Zmc2V0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgIHByb2dyYW1EZXNjcmlwdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcHJvZ3JhbURlc2NyaXB0aW9uc1wiKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICBVUkw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgaHVtYW4gb3IgbWFjaGluZSByZWFkYWJsZSBwcm9ncmFtIGRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICAgICAgICAgICAgfSkudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGJpbmRpbmdFdmVudHM6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KGZhbHNlKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHJ1ZSBpZiBldmVudHMgYXJlIGZpeGVkIG9uY2UgdHJhbnNtaXR0ZWQuXCIpLFxuICAgICAgICAgICAgICAgIGxvY2FsUHJpY2U6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KGZhbHNlKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlRydWUgaWYgZXZlbnRzIGhhdmUgYmVlbiBhZGFwdGVkIGZyb20gYSBncmlkIGV2ZW50LlwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHBheWxvYWREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiUHJvdmlkZXMgcHJvZ3JhbSBzcGVjaWZpYyBtZXRhZGF0YSBmcm9tIFZUTiB0byBWRU4uXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlJFUE9SVFwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBldmVudElEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyOyBtYXkgYmUgVkVOIElEIHByb3Zpc2lvbmVkIGR1cmluZyBwcm9ncmFtIGVucm9sbG1lbnQuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgcmVwb3J0TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcmVwb3J0UGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIG9iamVjdHMgY29udGFpbmluZyByZXBvcnQgZGF0YSBmb3IgYSBzZXQgb2YgcmVzb3VyY2VzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIuIEEgdmFsdWUgb2YgQUdHUkVHQVRFRF9SRVBPUlQgaW5kaWNhdGVzIGFuIGFnZ3JlZ2F0aW9uIG9mIG1vcmUgdGhhdCBvbmUgcmVzb3VyY2UncyBkYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiUmVwb3J0IGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgcmVzb3VyY2UuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJyZXBvcnQgb2JqZWN0LlwiKVxuICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJFVkVOVFwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZGVmaW5lZCBzdHJpbmcgZm9yIHVzZSBpbiBkZWJ1Z2dpbmcgb3IgVXNlciBJbnRlcmZhY2UuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlJlbGF0aXZlIHByaW9yaXR5IG9mIGV2ZW50LiBBIGxvd2VyIG51bWJlciBpcyBhIGhpZ2hlciBwcmlvcml0eS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgcmVwb3J0RGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHJlcG9ydERlc2NyaXB0b3Igb2JqZWN0cy4gVXNlZCB0byByZXF1ZXN0IHJlcG9ydHMgZnJvbSBWRU4uXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiByZXBvcnQgc2hvdWxkIGFnZ3JlZ2F0ZSByZXN1bHRzIGZyb20gYWxsIHRhcmdldGVkIHJlc291cmNlcy5cXG5GYWxzZSBpZiByZXBvcnQgaW5jbHVkZXMgcmVzdWx0cyBmb3IgZWFjaCByZXNvdXJjZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBzdGFydEludGVydmFsOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSBpbnRlcnZhbCBvbiB3aGljaCB0byBnZW5lcmF0ZSBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgcmVwb3J0IGF0IGVuZCBvZiBsYXN0IGludGVydmFsLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgIG51bUludGVydmFsczogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGUgbnVtYmVyIG9mIGludGVydmFscyB0byBpbmNsdWRlIGluIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyB0aGF0IGFsbCBpbnRlcnZhbHMgYXJlIHRvIGJlIGluY2x1ZGVkLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgIGhpc3RvcmljYWw6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBwcmVjZWRpbmcgc3RhcnRJbnRlcnZhbC5cXG5GYWxzZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBmb2xsb3dpbmcgc3RhcnRJbnRlcnZhbCAoZS5nLiBmb3JlY2FzdCkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IHRoYXQgbWF5IGJlIHVzZWQgdG8gcmVxdWVzdCBhIHJlcG9ydCBmcm9tIGEgVkVOLlxcblNlZSBPcGVuQURSIFJFU1QgVXNlciBHdWlkZSBmb3IgZGV0YWlsZWQgZGVzY3JpcHRpb24gb2YgaG93IGNvbmZpZ3VyZSBhIHJlcG9ydCByZXF1ZXN0LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IGV2ZW50IHZhbHVlc01hcCB2YWx1ZXMuXFxuRS5nLiBhIFBSSUNFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgcHJpY2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGN1cnJlbmN5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgIGludGVydmFsczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkV2ZW50IG9iamVjdCB0byBjb21tdW5pY2F0ZSBhIERlbWFuZCBSZXNwb25zZSByZXF1ZXN0IHRvIFZFTi5cXG5JZiBpbnRlcnZhbFBlcmlvZCBpcyBwcmVzZW50LCBzZXRzIHN0YXJ0IHRpbWUgYW5kIGR1cmF0aW9uIG9mIGludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiU1VCU0NSSVBUSU9OXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIG9iamVjdE9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImxpc3Qgb2Ygb2JqZWN0cyB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3Qgb3BlcmF0aW9uIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrVXJsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZXIgcHJvdmlkZWQgd2ViaG9vayBVUkwuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVyaSh7fSksXG4gICAgICAgICAgICAgICAgICAgICAgYmVhcmVyVG9rZW46IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgcHJvdmlkZWQgdG9rZW4uXFxuVG8gYXZvaWQgY3VzdG9tIGludGVncmF0aW9ucywgY2FsbGJhY2sgZW5kcG9pbnRzXFxuc2hvdWxkIGFjY2VwdCB0aGUgcHJvdmlkZWQgYmVhcmVyIHRva2VuIHRvIGF1dGhlbnRpY2F0ZSBWVE4gcmVxdWVzdHMuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwib2JqZWN0IHR5cGUsIG9wZXJhdGlvbnMsIGFuZCBjYWxsYmFja1VybC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLiBVc2VkIGJ5IHNlcnZlciB0byBmaWx0ZXIgY2FsbGJhY2tzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBjcmVhdGVkIGJ5IGEgY2xpZW50IHRvIHJlY2VpdmUgbm90aWZpY2F0aW9uIG9mIG9wZXJhdGlvbnMgb24gb2JqZWN0cy5cXG5DbGllbnRzIG1heSBzdWJzY3JpYmUgdG8gYmUgbm90aWZpZWQgd2hlbiBhIHR5cGUgb2Ygb2JqZWN0IGlzIGNyZWF0ZWQsXFxudXBkYXRlZCwgb3IgZGVsZXRlZC5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiVkVOXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3QuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgdmVuTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIGR1cmluZyBwcm9ncmFtIGVucm9sbG1lbnQuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiByZXNvdXJjZSBvYmplY3RzIHJlcHJlc2VudGluZyBlbmQtZGV2aWNlcyBvciBzeXN0ZW1zLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJSRVNPVVJDRVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmVuSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlZlbiByZXByZXNlbnRzIGEgY2xpZW50IHdpdGggdGhlIHZlbiByb2xlLlwiKVxuICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJSRVNPVVJDRVwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgdmVuSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJWVE4gZ2VuZXJhdGVkIG9iamVjdCBpbmNsdWRlZCBpbiByZXF1ZXN0IHRvIHN1YnNjcmlwdGlvbiBjYWxsYmFja1VybC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBvYmplY3RUeXBlczogSm9pLnN0cmluZygpXG4gICAgICAuYWxsb3coXCJQUk9HUkFNXCIsIFwiRVZFTlRcIiwgXCJSRVBPUlRcIiwgXCJTVUJTQ1JJUFRJT05cIiwgXCJWRU5cIiwgXCJSRVNPVVJDRVwiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgIC5vbmx5KCksXG4gICAgZGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLnBhdHRlcm4oXG4gICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgICAgLm1pbigwKSxcbiAgICBwcm9ibGVtOiBKb2kub2JqZWN0KHtcbiAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVmYXVsdChcImFib3V0OmJsYW5rXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkFuIGFic29sdXRlIFVSSSB0aGF0IGlkZW50aWZpZXMgdGhlIHByb2JsZW0gdHlwZS5cXG5XaGVuIGRlcmVmZXJlbmNlZCwgaXQgU0hPVUxEIHByb3ZpZGUgaHVtYW4tcmVhZGFibGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIHByb2JsZW0gdHlwZVxcbihlLmcuLCB1c2luZyBIVE1MKS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC51cmkoe30pLFxuICAgICAgdGl0bGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBzaG9ydCwgc3VtbWFyeSBvZiB0aGUgcHJvYmxlbSB0eXBlLiBXcml0dGVuIGluIGVuZ2xpc2ggYW5kIHJlYWRhYmxlXFxuZm9yIGVuZ2luZWVycyAodXN1YWxseSBub3Qgc3VpdGVkIGZvciBub24gdGVjaG5pY2FsIHN0YWtlaG9sZGVycyBhbmRcXG5ub3QgbG9jYWxpemVkKTsgZXhhbXBsZTogU2VydmljZSBVbmF2YWlsYWJsZS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBzdGF0dXM6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUaGUgSFRUUCBzdGF0dXMgY29kZSBnZW5lcmF0ZWQgYnkgdGhlIG9yaWdpbiBzZXJ2ZXIgZm9yIHRoaXMgb2NjdXJyZW5jZVxcbm9mIHRoZSBwcm9ibGVtLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAubWF4KDYwMClcbiAgICAgICAgLm1pbigxMDApLFxuICAgICAgZGV0YWlsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgaHVtYW4gcmVhZGFibGUgZXhwbGFuYXRpb24gc3BlY2lmaWMgdG8gdGhpcyBvY2N1cnJlbmNlIG9mIHRoZVxcbnByb2JsZW0uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgICAgaW5zdGFuY2U6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBbiBhYnNvbHV0ZSBVUkkgdGhhdCBpZGVudGlmaWVzIHRoZSBzcGVjaWZpYyBvY2N1cnJlbmNlIG9mIHRoZSBwcm9ibGVtLlxcbkl0IG1heSBvciBtYXkgbm90IHlpZWxkIGZ1cnRoZXIgaW5mb3JtYXRpb24gaWYgZGVyZWZlcmVuY2VkLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnVyaSh7fSksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJyZXVzYWJsZSBlcnJvciByZXNwb25zZS4gRnJvbSBodHRwczovL29wZW5zb3VyY2UuemFsYW5kby5jb20vcHJvYmxlbS9zY2hlbWEueWFtbC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgfSxcbn07XG4iXX0=