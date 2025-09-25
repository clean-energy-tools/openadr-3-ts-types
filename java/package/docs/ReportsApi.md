# ReportsApi

All URIs are relative to *https://virtserver.swaggerhub.com/OPENADR3_1/openADR3.1.0/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createReport**](ReportsApi.md#createReport) | **POST** /reports | add a report
[**deleteReport**](ReportsApi.md#deleteReport) | **DELETE** /reports/{reportID} | delete a report
[**searchAllReports**](ReportsApi.md#searchAllReports) | **GET** /reports | searches all reports
[**searchReportsByReportID**](ReportsApi.md#searchReportsByReportID) | **GET** /reports/{reportID} | searches reports by reportID
[**updateReport**](ReportsApi.md#updateReport) | **PUT** /reports/{reportID} | update a report

<a name="createReport"></a>
# **createReport**
> Report createReport(body)

add a report

Create a new report in the server.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ReportsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ReportsApi apiInstance = new ReportsApi();
ReportRequest body = new ReportRequest(); // ReportRequest | report item to add.
try {
    Report result = apiInstance.createReport(body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ReportsApi#createReport");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ReportRequest**](ReportRequest.md)| report item to add. | [optional]

### Return type

[**Report**](Report.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteReport"></a>
# **deleteReport**
> Report deleteReport(reportID)

delete a report

Delete the report specified by the reportID in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ReportsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ReportsApi apiInstance = new ReportsApi();
String reportID = "reportID_example"; // String | object ID of a report.
try {
    Report result = apiInstance.deleteReport(reportID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ReportsApi#deleteReport");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **reportID** | [**String**](.md)| object ID of a report. |

### Return type

[**Report**](Report.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchAllReports"></a>
# **searchAllReports**
> List&lt;Report&gt; searchAllReports(programID, eventID, clientName, skip, limit)

searches all reports

List all reports known to the server. May filter results by programID, eventID,  and clientName as query param. Use skip and pagination query params to limit response size. 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ReportsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ReportsApi apiInstance = new ReportsApi();
String programID = "programID_example"; // String | filter results to reports with programID.
String eventID = "eventID_example"; // String | filter results to reports with eventID.
String clientName = "clientName_example"; // String | filter results to reports with clientName.
Integer skip = 56; // Integer | number of records to skip for pagination.
Integer limit = 56; // Integer | maximum number of records to return.
try {
    List<Report> result = apiInstance.searchAllReports(programID, eventID, clientName, skip, limit);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ReportsApi#searchAllReports");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **programID** | [**String**](.md)| filter results to reports with programID. | [optional]
 **eventID** | [**String**](.md)| filter results to reports with eventID. | [optional]
 **clientName** | [**String**](.md)| filter results to reports with clientName. | [optional]
 **skip** | **Integer**| number of records to skip for pagination. | [optional] [enum: 0]
 **limit** | **Integer**| maximum number of records to return. | [optional] [enum: 0, 50]

### Return type

[**List&lt;Report&gt;**](Report.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchReportsByReportID"></a>
# **searchReportsByReportID**
> Report searchReportsByReportID(reportID)

searches reports by reportID

Fetch the report specified by the reportID in path. 

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ReportsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ReportsApi apiInstance = new ReportsApi();
String reportID = "reportID_example"; // String | object ID of a report.
try {
    Report result = apiInstance.searchReportsByReportID(reportID);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ReportsApi#searchReportsByReportID");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **reportID** | [**String**](.md)| object ID of a report. |

### Return type

[**Report**](Report.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateReport"></a>
# **updateReport**
> Report updateReport(reportID, body)

update a report

Update the report specified by the reportID in path.

### Example
```java
// Import classes:
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiClient;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.ApiException;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.Configuration;
//import io.github.clean_energy_tools.openadr_3_types_swagger.client.auth.*;
//import io.github.clean_energy_tools.openadr_3_types_swagger.api.ReportsApi;

ApiClient defaultClient = Configuration.getDefaultApiClient();


// Configure OAuth2 access token for authorization: oAuth2ClientCredentials
OAuth oAuth2ClientCredentials = (OAuth) defaultClient.getAuthentication("oAuth2ClientCredentials");
oAuth2ClientCredentials.setAccessToken("YOUR ACCESS TOKEN");

ReportsApi apiInstance = new ReportsApi();
String reportID = "reportID_example"; // String | object ID of a report.
ReportRequest body = new ReportRequest(); // ReportRequest | Report item to update.
try {
    Report result = apiInstance.updateReport(reportID, body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ReportsApi#updateReport");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **reportID** | [**String**](.md)| object ID of a report. |
 **body** | [**ReportRequest**](ReportRequest.md)| Report item to update. | [optional]

### Return type

[**Report**](Report.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)[oAuth2ClientCredentials](../README.md#oAuth2ClientCredentials)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

