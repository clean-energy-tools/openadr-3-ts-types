"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
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
    .describe("Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets start time and duration of intervals.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3pvZC96b2QtZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBd0I7QUFFeEIsa0JBQWUsT0FBQztLQUNiLE1BQU0sQ0FBQztJQUNOLEVBQUUsRUFBRSxPQUFDO1NBQ0YsTUFBTSxFQUFFO1NBQ1IsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQUMsa0NBQWtDLENBQUM7U0FDNUMsUUFBUSxFQUFFO0lBQ2IsZUFBZSxFQUFFLE9BQUM7U0FDZixNQUFNLEVBQUU7U0FDUixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsNkJBQTZCLENBQUM7U0FDdkMsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUN4QixvQkFBb0IsRUFBRSxPQUFDO1NBQ3BCLE1BQU0sRUFBRTtTQUNSLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztTQUN2QyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQ3hCLFVBQVUsRUFBRSxPQUFDO1NBQ1YsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNoQixRQUFRLENBQUMsaURBQWlELENBQUM7U0FDM0QsUUFBUSxFQUFFO0lBQ2IsU0FBUyxFQUFFLE9BQUM7U0FDVCxNQUFNLEVBQUU7U0FDUixLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQztJQUMvQyxTQUFTLEVBQUUsT0FBQztTQUNULE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyw2REFBNkQsQ0FBQztTQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ2IsUUFBUSxFQUFFO1NB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LE9BQUM7aUJBQ04sS0FBSyxDQUNKLE9BQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ04sT0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDVixPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO2dCQUNoQixPQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNWLE9BQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ1gsT0FBQztxQkFDRSxNQUFNLENBQUM7b0JBQ04sQ0FBQyxFQUFFLE9BQUM7eUJBQ0QsTUFBTSxFQUFFO3lCQUNSLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQzt5QkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQzt5QkFDYixRQUFRLEVBQUU7eUJBQ1YsUUFBUSxDQUFDLHVCQUF1QixDQUFDO3lCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNoQixDQUFDLEVBQUUsT0FBQzt5QkFDRCxNQUFNLEVBQUU7eUJBQ1IsUUFBUSxDQUFDLHNCQUFzQixDQUFDO3lCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDO3lCQUNiLFFBQVEsRUFBRTt5QkFDVixRQUFRLENBQUMsc0JBQXNCLENBQUM7eUJBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQ2pCLENBQUM7cUJBQ0QsUUFBUSxDQUNQLHFFQUFxRSxDQUN0RTthQUNKLENBQUMsQ0FDSDtpQkFDQSxRQUFRLENBQ1AscUVBQXFFLENBQ3RFO1NBQ0osQ0FBQzthQUNELFFBQVEsQ0FDUCw4R0FBOEcsQ0FDL0csQ0FDSjthQUNBLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQztLQUM1QyxDQUFDO1NBQ0QsUUFBUSxDQUNQLG9LQUFvSyxDQUNySyxDQUNKO1NBQ0EsUUFBUSxDQUFDLDZCQUE2QixDQUFDO0NBQzNDLENBQUM7S0FDRCxRQUFRLENBQ1AsMklBQTJJLENBQzVJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5vYmplY3Qoe1xuICAgIGlkOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIGNyZWF0ZWREYXRlVGltZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGF0ZXRpbWUoKVxuICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRhdGV0aW1lKClcbiAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgIG9iamVjdFR5cGU6IHpcbiAgICAgIC5saXRlcmFsKFwiRVZFTlRcIilcbiAgICAgIC5kZXNjcmliZShcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICBwcm9ncmFtSUQ6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgLm1pbigxKVxuICAgICAgLm1heCgxMjgpXG4gICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKSxcbiAgICBldmVudE5hbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIHByaW9yaXR5OiB6XG4gICAgICAubnVtYmVyKClcbiAgICAgIC5pbnQoKVxuICAgICAgLmd0ZSgwKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIlJlbGF0aXZlIHByaW9yaXR5IG9mIGV2ZW50LiBBIGxvd2VyIG51bWJlciBpcyBhIGhpZ2hlciBwcmlvcml0eS5cIlxuICAgICAgKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiUmVsYXRpdmUgcHJpb3JpdHkgb2YgZXZlbnQuIEEgbG93ZXIgbnVtYmVyIGlzIGEgaGlnaGVyIHByaW9yaXR5LlwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICB0YXJnZXRzOiB6XG4gICAgICAuYXJyYXkoXG4gICAgICAgIHpcbiAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgIClcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgcmVwb3J0RGVzY3JpcHRvcnM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgelxuICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgcGF5bG9hZFR5cGU6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgcmVhZGluZ1R5cGU6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgIHVuaXRzOiB6XG4gICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgIHRhcmdldHM6IHpcbiAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgYWdncmVnYXRlOiB6XG4gICAgICAgICAgICAgIC5ib29sZWFuKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiVHJ1ZSBpZiByZXBvcnQgc2hvdWxkIGFnZ3JlZ2F0ZSByZXN1bHRzIGZyb20gYWxsIHRhcmdldGVkIHJlc291cmNlcy5cXG5GYWxzZSBpZiByZXBvcnQgaW5jbHVkZXMgcmVzdWx0cyBmb3IgZWFjaCByZXNvdXJjZS5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZWZhdWx0KGZhbHNlKSxcbiAgICAgICAgICAgIHN0YXJ0SW50ZXJ2YWw6IHpcbiAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJUaGUgaW50ZXJ2YWwgb24gd2hpY2ggdG8gZ2VuZXJhdGUgYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIGdlbmVyYXRlIHJlcG9ydCBhdCBlbmQgb2YgbGFzdCBpbnRlcnZhbC5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZWZhdWx0KC0xKSxcbiAgICAgICAgICAgIG51bUludGVydmFsczogelxuICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVmYXVsdCgtMSksXG4gICAgICAgICAgICBoaXN0b3JpY2FsOiB6XG4gICAgICAgICAgICAgIC5ib29sZWFuKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiVHJ1ZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBwcmVjZWRpbmcgc3RhcnRJbnRlcnZhbC5cXG5GYWxzZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBmb2xsb3dpbmcgc3RhcnRJbnRlcnZhbCAoZS5nLiBmb3JlY2FzdCkuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVmYXVsdCh0cnVlKSxcbiAgICAgICAgICAgIGZyZXF1ZW5jeTogelxuICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZWZhdWx0KC0xKSxcbiAgICAgICAgICAgIHJlcGVhdDogelxuICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIk51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgcmVwb3J0LlxcbjEgaW5kaWNhdGVzIGdlbmVyYXRlIG9uZSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHJlcGVhdCBpbmRlZmluaXRlbHkuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVmYXVsdCgxKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgIFwiQW4gb2JqZWN0IHRoYXQgbWF5IGJlIHVzZWQgdG8gcmVxdWVzdCBhIHJlcG9ydCBmcm9tIGEgVkVOLlxcblNlZSBPcGVuQURSIFJFU1QgVXNlciBHdWlkZSBmb3IgZGV0YWlsZWQgZGVzY3JpcHRpb24gb2YgaG93IGNvbmZpZ3VyZSBhIHJlcG9ydCByZXF1ZXN0LlxcblwiXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkEgbGlzdCBvZiByZXBvcnREZXNjcmlwdG9yIG9iamVjdHMuIFVzZWQgdG8gcmVxdWVzdCByZXBvcnRzIGZyb20gVkVOLlwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJBIGxpc3Qgb2YgcmVwb3J0RGVzY3JpcHRvciBvYmplY3RzLiBVc2VkIHRvIHJlcXVlc3QgcmVwb3J0cyBmcm9tIFZFTi5cIlxuICAgICAgKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgcGF5bG9hZERlc2NyaXB0b3JzOiB6XG4gICAgICAuYXJyYXkoXG4gICAgICAgIHpcbiAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIiksXG4gICAgICAgICAgICBwYXlsb2FkVHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB1bml0czogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICBjdXJyZW5jeTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgLmRlZmF1bHQoXCJVU0RcIilcbiAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQ3VycmVuY3kgb2YgcHJpY2UgcGF5bG9hZC5cIilcbiAgICAgICAgICAgICAgLmRlZmF1bHQoXCJVU0RcIiksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICApXG4gICAgICApXG4gICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3Igb2JqZWN0cy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9yIG9iamVjdHMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICBpbnRlcnZhbFBlcmlvZDogelxuICAgICAgLm9iamVjdCh7XG4gICAgICAgIHN0YXJ0OiB6XG4gICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgLmRhdGV0aW1lKClcbiAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgICAgIGR1cmF0aW9uOiB6XG4gICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgXCIvXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyQvXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgICByYW5kb21pemVTdGFydDogelxuICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgIH0pXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgIClcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIGludGVydmFsczogelxuICAgICAgLmFycmF5KFxuICAgICAgICB6XG4gICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICBpZDogelxuICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGludGVydmFsUGVyaW9kOiB6XG4gICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiMDAwMC0wMC0wMFwiKSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICAgXCIvXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyQvXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5vcHRpb25hbCgpLFxuICAgICAgICAgICAgcGF5bG9hZHM6IHpcbiAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICAgICAgICAgIClcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiBpbnRlcnZhbCBvYmplY3RzLlwiKSxcbiAgfSlcbiAgLmRlc2NyaWJlKFxuICAgIFwiRXZlbnQgb2JqZWN0IHRvIGNvbW11bmljYXRlIGEgRGVtYW5kIFJlc3BvbnNlIHJlcXVlc3QgdG8gVkVOLlxcbklmIGludGVydmFsUGVyaW9kIGlzIHByZXNlbnQsIHNldHMgc3RhcnQgdGltZSBhbmQgZHVyYXRpb24gb2YgaW50ZXJ2YWxzLlxcblwiXG4gICk7XG4iXX0=