"""
OpenADR 3.1.0 Data Models (Demo Version)
This shows the structure of what would be generated from the OpenAPI spec
"""

from datetime import datetime
from enum import Enum
from typing import Optional, List, Dict, Any, Union
from pydantic import BaseModel, Field, ConfigDict

class ProgramType(str, Enum):
    """Program type enumeration"""
    PRICING_TARIFF = "PRICING_TARIFF"
    DEMAND_RESPONSE = "DEMAND_RESPONSE"
    
class ObjectType(str, Enum):
    """Object type enumeration"""
    PROGRAM = "PROGRAM"
    EVENT = "EVENT"
    REPORT = "REPORT"
    VEN = "VEN"
    RESOURCE = "RESOURCE"

class ObjectID(BaseModel):
    """OpenADR Object identifier"""
    model_config = ConfigDict(extra="forbid")
    
    id: str = Field(..., description="Unique identifier")
    object_type: Optional[ObjectType] = Field(None, description="Type of object")

class Point(BaseModel):
    """Data point with timestamp and value"""
    model_config = ConfigDict(extra="forbid")
    
    timestamp: datetime = Field(..., description="Timestamp of the data point")
    value: float = Field(..., description="Numeric value")

class Interval(BaseModel):
    """Time interval with data points"""
    model_config = ConfigDict(extra="forbid")
    
    id: int = Field(..., description="Interval sequence number")
    start: datetime = Field(..., description="Start time of interval")
    duration: str = Field(..., description="Duration in ISO 8601 format", 
                         pattern=r"^P(?!$)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$")
    points: Optional[List[Point]] = Field(None, description="Data points in interval")

class ValuesMap(BaseModel):
    """Key-value mapping for flexible data"""
    model_config = ConfigDict(extra="forbid")
    
    type: str = Field(..., description="Type of values")
    values: Dict[str, Any] = Field(..., description="Key-value pairs")

class Program(BaseModel):
    """OpenADR Program definition"""
    model_config = ConfigDict(extra="forbid")
    
    id: str = Field(..., description="Unique program identifier")
    created_date_time: datetime = Field(..., description="Creation timestamp")
    modification_date_time: datetime = Field(..., description="Last modification timestamp")
    
    program_name: str = Field(..., description="Short program name", max_length=128)
    program_long_name: Optional[str] = Field(None, description="Descriptive program name", max_length=255)
    retailer_name: str = Field(..., description="Retailer/utility name", max_length=128)
    retailer_long_name: Optional[str] = Field(None, description="Full retailer name", max_length=255)
    
    program_type: ProgramType = Field(..., description="Type of program")
    country: str = Field(..., description="Country code", min_length=2, max_length=2)
    principal_subdivision: Optional[str] = Field(None, description="State/province code", max_length=10)
    
    time_zone_offset: Optional[str] = Field(None, description="Timezone offset")
    program_descriptions: Optional[List[Dict[str, Any]]] = Field(None, description="Program descriptions")
    binding_events: Optional[bool] = Field(None, description="Whether events are binding")
    local_price: Optional[bool] = Field(None, description="Whether pricing is local")

class EventPayload(BaseModel):
    """Event payload data"""
    model_config = ConfigDict(extra="forbid")
    
    type: str = Field(..., description="Payload type")
    values: Optional[ValuesMap] = Field(None, description="Payload values")

class Event(BaseModel):
    """OpenADR Event definition"""
    model_config = ConfigDict(extra="forbid")
    
    id: str = Field(..., description="Unique event identifier")
    created_date_time: datetime = Field(..., description="Creation timestamp") 
    modification_date_time: datetime = Field(..., description="Last modification timestamp")
    
    program_id: str = Field(..., description="Associated program ID")
    event_name: Optional[str] = Field(None, description="Event name", max_length=128)
    priority: Optional[int] = Field(None, description="Event priority", ge=0, le=10)
    
    intervals: List[Interval] = Field(..., description="Event time intervals")
    event_payloads: Optional[List[EventPayload]] = Field(None, description="Event data payloads")

class Resource(BaseModel):
    """VEN Resource definition"""
    model_config = ConfigDict(extra="forbid")
    
    id: str = Field(..., description="Resource identifier")
    resource_name: str = Field(..., description="Resource name", max_length=128)
    ven_id: str = Field(..., description="Associated VEN ID")
    attributes: Optional[List[Dict[str, Any]]] = Field(None, description="Resource attributes")

class Ven(BaseModel):
    """Virtual End Node definition"""
    model_config = ConfigDict(extra="forbid")
    
    id: str = Field(..., description="Unique VEN identifier")
    created_date_time: datetime = Field(..., description="Creation timestamp")
    modification_date_time: datetime = Field(..., description="Last modification timestamp")
    
    ven_name: str = Field(..., description="VEN name", max_length=128)
    attributes: Optional[List[Dict[str, Any]]] = Field(None, description="VEN attributes")
    resources: Optional[List[Resource]] = Field(None, description="VEN resources")

class Report(BaseModel):
    """OpenADR Report definition"""
    model_config = ConfigDict(extra="forbid")
    
    id: str = Field(..., description="Unique report identifier")
    created_date_time: datetime = Field(..., description="Creation timestamp")
    modification_date_time: datetime = Field(..., description="Last modification timestamp")
    
    program_id: str = Field(..., description="Associated program ID")
    event_id: Optional[str] = Field(None, description="Associated event ID")
    client_name: str = Field(..., description="Client name", max_length=128)
    
    intervals: Optional[List[Interval]] = Field(None, description="Report intervals")

class Subscription(BaseModel):
    """Event/Program subscription"""
    model_config = ConfigDict(extra="forbid")
    
    id: str = Field(..., description="Unique subscription identifier")
    created_date_time: datetime = Field(..., description="Creation timestamp")
    modification_date_time: datetime = Field(..., description="Last modification timestamp")
    
    callback_url: str = Field(..., description="Webhook callback URL")
    object_type: ObjectType = Field(..., description="Type of object to subscribe to")
    object_id: Optional[str] = Field(None, description="Specific object ID (optional)")

class Notification(BaseModel):
    """System notification"""
    model_config = ConfigDict(extra="forbid")
    
    id: str = Field(..., description="Notification identifier")
    created_date_time: datetime = Field(..., description="Creation timestamp")
    
    object_type: ObjectType = Field(..., description="Type of object")
    object_id: str = Field(..., description="Object identifier")
    operation: str = Field(..., description="Operation performed")
    callback_url: str = Field(..., description="Callback URL")
