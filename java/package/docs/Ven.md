

# Ven

Server provided representation of ven

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | URL safe VTN assigned object ID. |  |
|**createdDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**modificationDateTime** | **OffsetDateTime** | datetime in RFC 3339 format |  |
|**objectType** | [**ObjectTypeEnum**](#ObjectTypeEnum) | Used as discriminator. |  |
|**clientID** | **String** | ClientID as provisioned by Auhtentication Service and associated with client&#39;s bearer token  |  |
|**targets** | **List&lt;String&gt;** | A list of targets. |  [optional] |
|**venName** | **String** | User generated identifier, may be VEN identifier provisioned out-of-band. venName is expected to be unique within the scope of a VTN  |  |
|**attributes** | [**List&lt;ValuesMap&gt;**](ValuesMap.md) | A list of valuesMap objects describing attributes. |  [optional] |



## Enum: ObjectTypeEnum

| Name | Value |
|---- | -----|
| BL_VEN_REQUEST | &quot;BL_VEN_REQUEST&quot; |



