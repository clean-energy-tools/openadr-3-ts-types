# EventsApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createEvent**](EventsApi.md#createEvent) | **POST** /events | create an event |
| [**createEventWithHttpInfo**](EventsApi.md#createEventWithHttpInfo) | **POST** /events | create an event |
| [**deleteEvent**](EventsApi.md#deleteEvent) | **DELETE** /events/{eventID} | delete an event |
| [**deleteEventWithHttpInfo**](EventsApi.md#deleteEventWithHttpInfo) | **DELETE** /events/{eventID} | delete an event |
| [**searchAllEvents**](EventsApi.md#searchAllEvents) | **GET** /events | searches all events |
| [**searchAllEventsWithHttpInfo**](EventsApi.md#searchAllEventsWithHttpInfo) | **GET** /events | searches all events |
| [**searchEventsByID**](EventsApi.md#searchEventsByID) | **GET** /events/{eventID} | search events by ID |
| [**searchEventsByIDWithHttpInfo**](EventsApi.md#searchEventsByIDWithHttpInfo) | **GET** /events/{eventID} | search events by ID |
| [**updateEvent**](EventsApi.md#updateEvent) | **PUT** /events/{eventID} | update an event |
| [**updateEventWithHttpInfo**](EventsApi.md#updateEventWithHttpInfo) | **PUT** /events/{eventID} | update an event |



## createEvent

> Event createEvent(eventRequest)

create an event

Create a new event in the server.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        EventRequest eventRequest = new EventRequest(); // EventRequest | Event item to add.
        try {
            Event result = apiInstance.createEvent(eventRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#createEvent");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **eventRequest** | [**EventRequest**](EventRequest.md)| Event item to add. | [optional] |

### Return type

[**Event**](Event.md)


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **409** | Conflict. Could for example be a violation of a foreign key constraint or of a unique constraint on a name or id. |  -  |
| **500** | Internal server error |  -  |

## createEventWithHttpInfo

> ApiResponse<Event> createEvent createEventWithHttpInfo(eventRequest)

create an event

Create a new event in the server.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        EventRequest eventRequest = new EventRequest(); // EventRequest | Event item to add.
        try {
            ApiResponse<Event> response = apiInstance.createEventWithHttpInfo(eventRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#createEvent");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **eventRequest** | [**EventRequest**](EventRequest.md)| Event item to add. | [optional] |

### Return type

ApiResponse<[**Event**](Event.md)>


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **409** | Conflict. Could for example be a violation of a foreign key constraint or of a unique constraint on a name or id. |  -  |
| **500** | Internal server error |  -  |


## deleteEvent

> Event deleteEvent(eventID)

delete an event

Delete the event specified by the eventID in path. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        String eventID = "eventID_example"; // String | object ID of event.
        try {
            Event result = apiInstance.deleteEvent(eventID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#deleteEvent");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **eventID** | **String**| object ID of event. | |

### Return type

[**Event**](Event.md)


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | The specified resource was not found |  -  |
| **500** | Internal server error |  -  |

## deleteEventWithHttpInfo

> ApiResponse<Event> deleteEvent deleteEventWithHttpInfo(eventID)

delete an event

Delete the event specified by the eventID in path. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        String eventID = "eventID_example"; // String | object ID of event.
        try {
            ApiResponse<Event> response = apiInstance.deleteEventWithHttpInfo(eventID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#deleteEvent");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **eventID** | **String**| object ID of event. | |

### Return type

ApiResponse<[**Event**](Event.md)>


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | The specified resource was not found |  -  |
| **500** | Internal server error |  -  |


## searchAllEvents

> List<Event> searchAllEvents(programID, targets, skip, limit, active)

searches all events

List all events known to the server. May filter results by programID query param. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        String programID = "program-999"; // String | filter results to events with programID.
        List<@Size(min = 1, max = 128)String> targets = Arrays.asList(); // List<@Size(min = 1, max = 128)String> | Indicates targets
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        Boolean active = true; // Boolean | ignore events that have transpired.
        try {
            List<Event> result = apiInstance.searchAllEvents(programID, targets, skip, limit, active);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#searchAllEvents");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **programID** | **String**| filter results to events with programID. | [optional] |
| **targets** | [**List&lt;@Size(min &#x3D; 1, max &#x3D; 128)String&gt;**](String.md)| Indicates targets | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |
| **active** | **Boolean**| ignore events that have transpired. | [optional] |

### Return type

[**List&lt;Event&gt;**](Event.md)


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **500** | Internal server error |  -  |

## searchAllEventsWithHttpInfo

> ApiResponse<List<Event>> searchAllEvents searchAllEventsWithHttpInfo(programID, targets, skip, limit, active)

searches all events

List all events known to the server. May filter results by programID query param. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        String programID = "program-999"; // String | filter results to events with programID.
        List<@Size(min = 1, max = 128)String> targets = Arrays.asList(); // List<@Size(min = 1, max = 128)String> | Indicates targets
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        Boolean active = true; // Boolean | ignore events that have transpired.
        try {
            ApiResponse<List<Event>> response = apiInstance.searchAllEventsWithHttpInfo(programID, targets, skip, limit, active);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#searchAllEvents");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **programID** | **String**| filter results to events with programID. | [optional] |
| **targets** | [**List&lt;@Size(min &#x3D; 1, max &#x3D; 128)String&gt;**](String.md)| Indicates targets | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |
| **active** | **Boolean**| ignore events that have transpired. | [optional] |

### Return type

ApiResponse<[**List&lt;Event&gt;**](Event.md)>


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **500** | Internal server error |  -  |


## searchEventsByID

> Event searchEventsByID(eventID)

search events by ID

Fetch event associated with the eventID in path. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        String eventID = "eventID_example"; // String | object ID of event.
        try {
            Event result = apiInstance.searchEventsByID(eventID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#searchEventsByID");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **eventID** | **String**| object ID of event. | |

### Return type

[**Event**](Event.md)


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | The specified resource was not found |  -  |
| **500** | Internal server error |  -  |

## searchEventsByIDWithHttpInfo

> ApiResponse<Event> searchEventsByID searchEventsByIDWithHttpInfo(eventID)

search events by ID

Fetch event associated with the eventID in path. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        String eventID = "eventID_example"; // String | object ID of event.
        try {
            ApiResponse<Event> response = apiInstance.searchEventsByIDWithHttpInfo(eventID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#searchEventsByID");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **eventID** | **String**| object ID of event. | |

### Return type

ApiResponse<[**Event**](Event.md)>


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | The specified resource was not found |  -  |
| **500** | Internal server error |  -  |


## updateEvent

> Event updateEvent(eventID, eventRequest)

update an event

Update the event specified by the eventID in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        String eventID = "eventID_example"; // String | object ID of event.
        EventRequest eventRequest = new EventRequest(); // EventRequest | event item to update.
        try {
            Event result = apiInstance.updateEvent(eventID, eventRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#updateEvent");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **eventID** | **String**| object ID of event. | |
| **eventRequest** | [**EventRequest**](EventRequest.md)| event item to update. | [optional] |

### Return type

[**Event**](Event.md)


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | The specified resource was not found |  -  |
| **409** | Conflict. Could for example be a violation of a foreign key constraint or of a unique constraint on a name or id. |  -  |
| **500** | Internal server error |  -  |

## updateEventWithHttpInfo

> ApiResponse<Event> updateEvent updateEventWithHttpInfo(eventID, eventRequest)

update an event

Update the event specified by the eventID in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.EventsApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");
        
        // Configure OAuth2 access token for authorization: oAuth2ClientCredentials
        OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
        oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

        // Configure HTTP bearer authorization: bearerAuth
        HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
        bearerAuth.setBearerToken("BEARER TOKEN");

        EventsApi apiInstance = new EventsApi(defaultClient);
        String eventID = "eventID_example"; // String | object ID of event.
        EventRequest eventRequest = new EventRequest(); // EventRequest | event item to update.
        try {
            ApiResponse<Event> response = apiInstance.updateEventWithHttpInfo(eventID, eventRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling EventsApi#updateEvent");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
    }
}
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **eventID** | **String**| object ID of event. | |
| **eventRequest** | [**EventRequest**](EventRequest.md)| event item to update. | [optional] |

### Return type

ApiResponse<[**Event**](Event.md)>


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | The specified resource was not found |  -  |
| **409** | Conflict. Could for example be a violation of a foreign key constraint or of a unique constraint on a name or id. |  -  |
| **500** | Internal server error |  -  |

