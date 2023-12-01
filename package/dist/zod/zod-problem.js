"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    type: zod_1.z
        .string()
        .url()
        .describe("An absolute URI that identifies the problem type.\nWhen dereferenced, it SHOULD provide human-readable documentation for the problem type\n(e.g., using HTML).\n")
        .default("about:blank"),
    title: zod_1.z
        .string()
        .describe("A short, summary of the problem type. Written in english and readable\nfor engineers (usually not suited for non technical stakeholders and\nnot localized); example: Service Unavailable.\n")
        .optional(),
    status: zod_1.z
        .number()
        .int()
        .gte(100)
        .lt(600)
        .describe("The HTTP status code generated by the origin server for this occurrence\nof the problem.\n")
        .optional(),
    detail: zod_1.z
        .string()
        .describe("A human readable explanation specific to this occurrence of the\nproblem.\n")
        .optional(),
    instance: zod_1.z
        .string()
        .url()
        .describe("An absolute URI that identifies the specific occurrence of the problem.\nIt may or may not yield further information if dereferenced.\n")
        .optional(),
})
    .describe("reusable error response. From https://opensource.zalando.com/problem/schema.yaml.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXByb2JsZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvem9kL3pvZC1wcm9ibGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQXdCO0FBRXhCLGtCQUFlLE9BQUM7S0FDYixNQUFNLENBQUM7SUFDTixJQUFJLEVBQUUsT0FBQztTQUNKLE1BQU0sRUFBRTtTQUNSLEdBQUcsRUFBRTtTQUNMLFFBQVEsQ0FDUCxrS0FBa0ssQ0FDbks7U0FDQSxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3pCLEtBQUssRUFBRSxPQUFDO1NBQ0wsTUFBTSxFQUFFO1NBQ1IsUUFBUSxDQUNQLDhMQUE4TCxDQUMvTDtTQUNBLFFBQVEsRUFBRTtJQUNiLE1BQU0sRUFBRSxPQUFDO1NBQ04sTUFBTSxFQUFFO1NBQ1IsR0FBRyxFQUFFO1NBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUNSLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDUCxRQUFRLENBQ1AsNEZBQTRGLENBQzdGO1NBQ0EsUUFBUSxFQUFFO0lBQ2IsTUFBTSxFQUFFLE9BQUM7U0FDTixNQUFNLEVBQUU7U0FDUixRQUFRLENBQ1AsNkVBQTZFLENBQzlFO1NBQ0EsUUFBUSxFQUFFO0lBQ2IsUUFBUSxFQUFFLE9BQUM7U0FDUixNQUFNLEVBQUU7U0FDUixHQUFHLEVBQUU7U0FDTCxRQUFRLENBQ1AseUlBQXlJLENBQzFJO1NBQ0EsUUFBUSxFQUFFO0NBQ2QsQ0FBQztLQUNELFFBQVEsQ0FDUCxxRkFBcUYsQ0FDdEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHpcbiAgLm9iamVjdCh7XG4gICAgdHlwZTogelxuICAgICAgLnN0cmluZygpXG4gICAgICAudXJsKClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJBbiBhYnNvbHV0ZSBVUkkgdGhhdCBpZGVudGlmaWVzIHRoZSBwcm9ibGVtIHR5cGUuXFxuV2hlbiBkZXJlZmVyZW5jZWQsIGl0IFNIT1VMRCBwcm92aWRlIGh1bWFuLXJlYWRhYmxlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBwcm9ibGVtIHR5cGVcXG4oZS5nLiwgdXNpbmcgSFRNTCkuXFxuXCJcbiAgICAgIClcbiAgICAgIC5kZWZhdWx0KFwiYWJvdXQ6YmxhbmtcIiksXG4gICAgdGl0bGU6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkEgc2hvcnQsIHN1bW1hcnkgb2YgdGhlIHByb2JsZW0gdHlwZS4gV3JpdHRlbiBpbiBlbmdsaXNoIGFuZCByZWFkYWJsZVxcbmZvciBlbmdpbmVlcnMgKHVzdWFsbHkgbm90IHN1aXRlZCBmb3Igbm9uIHRlY2huaWNhbCBzdGFrZWhvbGRlcnMgYW5kXFxubm90IGxvY2FsaXplZCk7IGV4YW1wbGU6IFNlcnZpY2UgVW5hdmFpbGFibGUuXFxuXCJcbiAgICAgIClcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIHN0YXR1czogelxuICAgICAgLm51bWJlcigpXG4gICAgICAuaW50KClcbiAgICAgIC5ndGUoMTAwKVxuICAgICAgLmx0KDYwMClcbiAgICAgIC5kZXNjcmliZShcbiAgICAgICAgXCJUaGUgSFRUUCBzdGF0dXMgY29kZSBnZW5lcmF0ZWQgYnkgdGhlIG9yaWdpbiBzZXJ2ZXIgZm9yIHRoaXMgb2NjdXJyZW5jZVxcbm9mIHRoZSBwcm9ibGVtLlxcblwiXG4gICAgICApXG4gICAgICAub3B0aW9uYWwoKSxcbiAgICBkZXRhaWw6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkEgaHVtYW4gcmVhZGFibGUgZXhwbGFuYXRpb24gc3BlY2lmaWMgdG8gdGhpcyBvY2N1cnJlbmNlIG9mIHRoZVxcbnByb2JsZW0uXFxuXCJcbiAgICAgIClcbiAgICAgIC5vcHRpb25hbCgpLFxuICAgIGluc3RhbmNlOiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC51cmwoKVxuICAgICAgLmRlc2NyaWJlKFxuICAgICAgICBcIkFuIGFic29sdXRlIFVSSSB0aGF0IGlkZW50aWZpZXMgdGhlIHNwZWNpZmljIG9jY3VycmVuY2Ugb2YgdGhlIHByb2JsZW0uXFxuSXQgbWF5IG9yIG1heSBub3QgeWllbGQgZnVydGhlciBpbmZvcm1hdGlvbiBpZiBkZXJlZmVyZW5jZWQuXFxuXCJcbiAgICAgIClcbiAgICAgIC5vcHRpb25hbCgpLFxuICB9KVxuICAuZGVzY3JpYmUoXG4gICAgXCJyZXVzYWJsZSBlcnJvciByZXNwb25zZS4gRnJvbSBodHRwczovL29wZW5zb3VyY2UuemFsYW5kby5jb20vcHJvYmxlbS9zY2hlbWEueWFtbC5cXG5cIlxuICApO1xuIl19