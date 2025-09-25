# EventsApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createEvent**](EventsApi.md#createEvent) | **POST** /events | create an event
[**deleteEvent**](EventsApi.md#deleteEvent) | **DELETE** /events/{eventID} | delete an event
[**searchAllEvents**](EventsApi.md#searchAllEvents) | **GET** /events | searches all events
[**searchEventsByID**](EventsApi.md#searchEventsByID) | **GET** /events/{eventID} | search events by ID
[**updateEvent**](EventsApi.md#updateEvent) | **PUT** /events/{eventID} | update an event

<a name="createEvent"></a>
# **createEvent**
> Event createEvent(body)

create an event

Create a new event in the server.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.EventsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

EventsApi apiInstance = new EventsApi();
EventRequest body = new EventRequest(); // EventRequest | Event item to add.
try {
    Event result = apiInstance.createEvent(body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling EventsApi#createEvent");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**EventRequest**](EventRequest.md)| Event item to add. | [optional]

### Return type

[**Event**](Event.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteEvent"></a>
# **deleteEvent**
> Event deleteEvent(eventID)

delete an event

Delete the event specified by the eventID in path. 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.EventsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

EventsApi apiInstance = new EventsApi();
String eventID = "eventID_example"; // String | object ID of event.
try {
    Event result = apiInstance.deleteEvent(eventID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling EventsApi#deleteEvent");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **eventID** | [**String**](.md)| object ID of event. |

### Return type

[**Event**](Event.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchAllEvents"></a>
# **searchAllEvents**
> List&lt;Event&gt; searchAllEvents(programID, targets, skip, limit, active)

searches all events

List all events known to the server. May filter results by programID query param. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.EventsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

EventsApi apiInstance = new EventsApi();
String programID = "programID_example"; // String | filter results to events with programID.
List<String> targets = Arrays.asList("targets_example"); // List<String> | Indicates targets
Integer skip = 56; // Integer | number of records to skip for pagination.
Integer limit = 56; // Integer | maximum number of records to return.
Boolean active = true; // Boolean | ignore events that have transpired.
try {
    List<Event> result = apiInstance.searchAllEvents(programID, targets, skip, limit, active);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling EventsApi#searchAllEvents");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **programID** | [**String**](.md)| filter results to events with programID. | [optional]
 **targets** | [**List&lt;String&gt;**](String.md)| Indicates targets | [optional]
 **skip** | **Integer**| number of records to skip for pagination. | [optional] [enum: 0]
 **limit** | **Integer**| maximum number of records to return. | [optional] [enum: 0, 50]
 **active** | **Boolean**| ignore events that have transpired. | [optional]

### Return type

[**List&lt;Event&gt;**](Event.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchEventsByID"></a>
# **searchEventsByID**
> Event searchEventsByID(eventID)

search events by ID

Fetch event associated with the eventID in path. 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.EventsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

EventsApi apiInstance = new EventsApi();
String eventID = "eventID_example"; // String | object ID of event.
try {
    Event result = apiInstance.searchEventsByID(eventID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling EventsApi#searchEventsByID");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **eventID** | [**String**](.md)| object ID of event. |

### Return type

[**Event**](Event.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateEvent"></a>
# **updateEvent**
> Event updateEvent(eventID, body)

update an event

Update the event specified by the eventID in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.EventsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

EventsApi apiInstance = new EventsApi();
String eventID = "eventID_example"; // String | object ID of event.
EventRequest body = new EventRequest(); // EventRequest | event item to update.
try {
    Event result = apiInstance.updateEvent(eventID, body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling EventsApi#updateEvent");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **eventID** | [**String**](.md)| object ID of event. |
 **body** | [**EventRequest**](EventRequest.md)| event item to update. | [optional]

### Return type

[**Event**](Event.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

