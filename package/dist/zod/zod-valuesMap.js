"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
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
    .describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXZhbHVlc01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy96b2Qvem9kLXZhbHVlc01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF3QjtBQUV4QixrQkFBZSxPQUFDO0tBQ2IsTUFBTSxDQUFDO0lBQ04sSUFBSSxFQUFFLE9BQUM7U0FDSixNQUFNLEVBQUU7U0FDUixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLFFBQVEsQ0FDUCxtSUFBbUksQ0FDcEk7SUFDSCxNQUFNLEVBQUUsT0FBQztTQUNOLEtBQUssQ0FDSixPQUFDLENBQUMsS0FBSyxDQUFDO1FBQ04sT0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNWLE9BQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7UUFDaEIsT0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNWLE9BQUMsQ0FBQyxPQUFPLEVBQUU7UUFDWCxPQUFDO2FBQ0UsTUFBTSxDQUFDO1lBQ04sQ0FBQyxFQUFFLE9BQUM7aUJBQ0QsTUFBTSxFQUFFO2lCQUNSLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQztpQkFDYixRQUFRLEVBQUU7aUJBQ1YsUUFBUSxDQUFDLHVCQUF1QixDQUFDO2lCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUMsRUFBRSxPQUFDO2lCQUNELE1BQU0sRUFBRTtpQkFDUixRQUFRLENBQUMsc0JBQXNCLENBQUM7aUJBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQ2IsUUFBUSxFQUFFO2lCQUNWLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQztTQUNqQixDQUFDO2FBQ0QsUUFBUSxDQUNQLHFFQUFxRSxDQUN0RTtLQUNKLENBQUMsQ0FDSDtTQUNBLFFBQVEsQ0FDUCxxRUFBcUUsQ0FDdEU7Q0FDSixDQUFDO0tBQ0QsUUFBUSxDQUNQLDhHQUE4RyxDQUMvRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgelxuICAub2JqZWN0KHtcbiAgICB0eXBlOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAnRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXCJQUklDRVwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcbidcbiAgICAgICksXG4gICAgdmFsdWVzOiB6XG4gICAgICAuYXJyYXkoXG4gICAgICAgIHoudW5pb24oW1xuICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgei5udW1iZXIoKS5pbnQoKSxcbiAgICAgICAgICB6LnN0cmluZygpLFxuICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgIHpcbiAgICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAgICAgICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICB5OiB6XG4gICAgICAgICAgICAgICAgLm51bWJlcigpXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAuZGVmYXVsdChudWxsKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICAgICAgICAgICApLFxuICAgICAgICBdKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgKSxcbiAgfSlcbiAgLmRlc2NyaWJlKFxuICAgIFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIlxuICApO1xuIl19