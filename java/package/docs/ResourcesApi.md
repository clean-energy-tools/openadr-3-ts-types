# ResourcesApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createResource**](ResourcesApi.md#createResource) | **POST** /resources | create resource |
| [**createResourceWithHttpInfo**](ResourcesApi.md#createResourceWithHttpInfo) | **POST** /resources | create resource |
| [**deleteVenResource**](ResourcesApi.md#deleteVenResource) | **DELETE** /resources/{resourceID} | delete  ven resource |
| [**deleteVenResourceWithHttpInfo**](ResourcesApi.md#deleteVenResourceWithHttpInfo) | **DELETE** /resources/{resourceID} | delete  ven resource |
| [**searchVenResourceByID**](ResourcesApi.md#searchVenResourceByID) | **GET** /resources/{resourceID} | search ven resources by ID |
| [**searchVenResourceByIDWithHttpInfo**](ResourcesApi.md#searchVenResourceByIDWithHttpInfo) | **GET** /resources/{resourceID} | search ven resources by ID |
| [**searchVenResources**](ResourcesApi.md#searchVenResources) | **GET** /resources | search ven resources |
| [**searchVenResourcesWithHttpInfo**](ResourcesApi.md#searchVenResourcesWithHttpInfo) | **GET** /resources | search ven resources |
| [**updateVenResource**](ResourcesApi.md#updateVenResource) | **PUT** /resources/{resourceID} | update  ven resource |
| [**updateVenResourceWithHttpInfo**](ResourcesApi.md#updateVenResourceWithHttpInfo) | **PUT** /resources/{resourceID} | update  ven resource |



## createResource

> Resource createResource(resourceRequest)

create resource

Create a new resource.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        ResourceRequest resourceRequest = new ResourceRequest(); // ResourceRequest | 
        try {
            Resource result = apiInstance.createResource(resourceRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#createResource");
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
| **resourceRequest** | [**ResourceRequest**](ResourceRequest.md)|  | |

### Return type

[**Resource**](Resource.md)


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
| **404** | The specified resource was not found |  -  |
| **409** | Conflict. Could for example be a violation of a foreign key constraint or of a unique constraint on a name or id. |  -  |
| **500** | Internal server error |  -  |

## createResourceWithHttpInfo

> ApiResponse<Resource> createResource createResourceWithHttpInfo(resourceRequest)

create resource

Create a new resource.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        ResourceRequest resourceRequest = new ResourceRequest(); // ResourceRequest | 
        try {
            ApiResponse<Resource> response = apiInstance.createResourceWithHttpInfo(resourceRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#createResource");
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
| **resourceRequest** | [**ResourceRequest**](ResourceRequest.md)|  | |

### Return type

ApiResponse<[**Resource**](Resource.md)>


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
| **404** | The specified resource was not found |  -  |
| **409** | Conflict. Could for example be a violation of a foreign key constraint or of a unique constraint on a name or id. |  -  |
| **500** | Internal server error |  -  |


## deleteVenResource

> Resource deleteVenResource(resourceID)

delete  ven resource

Delete the ven resource specified by venID and resourceID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        String resourceID = "resourceID_example"; // String | object ID of the resource.
        try {
            Resource result = apiInstance.deleteVenResource(resourceID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#deleteVenResource");
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
| **resourceID** | **String**| object ID of the resource. | |

### Return type

[**Resource**](Resource.md)


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

## deleteVenResourceWithHttpInfo

> ApiResponse<Resource> deleteVenResource deleteVenResourceWithHttpInfo(resourceID)

delete  ven resource

Delete the ven resource specified by venID and resourceID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        String resourceID = "resourceID_example"; // String | object ID of the resource.
        try {
            ApiResponse<Resource> response = apiInstance.deleteVenResourceWithHttpInfo(resourceID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#deleteVenResource");
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
| **resourceID** | **String**| object ID of the resource. | |

### Return type

ApiResponse<[**Resource**](Resource.md)>


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


## searchVenResourceByID

> Resource searchVenResourceByID(resourceID)

search ven resources by ID

Return the ven resource specified by venID and resourceID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        String resourceID = "resourceID_example"; // String | object ID of the resource.
        try {
            Resource result = apiInstance.searchVenResourceByID(resourceID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#searchVenResourceByID");
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
| **resourceID** | **String**| object ID of the resource. | |

### Return type

[**Resource**](Resource.md)


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

## searchVenResourceByIDWithHttpInfo

> ApiResponse<Resource> searchVenResourceByID searchVenResourceByIDWithHttpInfo(resourceID)

search ven resources by ID

Return the ven resource specified by venID and resourceID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        String resourceID = "resourceID_example"; // String | object ID of the resource.
        try {
            ApiResponse<Resource> response = apiInstance.searchVenResourceByIDWithHttpInfo(resourceID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#searchVenResourceByID");
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
| **resourceID** | **String**| object ID of the resource. | |

### Return type

ApiResponse<[**Resource**](Resource.md)>


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


## searchVenResources

> List<Resource> searchVenResources(resourceName, venID, targets, skip, limit)

search ven resources

List all ven resources associated with ven with specified venID. May filter results by resourceName as query params. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        String resourceName = "resourceName_example"; // String | Indicates resource objects with resourceName
        String venID = "venID_example"; // String | Indicates resource objects with venID
        List<@Size(min = 1, max = 128)String> targets = Arrays.asList(); // List<@Size(min = 1, max = 128)String> | Indicates targets
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        try {
            List<Resource> result = apiInstance.searchVenResources(resourceName, venID, targets, skip, limit);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#searchVenResources");
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
| **resourceName** | **String**| Indicates resource objects with resourceName | [optional] |
| **venID** | **String**| Indicates resource objects with venID | [optional] |
| **targets** | [**List&lt;@Size(min &#x3D; 1, max &#x3D; 128)String&gt;**](String.md)| Indicates targets | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |

### Return type

[**List&lt;Resource&gt;**](Resource.md)


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

## searchVenResourcesWithHttpInfo

> ApiResponse<List<Resource>> searchVenResources searchVenResourcesWithHttpInfo(resourceName, venID, targets, skip, limit)

search ven resources

List all ven resources associated with ven with specified venID. May filter results by resourceName as query params. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        String resourceName = "resourceName_example"; // String | Indicates resource objects with resourceName
        String venID = "venID_example"; // String | Indicates resource objects with venID
        List<@Size(min = 1, max = 128)String> targets = Arrays.asList(); // List<@Size(min = 1, max = 128)String> | Indicates targets
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        try {
            ApiResponse<List<Resource>> response = apiInstance.searchVenResourcesWithHttpInfo(resourceName, venID, targets, skip, limit);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#searchVenResources");
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
| **resourceName** | **String**| Indicates resource objects with resourceName | [optional] |
| **venID** | **String**| Indicates resource objects with venID | [optional] |
| **targets** | [**List&lt;@Size(min &#x3D; 1, max &#x3D; 128)String&gt;**](String.md)| Indicates targets | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |

### Return type

ApiResponse<[**List&lt;Resource&gt;**](Resource.md)>


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


## updateVenResource

> Resource updateVenResource(resourceID, resourceRequest)

update  ven resource

Update the ven resource specified by venID and resourceID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        String resourceID = "resourceID_example"; // String | object ID of the resource.
        ResourceRequest resourceRequest = new ResourceRequest(); // ResourceRequest | resource item to update.
        try {
            Resource result = apiInstance.updateVenResource(resourceID, resourceRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#updateVenResource");
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
| **resourceID** | **String**| object ID of the resource. | |
| **resourceRequest** | [**ResourceRequest**](ResourceRequest.md)| resource item to update. | [optional] |

### Return type

[**Resource**](Resource.md)


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

## updateVenResourceWithHttpInfo

> ApiResponse<Resource> updateVenResource updateVenResourceWithHttpInfo(resourceID, resourceRequest)

update  ven resource

Update the ven resource specified by venID and resourceID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ResourcesApi;

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

        ResourcesApi apiInstance = new ResourcesApi(defaultClient);
        String resourceID = "resourceID_example"; // String | object ID of the resource.
        ResourceRequest resourceRequest = new ResourceRequest(); // ResourceRequest | resource item to update.
        try {
            ApiResponse<Resource> response = apiInstance.updateVenResourceWithHttpInfo(resourceID, resourceRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ResourcesApi#updateVenResource");
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
| **resourceID** | **String**| object ID of the resource. | |
| **resourceRequest** | [**ResourceRequest**](ResourceRequest.md)| resource item to update. | [optional] |

### Return type

ApiResponse<[**Resource**](Resource.md)>


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

