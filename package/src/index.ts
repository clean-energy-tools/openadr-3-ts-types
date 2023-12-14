
// export * from './types.js';
// export * from './zod-types.js';

// export * from './codegen/openAdRSchemas.js';
// export * from './codegen/openAdRSchemas-zod.js';
export * from './codegen/openadr3ApiComponents.js';

export {
    DateTime, Duration,
    Event, EventPayloadDescriptor,
    Interval, IntervalPeriod,
    Notification,
    ObjectID, ObjectTypes,
    Point, Problem, Program,
    Report, ReportDescriptor, ReportPayloadDescriptor, Resource,
    Subscription,
    ValuesMap, Ven
} from './codegen/openADRSchemas.js';

export { default as parseDateTime } from './zod/zod-dateTime.js';
export { default as parseDuration } from './zod/zod-duration.js';
export { default as parseEvent } from './zod/zod-event.js';
export { default as parseEventPayloadDescriptor } from './zod/zod-eventPayloadDescriptor.js';
export { default as parseInterval } from './zod/zod-interval.js';
export { default as parseIntervalPeriod } from './zod/zod-intervalPeriod.js';
export { default as parseNotification } from './zod/zod-notification.js';
export { default as parseObjectID } from './zod/zod-objectID.js';
export { default as parseObjectTypes } from './zod/zod-objectTypes.js';
export { default as parsePoint } from './zod/zod-point.js';
export { default as parseProblem } from './zod/zod-problem.js';
export { default as parseProgram } from './zod/zod-program.js';
export { default as parseReport } from './zod/zod-report.js';
export { default as parseReportDescriptor } from './zod/zod-reportDescriptor.js';
export { default as parseReportPayloadDescriptor } from './zod/zod-reportPayloadDescriptor.js';
export { default as parseResource } from './zod/zod-resource.js';
export { default as parseSubscription } from './zod/zod-subscription.js';
export { default as parseValuesMap } from './zod/zod-valuesMap.js';
export { default as parseVen } from './zod/zod-ven.js';

// These linex are for inspecting the type as understood by Zod.
// Uncomment the lines, fixing up a declaration for the type
// you want to inspect.  Then, in Visual Studio Code, hover the
// mouse over the `zodTypeName` variable, and a popup appears
// showing the type.

// import { z } from 'zod';

// import { default as parseEvent } from './zod/zod-event.js';
// type zodEvent = z.infer<typeof parseEvent>;

// This section supports using './codegen/openADRSchemas-zod.js'
// as the source for Zod schema's.  That file can be generated
// using `ts-to-zod` from  './codegen/openADRSchemas.js'.
//
// In that case each schema object has the name `typeNameSchema`
// but we want to export `parseTypeName` instead.
//
// The fatal problem with these schema's is that default values
// for nested Zod schema's are not properly handled. 

// export {
//     dateTimeSchema as parseDateTime,
//     durationSchema as parseDuration,
//     eventSchema as parseEvent,
//     eventPayloadDescriptorSchema as parseEventPayloadDescriptor,

//     intervalPeriodSchema as parseIntervalPeriod,
//     intervalSchema as parseInterval,

//     notificationSchema as parseNotification,

//     objectIDSchema as parseObjectID,
//     objectTypesSchema as parseObjectTypes,

//     pointSchema as parsePoint,
//     problemSchema as parseProblem,
//     programSchema as parseProgram,

//     reportDescriptorSchema as parseReportDescriptor,
//     reportSchema as parseReport,
//     reportPayloadDescriptorSchema as parseReportPayloadDescriptor,
//     resourceSchema as parseResource,

//     subscriptionSchema as parseSubscription,
    
//     valuesMapSchema as parseValuesMap,
//     venSchema as parseVen
// } from './codegen/openADRSchemas-zod.js';
