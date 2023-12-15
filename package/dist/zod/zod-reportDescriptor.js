import { z } from "zod";
export default z
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
    .describe("An object that may be used to request a report from a VEN.\nSee OpenADR REST User Guide for detailed description of how configure a report request.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXJlcG9ydERlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvem9kL3pvZC1yZXBvcnREZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFeEIsZUFBZSxDQUFDO0tBQ2IsTUFBTSxDQUFDO0lBQ04sV0FBVyxFQUFFLENBQUM7U0FDWCxNQUFNLEVBQUU7U0FDUixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLFFBQVEsQ0FDUCwrREFBK0QsQ0FDaEU7SUFDSCxXQUFXLEVBQUUsQ0FBQztTQUNYLE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyw4REFBOEQsQ0FBQztRQUN6RSxpQkFBaUI7U0FDaEIsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLDhEQUE4RCxDQUFDO1NBQ3hFLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDaEIsS0FBSyxFQUFFLENBQUM7U0FDTCxNQUFNLEVBQUU7U0FDUixRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFDOUIsaUJBQWlCO1NBQ2hCLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztTQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2hCLE9BQU8sRUFBRSxDQUFDO1NBQ1AsS0FBSyxDQUNKLENBQUM7U0FDRSxNQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsQ0FBQzthQUNKLE1BQU0sRUFBRTthQUNSLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDTixHQUFHLENBQUMsR0FBRyxDQUFDO2FBQ1IsUUFBUSxDQUNQLG1JQUFtSSxDQUNwSTtRQUNILE1BQU0sRUFBRSxDQUFDO2FBQ04sS0FBSyxDQUNKLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTixDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ1YsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUNoQixDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ1YsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNYLENBQUM7aUJBQ0UsTUFBTSxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDO3FCQUNELE1BQU0sRUFBRTtxQkFDUixRQUFRLENBQUMsdUJBQXVCLENBQUM7b0JBQ2xDLGlCQUFpQjtxQkFDaEIsUUFBUSxFQUFFO3FCQUNWLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztxQkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQyxFQUFFLENBQUM7cUJBQ0QsTUFBTSxFQUFFO3FCQUNSLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDakMsaUJBQWlCO3FCQUNoQixRQUFRLEVBQUU7cUJBQ1YsUUFBUSxDQUFDLHNCQUFzQixDQUFDO3FCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ2pCLENBQUM7aUJBQ0QsUUFBUSxDQUNQLHFFQUFxRSxDQUN0RTtTQUNKLENBQUMsQ0FDSDthQUNBLFFBQVEsQ0FDUCxxRUFBcUUsQ0FDdEU7S0FDSixDQUFDO1NBQ0QsUUFBUSxDQUNQLDhHQUE4RyxDQUMvRyxDQUNKO1NBQ0EsUUFBUSxDQUFDLDhCQUE4QixDQUFDO1FBQ3pDLGlCQUFpQjtTQUNoQixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsOEJBQThCLENBQUM7U0FDeEMsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNoQixTQUFTLEVBQUUsQ0FBQztTQUNULE9BQU8sRUFBRTtTQUNULFFBQVEsQ0FDUCw2SEFBNkgsQ0FDOUg7U0FDQSxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2pCLGFBQWEsRUFBRSxDQUFDO1NBQ2IsTUFBTSxFQUFFO1NBQ1IsR0FBRyxFQUFFO1NBQ0wsUUFBUSxDQUNQLHNHQUFzRyxDQUN2RztTQUNBLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNkLFlBQVksRUFBRSxDQUFDO1NBQ1osTUFBTSxFQUFFO1NBQ1IsR0FBRyxFQUFFO1NBQ0wsUUFBUSxDQUNQLHdHQUF3RyxDQUN6RztTQUNBLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNkLFVBQVUsRUFBRSxDQUFDO1NBQ1YsT0FBTyxFQUFFO1NBQ1QsUUFBUSxDQUNQLDZJQUE2SSxDQUM5STtTQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDaEIsU0FBUyxFQUFFLENBQUM7U0FDVCxNQUFNLEVBQUU7U0FDUixHQUFHLEVBQUU7U0FDTCxRQUFRLENBQ1Asd0ZBQXdGLENBQ3pGO1NBQ0EsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2QsTUFBTSxFQUFFLENBQUM7U0FDTixNQUFNLEVBQUU7U0FDUixHQUFHLEVBQUU7U0FDTCxRQUFRLENBQ1AsMEdBQTBHLENBQzNHO1NBQ0EsT0FBTyxDQUFDLENBQUMsQ0FBQztDQUNkLENBQUM7S0FDRCxRQUFRLENBQ1AsdUpBQXVKLENBQ3hKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5vYmplY3Qoe1xuICAgIHBheWxvYWRUeXBlOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgKSxcbiAgICByZWFkaW5nVHlwZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGVzY3JpYmUoXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIilcbiAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICB1bml0czogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgdGFyZ2V0czogelxuICAgICAgLmFycmF5KFxuICAgICAgICB6XG4gICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICApXG4gICAgICApXG4gICAgICAuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuXCIpXG4gICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIGFnZ3JlZ2F0ZTogelxuICAgICAgLmJvb2xlYW4oKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIlRydWUgaWYgcmVwb3J0IHNob3VsZCBhZ2dyZWdhdGUgcmVzdWx0cyBmcm9tIGFsbCB0YXJnZXRlZCByZXNvdXJjZXMuXFxuRmFsc2UgaWYgcmVwb3J0IGluY2x1ZGVzIHJlc3VsdHMgZm9yIGVhY2ggcmVzb3VyY2UuXFxuXCJcbiAgICAgIClcbiAgICAgIC5kZWZhdWx0KGZhbHNlKSxcbiAgICBzdGFydEludGVydmFsOiB6XG4gICAgICAubnVtYmVyKClcbiAgICAgIC5pbnQoKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIlRoZSBpbnRlcnZhbCBvbiB3aGljaCB0byBnZW5lcmF0ZSBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgcmVwb3J0IGF0IGVuZCBvZiBsYXN0IGludGVydmFsLlxcblwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdCgtMSksXG4gICAgbnVtSW50ZXJ2YWxzOiB6XG4gICAgICAubnVtYmVyKClcbiAgICAgIC5pbnQoKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIlRoZSBudW1iZXIgb2YgaW50ZXJ2YWxzIHRvIGluY2x1ZGUgaW4gYSByZXBvcnQuXFxuLTEgaW5kaWNhdGVzIHRoYXQgYWxsIGludGVydmFscyBhcmUgdG8gYmUgaW5jbHVkZWQuXFxuXCJcbiAgICAgIClcbiAgICAgIC5kZWZhdWx0KC0xKSxcbiAgICBoaXN0b3JpY2FsOiB6XG4gICAgICAuYm9vbGVhbigpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiVHJ1ZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBwcmVjZWRpbmcgc3RhcnRJbnRlcnZhbC5cXG5GYWxzZSBpbmRpY2F0ZXMgcmVwb3J0IG9uIGludGVydmFscyBmb2xsb3dpbmcgc3RhcnRJbnRlcnZhbCAoZS5nLiBmb3JlY2FzdCkuXFxuXCJcbiAgICAgIClcbiAgICAgIC5kZWZhdWx0KHRydWUpLFxuICAgIGZyZXF1ZW5jeTogelxuICAgICAgLm51bWJlcigpXG4gICAgICAuaW50KClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJOdW1iZXIgb2YgaW50ZXJ2YWxzIHRoYXQgZWxhcHNlIGJldHdlZW4gcmVwb3J0cy5cXG4tMSBpbmRpY2F0ZXMgc2FtZSBhcyBudW1JbnRlcnZhbHMuXFxuXCJcbiAgICAgIClcbiAgICAgIC5kZWZhdWx0KC0xKSxcbiAgICByZXBlYXQ6IHpcbiAgICAgIC5udW1iZXIoKVxuICAgICAgLmludCgpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiTnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCByZXBvcnQuXFxuMSBpbmRpY2F0ZXMgZ2VuZXJhdGUgb25lIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgcmVwZWF0IGluZGVmaW5pdGVseS5cXG5cIlxuICAgICAgKVxuICAgICAgLmRlZmF1bHQoMSksXG4gIH0pXG4gIC5kZXNjcmliZShcbiAgICBcIkFuIG9iamVjdCB0aGF0IG1heSBiZSB1c2VkIHRvIHJlcXVlc3QgYSByZXBvcnQgZnJvbSBhIFZFTi5cXG5TZWUgT3BlbkFEUiBSRVNUIFVzZXIgR3VpZGUgZm9yIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIGhvdyBjb25maWd1cmUgYSByZXBvcnQgcmVxdWVzdC5cXG5cIlxuICApO1xuIl19