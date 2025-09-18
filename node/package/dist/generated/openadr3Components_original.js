import { openadr3Fetch } from "./openadr3Fetcher";
/**
 * List all programs known to the server.
 * May filter results by targets params.
 * Use skip and pagination query params to limit response size.
 */
export const searchAllPrograms = (variables, signal) => openadr3Fetch({ url: "/programs", method: "get", ...variables, signal });
/**
 * Create a new program in the server.
 */
export const createProgram = (variables, signal) => openadr3Fetch({ url: "/programs", method: "post", ...variables, signal });
/**
 * Fetch the program specified by the programID in path.
 */
export const searchProgramByProgramId = (variables, signal) => openadr3Fetch({ url: "/programs/{programID}", method: "get", ...variables, signal });
/**
 * Update an existing program with the programID in path.
 */
export const updateProgram = (variables, signal) => openadr3Fetch({ url: "/programs/{programID}", method: "put", ...variables, signal });
/**
 * Delete an existing program with the programID in path.
 */
export const deleteProgram = (variables, signal) => openadr3Fetch({ url: "/programs/{programID}", method: "delete", ...variables, signal });
/**
 * List all reports known to the server.
 * May filter results by programID, eventID,  and clientName as query param.
 * Use skip and pagination query params to limit response size.
 */
export const searchAllReports = (variables, signal) => openadr3Fetch({ url: "/reports", method: "get", ...variables, signal });
/**
 * Create a new report in the server.
 */
export const createReport = (variables, signal) => openadr3Fetch({ url: "/reports", method: "post", ...variables, signal });
/**
 * Fetch the report specified by the reportID in path.
 */
export const searchReportsByReportID = (variables, signal) => openadr3Fetch({ url: "/reports/{reportID}", method: "get", ...variables, signal });
/**
 * Update the report specified by the reportID in path.
 */
export const updateReport = (variables, signal) => openadr3Fetch({ url: "/reports/{reportID}", method: "put", ...variables, signal });
/**
 * Delete the report specified by the reportID in path.
 */
export const deleteReport = (variables, signal) => openadr3Fetch({ url: "/reports/{reportID}", method: "delete", ...variables, signal });
/**
 * List all events known to the server.
 * May filter results by programID query param.
 * May filter results by targets params.
 * Use skip and pagination query params to limit response size.
 */
export const searchAllEvents = (variables, signal) => openadr3Fetch({ url: "/events", method: "get", ...variables, signal });
/**
 * Create a new event in the server.
 */
export const createEvent = (variables, signal) => openadr3Fetch({ url: "/events", method: "post", ...variables, signal });
/**
 * Fetch event associated with the eventID in path.
 */
export const searchEventsByID = (variables, signal) => openadr3Fetch({ url: "/events/{eventID}", method: "get", ...variables, signal });
/**
 * Update the event specified by the eventID in path.
 */
export const updateEvent = (variables, signal) => openadr3Fetch({ url: "/events/{eventID}", method: "put", ...variables, signal });
/**
 * Delete the event specified by the eventID in path.
 */
export const deleteEvent = (variables, signal) => openadr3Fetch({ url: "/events/{eventID}", method: "delete", ...variables, signal });
/**
 * List all subscriptions.
 * May filter results by programID and clientName as query params.
 * May filter results by objects as query param. See objectTypes schema.
 * Use skip and pagination query params to limit response size.
 */
export const searchSubscriptions = (variables, signal) => openadr3Fetch({ url: "/subscriptions", method: "get", ...variables, signal });
/**
 * Create a new subscription.
 */
export const createSubscription = (variables, signal) => openadr3Fetch({ url: "/subscriptions", method: "post", ...variables, signal });
/**
 * Return the subscription specified by subscriptionID specified in path.
 */
export const searchSubscriptionByID = (variables, signal) => openadr3Fetch({
    url: "/subscriptions/{subscriptionID}",
    method: "get",
    ...variables,
    signal,
});
/**
 * Update the subscription specified by subscriptionID specified in path.
 */
export const updateSubscription = (variables, signal) => openadr3Fetch({
    url: "/subscriptions/{subscriptionID}",
    method: "put",
    ...variables,
    signal,
});
/**
 * Delete the subscription specified by subscriptionID specified in path.
 */
export const deleteSubscription = (variables, signal) => openadr3Fetch({
    url: "/subscriptions/{subscriptionID}",
    method: "delete",
    ...variables,
    signal,
});
/**
 * List all vens.
 * May filter results by venName as query param.
 * May filter results by targets params.
 * Use skip and pagination query params to limit response size.
 */
export const searchVens = (variables, signal) => openadr3Fetch({ url: "/vens", method: "get", ...variables, signal });
/**
 * Create a new ven.
 */
export const createVen = (variables, signal) => openadr3Fetch({
    url: "/vens",
    method: "post",
    ...variables,
    signal,
});
/**
 * Return the ven specified by venID specified in path.
 */
export const searchVenByID = (variables, signal) => openadr3Fetch({ url: "/vens/{venID}", method: "get", ...variables, signal });
/**
 * Update the ven specified by venID specified in path.
 */
export const updateVen = (variables, signal) => openadr3Fetch({ url: "/vens/{venID}", method: "put", ...variables, signal });
/**
 * Delete the ven specified by venID specified in path.
 */
export const deleteVen = (variables, signal) => openadr3Fetch({ url: "/vens/{venID}", method: "delete", ...variables, signal });
/**
 * List all ven resources associated with ven with specified venID.
 * May filter results by resourceName as query params.
 * May filter results by targets params.
 * Use skip and pagination query params to limit response size.
 */
export const searchVenResources = (variables, signal) => openadr3Fetch({ url: "/resources", method: "get", ...variables, signal });
/**
 * Create a new resource.
 */
export const createResource = (variables, signal) => openadr3Fetch({ url: "/resources", method: "post", ...variables, signal });
/**
 * Return the ven resource specified by venID and resourceID specified in path.
 */
export const searchVenResourceByID = (variables, signal) => openadr3Fetch({ url: "/resources/{resourceID}", method: "get", ...variables, signal });
/**
 * Update the ven resource specified by venID and resourceID specified in path.
 */
export const updateVenResource = (variables, signal) => openadr3Fetch({ url: "/resources/{resourceID}", method: "put", ...variables, signal });
/**
 * Delete the ven resource specified by venID and resourceID specified in path.
 */
export const deleteVenResource = (variables, signal) => openadr3Fetch({ url: "/resources/{resourceID}", method: "delete", ...variables, signal });
/**
 * Return the URL of the token endpoint.
 */
export const getAuthServerInfo = (signal) => openadr3Fetch({ url: "/auth/server", method: "get", signal });
/**
 * Return an access token based on clientID and clientSecret.
 */
export const fetchToken = (signal) => openadr3Fetch({ url: "/auth/token", method: "post", signal });
/**
 * List all notifier bindings supported by the server
 */
export const listAllNotifiers = (signal) => openadr3Fetch({ url: "/notifiers", method: "get", signal });
/**
 * List all MQTT notifier topic names for operations on programs
 */
export const listAllMqttNotifierTopicsPrograms = (signal) => openadr3Fetch({ url: "/notifiers/mqtt/topics/programs", method: "get", signal });
/**
 * List all MQTT binding topic names for operations on a program
 */
export const listAllMqttNotifierTopicsProgram = (variables, signal) => openadr3Fetch({
    url: "/notifiers/mqtt/topics/programs/{programID}",
    method: "get",
    ...variables,
    signal,
});
/**
 * List all MQTT binding topic names for operations on all events
 */
export const listAllMqttNotifierTopicsEvents = (signal) => openadr3Fetch({ url: "/notifiers/mqtt/topics/events", method: "get", signal });
/**
 * List all MQTT binding topic names for operations on events for a program
 */
export const listAllMqttNotifierTopicsProgramEvents = (variables, signal) => openadr3Fetch({
    url: "/notifiers/mqtt/topics/programs/{programID}/events",
    method: "get",
    ...variables,
    signal,
});
/**
 * List all MQTT binding topic names for operations on all reports
 */
export const listAllMqttNotifierTopicsReports = (signal) => openadr3Fetch({ url: "/notifiers/mqtt/topics/reports", method: "get", signal });
/**
 * List all MQTT binding topic names for operations on all subscriptions
 */
export const listAllMqttNotifierTopicsSubscriptions = (signal) => openadr3Fetch({ url: "/notifiers/mqtt/topics/subscriptions", method: "get", signal });
/**
 * List all MQTT binding topic names for operations on vens
 */
export const listAllMqttNotifierTopicsVens = (signal) => openadr3Fetch({ url: "/notifiers/mqtt/topics/vens", method: "get", signal });
/**
 * List all MQTT binding topic names for operations on a ven
 */
export const listAllMqttNotifierTopicsVen = (variables, signal) => openadr3Fetch({
    url: "/notifiers/mqtt/topics/vens/{venID}",
    method: "get",
    ...variables,
    signal,
});
/**
 * List all MQTT binding topic names for operations on resources
 */
export const listAllMqttNotifierTopicsResources = (signal) => openadr3Fetch({ url: "/notifiers/mqtt/topics/resources", method: "get", signal });
/**
 * List all MQTT binding topic names for operations on events targated for a ven
 */
export const listAllMqttNotifierTopicsVenEvents = (variables, signal) => openadr3Fetch({
    url: "/notifiers/mqtt/topics/vens/{venID}/events",
    method: "get",
    ...variables,
    signal,
});
/**
 * List all MQTT binding topic names for operations on programs targeted for a ven
 */
export const listAllMqttNotifierTopicsVenPrograms = (variables, signal) => openadr3Fetch({
    url: "/notifiers/mqtt/topics/vens/{venID}/programs",
    method: "get",
    ...variables,
    signal,
});
/**
 * List all MQTT binding topic names for operations on resources for a ven
 */
export const listAllMqttNotifierTopicsVenResources = (variables, signal) => openadr3Fetch({
    url: "/notifiers/mqtt/topics/vens/{venID}/resources",
    method: "get",
    ...variables,
    signal,
});
export const operationsByTag = {
    programs: {
        searchAllPrograms,
        createProgram,
        searchProgramByProgramId,
        updateProgram,
        deleteProgram,
    },
    reports: {
        searchAllReports,
        createReport,
        searchReportsByReportID,
        updateReport,
        deleteReport,
    },
    events: {
        searchAllEvents,
        createEvent,
        searchEventsByID,
        updateEvent,
        deleteEvent,
    },
    subscriptions: {
        searchSubscriptions,
        createSubscription,
        searchSubscriptionByID,
        updateSubscription,
        deleteSubscription,
    },
    vens: { searchVens, createVen, searchVenByID, updateVen, deleteVen },
    resources: {
        searchVenResources,
        createResource,
        searchVenResourceByID,
        updateVenResource,
        deleteVenResource,
    },
    auth: { getAuthServerInfo, fetchToken },
    notifiers: { listAllNotifiers },
    mQTTNotifier: {
        listAllMqttNotifierTopicsPrograms,
        listAllMqttNotifierTopicsProgram,
        listAllMqttNotifierTopicsEvents,
        listAllMqttNotifierTopicsProgramEvents,
        listAllMqttNotifierTopicsReports,
        listAllMqttNotifierTopicsSubscriptions,
        listAllMqttNotifierTopicsVens,
        listAllMqttNotifierTopicsVen,
        listAllMqttNotifierTopicsResources,
        listAllMqttNotifierTopicsVenEvents,
        listAllMqttNotifierTopicsVenPrograms,
        listAllMqttNotifierTopicsVenResources,
    },
};
//# sourceMappingURL=openadr3Components_original.js.map