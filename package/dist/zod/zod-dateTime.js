"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .string()
    .datetime()
    .describe("datetime in ISO 8601 format")
    .default("0000-00-00");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWRhdGVUaW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtZGF0ZVRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBd0I7QUFFeEIsa0JBQWUsT0FBQztLQUNiLE1BQU0sRUFBRTtLQUNSLFFBQVEsRUFBRTtLQUNWLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztLQUN2QyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5zdHJpbmcoKVxuICAuZGF0ZXRpbWUoKVxuICAuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIilcbiAgLmRlZmF1bHQoXCIwMDAwLTAwLTAwXCIpO1xuIl19