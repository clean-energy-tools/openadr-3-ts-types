

# Resource

Server provided representation of resource

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | URL safe VTN assigned object ID. |  |
|**createdDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**modificationDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. |  |
|**clientID** | **String** | ClientID as provisioned by Auhtentication Service and associated with client&#39;s bearer token  |  |
|**targets** | **List&lt;String&gt;** | A list of targets. |  [optional] |
|**resourceName** | **String** | User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource&#39;s data |  |
|**venID** | **String** | URL safe VTN assigned object ID. |  |
|**attributes** | [**List&lt;ValuesMap&gt;**](ValuesMap.md) | A list of valuesMap objects describing attributes. |  [optional] |



## Enum: ObjectTypeEnum

| Name | Value |
|---- | -----|
| BL_RESOURCE_REQUEST | &quot;BL_RESOURCE_REQUEST&quot; |



