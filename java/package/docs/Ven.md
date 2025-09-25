# Ven

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**venObjectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. | 
**clientID** | **String** |  | 
**targets** | **List&lt;String&gt;** | A list of targets. |  [optional]
**venName** | **String** |  | 
**attributes** | [**List&lt;ValuesMap&gt;**](ValuesMap.md) | A list of valuesMap objects describing attributes. |  [optional]

<a name="ObjectTypeEnum"></a>
## Enum: ObjectTypeEnum
Name | Value
---- | -----
BL_VEN_REQUEST | &quot;BL_VEN_REQUEST&quot;
