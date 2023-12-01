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
        .literal("SUBSCRIPTION")
        .describe("Used as discriminator, e.g. notification.object")
        .optional(),
    clientName: zod_1.z
        .string()
        .min(1)
        .max(128)
        .describe("User generated identifier, may be VEN identifier provisioned during program enrollment."),
    programID: zod_1.z
        .string()
        .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
        .min(1)
        .max(128)
        .describe("URL safe VTN assigned object ID."),
    objectOperations: zod_1.z
        .array(zod_1.z
        .object({
        objects: zod_1.z
            .array(zod_1.z
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
        operations: zod_1.z
            .array(zod_1.z
            .enum(["GET", "POST", "PUT", "DELETE"])
            .describe("object operation to subscribe to."))
            .describe("list of operations to subscribe to."),
        callbackUrl: zod_1.z
            .string()
            .url()
            .describe("User provided webhook URL."),
        bearerToken: zod_1.z
            .string()
            .describe("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
            .default(null)
            .nullable()
            .describe("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
            .default(null),
    })
        .describe("object type, operations, and callbackUrl."))
        .describe("list of objects and operations to subscribe to."),
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
        .describe("A list of valuesMap objects. Used by server to filter callbacks.")
        .default(null)
        .nullable()
        .describe("A list of valuesMap objects. Used by server to filter callbacks.")
        .default(null),
})
    .describe("An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXN1YnNjcmlwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy96b2Qvem9kLXN1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF3QjtBQUV4QixrQkFBZSxPQUFDO0tBQ2IsTUFBTSxDQUFDO0lBQ04sRUFBRSxFQUFFLE9BQUM7U0FDRixNQUFNLEVBQUU7U0FDUixLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQztTQUM1QyxRQUFRLEVBQUU7SUFDYixlQUFlLEVBQUUsT0FBQztTQUNmLE1BQU0sRUFBRTtTQUNSLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztTQUN2QyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQ3hCLG9CQUFvQixFQUFFLE9BQUM7U0FDcEIsTUFBTSxFQUFFO1NBQ1IsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLDZCQUE2QixDQUFDO1NBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDeEIsVUFBVSxFQUFFLE9BQUM7U0FDVixPQUFPLENBQUMsY0FBYyxDQUFDO1NBQ3ZCLFFBQVEsQ0FBQyxpREFBaUQsQ0FBQztTQUMzRCxRQUFRLEVBQUU7SUFDYixVQUFVLEVBQUUsT0FBQztTQUNWLE1BQU0sRUFBRTtTQUNSLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsUUFBUSxDQUNQLHlGQUF5RixDQUMxRjtJQUNILFNBQVMsRUFBRSxPQUFDO1NBQ1QsTUFBTSxFQUFFO1NBQ1IsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQUMsa0NBQWtDLENBQUM7SUFDL0MsZ0JBQWdCLEVBQUUsT0FBQztTQUNoQixLQUFLLENBQ0osT0FBQztTQUNFLE1BQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxPQUFDO2FBQ1AsS0FBSyxDQUNKLE9BQUM7YUFDRSxJQUFJLENBQUM7WUFDSixTQUFTO1lBQ1QsT0FBTztZQUNQLFFBQVE7WUFDUixjQUFjO1lBQ2QsS0FBSztZQUNMLFVBQVU7U0FDWCxDQUFDO2FBQ0QsUUFBUSxDQUFDLDJDQUEyQyxDQUFDLENBQ3pEO2FBQ0EsUUFBUSxDQUFDLGtDQUFrQyxDQUFDO1FBQy9DLFVBQVUsRUFBRSxPQUFDO2FBQ1YsS0FBSyxDQUNKLE9BQUM7YUFDRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN0QyxRQUFRLENBQUMsbUNBQW1DLENBQUMsQ0FDakQ7YUFDQSxRQUFRLENBQUMscUNBQXFDLENBQUM7UUFDbEQsV0FBVyxFQUFFLE9BQUM7YUFDWCxNQUFNLEVBQUU7YUFDUixHQUFHLEVBQUU7YUFDTCxRQUFRLENBQUMsNEJBQTRCLENBQUM7UUFDekMsV0FBVyxFQUFFLE9BQUM7YUFDWCxNQUFNLEVBQUU7YUFDUixRQUFRLENBQ1AsaUpBQWlKLENBQ2xKO2FBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNiLFFBQVEsRUFBRTthQUNWLFFBQVEsQ0FDUCxpSkFBaUosQ0FDbEo7YUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDO0tBQ2pCLENBQUM7U0FDRCxRQUFRLENBQUMsMkNBQTJDLENBQUMsQ0FDekQ7U0FDQSxRQUFRLENBQUMsaURBQWlELENBQUM7SUFDOUQsT0FBTyxFQUFFLE9BQUM7U0FDUCxLQUFLLENBQ0osT0FBQztTQUNFLE1BQU0sQ0FBQztRQUNOLElBQUksRUFBRSxPQUFDO2FBQ0osTUFBTSxFQUFFO2FBQ1IsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDUixRQUFRLENBQ1AsbUlBQW1JLENBQ3BJO1FBQ0gsTUFBTSxFQUFFLE9BQUM7YUFDTixLQUFLLENBQ0osT0FBQyxDQUFDLEtBQUssQ0FBQztZQUNOLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDVixPQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ2hCLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDVixPQUFDLENBQUMsT0FBTyxFQUFFO1lBQ1gsT0FBQztpQkFDRSxNQUFNLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLE9BQUM7cUJBQ0QsTUFBTSxFQUFFO3FCQUNSLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztxQkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQztxQkFDYixRQUFRLEVBQUU7cUJBQ1YsUUFBUSxDQUFDLHVCQUF1QixDQUFDO3FCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDLEVBQUUsT0FBQztxQkFDRCxNQUFNLEVBQUU7cUJBQ1IsUUFBUSxDQUFDLHNCQUFzQixDQUFDO3FCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDO3FCQUNiLFFBQVEsRUFBRTtxQkFDVixRQUFRLENBQUMsc0JBQXNCLENBQUM7cUJBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDakIsQ0FBQztpQkFDRCxRQUFRLENBQ1AscUVBQXFFLENBQ3RFO1NBQ0osQ0FBQyxDQUNIO2FBQ0EsUUFBUSxDQUNQLHFFQUFxRSxDQUN0RTtLQUNKLENBQUM7U0FDRCxRQUFRLENBQ1AsOEdBQThHLENBQy9HLENBQ0o7U0FDQSxRQUFRLENBQ1Asa0VBQWtFLENBQ25FO1NBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQztTQUNiLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FDUCxrRUFBa0UsQ0FDbkU7U0FDQSxPQUFPLENBQUMsSUFBSSxDQUFDO0NBQ2pCLENBQUM7S0FDRCxRQUFRLENBQ1AsaUxBQWlMLENBQ2xMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5vYmplY3Qoe1xuICAgIGlkOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIGNyZWF0ZWREYXRlVGltZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGF0ZXRpbWUoKVxuICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAuZGVmYXVsdChcIjAwMDAtMDAtMDBcIiksXG4gICAgbW9kaWZpY2F0aW9uRGF0ZVRpbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRhdGV0aW1lKClcbiAgICAgIC5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpLFxuICAgIG9iamVjdFR5cGU6IHpcbiAgICAgIC5saXRlcmFsKFwiU1VCU0NSSVBUSU9OXCIpXG4gICAgICAuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gbm90aWZpY2F0aW9uLm9iamVjdFwiKVxuICAgICAgLm9wdGlvbmFsKCksXG4gICAgY2xpZW50TmFtZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAubWluKDEpXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJVc2VyIGdlbmVyYXRlZCBpZGVudGlmaWVyLCBtYXkgYmUgVkVOIGlkZW50aWZpZXIgcHJvdmlzaW9uZWQgZHVyaW5nIHByb2dyYW0gZW5yb2xsbWVudC5cIlxuICAgICAgKSxcbiAgICBwcm9ncmFtSUQ6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKVxuICAgICAgLm1pbigxKVxuICAgICAgLm1heCgxMjgpXG4gICAgICAuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKSxcbiAgICBvYmplY3RPcGVyYXRpb25zOiB6XG4gICAgICAuYXJyYXkoXG4gICAgICAgIHpcbiAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgIG9iamVjdHM6IHpcbiAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgIHpcbiAgICAgICAgICAgICAgICAgIC5lbnVtKFtcbiAgICAgICAgICAgICAgICAgICAgXCJQUk9HUkFNXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRVZFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJSRVBPUlRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTVUJTQ1JJUFRJT05cIixcbiAgICAgICAgICAgICAgICAgICAgXCJWRU5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJSRVNPVVJDRVwiLFxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIlR5cGVzIG9mIG9iamVjdHMgYWRkcmVzc2FibGUgdGhyb3VnaCBBUEkuXCIpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFwibGlzdCBvZiBvYmplY3RzIHRvIHN1YnNjcmliZSB0by5cIiksXG4gICAgICAgICAgICBvcGVyYXRpb25zOiB6XG4gICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAuZW51bShbXCJHRVRcIiwgXCJQT1NUXCIsIFwiUFVUXCIsIFwiREVMRVRFXCJdKVxuICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwib2JqZWN0IG9wZXJhdGlvbiB0byBzdWJzY3JpYmUgdG8uXCIpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFwibGlzdCBvZiBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIiksXG4gICAgICAgICAgICBjYWxsYmFja1VybDogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLnVybCgpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcIlVzZXIgcHJvdmlkZWQgd2ViaG9vayBVUkwuXCIpLFxuICAgICAgICAgICAgYmVhcmVyVG9rZW46IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIlVzZXIgcHJvdmlkZWQgdG9rZW4uXFxuVG8gYXZvaWQgY3VzdG9tIGludGVncmF0aW9ucywgY2FsbGJhY2sgZW5kcG9pbnRzXFxuc2hvdWxkIGFjY2VwdCB0aGUgcHJvdmlkZWQgYmVhcmVyIHRva2VuIHRvIGF1dGhlbnRpY2F0ZSBWVE4gcmVxdWVzdHMuXFxuXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZGVzY3JpYmUoXCJvYmplY3QgdHlwZSwgb3BlcmF0aW9ucywgYW5kIGNhbGxiYWNrVXJsLlwiKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIiksXG4gICAgdGFyZ2V0czogelxuICAgICAgLmFycmF5KFxuICAgICAgICB6XG4gICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICB0eXBlOiB6XG4gICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAubWluKDEpXG4gICAgICAgICAgICAgIC5tYXgoMTI4KVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB2YWx1ZXM6IHpcbiAgICAgICAgICAgICAgLmFycmF5KFxuICAgICAgICAgICAgICAgIHoudW5pb24oW1xuICAgICAgICAgICAgICAgICAgei5udW1iZXIoKSxcbiAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgICAgICAgICAgei5ib29sZWFuKCksXG4gICAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHg6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgICAgICAgICApXG4gICAgICApXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLiBVc2VkIGJ5IHNlcnZlciB0byBmaWx0ZXIgY2FsbGJhY2tzLlwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuIFVzZWQgYnkgc2VydmVyIHRvIGZpbHRlciBjYWxsYmFja3MuXCJcbiAgICAgIClcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICB9KVxuICAuZGVzY3JpYmUoXG4gICAgXCJBbiBvYmplY3QgY3JlYXRlZCBieSBhIGNsaWVudCB0byByZWNlaXZlIG5vdGlmaWNhdGlvbiBvZiBvcGVyYXRpb25zIG9uIG9iamVjdHMuXFxuQ2xpZW50cyBtYXkgc3Vic2NyaWJlIHRvIGJlIG5vdGlmaWVkIHdoZW4gYSB0eXBlIG9mIG9iamVjdCBpcyBjcmVhdGVkLFxcbnVwZGF0ZWQsIG9yIGRlbGV0ZWQuXFxuXCJcbiAgKTtcbiJdfQ==