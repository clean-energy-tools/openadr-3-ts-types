"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    objectType: zod_1.z
        .string()
        .describe("Used as discriminator, e.g. program.payloadDescriptors")
        .default("EVENT_PAYLOAD_DESCRIPTOR"),
    payloadType: zod_1.z
        .string()
        .min(1)
        .max(128)
        .describe("Enumerated or private string signifying the nature of values."),
    units: zod_1.z
        .string()
        .describe("Units of measure.")
        .default(null)
        .nullable()
        .describe("Units of measure.")
        .default(null),
    currency: zod_1.z
        .string()
        .describe("Currency of price payload.")
        .default("USD")
        .nullable()
        .describe("Currency of price payload.")
        .default("USD"),
})
    .describe("Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWV2ZW50UGF5bG9hZERlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvem9kL3pvZC1ldmVudFBheWxvYWREZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQXdCO0FBRXhCLGtCQUFlLE9BQUM7S0FDYixNQUFNLENBQUM7SUFDTixVQUFVLEVBQUUsT0FBQztTQUNWLE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyx3REFBd0QsQ0FBQztTQUNsRSxPQUFPLENBQUMsMEJBQTBCLENBQUM7SUFDdEMsV0FBVyxFQUFFLE9BQUM7U0FDWCxNQUFNLEVBQUU7U0FDUixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLFFBQVEsQ0FDUCwrREFBK0QsQ0FDaEU7SUFDSCxLQUFLLEVBQUUsT0FBQztTQUNMLE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztTQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ2IsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLG1CQUFtQixDQUFDO1NBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDaEIsUUFBUSxFQUFFLE9BQUM7U0FDUixNQUFNLEVBQUU7U0FDUixRQUFRLENBQUMsNEJBQTRCLENBQUM7U0FDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNkLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQztTQUN0QyxPQUFPLENBQUMsS0FBSyxDQUFDO0NBQ2xCLENBQUM7S0FDRCxRQUFRLENBQ1AsME1BQTBNLENBQzNNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5vYmplY3Qoe1xuICAgIG9iamVjdFR5cGU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIHByb2dyYW0ucGF5bG9hZERlc2NyaXB0b3JzXCIpXG4gICAgICAuZGVmYXVsdChcIkVWRU5UX1BBWUxPQURfREVTQ1JJUFRPUlwiKSxcbiAgICBwYXlsb2FkVHlwZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAubWluKDEpXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCJcbiAgICAgICksXG4gICAgdW5pdHM6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiVW5pdHMgb2YgbWVhc3VyZS5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgIGN1cnJlbmN5OiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kZXNjcmliZShcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAuZGVmYXVsdChcIlVTRFwiKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIkN1cnJlbmN5IG9mIHByaWNlIHBheWxvYWQuXCIpXG4gICAgICAuZGVmYXVsdChcIlVTRFwiKSxcbiAgfSlcbiAgLmRlc2NyaWJlKFxuICAgIFwiQ29udGV4dHVhbCBpbmZvcm1hdGlvbiB1c2VkIHRvIGludGVycHJldCBldmVudCB2YWx1ZXNNYXAgdmFsdWVzLlxcbkUuZy4gYSBQUklDRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHByaWNlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBjdXJyZW5jeS5cXG5cIlxuICApO1xuIl19