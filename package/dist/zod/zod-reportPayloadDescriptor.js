import { z } from "zod";
export default z
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
    accuracy: z
        .number()
        .describe("A quantification of the accuracy of a set of payload values.")
        // .default(null)
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
    .describe("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXJlcG9ydFBheWxvYWREZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtcmVwb3J0UGF5bG9hZERlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUV4QixlQUFlLENBQUM7S0FDYixNQUFNLENBQUM7SUFDTixVQUFVLEVBQUUsQ0FBQztTQUNWLE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyx3REFBd0QsQ0FBQztTQUNsRSxPQUFPLENBQUMsMkJBQTJCLENBQUM7SUFDdkMsV0FBVyxFQUFFLENBQUM7U0FDWCxNQUFNLEVBQUU7U0FDUixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLFFBQVEsQ0FDUCwrREFBK0QsQ0FDaEU7SUFDSCxXQUFXLEVBQUUsQ0FBQztTQUNYLE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyw4REFBOEQsQ0FBQztRQUN6RSxpQkFBaUI7U0FDaEIsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLDhEQUE4RCxDQUFDO1NBQ3hFLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDaEIsS0FBSyxFQUFFLENBQUM7U0FDTCxNQUFNLEVBQUU7U0FDUixRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFDOUIsaUJBQWlCO1NBQ2hCLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztTQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2hCLFFBQVEsRUFBRSxDQUFDO1NBQ1IsTUFBTSxFQUFFO1NBQ1IsUUFBUSxDQUFDLDhEQUE4RCxDQUFDO1FBQ3pFLGlCQUFpQjtTQUNoQixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsOERBQThELENBQUM7U0FDeEUsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNoQixVQUFVLEVBQUUsQ0FBQztTQUNWLE1BQU0sRUFBRTtTQUNSLEdBQUcsRUFBRTtTQUNMLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsUUFBUSxDQUNQLGdFQUFnRSxDQUNqRTtTQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUM7Q0FDaEIsQ0FBQztLQUNELFFBQVEsQ0FDUCw2TUFBNk0sQ0FDOU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHpcbiAgLm9iamVjdCh7XG4gICAgb2JqZWN0VHlwZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIilcbiAgICAgIC5kZWZhdWx0KFwiUkVQT1JUX1BBWUxPQURfREVTQ1JJUFRPUlwiKSxcbiAgICBwYXlsb2FkVHlwZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAubWluKDEpXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICksXG4gICAgcmVhZGluZ1R5cGU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSB0eXBlIG9mIHJlYWRpbmcuXCIpXG4gICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgdW5pdHM6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIGFjY3VyYWN5OiB6XG4gICAgICAubnVtYmVyKClcbiAgICAgIC5kZXNjcmliZShcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiKVxuICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBhY2N1cmFjeSBvZiBhIHNldCBvZiBwYXlsb2FkIHZhbHVlcy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIGNvbmZpZGVuY2U6IHpcbiAgICAgIC5udW1iZXIoKVxuICAgICAgLmludCgpXG4gICAgICAuZ3RlKDApXG4gICAgICAubHRlKDEwMClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJBIHF1YW50aWZpY2F0aW9uIG9mIHRoZSBjb25maWRlbmNlIGluIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdCgxMDApLFxuICB9KVxuICAuZGVzY3JpYmUoXG4gICAgXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiXG4gICk7XG4iXX0=