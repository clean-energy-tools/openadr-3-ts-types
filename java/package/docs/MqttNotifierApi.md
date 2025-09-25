# MqttNotifierApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listAllMqttNotifierTopicsEvents**](MqttNotifierApi.md#listAllMqttNotifierTopicsEvents) | **GET** /notifiers/mqtt/topics/events | List all MQTT binding topic names for operations on all events 
[**listAllMqttNotifierTopicsProgram**](MqttNotifierApi.md#listAllMqttNotifierTopicsProgram) | **GET** /notifiers/mqtt/topics/programs/{programID} | List all MQTT binding topic names for operations on a program 
[**listAllMqttNotifierTopicsProgramEvents**](MqttNotifierApi.md#listAllMqttNotifierTopicsProgramEvents) | **GET** /notifiers/mqtt/topics/programs/{programID}/events | List all MQTT binding topic names for operations on events for a program 
[**listAllMqttNotifierTopicsPrograms**](MqttNotifierApi.md#listAllMqttNotifierTopicsPrograms) | **GET** /notifiers/mqtt/topics/programs | List all MQTT notifier topic names for operations on programs 
[**listAllMqttNotifierTopicsReports**](MqttNotifierApi.md#listAllMqttNotifierTopicsReports) | **GET** /notifiers/mqtt/topics/reports | List all MQTT binding topic names for operations on all reports 
[**listAllMqttNotifierTopicsResources**](MqttNotifierApi.md#listAllMqttNotifierTopicsResources) | **GET** /notifiers/mqtt/topics/resources | List all MQTT binding topic names for operations on resources 
[**listAllMqttNotifierTopicsSubscriptions**](MqttNotifierApi.md#listAllMqttNotifierTopicsSubscriptions) | **GET** /notifiers/mqtt/topics/subscriptions | List all MQTT binding topic names for operations on all subscriptions 
[**listAllMqttNotifierTopicsVen**](MqttNotifierApi.md#listAllMqttNotifierTopicsVen) | **GET** /notifiers/mqtt/topics/vens/{venID} | List all MQTT binding topic names for operations on a ven 
[**listAllMqttNotifierTopicsVenEvents**](MqttNotifierApi.md#listAllMqttNotifierTopicsVenEvents) | **GET** /notifiers/mqtt/topics/vens/{venID}/events | List all MQTT binding topic names for operations on events targeted for a ven 
[**listAllMqttNotifierTopicsVenPrograms**](MqttNotifierApi.md#listAllMqttNotifierTopicsVenPrograms) | **GET** /notifiers/mqtt/topics/vens/{venID}/programs | List all MQTT binding topic names for operations on programs targeted for a ven 
[**listAllMqttNotifierTopicsVenResources**](MqttNotifierApi.md#listAllMqttNotifierTopicsVenResources) | **GET** /notifiers/mqtt/topics/vens/{venID}/resources | List all MQTT binding topic names for operations on resources for a ven 
[**listAllMqttNotifierTopicsVens**](MqttNotifierApi.md#listAllMqttNotifierTopicsVens) | **GET** /notifiers/mqtt/topics/vens | List all MQTT binding topic names for operations on vens 

<a name="listAllMqttNotifierTopicsEvents"></a>
# **listAllMqttNotifierTopicsEvents**
> NotifierTopicsResponse listAllMqttNotifierTopicsEvents()

List all MQTT binding topic names for operations on all events 

List all MQTT binding topic names for operations on all events 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsEvents();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsEvents");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsProgram"></a>
# **listAllMqttNotifierTopicsProgram**
> NotifierTopicsResponse listAllMqttNotifierTopicsProgram(programID)

List all MQTT binding topic names for operations on a program 

List all MQTT binding topic names for operations on a program 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
String programID = "programID_example"; // String | objectID of the program object
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsProgram(programID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsProgram");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **programID** | [**String**](.md)| objectID of the program object |

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsProgramEvents"></a>
# **listAllMqttNotifierTopicsProgramEvents**
> NotifierTopicsResponse listAllMqttNotifierTopicsProgramEvents(programID)

List all MQTT binding topic names for operations on events for a program 

List all MQTT binding topic names for operations on events for a program 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
String programID = "programID_example"; // String | Object ID of the program object
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsProgramEvents(programID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsProgramEvents");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **programID** | [**String**](.md)| Object ID of the program object |

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsPrograms"></a>
# **listAllMqttNotifierTopicsPrograms**
> NotifierTopicsResponse listAllMqttNotifierTopicsPrograms()

List all MQTT notifier topic names for operations on programs 

List all MQTT notifier topic names for operations on programs 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsPrograms();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsPrograms");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsReports"></a>
# **listAllMqttNotifierTopicsReports**
> NotifierTopicsResponse listAllMqttNotifierTopicsReports()

List all MQTT binding topic names for operations on all reports 

List all MQTT binding topic names for operations on all reports 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsReports();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsReports");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsResources"></a>
# **listAllMqttNotifierTopicsResources**
> NotifierTopicsResponse listAllMqttNotifierTopicsResources()

List all MQTT binding topic names for operations on resources 

List all MQTT binding topic names for operations on resources 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsResources();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsResources");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsSubscriptions"></a>
# **listAllMqttNotifierTopicsSubscriptions**
> NotifierTopicsResponse listAllMqttNotifierTopicsSubscriptions()

List all MQTT binding topic names for operations on all subscriptions 

List all MQTT binding topic names for operations on all subscriptions 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsSubscriptions();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsSubscriptions");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsVen"></a>
# **listAllMqttNotifierTopicsVen**
> NotifierTopicsResponse listAllMqttNotifierTopicsVen(venID)

List all MQTT binding topic names for operations on a ven 

List all MQTT binding topic names for operations on a ven 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
String venID = "venID_example"; // String | venID of the vens object
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsVen(venID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsVen");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **venID** | [**String**](.md)| venID of the vens object |

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsVenEvents"></a>
# **listAllMqttNotifierTopicsVenEvents**
> NotifierTopicsResponse listAllMqttNotifierTopicsVenEvents(venID)

List all MQTT binding topic names for operations on events targeted for a ven 

List all MQTT binding topic names for operations on events targated for a ven 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
String venID = "venID_example"; // String | object ID of the ven object
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsVenEvents(venID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsVenEvents");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **venID** | [**String**](.md)| object ID of the ven object |

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsVenPrograms"></a>
# **listAllMqttNotifierTopicsVenPrograms**
> NotifierTopicsResponse listAllMqttNotifierTopicsVenPrograms(venID)

List all MQTT binding topic names for operations on programs targeted for a ven 

List all MQTT binding topic names for operations on programs targeted for a ven 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
String venID = "venID_example"; // String | object ID of the ven object
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsVenPrograms(venID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsVenPrograms");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **venID** | [**String**](.md)| object ID of the ven object |

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsVenResources"></a>
# **listAllMqttNotifierTopicsVenResources**
> NotifierTopicsResponse listAllMqttNotifierTopicsVenResources(venID)

List all MQTT binding topic names for operations on resources for a ven 

List all MQTT binding topic names for operations on resources for a ven 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
String venID = "venID_example"; // String | object ID of the ven object
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsVenResources(venID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsVenResources");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **venID** | [**String**](.md)| object ID of the ven object |

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllMqttNotifierTopicsVens"></a>
# **listAllMqttNotifierTopicsVens**
> NotifierTopicsResponse listAllMqttNotifierTopicsVens()

List all MQTT binding topic names for operations on vens 

List all MQTT binding topic names for operations on vens 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.MqttNotifierApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

MqttNotifierApi apiInstance = new MqttNotifierApi();
try {
    NotifierTopicsResponse result = apiInstance.listAllMqttNotifierTopicsVens();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MqttNotifierApi#listAllMqttNotifierTopicsVens");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**NotifierTopicsResponse**](NotifierTopicsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

