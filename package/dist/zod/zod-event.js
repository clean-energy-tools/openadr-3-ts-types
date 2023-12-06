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
        .default(null)
        .nullable()
        .describe("User defined string for use in debugging or User Interface.")
        .default(null),
    priority: z
        .number()
        .int()
        .gte(0)
        .describe("Relative priority of event. A lower number is a higher priority.")
        .default(null)
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
        .default(null)
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
        .describe("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"))
        .describe("A list of payloadDescriptor objects.")
        .default(null)
        .nullable()
        .describe("A list of payloadDescriptor objects.")
        .default(null),
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
            .describe("A list of valuesMap objects."),
    })
        .describe("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"))
        .describe("A list of interval objects."),
})
    .describe("Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets start time and duration of intervals.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUV4QixlQUFlLENBQUM7S0FDYixNQUFNLENBQUM7SUFDTixFQUFFLEVBQUUsQ0FBQztTQUNGLE1BQU0sRUFBRTtTQUNSLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsUUFBUSxDQUFDLGtDQUFrQyxDQUFDO1NBQzVDLFFBQVEsRUFBRTtJQUNiLGVBQWUsRUFBRSxDQUFDO1NBQ2YsTUFBTSxFQUFFO1NBQ1IsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLDZCQUE2QixDQUFDO1NBQ3ZDLFFBQVEsRUFBRTtJQUNiLG9CQUFvQixFQUFFLENBQUM7U0FDcEIsTUFBTSxFQUFFO1NBQ1IsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLDZCQUE2QixDQUFDO1NBQ3ZDLFFBQVEsRUFBRTtJQUNiLFVBQVUsRUFBRSxDQUFDO1NBQ1YsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNoQixRQUFRLENBQUMsaURBQWlELENBQUM7U0FDM0QsUUFBUSxFQUFFO0lBQ2IsU0FBUyxFQUFFLENBQUM7U0FDVCxNQUFNLEVBQUU7U0FDUixLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQztJQUMvQyxTQUFTLEVBQUUsQ0FBQztTQUNULE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyw2REFBNkQsQ0FBQztTQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ2IsUUFBUSxF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LENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ1YsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtnQkFDaEIsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDVixDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUNYLENBQUM7cUJBQ0UsTUFBTSxDQUFDO29CQUNOLENBQUMsRUFBRSxDQUFDO3lCQUNELE1BQU0sRUFBRTt5QkFDUixRQUFRLENBQUMsdUJBQXVCLENBQUM7eUJBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUM7eUJBQ2IsUUFBUSxFQUFFO3lCQUNWLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQzt5QkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDaEIsQ0FBQyxFQUFFLENBQUM7eUJBQ0QsTUFBTSxFQUFFO3lCQUNSLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQzt5QkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQzt5QkFDYixRQUFRLEVBQUU7eUJBQ1YsUUFBUSxDQUFDLHNCQUFzQixDQUFDO3lCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUNqQixDQUFDO3FCQUNELFFBQVEsQ0FDUCxxRUFBcUUsQ0FDdEU7YUFDSixDQUFDLENBQ0g7aUJBQ0EsUUFBUSxDQUNQLHFFQUFxRSxDQUN0RTtTQUNKLENBQUM7YUFDRCxRQUFRLENBQ1AsOEdBQThHLENBQy9HLENBQ0o7YUFDQSxRQUFRLENBQUMsOEJBQThCLENBQUM7S0FDNUMsQ0FBQztTQUNELFFBQVEsQ0FDUCxvS0FBb0ssQ0FDckssQ0FDSjtTQUNBLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztDQUMzQyxDQUFDO0tBQ0QsUUFBUSxDQUNQLDJJQUEySSxDQUM1SSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgelxuICAub2JqZWN0KHtcbiAgICBpZDogelxuICAgICAgLnN0cmluZygpXG4gICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAubWluKDEpXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICBjcmVhdGVkRGF0ZVRpbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRhdGV0aW1lKClcbiAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLm9wdGlvbmFsKCksXG4gICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRhdGV0aW1lKClcbiAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLm9wdGlvbmFsKCksXG4gICAgb2JqZWN0VHlwZTogelxuICAgICAgLmxpdGVyYWwoXCJFVkVOVFwiKVxuICAgICAgLmRlc2NyaWJlKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIHByb2dyYW1JRDogelxuICAgICAgLnN0cmluZygpXG4gICAgICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gICAgICAubWluKDEpXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpLFxuICAgIGV2ZW50TmFtZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGVzY3JpYmUoXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJVc2VyIGRlZmluZWQgc3RyaW5nIGZvciB1c2UgaW4gZGVidWdnaW5nIG9yIFVzZXIgSW50ZXJmYWNlLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgcHJpb3JpdHk6IHpcbiAgICAgIC5udW1iZXIoKVxuICAgICAgLmludCgpXG4gICAgICAuZ3RlKDApXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiUmVsYXRpdmUgcHJpb3JpdHkgb2YgZXZlbnQuIEEgbG93ZXIgbnVtYmVyIGlzIGEgaGlnaGVyIHByaW9yaXR5LlwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJSZWxhdGl2ZSBwcmlvcml0eSBvZiBldmVudC4gQSBsb3dlciBudW1iZXIgaXMgYSBoaWdoZXIgcHJpb3JpdHkuXCJcbiAgICAgIClcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIHRhcmdldHM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgelxuICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICByZXBvcnREZXNjcmlwdG9yczogelxuICAgICAgLmFycmF5KFxuICAgICAgICB6XG4gICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICBwYXlsb2FkVHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICByZWFkaW5nVHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgdW5pdHM6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgdGFyZ2V0czogelxuICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICBhZ2dyZWdhdGU6IHpcbiAgICAgICAgICAgICAgLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJUcnVlIGlmIHJlcG9ydCBzaG91bGQgYWdncmVnYXRlIHJlc3VsdHMgZnJvbSBhbGwgdGFyZ2V0ZWQgcmVzb3VyY2VzLlxcbkZhbHNlIGlmIHJlcG9ydCBpbmNsdWRlcyByZXN1bHRzIGZvciBlYWNoIHJlc291cmNlLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoZmFsc2UpLFxuICAgICAgICAgICAgc3RhcnRJbnRlcnZhbDogelxuICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgLmludCgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIlRoZSBpbnRlcnZhbCBvbiB3aGljaCB0byBnZW5lcmF0ZSBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgcmVwb3J0IGF0IGVuZCBvZiBsYXN0IGludGVydmFsLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpLFxuICAgICAgICAgICAgbnVtSW50ZXJ2YWxzOiB6XG4gICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAuaW50KClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiVGhlIG51bWJlciBvZiBpbnRlcnZhbHMgdG8gaW5jbHVkZSBpbiBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgdGhhdCBhbGwgaW50ZXJ2YWxzIGFyZSB0byBiZSBpbmNsdWRlZC5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZWZhdWx0KC0xKSxcbiAgICAgICAgICAgIGhpc3RvcmljYWw6IHpcbiAgICAgICAgICAgICAgLmJvb2xlYW4oKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJUcnVlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIHByZWNlZGluZyBzdGFydEludGVydmFsLlxcbkZhbHNlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIGZvbGxvd2luZyBzdGFydEludGVydmFsIChlLmcuIGZvcmVjYXN0KS5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZWZhdWx0KHRydWUpLFxuICAgICAgICAgICAgZnJlcXVlbmN5OiB6XG4gICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAuaW50KClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiTnVtYmVyIG9mIGludGVydmFscyB0aGF0IGVsYXBzZSBiZXR3ZWVuIHJlcG9ydHMuXFxuLTEgaW5kaWNhdGVzIHNhbWUgYXMgbnVtSW50ZXJ2YWxzLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlZmF1bHQoLTEpLFxuICAgICAgICAgICAgcmVwZWF0OiB6XG4gICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAuaW50KClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiTnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCByZXBvcnQuXFxuMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgb25lIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgcmVwZWF0IGluZGVmaW5pdGVseS5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZWZhdWx0KDEpLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgXCJBbiBvYmplY3QgdGhhdCBtYXkgYmUgdXNlZCB0byByZXF1ZXN0IGEgcmVwb3J0IGZyb20gYSBWRU4uXFxuU2VlIE9wZW5BRFIgUkVTVCBVc2VyIEd1aWRlIGZvciBkZXRhaWxlZCBkZXNjcmlwdGlvbiBvZiBob3cgY29uZmlndXJlIGEgcmVwb3J0IHJlcXVlc3QuXFxuXCJcbiAgICAgICAgICApXG4gICAgICApXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiQSBsaXN0IG9mIHJlcG9ydERlc2NyaXB0b3Igb2JqZWN0cy4gVXNlZCB0byByZXF1ZXN0IHJlcG9ydHMgZnJvbSBWRU4uXCJcbiAgICAgIClcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkEgbGlzdCBvZiByZXBvcnREZXNjcmlwdG9yIG9iamVjdHMuIFVzZWQgdG8gcmVxdWVzdCByZXBvcnRzIGZyb20gVkVOLlwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICBwYXlsb2FkRGVzY3JpcHRvcnM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgelxuICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgb2JqZWN0VHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVmYXVsdChcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKSxcbiAgICAgICAgICAgIHBheWxvYWRUeXBlOiB6XG4gICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHVuaXRzOiB6XG4gICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgIGN1cnJlbmN5OiB6XG4gICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICAgICAgICAgIClcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiBwYXlsb2FkRGVzY3JpcHRvciBvYmplY3RzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgcGF5bG9hZERlc2NyaXB0b3Igb2JqZWN0cy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIGludGVydmFsUGVyaW9kOiB6XG4gICAgICAub2JqZWN0KHtcbiAgICAgICAgc3RhcnQ6IHouc3RyaW5nKCkuZGF0ZXRpbWUoKS5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICAgICAgZHVyYXRpb246IHpcbiAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgICByYW5kb21pemVTdGFydDogelxuICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgIFwiXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyRcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICB9KVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICAgICApXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICBpbnRlcnZhbHM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgelxuICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgaWQ6IHpcbiAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgIC5pbnQoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJBIGNsaWVudCBnZW5lcmF0ZWQgbnVtYmVyIGFzc2lnbmVkIGFuIGludGVydmFsIG9iamVjdC4gTm90IGEgc2VxdWVuY2UgbnVtYmVyLlwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICBpbnRlcnZhbFBlcmlvZDogelxuICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICBzdGFydDogelxuICAgICAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB6XG4gICAgICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgICAgICAgICAgcmFuZG9taXplU3RhcnQ6IHpcbiAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgIFwiXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyRcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAub3B0aW9uYWwoKSxcbiAgICAgICAgICAgIHBheWxvYWRzOiB6XG4gICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIiksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgICAgICAgICApXG4gICAgICApXG4gICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgaW50ZXJ2YWwgb2JqZWN0cy5cIiksXG4gIH0pXG4gIC5kZXNjcmliZShcbiAgICBcIkV2ZW50IG9iamVjdCB0byBjb21tdW5pY2F0ZSBhIERlbWFuZCBSZXNwb25zZSByZXF1ZXN0IHRvIFZFTi5cXG5JZiBpbnRlcnZhbFBlcmlvZCBpcyBwcmVzZW50LCBzZXRzIHN0YXJ0IHRpbWUgYW5kIGR1cmF0aW9uIG9mIGludGVydmFscy5cXG5cIlxuICApO1xuIl19