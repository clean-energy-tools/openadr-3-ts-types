

# SubscriptionRequest

An object created by a client to receive notification of operations on objects. Clients may subscribe to be notified when a type of object is created, updated, or deleted. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**clientName** | **String** | User generated identifier, may be VEN identifier provisioned out-of-band. |  |
|**programID** | **String** | URL safe VTN assigned object ID. |  [optional] |
|**objectOperations** | [**List&lt;SubscriptionRequestObjectOperationsInner&gt;**](SubscriptionRequestObjectOperationsInner.md) | list of objects and operations to subscribe to. |  |
|**targets** | **List&lt;String&gt;** | A list of target objects. Used by server to filter notifications. |  [optional] |



