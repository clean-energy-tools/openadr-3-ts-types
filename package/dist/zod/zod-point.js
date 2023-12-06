import { z } from "zod";
export default z
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
    .describe("A pair of floats typically used as a point on a 2 dimensional grid.");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXBvaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUV4QixlQUFlLENBQUM7S0FDYixNQUFNLENBQUM7SUFDTixDQUFDLEVBQUUsQ0FBQztTQUNELE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztTQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ2IsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLHVCQUF1QixDQUFDO1NBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxFQUFFLENBQUM7U0FDRCxNQUFNLEVBQUU7U0FDUixRQUFRLENBQUMsc0JBQXNCLENBQUM7U0FDaEMsT0FBTyxDQUFDLElBQUksQ0FBQztTQUNiLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQztTQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDO0NBQ2pCLENBQUM7S0FDRCxRQUFRLENBQ1AscUVBQXFFLENBQ3RFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5vYmplY3Qoe1xuICAgIHg6IHpcbiAgICAgIC5udW1iZXIoKVxuICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gICAgeTogelxuICAgICAgLm51bWJlcigpXG4gICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbClcbiAgICAgIC5udWxsYWJsZSgpXG4gICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKVxuICAgICAgLmRlZmF1bHQobnVsbCksXG4gIH0pXG4gIC5kZXNjcmliZShcbiAgICBcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIlxuICApO1xuIl19