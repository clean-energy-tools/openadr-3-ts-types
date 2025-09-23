

# SubscriptionRequestObjectOperationsInner

object type, operations, and callbackUrl.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**objects** | **List&lt;ObjectTypes&gt;** | list of objects to subscribe to. |  |
|**operations** | [**List&lt;OperationsEnum&gt;**](#List&lt;OperationsEnum&gt;) | list of operations to subscribe to. |  |
|**callbackUrl** | **URI** | User provided webhook URL. |  |
|**bearerToken** | **String** | User provided token. To avoid custom integrations, callback endpoints should accept the provided bearer token to authenticate VTN requests.  |  [optional] |



## Enum: List&lt;OperationsEnum&gt;

| Name | Value |
|---- | -----|
| READ | &quot;READ&quot; |
| CREATE | &quot;CREATE&quot; |
| UPDATE | &quot;UPDATE&quot; |
| DELETE | &quot;DELETE&quot; |



