"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .object({
    start: zod_1.z
        .string()
        .datetime()
        .describe("datetime in ISO 8601 format")
        .default("0000-00-00"),
    duration: zod_1.z
        .string()
        .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
        .describe("duration in ISO 8601 format")
        .default("PT0S"),
    randomizeStart: zod_1.z
        .string()
        .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
        .describe("duration in ISO 8601 format")
        .default("PT0S"),
})
    .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWludGVydmFsUGVyaW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3pvZC96b2QtaW50ZXJ2YWxQZXJpb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBd0I7QUFFeEIsa0JBQWUsT0FBQztLQUNiLE1BQU0sQ0FBQztJQUNOLEtBQUssRUFBRSxPQUFDO1NBQ0wsTUFBTSxFQUFFO1NBQ1IsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLDZCQUE2QixDQUFDO1NBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDeEIsUUFBUSxFQUFFLE9BQUM7U0FDUixNQUFNLEVBQUU7U0FDUixLQUFLLENBQ0osSUFBSSxNQUFNLENBQ1Isc0hBQXNILENBQ3ZILENBQ0Y7U0FDQSxRQUFRLENBQUMsNkJBQTZCLENBQUM7U0FDdkMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNsQixjQUFjLEVBQUUsT0FBQztTQUNkLE1BQU0sRUFBRTtTQUNSLEtBQUssQ0FDSixJQUFJLE1BQU0sQ0FDUixzSEFBc0gsQ0FDdkgsQ0FDRjtTQUNBLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztTQUN2QyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQ25CLENBQUM7S0FDRCxRQUFRLENBQ1Asd0pBQXdKLENBQ3pKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5vYmplY3Qoe1xuICAgIHN0YXJ0OiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5kYXRldGltZSgpXG4gICAgICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgICAgIC5kZWZhdWx0KFwiMDAwMC0wMC0wMFwiKSxcbiAgICBkdXJhdGlvbjogelxuICAgICAgLnN0cmluZygpXG4gICAgICAucmVnZXgoXG4gICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgXCIvXigtPylQKD89XFxcXGR8VFxcXFxkKSg/OihcXFxcZCspWSk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKShbRFddKSk/KD86VCg/OihcXFxcZCspSCk/KD86KFxcXFxkKylNKT8oPzooXFxcXGQrKD86XFxcXC5cXFxcZCspPylTKT8pPyQvXCJcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gICAgcmFuZG9taXplU3RhcnQ6IHpcbiAgICAgIC5zdHJpbmcoKVxuICAgICAgLnJlZ2V4KFxuICAgICAgICBuZXcgUmVnRXhwKFxuICAgICAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICB9KVxuICAuZGVzY3JpYmUoXG4gICAgXCJEZWZpbmVzIHRlbXBvcmFsIGFzcGVjdHMgb2YgaW50ZXJ2YWxzLlxcbkEgZHVyYXRpb24gb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBpbmZpbml0eS5cXG5BIHJhbmRvbWl6ZVN0YXJ0IG9mIGRlZmF1bHQgbnVsbCBpbmRpY2F0ZXMgbm8gcmFuZG9taXphdGlvbi5cXG5cIlxuICApO1xuIl19