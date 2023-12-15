import { z } from "zod";
export default z
    .object({
    objectType: z
        .enum(["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"])
        .describe("Types of objects addressable through API."),
    operation: z
        .enum(["GET", "POST", "PUT", "DELETE"])
        .describe("the operation on on object that triggered the notification."),
    targets: z
        .array(z
        .object({
        type: z
            .string()
            .min(1)
            .max(128)
            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
        values: z
            .array(z.union([
            z.number(),
            z.number().int(),
            z.string(),
            z.boolean(),
            z
                .object({
                x: z
                    .number()
                    .describe("A value on an x axis.")
                    // .default(null)
                    .nullable()
                    .describe("A value on an x axis.")
                    .default(null),
                y: z
                    .number()
                    .describe("A value on a y axis.")
                    // .default(null)
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
        // .default(null)
        .nullable()
        .describe("A list of valuesMap objects.")
        .default(null),
    object: z
        .record(z.any())
        .and(z.any().superRefine((x, ctx) => {
        const schemas = [
            z
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
                    .optional(),
                modificationDateTime: z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .optional(),
                objectType: z
                    .literal("PROGRAM")
                    .describe("Used as discriminator, e.g. notification.object")
                    .optional(),
                programName: z
                    .string()
                    .min(1)
                    .max(128)
                    .describe("Short name to uniquely identify program."),
                programLongName: z
                    .string()
                    .describe("Long name of program for human readability.")
                    // .default(null)
                    .nullable()
                    .describe("Long name of program for human readability.")
                    .default(null),
                retailerName: z
                    .string()
                    .describe("Short name of energy retailer providing the program.")
                    // .default(null)
                    .nullable()
                    .describe("Short name of energy retailer providing the program.")
                    .default(null),
                retailerLongName: z
                    .string()
                    .describe("Long name of energy retailer for human readability.")
                    // .default(null)
                    .nullable()
                    .describe("Long name of energy retailer for human readability.")
                    .default(null),
                programType: z
                    .string()
                    .describe("A program defined categorization.")
                    // .default(null)
                    .nullable()
                    .describe("A program defined categorization.")
                    .default(null),
                country: z
                    .string()
                    .describe("Alpha-2 code per ISO 3166-1.")
                    // .default(null)
                    .nullable()
                    .describe("Alpha-2 code per ISO 3166-1.")
                    .default(null),
                principalSubdivision: z
                    .string()
                    .describe("Coding per ISO 3166-2. E.g. state in US.")
                    // .default(null)
                    .nullable()
                    .describe("Coding per ISO 3166-2. E.g. state in US.")
                    .default(null),
                timeZoneOffset: z
                    .string()
                    .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                    .describe("duration in ISO 8601 format")
                    .default("PT0S"),
                intervalPeriod: z
                    .object({
                    start: z
                        .string()
                        .datetime()
                        .describe("datetime in ISO 8601 format"),
                    duration: z
                        .string()
                        .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                        .describe("duration in ISO 8601 format")
                        .default("PT0S"),
                    randomizeStart: z
                        .string()
                        .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                        .describe("duration in ISO 8601 format")
                        .default("PT0S"),
                })
                    .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                    .optional(),
                programDescriptions: z
                    .array(z.any())
                    .describe("A list of programDescriptions")
                    // .default(null)
                    .nullable()
                    .describe("A list of programDescriptions")
                    .default(null),
                bindingEvents: z
                    .boolean()
                    .describe("True if events are fixed once transmitted.")
                    .default(false),
                localPrice: z
                    .boolean()
                    .describe("True if events have been adapted from a grid event.")
                    .default(false),
                payloadDescriptors: z
                    .array(z.union([
                    z
                        .object({
                        objectType: z
                            .string()
                            .describe("Used as discriminator, e.g. program.payloadDescriptors")
                            .default("EVENT_PAYLOAD_DESCRIPTOR"),
                        payloadType: z
                            .string()
                            .min(1)
                            .max(128)
                            .describe("Enumerated or private string signifying the nature of values."),
                        units: z
                            .string()
                            .describe("Units of measure.")
                            // .default(null)
                            .nullable()
                            .describe("Units of measure.")
                            .default(null),
                        currency: z
                            .string()
                            .describe("Currency of price payload.")
                            // .default(null)
                            .nullable()
                            .describe("Currency of price payload.")
                            .default(null),
                    })
                        .describe("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"),
                    z
                        .object({
                        objectType: z
                            .string()
                            .describe("Used as discriminator, e.g. program.payloadDescriptors")
                            .default("REPORT_PAYLOAD_DESCRIPTOR"),
                        payloadType: z
                            .string()
                            .min(1)
                            .max(128)
                            .describe("Enumerated or private string signifying the nature of values."),
                        readingType: z
                            .string()
                            .describe("Enumerated or private string signifying the type of reading.")
                            // .default(null)
                            .nullable()
                            .describe("Enumerated or private string signifying the type of reading.")
                            .default(null),
                        units: z
                            .string()
                            .describe("Units of measure.")
                            // .default(null)
                            .nullable()
                            .describe("Units of measure.")
                            .default(null),
                        accuracy: z
                            .number()
                            .describe("A quantification of the accuracy of a set of payload values.")
                            // .default(null)
                            .nullable()
                            .describe("A quantification of the accuracy of a set of payload values.")
                            .default(null),
                        confidence: z
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
                    // .default(null)
                    .nullable()
                    .describe("A list of payloadDescriptors.")
                    .default(null),
                targets: z
                    .array(z
                    .object({
                    type: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: z
                        .array(z.union([
                        z.number(),
                        z.number().int(),
                        z.string(),
                        z.boolean(),
                        z
                            .object({
                            x: z
                                .number()
                                .describe("A value on an x axis.")
                                // .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: z
                                .number()
                                .describe("A value on a y axis.")
                                // .default(null)
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
                    // .default(null)
                    .nullable()
                    .describe("A list of valuesMap objects.")
                    .default(null),
            })
                .describe("Provides program specific metadata from VTN to VEN."),
            z
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
                    .optional(),
                modificationDateTime: z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .optional(),
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
                    .describe("User generated identifier; may be VEN ID provisioned during program enrollment."),
                reportName: z
                    .string()
                    .describe("User defined string for use in debugging or User Interface.")
                    // .default(null)
                    .nullable()
                    .describe("User defined string for use in debugging or User Interface.")
                    .default(null),
                payloadDescriptors: z
                    .array(z
                    .object({
                    objectType: z
                        .string()
                        .describe("Used as discriminator, e.g. program.payloadDescriptors")
                        .default("REPORT_PAYLOAD_DESCRIPTOR"),
                    payloadType: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("Enumerated or private string signifying the nature of values."),
                    readingType: z
                        .string()
                        .describe("Enumerated or private string signifying the type of reading.")
                        // .default(null)
                        .nullable()
                        .describe("Enumerated or private string signifying the type of reading.")
                        .default(null),
                    units: z
                        .string()
                        .describe("Units of measure.")
                        // .default(null)
                        .nullable()
                        .describe("Units of measure.")
                        .default(null),
                    accuracy: z
                        .number()
                        .describe("A quantification of the accuracy of a set of payload values.")
                        // .default(null)
                        .nullable()
                        .describe("A quantification of the accuracy of a set of payload values.")
                        .default(null),
                    confidence: z
                        .number()
                        .int()
                        .gte(0)
                        .lte(100)
                        .describe("A quantification of the confidence in a set of payload values.")
                        .default(100),
                })
                    .describe("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"))
                    .describe("A list of reportPayloadDescriptors.")
                    // .default(null)
                    .nullable()
                    .describe("A list of reportPayloadDescriptors.")
                    .default(null),
                resources: z
                    .array(z
                    .object({
                    resourceName: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"),
                    intervalPeriod: z
                        .object({
                        start: z
                            .string()
                            .datetime()
                            .describe("datetime in ISO 8601 format"),
                        duration: z
                            .string()
                            .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                            .describe("duration in ISO 8601 format")
                            .default("PT0S"),
                        randomizeStart: z
                            .string()
                            .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                            .describe("duration in ISO 8601 format")
                            .default("PT0S"),
                    })
                        .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                        .optional(),
                    intervals: z
                        .array(z
                        .object({
                        id: z
                            .number()
                            .int()
                            .describe("A client generated number assigned an interval object. Not a sequence number."),
                        intervalPeriod: z
                            .object({
                            start: z
                                .string()
                                .datetime()
                                .describe("datetime in ISO 8601 format"),
                            duration: z
                                .string()
                                .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                                .describe("duration in ISO 8601 format")
                                .default("PT0S"),
                            randomizeStart: z
                                .string()
                                .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                                .describe("duration in ISO 8601 format")
                                .default("PT0S"),
                        })
                            .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                            .optional(),
                        payloads: z
                            .array(z
                            .object({
                            type: z
                                .string()
                                .min(1)
                                .max(128)
                                .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                            values: z
                                .array(z.union([
                                z.number(),
                                z.number().int(),
                                z.string(),
                                z.boolean(),
                                z
                                    .object({
                                    x: z
                                        .number()
                                        .describe("A value on an x axis.")
                                        // .default(null)
                                        .nullable()
                                        .describe("A value on an x axis.")
                                        .default(null),
                                    y: z
                                        .number()
                                        .describe("A value on a y axis.")
                                        // .default(null)
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
            z
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
                    .optional(),
                modificationDateTime: z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .optional(),
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
                    // .default(null)
                    .nullable()
                    .describe("User defined string for use in debugging or User Interface.")
                    .default(null),
                priority: z
                    .number()
                    .int()
                    .gte(0)
                    .describe("Relative priority of event. A lower number is a higher priority.")
                    // .default(null)
                    .nullable()
                    .describe("Relative priority of event. A lower number is a higher priority.")
                    .default(null),
                targets: z
                    .array(z
                    .object({
                    type: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: z
                        .array(z.union([
                        z.number(),
                        z.number().int(),
                        z.string(),
                        z.boolean(),
                        z
                            .object({
                            x: z
                                .number()
                                .describe("A value on an x axis.")
                                // .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: z
                                .number()
                                .describe("A value on a y axis.")
                                // .default(null)
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
                    // .default(null)
                    .nullable()
                    .describe("A list of valuesMap objects.")
                    .default(null),
                reportDescriptors: z
                    .array(z
                    .object({
                    payloadType: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("Enumerated or private string signifying the nature of values."),
                    readingType: z
                        .string()
                        .describe("Enumerated or private string signifying the type of reading.")
                        // .default(null)
                        .nullable()
                        .describe("Enumerated or private string signifying the type of reading.")
                        .default(null),
                    units: z
                        .string()
                        .describe("Units of measure.")
                        // .default(null)
                        .nullable()
                        .describe("Units of measure.")
                        .default(null),
                    targets: z
                        .array(z
                        .object({
                        type: z
                            .string()
                            .min(1)
                            .max(128)
                            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                        values: z
                            .array(z.union([
                            z.number(),
                            z.number().int(),
                            z.string(),
                            z.boolean(),
                            z
                                .object({
                                x: z
                                    .number()
                                    .describe("A value on an x axis.")
                                    // .default(null)
                                    .nullable()
                                    .describe("A value on an x axis.")
                                    .default(null),
                                y: z
                                    .number()
                                    .describe("A value on a y axis.")
                                    // .default(null)
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
                        // .default(null)
                        .nullable()
                        .describe("A list of valuesMap objects.")
                        .default(null),
                    aggregate: z
                        .boolean()
                        .describe("True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n")
                        .default(false),
                    startInterval: z
                        .number()
                        .int()
                        .describe("The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n")
                        .default(-1),
                    numIntervals: z
                        .number()
                        .int()
                        .describe("The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n")
                        .default(-1),
                    historical: z
                        .boolean()
                        .describe("True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n")
                        .default(true),
                    frequency: z
                        .number()
                        .int()
                        .describe("Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n")
                        .default(-1),
                    repeat: z
                        .number()
                        .int()
                        .describe("Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n")
                        .default(1),
                })
                    .describe("An object that may be used to request a report from a VEN.\nSee OpenADR REST User Guide for detailed description of how configure a report request.\n"))
                    .describe("A list of reportDescriptor objects. Used to request reports from VEN.")
                    // .default(null)
                    .nullable()
                    .describe("A list of reportDescriptor objects. Used to request reports from VEN.")
                    .default(null),
                payloadDescriptors: z
                    .array(z
                    .object({
                    objectType: z
                        .string()
                        .describe("Used as discriminator, e.g. program.payloadDescriptors")
                        .default("EVENT_PAYLOAD_DESCRIPTOR"),
                    payloadType: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("Enumerated or private string signifying the nature of values."),
                    units: z
                        .string()
                        .describe("Units of measure.")
                        // .default(null)
                        .nullable()
                        .describe("Units of measure.")
                        .default(null),
                    currency: z
                        .string()
                        .describe("Currency of price payload.")
                        // .default(null)
                        .nullable()
                        .describe("Currency of price payload.")
                        .default(null),
                })
                    .describe("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"))
                    .describe("A list of payloadDescriptor objects.")
                    // .default(null)
                    .nullable()
                    .describe("A list of payloadDescriptor objects.")
                    .default(null),
                intervalPeriod: z
                    .object({
                    start: z
                        .string()
                        .datetime()
                        .describe("datetime in ISO 8601 format"),
                    duration: z
                        .string()
                        .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                        .describe("duration in ISO 8601 format")
                        .default("PT0S"),
                    randomizeStart: z
                        .string()
                        .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                        .describe("duration in ISO 8601 format")
                        .default("PT0S"),
                })
                    .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                    .optional(),
                intervals: z
                    .array(z
                    .object({
                    id: z
                        .number()
                        .int()
                        .describe("A client generated number assigned an interval object. Not a sequence number."),
                    intervalPeriod: z
                        .object({
                        start: z
                            .string()
                            .datetime()
                            .describe("datetime in ISO 8601 format"),
                        duration: z
                            .string()
                            .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                            .describe("duration in ISO 8601 format")
                            .default("PT0S"),
                        randomizeStart: z
                            .string()
                            .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
                            .describe("duration in ISO 8601 format")
                            .default("PT0S"),
                    })
                        .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n")
                        .optional(),
                    payloads: z
                        .array(z
                        .object({
                        type: z
                            .string()
                            .min(1)
                            .max(128)
                            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                        values: z
                            .array(z.union([
                            z.number(),
                            z.number().int(),
                            z.string(),
                            z.boolean(),
                            z
                                .object({
                                x: z
                                    .number()
                                    .describe("A value on an x axis.")
                                    // .default(null)
                                    .nullable()
                                    .describe("A value on an x axis.")
                                    .default(null),
                                y: z
                                    .number()
                                    .describe("A value on a y axis.")
                                    // .default(null)
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
            z
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
                    .optional(),
                modificationDateTime: z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .optional(),
                objectType: z
                    .literal("SUBSCRIPTION")
                    .describe("Used as discriminator, e.g. notification.object")
                    .optional(),
                clientName: z
                    .string()
                    .min(1)
                    .max(128)
                    .describe("User generated identifier, may be VEN identifier provisioned during program enrollment."),
                programID: z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID."),
                objectOperations: z
                    .array(z
                    .object({
                    objects: z
                        .array(z
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
                    operations: z
                        .array(z
                        .enum(["GET", "POST", "PUT", "DELETE"])
                        .describe("object operation to subscribe to."))
                        .describe("list of operations to subscribe to."),
                    callbackUrl: z
                        .string()
                        .url()
                        .describe("User provided webhook URL."),
                    bearerToken: z
                        .string()
                        .describe("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
                        // .default(null)
                        .nullable()
                        .describe("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
                        .default(null),
                })
                    .describe("object type, operations, and callbackUrl."))
                    .describe("list of objects and operations to subscribe to."),
                targets: z
                    .array(z
                    .object({
                    type: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: z
                        .array(z.union([
                        z.number(),
                        z.number().int(),
                        z.string(),
                        z.boolean(),
                        z
                            .object({
                            x: z
                                .number()
                                .describe("A value on an x axis.")
                                // .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: z
                                .number()
                                .describe("A value on a y axis.")
                                // .default(null)
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
                    // .default(null)
                    .nullable()
                    .describe("A list of valuesMap objects. Used by server to filter callbacks.")
                    .default(null),
            })
                .describe("An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n"),
            z
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
                    .optional(),
                modificationDateTime: z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .optional(),
                objectType: z
                    .literal("VEN")
                    .describe("Used as discriminator, e.g. notification.object.")
                    .optional(),
                venName: z
                    .string()
                    .min(1)
                    .max(128)
                    .describe("User generated identifier, may be VEN identifier provisioned during program enrollment."),
                attributes: z
                    .array(z
                    .object({
                    type: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: z
                        .array(z.union([
                        z.number(),
                        z.number().int(),
                        z.string(),
                        z.boolean(),
                        z
                            .object({
                            x: z
                                .number()
                                .describe("A value on an x axis.")
                                // .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: z
                                .number()
                                .describe("A value on a y axis.")
                                // .default(null)
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
                targets: z
                    .array(z
                    .object({
                    type: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: z
                        .array(z.union([
                        z.number(),
                        z.number().int(),
                        z.string(),
                        z.boolean(),
                        z
                            .object({
                            x: z
                                .number()
                                .describe("A value on an x axis.")
                                // .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: z
                                .number()
                                .describe("A value on a y axis.")
                                // .default(null)
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
                resources: z
                    .array(z
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
                        .optional(),
                    modificationDateTime: z
                        .string()
                        .datetime()
                        .describe("datetime in ISO 8601 format")
                        .optional(),
                    objectType: z
                        .literal("RESOURCE")
                        .describe("Used as discriminator, e.g. notification.object")
                        .optional(),
                    resourceName: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe("User generated identifier, resource may be configured with identifier out-of-band."),
                    venID: z
                        .string()
                        .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                        .min(1)
                        .max(128)
                        .describe("URL safe VTN assigned object ID.")
                        .optional(),
                    attributes: z
                        .array(z
                        .object({
                        type: z
                            .string()
                            .min(1)
                            .max(128)
                            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                        values: z
                            .array(z.union([
                            z.number(),
                            z.number().int(),
                            z.string(),
                            z.boolean(),
                            z
                                .object({
                                x: z
                                    .number()
                                    .describe("A value on an x axis.")
                                    // .default(null)
                                    .nullable()
                                    .describe("A value on an x axis.")
                                    .default(null),
                                y: z
                                    .number()
                                    .describe("A value on a y axis.")
                                    // .default(null)
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
                    targets: z
                        .array(z
                        .object({
                        type: z
                            .string()
                            .min(1)
                            .max(128)
                            .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                        values: z
                            .array(z.union([
                            z.number(),
                            z.number().int(),
                            z.string(),
                            z.boolean(),
                            z
                                .object({
                                x: z
                                    .number()
                                    .describe("A value on an x axis.")
                                    // .default(null)
                                    .nullable()
                                    .describe("A value on an x axis.")
                                    .default(null),
                                y: z
                                    .number()
                                    .describe("A value on a y axis.")
                                    // .default(null)
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
                    // .default(null)
                    .nullable()
                    .describe("A list of resource objects representing end-devices or systems.")
                    .default(null),
            })
                .describe("Ven represents a client with the ven role."),
            z
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
                    .optional(),
                modificationDateTime: z
                    .string()
                    .datetime()
                    .describe("datetime in ISO 8601 format")
                    .optional(),
                objectType: z
                    .literal("RESOURCE")
                    .describe("Used as discriminator, e.g. notification.object")
                    .optional(),
                resourceName: z
                    .string()
                    .min(1)
                    .max(128)
                    .describe("User generated identifier, resource may be configured with identifier out-of-band."),
                venID: z
                    .string()
                    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                    .min(1)
                    .max(128)
                    .describe("URL safe VTN assigned object ID.")
                    .optional(),
                attributes: z
                    .array(z
                    .object({
                    type: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: z
                        .array(z.union([
                        z.number(),
                        z.number().int(),
                        z.string(),
                        z.boolean(),
                        z
                            .object({
                            x: z
                                .number()
                                .describe("A value on an x axis.")
                                // .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: z
                                .number()
                                .describe("A value on a y axis.")
                                // .default(null)
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
                targets: z
                    .array(z
                    .object({
                    type: z
                        .string()
                        .min(1)
                        .max(128)
                        .describe('Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'),
                    values: z
                        .array(z.union([
                        z.number(),
                        z.number().int(),
                        z.string(),
                        z.boolean(),
                        z
                            .object({
                            x: z
                                .number()
                                .describe("A value on an x axis.")
                                // .default(null)
                                .nullable()
                                .describe("A value on an x axis.")
                                .default(null),
                            y: z
                                .number()
                                .describe("A value on a y axis.")
                                // .default(null)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLW5vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy96b2Qvem9kLW5vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXhCLGVBQWUsQ0FBQztLQUNiLE1BQU0sQ0FBQztJQUNOLFVBQVUsRUFBRSxDQUFDO1NBQ1YsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztTQUN2RSxRQUFRLENBQUMsMkNBQTJDLENBQUM7SUFDeEQsU0FBUyxFQUFFLENBQUM7U0FDVCxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN0QyxRQUFRLENBQUMsNkRBQTZELENBQUM7SUFDMUUsT0FBTyxFQUFFLENBQUM7U0FDUCxLQUFLLENBQ0osQ0FBQztTQUNFLE1BQU0sQ0FBQztRQUNOLElBQUksRUFBRSxDQUFDO2FBQ0osTUFBTSxFQUFFO2FBQ1IsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDUixRQUFRLENBQ1AsbUlBQW1JLENBQ3BJO1FBQ0gsTUFBTSxFQUFFLENBQUM7YUFDTixLQUFLLENBQ0osQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNOLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDVixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ2hCLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDVixDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ1gsQ0FBQztpQkFDRSxNQUFNLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUM7cUJBQ0QsTUFBTSxFQUFFO3FCQUNSLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDbEMsaUJBQWlCO3FCQUNoQixR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O3lCQUNqQixDQUFDOzZCQUNELFFBQVEsQ0FDUCxxRUFBcUUsQ0FDdEU7cUJBQ0osQ0FBQyxDQUNIO3lCQUNBLFFBQVEsQ0FDUCxxRUFBcUUsQ0FDdEU7aUJBQ0osQ0FBQztxQkFDRCxRQUFRLENBQ1AsOEdBQThHLENBQy9HLENBQ0o7cUJBQ0EsUUFBUSxDQUNQLHlEQUF5RCxDQUMxRDtxQkFDQSxRQUFRLEVBQUU7YUFDZCxDQUFDO2lCQUNELFFBQVEsQ0FDUCx5RUFBeUUsQ0FDMUU7U0FDSixDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FDM0IsQ0FBQyxNQUFvQixFQUFFLE1BQU0sRUFBRSxFQUFFLENBQy9CLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNWLE9BQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FDdkQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FDcEIsRUFDSCxFQUFFLENBQ0gsQ0FBQztRQUNGLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3pDLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsT0FBTyxFQUFFLDBDQUEwQzthQUNwRCxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQ0g7U0FDQSxRQUFRLENBQUMscURBQXFELENBQUM7Q0FDbkUsQ0FBQztLQUNELFFBQVEsQ0FDUCx5RUFBeUUsQ0FDMUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHpcbiAgLm9iamVjdCh7XG4gICAgb2JqZWN0VHlwZTogelxuICAgICAgLmVudW0oW1wiUFJPR1JBTVwiLCBcIkVWRU5UXCIsIFwiUkVQT1JUXCIsIFwiU1VCU0NSSVBUSU9OXCIsIFwiVkVOXCIsIFwiUkVTT1VSQ0VcIl0pXG4gICAgICAuZGVzY3JpYmUoXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKSxcbiAgICBvcGVyYXRpb246IHpcbiAgICAgIC5lbnVtKFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIl0pXG4gICAgICAuZGVzY3JpYmUoXCJ0aGUgb3BlcmF0aW9uIG9uIG9uIG9iamVjdCB0aGF0IHRyaWdnZXJlZCB0aGUgbm90aWZpY2F0aW9uLlwiKSxcbiAgICB0YXJnZXRzOiB6XG4gICAgICAuYXJyYXkoXG4gICAgICAgIHpcbiAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgIClcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgb2JqZWN0OiB6XG4gICAgICAucmVjb3JkKHouYW55KCkpXG4gICAgICAuYW5kKFxuICAgICAgICB6LmFueSgpLnN1cGVyUmVmaW5lKCh4LCBjdHgpID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFzID0gW1xuICAgICAgICAgICAgelxuICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBpZDogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogelxuICAgICAgICAgICAgICAgICAgLmxpdGVyYWwoXCJQUk9HUkFNXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbU5hbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJTaG9ydCBuYW1lIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHByb2dyYW0uXCIpLFxuICAgICAgICAgICAgICAgIHByb2dyYW1Mb25nTmFtZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJMb25nIG5hbWUgb2YgcHJvZ3JhbSBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCIpXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkxvbmcgbmFtZSBvZiBwcm9ncmFtIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgIHJldGFpbGVyTmFtZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiU2hvcnQgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgcHJvdmlkaW5nIHRoZSBwcm9ncmFtLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJTaG9ydCBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBwcm92aWRpbmcgdGhlIHByb2dyYW0uXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgIHJldGFpbGVyTG9uZ05hbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIkxvbmcgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJMb25nIG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbVR5cGU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBwcm9ncmFtIGRlZmluZWQgY2F0ZWdvcml6YXRpb24uXCIpXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgcHJvZ3JhbSBkZWZpbmVkIGNhdGVnb3JpemF0aW9uLlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgY291bnRyeTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBbHBoYS0yIGNvZGUgcGVyIElTTyAzMTY2LTEuXCIpXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkFscGhhLTIgY29kZSBwZXIgSVNPIDMxNjYtMS5cIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgIHByaW5jaXBhbFN1YmRpdmlzaW9uOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkNvZGluZyBwZXIgSVNPIDMxNjYtMi4gRS5nLiBzdGF0ZSBpbiBVUy5cIilcbiAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQ29kaW5nIHBlciBJU08gMzE2Ni0yLiBFLmcuIHN0YXRlIGluIFVTLlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgdGltZVpvbmVPZmZzZXQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgIFwiXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyRcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogelxuICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB6XG4gICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJeKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgcHJvZ3JhbURlc2NyaXB0aW9uczogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KHouYW55KCkpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcHJvZ3JhbURlc2NyaXB0aW9uc1wiKVxuICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcHJvZ3JhbURlc2NyaXB0aW9uc1wiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgYmluZGluZ0V2ZW50czogelxuICAgICAgICAgICAgICAgICAgLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVHJ1ZSBpZiBldmVudHMgYXJlIGZpeGVkIG9uY2UgdHJhbnNtaXR0ZWQuXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChmYWxzZSksXG4gICAgICAgICAgICAgICAgbG9jYWxQcmljZTogelxuICAgICAgICAgICAgICAgICAgLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlRydWUgaWYgZXZlbnRzIGhhdmUgYmVlbiBhZGFwdGVkIGZyb20gYSBncmlkIGV2ZW50LlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChmYWxzZSksXG4gICAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiB6XG4gICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0czogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRpbmdUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ3RlKDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmx0ZSgxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KDEwMCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJQcm92aWRlcyBwcm9ncmFtIHNwZWNpZmljIG1ldGFkYXRhIGZyb20gVlROIHRvIFZFTi5cIiksXG4gICAgICAgICAgICB6XG4gICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAubGl0ZXJhbChcIlJFUE9SVFwiKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIHByb2dyYW1JRDogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpLFxuICAgICAgICAgICAgICAgIGV2ZW50SUQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKSxcbiAgICAgICAgICAgICAgICBjbGllbnROYW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXI7IG1heSBiZSBWRU4gSUQgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICByZXBvcnROYW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IHpcbiAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkaW5nVHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3k6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZ3RlKDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5sdGUoMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoMTAwKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCByZXBvcnQgcGF5bG9hZCB2YWx1ZXMuXFxuRS5nLiBhIFVTQUdFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgdXNhZ2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGRhdGEgcXVhbGl0eS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcnMuXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHpcbiAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLiBBIHZhbHVlIG9mIEFHR1JFR0FURURfUkVQT1JUIGluZGljYXRlcyBhbiBhZ2dyZWdhdGlvbiBvZiBtb3JlIHRoYXQgb25lIHJlc291cmNlJ3MgZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFsczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGNsaWVudCBnZW5lcmF0ZWQgbnVtYmVyIGFzc2lnbmVkIGFuIGludGVydmFsIG9iamVjdC4gTm90IGEgc2VxdWVuY2UgbnVtYmVyLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiUmVwb3J0IGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgcmVzb3VyY2UuXCIpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIG9iamVjdHMgY29udGFpbmluZyByZXBvcnQgZGF0YSBmb3IgYSBzZXQgb2YgcmVzb3VyY2VzLlwiXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJyZXBvcnQgb2JqZWN0LlwiKSxcbiAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgIC5saXRlcmFsKFwiRVZFTlRcIilcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKSxcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZGVmaW5lZCBzdHJpbmcgZm9yIHVzZSBpbiBkZWJ1Z2dpbmcgb3IgVXNlciBJbnRlcmZhY2UuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZGVmaW5lZCBzdHJpbmcgZm9yIHVzZSBpbiBkZWJ1Z2dpbmcgb3IgVXNlciBJbnRlcmZhY2UuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiB6XG4gICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAgICAgLmd0ZSgwKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlJlbGF0aXZlIHByaW9yaXR5IG9mIGV2ZW50LiBBIGxvd2VyIG51bWJlciBpcyBhIGhpZ2hlciBwcmlvcml0eS5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiUmVsYXRpdmUgcHJpb3JpdHkgb2YgZXZlbnQuIEEgbG93ZXIgbnVtYmVyIGlzIGEgaGlnaGVyIHByaW9yaXR5LlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiB6XG4gICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgcmVwb3J0RGVzY3JpcHRvcnM6IHpcbiAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5ib29sZWFuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiByZXBvcnQgc2hvdWxkIGFnZ3JlZ2F0ZSByZXN1bHRzIGZyb20gYWxsIHRhcmdldGVkIHJlc291cmNlcy5cXG5GYWxzZSBpZiByZXBvcnQgaW5jbHVkZXMgcmVzdWx0cyBmb3IgZWFjaCByZXNvdXJjZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KGZhbHNlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SW50ZXJ2YWw6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGUgaW50ZXJ2YWwgb24gd2hpY2ggdG8gZ2VuZXJhdGUgYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIGdlbmVyYXRlIHJlcG9ydCBhdCBlbmQgb2YgbGFzdCBpbnRlcnZhbC5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KC0xKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bUludGVydmFsczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgtMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3JpY2FsOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5ib29sZWFuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHJ1ZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBwcmVjZWRpbmcgc3RhcnRJbnRlcnZhbC5cXG5GYWxzZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBmb2xsb3dpbmcgc3RhcnRJbnRlcnZhbCAoZS5nLiBmb3JlY2FzdCkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCh0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KC0xKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgcmVwb3J0LlxcbjEgaW5kaWNhdGVzIGdlbmVyYXRlIG9uZSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHJlcGVhdCBpbmRlZmluaXRlbHkuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdCgxKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQW4gb2JqZWN0IHRoYXQgbWF5IGJlIHVzZWQgdG8gcmVxdWVzdCBhIHJlcG9ydCBmcm9tIGEgVkVOLlxcblNlZSBPcGVuQURSIFJFU1QgVXNlciBHdWlkZSBmb3IgZGV0YWlsZWQgZGVzY3JpcHRpb24gb2YgaG93IGNvbmZpZ3VyZSBhIHJlcG9ydCByZXF1ZXN0LlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiByZXBvcnREZXNjcmlwdG9yIG9iamVjdHMuIFVzZWQgdG8gcmVxdWVzdCByZXBvcnRzIGZyb20gVkVOLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgcGF5bG9hZERlc2NyaXB0b3JzOiB6XG4gICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0czogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3Igb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogelxuICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB6XG4gICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJeKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWxzOiB6XG4gICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBjbGllbnQgZ2VuZXJhdGVkIG51bWJlciBhc3NpZ25lZCBhbiBpbnRlcnZhbCBvYmplY3QuIE5vdCBhIHNlcXVlbmNlIG51bWJlci5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxQZXJpb2Q6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJeKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIGludGVydmFsIG9iamVjdHMuXCIpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJFdmVudCBvYmplY3QgdG8gY29tbXVuaWNhdGUgYSBEZW1hbmQgUmVzcG9uc2UgcmVxdWVzdCB0byBWRU4uXFxuSWYgaW50ZXJ2YWxQZXJpb2QgaXMgcHJlc2VudCwgc2V0cyBzdGFydCB0aW1lIGFuZCBkdXJhdGlvbiBvZiBpbnRlcnZhbHMuXFxuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgIC5saXRlcmFsKFwiU1VCU0NSSVBUSU9OXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgY2xpZW50TmFtZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKSxcbiAgICAgICAgICAgICAgICBvYmplY3RPcGVyYXRpb25zOiB6XG4gICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbnVtKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwibGlzdCBvZiBvYmplY3RzIHRvIHN1YnNjcmliZSB0by5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25zOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZW51bShbXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwib2JqZWN0IG9wZXJhdGlvbiB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwibGlzdCBvZiBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja1VybDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnVybCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVzZXIgcHJvdmlkZWQgd2ViaG9vayBVUkwuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmVhcmVyVG9rZW46IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVzZXIgcHJvdmlkZWQgdG9rZW4uXFxuVG8gYXZvaWQgY3VzdG9tIGludGVncmF0aW9ucywgY2FsbGJhY2sgZW5kcG9pbnRzXFxuc2hvdWxkIGFjY2VwdCB0aGUgcHJvdmlkZWQgYmVhcmVyIHRva2VuIHRvIGF1dGhlbnRpY2F0ZSBWVE4gcmVxdWVzdHMuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJvYmplY3QgdHlwZSwgb3BlcmF0aW9ucywgYW5kIGNhbGxiYWNrVXJsLlwiKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIiksXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLiBVc2VkIGJ5IHNlcnZlciB0byBmaWx0ZXIgY2FsbGJhY2tzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuIFVzZWQgYnkgc2VydmVyIHRvIGZpbHRlciBjYWxsYmFja3MuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJBbiBvYmplY3QgY3JlYXRlZCBieSBhIGNsaWVudCB0byByZWNlaXZlIG5vdGlmaWNhdGlvbiBvZiBvcGVyYXRpb25zIG9uIG9iamVjdHMuXFxuQ2xpZW50cyBtYXkgc3Vic2NyaWJlIHRvIGJlIG5vdGlmaWVkIHdoZW4gYSB0eXBlIG9mIG9iamVjdCBpcyBjcmVhdGVkLFxcbnVwZGF0ZWQsIG9yIGRlbGV0ZWQuXFxuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgY3JlYXRlZERhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAgIC5saXRlcmFsKFwiVkVOXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdC5cIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIHZlbk5hbWU6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIGR1cmluZyBwcm9ncmFtIGVucm9sbG1lbnQuXCJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgdGFyZ2V0czogelxuICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHpcbiAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkRGF0ZVRpbWU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5saXRlcmFsKFwiUkVTT1VSQ0VcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCByZXNvdXJjZSBtYXkgYmUgY29uZmlndXJlZCB3aXRoIGlkZW50aWZpZXIgb3V0LW9mLWJhbmQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlbklEOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cyBkZXNjcmliaW5nIHRhcmdldCBjcml0ZXJpYS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgcmVzb3VyY2Ugb2JqZWN0cyByZXByZXNlbnRpbmcgZW5kLWRldmljZXMgb3Igc3lzdGVtcy5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIHJlc291cmNlIG9iamVjdHMgcmVwcmVzZW50aW5nIGVuZC1kZXZpY2VzIG9yIHN5c3RlbXMuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJWZW4gcmVwcmVzZW50cyBhIGNsaWVudCB3aXRoIHRoZSB2ZW4gcm9sZS5cIiksXG4gICAgICAgICAgICB6XG4gICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlVGltZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBtb2RpZmljYXRpb25EYXRlVGltZTogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgICAubGl0ZXJhbChcIlJFU09VUkNFXCIpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgLm9wdGlvbmFsKCksXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VOYW1lOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIHJlc291cmNlIG1heSBiZSBjb25maWd1cmVkIHdpdGggaWRlbnRpZmllciBvdXQtb2YtYmFuZC5cIlxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB2ZW5JRDogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB6XG4gICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyBhdHRyaWJ1dGVzLlwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiB6XG4gICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMgZGVzY3JpYmluZyB0YXJnZXQgY3JpdGVyaWEuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJBIHJlc291cmNlIGlzIGFuIGVuZXJneSBkZXZpY2Ugb3Igc3lzdGVtIHN1YmplY3QgdG8gY29udHJvbCBieSBhIFZFTi5cXG5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIF07XG4gICAgICAgICAgY29uc3QgZXJyb3JzID0gc2NoZW1hcy5yZWR1Y2UoXG4gICAgICAgICAgICAoZXJyb3JzOiB6LlpvZEVycm9yW10sIHNjaGVtYSkgPT5cbiAgICAgICAgICAgICAgKChyZXN1bHQpID0+XG4gICAgICAgICAgICAgICAgXCJlcnJvclwiIGluIHJlc3VsdCA/IFsuLi5lcnJvcnMsIHJlc3VsdC5lcnJvcl0gOiBlcnJvcnMpKFxuICAgICAgICAgICAgICAgIHNjaGVtYS5zYWZlUGFyc2UoeClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFtdXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoc2NoZW1hcy5sZW5ndGggLSBlcnJvcnMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICBjdHguYWRkSXNzdWUoe1xuICAgICAgICAgICAgICBwYXRoOiBjdHgucGF0aCxcbiAgICAgICAgICAgICAgY29kZTogXCJpbnZhbGlkX3VuaW9uXCIsXG4gICAgICAgICAgICAgIHVuaW9uRXJyb3JzOiBlcnJvcnMsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW52YWxpZCBpbnB1dDogU2hvdWxkIHBhc3Mgc2luZ2xlIHNjaGVtYVwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwidGhlIG9iamVjdCB0aGF0IGlzIHRoZSBzdWJqZWN0IG9mIHRoZSBub3RpZmljYXRpb24uXCIpLFxuICB9KVxuICAuZGVzY3JpYmUoXG4gICAgXCJWVE4gZ2VuZXJhdGVkIG9iamVjdCBpbmNsdWRlZCBpbiByZXF1ZXN0IHRvIHN1YnNjcmlwdGlvbiBjYWxsYmFja1VybC5cXG5cIlxuICApO1xuIl19