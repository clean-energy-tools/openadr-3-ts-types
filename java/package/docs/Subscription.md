

# Subscription

Server provided representation of subscription

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | URL safe VTN assigned object ID. |  |
|**createdDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**modificationDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**objectType** | **ObjectTypes** |  |  |
|**clientName** | **String** | User generated identifier, may be VEN identifier provisioned out-of-band. |  |
|**programID** | **String** | URL safe VTN assigned object ID. |  [optional] |
|**objectOperations** | [**List&lt;SubscriptionRequestObjectOperationsInner&gt;**](SubscriptionRequestObjectOperationsInner.md) | list of objects and operations to subscribe to. |  |
|**targets** | **List&lt;String&gt;** | A list of target objects. Used by server to filter notifications. |  [optional] |
|**clientID** | **String** | ClientID as provisioned by Auhtentication Service and associated with client&#39;s bearer token  |  |



