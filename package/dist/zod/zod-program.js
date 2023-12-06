import { z } from "zod";
export default z
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
        .default(null)
        .nullable()
        .describe("Long name of program for human readability.")
        .default(null),
    retailerName: z
        .string()
        .describe("Short name of energy retailer providing the program.")
        .default(null)
        .nullable()
        .describe("Short name of energy retailer providing the program.")
        .default(null),
    retailerLongName: z
        .string()
        .describe("Long name of energy retailer for human readability.")
        .default(null)
        .nullable()
        .describe("Long name of energy retailer for human readability.")
        .default(null),
    programType: z
        .string()
        .describe("A program defined categorization.")
        .default(null)
        .nullable()
        .describe("A program defined categorization.")
        .default(null),
    country: z
        .string()
        .describe("Alpha-2 code per ISO 3166-1.")
        .default(null)
        .nullable()
        .describe("Alpha-2 code per ISO 3166-1.")
        .default(null),
    principalSubdivision: z
        .string()
        .describe("Coding per ISO 3166-2. E.g. state in US.")
        .default(null)
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
        start: z.string().datetime().describe("datetime in ISO 8601 format"),
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
        .default(null)
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
                .default(null)
                .nullable()
                .describe("Units of measure.")
                .default(null),
            currency: z
                .string()
                .describe("Currency of price payload.")
                .default(null)
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
                .default(null)
                .nullable()
                .describe("Enumerated or private string signifying the type of reading.")
                .default(null),
            units: z
                .string()
                .describe("Units of measure.")
                .default(null)
                .nullable()
                .describe("Units of measure.")
                .default(null),
            accuracy: z
                .number()
                .describe("A quantification of the accuracy of a set of payload values.")
                .default(null)
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
        .default(null)
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
                    .default(null)
                    .nullable()
                    .describe("A value on an x axis.")
                    .default(null),
                y: z
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXByb2dyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvem9kL3pvZC1wcm9ncmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFeEIsZUFBZSxDQUFDO0tBQ2IsTUFBTSxDQUFDO0lBQ04sRUFBRSxFQUFFLENBQUM7U0FDRixNQUFNLEVBQUU7U0FDUixLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQztTQUM1QyxRQUFRLEVBQUU7SUFDYixlQUFlLEVBQUUsQ0FBQztTQUNmLE1BQU0sRUFBRTtTQUNSLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztTQUN2QyxRQUFRLEVBQUU7SUFDYixvQkFBb0IsRUFBRSxDQUFDO1NBQ3BCLE1BQU0sRUFBRTtTQUNSLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztTQUN2QyxRQUFRLEVBQUU7SUFDYixVQUFVLEVBQUUsQ0FBQztTQUNWLE9BQU8sQ0FBQyxTQUFTLENBQUM7U0FDbEIsUUFBUSxDQUFDLGlEQUFpRCxDQUFDO1NBQzNELFFBQVEsRUFBRTtJQUNiLFdBQVcsRUFBRSxDQUFDO1NBQ1gsTUFBTSxFQUFFO1NBQ1IsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQUMsMENBQTBDLENBQUM7SUFDdkQsZUFBZSxFQUFFLENBQUM7U0FDZixNQUFNLEVBQUU7U0FDUixRQUFRLENBQUMsNkNBQTZDLENBQUM7U0FDdkQsT0FBTyxDQUFDLElBQUksQ0FBQztTQUNiLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyw2Q0FBNkMsQ0FBQztTQUN2RCxPQUFPLENB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dCBkZWZhdWx0IHpcbiAgLm9iamVjdCh7XG4gICAgaWQ6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgLm1pbigxKVxuICAgICAgLm1heCgxMjgpXG4gICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKVxuICAgICAgLm9wdGlvbmFsKCksXG4gICAgY3JlYXRlZERhdGVUaW1lOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kYXRldGltZSgpXG4gICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIG1vZGlmaWNhdGlvbkRhdGVUaW1lOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kYXRldGltZSgpXG4gICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIG9iamVjdFR5cGU6IHpcbiAgICAgIC5saXRlcmFsKFwiUFJPR1JBTVwiKVxuICAgICAgLmRlc2NyaWJlKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIHByb2dyYW1OYW1lOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFwiU2hvcnQgbmFtZSB0byB1bmlxdWVseSBpZGVudGlmeSBwcm9ncmFtLlwiKSxcbiAgICBwcm9ncmFtTG9uZ05hbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiTG9uZyBuYW1lIG9mIHByb2dyYW0gZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJMb25nIG5hbWUgb2YgcHJvZ3JhbSBmb3IgaHVtYW4gcmVhZGFiaWxpdHkuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICByZXRhaWxlck5hbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiU2hvcnQgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgcHJvdmlkaW5nIHRoZSBwcm9ncmFtLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJTaG9ydCBuYW1lIG9mIGVuZXJneSByZXRhaWxlciBwcm92aWRpbmcgdGhlIHByb2dyYW0uXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICByZXRhaWxlckxvbmdOYW1lOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIkxvbmcgbmFtZSBvZiBlbmVyZ3kgcmV0YWlsZXIgZm9yIGh1bWFuIHJlYWRhYmlsaXR5LlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJMb25nIG5hbWUgb2YgZW5lcmd5IHJldGFpbGVyIGZvciBodW1hbiByZWFkYWJpbGl0eS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIHByb2dyYW1UeXBlOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIkEgcHJvZ3JhbSBkZWZpbmVkIGNhdGVnb3JpemF0aW9uLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJBIHByb2dyYW0gZGVmaW5lZCBjYXRlZ29yaXphdGlvbi5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIGNvdW50cnk6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiQWxwaGEtMiBjb2RlIHBlciBJU08gMzE2Ni0xLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJBbHBoYS0yIGNvZGUgcGVyIElTTyAzMTY2LTEuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICBwcmluY2lwYWxTdWJkaXZpc2lvbjogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGVzY3JpYmUoXCJDb2RpbmcgcGVyIElTTyAzMTY2LTIuIEUuZy4gc3RhdGUgaW4gVVMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIkNvZGluZyBwZXIgSVNPIDMxNjYtMi4gRS5nLiBzdGF0ZSBpbiBVUy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIHRpbWVab25lT2Zmc2V0OiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5yZWdleChcbiAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgaW50ZXJ2YWxQZXJpb2Q6IHpcbiAgICAgIC5vYmplY3Qoe1xuICAgICAgICBzdGFydDogei5zdHJpbmcoKS5kYXRldGltZSgpLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgICBkdXJhdGlvbjogelxuICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgIFwiXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyRcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiB6XG4gICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgXCJeKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgIH0pXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgIClcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIHByb2dyYW1EZXNjcmlwdGlvbnM6IHpcbiAgICAgIC5hcnJheSh6LmFueSgpKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHByb2dyYW1EZXNjcmlwdGlvbnNcIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHByb2dyYW1EZXNjcmlwdGlvbnNcIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIGJpbmRpbmdFdmVudHM6IHpcbiAgICAgIC5ib29sZWFuKClcbiAgICAgIC5kZXNjcmliZShcIlRydWUgaWYgZXZlbnRzIGFyZSBmaXhlZCBvbmNlIHRyYW5zbWl0dGVkLlwiKVxuICAgICAgLmRlZmF1bHQoZmFsc2UpLFxuICAgIGxvY2FsUHJpY2U6IHpcbiAgICAgIC5ib29sZWFuKClcbiAgICAgIC5kZXNjcmliZShcIlRydWUgaWYgZXZlbnRzIGhhdmUgYmVlbiBhZGFwdGVkIGZyb20gYSBncmlkIGV2ZW50LlwiKVxuICAgICAgLmRlZmF1bHQoZmFsc2UpLFxuICAgIHBheWxvYWREZXNjcmlwdG9yczogelxuICAgICAgLmFycmF5KFxuICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICB6XG4gICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgb2JqZWN0VHlwZTogelxuICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQoXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIiksXG4gICAgICAgICAgICAgIHBheWxvYWRUeXBlOiB6XG4gICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgdW5pdHM6IHpcbiAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICBjdXJyZW5jeTogelxuICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgelxuICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgIG9iamVjdFR5cGU6IHpcbiAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICBcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKSxcbiAgICAgICAgICAgICAgcGF5bG9hZFR5cGU6IHpcbiAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICByZWFkaW5nVHlwZTogelxuICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgIHVuaXRzOiB6XG4gICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgYWNjdXJhY3k6IHpcbiAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICBcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICBjb25maWRlbmNlOiB6XG4gICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgICAgLmd0ZSgwKVxuICAgICAgICAgICAgICAgIC5sdGUoMTAwKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgIFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgY29uZmlkZW5jZSBpbiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZGVmYXVsdCgxMDApLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICAgICAgICAgICApLFxuICAgICAgICBdKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHBheWxvYWREZXNjcmlwdG9ycy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIHRhcmdldHM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgelxuICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgfSlcbiAgLmRlc2NyaWJlKFwiUHJvdmlkZXMgcHJvZ3JhbSBzcGVjaWZpYyBtZXRhZGF0YSBmcm9tIFZUTiB0byBWRU4uXCIpO1xuIl19