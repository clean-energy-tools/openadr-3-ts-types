# AuthError

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**error** | [**ErrorEnum**](#ErrorEnum) | As described in rfc6749 | invalid_request – The request is missing a parameter so the server can’t proceed with the request. This may also be returned if the request includes an unsupported parameter or repeats a parameter. invalid_client – Client authentication failed, such as if the request contains an invalid client ID or secret. Send an HTTP 401 response in this case. invalid_grant – The authorization code (or user’s password for the password grant type) is invalid or expired. This is also the error you would return if the redirect URL given in the authorization grant does not match the URL provided in this access token request. invalid_scope – For access token requests that include a scope (password or client_credentials grants), this error indicates an invalid scope value in the request. unauthorized_client – This client is not authorized to use the requested grant type. For example, if you restrict which applications can use the Implicit grant, you would return this error for the other apps. unsupported_grant_type – If a grant type is requested that the authorization server doesn’t recognize, use this code. Note that unknown grant types also use this specific error code rather than using the invalid_request above. | 
**errorDescription** | **String** | Should be a sentence or two at most describing the circumstance of the error |  [optional]
**errorUri** | **String** | Optional reference to more detailed error description |  [optional]

<a name="ErrorEnum"></a>
## Enum: ErrorEnum
Name | Value
---- | -----
INVALID_REQUEST | &quot;invalid_request&quot;
INVALID_CLIENT | &quot;invalid_client&quot;
INVALID_GRANT | &quot;invalid_grant&quot;
INVALID_SCOPE | &quot;invalid_scope&quot;
UNAUTHORIZED_CLIENT | &quot;unauthorized_client&quot;
UNSUPPORTED_GRANT_TYPE | &quot;unsupported_grant_type&quot;
