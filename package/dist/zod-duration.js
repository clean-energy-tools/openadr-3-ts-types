"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .string()
    .regex(new RegExp("/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"))
    .describe("duration in ISO 8601 format")
    .default("PT0S");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWR1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3pvZC96b2QtZHVyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBd0I7QUFFeEIsa0JBQWUsT0FBQztLQUNiLE1BQU0sRUFBRTtLQUNSLEtBQUssQ0FDSixJQUFJLE1BQU0sQ0FDUixzSEFBc0gsQ0FDdkgsQ0FDRjtLQUNBLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztLQUN2QyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5zdHJpbmcoKVxuICAucmVnZXgoXG4gICAgbmV3IFJlZ0V4cChcbiAgICAgIFwiL14oLT8pUCg/PVxcXFxkfFRcXFxcZCkoPzooXFxcXGQrKVkpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKykoW0RXXSkpPyg/OlQoPzooXFxcXGQrKUgpPyg/OihcXFxcZCspTSk/KD86KFxcXFxkKyg/OlxcXFwuXFxcXGQrKT8pUyk/KT8kL1wiXG4gICAgKVxuICApXG4gIC5kZXNjcmliZShcImR1cmF0aW9uIGluIElTTyA4NjAxIGZvcm1hdFwiKVxuICAuZGVmYXVsdChcIlBUMFNcIik7XG4iXX0=