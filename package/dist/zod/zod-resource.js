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
    .describe("A resource is an energy device or system subject to control by a VEN.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXJlc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtcmVzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBd0I7QUFFeEIsa0JBQWUsT0FBQztLQUNiLE1BQU0sQ0FBQztJQUNOLEVBQUUsRUFBRSxPQUFDO1NBQ0YsTUFBTSxFQUFFO1NBQ1IsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQUMsa0NBQWtDLENBQUM7U0FDNUMsUUFBUSxFQUFFO0lBQ2IsZUFBZSxFQUFFLE9BQUM7U0FDZixNQUFNLEVBQUU7U0FDUixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsNkJBQTZCLENBQUM7U0FDdkMsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUN4QixvQkFBb0IsRUFBRSxPQUFDO1NBQ3BCLE1BQU0sRUFBRTtTQUNSLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztTQUN2QyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQ3hCLFVBQVUsRUFBRSxPQUFDO1NBQ1YsT0FBTyxDQUFDLFVBQVUsQ0FBQztTQUNuQixRQUFRLENBQUMsaURBQWlELENBQUM7U0FDM0QsUUFBUSxFQUFFO0lBQ2IsWUFBWSxFQUFFLE9BQUM7U0FDWixNQUFNLEVBQUU7U0FDUixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLFFBQVEsQ0FDUCxvRkFBb0YsQ0FDckY7SUFDSCxLQUFLLEVBQUUsT0FBQztTQUNMLE1BQU0sRUFBRTtTQUNSLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsUUFBUSxD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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5vYmplY3Qoe1xuICAgIGlkOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIGNyZWF0ZWREYXRlVGltZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGF0ZXRpbWUoKVxuICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRhdGV0aW1lKClcbiAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgIG9iamVjdFR5cGU6IHpcbiAgICAgIC5saXRlcmFsKFwiUkVTT1VSQ0VcIilcbiAgICAgIC5kZXNjcmliZShcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICByZXNvdXJjZU5hbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLm1pbigxKVxuICAgICAgLm1heCgxMjgpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgcmVzb3VyY2UgbWF5IGJlIGNvbmZpZ3VyZWQgd2l0aCBpZGVudGlmaWVyIG91dC1vZi1iYW5kLlwiXG4gICAgICApLFxuICAgIHZlbklEOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIGF0dHJpYnV0ZXM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgelxuICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgYXR0cmlidXRlcy5cIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIHRhcmdldHM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgelxuICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzIGRlc2NyaWJpbmcgdGFyZ2V0IGNyaXRlcmlhLlwiKVxuICAgICAgLm9wdGlvbmFsKCksXG4gIH0pXG4gIC5kZXNjcmliZShcbiAgICBcIkEgcmVzb3VyY2UgaXMgYW4gZW5lcmd5IGRldmljZSBvciBzeXN0ZW0gc3ViamVjdCB0byBjb250cm9sIGJ5IGEgVkVOLlxcblwiXG4gICk7XG4iXX0=