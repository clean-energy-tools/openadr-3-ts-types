# AuthApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**fetchToken**](AuthApi.md#fetchToken) | **POST** /auth/token | fetch a token
[**getAuthServerInfo**](AuthApi.md#getAuthServerInfo) | **GET** /auth/server | fetch server info

<a name="fetchToken"></a>
# **fetchToken**
> ClientCredentialResponse fetchToken(grantType, clientId, clientSecret, scope)

fetch a token

Return an access token based on clientID and clientSecret.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.AuthApi;


AuthApi apiInstance = new AuthApi();
String grantType = "grantType_example"; // String | 
String clientId = "clientId_example"; // String | 
String clientSecret = "clientSecret_example"; // String | 
String scope = "scope_example"; // String | 
try {
    ClientCredentialResponse result = apiInstance.fetchToken(grantType, clientId, clientSecret, scope);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling AuthApi#fetchToken");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **grantType** | **String**|  | [enum: client_credentials]
 **clientId** | **String**|  |
 **clientSecret** | **String**|  |
 **scope** | **String**|  |

### Return type

[**ClientCredentialResponse**](ClientCredentialResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

<a name="getAuthServerInfo"></a>
# **getAuthServerInfo**
> AuthServerInfo getAuthServerInfo()

fetch server info

Return the URL of the token endpoint.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.AuthApi;


AuthApi apiInstance = new AuthApi();
try {
    AuthServerInfo result = apiInstance.getAuthServerInfo();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling AuthApi#getAuthServerInfo");
    e.printStackTrace();
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

