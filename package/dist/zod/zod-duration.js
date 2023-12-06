import { z } from "zod";
export default z
    .string()
    .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
    .describe("duration in ISO 8601 format")
    .default("PT0S");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWR1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtZHVyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUV4QixlQUFlLENBQUM7S0FDYixNQUFNLEVBQUU7S0FDUixLQUFLLENBQ0osSUFBSSxNQUFNLENBQ1Isb0hBQW9ILENBQ3JILENBQ0Y7S0FDQSxRQUFRLENBQUMsNkJBQTZCLENBQUM7S0FDdkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgelxuICAuc3RyaW5nKClcbiAgLnJlZ2V4KFxuICAgIG5ldyBSZWdFeHAoXG4gICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICApXG4gIClcbiAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gIC5kZWZhdWx0KFwiUFQwU1wiKTtcbiJdfQ==