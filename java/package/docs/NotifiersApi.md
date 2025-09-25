# NotifiersApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listAllNotifiers**](NotifiersApi.md#listAllNotifiers) | **GET** /notifiers | List all notifier bindings

<a name="listAllNotifiers"></a>
# **listAllNotifiers**
> NotifiersResponse listAllNotifiers()

List all notifier bindings

List all notifier bindings supported by the server 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.NotifiersApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

NotifiersApi apiInstance = new NotifiersApi();
try {
    NotifiersResponse result = apiInstance.listAllNotifiers();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling NotifiersApi#listAllNotifiers");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**NotifiersResponse**](NotifiersResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

