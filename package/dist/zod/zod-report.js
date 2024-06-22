import { z } from "zod";
export default z.object({ "id": z.string().regex(new RegExp("^[a-zA-Z0-9_-]*$")).min(1).max(128).describe("URL safe VTN assigned object ID.").optional(), "createdDateTime": z.string().datetime().describe("datetime in ISO 8601 format").optional(), "modificationDateTime": z.string().datetime().describe("datetime in ISO 8601 format").optional(), "objectType": z.literal("REPORT").describe("Used as discriminator").optional(), "programID": z.string().regex(new RegExp("^[a-zA-Z0-9_-]*$")).min(1).max(128).describe("URL safe VTN assigned object ID."), "eventID": z.string().regex(new RegExp("^[a-zA-Z0-9_-]*$")).min(1).max(128).describe("URL safe VTN assigned object ID."), "clientName": z.string().min(1).max(128).describe("User generated identifier; may be VEN ID provisioned out-of-band."), "reportName": z.string().nullable().describe("User defined string for use in debugging or User Interface.").default(null), "payloadDescriptors": z.array(z.object({ "objectType": z.literal("REPORT_PAYLOAD_DESCRIPTOR").describe("Used as discriminator.").optional(), "payloadType": z.string().min(1).max(128).describe("Enumerated or private string signifying the nature of values."), "readingType": z.string().nullable().describe("Enumerated or private string signifying the type of reading.").default(null), "units": z.string().nullable().describe("Units of measure.").default(null), "accuracy": z.number().nullable().describe("A quantification of the accuracy of a set of payload values.").default(null), "confidence": z.number().int().gte(0).lte(100).nullable().describe("A quantification of the confidence in a set of payload values.").default(null) }).describe("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n")).nullable().describe("A list of reportPayloadDescriptors.").default(null), "resources": z.array(z.object({ "resourceName": z.string().min(1).max(128).describe("User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"), "intervalPeriod": z.object({ "start": z.string().datetime().describe("datetime in ISO 8601 format"), "duration": z.string().regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$")).describe("duration in ISO 8601 format").default("PT0S"), "randomizeStart": z.string().regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$")).describe("duration in ISO 8601 format").default("PT0S") }).describe("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n").optional(), "intervals": z.array(z.object({ "id": z.number().int().describe("A client generated number assigned an interval object. Not a sequence number."), "intervalPeriod": z.object({ "start": z.string().datetime().describe("datetime in ISO 8601 format"), "duration": z.string().regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$")).describe("duration in ISO 8601 format").default("PT0S"), "randomizeStart": z.string().regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$")).describe("duration in ISO 8601 format").default("PT0S") }).describe("Defines temporal aspects of intervals.\nA duration of default PT0S indicates instantaneous or infinity, depending on payloadType.\nA randomizeStart of default null indicates no randomization.\n").optional(), "payloads": z.array(z.object({ "type": z.string().min(1).max(128).describe("Enumerated or private string signifying the nature of values.\nE.G. \"PRICE\" indicates value is to be interpreted as a currency.\n"), "values": z.array(z.union([z.number(), z.number().int(), z.string(), z.boolean(), z.object({ "x": z.number().describe("A value on an x axis."), "y": z.number().describe("A value on a y axis.") }).describe("A pair of floats typically used as a point on a 2 dimensional grid.")])).describe("A list of data points. Most often a singular value such as a price.") }).describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")).describe("A list of valuesMap objects.") }).describe("An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n")).describe("A list of interval objects.") }).describe("Report data associated with a resource.")).describe("A list of objects containing report data for a set of resources.") }).describe("report object.");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy96b2Qvem9kLXJlcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXhCLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENB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QUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHFFQUFxRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLHFFQUFxRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyw4R0FBOEcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxvS0FBb0ssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGtFQUFrRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgei5vYmplY3QoeyBcImlkXCI6IHouc3RyaW5nKCkucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpLm1pbigxKS5tYXgoMTI4KS5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpLm9wdGlvbmFsKCksIFwiY3JlYXRlZERhdGVUaW1lXCI6IHouc3RyaW5nKCkuZGF0ZXRpbWUoKS5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKS5vcHRpb25hbCgpLCBcIm1vZGlmaWNhdGlvbkRhdGVUaW1lXCI6IHouc3RyaW5nKCkuZGF0ZXRpbWUoKS5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKS5vcHRpb25hbCgpLCBcIm9iamVjdFR5cGVcIjogei5saXRlcmFsKFwiUkVQT1JUXCIpLmRlc2NyaWJlKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yXCIpLm9wdGlvbmFsKCksIFwicHJvZ3JhbUlEXCI6IHouc3RyaW5nKCkucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpLm1pbigxKS5tYXgoMTI4KS5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpLCBcImV2ZW50SURcIjogei5zdHJpbmcoKS5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSkubWluKDEpLm1heCgxMjgpLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIiksIFwiY2xpZW50TmFtZVwiOiB6LnN0cmluZygpLm1pbigxKS5tYXgoMTI4KS5kZXNjcmliZShcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXI7IG1heSBiZSBWRU4gSUQgcHJvdmlzaW9uZWQgb3V0LW9mLWJhbmQuXCIpLCBcInJlcG9ydE5hbWVcIjogei5zdHJpbmcoKS5udWxsYWJsZSgpLmRlc2NyaWJlKFwiVXNlciBkZWZpbmVkIHN0cmluZyBmb3IgdXNlIGluIGRlYnVnZ2luZyBvciBVc2VyIEludGVyZmFjZS5cIikuZGVmYXVsdChudWxsKSwgXCJwYXlsb2FkRGVzY3JpcHRvcnNcIjogei5hcnJheSh6Lm9iamVjdCh7IFwib2JqZWN0VHlwZVwiOiB6LmxpdGVyYWwoXCJSRVBPUlRfUEFZTE9BRF9ERVNDUklQVE9SXCIpLmRlc2NyaWJlKFwiVXNlZCBhcyBkaXNjcmltaW5hdG9yLlwiKS5vcHRpb25hbCgpLCBcInBheWxvYWRUeXBlXCI6IHouc3RyaW5nKCkubWluKDEpLm1heCgxMjgpLmRlc2NyaWJlKFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlwiKSwgXCJyZWFkaW5nVHlwZVwiOiB6LnN0cmluZygpLm51bGxhYmxlKCkuZGVzY3JpYmUoXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIHR5cGUgb2YgcmVhZGluZy5cIikuZGVmYXVsdChudWxsKSwgXCJ1bml0c1wiOiB6LnN0cmluZygpLm51bGxhYmxlKCkuZGVzY3JpYmUoXCJVbml0cyBvZiBtZWFzdXJlLlwiKS5kZWZhdWx0KG51bGwpLCBcImFjY3VyYWN5XCI6IHoubnVtYmVyKCkubnVsbGFibGUoKS5kZXNjcmliZShcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGFjY3VyYWN5IG9mIGEgc2V0IG9mIHBheWxvYWQgdmFsdWVzLlwiKS5kZWZhdWx0KG51bGwpLCBcImNvbmZpZGVuY2VcIjogei5udW1iZXIoKS5pbnQoKS5ndGUoMCkubHRlKDEwMCkubnVsbGFibGUoKS5kZXNjcmliZShcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCIpLmRlZmF1bHQobnVsbCkgfSkuZGVzY3JpYmUoXCJDb250ZXh0dWFsIGluZm9ybWF0aW9uIHVzZWQgdG8gaW50ZXJwcmV0IHJlcG9ydCBwYXlsb2FkIHZhbHVlcy5cXG5FLmcuIGEgVVNBR0UgcGF5bG9hZCBzaW1wbHkgY29udGFpbnMgYSB1c2FnZSB2YWx1ZSwgYW5cXG5hc3NvY2lhdGVkIGRlc2NyaXB0b3IgcHJvdmlkZXMgbmVjZXNzYXJ5IGNvbnRleHQgc3VjaCBhcyB1bml0cyBhbmQgZGF0YSBxdWFsaXR5LlxcblwiKSkubnVsbGFibGUoKS5kZXNjcmliZShcIkEgbGlzdCBvZiByZXBvcnRQYXlsb2FkRGVzY3JpcHRvcnMuXCIpLmRlZmF1bHQobnVsbCksIFwicmVzb3VyY2VzXCI6IHouYXJyYXkoei5vYmplY3QoeyBcInJlc291cmNlTmFtZVwiOiB6LnN0cmluZygpLm1pbigxKS5tYXgoMTI4KS5kZXNjcmliZShcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIuIEEgdmFsdWUgb2YgQUdHUkVHQVRFRF9SRVBPUlQgaW5kaWNhdGVzIGFuIGFnZ3JlZ2F0aW9uIG9mIG1vcmUgdGhhdCBvbmUgcmVzb3VyY2UncyBkYXRhXCIpLCBcImludGVydmFsUGVyaW9kXCI6IHoub2JqZWN0KHsgXCJzdGFydFwiOiB6LnN0cmluZygpLmRhdGV0aW1lKCkuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksIFwiZHVyYXRpb25cIjogei5zdHJpbmcoKS5yZWdleChuZXcgUmVnRXhwKFwiXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyRcIikpLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpLmRlZmF1bHQoXCJQVDBTXCIpLCBcInJhbmRvbWl6ZVN0YXJ0XCI6IHouc3RyaW5nKCkucmVnZXgobmV3IFJlZ0V4cChcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCIpKS5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKS5kZWZhdWx0KFwiUFQwU1wiKSB9KS5kZXNjcmliZShcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IFBUMFMgaW5kaWNhdGVzIGluc3RhbnRhbmVvdXMgb3IgaW5maW5pdHksIGRlcGVuZGluZyBvbiBwYXlsb2FkVHlwZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIikub3B0aW9uYWwoKSwgXCJpbnRlcnZhbHNcIjogei5hcnJheSh6Lm9iamVjdCh7IFwiaWRcIjogei5udW1iZXIoKS5pbnQoKS5kZXNjcmliZShcIkEgY2xpZW50IGdlbmVyYXRlZCBudW1iZXIgYXNzaWduZWQgYW4gaW50ZXJ2YWwgb2JqZWN0LiBOb3QgYSBzZXF1ZW5jZSBudW1iZXIuXCIpLCBcImludGVydmFsUGVyaW9kXCI6IHoub2JqZWN0KHsgXCJzdGFydFwiOiB6LnN0cmluZygpLmRhdGV0aW1lKCkuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIiksIFwiZHVyYXRpb25cIjogei5zdHJpbmcoKS5yZWdleChuZXcgUmVnRXhwKFwiXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyRcIikpLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpLmRlZmF1bHQoXCJQVDBTXCIpLCBcInJhbmRvbWl6ZVN0YXJ0XCI6IHouc3RyaW5nKCkucmVnZXgobmV3IFJlZ0V4cChcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCIpKS5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKS5kZWZhdWx0KFwiUFQwU1wiKSB9KS5kZXNjcmliZShcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IFBUMFMgaW5kaWNhdGVzIGluc3RhbnRhbmVvdXMgb3IgaW5maW5pdHksIGRlcGVuZGluZyBvbiBwYXlsb2FkVHlwZS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIikub3B0aW9uYWwoKSwgXCJwYXlsb2Fkc1wiOiB6LmFycmF5KHoub2JqZWN0KHsgXCJ0eXBlXCI6IHouc3RyaW5nKCkubWluKDEpLm1heCgxMjgpLmRlc2NyaWJlKFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXFxcIlBSSUNFXFxcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG5cIiksIFwidmFsdWVzXCI6IHouYXJyYXkoei51bmlvbihbei5udW1iZXIoKSwgei5udW1iZXIoKS5pbnQoKSwgei5zdHJpbmcoKSwgei5ib29sZWFuKCksIHoub2JqZWN0KHsgXCJ4XCI6IHoubnVtYmVyKCkuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIiksIFwieVwiOiB6Lm51bWJlcigpLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIikgfSkuZGVzY3JpYmUoXCJBIHBhaXIgb2YgZmxvYXRzIHR5cGljYWxseSB1c2VkIGFzIGEgcG9pbnQgb24gYSAyIGRpbWVuc2lvbmFsIGdyaWQuXCIpXSkpLmRlc2NyaWJlKFwiQSBsaXN0IG9mIGRhdGEgcG9pbnRzLiBNb3N0IG9mdGVuIGEgc2luZ3VsYXIgdmFsdWUgc3VjaCBhcyBhIHByaWNlLlwiKSB9KS5kZXNjcmliZShcIlJlcHJlc2VudHMgb25lIG9yIG1vcmUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIHR5cGUuXFxuRS5nLiBhIHR5cGUgb2YgUFJJQ0UgY29udGFpbnMgYSBzaW5nbGUgZmxvYXQgdmFsdWUuXFxuXCIpKS5kZXNjcmliZShcIkEgbGlzdCBvZiB2YWx1ZXNNYXAgb2JqZWN0cy5cIikgfSkuZGVzY3JpYmUoXCJBbiBvYmplY3QgZGVmaW5pbmcgYSB0ZW1wb3JhbCB3aW5kb3cgYW5kIGEgbGlzdCBvZiB2YWx1ZXNNYXBzLlxcbmlmIGludGVydmFsUGVyaW9kIHByZXNlbnQgbWF5IHNldCB0ZW1wb3JhbCBhc3BlY3RzIG9mIGludGVydmFsIG9yIG92ZXJyaWRlIGV2ZW50LmludGVydmFsUGVyaW9kLlxcblwiKSkuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgaW50ZXJ2YWwgb2JqZWN0cy5cIikgfSkuZGVzY3JpYmUoXCJSZXBvcnQgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSByZXNvdXJjZS5cIikpLmRlc2NyaWJlKFwiQSBsaXN0IG9mIG9iamVjdHMgY29udGFpbmluZyByZXBvcnQgZGF0YSBmb3IgYSBzZXQgb2YgcmVzb3VyY2VzLlwiKSB9KS5kZXNjcmliZShcInJlcG9ydCBvYmplY3QuXCIpO1xuIl19