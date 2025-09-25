# MqttNotifierBindingObject

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**URIS** | **List&lt;String&gt;** |  | 
**serialization** | [**SerializationEnum**](#SerializationEnum) | Currently always JSON, perhaps other formats supported in future | 
**authentication** | **OneOfmqttNotifierBindingObjectAuthentication** | Authentication method supported for connection to MQTT broker | 

<a name="SerializationEnum"></a>
## Enum: SerializationEnum
Name | Value
---- | -----
JSON | &quot;JSON&quot;
