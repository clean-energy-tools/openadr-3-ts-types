# ReportPayloadDescriptor

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. | 
**payloadType** | **String** | Represents the nature of values.  See enumerations in Definitions for defined string values, or use privately defined strings  | 
**readingType** | **String** |  |  [optional]
**units** | **String** |  |  [optional]
**accuracy** | **Float** | A quantification of the accuracy of a set of payload values. |  [optional]
**confidence** | **Integer** | A quantification of the confidence in a set of payload values. |  [optional]

<a name="ObjectTypeEnum"></a>
## Enum: ObjectTypeEnum
Name | Value
---- | -----
REPORT_PAYLOAD_DESCRIPTOR | &quot;REPORT_PAYLOAD_DESCRIPTOR&quot;
