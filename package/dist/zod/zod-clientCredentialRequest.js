import { z } from "zod";
export default z.object({ "grant_type": z.literal("client_credentials").describe("OAuth2 grant type, must be 'client_credentials'").optional(), "clientID": z.string().min(1).max(128).describe("client ID to exchange for bearer token."), "clientSecret": z.string().min(1).max(128).describe("client secret to exchange for bearer token."), "scope": z.string().min(1).max(128).describe("application defined scope.").optional() }).describe("Body of POST request to /auth/token.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLWNsaWVudENyZWRlbnRpYWxSZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtY2xpZW50Q3JlZGVudGlhbFJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUV4QixlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMseUNBQXlDLENBQUMsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLDZDQUE2QyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsd0NBQXdDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHoub2JqZWN0KHsgXCJncmFudF90eXBlXCI6IHoubGl0ZXJhbChcImNsaWVudF9jcmVkZW50aWFsc1wiKS5kZXNjcmliZShcIk9BdXRoMiBncmFudCB0eXBlLCBtdXN0IGJlICdjbGllbnRfY3JlZGVudGlhbHMnXCIpLm9wdGlvbmFsKCksIFwiY2xpZW50SURcIjogei5zdHJpbmcoKS5taW4oMSkubWF4KDEyOCkuZGVzY3JpYmUoXCJjbGllbnQgSUQgdG8gZXhjaGFuZ2UgZm9yIGJlYXJlciB0b2tlbi5cIiksIFwiY2xpZW50U2VjcmV0XCI6IHouc3RyaW5nKCkubWluKDEpLm1heCgxMjgpLmRlc2NyaWJlKFwiY2xpZW50IHNlY3JldCB0byBleGNoYW5nZSBmb3IgYmVhcmVyIHRva2VuLlwiKSwgXCJzY29wZVwiOiB6LnN0cmluZygpLm1pbigxKS5tYXgoMTI4KS5kZXNjcmliZShcImFwcGxpY2F0aW9uIGRlZmluZWQgc2NvcGUuXCIpLm9wdGlvbmFsKCkgfSkuZGVzY3JpYmUoXCJCb2R5IG9mIFBPU1QgcmVxdWVzdCB0byAvYXV0aC90b2tlbi5cXG5cIik7XG4iXX0=