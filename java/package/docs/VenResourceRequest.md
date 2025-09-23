

# VenResourceRequest

Business Logic provided representation of ven resource. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. |  |
|**resourceName** | **String** | User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource&#39;s data |  |
|**venID** | **String** | URL safe VTN assigned object ID. |  |
|**attributes** | [**List&lt;ValuesMap&gt;**](ValuesMap.md) | A list of valuesMap objects describing attributes. |  [optional] |



## Enum: ObjectTypeEnum

| Name | Value |
|---- | -----|
| VEN_RESOURCE_REQUEST | &quot;VEN_RESOURCE_REQUEST&quot; |



