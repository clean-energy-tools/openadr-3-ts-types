"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
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
    .describe("A pair of floats typically used as a point on a 2 dimensional grid.");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXBvaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3pvZC96b2QtcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBd0I7QUFFeEIsa0JBQWUsT0FBQztLQUNiLE1BQU0sQ0FBQztJQUNOLENBQUMsRUFBRSxPQUFDO1NBQ0QsTUFBTSxFQUFFO1NBQ1IsUUFBUSxDQUFDLHVCQUF1QixDQUFDO1NBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDYixRQUFRLEVBQUU7U0FDVixRQUFRLENBQUMsdUJBQXVCLENBQUM7U0FDakMsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDLEVBQUUsT0FBQztTQUNELE1BQU0sRUFBRTtTQUNSLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQztTQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ2IsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLHNCQUFzQixDQUFDO1NBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Q0FDakIsQ0FBQztLQUNELFFBQVEsQ0FDUCxxRUFBcUUsQ0FDdEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHpcbiAgLm9iamVjdCh7XG4gICAgeDogelxuICAgICAgLm51bWJlcigpXG4gICAgICAuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGFuIHggYXhpcy5cIilcbiAgICAgIC5kZWZhdWx0KG51bGwpXG4gICAgICAubnVsbGFibGUoKVxuICAgICAgLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgICB5OiB6XG4gICAgICAubnVtYmVyKClcbiAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKVxuICAgICAgLm51bGxhYmxlKClcbiAgICAgIC5kZXNjcmliZShcIkEgdmFsdWUgb24gYSB5IGF4aXMuXCIpXG4gICAgICAuZGVmYXVsdChudWxsKSxcbiAgfSlcbiAgLmRlc2NyaWJlKFxuICAgIFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiXG4gICk7XG4iXX0=