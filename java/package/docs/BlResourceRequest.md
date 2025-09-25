# BlResourceRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. | 
**clientID** | **String** |  | 
**targets** | **List&lt;String&gt;** | A list of targets. |  [optional]
**resourceName** | **String** |  | 
**venID** | **String** |  | 
**attributes** | [**List&lt;ValuesMap&gt;**](ValuesMap.md) | A list of valuesMap objects describing attributes. |  [optional]

<a name="ObjectTypeEnum"></a>
## Enum: ObjectTypeEnum
Name | Value
---- | -----
BL_RESOURCE_REQUEST | &quot;BL_RESOURCE_REQUEST&quot;
