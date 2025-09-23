

# EventRequest

Event object to communicate a Demand Response request to VEN. If intervalPeriod is present, sets default start time and duration of intervals. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**programID** | **String** | URL safe VTN assigned object ID. |  |
|**eventName** | **String** | User defined string for use in debugging or User Interface. |  [optional] |
|**duration** | **String** | duration in ISO 8601 format |  [optional] |
|**priority** | **Integer** | Relative priority of event. A lower number is a higher priority. |  [optional] |
|**targets** | **List&lt;String&gt;** | A list of targets. |  [optional] |
|**reportDescriptors** | [**List&lt;ReportDescriptor&gt;**](ReportDescriptor.md) | A list of reportDescriptor objects. Used to request reports from VEN. |  [optional] |
|**payloadDescriptors** | [**List&lt;EventPayloadDescriptor&gt;**](EventPayloadDescriptor.md) | A list of payloadDescriptor objects. |  [optional] |
|**intervalPeriod** | [**IntervalPeriod**](IntervalPeriod.md) |  |  [optional] |
|**intervals** | [**List&lt;Interval&gt;**](Interval.md) | A list of interval objects. |  [optional] |



