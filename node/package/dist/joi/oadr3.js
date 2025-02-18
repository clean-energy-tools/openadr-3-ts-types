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
        program: Joi.alternatives()
            .match("all")
            .try(Joi.object()
            .description("Server provided representation of program")
            .unknown(), Joi.alternatives()
            .match("all")
            .try(Joi.object({
            id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            createdDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            modificationDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            objectType: Joi.string()
                .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                .description("Types of objects addressable through API.")
                .only()
                .required(),
        })
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(), Joi.object({
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
                start: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                duration: Joi.string()
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
                .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                .items(Joi.alternatives()
                .match("any")
                .try(Joi.object({
                objectType: Joi.string()
                    .allow("EVENT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator.")
                    .only(),
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
                    .allow("REPORT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator.")
                    .only(),
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
                    .allow(null)
                    .default(null)
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
        })
            .description("Client provided description of program")
            .unknown())),
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
                .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                .items(Joi.alternatives()
                .match("any")
                .try(Joi.object({
                objectType: Joi.string()
                    .allow("EVENT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator.")
                    .only(),
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
                    .allow("REPORT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator.")
                    .only(),
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
                    .allow(null)
                    .default(null)
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
        })
            .description("Client provided description of program")
            .unknown(),
        report: Joi.alternatives()
            .match("all")
            .try(Joi.object()
            .description("Server provided representation of report")
            .unknown(), Joi.alternatives()
            .match("all")
            .try(Joi.object({
            id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            createdDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            modificationDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            objectType: Joi.string()
                .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                .description("Types of objects addressable through API.")
                .only()
                .required(),
        })
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(), Joi.object({
            eventID: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            clientName: Joi.string()
                .description("User generated identifier; may be VEN ID provisioned out-of-band.")
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
                    .allow("REPORT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator.")
                    .only(),
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
                    .allow(null)
                    .default(null)
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
                    .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                        .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
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
            .unknown())),
        reportRequest: Joi.object({
            eventID: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            clientName: Joi.string()
                .description("User generated identifier; may be VEN ID provisioned out-of-band.")
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
                    .allow("REPORT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator.")
                    .only(),
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
                    .allow(null)
                    .default(null)
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
                    .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                        .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
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
        event: Joi.alternatives()
            .match("all")
            .try(Joi.object()
            .description("Server provided representation of event")
            .unknown(), Joi.alternatives()
            .match("all")
            .try(Joi.object({
            id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            createdDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            modificationDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            objectType: Joi.string()
                .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                .description("Types of objects addressable through API.")
                .only()
                .required(),
        })
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(), Joi.object({
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
                .description("An object that may be used to request a report from a VEN.\n")
                .unknown()),
            payloadDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of payloadDescriptor objects.")
                .items(Joi.object({
                objectType: Joi.string()
                    .allow("EVENT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator.")
                    .only(),
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
                .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                    .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
            .description("Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n")
            .unknown())),
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
                .description("An object that may be used to request a report from a VEN.\n")
                .unknown()),
            payloadDescriptors: Joi.array()
                .allow(null)
                .default(null)
                .description("A list of payloadDescriptor objects.")
                .items(Joi.object({
                objectType: Joi.string()
                    .allow("EVENT_PAYLOAD_DESCRIPTOR")
                    .description("Used as discriminator.")
                    .only(),
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
                .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                    .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
            .description("Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n")
            .unknown(),
        subscription: Joi.alternatives()
            .match("all")
            .try(Joi.object()
            .description("Server provided representation of subscription")
            .unknown(), Joi.alternatives()
            .match("all")
            .try(Joi.object({
            id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            createdDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            modificationDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            objectType: Joi.string()
                .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                .description("Types of objects addressable through API.")
                .only()
                .required(),
        })
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(), Joi.object({
            clientName: Joi.string()
                .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
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
                    .allow("READ", "CREATE", "UPDATE", "DELETE")
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
            .unknown())),
        subscriptionRequest: Joi.object({
            clientName: Joi.string()
                .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
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
                    .allow("READ", "CREATE", "UPDATE", "DELETE")
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
        ven: Joi.alternatives()
            .match("all")
            .try(Joi.object()
            .description("Server provided representation of ven")
            .unknown(), Joi.alternatives()
            .match("all")
            .try(Joi.object({
            id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            createdDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            modificationDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            objectType: Joi.string()
                .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                .description("Types of objects addressable through API.")
                .only()
                .required(),
        })
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(), Joi.object({
            venName: Joi.string()
                .description("User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n")
                .required()
                .max(128)
                .min(1),
            attributes: Joi.array()
                .allow(null)
                .default(null)
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            targets: Joi.array()
                .allow(null)
                .default(null)
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
                .items(Joi.alternatives()
                .match("all")
                .try(Joi.object()
                .description("Server provided representation of resource")
                .unknown(), Joi.alternatives()
                .match("all")
                .try(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                modificationDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                objectType: Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()
                    .required(),
            })
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                resourceName: Joi.string()
                    .description("User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n")
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                targets: Joi.array()
                    .allow(null)
                    .default(null)
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
                .unknown()))),
        })
            .description("Ven represents a client with the ven role.")
            .unknown())),
        venRequest: Joi.object({
            venName: Joi.string()
                .description("User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n")
                .required()
                .max(128)
                .min(1),
            attributes: Joi.array()
                .allow(null)
                .default(null)
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            targets: Joi.array()
                .allow(null)
                .default(null)
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
                .items(Joi.alternatives()
                .match("all")
                .try(Joi.object()
                .description("Server provided representation of resource")
                .unknown(), Joi.alternatives()
                .match("all")
                .try(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                modificationDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                objectType: Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()
                    .required(),
            })
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                resourceName: Joi.string()
                    .description("User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n")
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                targets: Joi.array()
                    .allow(null)
                    .default(null)
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
                .unknown()))),
        })
            .description("Ven represents a client with the ven role.")
            .unknown(),
        resource: Joi.alternatives()
            .match("all")
            .try(Joi.object()
            .description("Server provided representation of resource")
            .unknown(), Joi.alternatives()
            .match("all")
            .try(Joi.object({
            id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            createdDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            modificationDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            objectType: Joi.string()
                .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                .description("Types of objects addressable through API.")
                .only()
                .required(),
        })
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(), Joi.object({
            resourceName: Joi.string()
                .description("User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n")
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            targets: Joi.array()
                .allow(null)
                .default(null)
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
            .unknown())),
        resourceRequest: Joi.object({
            resourceName: Joi.string()
                .description("User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n")
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
            targets: Joi.array()
                .allow(null)
                .default(null)
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
        objectMetadata: Joi.object({
            id: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            createdDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            modificationDateTime: Joi.date()
                .description("datetime in ISO 8601 format")
                .required(),
            objectType: Joi.string()
                .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                .description("Types of objects addressable through API.")
                .only()
                .required(),
        })
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
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
                .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
            .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                x: Joi.number().description("A value on an x axis.").required(),
                y: Joi.number().description("A value on a y axis.").required(),
            })
                .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                .unknown())),
        })
            .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
            .unknown(),
        point: Joi.object({
            x: Joi.number().description("A value on an x axis.").required(),
            y: Joi.number().description("A value on a y axis.").required(),
        })
            .description("A pair of floats typically used as a point on a 2 dimensional grid.")
            .unknown(),
        eventPayloadDescriptor: Joi.object({
            objectType: Joi.string()
                .allow("EVENT_PAYLOAD_DESCRIPTOR")
                .description("Used as discriminator.")
                .only(),
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
                .allow("REPORT_PAYLOAD_DESCRIPTOR")
                .description("Used as discriminator.")
                .only(),
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
                .allow(null)
                .default(null)
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
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
            .description("An object that may be used to request a report from a VEN.\n")
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
                .allow("CREATE", "READ", "UPDATE", "DELETE")
                .description("the operation on on object that triggered the notification.")
                .only()
                .required(),
            object: Joi.alternatives()
                .match("all")
                .try(Joi.object()
                .description("the object that is the subject of the notification.")
                .unknown(), Joi.alternatives()
                .match("one")
                .try(Joi.alternatives()
                .match("all")
                .try(Joi.object()
                .description("Server provided representation of program")
                .unknown(), Joi.alternatives()
                .match("all")
                .try(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                modificationDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                objectType: Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()
                    .required(),
            })
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
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
                    .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                    .items(Joi.alternatives()
                    .match("any")
                    .try(Joi.object({
                    objectType: Joi.string()
                        .allow("EVENT_PAYLOAD_DESCRIPTOR")
                        .description("Used as discriminator.")
                        .only(),
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
                        .allow("REPORT_PAYLOAD_DESCRIPTOR")
                        .description("Used as discriminator.")
                        .only(),
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
                        .allow(null)
                        .default(null)
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
            })
                .description("Client provided description of program")
                .unknown())), Joi.alternatives()
                .match("all")
                .try(Joi.object()
                .description("Server provided representation of report")
                .unknown(), Joi.alternatives()
                .match("all")
                .try(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                modificationDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                objectType: Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()
                    .required(),
            })
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                eventID: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                clientName: Joi.string()
                    .description("User generated identifier; may be VEN ID provisioned out-of-band.")
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
                        .allow("REPORT_PAYLOAD_DESCRIPTOR")
                        .description("Used as discriminator.")
                        .only(),
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
                        .allow(null)
                        .default(null)
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
                        .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                            .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                                    .description("A value on an x axis.")
                                    .required(),
                                y: Joi.number()
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
                .unknown())), Joi.alternatives()
                .match("all")
                .try(Joi.object()
                .description("Server provided representation of event")
                .unknown(), Joi.alternatives()
                .match("all")
                .try(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                modificationDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                objectType: Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()
                    .required(),
            })
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
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
                    .description("An object that may be used to request a report from a VEN.\n")
                    .unknown()),
                payloadDescriptors: Joi.array()
                    .allow(null)
                    .default(null)
                    .description("A list of payloadDescriptor objects.")
                    .items(Joi.object({
                    objectType: Joi.string()
                        .allow("EVENT_PAYLOAD_DESCRIPTOR")
                        .description("Used as discriminator.")
                        .only(),
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
                    .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                        .description("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n")
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
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
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
                .description("Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n")
                .unknown())), Joi.alternatives()
                .match("all")
                .try(Joi.object()
                .description("Server provided representation of subscription")
                .unknown(), Joi.alternatives()
                .match("all")
                .try(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                modificationDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                objectType: Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()
                    .required(),
            })
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                clientName: Joi.string()
                    .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
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
                        .allow("READ", "CREATE", "UPDATE", "DELETE")
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
                .unknown())), Joi.alternatives()
                .match("all")
                .try(Joi.object()
                .description("Server provided representation of ven")
                .unknown(), Joi.alternatives()
                .match("all")
                .try(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                modificationDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                objectType: Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()
                    .required(),
            })
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                venName: Joi.string()
                    .description("User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n")
                    .required()
                    .max(128)
                    .min(1),
                attributes: Joi.array()
                    .allow(null)
                    .default(null)
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                targets: Joi.array()
                    .allow(null)
                    .default(null)
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
                    .items(Joi.alternatives()
                    .match("all")
                    .try(Joi.object()
                    .description("Server provided representation of resource")
                    .unknown(), Joi.alternatives()
                    .match("all")
                    .try(Joi.object({
                    id: Joi.string()
                        .description("URL safe VTN assigned object ID.")
                        .required()
                        .pattern(/^[a-zA-Z0-9_-]*$/, {})
                        .max(128)
                        .min(1),
                    createdDateTime: Joi.date()
                        .description("datetime in ISO 8601 format")
                        .required(),
                    modificationDateTime: Joi.date()
                        .description("datetime in ISO 8601 format")
                        .required(),
                    objectType: Joi.string()
                        .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                        .description("Types of objects addressable through API.")
                        .only()
                        .required(),
                })
                    .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                    .unknown(), Joi.object({
                    resourceName: Joi.string()
                        .description("User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n")
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
                            .try(Joi.number(), Joi.number().integer(), Joi.string()
                            .allow("")
                            .min(0), Joi.boolean(), Joi.object({
                            x: Joi.number()
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
                                .description("A value on a y axis.")
                                .required(),
                        })
                            .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                            .unknown())),
                    })
                        .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                        .unknown()),
                    targets: Joi.array()
                        .allow(null)
                        .default(null)
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
                            .try(Joi.number(), Joi.number().integer(), Joi.string()
                            .allow("")
                            .min(0), Joi.boolean(), Joi.object({
                            x: Joi.number()
                                .description("A value on an x axis.")
                                .required(),
                            y: Joi.number()
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
                    .unknown()))),
            })
                .description("Ven represents a client with the ven role.")
                .unknown())), Joi.alternatives()
                .match("all")
                .try(Joi.object()
                .description("Server provided representation of resource")
                .unknown(), Joi.alternatives()
                .match("all")
                .try(Joi.object({
                id: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                createdDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                modificationDateTime: Joi.date()
                    .description("datetime in ISO 8601 format")
                    .required(),
                objectType: Joi.string()
                    .allow("PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE")
                    .description("Types of objects addressable through API.")
                    .only()
                    .required(),
            })
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                resourceName: Joi.string()
                    .description("User generated identifier, resource may be configured with identifier out-of-band.\nresourceName is expected to be unique within the scope of the associated VEN.\n")
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
                            .description("A value on a y axis.")
                            .required(),
                    })
                        .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                        .unknown())),
                })
                    .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                    .unknown()),
                targets: Joi.array()
                    .allow(null)
                    .default(null)
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
                            .description("A value on an x axis.")
                            .required(),
                        y: Joi.number()
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
                .unknown()))))
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
                        .description("A value on an x axis.")
                        .required(),
                    y: Joi.number()
                        .description("A value on a y axis.")
                        .required(),
                })
                    .description("A pair of floats typically used as a point on a 2 dimensional grid.")
                    .unknown())),
            })
                .description("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")
                .unknown()),
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
            .description("Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n")
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
            .description("Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n")
            .unknown(),
        authError: Joi.object({
            error: Joi.string()
                .allow("invalid_request", "invalid_client", "invalid_grant", "invalid_scope", "unauthorized_client", "unsupported_grant_type")
                .description("As described in rfc6749 | invalid_request – The request is missing a parameter so the server can’t proceed with the request. This may also be returned if the request includes an unsupported parameter or repeats a parameter. invalid_client – Client authentication failed, such as if the request contains an invalid client ID or secret. Send an HTTP 401 response in this case. invalid_grant – The authorization code (or user’s password for the password grant type) is invalid or expired. This is also the error you would return if the redirect URL given in the authorization grant does not match the URL provided in this access token request. invalid_scope – For access token requests that include a scope (password or client_credentials grants), this error indicates an invalid scope value in the request. unauthorized_client – This client is not authorized to use the requested grant type. For example, if you restrict which applications can use the Implicit grant, you would return this error for the other apps. unsupported_grant_type – If a grant type is requested that the authorization server doesn’t recognize, use this code. Note that unknown grant types also use this specific error code rather than using the invalid_request above.")
                .only()
                .required(),
            error_description: Joi.string()
                .allow("")
                .description("Should be a sentence or two at most describing the circumstance of the error")
                .min(0),
            error_uri: Joi.string()
                .description("Optional reference to more detailed error description")
                .uri({}),
        })
            .description("error response on HTTP 400 from auth/token per https://www.rfc-editor.org/rfc/rfc6749")
            .unknown(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2FkcjMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvam9pL29hZHIzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQztBQUV0QixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDckIsVUFBVSxFQUFFO1FBQ1YsaUJBQWlCLEVBQUU7WUFDakIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDO2dCQUNoQixVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxZQUFZLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRTtxQkFDdEIsUUFBUSxFQUFFO3FCQUNWLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3hELENBQUM7WUFDRixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDdEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMs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LDhMQUE4TCxDQUMvTDtpQkFDQSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7aUJBQ2pCLFdBQVcsQ0FDViw0RkFBNEYsQ0FDN0Y7aUJBQ0EsT0FBTyxFQUFFO2lCQUNULEdBQUcsQ0FBQyxHQUFHLENBQUM7aUJBQ1IsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNYLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO2lCQUNqQixLQUFLLENBQUMsRUFBRSxDQUFDO2lCQUNULFdBQVcsQ0FDViw2RUFBNkUsQ0FDOUU7aUJBQ0EsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNULFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO2lCQUNuQixXQUFXLENBQ1YseUlBQXlJLENBQzFJO2lCQUNBLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDWCxDQUFDO2FBQ0MsV0FBVyxDQUNWLHFGQUFxRixDQUN0RjthQUNBLE9BQU8sRUFBRTtLQUNiO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKb2kgZnJvbSBcImpvaVwiO1xuXG5leHBvcnQgY29uc3Qgc2NoZW1hcyA9IHtcbiAgcGFyYW1ldGVyczoge1xuICAgIHNlYXJjaEFsbFByb2dyYW1zOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgdGFyZ2V0VHlwZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRWYWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSksXG4gICAgICAgIHNraXA6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5taW4oMCksXG4gICAgICAgIGxpbWl0OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWF4KDUwKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgc2VhcmNoQWxsUmVwb3J0czoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7XG4gICAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgZXZlbnRJRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIHNlYXJjaEFsbEV2ZW50czoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7XG4gICAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgdGFyZ2V0VHlwZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRWYWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAuaXRlbXMoSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSksXG4gICAgICAgIHNraXA6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5taW4oMCksXG4gICAgICAgIGxpbWl0OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWF4KDUwKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgc2VhcmNoU3Vic2NyaXB0aW9uczoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7XG4gICAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRUeXBlOiBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikub3B0aW9uYWwoKS5taW4oMCksXG4gICAgICAgIHRhcmdldFZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApKSxcbiAgICAgICAgb2JqZWN0czogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICApLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIHNlYXJjaFZlbnM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICB2ZW5OYW1lOiBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikub3B0aW9uYWwoKS5taW4oMCksXG4gICAgICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5vcHRpb25hbCgpLm1pbigwKSxcbiAgICAgICAgdGFyZ2V0VmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCkpLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIHNlYXJjaFZlblJlc291cmNlczoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7XG4gICAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm9wdGlvbmFsKCkubWluKDApLFxuICAgICAgICB0YXJnZXRUeXBlOiBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikub3B0aW9uYWwoKS5taW4oMCksXG4gICAgICAgIHRhcmdldFZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIHByb2dyYW06IEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAudHJ5KFxuICAgICAgICBKb2kub2JqZWN0KClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2YgcHJvZ3JhbVwiKVxuICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIHByb2dyYW1OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTaG9ydCBuYW1lIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHByb2dyYW0uXCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBwcm9ncmFtTG9uZ05hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiTG9uZyBuYW1lIG9mIHByb2dyYW0gZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIHJldGFpbGVyTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIlNob3J0IG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIHByb3ZpZGluZyB0aGUgcHJvZ3JhbS5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICByZXRhaWxlckxvbmdOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiTG9uZyBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgcHJvZ3JhbVR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBwcm9ncmFtIGRlZmluZWQgY2F0ZWdvcml6YXRpb24uXCIpXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgY291bnRyeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBbHBoYS0yIGNvZGUgcGVyIElTTyAzMTY2LTEuXCIpXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgcHJpbmNpcGFsU3ViZGl2aXNpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ29kaW5nIHBlciBJU08gMzE2Ni0yLiBFLmcuIHN0YXRlIGluIFVTLlwiKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgUFQwUyBpbmRpY2F0ZXMgaW5zdGFudGFuZW91cyBvciBpbmZpbml0eSwgZGVwZW5kaW5nIG9uIHBheWxvYWRUeXBlLlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgIHByb2dyYW1EZXNjcmlwdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcHJvZ3JhbURlc2NyaXB0aW9uc1wiKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBVUkw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBodW1hbiBvciBtYWNoaW5lIHJlYWRhYmxlIHByb2dyYW0gZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC51cmkoe30pLFxuICAgICAgICAgICAgICAgICAgfSkudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgYmluZGluZ0V2ZW50czogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHJ1ZSBpZiBldmVudHMgYXJlIGZpeGVkIG9uY2UgdHJhbnNtaXR0ZWQuXCIpLFxuICAgICAgICAgICAgICBsb2NhbFByaWNlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIlRydWUgaWYgZXZlbnRzIGhhdmUgYmVlbiBhZGFwdGVkIGZyb20gYSBncmlkIGV2ZW50LlwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDbGllbnQgcHJvdmlkZWQgZGVzY3JpcHRpb24gb2YgcHJvZ3JhbVwiKVxuICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgKVxuICAgICAgKSxcbiAgICBwcm9ncmFtUmVxdWVzdDogSm9pLm9iamVjdCh7XG4gICAgICBwcm9ncmFtTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlNob3J0IG5hbWUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgcHJvZ3JhbS5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBwcm9ncmFtTG9uZ05hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiTG9uZyBuYW1lIG9mIHByb2dyYW0gZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgcmV0YWlsZXJOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlNob3J0IG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIHByb3ZpZGluZyB0aGUgcHJvZ3JhbS5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHJldGFpbGVyTG9uZ05hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiTG9uZyBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBwcm9ncmFtVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHByb2dyYW0gZGVmaW5lZCBjYXRlZ29yaXphdGlvbi5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIGNvdW50cnk6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQWxwaGEtMiBjb2RlIHBlciBJU08gMzE2Ni0xLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgcHJpbmNpcGFsU3ViZGl2aXNpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ29kaW5nIHBlciBJU08gMzE2Ni0yLiBFLmcuIHN0YXRlIGluIFVTLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKS5yZXF1aXJlZCgpLFxuICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5taW4oMCksXG4gICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgIH0pXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IFBUMFMgaW5kaWNhdGVzIGluc3RhbnRhbmVvdXMgb3IgaW5maW5pdHksIGRlcGVuZGluZyBvbiBwYXlsb2FkVHlwZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC51bmtub3duKCksXG4gICAgICBwcm9ncmFtRGVzY3JpcHRpb25zOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHByb2dyYW1EZXNjcmlwdGlvbnNcIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgVVJMOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBodW1hbiBvciBtYWNoaW5lIHJlYWRhYmxlIHByb2dyYW0gZGVzY3JpcHRpb25cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLnVyaSh7fSksXG4gICAgICAgICAgfSkudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICBiaW5kaW5nRXZlbnRzOiBKb2kuYm9vbGVhbigpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJUcnVlIGlmIGV2ZW50cyBhcmUgZml4ZWQgb25jZSB0cmFuc21pdHRlZC5cIiksXG4gICAgICBsb2NhbFByaWNlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJUcnVlIGlmIGV2ZW50cyBoYXZlIGJlZW4gYWRhcHRlZCBmcm9tIGEgZ3JpZCBldmVudC5cIiksXG4gICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IGV2ZW50IHZhbHVlc01hcCB2YWx1ZXMuXFxuRS5nLiBhIFBSSUNFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgcHJpY2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGN1cnJlbmN5LlxcblwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLlwiKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICBhY2N1cmFjeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMDApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFwiQ2xpZW50IHByb3ZpZGVkIGRlc2NyaXB0aW9uIG9mIHByb2dyYW1cIilcbiAgICAgIC51bmtub3duKCksXG4gICAgcmVwb3J0OiBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgLnRyeShcbiAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2VydmVyIHByb3ZpZGVkIHJlcHJlc2VudGF0aW9uIG9mIHJlcG9ydFwiKVxuICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIGV2ZW50SUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllcjsgbWF5IGJlIFZFTiBJRCBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIHJlcG9ydE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIHBheWxvYWREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAgICAgLm1heCgxMDApXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIG9iamVjdHMgY29udGFpbmluZyByZXBvcnQgZGF0YSBmb3IgYSBzZXQgb2YgcmVzb3VyY2VzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IFBUMFMgaW5kaWNhdGVzIGluc3RhbnRhbmVvdXMgb3IgaW5maW5pdHksIGRlcGVuZGluZyBvbiBwYXlsb2FkVHlwZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBQVDBTIGluZGljYXRlcyBpbnN0YW50YW5lb3VzIG9yIGluZmluaXR5LCBkZXBlbmRpbmcgb24gcGF5bG9hZFR5cGUuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlJlcG9ydCBkYXRhIGFzc29jaWF0ZWQgd2l0aCBhIHJlc291cmNlLlwiKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcInJlcG9ydCBvYmplY3QuXCIpXG4gICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICApXG4gICAgICApLFxuICAgIHJlcG9ydFJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgZXZlbnRJRDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXI7IG1heSBiZSBWRU4gSUQgcHJvdmlzaW9uZWQgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHJlcG9ydE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcmVwb3J0UGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIGFjY3VyYWN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2Ygb2JqZWN0cyBjb250YWluaW5nIHJlcG9ydCBkYXRhIGZvciBhIHNldCBvZiByZXNvdXJjZXMuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgUFQwUyBpbmRpY2F0ZXMgaW5zdGFudGFuZW91cyBvciBpbmZpbml0eSwgZGVwZW5kaW5nIG9uIHBheWxvYWRUeXBlLlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgIGludGVydmFsczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgIGlkOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgUFQwUyBpbmRpY2F0ZXMgaW5zdGFudGFuZW91cyBvciBpbmZpbml0eSwgZGVwZW5kaW5nIG9uIHBheWxvYWRUeXBlLlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgIHBheWxvYWRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJSZXBvcnQgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSByZXNvdXJjZS5cIilcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFwicmVwb3J0IG9iamVjdC5cIilcbiAgICAgIC51bmtub3duKCksXG4gICAgZXZlbnQ6IEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAudHJ5KFxuICAgICAgICBKb2kub2JqZWN0KClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2YgZXZlbnRcIilcbiAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIGV2ZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIlVzZXIgZGVmaW5lZCBzdHJpbmcgZm9yIHVzZSBpbiBkZWJ1Z2dpbmcgb3IgVXNlciBJbnRlcmZhY2UuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgcHJpb3JpdHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJSZWxhdGl2ZSBwcmlvcml0eSBvZiBldmVudC4gQSBsb3dlciBudW1iZXIgaXMgYSBoaWdoZXIgcHJpb3JpdHkuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICByZXBvcnREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHJlcG9ydERlc2NyaXB0b3Igb2JqZWN0cy4gVXNlZCB0byByZXF1ZXN0IHJlcG9ydHMgZnJvbSBWRU4uXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRJbnRlcnZhbDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGUgaW50ZXJ2YWwgb24gd2hpY2ggdG8gZ2VuZXJhdGUgYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIGdlbmVyYXRlIHJlcG9ydCBhdCBlbmQgb2YgbGFzdCBpbnRlcnZhbC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBudW1JbnRlcnZhbHM6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVGhlIG51bWJlciBvZiBpbnRlcnZhbHMgdG8gaW5jbHVkZSBpbiBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgdGhhdCBhbGwgaW50ZXJ2YWxzIGFyZSB0byBiZSBpbmNsdWRlZC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBoaXN0b3JpY2FsOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlRydWUgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgcHJlY2VkaW5nIHN0YXJ0SW50ZXJ2YWwuXFxuRmFsc2UgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgZm9sbG93aW5nIHN0YXJ0SW50ZXJ2YWwgKGUuZy4gZm9yZWNhc3QpLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KDEpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IFBUMFMgaW5kaWNhdGVzIGluc3RhbnRhbmVvdXMgb3IgaW5maW5pdHksIGRlcGVuZGluZyBvbiBwYXlsb2FkVHlwZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBpbnRlcnZhbHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBQVDBTIGluZGljYXRlcyBpbnN0YW50YW5lb3VzIG9yIGluZmluaXR5LCBkZXBlbmRpbmcgb24gcGF5bG9hZFR5cGUuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRXZlbnQgb2JqZWN0IHRvIGNvbW11bmljYXRlIGEgRGVtYW5kIFJlc3BvbnNlIHJlcXVlc3QgdG8gVkVOLlxcbklmIGludGVydmFsUGVyaW9kIGlzIHByZXNlbnQsIHNldHMgZGVmYXVsdCBzdGFydCB0aW1lIGFuZCBkdXJhdGlvbiBvZiBpbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgKVxuICAgICAgKSxcbiAgICBldmVudFJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBldmVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBwcmlvcml0eTogSm9pLm51bWJlcigpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJSZWxhdGl2ZSBwcmlvcml0eSBvZiBldmVudC4gQSBsb3dlciBudW1iZXIgaXMgYSBoaWdoZXIgcHJpb3JpdHkuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgIC5taW4oMCksXG4gICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHJlcG9ydERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBsaXN0IG9mIHJlcG9ydERlc2NyaXB0b3Igb2JqZWN0cy4gVXNlZCB0byByZXF1ZXN0IHJlcG9ydHMgZnJvbSBWRU4uXCJcbiAgICAgICAgKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgYWdncmVnYXRlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KGZhbHNlKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGFydEludGVydmFsOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlRoZSBpbnRlcnZhbCBvbiB3aGljaCB0byBnZW5lcmF0ZSBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgcmVwb3J0IGF0IGVuZCBvZiBsYXN0IGludGVydmFsLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgIG51bUludGVydmFsczogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJUaGUgbnVtYmVyIG9mIGludGVydmFscyB0byBpbmNsdWRlIGluIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyB0aGF0IGFsbCBpbnRlcnZhbHMgYXJlIHRvIGJlIGluY2x1ZGVkLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgIGhpc3RvcmljYWw6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQodHJ1ZSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVHJ1ZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBwcmVjZWRpbmcgc3RhcnRJbnRlcnZhbC5cXG5GYWxzZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBmb2xsb3dpbmcgc3RhcnRJbnRlcnZhbCAoZS5nLiBmb3JlY2FzdCkuXFxuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGZyZXF1ZW5jeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgaW50ZXJ2YWxzIHRoYXQgZWxhcHNlIGJldHdlZW4gcmVwb3J0cy5cXG4tMSBpbmRpY2F0ZXMgc2FtZSBhcyBudW1JbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgcmVwZWF0OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoMSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiTnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCByZXBvcnQuXFxuMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgb25lIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgcmVwZWF0IGluZGVmaW5pdGVseS5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHBheWxvYWREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwYXlsb2FkRGVzY3JpcHRvciBvYmplY3RzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIikucmVxdWlyZWQoKSxcbiAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5taW4oMCksXG4gICAgICB9KVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBQVDBTIGluZGljYXRlcyBpbnN0YW50YW5lb3VzIG9yIGluZmluaXR5LCBkZXBlbmRpbmcgb24gcGF5bG9hZFR5cGUuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAudW5rbm93bigpLFxuICAgICAgaW50ZXJ2YWxzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgaW50ZXJ2YWwgb2JqZWN0cy5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgaWQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGNsaWVudCBnZW5lcmF0ZWQgbnVtYmVyIGFzc2lnbmVkIGFuIGludGVydmFsIG9iamVjdC4gTm90IGEgc2VxdWVuY2UgbnVtYmVyLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBQVDBTIGluZGljYXRlcyBpbnN0YW50YW5lb3VzIG9yIGluZmluaXR5LCBkZXBlbmRpbmcgb24gcGF5bG9hZFR5cGUuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgcGF5bG9hZHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJFdmVudCBvYmplY3QgdG8gY29tbXVuaWNhdGUgYSBEZW1hbmQgUmVzcG9uc2UgcmVxdWVzdCB0byBWRU4uXFxuSWYgaW50ZXJ2YWxQZXJpb2QgaXMgcHJlc2VudCwgc2V0cyBkZWZhdWx0IHN0YXJ0IHRpbWUgYW5kIGR1cmF0aW9uIG9mIGludGVydmFscy5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBzdWJzY3JpcHRpb246IEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAudHJ5KFxuICAgICAgICBKb2kub2JqZWN0KClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2Ygc3Vic2NyaXB0aW9uXCIpXG4gICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgLnRyeShcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIG9iamVjdE9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImxpc3Qgb2Ygb2JqZWN0cyB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJSRUFEXCIsIFwiQ1JFQVRFXCIsIFwiVVBEQVRFXCIsIFwiREVMRVRFXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIm9iamVjdCBvcGVyYXRpb24gdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tVcmw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZXIgcHJvdmlkZWQgd2ViaG9vayBVUkwuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICAgICAgICAgICAgYmVhcmVyVG9rZW46IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3QgdHlwZSwgb3BlcmF0aW9ucywgYW5kIGNhbGxiYWNrVXJsLlwiKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLiBVc2VkIGJ5IHNlcnZlciB0byBmaWx0ZXIgY2FsbGJhY2tzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBjcmVhdGVkIGJ5IGEgY2xpZW50IHRvIHJlY2VpdmUgbm90aWZpY2F0aW9uIG9mIG9wZXJhdGlvbnMgb24gb2JqZWN0cy5cXG5DbGllbnRzIG1heSBzdWJzY3JpYmUgdG8gYmUgbm90aWZpZWQgd2hlbiBhIHR5cGUgb2Ygb2JqZWN0IGlzIGNyZWF0ZWQsXFxudXBkYXRlZCwgb3IgZGVsZXRlZC5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICApXG4gICAgICApLFxuICAgIHN1YnNjcmlwdGlvblJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBvYmplY3RPcGVyYXRpb25zOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9iamVjdHMgYW5kIG9wZXJhdGlvbnMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBvYmplY3RzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9iamVjdHMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlJFQURcIiwgXCJDUkVBVEVcIiwgXCJVUERBVEVcIiwgXCJERUxFVEVcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIm9iamVjdCBvcGVyYXRpb24gdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgY2FsbGJhY2tVcmw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VyIHByb3ZpZGVkIHdlYmhvb2sgVVJMLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICAgIGJlYXJlclRva2VuOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlVzZXIgcHJvdmlkZWQgdG9rZW4uXFxuVG8gYXZvaWQgY3VzdG9tIGludGVncmF0aW9ucywgY2FsbGJhY2sgZW5kcG9pbnRzXFxuc2hvdWxkIGFjY2VwdCB0aGUgcHJvdmlkZWQgYmVhcmVyIHRva2VuIHRvIGF1dGhlbnRpY2F0ZSBWVE4gcmVxdWVzdHMuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3QgdHlwZSwgb3BlcmF0aW9ucywgYW5kIGNhbGxiYWNrVXJsLlwiKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy4gVXNlZCBieSBzZXJ2ZXIgdG8gZmlsdGVyIGNhbGxiYWNrcy5cIlxuICAgICAgICApXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQW4gb2JqZWN0IGNyZWF0ZWQgYnkgYSBjbGllbnQgdG8gcmVjZWl2ZSBub3RpZmljYXRpb24gb2Ygb3BlcmF0aW9ucyBvbiBvYmplY3RzLlxcbkNsaWVudHMgbWF5IHN1YnNjcmliZSB0byBiZSBub3RpZmllZCB3aGVuIGEgdHlwZSBvZiBvYmplY3QgaXMgY3JlYXRlZCxcXG51cGRhdGVkLCBvciBkZWxldGVkLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIHZlbjogSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgIC50cnkoXG4gICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiB2ZW5cIilcbiAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICB2ZW5OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cXG52ZW5OYW1lIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXF1ZSB3aXRoaW4gdGhlIHNjb3BlIG9mIGEgVlROXFxuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVzb3VyY2Ugb2JqZWN0cyByZXByZXNlbnRpbmcgZW5kLWRldmljZXMgb3Igc3lzdGVtcy5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiU2VydmVyIHByb3ZpZGVkIHJlcHJlc2VudGF0aW9uIG9mIHJlc291cmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIHJlc291cmNlIG1heSBiZSBjb25maWd1cmVkIHdpdGggaWRlbnRpZmllciBvdXQtb2YtYmFuZC5cXG5yZXNvdXJjZU5hbWUgaXMgZXhwZWN0ZWQgdG8gYmUgdW5pcXVlIHdpdGhpbiB0aGUgc2NvcGUgb2YgdGhlIGFzc29jaWF0ZWQgVkVOLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlbklEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSByZXNvdXJjZSBpcyBhbiBlbmVyZ3kgZGV2aWNlIG9yIHN5c3RlbSBzdWJqZWN0IHRvIGNvbnRyb2wgYnkgYSBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlZlbiByZXByZXNlbnRzIGEgY2xpZW50IHdpdGggdGhlIHZlbiByb2xlLlwiKVxuICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgKVxuICAgICAgKSxcbiAgICB2ZW5SZXF1ZXN0OiBKb2kub2JqZWN0KHtcbiAgICAgIHZlbk5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgb3V0LW9mLWJhbmQuXFxudmVuTmFtZSBpcyBleHBlY3RlZCB0byBiZSB1bmlxdWUgd2l0aGluIHRoZSBzY29wZSBvZiBhIFZUTlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHJlc291cmNlczogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgbGlzdCBvZiByZXNvdXJjZSBvYmplY3RzIHJlcHJlc2VudGluZyBlbmQtZGV2aWNlcyBvciBzeXN0ZW1zLlwiXG4gICAgICAgIClcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2YgcmVzb3VyY2VcIilcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgcmVzb3VyY2UgbWF5IGJlIGNvbmZpZ3VyZWQgd2l0aCBpZGVudGlmaWVyIG91dC1vZi1iYW5kLlxcbnJlc291cmNlTmFtZSBpcyBleHBlY3RlZCB0byBiZSB1bmlxdWUgd2l0aGluIHRoZSBzY29wZSBvZiB0aGUgYXNzb2NpYXRlZCBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB2ZW5JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSByZXNvdXJjZSBpcyBhbiBlbmVyZ3kgZGV2aWNlIG9yIHN5c3RlbSBzdWJqZWN0IHRvIGNvbnRyb2wgYnkgYSBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXCJWZW4gcmVwcmVzZW50cyBhIGNsaWVudCB3aXRoIHRoZSB2ZW4gcm9sZS5cIilcbiAgICAgIC51bmtub3duKCksXG4gICAgcmVzb3VyY2U6IEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAudHJ5KFxuICAgICAgICBKb2kub2JqZWN0KClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2YgcmVzb3VyY2VcIilcbiAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgcmVzb3VyY2UgbWF5IGJlIGNvbmZpZ3VyZWQgd2l0aCBpZGVudGlmaWVyIG91dC1vZi1iYW5kLlxcbnJlc291cmNlTmFtZSBpcyBleHBlY3RlZCB0byBiZSB1bmlxdWUgd2l0aGluIHRoZSBzY29wZSBvZiB0aGUgYXNzb2NpYXRlZCBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICB2ZW5JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSByZXNvdXJjZSBpcyBhbiBlbmVyZ3kgZGV2aWNlIG9yIHN5c3RlbSBzdWJqZWN0IHRvIGNvbnRyb2wgYnkgYSBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgKVxuICAgICAgKSxcbiAgICByZXNvdXJjZVJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgcmVzb3VyY2UgbWF5IGJlIGNvbmZpZ3VyZWQgd2l0aCBpZGVudGlmaWVyIG91dC1vZi1iYW5kLlxcbnJlc291cmNlTmFtZSBpcyBleHBlY3RlZCB0byBiZSB1bmlxdWUgd2l0aGluIHRoZSBzY29wZSBvZiB0aGUgYXNzb2NpYXRlZCBWRU4uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHZlbklEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIG9iamVjdE1ldGFkYXRhOiBKb2kub2JqZWN0KHtcbiAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlBST0dSQU1cIiwgXCJFVkVOVFwiLCBcIlJFUE9SVFwiLCBcIlNVQlNDUklQVElPTlwiLCBcIlZFTlwiLCBcIlJFU09VUkNFXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgIC5vbmx5KClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIGludGVydmFsOiBKb2kub2JqZWN0KHtcbiAgICAgIGlkOiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLnJlcXVpcmVkKCksXG4gICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgfSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgUFQwUyBpbmRpY2F0ZXMgaW5zdGFudGFuZW91cyBvciBpbmZpbml0eSwgZGVwZW5kaW5nIG9uIHBheWxvYWRUeXBlLlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnVua25vd24oKSxcbiAgICAgIHBheWxvYWRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKS5yZXF1aXJlZCgpLFxuICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICB7fVxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IFBUMFMgaW5kaWNhdGVzIGluc3RhbnRhbmVvdXMgb3IgaW5maW5pdHksIGRlcGVuZGluZyBvbiBwYXlsb2FkVHlwZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICB2YWx1ZXNNYXA6IEpvaS5vYmplY3Qoe1xuICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKS5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKS5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKS5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBwb2ludDogSm9pLm9iamVjdCh7XG4gICAgICB4OiBKb2kubnVtYmVyKCkuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIikucmVxdWlyZWQoKSxcbiAgICAgIHk6IEpvaS5udW1iZXIoKS5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpLnJlcXVpcmVkKCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgZXZlbnRQYXlsb2FkRGVzY3JpcHRvcjogSm9pLm9iamVjdCh7XG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgLm9ubHkoKSxcbiAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgcmVwb3J0UGF5bG9hZERlc2NyaXB0b3I6IEpvaS5vYmplY3Qoe1xuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLlwiKVxuICAgICAgICAub25seSgpLFxuICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBhY2N1cmFjeTogSm9pLm51bWJlcigpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICApLFxuICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAubWF4KDEwMClcbiAgICAgICAgLm1pbigwKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgcmVwb3J0RGVzY3JpcHRvcjogSm9pLm9iamVjdCh7XG4gICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgYWdncmVnYXRlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgIC5kZWZhdWx0KGZhbHNlKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICksXG4gICAgICBzdGFydEludGVydmFsOiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlRoZSBpbnRlcnZhbCBvbiB3aGljaCB0byBnZW5lcmF0ZSBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgcmVwb3J0IGF0IGVuZCBvZiBsYXN0IGludGVydmFsLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICAgIG51bUludGVydmFsczogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUaGUgbnVtYmVyIG9mIGludGVydmFscyB0byBpbmNsdWRlIGluIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyB0aGF0IGFsbCBpbnRlcnZhbHMgYXJlIHRvIGJlIGluY2x1ZGVkLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICAgIGhpc3RvcmljYWw6IEpvaS5ib29sZWFuKClcbiAgICAgICAgLmRlZmF1bHQodHJ1ZSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVHJ1ZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBwcmVjZWRpbmcgc3RhcnRJbnRlcnZhbC5cXG5GYWxzZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBmb2xsb3dpbmcgc3RhcnRJbnRlcnZhbCAoZS5nLiBmb3JlY2FzdCkuXFxuXCJcbiAgICAgICAgKSxcbiAgICAgIGZyZXF1ZW5jeTogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJOdW1iZXIgb2YgaW50ZXJ2YWxzIHRoYXQgZWxhcHNlIGJldHdlZW4gcmVwb3J0cy5cXG4tMSBpbmRpY2F0ZXMgc2FtZSBhcyBudW1JbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgcmVwZWF0OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoMSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiTnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCByZXBvcnQuXFxuMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgb25lIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgcmVwZWF0IGluZGVmaW5pdGVseS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5pbnRlZ2VyKCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgb2JqZWN0SUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5taW4oMSksXG4gICAgbm90aWZpY2F0aW9uOiBKb2kub2JqZWN0KHtcbiAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJQUk9HUkFNXCIsIFwiRVZFTlRcIiwgXCJSRVBPUlRcIiwgXCJTVUJTQ1JJUFRJT05cIiwgXCJWRU5cIiwgXCJSRVNPVVJDRVwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgICAub25seSgpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgb3BlcmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiQ1JFQVRFXCIsIFwiUkVBRFwiLCBcIlVQREFURVwiLCBcIkRFTEVURVwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJ0aGUgb3BlcmF0aW9uIG9uIG9uIG9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGUgbm90aWZpY2F0aW9uLlwiXG4gICAgICAgIClcbiAgICAgICAgLm9ubHkoKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIG9iamVjdDogSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAudHJ5KFxuICAgICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwidGhlIG9iamVjdCB0aGF0IGlzIHRoZSBzdWJqZWN0IG9mIHRoZSBub3RpZmljYXRpb24uXCIpXG4gICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgLm1hdGNoKFwib25lXCIpXG4gICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiBwcm9ncmFtXCIpXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW1OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU2hvcnQgbmFtZSB0byB1bmlxdWVseSBpZGVudGlmeSBwcm9ncmFtLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtTG9uZ05hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTG9uZyBuYW1lIG9mIHByb2dyYW0gZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbGVyTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTaG9ydCBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBwcm92aWRpbmcgdGhlIHByb2dyYW0uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWlsZXJMb25nTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJMb25nIG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHByb2dyYW0gZGVmaW5lZCBjYXRlZ29yaXphdGlvbi5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQWxwaGEtMiBjb2RlIHBlciBJU08gMzE2Ni0xLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbmNpcGFsU3ViZGl2aXNpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29kaW5nIHBlciBJU08gMzE2Ni0yLiBFLmcuIHN0YXRlIGluIFVTLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBQVDBTIGluZGljYXRlcyBpbnN0YW50YW5lb3VzIG9yIGluZmluaXR5LCBkZXBlbmRpbmcgb24gcGF5bG9hZFR5cGUuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbURlc2NyaXB0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVSTDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgaHVtYW4gb3IgbWFjaGluZSByZWFkYWJsZSBwcm9ncmFtIGRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRpbmdFdmVudHM6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRydWUgaWYgZXZlbnRzIGFyZSBmaXhlZCBvbmNlIHRyYW5zbWl0dGVkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFByaWNlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUcnVlIGlmIGV2ZW50cyBoYXZlIGJlZW4gYWRhcHRlZCBmcm9tIGEgZ3JpZCBldmVudC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkNsaWVudCBwcm92aWRlZCBkZXNjcmlwdGlvbiBvZiBwcm9ncmFtXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiByZXBvcnRcIilcbiAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRJRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXI7IG1heSBiZSBWRU4gSUQgcHJvdmlzaW9uZWQgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcmVwb3J0UGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2Ygb2JqZWN0cyBjb250YWluaW5nIHJlcG9ydCBkYXRhIGZvciBhIHNldCBvZiByZXNvdXJjZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgUFQwUyBpbmRpY2F0ZXMgaW5zdGFudGFuZW91cyBvciBpbmZpbml0eSwgZGVwZW5kaW5nIG9uIHBheWxvYWRUeXBlLlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgUFQwUyBpbmRpY2F0ZXMgaW5zdGFudGFuZW91cyBvciBpbmZpbml0eSwgZGVwZW5kaW5nIG9uIHBheWxvYWRUeXBlLlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcG9ydCBkYXRhIGFzc29jaWF0ZWQgd2l0aCBhIHJlc291cmNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcInJlcG9ydCBvYmplY3QuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiBldmVudFwiKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlbGF0aXZlIHByaW9yaXR5IG9mIGV2ZW50LiBBIGxvd2VyIG51bWJlciBpcyBhIGhpZ2hlciBwcmlvcml0eS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0RGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRydWUgaWYgcmVwb3J0IHNob3VsZCBhZ2dyZWdhdGUgcmVzdWx0cyBmcm9tIGFsbCB0YXJnZXRlZCByZXNvdXJjZXMuXFxuRmFsc2UgaWYgcmVwb3J0IGluY2x1ZGVzIHJlc3VsdHMgZm9yIGVhY2ggcmVzb3VyY2UuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SW50ZXJ2YWw6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVGhlIGludGVydmFsIG9uIHdoaWNoIHRvIGdlbmVyYXRlIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyBnZW5lcmF0ZSByZXBvcnQgYXQgZW5kIG9mIGxhc3QgaW50ZXJ2YWwuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtSW50ZXJ2YWxzOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlzdG9yaWNhbDogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCh0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUcnVlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIHByZWNlZGluZyBzdGFydEludGVydmFsLlxcbkZhbHNlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIGZvbGxvd2luZyBzdGFydEludGVydmFsIChlLmcuIGZvcmVjYXN0KS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCB0aGF0IG1heSBiZSB1c2VkIHRvIHJlcXVlc3QgYSByZXBvcnQgZnJvbSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IFBUMFMgaW5kaWNhdGVzIGluc3RhbnRhbmVvdXMgb3IgaW5maW5pdHksIGRlcGVuZGluZyBvbiBwYXlsb2FkVHlwZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IFBUMFMgaW5kaWNhdGVzIGluc3RhbnRhbmVvdXMgb3IgaW5maW5pdHksIGRlcGVuZGluZyBvbiBwYXlsb2FkVHlwZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkV2ZW50IG9iamVjdCB0byBjb21tdW5pY2F0ZSBhIERlbWFuZCBSZXNwb25zZSByZXF1ZXN0IHRvIFZFTi5cXG5JZiBpbnRlcnZhbFBlcmlvZCBpcyBwcmVzZW50LCBzZXRzIGRlZmF1bHQgc3RhcnQgdGltZSBhbmQgZHVyYXRpb24gb2YgaW50ZXJ2YWxzLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiBzdWJzY3JpcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0T3BlcmF0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImxpc3Qgb2Ygb2JqZWN0cyB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlzdCBvZiBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlJFQURcIiwgXCJDUkVBVEVcIiwgXCJVUERBVEVcIiwgXCJERUxFVEVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvYmplY3Qgb3BlcmF0aW9uIHRvIHN1YnNjcmliZSB0by5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tVcmw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VyIHByb3ZpZGVkIHdlYmhvb2sgVVJMLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlYXJlclRva2VuOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgcHJvdmlkZWQgdG9rZW4uXFxuVG8gYXZvaWQgY3VzdG9tIGludGVncmF0aW9ucywgY2FsbGJhY2sgZW5kcG9pbnRzXFxuc2hvdWxkIGFjY2VwdCB0aGUgcHJvdmlkZWQgYmVhcmVyIHRva2VuIHRvIGF1dGhlbnRpY2F0ZSBWVE4gcmVxdWVzdHMuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib2JqZWN0IHR5cGUsIG9wZXJhdGlvbnMsIGFuZCBjYWxsYmFja1VybC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy4gVXNlZCBieSBzZXJ2ZXIgdG8gZmlsdGVyIGNhbGxiYWNrcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IGNyZWF0ZWQgYnkgYSBjbGllbnQgdG8gcmVjZWl2ZSBub3RpZmljYXRpb24gb2Ygb3BlcmF0aW9ucyBvbiBvYmplY3RzLlxcbkNsaWVudHMgbWF5IHN1YnNjcmliZSB0byBiZSBub3RpZmllZCB3aGVuIGEgdHlwZSBvZiBvYmplY3QgaXMgY3JlYXRlZCxcXG51cGRhdGVkLCBvciBkZWxldGVkLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiB2ZW5cIilcbiAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVuTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cXG52ZW5OYW1lIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXF1ZSB3aXRoaW4gdGhlIHNjb3BlIG9mIGEgVlROXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVzb3VyY2Ugb2JqZWN0cyByZXByZXNlbnRpbmcgZW5kLWRldmljZXMgb3Igc3lzdGVtcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2YgcmVzb3VyY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXFxucmVzb3VyY2VOYW1lIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXF1ZSB3aXRoaW4gdGhlIHNjb3BlIG9mIHRoZSBhc3NvY2lhdGVkIFZFTi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlbklEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZlbiByZXByZXNlbnRzIGEgY2xpZW50IHdpdGggdGhlIHZlbiByb2xlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiByZXNvdXJjZVwiKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXFxucmVzb3VyY2VOYW1lIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXF1ZSB3aXRoaW4gdGhlIHNjb3BlIG9mIHRoZSBhc3NvY2lhdGVkIFZFTi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVuSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJWVE4gZ2VuZXJhdGVkIG9iamVjdCBpbmNsdWRlZCBpbiByZXF1ZXN0IHRvIHN1YnNjcmlwdGlvbiBjYWxsYmFja1VybC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBvYmplY3RUeXBlczogSm9pLnN0cmluZygpXG4gICAgICAuYWxsb3coXCJQUk9HUkFNXCIsIFwiRVZFTlRcIiwgXCJSRVBPUlRcIiwgXCJTVUJTQ1JJUFRJT05cIiwgXCJWRU5cIiwgXCJSRVNPVVJDRVwiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgIC5vbmx5KCksXG4gICAgZGF0ZVRpbWU6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLnBhdHRlcm4oXG4gICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgICAgLm1pbigwKSxcbiAgICBjbGllbnRDcmVkZW50aWFsUmVxdWVzdDogSm9pLm9iamVjdCh7XG4gICAgICBncmFudF90eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiY2xpZW50X2NyZWRlbnRpYWxzXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIk9BdXRoMiBncmFudCB0eXBlLCBtdXN0IGJlICdjbGllbnRfY3JlZGVudGlhbHMnXCIpXG4gICAgICAgIC5vbmx5KClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBjbGllbnRfaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJjbGllbnQgSUQgdG8gZXhjaGFuZ2UgZm9yIGJlYXJlciB0b2tlbi5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCg0MDk2KVxuICAgICAgICAubWluKDEpLFxuICAgICAgY2xpZW50X3NlY3JldDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcImNsaWVudCBzZWNyZXQgdG8gZXhjaGFuZ2UgZm9yIGJlYXJlciB0b2tlbi5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCg0MDk2KVxuICAgICAgICAubWluKDEpLFxuICAgICAgc2NvcGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiYXBwbGljYXRpb24gZGVmaW5lZCBzY29wZS5cIilcbiAgICAgICAgLm1heCg0MDk2KVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQm9keSBvZiBQT1NUIHJlcXVlc3QgdG8gL2F1dGgvdG9rZW4uIE5vdGUgc25ha2UgY2FzZSBwZXIgaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzY3NDlcXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBjbGllbnRDcmVkZW50aWFsUmVzcG9uc2U6IEpvaS5vYmplY3Qoe1xuICAgICAgYWNjZXNzX3Rva2VuOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiYWNjZXNzIHRva2VuIHByb3ZpZGVkIGJ5IEF1dGhvcml6YXRpb24gc2VydmljZVwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDQwOTYpXG4gICAgICAgIC5taW4oMSksXG4gICAgICB0b2tlbl90eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiQmVhcmVyXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcInRva2VuIHR5cGUsIG11c3QgYmUgQmVhcmVyLlwiKVxuICAgICAgICAub25seSgpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgZXhwaXJlc19pbjogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcImV4cGlyYXRpb24gcGVyaW9kIGluIHNlY29uZHMuXCIpXG4gICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICByZWZyZXNoX3Rva2VuOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwicmVmcmVzaCB0b2tlbiBwcm92aWRlZCBieSBBdXRob3JpemF0aW9uIHNlcnZpY2VcIilcbiAgICAgICAgLm1heCg0MDk2KVxuICAgICAgICAubWluKDEpLFxuICAgICAgc2NvcGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiYXBwbGljYXRpb24gZGVmaW5lZCBzY29wZS5cIilcbiAgICAgICAgLm1heCg0MDk2KVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQm9keSByZXNwb25zZSBmcm9tIC9hdXRoL3Rva2VuLiBOb3RlIHNuYWtlIGNhc2UgcGVyIGh0dHBzOi8vd3d3LnJmYy1lZGl0b3Iub3JnL3JmYy9yZmM2NzQ5XFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgYXV0aEVycm9yOiBKb2kub2JqZWN0KHtcbiAgICAgIGVycm9yOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFxuICAgICAgICAgIFwiaW52YWxpZF9yZXF1ZXN0XCIsXG4gICAgICAgICAgXCJpbnZhbGlkX2NsaWVudFwiLFxuICAgICAgICAgIFwiaW52YWxpZF9ncmFudFwiLFxuICAgICAgICAgIFwiaW52YWxpZF9zY29wZVwiLFxuICAgICAgICAgIFwidW5hdXRob3JpemVkX2NsaWVudFwiLFxuICAgICAgICAgIFwidW5zdXBwb3J0ZWRfZ3JhbnRfdHlwZVwiXG4gICAgICAgIClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQXMgZGVzY3JpYmVkIGluIHJmYzY3NDkgfCBpbnZhbGlkX3JlcXVlc3Qg4oCTIFRoZSByZXF1ZXN0IGlzIG1pc3NpbmcgYSBwYXJhbWV0ZXIgc28gdGhlIHNlcnZlciBjYW7igJl0IHByb2NlZWQgd2l0aCB0aGUgcmVxdWVzdC4gVGhpcyBtYXkgYWxzbyBiZSByZXR1cm5lZCBpZiB0aGUgcmVxdWVzdCBpbmNsdWRlcyBhbiB1bnN1cHBvcnRlZCBwYXJhbWV0ZXIgb3IgcmVwZWF0cyBhIHBhcmFtZXRlci4gaW52YWxpZF9jbGllbnQg4oCTIENsaWVudCBhdXRoZW50aWNhdGlvbiBmYWlsZWQsIHN1Y2ggYXMgaWYgdGhlIHJlcXVlc3QgY29udGFpbnMgYW4gaW52YWxpZCBjbGllbnQgSUQgb3Igc2VjcmV0LiBTZW5kIGFuIEhUVFAgNDAxIHJlc3BvbnNlIGluIHRoaXMgY2FzZS4gaW52YWxpZF9ncmFudCDigJMgVGhlIGF1dGhvcml6YXRpb24gY29kZSAob3IgdXNlcuKAmXMgcGFzc3dvcmQgZm9yIHRoZSBwYXNzd29yZCBncmFudCB0eXBlKSBpcyBpbnZhbGlkIG9yIGV4cGlyZWQuIFRoaXMgaXMgYWxzbyB0aGUgZXJyb3IgeW91IHdvdWxkIHJldHVybiBpZiB0aGUgcmVkaXJlY3QgVVJMIGdpdmVuIGluIHRoZSBhdXRob3JpemF0aW9uIGdyYW50IGRvZXMgbm90IG1hdGNoIHRoZSBVUkwgcHJvdmlkZWQgaW4gdGhpcyBhY2Nlc3MgdG9rZW4gcmVxdWVzdC4gaW52YWxpZF9zY29wZSDigJMgRm9yIGFjY2VzcyB0b2tlbiByZXF1ZXN0cyB0aGF0IGluY2x1ZGUgYSBzY29wZSAocGFzc3dvcmQgb3IgY2xpZW50X2NyZWRlbnRpYWxzIGdyYW50cyksIHRoaXMgZXJyb3IgaW5kaWNhdGVzIGFuIGludmFsaWQgc2NvcGUgdmFsdWUgaW4gdGhlIHJlcXVlc3QuIHVuYXV0aG9yaXplZF9jbGllbnQg4oCTIFRoaXMgY2xpZW50IGlzIG5vdCBhdXRob3JpemVkIHRvIHVzZSB0aGUgcmVxdWVzdGVkIGdyYW50IHR5cGUuIEZvciBleGFtcGxlLCBpZiB5b3UgcmVzdHJpY3Qgd2hpY2ggYXBwbGljYXRpb25zIGNhbiB1c2UgdGhlIEltcGxpY2l0IGdyYW50LCB5b3Ugd291bGQgcmV0dXJuIHRoaXMgZXJyb3IgZm9yIHRoZSBvdGhlciBhcHBzLiB1bnN1cHBvcnRlZF9ncmFudF90eXBlIOKAkyBJZiBhIGdyYW50IHR5cGUgaXMgcmVxdWVzdGVkIHRoYXQgdGhlIGF1dGhvcml6YXRpb24gc2VydmVyIGRvZXNu4oCZdCByZWNvZ25pemUsIHVzZSB0aGlzIGNvZGUuIE5vdGUgdGhhdCB1bmtub3duIGdyYW50IHR5cGVzIGFsc28gdXNlIHRoaXMgc3BlY2lmaWMgZXJyb3IgY29kZSByYXRoZXIgdGhhbiB1c2luZyB0aGUgaW52YWxpZF9yZXF1ZXN0IGFib3ZlLlwiXG4gICAgICAgIClcbiAgICAgICAgLm9ubHkoKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlNob3VsZCBiZSBhIHNlbnRlbmNlIG9yIHR3byBhdCBtb3N0IGRlc2NyaWJpbmcgdGhlIGNpcmN1bXN0YW5jZSBvZiB0aGUgZXJyb3JcIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBlcnJvcl91cmk6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJPcHRpb25hbCByZWZlcmVuY2UgdG8gbW9yZSBkZXRhaWxlZCBlcnJvciBkZXNjcmlwdGlvblwiKVxuICAgICAgICAudXJpKHt9KSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcImVycm9yIHJlc3BvbnNlIG9uIEhUVFAgNDAwIGZyb20gYXV0aC90b2tlbiBwZXIgaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzY3NDlcIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBwcm9ibGVtOiBKb2kub2JqZWN0KHtcbiAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVmYXVsdChcImFib3V0OmJsYW5rXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkFuIGFic29sdXRlIFVSSSB0aGF0IGlkZW50aWZpZXMgdGhlIHByb2JsZW0gdHlwZS5cXG5XaGVuIGRlcmVmZXJlbmNlZCwgaXQgU0hPVUxEIHByb3ZpZGUgaHVtYW4tcmVhZGFibGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIHByb2JsZW0gdHlwZVxcbihlLmcuLCB1c2luZyBIVE1MKS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC51cmkoe30pLFxuICAgICAgdGl0bGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBzaG9ydCwgc3VtbWFyeSBvZiB0aGUgcHJvYmxlbSB0eXBlLiBXcml0dGVuIGluIGVuZ2xpc2ggYW5kIHJlYWRhYmxlXFxuZm9yIGVuZ2luZWVycyAodXN1YWxseSBub3Qgc3VpdGVkIGZvciBub24gdGVjaG5pY2FsIHN0YWtlaG9sZGVycyBhbmRcXG5ub3QgbG9jYWxpemVkKTsgZXhhbXBsZTogU2VydmljZSBVbmF2YWlsYWJsZS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBzdGF0dXM6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUaGUgSFRUUCBzdGF0dXMgY29kZSBnZW5lcmF0ZWQgYnkgdGhlIG9yaWdpbiBzZXJ2ZXIgZm9yIHRoaXMgb2NjdXJyZW5jZVxcbm9mIHRoZSBwcm9ibGVtLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAubWF4KDYwMClcbiAgICAgICAgLm1pbigxMDApLFxuICAgICAgZGV0YWlsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgaHVtYW4gcmVhZGFibGUgZXhwbGFuYXRpb24gc3BlY2lmaWMgdG8gdGhpcyBvY2N1cnJlbmNlIG9mIHRoZVxcbnByb2JsZW0uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgICAgaW5zdGFuY2U6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBbiBhYnNvbHV0ZSBVUkkgdGhhdCBpZGVudGlmaWVzIHRoZSBzcGVjaWZpYyBvY2N1cnJlbmNlIG9mIHRoZSBwcm9ibGVtLlxcbkl0IG1heSBvciBtYXkgbm90IHlpZWxkIGZ1cnRoZXIgaW5mb3JtYXRpb24gaWYgZGVyZWZlcmVuY2VkLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnVyaSh7fSksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJyZXVzYWJsZSBlcnJvciByZXNwb25zZS4gRnJvbSBodHRwczovL29wZW5zb3VyY2UuemFsYW5kby5jb20vcHJvYmxlbS9zY2hlbWEueWFtbC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgfSxcbn07XG4iXX0=