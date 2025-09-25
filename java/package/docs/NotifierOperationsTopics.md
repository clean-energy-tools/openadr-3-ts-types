# NotifierOperationsTopics

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CREATE** | **String** | &#x27;Topic path for CREATE operations,  not provided for notifications for a specific object ID,  e.g. until programID foo is created, clients unable to  request notifications of its creation&#x27;  |  [optional]
**UPDATE** | **String** | Topic path for UPDATE operations | 
**DELETE** | **String** | Topic path for DELETE operations | 
**ALL** | **String** | Topic path for ALL operations, if supported by VTN |  [optional]
