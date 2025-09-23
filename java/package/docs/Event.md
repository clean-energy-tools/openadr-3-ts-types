

# Event

Server provided representation of event

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | URL safe VTN assigned object ID. |  |
|**createdDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**modificationDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**objectType** | **ObjectTypes** |  |  |
|**programID** | **String** | URL safe VTN assigned object ID. |  |
|**eventName** | **String** | User defined string for use in debugging or User Interface. |  [optional] |
|**duration** | **String** | duration in ISO 8601 format |  [optional] |
|**priority** | **Integer** | Relative priority of event. A lower number is a higher priority. |  [optional] |
|**targets** | **List&lt;String&gt;** | A list of targets. |  [optional] |
|**reportDescriptors** | [**List&lt;ReportDescriptor&gt;**](ReportDescriptor.md) | A list of reportDescriptor objects. Used to request reports from VEN. |  [optional] |
|**payloadDescriptors** | [**List&lt;EventPayloadDescriptor&gt;**](EventPayloadDescriptor.md) | A list of payloadDescriptor objects. |  [optional] |
|**intervalPeriod** | [**IntervalPeriod**](IntervalPeriod.md) |  |  [optional] |
|**intervals** | [**List&lt;Interval&gt;**](Interval.md) | A list of interval objects. |  [optional] |



