# VensApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createVen**](VensApi.md#createVen) | **POST** /vens | create ven
[**deleteVen**](VensApi.md#deleteVen) | **DELETE** /vens/{venID} | delete  ven
[**searchVenByID**](VensApi.md#searchVenByID) | **GET** /vens/{venID} | search vens by ID
[**searchVens**](VensApi.md#searchVens) | **GET** /vens | search vens
[**updateVen**](VensApi.md#updateVen) | **PUT** /vens/{venID} | update  ven

<a name="createVen"></a>
# **createVen**
> Ven createVen(body)

create ven

Create a new ven.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.VensApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

VensApi apiInstance = new VensApi();
VenRequest body = new VenRequest(); // VenRequest | 
try {
    Ven result = apiInstance.createVen(body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling VensApi#createVen");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**VenRequest**](VenRequest.md)|  |

### Return type

[**Ven**](Ven.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteVen"></a>
# **deleteVen**
> Ven deleteVen(venID)

delete  ven

Delete the ven specified by venID specified in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.VensApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

VensApi apiInstance = new VensApi();
String venID = "venID_example"; // String | object ID of ven.
try {
    Ven result = apiInstance.deleteVen(venID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling VensApi#deleteVen");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **venID** | [**String**](.md)| object ID of ven. |

### Return type

[**Ven**](Ven.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchVenByID"></a>
# **searchVenByID**
> Ven searchVenByID(venID)

search vens by ID

Return the ven specified by venID specified in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.VensApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

VensApi apiInstance = new VensApi();
String venID = "venID_example"; // String | object ID of ven.
try {
    Ven result = apiInstance.searchVenByID(venID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling VensApi#searchVenByID");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **venID** | [**String**](.md)| object ID of ven. |

### Return type

[**Ven**](Ven.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchVens"></a>
# **searchVens**
> List&lt;Ven&gt; searchVens(venName, targets, skip, limit)

search vens

List all vens. May filter results by venName as query param. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.VensApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

VensApi apiInstance = new VensApi();
String venName = "venName_example"; // String | Indicates ven objects w venName
List<String> targets = Arrays.asList("targets_example"); // List<String> | Indicates targets
Integer skip = 56; // Integer | number of records to skip for pagination.
Integer limit = 56; // Integer | maximum number of records to return.
try {
    List<Ven> result = apiInstance.searchVens(venName, targets, skip, limit);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling VensApi#searchVens");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **venName** | [**String**](.md)| Indicates ven objects w venName | [optional]
 **targets** | [**List&lt;String&gt;**](String.md)| Indicates targets | [optional]
 **skip** | **Integer**| number of records to skip for pagination. | [optional] [enum: 0]
 **limit** | **Integer**| maximum number of records to return. | [optional] [enum: 0, 50]

### Return type

[**List&lt;Ven&gt;**](Ven.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateVen"></a>
# **updateVen**
> Ven updateVen(venID, body)

update  ven

Update the ven specified by venID specified in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.VensApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

VensApi apiInstance = new VensApi();
String venID = "venID_example"; // String | object ID of ven.
VenRequest body = new VenRequest(); // VenRequest | ven item to update.
try {
    Ven result = apiInstance.updateVen(venID, body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling VensApi#updateVen");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **venID** | [**String**](.md)| object ID of ven. |
 **body** | [**VenRequest**](VenRequest.md)| ven item to update. | [optional]

### Return type

[**Ven**](Ven.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

