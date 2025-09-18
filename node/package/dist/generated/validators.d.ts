/**
 * Auto-generated AJV validators for OpenADR 3.1.0
 *
 * These validators preserve all OpenAPI validation constraints:
 * - @pattern for regex patterns
 * - @minLength/@maxLength for string length constraints
 * - @minimum/@maximum for numeric constraints
 * - @format for format validation (date-time, uri, etc.)
 *
 * Generated from: openadr3.1.0.yaml
 */
import { type ErrorObject } from 'ajv';
import type * as Schemas from './openadr3Schemas.js';
export type Program = Schemas.Program;
export type ProgramRequest = Schemas.ProgramRequest;
export type Report = Schemas.Report;
export type ReportRequest = Schemas.ReportRequest;
export type Event = Schemas.Event;
export type EventRequest = Schemas.EventRequest;
export type Subscription = Schemas.Subscription;
export type SubscriptionRequest = Schemas.SubscriptionRequest;
export type Ven = Schemas.Ven;
export type VenRequest = Schemas.VenRequest;
export type BlVenRequest = Schemas.BlVenRequest;
export type VenVenRequest = Schemas.VenVenRequest;
export type Resource = Schemas.Resource;
export type ResourceRequest = Schemas.ResourceRequest;
export type BlResourceRequest = Schemas.BlResourceRequest;
export type VenResourceRequest = Schemas.VenResourceRequest;
export type ObjectMetadata = Schemas.ObjectMetadata;
export type Interval = Schemas.Interval;
export type IntervalPeriod = Schemas.IntervalPeriod;
export type ValuesMap = Schemas.ValuesMap;
export type Point = Schemas.Point;
export type EventPayloadDescriptor = Schemas.EventPayloadDescriptor;
export type ReportPayloadDescriptor = Schemas.ReportPayloadDescriptor;
export type ReportDescriptor = Schemas.ReportDescriptor;
export type ObjectID = Schemas.ObjectID;
export type ClientID = Schemas.ClientID;
export type VenName = Schemas.VenName;
export type ClientName = Schemas.ClientName;
export type Target = Schemas.Target;
export type ResourceName = Schemas.ResourceName;
export type Units = Schemas.Units;
export type ReadingType = Schemas.ReadingType;
export type Notification = Schemas.Notification;
export type ObjectTypes = Schemas.ObjectTypes;
export type DateTime = Schemas.DateTime;
export type Duration = Schemas.Duration;
export type ClientCredentialRequest = Schemas.ClientCredentialRequest;
export type ClientCredentialResponse = Schemas.ClientCredentialResponse;
export type AuthError = Schemas.AuthError;
export type AuthServerInfo = Schemas.AuthServerInfo;
export type NotifiersResponse = Schemas.NotifiersResponse;
export type MqttNotifierBindingObject = Schemas.MqttNotifierBindingObject;
export type MqttNotifierAuthenticationAnonymous = Schemas.MqttNotifierAuthenticationAnonymous;
export type MqttNotifierAuthenticationOauth2BearerToken = Schemas.MqttNotifierAuthenticationOauth2BearerToken;
export type MqttNotifierAuthenticationCertificate = Schemas.MqttNotifierAuthenticationCertificate;
export type NotifierOperationsTopics = Schemas.NotifierOperationsTopics;
export type NotifierTopicsResponse = Schemas.NotifierTopicsResponse;
export interface ValidationResult<T> {
    success: boolean;
    data?: T;
    errors: ErrorObject[];
}
/**
 * Server provided representation of program
 */
export declare const programSchema: {
    readonly type: "object";
    readonly description: "Server provided representation of program";
    readonly allOf: readonly [{
        readonly type: "object";
        readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
        readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly createdDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly modificationDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly objectType: {
                readonly type: "string";
                readonly description: "Types of objects addressable through API.";
                readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
            };
        };
    }, {
        readonly type: "object";
        readonly description: "Client provided description of program";
        readonly required: readonly ["programName"];
        readonly properties: {
            readonly programName: {
                readonly type: "string";
                readonly description: "Short name to uniquely identify program.";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly intervalPeriod: {
                readonly type: "object";
                readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                readonly properties: {
                    readonly start: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "datetime in RFC 3339 format";
                    };
                    readonly duration: {
                        readonly type: "string";
                        readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                        readonly description: "duration in ISO 8601 format";
                        readonly default: "PT0S";
                    };
                    readonly randomizeStart: {
                        readonly type: "string";
                        readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                        readonly description: "duration in ISO 8601 format";
                        readonly default: "PT0S";
                    };
                };
            };
            readonly programDescriptions: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of programDescriptions";
                readonly items: {
                    readonly required: readonly ["URL"];
                    readonly properties: {
                        readonly URL: {
                            readonly type: "string";
                            readonly format: "uri";
                            readonly minLength: 2;
                            readonly maxLength: 8000;
                            readonly description: "A human or machine readable program description";
                        };
                    };
                };
                readonly default: null;
            };
            readonly payloadDescriptors: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of payloadDescriptors.";
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly type: "object";
                        readonly description: "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n";
                        readonly required: readonly ["objectType", "payloadType"];
                        readonly properties: {
                            readonly objectType: {
                                readonly type: "string";
                                readonly description: "Used as discriminator.";
                                readonly enum: readonly ["EVENT_PAYLOAD_DESCRIPTOR"];
                            };
                            readonly payloadType: {
                                readonly type: "string";
                                readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                readonly minLength: 1;
                                readonly maxLength: 128;
                            };
                            readonly units: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "Units of measure.";
                                readonly default: null;
                                readonly minLength: 1;
                                readonly maxLength: 128;
                            };
                            readonly currency: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "Currency of price payload.";
                                readonly default: null;
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly description: "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n";
                        readonly required: readonly ["objectType", "payloadType"];
                        readonly properties: {
                            readonly objectType: {
                                readonly type: "string";
                                readonly description: "Used as discriminator.";
                                readonly enum: readonly ["REPORT_PAYLOAD_DESCRIPTOR"];
                            };
                            readonly payloadType: {
                                readonly type: "string";
                                readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                readonly minLength: 1;
                                readonly maxLength: 128;
                            };
                            readonly readingType: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                readonly minLength: 1;
                                readonly maxLength: 128;
                                readonly default: null;
                            };
                            readonly units: {
                                readonly type: readonly ["string", "null"];
                                readonly description: "Units of measure.";
                                readonly default: null;
                                readonly minLength: 1;
                                readonly maxLength: 128;
                            };
                            readonly accuracy: {
                                readonly type: readonly ["number", "null"];
                                readonly format: "float";
                                readonly description: "A quantification of the accuracy of a set of payload values.";
                                readonly default: null;
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                            readonly confidence: {
                                readonly type: readonly ["integer", "null"];
                                readonly format: "int32";
                                readonly minimum: 0;
                                readonly maximum: 100;
                                readonly description: "A quantification of the confidence in a set of payload values.";
                                readonly default: null;
                            };
                        };
                    }];
                };
                readonly default: null;
            };
            readonly attributes: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of valuesMap objects describing attributes.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    readonly required: readonly ["type", "values"];
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        };
                        readonly values: {
                            readonly type: "array";
                            readonly description: "A list of data points. Most often a singular value such as a price.";
                            readonly items: {
                                readonly anyOf: readonly [{
                                    readonly type: "number";
                                }, {
                                    readonly type: "integer";
                                }, {
                                    readonly type: "string";
                                }, {
                                    readonly type: "boolean";
                                }, {
                                    readonly type: "object";
                                    readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                    readonly required: readonly ["x", "y"];
                                    readonly properties: {
                                        readonly x: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on an x axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly y: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on a y axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
                readonly default: null;
            };
            readonly targets: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of targets.";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 128;
                    readonly description: "User generated target string.";
                };
                readonly default: null;
            };
        };
    }];
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Client provided description of program
 */
export declare const programRequestSchema: {
    readonly type: "object";
    readonly description: "Client provided description of program";
    readonly required: readonly ["programName"];
    readonly properties: {
        readonly programName: {
            readonly type: "string";
            readonly description: "Short name to uniquely identify program.";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly intervalPeriod: {
            readonly type: "object";
            readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
            readonly properties: {
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "datetime in RFC 3339 format";
                };
                readonly duration: {
                    readonly type: "string";
                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                    readonly description: "duration in ISO 8601 format";
                    readonly default: "PT0S";
                };
                readonly randomizeStart: {
                    readonly type: "string";
                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                    readonly description: "duration in ISO 8601 format";
                    readonly default: "PT0S";
                };
            };
        };
        readonly programDescriptions: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of programDescriptions";
            readonly items: {
                readonly required: readonly ["URL"];
                readonly properties: {
                    readonly URL: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly minLength: 2;
                        readonly maxLength: 8000;
                        readonly description: "A human or machine readable program description";
                    };
                };
            };
            readonly default: null;
        };
        readonly payloadDescriptors: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of payloadDescriptors.";
            readonly items: {
                readonly anyOf: readonly [{
                    readonly type: "object";
                    readonly description: "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n";
                    readonly required: readonly ["objectType", "payloadType"];
                    readonly properties: {
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Used as discriminator.";
                            readonly enum: readonly ["EVENT_PAYLOAD_DESCRIPTOR"];
                        };
                        readonly payloadType: {
                            readonly type: "string";
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly units: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Units of measure.";
                            readonly default: null;
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly currency: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Currency of price payload.";
                            readonly default: null;
                        };
                    };
                }, {
                    readonly type: "object";
                    readonly description: "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n";
                    readonly required: readonly ["objectType", "payloadType"];
                    readonly properties: {
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Used as discriminator.";
                            readonly enum: readonly ["REPORT_PAYLOAD_DESCRIPTOR"];
                        };
                        readonly payloadType: {
                            readonly type: "string";
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly readingType: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly default: null;
                        };
                        readonly units: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Units of measure.";
                            readonly default: null;
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly accuracy: {
                            readonly type: readonly ["number", "null"];
                            readonly format: "float";
                            readonly description: "A quantification of the accuracy of a set of payload values.";
                            readonly default: null;
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly confidence: {
                            readonly type: readonly ["integer", "null"];
                            readonly format: "int32";
                            readonly minimum: 0;
                            readonly maximum: 100;
                            readonly description: "A quantification of the confidence in a set of payload values.";
                            readonly default: null;
                        };
                    };
                }];
            };
            readonly default: null;
        };
        readonly attributes: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of valuesMap objects describing attributes.";
            readonly items: {
                readonly type: "object";
                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                readonly required: readonly ["type", "values"];
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    };
                    readonly values: {
                        readonly type: "array";
                        readonly description: "A list of data points. Most often a singular value such as a price.";
                        readonly items: {
                            readonly anyOf: readonly [{
                                readonly type: "number";
                            }, {
                                readonly type: "integer";
                            }, {
                                readonly type: "string";
                            }, {
                                readonly type: "boolean";
                            }, {
                                readonly type: "object";
                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                readonly required: readonly ["x", "y"];
                                readonly properties: {
                                    readonly x: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on an x axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                    readonly y: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on a y axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly default: null;
        };
        readonly targets: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of targets.";
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated target string.";
            };
            readonly default: null;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Server provided representation of report
 */
export declare const reportSchema: {
    readonly type: "object";
    readonly description: "Server provided representation of report";
    readonly allOf: readonly [{
        readonly type: "object";
        readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
        readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly createdDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly modificationDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly objectType: {
                readonly type: "string";
                readonly description: "Types of objects addressable through API.";
                readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
            };
        };
    }, {
        readonly type: "object";
        readonly description: "report object.";
        readonly required: readonly ["eventID", "clientName", "resources"];
        readonly properties: {
            readonly eventID: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly clientName: {
                readonly type: "string";
                readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly reportName: {
                readonly type: readonly ["string", "null"];
                readonly description: "User defined string for use in debugging or User Interface.";
                readonly default: null;
            };
            readonly payloadDescriptors: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of reportPayloadDescriptors.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n";
                    readonly required: readonly ["objectType", "payloadType"];
                    readonly properties: {
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Used as discriminator.";
                            readonly enum: readonly ["REPORT_PAYLOAD_DESCRIPTOR"];
                        };
                        readonly payloadType: {
                            readonly type: "string";
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly readingType: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly default: null;
                        };
                        readonly units: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Units of measure.";
                            readonly default: null;
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly accuracy: {
                            readonly type: readonly ["number", "null"];
                            readonly format: "float";
                            readonly description: "A quantification of the accuracy of a set of payload values.";
                            readonly default: null;
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly confidence: {
                            readonly type: readonly ["integer", "null"];
                            readonly format: "int32";
                            readonly minimum: 0;
                            readonly maximum: 100;
                            readonly description: "A quantification of the confidence in a set of payload values.";
                            readonly default: null;
                        };
                    };
                };
                readonly default: null;
            };
            readonly resources: {
                readonly type: "array";
                readonly description: "A list of objects containing report data for a set of resources.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Report data associated with a resource.";
                    readonly required: readonly ["resourceName", "intervals"];
                    readonly properties: {
                        readonly resourceName: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
                        };
                        readonly intervalPeriod: {
                            readonly type: "object";
                            readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                            readonly properties: {
                                readonly start: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "datetime in RFC 3339 format";
                                };
                                readonly duration: {
                                    readonly type: "string";
                                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                    readonly description: "duration in ISO 8601 format";
                                    readonly default: "PT0S";
                                };
                                readonly randomizeStart: {
                                    readonly type: "string";
                                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                    readonly description: "duration in ISO 8601 format";
                                    readonly default: "PT0S";
                                };
                            };
                        };
                        readonly intervals: {
                            readonly type: "array";
                            readonly description: "A list of interval objects.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n";
                                readonly required: readonly ["id", "payloads"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "A client generated number assigned an interval object. Not a sequence number.";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly intervalPeriod: {
                                        readonly type: "object";
                                        readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                                        readonly properties: {
                                            readonly start: {
                                                readonly type: "string";
                                                readonly format: "date-time";
                                                readonly description: "datetime in RFC 3339 format";
                                            };
                                            readonly duration: {
                                                readonly type: "string";
                                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                                readonly description: "duration in ISO 8601 format";
                                                readonly default: "PT0S";
                                            };
                                            readonly randomizeStart: {
                                                readonly type: "string";
                                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                                readonly description: "duration in ISO 8601 format";
                                                readonly default: "PT0S";
                                            };
                                        };
                                    };
                                    readonly payloads: {
                                        readonly type: "array";
                                        readonly description: "A list of valuesMap objects.";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                            readonly required: readonly ["type", "values"];
                                            readonly properties: {
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly minLength: 1;
                                                    readonly maxLength: 128;
                                                    readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                                };
                                                readonly values: {
                                                    readonly type: "array";
                                                    readonly description: "A list of data points. Most often a singular value such as a price.";
                                                    readonly items: {
                                                        readonly anyOf: readonly [{
                                                            readonly type: "number";
                                                        }, {
                                                            readonly type: "integer";
                                                        }, {
                                                            readonly type: "string";
                                                        }, {
                                                            readonly type: "boolean";
                                                        }, {
                                                            readonly type: "object";
                                                            readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                                            readonly required: readonly ["x", "y"];
                                                            readonly properties: {
                                                                readonly x: {
                                                                    readonly type: "number";
                                                                    readonly format: "float";
                                                                    readonly description: "A value on an x axis.";
                                                                    readonly minimum: -3.402823669209385e+38;
                                                                    readonly maximum: 3.402823669209385e+38;
                                                                };
                                                                readonly y: {
                                                                    readonly type: "number";
                                                                    readonly format: "float";
                                                                    readonly description: "A value on a y axis.";
                                                                    readonly minimum: -3.402823669209385e+38;
                                                                    readonly maximum: 3.402823669209385e+38;
                                                                };
                                                            };
                                                        }];
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    }, {
        readonly type: "object";
        readonly required: readonly ["clientID"];
        readonly properties: {
            readonly clientID: {
                readonly type: "string";
                readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
        };
    }];
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * report object.
 */
export declare const reportRequestSchema: {
    readonly type: "object";
    readonly description: "report object.";
    readonly required: readonly ["eventID", "clientName", "resources"];
    readonly properties: {
        readonly eventID: {
            readonly type: "string";
            readonly pattern: "^[a-zA-Z0-9_-]*$";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly description: "URL safe VTN assigned object ID.";
        };
        readonly clientName: {
            readonly type: "string";
            readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly reportName: {
            readonly type: readonly ["string", "null"];
            readonly description: "User defined string for use in debugging or User Interface.";
            readonly default: null;
        };
        readonly payloadDescriptors: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of reportPayloadDescriptors.";
            readonly items: {
                readonly type: "object";
                readonly description: "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n";
                readonly required: readonly ["objectType", "payloadType"];
                readonly properties: {
                    readonly objectType: {
                        readonly type: "string";
                        readonly description: "Used as discriminator.";
                        readonly enum: readonly ["REPORT_PAYLOAD_DESCRIPTOR"];
                    };
                    readonly payloadType: {
                        readonly type: "string";
                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                    };
                    readonly readingType: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                        readonly default: null;
                    };
                    readonly units: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "Units of measure.";
                        readonly default: null;
                        readonly minLength: 1;
                        readonly maxLength: 128;
                    };
                    readonly accuracy: {
                        readonly type: readonly ["number", "null"];
                        readonly format: "float";
                        readonly description: "A quantification of the accuracy of a set of payload values.";
                        readonly default: null;
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly confidence: {
                        readonly type: readonly ["integer", "null"];
                        readonly format: "int32";
                        readonly minimum: 0;
                        readonly maximum: 100;
                        readonly description: "A quantification of the confidence in a set of payload values.";
                        readonly default: null;
                    };
                };
            };
            readonly default: null;
        };
        readonly resources: {
            readonly type: "array";
            readonly description: "A list of objects containing report data for a set of resources.";
            readonly items: {
                readonly type: "object";
                readonly description: "Report data associated with a resource.";
                readonly required: readonly ["resourceName", "intervals"];
                readonly properties: {
                    readonly resourceName: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                        readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
                    };
                    readonly intervalPeriod: {
                        readonly type: "object";
                        readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                        readonly properties: {
                            readonly start: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "datetime in RFC 3339 format";
                            };
                            readonly duration: {
                                readonly type: "string";
                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                readonly description: "duration in ISO 8601 format";
                                readonly default: "PT0S";
                            };
                            readonly randomizeStart: {
                                readonly type: "string";
                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                readonly description: "duration in ISO 8601 format";
                                readonly default: "PT0S";
                            };
                        };
                    };
                    readonly intervals: {
                        readonly type: "array";
                        readonly description: "A list of interval objects.";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n";
                            readonly required: readonly ["id", "payloads"];
                            readonly properties: {
                                readonly id: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly description: "A client generated number assigned an interval object. Not a sequence number.";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly intervalPeriod: {
                                    readonly type: "object";
                                    readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                                    readonly properties: {
                                        readonly start: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "datetime in RFC 3339 format";
                                        };
                                        readonly duration: {
                                            readonly type: "string";
                                            readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                            readonly description: "duration in ISO 8601 format";
                                            readonly default: "PT0S";
                                        };
                                        readonly randomizeStart: {
                                            readonly type: "string";
                                            readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                            readonly description: "duration in ISO 8601 format";
                                            readonly default: "PT0S";
                                        };
                                    };
                                };
                                readonly payloads: {
                                    readonly type: "array";
                                    readonly description: "A list of valuesMap objects.";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                        readonly required: readonly ["type", "values"];
                                        readonly properties: {
                                            readonly type: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                                readonly maxLength: 128;
                                                readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                            };
                                            readonly values: {
                                                readonly type: "array";
                                                readonly description: "A list of data points. Most often a singular value such as a price.";
                                                readonly items: {
                                                    readonly anyOf: readonly [{
                                                        readonly type: "number";
                                                    }, {
                                                        readonly type: "integer";
                                                    }, {
                                                        readonly type: "string";
                                                    }, {
                                                        readonly type: "boolean";
                                                    }, {
                                                        readonly type: "object";
                                                        readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                                        readonly required: readonly ["x", "y"];
                                                        readonly properties: {
                                                            readonly x: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "A value on an x axis.";
                                                                readonly minimum: -3.402823669209385e+38;
                                                                readonly maximum: 3.402823669209385e+38;
                                                            };
                                                            readonly y: {
                                                                readonly type: "number";
                                                                readonly format: "float";
                                                                readonly description: "A value on a y axis.";
                                                                readonly minimum: -3.402823669209385e+38;
                                                                readonly maximum: 3.402823669209385e+38;
                                                            };
                                                        };
                                                    }];
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Server provided representation of event
 */
export declare const eventSchema: {
    readonly type: "object";
    readonly description: "Server provided representation of event";
    readonly allOf: readonly [{
        readonly type: "object";
        readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
        readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly createdDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly modificationDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly objectType: {
                readonly type: "string";
                readonly description: "Types of objects addressable through API.";
                readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
            };
        };
    }, {
        readonly type: "object";
        readonly description: "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n";
        readonly required: readonly ["programID"];
        readonly properties: {
            readonly programID: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly eventName: {
                readonly type: readonly ["string", "null"];
                readonly description: "User defined string for use in debugging or User Interface.";
                readonly default: null;
            };
            readonly duration: {
                readonly type: "string";
                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                readonly description: "duration in ISO 8601 format";
                readonly default: "PT0S";
            };
            readonly priority: {
                readonly type: readonly ["integer", "null"];
                readonly minimum: 0;
                readonly description: "Relative priority of event. A lower number is a higher priority.";
                readonly default: null;
            };
            readonly targets: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of targets.";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 128;
                    readonly description: "User generated target string.";
                };
                readonly default: null;
            };
            readonly reportDescriptors: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of reportDescriptor objects. Used to request reports from VEN.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "An object that may be used to request a report from a VEN.\n";
                    readonly required: readonly ["payloadType"];
                    readonly properties: {
                        readonly payloadType: {
                            readonly type: "string";
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly readingType: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly default: null;
                        };
                        readonly units: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Units of measure.";
                            readonly default: null;
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly targets: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of targets.";
                            readonly items: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly maxLength: 128;
                                readonly description: "User generated target string.";
                            };
                            readonly default: null;
                        };
                        readonly aggregate: {
                            readonly type: "boolean";
                            readonly description: "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n";
                            readonly default: false;
                        };
                        readonly startInterval: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n";
                            readonly default: -1;
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly numIntervals: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n";
                            readonly default: -1;
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly historical: {
                            readonly type: "boolean";
                            readonly description: "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n";
                            readonly default: true;
                        };
                        readonly frequency: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n";
                            readonly default: -1;
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly repeat: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n";
                            readonly default: 1;
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly reportIntervals: {
                            readonly type: "string";
                            readonly description: "Indicates VEN report interval options. See User Guide.";
                            readonly enum: readonly ["INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS"];
                            readonly default: "INTERVALS";
                        };
                    };
                };
                readonly default: null;
            };
            readonly payloadDescriptors: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of payloadDescriptor objects.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n";
                    readonly required: readonly ["objectType", "payloadType"];
                    readonly properties: {
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Used as discriminator.";
                            readonly enum: readonly ["EVENT_PAYLOAD_DESCRIPTOR"];
                        };
                        readonly payloadType: {
                            readonly type: "string";
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly units: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Units of measure.";
                            readonly default: null;
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly currency: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "Currency of price payload.";
                            readonly default: null;
                        };
                    };
                };
                readonly default: null;
            };
            readonly intervalPeriod: {
                readonly type: "object";
                readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                readonly properties: {
                    readonly start: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "datetime in RFC 3339 format";
                    };
                    readonly duration: {
                        readonly type: "string";
                        readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                        readonly description: "duration in ISO 8601 format";
                        readonly default: "PT0S";
                    };
                    readonly randomizeStart: {
                        readonly type: "string";
                        readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                        readonly description: "duration in ISO 8601 format";
                        readonly default: "PT0S";
                    };
                };
            };
            readonly intervals: {
                readonly type: "array";
                readonly description: "A list of interval objects.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n";
                    readonly required: readonly ["id", "payloads"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly description: "A client generated number assigned an interval object. Not a sequence number.";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly intervalPeriod: {
                            readonly type: "object";
                            readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                            readonly properties: {
                                readonly start: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "datetime in RFC 3339 format";
                                };
                                readonly duration: {
                                    readonly type: "string";
                                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                    readonly description: "duration in ISO 8601 format";
                                    readonly default: "PT0S";
                                };
                                readonly randomizeStart: {
                                    readonly type: "string";
                                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                    readonly description: "duration in ISO 8601 format";
                                    readonly default: "PT0S";
                                };
                            };
                        };
                        readonly payloads: {
                            readonly type: "array";
                            readonly description: "A list of valuesMap objects.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                readonly required: readonly ["type", "values"];
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                    };
                                    readonly values: {
                                        readonly type: "array";
                                        readonly description: "A list of data points. Most often a singular value such as a price.";
                                        readonly items: {
                                            readonly anyOf: readonly [{
                                                readonly type: "number";
                                            }, {
                                                readonly type: "integer";
                                            }, {
                                                readonly type: "string";
                                            }, {
                                                readonly type: "boolean";
                                            }, {
                                                readonly type: "object";
                                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                                readonly required: readonly ["x", "y"];
                                                readonly properties: {
                                                    readonly x: {
                                                        readonly type: "number";
                                                        readonly format: "float";
                                                        readonly description: "A value on an x axis.";
                                                        readonly minimum: -3.402823669209385e+38;
                                                        readonly maximum: 3.402823669209385e+38;
                                                    };
                                                    readonly y: {
                                                        readonly type: "number";
                                                        readonly format: "float";
                                                        readonly description: "A value on a y axis.";
                                                        readonly minimum: -3.402823669209385e+38;
                                                        readonly maximum: 3.402823669209385e+38;
                                                    };
                                                };
                                            }];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    }];
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Event object to communicate a Demand Response request to VEN.
If intervalPeriod is present, sets default start time and duration of intervals.

 */
export declare const eventRequestSchema: {
    readonly type: "object";
    readonly description: "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n";
    readonly required: readonly ["programID"];
    readonly properties: {
        readonly programID: {
            readonly type: "string";
            readonly pattern: "^[a-zA-Z0-9_-]*$";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly description: "URL safe VTN assigned object ID.";
        };
        readonly eventName: {
            readonly type: readonly ["string", "null"];
            readonly description: "User defined string for use in debugging or User Interface.";
            readonly default: null;
        };
        readonly duration: {
            readonly type: "string";
            readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
            readonly description: "duration in ISO 8601 format";
            readonly default: "PT0S";
        };
        readonly priority: {
            readonly type: readonly ["integer", "null"];
            readonly minimum: 0;
            readonly description: "Relative priority of event. A lower number is a higher priority.";
            readonly default: null;
        };
        readonly targets: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of targets.";
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated target string.";
            };
            readonly default: null;
        };
        readonly reportDescriptors: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of reportDescriptor objects. Used to request reports from VEN.";
            readonly items: {
                readonly type: "object";
                readonly description: "An object that may be used to request a report from a VEN.\n";
                readonly required: readonly ["payloadType"];
                readonly properties: {
                    readonly payloadType: {
                        readonly type: "string";
                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                    };
                    readonly readingType: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                        readonly default: null;
                    };
                    readonly units: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "Units of measure.";
                        readonly default: null;
                        readonly minLength: 1;
                        readonly maxLength: 128;
                    };
                    readonly targets: {
                        readonly type: readonly ["array", "null"];
                        readonly description: "A list of targets.";
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "User generated target string.";
                        };
                        readonly default: null;
                    };
                    readonly aggregate: {
                        readonly type: "boolean";
                        readonly description: "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n";
                        readonly default: false;
                    };
                    readonly startInterval: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly description: "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n";
                        readonly default: -1;
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly numIntervals: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly description: "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n";
                        readonly default: -1;
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly historical: {
                        readonly type: "boolean";
                        readonly description: "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n";
                        readonly default: true;
                    };
                    readonly frequency: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly description: "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n";
                        readonly default: -1;
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly repeat: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly description: "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n";
                        readonly default: 1;
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly reportIntervals: {
                        readonly type: "string";
                        readonly description: "Indicates VEN report interval options. See User Guide.";
                        readonly enum: readonly ["INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS"];
                        readonly default: "INTERVALS";
                    };
                };
            };
            readonly default: null;
        };
        readonly payloadDescriptors: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of payloadDescriptor objects.";
            readonly items: {
                readonly type: "object";
                readonly description: "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n";
                readonly required: readonly ["objectType", "payloadType"];
                readonly properties: {
                    readonly objectType: {
                        readonly type: "string";
                        readonly description: "Used as discriminator.";
                        readonly enum: readonly ["EVENT_PAYLOAD_DESCRIPTOR"];
                    };
                    readonly payloadType: {
                        readonly type: "string";
                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                    };
                    readonly units: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "Units of measure.";
                        readonly default: null;
                        readonly minLength: 1;
                        readonly maxLength: 128;
                    };
                    readonly currency: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "Currency of price payload.";
                        readonly default: null;
                    };
                };
            };
            readonly default: null;
        };
        readonly intervalPeriod: {
            readonly type: "object";
            readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
            readonly properties: {
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "datetime in RFC 3339 format";
                };
                readonly duration: {
                    readonly type: "string";
                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                    readonly description: "duration in ISO 8601 format";
                    readonly default: "PT0S";
                };
                readonly randomizeStart: {
                    readonly type: "string";
                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                    readonly description: "duration in ISO 8601 format";
                    readonly default: "PT0S";
                };
            };
        };
        readonly intervals: {
            readonly type: "array";
            readonly description: "A list of interval objects.";
            readonly items: {
                readonly type: "object";
                readonly description: "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n";
                readonly required: readonly ["id", "payloads"];
                readonly properties: {
                    readonly id: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly description: "A client generated number assigned an interval object. Not a sequence number.";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly intervalPeriod: {
                        readonly type: "object";
                        readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                        readonly properties: {
                            readonly start: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "datetime in RFC 3339 format";
                            };
                            readonly duration: {
                                readonly type: "string";
                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                readonly description: "duration in ISO 8601 format";
                                readonly default: "PT0S";
                            };
                            readonly randomizeStart: {
                                readonly type: "string";
                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                readonly description: "duration in ISO 8601 format";
                                readonly default: "PT0S";
                            };
                        };
                    };
                    readonly payloads: {
                        readonly type: "array";
                        readonly description: "A list of valuesMap objects.";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                            readonly required: readonly ["type", "values"];
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly maxLength: 128;
                                    readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                };
                                readonly values: {
                                    readonly type: "array";
                                    readonly description: "A list of data points. Most often a singular value such as a price.";
                                    readonly items: {
                                        readonly anyOf: readonly [{
                                            readonly type: "number";
                                        }, {
                                            readonly type: "integer";
                                        }, {
                                            readonly type: "string";
                                        }, {
                                            readonly type: "boolean";
                                        }, {
                                            readonly type: "object";
                                            readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                            readonly required: readonly ["x", "y"];
                                            readonly properties: {
                                                readonly x: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "A value on an x axis.";
                                                    readonly minimum: -3.402823669209385e+38;
                                                    readonly maximum: 3.402823669209385e+38;
                                                };
                                                readonly y: {
                                                    readonly type: "number";
                                                    readonly format: "float";
                                                    readonly description: "A value on a y axis.";
                                                    readonly minimum: -3.402823669209385e+38;
                                                    readonly maximum: 3.402823669209385e+38;
                                                };
                                            };
                                        }];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Server provided representation of subscription
 */
export declare const subscriptionSchema: {
    readonly type: "object";
    readonly description: "Server provided representation of subscription";
    readonly allOf: readonly [{
        readonly type: "object";
        readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
        readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly createdDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly modificationDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly objectType: {
                readonly type: "string";
                readonly description: "Types of objects addressable through API.";
                readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
            };
        };
    }, {
        readonly type: "object";
        readonly description: "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n";
        readonly required: readonly ["clientName", "objectOperations"];
        readonly properties: {
            readonly clientName: {
                readonly type: "string";
                readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly programID: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly objectOperations: {
                readonly type: "array";
                readonly description: "list of objects and operations to subscribe to.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "object type, operations, and callbackUrl.";
                    readonly required: readonly ["objects", "operations", "callbackUrl"];
                    readonly properties: {
                        readonly objects: {
                            readonly type: "array";
                            readonly description: "list of objects to subscribe to.";
                            readonly items: {
                                readonly type: "string";
                                readonly description: "Types of objects addressable through API.";
                                readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
                            };
                        };
                        readonly operations: {
                            readonly type: "array";
                            readonly description: "list of operations to subscribe to.";
                            readonly items: {
                                readonly type: "string";
                                readonly description: "object operation to subscribe to.";
                                readonly enum: readonly ["READ", "CREATE", "UPDATE", "DELETE"];
                            };
                        };
                        readonly callbackUrl: {
                            readonly type: "string";
                            readonly format: "uri";
                            readonly minLength: 2;
                            readonly maxLength: 8000;
                            readonly description: "User provided webhook URL.";
                        };
                        readonly bearerToken: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n";
                            readonly default: null;
                        };
                    };
                };
            };
            readonly targets: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of target objects. Used by server to filter notifications.";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 128;
                    readonly description: "User generated target string.";
                };
                readonly default: null;
            };
        };
    }, {
        readonly type: "object";
        readonly required: readonly ["clientID"];
        readonly properties: {
            readonly clientID: {
                readonly type: "string";
                readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
        };
    }];
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * An object created by a client to receive notification of operations on objects.
Clients may subscribe to be notified when a type of object is created,
updated, or deleted.

 */
export declare const subscriptionRequestSchema: {
    readonly type: "object";
    readonly description: "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n";
    readonly required: readonly ["clientName", "objectOperations"];
    readonly properties: {
        readonly clientName: {
            readonly type: "string";
            readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly programID: {
            readonly type: "string";
            readonly pattern: "^[a-zA-Z0-9_-]*$";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly description: "URL safe VTN assigned object ID.";
        };
        readonly objectOperations: {
            readonly type: "array";
            readonly description: "list of objects and operations to subscribe to.";
            readonly items: {
                readonly type: "object";
                readonly description: "object type, operations, and callbackUrl.";
                readonly required: readonly ["objects", "operations", "callbackUrl"];
                readonly properties: {
                    readonly objects: {
                        readonly type: "array";
                        readonly description: "list of objects to subscribe to.";
                        readonly items: {
                            readonly type: "string";
                            readonly description: "Types of objects addressable through API.";
                            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
                        };
                    };
                    readonly operations: {
                        readonly type: "array";
                        readonly description: "list of operations to subscribe to.";
                        readonly items: {
                            readonly type: "string";
                            readonly description: "object operation to subscribe to.";
                            readonly enum: readonly ["READ", "CREATE", "UPDATE", "DELETE"];
                        };
                    };
                    readonly callbackUrl: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly minLength: 2;
                        readonly maxLength: 8000;
                        readonly description: "User provided webhook URL.";
                    };
                    readonly bearerToken: {
                        readonly type: readonly ["string", "null"];
                        readonly description: "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n";
                        readonly default: null;
                    };
                };
            };
        };
        readonly targets: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of target objects. Used by server to filter notifications.";
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated target string.";
            };
            readonly default: null;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Server provided representation of ven
 */
export declare const venSchema: {
    readonly type: "object";
    readonly description: "Server provided representation of ven";
    readonly allOf: readonly [{
        readonly type: "object";
        readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
        readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly createdDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly modificationDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly objectType: {
                readonly type: "string";
                readonly description: "Types of objects addressable through API.";
                readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
            };
        };
    }, {
        readonly type: "object";
        readonly description: "Business Logic provided representation of ven.";
        readonly required: readonly ["objectType", "clientID", "venName"];
        readonly properties: {
            readonly objectType: {
                readonly type: "string";
                readonly description: "Used as discriminator.";
                readonly enum: readonly ["BL_VEN_REQUEST"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly targets: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of targets.";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 128;
                    readonly description: "User generated target string.";
                };
                readonly default: "null          -";
            };
            readonly venName: {
                readonly type: "string";
                readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly attributes: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of valuesMap objects describing attributes.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    readonly required: readonly ["type", "values"];
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        };
                        readonly values: {
                            readonly type: "array";
                            readonly description: "A list of data points. Most often a singular value such as a price.";
                            readonly items: {
                                readonly anyOf: readonly [{
                                    readonly type: "number";
                                }, {
                                    readonly type: "integer";
                                }, {
                                    readonly type: "string";
                                }, {
                                    readonly type: "boolean";
                                }, {
                                    readonly type: "object";
                                    readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                    readonly required: readonly ["x", "y"];
                                    readonly properties: {
                                        readonly x: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on an x axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly y: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on a y axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
                readonly default: null;
            };
        };
    }];
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * JSON Schema for venRequest
 */
export declare const venRequestSchema: {
    readonly oneOf: readonly [{
        readonly type: "object";
        readonly description: "VEN provided representation of ven.";
        readonly required: readonly ["objectType", "venName"];
        readonly properties: {
            readonly objectType: {
                readonly type: "string";
                readonly description: "Used as discriminator.";
                readonly enum: readonly ["VEN_VEN_REQUEST"];
            };
            readonly venName: {
                readonly type: "string";
                readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly attributes: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of valuesMap objects describing attributes.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    readonly required: readonly ["type", "values"];
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        };
                        readonly values: {
                            readonly type: "array";
                            readonly description: "A list of data points. Most often a singular value such as a price.";
                            readonly items: {
                                readonly anyOf: readonly [{
                                    readonly type: "number";
                                }, {
                                    readonly type: "integer";
                                }, {
                                    readonly type: "string";
                                }, {
                                    readonly type: "boolean";
                                }, {
                                    readonly type: "object";
                                    readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                    readonly required: readonly ["x", "y"];
                                    readonly properties: {
                                        readonly x: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on an x axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly y: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on a y axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
                readonly default: null;
            };
        };
    }, {
        readonly type: "object";
        readonly description: "Business Logic provided representation of ven.";
        readonly required: readonly ["objectType", "clientID", "venName"];
        readonly properties: {
            readonly objectType: {
                readonly type: "string";
                readonly description: "Used as discriminator.";
                readonly enum: readonly ["BL_VEN_REQUEST"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly targets: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of targets.";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 128;
                    readonly description: "User generated target string.";
                };
                readonly default: "null          -";
            };
            readonly venName: {
                readonly type: "string";
                readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly attributes: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of valuesMap objects describing attributes.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    readonly required: readonly ["type", "values"];
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        };
                        readonly values: {
                            readonly type: "array";
                            readonly description: "A list of data points. Most often a singular value such as a price.";
                            readonly items: {
                                readonly anyOf: readonly [{
                                    readonly type: "number";
                                }, {
                                    readonly type: "integer";
                                }, {
                                    readonly type: "string";
                                }, {
                                    readonly type: "boolean";
                                }, {
                                    readonly type: "object";
                                    readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                    readonly required: readonly ["x", "y"];
                                    readonly properties: {
                                        readonly x: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on an x axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly y: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on a y axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
                readonly default: null;
            };
        };
    }];
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Business Logic provided representation of ven.
 */
export declare const BlVenRequestSchema: {
    readonly type: "object";
    readonly description: "Business Logic provided representation of ven.";
    readonly required: readonly ["objectType", "clientID", "venName"];
    readonly properties: {
        readonly objectType: {
            readonly type: "string";
            readonly description: "Used as discriminator.";
            readonly enum: readonly ["BL_VEN_REQUEST"];
        };
        readonly clientID: {
            readonly type: "string";
            readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly targets: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of targets.";
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated target string.";
            };
            readonly default: "null          -";
        };
        readonly venName: {
            readonly type: "string";
            readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly attributes: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of valuesMap objects describing attributes.";
            readonly items: {
                readonly type: "object";
                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                readonly required: readonly ["type", "values"];
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    };
                    readonly values: {
                        readonly type: "array";
                        readonly description: "A list of data points. Most often a singular value such as a price.";
                        readonly items: {
                            readonly anyOf: readonly [{
                                readonly type: "number";
                            }, {
                                readonly type: "integer";
                            }, {
                                readonly type: "string";
                            }, {
                                readonly type: "boolean";
                            }, {
                                readonly type: "object";
                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                readonly required: readonly ["x", "y"];
                                readonly properties: {
                                    readonly x: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on an x axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                    readonly y: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on a y axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly default: null;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * VEN provided representation of ven.
 */
export declare const VenVenRequestSchema: {
    readonly type: "object";
    readonly description: "VEN provided representation of ven.";
    readonly required: readonly ["objectType", "venName"];
    readonly properties: {
        readonly objectType: {
            readonly type: "string";
            readonly description: "Used as discriminator.";
            readonly enum: readonly ["VEN_VEN_REQUEST"];
        };
        readonly venName: {
            readonly type: "string";
            readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly attributes: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of valuesMap objects describing attributes.";
            readonly items: {
                readonly type: "object";
                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                readonly required: readonly ["type", "values"];
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    };
                    readonly values: {
                        readonly type: "array";
                        readonly description: "A list of data points. Most often a singular value such as a price.";
                        readonly items: {
                            readonly anyOf: readonly [{
                                readonly type: "number";
                            }, {
                                readonly type: "integer";
                            }, {
                                readonly type: "string";
                            }, {
                                readonly type: "boolean";
                            }, {
                                readonly type: "object";
                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                readonly required: readonly ["x", "y"];
                                readonly properties: {
                                    readonly x: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on an x axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                    readonly y: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on a y axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly default: null;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Server provided representation of resource
 */
export declare const resourceSchema: {
    readonly type: "object";
    readonly description: "Server provided representation of resource";
    readonly allOf: readonly [{
        readonly type: "object";
        readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
        readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly createdDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly modificationDateTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "datetime in RFC 3339 format";
            };
            readonly objectType: {
                readonly type: "string";
                readonly description: "Types of objects addressable through API.";
                readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
            };
        };
    }, {
        readonly type: "object";
        readonly description: "Business Logic provided representation of ven resource.\n";
        readonly required: readonly ["objectType", "clientID", "resourceName", "venID"];
        readonly properties: {
            readonly objectType: {
                readonly type: "string";
                readonly description: "Used as discriminator.";
                readonly enum: readonly ["BL_RESOURCE_REQUEST"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly targets: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of targets.";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 128;
                    readonly description: "User generated target string.";
                };
                readonly default: null;
            };
            readonly resourceName: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
            };
            readonly venID: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly attributes: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of valuesMap objects describing attributes.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    readonly required: readonly ["type", "values"];
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        };
                        readonly values: {
                            readonly type: "array";
                            readonly description: "A list of data points. Most often a singular value such as a price.";
                            readonly items: {
                                readonly anyOf: readonly [{
                                    readonly type: "number";
                                }, {
                                    readonly type: "integer";
                                }, {
                                    readonly type: "string";
                                }, {
                                    readonly type: "boolean";
                                }, {
                                    readonly type: "object";
                                    readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                    readonly required: readonly ["x", "y"];
                                    readonly properties: {
                                        readonly x: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on an x axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly y: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on a y axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
                readonly default: null;
            };
        };
    }];
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * JSON Schema for resourceRequest
 */
export declare const resourceRequestSchema: {
    readonly oneOf: readonly [{
        readonly type: "object";
        readonly description: "Business Logic provided representation of ven resource.\n";
        readonly required: readonly ["objectType", "clientID", "resourceName", "venID"];
        readonly properties: {
            readonly objectType: {
                readonly type: "string";
                readonly description: "Used as discriminator.";
                readonly enum: readonly ["BL_RESOURCE_REQUEST"];
            };
            readonly clientID: {
                readonly type: "string";
                readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                readonly minLength: 1;
                readonly maxLength: 128;
            };
            readonly targets: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of targets.";
                readonly items: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 128;
                    readonly description: "User generated target string.";
                };
                readonly default: null;
            };
            readonly resourceName: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
            };
            readonly venID: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly attributes: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of valuesMap objects describing attributes.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    readonly required: readonly ["type", "values"];
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        };
                        readonly values: {
                            readonly type: "array";
                            readonly description: "A list of data points. Most often a singular value such as a price.";
                            readonly items: {
                                readonly anyOf: readonly [{
                                    readonly type: "number";
                                }, {
                                    readonly type: "integer";
                                }, {
                                    readonly type: "string";
                                }, {
                                    readonly type: "boolean";
                                }, {
                                    readonly type: "object";
                                    readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                    readonly required: readonly ["x", "y"];
                                    readonly properties: {
                                        readonly x: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on an x axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly y: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on a y axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
                readonly default: null;
            };
        };
    }, {
        readonly type: "object";
        readonly description: "Business Logic provided representation of ven resource.\n";
        readonly required: readonly ["objectType", "resourceName", "venID"];
        readonly properties: {
            readonly objectType: {
                readonly type: "string";
                readonly description: "Used as discriminator.";
                readonly enum: readonly ["VEN_RESOURCE_REQUEST"];
            };
            readonly resourceName: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
            };
            readonly venID: {
                readonly type: "string";
                readonly pattern: "^[a-zA-Z0-9_-]*$";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "URL safe VTN assigned object ID.";
            };
            readonly attributes: {
                readonly type: readonly ["array", "null"];
                readonly description: "A list of valuesMap objects describing attributes.";
                readonly items: {
                    readonly type: "object";
                    readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    readonly required: readonly ["type", "values"];
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                        };
                        readonly values: {
                            readonly type: "array";
                            readonly description: "A list of data points. Most often a singular value such as a price.";
                            readonly items: {
                                readonly anyOf: readonly [{
                                    readonly type: "number";
                                }, {
                                    readonly type: "integer";
                                }, {
                                    readonly type: "string";
                                }, {
                                    readonly type: "boolean";
                                }, {
                                    readonly type: "object";
                                    readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                    readonly required: readonly ["x", "y"];
                                    readonly properties: {
                                        readonly x: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on an x axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly y: {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly description: "A value on a y axis.";
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                    };
                                }];
                            };
                        };
                    };
                };
                readonly default: null;
            };
        };
    }];
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Business Logic provided representation of ven resource.

 */
export declare const BlResourceRequestSchema: {
    readonly type: "object";
    readonly description: "Business Logic provided representation of ven resource.\n";
    readonly required: readonly ["objectType", "clientID", "resourceName", "venID"];
    readonly properties: {
        readonly objectType: {
            readonly type: "string";
            readonly description: "Used as discriminator.";
            readonly enum: readonly ["BL_RESOURCE_REQUEST"];
        };
        readonly clientID: {
            readonly type: "string";
            readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly targets: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of targets.";
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated target string.";
            };
            readonly default: null;
        };
        readonly resourceName: {
            readonly type: "string";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
        };
        readonly venID: {
            readonly type: "string";
            readonly pattern: "^[a-zA-Z0-9_-]*$";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly description: "URL safe VTN assigned object ID.";
        };
        readonly attributes: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of valuesMap objects describing attributes.";
            readonly items: {
                readonly type: "object";
                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                readonly required: readonly ["type", "values"];
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    };
                    readonly values: {
                        readonly type: "array";
                        readonly description: "A list of data points. Most often a singular value such as a price.";
                        readonly items: {
                            readonly anyOf: readonly [{
                                readonly type: "number";
                            }, {
                                readonly type: "integer";
                            }, {
                                readonly type: "string";
                            }, {
                                readonly type: "boolean";
                            }, {
                                readonly type: "object";
                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                readonly required: readonly ["x", "y"];
                                readonly properties: {
                                    readonly x: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on an x axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                    readonly y: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on a y axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly default: null;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Business Logic provided representation of ven resource.

 */
export declare const VenResourceRequestSchema: {
    readonly type: "object";
    readonly description: "Business Logic provided representation of ven resource.\n";
    readonly required: readonly ["objectType", "resourceName", "venID"];
    readonly properties: {
        readonly objectType: {
            readonly type: "string";
            readonly description: "Used as discriminator.";
            readonly enum: readonly ["VEN_RESOURCE_REQUEST"];
        };
        readonly resourceName: {
            readonly type: "string";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
        };
        readonly venID: {
            readonly type: "string";
            readonly pattern: "^[a-zA-Z0-9_-]*$";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly description: "URL safe VTN assigned object ID.";
        };
        readonly attributes: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of valuesMap objects describing attributes.";
            readonly items: {
                readonly type: "object";
                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                readonly required: readonly ["type", "values"];
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    };
                    readonly values: {
                        readonly type: "array";
                        readonly description: "A list of data points. Most often a singular value such as a price.";
                        readonly items: {
                            readonly anyOf: readonly [{
                                readonly type: "number";
                            }, {
                                readonly type: "integer";
                            }, {
                                readonly type: "string";
                            }, {
                                readonly type: "boolean";
                            }, {
                                readonly type: "object";
                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                readonly required: readonly ["x", "y"];
                                readonly properties: {
                                    readonly x: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on an x axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                    readonly y: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on a y axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
            readonly default: null;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * metadata common to all addressable objects. Values provided by VTN on object creation.
 */
export declare const objectMetadataSchema: {
    readonly type: "object";
    readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
    readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
    readonly properties: {
        readonly id: {
            readonly type: "string";
            readonly pattern: "^[a-zA-Z0-9_-]*$";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly description: "URL safe VTN assigned object ID.";
        };
        readonly createdDateTime: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "datetime in RFC 3339 format";
        };
        readonly modificationDateTime: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "datetime in RFC 3339 format";
        };
        readonly objectType: {
            readonly type: "string";
            readonly description: "Types of objects addressable through API.";
            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * An object defining a temporal window and a list of valuesMaps.
if intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.

 */
export declare const intervalSchema: {
    readonly type: "object";
    readonly description: "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n";
    readonly required: readonly ["id", "payloads"];
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int32";
            readonly description: "A client generated number assigned an interval object. Not a sequence number.";
            readonly minimum: -2147483648;
            readonly maximum: 2147483647;
        };
        readonly intervalPeriod: {
            readonly type: "object";
            readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
            readonly properties: {
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "datetime in RFC 3339 format";
                };
                readonly duration: {
                    readonly type: "string";
                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                    readonly description: "duration in ISO 8601 format";
                    readonly default: "PT0S";
                };
                readonly randomizeStart: {
                    readonly type: "string";
                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                    readonly description: "duration in ISO 8601 format";
                    readonly default: "PT0S";
                };
            };
        };
        readonly payloads: {
            readonly type: "array";
            readonly description: "A list of valuesMap objects.";
            readonly items: {
                readonly type: "object";
                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                readonly required: readonly ["type", "values"];
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly maxLength: 128;
                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                    };
                    readonly values: {
                        readonly type: "array";
                        readonly description: "A list of data points. Most often a singular value such as a price.";
                        readonly items: {
                            readonly anyOf: readonly [{
                                readonly type: "number";
                            }, {
                                readonly type: "integer";
                            }, {
                                readonly type: "string";
                            }, {
                                readonly type: "boolean";
                            }, {
                                readonly type: "object";
                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                readonly required: readonly ["x", "y"];
                                readonly properties: {
                                    readonly x: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on an x axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                    readonly y: {
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly description: "A value on a y axis.";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                };
                            }];
                        };
                    };
                };
            };
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Defines temporal aspects of intervals.
A start of "0001-01-01" or "0001-01-01T00:00:00" may indicate 'now'. See User Guide.
A duration of "P9999Y" may indicate infinity. See User Guide.
A randomizeStart indicates absolute range of client applied offset to start. See User Guide.

 */
export declare const intervalPeriodSchema: {
    readonly type: "object";
    readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
    readonly properties: {
        readonly start: {
            readonly type: "string";
            readonly format: "date-time";
            readonly description: "datetime in RFC 3339 format";
        };
        readonly duration: {
            readonly type: "string";
            readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
            readonly description: "duration in ISO 8601 format";
            readonly default: "PT0S";
        };
        readonly randomizeStart: {
            readonly type: "string";
            readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
            readonly description: "duration in ISO 8601 format";
            readonly default: "PT0S";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Represents one or more values associated with a type.

See enumerations in Definitions for defined string values, or use privately defined strings

 */
export declare const valuesMapSchema: {
    readonly type: "object";
    readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
    readonly required: readonly ["type", "values"];
    readonly properties: {
        readonly type: {
            readonly type: "string";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
        };
        readonly values: {
            readonly type: "array";
            readonly description: "A list of data points. Most often a singular value such as a price.";
            readonly items: {
                readonly anyOf: readonly [{
                    readonly type: "number";
                }, {
                    readonly type: "integer";
                }, {
                    readonly type: "string";
                }, {
                    readonly type: "boolean";
                }, {
                    readonly type: "object";
                    readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                    readonly required: readonly ["x", "y"];
                    readonly properties: {
                        readonly x: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly description: "A value on an x axis.";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly y: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly description: "A value on a y axis.";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                    };
                }];
            };
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * A pair of floats typically used as a point on a 2 dimensional grid.
 */
export declare const pointSchema: {
    readonly type: "object";
    readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
    readonly required: readonly ["x", "y"];
    readonly properties: {
        readonly x: {
            readonly type: "number";
            readonly format: "float";
            readonly description: "A value on an x axis.";
            readonly minimum: -3.402823669209385e+38;
            readonly maximum: 3.402823669209385e+38;
        };
        readonly y: {
            readonly type: "number";
            readonly format: "float";
            readonly description: "A value on a y axis.";
            readonly minimum: -3.402823669209385e+38;
            readonly maximum: 3.402823669209385e+38;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Contextual information used to interpret event valuesMap values.
E.g. a PRICE payload simply contains a price value, an
associated descriptor provides necessary context such as units and currency.

 */
export declare const eventPayloadDescriptorSchema: {
    readonly type: "object";
    readonly description: "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n";
    readonly required: readonly ["objectType", "payloadType"];
    readonly properties: {
        readonly objectType: {
            readonly type: "string";
            readonly description: "Used as discriminator.";
            readonly enum: readonly ["EVENT_PAYLOAD_DESCRIPTOR"];
        };
        readonly payloadType: {
            readonly type: "string";
            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly units: {
            readonly type: readonly ["string", "null"];
            readonly description: "Units of measure.";
            readonly default: null;
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly currency: {
            readonly type: readonly ["string", "null"];
            readonly description: "Currency of price payload.";
            readonly default: null;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Contextual information used to interpret report payload values.
E.g. a USAGE payload simply contains a usage value, an
associated descriptor provides necessary context such as units and data quality.

 */
export declare const reportPayloadDescriptorSchema: {
    readonly type: "object";
    readonly description: "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n";
    readonly required: readonly ["objectType", "payloadType"];
    readonly properties: {
        readonly objectType: {
            readonly type: "string";
            readonly description: "Used as discriminator.";
            readonly enum: readonly ["REPORT_PAYLOAD_DESCRIPTOR"];
        };
        readonly payloadType: {
            readonly type: "string";
            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly readingType: {
            readonly type: readonly ["string", "null"];
            readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly default: null;
        };
        readonly units: {
            readonly type: readonly ["string", "null"];
            readonly description: "Units of measure.";
            readonly default: null;
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly accuracy: {
            readonly type: readonly ["number", "null"];
            readonly format: "float";
            readonly description: "A quantification of the accuracy of a set of payload values.";
            readonly default: null;
            readonly minimum: -3.402823669209385e+38;
            readonly maximum: 3.402823669209385e+38;
        };
        readonly confidence: {
            readonly type: readonly ["integer", "null"];
            readonly format: "int32";
            readonly minimum: 0;
            readonly maximum: 100;
            readonly description: "A quantification of the confidence in a set of payload values.";
            readonly default: null;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * An object that may be used to request a report from a VEN.

 */
export declare const reportDescriptorSchema: {
    readonly type: "object";
    readonly description: "An object that may be used to request a report from a VEN.\n";
    readonly required: readonly ["payloadType"];
    readonly properties: {
        readonly payloadType: {
            readonly type: "string";
            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly readingType: {
            readonly type: readonly ["string", "null"];
            readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
            readonly minLength: 1;
            readonly maxLength: 128;
            readonly default: null;
        };
        readonly units: {
            readonly type: readonly ["string", "null"];
            readonly description: "Units of measure.";
            readonly default: null;
            readonly minLength: 1;
            readonly maxLength: 128;
        };
        readonly targets: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of targets.";
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated target string.";
            };
            readonly default: null;
        };
        readonly aggregate: {
            readonly type: "boolean";
            readonly description: "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n";
            readonly default: false;
        };
        readonly startInterval: {
            readonly type: "integer";
            readonly format: "int32";
            readonly description: "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n";
            readonly default: -1;
            readonly minimum: -2147483648;
            readonly maximum: 2147483647;
        };
        readonly numIntervals: {
            readonly type: "integer";
            readonly format: "int32";
            readonly description: "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n";
            readonly default: -1;
            readonly minimum: -2147483648;
            readonly maximum: 2147483647;
        };
        readonly historical: {
            readonly type: "boolean";
            readonly description: "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n";
            readonly default: true;
        };
        readonly frequency: {
            readonly type: "integer";
            readonly format: "int32";
            readonly description: "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n";
            readonly default: -1;
            readonly minimum: -2147483648;
            readonly maximum: 2147483647;
        };
        readonly repeat: {
            readonly type: "integer";
            readonly format: "int32";
            readonly description: "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n";
            readonly default: 1;
            readonly minimum: -2147483648;
            readonly maximum: 2147483647;
        };
        readonly reportIntervals: {
            readonly type: "string";
            readonly description: "Indicates VEN report interval options. See User Guide.";
            readonly enum: readonly ["INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS"];
            readonly default: "INTERVALS";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * URL safe VTN assigned object ID.
 */
export declare const objectIDSchema: {
    readonly type: "string";
    readonly pattern: "^[a-zA-Z0-9_-]*$";
    readonly minLength: 1;
    readonly maxLength: 128;
    readonly description: "URL safe VTN assigned object ID.";
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * ClientID as provisioned by Auhtentication Service and associated with client's bearer token

 */
export declare const clientIDSchema: {
    readonly type: "string";
    readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
    readonly minLength: 1;
    readonly maxLength: 128;
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * User generated identifier, may be VEN identifier provisioned out-of-band.
venName is expected to be unique within the scope of a VTN

 */
export declare const venNameSchema: {
    readonly type: "string";
    readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n";
    readonly minLength: 1;
    readonly maxLength: 128;
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * User generated identifier, may be VEN identifier provisioned out-of-band.
 */
export declare const clientNameSchema: {
    readonly type: "string";
    readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.";
    readonly minLength: 1;
    readonly maxLength: 128;
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * User generated target string.
 */
export declare const targetSchema: {
    readonly type: "string";
    readonly minLength: 1;
    readonly maxLength: 128;
    readonly description: "User generated target string.";
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data
 */
export declare const resourceNameSchema: {
    readonly type: "string";
    readonly minLength: 1;
    readonly maxLength: 128;
    readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Units of measure.
 */
export declare const unitsSchema: {
    readonly type: readonly ["string", "null"];
    readonly description: "Units of measure.";
    readonly default: null;
    readonly minLength: 1;
    readonly maxLength: 128;
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Represents the type of reading.

See enumerations in Definitions for defined string values, or use privately defined strings

 */
export declare const readingTypeSchema: {
    readonly type: readonly ["string", "null"];
    readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
    readonly minLength: 1;
    readonly maxLength: 128;
    readonly default: null;
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * VTN generated object included in request to subscription callbackUrl.

 */
export declare const notificationSchema: {
    readonly type: "object";
    readonly description: "VTN generated object included in request to subscription callbackUrl.\n";
    readonly required: readonly ["objectType", "operation", "object"];
    readonly properties: {
        readonly objectType: {
            readonly type: "string";
            readonly description: "Types of objects addressable through API.";
            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
        };
        readonly operation: {
            readonly type: "string";
            readonly description: "the operation on on object that triggered the notification.";
            readonly enum: readonly ["CREATE", "READ", "UPDATE", "DELETE"];
        };
        readonly object: {
            readonly type: "object";
            readonly description: "the object that is the subject of the notification.";
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly description: "Server provided representation of program";
                readonly allOf: readonly [{
                    readonly type: "object";
                    readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
                    readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly createdDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly modificationDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Types of objects addressable through API.";
                            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
                        };
                    };
                }, {
                    readonly type: "object";
                    readonly description: "Client provided description of program";
                    readonly required: readonly ["programName"];
                    readonly properties: {
                        readonly programName: {
                            readonly type: "string";
                            readonly description: "Short name to uniquely identify program.";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly intervalPeriod: {
                            readonly type: "object";
                            readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                            readonly properties: {
                                readonly start: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "datetime in RFC 3339 format";
                                };
                                readonly duration: {
                                    readonly type: "string";
                                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                    readonly description: "duration in ISO 8601 format";
                                    readonly default: "PT0S";
                                };
                                readonly randomizeStart: {
                                    readonly type: "string";
                                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                    readonly description: "duration in ISO 8601 format";
                                    readonly default: "PT0S";
                                };
                            };
                        };
                        readonly programDescriptions: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of programDescriptions";
                            readonly items: {
                                readonly required: readonly ["URL"];
                                readonly properties: {
                                    readonly URL: {
                                        readonly type: "string";
                                        readonly format: "uri";
                                        readonly minLength: 2;
                                        readonly maxLength: 8000;
                                        readonly description: "A human or machine readable program description";
                                    };
                                };
                            };
                            readonly default: null;
                        };
                        readonly payloadDescriptors: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of payloadDescriptors.";
                            readonly items: {
                                readonly anyOf: readonly [{
                                    readonly type: "object";
                                    readonly description: "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n";
                                    readonly required: readonly ["objectType", "payloadType"];
                                    readonly properties: {
                                        readonly objectType: {
                                            readonly type: "string";
                                            readonly description: "Used as discriminator.";
                                            readonly enum: readonly ["EVENT_PAYLOAD_DESCRIPTOR"];
                                        };
                                        readonly payloadType: {
                                            readonly type: "string";
                                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                            readonly minLength: 1;
                                            readonly maxLength: 128;
                                        };
                                        readonly units: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Units of measure.";
                                            readonly default: null;
                                            readonly minLength: 1;
                                            readonly maxLength: 128;
                                        };
                                        readonly currency: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Currency of price payload.";
                                            readonly default: null;
                                        };
                                    };
                                }, {
                                    readonly type: "object";
                                    readonly description: "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n";
                                    readonly required: readonly ["objectType", "payloadType"];
                                    readonly properties: {
                                        readonly objectType: {
                                            readonly type: "string";
                                            readonly description: "Used as discriminator.";
                                            readonly enum: readonly ["REPORT_PAYLOAD_DESCRIPTOR"];
                                        };
                                        readonly payloadType: {
                                            readonly type: "string";
                                            readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                            readonly minLength: 1;
                                            readonly maxLength: 128;
                                        };
                                        readonly readingType: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                            readonly minLength: 1;
                                            readonly maxLength: 128;
                                            readonly default: null;
                                        };
                                        readonly units: {
                                            readonly type: readonly ["string", "null"];
                                            readonly description: "Units of measure.";
                                            readonly default: null;
                                            readonly minLength: 1;
                                            readonly maxLength: 128;
                                        };
                                        readonly accuracy: {
                                            readonly type: readonly ["number", "null"];
                                            readonly format: "float";
                                            readonly description: "A quantification of the accuracy of a set of payload values.";
                                            readonly default: null;
                                            readonly minimum: -3.402823669209385e+38;
                                            readonly maximum: 3.402823669209385e+38;
                                        };
                                        readonly confidence: {
                                            readonly type: readonly ["integer", "null"];
                                            readonly format: "int32";
                                            readonly minimum: 0;
                                            readonly maximum: 100;
                                            readonly description: "A quantification of the confidence in a set of payload values.";
                                            readonly default: null;
                                        };
                                    };
                                }];
                            };
                            readonly default: null;
                        };
                        readonly attributes: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of valuesMap objects describing attributes.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                readonly required: readonly ["type", "values"];
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                    };
                                    readonly values: {
                                        readonly type: "array";
                                        readonly description: "A list of data points. Most often a singular value such as a price.";
                                        readonly items: {
                                            readonly anyOf: readonly [{
                                                readonly type: "number";
                                            }, {
                                                readonly type: "integer";
                                            }, {
                                                readonly type: "string";
                                            }, {
                                                readonly type: "boolean";
                                            }, {
                                                readonly type: "object";
                                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                                readonly required: readonly ["x", "y"];
                                                readonly properties: {
                                                    readonly x: {
                                                        readonly type: "number";
                                                        readonly format: "float";
                                                        readonly description: "A value on an x axis.";
                                                        readonly minimum: -3.402823669209385e+38;
                                                        readonly maximum: 3.402823669209385e+38;
                                                    };
                                                    readonly y: {
                                                        readonly type: "number";
                                                        readonly format: "float";
                                                        readonly description: "A value on a y axis.";
                                                        readonly minimum: -3.402823669209385e+38;
                                                        readonly maximum: 3.402823669209385e+38;
                                                    };
                                                };
                                            }];
                                        };
                                    };
                                };
                            };
                            readonly default: null;
                        };
                        readonly targets: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of targets.";
                            readonly items: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly maxLength: 128;
                                readonly description: "User generated target string.";
                            };
                            readonly default: null;
                        };
                    };
                }];
            }, {
                readonly type: "object";
                readonly description: "Server provided representation of report";
                readonly allOf: readonly [{
                    readonly type: "object";
                    readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
                    readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly createdDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly modificationDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Types of objects addressable through API.";
                            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
                        };
                    };
                }, {
                    readonly type: "object";
                    readonly description: "report object.";
                    readonly required: readonly ["eventID", "clientName", "resources"];
                    readonly properties: {
                        readonly eventID: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly clientName: {
                            readonly type: "string";
                            readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly reportName: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "User defined string for use in debugging or User Interface.";
                            readonly default: null;
                        };
                        readonly payloadDescriptors: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of reportPayloadDescriptors.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n";
                                readonly required: readonly ["objectType", "payloadType"];
                                readonly properties: {
                                    readonly objectType: {
                                        readonly type: "string";
                                        readonly description: "Used as discriminator.";
                                        readonly enum: readonly ["REPORT_PAYLOAD_DESCRIPTOR"];
                                    };
                                    readonly payloadType: {
                                        readonly type: "string";
                                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                    };
                                    readonly readingType: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                        readonly default: null;
                                    };
                                    readonly units: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Units of measure.";
                                        readonly default: null;
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                    };
                                    readonly accuracy: {
                                        readonly type: readonly ["number", "null"];
                                        readonly format: "float";
                                        readonly description: "A quantification of the accuracy of a set of payload values.";
                                        readonly default: null;
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                    readonly confidence: {
                                        readonly type: readonly ["integer", "null"];
                                        readonly format: "int32";
                                        readonly minimum: 0;
                                        readonly maximum: 100;
                                        readonly description: "A quantification of the confidence in a set of payload values.";
                                        readonly default: null;
                                    };
                                };
                            };
                            readonly default: null;
                        };
                        readonly resources: {
                            readonly type: "array";
                            readonly description: "A list of objects containing report data for a set of resources.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Report data associated with a resource.";
                                readonly required: readonly ["resourceName", "intervals"];
                                readonly properties: {
                                    readonly resourceName: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                        readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
                                    };
                                    readonly intervalPeriod: {
                                        readonly type: "object";
                                        readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                                        readonly properties: {
                                            readonly start: {
                                                readonly type: "string";
                                                readonly format: "date-time";
                                                readonly description: "datetime in RFC 3339 format";
                                            };
                                            readonly duration: {
                                                readonly type: "string";
                                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                                readonly description: "duration in ISO 8601 format";
                                                readonly default: "PT0S";
                                            };
                                            readonly randomizeStart: {
                                                readonly type: "string";
                                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                                readonly description: "duration in ISO 8601 format";
                                                readonly default: "PT0S";
                                            };
                                        };
                                    };
                                    readonly intervals: {
                                        readonly type: "array";
                                        readonly description: "A list of interval objects.";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly description: "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n";
                                            readonly required: readonly ["id", "payloads"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "integer";
                                                    readonly format: "int32";
                                                    readonly description: "A client generated number assigned an interval object. Not a sequence number.";
                                                    readonly minimum: -2147483648;
                                                    readonly maximum: 2147483647;
                                                };
                                                readonly intervalPeriod: {
                                                    readonly type: "object";
                                                    readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                                                    readonly properties: {
                                                        readonly start: {
                                                            readonly type: "string";
                                                            readonly format: "date-time";
                                                            readonly description: "datetime in RFC 3339 format";
                                                        };
                                                        readonly duration: {
                                                            readonly type: "string";
                                                            readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                                            readonly description: "duration in ISO 8601 format";
                                                            readonly default: "PT0S";
                                                        };
                                                        readonly randomizeStart: {
                                                            readonly type: "string";
                                                            readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                                            readonly description: "duration in ISO 8601 format";
                                                            readonly default: "PT0S";
                                                        };
                                                    };
                                                };
                                                readonly payloads: {
                                                    readonly type: "array";
                                                    readonly description: "A list of valuesMap objects.";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                                        readonly required: readonly ["type", "values"];
                                                        readonly properties: {
                                                            readonly type: {
                                                                readonly type: "string";
                                                                readonly minLength: 1;
                                                                readonly maxLength: 128;
                                                                readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                                            };
                                                            readonly values: {
                                                                readonly type: "array";
                                                                readonly description: "A list of data points. Most often a singular value such as a price.";
                                                                readonly items: {
                                                                    readonly anyOf: readonly [{
                                                                        readonly type: "number";
                                                                    }, {
                                                                        readonly type: "integer";
                                                                    }, {
                                                                        readonly type: "string";
                                                                    }, {
                                                                        readonly type: "boolean";
                                                                    }, {
                                                                        readonly type: "object";
                                                                        readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                                                        readonly required: readonly ["x", "y"];
                                                                        readonly properties: {
                                                                            readonly x: {
                                                                                readonly type: "number";
                                                                                readonly format: "float";
                                                                                readonly description: "A value on an x axis.";
                                                                                readonly minimum: -3.402823669209385e+38;
                                                                                readonly maximum: 3.402823669209385e+38;
                                                                            };
                                                                            readonly y: {
                                                                                readonly type: "number";
                                                                                readonly format: "float";
                                                                                readonly description: "A value on a y axis.";
                                                                                readonly minimum: -3.402823669209385e+38;
                                                                                readonly maximum: 3.402823669209385e+38;
                                                                            };
                                                                        };
                                                                    }];
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                }, {
                    readonly type: "object";
                    readonly required: readonly ["clientID"];
                    readonly properties: {
                        readonly clientID: {
                            readonly type: "string";
                            readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                    };
                }];
            }, {
                readonly type: "object";
                readonly description: "Server provided representation of event";
                readonly allOf: readonly [{
                    readonly type: "object";
                    readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
                    readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly createdDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly modificationDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Types of objects addressable through API.";
                            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
                        };
                    };
                }, {
                    readonly type: "object";
                    readonly description: "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets default start time and duration of intervals.\n";
                    readonly required: readonly ["programID"];
                    readonly properties: {
                        readonly programID: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly eventName: {
                            readonly type: readonly ["string", "null"];
                            readonly description: "User defined string for use in debugging or User Interface.";
                            readonly default: null;
                        };
                        readonly duration: {
                            readonly type: "string";
                            readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                            readonly description: "duration in ISO 8601 format";
                            readonly default: "PT0S";
                        };
                        readonly priority: {
                            readonly type: readonly ["integer", "null"];
                            readonly minimum: 0;
                            readonly description: "Relative priority of event. A lower number is a higher priority.";
                            readonly default: null;
                        };
                        readonly targets: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of targets.";
                            readonly items: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly maxLength: 128;
                                readonly description: "User generated target string.";
                            };
                            readonly default: null;
                        };
                        readonly reportDescriptors: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of reportDescriptor objects. Used to request reports from VEN.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "An object that may be used to request a report from a VEN.\n";
                                readonly required: readonly ["payloadType"];
                                readonly properties: {
                                    readonly payloadType: {
                                        readonly type: "string";
                                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                    };
                                    readonly readingType: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Represents the type of reading.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                        readonly default: null;
                                    };
                                    readonly units: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Units of measure.";
                                        readonly default: null;
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                    };
                                    readonly targets: {
                                        readonly type: readonly ["array", "null"];
                                        readonly description: "A list of targets.";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                            readonly maxLength: 128;
                                            readonly description: "User generated target string.";
                                        };
                                        readonly default: null;
                                    };
                                    readonly aggregate: {
                                        readonly type: "boolean";
                                        readonly description: "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n";
                                        readonly default: false;
                                    };
                                    readonly startInterval: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n";
                                        readonly default: -1;
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly numIntervals: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n";
                                        readonly default: -1;
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly historical: {
                                        readonly type: "boolean";
                                        readonly description: "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n";
                                        readonly default: true;
                                    };
                                    readonly frequency: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n";
                                        readonly default: -1;
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly repeat: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n";
                                        readonly default: 1;
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly reportIntervals: {
                                        readonly type: "string";
                                        readonly description: "Indicates VEN report interval options. See User Guide.";
                                        readonly enum: readonly ["INTERVALS", "SUB_INTERVALS", "OPEN_INTERVALS"];
                                        readonly default: "INTERVALS";
                                    };
                                };
                            };
                            readonly default: null;
                        };
                        readonly payloadDescriptors: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of payloadDescriptor objects.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n";
                                readonly required: readonly ["objectType", "payloadType"];
                                readonly properties: {
                                    readonly objectType: {
                                        readonly type: "string";
                                        readonly description: "Used as discriminator.";
                                        readonly enum: readonly ["EVENT_PAYLOAD_DESCRIPTOR"];
                                    };
                                    readonly payloadType: {
                                        readonly type: "string";
                                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                    };
                                    readonly units: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Units of measure.";
                                        readonly default: null;
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                    };
                                    readonly currency: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "Currency of price payload.";
                                        readonly default: null;
                                    };
                                };
                            };
                            readonly default: null;
                        };
                        readonly intervalPeriod: {
                            readonly type: "object";
                            readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                            readonly properties: {
                                readonly start: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "datetime in RFC 3339 format";
                                };
                                readonly duration: {
                                    readonly type: "string";
                                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                    readonly description: "duration in ISO 8601 format";
                                    readonly default: "PT0S";
                                };
                                readonly randomizeStart: {
                                    readonly type: "string";
                                    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                    readonly description: "duration in ISO 8601 format";
                                    readonly default: "PT0S";
                                };
                            };
                        };
                        readonly intervals: {
                            readonly type: "array";
                            readonly description: "A list of interval objects.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n";
                                readonly required: readonly ["id", "payloads"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly format: "int32";
                                        readonly description: "A client generated number assigned an interval object. Not a sequence number.";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly intervalPeriod: {
                                        readonly type: "object";
                                        readonly description: "Defines temporal aspects of intervals.\nA start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.\nA duration of \"P9999Y\" may indicate infinity. See User Guide.\nA randomizeStart indicates absolute range of client applied offset to start. See User Guide.\n";
                                        readonly properties: {
                                            readonly start: {
                                                readonly type: "string";
                                                readonly format: "date-time";
                                                readonly description: "datetime in RFC 3339 format";
                                            };
                                            readonly duration: {
                                                readonly type: "string";
                                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                                readonly description: "duration in ISO 8601 format";
                                                readonly default: "PT0S";
                                            };
                                            readonly randomizeStart: {
                                                readonly type: "string";
                                                readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
                                                readonly description: "duration in ISO 8601 format";
                                                readonly default: "PT0S";
                                            };
                                        };
                                    };
                                    readonly payloads: {
                                        readonly type: "array";
                                        readonly description: "A list of valuesMap objects.";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                            readonly required: readonly ["type", "values"];
                                            readonly properties: {
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly minLength: 1;
                                                    readonly maxLength: 128;
                                                    readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                                };
                                                readonly values: {
                                                    readonly type: "array";
                                                    readonly description: "A list of data points. Most often a singular value such as a price.";
                                                    readonly items: {
                                                        readonly anyOf: readonly [{
                                                            readonly type: "number";
                                                        }, {
                                                            readonly type: "integer";
                                                        }, {
                                                            readonly type: "string";
                                                        }, {
                                                            readonly type: "boolean";
                                                        }, {
                                                            readonly type: "object";
                                                            readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                                            readonly required: readonly ["x", "y"];
                                                            readonly properties: {
                                                                readonly x: {
                                                                    readonly type: "number";
                                                                    readonly format: "float";
                                                                    readonly description: "A value on an x axis.";
                                                                    readonly minimum: -3.402823669209385e+38;
                                                                    readonly maximum: 3.402823669209385e+38;
                                                                };
                                                                readonly y: {
                                                                    readonly type: "number";
                                                                    readonly format: "float";
                                                                    readonly description: "A value on a y axis.";
                                                                    readonly minimum: -3.402823669209385e+38;
                                                                    readonly maximum: 3.402823669209385e+38;
                                                                };
                                                            };
                                                        }];
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                }];
            }, {
                readonly type: "object";
                readonly description: "Server provided representation of subscription";
                readonly allOf: readonly [{
                    readonly type: "object";
                    readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
                    readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly createdDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly modificationDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Types of objects addressable through API.";
                            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
                        };
                    };
                }, {
                    readonly type: "object";
                    readonly description: "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n";
                    readonly required: readonly ["clientName", "objectOperations"];
                    readonly properties: {
                        readonly clientName: {
                            readonly type: "string";
                            readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly programID: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly objectOperations: {
                            readonly type: "array";
                            readonly description: "list of objects and operations to subscribe to.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "object type, operations, and callbackUrl.";
                                readonly required: readonly ["objects", "operations", "callbackUrl"];
                                readonly properties: {
                                    readonly objects: {
                                        readonly type: "array";
                                        readonly description: "list of objects to subscribe to.";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly description: "Types of objects addressable through API.";
                                            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
                                        };
                                    };
                                    readonly operations: {
                                        readonly type: "array";
                                        readonly description: "list of operations to subscribe to.";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly description: "object operation to subscribe to.";
                                            readonly enum: readonly ["READ", "CREATE", "UPDATE", "DELETE"];
                                        };
                                    };
                                    readonly callbackUrl: {
                                        readonly type: "string";
                                        readonly format: "uri";
                                        readonly minLength: 2;
                                        readonly maxLength: 8000;
                                        readonly description: "User provided webhook URL.";
                                    };
                                    readonly bearerToken: {
                                        readonly type: readonly ["string", "null"];
                                        readonly description: "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n";
                                        readonly default: null;
                                    };
                                };
                            };
                        };
                        readonly targets: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of target objects. Used by server to filter notifications.";
                            readonly items: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly maxLength: 128;
                                readonly description: "User generated target string.";
                            };
                            readonly default: null;
                        };
                    };
                }, {
                    readonly type: "object";
                    readonly required: readonly ["clientID"];
                    readonly properties: {
                        readonly clientID: {
                            readonly type: "string";
                            readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                    };
                }];
            }, {
                readonly type: "object";
                readonly description: "Server provided representation of ven";
                readonly allOf: readonly [{
                    readonly type: "object";
                    readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
                    readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly createdDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly modificationDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Types of objects addressable through API.";
                            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
                        };
                    };
                }, {
                    readonly type: "object";
                    readonly description: "Business Logic provided representation of ven.";
                    readonly required: readonly ["objectType", "clientID", "venName"];
                    readonly properties: {
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Used as discriminator.";
                            readonly enum: readonly ["BL_VEN_REQUEST"];
                        };
                        readonly clientID: {
                            readonly type: "string";
                            readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly targets: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of targets.";
                            readonly items: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly maxLength: 128;
                                readonly description: "User generated target string.";
                            };
                            readonly default: "null          -";
                        };
                        readonly venName: {
                            readonly type: "string";
                            readonly description: "User generated identifier, may be VEN identifier provisioned out-of-band.\nvenName is expected to be unique within the scope of a VTN\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly attributes: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of valuesMap objects describing attributes.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                readonly required: readonly ["type", "values"];
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                    };
                                    readonly values: {
                                        readonly type: "array";
                                        readonly description: "A list of data points. Most often a singular value such as a price.";
                                        readonly items: {
                                            readonly anyOf: readonly [{
                                                readonly type: "number";
                                            }, {
                                                readonly type: "integer";
                                            }, {
                                                readonly type: "string";
                                            }, {
                                                readonly type: "boolean";
                                            }, {
                                                readonly type: "object";
                                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                                readonly required: readonly ["x", "y"];
                                                readonly properties: {
                                                    readonly x: {
                                                        readonly type: "number";
                                                        readonly format: "float";
                                                        readonly description: "A value on an x axis.";
                                                        readonly minimum: -3.402823669209385e+38;
                                                        readonly maximum: 3.402823669209385e+38;
                                                    };
                                                    readonly y: {
                                                        readonly type: "number";
                                                        readonly format: "float";
                                                        readonly description: "A value on a y axis.";
                                                        readonly minimum: -3.402823669209385e+38;
                                                        readonly maximum: 3.402823669209385e+38;
                                                    };
                                                };
                                            }];
                                        };
                                    };
                                };
                            };
                            readonly default: null;
                        };
                    };
                }];
            }, {
                readonly type: "object";
                readonly description: "Server provided representation of resource";
                readonly allOf: readonly [{
                    readonly type: "object";
                    readonly description: "metadata common to all addressable objects. Values provided by VTN on object creation.";
                    readonly required: readonly ["id", "createdDateTime", "modificationDateTime", "objectType"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly createdDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly modificationDateTime: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "datetime in RFC 3339 format";
                        };
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Types of objects addressable through API.";
                            readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
                        };
                    };
                }, {
                    readonly type: "object";
                    readonly description: "Business Logic provided representation of ven resource.\n";
                    readonly required: readonly ["objectType", "clientID", "resourceName", "venID"];
                    readonly properties: {
                        readonly objectType: {
                            readonly type: "string";
                            readonly description: "Used as discriminator.";
                            readonly enum: readonly ["BL_RESOURCE_REQUEST"];
                        };
                        readonly clientID: {
                            readonly type: "string";
                            readonly description: "ClientID as provisioned by Auhtentication Service and associated with client's bearer token\n";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                        };
                        readonly targets: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of targets.";
                            readonly items: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly maxLength: 128;
                                readonly description: "User generated target string.";
                            };
                            readonly default: null;
                        };
                        readonly resourceName: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data";
                        };
                        readonly venID: {
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_-]*$";
                            readonly minLength: 1;
                            readonly maxLength: 128;
                            readonly description: "URL safe VTN assigned object ID.";
                        };
                        readonly attributes: {
                            readonly type: readonly ["array", "null"];
                            readonly description: "A list of valuesMap objects describing attributes.";
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Represents one or more values associated with a type.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                readonly required: readonly ["type", "values"];
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                        readonly maxLength: 128;
                                        readonly description: "Represents the nature of values.\n\nSee enumerations in Definitions for defined string values, or use privately defined strings\n";
                                    };
                                    readonly values: {
                                        readonly type: "array";
                                        readonly description: "A list of data points. Most often a singular value such as a price.";
                                        readonly items: {
                                            readonly anyOf: readonly [{
                                                readonly type: "number";
                                            }, {
                                                readonly type: "integer";
                                            }, {
                                                readonly type: "string";
                                            }, {
                                                readonly type: "boolean";
                                            }, {
                                                readonly type: "object";
                                                readonly description: "A pair of floats typically used as a point on a 2 dimensional grid.";
                                                readonly required: readonly ["x", "y"];
                                                readonly properties: {
                                                    readonly x: {
                                                        readonly type: "number";
                                                        readonly format: "float";
                                                        readonly description: "A value on an x axis.";
                                                        readonly minimum: -3.402823669209385e+38;
                                                        readonly maximum: 3.402823669209385e+38;
                                                    };
                                                    readonly y: {
                                                        readonly type: "number";
                                                        readonly format: "float";
                                                        readonly description: "A value on a y axis.";
                                                        readonly minimum: -3.402823669209385e+38;
                                                        readonly maximum: 3.402823669209385e+38;
                                                    };
                                                };
                                            }];
                                        };
                                    };
                                };
                            };
                            readonly default: null;
                        };
                    };
                }];
            }];
        };
        readonly targets: {
            readonly type: readonly ["array", "null"];
            readonly description: "A list of targets.";
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
                readonly maxLength: 128;
                readonly description: "User generated target string.";
            };
            readonly default: null;
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Types of objects addressable through API.
 */
export declare const objectTypesSchema: {
    readonly type: "string";
    readonly description: "Types of objects addressable through API.";
    readonly enum: readonly ["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"];
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * datetime in RFC 3339 format
 */
export declare const dateTimeSchema: {
    readonly type: "string";
    readonly format: "date-time";
    readonly description: "datetime in RFC 3339 format";
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * duration in ISO 8601 format
 */
export declare const durationSchema: {
    readonly type: "string";
    readonly pattern: "^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$";
    readonly description: "duration in ISO 8601 format";
    readonly default: "PT0S";
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749

 */
export declare const clientCredentialRequestSchema: {
    readonly type: "object";
    readonly description: "Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n";
    readonly required: readonly ["grant_type", "client_id", "client_secret"];
    readonly properties: {
        readonly grant_type: {
            readonly type: "string";
            readonly description: "OAuth2 grant type, must be 'client_credentials'";
            readonly enum: readonly ["client_credentials"];
        };
        readonly client_id: {
            readonly type: "string";
            readonly minLength: 1;
            readonly maxLength: 4096;
            readonly description: "client ID to exchange for bearer token.";
        };
        readonly client_secret: {
            readonly type: "string";
            readonly minLength: 1;
            readonly maxLength: 4096;
            readonly description: "client secret to exchange for bearer token.";
        };
        readonly scope: {
            readonly type: "string";
            readonly minLength: 0;
            readonly maxLength: 4096;
            readonly description: "application defined scope.";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749

 */
export declare const clientCredentialResponseSchema: {
    readonly type: "object";
    readonly description: "Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749\n";
    readonly required: readonly ["access_token", "token_type"];
    readonly properties: {
        readonly access_token: {
            readonly type: "string";
            readonly minLength: 1;
            readonly maxLength: 4096;
            readonly description: "access token provided by Authorization service";
        };
        readonly token_type: {
            readonly type: "string";
            readonly description: "token type, must be Bearer.";
            readonly enum: readonly ["Bearer"];
        };
        readonly expires_in: {
            readonly type: "integer";
            readonly description: "expiration period in seconds.";
        };
        readonly refresh_token: {
            readonly type: "string";
            readonly minLength: 1;
            readonly maxLength: 4096;
            readonly description: "refresh token provided by Authorization service";
        };
        readonly scope: {
            readonly type: "string";
            readonly minLength: 0;
            readonly maxLength: 4096;
            readonly description: "application defined scope.";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * error response on HTTP 400 from auth/token per https://www.rfc-editor.org/rfc/rfc6749
 */
export declare const authErrorSchema: {
    readonly type: "object";
    readonly description: "error response on HTTP 400 from auth/token per https://www.rfc-editor.org/rfc/rfc6749";
    readonly required: readonly ["error"];
    readonly properties: {
        readonly error: {
            readonly type: "string";
            readonly description: "As described in rfc6749 | invalid_request – The request is missing a parameter so the server can’t proceed with the request. This may also be returned if the request includes an unsupported parameter or repeats a parameter. invalid_client – Client authentication failed, such as if the request contains an invalid client ID or secret. Send an HTTP 401 response in this case. invalid_grant – The authorization code (or user’s password for the password grant type) is invalid or expired. This is also the error you would return if the redirect URL given in the authorization grant does not match the URL provided in this access token request. invalid_scope – For access token requests that include a scope (password or client_credentials grants), this error indicates an invalid scope value in the request. unauthorized_client – This client is not authorized to use the requested grant type. For example, if you restrict which applications can use the Implicit grant, you would return this error for the other apps. unsupported_grant_type – If a grant type is requested that the authorization server doesn’t recognize, use this code. Note that unknown grant types also use this specific error code rather than using the invalid_request above.";
            readonly enum: readonly ["invalid_request", "invalid_client", "invalid_grant", "invalid_scope", "unauthorized_client", "unsupported_grant_type"];
        };
        readonly error_description: {
            readonly type: "string";
            readonly description: "Should be a sentence or two at most describing the circumstance of the error";
        };
        readonly error_uri: {
            readonly type: "string";
            readonly format: "uri";
            readonly minLength: 2;
            readonly maxLength: 8000;
            readonly description: "Optional reference to more detailed error description";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * JSON Schema for authServerInfo
 */
export declare const authServerInfoSchema: {
    readonly type: "object";
    readonly required: readonly ["tokenURL"];
    readonly properties: {
        readonly tokenURL: {
            readonly type: "string";
            readonly format: "uri";
            readonly minLength: 2;
            readonly maxLength: 8000;
            readonly description: "URL of the token endpoint.";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Provides details of each notifier binding supported
 */
export declare const notifiersResponseSchema: {
    readonly type: "object";
    readonly description: "Provides details of each notifier binding supported";
    readonly required: readonly ["WEBHOOK"];
    readonly properties: {
        readonly WEBHOOK: {
            readonly type: "boolean";
            readonly description: "Currently MUST be true";
        };
        readonly MQTT: {
            readonly type: "object";
            readonly description: "Details of MQTT binding for messaging protocol support";
            readonly required: readonly ["URIS", "serialization", "authentication"];
            readonly properties: {
                readonly URIS: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "URIs for connection to MQTT broker";
                    };
                };
                readonly serialization: {
                    readonly type: "string";
                    readonly description: "Currently always JSON, perhaps other formats supported in future";
                    readonly enum: readonly ["JSON"];
                };
                readonly authentication: {
                    readonly oneOf: readonly [{
                        readonly type: "object";
                        readonly description: "MQTT broker anonymous authentication details";
                        readonly required: readonly ["method"];
                        readonly properties: {
                            readonly method: {
                                readonly type: "string";
                                readonly enum: readonly ["ANONYMOUS"];
                                readonly description: "Specifies anonymous authentication";
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly description: "MQTT broker OAuth2 Bearer Token authentication details";
                        readonly required: readonly ["method", "username"];
                        readonly properties: {
                            readonly method: {
                                readonly type: "string";
                                readonly enum: readonly ["OAUTH2_BEARER_TOKEN"];
                                readonly description: "Specifies OAuth2 bearer token authentication";
                            };
                            readonly username: {
                                readonly type: "string";
                                readonly description: "Either the distinguished string \"{clientID}\", or any other literal string";
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly description: "MQTT broker mTLS client certificate authentication details";
                        readonly required: readonly ["method", "caCert", "clientCert", "clientKey"];
                        readonly properties: {
                            readonly method: {
                                readonly type: "string";
                                readonly enum: readonly ["CERTIFICATE"];
                                readonly description: "Specifies certificate authentication";
                            };
                            readonly caCert: {
                                readonly type: "string";
                                readonly description: "String containing the Certificate Authority certificate";
                            };
                            readonly clientCert: {
                                readonly type: "string";
                                readonly description: "String containing the Client certificate";
                            };
                            readonly clientKey: {
                                readonly type: "string";
                                readonly description: "String containing the client certificate private key";
                            };
                        };
                    }];
                    readonly description: "Authentication method supported for connection to MQTT broker";
                };
            };
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Details of MQTT binding for messaging protocol support
 */
export declare const mqttNotifierBindingObjectSchema: {
    readonly type: "object";
    readonly description: "Details of MQTT binding for messaging protocol support";
    readonly required: readonly ["URIS", "serialization", "authentication"];
    readonly properties: {
        readonly URIS: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "URIs for connection to MQTT broker";
            };
        };
        readonly serialization: {
            readonly type: "string";
            readonly description: "Currently always JSON, perhaps other formats supported in future";
            readonly enum: readonly ["JSON"];
        };
        readonly authentication: {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly description: "MQTT broker anonymous authentication details";
                readonly required: readonly ["method"];
                readonly properties: {
                    readonly method: {
                        readonly type: "string";
                        readonly enum: readonly ["ANONYMOUS"];
                        readonly description: "Specifies anonymous authentication";
                    };
                };
            }, {
                readonly type: "object";
                readonly description: "MQTT broker OAuth2 Bearer Token authentication details";
                readonly required: readonly ["method", "username"];
                readonly properties: {
                    readonly method: {
                        readonly type: "string";
                        readonly enum: readonly ["OAUTH2_BEARER_TOKEN"];
                        readonly description: "Specifies OAuth2 bearer token authentication";
                    };
                    readonly username: {
                        readonly type: "string";
                        readonly description: "Either the distinguished string \"{clientID}\", or any other literal string";
                    };
                };
            }, {
                readonly type: "object";
                readonly description: "MQTT broker mTLS client certificate authentication details";
                readonly required: readonly ["method", "caCert", "clientCert", "clientKey"];
                readonly properties: {
                    readonly method: {
                        readonly type: "string";
                        readonly enum: readonly ["CERTIFICATE"];
                        readonly description: "Specifies certificate authentication";
                    };
                    readonly caCert: {
                        readonly type: "string";
                        readonly description: "String containing the Certificate Authority certificate";
                    };
                    readonly clientCert: {
                        readonly type: "string";
                        readonly description: "String containing the Client certificate";
                    };
                    readonly clientKey: {
                        readonly type: "string";
                        readonly description: "String containing the client certificate private key";
                    };
                };
            }];
            readonly description: "Authentication method supported for connection to MQTT broker";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * MQTT broker anonymous authentication details
 */
export declare const mqttNotifierAuthenticationAnonymousSchema: {
    readonly type: "object";
    readonly description: "MQTT broker anonymous authentication details";
    readonly required: readonly ["method"];
    readonly properties: {
        readonly method: {
            readonly type: "string";
            readonly enum: readonly ["ANONYMOUS"];
            readonly description: "Specifies anonymous authentication";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * MQTT broker OAuth2 Bearer Token authentication details
 */
export declare const mqttNotifierAuthenticationOauth2BearerTokenSchema: {
    readonly type: "object";
    readonly description: "MQTT broker OAuth2 Bearer Token authentication details";
    readonly required: readonly ["method", "username"];
    readonly properties: {
        readonly method: {
            readonly type: "string";
            readonly enum: readonly ["OAUTH2_BEARER_TOKEN"];
            readonly description: "Specifies OAuth2 bearer token authentication";
        };
        readonly username: {
            readonly type: "string";
            readonly description: "Either the distinguished string \"{clientID}\", or any other literal string";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * MQTT broker mTLS client certificate authentication details
 */
export declare const mqttNotifierAuthenticationCertificateSchema: {
    readonly type: "object";
    readonly description: "MQTT broker mTLS client certificate authentication details";
    readonly required: readonly ["method", "caCert", "clientCert", "clientKey"];
    readonly properties: {
        readonly method: {
            readonly type: "string";
            readonly enum: readonly ["CERTIFICATE"];
            readonly description: "Specifies certificate authentication";
        };
        readonly caCert: {
            readonly type: "string";
            readonly description: "String containing the Certificate Authority certificate";
        };
        readonly clientCert: {
            readonly type: "string";
            readonly description: "String containing the Client certificate";
        };
        readonly clientKey: {
            readonly type: "string";
            readonly description: "String containing the client certificate private key";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * MQTT notifier topic names for notifications of subscribable-object operations
 */
export declare const notifierOperationsTopicsSchema: {
    readonly type: "object";
    readonly description: "MQTT notifier topic names for notifications of subscribable-object operations";
    readonly required: readonly ["UPDATE", "DELETE"];
    readonly properties: {
        readonly CREATE: {
            readonly type: "string";
            readonly description: "'Topic path for CREATE operations,\n not provided for notifications for a specific object ID,\n e.g. until programID foo is created, clients unable to\n request notifications of its creation'\n";
        };
        readonly UPDATE: {
            readonly type: "string";
            readonly description: "Topic path for UPDATE operations";
        };
        readonly DELETE: {
            readonly type: "string";
            readonly description: "Topic path for DELETE operations";
        };
        readonly ALL: {
            readonly type: "string";
            readonly description: "Topic path for ALL operations, if supported by VTN";
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * JSON Schema for notifierTopicsResponse
 */
export declare const notifierTopicsResponseSchema: {
    readonly type: "object";
    readonly required: readonly ["topics"];
    readonly properties: {
        readonly topics: {
            readonly type: "object";
            readonly description: "MQTT notifier topic names for notifications of subscribable-object operations";
            readonly required: readonly ["UPDATE", "DELETE"];
            readonly properties: {
                readonly CREATE: {
                    readonly type: "string";
                    readonly description: "'Topic path for CREATE operations,\n not provided for notifications for a specific object ID,\n e.g. until programID foo is created, clients unable to\n request notifications of its creation'\n";
                };
                readonly UPDATE: {
                    readonly type: "string";
                    readonly description: "Topic path for UPDATE operations";
                };
                readonly DELETE: {
                    readonly type: "string";
                    readonly description: "Topic path for DELETE operations";
                };
                readonly ALL: {
                    readonly type: "string";
                    readonly description: "Topic path for ALL operations, if supported by VTN";
                };
            };
        };
    };
    readonly $schema: "http://json-schema.org/draft-04/schema#";
};
/**
 * Server provided representation of program
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateprogram(data: unknown): ValidationResult<Program>;
/**
 * Client provided description of program
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateprogramRequest(data: unknown): ValidationResult<ProgramRequest>;
/**
 * Server provided representation of report
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatereport(data: unknown): ValidationResult<Report>;
/**
 * report object.
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatereportRequest(data: unknown): ValidationResult<ReportRequest>;
/**
 * Server provided representation of event
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateevent(data: unknown): ValidationResult<Event>;
/**
 * Event object to communicate a Demand Response request to VEN.
If intervalPeriod is present, sets default start time and duration of intervals.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateeventRequest(data: unknown): ValidationResult<EventRequest>;
/**
 * Server provided representation of subscription
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatesubscription(data: unknown): ValidationResult<Subscription>;
/**
 * An object created by a client to receive notification of operations on objects.
Clients may subscribe to be notified when a type of object is created,
updated, or deleted.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatesubscriptionRequest(data: unknown): ValidationResult<SubscriptionRequest>;
/**
 * Server provided representation of ven
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateven(data: unknown): ValidationResult<Ven>;
/**
 * Validate venRequest data
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatevenRequest(data: unknown): ValidationResult<VenRequest>;
/**
 * Business Logic provided representation of ven.
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateBlVenRequest(data: unknown): ValidationResult<BlVenRequest>;
/**
 * VEN provided representation of ven.
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateVenVenRequest(data: unknown): ValidationResult<VenVenRequest>;
/**
 * Server provided representation of resource
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateresource(data: unknown): ValidationResult<Resource>;
/**
 * Validate resourceRequest data
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateresourceRequest(data: unknown): ValidationResult<ResourceRequest>;
/**
 * Business Logic provided representation of ven resource.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateBlResourceRequest(data: unknown): ValidationResult<BlResourceRequest>;
/**
 * Business Logic provided representation of ven resource.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateVenResourceRequest(data: unknown): ValidationResult<VenResourceRequest>;
/**
 * metadata common to all addressable objects. Values provided by VTN on object creation.
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateobjectMetadata(data: unknown): ValidationResult<ObjectMetadata>;
/**
 * An object defining a temporal window and a list of valuesMaps.
if intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateinterval(data: unknown): ValidationResult<Interval>;
/**
 * Defines temporal aspects of intervals.
A start of "0001-01-01" or "0001-01-01T00:00:00" may indicate 'now'. See User Guide.
A duration of "P9999Y" may indicate infinity. See User Guide.
A randomizeStart indicates absolute range of client applied offset to start. See User Guide.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateintervalPeriod(data: unknown): ValidationResult<IntervalPeriod>;
/**
 * Represents one or more values associated with a type.

See enumerations in Definitions for defined string values, or use privately defined strings

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatevaluesMap(data: unknown): ValidationResult<ValuesMap>;
/**
 * A pair of floats typically used as a point on a 2 dimensional grid.
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatepoint(data: unknown): ValidationResult<Point>;
/**
 * Contextual information used to interpret event valuesMap values.
E.g. a PRICE payload simply contains a price value, an
associated descriptor provides necessary context such as units and currency.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateeventPayloadDescriptor(data: unknown): ValidationResult<EventPayloadDescriptor>;
/**
 * Contextual information used to interpret report payload values.
E.g. a USAGE payload simply contains a usage value, an
associated descriptor provides necessary context such as units and data quality.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatereportPayloadDescriptor(data: unknown): ValidationResult<ReportPayloadDescriptor>;
/**
 * An object that may be used to request a report from a VEN.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatereportDescriptor(data: unknown): ValidationResult<ReportDescriptor>;
/**
 * URL safe VTN assigned object ID.
 *
 * Validation constraints preserved:
 * - @pattern ^[a-zA-Z0-9_-]*$
 * - @minLength 1
 * - @maxLength 128
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateobjectID(data: unknown): ValidationResult<ObjectID>;
/**
 * ClientID as provisioned by Auhtentication Service and associated with client's bearer token

 *
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateclientID(data: unknown): ValidationResult<ClientID>;
/**
 * User generated identifier, may be VEN identifier provisioned out-of-band.
venName is expected to be unique within the scope of a VTN

 *
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatevenName(data: unknown): ValidationResult<VenName>;
/**
 * User generated identifier, may be VEN identifier provisioned out-of-band.
 *
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateclientName(data: unknown): ValidationResult<ClientName>;
/**
 * User generated target string.
 *
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatetarget(data: unknown): ValidationResult<Target>;
/**
 * User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data
 *
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateresourceName(data: unknown): ValidationResult<ResourceName>;
/**
 * Units of measure.
 *
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateunits(data: unknown): ValidationResult<Units>;
/**
 * Represents the type of reading.

See enumerations in Definitions for defined string values, or use privately defined strings

 *
 * Validation constraints preserved:
 * - @minLength 1
 * - @maxLength 128
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatereadingType(data: unknown): ValidationResult<ReadingType>;
/**
 * VTN generated object included in request to subscription callbackUrl.

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatenotification(data: unknown): ValidationResult<Notification>;
/**
 * Types of objects addressable through API.
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateobjectTypes(data: unknown): ValidationResult<ObjectTypes>;
/**
 * datetime in RFC 3339 format
 *
 * Validation constraints preserved:
 * - @format date-time
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatedateTime(data: unknown): ValidationResult<DateTime>;
/**
 * duration in ISO 8601 format
 *
 * Validation constraints preserved:
 * - @pattern ^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$
 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateduration(data: unknown): ValidationResult<Duration>;
/**
 * Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateclientCredentialRequest(data: unknown): ValidationResult<ClientCredentialRequest>;
/**
 * Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749

 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateclientCredentialResponse(data: unknown): ValidationResult<ClientCredentialResponse>;
/**
 * error response on HTTP 400 from auth/token per https://www.rfc-editor.org/rfc/rfc6749
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateauthError(data: unknown): ValidationResult<AuthError>;
/**
 * Validate authServerInfo data
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validateauthServerInfo(data: unknown): ValidationResult<AuthServerInfo>;
/**
 * Provides details of each notifier binding supported
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatenotifiersResponse(data: unknown): ValidationResult<NotifiersResponse>;
/**
 * Details of MQTT binding for messaging protocol support
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatemqttNotifierBindingObject(data: unknown): ValidationResult<MqttNotifierBindingObject>;
/**
 * MQTT broker anonymous authentication details
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatemqttNotifierAuthenticationAnonymous(data: unknown): ValidationResult<MqttNotifierAuthenticationAnonymous>;
/**
 * MQTT broker OAuth2 Bearer Token authentication details
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatemqttNotifierAuthenticationOauth2BearerToken(data: unknown): ValidationResult<MqttNotifierAuthenticationOauth2BearerToken>;
/**
 * MQTT broker mTLS client certificate authentication details
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatemqttNotifierAuthenticationCertificate(data: unknown): ValidationResult<MqttNotifierAuthenticationCertificate>;
/**
 * MQTT notifier topic names for notifications of subscribable-object operations
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatenotifierOperationsTopics(data: unknown): ValidationResult<NotifierOperationsTopics>;
/**
 * Validate notifierTopicsResponse data
 *
 * Validation constraints preserved:

 *
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export declare function validatenotifierTopicsResponse(data: unknown): ValidationResult<NotifierTopicsResponse>;
export declare function validateBySchemaName(schemaName: string, data: unknown): ValidationResult<unknown>;
//# sourceMappingURL=validators.d.ts.map