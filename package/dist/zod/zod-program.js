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
    .describe("Provides program specific metadata from VTN to VEN.");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXByb2dyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvem9kL3pvZC1wcm9ncmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQXdCO0FBRXhCLGtCQUFlLE9BQUM7S0FDYixNQUFNLENBQUM7SUFDTixFQUFFLEVBQUUsT0FBQztTQUNGLE1BQU0sRUFBRTtTQUNSLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsUUFBUSxDQUFDLGtDQUFrQyxDQUFDO1NBQzVDLFFBQVEsRUFBRTtJQUNiLGVBQWUsRUFBRSxPQUFDO1NBQ2YsTUFBTSxFQUFFO1NBQ1IsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLDZCQUE2QixDQUFDO1NBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDeEIsb0JBQW9CLEVBQUUsT0FBQztTQUNwQixNQUFNLEVBQUU7U0FDUixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsNkJBQTZCLENBQUM7U0FDdkMsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUN4QixVQUFVLEVBQUUsT0FBQztTQUNWLE9BQU8sQ0FBQyxTQUFTLENBQUM7U0FDbEIsUUFBUSxDQUFDLGlEQUFpRCxDQUFDO1NBQzNELFFBQVEsRUFBRTtJQUNiLFdBQVcsRUFBRSxPQUFDO1NBQ1gsTUFBTSxFQUFFO1NBQ1IsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQUMsMENBQTBDLENBQUM7SUFDdkQsZUFBZSxFQUFFLE9BQUM7U0FDZixNQUFNLEVBQUU7U0FDUixRQUFRLENBQUMsNkNBQTZDLENBQUM7U0FDdkQsT0FBTyxDQUFDLElBQUksQ0FBQztTQUNiLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyw2Q0FBNkMsQ0FBQztTQUN2RCxPQUFPLENBQUMs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IGZyb20gXCJ6b2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgelxuICAub2JqZWN0KHtcbiAgICBpZDogelxuICAgICAgLnN0cmluZygpXG4gICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAubWluKDEpXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICBjcmVhdGVkRGF0ZVRpbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRhdGV0aW1lKClcbiAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kYXRldGltZSgpXG4gICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgIC5kZWZhdWx0KFwiMDAwMC0wMC0wMFwiKSxcbiAgICBvYmplY3RUeXBlOiB6XG4gICAgICAubGl0ZXJhbChcIlBST0dSQU1cIilcbiAgICAgIC5kZXNjcmliZShcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICBwcm9ncmFtTmFtZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAubWluKDEpXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5kZXNjcmliZShcIlNob3J0IG5hbWUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgcHJvZ3JhbS5cIiksXG4gICAgcHJvZ3JhbUxvbmdOYW1lOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIkxvbmcgbmFtZSBvZiBwcm9ncmFtIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiTG9uZyBuYW1lIG9mIHByb2dyYW0gZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgcmV0YWlsZXJOYW1lOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIlNob3J0IG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIHByb3ZpZGluZyB0aGUgcHJvZ3JhbS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiU2hvcnQgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgcHJvdmlkaW5nIHRoZSBwcm9ncmFtLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgcmV0YWlsZXJMb25nTmFtZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGVzY3JpYmUoXCJMb25nIG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiTG9uZyBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICBwcm9ncmFtVHlwZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGVzY3JpYmUoXCJBIHByb2dyYW0gZGVmaW5lZCBjYXRlZ29yaXphdGlvbi5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQSBwcm9ncmFtIGRlZmluZWQgY2F0ZWdvcml6YXRpb24uXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICBjb3VudHJ5OiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIkFscGhhLTIgY29kZSBwZXIgSVNPIDMxNjYtMS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQWxwaGEtMiBjb2RlIHBlciBJU08gMzE2Ni0xLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgcHJpbmNpcGFsU3ViZGl2aXNpb246IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiQ29kaW5nIHBlciBJU08gMzE2Ni0yLiBFLmcuIHN0YXRlIGluIFVTLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJDb2RpbmcgcGVyIElTTyAzMTY2LTIuIEUuZy4gc3RhdGUgaW4gVVMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICB0aW1lWm9uZU9mZnNldDogelxuICAgICAgLnN0cmluZygpXG4gICAgICAucmVnZXgoXG4gICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgXCIvXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyQvXCJcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgaW50ZXJ2YWxQZXJpb2Q6IHpcbiAgICAgIC5vYmplY3Qoe1xuICAgICAgICBzdGFydDogelxuICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgIC5kYXRldGltZSgpXG4gICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgICAgICBkdXJhdGlvbjogelxuICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgcmFuZG9taXplU3RhcnQ6IHpcbiAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICBcIi9eKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JC9cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICB9KVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICApXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICBwcm9ncmFtRGVzY3JpcHRpb25zOiB6XG4gICAgICAuYXJyYXkoei5hbnkoKSlcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiBwcm9ncmFtRGVzY3JpcHRpb25zXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICBiaW5kaW5nRXZlbnRzOiB6XG4gICAgICAuYm9vbGVhbigpXG4gICAgICAuZGVzY3JpYmUoXCJUcnVlIGlmIGV2ZW50cyBhcmUgZml4ZWQgb25jZSB0cmFuc21pdHRlZC5cIilcbiAgICAgIC5kZWZhdWx0KGZhbHNlKSxcbiAgICBsb2NhbFByaWNlOiB6XG4gICAgICAuYm9vbGVhbigpXG4gICAgICAuZGVzY3JpYmUoXCJUcnVlIGlmIGV2ZW50cyBoYXZlIGJlZW4gYWRhcHRlZCBmcm9tIGEgZ3JpZCBldmVudC5cIilcbiAgICAgIC5kZWZhdWx0KGZhbHNlKSxcbiAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgelxuICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiRVZFTlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpLFxuICAgICAgICAgICAgICBwYXlsb2FkVHlwZTogelxuICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHVuaXRzOiB6XG4gICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgY3VycmVuY3k6IHpcbiAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiVVNEXCIpXG4gICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiVVNEXCIpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IGV2ZW50IHZhbHVlc01hcCB2YWx1ZXMuXFxuRS5nLiBhIFBSSUNFIHBheWxvYWQgc2ltcGx5IGNvbnRhaW5zIGEgcHJpY2UgdmFsdWUsIGFuXFxuYXNzb2NpYXRlZCBkZXNjcmlwdG9yIHByb3ZpZGVzIG5lY2Vzc2FyeSBjb250ZXh0IHN1Y2ggYXMgdW5pdHMgYW5kIGN1cnJlbmN5LlxcblwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgIHpcbiAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICBvYmplY3RUeXBlOiB6XG4gICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIiksXG4gICAgICAgICAgICAgIHBheWxvYWRUeXBlOiB6XG4gICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgcmVhZGluZ1R5cGU6IHpcbiAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiRElSRUNUX1JFQURcIilcbiAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJESVJFQ1RfUkVBRFwiKSxcbiAgICAgICAgICAgICAgdW5pdHM6IHpcbiAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiS1dIXCIpXG4gICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiS1dIXCIpLFxuICAgICAgICAgICAgICBhY2N1cmFjeTogelxuICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoMClcbiAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoMCksXG4gICAgICAgICAgICAgIGNvbmZpZGVuY2U6IHpcbiAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAuaW50KClcbiAgICAgICAgICAgICAgICAuZ3RlKDApXG4gICAgICAgICAgICAgICAgLmx0ZSgxMDApXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KDEwMCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCJcbiAgICAgICAgICAgICksXG4gICAgICAgIF0pXG4gICAgICApXG4gICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3JzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgdGFyZ2V0czogelxuICAgICAgLmFycmF5KFxuICAgICAgICB6XG4gICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICApXG4gICAgICApXG4gICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICB9KVxuICAuZGVzY3JpYmUoXCJQcm92aWRlcyBwcm9ncmFtIHNwZWNpZmljIG1ldGFkYXRhIGZyb20gVlROIHRvIFZFTi5cIik7XG4iXX0=