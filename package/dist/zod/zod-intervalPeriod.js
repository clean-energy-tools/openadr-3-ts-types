import { z } from "zod";
export default z
    .object({
    start: z.string().datetime().describe("datetime in ISO 8601 format"),
    duration: z
        .string()
        .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
        .describe("duration in ISO 8601 format")
        .default("PT0S"),
    randomizeStart: z
        .string()
        .regex(new RegExp("^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$"))
        .describe("duration in ISO 8601 format")
        .default("PT0S"),
})
    .describe("Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWludGVydmFsUGVyaW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtaW50ZXJ2YWxQZXJpb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUV4QixlQUFlLENBQUM7S0FDYixNQUFNLENBQUM7SUFDTixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztJQUNwRSxRQUFRLEVBQUUsQ0FBQztTQUNSLE1BQU0sRUFBRTtTQUNSLEtBQUssQ0FDSixJQUFJLE1BQU0sQ0FDUixvSEFBb0gsQ0FDckgsQ0FDRjtTQUNBLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztTQUN2QyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2xCLGNBQWMsRUFBRSxDQUFDO1NBQ2QsTUFBTSxFQUFFO1NBQ1IsS0FBSyxDQUNKLElBQUksTUFBTSxDQUNSLG9IQUFvSCxDQUNySCxDQUNGO1NBQ0EsUUFBUSxDQUFDLDZCQUE2QixDQUFDO1NBQ3ZDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDbkIsQ0FBQztLQUNELFFBQVEsQ0FDUCx3SkFBd0osQ0FDekosQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHpcbiAgLm9iamVjdCh7XG4gICAgc3RhcnQ6IHouc3RyaW5nKCkuZGF0ZXRpbWUoKS5kZXNjcmliZShcImRhdGV0aW1lIGluIElTTyA4NjAxIGZvcm1hdFwiKSxcbiAgICBkdXJhdGlvbjogelxuICAgICAgLnN0cmluZygpXG4gICAgICAucmVnZXgoXG4gICAgICAgIG5ldyBSZWdFeHAoXG4gICAgICAgICAgXCJeKC0/KVAoPz1cXFxcZHxUXFxcXGQpKD86KFxcXFxkKylZKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCspKFtEV10pKT8oPzpUKD86KFxcXFxkKylIKT8oPzooXFxcXGQrKU0pPyg/OihcXFxcZCsoPzpcXFxcLlxcXFxkKyk/KVMpPyk/JFwiXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAgICAgLmRlZmF1bHQoXCJQVDBTXCIpLFxuICAgIHJhbmRvbWl6ZVN0YXJ0OiB6XG4gICAgICAuc3RyaW5nKClcbiAgICAgIC5yZWdleChcbiAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICBcIl4oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kXCJcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmRlc2NyaWJlKFwiZHVyYXRpb24gaW4gSVNPIDg2MDEgZm9ybWF0XCIpXG4gICAgICAuZGVmYXVsdChcIlBUMFNcIiksXG4gIH0pXG4gIC5kZXNjcmliZShcbiAgICBcIkRlZmluZXMgdGVtcG9yYWwgYXNwZWN0cyBvZiBpbnRlcnZhbHMuXFxuQSBkdXJhdGlvbiBvZiBkZWZhdWx0IG51bGwgaW5kaWNhdGVzIGluZmluaXR5LlxcbkEgcmFuZG9taXplU3RhcnQgb2YgZGVmYXVsdCBudWxsIGluZGljYXRlcyBubyByYW5kb21pemF0aW9uLlxcblwiXG4gICk7XG4iXX0=