# ClientCredentialRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**grantType** | [**GrantTypeEnum**](#GrantTypeEnum) | OAuth2 grant type, must be &#x27;client_credentials&#x27; | 
**clientId** | **String** | client ID to exchange for bearer token. | 
**clientSecret** | **String** | client secret to exchange for bearer token. | 
**scope** | **String** | application defined scope. |  [optional]

<a name="GrantTypeEnum"></a>
## Enum: GrantTypeEnum
Name | Value
---- | -----
CLIENT_CREDENTIALS | &quot;client_credentials&quot;
