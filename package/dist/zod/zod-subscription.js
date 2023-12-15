import { z } from "zod";
export default z
    .object({
    id: z
        .string()
        .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
        .min(1)
        .max(128)
        .describe("URL safe VTN assigned object ID.")
        .optional(),
    createdDateTime: z
        .string()
        .datetime()
        .describe("datetime in ISO 8601 format")
        .optional(),
    modificationDateTime: z
        .string()
        .datetime()
        .describe("datetime in ISO 8601 format")
        .optional(),
    objectType: z
        .literal("SUBSCRIPTION")
        .describe("Used as discriminator, e.g. notification.object")
        .optional(),
    clientName: z
        .string()
        .min(1)
        .max(128)
        .describe("User generated identifier, may be VEN identifier provisioned during program enrollment."),
    programID: z
        .string()
        .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
        .min(1)
        .max(128)
        .describe("URL safe VTN assigned object ID."),
    objectOperations: z
        .array(z
        .object({
        objects: z
            .array(z
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
        operations: z
            .array(z
            .enum(["GET", "POST", "PUT", "DELETE"])
            .describe("object operation to subscribe to."))
            .describe("list of operations to subscribe to."),
        callbackUrl: z
            .string()
            .url()
            .describe("User provided webhook URL."),
        bearerToken: z
            .string()
            .describe("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
            // .default(null)
            .nullable()
            .describe("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n")
            .default(null),
    })
        .describe("object type, operations, and callbackUrl."))
        .describe("list of objects and operations to subscribe to."),
    targets: z
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
                    // .default(null)
                    .nullable()
                    .describe("A value on an x axis.")
                    .default(null),
                y: z
                    .number()
                    .describe("A value on a y axis.")
                    // .default(null)
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
        // .default(null)
        .nullable()
        .describe("A list of valuesMap objects. Used by server to filter callbacks.")
        .default(null),
})
    .describe("An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXN1YnNjcmlwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy96b2Qvem9kLXN1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXhCLGVBQWUsQ0FBQztLQUNiLE1BQU0sQ0FBQztJQUNOLEVBQUUsRUFBRSxDQUFDO1NBQ0YsTUFBTSxFQUFFO1NBQ1IsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQUMsa0NBQWtDLENBQUM7U0FDNUMsUUFBUSxFQUFFO0lBQ2IsZUFBZSxFQUFFLENBQUM7U0FDZixNQUFNLEVBQUU7U0FDUixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsNkJBQTZCLENBQUM7U0FDdkMsUUFBUSxFQUFFO0lBQ2Isb0JBQW9CLEVBQUUsQ0FBQztTQUNwQixNQUFNLEVBQUU7U0FDUixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsNkJBQTZCLENBQUM7U0FDdkMsUUFBUSxFQUFFO0lBQ2IsVUFBVSxFQUFFLENBQUM7U0FDVixPQUFPLENBQUMsY0FBYyxDQUFDO1NBQ3ZCLFFBQVEsQ0FBQyxpREFBaUQsQ0FBQztTQUMzRCxRQUFRLEVBQUU7SUFDYixVQUFVLEVBQUUsQ0FBQztTQUNWLE1BQU0sRUFBRTtTQUNSLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ1IsUUFBUSxDQUNQLHlGQUF5RixDQUMxRjtJQUNILFNBQVMsRUFBRSxDQUFDO1NBQ1QsTUFBTSxFQUFFO1NBQ1IsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDUixRQUFRLENBQUMsa0NBQWtDLENBQUM7SUFDL0MsZ0JBQWdCLEVBQUUsQ0FBQztTQUNoQixLQUFLLENBQ0osQ0FBQztTQUNFLE1BQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDO2FBQ1AsS0FBSyxDQUNKLENBQUM7YUFDRSxJQUFJLENBQUM7WUFDSixTQUFTO1lBQ1QsT0FBTztZQUNQLFFBQVE7WUFDUixjQUFjO1lBQ2QsS0FBSztZQUNMLFVBQVU7U0FDWCxDQUFDO2FBQ0QsUUFBUSxDQUFDLDJDQUEyQyxDQUFDLENBQ3pEO2FBQ0EsUUFBUSxDQUFDLGtDQUFrQyxDQUFDO1FBQy9DLFVBQVUsRUFBRSxDQUFDO2FBQ1YsS0FBSyxDQUNKLENBQUM7YUFDRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN0QyxRQUFRLENBQUMsbUNBQW1DLENBQUMsQ0FDakQ7YUFDQSxRQUFRLENBQUMscUNBQXFDLENBQUM7UUFDbEQsV0FBVyxFQUFFLENBQUM7YUFDWCxNQUFNLEVBQUU7YUFDUixHQUFHLEVBQUU7YUFDTCxRQUFRLENBQUMsNEJBQTRCLENBQUM7UUFDekMsV0FBVyxFQUFFLENBQUM7YUFDWCxNQUFNLEVBQUU7YUFDUixRQUFRLENBQ1AsaUpBQWlKLENBQ2xKO1lBQ0QsaUJBQWlCO2FBQ2hCLFFBQVEsRUFBRTthQUNWLFFBQVEsQ0FDUCxpSkFBaUosQ0FDbEo7YUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDO0tBQ2pCLENBQUM7U0FDRCxRQUFRLENBQUMsMkNBQTJDLENBQUMsQ0FDekQ7U0FDQSxRQUFRLENBQUMsaURBQWlELENBQUM7SUFDOUQsT0FBTyxFQUFFLENBQUM7U0FDUCxLQUFLLENBQ0osQ0FBQztTQUNFLE1BQU0sQ0FBQztRQUNOLElBQUksRUFBRSxDQUFDO2FBQ0osTUFBTSxFQUFFO2FBQ1IsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDUixRQUFRLENBQ1AsbUlBQW1JLENBQ3BJO1FBQ0gsTUFBTSxFQUFFLENBQUM7YUFDTixLQUFLLENBQ0osQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNOLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDVixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ2hCLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDVixDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ1gsQ0FBQztpQkFDRSxNQUFNLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUM7cUJBQ0QsTUFBTSxFQUFFO3FCQUNSLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDbEMsaUJBQWlCO3FCQUNoQixRQUFRLEVBQUU7cUJBQ1YsUUFBUSxDQUFDLHVCQUF1QixDQUFDO3FCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDLEVBQUUsQ0FBQztxQkFDRCxNQUFNLEVBQUU7cUJBQ1IsUUFBUSxDQUFDLHNCQUFzQixDQUFDO29CQUNqQyxpQkFBaUI7cUJBQ2hCLFFBQVEsRUFBRTtxQkFDVixRQUFRLENBQUMsc0JBQXNCLENBQUM7cUJBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDakIsQ0FBQztpQkFDRCxRQUFRLENBQ1AscUVBQXFFLENBQ3RFO1NBQ0osQ0FBQyxDQUNIO2FBQ0EsUUFBUSxDQUNQLHFFQUFxRSxDQUN0RTtLQUNKLENBQUM7U0FDRCxRQUFRLENBQ1AsOEdBQThHLENBQy9HLENBQ0o7U0FDQSxRQUFRLENBQ1Asa0VBQWtFLENBQ25FO1FBQ0QsaUJBQWlCO1NBQ2hCLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FDUCxrRUFBa0UsQ0FDbkU7U0FDQSxPQUFPLENBQUMsSUFBSSxDQUFDO0NBQ2pCLENBQUM7S0FDRCxRQUFRLENBQ1AsaUxBQWlMLENBQ2xMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5vYmplY3Qoe1xuICAgIGlkOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIGNyZWF0ZWREYXRlVGltZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGF0ZXRpbWUoKVxuICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICBtb2RpZmljYXRpb25EYXRlVGltZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAuZGF0ZXRpbWUoKVxuICAgICAgLmRlc2NyaWJlKFwiZGF0ZXRpbWUgaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICBvYmplY3RUeXBlOiB6XG4gICAgICAubGl0ZXJhbChcIlNVQlNDUklQVElPTlwiKVxuICAgICAgLmRlc2NyaWJlKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLCBlLmcuIG5vdGlmaWNhdGlvbi5vYmplY3RcIilcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIGNsaWVudE5hbWU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLm1pbigxKVxuICAgICAgLm1heCgxMjgpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiVXNlciBnZW5lcmF0ZWQgaWRlbnRpZmllciwgbWF5IGJlIFZFTiBpZGVudGlmaWVyIHByb3Zpc2lvbmVkIGR1cmluZyBwcm9ncmFtIGVucm9sbG1lbnQuXCJcbiAgICAgICksXG4gICAgcHJvZ3JhbUlEOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSlcbiAgICAgIC5taW4oMSlcbiAgICAgIC5tYXgoMTI4KVxuICAgICAgLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIiksXG4gICAgb2JqZWN0T3BlcmF0aW9uczogelxuICAgICAgLmFycmF5KFxuICAgICAgICB6XG4gICAgICAgICAgLm9iamVjdCh7XG4gICAgICAgICAgICBvYmplY3RzOiB6XG4gICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICB6XG4gICAgICAgICAgICAgICAgICAuZW51bShbXG4gICAgICAgICAgICAgICAgICAgIFwiUFJPR1JBTVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkVWRU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUkVQT1JUXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiU1VCU0NSSVBUSU9OXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVkVOXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUkVTT1VSQ0VcIixcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcImxpc3Qgb2Ygb2JqZWN0cyB0byBzdWJzY3JpYmUgdG8uXCIpLFxuICAgICAgICAgICAgb3BlcmF0aW9uczogelxuICAgICAgICAgICAgICAuYXJyYXkoXG4gICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgLmVudW0oW1wiR0VUXCIsIFwiUE9TVFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiXSlcbiAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIm9iamVjdCBvcGVyYXRpb24gdG8gc3Vic2NyaWJlIHRvLlwiKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcImxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCIpLFxuICAgICAgICAgICAgY2FsbGJhY2tVcmw6IHpcbiAgICAgICAgICAgICAgLnN0cmluZygpXG4gICAgICAgICAgICAgIC51cmwoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJVc2VyIHByb3ZpZGVkIHdlYmhvb2sgVVJMLlwiKSxcbiAgICAgICAgICAgIGJlYXJlclRva2VuOiB6XG4gICAgICAgICAgICAgIC5zdHJpbmcoKVxuICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgLm51bGxhYmxlKClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgIFwiVXNlciBwcm92aWRlZCB0b2tlbi5cXG5UbyBhdm9pZCBjdXN0b20gaW50ZWdyYXRpb25zLCBjYWxsYmFjayBlbmRwb2ludHNcXG5zaG91bGQgYWNjZXB0IHRoZSBwcm92aWRlZCBiZWFyZXIgdG9rZW4gdG8gYXV0aGVudGljYXRlIFZUTiByZXF1ZXN0cy5cXG5cIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRlc2NyaWJlKFwib2JqZWN0IHR5cGUsIG9wZXJhdGlvbnMsIGFuZCBjYWxsYmFja1VybC5cIilcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcImxpc3Qgb2Ygb2JqZWN0cyBhbmQgb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCIpLFxuICAgIHRhcmdldHM6IHpcbiAgICAgIC5hcnJheShcbiAgICAgICAgelxuICAgICAgICAgIC5vYmplY3Qoe1xuICAgICAgICAgICAgdHlwZTogelxuICAgICAgICAgICAgICAuc3RyaW5nKClcbiAgICAgICAgICAgICAgLm1pbigxKVxuICAgICAgICAgICAgICAubWF4KDEyOClcbiAgICAgICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgICAgICdFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcIlBSSUNFXCIgaW5kaWNhdGVzIHZhbHVlIGlzIHRvIGJlIGludGVycHJldGVkIGFzIGEgY3VycmVuY3kuXFxuJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgdmFsdWVzOiB6XG4gICAgICAgICAgICAgIC5hcnJheShcbiAgICAgICAgICAgICAgICB6LnVuaW9uKFtcbiAgICAgICAgICAgICAgICAgIHoubnVtYmVyKCksXG4gICAgICAgICAgICAgICAgICB6Lm51bWJlcigpLmludCgpLFxuICAgICAgICAgICAgICAgICAgei5zdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgIHouYm9vbGVhbigpLFxuICAgICAgICAgICAgICAgICAgelxuICAgICAgICAgICAgICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB4OiB6XG4gICAgICAgICAgICAgICAgICAgICAgICAubnVtYmVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udWxsYWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IHpcbiAgICAgICAgICAgICAgICAgICAgICAgIC5udW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5kZWZhdWx0KG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAubnVsbGFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kZWZhdWx0KG51bGwpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZGVzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCJcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5kZXNjcmliZShcbiAgICAgICAgICAgICAgICBcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRlc2NyaWJlKFxuICAgICAgICAgICAgXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy4gVXNlZCBieSBzZXJ2ZXIgdG8gZmlsdGVyIGNhbGxiYWNrcy5cIlxuICAgICAgKVxuICAgICAgLy8gLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXG4gICAgICAgIFwiQSBsaXN0IG9mIHZhbHVlc01hcCBvYmplY3RzLiBVc2VkIGJ5IHNlcnZlciB0byBmaWx0ZXIgY2FsbGJhY2tzLlwiXG4gICAgICApXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgfSlcbiAgLmRlc2NyaWJlKFxuICAgIFwiQW4gb2JqZWN0IGNyZWF0ZWQgYnkgYSBjbGllbnQgdG8gcmVjZWl2ZSBub3RpZmljYXRpb24gb2Ygb3BlcmF0aW9ucyBvbiBvYmplY3RzLlxcbkNsaWVudHMgbWF5IHN1YnNjcmliZSB0byBiZSBub3RpZmllZCB3aGVuIGEgdHlwZSBvZiBvYmplY3QgaXMgY3JlYXRlZCxcXG51cGRhdGVkLCBvciBkZWxldGVkLlxcblwiXG4gICk7XG4iXX0=