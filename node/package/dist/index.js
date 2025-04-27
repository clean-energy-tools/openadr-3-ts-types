///////////  Data types for OpenADR 3
// Export type names for things like request parameters
export * from './codegen/oadr3Components.js';
///////////  Zod validators for OpenADR 3
// These export the schema object as zodSchemaTypeName
export { default as zodSchemaAuthError } from './zod/zod-authError.js';
export { default as zodSchemaAuthServerInfo } from './zod/zod-authServerInfo.js';
export { default as zodSchemaClientCredentialRequest } from './zod/zod-clientCredentialRequest.js';
export { default as zodSchemaClientCredentialResponse } from './zod/zod-clientCredentialResponse.js';
export { default as zodSchemaClientName } from './zod/zod-clientName.js';
export { default as zodSchemaDateTime } from './zod/zod-dateTime.js';
export { default as zodSchemaDuration } from './zod/zod-duration.js';
export { default as zodSchemaEvent } from './zod/zod-event.js';
export { default as zodSchemaEventPayloadDescriptor } from './zod/zod-eventPayloadDescriptor.js';
export { default as zodSchemaEventRequest } from './zod/zod-eventRequest.js';
export { default as zodSchemaInterval } from './zod/zod-interval.js';
export { default as zodSchemaIntervalPeriod } from './zod/zod-intervalPeriod.js';
export { default as zodSchemaMqttNotifierAuthenticationAnonymous } from './zod/zod-mqttNotifierAuthenticationAnonymous.js';
export { default as zodSchemaMqttNotifierAuthenticationCertificate } from './zod/zod-mqttNotifierAuthenticationCertificate.js';
export { default as zodSchemaMqttNotifierAuthenticationOauth2BearerToken } from './zod/zod-mqttNotifierAuthenticationOauth2BearerToken.js';
export { default as zodSchemaMqttNotifierBindingObject } from './zod/zod-mqttNotifierBindingObject.js';
export { default as zodSchemaNotification } from './zod/zod-notification.js';
export { default as zodSchemaNotifierOperationsTopics } from './zod/zod-notifierOperationsTopics.js';
export { default as zodSchemaNotifiersResponse } from './zod/zod-notifiersResponse.js';
export { default as zodSchemaNotifierTopicsResponse } from './zod/zod-notifierTopicsResponse.js';
export { default as zodSchemaObjectID } from './zod/zod-objectID.js';
export { default as zodSchemaObjectMetadata } from './zod/zod-objectMetadata.js';
export { default as zodSchemaObjectTypes } from './zod/zod-objectTypes.js';
export { default as zodSchemaPoint } from './zod/zod-point.js';
export { default as zodSchemaProblem } from './zod/zod-problem.js';
export { default as zodSchemaProgram } from './zod/zod-program.js';
export { default as zodSchemaProgramRequest } from './zod/zod-programRequest.js';
export { default as zodSchemaReadingType } from './zod/zod-readingType.js';
export { default as zodSchemaReport } from './zod/zod-report.js';
export { default as zodSchemaReportDescriptor } from './zod/zod-reportDescriptor.js';
export { default as zodSchemaReportPayloadDescriptor } from './zod/zod-reportPayloadDescriptor.js';
export { default as zodSchemaResource } from './zod/zod-resource.js';
export { default as zodSchemaResourceName } from './zod/zod-resourceName.js';
export { default as zodSchemaResourceRequest } from './zod/zod-resourceRequest.js';
export { default as zodSchemaSubscription } from './zod/zod-subscription.js';
export { default as zodSchemaSubscriptionRequest } from './zod/zod-subscriptionRequest.js';
export { default as zodSchemaTargetType } from './zod/zod-targetType.js';
export { default as zodSchemaTargetValue } from './zod/zod-targetValue.js';
export { default as zodSchemaUnits } from './zod/zod-units.js';
export { default as zodSchemaValuesMap } from './zod/zod-valuesMap.js';
export { default as zodSchemaVen } from './zod/zod-ven.js';
export { default as zodSchemaVenName } from './zod/zod-venName.js';
export { default as zodSchemaVenRequest } from './zod/zod-venRequest.js';
// These import the same schemas from which to construct validator functions
import { default as schemaAuthError } from './zod/zod-authError.js';
import { default as schemaAuthServerInfo } from './zod/zod-authServerInfo.js';
import { default as schemaClientCredentialRequest } from './zod/zod-clientCredentialRequest.js';
import { default as schemaClientCredentialResponse } from './zod/zod-clientCredentialResponse.js';
import { default as schemaClientName } from './zod/zod-clientName.js';
import { default as schemaDateTime } from './zod/zod-dateTime.js';
import { default as schemaDuration } from './zod/zod-duration.js';
import { default as schemaEvent } from './zod/zod-event.js';
import { default as schemaEventPayloadDescriptor } from './zod/zod-eventPayloadDescriptor.js';
import { default as schemaEventRequest } from './zod/zod-eventRequest.js';
import { default as schemaInterval } from './zod/zod-interval.js';
import { default as schemaIntervalPeriod } from './zod/zod-intervalPeriod.js';
import { default as schemaMqttNotifierAuthenticationAnonymous } from './zod/zod-mqttNotifierAuthenticationAnonymous.js';
import { default as schemaMqttNotifierAuthenticationCertificate } from './zod/zod-mqttNotifierAuthenticationCertificate.js';
import { default as schemaMqttNotifierAuthenticationOauth2BearerToken } from './zod/zod-mqttNotifierAuthenticationOauth2BearerToken.js';
import { default as schemaMqttNotifierBindingObject } from './zod/zod-mqttNotifierBindingObject.js';
import { default as schemaNotification } from './zod/zod-notification.js';
import { default as schemaNotifierOperationsTopics } from './zod/zod-notifierOperationsTopics.js';
import { default as schemaNotifiersResponse } from './zod/zod-notifiersResponse.js';
import { default as schemaNotifierTopicsResponse } from './zod/zod-notifierTopicsResponse.js';
import { default as schemaObjectID } from './zod/zod-objectID.js';
import { default as schemaObjectMetadata } from './zod/zod-objectMetadata.js';
import { default as schemaObjectTypes } from './zod/zod-objectTypes.js';
import { default as schemaPoint } from './zod/zod-point.js';
import { default as schemaProblem } from './zod/zod-problem.js';
import { default as schemaProgram } from './zod/zod-program.js';
import { default as schemaProgramRequest } from './zod/zod-programRequest.js';
import { default as schemaReadingType } from './zod/zod-readingType.js';
import { default as schemaReport } from './zod/zod-report.js';
import { default as schemaReportDescriptor } from './zod/zod-reportDescriptor.js';
import { default as schemaReportPayloadDescriptor } from './zod/zod-reportPayloadDescriptor.js';
import { default as schemaResource } from './zod/zod-resource.js';
import { default as schemaResourceName } from './zod/zod-resourceName.js';
import { default as schemaResourceRequest } from './zod/zod-resourceRequest.js';
import { default as schemaSubscription } from './zod/zod-subscription.js';
import { default as schemaSubscriptionRequest } from './zod/zod-subscriptionRequest.js';
import { default as schemaTargetType } from './zod/zod-targetType.js';
import { default as schemaTargetValue } from './zod/zod-targetValue.js';
import { default as schemaUnits } from './zod/zod-units.js';
import { default as schemaValuesMap } from './zod/zod-valuesMap.js';
import { default as schemaVen } from './zod/zod-ven.js';
import { default as schemaVenName } from './zod/zod-venName.js';
import { default as schemaVenRequest } from './zod/zod-venRequest.js';
// This generates a validator function
function zodValidator(ZSCHEMA, data) {
    return function validator(data) {
        const v = ZSCHEMA.safeParse(data);
        if (v.success) {
            return {
                value: v.data
            };
        }
        else {
            return {
                errors: [v.error]
            };
        }
    };
}
// Exports validator functions for each type
export function zodValidateAuthError(data) {
    return zodValidator(schemaAuthError, data);
}
export function zodValidateAuthServerInfo(data) {
    return zodValidator(schemaAuthServerInfo, data);
}
export function zodValidateClientCredentialRequest(data) {
    return zodValidator(schemaClientCredentialRequest, data);
}
export function zodValidateClientCredentialResponse(data) {
    return zodValidator(schemaClientCredentialResponse, data);
}
export function zodValidateClientName(data) {
    return zodValidator(schemaClientName, data);
}
export function zodValidateDateTime(data) {
    return zodValidator(schemaDateTime, data);
}
export function zodValidateDuration(data) {
    return zodValidator(schemaDuration, data);
}
export function zodValidateEvent(data) {
    return zodValidator(schemaEvent, data);
}
export function zodValidateEventPayloadDescriptor(data) {
    return zodValidator(schemaEventPayloadDescriptor, data);
}
export function zodValidateEventRequest(data) {
    return zodValidator(schemaEventRequest, data);
}
export function zodValidateInterval(data) {
    return zodValidator(schemaInterval, data);
}
export function zodValidateIntervalPeriod(data) {
    return zodValidator(schemaIntervalPeriod, data);
}
export function zodValidateMqttNotifierAuthenticationAnonymous(data) {
    return zodValidator(schemaMqttNotifierAuthenticationAnonymous, data);
}
export function zodValidateMqttNotifierAuthenticationCertificate(data) {
    return zodValidator(schemaMqttNotifierAuthenticationCertificate, data);
}
export function zodValidateMqttNotifierAuthenticationOauth2BearerToken(data) {
    return zodValidator(schemaMqttNotifierAuthenticationOauth2BearerToken, data);
}
export function zodValidateMqttNotifierBindingObject(data) {
    return zodValidator(schemaMqttNotifierBindingObject, data);
}
export function zodValidateNotification(data) {
    return zodValidator(schemaNotification, data);
}
export function zodValidateNotifierOperationsTopics(data) {
    return zodValidator(schemaNotifierOperationsTopics, data);
}
export function zodValidateNotifiersResponse(data) {
    return zodValidator(schemaNotifiersResponse, data);
}
export function zodValidateNotifierTopicsResponse(data) {
    return zodValidator(schemaNotifierTopicsResponse, data);
}
export function zodValidateObjectID(data) {
    return zodValidator(schemaObjectID, data);
}
export function zodValidateObjectMetadata(data) {
    return zodValidator(schemaObjectMetadata, data);
}
export function zodValidateObjectTypes(data) {
    return zodValidator(schemaObjectTypes, data);
}
export function zodValidatePoint(data) {
    return zodValidator(schemaPoint, data);
}
export function zodValidateProblem(data) {
    return zodValidator(schemaProblem, data);
}
export function zodValidateProgram(data) {
    return zodValidator(schemaProgram, data);
}
export function zodValidateProgramRequest(data) {
    return zodValidator(schemaProgramRequest, data);
}
export function zodValidateReport(data) {
    return zodValidator(schemaReport, data);
}
export function zodValidateReadingType(data) {
    return zodValidator(schemaReadingType, data);
}
export function zodValidateReportDescriptor(data) {
    return zodValidator(schemaReportDescriptor, data);
}
export function zodValidateReportPayloadDescriptor(data) {
    return zodValidator(schemaReportPayloadDescriptor, data);
}
export function zodValidateResource(data) {
    return zodValidator(schemaResource, data);
}
export function zodValidateResourceName(data) {
    return zodValidator(schemaResourceName, data);
}
export function zodValidateResourceRequest(data) {
    return zodValidator(schemaResourceRequest, data);
}
export function zodValidateSubscription(data) {
    return zodValidator(schemaSubscription, data);
}
export function zodValidateSubscriptionRequest(data) {
    return zodValidator(schemaSubscriptionRequest, data);
}
export function zodValidateTargetType(data) {
    return zodValidator(schemaTargetType, data);
}
export function zodValidateTargetValue(data) {
    return zodValidator(schemaTargetValue, data);
}
export function zodValidateUnits(data) {
    return zodValidator(schemaUnits, data);
}
export function zodValidateValuesMap(data) {
    return zodValidator(schemaValuesMap, data);
}
export function zodValidateVen(data) {
    return zodValidator(schemaVen, data);
}
export function zodValidateVenName(data) {
    return zodValidator(schemaVenName, data);
}
export function zodValidateVenRequest(data) {
    return zodValidator(schemaVenRequest, data);
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
export function joiValidateauthError(prog) {
    return joiAuthError.validate(prog, { allowUnknown: true });
}
export const joiAuthServerInfo = schemas.components.authServerInfo;
export function joiValidateauthServerInfo(prog) {
    return joiAuthServerInfo.validate(prog, { allowUnknown: true });
}
export const joiClientCredentialRequest = schemas.components.clientCredentialRequest;
export function joiValidateClientCredentialRequest(prog) {
    return joiClientCredentialRequest.validate(prog, { allowUnknown: true });
}
export const joiClientCredentialResponse = schemas.components.clientCredentialResponse;
export function joiValidateClientCredentialResponse(prog) {
    return joiClientCredentialResponse.validate(prog, { allowUnknown: true });
}
export const joiClientName = schemas.components.clientName;
export function joiValidateName(prog) {
    return joiClientName.validate(prog, { allowUnknown: true });
}
export const joiDateTime = schemas.components.dateTime; //.prefs({ convert: false });
export function joiValidateDateTime(prog) {
    return joiDateTime.validate(prog, { allowUnknown: true });
}
export const joiDuration = schemas.components.duration;
export function joiValidateDuration(prog) {
    return joiDuration.validate(prog, { allowUnknown: true });
}
export const joiEvent = schemas.components.event;
export function joiValidateEvent(prog) {
    return joiEvent.validate(prog, { allowUnknown: true });
}
export const joiSearchAllEvents = schemas.parameters.searchAllEvents.query;
export function joiValidateSearchAllEvents(prog) {
    return joiSearchAllEvents.validate(prog, { allowUnknown: true });
}
export const joiEventPayloadDescriptor = schemas.components.eventPayloadDescriptor;
export function joiValidateEventPayloadDescriptor(prog) {
    return joiEventPayloadDescriptor.validate(prog, { allowUnknown: true });
}
export const joiEventRequest = schemas.components.eventRequest;
export function joiValidateEventRequest(prog) {
    return joiEventRequest.validate(prog, { allowUnknown: true });
}
export const joiInterval = schemas.components.interval;
export function joiValidateInterval(prog) {
    return joiInterval.validate(prog, { allowUnknown: true });
}
export const joiIntervalPeriod = schemas.components.intervalPeriod;
export function joiValidateIntervalPeriod(prog) {
    return joiIntervalPeriod.validate(prog, { allowUnknown: true });
}
export const joiMqttNotifierAuthenticationAnonymous = schemas.components.mqttNotifierAuthenticationAnonymous;
export function joiValidateMqttNotifierAuthenticationAnonymous(prog) {
    return joiMqttNotifierAuthenticationAnonymous.validate(prog, { allowUnknown: true });
}
export const joiMqttNotifierAuthenticationCertificate = schemas.components.mqttNotifierAuthenticationCertificate;
export function joiValidateMqttNotifierAuthenticationCertificate(prog) {
    return joiMqttNotifierAuthenticationCertificate.validate(prog, { allowUnknown: true });
}
export const joiMqttNotifierAuthenticationOauth2BearerToken = schemas.components.mqttNotifierAuthenticationOauth2BearerToken;
export function joiValidateMqttNotifierAuthenticationOauth2BearerToken(prog) {
    return joiMqttNotifierAuthenticationOauth2BearerToken.validate(prog, { allowUnknown: true });
}
export const joiMqttNotifierBindingObject = schemas.components.mqttNotifierBindingObject;
export function joiValidateMqttNotifierBindingObject(prog) {
    return joiMqttNotifierBindingObject.validate(prog, { allowUnknown: true });
}
export const joiNotification = schemas.components.notification;
export function joiValidateNotification(prog) {
    return joiNotification.validate(prog, { allowUnknown: true });
}
export const joiNotifierOperationsTopics = schemas.components.notifierOperationsTopics;
export function joiValidateNotifierOperationsTopics(prog) {
    return joiNotifierOperationsTopics.validate(prog, { allowUnknown: true });
}
export const joiNotifiersResponse = schemas.components.notifiersResponse;
export function joiValidateNotifiersResponse(prog) {
    return joiNotifiersResponse.validate(prog, { allowUnknown: true });
}
export const joiNotifierTopicsResponse = schemas.components.notifierTopicsResponse;
export function joiValidateNotifierTopicsResponse(prog) {
    return joiNotifierTopicsResponse.validate(prog, { allowUnknown: true });
}
export const joiObjectID = schemas.components.objectID;
export function joiValidateObjectID(prog) {
    return joiObjectID.validate(prog, { allowUnknown: true });
}
export const joiObjectMetadata = schemas.components.objectMetadata;
export function joiValidateObjectMetadata(prog) {
    return joiObjectMetadata.validate(prog, { allowUnknown: true });
}
export const joiObjectTypes = schemas.components.objectTypes;
export function joiValidateObjectTypes(prog) {
    return joiObjectTypes.validate(prog, { allowUnknown: true });
}
export const joiPoint = schemas.components.point;
export function joiValidatePoint(prog) {
    return joiPoint.validate(prog, { allowUnknown: true });
}
export const joiProblem = schemas.components.problem;
export function joiValidateProblem(prog) {
    return joiProblem.validate(prog, { allowUnknown: true });
}
export const joiProgram = schemas.components.program;
export function joiValidateProgram(prog) {
    return joiProgram.validate(prog, { allowUnknown: true });
}
export const joiProgramRequest = schemas.components.programRequest;
export function joiValidateProgramRequest(prog) {
    return joiProgramRequest.validate(prog, { allowUnknown: true });
}
export const joiSearchAllPrograms = schemas.parameters.searchAllPrograms.query;
export function joiValidateSearchAllPrograms(prog) {
    return joiSearchAllPrograms.validate(prog, { allowUnknown: true });
}
export const joiReadingType = schemas.components.readingType;
export function joiValidateReadingType(report) {
    return joiReadingType.validate(report, { allowUnknown: true, debug: true });
}
export const joiReport = schemas.components.report;
export function joiValidateReport(report) {
    return joiReport.validate(report, { allowUnknown: true, debug: true });
}
export const joiReportRequest = schemas.components.reportRequest;
export function joiValidateReportRequest(report) {
    return joiReportRequest.validate(report, { allowUnknown: true, debug: true });
}
export const joiSearchAllReports = schemas.parameters.searchAllReports.query;
export function joiValidateSearchAllReports(prog) {
    return joiSearchAllReports.validate(prog, { allowUnknown: true });
}
export const joiReportDescriptor = schemas.components.reportDescriptor;
export function joiValidateReportDescriptor(report) {
    return joiReportDescriptor.validate(report, { allowUnknown: true });
}
export const joiReportPayloadDescriptor = schemas.components.reportPayloadDescriptor;
export function joiValidateReportPayloadDescriptor(report) {
    return joiReportPayloadDescriptor.validate(report, { allowUnknown: true });
}
export const joiResource = schemas.components.resource;
export function joiValidateResource(report) {
    return joiResource.validate(report, { allowUnknown: true });
}
export const joiResourceName = schemas.components.resourceName;
export function joiValidateResourceName(report) {
    return joiResourceName.validate(report, { allowUnknown: true });
}
export const joiResourceRequest = schemas.components.resourceRequest;
export function joiValidateResourceRequest(report) {
    return joiResourceRequest.validate(report, { allowUnknown: true });
}
export const joiSearchVenResources = schemas.parameters.searchVenResources.query;
export function joiValidateSearchVenResources(prog) {
    return joiSearchVenResources.validate(prog, { allowUnknown: true });
}
export const joiSubscription = schemas.components.subscription;
export function joiValidateSubscription(report) {
    return joiSubscription.validate(report, { allowUnknown: true });
}
export const joiSubscriptionRequest = schemas.components.subscriptionRequest;
export function joiValidateSubscriptionRequest(report) {
    return joiSubscriptionRequest.validate(report, { allowUnknown: true });
}
export const joiSearchSubscriptions = schemas.parameters.searchSubscriptions.query;
export function joiValidateSearchSubscriptions(prog) {
    return joiSearchSubscriptions.validate(prog, { allowUnknown: true });
}
export const joiTargetType = schemas.components.targetType;
export function joiValidateTargetType(report) {
    return joiTargetType.validate(report, { allowUnknown: true });
}
export const joiTargetValue = schemas.components.targetValue;
export function joiValidateTargetValue(report) {
    return joiTargetValue.validate(report, { allowUnknown: true });
}
export const joiUnits = schemas.components.units;
export function joiValidateUnits(report) {
    return joiUnits.validate(report, { allowUnknown: true });
}
export const joiValuesMap = schemas.components.valuesMap;
export function joiValidateValuesMap(report) {
    return joiValuesMap.validate(report, { allowUnknown: true });
}
export const joiVen = schemas.components.ven;
export function joiValidateVen(report) {
    return joiVen.validate(report, { allowUnknown: true });
}
export const joiVenName = schemas.components.venName;
export function joiValidateVenName(report) {
    return joiVenName.validate(report, { allowUnknown: true });
}
export const joiVenRequest = schemas.components.venRequest;
export function joiValidateVenRequest(report) {
    return joiVenRequest.validate(report, { allowUnknown: true });
}
export const joiSearchVens = schemas.parameters.searchVens.query;
export function joiValidateSearchVens(prog) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EscUNBQXFDO0FBRXJDLHVEQUF1RDtBQUV2RCxjQUFjLDhCQUE4QixDQUFDO0FBOEM3Qyx5Q0FBeUM7QUFFekMsc0RBQXNEO0FBRXRELE9BQU8sRUFBRSxPQUFPLElBQUksa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsT0FBTyxJQUFJLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakYsT0FBTyxFQUFFLE9BQU8sSUFBSSxnQ0FBZ0MsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxPQUFPLElBQUksaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRyxPQUFPLEVBQUUsT0FBTyxJQUFJLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLElBQUksaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxJQUFJLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxPQUFPLElBQUksK0JBQStCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsT0FBTyxJQUFJLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0UsT0FBTyxFQUFFLE9BQU8sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLElBQUksdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRixPQUFPLEVBQUUsT0FBTyxJQUFJLDRDQUE0QyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0gsT0FBTyxF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QXVDO0FBQ3ZDLDZDQUE2QztBQUU3QyxpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUVyQyx1REFBdUQ7QUFDdkQsbUNBQW1DO0FBQ25DLHFFQUFxRTtBQUNyRSx1Q0FBdUM7QUFFdkMsK0NBQStDO0FBRS9DLHlDQUF5QztBQUN6Qyw0QkFBNEI7QUFDNUIsNENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgSm9pIGZyb20gJ2pvaSc7XG5cbi8vLy8vLy8vLy8vICBEYXRhIHR5cGVzIGZvciBPcGVuQURSIDNcblxuLy8gRXhwb3J0IHR5cGUgbmFtZXMgZm9yIHRoaW5ncyBsaWtlIHJlcXVlc3QgcGFyYW1ldGVyc1xuXG5leHBvcnQgKiBmcm9tICcuL2NvZGVnZW4vb2FkcjNDb21wb25lbnRzLmpzJztcblxuLy8gRXhwb3J0IHRoZSBPcGVuQURSIHR5cGVzIGFzIHRoZWlyIGJhc2UgbmFtZVxuXG5leHBvcnQge1xuICAgIFByb2dyYW0sIFByb2dyYW1SZXF1ZXN0LFxuICAgIFJlcG9ydCwgUmVwb3J0UmVxdWVzdCxcbiAgICBFdmVudCwgRXZlbnRSZXF1ZXN0LFxuICAgIFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uUmVxdWVzdCxcbiAgICBWZW4sIFZlblJlcXVlc3QsXG4gICAgUmVzb3VyY2UsIFJlc291cmNlUmVxdWVzdCxcbiAgICBPYmplY3RNZXRhZGF0YSxcbiAgICBJbnRlcnZhbCwgSW50ZXJ2YWxQZXJpb2QsXG4gICAgVmFsdWVzTWFwLFxuICAgIFBvaW50LFxuICAgIEV2ZW50UGF5bG9hZERlc2NyaXB0b3IsXG4gICAgUmVwb3J0UGF5bG9hZERlc2NyaXB0b3IsXG4gICAgUmVwb3J0RGVzY3JpcHRvcixcbiAgICBPYmplY3RJRCxcbiAgICBWZW5OYW1lLCBDbGllbnROYW1lLFxuICAgIFRhcmdldFR5cGUsIFRhcmdldFZhbHVlLFxuICAgIFJlc291cmNlTmFtZSxcbiAgICBVbml0cyxcbiAgICBSZWFkaW5nVHlwZSxcbiAgICBOb3RpZmljYXRpb24sXG4gICAgT2JqZWN0VHlwZXMsXG4gICAgRGF0ZVRpbWUsIER1cmF0aW9uLFxuICAgIENsaWVudENyZWRlbnRpYWxSZXF1ZXN0LFxuICAgIENsaWVudENyZWRlbnRpYWxSZXNwb25zZSxcbiAgICBBdXRoRXJyb3IsXG4gICAgQXV0aFNlcnZlckluZm8sXG4gICAgUHJvYmxlbSxcbiAgICBOb3RpZmllcnNSZXNwb25zZSxcbiAgICBNcXR0Tm90aWZpZXJCaW5kaW5nT2JqZWN0LFxuICAgIE1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQW5vbnltb3VzLFxuICAgIE1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uT2F1dGgyQmVhcmVyVG9rZW4sXG4gICAgTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25DZXJ0aWZpY2F0ZSxcbiAgICBOb3RpZmllck9wZXJhdGlvbnNUb3BpY3MsXG4gICAgTm90aWZpZXJUb3BpY3NSZXNwb25zZVxufSBmcm9tICcuL2NvZGVnZW4vb2FkcjNTY2hlbWFzLmpzJztcblxuLy8gSW1wb3J0IGZyb20gdGhlIHNhbWUgZmlsZXMgZm9yIHVzZSBpbiB0aGlzIG1vZHVsZS5cblxuaW1wb3J0ICogYXMgT0FEUjNDb21wb25lbnRzIGZyb20gJy4vY29kZWdlbi9vYWRyM0NvbXBvbmVudHMuanMnO1xuaW1wb3J0ICogYXMgT0FEUjMgZnJvbSAnLi9jb2RlZ2VuL29hZHIzU2NoZW1hcy5qcyc7XG5cbi8vLy8vLy8vLy8vICBab2QgdmFsaWRhdG9ycyBmb3IgT3BlbkFEUiAzXG5cbi8vIFRoZXNlIGV4cG9ydCB0aGUgc2NoZW1hIG9iamVjdCBhcyB6b2RTY2hlbWFUeXBlTmFtZVxuXG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYUF1dGhFcnJvciB9IGZyb20gJy4vem9kL3pvZC1hdXRoRXJyb3IuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFBdXRoU2VydmVySW5mbyB9IGZyb20gJy4vem9kL3pvZC1hdXRoU2VydmVySW5mby5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYUNsaWVudENyZWRlbnRpYWxSZXF1ZXN0IH0gZnJvbSAnLi96b2Qvem9kLWNsaWVudENyZWRlbnRpYWxSZXF1ZXN0LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hQ2xpZW50Q3JlZGVudGlhbFJlc3BvbnNlIH0gZnJvbSAnLi96b2Qvem9kLWNsaWVudENyZWRlbnRpYWxSZXNwb25zZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYUNsaWVudE5hbWUgfSBmcm9tICcuL3pvZC96b2QtY2xpZW50TmFtZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYURhdGVUaW1lIH0gZnJvbSAnLi96b2Qvem9kLWRhdGVUaW1lLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hRHVyYXRpb24gfSBmcm9tICcuL3pvZC96b2QtZHVyYXRpb24uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFFdmVudCB9IGZyb20gJy4vem9kL3pvZC1ldmVudC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYUV2ZW50UGF5bG9hZERlc2NyaXB0b3IgfSBmcm9tICcuL3pvZC96b2QtZXZlbnRQYXlsb2FkRGVzY3JpcHRvci5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYUV2ZW50UmVxdWVzdCB9IGZyb20gJy4vem9kL3pvZC1ldmVudFJlcXVlc3QuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFJbnRlcnZhbCB9IGZyb20gJy4vem9kL3pvZC1pbnRlcnZhbC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYUludGVydmFsUGVyaW9kIH0gZnJvbSAnLi96b2Qvem9kLWludGVydmFsUGVyaW9kLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25Bbm9ueW1vdXMgfSBmcm9tICcuL3pvZC96b2QtbXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25Bbm9ueW1vdXMuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFNcXR0Tm90aWZpZXJBdXRoZW50aWNhdGlvbkNlcnRpZmljYXRlIH0gZnJvbSAnLi96b2Qvem9kLW1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQ2VydGlmaWNhdGUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFNcXR0Tm90aWZpZXJBdXRoZW50aWNhdGlvbk9hdXRoMkJlYXJlclRva2VuIH0gZnJvbSAnLi96b2Qvem9kLW1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uT2F1dGgyQmVhcmVyVG9rZW4uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFNcXR0Tm90aWZpZXJCaW5kaW5nT2JqZWN0IH0gZnJvbSAnLi96b2Qvem9kLW1xdHROb3RpZmllckJpbmRpbmdPYmplY3QuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFOb3RpZmljYXRpb24gfSBmcm9tICcuL3pvZC96b2Qtbm90aWZpY2F0aW9uLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hTm90aWZpZXJPcGVyYXRpb25zVG9waWNzIH0gZnJvbSAnLi96b2Qvem9kLW5vdGlmaWVyT3BlcmF0aW9uc1RvcGljcy5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYU5vdGlmaWVyc1Jlc3BvbnNlIH0gZnJvbSAnLi96b2Qvem9kLW5vdGlmaWVyc1Jlc3BvbnNlLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hTm90aWZpZXJUb3BpY3NSZXNwb25zZSB9IGZyb20gJy4vem9kL3pvZC1ub3RpZmllclRvcGljc1Jlc3BvbnNlLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hT2JqZWN0SUQgfSBmcm9tICcuL3pvZC96b2Qtb2JqZWN0SUQuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFPYmplY3RNZXRhZGF0YSB9IGZyb20gJy4vem9kL3pvZC1vYmplY3RNZXRhZGF0YS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYU9iamVjdFR5cGVzIH0gZnJvbSAnLi96b2Qvem9kLW9iamVjdFR5cGVzLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hUG9pbnQgfSBmcm9tICcuL3pvZC96b2QtcG9pbnQuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFQcm9ibGVtIH0gZnJvbSAnLi96b2Qvem9kLXByb2JsZW0uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFQcm9ncmFtIH0gZnJvbSAnLi96b2Qvem9kLXByb2dyYW0uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFQcm9ncmFtUmVxdWVzdCB9IGZyb20gJy4vem9kL3pvZC1wcm9ncmFtUmVxdWVzdC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYVJlYWRpbmdUeXBlIH0gZnJvbSAnLi96b2Qvem9kLXJlYWRpbmdUeXBlLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hUmVwb3J0IH0gZnJvbSAnLi96b2Qvem9kLXJlcG9ydC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYVJlcG9ydERlc2NyaXB0b3IgfSBmcm9tICcuL3pvZC96b2QtcmVwb3J0RGVzY3JpcHRvci5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYVJlcG9ydFBheWxvYWREZXNjcmlwdG9yIH0gZnJvbSAnLi96b2Qvem9kLXJlcG9ydFBheWxvYWREZXNjcmlwdG9yLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hUmVzb3VyY2UgfSBmcm9tICcuL3pvZC96b2QtcmVzb3VyY2UuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFSZXNvdXJjZU5hbWUgfSBmcm9tICcuL3pvZC96b2QtcmVzb3VyY2VOYW1lLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hUmVzb3VyY2VSZXF1ZXN0IH0gZnJvbSAnLi96b2Qvem9kLXJlc291cmNlUmVxdWVzdC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYVN1YnNjcmlwdGlvbiB9IGZyb20gJy4vem9kL3pvZC1zdWJzY3JpcHRpb24uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFTdWJzY3JpcHRpb25SZXF1ZXN0IH0gZnJvbSAnLi96b2Qvem9kLXN1YnNjcmlwdGlvblJlcXVlc3QuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFUYXJnZXRUeXBlIH0gZnJvbSAnLi96b2Qvem9kLXRhcmdldFR5cGUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFUYXJnZXRWYWx1ZSB9IGZyb20gJy4vem9kL3pvZC10YXJnZXRWYWx1ZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYVVuaXRzIH0gZnJvbSAnLi96b2Qvem9kLXVuaXRzLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgem9kU2NoZW1hVmFsdWVzTWFwIH0gZnJvbSAnLi96b2Qvem9kLXZhbHVlc01hcC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHpvZFNjaGVtYVZlbiB9IGZyb20gJy4vem9kL3pvZC12ZW4uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFWZW5OYW1lIH0gZnJvbSAnLi96b2Qvem9kLXZlbk5hbWUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB6b2RTY2hlbWFWZW5SZXF1ZXN0IH0gZnJvbSAnLi96b2Qvem9kLXZlblJlcXVlc3QuanMnO1xuXG4vLyBUaGVzZSBpbXBvcnQgdGhlIHNhbWUgc2NoZW1hcyBmcm9tIHdoaWNoIHRvIGNvbnN0cnVjdCB2YWxpZGF0b3IgZnVuY3Rpb25zXG5cbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hQXV0aEVycm9yIH0gZnJvbSAnLi96b2Qvem9kLWF1dGhFcnJvci5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYUF1dGhTZXJ2ZXJJbmZvIH0gZnJvbSAnLi96b2Qvem9kLWF1dGhTZXJ2ZXJJbmZvLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hQ2xpZW50Q3JlZGVudGlhbFJlcXVlc3QgfSBmcm9tICcuL3pvZC96b2QtY2xpZW50Q3JlZGVudGlhbFJlcXVlc3QuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFDbGllbnRDcmVkZW50aWFsUmVzcG9uc2UgfSBmcm9tICcuL3pvZC96b2QtY2xpZW50Q3JlZGVudGlhbFJlc3BvbnNlLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hQ2xpZW50TmFtZSB9IGZyb20gJy4vem9kL3pvZC1jbGllbnROYW1lLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hRGF0ZVRpbWUgfSBmcm9tICcuL3pvZC96b2QtZGF0ZVRpbWUuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFEdXJhdGlvbiB9IGZyb20gJy4vem9kL3pvZC1kdXJhdGlvbi5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYUV2ZW50IH0gZnJvbSAnLi96b2Qvem9kLWV2ZW50LmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hRXZlbnRQYXlsb2FkRGVzY3JpcHRvciB9IGZyb20gJy4vem9kL3pvZC1ldmVudFBheWxvYWREZXNjcmlwdG9yLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hRXZlbnRSZXF1ZXN0IH0gZnJvbSAnLi96b2Qvem9kLWV2ZW50UmVxdWVzdC5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYUludGVydmFsIH0gZnJvbSAnLi96b2Qvem9kLWludGVydmFsLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hSW50ZXJ2YWxQZXJpb2QgfSBmcm9tICcuL3pvZC96b2QtaW50ZXJ2YWxQZXJpb2QuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFNcXR0Tm90aWZpZXJBdXRoZW50aWNhdGlvbkFub255bW91cyB9IGZyb20gJy4vem9kL3pvZC1tcXR0Tm90aWZpZXJBdXRoZW50aWNhdGlvbkFub255bW91cy5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYU1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQ2VydGlmaWNhdGUgfSBmcm9tICcuL3pvZC96b2QtbXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25DZXJ0aWZpY2F0ZS5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYU1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uT2F1dGgyQmVhcmVyVG9rZW4gfSBmcm9tICcuL3pvZC96b2QtbXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25PYXV0aDJCZWFyZXJUb2tlbi5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYU1xdHROb3RpZmllckJpbmRpbmdPYmplY3QgfSBmcm9tICcuL3pvZC96b2QtbXF0dE5vdGlmaWVyQmluZGluZ09iamVjdC5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYU5vdGlmaWNhdGlvbiB9IGZyb20gJy4vem9kL3pvZC1ub3RpZmljYXRpb24uanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFOb3RpZmllck9wZXJhdGlvbnNUb3BpY3MgfSBmcm9tICcuL3pvZC96b2Qtbm90aWZpZXJPcGVyYXRpb25zVG9waWNzLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hTm90aWZpZXJzUmVzcG9uc2UgfSBmcm9tICcuL3pvZC96b2Qtbm90aWZpZXJzUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFOb3RpZmllclRvcGljc1Jlc3BvbnNlIH0gZnJvbSAnLi96b2Qvem9kLW5vdGlmaWVyVG9waWNzUmVzcG9uc2UuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFPYmplY3RJRCB9IGZyb20gJy4vem9kL3pvZC1vYmplY3RJRC5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYU9iamVjdE1ldGFkYXRhIH0gZnJvbSAnLi96b2Qvem9kLW9iamVjdE1ldGFkYXRhLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hT2JqZWN0VHlwZXMgfSBmcm9tICcuL3pvZC96b2Qtb2JqZWN0VHlwZXMuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFQb2ludCB9IGZyb20gJy4vem9kL3pvZC1wb2ludC5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYVByb2JsZW0gfSBmcm9tICcuL3pvZC96b2QtcHJvYmxlbS5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYVByb2dyYW0gfSBmcm9tICcuL3pvZC96b2QtcHJvZ3JhbS5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYVByb2dyYW1SZXF1ZXN0IH0gZnJvbSAnLi96b2Qvem9kLXByb2dyYW1SZXF1ZXN0LmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hUmVhZGluZ1R5cGUgfSBmcm9tICcuL3pvZC96b2QtcmVhZGluZ1R5cGUuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFSZXBvcnQgfSBmcm9tICcuL3pvZC96b2QtcmVwb3J0LmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hUmVwb3J0RGVzY3JpcHRvciB9IGZyb20gJy4vem9kL3pvZC1yZXBvcnREZXNjcmlwdG9yLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hUmVwb3J0UGF5bG9hZERlc2NyaXB0b3IgfSBmcm9tICcuL3pvZC96b2QtcmVwb3J0UGF5bG9hZERlc2NyaXB0b3IuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFSZXNvdXJjZSB9IGZyb20gJy4vem9kL3pvZC1yZXNvdXJjZS5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYVJlc291cmNlTmFtZSB9IGZyb20gJy4vem9kL3pvZC1yZXNvdXJjZU5hbWUuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFSZXNvdXJjZVJlcXVlc3QgfSBmcm9tICcuL3pvZC96b2QtcmVzb3VyY2VSZXF1ZXN0LmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi96b2Qvem9kLXN1YnNjcmlwdGlvbi5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYVN1YnNjcmlwdGlvblJlcXVlc3QgfSBmcm9tICcuL3pvZC96b2Qtc3Vic2NyaXB0aW9uUmVxdWVzdC5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYVRhcmdldFR5cGUgfSBmcm9tICcuL3pvZC96b2QtdGFyZ2V0VHlwZS5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYVRhcmdldFZhbHVlIH0gZnJvbSAnLi96b2Qvem9kLXRhcmdldFZhbHVlLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hVW5pdHMgfSBmcm9tICcuL3pvZC96b2QtdW5pdHMuanMnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBzY2hlbWFWYWx1ZXNNYXAgfSBmcm9tICcuL3pvZC96b2QtdmFsdWVzTWFwLmpzJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgc2NoZW1hVmVuIH0gZnJvbSAnLi96b2Qvem9kLXZlbi5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYVZlbk5hbWUgfSBmcm9tICcuL3pvZC96b2QtdmVuTmFtZS5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHNjaGVtYVZlblJlcXVlc3QgfSBmcm9tICcuL3pvZC96b2QtdmVuUmVxdWVzdC5qcyc7XG5cbnR5cGUgem9kVHlwZXMgPSBab2QuQW55Wm9kT2JqZWN0XG4gICAgfCBab2QuWm9kU3RyaW5nXG4gICAgfCBab2QuWm9kRGVmYXVsdDxab2QuWm9kU3RyaW5nPlxuICAgIHwgWm9kLlpvZERlZmF1bHQ8XG4gICAgICAgIFpvZC5ab2ROdWxsYWJsZTxab2QuWm9kU3RyaW5nPlxuICAgID5cbiAgICB8IFpvZC5ab2RJbnRlcnNlY3Rpb248XG4gICAgICAgICAgICAgICAgWm9kLlpvZFJlY29yZDxab2QuWm9kU3RyaW5nLCBab2QuWm9kVHlwZUFueT4sXG4gICAgICAgICAgICAgICAgWm9kLlpvZEludGVyc2VjdGlvbjxab2QuWm9kVHlwZUFueSwgWm9kLlpvZFR5cGVBbnk+XG4gICAgPlxuICAgIHwgWm9kLlpvZEVudW08W1wiUFJPR1JBTVwiLCBcIkVWRU5UXCIsIFwiUkVQT1JUXCIsIFwiU1VCU0NSSVBUSU9OXCIsIFwiVkVOXCIsIFwiUkVTT1VSQ0VcIl0+O1xuXG4vLyBUaGlzIGdlbmVyYXRlcyBhIHZhbGlkYXRvciBmdW5jdGlvblxuXG5mdW5jdGlvbiB6b2RWYWxpZGF0b3I8UD4oWlNDSEVNQTogem9kVHlwZXMsIGRhdGE6IGFueSkge1xuICAgIHJldHVybiBmdW5jdGlvbiB2YWxpZGF0b3IoZGF0YTogYW55KSB7XG4gICAgICAgIGNvbnN0IHYgPSBaU0NIRU1BLnNhZmVQYXJzZShkYXRhKTtcbiAgICAgICAgaWYgKHYuc3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdi5kYXRhIGFzIFBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGVycm9yczogWyB2LmVycm9yIF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIEV4cG9ydHMgdmFsaWRhdG9yIGZ1bmN0aW9ucyBmb3IgZWFjaCB0eXBlXG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZUF1dGhFcnJvcihkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLkF1dGhFcnJvcj4oc2NoZW1hQXV0aEVycm9yLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlQXV0aFNlcnZlckluZm8oZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5BdXRoU2VydmVySW5mbz4oc2NoZW1hQXV0aFNlcnZlckluZm8sIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVDbGllbnRDcmVkZW50aWFsUmVxdWVzdChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLkNsaWVudENyZWRlbnRpYWxSZXF1ZXN0PihzY2hlbWFDbGllbnRDcmVkZW50aWFsUmVxdWVzdCwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZUNsaWVudENyZWRlbnRpYWxSZXNwb25zZShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLkNsaWVudENyZWRlbnRpYWxSZXNwb25zZT4oc2NoZW1hQ2xpZW50Q3JlZGVudGlhbFJlc3BvbnNlLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlQ2xpZW50TmFtZShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLkNsaWVudE5hbWU+KHNjaGVtYUNsaWVudE5hbWUsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVEYXRlVGltZShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLkRhdGVUaW1lPihzY2hlbWFEYXRlVGltZSwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZUR1cmF0aW9uKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuRHVyYXRpb24+KHNjaGVtYUR1cmF0aW9uLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlRXZlbnQoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5FdmVudD4oc2NoZW1hRXZlbnQsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVFdmVudFBheWxvYWREZXNjcmlwdG9yKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuRXZlbnRQYXlsb2FkRGVzY3JpcHRvcj4oc2NoZW1hRXZlbnRQYXlsb2FkRGVzY3JpcHRvciwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZUV2ZW50UmVxdWVzdChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLkV2ZW50UmVxdWVzdD4oc2NoZW1hRXZlbnRSZXF1ZXN0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlSW50ZXJ2YWwoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5JbnRlcnZhbD4oc2NoZW1hSW50ZXJ2YWwsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVJbnRlcnZhbFBlcmlvZChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLkludGVydmFsUGVyaW9kPihzY2hlbWFJbnRlcnZhbFBlcmlvZCwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZU1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQW5vbnltb3VzKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25Bbm9ueW1vdXM+KHNjaGVtYU1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQW5vbnltb3VzLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25DZXJ0aWZpY2F0ZShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLk1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQ2VydGlmaWNhdGU+KHNjaGVtYU1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQ2VydGlmaWNhdGUsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVNcXR0Tm90aWZpZXJBdXRoZW50aWNhdGlvbk9hdXRoMkJlYXJlclRva2VuKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25PYXV0aDJCZWFyZXJUb2tlbj4oc2NoZW1hTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25PYXV0aDJCZWFyZXJUb2tlbiwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZU1xdHROb3RpZmllckJpbmRpbmdPYmplY3QoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5NcXR0Tm90aWZpZXJCaW5kaW5nT2JqZWN0PihzY2hlbWFNcXR0Tm90aWZpZXJCaW5kaW5nT2JqZWN0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlTm90aWZpY2F0aW9uKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuTm90aWZpY2F0aW9uPihzY2hlbWFOb3RpZmljYXRpb24sIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVOb3RpZmllck9wZXJhdGlvbnNUb3BpY3MoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5Ob3RpZmllck9wZXJhdGlvbnNUb3BpY3M+KHNjaGVtYU5vdGlmaWVyT3BlcmF0aW9uc1RvcGljcywgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZU5vdGlmaWVyc1Jlc3BvbnNlKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuTm90aWZpZXJzUmVzcG9uc2U+KHNjaGVtYU5vdGlmaWVyc1Jlc3BvbnNlLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlTm90aWZpZXJUb3BpY3NSZXNwb25zZShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLk5vdGlmaWVyVG9waWNzUmVzcG9uc2U+KHNjaGVtYU5vdGlmaWVyVG9waWNzUmVzcG9uc2UsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVPYmplY3RJRChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLk9iamVjdElEPihzY2hlbWFPYmplY3RJRCwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZU9iamVjdE1ldGFkYXRhKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuT2JqZWN0TWV0YWRhdGE+KHNjaGVtYU9iamVjdE1ldGFkYXRhLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlT2JqZWN0VHlwZXMoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5PYmplY3RUeXBlcz4oc2NoZW1hT2JqZWN0VHlwZXMsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVQb2ludChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLlBvaW50PihzY2hlbWFQb2ludCwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZVByb2JsZW0oZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5Qcm9ibGVtPihzY2hlbWFQcm9ibGVtLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlUHJvZ3JhbShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLlByb2dyYW0+KHNjaGVtYVByb2dyYW0sIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVQcm9ncmFtUmVxdWVzdChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLlByb2dyYW1SZXF1ZXN0PihzY2hlbWFQcm9ncmFtUmVxdWVzdCwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZVJlcG9ydChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLlJlcG9ydD4oc2NoZW1hUmVwb3J0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlUmVhZGluZ1R5cGUoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5SZWFkaW5nVHlwZT4oc2NoZW1hUmVhZGluZ1R5cGUsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVSZXBvcnREZXNjcmlwdG9yKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuUmVwb3J0RGVzY3JpcHRvcj4oc2NoZW1hUmVwb3J0RGVzY3JpcHRvciwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZVJlcG9ydFBheWxvYWREZXNjcmlwdG9yKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuUmVwb3J0UGF5bG9hZERlc2NyaXB0b3I+KHNjaGVtYVJlcG9ydFBheWxvYWREZXNjcmlwdG9yLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlUmVzb3VyY2UoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5SZXNvdXJjZT4oc2NoZW1hUmVzb3VyY2UsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVSZXNvdXJjZU5hbWUoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5SZXNvdXJjZU5hbWU+KHNjaGVtYVJlc291cmNlTmFtZSwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZVJlc291cmNlUmVxdWVzdChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLlJlc291cmNlUmVxdWVzdD4oc2NoZW1hUmVzb3VyY2VSZXF1ZXN0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlU3Vic2NyaXB0aW9uKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuU3Vic2NyaXB0aW9uPihzY2hlbWFTdWJzY3JpcHRpb24sIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVTdWJzY3JpcHRpb25SZXF1ZXN0KGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuU3Vic2NyaXB0aW9uUmVxdWVzdD4oc2NoZW1hU3Vic2NyaXB0aW9uUmVxdWVzdCwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZVRhcmdldFR5cGUoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5UYXJnZXRUeXBlPihzY2hlbWFUYXJnZXRUeXBlLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlVGFyZ2V0VmFsdWUoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5UYXJnZXRWYWx1ZT4oc2NoZW1hVGFyZ2V0VmFsdWUsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVVbml0cyhkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLlVuaXRzPihzY2hlbWFVbml0cywgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZVZhbHVlc01hcChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gem9kVmFsaWRhdG9yPE9BRFIzLlZhbHVlc01hcD4oc2NoZW1hVmFsdWVzTWFwLCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvZFZhbGlkYXRlVmVuKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuVmVuPihzY2hlbWFWZW4sIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9kVmFsaWRhdGVWZW5OYW1lKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB6b2RWYWxpZGF0b3I8T0FEUjMuVmVuTmFtZT4oc2NoZW1hVmVuTmFtZSwgZGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b2RWYWxpZGF0ZVZlblJlcXVlc3QoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHpvZFZhbGlkYXRvcjxPQURSMy5WZW5SZXF1ZXN0PihzY2hlbWFWZW5SZXF1ZXN0LCBkYXRhKTtcbn1cblxuLy8vLy8vLy8vLy8gIEpvaSBzY2hlbWEgdmFsaWRhdG9ycyBmb3IgT3BlbkFEUiAzXG5cbmltcG9ydCB7IHNjaGVtYXMgfSBmcm9tICcuL2pvaS9vYWRyMy5qcyc7XG5cbi8vIFRoZSBqb2lUeXBlTmFtZSBleHBvcnRzIGlzIHRoZSBKb2kgc2NoZW1hIGRlZmluaXRpb24gZm9yIHRoZSB0eXBlXG4vLyBUaGUgam9pVmFsaWRhdGVUeXBlTmFtZSBleHBvcnRzIGFyZSBhIGZ1bmN0aW9uIHRvIGFzc2lzdCB3aXRoIHZhbGlkYXRpb24uXG4vL1xuLy8gRm9yIHRoZSBsYXR0ZXIsIHRoZSByZXR1cm4gdHlwZSBmb2xsb3dzIHRoaXMgcGF0dGVyblxuLy9cbi8vICAgICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBzY2hlbWEudmFsaWRhdGUoeyAuLi4gb2JqZWN0IH0pO1xuLy9cbi8vIFRoZSBhY3R1YWwgdHlwZSBpcyBKb2kuVmFsaWRhdGlvblJlc3VsdDxUeXBlTmFtZT4gc28gdGhhdCBpdCdzXG4vLyBwcm9wZXJseSBkZWNsYXJlZC5cblxuZXhwb3J0IGNvbnN0IGpvaUF1dGhFcnJvciA9IHNjaGVtYXMuY29tcG9uZW50cy5hdXRoRXJyb3I7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVhdXRoRXJyb3IocHJvZzogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuQXV0aEVycm9yPiB7XG4gICAgcmV0dXJuIGpvaUF1dGhFcnJvci52YWxpZGF0ZShwcm9nLCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaUF1dGhTZXJ2ZXJJbmZvID0gc2NoZW1hcy5jb21wb25lbnRzLmF1dGhTZXJ2ZXJJbmZvO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlYXV0aFNlcnZlckluZm8ocHJvZzogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuQXV0aFNlcnZlckluZm8+IHtcbiAgICByZXR1cm4gam9pQXV0aFNlcnZlckluZm8udmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lDbGllbnRDcmVkZW50aWFsUmVxdWVzdCA9IHNjaGVtYXMuY29tcG9uZW50cy5jbGllbnRDcmVkZW50aWFsUmVxdWVzdDtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZUNsaWVudENyZWRlbnRpYWxSZXF1ZXN0KHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLkNsaWVudENyZWRlbnRpYWxSZXF1ZXN0PiB7XG4gICAgcmV0dXJuIGpvaUNsaWVudENyZWRlbnRpYWxSZXF1ZXN0LnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pQ2xpZW50Q3JlZGVudGlhbFJlc3BvbnNlID0gc2NoZW1hcy5jb21wb25lbnRzLmNsaWVudENyZWRlbnRpYWxSZXNwb25zZTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZUNsaWVudENyZWRlbnRpYWxSZXNwb25zZShwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5DbGllbnRDcmVkZW50aWFsUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gam9pQ2xpZW50Q3JlZGVudGlhbFJlc3BvbnNlLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pQ2xpZW50TmFtZSA9IHNjaGVtYXMuY29tcG9uZW50cy5jbGllbnROYW1lO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlTmFtZShwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5DbGllbnROYW1lPiB7XG4gICAgcmV0dXJuIGpvaUNsaWVudE5hbWUudmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lEYXRlVGltZSA9IHNjaGVtYXMuY29tcG9uZW50cy5kYXRlVGltZTsgLy8ucHJlZnMoeyBjb252ZXJ0OiBmYWxzZSB9KTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZURhdGVUaW1lKHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PGFueT4ge1xuICAgIHJldHVybiBqb2lEYXRlVGltZS52YWxpZGF0ZShwcm9nLCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaUR1cmF0aW9uID0gc2NoZW1hcy5jb21wb25lbnRzLmR1cmF0aW9uO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlRHVyYXRpb24ocHJvZzogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuRHVyYXRpb24+IHtcbiAgICByZXR1cm4gam9pRHVyYXRpb24udmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lFdmVudCA9IHNjaGVtYXMuY29tcG9uZW50cy5ldmVudDtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZUV2ZW50KHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLkV2ZW50PiB7XG4gICAgcmV0dXJuIGpvaUV2ZW50LnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pU2VhcmNoQWxsRXZlbnRzID0gc2NoZW1hcy5wYXJhbWV0ZXJzLnNlYXJjaEFsbEV2ZW50cy5xdWVyeTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVNlYXJjaEFsbEV2ZW50cyhcbiAgICBwcm9nOiBPQURSM0NvbXBvbmVudHMuU2VhcmNoQWxsRXZlbnRzUXVlcnlQYXJhbXNcbik6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzQ29tcG9uZW50cy5TZWFyY2hBbGxFdmVudHNRdWVyeVBhcmFtcz5cbntcbiAgICByZXR1cm4gam9pU2VhcmNoQWxsRXZlbnRzLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pRXZlbnRQYXlsb2FkRGVzY3JpcHRvciA9IHNjaGVtYXMuY29tcG9uZW50cy5ldmVudFBheWxvYWREZXNjcmlwdG9yO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlRXZlbnRQYXlsb2FkRGVzY3JpcHRvcihwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5FdmVudFBheWxvYWREZXNjcmlwdG9yPiB7XG4gICAgcmV0dXJuIGpvaUV2ZW50UGF5bG9hZERlc2NyaXB0b3IudmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lFdmVudFJlcXVlc3QgPSBzY2hlbWFzLmNvbXBvbmVudHMuZXZlbnRSZXF1ZXN0O1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlRXZlbnRSZXF1ZXN0KHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLkV2ZW50UmVxdWVzdD4ge1xuICAgIHJldHVybiBqb2lFdmVudFJlcXVlc3QudmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lJbnRlcnZhbCA9IHNjaGVtYXMuY29tcG9uZW50cy5pbnRlcnZhbDtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZUludGVydmFsKHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLkludGVydmFsPiB7XG4gICAgcmV0dXJuIGpvaUludGVydmFsLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pSW50ZXJ2YWxQZXJpb2QgPSBzY2hlbWFzLmNvbXBvbmVudHMuaW50ZXJ2YWxQZXJpb2Q7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVJbnRlcnZhbFBlcmlvZChwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5JbnRlcnZhbFBlcmlvZD4ge1xuICAgIHJldHVybiBqb2lJbnRlcnZhbFBlcmlvZC52YWxpZGF0ZShwcm9nLCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaU1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQW5vbnltb3VzID0gc2NoZW1hcy5jb21wb25lbnRzLm1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQW5vbnltb3VzO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25Bbm9ueW1vdXMocHJvZzogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25Bbm9ueW1vdXM+IHtcbiAgICByZXR1cm4gam9pTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25Bbm9ueW1vdXMudmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lNcXR0Tm90aWZpZXJBdXRoZW50aWNhdGlvbkNlcnRpZmljYXRlID0gc2NoZW1hcy5jb21wb25lbnRzLm1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQ2VydGlmaWNhdGU7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVNcXR0Tm90aWZpZXJBdXRoZW50aWNhdGlvbkNlcnRpZmljYXRlKHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLk1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uQ2VydGlmaWNhdGU+IHtcbiAgICByZXR1cm4gam9pTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25DZXJ0aWZpY2F0ZS52YWxpZGF0ZShwcm9nLCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaU1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uT2F1dGgyQmVhcmVyVG9rZW4gPSBzY2hlbWFzLmNvbXBvbmVudHMubXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25PYXV0aDJCZWFyZXJUb2tlbjtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZU1xdHROb3RpZmllckF1dGhlbnRpY2F0aW9uT2F1dGgyQmVhcmVyVG9rZW4ocHJvZzogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuTXF0dE5vdGlmaWVyQXV0aGVudGljYXRpb25PYXV0aDJCZWFyZXJUb2tlbj4ge1xuICAgIHJldHVybiBqb2lNcXR0Tm90aWZpZXJBdXRoZW50aWNhdGlvbk9hdXRoMkJlYXJlclRva2VuLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pTXF0dE5vdGlmaWVyQmluZGluZ09iamVjdCA9IHNjaGVtYXMuY29tcG9uZW50cy5tcXR0Tm90aWZpZXJCaW5kaW5nT2JqZWN0O1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlTXF0dE5vdGlmaWVyQmluZGluZ09iamVjdChwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5NcXR0Tm90aWZpZXJCaW5kaW5nT2JqZWN0PiB7XG4gICAgcmV0dXJuIGpvaU1xdHROb3RpZmllckJpbmRpbmdPYmplY3QudmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lOb3RpZmljYXRpb24gPSBzY2hlbWFzLmNvbXBvbmVudHMubm90aWZpY2F0aW9uO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlTm90aWZpY2F0aW9uKHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLk5vdGlmaWNhdGlvbj4ge1xuICAgIHJldHVybiBqb2lOb3RpZmljYXRpb24udmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lOb3RpZmllck9wZXJhdGlvbnNUb3BpY3MgPSBzY2hlbWFzLmNvbXBvbmVudHMubm90aWZpZXJPcGVyYXRpb25zVG9waWNzO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlTm90aWZpZXJPcGVyYXRpb25zVG9waWNzKHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLk5vdGlmaWVyT3BlcmF0aW9uc1RvcGljcz4ge1xuICAgIHJldHVybiBqb2lOb3RpZmllck9wZXJhdGlvbnNUb3BpY3MudmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lOb3RpZmllcnNSZXNwb25zZSA9IHNjaGVtYXMuY29tcG9uZW50cy5ub3RpZmllcnNSZXNwb25zZTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZU5vdGlmaWVyc1Jlc3BvbnNlKHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLk5vdGlmaWVyc1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIGpvaU5vdGlmaWVyc1Jlc3BvbnNlLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pTm90aWZpZXJUb3BpY3NSZXNwb25zZSA9IHNjaGVtYXMuY29tcG9uZW50cy5ub3RpZmllclRvcGljc1Jlc3BvbnNlO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlTm90aWZpZXJUb3BpY3NSZXNwb25zZShwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5Ob3RpZmllclRvcGljc1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIGpvaU5vdGlmaWVyVG9waWNzUmVzcG9uc2UudmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lPYmplY3RJRCA9IHNjaGVtYXMuY29tcG9uZW50cy5vYmplY3RJRDtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZU9iamVjdElEKHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLk9iamVjdElEPiB7XG4gICAgcmV0dXJuIGpvaU9iamVjdElELnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pT2JqZWN0TWV0YWRhdGEgPSBzY2hlbWFzLmNvbXBvbmVudHMub2JqZWN0TWV0YWRhdGE7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVPYmplY3RNZXRhZGF0YShwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5PYmplY3RNZXRhZGF0YT4ge1xuICAgIHJldHVybiBqb2lPYmplY3RNZXRhZGF0YS52YWxpZGF0ZShwcm9nLCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaU9iamVjdFR5cGVzID0gc2NoZW1hcy5jb21wb25lbnRzLm9iamVjdFR5cGVzO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlT2JqZWN0VHlwZXMocHJvZzogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8c3RyaW5nPiB7XG4gICAgcmV0dXJuIGpvaU9iamVjdFR5cGVzLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pUG9pbnQgPSBzY2hlbWFzLmNvbXBvbmVudHMucG9pbnQ7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVQb2ludChwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5Qb2ludD4ge1xuICAgIHJldHVybiBqb2lQb2ludC52YWxpZGF0ZShwcm9nLCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaVByb2JsZW0gPSBzY2hlbWFzLmNvbXBvbmVudHMucHJvYmxlbTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVByb2JsZW0ocHJvZzogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuUHJvYmxlbT4ge1xuICAgIHJldHVybiBqb2lQcm9ibGVtLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pUHJvZ3JhbSA9IHNjaGVtYXMuY29tcG9uZW50cy5wcm9ncmFtO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlUHJvZ3JhbShwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5Qcm9ncmFtPiB7XG4gICAgcmV0dXJuIGpvaVByb2dyYW0udmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lQcm9ncmFtUmVxdWVzdCA9IHNjaGVtYXMuY29tcG9uZW50cy5wcm9ncmFtUmVxdWVzdDtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVByb2dyYW1SZXF1ZXN0KHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLlByb2dyYW1SZXF1ZXN0PiB7XG4gICAgcmV0dXJuIGpvaVByb2dyYW1SZXF1ZXN0LnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pU2VhcmNoQWxsUHJvZ3JhbXMgPSBzY2hlbWFzLnBhcmFtZXRlcnMuc2VhcmNoQWxsUHJvZ3JhbXMucXVlcnk7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVTZWFyY2hBbGxQcm9ncmFtcyhwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxhbnk+IHtcbiAgICByZXR1cm4gam9pU2VhcmNoQWxsUHJvZ3JhbXMudmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lSZWFkaW5nVHlwZSA9IHNjaGVtYXMuY29tcG9uZW50cy5yZWFkaW5nVHlwZTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVJlYWRpbmdUeXBlKHJlcG9ydDogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuUmVhZGluZ1R5cGU+IHtcbiAgICByZXR1cm4gam9pUmVhZGluZ1R5cGUudmFsaWRhdGUocmVwb3J0LCB7IGFsbG93VW5rbm93bjogdHJ1ZSAsIGRlYnVnOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pUmVwb3J0ID0gc2NoZW1hcy5jb21wb25lbnRzLnJlcG9ydDtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVJlcG9ydChyZXBvcnQ6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLlJlcG9ydD4ge1xuICAgIHJldHVybiBqb2lSZXBvcnQudmFsaWRhdGUocmVwb3J0LCB7IGFsbG93VW5rbm93bjogdHJ1ZSAsIGRlYnVnOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pUmVwb3J0UmVxdWVzdCA9IHNjaGVtYXMuY29tcG9uZW50cy5yZXBvcnRSZXF1ZXN0O1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlUmVwb3J0UmVxdWVzdChyZXBvcnQ6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLlJlcG9ydFJlcXVlc3Q+IHtcbiAgICByZXR1cm4gam9pUmVwb3J0UmVxdWVzdC52YWxpZGF0ZShyZXBvcnQsIHsgYWxsb3dVbmtub3duOiB0cnVlICwgZGVidWc6IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lTZWFyY2hBbGxSZXBvcnRzID0gc2NoZW1hcy5wYXJhbWV0ZXJzLnNlYXJjaEFsbFJlcG9ydHMucXVlcnk7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVTZWFyY2hBbGxSZXBvcnRzKHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PGFueT4ge1xuICAgIHJldHVybiBqb2lTZWFyY2hBbGxSZXBvcnRzLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pUmVwb3J0RGVzY3JpcHRvciA9IHNjaGVtYXMuY29tcG9uZW50cy5yZXBvcnREZXNjcmlwdG9yO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlUmVwb3J0RGVzY3JpcHRvcihyZXBvcnQ6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLlJlcG9ydERlc2NyaXB0b3I+IHtcbiAgICByZXR1cm4gam9pUmVwb3J0RGVzY3JpcHRvci52YWxpZGF0ZShyZXBvcnQsIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pUmVwb3J0UGF5bG9hZERlc2NyaXB0b3IgPSBzY2hlbWFzLmNvbXBvbmVudHMucmVwb3J0UGF5bG9hZERlc2NyaXB0b3I7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVSZXBvcnRQYXlsb2FkRGVzY3JpcHRvcihyZXBvcnQ6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLlJlcG9ydFBheWxvYWREZXNjcmlwdG9yPiB7XG4gICAgcmV0dXJuIGpvaVJlcG9ydFBheWxvYWREZXNjcmlwdG9yLnZhbGlkYXRlKHJlcG9ydCwgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lSZXNvdXJjZSA9IHNjaGVtYXMuY29tcG9uZW50cy5yZXNvdXJjZTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVJlc291cmNlKHJlcG9ydDogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuUmVzb3VyY2U+IHtcbiAgICByZXR1cm4gam9pUmVzb3VyY2UudmFsaWRhdGUocmVwb3J0LCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaVJlc291cmNlTmFtZSA9IHNjaGVtYXMuY29tcG9uZW50cy5yZXNvdXJjZU5hbWU7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVSZXNvdXJjZU5hbWUocmVwb3J0OiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5SZXNvdXJjZU5hbWU+IHtcbiAgICByZXR1cm4gam9pUmVzb3VyY2VOYW1lLnZhbGlkYXRlKHJlcG9ydCwgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lSZXNvdXJjZVJlcXVlc3QgPSBzY2hlbWFzLmNvbXBvbmVudHMucmVzb3VyY2VSZXF1ZXN0O1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlUmVzb3VyY2VSZXF1ZXN0KHJlcG9ydDogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuUmVzb3VyY2VSZXF1ZXN0PiB7XG4gICAgcmV0dXJuIGpvaVJlc291cmNlUmVxdWVzdC52YWxpZGF0ZShyZXBvcnQsIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pU2VhcmNoVmVuUmVzb3VyY2VzID0gc2NoZW1hcy5wYXJhbWV0ZXJzLnNlYXJjaFZlblJlc291cmNlcy5xdWVyeTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVNlYXJjaFZlblJlc291cmNlcyhwcm9nOiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxhbnk+IHtcbiAgICByZXR1cm4gam9pU2VhcmNoVmVuUmVzb3VyY2VzLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pU3Vic2NyaXB0aW9uID0gc2NoZW1hcy5jb21wb25lbnRzLnN1YnNjcmlwdGlvbjtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVN1YnNjcmlwdGlvbihyZXBvcnQ6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLlN1YnNjcmlwdGlvbj4ge1xuICAgIHJldHVybiBqb2lTdWJzY3JpcHRpb24udmFsaWRhdGUocmVwb3J0LCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaVN1YnNjcmlwdGlvblJlcXVlc3QgPSBzY2hlbWFzLmNvbXBvbmVudHMuc3Vic2NyaXB0aW9uUmVxdWVzdDtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVN1YnNjcmlwdGlvblJlcXVlc3QocmVwb3J0OiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5TdWJzY3JpcHRpb25SZXF1ZXN0PiB7XG4gICAgcmV0dXJuIGpvaVN1YnNjcmlwdGlvblJlcXVlc3QudmFsaWRhdGUocmVwb3J0LCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaVNlYXJjaFN1YnNjcmlwdGlvbnMgPSBzY2hlbWFzLnBhcmFtZXRlcnMuc2VhcmNoU3Vic2NyaXB0aW9ucy5xdWVyeTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVNlYXJjaFN1YnNjcmlwdGlvbnMocHJvZzogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8YW55PiB7XG4gICAgcmV0dXJuIGpvaVNlYXJjaFN1YnNjcmlwdGlvbnMudmFsaWRhdGUocHJvZywgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lUYXJnZXRUeXBlID0gc2NoZW1hcy5jb21wb25lbnRzLnRhcmdldFR5cGU7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVUYXJnZXRUeXBlKHJlcG9ydDogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuVGFyZ2V0VHlwZT4ge1xuICAgIHJldHVybiBqb2lUYXJnZXRUeXBlLnZhbGlkYXRlKHJlcG9ydCwgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lUYXJnZXRWYWx1ZSA9IHNjaGVtYXMuY29tcG9uZW50cy50YXJnZXRWYWx1ZTtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVRhcmdldFZhbHVlKHJlcG9ydDogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuVGFyZ2V0VmFsdWU+IHtcbiAgICByZXR1cm4gam9pVGFyZ2V0VmFsdWUudmFsaWRhdGUocmVwb3J0LCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaVVuaXRzID0gc2NoZW1hcy5jb21wb25lbnRzLnVuaXRzO1xuZXhwb3J0IGZ1bmN0aW9uIGpvaVZhbGlkYXRlVW5pdHMocmVwb3J0OiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5Vbml0cz4ge1xuICAgIHJldHVybiBqb2lVbml0cy52YWxpZGF0ZShyZXBvcnQsIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgY29uc3Qgam9pVmFsdWVzTWFwID0gc2NoZW1hcy5jb21wb25lbnRzLnZhbHVlc01hcDtcbmV4cG9ydCBmdW5jdGlvbiBqb2lWYWxpZGF0ZVZhbHVlc01hcChyZXBvcnQ6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PE9BRFIzLlZhbHVlc01hcD4ge1xuICAgIHJldHVybiBqb2lWYWx1ZXNNYXAudmFsaWRhdGUocmVwb3J0LCB7IGFsbG93VW5rbm93bjogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGpvaVZlbiA9IHNjaGVtYXMuY29tcG9uZW50cy52ZW47XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVWZW4ocmVwb3J0OiBhbnkpOiBKb2kuVmFsaWRhdGlvblJlc3VsdDxPQURSMy5WZW4+IHtcbiAgICByZXR1cm4gam9pVmVuLnZhbGlkYXRlKHJlcG9ydCwgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lWZW5OYW1lID0gc2NoZW1hcy5jb21wb25lbnRzLnZlbk5hbWU7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVWZW5OYW1lKHJlcG9ydDogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuVmVuTmFtZT4ge1xuICAgIHJldHVybiBqb2lWZW5OYW1lLnZhbGlkYXRlKHJlcG9ydCwgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lWZW5SZXF1ZXN0ID0gc2NoZW1hcy5jb21wb25lbnRzLnZlblJlcXVlc3Q7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVWZW5SZXF1ZXN0KHJlcG9ydDogYW55KTogSm9pLlZhbGlkYXRpb25SZXN1bHQ8T0FEUjMuVmVuUmVxdWVzdD4ge1xuICAgIHJldHVybiBqb2lWZW5SZXF1ZXN0LnZhbGlkYXRlKHJlcG9ydCwgeyBhbGxvd1Vua25vd246IHRydWUgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBqb2lTZWFyY2hWZW5zID0gc2NoZW1hcy5wYXJhbWV0ZXJzLnNlYXJjaFZlbnMucXVlcnk7XG5leHBvcnQgZnVuY3Rpb24gam9pVmFsaWRhdGVTZWFyY2hWZW5zKHByb2c6IGFueSk6IEpvaS5WYWxpZGF0aW9uUmVzdWx0PGFueT4ge1xuICAgIHJldHVybiBqb2lTZWFyY2hWZW5zLnZhbGlkYXRlKHByb2csIHsgYWxsb3dVbmtub3duOiB0cnVlIH0pO1xufVxuXG4vLyBUaGVzZSBsaW5lcyBhcmUgZm9yIGluc3BlY3RpbmcgdGhlIHR5cGUgYXMgdW5kZXJzdG9vZCBieSBab2QuXG4vLyBVbmNvbW1lbnQgdGhlIGxpbmVzLCBmaXhpbmcgdXAgYSBkZWNsYXJhdGlvbiBmb3IgdGhlIHR5cGVcbi8vIHlvdSB3YW50IHRvIGluc3BlY3QuICBUaGVuLCBpbiBWaXN1YWwgU3R1ZGlvIENvZGUsIGhvdmVyIHRoZVxuLy8gbW91c2Ugb3ZlciB0aGUgYHpvZFR5cGVOYW1lYCB2YXJpYWJsZSwgYW5kIGEgcG9wdXAgYXBwZWFyc1xuLy8gc2hvd2luZyB0aGUgdHlwZS5cblxuLy8gaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5cbi8vIGltcG9ydCB7IGRlZmF1bHQgYXMgcGFyc2VFdmVudCB9IGZyb20gJy4vem9kL3pvZC1ldmVudC5qcyc7XG4vLyB0eXBlIHpvZEV2ZW50ID0gei5pbmZlcjx0eXBlb2YgcGFyc2VFdmVudD47XG5cbi8vIFRoaXMgc2VjdGlvbiBzdXBwb3J0cyB1c2luZyAnLi9jb2RlZ2VuL29wZW5BRFJTY2hlbWFzLXpvZC5qcydcbi8vIGFzIHRoZSBzb3VyY2UgZm9yIFpvZCBzY2hlbWEncy4gIFRoYXQgZmlsZSBjYW4gYmUgZ2VuZXJhdGVkXG4vLyB1c2luZyBgdHMtdG8tem9kYCBmcm9tICAnLi9jb2RlZ2VuL29wZW5BRFJTY2hlbWFzLmpzJy5cbi8vXG4vLyBJbiB0aGF0IGNhc2UgZWFjaCBzY2hlbWEgb2JqZWN0IGhhcyB0aGUgbmFtZSBgdHlwZU5hbWVTY2hlbWFgXG4vLyBidXQgd2Ugd2FudCB0byBleHBvcnQgYHBhcnNlVHlwZU5hbWVgIGluc3RlYWQuXG4vL1xuLy8gVGhlIGZhdGFsIHByb2JsZW0gd2l0aCB0aGVzZSBzY2hlbWEncyBpcyB0aGF0IGRlZmF1bHQgdmFsdWVzXG4vLyBmb3IgbmVzdGVkIFpvZCBzY2hlbWEncyBhcmUgbm90IHByb3Blcmx5IGhhbmRsZWQuIFxuXG4vLyBleHBvcnQge1xuLy8gICAgIGRhdGVUaW1lU2NoZW1hIGFzIHBhcnNlRGF0ZVRpbWUsXG4vLyAgICAgZHVyYXRpb25TY2hlbWEgYXMgcGFyc2VEdXJhdGlvbixcbi8vICAgICBldmVudFNjaGVtYSBhcyBwYXJzZUV2ZW50LFxuLy8gICAgIGV2ZW50UGF5bG9hZERlc2NyaXB0b3JTY2hlbWEgYXMgcGFyc2VFdmVudFBheWxvYWREZXNjcmlwdG9yLFxuXG4vLyAgICAgaW50ZXJ2YWxQZXJpb2RTY2hlbWEgYXMgcGFyc2VJbnRlcnZhbFBlcmlvZCxcbi8vICAgICBpbnRlcnZhbFNjaGVtYSBhcyBwYXJzZUludGVydmFsLFxuXG4vLyAgICAgbm90aWZpY2F0aW9uU2NoZW1hIGFzIHBhcnNlTm90aWZpY2F0aW9uLFxuXG4vLyAgICAgb2JqZWN0SURTY2hlbWEgYXMgcGFyc2VPYmplY3RJRCxcbi8vICAgICBvYmplY3RUeXBlc1NjaGVtYSBhcyBwYXJzZU9iamVjdFR5cGVzLFxuXG4vLyAgICAgcG9pbnRTY2hlbWEgYXMgcGFyc2VQb2ludCxcbi8vICAgICBwcm9ibGVtU2NoZW1hIGFzIHBhcnNlUHJvYmxlbSxcbi8vICAgICBwcm9ncmFtU2NoZW1hIGFzIHBhcnNlUHJvZ3JhbSxcblxuLy8gICAgIHJlcG9ydERlc2NyaXB0b3JTY2hlbWEgYXMgcGFyc2VSZXBvcnREZXNjcmlwdG9yLFxuLy8gICAgIHJlcG9ydFNjaGVtYSBhcyBwYXJzZVJlcG9ydCxcbi8vICAgICByZXBvcnRQYXlsb2FkRGVzY3JpcHRvclNjaGVtYSBhcyBwYXJzZVJlcG9ydFBheWxvYWREZXNjcmlwdG9yLFxuLy8gICAgIHJlc291cmNlU2NoZW1hIGFzIHBhcnNlUmVzb3VyY2UsXG5cbi8vICAgICBzdWJzY3JpcHRpb25TY2hlbWEgYXMgcGFyc2VTdWJzY3JpcHRpb24sXG4gICAgXG4vLyAgICAgdmFsdWVzTWFwU2NoZW1hIGFzIHBhcnNlVmFsdWVzTWFwLFxuLy8gICAgIHZlblNjaGVtYSBhcyBwYXJzZVZlblxuLy8gfSBmcm9tICcuL2NvZGVnZW4vb3BlbkFEUlNjaGVtYXMtem9kLmpzJztcbiJdfQ==