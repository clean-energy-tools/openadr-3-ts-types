# AuthApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**fetchToken**](AuthApi.md#fetchToken) | **POST** /auth/token | fetch a token |
| [**fetchTokenWithHttpInfo**](AuthApi.md#fetchTokenWithHttpInfo) | **POST** /auth/token | fetch a token |
| [**getAuthServerInfo**](AuthApi.md#getAuthServerInfo) | **GET** /auth/server | fetch server info |
| [**getAuthServerInfoWithHttpInfo**](AuthApi.md#getAuthServerInfoWithHttpInfo) | **GET** /auth/server | fetch server info |



## fetchToken

> ClientCredentialResponse fetchToken(grantType, clientId, clientSecret, scope)

fetch a token

Return an access token based on clientID and clientSecret.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.AuthApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");

        AuthApi apiInstance = new AuthApi(defaultClient);
        String grantType = "client_credentials"; // String | OAuth2 grant type, must be 'client_credentials'
        String clientId = "clientId_example"; // String | client ID to exchange for bearer token.
        String clientSecret = "clientSecret_example"; // String | client secret to exchange for bearer token.
        String scope = "scope_example"; // String | application defined scope.
        try {
            ClientCredentialResponse result = apiInstance.fetchToken(grantType, clientId, clientSecret, scope);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AuthApi#fetchToken");
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
| **grantType** | **String**| OAuth2 grant type, must be &#39;client_credentials&#39; | [enum: client_credentials] |
| **clientId** | **String**| client ID to exchange for bearer token. | |
| **clientSecret** | **String**| client secret to exchange for bearer token. | |
| **scope** | **String**| application defined scope. | [optional] |

### Return type

[**ClientCredentialResponse**](ClientCredentialResponse.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **500** | Internal server error |  -  |
| **501** | Not implemented |  -  |

## fetchTokenWithHttpInfo

> ApiResponse<ClientCredentialResponse> fetchToken fetchTokenWithHttpInfo(grantType, clientId, clientSecret, scope)

fetch a token

Return an access token based on clientID and clientSecret.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.AuthApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");

        AuthApi apiInstance = new AuthApi(defaultClient);
        String grantType = "client_credentials"; // String | OAuth2 grant type, must be 'client_credentials'
        String clientId = "clientId_example"; // String | client ID to exchange for bearer token.
        String clientSecret = "clientSecret_example"; // String | client secret to exchange for bearer token.
        String scope = "scope_example"; // String | application defined scope.
        try {
            ApiResponse<ClientCredentialResponse> response = apiInstance.fetchTokenWithHttpInfo(grantType, clientId, clientSecret, scope);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling AuthApi#fetchToken");
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
| **grantType** | **String**| OAuth2 grant type, must be &#39;client_credentials&#39; | [enum: client_credentials] |
| **clientId** | **String**| client ID to exchange for bearer token. | |
| **clientSecret** | **String**| client secret to exchange for bearer token. | |
| **scope** | **String**| application defined scope. | [optional] |

### Return type

ApiResponse<[**ClientCredentialResponse**](ClientCredentialResponse.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **400** | The request is malformed or invalid |  -  |
| **401** | Unauthorized |  -  |
| **500** | Internal server error |  -  |
| **501** | Not implemented |  -  |


## getAuthServerInfo

> AuthServerInfo getAuthServerInfo()

fetch server info

Return the URL of the token endpoint.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.AuthApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");

        AuthApi apiInstance = new AuthApi(defaultClient);
        try {
            AuthServerInfo result = apiInstance.getAuthServerInfo();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AuthApi#getAuthServerInfo");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AuthServerInfo**](AuthServerInfo.md)


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **500** | Internal server error |  -  |

## getAuthServerInfoWithHttpInfo

> ApiResponse<AuthServerInfo> getAuthServerInfo getAuthServerInfoWithHttpInfo()

fetch server info

Return the URL of the token endpoint.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.AuthApi;

public class Example {
    public static void main(String[] args) {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath("https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0");

        AuthApi apiInstance = new AuthApi(defaultClient);
        try {
            ApiResponse<AuthServerInfo> response = apiInstance.getAuthServerInfoWithHttpInfo();
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling AuthApi#getAuthServerInfo");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response headers: " + e.getResponseHeaders());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
    }
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

ApiResponse<[**AuthServerInfo**](AuthServerInfo.md)>


### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK. |  -  |
| **500** | Internal server error |  -  |

