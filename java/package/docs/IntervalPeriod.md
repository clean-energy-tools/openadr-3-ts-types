

# IntervalPeriod

Defines temporal aspects of intervals. A start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide. A duration of \"P9999Y\" may indicate infinity. See User Guide. A randomizeStart indicates absolute range of client applied offset to start. See User Guide. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**start** | **OffsetDateTime** | datetime in RFC 3339 format |  [optional] |
|**duration** | **String** | duration in ISO 8601 format |  [optional] |
|**randomizeStart** | **String** | duration in ISO 8601 format |  [optional] |



