# EventPayloadDescriptor

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. | 
**payloadType** | **String** | Represents the nature of values.  See enumerations in Definitions for defined string values, or use privately defined strings  | 
**units** | **String** |  |  [optional]
**currency** | **String** | Currency of price payload. |  [optional]

<a name="ObjectTypeEnum"></a>
## Enum: ObjectTypeEnum
Name | Value
---- | -----
EVENT_PAYLOAD_DESCRIPTOR | &quot;EVENT_PAYLOAD_DESCRIPTOR&quot;
