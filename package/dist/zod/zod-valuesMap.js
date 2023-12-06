import { z } from "zod";
export default z
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
    .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXZhbHVlc01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy96b2Qvem9kLXZhbHVlc01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXhCLGVBQWUsQ0FBQztLQUNiLE1BQU0sQ0FBQztJQUNOLElBQUksRUFBRSxDQUFDO1NBQ0osTUFBTSxFQUFFO1NBQ1IsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQ1AsbUlBQW1JLENBQ3BJO0lBQ0gsTUFBTSxFQUFFLENBQUM7U0FDTixLQUFLLENBQ0osQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNOLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFDVixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1FBQ2hCLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFDVixDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ1gsQ0FBQzthQUNFLE1BQU0sQ0FBQztZQUNOLENBQUMsRUFBRSxDQUFDO2lCQUNELE1BQU0sRUFBRTtpQkFDUixRQUFRLENBQUMsdUJBQXVCLENBQUM7aUJBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQ2IsUUFBUSxFQUFFO2lCQUNWLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDLEVBQUUsQ0FBQztpQkFDRCxNQUFNLEVBQUU7aUJBQ1IsUUFBUSxDQUFDLHNCQUFzQixDQUFDO2lCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUNiLFFBQVEsRUFBRTtpQkFDVixRQUFRLENBQUMsc0JBQXNCLENBQUM7aUJBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDakIsQ0FBQzthQUNELFFBQVEsQ0FDUCxxRUFBcUUsQ0FDdEU7S0FDSixDQUFDLENBQ0g7U0FDQSxRQUFRLENBQ1AscUVBQXFFLENBQ3RFO0NBQ0osQ0FBQztLQUNELFFBQVEsQ0FDUCw4R0FBOEcsQ0FDL0csQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHpcbiAgLm9iamVjdCh7XG4gICAgdHlwZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAubWluKDEpXG4gICAgICAubWF4KDEyOClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgJ0VudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgbmF0dXJlIG9mIHZhbHVlcy5cXG5FLkcuIFwiUFJJQ0VcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG4nXG4gICAgICApLFxuICAgIHZhbHVlczogelxuICAgICAgLmFycmF5KFxuICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICB6Lm51bWJlcigpLFxuICAgICAgICAgIHoubnVtYmVyKCkuaW50KCksXG4gICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICB6LmJvb2xlYW4oKSxcbiAgICAgICAgICB6XG4gICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgeDogelxuICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgICAgeTogelxuICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgXSlcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCJcbiAgICAgICksXG4gIH0pXG4gIC5kZXNjcmliZShcbiAgICBcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCJcbiAgKTtcbiJdfQ==