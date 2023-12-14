/**
 * Generated by @openapi-codegen
 *
 * @version 3.0.1
 */
import type * as Schemas from "./openADRSchemas.js";

export type SearchAllProgramsQueryParams = {
  /**
   * Indicates targeting type, e.g. GROUP
   */
  targetType?: string;
  /**
   * List of target values, e.g. group names
   */
  targetValues?: string[];
  /**
   * number of records to skip for pagination.
   *
   * @format int32
   * @minimum 0
   */
  skip?: number;
  /**
   * maximum number of records to return.
   *
   * @format int32
   * @maximum 50
   * @minimum 0
   */
  limit?: number;
};

// export type SearchAllProgramsError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchAllProgramsResponse = Schemas.Program[];

export type SearchAllProgramsVariables = {
  queryParams?: SearchAllProgramsQueryParams;
};

/**
 * List all programs known to the server.
 * Use skip and pagination query params to limit response size.
 */
// export const searchAllPrograms = (
//   variables: SearchAllProgramsVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     SearchAllProgramsResponse,
//     SearchAllProgramsError,
//     undefined,
//     {},
//     SearchAllProgramsQueryParams,
//     {}
//   >({ url: "/programs", method: "get", ...variables, signal });

// export type CreateProgramError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type CreateProgramVariables = {
  body: Schemas.Program;
};

/**
 * Create a new program in the server.
 */
// export const createProgram = (
//   variables: CreateProgramVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Program,
//     CreateProgramError,
//     Schemas.Program,
//     {},
//     {},
//     {}
//   >({ url: "/programs", method: "post", ...variables, signal });

export type SearchProgramByProgramIdPathParams = {
  /**
   * Object ID of the program object.
   */
  programID: Schemas.ObjectID;
};

// export type SearchProgramByProgramIdError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchProgramByProgramIdVariables = {
  pathParams: SearchProgramByProgramIdPathParams;
};

/**
 * Fetch the program specified by the programID in path.
 */
// export const searchProgramByProgramId = (
//   variables: SearchProgramByProgramIdVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Program,
//     SearchProgramByProgramIdError,
//     undefined,
//     {},
//     {},
//     SearchProgramByProgramIdPathParams
//   >({ url: "/programs/{programID}", method: "get", ...variables, signal });

export type UpdateProgramPathParams = {
  /**
   * Object ID of the program object.
   */
  programID: Schemas.ObjectID;
};

// export type UpdateProgramError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type UpdateProgramVariables = {
  body: Schemas.Program;
  pathParams: UpdateProgramPathParams;
};

/**
 * Update an existing program with the programID in path.
 */
// export const updateProgram = (
//   variables: UpdateProgramVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Program,
//     UpdateProgramError,
//     Schemas.Program,
//     {},
//     {},
//     UpdateProgramPathParams
//   >({ url: "/programs/{programID}", method: "put", ...variables, signal });

export type DeleteProgramPathParams = {
  /**
   * Object ID of the program object.
   */
  programID: Schemas.ObjectID;
};

// export type DeleteProgramError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type DeleteProgramVariables = {
  pathParams: DeleteProgramPathParams;
};

/**
 * Delete an existing program with the programID in path.
 */
// export const deleteProgram = (
//   variables: DeleteProgramVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Program,
//     DeleteProgramError,
//     undefined,
//     {},
//     {},
//     DeleteProgramPathParams
//   >({ url: "/programs/{programID}", method: "delete", ...variables, signal });

export type SearchAllReportsQueryParams = {
  /**
   * filter results to reports with programID.
   */
  programID?: Schemas.ObjectID;
  /**
   * filter results to reports with clientName.
   */
  clientName?: string;
  /**
   * number of records to skip for pagination.
   *
   * @format int32
   * @minimum 0
   */
  skip?: number;
  /**
   * maximum number of records to return.
   *
   * @format int32
   * @maximum 50
   * @minimum 0
   */
  limit?: number;
};

// export type SearchAllReportsError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchAllReportsResponse = Schemas.Report[];

export type SearchAllReportsVariables = {
  queryParams?: SearchAllReportsQueryParams;
};

/**
 * List all reports known to the server.
 * May filter results by programID and clientName as query param.
 * Use skip and pagination query params to limit response size.
 */
// export const searchAllReports = (
//   variables: SearchAllReportsVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     SearchAllReportsResponse,
//     SearchAllReportsError,
//     undefined,
//     {},
//     SearchAllReportsQueryParams,
//     {}
//   >({ url: "/reports", method: "get", ...variables, signal });

// export type CreateReportError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type CreateReportVariables = {
  body: Schemas.Report;
};

/**
 * Create a new report in the server.
 */
// export const createReport = (
//   variables: CreateReportVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Report,
//     CreateReportError,
//     Schemas.Report,
//     {},
//     {},
//     {}
//   >({ url: "/reports", method: "post", ...variables, signal });

export type SearchReportsByReportIDPathParams = {
  /**
   * object ID of a report.
   */
  reportID: Schemas.ObjectID;
};

// export type SearchReportsByReportIDError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchReportsByReportIDVariables = {
  pathParams: SearchReportsByReportIDPathParams;
};

/**
 * Fetch the report specified by the reportID in path.
 */
// export const searchReportsByReportID = (
//   variables: SearchReportsByReportIDVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Report,
//     SearchReportsByReportIDError,
//     undefined,
//     {},
//     {},
//     SearchReportsByReportIDPathParams
//   >({ url: "/reports/{reportID}", method: "get", ...variables, signal });

export type UpdateReportPathParams = {
  /**
   * object ID of a report.
   */
  reportID: Schemas.ObjectID;
};

// export type UpdateReportError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type UpdateReportVariables = {
  body: Schemas.Report;
  pathParams: UpdateReportPathParams;
};

/**
 * Update the report specified by the reportID in path.
 */
// export const updateReport = (
//   variables: UpdateReportVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Report,
//     UpdateReportError,
//     Schemas.Report,
//     {},
//     {},
//     UpdateReportPathParams
//   >({ url: "/reports/{reportID}", method: "put", ...variables, signal });

export type DeleteReportPathParams = {
  /**
   * object ID of a report.
   */
  reportID: Schemas.ObjectID;
};

// export type DeleteReportError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type DeleteReportVariables = {
  pathParams: DeleteReportPathParams;
};

/**
 * Delete the program specified by the reportID in path.
 */
// export const deleteReport = (
//   variables: DeleteReportVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Report,
//     DeleteReportError,
//     undefined,
//     {},
//     {},
//     DeleteReportPathParams
//   >({ url: "/reports/{reportID}", method: "delete", ...variables, signal });

export type SearchAllEventsQueryParams = {
  /**
   * filter results to events with programID.
   */
  programID?: Schemas.ObjectID;
  /**
   * Indicates targeting type, e.g. GROUP
   */
  targetType?: string;
  /**
   * List of target values, e.g. group names
   */
  targetValues?: string[];
  /**
   * number of records to skip for pagination.
   *
   * @format int32
   * @minimum 0
   */
  skip?: number;
  /**
   * maximum number of records to return.
   *
   * @format int32
   * @maximum 50
   * @minimum 0
   */
  limit?: number;
};

// export type SearchAllEventsError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchAllEventsResponse = Schemas.Event[];

export type SearchAllEventsVariables = {
  queryParams?: SearchAllEventsQueryParams;
};

/**
 * List all events known to the server. May filter results by programID query param.
 * Use skip and pagination query params to limit response size.
 */
// export const searchAllEvents = (
//   variables: SearchAllEventsVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     SearchAllEventsResponse,
//     SearchAllEventsError,
//     undefined,
//     {},
//     SearchAllEventsQueryParams,
//     {}
//   >({ url: "/events", method: "get", ...variables, signal });

// export type CreateEventError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type CreateEventVariables = {
  body: Schemas.Event;
};

/**
 * Create a new event in the server.
 */
// export const createEvent = (
//   variables: CreateEventVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<Schemas.Event, CreateEventError, Schemas.Event, {}, {}, {}>({
//     url: "/events",
//     method: "post",
//     ...variables,
//     signal,
//   });

export type SearchEventsByIDPathParams = {
  /**
   * object ID of event.
   */
  eventID: Schemas.ObjectID;
};

// export type SearchEventsByIDError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchEventsByIDVariables = {
  pathParams: SearchEventsByIDPathParams;
};

/**
 * Fetch event associated with the eventID in path.
 */
// export const searchEventsByID = (
//   variables: SearchEventsByIDVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Event,
//     SearchEventsByIDError,
//     undefined,
//     {},
//     {},
//     SearchEventsByIDPathParams
//   >({ url: "/events/{eventID}", method: "get", ...variables, signal });

export type UpdateEventPathParams = {
  /**
   * object ID of event.
   */
  eventID: Schemas.ObjectID;
};

// export type UpdateEventError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type UpdateEventVariables = {
  body: Schemas.Event;
  pathParams: UpdateEventPathParams;
};

/**
 * Update the event specified by the eventID in path.
 */
// export const updateEvent = (
//   variables: UpdateEventVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Event,
//     UpdateEventError,
//     Schemas.Event,
//     {},
//     {},
//     UpdateEventPathParams
//   >({ url: "/events/{eventID}", method: "put", ...variables, signal });

export type DeleteEventPathParams = {
  /**
   * object ID of event.
   */
  eventID: Schemas.ObjectID;
};

// export type DeleteEventError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type DeleteEventVariables = {
  pathParams: DeleteEventPathParams;
};

/**
 * Delete the event specified by the eventID in path.
 */
// export const deleteEvent = (
//   variables: DeleteEventVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Event,
//     DeleteEventError,
//     undefined,
//     {},
//     {},
//     DeleteEventPathParams
//   >({ url: "/events/{eventID}", method: "delete", ...variables, signal });

export type SearchSubscriptionsQueryParams = {
  /**
   * filter results to subscriptions with programID.
   */
  programID?: Schemas.ObjectID;
  /**
   * filter results to subscriptions with clientName.
   */
  clientName?: string;
  /**
   * Indicates targeting type, e.g. GROUP
   */
  targetType?: string;
  /**
   * List of target values, e.g. group names
   */
  targetValues?: string[];
  /**
   * list of objects to subscribe to.
   */
  objects?: Schemas.ObjectTypes[];
  /**
   * number of records to skip for pagination.
   *
   * @minimum 0
   * @format int32
   */
  skip?: number;
  /**
   * maximum number of records to return.
   *
   * @maximum 50
   * @minimum 0
   * @format int32
   */
  limit?: number;
};

// export type SearchSubscriptionsError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchSubscriptionsResponse = Schemas.Subscription[];

export type SearchSubscriptionsVariables = {
  queryParams?: SearchSubscriptionsQueryParams;
};

/**
 * List all subscriptions.
 * May filter results by programID and clientID as query params.
 * May filter results by objects as query param. See objectTypes schema.
 * Use skip and pagination query params to limit response size.
 */
// export const searchSubscriptions = (
//   variables: SearchSubscriptionsVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     SearchSubscriptionsResponse,
//     SearchSubscriptionsError,
//     undefined,
//     {},
//     SearchSubscriptionsQueryParams,
//     {}
//   >({ url: "/subscriptions", method: "get", ...variables, signal });

// export type CreateSubscriptionError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type CreateSubscriptionVariables = {
  body: Schemas.Subscription;
};

/**
 * Create a new subscription.
 */
// export const createSubscription = (
//   variables: CreateSubscriptionVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Subscription,
//     CreateSubscriptionError,
//     Schemas.Subscription,
//     {},
//     {},
//     {}
//   >({ url: "/subscriptions", method: "post", ...variables, signal });

export type SearchSubscriptionByIDPathParams = {
  /**
   * object ID of the associated subscription.
   */
  subscriptionID: Schemas.ObjectID;
};

// export type SearchSubscriptionByIDError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchSubscriptionByIDVariables = {
  pathParams: SearchSubscriptionByIDPathParams;
};

/**
 * Return the subscription specified by subscriptionID specified in path.
 */
// export const searchSubscriptionByID = (
//   variables: SearchSubscriptionByIDVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Subscription,
//     SearchSubscriptionByIDError,
//     undefined,
//     {},
//     {},
//     SearchSubscriptionByIDPathParams
//   >({
//     url: "/subscriptions/{subscriptionID}",
//     method: "get",
//     ...variables,
//     signal,
//   });

export type UpdateSubscriptionPathParams = {
  /**
   * object ID of the associated subscription.
   */
  subscriptionID: Schemas.ObjectID;
};

// export type UpdateSubscriptionError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type UpdateSubscriptionVariables = {
  body: Schemas.Subscription;
  pathParams: UpdateSubscriptionPathParams;
};

/**
 * Update the subscription specified by subscriptionID specified in path.
 */
// export const updateSubscription = (
//   variables: UpdateSubscriptionVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Subscription,
//     UpdateSubscriptionError,
//     Schemas.Subscription,
//     {},
//     {},
//     UpdateSubscriptionPathParams
//   >({
//     url: "/subscriptions/{subscriptionID}",
//     method: "put",
//     ...variables,
//     signal,
//   });

export type DeleteSubscriptionPathParams = {
  /**
   * object ID of the associated subscription.
   */
  subscriptionID: Schemas.ObjectID;
};

// export type DeleteSubscriptionError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type DeleteSubscriptionVariables = {
  pathParams: DeleteSubscriptionPathParams;
};

/**
 * Delete the subscription specified by subscriptionID specified in path.
 */
// export const deleteSubscription = (
//   variables: DeleteSubscriptionVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Subscription,
//     DeleteSubscriptionError,
//     undefined,
//     {},
//     {},
//     DeleteSubscriptionPathParams
//   >({
//     url: "/subscriptions/{subscriptionID}",
//     method: "delete",
//     ...variables,
//     signal,
//   });

export type SearchVensQueryParams = {
  /**
   * Indicates targeting type, e.g. GROUP
   */
  targetType?: string;
  /**
   * List of target values, e.g. group names
   */
  targetValues?: string[];
  /**
   * number of records to skip for pagination.
   *
   * @minimum 0
   * @format int32
   */
  skip?: number;
  /**
   * maximum number of records to return.
   *
   * @maximum 50
   * @minimum 0
   * @format int32
   */
  limit?: number;
};

// export type SearchVensError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchVensResponse = Schemas.Ven[];

export type SearchVensVariables = {
  queryParams?: SearchVensQueryParams;
};

/**
 * List all vens.
 * Use skip and pagination query params to limit response size.
 */
// export const searchVens = (
//   variables: SearchVensVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     SearchVensResponse,
//     SearchVensError,
//     undefined,
//     {},
//     SearchVensQueryParams,
//     {}
//   >({ url: "/vens", method: "get", ...variables, signal });

// export type CreateVenError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type CreateVenVariables = {
  body: Schemas.Ven;
};

/**
 * Create a new ven.
 */
// export const createVen = (
//   variables: CreateVenVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<Schemas.Ven, CreateVenError, Schemas.Ven, {}, {}, {}>({
//     url: "/vens",
//     method: "post",
//     ...variables,
//     signal,
//   });

export type SearchVenByIDPathParams = {
  /**
   * object ID of ven.
   */
  venID: Schemas.ObjectID;
};

// export type SearchVenByIDError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchVenByIDVariables = {
  pathParams: SearchVenByIDPathParams;
};

/**
 * Return the ven specified by venID specified in path.
 */
// export const searchVenByID = (
//   variables: SearchVenByIDVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Ven,
//     SearchVenByIDError,
//     undefined,
//     {},
//     {},
//     SearchVenByIDPathParams
//   >({ url: "/vens/{venID}", method: "get", ...variables, signal });

export type UpdateVenPathParams = {
  /**
   * object ID of ven.
   */
  venID: Schemas.ObjectID;
};

// export type UpdateVenError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type UpdateVenVariables = {
  body: Schemas.Ven;
  pathParams: UpdateVenPathParams;
};

/**
 * Update the ven specified by venID specified in path.
 */
// export const updateVen = (
//   variables: UpdateVenVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Ven,
//     UpdateVenError,
//     Schemas.Ven,
//     {},
//     {},
//     UpdateVenPathParams
//   >({ url: "/vens/{venID}", method: "put", ...variables, signal });

export type DeleteVenPathParams = {
  /**
   * object ID of ven.
   */
  venID: Schemas.ObjectID;
};

// export type DeleteVenError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type DeleteVenVariables = {
  pathParams: DeleteVenPathParams;
};

/**
 * Delete the ven specified by venID specified in path.
 */
// export const deleteVen = (
//   variables: DeleteVenVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Ven,
//     DeleteVenError,
//     undefined,
//     {},
//     {},
//     DeleteVenPathParams
//   >({ url: "/vens/{venID}", method: "delete", ...variables, signal });

export type SearchVenResourcesPathParams = {
  /**
   * Numeric ID of ven.
   */
  venID: Schemas.ObjectID;
};

export type SearchVenResourcesQueryParams = {
  /**
   * Indicates targeting type, e.g. GROUP
   */
  targetType?: string;
  /**
   * List of target values, e.g. group names
   */
  targetValues?: string[];
  /**
   * number of records to skip for pagination.
   *
   * @minimum 0
   * @format int32
   */
  skip?: number;
  /**
   * maximum number of records to return.
   *
   * @maximum 50
   * @minimum 0
   * @format int32
   */
  limit?: number;
};

// export type SearchVenResourcesError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchVenResourcesResponse = Schemas.Resource[];

export type SearchVenResourcesVariables = {
  pathParams: SearchVenResourcesPathParams;
  queryParams?: SearchVenResourcesQueryParams;
};

/**
 * Return the ven resources specified by venID specified in path.
 */
// export const searchVenResources = (
//   variables: SearchVenResourcesVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     SearchVenResourcesResponse,
//     SearchVenResourcesError,
//     undefined,
//     {},
//     SearchVenResourcesQueryParams,
//     SearchVenResourcesPathParams
//   >({ url: "/vens/{venID}/resources", method: "get", ...variables, signal });

export type CreateResourcePathParams = {
  /**
   * Numeric ID of ven.
   */
  venID: Schemas.ObjectID;
};

// export type CreateResourceError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type CreateResourceVariables = {
  body: Schemas.Resource;
  pathParams: CreateResourcePathParams;
};

/**
 * Create a new resource.
 */
// export const createResource = (
//   variables: CreateResourceVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Resource,
//     CreateResourceError,
//     Schemas.Resource,
//     {},
//     {},
//     CreateResourcePathParams
//   >({ url: "/vens/{venID}/resources", method: "post", ...variables, signal });

export type SearchVenResourceByIDPathParams = {
  /**
   * object ID of the associated ven.
   */
  venID: Schemas.ObjectID;
  /**
   * object ID of the resource.
   */
  resourceID: Schemas.ObjectID;
};

// export type SearchVenResourceByIDError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type SearchVenResourceByIDVariables = {
  pathParams: SearchVenResourceByIDPathParams;
};

/**
 * Return the ven resource specified by venID and resourceID specified in path.
 */
// export const searchVenResourceByID = (
//   variables: SearchVenResourceByIDVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Resource,
//     SearchVenResourceByIDError,
//     undefined,
//     {},
//     {},
//     SearchVenResourceByIDPathParams
//   >({
//     url: "/vens/{venID}/resources/{resourceID}",
//     method: "get",
//     ...variables,
//     signal,
//   });

export type UpdateVenResourcePathParams = {
  /**
   * object ID of the associated ven.
   */
  venID: Schemas.ObjectID;
  /**
   * object ID of the resource.
   */
  resourceID: Schemas.ObjectID;
};

// export type UpdateVenResourceError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 409;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type UpdateVenResourceVariables = {
  body: Schemas.Resource;
  pathParams: UpdateVenResourcePathParams;
};

/**
 * Update the ven resource specified by venID and resourceID specified in path.
 */
// export const updateVenResource = (
//   variables: UpdateVenResourceVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Resource,
//     UpdateVenResourceError,
//     Schemas.Resource,
//     {},
//     {},
//     UpdateVenResourcePathParams
//   >({
//     url: "/vens/{venID}/resources/{resourceID}",
//     method: "put",
//     ...variables,
//     signal,
//   });

export type DeleteVenResourcePathParams = {
  /**
   * object ID of the associated ven.
   */
  venID: Schemas.ObjectID;
  /**
   * object ID of the resource.
   */
  resourceID: Schemas.ObjectID;
};

// export type DeleteVenResourceError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 404;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type DeleteVenResourceVariables = {
  pathParams: DeleteVenResourcePathParams;
};

/**
 * Delete the ven resource specified by venID and resourceID specified in path.
 */
// export const deleteVenResource = (
//   variables: DeleteVenResourceVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     Schemas.Resource,
//     DeleteVenResourceError,
//     undefined,
//     {},
//     {},
//     DeleteVenResourcePathParams
//   >({
//     url: "/vens/{venID}/resources/{resourceID}",
//     method: "delete",
//     ...variables,
//     signal,
//   });

export type FetchTokenHeaders = {
  /**
   * client ID to exchange for bearer token.
   *
   * @example ven_client_99
   */
  clientID: string;
  /**
   * client secret to exchange for bearer token.
   *
   * @example ven_secret_99
   */
  clientSecret: string;
};

// export type FetchTokenError = Fetcher.ErrorWrapper<
//   | {
//       status: 400;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 403;
//       payload: Schemas.Problem;
//     }
//   | {
//       status: 500;
//       payload: Schemas.Problem;
//     }
// >;

export type FetchTokenVariables = {
  headers: FetchTokenHeaders;
};

/**
 * Return an access token based on clientID and clientSecret.
 */
// export const fetchToken = (
//   variables: FetchTokenVariables,
//   signal?: AbortSignal
// ) =>
//   openadr3ApiFetch<
//     string,
//     FetchTokenError,
//     undefined,
//     FetchTokenHeaders,
//     {},
//     {}
//   >({ url: "/auth/token", method: "get", ...variables, signal });

// export const operationsByTag = {
//   programs: {
//     searchAllPrograms,
//     createProgram,
//     searchProgramByProgramId,
//     updateProgram,
//     deleteProgram,
//   },
//   reports: {
//     searchAllReports,
//     createReport,
//     searchReportsByReportID,
//     updateReport,
//     deleteReport,
//   },
//   events: {
//     searchAllEvents,
//     createEvent,
//     searchEventsByID,
//     updateEvent,
//     deleteEvent,
//   },
//   subscriptions: {
//     searchSubscriptions,
//     createSubscription,
//     searchSubscriptionByID,
//     updateSubscription,
//     deleteSubscription,
//   },
//   vens: {
//     searchVens,
//     createVen,
//     searchVenByID,
//     updateVen,
//     deleteVen,
//     searchVenResources,
//     createResource,
//     searchVenResourceByID,
//     updateVenResource,
//     deleteVenResource,
//   },
//   auth: { fetchToken },
// };
