

# VenVenRequest

VEN provided representation of ven.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. |  |
|**venName** | **String** | User generated identifier, may be VEN identifier provisioned out-of-band. venName is expected to be unique within the scope of a VTN  |  |
|**attributes** | [**List&lt;ValuesMap&gt;**](ValuesMap.md) | A list of valuesMap objects describing attributes. |  [optional] |



## Enum: ObjectTypeEnum

| Name | Value |
|---- | -----|
| VEN_VEN_REQUEST | &quot;VEN_VEN_REQUEST&quot; |



