# SubscriptionsApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSubscription**](SubscriptionsApi.md#createSubscription) | **POST** /subscriptions | create subscription
[**deleteSubscription**](SubscriptionsApi.md#deleteSubscription) | **DELETE** /subscriptions/{subscriptionID} | delete  subscription
[**searchSubscriptionByID**](SubscriptionsApi.md#searchSubscriptionByID) | **GET** /subscriptions/{subscriptionID} | search subscriptions by ID
[**searchSubscriptions**](SubscriptionsApi.md#searchSubscriptions) | **GET** /subscriptions | search subscriptions
[**updateSubscription**](SubscriptionsApi.md#updateSubscription) | **PUT** /subscriptions/{subscriptionID} | update  subscription

<a name="createSubscription"></a>
# **createSubscription**
> Subscription createSubscription(body)

create subscription

Create a new subscription.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.SubscriptionsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

SubscriptionsApi apiInstance = new SubscriptionsApi();
SubscriptionRequest body = new SubscriptionRequest(); // SubscriptionRequest | 
try {
    Subscription result = apiInstance.createSubscription(body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SubscriptionsApi#createSubscription");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SubscriptionRequest**](SubscriptionRequest.md)|  |

### Return type

[**Subscription**](Subscription.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteSubscription"></a>
# **deleteSubscription**
> Subscription deleteSubscription(subscriptionID)

delete  subscription

Delete the subscription specified by subscriptionID specified in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.SubscriptionsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

SubscriptionsApi apiInstance = new SubscriptionsApi();
String subscriptionID = "subscriptionID_example"; // String | object ID of the associated subscription.
try {
    Subscription result = apiInstance.deleteSubscription(subscriptionID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SubscriptionsApi#deleteSubscription");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subscriptionID** | [**String**](.md)| object ID of the associated subscription. |

### Return type

[**Subscription**](Subscription.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchSubscriptionByID"></a>
# **searchSubscriptionByID**
> Subscription searchSubscriptionByID(subscriptionID)

search subscriptions by ID

Return the subscription specified by subscriptionID specified in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.SubscriptionsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

SubscriptionsApi apiInstance = new SubscriptionsApi();
String subscriptionID = "subscriptionID_example"; // String | object ID of the associated subscription.
try {
    Subscription result = apiInstance.searchSubscriptionByID(subscriptionID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SubscriptionsApi#searchSubscriptionByID");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subscriptionID** | [**String**](.md)| object ID of the associated subscription. |

### Return type

[**Subscription**](Subscription.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchSubscriptions"></a>
# **searchSubscriptions**
> List&lt;Subscription&gt; searchSubscriptions(programID, clientName, objects, skip, limit)

search subscriptions

List all subscriptions. May filter results by programID and clientName as query params. May filter results by objects as query param. See objectTypes schema. Use skip and pagination query params to limit response size. 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.SubscriptionsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

SubscriptionsApi apiInstance = new SubscriptionsApi();
String programID = "programID_example"; // String | filter results to subscriptions with programID.
String clientName = "clientName_example"; // String | filter results to subscriptions with clientName.
List<ObjectTypes> objects = Arrays.asList(new ObjectTypes()); // List<ObjectTypes> | list of objects to subscribe to.
Integer skip = 56; // Integer | number of records to skip for pagination.
Integer limit = 56; // Integer | maximum number of records to return.
try {
    List<Subscription> result = apiInstance.searchSubscriptions(programID, clientName, objects, skip, limit);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SubscriptionsApi#searchSubscriptions");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **programID** | [**String**](.md)| filter results to subscriptions with programID. | [optional]
 **clientName** | [**String**](.md)| filter results to subscriptions with clientName. | [optional]
 **objects** | [**List&lt;ObjectTypes&gt;**](ObjectTypes.md)| list of objects to subscribe to. | [optional]
 **skip** | **Integer**| number of records to skip for pagination. | [optional] [enum: 0]
 **limit** | **Integer**| maximum number of records to return. | [optional] [enum: 0, 50]

### Return type

[**List&lt;Subscription&gt;**](Subscription.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateSubscription"></a>
# **updateSubscription**
> Subscription updateSubscription(subscriptionID, body)

update  subscription

Update the subscription specified by subscriptionID specified in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.SubscriptionsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

SubscriptionsApi apiInstance = new SubscriptionsApi();
String subscriptionID = "subscriptionID_example"; // String | object ID of the associated subscription.
SubscriptionRequest body = new SubscriptionRequest(); // SubscriptionRequest | subscription item to update.
try {
    Subscription result = apiInstance.updateSubscription(subscriptionID, body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SubscriptionsApi#updateSubscription");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subscriptionID** | [**String**](.md)| object ID of the associated subscription. |
 **body** | [**SubscriptionRequest**](SubscriptionRequest.md)| subscription item to update. | [optional]

### Return type

[**Subscription**](Subscription.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

