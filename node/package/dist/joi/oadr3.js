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
                    .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
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
                    .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
                    .optional()
                    .max(128)
                    .min(1),
                targetType: Joi.string().optional().max(128).min(1),
                targetValues: Joi.array()
                    .optional()
                    .items(Joi.string().max(128).min(1)),
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
                venName: Joi.string()
                    .description("User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n")
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
                    .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
                start: Joi.date().description("datetime in RFC 3339 format"),
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
                .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                    .allow(null)
                    .default(null)
                    .description("Enumerated or private string signifying the type of reading.")
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
                start: Joi.date().description("datetime in RFC 3339 format"),
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
                .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                    .allow(null)
                    .default(null)
                    .description("Enumerated or private string signifying the type of reading.")
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
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(), Joi.object({
            eventID: Joi.string()
                .description("URL safe VTN assigned object ID.")
                .required()
                .pattern(/^[a-zA-Z0-9_-]*$/, {})
                .max(128)
                .min(1),
            clientName: Joi.string()
                .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
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
                    .allow(null)
                    .default(null)
                    .description("Enumerated or private string signifying the type of reading.")
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
                    start: Joi.date().description("datetime in RFC 3339 format"),
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
                    .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                        start: Joi.date().description("datetime in RFC 3339 format"),
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
                        .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
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
                    .allow(null)
                    .default(null)
                    .description("Enumerated or private string signifying the type of reading.")
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
                    start: Joi.date().description("datetime in RFC 3339 format"),
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
                    .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                        start: Joi.date().description("datetime in RFC 3339 format"),
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
                        .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
            duration: Joi.string()
                .allow("")
                .default("PT0S")
                .description("duration in ISO 8601 format")
                .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
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
                    .allow(null)
                    .default(null)
                    .description("Enumerated or private string signifying the type of reading.")
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
                reportIntervals: Joi.string()
                    .allow("INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS")
                    .default("INTERVALS")
                    .description("Indicates VEN report interval options. See User Guide.")
                    .only(),
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
                .description("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n")
                .unknown()),
            intervalPeriod: Joi.object({
                start: Joi.date().description("datetime in RFC 3339 format"),
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
                .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
                .unknown(),
            intervals: Joi.array()
                .description("A list of interval objects.")
                .items(Joi.object({
                id: Joi.number()
                    .description("A client generated number assigned an interval object. Not a sequence number.")
                    .required()
                    .integer(),
                intervalPeriod: Joi.object({
                    start: Joi.date().description("datetime in RFC 3339 format"),
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
                    .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
            duration: Joi.string()
                .allow("")
                .default("PT0S")
                .description("duration in ISO 8601 format")
                .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
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
                    .allow(null)
                    .default(null)
                    .description("Enumerated or private string signifying the type of reading.")
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
                reportIntervals: Joi.string()
                    .allow("INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS")
                    .default("INTERVALS")
                    .description("Indicates VEN report interval options. See User Guide.")
                    .only(),
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
                .description("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n")
                .unknown()),
            intervalPeriod: Joi.object({
                start: Joi.date().description("datetime in RFC 3339 format"),
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
                .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
                .unknown(),
            intervals: Joi.array()
                .description("A list of interval objects.")
                .items(Joi.object({
                id: Joi.number()
                    .description("A client generated number assigned an interval object. Not a sequence number.")
                    .required()
                    .integer(),
                intervalPeriod: Joi.object({
                    start: Joi.date().description("datetime in RFC 3339 format"),
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
                    .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(), Joi.object({
            clientName: Joi.string()
                .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
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
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                resourceName: Joi.string()
                    .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                resourceName: Joi.string()
                    .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(), Joi.object({
            resourceName: Joi.string()
                .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
                .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
            .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
            .unknown(),
        interval: Joi.object({
            id: Joi.number()
                .description("A client generated number assigned an interval object. Not a sequence number.")
                .required()
                .integer(),
            intervalPeriod: Joi.object({
                start: Joi.date().description("datetime in RFC 3339 format"),
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
                .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
            start: Joi.date().description("datetime in RFC 3339 format"),
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
            .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                .allow(null)
                .default(null)
                .description("Enumerated or private string signifying the type of reading.")
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
                .allow(null)
                .default(null)
                .description("Enumerated or private string signifying the type of reading.")
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
            reportIntervals: Joi.string()
                .allow("INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS")
                .default("INTERVALS")
                .description("Indicates VEN report interval options. See User Guide.")
                .only(),
        })
            .description("An object that may be used to request a report from a VEN.\n")
            .unknown(),
        objectID: Joi.string()
            .description("URL safe VTN assigned object ID.")
            .pattern(/^[a-zA-Z0-9_-]*$/, {})
            .max(128)
            .min(1),
        venName: Joi.string()
            .description("User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n")
            .max(128)
            .min(1),
        clientName: Joi.string()
            .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
            .max(128)
            .min(1),
        targetType: Joi.string().max(128).min(1),
        targetValue: Joi.string().max(128).min(1),
        resourceName: Joi.string()
            .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
            .description("Enumerated or private string signifying the type of reading.")
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
                    start: Joi.date().description("datetime in RFC 3339 format"),
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
                    .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                        .allow(null)
                        .default(null)
                        .description("Enumerated or private string signifying the type of reading.")
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
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                eventID: Joi.string()
                    .description("URL safe VTN assigned object ID.")
                    .required()
                    .pattern(/^[a-zA-Z0-9_-]*$/, {})
                    .max(128)
                    .min(1),
                clientName: Joi.string()
                    .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
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
                        .allow(null)
                        .default(null)
                        .description("Enumerated or private string signifying the type of reading.")
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
                        start: Joi.date().description("datetime in RFC 3339 format"),
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
                        .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                            start: Joi.date().description("datetime in RFC 3339 format"),
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
                            .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                duration: Joi.string()
                    .allow("")
                    .default("PT0S")
                    .description("duration in ISO 8601 format")
                    .pattern(/^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/, {})
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
                        .allow(null)
                        .default(null)
                        .description("Enumerated or private string signifying the type of reading.")
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
                    reportIntervals: Joi.string()
                        .allow("INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS")
                        .default("INTERVALS")
                        .description("Indicates VEN report interval options. See User Guide.")
                        .only(),
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
                    .description("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n")
                    .unknown()),
                intervalPeriod: Joi.object({
                    start: Joi.date().description("datetime in RFC 3339 format"),
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
                    .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
                    .unknown(),
                intervals: Joi.array()
                    .description("A list of interval objects.")
                    .items(Joi.object({
                    id: Joi.number()
                        .description("A client generated number assigned an interval object. Not a sequence number.")
                        .required()
                        .integer(),
                    intervalPeriod: Joi.object({
                        start: Joi.date().description("datetime in RFC 3339 format"),
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
                        .description('Defines temporal aspects of intervals.\nA start of "0000-00-00" or "0000-00-00T00:00:00" may indicate \'now\'. See User Guide.\nA duration of "P9999Y" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n')
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
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                clientName: Joi.string()
                    .description("User generated identifier, may be VEN identifier provisioned out-of-band.")
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
                    .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                    .unknown(), Joi.object({
                    resourceName: Joi.string()
                        .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
                .description("metadata common to all addressable objects. Values provided by VTN on object creation.")
                .unknown(), Joi.object({
                resourceName: Joi.string()
                    .description("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data")
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
        dateTime: Joi.date().description("datetime in RFC 3339 format"),
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
        authServerInfo: Joi.object({
            tokenURL: Joi.string()
                .description("URL of the token endpoint.")
                .required()
                .uri({}),
        }).unknown(),
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
        notifiersResponse: Joi.object({
            WEBHOOK: Joi.boolean().description("Currently MUST be true").required(),
            MQTT: Joi.object({
                URIS: Joi.array()
                    .required()
                    .items(Joi.string()
                    .description("URIs for connection to MQTT broker")
                    .uri({})),
                serialization: Joi.string()
                    .allow("JSON")
                    .description("Currently always JSON, perhaps other formats supported in future")
                    .only()
                    .required(),
                authentication: Joi.alternatives()
                    .match("one")
                    .try(Joi.object({
                    method: Joi.string()
                        .allow("ANONYMOUS")
                        .description("Specifies anonymous authentication")
                        .only()
                        .required(),
                })
                    .description("MQTT broker anonymous authentication details")
                    .unknown(), Joi.object({
                    method: Joi.string()
                        .allow("OAUTH2_BEARER_TOKEN")
                        .description("Specifies OAuth2 bearer token authentication")
                        .only()
                        .required(),
                    username: Joi.string()
                        .allow("")
                        .description('Either the distinguished string "{clientID}", or any other literal string')
                        .required()
                        .min(0),
                })
                    .description("MQTT broker OAuth2 Bearer Token authentication details")
                    .unknown(), Joi.object({
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
                    .unknown())
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
                .items(Joi.string().description("URIs for connection to MQTT broker").uri({})),
            serialization: Joi.string()
                .allow("JSON")
                .description("Currently always JSON, perhaps other formats supported in future")
                .only()
                .required(),
            authentication: Joi.alternatives()
                .match("one")
                .try(Joi.object({
                method: Joi.string()
                    .allow("ANONYMOUS")
                    .description("Specifies anonymous authentication")
                    .only()
                    .required(),
            })
                .description("MQTT broker anonymous authentication details")
                .unknown(), Joi.object({
                method: Joi.string()
                    .allow("OAUTH2_BEARER_TOKEN")
                    .description("Specifies OAuth2 bearer token authentication")
                    .only()
                    .required(),
                username: Joi.string()
                    .allow("")
                    .description('Either the distinguished string "{clientID}", or any other literal string')
                    .required()
                    .min(0),
            })
                .description("MQTT broker OAuth2 Bearer Token authentication details")
                .unknown(), Joi.object({
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
                .unknown())
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
                .description('Either the distinguished string "{clientID}", or any other literal string')
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
                .description("'Topic path for CREATE operations,\n not provided for notifications for a specific object ID,\n e.g. until programID foo is created, clients unable to\n request notifications of its creation'\n")
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
            .description("MQTT notifier topic names for notifications of subscribable-object operations")
            .unknown(),
        notifierTopicsResponse: Joi.object({
            topics: Joi.object({
                CREATE: Joi.string()
                    .allow("")
                    .description("'Topic path for CREATE operations,\n not provided for notifications for a specific object ID,\n e.g. until programID foo is created, clients unable to\n request notifications of its creation'\n")
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
                .description("MQTT notifier topic names for notifications of subscribable-object operations")
                .required()
                .unknown(),
        }).unknown(),
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2FkcjMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvam9pL29hZHIzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQztBQUV0QixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDckIsVUFBVSxFQUFFO1FBQ1YsaUJBQWlCLEVBQUU7WUFDakIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDO2dCQUNoQixVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxZQUFZLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRTtxQkFDdEIsUUFBUSxFQUFFO3FCQUNWLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3hELENBQUM7WUFDRixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDdEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMs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QU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDO2dCQUNqQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtxQkFDakIsS0FBSyxDQUFDLEVBQUUsQ0FBQztxQkFDVCxXQUFXLENBQ1YsbU1BQW1NLENBQ3BNO3FCQUNBLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUU7cUJBQ2pCLEtBQUssQ0FBQyxFQUFFLENBQUM7cUJBQ1QsV0FBVyxDQUFDLGtDQUFrQyxDQUFDO3FCQUMvQyxRQUFRLEVBQUU7cUJBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDVCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtxQkFDakIsS0FBSyxDQUFDLEVBQUUsQ0FBQztxQkFDVCxXQUFXLENBQUMsa0NBQWtDLENBQUM7cUJBQy9DLFFBQVEsRUFBRTtxQkFDVixHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNULEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFO3FCQUNkLEtBQUssQ0FBQyxFQUFFLENBQUM7cUJBQ1QsV0FBVyxDQUFDLG9EQUFvRCxDQUFDO3FCQUNqRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ1YsQ0FBQztpQkFDQyxXQUFXLENBQ1YsK0VBQStFLENBQ2hGO2lCQUNBLFFBQVEsRUFBRTtpQkFDVixPQUFPLEVBQUU7U0FDYixDQUFDLENBQUMsT0FBTyxFQUFFO0tBQ2I7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpvaSBmcm9tIFwiam9pXCI7XG5cbmV4cG9ydCBjb25zdCBzY2hlbWFzID0ge1xuICBwYXJhbWV0ZXJzOiB7XG4gICAgc2VhcmNoQWxsUHJvZ3JhbXM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICB0YXJnZXRUeXBlOiBKb2kuc3RyaW5nKCkub3B0aW9uYWwoKS5tYXgoMTI4KS5taW4oMSksXG4gICAgICAgIHRhcmdldFZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkubWF4KDEyOCkubWluKDEpKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgICBzZWFyY2hBbGxSZXBvcnRzOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAubWluKDEpLFxuICAgICAgICBldmVudElEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAubWluKDEpLFxuICAgICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cIlxuICAgICAgICAgIClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgIC5taW4oMSksXG4gICAgICAgIHNraXA6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5taW4oMCksXG4gICAgICAgIGxpbWl0OiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWF4KDUwKS5taW4oMCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgc2VhcmNoQWxsRXZlbnRzOiB7XG4gICAgICBwYXRoOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIHF1ZXJ5OiBKb2kub2JqZWN0KHtcbiAgICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAubWluKDEpLFxuICAgICAgICB0YXJnZXRUeXBlOiBKb2kuc3RyaW5nKCkub3B0aW9uYWwoKS5tYXgoMTI4KS5taW4oMSksXG4gICAgICAgIHRhcmdldFZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkubWF4KDEyOCkubWluKDEpKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgICAgYWN0aXZlOiBKb2kuYm9vbGVhbigpLm9wdGlvbmFsKCksXG4gICAgICB9KSxcbiAgICAgIGhlYWRlcjogSm9pLm9iamVjdCh7fSksXG4gICAgICBjb29raWU6IEpvaS5vYmplY3Qoe30pLFxuICAgIH0sXG4gICAgc2VhcmNoU3Vic2NyaXB0aW9uczoge1xuICAgICAgcGF0aDogSm9pLm9iamVjdCh7fSksXG4gICAgICBxdWVyeTogSm9pLm9iamVjdCh7XG4gICAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICApXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAubWluKDEpLFxuICAgICAgICB0YXJnZXRUeXBlOiBKb2kuc3RyaW5nKCkub3B0aW9uYWwoKS5tYXgoMTI4KS5taW4oMSksXG4gICAgICAgIHRhcmdldFZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkubWF4KDEyOCkubWluKDEpKSxcbiAgICAgICAgb2JqZWN0czogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICApLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICAgIHNlYXJjaFZlbnM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICB2ZW5OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cXG52ZW5OYW1lIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXF1ZSB3aXRoaW4gdGhlIHNjb3BlIG9mIGEgVlROXFxuXCJcbiAgICAgICAgICApXG4gICAgICAgICAgLm9wdGlvbmFsKClcbiAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAubWluKDEpLFxuICAgICAgICB0YXJnZXRUeXBlOiBKb2kuc3RyaW5nKCkub3B0aW9uYWwoKS5tYXgoMTI4KS5taW4oMSksXG4gICAgICAgIHRhcmdldFZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkubWF4KDEyOCkubWluKDEpKSxcbiAgICAgICAgc2tpcDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1pbigwKSxcbiAgICAgICAgbGltaXQ6IEpvaS5udW1iZXIoKS5vcHRpb25hbCgpLmludGVnZXIoKS5tYXgoNTApLm1pbigwKSxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyOiBKb2kub2JqZWN0KHt9KSxcbiAgICAgIGNvb2tpZTogSm9pLm9iamVjdCh7fSksXG4gICAgfSxcbiAgICBzZWFyY2hWZW5SZXNvdXJjZXM6IHtcbiAgICAgIHBhdGg6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgcXVlcnk6IEpvaS5vYmplY3Qoe1xuICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllci4gQSB2YWx1ZSBvZiBBR0dSRUdBVEVEX1JFUE9SVCBpbmRpY2F0ZXMgYW4gYWdncmVnYXRpb24gb2YgbW9yZSB0aGF0IG9uZSByZXNvdXJjZSdzIGRhdGFcIlxuICAgICAgICAgIClcbiAgICAgICAgICAub3B0aW9uYWwoKVxuICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgIC5taW4oMSksXG4gICAgICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5vcHRpb25hbCgpLm1heCgxMjgpLm1pbigxKSxcbiAgICAgICAgdGFyZ2V0VmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5vcHRpb25hbCgpXG4gICAgICAgICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5tYXgoMTI4KS5taW4oMSkpLFxuICAgICAgICBza2lwOiBKb2kubnVtYmVyKCkub3B0aW9uYWwoKS5pbnRlZ2VyKCkubWluKDApLFxuICAgICAgICBsaW1pdDogSm9pLm51bWJlcigpLm9wdGlvbmFsKCkuaW50ZWdlcigpLm1heCg1MCkubWluKDApLFxuICAgICAgfSksXG4gICAgICBoZWFkZXI6IEpvaS5vYmplY3Qoe30pLFxuICAgICAgY29va2llOiBKb2kub2JqZWN0KHt9KSxcbiAgICB9LFxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgcHJvZ3JhbTogSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgIC50cnkoXG4gICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiBwcm9ncmFtXCIpXG4gICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgLnRyeShcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgcHJvZ3JhbU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNob3J0IG5hbWUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgcHJvZ3JhbS5cIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIHByb2dyYW1Mb25nTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJMb25nIG5hbWUgb2YgcHJvZ3JhbSBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCIpXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgcmV0YWlsZXJOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiU2hvcnQgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgcHJvdmlkaW5nIHRoZSBwcm9ncmFtLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIHJldGFpbGVyTG9uZ05hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJMb25nIG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICBwcm9ncmFtVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHByb2dyYW0gZGVmaW5lZCBjYXRlZ29yaXphdGlvbi5cIilcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICBjb3VudHJ5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkFscGhhLTIgY29kZSBwZXIgSVNPIDMxNjYtMS5cIilcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICBwcmluY2lwYWxTdWJkaXZpc2lvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDb2RpbmcgcGVyIElTTyAzMTY2LTIuIEUuZy4gc3RhdGUgaW4gVVMuXCIpXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgJ0RlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBzdGFydCBvZiBcIjAwMDAtMDAtMDBcIiBvciBcIjAwMDAtMDAtMDBUMDA6MDA6MDBcIiBtYXkgaW5kaWNhdGUgXFwnbm93XFwnLiBTZWUgVXNlciBHdWlkZS5cXG5BIGR1cmF0aW9uIG9mIFwiUDk5OTlZXCIgbWF5IGluZGljYXRlIGluZmluaXR5LiBTZWUgVXNlciBHdWlkZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IGluZGljYXRlcyBhYnNvbHV0ZSByYW5nZSBvZiBjbGllbnQgYXBwbGllZCBvZmZzZXQgdG8gc3RhcnQuIFNlZSBVc2VyIEd1aWRlLlxcbidcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgcHJvZ3JhbURlc2NyaXB0aW9uczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIFVSTDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGh1bWFuIG9yIG1hY2hpbmUgcmVhZGFibGUgcHJvZ3JhbSBkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLnVyaSh7fSksXG4gICAgICAgICAgICAgICAgICB9KS51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBiaW5kaW5nRXZlbnRzOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJUcnVlIGlmIGV2ZW50cyBhcmUgZml4ZWQgb25jZSB0cmFuc21pdHRlZC5cIiksXG4gICAgICAgICAgICAgIGxvY2FsUHJpY2U6IEpvaS5ib29sZWFuKClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiBldmVudHMgaGF2ZSBiZWVuIGFkYXB0ZWQgZnJvbSBhIGdyaWQgZXZlbnQuXCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkNsaWVudCBwcm92aWRlZCBkZXNjcmlwdGlvbiBvZiBwcm9ncmFtXCIpXG4gICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICApXG4gICAgICApLFxuICAgIHByb2dyYW1SZXF1ZXN0OiBKb2kub2JqZWN0KHtcbiAgICAgIHByb2dyYW1OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2hvcnQgbmFtZSB0byB1bmlxdWVseSBpZGVudGlmeSBwcm9ncmFtLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHByb2dyYW1Mb25nTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJMb25nIG5hbWUgb2YgcHJvZ3JhbSBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICByZXRhaWxlck5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2hvcnQgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgcHJvdmlkaW5nIHRoZSBwcm9ncmFtLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgcmV0YWlsZXJMb25nTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJMb25nIG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHByb2dyYW1UeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgcHJvZ3JhbSBkZWZpbmVkIGNhdGVnb3JpemF0aW9uLlwiKVxuICAgICAgICAubWluKDApLFxuICAgICAgY291bnRyeTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBbHBoYS0yIGNvZGUgcGVyIElTTyAzMTY2LTEuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBwcmluY2lwYWxTdWJkaXZpc2lvbjogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJDb2RpbmcgcGVyIElTTyAzMTY2LTIuIEUuZy4gc3RhdGUgaW4gVVMuXCIpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpLFxuICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5taW4oMCksXG4gICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgIH0pXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAnRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIHN0YXJ0IG9mIFwiMDAwMC0wMC0wMFwiIG9yIFwiMDAwMC0wMC0wMFQwMDowMDowMFwiIG1heSBpbmRpY2F0ZSBcXCdub3dcXCcuIFNlZSBVc2VyIEd1aWRlLlxcbkEgZHVyYXRpb24gb2YgXCJQOTk5OVlcIiBtYXkgaW5kaWNhdGUgaW5maW5pdHkuIFNlZSBVc2VyIEd1aWRlLlxcbkEgcmFuZG9taXplU3RhcnQgaW5kaWNhdGVzIGFic29sdXRlIHJhbmdlIG9mIGNsaWVudCBhcHBsaWVkIG9mZnNldCB0byBzdGFydC4gU2VlIFVzZXIgR3VpZGUuXFxuJ1xuICAgICAgICApXG4gICAgICAgIC51bmtub3duKCksXG4gICAgICBwcm9ncmFtRGVzY3JpcHRpb25zOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHByb2dyYW1EZXNjcmlwdGlvbnNcIilcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgVVJMOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBodW1hbiBvciBtYWNoaW5lIHJlYWRhYmxlIHByb2dyYW0gZGVzY3JpcHRpb25cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLnVyaSh7fSksXG4gICAgICAgICAgfSkudW5rbm93bigpXG4gICAgICAgICksXG4gICAgICBiaW5kaW5nRXZlbnRzOiBKb2kuYm9vbGVhbigpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJUcnVlIGlmIGV2ZW50cyBhcmUgZml4ZWQgb25jZSB0cmFuc21pdHRlZC5cIiksXG4gICAgICBsb2NhbFByaWNlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJUcnVlIGlmIGV2ZW50cyBoYXZlIGJlZW4gYWRhcHRlZCBmcm9tIGEgZ3JpZCBldmVudC5cIiksXG4gICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICBhY2N1cmFjeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMDApXG4gICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFwiQ2xpZW50IHByb3ZpZGVkIGRlc2NyaXB0aW9uIG9mIHByb2dyYW1cIilcbiAgICAgIC51bmtub3duKCksXG4gICAgcmVwb3J0OiBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgLnRyeShcbiAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2VydmVyIHByb3ZpZGVkIHJlcHJlc2VudGF0aW9uIG9mIHJlcG9ydFwiKVxuICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIGV2ZW50SUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIG91dC1vZi1iYW5kLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgcmVwb3J0TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIlVzZXIgZGVmaW5lZCBzdHJpbmcgZm9yIHVzZSBpbiBkZWJ1Z2dpbmcgb3IgVXNlciBJbnRlcmZhY2UuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHJlcG9ydFBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICByZXNvdXJjZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2Ygb2JqZWN0cyBjb250YWluaW5nIHJlcG9ydCBkYXRhIGZvciBhIHNldCBvZiByZXNvdXJjZXMuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIuIEEgdmFsdWUgb2YgQUdHUkVHQVRFRF9SRVBPUlQgaW5kaWNhdGVzIGFuIGFnZ3JlZ2F0aW9uIG9mIG1vcmUgdGhhdCBvbmUgcmVzb3VyY2UncyBkYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0RlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBzdGFydCBvZiBcIjAwMDAtMDAtMDBcIiBvciBcIjAwMDAtMDAtMDBUMDA6MDA6MDBcIiBtYXkgaW5kaWNhdGUgXFwnbm93XFwnLiBTZWUgVXNlciBHdWlkZS5cXG5BIGR1cmF0aW9uIG9mIFwiUDk5OTlZXCIgbWF5IGluZGljYXRlIGluZmluaXR5LiBTZWUgVXNlciBHdWlkZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IGluZGljYXRlcyBhYnNvbHV0ZSByYW5nZSBvZiBjbGllbnQgYXBwbGllZCBvZmZzZXQgdG8gc3RhcnQuIFNlZSBVc2VyIEd1aWRlLlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0RlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBzdGFydCBvZiBcIjAwMDAtMDAtMDBcIiBvciBcIjAwMDAtMDAtMDBUMDA6MDA6MDBcIiBtYXkgaW5kaWNhdGUgXFwnbm93XFwnLiBTZWUgVXNlciBHdWlkZS5cXG5BIGR1cmF0aW9uIG9mIFwiUDk5OTlZXCIgbWF5IGluZGljYXRlIGluZmluaXR5LiBTZWUgVXNlciBHdWlkZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IGluZGljYXRlcyBhYnNvbHV0ZSByYW5nZSBvZiBjbGllbnQgYXBwbGllZCBvZmZzZXQgdG8gc3RhcnQuIFNlZSBVc2VyIEd1aWRlLlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlJlcG9ydCBkYXRhIGFzc29jaWF0ZWQgd2l0aCBhIHJlc291cmNlLlwiKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcInJlcG9ydCBvYmplY3QuXCIpXG4gICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICApXG4gICAgICApLFxuICAgIHJlcG9ydFJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgZXZlbnRJRDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcmVwb3J0TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHBheWxvYWREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICBhY2N1cmFjeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAgICAgICAubWF4KDEwMClcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHJlc291cmNlczogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBsaXN0IG9mIG9iamVjdHMgY29udGFpbmluZyByZXBvcnQgZGF0YSBmb3IgYSBzZXQgb2YgcmVzb3VyY2VzLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLml0ZW1zKFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllci4gQSB2YWx1ZSBvZiBBR0dSRUdBVEVEX1JFUE9SVCBpbmRpY2F0ZXMgYW4gYWdncmVnYXRpb24gb2YgbW9yZSB0aGF0IG9uZSByZXNvdXJjZSdzIGRhdGFcIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0RlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBzdGFydCBvZiBcIjAwMDAtMDAtMDBcIiBvciBcIjAwMDAtMDAtMDBUMDA6MDA6MDBcIiBtYXkgaW5kaWNhdGUgXFwnbm93XFwnLiBTZWUgVXNlciBHdWlkZS5cXG5BIGR1cmF0aW9uIG9mIFwiUDk5OTlZXCIgbWF5IGluZGljYXRlIGluZmluaXR5LiBTZWUgVXNlciBHdWlkZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IGluZGljYXRlcyBhYnNvbHV0ZSByYW5nZSBvZiBjbGllbnQgYXBwbGllZCBvZmZzZXQgdG8gc3RhcnQuIFNlZSBVc2VyIEd1aWRlLlxcbidcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgaW50ZXJ2YWxzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgaW50ZXJ2YWwgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIGNsaWVudCBnZW5lcmF0ZWQgbnVtYmVyIGFzc2lnbmVkIGFuIGludGVydmFsIG9iamVjdC4gTm90IGEgc2VxdWVuY2UgbnVtYmVyLlwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAnRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIHN0YXJ0IG9mIFwiMDAwMC0wMC0wMFwiIG9yIFwiMDAwMC0wMC0wMFQwMDowMDowMFwiIG1heSBpbmRpY2F0ZSBcXCdub3dcXCcuIFNlZSBVc2VyIEd1aWRlLlxcbkEgZHVyYXRpb24gb2YgXCJQOTk5OVlcIiBtYXkgaW5kaWNhdGUgaW5maW5pdHkuIFNlZSBVc2VyIEd1aWRlLlxcbkEgcmFuZG9taXplU3RhcnQgaW5kaWNhdGVzIGFic29sdXRlIHJhbmdlIG9mIGNsaWVudCBhcHBsaWVkIG9mZnNldCB0byBzdGFydC4gU2VlIFVzZXIgR3VpZGUuXFxuJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiUmVwb3J0IGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgcmVzb3VyY2UuXCIpXG4gICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcInJlcG9ydCBvYmplY3QuXCIpXG4gICAgICAudW5rbm93bigpLFxuICAgIGV2ZW50OiBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgLnRyeShcbiAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2VydmVyIHByb3ZpZGVkIHJlcHJlc2VudGF0aW9uIG9mIGV2ZW50XCIpXG4gICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgLnRyeShcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBldmVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgcHJpb3JpdHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJSZWxhdGl2ZSBwcmlvcml0eSBvZiBldmVudC4gQSBsb3dlciBudW1iZXIgaXMgYSBoaWdoZXIgcHJpb3JpdHkuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmludGVnZXIoKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICByZXBvcnREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHJlcG9ydERlc2NyaXB0b3Igb2JqZWN0cy4gVXNlZCB0byByZXF1ZXN0IHJlcG9ydHMgZnJvbSBWRU4uXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRJbnRlcnZhbDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGUgaW50ZXJ2YWwgb24gd2hpY2ggdG8gZ2VuZXJhdGUgYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIGdlbmVyYXRlIHJlcG9ydCBhdCBlbmQgb2YgbGFzdCBpbnRlcnZhbC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBudW1JbnRlcnZhbHM6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVGhlIG51bWJlciBvZiBpbnRlcnZhbHMgdG8gaW5jbHVkZSBpbiBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgdGhhdCBhbGwgaW50ZXJ2YWxzIGFyZSB0byBiZSBpbmNsdWRlZC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBoaXN0b3JpY2FsOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlRydWUgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgcHJlY2VkaW5nIHN0YXJ0SW50ZXJ2YWwuXFxuRmFsc2UgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgZm9sbG93aW5nIHN0YXJ0SW50ZXJ2YWwgKGUuZy4gZm9yZWNhc3QpLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgZnJlcXVlbmN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KDEpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydEludGVydmFsczogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiSU5URVJWQUxTXCIsIFwiU1VCX0lOVEVSVkFMU1wiLCBcIk9QRU5fSU5URVJWQUxTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJJTlRFUlZBTFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkluZGljYXRlcyBWRU4gcmVwb3J0IGludGVydmFsIG9wdGlvbnMuIFNlZSBVc2VyIEd1aWRlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAnRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIHN0YXJ0IG9mIFwiMDAwMC0wMC0wMFwiIG9yIFwiMDAwMC0wMC0wMFQwMDowMDowMFwiIG1heSBpbmRpY2F0ZSBcXCdub3dcXCcuIFNlZSBVc2VyIEd1aWRlLlxcbkEgZHVyYXRpb24gb2YgXCJQOTk5OVlcIiBtYXkgaW5kaWNhdGUgaW5maW5pdHkuIFNlZSBVc2VyIEd1aWRlLlxcbkEgcmFuZG9taXplU3RhcnQgaW5kaWNhdGVzIGFic29sdXRlIHJhbmdlIG9mIGNsaWVudCBhcHBsaWVkIG9mZnNldCB0byBzdGFydC4gU2VlIFVzZXIgR3VpZGUuXFxuJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICBpbnRlcnZhbHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0RlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBzdGFydCBvZiBcIjAwMDAtMDAtMDBcIiBvciBcIjAwMDAtMDAtMDBUMDA6MDA6MDBcIiBtYXkgaW5kaWNhdGUgXFwnbm93XFwnLiBTZWUgVXNlciBHdWlkZS5cXG5BIGR1cmF0aW9uIG9mIFwiUDk5OTlZXCIgbWF5IGluZGljYXRlIGluZmluaXR5LiBTZWUgVXNlciBHdWlkZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IGluZGljYXRlcyBhYnNvbHV0ZSByYW5nZSBvZiBjbGllbnQgYXBwbGllZCBvZmZzZXQgdG8gc3RhcnQuIFNlZSBVc2VyIEd1aWRlLlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRXZlbnQgb2JqZWN0IHRvIGNvbW11bmljYXRlIGEgRGVtYW5kIFJlc3BvbnNlIHJlcXVlc3QgdG8gVkVOLlxcbklmIGludGVydmFsUGVyaW9kIGlzIHByZXNlbnQsIHNldHMgZGVmYXVsdCBzdGFydCB0aW1lIGFuZCBkdXJhdGlvbiBvZiBpbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgKVxuICAgICAgKSxcbiAgICBldmVudFJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBldmVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHByaW9yaXR5OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlJlbGF0aXZlIHByaW9yaXR5IG9mIGV2ZW50LiBBIGxvd2VyIG51bWJlciBpcyBhIGhpZ2hlciBwcmlvcml0eS5cIlxuICAgICAgICApXG4gICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcmVwb3J0RGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgICApXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0ZTogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAuZGVmYXVsdChmYWxzZSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiByZXBvcnQgc2hvdWxkIGFnZ3JlZ2F0ZSByZXN1bHRzIGZyb20gYWxsIHRhcmdldGVkIHJlc291cmNlcy5cXG5GYWxzZSBpZiByZXBvcnQgaW5jbHVkZXMgcmVzdWx0cyBmb3IgZWFjaCByZXNvdXJjZS5cXG5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgc3RhcnRJbnRlcnZhbDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJUaGUgaW50ZXJ2YWwgb24gd2hpY2ggdG8gZ2VuZXJhdGUgYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIGdlbmVyYXRlIHJlcG9ydCBhdCBlbmQgb2YgbGFzdCBpbnRlcnZhbC5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICBudW1JbnRlcnZhbHM6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiVGhlIG51bWJlciBvZiBpbnRlcnZhbHMgdG8gaW5jbHVkZSBpbiBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgdGhhdCBhbGwgaW50ZXJ2YWxzIGFyZSB0byBiZSBpbmNsdWRlZC5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICBoaXN0b3JpY2FsOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KHRydWUpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlRydWUgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgcHJlY2VkaW5nIHN0YXJ0SW50ZXJ2YWwuXFxuRmFsc2UgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgZm9sbG93aW5nIHN0YXJ0SW50ZXJ2YWwgKGUuZy4gZm9yZWNhc3QpLlxcblwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBmcmVxdWVuY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiTnVtYmVyIG9mIGludGVydmFscyB0aGF0IGVsYXBzZSBiZXR3ZWVuIHJlcG9ydHMuXFxuLTEgaW5kaWNhdGVzIHNhbWUgYXMgbnVtSW50ZXJ2YWxzLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgIHJlcGVhdDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KDEpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIk51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgcmVwb3J0LlxcbjEgaW5kaWNhdGVzIGdlbmVyYXRlIG9uZSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHJlcGVhdCBpbmRlZmluaXRlbHkuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgcmVwb3J0SW50ZXJ2YWxzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiSU5URVJWQUxTXCIsIFwiU1VCX0lOVEVSVkFMU1wiLCBcIk9QRU5fSU5URVJWQUxTXCIpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KFwiSU5URVJWQUxTXCIpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkluZGljYXRlcyBWRU4gcmVwb3J0IGludGVydmFsIG9wdGlvbnMuIFNlZSBVc2VyIEd1aWRlLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLm9ubHkoKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkFuIG9iamVjdCB0aGF0IG1heSBiZSB1c2VkIHRvIHJlcXVlc3QgYSByZXBvcnQgZnJvbSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLlwiKVxuICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgY3VycmVuY3k6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIiksXG4gICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgfSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICdEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgc3RhcnQgb2YgXCIwMDAwLTAwLTAwXCIgb3IgXCIwMDAwLTAwLTAwVDAwOjAwOjAwXCIgbWF5IGluZGljYXRlIFxcJ25vd1xcJy4gU2VlIFVzZXIgR3VpZGUuXFxuQSBkdXJhdGlvbiBvZiBcIlA5OTk5WVwiIG1heSBpbmRpY2F0ZSBpbmZpbml0eS4gU2VlIFVzZXIgR3VpZGUuXFxuQSByYW5kb21pemVTdGFydCBpbmRpY2F0ZXMgYWJzb2x1dGUgcmFuZ2Ugb2YgY2xpZW50IGFwcGxpZWQgb2Zmc2V0IHRvIHN0YXJ0LiBTZWUgVXNlciBHdWlkZS5cXG4nXG4gICAgICAgIClcbiAgICAgICAgLnVua25vd24oKSxcbiAgICAgIGludGVydmFsczogSm9pLmFycmF5KClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIGlkOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAnRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIHN0YXJ0IG9mIFwiMDAwMC0wMC0wMFwiIG9yIFwiMDAwMC0wMC0wMFQwMDowMDowMFwiIG1heSBpbmRpY2F0ZSBcXCdub3dcXCcuIFNlZSBVc2VyIEd1aWRlLlxcbkEgZHVyYXRpb24gb2YgXCJQOTk5OVlcIiBtYXkgaW5kaWNhdGUgaW5maW5pdHkuIFNlZSBVc2VyIEd1aWRlLlxcbkEgcmFuZG9taXplU3RhcnQgaW5kaWNhdGVzIGFic29sdXRlIHJhbmdlIG9mIGNsaWVudCBhcHBsaWVkIG9mZnNldCB0byBzdGFydC4gU2VlIFVzZXIgR3VpZGUuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIkV2ZW50IG9iamVjdCB0byBjb21tdW5pY2F0ZSBhIERlbWFuZCBSZXNwb25zZSByZXF1ZXN0IHRvIFZFTi5cXG5JZiBpbnRlcnZhbFBlcmlvZCBpcyBwcmVzZW50LCBzZXRzIGRlZmF1bHQgc3RhcnQgdGltZSBhbmQgZHVyYXRpb24gb2YgaW50ZXJ2YWxzLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIHN1YnNjcmlwdGlvbjogSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgIC50cnkoXG4gICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiBzdWJzY3JpcHRpb25cIilcbiAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIHByb2dyYW1JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIG9iamVjdE9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImxpc3Qgb2Ygb2JqZWN0cyB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwibGlzdCBvZiBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIilcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJSRUFEXCIsIFwiQ1JFQVRFXCIsIFwiVVBEQVRFXCIsIFwiREVMRVRFXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIm9iamVjdCBvcGVyYXRpb24gdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tVcmw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZXIgcHJvdmlkZWQgd2ViaG9vayBVUkwuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICAgICAgICAgICAgYmVhcmVyVG9rZW46IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3QgdHlwZSwgb3BlcmF0aW9ucywgYW5kIGNhbGxiYWNrVXJsLlwiKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLiBVc2VkIGJ5IHNlcnZlciB0byBmaWx0ZXIgY2FsbGJhY2tzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBjcmVhdGVkIGJ5IGEgY2xpZW50IHRvIHJlY2VpdmUgbm90aWZpY2F0aW9uIG9mIG9wZXJhdGlvbnMgb24gb2JqZWN0cy5cXG5DbGllbnRzIG1heSBzdWJzY3JpYmUgdG8gYmUgbm90aWZpZWQgd2hlbiBhIHR5cGUgb2Ygb2JqZWN0IGlzIGNyZWF0ZWQsXFxudXBkYXRlZCwgb3IgZGVsZXRlZC5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICApXG4gICAgICApLFxuICAgIHN1YnNjcmlwdGlvblJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgY2xpZW50TmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBvYmplY3RPcGVyYXRpb25zOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9iamVjdHMgYW5kIG9wZXJhdGlvbnMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBvYmplY3RzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9iamVjdHMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlJFQURcIiwgXCJDUkVBVEVcIiwgXCJVUERBVEVcIiwgXCJERUxFVEVcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIm9iamVjdCBvcGVyYXRpb24gdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgY2FsbGJhY2tVcmw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VyIHByb3ZpZGVkIHdlYmhvb2sgVVJMLlwiKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAudXJpKHt9KSxcbiAgICAgICAgICAgIGJlYXJlclRva2VuOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIlVzZXIgcHJvdmlkZWQgdG9rZW4uXFxuVG8gYXZvaWQgY3VzdG9tIGludGVncmF0aW9ucywgY2FsbGJhY2sgZW5kcG9pbnRzXFxuc2hvdWxkIGFjY2VwdCB0aGUgcHJvdmlkZWQgYmVhcmVyIHRva2VuIHRvIGF1dGhlbnRpY2F0ZSBWVE4gcmVxdWVzdHMuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJvYmplY3QgdHlwZSwgb3BlcmF0aW9ucywgYW5kIGNhbGxiYWNrVXJsLlwiKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy4gVXNlZCBieSBzZXJ2ZXIgdG8gZmlsdGVyIGNhbGxiYWNrcy5cIlxuICAgICAgICApXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQW4gb2JqZWN0IGNyZWF0ZWQgYnkgYSBjbGllbnQgdG8gcmVjZWl2ZSBub3RpZmljYXRpb24gb2Ygb3BlcmF0aW9ucyBvbiBvYmplY3RzLlxcbkNsaWVudHMgbWF5IHN1YnNjcmliZSB0byBiZSBub3RpZmllZCB3aGVuIGEgdHlwZSBvZiBvYmplY3QgaXMgY3JlYXRlZCxcXG51cGRhdGVkLCBvciBkZWxldGVkLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIHZlbjogSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgIC50cnkoXG4gICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiB2ZW5cIilcbiAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICB2ZW5OYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cXG52ZW5OYW1lIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXF1ZSB3aXRoaW4gdGhlIHNjb3BlIG9mIGEgVlROXFxuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVzb3VyY2Ugb2JqZWN0cyByZXByZXNlbnRpbmcgZW5kLWRldmljZXMgb3Igc3lzdGVtcy5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiU2VydmVyIHByb3ZpZGVkIHJlcHJlc2VudGF0aW9uIG9mIHJlc291cmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIuIEEgdmFsdWUgb2YgQUdHUkVHQVRFRF9SRVBPUlQgaW5kaWNhdGVzIGFuIGFnZ3JlZ2F0aW9uIG9mIG1vcmUgdGhhdCBvbmUgcmVzb3VyY2UncyBkYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVuSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVmVuIHJlcHJlc2VudHMgYSBjbGllbnQgd2l0aCB0aGUgdmVuIHJvbGUuXCIpXG4gICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICApXG4gICAgICApLFxuICAgIHZlblJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgdmVuTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cXG52ZW5OYW1lIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXF1ZSB3aXRoaW4gdGhlIHNjb3BlIG9mIGEgVlROXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBsaXN0IG9mIHJlc291cmNlIG9iamVjdHMgcmVwcmVzZW50aW5nIGVuZC1kZXZpY2VzIG9yIHN5c3RlbXMuXCJcbiAgICAgICAgKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiByZXNvdXJjZVwiKVxuICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgdmVuSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFwiVmVuIHJlcHJlc2VudHMgYSBjbGllbnQgd2l0aCB0aGUgdmVuIHJvbGUuXCIpXG4gICAgICAudW5rbm93bigpLFxuICAgIHJlc291cmNlOiBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgLnRyeShcbiAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2VydmVyIHByb3ZpZGVkIHJlcHJlc2VudGF0aW9uIG9mIHJlc291cmNlXCIpXG4gICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgLnRyeShcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIuIEEgdmFsdWUgb2YgQUdHUkVHQVRFRF9SRVBPUlQgaW5kaWNhdGVzIGFuIGFnZ3JlZ2F0aW9uIG9mIG1vcmUgdGhhdCBvbmUgcmVzb3VyY2UncyBkYXRhXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICB2ZW5JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiQSByZXNvdXJjZSBpcyBhbiBlbmVyZ3kgZGV2aWNlIG9yIHN5c3RlbSBzdWJqZWN0IHRvIGNvbnRyb2wgYnkgYSBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgKVxuICAgICAgKSxcbiAgICByZXNvdXJjZVJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllci4gQSB2YWx1ZSBvZiBBR0dSRUdBVEVEX1JFUE9SVCBpbmRpY2F0ZXMgYW4gYWdncmVnYXRpb24gb2YgbW9yZSB0aGF0IG9uZSByZXNvdXJjZSdzIGRhdGFcIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgdmVuSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGF0dHJpYnV0ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQSByZXNvdXJjZSBpcyBhbiBlbmVyZ3kgZGV2aWNlIG9yIHN5c3RlbSBzdWJqZWN0IHRvIGNvbnRyb2wgYnkgYSBWRU4uXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgb2JqZWN0TWV0YWRhdGE6IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiUFJPR1JBTVwiLCBcIkVWRU5UXCIsIFwiUkVQT1JUXCIsIFwiU1VCU0NSSVBUSU9OXCIsIFwiVkVOXCIsIFwiUkVTT1VSQ0VcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIilcbiAgICAgICAgLm9ubHkoKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgaW50ZXJ2YWw6IEpvaS5vYmplY3Qoe1xuICAgICAgaWQ6IEpvaS5udW1iZXIoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIGNsaWVudCBnZW5lcmF0ZWQgbnVtYmVyIGFzc2lnbmVkIGFuIGludGVydmFsIG9iamVjdC4gTm90IGEgc2VxdWVuY2UgbnVtYmVyLlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIiksXG4gICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgfSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICdEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgc3RhcnQgb2YgXCIwMDAwLTAwLTAwXCIgb3IgXCIwMDAwLTAwLTAwVDAwOjAwOjAwXCIgbWF5IGluZGljYXRlIFxcJ25vd1xcJy4gU2VlIFVzZXIgR3VpZGUuXFxuQSBkdXJhdGlvbiBvZiBcIlA5OTk5WVwiIG1heSBpbmRpY2F0ZSBpbmZpbml0eS4gU2VlIFVzZXIgR3VpZGUuXFxuQSByYW5kb21pemVTdGFydCBpbmRpY2F0ZXMgYWJzb2x1dGUgcmFuZ2Ugb2YgY2xpZW50IGFwcGxpZWQgb2Zmc2V0IHRvIHN0YXJ0LiBTZWUgVXNlciBHdWlkZS5cXG4nXG4gICAgICAgIClcbiAgICAgICAgLnVua25vd24oKSxcbiAgICAgIHBheWxvYWRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKSxcbiAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAge31cbiAgICAgICAgKVxuICAgICAgICAubWluKDApLFxuICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICB7fVxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgJ0RlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBzdGFydCBvZiBcIjAwMDAtMDAtMDBcIiBvciBcIjAwMDAtMDAtMDBUMDA6MDA6MDBcIiBtYXkgaW5kaWNhdGUgXFwnbm93XFwnLiBTZWUgVXNlciBHdWlkZS5cXG5BIGR1cmF0aW9uIG9mIFwiUDk5OTlZXCIgbWF5IGluZGljYXRlIGluZmluaXR5LiBTZWUgVXNlciBHdWlkZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IGluZGljYXRlcyBhYnNvbHV0ZSByYW5nZSBvZiBjbGllbnQgYXBwbGllZCBvZmZzZXQgdG8gc3RhcnQuIFNlZSBVc2VyIEd1aWRlLlxcbidcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgdmFsdWVzTWFwOiBKb2kub2JqZWN0KHtcbiAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKCkuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIikucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKCkuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKS5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgcG9pbnQ6IEpvaS5vYmplY3Qoe1xuICAgICAgeDogSm9pLm51bWJlcigpLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpLnJlcXVpcmVkKCksXG4gICAgICB5OiBKb2kubnVtYmVyKCkuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKS5yZXF1aXJlZCgpLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIGV2ZW50UGF5bG9hZERlc2NyaXB0b3I6IEpvaS5vYmplY3Qoe1xuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcjogSm9pLm9iamVjdCh7XG4gICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAubWluKDEpLFxuICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgKSxcbiAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICApXG4gICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgLm1heCgxMDApXG4gICAgICAgIC5taW4oMCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIHJlcG9ydERlc2NyaXB0b3I6IEpvaS5vYmplY3Qoe1xuICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHJlYWRpbmdUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgIClcbiAgICAgICAgLm1heCgxMjgpXG4gICAgICAgIC5taW4oMSksXG4gICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAubWF4KDEyOClcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApLFxuICAgICAgYWdncmVnYXRlOiBKb2kuYm9vbGVhbigpXG4gICAgICAgIC5kZWZhdWx0KGZhbHNlKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICksXG4gICAgICBzdGFydEludGVydmFsOiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoLTEpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlRoZSBpbnRlcnZhbCBvbiB3aGljaCB0byBnZW5lcmF0ZSBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgcmVwb3J0IGF0IGVuZCBvZiBsYXN0IGludGVydmFsLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICAgIG51bUludGVydmFsczogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJUaGUgbnVtYmVyIG9mIGludGVydmFscyB0byBpbmNsdWRlIGluIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyB0aGF0IGFsbCBpbnRlcnZhbHMgYXJlIHRvIGJlIGluY2x1ZGVkLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICAgIGhpc3RvcmljYWw6IEpvaS5ib29sZWFuKClcbiAgICAgICAgLmRlZmF1bHQodHJ1ZSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiVHJ1ZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBwcmVjZWRpbmcgc3RhcnRJbnRlcnZhbC5cXG5GYWxzZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBmb2xsb3dpbmcgc3RhcnRJbnRlcnZhbCAoZS5nLiBmb3JlY2FzdCkuXFxuXCJcbiAgICAgICAgKSxcbiAgICAgIGZyZXF1ZW5jeTogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJOdW1iZXIgb2YgaW50ZXJ2YWxzIHRoYXQgZWxhcHNlIGJldHdlZW4gcmVwb3J0cy5cXG4tMSBpbmRpY2F0ZXMgc2FtZSBhcyBudW1JbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgcmVwZWF0OiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlZmF1bHQoMSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiTnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCByZXBvcnQuXFxuMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgb25lIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgcmVwZWF0IGluZGVmaW5pdGVseS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICByZXBvcnRJbnRlcnZhbHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJJTlRFUlZBTFNcIiwgXCJTVUJfSU5URVJWQUxTXCIsIFwiT1BFTl9JTlRFUlZBTFNcIilcbiAgICAgICAgLmRlZmF1bHQoXCJJTlRFUlZBTFNcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiSW5kaWNhdGVzIFZFTiByZXBvcnQgaW50ZXJ2YWwgb3B0aW9ucy4gU2VlIFVzZXIgR3VpZGUuXCIpXG4gICAgICAgIC5vbmx5KCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgb2JqZWN0SUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5taW4oMSksXG4gICAgdmVuTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIG91dC1vZi1iYW5kLlxcbnZlbk5hbWUgaXMgZXhwZWN0ZWQgdG8gYmUgdW5pcXVlIHdpdGhpbiB0aGUgc2NvcGUgb2YgYSBWVE5cXG5cIlxuICAgICAgKVxuICAgICAgLm1heCgxMjgpXG4gICAgICAubWluKDEpLFxuICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBvdXQtb2YtYmFuZC5cIlxuICAgICAgKVxuICAgICAgLm1heCgxMjgpXG4gICAgICAubWluKDEpLFxuICAgIHRhcmdldFR5cGU6IEpvaS5zdHJpbmcoKS5tYXgoMTI4KS5taW4oMSksXG4gICAgdGFyZ2V0VmFsdWU6IEpvaS5zdHJpbmcoKS5tYXgoMTI4KS5taW4oMSksXG4gICAgcmVzb3VyY2VOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICApXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5taW4oMSksXG4gICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgLmFsbG93KG51bGwpXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLm1pbigxKSxcbiAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAuYWxsb3cobnVsbClcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgIClcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLm1pbigxKSxcbiAgICBub3RpZmljYXRpb246IEpvaS5vYmplY3Qoe1xuICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlBST0dSQU1cIiwgXCJFVkVOVFwiLCBcIlJFUE9SVFwiLCBcIlNVQlNDUklQVElPTlwiLCBcIlZFTlwiLCBcIlJFU09VUkNFXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgIC5vbmx5KClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBvcGVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJDUkVBVEVcIiwgXCJSRUFEXCIsIFwiVVBEQVRFXCIsIFwiREVMRVRFXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcInRoZSBvcGVyYXRpb24gb24gb24gb2JqZWN0IHRoYXQgdHJpZ2dlcmVkIHRoZSBub3RpZmljYXRpb24uXCJcbiAgICAgICAgKVxuICAgICAgICAub25seSgpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgb2JqZWN0OiBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgIC50cnkoXG4gICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJ0aGUgb2JqZWN0IHRoYXQgaXMgdGhlIHN1YmplY3Qgb2YgdGhlIG5vdGlmaWNhdGlvbi5cIilcbiAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAubWF0Y2goXCJvbmVcIilcbiAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KClcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiU2VydmVyIHByb3ZpZGVkIHJlcHJlc2VudGF0aW9uIG9mIHByb2dyYW1cIilcbiAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTaG9ydCBuYW1lIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHByb2dyYW0uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW1Mb25nTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJMb25nIG5hbWUgb2YgcHJvZ3JhbSBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWlsZXJOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNob3J0IG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIHByb3ZpZGluZyB0aGUgcHJvZ3JhbS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRhaWxlckxvbmdOYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxvbmcgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW1UeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgcHJvZ3JhbSBkZWZpbmVkIGNhdGVnb3JpemF0aW9uLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBbHBoYS0yIGNvZGUgcGVyIElTTyAzMTY2LTEuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmluY2lwYWxTdWJkaXZpc2lvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb2RpbmcgcGVyIElTTyAzMTY2LTIuIEUuZy4gc3RhdGUgaW4gVVMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgc3RhcnQgb2YgXCIwMDAwLTAwLTAwXCIgb3IgXCIwMDAwLTAwLTAwVDAwOjAwOjAwXCIgbWF5IGluZGljYXRlIFxcJ25vd1xcJy4gU2VlIFVzZXIgR3VpZGUuXFxuQSBkdXJhdGlvbiBvZiBcIlA5OTk5WVwiIG1heSBpbmRpY2F0ZSBpbmZpbml0eS4gU2VlIFVzZXIgR3VpZGUuXFxuQSByYW5kb21pemVTdGFydCBpbmRpY2F0ZXMgYWJzb2x1dGUgcmFuZ2Ugb2YgY2xpZW50IGFwcGxpZWQgb2Zmc2V0IHRvIHN0YXJ0LiBTZWUgVXNlciBHdWlkZS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW1EZXNjcmlwdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcHJvZ3JhbURlc2NyaXB0aW9uc1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVUkw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGh1bWFuIG9yIG1hY2hpbmUgcmVhZGFibGUgcHJvZ3JhbSBkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVyaSh7fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5kaW5nRXZlbnRzOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUcnVlIGlmIGV2ZW50cyBhcmUgZml4ZWQgb25jZSB0cmFuc21pdHRlZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxQcmljZTogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiBldmVudHMgaGF2ZSBiZWVuIGFkYXB0ZWQgZnJvbSBhIGdyaWQgZXZlbnQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWREZXNjcmlwdG9yczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBwYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVzZWQgYXMgZGlzY3JpbWluYXRvci5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0czogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VyYWN5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDbGllbnQgcHJvdmlkZWQgZGVzY3JpcHRpb24gb2YgcHJvZ3JhbVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2YgcmVwb3J0XCIpXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcmVwb3J0UGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBvYmplY3RzIGNvbnRhaW5pbmcgcmVwb3J0IGRhdGEgZm9yIGEgc2V0IG9mIHJlc291cmNlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlTmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIuIEEgdmFsdWUgb2YgQUdHUkVHQVRFRF9SRVBPUlQgaW5kaWNhdGVzIGFuIGFnZ3JlZ2F0aW9uIG9mIG1vcmUgdGhhdCBvbmUgcmVzb3VyY2UncyBkYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IEpvaS5kYXRlKCkuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIHN0YXJ0IG9mIFwiMDAwMC0wMC0wMFwiIG9yIFwiMDAwMC0wMC0wMFQwMDowMDowMFwiIG1heSBpbmRpY2F0ZSBcXCdub3dcXCcuIFNlZSBVc2VyIEd1aWRlLlxcbkEgZHVyYXRpb24gb2YgXCJQOTk5OVlcIiBtYXkgaW5kaWNhdGUgaW5maW5pdHkuIFNlZSBVc2VyIEd1aWRlLlxcbkEgcmFuZG9taXplU3RhcnQgaW5kaWNhdGVzIGFic29sdXRlIHJhbmdlIG9mIGNsaWVudCBhcHBsaWVkIG9mZnNldCB0byBzdGFydC4gU2VlIFVzZXIgR3VpZGUuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIHN0YXJ0IG9mIFwiMDAwMC0wMC0wMFwiIG9yIFwiMDAwMC0wMC0wMFQwMDowMDowMFwiIG1heSBpbmRpY2F0ZSBcXCdub3dcXCcuIFNlZSBVc2VyIEd1aWRlLlxcbkEgZHVyYXRpb24gb2YgXCJQOTk5OVlcIiBtYXkgaW5kaWNhdGUgaW5maW5pdHkuIFNlZSBVc2VyIEd1aWRlLlxcbkEgcmFuZG9taXplU3RhcnQgaW5kaWNhdGVzIGFic29sdXRlIHJhbmdlIG9mIGNsaWVudCBhcHBsaWVkIG9mZnNldCB0byBzdGFydC4gU2VlIFVzZXIgR3VpZGUuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXBvcnQgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSByZXNvdXJjZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJyZXBvcnQgb2JqZWN0LlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2YgZXZlbnRcIilcbiAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBST0dSQU1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbUlEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIiwgbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlbGF0aXZlIHByaW9yaXR5IG9mIGV2ZW50LiBBIGxvd2VyIG51bWJlciBpcyBhIGhpZ2hlciBwcmlvcml0eS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0RGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogSm9pLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiByZXBvcnQgc2hvdWxkIGFnZ3JlZ2F0ZSByZXN1bHRzIGZyb20gYWxsIHRhcmdldGVkIHJlc291cmNlcy5cXG5GYWxzZSBpZiByZXBvcnQgaW5jbHVkZXMgcmVzdWx0cyBmb3IgZWFjaCByZXNvdXJjZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRJbnRlcnZhbDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGUgaW50ZXJ2YWwgb24gd2hpY2ggdG8gZ2VuZXJhdGUgYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIGdlbmVyYXRlIHJlcG9ydCBhdCBlbmQgb2YgbGFzdCBpbnRlcnZhbC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1JbnRlcnZhbHM6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVGhlIG51bWJlciBvZiBpbnRlcnZhbHMgdG8gaW5jbHVkZSBpbiBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgdGhhdCBhbGwgaW50ZXJ2YWxzIGFyZSB0byBiZSBpbmNsdWRlZC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3JpY2FsOiBKb2kuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRydWUgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgcHJlY2VkaW5nIHN0YXJ0SW50ZXJ2YWwuXFxuRmFsc2UgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgZm9sbG93aW5nIHN0YXJ0SW50ZXJ2YWwgKGUuZy4gZm9yZWNhc3QpLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTnVtYmVyIG9mIGludGVydmFscyB0aGF0IGVsYXBzZSBiZXR3ZWVuIHJlcG9ydHMuXFxuLTEgaW5kaWNhdGVzIHNhbWUgYXMgbnVtSW50ZXJ2YWxzLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgcmVwb3J0LlxcbjEgaW5kaWNhdGVzIGdlbmVyYXRlIG9uZSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHJlcGVhdCBpbmRlZmluaXRlbHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0SW50ZXJ2YWxzOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSU5URVJWQUxTXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTVUJfSU5URVJWQUxTXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJPUEVOX0lOVEVSVkFMU1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJJTlRFUlZBTFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSW5kaWNhdGVzIFZFTiByZXBvcnQgaW50ZXJ2YWwgb3B0aW9ucy4gU2VlIFVzZXIgR3VpZGUuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IHRoYXQgbWF5IGJlIHVzZWQgdG8gcmVxdWVzdCBhIHJlcG9ydCBmcm9tIGEgVkVOLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3Igb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9eKC0/KVAoPz1cXGR8VFxcZCkoPzooXFxkKylZKT8oPzooXFxkKylNKT8oPzooXFxkKykoW0RXXSkpPyg/OlQoPzooXFxkKylIKT8oPzooXFxkKylNKT8oPzooXFxkKyg/OlxcLlxcZCspPylTKT8pPyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgc3RhcnQgb2YgXCIwMDAwLTAwLTAwXCIgb3IgXCIwMDAwLTAwLTAwVDAwOjAwOjAwXCIgbWF5IGluZGljYXRlIFxcJ25vd1xcJy4gU2VlIFVzZXIgR3VpZGUuXFxuQSBkdXJhdGlvbiBvZiBcIlA5OTk5WVwiIG1heSBpbmRpY2F0ZSBpbmZpbml0eS4gU2VlIFVzZXIgR3VpZGUuXFxuQSByYW5kb21pemVTdGFydCBpbmRpY2F0ZXMgYWJzb2x1dGUgcmFuZ2Ugb2YgY2xpZW50IGFwcGxpZWQgb2Zmc2V0IHRvIHN0YXJ0LiBTZWUgVXNlciBHdWlkZS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBKb2kuZGF0ZSgpLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21pemVTdGFydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvXigtPylQKD89XFxkfFRcXGQpKD86KFxcZCspWSk/KD86KFxcZCspTSk/KD86KFxcZCspKFtEV10pKT8oPzpUKD86KFxcZCspSCk/KD86KFxcZCspTSk/KD86KFxcZCsoPzpcXC5cXGQrKT8pUyk/KT8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0RlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBzdGFydCBvZiBcIjAwMDAtMDAtMDBcIiBvciBcIjAwMDAtMDAtMDBUMDA6MDA6MDBcIiBtYXkgaW5kaWNhdGUgXFwnbm93XFwnLiBTZWUgVXNlciBHdWlkZS5cXG5BIGR1cmF0aW9uIG9mIFwiUDk5OTlZXCIgbWF5IGluZGljYXRlIGluZmluaXR5LiBTZWUgVXNlciBHdWlkZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IGluZGljYXRlcyBhYnNvbHV0ZSByYW5nZSBvZiBjbGllbnQgYXBwbGllZCBvZmZzZXQgdG8gc3RhcnQuIFNlZSBVc2VyIEd1aWRlLlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLml0ZW1zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5zdHJpbmcoKS5hbGxvdyhcIlwiKS5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFdmVudCBvYmplY3QgdG8gY29tbXVuaWNhdGUgYSBEZW1hbmQgUmVzcG9uc2UgcmVxdWVzdCB0byBWRU4uXFxuSWYgaW50ZXJ2YWxQZXJpb2QgaXMgcHJlc2VudCwgc2V0cyBkZWZhdWx0IHN0YXJ0IHRpbWUgYW5kIGR1cmF0aW9uIG9mIGludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2Ygc3Vic2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGllbnROYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIG91dC1vZi1iYW5kLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdE9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpc3Qgb2Ygb2JqZWN0cyBhbmQgb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJsaXN0IG9mIG9iamVjdHMgdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbnM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJSRUFEXCIsIFwiQ1JFQVRFXCIsIFwiVVBEQVRFXCIsIFwiREVMRVRFXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib2JqZWN0IG9wZXJhdGlvbiB0byBzdWJzY3JpYmUgdG8uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrVXJsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiVXNlciBwcm92aWRlZCB3ZWJob29rIFVSTC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVyaSh7fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWFyZXJUb2tlbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiLCBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9iamVjdCB0eXBlLCBvcGVyYXRpb25zLCBhbmQgY2FsbGJhY2tVcmwuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuIFVzZWQgYnkgc2VydmVyIHRvIGZpbHRlciBjYWxsYmFja3MuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBjcmVhdGVkIGJ5IGEgY2xpZW50IHRvIHJlY2VpdmUgbm90aWZpY2F0aW9uIG9mIG9wZXJhdGlvbnMgb24gb2JqZWN0cy5cXG5DbGllbnRzIG1heSBzdWJzY3JpYmUgdG8gYmUgbm90aWZpZWQgd2hlbiBhIHR5cGUgb2Ygb2JqZWN0IGlzIGNyZWF0ZWQsXFxudXBkYXRlZCwgb3IgZGVsZXRlZC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTZXJ2ZXIgcHJvdmlkZWQgcmVwcmVzZW50YXRpb24gb2YgdmVuXCIpXG4gICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiBKb2kuZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGEgY29tbW9uIHRvIGFsbCBhZGRyZXNzYWJsZSBvYmplY3RzLiBWYWx1ZXMgcHJvdmlkZWQgYnkgVlROIG9uIG9iamVjdCBjcmVhdGlvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlbk5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgb3V0LW9mLWJhbmQuXFxudmVuTmFtZSBpcyBleHBlY3RlZCB0byBiZSB1bmlxdWUgd2l0aGluIHRoZSBzY29wZSBvZiBhIFZUTlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFueVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kubnVtYmVyKCkuaW50ZWdlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuc3RyaW5nKCkuYWxsb3coXCJcIikubWluKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBKb2kubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHJlc291cmNlIG9iamVjdHMgcmVwcmVzZW50aW5nIGVuZC1kZXZpY2VzIG9yIHN5c3RlbXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU2VydmVyIHByb3ZpZGVkIHJlcHJlc2VudGF0aW9uIG9mIHJlc291cmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IEpvaS5kYXRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZXRpbWUgaW4gUkZDIDMzMzkgZm9ybWF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFVkVOVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZFTlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub25seSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhZGF0YSBjb21tb24gdG8gYWxsIGFkZHJlc3NhYmxlIG9iamVjdHMuIFZhbHVlcyBwcm92aWRlZCBieSBWVE4gb24gb2JqZWN0IGNyZWF0aW9uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllci4gQSB2YWx1ZSBvZiBBR0dSRUdBVEVEX1JFUE9SVCBpbmRpY2F0ZXMgYW4gYWdncmVnYXRpb24gb2YgbW9yZSB0aGF0IG9uZSByZXNvdXJjZSdzIGRhdGFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlbklEOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhdHRlcm4oL15bYS16QS1aMC05Xy1dKiQvLCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKFwiYW55XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKS5pbnRlZ2VyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZlbiByZXByZXNlbnRzIGEgY2xpZW50IHdpdGggdGhlIHZlbiByb2xlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBKb2kuYWx0ZXJuYXRpdmVzKClcbiAgICAgICAgICAgICAgICAubWF0Y2goXCJhbGxcIilcbiAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCgpXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNlcnZlciBwcm92aWRlZCByZXByZXNlbnRhdGlvbiBvZiByZXNvdXJjZVwiKVxuICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpLFxuICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgIC5tYXRjaChcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICAudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucGF0dGVybigvXlthLXpBLVowLTlfLV0qJC8sIHt9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogSm9pLmRhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJkYXRldGltZSBpbiBSRkMgMzMzOSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFUE9SVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJFU09VUkNFXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhIGNvbW1vbiB0byBhbGwgYWRkcmVzc2FibGUgb2JqZWN0cy4gVmFsdWVzIHByb3ZpZGVkIGJ5IFZUTiBvbiBvYmplY3QgY3JlYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSksXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZW5JRDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXR0ZXJuKC9eW2EtekEtWjAtOV8tXSokLywge30pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogSm9pLmFycmF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbG93KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IEpvaS5hcnJheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hbGxvdyhudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICB0YXJnZXRzOiBKb2kuYXJyYXkoKVxuICAgICAgICAuYWxsb3cobnVsbClcbiAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAubWluKDEpLFxuICAgICAgICAgICAgdmFsdWVzOiBKb2kuYXJyYXkoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAuaXRlbXMoXG4gICAgICAgICAgICAgICAgSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgICAgICAgICAgICAubWF0Y2goXCJhbnlcIilcbiAgICAgICAgICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICAgICAgICAgIEpvaS5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm51bWJlcigpLmludGVnZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLnN0cmluZygpLmFsbG93KFwiXCIpLm1pbigwKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogSm9pLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IEpvaS5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKClcbiAgICAgICAgKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIlZUTiBnZW5lcmF0ZWQgb2JqZWN0IGluY2x1ZGVkIGluIHJlcXVlc3QgdG8gc3Vic2NyaXB0aW9uIGNhbGxiYWNrVXJsLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIG9iamVjdFR5cGVzOiBKb2kuc3RyaW5nKClcbiAgICAgIC5hbGxvdyhcIlBST0dSQU1cIiwgXCJFVkVOVFwiLCBcIlJFUE9SVFwiLCBcIlNVQlNDUklQVElPTlwiLCBcIlZFTlwiLCBcIlJFU09VUkNFXCIpXG4gICAgICAuZGVzY3JpcHRpb24oXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgLm9ubHkoKSxcbiAgICBkYXRlVGltZTogSm9pLmRhdGUoKS5kZXNjcmlwdGlvbihcImRhdGV0aW1lIGluIFJGQyAzMzM5IGZvcm1hdFwiKSxcbiAgICBkdXJhdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAuYWxsb3coXCJcIilcbiAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAucGF0dGVybihcbiAgICAgICAgL14oLT8pUCg/PVxcZHxUXFxkKSg/OihcXGQrKVkpPyg/OihcXGQrKU0pPyg/OihcXGQrKShbRFddKSk/KD86VCg/OihcXGQrKUgpPyg/OihcXGQrKU0pPyg/OihcXGQrKD86XFwuXFxkKyk/KVMpPyk/JC8sXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgICAubWluKDApLFxuICAgIGNsaWVudENyZWRlbnRpYWxSZXF1ZXN0OiBKb2kub2JqZWN0KHtcbiAgICAgIGdyYW50X3R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJjbGllbnRfY3JlZGVudGlhbHNcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiT0F1dGgyIGdyYW50IHR5cGUsIG11c3QgYmUgJ2NsaWVudF9jcmVkZW50aWFscydcIilcbiAgICAgICAgLm9ubHkoKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIGNsaWVudF9pZDogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcImNsaWVudCBJRCB0byBleGNoYW5nZSBmb3IgYmVhcmVyIHRva2VuLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDQwOTYpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBjbGllbnRfc2VjcmV0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiY2xpZW50IHNlY3JldCB0byBleGNoYW5nZSBmb3IgYmVhcmVyIHRva2VuLlwiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWF4KDQwOTYpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBzY29wZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJhcHBsaWNhdGlvbiBkZWZpbmVkIHNjb3BlLlwiKVxuICAgICAgICAubWF4KDQwOTYpXG4gICAgICAgIC5taW4oMCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJCb2R5IG9mIFBPU1QgcmVxdWVzdCB0byAvYXV0aC90b2tlbi4gTm90ZSBzbmFrZSBjYXNlIHBlciBodHRwczovL3d3dy5yZmMtZWRpdG9yLm9yZy9yZmMvcmZjNjc0OVxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIGNsaWVudENyZWRlbnRpYWxSZXNwb25zZTogSm9pLm9iamVjdCh7XG4gICAgICBhY2Nlc3NfdG9rZW46IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJhY2Nlc3MgdG9rZW4gcHJvdmlkZWQgYnkgQXV0aG9yaXphdGlvbiBzZXJ2aWNlXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5tYXgoNDA5NilcbiAgICAgICAgLm1pbigxKSxcbiAgICAgIHRva2VuX3R5cGU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJCZWFyZXJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwidG9rZW4gdHlwZSwgbXVzdCBiZSBCZWFyZXIuXCIpXG4gICAgICAgIC5vbmx5KClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBleHBpcmVzX2luOiBKb2kubnVtYmVyKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiZXhwaXJhdGlvbiBwZXJpb2QgaW4gc2Vjb25kcy5cIilcbiAgICAgICAgLmludGVnZXIoKSxcbiAgICAgIHJlZnJlc2hfdG9rZW46IEpvaS5zdHJpbmcoKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJyZWZyZXNoIHRva2VuIHByb3ZpZGVkIGJ5IEF1dGhvcml6YXRpb24gc2VydmljZVwiKVxuICAgICAgICAubWF4KDQwOTYpXG4gICAgICAgIC5taW4oMSksXG4gICAgICBzY29wZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJhcHBsaWNhdGlvbiBkZWZpbmVkIHNjb3BlLlwiKVxuICAgICAgICAubWF4KDQwOTYpXG4gICAgICAgIC5taW4oMCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgXCJCb2R5IHJlc3BvbnNlIGZyb20gL2F1dGgvdG9rZW4uIE5vdGUgc25ha2UgY2FzZSBwZXIgaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzY3NDlcXG5cIlxuICAgICAgKVxuICAgICAgLnVua25vd24oKSxcbiAgICBhdXRoRXJyb3I6IEpvaS5vYmplY3Qoe1xuICAgICAgZXJyb3I6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXG4gICAgICAgICAgXCJpbnZhbGlkX3JlcXVlc3RcIixcbiAgICAgICAgICBcImludmFsaWRfY2xpZW50XCIsXG4gICAgICAgICAgXCJpbnZhbGlkX2dyYW50XCIsXG4gICAgICAgICAgXCJpbnZhbGlkX3Njb3BlXCIsXG4gICAgICAgICAgXCJ1bmF1dGhvcml6ZWRfY2xpZW50XCIsXG4gICAgICAgICAgXCJ1bnN1cHBvcnRlZF9ncmFudF90eXBlXCJcbiAgICAgICAgKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBcyBkZXNjcmliZWQgaW4gcmZjNjc0OSB8IGludmFsaWRfcmVxdWVzdCDigJMgVGhlIHJlcXVlc3QgaXMgbWlzc2luZyBhIHBhcmFtZXRlciBzbyB0aGUgc2VydmVyIGNhbuKAmXQgcHJvY2VlZCB3aXRoIHRoZSByZXF1ZXN0LiBUaGlzIG1heSBhbHNvIGJlIHJldHVybmVkIGlmIHRoZSByZXF1ZXN0IGluY2x1ZGVzIGFuIHVuc3VwcG9ydGVkIHBhcmFtZXRlciBvciByZXBlYXRzIGEgcGFyYW1ldGVyLiBpbnZhbGlkX2NsaWVudCDigJMgQ2xpZW50IGF1dGhlbnRpY2F0aW9uIGZhaWxlZCwgc3VjaCBhcyBpZiB0aGUgcmVxdWVzdCBjb250YWlucyBhbiBpbnZhbGlkIGNsaWVudCBJRCBvciBzZWNyZXQuIFNlbmQgYW4gSFRUUCA0MDEgcmVzcG9uc2UgaW4gdGhpcyBjYXNlLiBpbnZhbGlkX2dyYW50IOKAkyBUaGUgYXV0aG9yaXphdGlvbiBjb2RlIChvciB1c2Vy4oCZcyBwYXNzd29yZCBmb3IgdGhlIHBhc3N3b3JkIGdyYW50IHR5cGUpIGlzIGludmFsaWQgb3IgZXhwaXJlZC4gVGhpcyBpcyBhbHNvIHRoZSBlcnJvciB5b3Ugd291bGQgcmV0dXJuIGlmIHRoZSByZWRpcmVjdCBVUkwgZ2l2ZW4gaW4gdGhlIGF1dGhvcml6YXRpb24gZ3JhbnQgZG9lcyBub3QgbWF0Y2ggdGhlIFVSTCBwcm92aWRlZCBpbiB0aGlzIGFjY2VzcyB0b2tlbiByZXF1ZXN0LiBpbnZhbGlkX3Njb3BlIOKAkyBGb3IgYWNjZXNzIHRva2VuIHJlcXVlc3RzIHRoYXQgaW5jbHVkZSBhIHNjb3BlIChwYXNzd29yZCBvciBjbGllbnRfY3JlZGVudGlhbHMgZ3JhbnRzKSwgdGhpcyBlcnJvciBpbmRpY2F0ZXMgYW4gaW52YWxpZCBzY29wZSB2YWx1ZSBpbiB0aGUgcmVxdWVzdC4gdW5hdXRob3JpemVkX2NsaWVudCDigJMgVGhpcyBjbGllbnQgaXMgbm90IGF1dGhvcml6ZWQgdG8gdXNlIHRoZSByZXF1ZXN0ZWQgZ3JhbnQgdHlwZS4gRm9yIGV4YW1wbGUsIGlmIHlvdSByZXN0cmljdCB3aGljaCBhcHBsaWNhdGlvbnMgY2FuIHVzZSB0aGUgSW1wbGljaXQgZ3JhbnQsIHlvdSB3b3VsZCByZXR1cm4gdGhpcyBlcnJvciBmb3IgdGhlIG90aGVyIGFwcHMuIHVuc3VwcG9ydGVkX2dyYW50X3R5cGUg4oCTIElmIGEgZ3JhbnQgdHlwZSBpcyByZXF1ZXN0ZWQgdGhhdCB0aGUgYXV0aG9yaXphdGlvbiBzZXJ2ZXIgZG9lc27igJl0IHJlY29nbml6ZSwgdXNlIHRoaXMgY29kZS4gTm90ZSB0aGF0IHVua25vd24gZ3JhbnQgdHlwZXMgYWxzbyB1c2UgdGhpcyBzcGVjaWZpYyBlcnJvciBjb2RlIHJhdGhlciB0aGFuIHVzaW5nIHRoZSBpbnZhbGlkX3JlcXVlc3QgYWJvdmUuXCJcbiAgICAgICAgKVxuICAgICAgICAub25seSgpXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgZXJyb3JfZGVzY3JpcHRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiU2hvdWxkIGJlIGEgc2VudGVuY2Ugb3IgdHdvIGF0IG1vc3QgZGVzY3JpYmluZyB0aGUgY2lyY3Vtc3RhbmNlIG9mIHRoZSBlcnJvclwiXG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIGVycm9yX3VyaTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIk9wdGlvbmFsIHJlZmVyZW5jZSB0byBtb3JlIGRldGFpbGVkIGVycm9yIGRlc2NyaXB0aW9uXCIpXG4gICAgICAgIC51cmkoe30pLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgIFwiZXJyb3IgcmVzcG9uc2Ugb24gSFRUUCA0MDAgZnJvbSBhdXRoL3Rva2VuIHBlciBodHRwczovL3d3dy5yZmMtZWRpdG9yLm9yZy9yZmMvcmZjNjc0OVwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIGF1dGhTZXJ2ZXJJbmZvOiBKb2kub2JqZWN0KHtcbiAgICAgIHRva2VuVVJMOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVVJMIG9mIHRoZSB0b2tlbiBlbmRwb2ludC5cIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLnVyaSh7fSksXG4gICAgfSkudW5rbm93bigpLFxuICAgIHByb2JsZW06IEpvaS5vYmplY3Qoe1xuICAgICAgdHlwZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZWZhdWx0KFwiYWJvdXQ6YmxhbmtcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQW4gYWJzb2x1dGUgVVJJIHRoYXQgaWRlbnRpZmllcyB0aGUgcHJvYmxlbSB0eXBlLlxcbldoZW4gZGVyZWZlcmVuY2VkLCBpdCBTSE9VTEQgcHJvdmlkZSBodW1hbi1yZWFkYWJsZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgcHJvYmxlbSB0eXBlXFxuKGUuZy4sIHVzaW5nIEhUTUwpLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLnVyaSh7fSksXG4gICAgICB0aXRsZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCJBIHNob3J0LCBzdW1tYXJ5IG9mIHRoZSBwcm9ibGVtIHR5cGUuIFdyaXR0ZW4gaW4gZW5nbGlzaCBhbmQgcmVhZGFibGVcXG5mb3IgZW5naW5lZXJzICh1c3VhbGx5IG5vdCBzdWl0ZWQgZm9yIG5vbiB0ZWNobmljYWwgc3Rha2Vob2xkZXJzIGFuZFxcbm5vdCBsb2NhbGl6ZWQpOyBleGFtcGxlOiBTZXJ2aWNlIFVuYXZhaWxhYmxlLlxcblwiXG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIHN0YXR1czogSm9pLm51bWJlcigpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIlRoZSBIVFRQIHN0YXR1cyBjb2RlIGdlbmVyYXRlZCBieSB0aGUgb3JpZ2luIHNlcnZlciBmb3IgdGhpcyBvY2N1cnJlbmNlXFxub2YgdGhlIHByb2JsZW0uXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAuaW50ZWdlcigpXG4gICAgICAgIC5tYXgoNjAwKVxuICAgICAgICAubWluKDEwMCksXG4gICAgICBkZXRhaWw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgIFwiQSBodW1hbiByZWFkYWJsZSBleHBsYW5hdGlvbiBzcGVjaWZpYyB0byB0aGlzIG9jY3VycmVuY2Ugb2YgdGhlXFxucHJvYmxlbS5cXG5cIlxuICAgICAgICApXG4gICAgICAgIC5taW4oMCksXG4gICAgICBpbnN0YW5jZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkFuIGFic29sdXRlIFVSSSB0aGF0IGlkZW50aWZpZXMgdGhlIHNwZWNpZmljIG9jY3VycmVuY2Ugb2YgdGhlIHByb2JsZW0uXFxuSXQgbWF5IG9yIG1heSBub3QgeWllbGQgZnVydGhlciBpbmZvcm1hdGlvbiBpZiBkZXJlZmVyZW5jZWQuXFxuXCJcbiAgICAgICAgKVxuICAgICAgICAudXJpKHt9KSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcInJldXNhYmxlIGVycm9yIHJlc3BvbnNlLiBGcm9tIGh0dHBzOi8vb3BlbnNvdXJjZS56YWxhbmRvLmNvbS9wcm9ibGVtL3NjaGVtYS55YW1sLlxcblwiXG4gICAgICApXG4gICAgICAudW5rbm93bigpLFxuICAgIG5vdGlmaWVyc1Jlc3BvbnNlOiBKb2kub2JqZWN0KHtcbiAgICAgIFdFQkhPT0s6IEpvaS5ib29sZWFuKCkuZGVzY3JpcHRpb24oXCJDdXJyZW50bHkgTVVTVCBiZSB0cnVlXCIpLnJlcXVpcmVkKCksXG4gICAgICBNUVRUOiBKb2kub2JqZWN0KHtcbiAgICAgICAgVVJJUzogSm9pLmFycmF5KClcbiAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgIC5pdGVtcyhcbiAgICAgICAgICAgIEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJVUklzIGZvciBjb25uZWN0aW9uIHRvIE1RVFQgYnJva2VyXCIpXG4gICAgICAgICAgICAgIC51cmkoe30pXG4gICAgICAgICAgKSxcbiAgICAgICAgc2VyaWFsaXphdGlvbjogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmFsbG93KFwiSlNPTlwiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgIFwiQ3VycmVudGx5IGFsd2F5cyBKU09OLCBwZXJoYXBzIG90aGVyIGZvcm1hdHMgc3VwcG9ydGVkIGluIGZ1dHVyZVwiXG4gICAgICAgICAgKVxuICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgYXV0aGVudGljYXRpb246IEpvaS5hbHRlcm5hdGl2ZXMoKVxuICAgICAgICAgIC5tYXRjaChcIm9uZVwiKVxuICAgICAgICAgIC50cnkoXG4gICAgICAgICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgICAgICAgbWV0aG9kOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJBTk9OWU1PVVNcIilcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTcGVjaWZpZXMgYW5vbnltb3VzIGF1dGhlbnRpY2F0aW9uXCIpXG4gICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiTVFUVCBicm9rZXIgYW5vbnltb3VzIGF1dGhlbnRpY2F0aW9uIGRldGFpbHNcIilcbiAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBtZXRob2Q6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIk9BVVRIMl9CRUFSRVJfVE9LRU5cIilcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTcGVjaWZpZXMgT0F1dGgyIGJlYXJlciB0b2tlbiBhdXRoZW50aWNhdGlvblwiKVxuICAgICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgICAgdXNlcm5hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgICdFaXRoZXIgdGhlIGRpc3Rpbmd1aXNoZWQgc3RyaW5nIFwie2NsaWVudElEfVwiLCBvciBhbnkgb3RoZXIgbGl0ZXJhbCBzdHJpbmcnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICBcIk1RVFQgYnJva2VyIE9BdXRoMiBCZWFyZXIgVG9rZW4gYXV0aGVudGljYXRpb24gZGV0YWlsc1wiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnVua25vd24oKSxcbiAgICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgICBtZXRob2Q6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIkNFUlRJRklDQVRFXCIpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiU3BlY2lmaWVzIGNlcnRpZmljYXRlIGF1dGhlbnRpY2F0aW9uXCIpXG4gICAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgICAgICAgICBjYUNlcnQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgICAgICAgIFwiU3RyaW5nIGNvbnRhaW5pbmcgdGhlIENlcnRpZmljYXRlIEF1dGhvcml0eSBjZXJ0aWZpY2F0ZVwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgY2xpZW50Q2VydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiU3RyaW5nIGNvbnRhaW5pbmcgdGhlIENsaWVudCBjZXJ0aWZpY2F0ZVwiKVxuICAgICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICAgICAgY2xpZW50S2V5OiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgICBcIlN0cmluZyBjb250YWluaW5nIHRoZSBjbGllbnQgY2VydGlmaWNhdGUgcHJpdmF0ZSBrZXlcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJNUVRUIGJyb2tlciBtVExTIGNsaWVudCBjZXJ0aWZpY2F0ZSBhdXRoZW50aWNhdGlvbiBkZXRhaWxzXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAudW5rbm93bigpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgfSlcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiRGV0YWlscyBvZiBNUVRUIGJpbmRpbmcgZm9yIG1lc3NhZ2luZyBwcm90b2NvbCBzdXBwb3J0XCIpXG4gICAgICAgIC51bmtub3duKCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcIlByb3ZpZGVzIGRldGFpbHMgb2YgZWFjaCBub3RpZmllciBiaW5kaW5nIHN1cHBvcnRlZFwiKVxuICAgICAgLnVua25vd24oKSxcbiAgICBtcXR0Tm90aWZpZXJCaW5kaW5nT2JqZWN0OiBKb2kub2JqZWN0KHtcbiAgICAgIFVSSVM6IEpvaS5hcnJheSgpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5pdGVtcyhcbiAgICAgICAgICBKb2kuc3RyaW5nKCkuZGVzY3JpcHRpb24oXCJVUklzIGZvciBjb25uZWN0aW9uIHRvIE1RVFQgYnJva2VyXCIpLnVyaSh7fSlcbiAgICAgICAgKSxcbiAgICAgIHNlcmlhbGl6YXRpb246IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJKU09OXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIkN1cnJlbnRseSBhbHdheXMgSlNPTiwgcGVyaGFwcyBvdGhlciBmb3JtYXRzIHN1cHBvcnRlZCBpbiBmdXR1cmVcIlxuICAgICAgICApXG4gICAgICAgIC5vbmx5KClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICBhdXRoZW50aWNhdGlvbjogSm9pLmFsdGVybmF0aXZlcygpXG4gICAgICAgIC5tYXRjaChcIm9uZVwiKVxuICAgICAgICAudHJ5KFxuICAgICAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmFsbG93KFwiQU5PTllNT1VTXCIpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNwZWNpZmllcyBhbm9ueW1vdXMgYXV0aGVudGljYXRpb25cIilcbiAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFwiTVFUVCBicm9rZXIgYW5vbnltb3VzIGF1dGhlbnRpY2F0aW9uIGRldGFpbHNcIilcbiAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBtZXRob2Q6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJPQVVUSDJfQkVBUkVSX1RPS0VOXCIpXG4gICAgICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlNwZWNpZmllcyBPQXV0aDIgYmVhcmVyIHRva2VuIGF1dGhlbnRpY2F0aW9uXCIpXG4gICAgICAgICAgICAgIC5vbmx5KClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICAgICAgICB1c2VybmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgJ0VpdGhlciB0aGUgZGlzdGluZ3Vpc2hlZCBzdHJpbmcgXCJ7Y2xpZW50SUR9XCIsIG9yIGFueSBvdGhlciBsaXRlcmFsIHN0cmluZydcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgIFwiTVFUVCBicm9rZXIgT0F1dGgyIEJlYXJlciBUb2tlbiBhdXRoZW50aWNhdGlvbiBkZXRhaWxzXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC51bmtub3duKCksXG4gICAgICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgICAgICBtZXRob2Q6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJDRVJUSUZJQ0FURVwiKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTcGVjaWZpZXMgY2VydGlmaWNhdGUgYXV0aGVudGljYXRpb25cIilcbiAgICAgICAgICAgICAgLm9ubHkoKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgICAgICAgIGNhQ2VydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgICAgICAgXCJTdHJpbmcgY29udGFpbmluZyB0aGUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IGNlcnRpZmljYXRlXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgICAgICAubWluKDApLFxuICAgICAgICAgICAgY2xpZW50Q2VydDogSm9pLnN0cmluZygpXG4gICAgICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgICAgICAuZGVzY3JpcHRpb24oXCJTdHJpbmcgY29udGFpbmluZyB0aGUgQ2xpZW50IGNlcnRpZmljYXRlXCIpXG4gICAgICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgICAgIC5taW4oMCksXG4gICAgICAgICAgICBjbGllbnRLZXk6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICAgIFwiU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGNsaWVudCBjZXJ0aWZpY2F0ZSBwcml2YXRlIGtleVwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAgICAgLm1pbigwKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICAgICAgICBcIk1RVFQgYnJva2VyIG1UTFMgY2xpZW50IGNlcnRpZmljYXRlIGF1dGhlbnRpY2F0aW9uIGRldGFpbHNcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnVua25vd24oKVxuICAgICAgICApXG4gICAgICAgIC5yZXF1aXJlZCgpLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXCJEZXRhaWxzIG9mIE1RVFQgYmluZGluZyBmb3IgbWVzc2FnaW5nIHByb3RvY29sIHN1cHBvcnRcIilcbiAgICAgIC51bmtub3duKCksXG4gICAgbXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25Bbm9ueW1vdXM6IEpvaS5vYmplY3Qoe1xuICAgICAgbWV0aG9kOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiQU5PTllNT1VTXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlNwZWNpZmllcyBhbm9ueW1vdXMgYXV0aGVudGljYXRpb25cIilcbiAgICAgICAgLm9ubHkoKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFwiTVFUVCBicm9rZXIgYW5vbnltb3VzIGF1dGhlbnRpY2F0aW9uIGRldGFpbHNcIilcbiAgICAgIC51bmtub3duKCksXG4gICAgbXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25PYXV0aDJCZWFyZXJUb2tlbjogSm9pLm9iamVjdCh7XG4gICAgICBtZXRob2Q6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJPQVVUSDJfQkVBUkVSX1RPS0VOXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlNwZWNpZmllcyBPQXV0aDIgYmVhcmVyIHRva2VuIGF1dGhlbnRpY2F0aW9uXCIpXG4gICAgICAgIC5vbmx5KClcbiAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICB1c2VybmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgJ0VpdGhlciB0aGUgZGlzdGluZ3Vpc2hlZCBzdHJpbmcgXCJ7Y2xpZW50SUR9XCIsIG9yIGFueSBvdGhlciBsaXRlcmFsIHN0cmluZydcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWluKDApLFxuICAgIH0pXG4gICAgICAuZGVzY3JpcHRpb24oXCJNUVRUIGJyb2tlciBPQXV0aDIgQmVhcmVyIFRva2VuIGF1dGhlbnRpY2F0aW9uIGRldGFpbHNcIilcbiAgICAgIC51bmtub3duKCksXG4gICAgbXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25DZXJ0aWZpY2F0ZTogSm9pLm9iamVjdCh7XG4gICAgICBtZXRob2Q6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJDRVJUSUZJQ0FURVwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJTcGVjaWZpZXMgY2VydGlmaWNhdGUgYXV0aGVudGljYXRpb25cIilcbiAgICAgICAgLm9ubHkoKVxuICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIGNhQ2VydDogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJTdHJpbmcgY29udGFpbmluZyB0aGUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IGNlcnRpZmljYXRlXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBjbGllbnRDZXJ0OiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlN0cmluZyBjb250YWluaW5nIHRoZSBDbGllbnQgY2VydGlmaWNhdGVcIilcbiAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIGNsaWVudEtleTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJTdHJpbmcgY29udGFpbmluZyB0aGUgY2xpZW50IGNlcnRpZmljYXRlIHByaXZhdGUga2V5XCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5taW4oMCksXG4gICAgfSlcbiAgICAgIC5kZXNjcmlwdGlvbihcIk1RVFQgYnJva2VyIG1UTFMgY2xpZW50IGNlcnRpZmljYXRlIGF1dGhlbnRpY2F0aW9uIGRldGFpbHNcIilcbiAgICAgIC51bmtub3duKCksXG4gICAgbm90aWZpZXJPcGVyYXRpb25zVG9waWNzOiBKb2kub2JqZWN0KHtcbiAgICAgIENSRUFURTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXG4gICAgICAgICAgXCInVG9waWMgcGF0aCBmb3IgQ1JFQVRFIG9wZXJhdGlvbnMsXFxuIG5vdCBwcm92aWRlZCBmb3Igbm90aWZpY2F0aW9ucyBmb3IgYSBzcGVjaWZpYyBvYmplY3QgSUQsXFxuIGUuZy4gdW50aWwgcHJvZ3JhbUlEIGZvbyBpcyBjcmVhdGVkLCBjbGllbnRzIHVuYWJsZSB0b1xcbiByZXF1ZXN0IG5vdGlmaWNhdGlvbnMgb2YgaXRzIGNyZWF0aW9uJ1xcblwiXG4gICAgICAgIClcbiAgICAgICAgLm1pbigwKSxcbiAgICAgIFVQREFURTogSm9pLnN0cmluZygpXG4gICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAuZGVzY3JpcHRpb24oXCJUb3BpYyBwYXRoIGZvciBVUERBVEUgb3BlcmF0aW9uc1wiKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAubWluKDApLFxuICAgICAgREVMRVRFOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmFsbG93KFwiXCIpXG4gICAgICAgIC5kZXNjcmlwdGlvbihcIlRvcGljIHBhdGggZm9yIERFTEVURSBvcGVyYXRpb25zXCIpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5taW4oMCksXG4gICAgICBBTEw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAuYWxsb3coXCJcIilcbiAgICAgICAgLmRlc2NyaXB0aW9uKFwiVG9waWMgcGF0aCBmb3IgQUxMIG9wZXJhdGlvbnMsIGlmIHN1cHBvcnRlZCBieSBWVE5cIilcbiAgICAgICAgLm1pbigwKSxcbiAgICB9KVxuICAgICAgLmRlc2NyaXB0aW9uKFxuICAgICAgICBcIk1RVFQgbm90aWZpZXIgdG9waWMgbmFtZXMgZm9yIG5vdGlmaWNhdGlvbnMgb2Ygc3Vic2NyaWJhYmxlLW9iamVjdCBvcGVyYXRpb25zXCJcbiAgICAgIClcbiAgICAgIC51bmtub3duKCksXG4gICAgbm90aWZpZXJUb3BpY3NSZXNwb25zZTogSm9pLm9iamVjdCh7XG4gICAgICB0b3BpY3M6IEpvaS5vYmplY3Qoe1xuICAgICAgICBDUkVBVEU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICAgIFwiJ1RvcGljIHBhdGggZm9yIENSRUFURSBvcGVyYXRpb25zLFxcbiBub3QgcHJvdmlkZWQgZm9yIG5vdGlmaWNhdGlvbnMgZm9yIGEgc3BlY2lmaWMgb2JqZWN0IElELFxcbiBlLmcuIHVudGlsIHByb2dyYW1JRCBmb28gaXMgY3JlYXRlZCwgY2xpZW50cyB1bmFibGUgdG9cXG4gcmVxdWVzdCBub3RpZmljYXRpb25zIG9mIGl0cyBjcmVhdGlvbidcXG5cIlxuICAgICAgICAgIClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgICBVUERBVEU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlRvcGljIHBhdGggZm9yIFVQREFURSBvcGVyYXRpb25zXCIpXG4gICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgICBERUxFVEU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlRvcGljIHBhdGggZm9yIERFTEVURSBvcGVyYXRpb25zXCIpXG4gICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAubWluKDApLFxuICAgICAgICBBTEw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5hbGxvdyhcIlwiKVxuICAgICAgICAgIC5kZXNjcmlwdGlvbihcIlRvcGljIHBhdGggZm9yIEFMTCBvcGVyYXRpb25zLCBpZiBzdXBwb3J0ZWQgYnkgVlROXCIpXG4gICAgICAgICAgLm1pbigwKSxcbiAgICAgIH0pXG4gICAgICAgIC5kZXNjcmlwdGlvbihcbiAgICAgICAgICBcIk1RVFQgbm90aWZpZXIgdG9waWMgbmFtZXMgZm9yIG5vdGlmaWNhdGlvbnMgb2Ygc3Vic2NyaWJhYmxlLW9iamVjdCBvcGVyYXRpb25zXCJcbiAgICAgICAgKVxuICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAudW5rbm93bigpLFxuICAgIH0pLnVua25vd24oKSxcbiAgfSxcbn07XG4iXX0=