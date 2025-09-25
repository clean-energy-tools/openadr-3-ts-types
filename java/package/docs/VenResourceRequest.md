# VenResourceRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. | 
**resourceName** | **String** |  | 
**venID** | **String** |  | 
**attributes** | [**List&lt;ValuesMap&gt;**](ValuesMap.md) | A list of valuesMap objects describing attributes. |  [optional]

<a name="ObjectTypeEnum"></a>
## Enum: ObjectTypeEnum
Name | Value
---- | -----
VEN_RESOURCE_REQUEST | &quot;VEN_RESOURCE_REQUEST&quot;
