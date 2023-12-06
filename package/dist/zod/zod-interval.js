import { z } from "zod";
export default z
    .object({
    id: z
        .number()
        .int()
        .describe("A client generated number assigned an interval object. Not a sequence number."),
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
    .describe("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWludGVydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtaW50ZXJ2YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUV4QixlQUFlLENBQUM7S0FDYixNQUFNLENBQUM7SUFDTixFQUFFLEVBQUUsQ0FBQztTQUNGLE1BQU0sRUFBRTtTQUNSLEdBQUcsRUFBRTtTQUNMLFFBQVEsQ0FDUCwrRUFBK0UsQ0FDaEY7SUFDSCxjQUFjLEVBQUUsQ0FBQztTQUNkLE1BQU0sQ0FBQztRQUNOLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDO1FBQ3BFLFFBQVEsRUFBRSxDQUFDO2FBQ1IsTUFBTSxFQUFFO2FBQ1IsS0FBSyxDQUNKLElBQUksTUFBTSxDQUNSLG9IQUFvSCxDQUNySCxDQUNGO2FBQ0EsUUFBUSxDQUFDLDZCQUE2QixDQUFDO2FBQ3ZDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbEIsY0FBYyxFQUFFLENBQUM7YUFDZCxNQUFNLEVBQUU7YUFDUixLQUFLLENBQ0osSUFBSSxNQUFNLENBQ1Isb0hBQW9ILENBQ3JILENBQ0Y7YUFDQSxRQUFRLENBQUMsNkJBQTZCLENBQUM7YUFDdkMsT0FBTyxDQUFDLE1BQU0sQ0FBQztLQUNuQixDQUFDO1NBQ0QsUUFBUSxDQUNQLHdKQUF3SixDQUN6SjtTQUNBLFFBQVEsRUFBRTtJQUNiLFFBQVEsRUFBRSxDQUFDO1NBQ1IsS0FBSyxDQUNKLENBQUM7U0FDRSxNQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsQ0FBQzthQUNKLE1BQU0sRUFBRTthQUNSLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDTixHQUFHLENBQUMsR0FBRyxDQUFDO2FBQ1IsUUFBUSxDQUNQLG1JQUFtSSxDQUNwSTtRQUNILE1BQU0sRUFBRSxDQUFDO2FBQ04sS0FBSyxDQUNKLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTixDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ1YsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUNoQixDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ1YsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNYLENBQUM7aUJBQ0UsTUFBTSxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDO3FCQUNELE1BQU0sRUFBRTtxQkFDUixRQUFRLENBQUMsdUJBQXVCLENBQUM7cUJBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUM7cUJBQ2IsUUFBUSxFQUFFO3FCQUNWLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztxQkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQyxFQUFFLENBQUM7cUJBQ0QsTUFBTSxFQUFFO3FCQUNSLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQztxQkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQztxQkFDYixRQUFRLEVBQUU7cUJBQ1YsUUFBUSxDQUFDLHNCQUFzQixDQUFDO3FCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ2pCLENBQUM7aUJBQ0QsUUFBUSxDQUNQLHFFQUFxRSxDQUN0RTtTQUNKLENBQUMsQ0FDSDthQUNBLFFBQVEsQ0FDUCxxRUFBcUUsQ0FDdEU7S0FDSixDQUFDO1NBQ0QsUUFBUSxDQUNQLDhHQUE4RyxDQUMvRyxDQUNKO1NBQ0EsUUFBUSxDQUFDLDhCQUE4QixDQUFDO0NBQzVDLENBQUM7S0FDRCxRQUFRLENBQ1Asb0tBQW9LLENBQ3JLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5vYmplY3Qoe1xuICAgIGlkOiB6XG4gICAgICAubnVtYmVyKClcbiAgICAgIC5pbnQoKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCJcbiAgICAgICksXG4gICAgaW50ZXJ2YWxQZXJpb2Q6IHpcbiAgICAgIC5vYmplY3Qoe1xuICAgICAgICBzdGFydDogei5zdHJpbmcoKS5kYXRldGltZSgpLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpLFxuICAgICAgICBkdXJhdGlvbjogelxuICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgIFwiXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyRcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiB6XG4gICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgXCJeKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiUFQwU1wiKSxcbiAgICAgIH0pXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiRGVmaW5lcyB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFscy5cXG5BIGR1cmF0aW9uIG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgaW5maW5pdHkuXFxuQSByYW5kb21pemVTdGFydCBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIG5vIHJhbmRvbWl6YXRpb24uXFxuXCJcbiAgICAgIClcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIHBheWxvYWRzOiB6XG4gICAgICAuYXJyYXkoXG4gICAgICAgIHpcbiAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgIHR5cGU6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5taW4oMSlcbiAgICAgICAgICAgICAgLm1heCgxMjgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHZhbHVlczogelxuICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgei51bmlvbihbXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICAgICAgICAgIHouc3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICAgICAgICAgIClcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIiksXG4gIH0pXG4gIC5kZXNjcmliZShcbiAgICBcIkFuIG9iamVjdCBkZWZpbmluZyBhIHRlbXBvcmFsIHdpbmRvdyBhbmQgYSBsaXN0IG9mIHZhbHVlc01hcHMuXFxuaWYgaW50ZXJ2YWxQZXJpb2QgcHJlc2VudCBtYXkgc2V0IHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWwgb3Igb3ZlcnJpZGUgZXZlbnQuaW50ZXJ2YWxQZXJpb2QuXFxuXCJcbiAgKTtcbiJdfQ==