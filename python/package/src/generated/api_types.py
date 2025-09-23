"""
OpenADR 3.1.0 API Endpoint Types
Auto-generated from OpenAPI specification - do not edit manually
"""

from datetime import datetime, date
from typing import Dict, Any, Union, Optional, List
from pydantic import BaseModel, Field, ConfigDict
from .models import *

# GET /programs - searchAllPrograms
# searches all programs

class SearchAllProgramsParamsQuery(BaseModel):
    """Query parameters"""
    model_config = ConfigDict(extra="forbid")

    targets: Optional[List[Target]] = Field(None, description="Indicates targets")
    skip: Optional[int] = Field(None, description="number of records to skip for pagination.")
    limit: Optional[int] = Field(None, description="maximum number of records to return.")

SearchAllProgramsResponse = List[Program]

class SearchAllProgramsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# POST /programs - createProgram
# create a program

CreateProgramBody = ProgramRequest

CreateProgramResponse = Program

class CreateProgramError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /programs/{programID} - searchProgramByProgramId
# searches programs by program ID

class SearchProgramByProgramIdParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    program_i_d: ObjectID = Field(..., description="Object ID of the program object.")

SearchProgramByProgramIdResponse = Program

class SearchProgramByProgramIdError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# PUT /programs/{programID} - updateProgram
# update a program

class UpdateProgramParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    program_i_d: ObjectID = Field(..., description="Object ID of the program object.")

UpdateProgramBody = ProgramRequest

UpdateProgramResponse = Program

class UpdateProgramError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# DELETE /programs/{programID} - deleteProgram
# delete a program

class DeleteProgramParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    program_i_d: ObjectID = Field(..., description="Object ID of the program object.")

DeleteProgramResponse = Program

class DeleteProgramError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /reports - searchAllReports
# searches all reports

class SearchAllReportsParamsQuery(BaseModel):
    """Query parameters"""
    model_config = ConfigDict(extra="forbid")

    program_i_d: Optional[ObjectID] = Field(None, description="filter results to reports with programID.")
    event_i_d: Optional[ObjectID] = Field(None, description="filter results to reports with eventID.")
    client_name: Optional[ClientName] = Field(None, description="filter results to reports with clientName.")
    skip: Optional[int] = Field(None, description="number of records to skip for pagination.")
    limit: Optional[int] = Field(None, description="maximum number of records to return.")

SearchAllReportsResponse = List[Report]

class SearchAllReportsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# POST /reports - createReport
# add a report

CreateReportBody = ReportRequest

CreateReportResponse = Report

class CreateReportError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /reports/{reportID} - searchReportsByReportID
# searches reports by reportID

class SearchReportsByReportIDParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    report_i_d: ObjectID = Field(..., description="object ID of a report.")

SearchReportsByReportIDResponse = Report

class SearchReportsByReportIDError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# PUT /reports/{reportID} - updateReport
# update a report

class UpdateReportParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    report_i_d: ObjectID = Field(..., description="object ID of a report.")

UpdateReportBody = ReportRequest

UpdateReportResponse = Report

class UpdateReportError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# DELETE /reports/{reportID} - deleteReport
# delete a report

class DeleteReportParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    report_i_d: ObjectID = Field(..., description="object ID of a report.")

DeleteReportResponse = Report

class DeleteReportError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /events - searchAllEvents
# searches all events

class SearchAllEventsParamsQuery(BaseModel):
    """Query parameters"""
    model_config = ConfigDict(extra="forbid")

    program_i_d: Optional[ObjectID] = Field(None, description="filter results to events with programID.")
    targets: Optional[List[Target]] = Field(None, description="Indicates targets")
    skip: Optional[int] = Field(None, description="number of records to skip for pagination.")
    limit: Optional[int] = Field(None, description="maximum number of records to return.")
    active: Optional[bool] = Field(None, description="ignore events that have transpired.")

SearchAllEventsResponse = List[Event]

class SearchAllEventsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# POST /events - createEvent
# create an event

CreateEventBody = EventRequest

CreateEventResponse = Event

class CreateEventError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /events/{eventID} - searchEventsByID
# search events by ID

class SearchEventsByIDParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    event_i_d: ObjectID = Field(..., description="object ID of event.")

SearchEventsByIDResponse = Event

class SearchEventsByIDError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# PUT /events/{eventID} - updateEvent
# update an event

class UpdateEventParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    event_i_d: ObjectID = Field(..., description="object ID of event.")

UpdateEventBody = EventRequest

UpdateEventResponse = Event

class UpdateEventError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# DELETE /events/{eventID} - deleteEvent
# delete an event

class DeleteEventParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    event_i_d: ObjectID = Field(..., description="object ID of event.")

DeleteEventResponse = Event

class DeleteEventError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /subscriptions - searchSubscriptions
# search subscriptions

class SearchSubscriptionsParamsQuery(BaseModel):
    """Query parameters"""
    model_config = ConfigDict(extra="forbid")

    program_i_d: Optional[ObjectID] = Field(None, description="filter results to subscriptions with programID.")
    client_name: Optional[ClientName] = Field(None, description="filter results to subscriptions with clientName.")
    objects: Optional[List[ObjectTypes]] = Field(None, description="list of objects to subscribe to.")
    skip: Optional[int] = Field(None, description="number of records to skip for pagination.")
    limit: Optional[int] = Field(None, description="maximum number of records to return.")

SearchSubscriptionsResponse = List[Subscription]

class SearchSubscriptionsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# POST /subscriptions - createSubscription
# create subscription

CreateSubscriptionBody = SubscriptionRequest

CreateSubscriptionResponse = Subscription

class CreateSubscriptionError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /subscriptions/{subscriptionID} - searchSubscriptionByID
# search subscriptions by ID

class SearchSubscriptionByIDParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    subscription_i_d: ObjectID = Field(..., description="object ID of the associated subscription.")

SearchSubscriptionByIDResponse = Subscription

class SearchSubscriptionByIDError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# PUT /subscriptions/{subscriptionID} - updateSubscription
# update  subscription

class UpdateSubscriptionParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    subscription_i_d: ObjectID = Field(..., description="object ID of the associated subscription.")

UpdateSubscriptionBody = SubscriptionRequest

UpdateSubscriptionResponse = Subscription

class UpdateSubscriptionError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# DELETE /subscriptions/{subscriptionID} - deleteSubscription
# delete  subscription

class DeleteSubscriptionParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    subscription_i_d: ObjectID = Field(..., description="object ID of the associated subscription.")

DeleteSubscriptionResponse = Subscription

class DeleteSubscriptionError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /vens - searchVens
# search vens

class SearchVensParamsQuery(BaseModel):
    """Query parameters"""
    model_config = ConfigDict(extra="forbid")

    ven_name: Optional[VenName] = Field(None, description="Indicates ven objects w venName")
    targets: Optional[List[Target]] = Field(None, description="Indicates targets")
    skip: Optional[int] = Field(None, description="number of records to skip for pagination.")
    limit: Optional[int] = Field(None, description="maximum number of records to return.")

SearchVensResponse = List[Ven]

class SearchVensError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# POST /vens - createVen
# create ven

CreateVenBody = VenRequest

CreateVenResponse = Ven

class CreateVenError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /vens/{venID} - searchVenByID
# search vens by ID

class SearchVenByIDParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    ven_i_d: ObjectID = Field(..., description="object ID of ven.")

SearchVenByIDResponse = Ven

class SearchVenByIDError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# PUT /vens/{venID} - updateVen
# update  ven

class UpdateVenParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    ven_i_d: ObjectID = Field(..., description="object ID of ven.")

UpdateVenBody = VenRequest

UpdateVenResponse = Ven

class UpdateVenError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# DELETE /vens/{venID} - deleteVen
# delete  ven

class DeleteVenParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    ven_i_d: ObjectID = Field(..., description="object ID of ven.")

DeleteVenResponse = Ven

class DeleteVenError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /resources - searchVenResources
# search ven resources

class SearchVenResourcesParamsQuery(BaseModel):
    """Query parameters"""
    model_config = ConfigDict(extra="forbid")

    resource_name: Optional[ResourceName] = Field(None, description="Indicates resource objects with resourceName")
    ven_i_d: Optional[ObjectID] = Field(None, description="Indicates resource objects with venID")
    targets: Optional[List[Target]] = Field(None, description="Indicates targets")
    skip: Optional[int] = Field(None, description="number of records to skip for pagination.")
    limit: Optional[int] = Field(None, description="maximum number of records to return.")

SearchVenResourcesResponse = List[Resource]

class SearchVenResourcesError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# POST /resources - createResource
# create resource

CreateResourceBody = ResourceRequest

CreateResourceResponse = Resource

class CreateResourceError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /resources/{resourceID} - searchVenResourceByID
# search ven resources by ID

class SearchVenResourceByIDParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    resource_i_d: ObjectID = Field(..., description="object ID of the resource.")

SearchVenResourceByIDResponse = Resource

class SearchVenResourceByIDError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# PUT /resources/{resourceID} - updateVenResource
# update  ven resource

class UpdateVenResourceParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    resource_i_d: ObjectID = Field(..., description="object ID of the resource.")

UpdateVenResourceBody = ResourceRequest

UpdateVenResourceResponse = Resource

class UpdateVenResourceError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# DELETE /resources/{resourceID} - deleteVenResource
# delete  ven resource

class DeleteVenResourceParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    resource_i_d: ObjectID = Field(..., description="object ID of the resource.")

DeleteVenResourceResponse = Resource

class DeleteVenResourceError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /auth/server - getAuthServerInfo
# fetch server info

GetAuthServerInfoResponse = AuthServerInfo

class GetAuthServerInfoError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# POST /auth/token - fetchToken
# fetch a token

FetchTokenBody = ClientCredentialRequest

FetchTokenResponse = ClientCredentialResponse

class FetchTokenError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers - listAllNotifiers
# List all notifier bindings

ListAllNotifiersResponse = NotifiersResponse


# GET /notifiers/mqtt/topics/programs - listAllMqttNotifierTopicsPrograms
# List all MQTT notifier topic names for operations on programs


ListAllMqttNotifierTopicsProgramsResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsProgramsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/programs/{programID} - listAllMqttNotifierTopicsProgram
# List all MQTT binding topic names for operations on a program


class ListAllMqttNotifierTopicsProgramParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    program_i_d: ObjectID = Field(..., description="objectID of the program object")

ListAllMqttNotifierTopicsProgramResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsProgramError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/events - listAllMqttNotifierTopicsEvents
# List all MQTT binding topic names for operations on all events


ListAllMqttNotifierTopicsEventsResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsEventsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/programs/{programID}/events - listAllMqttNotifierTopicsProgramEvents
# List all MQTT binding topic names for operations on events for a program


class ListAllMqttNotifierTopicsProgramEventsParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    program_i_d: ObjectID = Field(..., description="Object ID of the program object")

ListAllMqttNotifierTopicsProgramEventsResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsProgramEventsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/reports - listAllMqttNotifierTopicsReports
# List all MQTT binding topic names for operations on all reports


ListAllMqttNotifierTopicsReportsResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsReportsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/subscriptions - listAllMqttNotifierTopicsSubscriptions
# List all MQTT binding topic names for operations on all subscriptions


ListAllMqttNotifierTopicsSubscriptionsResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsSubscriptionsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/vens - listAllMqttNotifierTopicsVens
# List all MQTT binding topic names for operations on vens


ListAllMqttNotifierTopicsVensResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsVensError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/vens/{venID} - listAllMqttNotifierTopicsVen
# List all MQTT binding topic names for operations on a ven


class ListAllMqttNotifierTopicsVenParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    ven_i_d: ObjectID = Field(..., description="venID of the vens object")

ListAllMqttNotifierTopicsVenResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsVenError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/resources - listAllMqttNotifierTopicsResources
# List all MQTT binding topic names for operations on resources


ListAllMqttNotifierTopicsResourcesResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsResourcesError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/vens/{venID}/events - listAllMqttNotifierTopicsVenEvents
# List all MQTT binding topic names for operations on events targeted for a ven


class ListAllMqttNotifierTopicsVenEventsParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    ven_i_d: ObjectID = Field(..., description="object ID of the ven object")

ListAllMqttNotifierTopicsVenEventsResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsVenEventsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/vens/{venID}/programs - listAllMqttNotifierTopicsVenPrograms
# List all MQTT binding topic names for operations on programs targeted for a ven


class ListAllMqttNotifierTopicsVenProgramsParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    ven_i_d: ObjectID = Field(..., description="object ID of the ven object")

ListAllMqttNotifierTopicsVenProgramsResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsVenProgramsError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None


# GET /notifiers/mqtt/topics/vens/{venID}/resources - listAllMqttNotifierTopicsVenResources
# List all MQTT binding topic names for operations on resources for a ven


class ListAllMqttNotifierTopicsVenResourcesParamsPath(BaseModel):
    """Path parameters"""
    model_config = ConfigDict(extra="forbid")

    ven_i_d: ObjectID = Field(..., description="object ID of the ven object")

ListAllMqttNotifierTopicsVenResourcesResponse = Dict[str, Any]

class ListAllMqttNotifierTopicsVenResourcesError(BaseModel):
    """Error response"""
    model_config = ConfigDict(extra="forbid")

    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None

