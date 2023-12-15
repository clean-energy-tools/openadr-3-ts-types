import { z } from "zod";
export default z
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
        // .default(null)
        .nullable()
        .describe("Units of measure.")
        .default(null),
    currency: z
        .string()
        .describe("Currency of price payload.")
        // .default(null)
        .nullable()
        .describe("Currency of price payload.")
        .default(null),
})
    .describe("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWV2ZW50UGF5bG9hZERlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvem9kL3pvZC1ldmVudFBheWxvYWREZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFeEIsZUFBZSxDQUFDO0tBQ2IsTUFBTSxDQUFDO0lBQ04sVUFBVSxFQUFFLENBQUM7U0FDVixNQUFNLEVBQUU7U0FDUixRQUFRLENBQUMsd0RBQXdELENBQUM7U0FDbEUsT0FBTyxDQUFDLDBCQUEwQixDQUFDO0lBQ3RDLFdBQVcsRUFBRSxDQUFDO1NBQ1gsTUFBTSxFQUFFO1NBQ1IsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQ1AsK0RBQStELENBQ2hFO0lBQ0gsS0FBSyxFQUFFLENBQUM7U0FDTCxNQUFNLEVBQUU7U0FDUixRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFDOUIsaUJBQWlCO1NBQ2hCLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztTQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2hCLFFBQVEsRUFBRSxDQUFDO1NBQ1IsTUFBTSxFQUFFO1NBQ1IsUUFBUSxDQUFDLDRCQUE0QixDQUFDO1FBQ3ZDLGlCQUFpQjtTQUNoQixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsNEJBQTRCLENBQUM7U0FDdEMsT0FBTyxDQUFDLElBQUksQ0FBQztDQUNqQixDQUFDO0tBQ0QsUUFBUSxDQUNQLDBNQUEwTSxDQUMzTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgelxuICAub2JqZWN0KHtcbiAgICBvYmplY3RUeXBlOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBwcm9ncmFtLnBheWxvYWREZXNjcmlwdG9yc1wiKVxuICAgICAgLmRlZmF1bHQoXCJFVkVOVF9QQVlMT0FEX0RFU0NSSVBUT1JcIiksXG4gICAgcGF5bG9hZFR5cGU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLm1pbigxKVxuICAgICAgLm1heCgxMjgpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiXG4gICAgICApLFxuICAgIHVuaXRzOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAvLyAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICBjdXJyZW5jeTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGVzY3JpYmUoXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJDdXJyZW5jeSBvZiBwcmljZSBwYXlsb2FkLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gIH0pXG4gIC5kZXNjcmliZShcbiAgICBcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgZXZlbnQgdmFsdWVzTWFwIHZhbHVlcy5cXG5FLmcuIGEgUFJJQ0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSBwcmljZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgY3VycmVuY3kuXFxuXCJcbiAgKTtcbiJdfQ==