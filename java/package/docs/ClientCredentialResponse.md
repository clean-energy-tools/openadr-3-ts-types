# ClientCredentialResponse

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**accessToken** | **String** | access token provided by Authorization service | 
**tokenType** | [**TokenTypeEnum**](#TokenTypeEnum) | token type, must be Bearer. | 
**expiresIn** | **Integer** | expiration period in seconds. |  [optional]
**refreshToken** | **String** | refresh token provided by Authorization service |  [optional]
**scope** | **String** | application defined scope. |  [optional]

<a name="TokenTypeEnum"></a>
## Enum: TokenTypeEnum
Name | Value
---- | -----
BEARER | &quot;Bearer&quot;
