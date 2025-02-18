
import Joi from 'joi';

///////////  Data types for OpenADR 3

// Export type names for things like request parameters

export * from './codegen/oadr3Components.js';

// Export the OpenADR types as their base name

export {
    Program, ProgramRequest,
    Report, ReportRequest,
    Event, EventRequest,
    Subscription, SubscriptionRequest,
    Ven, VenRequest,
    Resource, ResourceRequest,
    ObjectMetadata,
    Interval, IntervalPeriod,
    ValuesMap,
    Point,
    EventPayloadDescriptor,
    ReportPayloadDescriptor,
    ReportDescriptor,
    ObjectID,
    Notification,
    ObjectTypes,
    DateTime, Duration,
    ClientCredentialRequest,
    ClientCredentialResponse,
    AuthError,
    Problem
} from './codegen/oadr3Schemas.js';

// Import from the same files for use in this module.

import * as OADR3Components from './codegen/oadr3Components.js';
import * as OADR3 from './codegen/oadr3Schemas.js';

///////////  Zod validators for OpenADR 3

// These export the schema object as zodSchemaTypeName

export { default as zodSchemaAuthError } from './zod/zod-authError.js';
export { default as zodSchemaClientCredentialRequest } from './zod/zod-clientCredentialRequest.js';
export { default as zodSchemaClientCredentialResponse } from './zod/zod-clientCredentialResponse.js';
export { default as zodSchemaDateTime } from './zod/zod-dateTime.js';
export { default as zodSchemaDuration } from './zod/zod-duration.js';
export { default as zodSchemaEvent } from './zod/zod-event.js';
export { default as zodSchemaEventPayloadDescriptor } from './zod/zod-eventPayloadDescriptor.js';
export { default as zodSchemaEventRequest } from './zod/zod-eventRequest.js';
export { default as zodSchemaInterval } from './zod/zod-interval.js';
export { default as zodSchemaIntervalPeriod } from './zod/zod-intervalPeriod.js';
export { default as zodSchemaNotification } from './zod/zod-notification.js';
export { default as zodSchemaObjectID } from './zod/zod-objectID.js';
export { default as zodSchemaObjectTypes } from './zod/zod-objectTypes.js';
export { default as zodSchemaPoint } from './zod/zod-point.js';
export { default as zodSchemaProblem } from './zod/zod-problem.js';
export { default as zodSchemaProgram } from './zod/zod-program.js';
export { default as zodSchemaProgramRequest } from './zod/zod-programRequest.js';
export { default as zodSchemaReport } from './zod/zod-report.js';
export { default as zodSchemaReportDescriptor } from './zod/zod-reportDescriptor.js';
export { default as zodSchemaReportPayloadDescriptor } from './zod/zod-reportPayloadDescriptor.js';
export { default as zodSchemaResource } from './zod/zod-resource.js';
export { default as zodSchemaResourceRequest } from './zod/zod-resourceRequest.js';
export { default as zodSchemaSubscription } from './zod/zod-subscription.js';
export { default as zodSchemaSubscriptionRequest } from './zod/zod-subscriptionRequest.js';
export { default as zodSchemaValuesMap } from './zod/zod-valuesMap.js';
export { default as zodSchemaVen } from './zod/zod-ven.js';
export { default as zodSchemaVenRequest } from './zod/zod-venRequest.js';

// These import the same schemas from which to construct validator functions

import { default as schemaAuthError } from './zod/zod-authError.js';
import { default as schemaClientCredentialRequest } from './zod/zod-clientCredentialRequest.js';
import { default as schemaClientCredentialResponse } from './zod/zod-clientCredentialResponse.js';
import { default as schemaDateTime } from './zod/zod-dateTime.js';
import { default as schemaDuration } from './zod/zod-duration.js';
import { default as schemaEvent } from './zod/zod-event.js';
import { default as schemaEventPayloadDescriptor } from './zod/zod-eventPayloadDescriptor.js';
import { default as schemaEventRequest } from './zod/zod-eventRequest.js';
import { default as schemaInterval } from './zod/zod-interval.js';
import { default as schemaIntervalPeriod } from './zod/zod-intervalPeriod.js';
import { default as schemaNotification } from './zod/zod-notification.js';
import { default as schemaObjectID } from './zod/zod-objectID.js';
import { default as schemaObjectTypes } from './zod/zod-objectTypes.js';
import { default as schemaPoint } from './zod/zod-point.js';
import { default as schemaProblem } from './zod/zod-problem.js';
import { default as schemaProgram } from './zod/zod-program.js';
import { default as schemaProgramRequest } from './zod/zod-programRequest.js';
import { default as schemaReport } from './zod/zod-report.js';
import { default as schemaReportDescriptor } from './zod/zod-reportDescriptor.js';
import { default as schemaReportPayloadDescriptor } from './zod/zod-reportPayloadDescriptor.js';
import { default as schemaResource } from './zod/zod-resource.js';
import { default as schemaResourceRequest } from './zod/zod-resourceRequest.js';
import { default as schemaSubscription } from './zod/zod-subscription.js';
import { default as schemaSubscriptionRequest } from './zod/zod-subscriptionRequest.js';
import { default as schemaValuesMap } from './zod/zod-valuesMap.js';
import { default as schemaVen } from './zod/zod-ven.js';
import { default as schemaVenRequest } from './zod/zod-venRequest.js';

type zodTypes = Zod.AnyZodObject
    | Zod.ZodString
    | Zod.ZodDefault<Zod.ZodString>
    | Zod.ZodIntersection<
                Zod.ZodRecord<Zod.ZodString, Zod.ZodTypeAny>,
                Zod.ZodIntersection<Zod.ZodTypeAny, Zod.ZodTypeAny>
    >
    | Zod.ZodEnum<["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]>;

// This generates a validator function

function zodValidator<P>(ZSCHEMA: zodTypes, data: any) {
    return function validator(data: any) {
        const v = ZSCHEMA.safeParse(data);
        if (v.success) {
            return {
                value: v.data as P
            };
        } else {
            return {
                errors: [ v.error ]
            };
        }
    }
}

// Exports validator functions for each type

export function zodValidateAuthError(data: any) {
    return zodValidator<OADR3.AuthError>(schemaAuthError, data);
}

export function zodValidateClientCredentialRequest(data: any) {
    return zodValidator<OADR3.ClientCredentialRequest>(schemaClientCredentialRequest, data);
}

export function zodValidateClientCredentialResponse(data: any) {
    return zodValidator<OADR3.ClientCredentialResponse>(schemaClientCredentialResponse, data);
}

export function zodValidateDateTime(data: any) {
    return zodValidator<OADR3.DateTime>(schemaDateTime, data);
}

export function zodValidateDuration(data: any) {
    return zodValidator<OADR3.Duration>(schemaDuration, data);
}

export function zodValidateEvent(data: any) {
    return zodValidator<OADR3.Event>(schemaEvent, data);
}

export function zodValidateEventPayloadDescriptor(data: any) {
    return zodValidator<OADR3.EventPayloadDescriptor>(schemaEventPayloadDescriptor, data);
}

export function zodValidateEventRequest(data: any) {
    return zodValidator<OADR3.EventRequest>(schemaEventRequest, data);
}

export function zodValidateInterval(data: any) {
    return zodValidator<OADR3.Interval>(schemaInterval, data);
}

export function zodValidateIntervalPeriod(data: any) {
    return zodValidator<OADR3.IntervalPeriod>(schemaIntervalPeriod, data);
}

export function zodValidateNotification(data: any) {
    return zodValidator<OADR3.Notification>(schemaNotification, data);
}

export function zodValidateObjectID(data: any) {
    return zodValidator<OADR3.ObjectID>(schemaObjectID, data);
}

export function zodValidateObjectTypes(data: any) {
    return zodValidator<OADR3.ObjectTypes>(schemaObjectTypes, data);
}

export function zodValidatePoint(data: any) {
    return zodValidator<OADR3.Point>(schemaPoint, data);
}

export function zodValidateProblem(data: any) {
    return zodValidator<OADR3.Problem>(schemaProblem, data);
}

export function zodValidateProgram(data: any) {
    return zodValidator<OADR3.Program>(schemaProgram, data);
}

export function zodValidateProgramRequest(data: any) {
    return zodValidator<OADR3.ProgramRequest>(schemaProgramRequest, data);
}

export function zodValidateReport(data: any) {
    return zodValidator<OADR3.Report>(schemaReport, data);
}

export function zodValidateReportDescriptor(data: any) {
    return zodValidator<OADR3.ReportDescriptor>(schemaReportDescriptor, data);
}

export function zodValidateReportPayloadDescriptor(data: any) {
    return zodValidator<OADR3.ReportPayloadDescriptor>(schemaReportPayloadDescriptor, data);
}

export function zodValidateResource(data: any) {
    return zodValidator<OADR3.Resource>(schemaResource, data);
}

export function zodValidateResourceRequest(data: any) {
    return zodValidator<OADR3.ResourceRequest>(schemaResourceRequest, data);
}

export function zodValidateSubscription(data: any) {
    return zodValidator<OADR3.Subscription>(schemaSubscription, data);
}

export function zodValidateSubscriptionRequest(data: any) {
    return zodValidator<OADR3.SubscriptionRequest>(schemaSubscriptionRequest, data);
}

export function zodValidateValuesMap(data: any) {
    return zodValidator<OADR3.ValuesMap>(schemaValuesMap, data);
}

export function zodValidateVen(data: any) {
    return zodValidator<OADR3.Ven>(schemaVen, data);
}

export function zodValidateVenRequest(data: any) {
    return zodValidator<OADR3.VenRequest>(schemaVenRequest, data);
}

///////////  Joi schema validators for OpenADR 3

import { schemas } from './joi/oadr3.js';

// The joiTypeName exports is the Joi schema definition for the type
// The joiValidateTypeName exports are a function to assist with validation.
//
// For the latter, the return type follows this pattern
//
//       const { error, value } = schema.validate({ ... object });
//
// The actual type is Joi.ValidationResult<TypeName> so that it's
// properly declared.

export const joiAuthError = schemas.components.authError;
export function joiValidateauthError(prog: any): Joi.ValidationResult<OADR3.AuthError> {
    return joiAuthError.validate(prog, { allowUnknown: true });
}

export const joiClientCredentialRequest = schemas.components.clientCredentialRequest;
export function joiValidateClientCredentialRequest(prog: any): Joi.ValidationResult<OADR3.ClientCredentialRequest> {
    return joiClientCredentialRequest.validate(prog, { allowUnknown: true });
}

export const joiClientCredentialResponse = schemas.components.clientCredentialResponse;
export function joiValidateClientCredentialResponse(prog: any): Joi.ValidationResult<OADR3.ClientCredentialResponse> {
    return joiClientCredentialResponse.validate(prog, { allowUnknown: true });
}

export const joiDateTime = schemas.components.dateTime; //.prefs({ convert: false });
export function joiValidateDateTime(prog: any): Joi.ValidationResult<any> {
    return joiDateTime.validate(prog, { allowUnknown: true });
}

export const joiDuration = schemas.components.duration;
export function joiValidateDuration(prog: any): Joi.ValidationResult<OADR3.Duration> {
    return joiDuration.validate(prog, { allowUnknown: true });
}

export const joiEvent = schemas.components.event;
export function joiValidateEvent(prog: any): Joi.ValidationResult<OADR3.Event> {
    return joiEvent.validate(prog, { allowUnknown: true });
}

export const joiSearchAllEvents = schemas.parameters.searchAllEvents.query;
export function joiValidateSearchAllEvents(
    prog: OADR3Components.SearchAllEventsQueryParams
): Joi.ValidationResult<OADR3Components.SearchAllEventsQueryParams>
{
    return joiSearchAllEvents.validate(prog, { allowUnknown: true });
}

export const joiEventPayloadDescriptor = schemas.components.eventPayloadDescriptor;
export function joiValidateEventPayloadDescriptor(prog: any): Joi.ValidationResult<OADR3.EventPayloadDescriptor> {
    return joiEventPayloadDescriptor.validate(prog, { allowUnknown: true });
}

export const joiEventRequest = schemas.components.eventRequest;
export function joiValidateEventRequest(prog: any): Joi.ValidationResult<OADR3.EventRequest> {
    return joiEventRequest.validate(prog, { allowUnknown: true });
}

export const joiInterval = schemas.components.interval;
export function joiValidateInterval(prog: any): Joi.ValidationResult<OADR3.Interval> {
    return joiInterval.validate(prog, { allowUnknown: true });
}

export const joiIntervalPeriod = schemas.components.intervalPeriod;
export function joiValidateIntervalPeriod(prog: any): Joi.ValidationResult<OADR3.IntervalPeriod> {
    return joiIntervalPeriod.validate(prog, { allowUnknown: true });
}

export const joiNotification = schemas.components.notification;
export function joiValidateNotification(prog: any): Joi.ValidationResult<OADR3.Notification> {
    return joiNotification.validate(prog, { allowUnknown: true });
}

export const joiObjectID = schemas.components.objectID;
export function joiValidateObjectID(prog: any): Joi.ValidationResult<OADR3.ObjectID> {
    return joiObjectID.validate(prog, { allowUnknown: true });
}

export const joiObjectMetadata = schemas.components.objectMetadata;
export function joiValidateObjectMetadata(prog: any): Joi.ValidationResult<OADR3.ObjectMetadata> {
    return joiObjectMetadata.validate(prog, { allowUnknown: true });
}

export const joiObjectTypes = schemas.components.objectTypes;
export function joiValidateObjectTypes(prog: any): Joi.ValidationResult<string> {
    return joiObjectTypes.validate(prog, { allowUnknown: true });
}

export const joiPoint = schemas.components.point;
export function joiValidatePoint(prog: any): Joi.ValidationResult<OADR3.Point> {
    return joiPoint.validate(prog, { allowUnknown: true });
}

export const joiProblem = schemas.components.problem;
export function joiValidateProblem(prog: any): Joi.ValidationResult<OADR3.Problem> {
    return joiProblem.validate(prog, { allowUnknown: true });
}

export const joiProgram = schemas.components.program;
export function joiValidateProgram(prog: any): Joi.ValidationResult<OADR3.Program> {
    return joiProgram.validate(prog, { allowUnknown: true });
}

export const joiProgramRequest = schemas.components.programRequest;
export function joiValidateProgramRequest(prog: any): Joi.ValidationResult<OADR3.ProgramRequest> {
    return joiProgramRequest.validate(prog, { allowUnknown: true });
}

export const joiSearchAllPrograms = schemas.parameters.searchAllPrograms.query;
export function joiValidateSearchAllPrograms(prog: any): Joi.ValidationResult<any> {
    return joiSearchAllPrograms.validate(prog, { allowUnknown: true });
}

export const joiReport = schemas.components.report;
export function joiValidateReport(report: any): Joi.ValidationResult<OADR3.Report> {
    return joiReport.validate(report, { allowUnknown: true , debug: true });
}

export const joiReportRequest = schemas.components.reportRequest;
export function joiValidateReportRequest(report: any): Joi.ValidationResult<OADR3.ReportRequest> {
    return joiReportRequest.validate(report, { allowUnknown: true , debug: true });
}

export const joiSearchAllReports = schemas.parameters.searchAllReports.query;
export function joiValidateSearchAllReports(prog: any): Joi.ValidationResult<any> {
    return joiSearchAllReports.validate(prog, { allowUnknown: true });
}

export const joiReportDescriptor = schemas.components.reportDescriptor;
export function joiValidateReportDescriptor(report: any): Joi.ValidationResult<OADR3.ReportDescriptor> {
    return joiReportDescriptor.validate(report, { allowUnknown: true });
}

export const joiReportPayloadDescriptor = schemas.components.reportPayloadDescriptor;
export function joiValidateReportPayloadDescriptor(report: any): Joi.ValidationResult<OADR3.ReportPayloadDescriptor> {
    return joiReportPayloadDescriptor.validate(report, { allowUnknown: true });
}

export const joiResource = schemas.components.resource;
export function joiValidateResource(report: any): Joi.ValidationResult<OADR3.Resource> {
    return joiResource.validate(report, { allowUnknown: true });
}

export const joiResourceRequest = schemas.components.resourceRequest;
export function joiValidateResourceRequest(report: any): Joi.ValidationResult<OADR3.ResourceRequest> {
    return joiResourceRequest.validate(report, { allowUnknown: true });
}

export const joiSearchVenResources = schemas.parameters.searchVenResources.query;
export function joiValidateSearchVenResources(prog: any): Joi.ValidationResult<any> {
    return joiSearchVenResources.validate(prog, { allowUnknown: true });
}

export const joiSubscription = schemas.components.subscription;
export function joiValidateSubscription(report: any): Joi.ValidationResult<OADR3.Subscription> {
    return joiSubscription.validate(report, { allowUnknown: true });
}

export const joiSubscriptionRequest = schemas.components.subscriptionRequest;
export function joiValidateSubscriptionRequest(report: any): Joi.ValidationResult<OADR3.SubscriptionRequest> {
    return joiSubscriptionRequest.validate(report, { allowUnknown: true });
}

export const joiSearchSubscriptions = schemas.parameters.searchSubscriptions.query;
export function joiValidateSearchSubscriptions(prog: any): Joi.ValidationResult<any> {
    return joiSearchSubscriptions.validate(prog, { allowUnknown: true });
}

export const joiValuesMap = schemas.components.valuesMap;
export function joiValidateValuesMap(report: any): Joi.ValidationResult<OADR3.ValuesMap> {
    return joiValuesMap.validate(report, { allowUnknown: true });
}

export const joiVen = schemas.components.ven;
export function joiValidateVen(report: any): Joi.ValidationResult<OADR3.Ven> {
    return joiVen.validate(report, { allowUnknown: true });
}

export const joiVenRequest = schemas.components.venRequest;
export function joiValidateVenRequest(report: any): Joi.ValidationResult<OADR3.VenRequest> {
    return joiVenRequest.validate(report, { allowUnknown: true });
}

export const joiSearchVens = schemas.parameters.searchVens.query;
export function joiValidateSearchVens(prog: any): Joi.ValidationResult<any> {
    return joiSearchVens.validate(prog, { allowUnknown: true });
}

// These lines are for inspecting the type as understood by Zod.
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
