

# ReportPayloadDescriptor

Contextual information used to interpret report payload values. E.g. a USAGE payload simply contains a usage value, an associated descriptor provides necessary context such as units and data quality. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. |  |
|**payloadType** | **String** | Represents the nature of values.  See enumerations in Definitions for defined string values, or use privately defined strings  |  |
|**readingType** | **String** | Represents the type of reading.  See enumerations in Definitions for defined string values, or use privately defined strings  |  [optional] |
|**units** | **String** | Units of measure. |  [optional] |
|**accuracy** | **Float** | A quantification of the accuracy of a set of payload values. |  [optional] |
|**confidence** | **Integer** | A quantification of the confidence in a set of payload values. |  [optional] |



## Enum: ObjectTypeEnum

| Name | Value |
|---- | -----|
| REPORT_PAYLOAD_DESCRIPTOR | &quot;REPORT_PAYLOAD_DESCRIPTOR&quot; |



