import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        /**
         * datetime in ISO 8601 format
         * example:
         * 2023-06-15T09:30:00Z
         */
        export type DateTime = string; // date-time
        /**
         * duration in ISO 8601 format
         * example:
         * PT1H
         */
        export type Duration = string; // /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/
        /**
         * Event object to communicate a Demand Response request to VEN.
         * If intervalPeriod is present, sets start time and duration of intervals.
         *
         */
        export interface Event {
            id?: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            createdDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            modificationDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            /**
             * Used as discriminator, e.g. notification.object
             */
            objectType?: "EVENT";
            programID: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            /**
             * User defined string for use in debugging or User Interface.
             * example:
             * price event 11-18-2022
             */
            eventName?: string | null;
            /**
             * Relative priority of event. A lower number is a higher priority.
             * example:
             * 0
             */
            priority?: number | null;
            /**
             * A list of valuesMap objects.
             */
            targets?: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[] | null;
            /**
             * A list of reportDescriptor objects. Used to request reports from VEN.
             */
            reportDescriptors?: /**
             * An object that may be used to request a report from a VEN.
             * See OpenADR REST User Guide for detailed description of how configure a report request.
             *
             */
            ReportDescriptor[] | null;
            /**
             * A list of payloadDescriptor objects.
             */
            payloadDescriptors?: /**
             * Contextual information used to interpret event valuesMap values.
             * E.g. a PRICE payload simply contains a price value, an
             * associated descriptor provides necessary context such as units and currency.
             *
             */
            EventPayloadDescriptor[] | null;
            intervalPeriod?: /**
             * Defines temporal aspects of intervals.
             * A duration of default null indicates infinity.
             * A randomizeStart of default null indicates no randomization.
             *
             */
            IntervalPeriod;
            /**
             * A list of interval objects.
             */
            intervals: /**
             * An object defining a temporal window and a list of valuesMaps.
             * if intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.
             *
             */
            Interval[];
        }
        /**
         * Contextual information used to interpret event valuesMap values.
         * E.g. a PRICE payload simply contains a price value, an
         * associated descriptor provides necessary context such as units and currency.
         *
         */
        export interface EventPayloadDescriptor {
            /**
             * Used as discriminator, e.g. program.payloadDescriptors
             */
            objectType?: string;
            /**
             * Enumerated or private string signifying the nature of values.
             * example:
             * PRICE
             */
            payloadType: string;
            /**
             * Units of measure.
             * example:
             * KWH
             */
            units?: string | null;
            /**
             * Currency of price payload.
             * example:
             * USD
             */
            currency?: string | null;
        }
        /**
         * An object defining a temporal window and a list of valuesMaps.
         * if intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.
         *
         */
        export interface Interval {
            /**
             * A client generated number assigned an interval object. Not a sequence number.
             * example:
             * 0
             */
            id: number; // int32
            intervalPeriod?: /**
             * Defines temporal aspects of intervals.
             * A duration of default null indicates infinity.
             * A randomizeStart of default null indicates no randomization.
             *
             */
            IntervalPeriod;
            /**
             * A list of valuesMap objects.
             */
            payloads: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[];
        }
        /**
         * Defines temporal aspects of intervals.
         * A duration of default null indicates infinity.
         * A randomizeStart of default null indicates no randomization.
         *
         */
        export interface IntervalPeriod {
            start: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            duration?: /**
             * duration in ISO 8601 format
             * example:
             * PT1H
             */
            Duration /* /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/ */;
            randomizeStart?: /**
             * duration in ISO 8601 format
             * example:
             * PT1H
             */
            Duration /* /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/ */;
        }
        /**
         * VTN generated object included in request to subscription callbackUrl.
         *
         */
        export interface Notification {
            objectType: /**
             * Types of objects addressable through API.
             * example:
             * EVENT
             */
            ObjectTypes;
            /**
             * the operation on on object that triggered the notification.
             * example:
             * POST
             */
            operation: "GET" | "POST" | "PUT" | "DELETE";
            /**
             * A list of valuesMap objects.
             */
            targets?: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[] | null;
            /**
             * the object that is the subject of the notification.
             * example:
             * {}
             */
            object: /**
             * the object that is the subject of the notification.
             * example:
             * {}
             */
            /* Provides program specific metadata from VTN to VEN. */ Program | /* report object. */ Report | /**
             * Event object to communicate a Demand Response request to VEN.
             * If intervalPeriod is present, sets start time and duration of intervals.
             *
             */
            Event | /**
             * An object created by a client to receive notification of operations on objects.
             * Clients may subscribe to be notified when a type of object is created,
             * updated, or deleted.
             *
             */
            Subscription | /* Ven represents a client with the ven role. */ Ven | /**
             * A resource is an energy device or system subject to control by a VEN.
             *
             */
            Resource;
        }
        /**
         * URL safe VTN assigned object ID.
         * example:
         * object-999
         */
        export type ObjectID = string; // ^[a-zA-Z0-9_-]*$
        /**
         * Types of objects addressable through API.
         * example:
         * EVENT
         */
        export type ObjectTypes = "PROGRAM" | "EVENT" | "REPORT" | "SUBSCRIPTION" | "VEN" | "RESOURCE";
        /**
         * A pair of floats typically used as a point on a 2 dimensional grid.
         */
        export interface Point {
            /**
             * A value on an x axis.
             * example:
             * 1
             */
            x: number | null; // float
            /**
             * A value on a y axis.
             * example:
             * 2
             */
            y: number | null; // float
        }
        /**
         * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
         *
         */
        export interface Problem {
            /**
             * An absolute URI that identifies the problem type.
             * When dereferenced, it SHOULD provide human-readable documentation for the problem type
             * (e.g., using HTML).
             *
             * example:
             * https://zalando.github.io/problem/constraint-violation
             */
            type?: string; // uri
            /**
             * A short, summary of the problem type. Written in english and readable
             * for engineers (usually not suited for non technical stakeholders and
             * not localized); example: Service Unavailable.
             *
             */
            title?: string;
            /**
             * The HTTP status code generated by the origin server for this occurrence
             * of the problem.
             *
             * example:
             * 503
             */
            status?: number; // int32
            /**
             * A human readable explanation specific to this occurrence of the
             * problem.
             *
             * example:
             * Connection to database timed out
             */
            detail?: string;
            /**
             * An absolute URI that identifies the specific occurrence of the problem.
             * It may or may not yield further information if dereferenced.
             *
             */
            instance?: string; // uri
        }
        /**
         * Provides program specific metadata from VTN to VEN.
         */
        export interface Program {
            id?: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            createdDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            modificationDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            /**
             * Used as discriminator, e.g. notification.object
             */
            objectType?: "PROGRAM";
            /**
             * Short name to uniquely identify program.
             * example:
             * ResTOU
             */
            programName: string;
            /**
             * Long name of program for human readability.
             * example:
             * Residential Time of Use-A
             */
            programLongName?: string | null;
            /**
             * Short name of energy retailer providing the program.
             * example:
             * ACME
             */
            retailerName?: string | null;
            /**
             * Long name of energy retailer for human readability.
             * example:
             * ACME Electric Inc.
             */
            retailerLongName?: string | null;
            /**
             * A program defined categorization.
             * example:
             * PRICING_TARIFF
             */
            programType?: string | null;
            /**
             * Alpha-2 code per ISO 3166-1.
             * example:
             * US
             */
            country?: string | null;
            /**
             * Coding per ISO 3166-2. E.g. state in US.
             * example:
             * CO
             */
            principalSubdivision?: string | null;
            timeZoneOffset?: /**
             * duration in ISO 8601 format
             * example:
             * PT1H
             */
            Duration /* /^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/ */;
            intervalPeriod?: /**
             * Defines temporal aspects of intervals.
             * A duration of default null indicates infinity.
             * A randomizeStart of default null indicates no randomization.
             *
             */
            IntervalPeriod;
            /**
             * A list of programDescriptions
             */
            programDescriptions?: {
                /**
                 * A human or machine readable program description
                 * example:
                 * www.myCorporation.com/myProgramDescription
                 */
                URL: string; // uri
            }[] | null;
            /**
             * True if events are fixed once transmitted.
             * example:
             * false
             */
            bindingEvents?: boolean;
            /**
             * True if events have been adapted from a grid event.
             * example:
             * false
             */
            localPrice?: boolean;
            /**
             * A list of payloadDescriptors.
             */
            payloadDescriptors?: (/**
             * Contextual information used to interpret event valuesMap values.
             * E.g. a PRICE payload simply contains a price value, an
             * associated descriptor provides necessary context such as units and currency.
             *
             */
            EventPayloadDescriptor | /**
             * Contextual information used to interpret report payload values.
             * E.g. a USAGE payload simply contains a usage value, an
             * associated descriptor provides necessary context such as units and data quality.
             *
             */
            ReportPayloadDescriptor)[] | null;
            /**
             * A list of valuesMap objects.
             */
            targets?: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[] | null;
        }
        /**
         * report object.
         */
        export interface Report {
            id?: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            createdDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            modificationDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            /**
             * Used as discriminator, e.g. notification.object
             */
            objectType?: "REPORT";
            programID: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            eventID: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            /**
             * User generated identifier; may be VEN ID provisioned during program enrollment.
             * example:
             * VEN-999
             */
            clientName: string;
            /**
             * User defined string for use in debugging or User Interface.
             * example:
             * Battery_usage_04112023
             */
            reportName?: string | null;
            /**
             * A list of reportPayloadDescriptors.
             */
            payloadDescriptors?: /**
             * Contextual information used to interpret report payload values.
             * E.g. a USAGE payload simply contains a usage value, an
             * associated descriptor provides necessary context such as units and data quality.
             *
             */
            ReportPayloadDescriptor[] | null;
            /**
             * A list of objects containing report data for a set of resources.
             */
            resources: {
                /**
                 * User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data
                 * example:
                 * RESOURCE-999
                 */
                resourceName: string;
                intervalPeriod?: /**
                 * Defines temporal aspects of intervals.
                 * A duration of default null indicates infinity.
                 * A randomizeStart of default null indicates no randomization.
                 *
                 */
                IntervalPeriod;
                /**
                 * A list of interval objects.
                 */
                intervals: /**
                 * An object defining a temporal window and a list of valuesMaps.
                 * if intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.
                 *
                 */
                Interval[];
            }[];
        }
        /**
         * An object that may be used to request a report from a VEN.
         * See OpenADR REST User Guide for detailed description of how configure a report request.
         *
         */
        export interface ReportDescriptor {
            /**
             * Enumerated or private string signifying the nature of values.
             * example:
             * USAGE
             */
            payloadType: string;
            /**
             * Enumerated or private string signifying the type of reading.
             * example:
             * DIRECT_READ
             */
            readingType?: string | null;
            /**
             * Units of measure.
             * example:
             * KWH
             */
            units?: string | null;
            /**
             * A list of valuesMap objects.
             */
            targets?: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[] | null;
            /**
             * True if report should aggregate results from all targeted resources.
             * False if report includes results for each resource.
             *
             * example:
             * false
             */
            aggregate?: boolean;
            /**
             * The interval on which to generate a report.
             * -1 indicates generate report at end of last interval.
             *
             * example:
             * -1
             */
            startInterval?: number; // int32
            /**
             * The number of intervals to include in a report.
             * -1 indicates that all intervals are to be included.
             *
             * example:
             * -1
             */
            numIntervals?: number; // int32
            /**
             * True indicates report on intervals preceding startInterval.
             * False indicates report on intervals following startInterval (e.g. forecast).
             *
             * example:
             * true
             */
            historical?: boolean;
            /**
             * Number of intervals that elapse between reports.
             * -1 indicates same as numIntervals.
             *
             * example:
             * -1
             */
            frequency?: number; // int32
            /**
             * Number of times to repeat report.
             * 1 indicates generate one report.
             * -1 indicates repeat indefinitely.
             *
             * example:
             * 1
             */
            repeat?: number; // int32
        }
        /**
         * Contextual information used to interpret report payload values.
         * E.g. a USAGE payload simply contains a usage value, an
         * associated descriptor provides necessary context such as units and data quality.
         *
         */
        export interface ReportPayloadDescriptor {
            /**
             * Used as discriminator, e.g. program.payloadDescriptors
             */
            objectType?: string;
            /**
             * Enumerated or private string signifying the nature of values.
             * example:
             * USAGE
             */
            payloadType: string;
            /**
             * Enumerated or private string signifying the type of reading.
             * example:
             * DIRECT_READ
             */
            readingType?: string | null;
            /**
             * Units of measure.
             * example:
             * KWH
             */
            units?: string | null;
            /**
             * A quantification of the accuracy of a set of payload values.
             * example:
             * 0
             */
            accuracy?: number | null; // float
            /**
             * A quantification of the confidence in a set of payload values.
             * example:
             * 100
             */
            confidence?: number; // int32
        }
        /**
         * A resource is an energy device or system subject to control by a VEN.
         *
         */
        export interface Resource {
            id?: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            createdDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            modificationDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            /**
             * Used as discriminator, e.g. notification.object
             */
            objectType?: "RESOURCE";
            /**
             * User generated identifier, resource may be configured with identifier out-of-band.
             * example:
             * RESOURCE-999
             */
            resourceName: string;
            venID?: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            /**
             * A list of valuesMap objects describing attributes.
             */
            attributes?: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[];
            /**
             * A list of valuesMap objects describing target criteria.
             */
            targets?: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[];
        }
        /**
         * An object created by a client to receive notification of operations on objects.
         * Clients may subscribe to be notified when a type of object is created,
         * updated, or deleted.
         *
         */
        export interface Subscription {
            id?: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            createdDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            modificationDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            /**
             * Used as discriminator, e.g. notification.object
             */
            objectType?: "SUBSCRIPTION";
            /**
             * User generated identifier, may be VEN identifier provisioned during program enrollment.
             * example:
             * VEN-999
             */
            clientName: string;
            programID: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            /**
             * list of objects and operations to subscribe to.
             */
            objectOperations: {
                /**
                 * list of objects to subscribe to.
                 */
                objects: /**
                 * Types of objects addressable through API.
                 * example:
                 * EVENT
                 */
                ObjectTypes[];
                /**
                 * list of operations to subscribe to.
                 */
                operations: ("GET" | "POST" | "PUT" | "DELETE")[];
                /**
                 * User provided webhook URL.
                 * example:
                 * https://myserver.com/send/callback/here
                 */
                callbackUrl: string; // uri
                /**
                 * User provided token.
                 * To avoid custom integrations, callback endpoints
                 * should accept the provided bearer token to authenticate VTN requests.
                 *
                 * example:
                 * NCEJGI9E8ER9802UT9HUG
                 */
                bearerToken?: string | null;
            }[];
            /**
             * A list of valuesMap objects. Used by server to filter callbacks.
             */
            targets?: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[] | null;
        }
        /**
         * Represents one or more values associated with a type.
         * E.g. a type of PRICE contains a single float value.
         *
         */
        export interface ValuesMap {
            /**
             * Enumerated or private string signifying the nature of values.
             * E.G. "PRICE" indicates value is to be interpreted as a currency.
             *
             * example:
             * PRICE
             */
            type: string;
            /**
             * A list of data points. Most often a singular value such as a price.
             * example:
             * [
             *   0.17
             * ]
             */
            values: (number | number | string | boolean | /* A pair of floats typically used as a point on a 2 dimensional grid. */ Point)[];
        }
        /**
         * Ven represents a client with the ven role.
         */
        export interface Ven {
            id?: /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            createdDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            modificationDateTime?: /**
             * datetime in ISO 8601 format
             * example:
             * 2023-06-15T09:30:00Z
             */
            DateTime /* date-time */;
            /**
             * Used as discriminator, e.g. notification.object.
             */
            objectType?: "VEN";
            /**
             * User generated identifier, may be VEN identifier provisioned during program enrollment.
             * example:
             * VEN-999
             */
            venName: string;
            /**
             * A list of valuesMap objects describing attributes.
             */
            attributes?: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[];
            /**
             * A list of valuesMap objects describing target criteria.
             */
            targets?: /**
             * Represents one or more values associated with a type.
             * E.g. a type of PRICE contains a single float value.
             *
             */
            ValuesMap[];
            /**
             * A list of resource objects representing end-devices or systems.
             */
            resources?: /**
             * A resource is an energy device or system subject to control by a VEN.
             *
             */
            Resource[] | null;
        }
    }
}
declare namespace Paths {
    namespace CreateEvent {
        export type RequestBody = /**
         * Event object to communicate a Demand Response request to VEN.
         * If intervalPeriod is present, sets start time and duration of intervals.
         *
         */
        Components.Schemas.Event;
        namespace Responses {
            export type $201 = /**
             * Event object to communicate a Demand Response request to VEN.
             * If intervalPeriod is present, sets start time and duration of intervals.
             *
             */
            Components.Schemas.Event;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace CreateProgram {
        export type RequestBody = /* Provides program specific metadata from VTN to VEN. */ Components.Schemas.Program;
        namespace Responses {
            export type $201 = /* Provides program specific metadata from VTN to VEN. */ Components.Schemas.Program;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace CreateReport {
        export type RequestBody = /* report object. */ Components.Schemas.Report;
        namespace Responses {
            export type $201 = /* report object. */ Components.Schemas.Report;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace CreateResource {
        export type RequestBody = /**
         * A resource is an energy device or system subject to control by a VEN.
         *
         */
        Components.Schemas.Resource;
        namespace Responses {
            export type $201 = /**
             * A resource is an energy device or system subject to control by a VEN.
             *
             */
            Components.Schemas.Resource;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace CreateSubscription {
        export type RequestBody = /**
         * An object created by a client to receive notification of operations on objects.
         * Clients may subscribe to be notified when a type of object is created,
         * updated, or deleted.
         *
         */
        Components.Schemas.Subscription;
        namespace Responses {
            export type $201 = /**
             * An object created by a client to receive notification of operations on objects.
             * Clients may subscribe to be notified when a type of object is created,
             * updated, or deleted.
             *
             */
            Components.Schemas.Subscription;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace CreateVen {
        export type RequestBody = /* Ven represents a client with the ven role. */ Components.Schemas.Ven;
        namespace Responses {
            export type $201 = /* Ven represents a client with the ven role. */ Components.Schemas.Ven;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace DeleteEvent {
        namespace Responses {
            export type $200 = /**
             * Event object to communicate a Demand Response request to VEN.
             * If intervalPeriod is present, sets start time and duration of intervals.
             *
             */
            Components.Schemas.Event;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace DeleteProgram {
        namespace Responses {
            export type $200 = /* Provides program specific metadata from VTN to VEN. */ Components.Schemas.Program;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace DeleteReport {
        namespace Responses {
            export type $200 = /* report object. */ Components.Schemas.Report;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace DeleteSubscription {
        namespace Responses {
            export type $200 = /**
             * An object created by a client to receive notification of operations on objects.
             * Clients may subscribe to be notified when a type of object is created,
             * updated, or deleted.
             *
             */
            Components.Schemas.Subscription;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace DeleteVen {
        namespace Responses {
            export type $200 = /* Ven represents a client with the ven role. */ Components.Schemas.Ven;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace DeleteVenResource {
        namespace Responses {
            export type $200 = /**
             * A resource is an energy device or system subject to control by a VEN.
             *
             */
            Components.Schemas.Resource;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace Events$EventID {
        namespace Parameters {
            export type EventID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
        }
        export interface PathParameters {
            eventID: Parameters.EventID;
        }
    }
    namespace FetchToken {
        export interface HeaderParameters {
            clientID: /**
             * example:
             * ven_client_99
             */
            Parameters.ClientID;
            clientSecret: /**
             * example:
             * ven_secret_99
             */
            Parameters.ClientSecret;
        }
        namespace Parameters {
            /**
             * example:
             * ven_client_99
             */
            export type ClientID = string;
            /**
             * example:
             * ven_secret_99
             */
            export type ClientSecret = string;
        }
        namespace Responses {
            export type $200 = string;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace Programs$ProgramID {
        namespace Parameters {
            export type ProgramID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
        }
        export interface PathParameters {
            programID: Parameters.ProgramID;
        }
    }
    namespace Reports$ReportID {
        namespace Parameters {
            export type ReportID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
        }
        export interface PathParameters {
            reportID: Parameters.ReportID;
        }
    }
    namespace SearchAllEvents {
        namespace Parameters {
            export type Limit = number; // int32
            export type ProgramID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            export type Skip = number; // int32
            export type TargetType = string;
            export type TargetValues = string[];
        }
        export interface QueryParameters {
            programID?: Parameters.ProgramID;
            targetType?: Parameters.TargetType;
            targetValues?: Parameters.TargetValues;
            skip?: Parameters.Skip /* int32 */;
            limit?: Parameters.Limit /* int32 */;
        }
        namespace Responses {
            export type $200 = /**
             * Event object to communicate a Demand Response request to VEN.
             * If intervalPeriod is present, sets start time and duration of intervals.
             *
             */
            Components.Schemas.Event[];
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchAllPrograms {
        namespace Parameters {
            export type Limit = number; // int32
            export type Skip = number; // int32
            export type TargetType = string;
            export type TargetValues = string[];
        }
        export interface QueryParameters {
            targetType?: Parameters.TargetType;
            targetValues?: Parameters.TargetValues;
            skip?: Parameters.Skip /* int32 */;
            limit?: Parameters.Limit /* int32 */;
        }
        namespace Responses {
            export type $200 = /* Provides program specific metadata from VTN to VEN. */ Components.Schemas.Program[];
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchAllReports {
        namespace Parameters {
            export type ClientName = string;
            export type Limit = number; // int32
            export type ProgramID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            export type Skip = number; // int32
        }
        export interface QueryParameters {
            programID?: Parameters.ProgramID;
            clientName?: Parameters.ClientName;
            skip?: Parameters.Skip /* int32 */;
            limit?: Parameters.Limit /* int32 */;
        }
        namespace Responses {
            export type $200 = /* report object. */ Components.Schemas.Report[];
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchEventsByID {
        namespace Responses {
            export type $200 = /**
             * Event object to communicate a Demand Response request to VEN.
             * If intervalPeriod is present, sets start time and duration of intervals.
             *
             */
            Components.Schemas.Event;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchProgramByProgramId {
        namespace Responses {
            export type $200 = /* Provides program specific metadata from VTN to VEN. */ Components.Schemas.Program;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchReportsByReportID {
        namespace Responses {
            export type $200 = /* report object. */ Components.Schemas.Report;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchSubscriptionByID {
        namespace Responses {
            export type $200 = /**
             * An object created by a client to receive notification of operations on objects.
             * Clients may subscribe to be notified when a type of object is created,
             * updated, or deleted.
             *
             */
            Components.Schemas.Subscription;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchSubscriptions {
        namespace Parameters {
            export type ClientName = string;
            export type Limit = number; // int32
            export type Objects = /**
             * Types of objects addressable through API.
             * example:
             * EVENT
             */
            Components.Schemas.ObjectTypes[];
            export type ProgramID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            export type Skip = number; // int32
            export type TargetType = string;
            export type TargetValues = string[];
        }
        export interface QueryParameters {
            programID?: Parameters.ProgramID;
            clientName?: Parameters.ClientName;
            targetType?: Parameters.TargetType;
            targetValues?: Parameters.TargetValues;
            objects?: Parameters.Objects;
            skip?: Parameters.Skip /* int32 */;
            limit?: Parameters.Limit /* int32 */;
        }
        namespace Responses {
            export type $200 = /**
             * An object created by a client to receive notification of operations on objects.
             * Clients may subscribe to be notified when a type of object is created,
             * updated, or deleted.
             *
             */
            Components.Schemas.Subscription[];
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchVenByID {
        namespace Responses {
            export type $200 = /* Ven represents a client with the ven role. */ Components.Schemas.Ven;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchVenResourceByID {
        namespace Responses {
            export type $200 = /**
             * A resource is an energy device or system subject to control by a VEN.
             *
             */
            Components.Schemas.Resource;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchVenResources {
        namespace Parameters {
            export type Limit = number; // int32
            export type Skip = number; // int32
            export type TargetType = string;
            export type TargetValues = string[];
        }
        export interface QueryParameters {
            targetType?: Parameters.TargetType;
            targetValues?: Parameters.TargetValues;
            skip?: Parameters.Skip /* int32 */;
            limit?: Parameters.Limit /* int32 */;
        }
        namespace Responses {
            export type $200 = /**
             * A resource is an energy device or system subject to control by a VEN.
             *
             */
            Components.Schemas.Resource[];
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace SearchVens {
        namespace Parameters {
            export type Limit = number; // int32
            export type Skip = number; // int32
            export type TargetType = string;
            export type TargetValues = string[];
        }
        export interface QueryParameters {
            targetType?: Parameters.TargetType;
            targetValues?: Parameters.TargetValues;
            skip?: Parameters.Skip /* int32 */;
            limit?: Parameters.Limit /* int32 */;
        }
        namespace Responses {
            export type $200 = /* Ven represents a client with the ven role. */ Components.Schemas.Ven[];
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace Subscriptions$SubscriptionID {
        namespace Parameters {
            export type SubscriptionID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
        }
        export interface PathParameters {
            subscriptionID: Parameters.SubscriptionID;
        }
    }
    namespace UpdateEvent {
        export type RequestBody = /**
         * Event object to communicate a Demand Response request to VEN.
         * If intervalPeriod is present, sets start time and duration of intervals.
         *
         */
        Components.Schemas.Event;
        namespace Responses {
            export type $200 = /**
             * Event object to communicate a Demand Response request to VEN.
             * If intervalPeriod is present, sets start time and duration of intervals.
             *
             */
            Components.Schemas.Event;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace UpdateProgram {
        export type RequestBody = /* Provides program specific metadata from VTN to VEN. */ Components.Schemas.Program;
        namespace Responses {
            export type $200 = /* Provides program specific metadata from VTN to VEN. */ Components.Schemas.Program;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace UpdateReport {
        export type RequestBody = /* report object. */ Components.Schemas.Report;
        namespace Responses {
            export type $200 = /* report object. */ Components.Schemas.Report;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace UpdateSubscription {
        export type RequestBody = /**
         * An object created by a client to receive notification of operations on objects.
         * Clients may subscribe to be notified when a type of object is created,
         * updated, or deleted.
         *
         */
        Components.Schemas.Subscription;
        namespace Responses {
            export type $200 = /**
             * An object created by a client to receive notification of operations on objects.
             * Clients may subscribe to be notified when a type of object is created,
             * updated, or deleted.
             *
             */
            Components.Schemas.Subscription;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace UpdateVen {
        export type RequestBody = /* Ven represents a client with the ven role. */ Components.Schemas.Ven;
        namespace Responses {
            export type $200 = /* Ven represents a client with the ven role. */ Components.Schemas.Ven;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace UpdateVenResource {
        export type RequestBody = /**
         * A resource is an energy device or system subject to control by a VEN.
         *
         */
        Components.Schemas.Resource;
        namespace Responses {
            export type $200 = /**
             * A resource is an energy device or system subject to control by a VEN.
             *
             */
            Components.Schemas.Resource;
            export type $400 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $403 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $404 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $409 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
            export type $500 = /**
             * reusable error response. From https://opensource.zalando.com/problem/schema.yaml.
             *
             */
            Components.Schemas.Problem;
        }
    }
    namespace Vens$VenID {
        namespace Parameters {
            export type VenID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
        }
        export interface PathParameters {
            venID: Parameters.VenID;
        }
    }
    namespace Vens$VenIDResources {
        namespace Parameters {
            export type VenID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
        }
        export interface PathParameters {
            venID: Parameters.VenID;
        }
    }
    namespace Vens$VenIDResources$ResourceID {
        namespace Parameters {
            export type ResourceID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
            export type VenID = /**
             * URL safe VTN assigned object ID.
             * example:
             * object-999
             */
            Components.Schemas.ObjectID /* ^[a-zA-Z0-9_-]*$ */;
        }
        export interface PathParameters {
            venID: Parameters.VenID;
            resourceID: Parameters.ResourceID;
        }
    }
}

export interface OperationMethods {
  /**
   * searchAllPrograms - searches all programs
   * 
   * List all programs known to the server.
   * Use skip and pagination query params to limit response size.
   * 
   */
  'searchAllPrograms'(
    parameters?: Parameters<Paths.SearchAllPrograms.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchAllPrograms.Responses.$200>
  /**
   * createProgram - create a program
   * 
   * Create a new program in the server.
   */
  'createProgram'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateProgram.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateProgram.Responses.$201>
  /**
   * searchProgramByProgramId - searches programs by program ID
   * 
   * Fetch the program specified by the programID in path.
   * 
   */
  'searchProgramByProgramId'(
    parameters?: Parameters<Paths.Programs$ProgramID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchProgramByProgramId.Responses.$200>
  /**
   * updateProgram - update a program
   * 
   * Update an existing program with the programID in path.
   */
  'updateProgram'(
    parameters?: Parameters<Paths.Programs$ProgramID.PathParameters> | null,
    data?: Paths.UpdateProgram.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProgram.Responses.$200>
  /**
   * deleteProgram - delete a program
   * 
   * Delete an existing program with the programID in path.
   */
  'deleteProgram'(
    parameters?: Parameters<Paths.Programs$ProgramID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteProgram.Responses.$200>
  /**
   * searchAllReports - searches all reports
   * 
   * List all reports known to the server.
   * May filter results by programID and clientName as query param.
   * Use skip and pagination query params to limit response size.
   * 
   */
  'searchAllReports'(
    parameters?: Parameters<Paths.SearchAllReports.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchAllReports.Responses.$200>
  /**
   * createReport - add a report
   * 
   * Create a new report in the server.
   */
  'createReport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateReport.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateReport.Responses.$201>
  /**
   * searchReportsByReportID - searches reports by reportID
   * 
   * Fetch the report specified by the reportID in path.
   * 
   */
  'searchReportsByReportID'(
    parameters?: Parameters<Paths.Reports$ReportID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchReportsByReportID.Responses.$200>
  /**
   * updateReport - update a report
   * 
   * Update the report specified by the reportID in path.
   */
  'updateReport'(
    parameters?: Parameters<Paths.Reports$ReportID.PathParameters> | null,
    data?: Paths.UpdateReport.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateReport.Responses.$200>
  /**
   * deleteReport - delete a report
   * 
   * Delete the program specified by the reportID in path.
   */
  'deleteReport'(
    parameters?: Parameters<Paths.Reports$ReportID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteReport.Responses.$200>
  /**
   * searchAllEvents - searches all events
   * 
   * List all events known to the server. May filter results by programID query param.
   * Use skip and pagination query params to limit response size.
   * 
   */
  'searchAllEvents'(
    parameters?: Parameters<Paths.SearchAllEvents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchAllEvents.Responses.$200>
  /**
   * createEvent - create an event
   * 
   * Create a new event in the server.
   */
  'createEvent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateEvent.Responses.$201>
  /**
   * searchEventsByID - search events by ID
   * 
   * Fetch event associated with the eventID in path.
   * 
   */
  'searchEventsByID'(
    parameters?: Parameters<Paths.Events$EventID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchEventsByID.Responses.$200>
  /**
   * updateEvent - update an event
   * 
   * Update the event specified by the eventID in path.
   */
  'updateEvent'(
    parameters?: Parameters<Paths.Events$EventID.PathParameters> | null,
    data?: Paths.UpdateEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateEvent.Responses.$200>
  /**
   * deleteEvent - delete an event
   * 
   * Delete the event specified by the eventID in path.
   * 
   */
  'deleteEvent'(
    parameters?: Parameters<Paths.Events$EventID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteEvent.Responses.$200>
  /**
   * searchSubscriptions - search subscriptions
   * 
   * List all subscriptions.
   * May filter results by programID and clientID as query params.
   * May filter results by objects as query param. See objectTypes schema.
   * Use skip and pagination query params to limit response size.
   * 
   */
  'searchSubscriptions'(
    parameters?: Parameters<Paths.SearchSubscriptions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchSubscriptions.Responses.$200>
  /**
   * createSubscription - create subscription
   * 
   * Create a new subscription.
   */
  'createSubscription'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSubscription.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSubscription.Responses.$201>
  /**
   * searchSubscriptionByID - search subscriptions by ID
   * 
   * Return the subscription specified by subscriptionID specified in path.
   */
  'searchSubscriptionByID'(
    parameters?: Parameters<Paths.Subscriptions$SubscriptionID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchSubscriptionByID.Responses.$200>
  /**
   * updateSubscription - update  subscription
   * 
   * Update the subscription specified by subscriptionID specified in path.
   */
  'updateSubscription'(
    parameters?: Parameters<Paths.Subscriptions$SubscriptionID.PathParameters> | null,
    data?: Paths.UpdateSubscription.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateSubscription.Responses.$200>
  /**
   * deleteSubscription - delete  subscription
   * 
   * Delete the subscription specified by subscriptionID specified in path.
   */
  'deleteSubscription'(
    parameters?: Parameters<Paths.Subscriptions$SubscriptionID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSubscription.Responses.$200>
  /**
   * searchVens - search vens
   * 
   * List all vens.
   * Use skip and pagination query params to limit response size.
   * 
   */
  'searchVens'(
    parameters?: Parameters<Paths.SearchVens.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchVens.Responses.$200>
  /**
   * createVen - create ven
   * 
   * Create a new ven.
   */
  'createVen'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateVen.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateVen.Responses.$201>
  /**
   * searchVenByID - search vens by ID
   * 
   * Return the ven specified by venID specified in path.
   */
  'searchVenByID'(
    parameters?: Parameters<Paths.Vens$VenID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchVenByID.Responses.$200>
  /**
   * updateVen - update  ven
   * 
   * Update the ven specified by venID specified in path.
   */
  'updateVen'(
    parameters?: Parameters<Paths.Vens$VenID.PathParameters> | null,
    data?: Paths.UpdateVen.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateVen.Responses.$200>
  /**
   * deleteVen - delete  ven
   * 
   * Delete the ven specified by venID specified in path.
   */
  'deleteVen'(
    parameters?: Parameters<Paths.Vens$VenID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteVen.Responses.$200>
  /**
   * searchVenResources - search ven resources
   * 
   * Return the ven resources specified by venID specified in path.
   */
  'searchVenResources'(
    parameters?: Parameters<Paths.Vens$VenIDResources.PathParameters & Paths.SearchVenResources.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchVenResources.Responses.$200>
  /**
   * createResource - create resource
   * 
   * Create a new resource.
   */
  'createResource'(
    parameters?: Parameters<Paths.Vens$VenIDResources.PathParameters> | null,
    data?: Paths.CreateResource.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateResource.Responses.$201>
  /**
   * searchVenResourceByID - search ven resources by ID
   * 
   * Return the ven resource specified by venID and resourceID specified in path.
   */
  'searchVenResourceByID'(
    parameters?: Parameters<Paths.Vens$VenIDResources$ResourceID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchVenResourceByID.Responses.$200>
  /**
   * updateVenResource - update  ven resource
   * 
   * Update the ven resource specified by venID and resourceID specified in path.
   */
  'updateVenResource'(
    parameters?: Parameters<Paths.Vens$VenIDResources$ResourceID.PathParameters> | null,
    data?: Paths.UpdateVenResource.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateVenResource.Responses.$200>
  /**
   * deleteVenResource - delete  ven resource
   * 
   * Delete the ven resource specified by venID and resourceID specified in path.
   */
  'deleteVenResource'(
    parameters?: Parameters<Paths.Vens$VenIDResources$ResourceID.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteVenResource.Responses.$200>
  /**
   * fetchToken - fetch a token
   * 
   * Return an access token based on clientID and clientSecret.
   */
  'fetchToken'(
    parameters?: Parameters<Paths.FetchToken.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FetchToken.Responses.$200>
}

export interface PathsDictionary {
  ['/programs']: {
    /**
     * searchAllPrograms - searches all programs
     * 
     * List all programs known to the server.
     * Use skip and pagination query params to limit response size.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.SearchAllPrograms.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchAllPrograms.Responses.$200>
    /**
     * createProgram - create a program
     * 
     * Create a new program in the server.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateProgram.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateProgram.Responses.$201>
  }
  ['/programs/{programID}']: {
    /**
     * searchProgramByProgramId - searches programs by program ID
     * 
     * Fetch the program specified by the programID in path.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.Programs$ProgramID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchProgramByProgramId.Responses.$200>
    /**
     * updateProgram - update a program
     * 
     * Update an existing program with the programID in path.
     */
    'put'(
      parameters?: Parameters<Paths.Programs$ProgramID.PathParameters> | null,
      data?: Paths.UpdateProgram.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProgram.Responses.$200>
    /**
     * deleteProgram - delete a program
     * 
     * Delete an existing program with the programID in path.
     */
    'delete'(
      parameters?: Parameters<Paths.Programs$ProgramID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteProgram.Responses.$200>
  }
  ['/reports']: {
    /**
     * searchAllReports - searches all reports
     * 
     * List all reports known to the server.
     * May filter results by programID and clientName as query param.
     * Use skip and pagination query params to limit response size.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.SearchAllReports.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchAllReports.Responses.$200>
    /**
     * createReport - add a report
     * 
     * Create a new report in the server.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateReport.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateReport.Responses.$201>
  }
  ['/reports/{reportID}']: {
    /**
     * searchReportsByReportID - searches reports by reportID
     * 
     * Fetch the report specified by the reportID in path.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.Reports$ReportID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchReportsByReportID.Responses.$200>
    /**
     * updateReport - update a report
     * 
     * Update the report specified by the reportID in path.
     */
    'put'(
      parameters?: Parameters<Paths.Reports$ReportID.PathParameters> | null,
      data?: Paths.UpdateReport.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateReport.Responses.$200>
    /**
     * deleteReport - delete a report
     * 
     * Delete the program specified by the reportID in path.
     */
    'delete'(
      parameters?: Parameters<Paths.Reports$ReportID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteReport.Responses.$200>
  }
  ['/events']: {
    /**
     * searchAllEvents - searches all events
     * 
     * List all events known to the server. May filter results by programID query param.
     * Use skip and pagination query params to limit response size.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.SearchAllEvents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchAllEvents.Responses.$200>
    /**
     * createEvent - create an event
     * 
     * Create a new event in the server.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateEvent.Responses.$201>
  }
  ['/events/{eventID}']: {
    /**
     * searchEventsByID - search events by ID
     * 
     * Fetch event associated with the eventID in path.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.Events$EventID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchEventsByID.Responses.$200>
    /**
     * updateEvent - update an event
     * 
     * Update the event specified by the eventID in path.
     */
    'put'(
      parameters?: Parameters<Paths.Events$EventID.PathParameters> | null,
      data?: Paths.UpdateEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateEvent.Responses.$200>
    /**
     * deleteEvent - delete an event
     * 
     * Delete the event specified by the eventID in path.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.Events$EventID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteEvent.Responses.$200>
  }
  ['/subscriptions']: {
    /**
     * searchSubscriptions - search subscriptions
     * 
     * List all subscriptions.
     * May filter results by programID and clientID as query params.
     * May filter results by objects as query param. See objectTypes schema.
     * Use skip and pagination query params to limit response size.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.SearchSubscriptions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchSubscriptions.Responses.$200>
    /**
     * createSubscription - create subscription
     * 
     * Create a new subscription.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSubscription.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSubscription.Responses.$201>
  }
  ['/subscriptions/{subscriptionID}']: {
    /**
     * searchSubscriptionByID - search subscriptions by ID
     * 
     * Return the subscription specified by subscriptionID specified in path.
     */
    'get'(
      parameters?: Parameters<Paths.Subscriptions$SubscriptionID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchSubscriptionByID.Responses.$200>
    /**
     * updateSubscription - update  subscription
     * 
     * Update the subscription specified by subscriptionID specified in path.
     */
    'put'(
      parameters?: Parameters<Paths.Subscriptions$SubscriptionID.PathParameters> | null,
      data?: Paths.UpdateSubscription.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateSubscription.Responses.$200>
    /**
     * deleteSubscription - delete  subscription
     * 
     * Delete the subscription specified by subscriptionID specified in path.
     */
    'delete'(
      parameters?: Parameters<Paths.Subscriptions$SubscriptionID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSubscription.Responses.$200>
  }
  ['/vens']: {
    /**
     * searchVens - search vens
     * 
     * List all vens.
     * Use skip and pagination query params to limit response size.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.SearchVens.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchVens.Responses.$200>
    /**
     * createVen - create ven
     * 
     * Create a new ven.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateVen.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateVen.Responses.$201>
  }
  ['/vens/{venID}']: {
    /**
     * searchVenByID - search vens by ID
     * 
     * Return the ven specified by venID specified in path.
     */
    'get'(
      parameters?: Parameters<Paths.Vens$VenID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchVenByID.Responses.$200>
    /**
     * updateVen - update  ven
     * 
     * Update the ven specified by venID specified in path.
     */
    'put'(
      parameters?: Parameters<Paths.Vens$VenID.PathParameters> | null,
      data?: Paths.UpdateVen.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateVen.Responses.$200>
    /**
     * deleteVen - delete  ven
     * 
     * Delete the ven specified by venID specified in path.
     */
    'delete'(
      parameters?: Parameters<Paths.Vens$VenID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteVen.Responses.$200>
  }
  ['/vens/{venID}/resources']: {
    /**
     * searchVenResources - search ven resources
     * 
     * Return the ven resources specified by venID specified in path.
     */
    'get'(
      parameters?: Parameters<Paths.Vens$VenIDResources.PathParameters & Paths.SearchVenResources.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchVenResources.Responses.$200>
    /**
     * createResource - create resource
     * 
     * Create a new resource.
     */
    'post'(
      parameters?: Parameters<Paths.Vens$VenIDResources.PathParameters> | null,
      data?: Paths.CreateResource.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateResource.Responses.$201>
  }
  ['/vens/{venID}/resources/{resourceID}']: {
    /**
     * searchVenResourceByID - search ven resources by ID
     * 
     * Return the ven resource specified by venID and resourceID specified in path.
     */
    'get'(
      parameters?: Parameters<Paths.Vens$VenIDResources$ResourceID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchVenResourceByID.Responses.$200>
    /**
     * updateVenResource - update  ven resource
     * 
     * Update the ven resource specified by venID and resourceID specified in path.
     */
    'put'(
      parameters?: Parameters<Paths.Vens$VenIDResources$ResourceID.PathParameters> | null,
      data?: Paths.UpdateVenResource.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateVenResource.Responses.$200>
    /**
     * deleteVenResource - delete  ven resource
     * 
     * Delete the ven resource specified by venID and resourceID specified in path.
     */
    'delete'(
      parameters?: Parameters<Paths.Vens$VenIDResources$ResourceID.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteVenResource.Responses.$200>
  }
  ['/auth/token']: {
    /**
     * fetchToken - fetch a token
     * 
     * Return an access token based on clientID and clientSecret.
     */
    'get'(
      parameters?: Parameters<Paths.FetchToken.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FetchToken.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
