# VensApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createVen**](VensApi.md#createVen) | **POST** /vens | create ven |
| [**createVenWithHttpInfo**](VensApi.md#createVenWithHttpInfo) | **POST** /vens | create ven |
| [**deleteVen**](VensApi.md#deleteVen) | **DELETE** /vens/{venID} | delete  ven |
| [**deleteVenWithHttpInfo**](VensApi.md#deleteVenWithHttpInfo) | **DELETE** /vens/{venID} | delete  ven |
| [**searchVenByID**](VensApi.md#searchVenByID) | **GET** /vens/{venID} | search vens by ID |
| [**searchVenByIDWithHttpInfo**](VensApi.md#searchVenByIDWithHttpInfo) | **GET** /vens/{venID} | search vens by ID |
| [**searchVens**](VensApi.md#searchVens) | **GET** /vens | search vens |
| [**searchVensWithHttpInfo**](VensApi.md#searchVensWithHttpInfo) | **GET** /vens | search vens |
| [**updateVen**](VensApi.md#updateVen) | **PUT** /vens/{venID} | update  ven |
| [**updateVenWithHttpInfo**](VensApi.md#updateVenWithHttpInfo) | **PUT** /vens/{venID} | update  ven |



## createVen

> Ven createVen(venRequest)

create ven

Create a new ven.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        VenRequest venRequest = new VenRequest(); // VenRequest | 
        try {
            Ven result = apiInstance.createVen(venRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#createVen");
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
| **venRequest** | [**VenRequest**](VenRequest.md)|  | |

### Return type

[**Ven**](Ven.md)


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
| **500** | Internal server error |  -  |

## createVenWithHttpInfo

> ApiResponse<Ven> createVen createVenWithHttpInfo(venRequest)

create ven

Create a new ven.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        VenRequest venRequest = new VenRequest(); // VenRequest | 
        try {
            ApiResponse<Ven> response = apiInstance.createVenWithHttpInfo(venRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#createVen");
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
| **venRequest** | [**VenRequest**](VenRequest.md)|  | |

### Return type

ApiResponse<[**Ven**](Ven.md)>


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
| **500** | Internal server error |  -  |


## deleteVen

> Ven deleteVen(venID)

delete  ven

Delete the ven specified by venID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        String venID = "venID_example"; // String | object ID of ven.
        try {
            Ven result = apiInstance.deleteVen(venID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#deleteVen");
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
| **venID** | **String**| object ID of ven. | |

### Return type

[**Ven**](Ven.md)


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

## deleteVenWithHttpInfo

> ApiResponse<Ven> deleteVen deleteVenWithHttpInfo(venID)

delete  ven

Delete the ven specified by venID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        String venID = "venID_example"; // String | object ID of ven.
        try {
            ApiResponse<Ven> response = apiInstance.deleteVenWithHttpInfo(venID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#deleteVen");
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
| **venID** | **String**| object ID of ven. | |

### Return type

ApiResponse<[**Ven**](Ven.md)>


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


## searchVenByID

> Ven searchVenByID(venID)

search vens by ID

Return the ven specified by venID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        String venID = "venID_example"; // String | object ID of ven.
        try {
            Ven result = apiInstance.searchVenByID(venID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#searchVenByID");
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
| **venID** | **String**| object ID of ven. | |

### Return type

[**Ven**](Ven.md)


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

## searchVenByIDWithHttpInfo

> ApiResponse<Ven> searchVenByID searchVenByIDWithHttpInfo(venID)

search vens by ID

Return the ven specified by venID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        String venID = "venID_example"; // String | object ID of ven.
        try {
            ApiResponse<Ven> response = apiInstance.searchVenByIDWithHttpInfo(venID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#searchVenByID");
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
| **venID** | **String**| object ID of ven. | |

### Return type

ApiResponse<[**Ven**](Ven.md)>


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


## searchVens

> List<Ven> searchVens(venName, targets, skip, limit)

search vens

List all vens. May filter results by venName as query param. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        String venName = "venName_example"; // String | Indicates ven objects w venName
        List<@Size(min = 1, max = 128)String> targets = Arrays.asList(); // List<@Size(min = 1, max = 128)String> | Indicates targets
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        try {
            List<Ven> result = apiInstance.searchVens(venName, targets, skip, limit);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#searchVens");
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
| **venName** | **String**| Indicates ven objects w venName | [optional] |
| **targets** | [**List&lt;@Size(min &#x3D; 1, max &#x3D; 128)String&gt;**](String.md)| Indicates targets | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |

### Return type

[**List&lt;Ven&gt;**](Ven.md)


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

## searchVensWithHttpInfo

> ApiResponse<List<Ven>> searchVens searchVensWithHttpInfo(venName, targets, skip, limit)

search vens

List all vens. May filter results by venName as query param. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        String venName = "venName_example"; // String | Indicates ven objects w venName
        List<@Size(min = 1, max = 128)String> targets = Arrays.asList(); // List<@Size(min = 1, max = 128)String> | Indicates targets
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        try {
            ApiResponse<List<Ven>> response = apiInstance.searchVensWithHttpInfo(venName, targets, skip, limit);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#searchVens");
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
| **venName** | **String**| Indicates ven objects w venName | [optional] |
| **targets** | [**List&lt;@Size(min &#x3D; 1, max &#x3D; 128)String&gt;**](String.md)| Indicates targets | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |

### Return type

ApiResponse<[**List&lt;Ven&gt;**](Ven.md)>


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


## updateVen

> Ven updateVen(venID, venRequest)

update  ven

Update the ven specified by venID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        String venID = "venID_example"; // String | object ID of ven.
        VenRequest venRequest = new VenRequest(); // VenRequest | ven item to update.
        try {
            Ven result = apiInstance.updateVen(venID, venRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#updateVen");
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
| **venID** | **String**| object ID of ven. | |
| **venRequest** | [**VenRequest**](VenRequest.md)| ven item to update. | [optional] |

### Return type

[**Ven**](Ven.md)


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

## updateVenWithHttpInfo

> ApiResponse<Ven> updateVen updateVenWithHttpInfo(venID, venRequest)

update  ven

Update the ven specified by venID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.VensApi;

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

        VensApi apiInstance = new VensApi(defaultClient);
        String venID = "venID_example"; // String | object ID of ven.
        VenRequest venRequest = new VenRequest(); // VenRequest | ven item to update.
        try {
            ApiResponse<Ven> response = apiInstance.updateVenWithHttpInfo(venID, venRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling VensApi#updateVen");
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
| **venID** | **String**| object ID of ven. | |
| **venRequest** | [**VenRequest**](VenRequest.md)| ven item to update. | [optional] |

### Return type

ApiResponse<[**Ven**](Ven.md)>


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

