"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
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
    .describe("An object that may be used to request a report from a VEN.\nSee OpenADR REST User Guide for detailed description of how configure a report request.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXJlcG9ydERlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvem9kL3pvZC1yZXBvcnREZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQXdCO0FBRXhCLGtCQUFlLE9BQUM7S0FDYixNQUFNLENBQUM7SUFDTixXQUFXLEVBQUUsT0FBQztTQUNYLE1BQU0sRUFBRTtTQUNSLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsUUFBUSxDQUNQLCtEQUErRCxDQUNoRTtJQUNILFdBQVcsRUFBRSxPQUFDO1NBQ1gsTUFBTSxFQUFFO1NBQ1IsUUFBUSxDQUFDLDhEQUE4RCxDQUFDO1NBQ3hFLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDYixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsOERBQThELENBQUM7U0FDeEUsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNoQixLQUFLLEVBQUUsT0FBQztTQUNMLE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztTQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ2IsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLG1CQUFtQixDQUFDO1NBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDaEIsT0FBTyxFQUFFLE9BQUM7U0FDUCxLQUFLLENBQ0osT0FBQztTQUNFLE1BQU0sQ0FBQztRQUNOLElBQUksRUFBRSxPQUFDO2FBQ0osTUFBTSxFQUFFO2FBQ1IsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDUixRQUFRLENBQ1AsbUlBQW1JLENBQ3BJO1FBQ0gsTUFBTSxFQUFFLE9BQUM7YUFDTixLQUFLLENBQ0osT0FBQyxDQUFDLEtBQUssQ0FBQztZQUNOLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDVixPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ2hCLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDVixPQUFDLENBQUMsT0FBTyxFQUFFO1lBQ1gsT0FBQztpQkFDRSxNQUFNLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLE9BQUM7cUJBQ0QsTUFBTSxFQUFFO3FCQUNSLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztxQkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQztxQkFDYixRQUFRLEVBQUU7cUJBQ1YsUUFBUSxDQUFDLHVCQUF1QixDQUFDO3FCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDLEVBQUUsT0FBQztxQkFDRCxNQUFNLEVBQUU7cUJBQ1IsUUFBUSxDQUFDLHNCQUFzQixDQUFDO3FCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDO3FCQUNiLFFBQVEsRUFBRTtxQkFDVixRQUFRLENBQUMsc0JBQXNCLENBQUM7cUJBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDakIsQ0FBQztpQkFDRCxRQUFRLENBQ1AscUVBQXFFLENBQ3RFO1NBQ0osQ0FBQyxDQUNIO2FBQ0EsUUFBUSxDQUNQLHFFQUFxRSxDQUN0RTtLQUNKLENBQUM7U0FDRCxRQUFRLENBQ1AsOEdBQThHLENBQy9HLENBQ0o7U0FDQSxRQUFRLENBQUMsOEJBQThCLENBQUM7U0FDeEMsT0FBTyxDQUFDLElBQUksQ0FBQztTQUNiLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQztTQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2hCLFNBQVMsRUFBRSxPQUFDO1NBQ1QsT0FBTyxFQUFFO1NBQ1QsUUFBUSxDQUNQLDZIQUE2SCxDQUM5SDtTQUNBLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDakIsYUFBYSxFQUFFLE9BQUM7U0FDYixNQUFNLEVBQUU7U0FDUixHQUFHLEVBQUU7U0FDTCxRQUFRLENBQ1Asc0dBQXNHLENBQ3ZHO1NBQ0EsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2QsWUFBWSxFQUFFLE9BQUM7U0FDWixNQUFNLEVBQUU7U0FDUixHQUFHLEVBQUU7U0FDTCxRQUFRLENBQ1Asd0dBQXdHLENBQ3pHO1NBQ0EsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2QsVUFBVSxFQUFFLE9BQUM7U0FDVixPQUFPLEVBQUU7U0FDVCxRQUFRLENBQ1AsNklBQTZJLENBQzlJO1NBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNoQixTQUFTLEVBQUUsT0FBQztTQUNULE1BQU0sRUFBRTtTQUNSLEdBQUcsRUFBRTtTQUNMLFFBQVEsQ0FDUCx3RkFBd0YsQ0FDekY7U0FDQSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZCxNQUFNLEVBQUUsT0FBQztTQUNOLE1BQU0sRUFBRTtTQUNSLEdBQUcsRUFBRTtTQUNMLFFBQVEsQ0FDUCwwR0FBMEcsQ0FDM0c7U0FDQSxPQUFPLENBQUMsQ0FBQyxDQUFDO0NBQ2QsQ0FBQztLQUNELFFBQVEsQ0FDUCx1SkFBdUosQ0FDeEosQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHpcbiAgLm9iamVjdCh7XG4gICAgcGF5bG9hZFR5cGU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLm1pbigxKVxuICAgICAgLm1heCgxMjgpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICApLFxuICAgIHJlYWRpbmdUeXBlOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIHVuaXRzOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICB0YXJnZXRzOiB6XG4gICAgICAuYXJyYXkoXG4gICAgICAgIHpcbiAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgIClcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgYWdncmVnYXRlOiB6XG4gICAgICAuYm9vbGVhbigpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiVHJ1ZSBpZiByZXBvcnQgc2hvdWxkIGFnZ3JlZ2F0ZSByZXN1bHRzIGZyb20gYWxsIHRhcmdldGVkIHJlc291cmNlcy5cXG5GYWxzZSBpZiByZXBvcnQgaW5jbHVkZXMgcmVzdWx0cyBmb3IgZWFjaCByZXNvdXJjZS5cXG5cIlxuICAgICAgKVxuICAgICAgLmRlZmF1bHQoZmFsc2UpLFxuICAgIHN0YXJ0SW50ZXJ2YWw6IHpcbiAgICAgIC5udW1iZXIoKVxuICAgICAgLmludCgpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiVGhlIGludGVydmFsIG9uIHdoaWNoIHRvIGdlbmVyYXRlIGEgcmVwb3J0Llxcbi0xIGluZGljYXRlcyBnZW5lcmF0ZSByZXBvcnQgYXQgZW5kIG9mIGxhc3QgaW50ZXJ2YWwuXFxuXCJcbiAgICAgIClcbiAgICAgIC5kZWZhdWx0KC0xKSxcbiAgICBudW1JbnRlcnZhbHM6IHpcbiAgICAgIC5udW1iZXIoKVxuICAgICAgLmludCgpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiVGhlIG51bWJlciBvZiBpbnRlcnZhbHMgdG8gaW5jbHVkZSBpbiBhIHJlcG9ydC5cXG4tMSBpbmRpY2F0ZXMgdGhhdCBhbGwgaW50ZXJ2YWxzIGFyZSB0byBiZSBpbmNsdWRlZC5cXG5cIlxuICAgICAgKVxuICAgICAgLmRlZmF1bHQoLTEpLFxuICAgIGhpc3RvcmljYWw6IHpcbiAgICAgIC5ib29sZWFuKClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJUcnVlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIHByZWNlZGluZyBzdGFydEludGVydmFsLlxcbkZhbHNlIGluZGljYXRlcyByZXBvcnQgb24gaW50ZXJ2YWxzIGZvbGxvd2luZyBzdGFydEludGVydmFsIChlLmcuIGZvcmVjYXN0KS5cXG5cIlxuICAgICAgKVxuICAgICAgLmRlZmF1bHQodHJ1ZSksXG4gICAgZnJlcXVlbmN5OiB6XG4gICAgICAubnVtYmVyKClcbiAgICAgIC5pbnQoKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIk51bWJlciBvZiBpbnRlcnZhbHMgdGhhdCBlbGFwc2UgYmV0d2VlbiByZXBvcnRzLlxcbi0xIGluZGljYXRlcyBzYW1lIGFzIG51bUludGVydmFscy5cXG5cIlxuICAgICAgKVxuICAgICAgLmRlZmF1bHQoLTEpLFxuICAgIHJlcGVhdDogelxuICAgICAgLm51bWJlcigpXG4gICAgICAuaW50KClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJOdW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHJlcG9ydC5cXG4xIGluZGljYXRlcyBnZW5lcmF0ZSBvbmUgcmVwb3J0Llxcbi0xIGluZGljYXRlcyByZXBlYXQgaW5kZWZpbml0ZWx5LlxcblwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdCgxKSxcbiAgfSlcbiAgLmRlc2NyaWJlKFxuICAgIFwiQW4gb2JqZWN0IHRoYXQgbWF5IGJlIHVzZWQgdG8gcmVxdWVzdCBhIHJlcG9ydCBmcm9tIGEgVkVOLlxcblNlZSBPcGVuQURSIFJFU1QgVXNlciBHdWlkZSBmb3IgZGV0YWlsZWQgZGVzY3JpcHRpb24gb2YgaG93IGNvbmZpZ3VyZSBhIHJlcG9ydCByZXF1ZXN0LlxcblwiXG4gICk7XG4iXX0=