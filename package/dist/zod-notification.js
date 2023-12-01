"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    objectType: zod_1.z
        .enum(["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"])
        .describe("Types of objects addressable through API."),
    operation: zod_1.z
        .enum(["GET", "POST", "PUT", "DELETE"])
        .describe("the operation on on object that triggered the notification."),
    targets: zod_1.z
        .array(zod_1.z
        .object({
        type: zod_1.z
            .string()
            .min(1)
            .max(128)
            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
        values: zod_1.z
            .array(zod_1.z.union([
            zod_1.z.number(),
            zod_1.z.number().int(),
            zod_1.z.string(),
            zod_1.z.boolean(),
            zod_1.z
                .object({
                x: zod_1.z
                    .number()
                    .describe("A value on an x axis.")
                    .default(null)
                    .nullable()
                    .describe("A value on an x axis.")
                    .default(null),
                y: zod_1.z
                    .number()
                    .describe("A value on a y axis.")
                    .default(null)
                    .nullable()
                    .describe("A value on a y axis.")
                    .default(null),
            })
                .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
        ]))
            .describe("A list of data points. Most often a singular value such as a price."),
    })
        .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
        .describe("A list of valuesMap objects.")
        .default(null)
        .nullable()
        .describe("A list of valuesMap objects.")
        .default(null),
    object: zod_1.z
        .record(zod_1.z.any())
        .and(zod_1.z.any().superRefine((x, ctx) => {
        const schemas = [
            zod_1.z
                .object({
                id: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID.")
                    .optional(),
                createdDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                modificationDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                objectType: zod_1.z
                    .literal("PROGRAM")
                    .describe("Used as discriminator, e.g. notification.object")
                    .optional(),
                programName: zod_1.z
                    .string()
                    .min(1)
                    .max(128)
                    .describe("Short name to uniquely identify program."),
                programLongName: zod_1.z
                    .string()
                    .describe("Long name of program for human readability.")
                    .default(null)
                    .nullable()
                    .describe("Long name of program for human readability.")
                    .default(null),
                retailerName: zod_1.z
                    .string()
                    .describe("Short name of energy retailer providing the program.")
                    .default(null)
                    .nullable()
                    .describe("Short name of energy retailer providing the program.")
                    .default(null),
                retailerLongName: zod_1.z
                    .string()
                    .describe("Long name of energy retailer for human readability.")
                    .default(null)
                    .nullable()
                    .describe("Long name of energy retailer for human readability.")
                    .default(null),
                programType: zod_1.z
                    .string()
                    .describe("A program defined categorization.")
                    .default(null)
                    .nullable()
                    .describe("A program defined categorization.")
                    .default(null),
                country: zod_1.z
                    .string()
                    .describe("Alpha-2 code per ISO 3166-1.")
                    .default(null)
                    .nullable()
                    .describe("Alpha-2 code per ISO 3166-1.")
                    .default(null),
                principalSubdivision: zod_1.z
                    .string()
                    .describe("Coding per ISO 3166-2. E.g. state in US.")
                    .default(null)
                    .nullable()
                    .describe("Coding per ISO 3166-2. E.g. state in US.")
                    .default(null),
                timeZoneOffset: zod_1.z
                    .string()
                    .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                    .describe("duration in ISO 8601 format")
                    .default("PT0S"),
                intervalPeriod: zod_1.z
                    .object({
                    start: zod_1.z
                        .string()
                        .datetime()
                        .describe("datetime in ISO 8601 format")
                        .default("0000-00-00"),
                    duration: zod_1.z
                        .string()
                        .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                        .describe("duration in ISO 8601 format")
                        .default("PT0S"),
                    randomizeStart: zod_1.z
                        .string()
                        .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                        .describe("duration in ISO 8601 format")
                        .default("PT0S"),
                })
                    .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                    .optional(),
                programDescriptions: zod_1.z
                    .array(zod_1.z.any())
                    .describe("A list of programDescriptions")
                    .default(null)
                    .nullable()
                    .describe("A list of programDescriptions")
                    .default(null),
                bindingEvents: zod_1.z
                    .boolean()
                    .describe("True if events are fixed once transmitted.")
                    .default(false),
                localPrice: zod_1.z
                    .boolean()
                    .describe("True if events have been adapted from a grid event.")
                    .default(false),
                payloadDescriptors: zod_1.z
                    .array(zod_1.z.union([
                    zod_1.z
                        .object({
                        objectType: zod_1.z
                            .string()
                            .describe("Used as discriminator, e.g. program.payloadDescriptors")
                            .default("EVENT_PAYLOAD_DESCRIPTOR"),
                        payloadType: zod_1.z
                            .string()
                            .min(1)
                            .max(128)
                            .describe("Enumerated or private string signifying the nature of values."),
                        units: zod_1.z
                            .string()
                            .describe("Units of measure.")
                            .default(null)
                            .nullable()
                            .describe("Units of measure.")
                            .default(null),
                        currency: zod_1.z
                            .string()
                            .describe("Currency of price payload.")
                            .default("USD")
                            .nullable()
                            .describe("Currency of price payload.")
                            .default("USD"),
                    })
                        .describe("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"),
                    zod_1.z
                        .object({
                        objectType: zod_1.z
                            .string()
                            .describe("Used as discriminator, e.g. program.payloadDescriptors")
                            .default("REPORT_PAYLOAD_DESCRIPTOR"),
                        payloadType: zod_1.z
                            .string()
                            .min(1)
                            .max(128)
                            .describe("Enumerated or private string signifying the nature of values."),
                        readingType: zod_1.z
                            .string()
                            .describe("Enumerated or private string signifying the type of reading.")
                            .default("DIRECT_READ")
                            .nullable()
                            .describe("Enumerated or private string signifying the type of reading.")
                            .default("DIRECT_READ"),
                        units: zod_1.z
                            .string()
                            .describe("Units of measure.")
                            .default("KWH")
                            .nullable()
                            .describe("Units of measure.")
                            .default("KWH"),
                        accuracy: zod_1.z
                            .number()
                            .describe("A quantification of the accuracy of a set of payload values.")
                            .default(0)
                            .nullable()
                            .describe("A quantification of the accuracy of a set of payload values.")
                            .default(0),
                        confidence: zod_1.z
                            .number()
                            .int()
                            .gte(0)
                            .lte(100)
                            .describe("A quantification of the confidence in a set of payload values.")
                            .default(100),
                    })
                        .describe("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"),
                ]))
                    .describe("A list of payloadDescriptors.")
                    .default(null)
                    .nullable()
                    .describe("A list of payloadDescriptors.")
                    .default(null),
                targets: zod_1.z
                    .array(zod_1.z
                    .object({
                    type: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: zod_1.z
                        .array(zod_1.z.union([
                        zod_1.z.number(),
                        zod_1.z.number().int(),
                        zod_1.z.string(),
                        zod_1.z.boolean(),
                        zod_1.z
                            .object({
                            x: zod_1.z
                                .number()
                                .describe("A value on an x axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: zod_1.z
                                .number()
                                .describe("A value on a y axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on a y axis.")
                                .default(null),
                        })
                            .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                    ]))
                        .describe("A list of data points. Most often a singular value such as a price."),
                })
                    .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                    .describe("A list of valuesMap objects.")
                    .default(null)
                    .nullable()
                    .describe("A list of valuesMap objects.")
                    .default(null),
            })
                .describe("Provides program specific metadata from VTN to VEN."),
            zod_1.z
                .object({
                id: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID.")
                    .optional(),
                createdDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                modificationDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                objectType: zod_1.z
                    .literal("REPORT")
                    .describe("Used as discriminator, e.g. notification.object")
                    .optional(),
                programID: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID."),
                eventID: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID."),
                clientName: zod_1.z
                    .string()
                    .min(1)
                    .max(128)
                    .describe("User generated identifier; may be VEN ID provisioned during program enrollment."),
                reportName: zod_1.z
                    .string()
                    .describe("User defined string for use in debugging or User Interface.")
                    .default(null)
                    .nullable()
                    .describe("User defined string for use in debugging or User Interface.")
                    .default(null),
                payloadDescriptors: zod_1.z
                    .array(zod_1.z
                    .object({
                    objectType: zod_1.z
                        .string()
                        .describe("Used as discriminator, e.g. program.payloadDescriptors")
                        .default("REPORT_PAYLOAD_DESCRIPTOR"),
                    payloadType: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("Enumerated or private string signifying the nature of values."),
                    readingType: zod_1.z
                        .string()
                        .describe("Enumerated or private string signifying the type of reading.")
                        .default("DIRECT_READ")
                        .nullable()
                        .describe("Enumerated or private string signifying the type of reading.")
                        .default("DIRECT_READ"),
                    units: zod_1.z
                        .string()
                        .describe("Units of measure.")
                        .default("KWH")
                        .nullable()
                        .describe("Units of measure.")
                        .default("KWH"),
                    accuracy: zod_1.z
                        .number()
                        .describe("A quantification of the accuracy of a set of payload values.")
                        .default(0)
                        .nullable()
                        .describe("A quantification of the accuracy of a set of payload values.")
                        .default(0),
                    confidence: zod_1.z
                        .number()
                        .int()
                        .gte(0)
                        .lte(100)
                        .describe("A quantification of the confidence in a set of payload values.")
                        .default(100),
                })
                    .describe("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"))
                    .describe("A list of reportPayloadDescriptors.")
                    .default(null)
                    .nullable()
                    .describe("A list of reportPayloadDescriptors.")
                    .default(null),
                resources: zod_1.z
                    .array(zod_1.z
                    .object({
                    resourceName: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"),
                    intervalPeriod: zod_1.z
                        .object({
                        start: zod_1.z
                            .string()
                            .datetime()
                            .describe("datetime in ISO 8601 format")
                            .default("0000-00-00"),
                        duration: zod_1.z
                            .string()
                            .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                            .describe("duration in ISO 8601 format")
                            .default("PT0S"),
                        randomizeStart: zod_1.z
                            .string()
                            .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                            .describe("duration in ISO 8601 format")
                            .default("PT0S"),
                    })
                        .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                        .optional(),
                    intervals: zod_1.z
                        .array(zod_1.z
                        .object({
                        id: zod_1.z
                            .number()
                            .int()
                            .describe("A client generated number assigned an interval object. Not a sequence number."),
                        intervalPeriod: zod_1.z
                            .object({
                            start: zod_1.z
                                .string()
                                .datetime()
                                .describe("datetime in ISO 8601 format")
                                .default("0000-00-00"),
                            duration: zod_1.z
                                .string()
                                .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                                .describe("duration in ISO 8601 format")
                                .default("PT0S"),
                            randomizeStart: zod_1.z
                                .string()
                                .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                                .describe("duration in ISO 8601 format")
                                .default("PT0S"),
                        })
                            .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                            .optional(),
                        payloads: zod_1.z
                            .array(zod_1.z
                            .object({
                            type: zod_1.z
                                .string()
                                .min(1)
                                .max(128)
                                .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                            values: zod_1.z
                                .array(zod_1.z.union([
                                zod_1.z.number(),
                                zod_1.z.number().int(),
                                zod_1.z.string(),
                                zod_1.z.boolean(),
                                zod_1.z
                                    .object({
                                    x: zod_1.z
                                        .number()
                                        .describe("A value on an x axis.")
                                        .default(null)
                                        .nullable()
                                        .describe("A value on an x axis.")
                                        .default(null),
                                    y: zod_1.z
                                        .number()
                                        .describe("A value on a y axis.")
                                        .default(null)
                                        .nullable()
                                        .describe("A value on a y axis.")
                                        .default(null),
                                })
                                    .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                            ]))
                                .describe("A list of data points. Most often a singular value such as a price."),
                        })
                            .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                            .describe("A list of valuesMap objects."),
                    })
                        .describe("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"))
                        .describe("A list of interval objects."),
                })
                    .describe("Report data associated with a resource."))
                    .describe("A list of objects containing report data for a set of resources."),
            })
                .describe("report object."),
            zod_1.z
                .object({
                id: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID.")
                    .optional(),
                createdDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                modificationDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                objectType: zod_1.z
                    .literal("EVENT")
                    .describe("Used as discriminator, e.g. notification.object")
                    .optional(),
                programID: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID."),
                eventName: zod_1.z
                    .string()
                    .describe("User defined string for use in debugging or User Interface.")
                    .default(null)
                    .nullable()
                    .describe("User defined string for use in debugging or User Interface.")
                    .default(null),
                priority: zod_1.z
                    .number()
                    .int()
                    .gte(0)
                    .describe("Relative priority of event. A lower number is a higher priority.")
                    .default(null)
                    .nullable()
                    .describe("Relative priority of event. A lower number is a higher priority.")
                    .default(null),
                targets: zod_1.z
                    .array(zod_1.z
                    .object({
                    type: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: zod_1.z
                        .array(zod_1.z.union([
                        zod_1.z.number(),
                        zod_1.z.number().int(),
                        zod_1.z.string(),
                        zod_1.z.boolean(),
                        zod_1.z
                            .object({
                            x: zod_1.z
                                .number()
                                .describe("A value on an x axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: zod_1.z
                                .number()
                                .describe("A value on a y axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on a y axis.")
                                .default(null),
                        })
                            .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                    ]))
                        .describe("A list of data points. Most often a singular value such as a price."),
                })
                    .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                    .describe("A list of valuesMap objects.")
                    .default(null)
                    .nullable()
                    .describe("A list of valuesMap objects.")
                    .default(null),
                reportDescriptors: zod_1.z
                    .array(zod_1.z
                    .object({
                    payloadType: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("Enumerated or private string signifying the nature of values."),
                    readingType: zod_1.z
                        .string()
                        .describe("Enumerated or private string signifying the type of reading.")
                        .default(null)
                        .nullable()
                        .describe("Enumerated or private string signifying the type of reading.")
                        .default(null),
                    units: zod_1.z
                        .string()
                        .describe("Units of measure.")
                        .default(null)
                        .nullable()
                        .describe("Units of measure.")
                        .default(null),
                    targets: zod_1.z
                        .array(zod_1.z
                        .object({
                        type: zod_1.z
                            .string()
                            .min(1)
                            .max(128)
                            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                        values: zod_1.z
                            .array(zod_1.z.union([
                            zod_1.z.number(),
                            zod_1.z.number().int(),
                            zod_1.z.string(),
                            zod_1.z.boolean(),
                            zod_1.z
                                .object({
                                x: zod_1.z
                                    .number()
                                    .describe("A value on an x axis.")
                                    .default(null)
                                    .nullable()
                                    .describe("A value on an x axis.")
                                    .default(null),
                                y: zod_1.z
                                    .number()
                                    .describe("A value on a y axis.")
                                    .default(null)
                                    .nullable()
                                    .describe("A value on a y axis.")
                                    .default(null),
                            })
                                .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                        ]))
                            .describe("A list of data points. Most often a singular value such as a price."),
                    })
                        .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                        .describe("A list of valuesMap objects.")
                        .default(null)
                        .nullable()
                        .describe("A list of valuesMap objects.")
                        .default(null),
                    aggregate: zod_1.z
                        .boolean()
                        .describe("True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n")
                        .default(false),
                    startInterval: zod_1.z
                        .number()
                        .int()
                        .describe("The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n")
                        .default(-1),
                    numIntervals: zod_1.z
                        .number()
                        .int()
                        .describe("The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n")
                        .default(-1),
                    historical: zod_1.z
                        .boolean()
                        .describe("True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n")
                        .default(true),
                    frequency: zod_1.z
                        .number()
                        .int()
                        .describe("Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n")
                        .default(-1),
                    repeat: zod_1.z
                        .number()
                        .int()
                        .describe("Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n")
                        .default(1),
                })
                    .describe("An object that may be used to request a report from a VEN.\nSee OpenADR REST User Guide for detailed description of how configure a report request.\n"))
                    .describe("A list of reportDescriptor objects. Used to request reports from VEN.")
                    .default(null)
                    .nullable()
                    .describe("A list of reportDescriptor objects. Used to request reports from VEN.")
                    .default(null),
                payloadDescriptors: zod_1.z
                    .array(zod_1.z
                    .object({
                    objectType: zod_1.z
                        .string()
                        .describe("Used as discriminator, e.g. program.payloadDescriptors")
                        .default("EVENT_PAYLOAD_DESCRIPTOR"),
                    payloadType: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("Enumerated or private string signifying the nature of values."),
                    units: zod_1.z
                        .string()
                        .describe("Units of measure.")
                        .default(null)
                        .nullable()
                        .describe("Units of measure.")
                        .default(null),
                    currency: zod_1.z
                        .string()
                        .describe("Currency of price payload.")
                        .default("USD")
                        .nullable()
                        .describe("Currency of price payload.")
                        .default("USD"),
                })
                    .describe("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"))
                    .describe("A list of payloadDescriptor objects.")
                    .default(null)
                    .nullable()
                    .describe("A list of payloadDescriptor objects.")
                    .default(null),
                intervalPeriod: zod_1.z
                    .object({
                    start: zod_1.z
                        .string()
                        .datetime()
                        .describe("datetime in ISO 8601 format")
                        .default("0000-00-00"),
                    duration: zod_1.z
                        .string()
                        .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                        .describe("duration in ISO 8601 format")
                        .default("PT0S"),
                    randomizeStart: zod_1.z
                        .string()
                        .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                        .describe("duration in ISO 8601 format")
                        .default("PT0S"),
                })
                    .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                    .optional(),
                intervals: zod_1.z
                    .array(zod_1.z
                    .object({
                    id: zod_1.z
                        .number()
                        .int()
                        .describe("A client generated number assigned an interval object. Not a sequence number."),
                    intervalPeriod: zod_1.z
                        .object({
                        start: zod_1.z
                            .string()
                            .datetime()
                            .describe("datetime in ISO 8601 format")
                            .default("0000-00-00"),
                        duration: zod_1.z
                            .string()
                            .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                            .describe("duration in ISO 8601 format")
                            .default("PT0S"),
                        randomizeStart: zod_1.z
                            .string()
                            .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
                            .describe("duration in ISO 8601 format")
                            .default("PT0S"),
                    })
                        .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                        .optional(),
                    payloads: zod_1.z
                        .array(zod_1.z
                        .object({
                        type: zod_1.z
                            .string()
                            .min(1)
                            .max(128)
                            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                        values: zod_1.z
                            .array(zod_1.z.union([
                            zod_1.z.number(),
                            zod_1.z.number().int(),
                            zod_1.z.string(),
                            zod_1.z.boolean(),
                            zod_1.z
                                .object({
                                x: zod_1.z
                                    .number()
                                    .describe("A value on an x axis.")
                                    .default(null)
                                    .nullable()
                                    .describe("A value on an x axis.")
                                    .default(null),
                                y: zod_1.z
                                    .number()
                                    .describe("A value on a y axis.")
                                    .default(null)
                                    .nullable()
                                    .describe("A value on a y axis.")
                                    .default(null),
                            })
                                .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                        ]))
                            .describe("A list of data points. Most often a singular value such as a price."),
                    })
                        .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                        .describe("A list of valuesMap objects."),
                })
                    .describe("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"))
                    .describe("A list of interval objects."),
            })
                .describe("Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets start time and duration of intervals.\n"),
            zod_1.z
                .object({
                id: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID.")
                    .optional(),
                createdDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                modificationDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                objectType: zod_1.z
                    .literal("SUBSCRIPTION")
                    .describe("Used as discriminator, e.g. notification.object")
                    .optional(),
                clientName: zod_1.z
                    .string()
                    .min(1)
                    .max(128)
                    .describe("User generated identifier, may be VEN identifier provisioned during program enrollment."),
                programID: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID."),
                objectOperations: zod_1.z
                    .array(zod_1.z
                    .object({
                    objects: zod_1.z
                        .array(zod_1.z
                        .enum([
                        "PROGRAM",
                        "EVENT",
                        "REPORT",
                        "SUBSCRIPTION",
                        "VEN",
                        "RESOURCE",
                    ])
                        .describe("Types of objects addressable through API."))
                        .describe("list of objects to subscribe to."),
                    operations: zod_1.z
                        .array(zod_1.z
                        .enum(["GET", "POST", "PUT", "DELETE"])
                        .describe("object operation to subscribe to."))
                        .describe("list of operations to subscribe to."),
                    callbackUrl: zod_1.z
                        .string()
                        .url()
                        .describe("User provided webhook URL."),
                    bearerToken: zod_1.z
                        .string()
                        .describe("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
                        .default(null)
                        .nullable()
                        .describe("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
                        .default(null),
                })
                    .describe("object type, operations, and callbackUrl."))
                    .describe("list of objects and operations to subscribe to."),
                targets: zod_1.z
                    .array(zod_1.z
                    .object({
                    type: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: zod_1.z
                        .array(zod_1.z.union([
                        zod_1.z.number(),
                        zod_1.z.number().int(),
                        zod_1.z.string(),
                        zod_1.z.boolean(),
                        zod_1.z
                            .object({
                            x: zod_1.z
                                .number()
                                .describe("A value on an x axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: zod_1.z
                                .number()
                                .describe("A value on a y axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on a y axis.")
                                .default(null),
                        })
                            .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                    ]))
                        .describe("A list of data points. Most often a singular value such as a price."),
                })
                    .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                    .describe("A list of valuesMap objects. Used by server to filter callbacks.")
                    .default(null)
                    .nullable()
                    .describe("A list of valuesMap objects. Used by server to filter callbacks.")
                    .default(null),
            })
                .describe("An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n"),
            zod_1.z
                .object({
                id: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID.")
                    .optional(),
                createdDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                modificationDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                objectType: zod_1.z
                    .literal("VEN")
                    .describe("Used as discriminator, e.g. notification.object.")
                    .optional(),
                venName: zod_1.z
                    .string()
                    .min(1)
                    .max(128)
                    .describe("User generated identifier, may be VEN identifier provisioned during program enrollment."),
                attributes: zod_1.z
                    .array(zod_1.z
                    .object({
                    type: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: zod_1.z
                        .array(zod_1.z.union([
                        zod_1.z.number(),
                        zod_1.z.number().int(),
                        zod_1.z.string(),
                        zod_1.z.boolean(),
                        zod_1.z
                            .object({
                            x: zod_1.z
                                .number()
                                .describe("A value on an x axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: zod_1.z
                                .number()
                                .describe("A value on a y axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on a y axis.")
                                .default(null),
                        })
                            .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                    ]))
                        .describe("A list of data points. Most often a singular value such as a price."),
                })
                    .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                    .describe("A list of valuesMap objects describing attributes.")
                    .optional(),
                targets: zod_1.z
                    .array(zod_1.z
                    .object({
                    type: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: zod_1.z
                        .array(zod_1.z.union([
                        zod_1.z.number(),
                        zod_1.z.number().int(),
                        zod_1.z.string(),
                        zod_1.z.boolean(),
                        zod_1.z
                            .object({
                            x: zod_1.z
                                .number()
                                .describe("A value on an x axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: zod_1.z
                                .number()
                                .describe("A value on a y axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on a y axis.")
                                .default(null),
                        })
                            .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                    ]))
                        .describe("A list of data points. Most often a singular value such as a price."),
                })
                    .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                    .describe("A list of valuesMap objects describing target criteria.")
                    .optional(),
                resources: zod_1.z
                    .array(zod_1.z
                    .object({
                    id: zod_1.z
                        .string()
                        .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                        .min(1)
                        .max(128)
                        .describe("URL safe VTN assigned object ID.")
                        .optional(),
                    createdDateTime: zod_1.z
                        .string()
                        .datetime()
                        .describe("datetime in ISO 8601 format")
                        .default("0000-00-00"),
                    modificationDateTime: zod_1.z
                        .string()
                        .datetime()
                        .describe("datetime in ISO 8601 format")
                        .default("0000-00-00"),
                    objectType: zod_1.z
                        .literal("RESOURCE")
                        .describe("Used as discriminator, e.g. notification.object")
                        .optional(),
                    resourceName: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("User generated identifier, resource may be configured with identifier out-of-band."),
                    venID: zod_1.z
                        .string()
                        .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                        .min(1)
                        .max(128)
                        .describe("URL safe VTN assigned object ID.")
                        .optional(),
                    attributes: zod_1.z
                        .array(zod_1.z
                        .object({
                        type: zod_1.z
                            .string()
                            .min(1)
                            .max(128)
                            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                        values: zod_1.z
                            .array(zod_1.z.union([
                            zod_1.z.number(),
                            zod_1.z.number().int(),
                            zod_1.z.string(),
                            zod_1.z.boolean(),
                            zod_1.z
                                .object({
                                x: zod_1.z
                                    .number()
                                    .describe("A value on an x axis.")
                                    .default(null)
                                    .nullable()
                                    .describe("A value on an x axis.")
                                    .default(null),
                                y: zod_1.z
                                    .number()
                                    .describe("A value on a y axis.")
                                    .default(null)
                                    .nullable()
                                    .describe("A value on a y axis.")
                                    .default(null),
                            })
                                .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                        ]))
                            .describe("A list of data points. Most often a singular value such as a price."),
                    })
                        .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                        .describe("A list of valuesMap objects describing attributes.")
                        .optional(),
                    targets: zod_1.z
                        .array(zod_1.z
                        .object({
                        type: zod_1.z
                            .string()
                            .min(1)
                            .max(128)
                            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                        values: zod_1.z
                            .array(zod_1.z.union([
                            zod_1.z.number(),
                            zod_1.z.number().int(),
                            zod_1.z.string(),
                            zod_1.z.boolean(),
                            zod_1.z
                                .object({
                                x: zod_1.z
                                    .number()
                                    .describe("A value on an x axis.")
                                    .default(null)
                                    .nullable()
                                    .describe("A value on an x axis.")
                                    .default(null),
                                y: zod_1.z
                                    .number()
                                    .describe("A value on a y axis.")
                                    .default(null)
                                    .nullable()
                                    .describe("A value on a y axis.")
                                    .default(null),
                            })
                                .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                        ]))
                            .describe("A list of data points. Most often a singular value such as a price."),
                    })
                        .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                        .describe("A list of valuesMap objects describing target criteria.")
                        .optional(),
                })
                    .describe("A resource is an energy device or system subject to control by a VEN.\n"))
                    .describe("A list of resource objects representing end-devices or systems.")
                    .default(null)
                    .nullable()
                    .describe("A list of resource objects representing end-devices or systems.")
                    .default(null),
            })
                .describe("Ven represents a client with the ven role."),
            zod_1.z
                .object({
                id: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID.")
                    .optional(),
                createdDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                modificationDateTime: zod_1.z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .default("0000-00-00"),
                objectType: zod_1.z
                    .literal("RESOURCE")
                    .describe("Used as discriminator, e.g. notification.object")
                    .optional(),
                resourceName: zod_1.z
                    .string()
                    .min(1)
                    .max(128)
                    .describe("User generated identifier, resource may be configured with identifier out-of-band."),
                venID: zod_1.z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID.")
                    .optional(),
                attributes: zod_1.z
                    .array(zod_1.z
                    .object({
                    type: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: zod_1.z
                        .array(zod_1.z.union([
                        zod_1.z.number(),
                        zod_1.z.number().int(),
                        zod_1.z.string(),
                        zod_1.z.boolean(),
                        zod_1.z
                            .object({
                            x: zod_1.z
                                .number()
                                .describe("A value on an x axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: zod_1.z
                                .number()
                                .describe("A value on a y axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on a y axis.")
                                .default(null),
                        })
                            .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                    ]))
                        .describe("A list of data points. Most often a singular value such as a price."),
                })
                    .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                    .describe("A list of valuesMap objects describing attributes.")
                    .optional(),
                targets: zod_1.z
                    .array(zod_1.z
                    .object({
                    type: zod_1.z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: zod_1.z
                        .array(zod_1.z.union([
                        zod_1.z.number(),
                        zod_1.z.number().int(),
                        zod_1.z.string(),
                        zod_1.z.boolean(),
                        zod_1.z
                            .object({
                            x: zod_1.z
                                .number()
                                .describe("A value on an x axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: zod_1.z
                                .number()
                                .describe("A value on a y axis.")
                                .default(null)
                                .nullable()
                                .describe("A value on a y axis.")
                                .default(null),
                        })
                            .describe("A pair of floats typically used as a point on a 2 dimensional grid."),
                    ]))
                        .describe("A list of data points. Most often a singular value such as a price."),
                })
                    .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"))
                    .describe("A list of valuesMap objects describing target criteria.")
                    .optional(),
            })
                .describe("A resource is an energy device or system subject to control by a VEN.\n"),
        ];
        const errors = schemas.reduce((errors, schema) => ((result) => "error" in result ? [...errors, result.error] : errors)(schema.safeParse(x)), []);
        if (schemas.length - errors.length !== 1) {
            ctx.addIssue({
                path: ctx.path,
                code: "invalid_union",
                unionErrors: errors,
                message: "Invalid input: Should pass single schema",
            });
        }
    }))
        .describe("the object that is the subject of the notification."),
})
    .describe("VTN generated object included in request to subscription callbackUrl.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLW5vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy96b2Qvem9kLW5vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF3QjtBQUV4QixrQkFBZSxPQUFDO0tBQ2IsTUFBTSxDQUFDO0lBQ04sVUFBVSxFQUFFLE9BQUM7U0FDVixJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZFLFFBQVEsQ0FBQywyQ0FBMkMsQ0FBQztJQUN4RCxTQUFTLEVBQUUsT0FBQztTQUNULElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDLFFBQVEsQ0FBQyw2REFBNkQsQ0FBQztJQUMxRSxPQUFPLEVBQUUsT0FBQztTQUNQLEtBQUssQ0FDSixPQUFDO1NBQ0UsTUFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLE9BQUM7YUFDSixNQUFNLEVBQUU7YUFDUixHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNSLFFBQVEsQ0FDUCxtSUFBbUksQ0FDcEk7UUFDSCxNQUFNLEVBQUUsT0FBQzthQUNOLEtBQUssQ0FDSixPQUFDLENBQUMsS0FBSyxDQUFDO1lBQ04sT0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNWLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDaEIsT0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNWLE9BQUMsQ0FBQyxPQUFPLEVBQUU7WUFDWCxPQUFDO2lCQUNFLE1BQU0sQ0FBQztnQkFDTixDQUFDLEVBQUUsT0FBQztxQkFDRCxNQUFNLEVBQUU7cUJBQ1IsUUFBUSxDQUFDLHVCQUF1QixDQUFDO3FCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDO3FCQUNiLFFBQVEsRUFBRTtxQkFDVixR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cm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHpcbiAgLm9iamVjdCh7XG4gICAgb2JqZWN0VHlwZTogelxuICAgICAgLmVudW0oW1wiUFJPR1JBTVwiLCBcIkVWRU5UXCIsIFwiUkVQT1JUXCIsIFwiU1VCU0NSSVBUSU9OXCIsIFwiVkVOXCIsIFwiUkVTT1VSQ0VcIl0pXG4gICAgICAuZGVzY3JpYmUoXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKSxcbiAgICBvcGVyYXRpb246IHpcbiAgICAgIC5lbnVtKFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIl0pXG4gICAgICAuZGVzY3JpYmUoXCJ0aGUgb3BlcmF0aW9uIG9uIG9uIG9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGUgbm90aWZpY2F0aW9uLlwiKSxcbiAgICB0YXJnZXRzOiB6XG4gICAgICAuYXJyYXkoXG4gICAgICAgIHpcbiAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgIClcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgb2JqZWN0OiB6XG4gICAgICAucmVjb3JkKHouYW55KCkpXG4gICAgICAuYW5kKFxuICAgICAgICB6LmFueSgpLnN1cGVyUmVmaW5lKCh4LCBjdHgpID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFzID0gW1xuICAgICAgICAgICAgelxuICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiMDAwMC0wMC0wMFwiKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAubGl0ZXJhbChcIlBST0dSQU1cIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtTmFtZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlNob3J0IG5hbWUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgcHJvZ3JhbS5cIiksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbUxvbmdOYW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkxvbmcgbmFtZSBvZiBwcm9ncmFtIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiTG9uZyBuYW1lIG9mIHByb2dyYW0gZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgcmV0YWlsZXJOYW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJTaG9ydCBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBwcm92aWRpbmcgdGhlIHByb2dyYW0uXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlNob3J0IG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIHByb3ZpZGluZyB0aGUgcHJvZ3JhbS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgcmV0YWlsZXJMb25nTmFtZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiTG9uZyBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIkxvbmcgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtVHlwZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHByb2dyYW0gZGVmaW5lZCBjYXRlZ29yaXphdGlvbi5cIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBwcm9ncmFtIGRlZmluZWQgY2F0ZWdvcml6YXRpb24uXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkFscGhhLTIgY29kZSBwZXIgSVNPIDMxNjYtMS5cIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQWxwaGEtMiBjb2RlIHBlciBJU08gMzE2Ni0xLlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgcHJpbmNpcGFsU3ViZGl2aXNpb246IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQ29kaW5nIHBlciBJU08gMzE2Ni0yLiBFLmcuIHN0YXRlIGluIFVTLlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJDb2RpbmcgcGVyIElTTyAzMTY2LTIuIEUuZy4gc3RhdGUgaW4gVVMuXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICB0aW1lWm9uZU9mZnNldDogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICAgXCIvXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyQvXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IHpcbiAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogelxuICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogelxuICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIi9eKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JC9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtRGVzY3JpcHRpb25zOiB6XG4gICAgICAgICAgICAgICAgICAuYXJyYXkoei5hbnkoKSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICBiaW5kaW5nRXZlbnRzOiB6XG4gICAgICAgICAgICAgICAgICAuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJUcnVlIGlmIGV2ZW50cyBhcmUgZml4ZWQgb25jZSB0cmFuc21pdHRlZC5cIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KGZhbHNlKSxcbiAgICAgICAgICAgICAgICBsb2NhbFByaWNlOiB6XG4gICAgICAgICAgICAgICAgICAuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiBldmVudHMgaGF2ZSBiZWVuIGFkYXB0ZWQgZnJvbSBhIGdyaWQgZXZlbnQuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KGZhbHNlKSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IHpcbiAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiVVNEXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiVVNEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IGV2ZW50IHZhbHVlc01hcCB2YWx1ZXMuXFxuRS5nLiBhIFBSSUNFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgcHJpY2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGN1cnJlbmN5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiRElSRUNUX1JFQURcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJESVJFQ1RfUkVBRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiS1dIXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiS1dIXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ3RlKDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmx0ZSgxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KDEwMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJQcm92aWRlcyBwcm9ncmFtIHNwZWNpZmljIG1ldGFkYXRhIGZyb20gVlROIHRvIFZFTi5cIiksXG4gICAgICAgICAgICB6XG4gICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgIC5saXRlcmFsKFwiUkVQT1JUXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbUlEOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIiksXG4gICAgICAgICAgICAgICAgZXZlbnRJRDogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpLFxuICAgICAgICAgICAgICAgIGNsaWVudE5hbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllcjsgbWF5IGJlIFZFTiBJRCBwcm92aXNpb25lZCBkdXJpbmcgcHJvZ3JhbSBlbnJvbGxtZW50LlwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHJlcG9ydE5hbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZGVmaW5lZCBzdHJpbmcgZm9yIHVzZSBpbiBkZWJ1Z2dpbmcgb3IgVXNlciBJbnRlcmZhY2UuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZGVmaW5lZCBzdHJpbmcgZm9yIHVzZSBpbiBkZWJ1Z2dpbmcgb3IgVXNlciBJbnRlcmZhY2UuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgIHBheWxvYWREZXNjcmlwdG9yczogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiRElSRUNUX1JFQURcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIkRJUkVDVF9SRUFEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiS1dIXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiS1dIXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3k6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZ3RlKDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5sdGUoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMTAwKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHpcbiAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIi9eKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JC9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGNsaWVudCBnZW5lcmF0ZWQgbnVtYmVyIGFzc2lnbmVkIGFuIGludGVydmFsIG9iamVjdC4gTm90IGEgc2VxdWVuY2UgbnVtYmVyLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIvXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyQvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgaW50ZXJ2YWwgb2JqZWN0cy5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJSZXBvcnQgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSByZXNvdXJjZS5cIilcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2Ygb2JqZWN0cyBjb250YWluaW5nIHJlcG9ydCBkYXRhIGZvciBhIHNldCBvZiByZXNvdXJjZXMuXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcInJlcG9ydCBvYmplY3QuXCIpLFxuICAgICAgICAgICAgelxuICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiMDAwMC0wMC0wMFwiKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAubGl0ZXJhbChcIkVWRU5UXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbUlEOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIiksXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogelxuICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAuaW50KClcbiAgICAgICAgICAgICAgICAgIC5ndGUoMClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJSZWxhdGl2ZSBwcmlvcml0eSBvZiBldmVudC4gQSBsb3dlciBudW1iZXIgaXMgYSBoaWdoZXIgcHJpb3JpdHkuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlJlbGF0aXZlIHByaW9yaXR5IG9mIGV2ZW50LiBBIGxvd2VyIG51bWJlciBpcyBhIGhpZ2hlciBwcmlvcml0eS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgIHJlcG9ydERlc2NyaXB0b3JzOiB6XG4gICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0czogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRydWUgaWYgcmVwb3J0IHNob3VsZCBhZ2dyZWdhdGUgcmVzdWx0cyBmcm9tIGFsbCB0YXJnZXRlZCByZXNvdXJjZXMuXFxuRmFsc2UgaWYgcmVwb3J0IGluY2x1ZGVzIHJlc3VsdHMgZm9yIGVhY2ggcmVzb3VyY2UuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChmYWxzZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydEludGVydmFsOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVGhlIGludGVydmFsIG9uIHdoaWNoIHRvIGdlbmVyYXRlIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyBnZW5lcmF0ZSByZXBvcnQgYXQgZW5kIG9mIGxhc3QgaW50ZXJ2YWwuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgtMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1JbnRlcnZhbHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGUgbnVtYmVyIG9mIGludGVydmFscyB0byBpbmNsdWRlIGluIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyB0aGF0IGFsbCBpbnRlcnZhbHMgYXJlIHRvIGJlIGluY2x1ZGVkLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGlzdG9yaWNhbDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYm9vbGVhbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRydWUgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgcHJlY2VkaW5nIHN0YXJ0SW50ZXJ2YWwuXFxuRmFsc2UgaW5kaWNhdGVzIHJlcG9ydCBvbiBpbnRlcnZhbHMgZm9sbG93aW5nIHN0YXJ0SW50ZXJ2YWwgKGUuZy4gZm9yZWNhc3QpLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQodHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3k6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgaW50ZXJ2YWxzIHRoYXQgZWxhcHNlIGJldHdlZW4gcmVwb3J0cy5cXG4tMSBpbmRpY2F0ZXMgc2FtZSBhcyBudW1JbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgtMSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMSksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCB0aGF0IG1heSBiZSB1c2VkIHRvIHJlcXVlc3QgYSByZXBvcnQgZnJvbSBhIFZFTi5cXG5TZWUgT3BlbkFEUiBSRVNUIFVzZXIgR3VpZGUgZm9yIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIGhvdyBjb25maWd1cmUgYSByZXBvcnQgcmVxdWVzdC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHJlcG9ydERlc2NyaXB0b3Igb2JqZWN0cy4gVXNlZCB0byByZXF1ZXN0IHJlcG9ydHMgZnJvbSBWRU4uXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgIHBheWxvYWREZXNjcmlwdG9yczogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiVVNEXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiVVNEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IGV2ZW50IHZhbHVlc01hcCB2YWx1ZXMuXFxuRS5nLiBhIFBSSUNFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgcHJpY2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGN1cnJlbmN5LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiBwYXlsb2FkRGVzY3JpcHRvciBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IHpcbiAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogelxuICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogelxuICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIi9eKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JC9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBpbnRlcnZhbHM6IHpcbiAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGNsaWVudCBnZW5lcmF0ZWQgbnVtYmVyIGFzc2lnbmVkIGFuIGludGVydmFsIG9iamVjdC4gTm90IGEgc2VxdWVuY2UgbnVtYmVyLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIi9eKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JC9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgaW50ZXJ2YWwgb2JqZWN0cy5cIiksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkV2ZW50IG9iamVjdCB0byBjb21tdW5pY2F0ZSBhIERlbWFuZCBSZXNwb25zZSByZXF1ZXN0IHRvIFZFTi5cXG5JZiBpbnRlcnZhbFBlcmlvZCBpcyBwcmVzZW50LCBzZXRzIHN0YXJ0IHRpbWUgYW5kIGR1cmF0aW9uIG9mIGludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgelxuICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiMDAwMC0wMC0wMFwiKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAubGl0ZXJhbChcIlNVQlNDUklQVElPTlwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIGNsaWVudE5hbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIGR1cmluZyBwcm9ncmFtIGVucm9sbG1lbnQuXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbUlEOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIiksXG4gICAgICAgICAgICAgICAgb2JqZWN0T3BlcmF0aW9uczogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW51bShbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZXMgb2Ygb2JqZWN0cyBhZGRyZXNzYWJsZSB0aHJvdWdoIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImxpc3Qgb2Ygb2JqZWN0cyB0byBzdWJzY3JpYmUgdG8uXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmVudW0oW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIm9iamVjdCBvcGVyYXRpb24gdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tVcmw6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC51cmwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVc2VyIHByb3ZpZGVkIHdlYmhvb2sgVVJMLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlYXJlclRva2VuOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlciBwcm92aWRlZCB0b2tlbi5cXG5UbyBhdm9pZCBjdXN0b20gaW50ZWdyYXRpb25zLCBjYWxsYmFjayBlbmRwb2ludHNcXG5zaG91bGQgYWNjZXB0IHRoZSBwcm92aWRlZCBiZWFyZXIgdG9rZW4gdG8gYXV0aGVudGljYXRlIFZUTiByZXF1ZXN0cy5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwib2JqZWN0IHR5cGUsIG9wZXJhdGlvbnMsIGFuZCBjYWxsYmFja1VybC5cIilcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImxpc3Qgb2Ygb2JqZWN0cyBhbmQgb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCIpLFxuICAgICAgICAgICAgICAgIHRhcmdldHM6IHpcbiAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy4gVXNlZCBieSBzZXJ2ZXIgdG8gZmlsdGVyIGNhbGxiYWNrcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLiBVc2VkIGJ5IHNlcnZlciB0byBmaWx0ZXIgY2FsbGJhY2tzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IGNyZWF0ZWQgYnkgYSBjbGllbnQgdG8gcmVjZWl2ZSBub3RpZmljYXRpb24gb2Ygb3BlcmF0aW9ucyBvbiBvYmplY3RzLlxcbkNsaWVudHMgbWF5IHN1YnNjcmliZSB0byBiZSBub3RpZmllZCB3aGVuIGEgdHlwZSBvZiBvYmplY3QgaXMgY3JlYXRlZCxcXG51cGRhdGVkLCBvciBkZWxldGVkLlxcblwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB6XG4gICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgIC5saXRlcmFsKFwiVkVOXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdC5cIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIHZlbk5hbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIGR1cmluZyBwcm9ncmFtIGVucm9sbG1lbnQuXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHpcbiAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiMDAwMC0wMC0wMFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmxpdGVyYWwoXCJSRVNPVVJDRVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZU5hbWU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIHJlc291cmNlIG1heSBiZSBjb25maWd1cmVkIHdpdGggaWRlbnRpZmllciBvdXQtb2YtYmFuZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVuSUQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIGF0dHJpYnV0ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiByZXNvdXJjZSBvYmplY3RzIHJlcHJlc2VudGluZyBlbmQtZGV2aWNlcyBvciBzeXN0ZW1zLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVzb3VyY2Ugb2JqZWN0cyByZXByZXNlbnRpbmcgZW5kLWRldmljZXMgb3Igc3lzdGVtcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcIlZlbiByZXByZXNlbnRzIGEgY2xpZW50IHdpdGggdGhlIHZlbiByb2xlLlwiKSxcbiAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiMDAwMC0wMC0wMFwiKSxcbiAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogelxuICAgICAgICAgICAgICAgICAgLmxpdGVyYWwoXCJSRVNPVVJDRVwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIHJlc291cmNlTmFtZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdmVuSUQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiQSByZXNvdXJjZSBpcyBhbiBlbmVyZ3kgZGV2aWNlIG9yIHN5c3RlbSBzdWJqZWN0IHRvIGNvbnRyb2wgYnkgYSBWRU4uXFxuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICBdO1xuICAgICAgICAgIGNvbnN0IGVycm9ycyA9IHNjaGVtYXMucmVkdWNlKFxuICAgICAgICAgICAgKGVycm9yczogei5ab2RFcnJvcltdLCBzY2hlbWEpID0+XG4gICAgICAgICAgICAgICgocmVzdWx0KSA9PlxuICAgICAgICAgICAgICAgIFwiZXJyb3JcIiBpbiByZXN1bHQgPyBbLi4uZXJyb3JzLCByZXN1bHQuZXJyb3JdIDogZXJyb3JzKShcbiAgICAgICAgICAgICAgICBzY2hlbWEuc2FmZVBhcnNlKHgpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBbXVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKHNjaGVtYXMubGVuZ3RoIC0gZXJyb3JzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgY3R4LmFkZElzc3VlKHtcbiAgICAgICAgICAgICAgcGF0aDogY3R4LnBhdGgsXG4gICAgICAgICAgICAgIGNvZGU6IFwiaW52YWxpZF91bmlvblwiLFxuICAgICAgICAgICAgICB1bmlvbkVycm9yczogZXJyb3JzLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBcIkludmFsaWQgaW5wdXQ6IFNob3VsZCBwYXNzIHNpbmdsZSBzY2hlbWFcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcInRoZSBvYmplY3QgdGhhdCBpcyB0aGUgc3ViamVjdCBvZiB0aGUgbm90aWZpY2F0aW9uLlwiKSxcbiAgfSlcbiAgLmRlc2NyaWJlKFxuICAgIFwiVlROIGdlbmVyYXRlZCBvYmplY3QgaW5jbHVkZWQgaW4gcmVxdWVzdCB0byBzdWJzY3JpcHRpb24gY2FsbGJhY2tVcmwuXFxuXCJcbiAgKTtcbiJdfQ==