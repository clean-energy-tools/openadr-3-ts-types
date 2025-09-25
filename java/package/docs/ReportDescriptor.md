# ReportDescriptor

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**payloadType** | **String** | Represents the nature of values.  See enumerations in Definitions for defined string values, or use privately defined strings  | 
**readingType** | **String** |  |  [optional]
**units** | **String** |  |  [optional]
**targets** | **List&lt;String&gt;** | A list of targets. |  [optional]
**aggregate** | **Boolean** | True if report should aggregate results from all targeted resources. False if report includes results for each resource.  |  [optional]
**startInterval** | **Integer** | The interval on which to generate a report. -1 indicates generate report at end of last interval.  |  [optional]
**numIntervals** | **Integer** | The number of intervals to include in a report. -1 indicates that all intervals are to be included.  |  [optional]
**historical** | **Boolean** | True indicates report on intervals preceding startInterval. False indicates report on intervals following startInterval (e.g. forecast).  |  [optional]
**frequency** | **Integer** | Number of intervals that elapse between reports. -1 indicates same as numIntervals.  |  [optional]
**repeat** | **Integer** | Number of times to repeat report. 1 indicates generate one report. -1 indicates repeat indefinitely.  |  [optional]
**reportIntervals** | [**ReportIntervalsEnum**](#ReportIntervalsEnum) | Indicates VEN report interval options. See User Guide. |  [optional]

<a name="ReportIntervalsEnum"></a>
## Enum: ReportIntervalsEnum
Name | Value
---- | -----
INTERVALS | &quot;INTERVALS&quot;
SUB_INTERVALS | &quot;SUB_INTERVALS&quot;
OPEN_INTERVALS | &quot;OPEN_INTERVALS&quot;
