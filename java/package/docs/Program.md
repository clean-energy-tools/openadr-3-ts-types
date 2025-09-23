

# Program

Server provided representation of program

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | URL safe VTN assigned object ID. |  |
|**createdDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**modificationDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**objectType** | **ObjectTypes** |  |  |
|**programName** | **String** | Short name to uniquely identify program. |  |
|**intervalPeriod** | [**IntervalPeriod**](IntervalPeriod.md) |  |  [optional] |
|**programDescriptions** | [**List&lt;ProgramRequestProgramDescriptionsInner&gt;**](ProgramRequestProgramDescriptionsInner.md) | A list of programDescriptions |  [optional] |
|**payloadDescriptors** | [**List&lt;ProgramRequestPayloadDescriptorsInner&gt;**](ProgramRequestPayloadDescriptorsInner.md) | A list of payloadDescriptors. |  [optional] |
|**attributes** | [**List&lt;ValuesMap&gt;**](ValuesMap.md) | A list of valuesMap objects describing attributes. |  [optional] |
|**targets** | **List&lt;String&gt;** | A list of targets. |  [optional] |



