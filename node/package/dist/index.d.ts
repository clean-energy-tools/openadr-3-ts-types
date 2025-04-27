import Joi from 'joi';
export * from './codegen/oadr3Components.js';
export { Program, ProgramRequest, Report, ReportRequest, Event, EventRequest, Subscription, SubscriptionRequest, Ven, VenRequest, Resource, ResourceRequest, ObjectMetadata, Interval, IntervalPeriod, ValuesMap, Point, EventPayloadDescriptor, ReportPayloadDescriptor, ReportDescriptor, ObjectID, VenName, ClientName, TargetType, TargetValue, ResourceName, Units, ReadingType, Notification, ObjectTypes, DateTime, Duration, ClientCredentialRequest, ClientCredentialResponse, AuthError, AuthServerInfo, Problem, NotifiersResponse, MqttNotifierBindingObject, MqttNotifierAuthenticationAnonymous, MqttNotifierAuthenticationOauth2BearerToken, MqttNotifierAuthenticationCertificate, NotifierOperationsTopics, NotifierTopicsResponse } from './codegen/oadr3Schemas.js';
import * as OADR3Components from './codegen/oadr3Components.js';
import * as OADR3 from './codegen/oadr3Schemas.js';
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
export declare function zodValidateAuthError(data: any): (data: any) => {
    value: OADR3.AuthError;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateAuthServerInfo(data: any): (data: any) => {
    value: OADR3.AuthServerInfo;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateClientCredentialRequest(data: any): (data: any) => {
    value: OADR3.ClientCredentialRequest;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateClientCredentialResponse(data: any): (data: any) => {
    value: OADR3.ClientCredentialResponse;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateClientName(data: any): (data: any) => {
    value: string;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateDateTime(data: any): (data: any) => {
    value: string;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateDuration(data: any): (data: any) => {
    value: string;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateEvent(data: any): (data: any) => {
    value: OADR3.Event;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateEventPayloadDescriptor(data: any): (data: any) => {
    value: OADR3.EventPayloadDescriptor;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateEventRequest(data: any): (data: any) => {
    value: OADR3.EventRequest;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateInterval(data: any): (data: any) => {
    value: OADR3.Interval;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateIntervalPeriod(data: any): (data: any) => {
    value: OADR3.IntervalPeriod;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateMqttNotifierAuthenticationAnonymous(data: any): (data: any) => {
    value: OADR3.MqttNotifierAuthenticationAnonymous;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateMqttNotifierAuthenticationCertificate(data: any): (data: any) => {
    value: OADR3.MqttNotifierAuthenticationCertificate;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateMqttNotifierAuthenticationOauth2BearerToken(data: any): (data: any) => {
    value: OADR3.MqttNotifierAuthenticationOauth2BearerToken;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateMqttNotifierBindingObject(data: any): (data: any) => {
    value: OADR3.MqttNotifierBindingObject;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateNotification(data: any): (data: any) => {
    value: OADR3.Notification;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateNotifierOperationsTopics(data: any): (data: any) => {
    value: OADR3.NotifierOperationsTopics;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateNotifiersResponse(data: any): (data: any) => {
    value: OADR3.NotifiersResponse;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateNotifierTopicsResponse(data: any): (data: any) => {
    value: OADR3.NotifierTopicsResponse;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateObjectID(data: any): (data: any) => {
    value: string;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateObjectMetadata(data: any): (data: any) => {
    value: OADR3.ObjectMetadata;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateObjectTypes(data: any): (data: any) => {
    value: OADR3.ObjectTypes;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidatePoint(data: any): (data: any) => {
    value: OADR3.Point;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateProblem(data: any): (data: any) => {
    value: OADR3.Problem;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateProgram(data: any): (data: any) => {
    value: OADR3.Program;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateProgramRequest(data: any): (data: any) => {
    value: OADR3.ProgramRequest;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateReport(data: any): (data: any) => {
    value: OADR3.Report;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateReadingType(data: any): (data: any) => {
    value: OADR3.ReadingType;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateReportDescriptor(data: any): (data: any) => {
    value: OADR3.ReportDescriptor;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateReportPayloadDescriptor(data: any): (data: any) => {
    value: OADR3.ReportPayloadDescriptor;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateResource(data: any): (data: any) => {
    value: OADR3.Resource;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateResourceName(data: any): (data: any) => {
    value: string;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateResourceRequest(data: any): (data: any) => {
    value: OADR3.ResourceRequest;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateSubscription(data: any): (data: any) => {
    value: OADR3.Subscription;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateSubscriptionRequest(data: any): (data: any) => {
    value: OADR3.SubscriptionRequest;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateTargetType(data: any): (data: any) => {
    value: string;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateTargetValue(data: any): (data: any) => {
    value: string;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateUnits(data: any): (data: any) => {
    value: OADR3.Units;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateValuesMap(data: any): (data: any) => {
    value: OADR3.ValuesMap;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateVen(data: any): (data: any) => {
    value: OADR3.Ven;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateVenName(data: any): (data: any) => {
    value: string;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare function zodValidateVenRequest(data: any): (data: any) => {
    value: OADR3.VenRequest;
    errors?: undefined;
} | {
    errors: import("zod").ZodError<any>[];
    value?: undefined;
};
export declare const joiAuthError: Joi.ObjectSchema<any>;
export declare function joiValidateauthError(prog: any): Joi.ValidationResult<OADR3.AuthError>;
export declare const joiAuthServerInfo: Joi.ObjectSchema<any>;
export declare function joiValidateauthServerInfo(prog: any): Joi.ValidationResult<OADR3.AuthServerInfo>;
export declare const joiClientCredentialRequest: Joi.ObjectSchema<any>;
export declare function joiValidateClientCredentialRequest(prog: any): Joi.ValidationResult<OADR3.ClientCredentialRequest>;
export declare const joiClientCredentialResponse: Joi.ObjectSchema<any>;
export declare function joiValidateClientCredentialResponse(prog: any): Joi.ValidationResult<OADR3.ClientCredentialResponse>;
export declare const joiClientName: Joi.StringSchema<string>;
export declare function joiValidateName(prog: any): Joi.ValidationResult<OADR3.ClientName>;
export declare const joiDateTime: Joi.DateSchema<Date>;
export declare function joiValidateDateTime(prog: any): Joi.ValidationResult<any>;
export declare const joiDuration: Joi.StringSchema<string>;
export declare function joiValidateDuration(prog: any): Joi.ValidationResult<OADR3.Duration>;
export declare const joiEvent: Joi.AlternativesSchema<any>;
export declare function joiValidateEvent(prog: any): Joi.ValidationResult<OADR3.Event>;
export declare const joiSearchAllEvents: Joi.ObjectSchema<any>;
export declare function joiValidateSearchAllEvents(prog: OADR3Components.SearchAllEventsQueryParams): Joi.ValidationResult<OADR3Components.SearchAllEventsQueryParams>;
export declare const joiEventPayloadDescriptor: Joi.ObjectSchema<any>;
export declare function joiValidateEventPayloadDescriptor(prog: any): Joi.ValidationResult<OADR3.EventPayloadDescriptor>;
export declare const joiEventRequest: Joi.ObjectSchema<any>;
export declare function joiValidateEventRequest(prog: any): Joi.ValidationResult<OADR3.EventRequest>;
export declare const joiInterval: Joi.ObjectSchema<any>;
export declare function joiValidateInterval(prog: any): Joi.ValidationResult<OADR3.Interval>;
export declare const joiIntervalPeriod: Joi.ObjectSchema<any>;
export declare function joiValidateIntervalPeriod(prog: any): Joi.ValidationResult<OADR3.IntervalPeriod>;
export declare const joiMqttNotifierAuthenticationAnonymous: Joi.ObjectSchema<any>;
export declare function joiValidateMqttNotifierAuthenticationAnonymous(prog: any): Joi.ValidationResult<OADR3.MqttNotifierAuthenticationAnonymous>;
export declare const joiMqttNotifierAuthenticationCertificate: Joi.ObjectSchema<any>;
export declare function joiValidateMqttNotifierAuthenticationCertificate(prog: any): Joi.ValidationResult<OADR3.MqttNotifierAuthenticationCertificate>;
export declare const joiMqttNotifierAuthenticationOauth2BearerToken: Joi.ObjectSchema<any>;
export declare function joiValidateMqttNotifierAuthenticationOauth2BearerToken(prog: any): Joi.ValidationResult<OADR3.MqttNotifierAuthenticationOauth2BearerToken>;
export declare const joiMqttNotifierBindingObject: Joi.ObjectSchema<any>;
export declare function joiValidateMqttNotifierBindingObject(prog: any): Joi.ValidationResult<OADR3.MqttNotifierBindingObject>;
export declare const joiNotification: Joi.ObjectSchema<any>;
export declare function joiValidateNotification(prog: any): Joi.ValidationResult<OADR3.Notification>;
export declare const joiNotifierOperationsTopics: Joi.ObjectSchema<any>;
export declare function joiValidateNotifierOperationsTopics(prog: any): Joi.ValidationResult<OADR3.NotifierOperationsTopics>;
export declare const joiNotifiersResponse: Joi.ObjectSchema<any>;
export declare function joiValidateNotifiersResponse(prog: any): Joi.ValidationResult<OADR3.NotifiersResponse>;
export declare const joiNotifierTopicsResponse: Joi.ObjectSchema<any>;
export declare function joiValidateNotifierTopicsResponse(prog: any): Joi.ValidationResult<OADR3.NotifierTopicsResponse>;
export declare const joiObjectID: Joi.StringSchema<string>;
export declare function joiValidateObjectID(prog: any): Joi.ValidationResult<OADR3.ObjectID>;
export declare const joiObjectMetadata: Joi.ObjectSchema<any>;
export declare function joiValidateObjectMetadata(prog: any): Joi.ValidationResult<OADR3.ObjectMetadata>;
export declare const joiObjectTypes: Joi.StringSchema<string>;
export declare function joiValidateObjectTypes(prog: any): Joi.ValidationResult<string>;
export declare const joiPoint: Joi.ObjectSchema<any>;
export declare function joiValidatePoint(prog: any): Joi.ValidationResult<OADR3.Point>;
export declare const joiProblem: Joi.ObjectSchema<any>;
export declare function joiValidateProblem(prog: any): Joi.ValidationResult<OADR3.Problem>;
export declare const joiProgram: Joi.AlternativesSchema<any>;
export declare function joiValidateProgram(prog: any): Joi.ValidationResult<OADR3.Program>;
export declare const joiProgramRequest: Joi.ObjectSchema<any>;
export declare function joiValidateProgramRequest(prog: any): Joi.ValidationResult<OADR3.ProgramRequest>;
export declare const joiSearchAllPrograms: Joi.ObjectSchema<any>;
export declare function joiValidateSearchAllPrograms(prog: any): Joi.ValidationResult<any>;
export declare const joiReadingType: Joi.StringSchema<string>;
export declare function joiValidateReadingType(report: any): Joi.ValidationResult<OADR3.ReadingType>;
export declare const joiReport: Joi.AlternativesSchema<any>;
export declare function joiValidateReport(report: any): Joi.ValidationResult<OADR3.Report>;
export declare const joiReportRequest: Joi.ObjectSchema<any>;
export declare function joiValidateReportRequest(report: any): Joi.ValidationResult<OADR3.ReportRequest>;
export declare const joiSearchAllReports: Joi.ObjectSchema<any>;
export declare function joiValidateSearchAllReports(prog: any): Joi.ValidationResult<any>;
export declare const joiReportDescriptor: Joi.ObjectSchema<any>;
export declare function joiValidateReportDescriptor(report: any): Joi.ValidationResult<OADR3.ReportDescriptor>;
export declare const joiReportPayloadDescriptor: Joi.ObjectSchema<any>;
export declare function joiValidateReportPayloadDescriptor(report: any): Joi.ValidationResult<OADR3.ReportPayloadDescriptor>;
export declare const joiResource: Joi.AlternativesSchema<any>;
export declare function joiValidateResource(report: any): Joi.ValidationResult<OADR3.Resource>;
export declare const joiResourceName: Joi.StringSchema<string>;
export declare function joiValidateResourceName(report: any): Joi.ValidationResult<OADR3.ResourceName>;
export declare const joiResourceRequest: Joi.ObjectSchema<any>;
export declare function joiValidateResourceRequest(report: any): Joi.ValidationResult<OADR3.ResourceRequest>;
export declare const joiSearchVenResources: Joi.ObjectSchema<any>;
export declare function joiValidateSearchVenResources(prog: any): Joi.ValidationResult<any>;
export declare const joiSubscription: Joi.AlternativesSchema<any>;
export declare function joiValidateSubscription(report: any): Joi.ValidationResult<OADR3.Subscription>;
export declare const joiSubscriptionRequest: Joi.ObjectSchema<any>;
export declare function joiValidateSubscriptionRequest(report: any): Joi.ValidationResult<OADR3.SubscriptionRequest>;
export declare const joiSearchSubscriptions: Joi.ObjectSchema<any>;
export declare function joiValidateSearchSubscriptions(prog: any): Joi.ValidationResult<any>;
export declare const joiTargetType: Joi.StringSchema<string>;
export declare function joiValidateTargetType(report: any): Joi.ValidationResult<OADR3.TargetType>;
export declare const joiTargetValue: Joi.StringSchema<string>;
export declare function joiValidateTargetValue(report: any): Joi.ValidationResult<OADR3.TargetValue>;
export declare const joiUnits: Joi.StringSchema<string>;
export declare function joiValidateUnits(report: any): Joi.ValidationResult<OADR3.Units>;
export declare const joiValuesMap: Joi.ObjectSchema<any>;
export declare function joiValidateValuesMap(report: any): Joi.ValidationResult<OADR3.ValuesMap>;
export declare const joiVen: Joi.AlternativesSchema<any>;
export declare function joiValidateVen(report: any): Joi.ValidationResult<OADR3.Ven>;
export declare const joiVenName: Joi.StringSchema<string>;
export declare function joiValidateVenName(report: any): Joi.ValidationResult<OADR3.VenName>;
export declare const joiVenRequest: Joi.ObjectSchema<any>;
export declare function joiValidateVenRequest(report: any): Joi.ValidationResult<OADR3.VenRequest>;
export declare const joiSearchVens: Joi.ObjectSchema<any>;
export declare function joiValidateSearchVens(prog: any): Joi.ValidationResult<any>;
//# sourceMappingURL=index.d.ts.map