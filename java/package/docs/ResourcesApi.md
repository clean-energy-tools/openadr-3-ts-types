# ResourcesApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createResource**](ResourcesApi.md#createResource) | **POST** /resources | create resource
[**deleteVenResource**](ResourcesApi.md#deleteVenResource) | **DELETE** /resources/{resourceID} | delete  ven resource
[**searchVenResourceByID**](ResourcesApi.md#searchVenResourceByID) | **GET** /resources/{resourceID} | search ven resources by ID
[**searchVenResources**](ResourcesApi.md#searchVenResources) | **GET** /resources | search ven resources
[**updateVenResource**](ResourcesApi.md#updateVenResource) | **PUT** /resources/{resourceID} | update  ven resource

<a name="createResource"></a>
# **createResource**
> Resource createResource(body)

create resource

Create a new resource.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ResourcesApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ResourcesApi apiInstance = new ResourcesApi();
ResourceRequest body = new ResourceRequest(); // ResourceRequest | 
try {
    Resource result = apiInstance.createResource(body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ResourcesApi#createResource");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ResourceRequest**](ResourceRequest.md)|  |

### Return type

[**Resource**](Resource.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteVenResource"></a>
# **deleteVenResource**
> Resource deleteVenResource(resourceID)

delete  ven resource

Delete the ven resource specified by venID and resourceID specified in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ResourcesApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ResourcesApi apiInstance = new ResourcesApi();
String resourceID = "resourceID_example"; // String | object ID of the resource.
try {
    Resource result = apiInstance.deleteVenResource(resourceID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ResourcesApi#deleteVenResource");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resourceID** | [**String**](.md)| object ID of the resource. |

### Return type

[**Resource**](Resource.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchVenResourceByID"></a>
# **searchVenResourceByID**
> Resource searchVenResourceByID(resourceID)

search ven resources by ID

Return the ven resource specified by venID and resourceID specified in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ResourcesApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ResourcesApi apiInstance = new ResourcesApi();
String resourceID = "resourceID_example"; // String | object ID of the resource.
try {
    Resource result = apiInstance.searchVenResourceByID(resourceID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ResourcesApi#searchVenResourceByID");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resourceID** | [**String**](.md)| object ID of the resource. |

### Return type

[**Resource**](Resource.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchVenResources"></a>
# **searchVenResources**
> List&lt;Resource&gt; searchVenResources(resourceName, venID, targets, skip, limit)

search ven resources

List all ven resources associated with ven with specified venID. May filter results by resourceName as query params. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ResourcesApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ResourcesApi apiInstance = new ResourcesApi();
String resourceName = "resourceName_example"; // String | Indicates resource objects with resourceName
String venID = "venID_example"; // String | Indicates resource objects with venID
List<String> targets = Arrays.asList("targets_example"); // List<String> | Indicates targets
Integer skip = 56; // Integer | number of records to skip for pagination.
Integer limit = 56; // Integer | maximum number of records to return.
try {
    List<Resource> result = apiInstance.searchVenResources(resourceName, venID, targets, skip, limit);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ResourcesApi#searchVenResources");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resourceName** | [**String**](.md)| Indicates resource objects with resourceName | [optional]
 **venID** | [**String**](.md)| Indicates resource objects with venID | [optional]
 **targets** | [**List&lt;String&gt;**](String.md)| Indicates targets | [optional]
 **skip** | **Integer**| number of records to skip for pagination. | [optional] [enum: 0]
 **limit** | **Integer**| maximum number of records to return. | [optional] [enum: 0, 50]

### Return type

[**List&lt;Resource&gt;**](Resource.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateVenResource"></a>
# **updateVenResource**
> Resource updateVenResource(resourceID, body)

update  ven resource

Update the ven resource specified by venID and resourceID specified in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ResourcesApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ResourcesApi apiInstance = new ResourcesApi();
String resourceID = "resourceID_example"; // String | object ID of the resource.
ResourceRequest body = new ResourceRequest(); // ResourceRequest | resource item to update.
try {
    Resource result = apiInstance.updateVenResource(resourceID, body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ResourcesApi#updateVenResource");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resourceID** | [**String**](.md)| object ID of the resource. |
 **body** | [**ResourceRequest**](ResourceRequest.md)| resource item to update. | [optional]

### Return type

[**Resource**](Resource.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

