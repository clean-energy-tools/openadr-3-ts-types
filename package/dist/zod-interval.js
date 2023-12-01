"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
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
    .describe("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWludGVydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3pvZC96b2QtaW50ZXJ2YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBd0I7QUFFeEIsa0JBQWUsT0FBQztLQUNiLE1BQU0sQ0FBQztJQUNOLEVBQUUsRUFBRSxPQUFDO1NBQ0YsTUFBTSxFQUFFO1NBQ1IsR0FBRyxFQUFFO1NBQ0wsUUFBUSxDQUNQLCtFQUErRSxDQUNoRjtJQUNILGNBQWMsRUFBRSxPQUFDO1NBQ2QsTUFBTSxDQUFDO1FBQ04sS0FBSyxFQUFFLE9BQUM7YUFDTCxNQUFNLEVBQUU7YUFDUixRQUFRLEVBQUU7YUFDVixRQUFRLENBQUMsNkJBQTZCLENBQUM7YUFDdkMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN4QixRQUFRLEVBQUUsT0FBQzthQUNSLE1BQU0sRUFBRTthQUNSLEtBQUssQ0FDSixJQUFJLE1BQU0sQ0FDUixzSEFBc0gsQ0FDdkgsQ0FDRjthQUNBLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQzthQUN2QyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2xCLGNBQWMsRUFBRSxPQUFDO2FBQ2QsTUFBTSxFQUFFO2FBQ1IsS0FBSyxDQUNKLElBQUksTUFBTSxDQUNSLHNIQUFzSCxDQUN2SCxDQUNGO2FBQ0EsUUFBUSxDQUFDLDZCQUE2QixDQUFDO2FBQ3ZDLE9BQU8sQ0FBQyxNQUFNLENBQUM7S0FDbkIsQ0FBQztTQUNELFFBQVEsQ0FDUCx3SkFBd0osQ0FDeko7U0FDQSxRQUFRLEVBQUU7SUFDYixRQUFRLEVBQUUsT0FBQztTQUNSLEtBQUssQ0FDSixPQUFDO1NBQ0UsTUFBTSxDQUFDO1FBQ04sSUFBSSxFQUFFLE9BQUM7YUFDSixNQUFNLEVBQUU7YUFDUixHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNSLFFBQVEsQ0FDUCxtSUFBbUksQ0FDcEk7UUFDSCxNQUFNLEVBQUUsT0FBQzthQUNOLEtBQUssQ0FDSixPQUFDLENBQUMsS0FBSyxDQUFDO1lBQ04sT0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNWLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDaEIsT0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNWLE9BQUMsQ0FBQyxPQUFPLEVBQUU7WUFDWCxPQUFDO2lCQUNFLE1BQU0sQ0FBQztnQkFDTixDQUFDLEVBQUUsT0FBQztxQkFDRCxNQUFNLEVBQUU7cUJBQ1IsUUFBUSxDQUFDLHVCQUF1QixDQUFDO3FCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDO3FCQUNiLFFBQVEsRUFBRTtxQkFDVixRQUFRLENBQUMsdUJBQXVCLENBQUM7cUJBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUMsRUFBRSxPQUFDO3FCQUNELE1BQU0sRUFBRTtxQkFDUixRQUFRLENBQUMsc0JBQXNCLENBQUM7cUJBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUM7cUJBQ2IsUUFBUSxFQUFFO3FCQUNWLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQztxQkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNqQixDQUFDO2lCQUNELFFBQVEsQ0FDUCxxRUFBcUUsQ0FDdEU7U0FDSixDQUFDLENBQ0g7YUFDQSxRQUFRLENBQ1AscUVBQXFFLENBQ3RFO0tBQ0osQ0FBQztTQUNELFFBQVEsQ0FDUCw4R0FBOEcsQ0FDL0csQ0FDSjtTQUNBLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQztDQUM1QyxDQUFDO0tBQ0QsUUFBUSxDQUNQLG9LQUFvSyxDQUNySyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgelxuICAub2JqZWN0KHtcbiAgICBpZDogelxuICAgICAgLm51bWJlcigpXG4gICAgICAuaW50KClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJBIGNsaWVudCBnZW5lcmF0ZWQgbnVtYmVyIGFzc2lnbmVkIGFuIGludGVydmFsIG9iamVjdC4gTm90IGEgc2VxdWVuY2UgbnVtYmVyLlwiXG4gICAgICApLFxuICAgIGludGVydmFsUGVyaW9kOiB6XG4gICAgICAub2JqZWN0KHtcbiAgICAgICAgc3RhcnQ6IHpcbiAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAuZGF0ZXRpbWUoKVxuICAgICAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgICAgIC5kZWZhdWx0KFwiMDAwMC0wMC0wMFwiKSxcbiAgICAgICAgZHVyYXRpb246IHpcbiAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAucmVnZXgoXG4gICAgICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICBcIi9eKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JC9cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgICAuZGVzY3JpYmUoXCJkdXJhdGlvbiBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgICAgIHJhbmRvbWl6ZVN0YXJ0OiB6XG4gICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgXCIvXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyQvXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgICAgfSlcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICAgICAgKVxuICAgICAgLm9wdGlvbmFsKCksXG4gICAgcGF5bG9hZHM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgelxuICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLlwiKSxcbiAgfSlcbiAgLmRlc2NyaWJlKFxuICAgIFwiQW4gb2JqZWN0IGRlZmluaW5nIGEgdGVtcG9yYWwgd2luZG93IGFuZCBhIGxpc3Qgb2YgdmFsdWVzTWFwcy5cXG5pZiBpbnRlcnZhbFBlcmlvZCBwcmVzZW50IG1heSBzZXQgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbCBvciBvdmVycmlkZSBldmVudC5pbnRlcnZhbFBlcmlvZC5cXG5cIlxuICApO1xuIl19