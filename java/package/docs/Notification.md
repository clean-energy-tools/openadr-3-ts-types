# Notification

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**objectType** | [**ObjectTypes**](ObjectTypes.md) |  | 
**operation** | [**OperationEnum**](#OperationEnum) | the operation on on object that triggered the notification. | 
**object** | **OneOfnotificationObject** | the object that is the subject of the notification. | 
**targets** | **List&lt;String&gt;** | A list of targets. |  [optional]

<a name="OperationEnum"></a>
## Enum: OperationEnum
Name | Value
---- | -----
CREATE | &quot;CREATE&quot;
READ | &quot;READ&quot;
UPDATE | &quot;UPDATE&quot;
DELETE | &quot;DELETE&quot;
