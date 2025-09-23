"""
OpenADR 3.1.0 API Response Types (Demo Version)
"""

from typing import Dict, Any, Union, Optional, List
from pydantic import BaseModel
from .models import *

class ApiResponse(BaseModel):
    """Base API response"""
    status_code: int
    headers: Optional[Dict[str, str]] = None
    content: Optional[Any] = None

class ErrorResponse(BaseModel):
    """Standard error response"""
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None

# Program responses
ProgramResponse = Union[Program, List[Program], ErrorResponse]
ProgramCreateResponse = Union[Program, ErrorResponse]

# Event responses  
EventResponse = Union[Event, List[Event], ErrorResponse]
EventCreateResponse = Union[Event, ErrorResponse]

# Report responses
ReportResponse = Union[Report, List[Report], ErrorResponse]
ReportCreateResponse = Union[Report, ErrorResponse]

# VEN responses
VenResponse = Union[Ven, List[Ven], ErrorResponse]
VenCreateResponse = Union[Ven, ErrorResponse]

# Subscription responses
SubscriptionResponse = Union[Subscription, List[Subscription], ErrorResponse]
SubscriptionCreateResponse = Union[Subscription, ErrorResponse]

# Notification responses
NotificationResponse = Union[Notification, List[Notification], ErrorResponse]

# Authentication responses
TokenResponse = Union[Dict[str, str], ErrorResponse]
