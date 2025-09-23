# SubscriptionsApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createSubscription**](SubscriptionsApi.md#createSubscription) | **POST** /subscriptions | create subscription |
| [**createSubscriptionWithHttpInfo**](SubscriptionsApi.md#createSubscriptionWithHttpInfo) | **POST** /subscriptions | create subscription |
| [**deleteSubscription**](SubscriptionsApi.md#deleteSubscription) | **DELETE** /subscriptions/{subscriptionID} | delete  subscription |
| [**deleteSubscriptionWithHttpInfo**](SubscriptionsApi.md#deleteSubscriptionWithHttpInfo) | **DELETE** /subscriptions/{subscriptionID} | delete  subscription |
| [**searchSubscriptionByID**](SubscriptionsApi.md#searchSubscriptionByID) | **GET** /subscriptions/{subscriptionID} | search subscriptions by ID |
| [**searchSubscriptionByIDWithHttpInfo**](SubscriptionsApi.md#searchSubscriptionByIDWithHttpInfo) | **GET** /subscriptions/{subscriptionID} | search subscriptions by ID |
| [**searchSubscriptions**](SubscriptionsApi.md#searchSubscriptions) | **GET** /subscriptions | search subscriptions |
| [**searchSubscriptionsWithHttpInfo**](SubscriptionsApi.md#searchSubscriptionsWithHttpInfo) | **GET** /subscriptions | search subscriptions |
| [**updateSubscription**](SubscriptionsApi.md#updateSubscription) | **PUT** /subscriptions/{subscriptionID} | update  subscription |
| [**updateSubscriptionWithHttpInfo**](SubscriptionsApi.md#updateSubscriptionWithHttpInfo) | **PUT** /subscriptions/{subscriptionID} | update  subscription |



## createSubscription

> Subscription createSubscription(subscriptionRequest)

create subscription

Create a new subscription.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest(); // SubscriptionRequest | 
        try {
            Subscription result = apiInstance.createSubscription(subscriptionRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#createSubscription");
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
| **subscriptionRequest** | [**SubscriptionRequest**](SubscriptionRequest.md)|  | |

### Return type

[**Subscription**](Subscription.md)


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

## createSubscriptionWithHttpInfo

> ApiResponse<Subscription> createSubscription createSubscriptionWithHttpInfo(subscriptionRequest)

create subscription

Create a new subscription.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest(); // SubscriptionRequest | 
        try {
            ApiResponse<Subscription> response = apiInstance.createSubscriptionWithHttpInfo(subscriptionRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#createSubscription");
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
| **subscriptionRequest** | [**SubscriptionRequest**](SubscriptionRequest.md)|  | |

### Return type

ApiResponse<[**Subscription**](Subscription.md)>


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


## deleteSubscription

> Subscription deleteSubscription(subscriptionID)

delete  subscription

Delete the subscription specified by subscriptionID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        String subscriptionID = "subscriptionID_example"; // String | object ID of the associated subscription.
        try {
            Subscription result = apiInstance.deleteSubscription(subscriptionID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#deleteSubscription");
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
| **subscriptionID** | **String**| object ID of the associated subscription. | |

### Return type

[**Subscription**](Subscription.md)


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

## deleteSubscriptionWithHttpInfo

> ApiResponse<Subscription> deleteSubscription deleteSubscriptionWithHttpInfo(subscriptionID)

delete  subscription

Delete the subscription specified by subscriptionID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        String subscriptionID = "subscriptionID_example"; // String | object ID of the associated subscription.
        try {
            ApiResponse<Subscription> response = apiInstance.deleteSubscriptionWithHttpInfo(subscriptionID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#deleteSubscription");
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
| **subscriptionID** | **String**| object ID of the associated subscription. | |

### Return type

ApiResponse<[**Subscription**](Subscription.md)>


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


## searchSubscriptionByID

> Subscription searchSubscriptionByID(subscriptionID)

search subscriptions by ID

Return the subscription specified by subscriptionID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        String subscriptionID = "subscriptionID_example"; // String | object ID of the associated subscription.
        try {
            Subscription result = apiInstance.searchSubscriptionByID(subscriptionID);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#searchSubscriptionByID");
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
| **subscriptionID** | **String**| object ID of the associated subscription. | |

### Return type

[**Subscription**](Subscription.md)


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

## searchSubscriptionByIDWithHttpInfo

> ApiResponse<Subscription> searchSubscriptionByID searchSubscriptionByIDWithHttpInfo(subscriptionID)

search subscriptions by ID

Return the subscription specified by subscriptionID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        String subscriptionID = "subscriptionID_example"; // String | object ID of the associated subscription.
        try {
            ApiResponse<Subscription> response = apiInstance.searchSubscriptionByIDWithHttpInfo(subscriptionID);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#searchSubscriptionByID");
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
| **subscriptionID** | **String**| object ID of the associated subscription. | |

### Return type

ApiResponse<[**Subscription**](Subscription.md)>


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


## searchSubscriptions

> List<Subscription> searchSubscriptions(programID, clientName, objects, skip, limit)

search subscriptions

List all subscriptions. May filter results by programID and clientName as query params. May filter results by objects as query param. See objectTypes schema. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        String programID = "programID_example"; // String | filter results to subscriptions with programID.
        String clientName = "clientName_example"; // String | filter results to subscriptions with clientName.
        List<ObjectTypes> objects = Arrays.asList(); // List<ObjectTypes> | list of objects to subscribe to.
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        try {
            List<Subscription> result = apiInstance.searchSubscriptions(programID, clientName, objects, skip, limit);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#searchSubscriptions");
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
| **programID** | **String**| filter results to subscriptions with programID. | [optional] |
| **clientName** | **String**| filter results to subscriptions with clientName. | [optional] |
| **objects** | [**List&lt;ObjectTypes&gt;**](ObjectTypes.md)| list of objects to subscribe to. | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |

### Return type

[**List&lt;Subscription&gt;**](Subscription.md)


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

## searchSubscriptionsWithHttpInfo

> ApiResponse<List<Subscription>> searchSubscriptions searchSubscriptionsWithHttpInfo(programID, clientName, objects, skip, limit)

search subscriptions

List all subscriptions. May filter results by programID and clientName as query params. May filter results by objects as query param. See objectTypes schema. Use skip and pagination query params to limit response size. 

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        String programID = "programID_example"; // String | filter results to subscriptions with programID.
        String clientName = "clientName_example"; // String | filter results to subscriptions with clientName.
        List<ObjectTypes> objects = Arrays.asList(); // List<ObjectTypes> | list of objects to subscribe to.
        Integer skip = 56; // Integer | number of records to skip for pagination.
        Integer limit = 56; // Integer | maximum number of records to return.
        try {
            ApiResponse<List<Subscription>> response = apiInstance.searchSubscriptionsWithHttpInfo(programID, clientName, objects, skip, limit);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#searchSubscriptions");
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
| **programID** | **String**| filter results to subscriptions with programID. | [optional] |
| **clientName** | **String**| filter results to subscriptions with clientName. | [optional] |
| **objects** | [**List&lt;ObjectTypes&gt;**](ObjectTypes.md)| list of objects to subscribe to. | [optional] |
| **skip** | **Integer**| number of records to skip for pagination. | [optional] |
| **limit** | **Integer**| maximum number of records to return. | [optional] |

### Return type

ApiResponse<[**List&lt;Subscription&gt;**](Subscription.md)>


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


## updateSubscription

> Subscription updateSubscription(subscriptionID, subscriptionRequest)

update  subscription

Update the subscription specified by subscriptionID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        String subscriptionID = "subscriptionID_example"; // String | object ID of the associated subscription.
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest(); // SubscriptionRequest | subscription item to update.
        try {
            Subscription result = apiInstance.updateSubscription(subscriptionID, subscriptionRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#updateSubscription");
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
| **subscriptionID** | **String**| object ID of the associated subscription. | |
| **subscriptionRequest** | [**SubscriptionRequest**](SubscriptionRequest.md)| subscription item to update. | [optional] |

### Return type

[**Subscription**](Subscription.md)


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

## updateSubscriptionWithHttpInfo

> ApiResponse<Subscription> updateSubscription updateSubscriptionWithHttpInfo(subscriptionID, subscriptionRequest)

update  subscription

Update the subscription specified by subscriptionID specified in path.

### Example

```java
// Import classes:
import io.github.clean_energy_tools.openadr_3_types.client.ApiClient;
import io.github.clean_energy_tools.openadr_3_types.client.ApiException;
import io.github.clean_energy_tools.openadr_3_types.client.ApiResponse;
import io.github.clean_energy_tools.openadr_3_types.client.Configuration;
import io.github.clean_energy_tools.openadr_3_types.client.auth.*;
import io.github.clean_energy_tools.openadr_3_types.client.models.*;
import io.github.clean_energy_tools.openadr_3_types.api.SubscriptionsApi;

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

        SubscriptionsApi apiInstance = new SubscriptionsApi(defaultClient);
        String subscriptionID = "subscriptionID_example"; // String | object ID of the associated subscription.
        SubscriptionRequest subscriptionRequest = new SubscriptionRequest(); // SubscriptionRequest | subscription item to update.
        try {
            ApiResponse<Subscription> response = apiInstance.updateSubscriptionWithHttpInfo(subscriptionID, subscriptionRequest);
            System.out.println("Status code: " + response.getStatusCode());
            System.out.println("Response headers: " + response.getHeaders());
            System.out.println("Response body: " + response.getData());
        } catch (ApiException e) {
            System.err.println("Exception when calling SubscriptionsApi#updateSubscription");
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
| **subscriptionID** | **String**| object ID of the associated subscription. | |
| **subscriptionRequest** | [**SubscriptionRequest**](SubscriptionRequest.md)| subscription item to update. | [optional] |

### Return type

ApiResponse<[**Subscription**](Subscription.md)>


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

