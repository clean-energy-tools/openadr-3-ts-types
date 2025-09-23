

# ReportRequest

report object.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**eventID** | **String** | URL safe VTN assigned object ID. |  |
|**clientName** | **String** | User generated identifier, may be VEN identifier provisioned out-of-band. |  |
|**reportName** | **String** | User defined string for use in debugging or User Interface. |  [optional] |
|**payloadDescriptors** | [**List&lt;ReportPayloadDescriptor&gt;**](ReportPayloadDescriptor.md) | A list of reportPayloadDescriptors. |  [optional] |
|**resources** | [**List&lt;ReportRequestResourcesInner&gt;**](ReportRequestResourcesInner.md) | A list of objects containing report data for a set of resources. |  |



