# ProgramsApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createProgram**](ProgramsApi.md#createProgram) | **POST** /programs | create a program |
| [**createProgramWithHttpInfo**](ProgramsApi.md#createProgramWithHttpInfo) | **POST** /programs | create a program |
| [**deleteProgram**](ProgramsApi.md#deleteProgram) | **DELETE** /programs/{programID} | delete a program |
| [**deleteProgramWithHttpInfo**](ProgramsApi.md#deleteProgramWithHttpInfo) | **DELETE** /programs/{programID} | delete a program |
| [**searchAllPrograms**](ProgramsApi.md#searchAllPrograms) | **GET** /programs | searches all programs |
| [**searchAllProgramsWithHttpInfo**](ProgramsApi.md#searchAllProgramsWithHttpInfo) | **GET** /programs | searches all programs |
| [**searchProgramByProgramId**](ProgramsApi.md#searchProgramByProgramId) | **GET** /programs/{programID} | searches programs by program ID |
| [**searchProgramByProgramIdWithHttpInfo**](ProgramsApi.md#searchProgramByProgramIdWithHttpInfo) | **GET** /programs/{programID} | searches programs by program ID |
| [**updateProgram**](ProgramsApi.md#updateProgram) | **PUT** /programs/{programID} | update a program |
| [**updateProgramWithHttpInfo**](ProgramsApi.md#updateProgramWithHttpInfo) | **PUT** /programs/{programID} | update a program |



## createProgram

> Program createProgram(programRequest)

create a program

Create a new program in the server.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        ProgramRequest programRequest = new ProgramRequest(); // ProgramRequest | program item to add.
        try {
            Program result = apiInstance.createProgram(programRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#createProgram");
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
| **programRequest** | [**ProgramRequest**](ProgramRequest.md)| program item to add. | [optional] |

### Return type

[**Program**](Program.md)


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

## createProgramWithHttpInfo

> ApiResponse<Program> createProgram createProgramWithHttpInfo(programRequest)

create a program

Create a new program in the server.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        ProgramRequest programRequest = new ProgramRequest(); // ProgramRequest | program item to add.
        try {
            ApiResponse<Program> response = apiInstance.createProgramWithHttpInfo(programRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#createProgram");
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
| **programRequest** | [**ProgramRequest**](ProgramRequest.md)| program item to add. | [optional] |

### Return type

ApiResponse<[**Program**](Program.md)>


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


## deleteProgram

> Program deleteProgram(programID)

delete a program

Delete an existing program with the programID in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        String programID = "programID_example"; // String | Object ID of the program object.
        try {
            Program result = apiInstance.deleteProgram(programID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#deleteProgram");
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
| **programID** | **String**| Object ID of the program object. | |

### Return type

[**Program**](Program.md)


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

## deleteProgramWithHttpInfo

> ApiResponse<Program> deleteProgram deleteProgramWithHttpInfo(programID)

delete a program

Delete an existing program with the programID in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        String programID = "programID_example"; // String | Object ID of the program object.
        try {
            ApiResponse<Program> response = apiInstance.deleteProgramWithHttpInfo(programID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#deleteProgram");
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
| **programID** | **String**| Object ID of the program object. | |

### Return type

ApiResponse<[**Program**](Program.md)>


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


## searchAllPrograms

> List<Program> searchAllPrograms(targets, skip, limit)

searches all programs

List all programs known to the server. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        List<@Size(min = 1, max = 128)String> targets = Arrays.asList(); // List<@Size(min = 1, max = 128)String> | Indicates targets
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        try {
            List<Program> result = apiInstance.searchAllPrograms(targets, skip, limit);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#searchAllPrograms");
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
| **targets** | [**List&lt;@Size(min &#x3D; 1, max &#x3D; 128)String&gt;**](String.md)| Indicates targets | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |

### Return type

[**List&lt;Program&gt;**](Program.md)


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

## searchAllProgramsWithHttpInfo

> ApiResponse<List<Program>> searchAllPrograms searchAllProgramsWithHttpInfo(targets, skip, limit)

searches all programs

List all programs known to the server. May filter results by targets params. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        List<@Size(min = 1, max = 128)String> targets = Arrays.asList(); // List<@Size(min = 1, max = 128)String> | Indicates targets
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        try {
            ApiResponse<List<Program>> response = apiInstance.searchAllProgramsWithHttpInfo(targets, skip, limit);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#searchAllPrograms");
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
| **targets** | [**List&lt;@Size(min &#x3D; 1, max &#x3D; 128)String&gt;**](String.md)| Indicates targets | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |

### Return type

ApiResponse<[**List&lt;Program&gt;**](Program.md)>


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


## searchProgramByProgramId

> Program searchProgramByProgramId(programID)

searches programs by program ID

Fetch the program specified by the programID in path. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        String programID = "programID_example"; // String | Object ID of the program object.
        try {
            Program result = apiInstance.searchProgramByProgramId(programID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#searchProgramByProgramId");
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
| **programID** | **String**| Object ID of the program object. | |

### Return type

[**Program**](Program.md)


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

## searchProgramByProgramIdWithHttpInfo

> ApiResponse<Program> searchProgramByProgramId searchProgramByProgramIdWithHttpInfo(programID)

searches programs by program ID

Fetch the program specified by the programID in path. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        String programID = "programID_example"; // String | Object ID of the program object.
        try {
            ApiResponse<Program> response = apiInstance.searchProgramByProgramIdWithHttpInfo(programID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#searchProgramByProgramId");
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
| **programID** | **String**| Object ID of the program object. | |

### Return type

ApiResponse<[**Program**](Program.md)>


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


## updateProgram

> Program updateProgram(programID, programRequest)

update a program

Update an existing program with the programID in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        String programID = "programID_example"; // String | Object ID of the program object.
        ProgramRequest programRequest = new ProgramRequest(); // ProgramRequest | program item to update.
        try {
            Program result = apiInstance.updateProgram(programID, programRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#updateProgram");
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
| **programID** | **String**| Object ID of the program object. | |
| **programRequest** | [**ProgramRequest**](ProgramRequest.md)| program item to update. | [optional] |

### Return type

[**Program**](Program.md)


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | Bad Request. |  -  |
| **403** | Forbidden. |  -  |
| **404** | Not Found. |  -  |
| **409** | Conflict. Implementation dependent response if program with the same programName exists. |  -  |
| **500** | Internal Server Error. |  -  |

## updateProgramWithHttpInfo

> ApiResponse<Program> updateProgram updateProgramWithHttpInfo(programID, programRequest)

update a program

Update an existing program with the programID in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.ProgramsApi;

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

        ProgramsApi apiInstance = new ProgramsApi(defaultClient);
        String programID = "programID_example"; // String | Object ID of the program object.
        ProgramRequest programRequest = new ProgramRequest(); // ProgramRequest | program item to update.
        try {
            ApiResponse<Program> response = apiInstance.updateProgramWithHttpInfo(programID, programRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling ProgramsApi#updateProgram");
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
| **programID** | **String**| Object ID of the program object. | |
| **programRequest** | [**ProgramRequest**](ProgramRequest.md)| program item to update. | [optional] |

### Return type

ApiResponse<[**Program**](Program.md)>


### Authorization

[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | Bad Request. |  -  |
| **403** | Forbidden. |  -  |
| **404** | Not Found. |  -  |
| **409** | Conflict. Implementation dependent response if program with the same programName exists. |  -  |
| **500** | Internal Server Error. |  -  |

