"""
OpenADR 3.1.0 Data Models
Generated from OpenAPI specification
"""

from __future__ import annotations

from datetime import datetime, date, time
from enum import Enum
from typing import Any, Dict, List, Optional, Union, Annotated
from pydantic import BaseModel, Field, ConfigDict

# ============================================================================
# Type Aliases
# ============================================================================

Clientid = Annotated[str, Field( min_length=1, max_length=128)]
Clientname = Annotated[str, Field( min_length=1, max_length=128)]
Datetime = datetime
Duration = Annotated[str, Field(pattern=r'^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$')]
Objectid = Annotated[str, Field(pattern=r'^[a-zA-Z0-9_-]*$', min_length=1, max_length=128)]
Readingtype = Annotated[str, Field( min_length=1, max_length=128)]
Resourcename = Annotated[str, Field( min_length=1, max_length=128)]
Target = Annotated[str, Field( min_length=1, max_length=128)]
Units = Annotated[str, Field( min_length=1, max_length=128)]
Venname = Annotated[str, Field( min_length=1, max_length=128)]

# ============================================================================
# Enumerations
# ============================================================================

class Objecttypes(str, Enum):
    """Types of objects addressable through API."""
    PROGRAM = "PROGRAM"
    EVENT = "EVENT"
    REPORT = "REPORT"
    SUBSCRIPTION = "SUBSCRIPTION"
    VEN = "VEN"
    RESOURCE = "RESOURCE"

# ============================================================================
# Models
# ============================================================================


class Blresourcerequest(BaseModel):
    """Business Logic provided representation of ven resource."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    objectType: str = Field(..., description="Used as discriminator.")
    clientID: str = Field(...)
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")
    resourceName: str = Field(...)
    venID: str = Field(...)
    attributes: Optional[List[Valuesmap]] = Field(default=None, description="A list of valuesMap objects describing attributes.")

class Blvenrequest(BaseModel):
    """Business Logic provided representation of ven."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    objectType: str = Field(..., description="Used as discriminator.")
    clientID: str = Field(...)
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")
    venName: str = Field(...)
    attributes: Optional[List[Valuesmap]] = Field(default=None, description="A list of valuesMap objects describing attributes.")

class Venresourcerequest(BaseModel):
    """Business Logic provided representation of ven resource."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    objectType: str = Field(..., description="Used as discriminator.")
    resourceName: str = Field(...)
    venID: str = Field(...)
    attributes: Optional[List[Valuesmap]] = Field(default=None, description="A list of valuesMap objects describing attributes.")

class Venvenrequest(BaseModel):
    """VEN provided representation of ven."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    objectType: str = Field(..., description="Used as discriminator.")
    venName: str = Field(...)
    attributes: Optional[List[Valuesmap]] = Field(default=None, description="A list of valuesMap objects describing attributes.")

class Autherror(BaseModel):
    """error response on HTTP 400 from auth/token per https://www.rfc-editor.org/rfc/rfc6749"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    error: str = Field(..., description="As described in rfc6749 | invalid_request – The request is missing a parameter so the server can’t proceed with the request. This may also be returned if the request includes an unsupported paramet...")
    error_description: Optional[str] = Field(default=None, description="Should be a sentence or two at most describing the circumstance of the error")
    error_uri: Optional[str] = Field(default=None, description="Optional reference to more detailed error description", min_length=2, max_length=8000)

class Authserverinfo(BaseModel):
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    tokenURL: str = Field(..., description="URL of the token endpoint.", min_length=2, max_length=8000)

class Clientcredentialrequest(BaseModel):
    """Body of POST request to /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    grant_type: str = Field(..., description="OAuth2 grant type, must be 'client_credentials'")
    client_id: str = Field(..., description="client ID to exchange for bearer token.", min_length=1, max_length=4096)
    client_secret: str = Field(..., description="client secret to exchange for bearer token.", min_length=1, max_length=4096)
    scope: Optional[str] = Field(default=None, description="application defined scope.", min_length=0, max_length=4096)

class Clientcredentialresponse(BaseModel):
    """Body response from /auth/token. Note snake case per https://www.rfc-editor.org/rfc/rfc6749"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    access_token: str = Field(..., description="access token provided by Authorization service", min_length=1, max_length=4096)
    token_type: str = Field(..., description="token type, must be Bearer.")
    expires_in: Optional[int] = Field(default=None, description="expiration period in seconds.")
    refresh_token: Optional[str] = Field(default=None, description="refresh token provided by Authorization service", min_length=1, max_length=4096)
    scope: Optional[str] = Field(default=None, description="application defined scope.", min_length=0, max_length=4096)

class Event(BaseModel):
    """Server provided representation of event"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    id: str = Field(...)
    createdDateTime: datetime = Field(...)
    modificationDateTime: datetime = Field(...)
    objectType: Objecttypes = Field(...)
    programID: str = Field(...)
    eventName: Optional[str] = Field(default=None, description="User defined string for use in debugging or User Interface.")
    duration: Optional[str] = Field(default=None)
    priority: Optional[int] = Field(default=None, description="Relative priority of event. A lower number is a higher priority.", ge=0)
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")
    reportDescriptors: Optional[List[Reportdescriptor]] = Field(default=None, description="A list of reportDescriptor objects. Used to request reports from VEN.")
    payloadDescriptors: Optional[List[Eventpayloaddescriptor]] = Field(default=None, description="A list of payloadDescriptor objects.")
    intervalPeriod: Optional[Intervalperiod] = Field(default=None)
    intervals: Optional[List[Interval]] = Field(default=None, description="A list of interval objects.")

class Eventpayloaddescriptor(BaseModel):
    """Contextual information used to interpret event valuesMap values.
E.g. a PRICE payload simply contains a price value, an
associated descriptor provides necessary context such as units and currency."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    objectType: str = Field(..., description="Used as discriminator.")
    payloadType: str = Field(..., description="Represents the nature of values.  See enumerations in Definitions for defined string values, or use privately defined strings", min_length=1, max_length=128)
    units: Optional[str] = Field(default=None)
    currency: Optional[str] = Field(default=None, description="Currency of price payload.")

class Eventrequest(BaseModel):
    """Event object to communicate a Demand Response request to VEN.
If intervalPeriod is present, sets default start time and duration of intervals."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    programID: str = Field(...)
    eventName: Optional[str] = Field(default=None, description="User defined string for use in debugging or User Interface.")
    duration: Optional[str] = Field(default=None)
    priority: Optional[int] = Field(default=None, description="Relative priority of event. A lower number is a higher priority.", ge=0)
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")
    reportDescriptors: Optional[List[Reportdescriptor]] = Field(default=None, description="A list of reportDescriptor objects. Used to request reports from VEN.")
    payloadDescriptors: Optional[List[Eventpayloaddescriptor]] = Field(default=None, description="A list of payloadDescriptor objects.")
    intervalPeriod: Optional[Intervalperiod] = Field(default=None)
    intervals: Optional[List[Interval]] = Field(default=None, description="A list of interval objects.")

class Interval(BaseModel):
    """An object defining a temporal window and a list of valuesMaps.
if intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    id: int = Field(..., description="A client generated number assigned an interval object. Not a sequence number.")
    intervalPeriod: Optional[Intervalperiod] = Field(default=None)
    payloads: List[Valuesmap] = Field(..., description="A list of valuesMap objects.")

class Intervalperiod(BaseModel):
    """Defines temporal aspects of intervals.
A start of \"0001-01-01\" or \"0001-01-01T00:00:00\" may indicate 'now'. See User Guide.
A duration of \"P9999Y\" may indicate infinity. See User Guide.
A randomizeStart indicates absolute range of client applied offset to start. See User Guide."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    start: Optional[datetime] = Field(default=None)
    duration: Optional[str] = Field(default=None)
    randomizeStart: Optional[str] = Field(default=None)

class Mqttnotifierauthenticationanonymous(BaseModel):
    """MQTT broker anonymous authentication details"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    method: str = Field(..., description="Specifies anonymous authentication")

class Mqttnotifierauthenticationcertificate(BaseModel):
    """MQTT broker mTLS client certificate authentication details"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    method: str = Field(..., description="Specifies certificate authentication")
    caCert: str = Field(..., description="String containing the Certificate Authority certificate")
    clientCert: str = Field(..., description="String containing the Client certificate")
    clientKey: str = Field(..., description="String containing the client certificate private key")

class Mqttnotifierauthenticationoauth2bearertoken(BaseModel):
    """MQTT broker OAuth2 Bearer Token authentication details"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    method: str = Field(..., description="Specifies OAuth2 bearer token authentication")
    username: str = Field(..., description="Either the distinguished string \"{clientID}\", or any other literal string")

class Mqttnotifierbindingobject(BaseModel):
    """Details of MQTT binding for messaging protocol support"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    URIS: List[str] = Field(...)
    serialization: str = Field(..., description="Currently always JSON, perhaps other formats supported in future")
    authentication: Union[Mqttnotifierauthenticationanonymous, Mqttnotifierauthenticationoauth2bearertoken, Mqttnotifierauthenticationcertificate] = Field(..., description="Authentication method supported for connection to MQTT broker")

class Notification(BaseModel):
    """VTN generated object included in request to subscription callbackUrl."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    objectType: Objecttypes = Field(...)
    operation: str = Field(..., description="the operation on on object that triggered the notification.")
    object: Union[Program, Report, Event, Subscription, Ven, Resource] = Field(..., description="the object that is the subject of the notification.")
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")

class Notifieroperationstopics(BaseModel):
    """MQTT notifier topic names for notifications of subscribable-object operations"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    CREATE: Optional[str] = Field(default=None, description="'Topic path for CREATE operations,  not provided for notifications for a specific object ID,  e.g. until programID foo is created, clients unable to  request notifications of its creation'")
    UPDATE: str = Field(..., description="Topic path for UPDATE operations")
    DELETE: str = Field(..., description="Topic path for DELETE operations")
    ALL: Optional[str] = Field(default=None, description="Topic path for ALL operations, if supported by VTN")

class Notifiertopicsresponse(BaseModel):
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    topics: Notifieroperationstopics = Field(...)

class Notifiersresponse(BaseModel):
    """Provides details of each notifier binding supported"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    WEBHOOK: bool = Field(..., description="Currently MUST be true")
    MQTT: Optional[Mqttnotifierbindingobject] = Field(default=None)

class Objectmetadata(BaseModel):
    """metadata common to all addressable objects. Values provided by VTN on object creation."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    id: str = Field(...)
    createdDateTime: datetime = Field(...)
    modificationDateTime: datetime = Field(...)
    objectType: Objecttypes = Field(...)

class Point(BaseModel):
    """A pair of floats typically used as a point on a 2 dimensional grid."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    x: float = Field(..., description="A value on an x axis.")
    y: float = Field(..., description="A value on a y axis.")

class Problem(BaseModel):
    """reusable error response. From https://opensource.zalando.com/problem/schema.yaml."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    type: Optional[str] = Field(default="about:blank", description="An absolute URI that identifies the problem type. When dereferenced, it SHOULD provide human-readable documentation for the problem type (e.g., using HTML).", min_length=2, max_length=8000)
    title: Optional[str] = Field(default=None, description="A short, summary of the problem type. Written in english and readable for engineers (usually not suited for non technical stakeholders and not localized); example: Service Unavailable.")
    status: Optional[int] = Field(default=None, description="The HTTP status code generated by the origin server for this occurrence of the problem.", ge=100, le=600)
    detail: Optional[str] = Field(default=None, description="A human readable explanation specific to this occurrence of the problem.")
    instance: Optional[str] = Field(default=None, description="An absolute URI that identifies the specific occurrence of the problem. It may or may not yield further information if dereferenced.", min_length=3, max_length=8000)

class Program(BaseModel):
    """Server provided representation of program"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    id: str = Field(...)
    createdDateTime: datetime = Field(...)
    modificationDateTime: datetime = Field(...)
    objectType: Objecttypes = Field(...)
    programName: str = Field(..., description="Short name to uniquely identify program.", min_length=1, max_length=128)
    intervalPeriod: Optional[Intervalperiod] = Field(default=None)
    programDescriptions: Optional[List[Any]] = Field(default=None, description="A list of programDescriptions")
    payloadDescriptors: Optional[List[Union[Eventpayloaddescriptor, Reportpayloaddescriptor]]] = Field(default=None, description="A list of payloadDescriptors.")
    attributes: Optional[List[Valuesmap]] = Field(default=None, description="A list of valuesMap objects describing attributes.")
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")

class Programrequest(BaseModel):
    """Client provided description of program"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    programName: str = Field(..., description="Short name to uniquely identify program.", min_length=1, max_length=128)
    intervalPeriod: Optional[Intervalperiod] = Field(default=None)
    programDescriptions: Optional[List[Any]] = Field(default=None, description="A list of programDescriptions")
    payloadDescriptors: Optional[List[Union[Eventpayloaddescriptor, Reportpayloaddescriptor]]] = Field(default=None, description="A list of payloadDescriptors.")
    attributes: Optional[List[Valuesmap]] = Field(default=None, description="A list of valuesMap objects describing attributes.")
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")

class Report(BaseModel):
    """Server provided representation of report"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    id: str = Field(...)
    createdDateTime: datetime = Field(...)
    modificationDateTime: datetime = Field(...)
    objectType: Objecttypes = Field(...)
    eventID: str = Field(...)
    clientName: str = Field(...)
    reportName: Optional[str] = Field(default=None, description="User defined string for use in debugging or User Interface.")
    payloadDescriptors: Optional[List[Reportpayloaddescriptor]] = Field(default=None, description="A list of reportPayloadDescriptors.")
    resources: List[ResourcesItem] = Field(..., description="A list of objects containing report data for a set of resources.")
    clientID: str = Field(...)

class Reportdescriptor(BaseModel):
    """An object that may be used to request a report from a VEN."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    payloadType: str = Field(..., description="Represents the nature of values.  See enumerations in Definitions for defined string values, or use privately defined strings", min_length=1, max_length=128)
    readingType: Optional[str] = Field(default=None)
    units: Optional[str] = Field(default=None)
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")
    aggregate: Optional[bool] = Field(default=False, description="True if report should aggregate results from all targeted resources. False if report includes results for each resource.")
    startInterval: Optional[int] = Field(default=-1, description="The interval on which to generate a report. -1 indicates generate report at end of last interval.")
    numIntervals: Optional[int] = Field(default=-1, description="The number of intervals to include in a report. -1 indicates that all intervals are to be included.")
    historical: Optional[bool] = Field(default=True, description="True indicates report on intervals preceding startInterval. False indicates report on intervals following startInterval (e.g. forecast).")
    frequency: Optional[int] = Field(default=-1, description="Number of intervals that elapse between reports. -1 indicates same as numIntervals.")
    repeat: Optional[int] = Field(default=1, description="Number of times to repeat report. 1 indicates generate one report. -1 indicates repeat indefinitely.")
    reportIntervals: Optional[str] = Field(default="INTERVALS", description="Indicates VEN report interval options. See User Guide.")

class Reportpayloaddescriptor(BaseModel):
    """Contextual information used to interpret report payload values.
E.g. a USAGE payload simply contains a usage value, an
associated descriptor provides necessary context such as units and data quality."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    objectType: str = Field(..., description="Used as discriminator.")
    payloadType: str = Field(..., description="Represents the nature of values.  See enumerations in Definitions for defined string values, or use privately defined strings", min_length=1, max_length=128)
    readingType: Optional[str] = Field(default=None)
    units: Optional[str] = Field(default=None)
    accuracy: Optional[float] = Field(default=None, description="A quantification of the accuracy of a set of payload values.")
    confidence: Optional[int] = Field(default=None, description="A quantification of the confidence in a set of payload values.", ge=0, le=100)

class Reportrequest(BaseModel):
    """report object."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    eventID: str = Field(...)
    clientName: str = Field(...)
    reportName: Optional[str] = Field(default=None, description="User defined string for use in debugging or User Interface.")
    payloadDescriptors: Optional[List[Reportpayloaddescriptor]] = Field(default=None, description="A list of reportPayloadDescriptors.")
    resources: List[ResourcesItem] = Field(..., description="A list of objects containing report data for a set of resources.")

class Resource(BaseModel):
    """Server provided representation of resource"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    id: str = Field(...)
    createdDateTime: datetime = Field(...)
    modificationDateTime: datetime = Field(...)
    objectType: str = Field(..., description="Used as discriminator.")
    clientID: str = Field(...)
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")
    resourceName: str = Field(...)
    venID: str = Field(...)
    attributes: Optional[List[Valuesmap]] = Field(default=None, description="A list of valuesMap objects describing attributes.")

class Resourcerequest(BaseModel):
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    pass

class Subscription(BaseModel):
    """Server provided representation of subscription"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    id: str = Field(...)
    createdDateTime: datetime = Field(...)
    modificationDateTime: datetime = Field(...)
    objectType: Objecttypes = Field(...)
    clientName: str = Field(...)
    programID: Optional[str] = Field(default=None)
    objectOperations: List[ObjectoperationsItem] = Field(..., description="list of objects and operations to subscribe to.")
    targets: Optional[List[str]] = Field(default=None, description="A list of target objects. Used by server to filter notifications.")
    clientID: str = Field(...)

class Subscriptionrequest(BaseModel):
    """An object created by a client to receive notification of operations on objects.
Clients may subscribe to be notified when a type of object is created,
updated, or deleted."""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    clientName: str = Field(...)
    programID: Optional[str] = Field(default=None)
    objectOperations: List[ObjectoperationsItem] = Field(..., description="list of objects and operations to subscribe to.")
    targets: Optional[List[str]] = Field(default=None, description="A list of target objects. Used by server to filter notifications.")

class Valuesmap(BaseModel):
    """Represents one or more values associated with a type.

See enumerations in Definitions for defined string values, or use privately defined strings"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    type: str = Field(..., description="Represents the nature of values.  See enumerations in Definitions for defined string values, or use privately defined strings", min_length=1, max_length=128)
    values: List[Union[float, int, str, bool, Point]] = Field(..., description="A list of data points. Most often a singular value such as a price.")

class Ven(BaseModel):
    """Server provided representation of ven"""
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    id: str = Field(...)
    createdDateTime: datetime = Field(...)
    modificationDateTime: datetime = Field(...)
    objectType: str = Field(..., description="Used as discriminator.")
    clientID: str = Field(...)
    targets: Optional[List[str]] = Field(default=None, description="A list of targets.")
    venName: str = Field(...)
    attributes: Optional[List[Valuesmap]] = Field(default=None, description="A list of valuesMap objects describing attributes.")

class Venrequest(BaseModel):
    model_config = ConfigDict(extra='forbid', populate_by_name=True)

    pass