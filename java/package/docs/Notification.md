

# Notification

VTN generated object included in request to subscription callbackUrl. 

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**objectType** | **ObjectTypes** |  |  |
|**operation** | [**OperationEnum**](#OperationEnum) | the operation on on object that triggered the notification. |  |
|**_object** | [**NotificationObject**](NotificationObject.md) |  |  |
|**targets** | **List&lt;String&gt;** | A list of targets. |  [optional] |



## Enum: OperationEnum

| Name | Value |
|---- | -----|
| CREATE | &quot;CREATE&quot; |
| READ | &quot;READ&quot; |
| UPDATE | &quot;UPDATE&quot; |
| DELETE | &quot;DELETE&quot; |



