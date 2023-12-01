"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = zod_1.z
    .string()
    .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
    .min(1)
    .max(128)
    .describe("URL safe VTN assigned object ID.");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLW9iamVjdElELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3pvZC96b2Qtb2JqZWN0SUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBd0I7QUFFeEIsa0JBQWUsT0FBQztLQUNiLE1BQU0sRUFBRTtLQUNSLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0tBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDTixHQUFHLENBQUMsR0FBRyxDQUFDO0tBQ1IsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5leHBvcnQgZGVmYXVsdCB6XG4gIC5zdHJpbmcoKVxuICAucmVnZXgobmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Xy1dKiRcIikpXG4gIC5taW4oMSlcbiAgLm1heCgxMjgpXG4gIC5kZXNjcmliZShcIlVSTCBzYWZlIFZUTiBhc3NpZ25lZCBvYmplY3QgSUQuXCIpO1xuIl19