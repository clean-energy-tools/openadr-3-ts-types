"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
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
    .describe("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXJlcG9ydFBheWxvYWREZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtcmVwb3J0UGF5bG9hZERlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBd0I7QUFFeEIsa0JBQWUsT0FBQztLQUNiLE1BQU0sQ0FBQztJQUNOLFVBQVUsRUFBRSxPQUFDO1NBQ1YsTUFBTSxFQUFFO1NBQ1IsUUFBUSxDQUFDLHdEQUF3RCxDQUFDO1NBQ2xFLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztJQUN2QyxXQUFXLEVBQUUsT0FBQztTQUNYLE1BQU0sRUFBRTtTQUNSLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsUUFBUSxDQUNQLCtEQUErRCxDQUNoRTtJQUNILFdBQVcsRUFBRSxPQUFDO1NBQ1gsTUFBTSxFQUFFO1NBQ1IsUUFBUSxDQUFDLDhEQUE4RCxDQUFDO1NBQ3hFLE9BQU8sQ0FBQyxhQUFhLENBQUM7U0FDdEIsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLDhEQUE4RCxDQUFDO1NBQ3hFLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDekIsS0FBSyxFQUFFLE9BQUM7U0FDTCxNQUFNLEVBQUU7U0FDUixRQUFRLENBQUMsbUJBQW1CLENBQUM7U0FDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNkLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztTQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2pCLFFBQVEsRUFBRSxPQUFDO1NBQ1IsTUFBTSxFQUFFO1NBQ1IsUUFBUSxDQUFDLDhEQUE4RCxDQUFDO1NBQ3hFLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDVixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsOERBQThELENBQUM7U0FDeEUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNiLFVBQVUsRUFBRSxPQUFDO1NBQ1YsTUFBTSxFQUFFO1NBQ1IsR0FBRyxFQUFFO1NBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQ1AsZ0VBQWdFLENBQ2pFO1NBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQztDQUNoQixDQUFDO0tBQ0QsUUFBUSxDQUNQLDZNQUE2TSxDQUM5TSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgelxuICAub2JqZWN0KHtcbiAgICBvYmplY3RUeXBlOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiKVxuICAgICAgLmRlZmF1bHQoXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpLFxuICAgIHBheWxvYWRUeXBlOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cIlxuICAgICAgKSxcbiAgICByZWFkaW5nVHlwZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGVzY3JpYmUoXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIilcbiAgICAgIC5kZWZhdWx0KFwiRElSRUNUX1JFQURcIilcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIilcbiAgICAgIC5kZWZhdWx0KFwiRElSRUNUX1JFQURcIiksXG4gICAgdW5pdHM6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgIC5kZWZhdWx0KFwiS1dIXCIpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgIC5kZWZhdWx0KFwiS1dIXCIpLFxuICAgIGFjY3VyYWN5OiB6XG4gICAgICAubnVtYmVyKClcbiAgICAgIC5kZXNjcmliZShcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiKVxuICAgICAgLmRlZmF1bHQoMClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIilcbiAgICAgIC5kZWZhdWx0KDApLFxuICAgIGNvbmZpZGVuY2U6IHpcbiAgICAgIC5udW1iZXIoKVxuICAgICAgLmludCgpXG4gICAgICAuZ3RlKDApXG4gICAgICAubHRlKDEwMClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdCgxMDApLFxuICB9KVxuICAuZGVzY3JpYmUoXG4gICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICk7XG4iXX0=