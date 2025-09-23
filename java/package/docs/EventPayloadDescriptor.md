

# EventPayloadDescriptor

Contextual information used to interpret event valuesMap values. E.g. a PRICE payload simply contains a price value, an associated descriptor provides necessary context such as units and currency. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. |  |
|**payloadType** | **String** | Represents the nature of values.  See enumerations in Definitions for defined string values, or use privately defined strings  |  |
|**units** | **String** | Units of measure. |  [optional] |
|**currency** | **String** | Currency of price payload. |  [optional] |



## Enum: ObjectTypeEnum

| Name | Value |
|---- | -----|
| EVENT_PAYLOAD_DESCRIPTOR | &quot;EVENT_PAYLOAD_DESCRIPTOR&quot; |



