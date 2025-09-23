#!/usr/bin/env python3
"""
Demo script showing what the generated OpenADR 3 Python types would look like
This demonstrates the structure and approach without requiring datamodel-code-generator
"""

from pathlib import Path
from common import OUTPUT_DIR, ensure_output_dir

def create_demo_models():
    """Create demo pydantic models showing the expected structure"""
    
    demo_models = '''"""
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
                         pattern=r"^P(?!$)(\\d+Y)?(\\d+M)?(\\d+D)?(T(?=\\d)(\\d+H)?(\\d+M)?(\\d+S)?)?$")
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
'''
    
    output_file = OUTPUT_DIR / "models.py"
    output_file.write_text(demo_models)
    return True

def create_demo_responses():
    """Create demo response types"""
    
    responses = '''"""
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
'''
    
    output_file = OUTPUT_DIR / "responses.py"
    output_file.write_text(responses)
    return True

def create_demo_validators():
    """Create demo validation functions"""
    
    validators = '''"""
OpenADR 3.1.0 Data Validators (Demo Version)
"""

from typing import Any, Dict, List, Union
from pydantic import ValidationError
from .models import *

class ValidationResult:
    """Result of validation operation"""
    def __init__(self, success: bool, data: Any = None, errors: List[str] = None):
        self.success = success
        self.data = data
        self.errors = errors or []

def validate_program(data: Dict[str, Any]) -> ValidationResult:
    """Validate Program data"""
    try:
        validated = Program(**data)
        return ValidationResult(True, validated)
    except ValidationError as e:
        return ValidationResult(False, None, [str(error) for error in e.errors()])

def validate_event(data: Dict[str, Any]) -> ValidationResult:
    """Validate Event data"""
    try:
        validated = Event(**data)
        return ValidationResult(True, validated)
    except ValidationError as e:
        return ValidationResult(False, None, [str(error) for error in e.errors()])

def validate_report(data: Dict[str, Any]) -> ValidationResult:
    """Validate Report data"""
    try:
        validated = Report(**data)
        return ValidationResult(True, validated)
    except ValidationError as e:
        return ValidationResult(False, None, [str(error) for error in e.errors()])

def validate_ven(data: Dict[str, Any]) -> ValidationResult:
    """Validate VEN data"""
    try:
        validated = Ven(**data)
        return ValidationResult(True, validated)
    except ValidationError as e:
        return ValidationResult(False, None, [str(error) for error in e.errors()])

def validate_subscription(data: Dict[str, Any]) -> ValidationResult:
    """Validate Subscription data"""
    try:
        validated = Subscription(**data)
        return ValidationResult(True, validated)
    except ValidationError as e:
        return ValidationResult(False, None, [str(error) for error in e.errors()])

def validate_api_params(operation_id: str, params_type: str, data: Dict[str, Any]) -> ValidationResult:
    """Validate API endpoint parameters"""
    try:
        # Import API types at module level would be better, but for demo we'll do it here
        import importlib
        api_module = importlib.import_module('.api_types', package=__package__)
        
        # Map operation IDs to parameter classes
        param_classes = {
            "searchAllPrograms": {
                "query": api_module.SearchAllProgramsParamsQuery,
            },
            "searchProgramByProgramId": {
                "path": api_module.SearchProgramByProgramIdParamsPath,
            },
            "searchAllEvents": {
                "query": api_module.SearchAllEventsParamsQuery,
            },
            "searchAllVens": {
                "query": api_module.SearchAllVensParamsQuery,
            },
            "searchAllReports": {
                "query": api_module.SearchAllReportsParamsQuery,
            },
        }
        
        operation_params = param_classes.get(operation_id, {})
        param_class = operation_params.get(params_type)
        
        if not param_class:
            return ValidationResult(False, None, [f"No {params_type} parameters for operation: {operation_id}"])
        
        validated = param_class(**data)
        return ValidationResult(True, validated)
        
    except ValidationError as e:
        return ValidationResult(False, None, [str(error) for error in e.errors()])
    except Exception as e:
        return ValidationResult(False, None, [f"Validation error: {str(e)}"])

def validate_api_body(operation_id: str, data: Dict[str, Any]) -> ValidationResult:
    """Validate API request body"""
    try:
        import importlib
        api_module = importlib.import_module('.api_types', package=__package__)
        
        # Map operation IDs to body classes
        body_classes = {
            "createProgram": api_module.CreateProgramBody,
            "createEvent": api_module.CreateEventBody,
            "createVen": api_module.CreateVenBody,
            "createReport": api_module.CreateReportBody,
        }
        
        body_class = body_classes.get(operation_id)
        if not body_class:
            return ValidationResult(False, None, [f"No request body for operation: {operation_id}"])
        
        validated = body_class(**data)
        return ValidationResult(True, validated)
        
    except ValidationError as e:
        return ValidationResult(False, None, [str(error) for error in e.errors()])
    except Exception as e:
        return ValidationResult(False, None, [f"Validation error: {str(e)}"])

# Convenience function to validate any OpenADR object
def validate_openadr_object(obj_type: str, data: Dict[str, Any]) -> ValidationResult:
    """Validate any OpenADR object by type name"""
    validators = {
        "program": validate_program,
        "event": validate_event,
        "report": validate_report,
        "ven": validate_ven,
        "subscription": validate_subscription,
    }
    
    validator = validators.get(obj_type.lower())
    if not validator:
        return ValidationResult(False, None, [f"Unknown object type: {obj_type}"])
    
    return validator(data)
'''
    
    output_file = OUTPUT_DIR / "validators.py"
    output_file.write_text(validators)
    return True

def create_demo_api_types():
    """Create demo API endpoint types"""
    
    api_types = '''"""
OpenADR 3.1.0 API Endpoint Types (Demo Version)
"""

from datetime import datetime, date
from typing import Dict, Any, Union, Optional, List
from pydantic import BaseModel, Field, ConfigDict
from .models import *

# GET /programs - Search all programs
class SearchAllProgramsParamsQuery(BaseModel):
    """Query parameters for searching programs"""
    model_config = ConfigDict(extra="forbid")
    
    targets: Optional[List[str]] = Field(None, description="Indicates targets")
    skip: Optional[int] = Field(None, description="Number of records to skip for pagination", ge=0)
    limit: Optional[int] = Field(None, description="Maximum number of records to return", ge=0, le=50)

SearchAllProgramsResponse = List[Program]

class SearchAllProgramsError(BaseModel):
    """Error response for search programs"""
    model_config = ConfigDict(extra="forbid")
    
    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None

# POST /programs - Create program
CreateProgramBody = Program  # Request body is a Program object

CreateProgramResponse = Program

class CreateProgramError(BaseModel):
    """Error response for create program"""
    model_config = ConfigDict(extra="forbid")
    
    status: int
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None

# GET /programs/{programID} - Get program by ID
class SearchProgramByProgramIdParamsPath(BaseModel):
    """Path parameters for program by ID"""
    model_config = ConfigDict(extra="forbid")
    
    program_id: str = Field(..., description="Object ID of the program object")

SearchProgramByProgramIdResponse = Program

# GET /events - Search all events
class SearchAllEventsParamsQuery(BaseModel):
    """Query parameters for searching events"""
    model_config = ConfigDict(extra="forbid")
    
    program_id: Optional[str] = Field(None, description="Filter by program ID")
    skip: Optional[int] = Field(None, description="Number of records to skip", ge=0)
    limit: Optional[int] = Field(None, description="Maximum number of records", ge=0, le=50)

SearchAllEventsResponse = List[Event]

# POST /events - Create event
CreateEventBody = Event

CreateEventResponse = Event

# GET /vens - Search all VENs
class SearchAllVensParamsQuery(BaseModel):
    """Query parameters for searching VENs"""
    model_config = ConfigDict(extra="forbid")
    
    skip: Optional[int] = Field(None, description="Number of records to skip", ge=0)
    limit: Optional[int] = Field(None, description="Maximum number of records", ge=0, le=50)

SearchAllVensResponse = List[Ven]

# POST /vens - Create VEN
CreateVenBody = Ven

CreateVenResponse = Ven

# GET /reports - Search all reports
class SearchAllReportsParamsQuery(BaseModel):
    """Query parameters for searching reports"""
    model_config = ConfigDict(extra="forbid")
    
    program_id: Optional[str] = Field(None, description="Filter by program ID")
    event_id: Optional[str] = Field(None, description="Filter by event ID")
    skip: Optional[int] = Field(None, description="Number of records to skip", ge=0)
    limit: Optional[int] = Field(None, description="Maximum number of records", ge=0, le=50)

SearchAllReportsResponse = List[Report]

# POST /reports - Create report
CreateReportBody = Report

CreateReportResponse = Report
'''
    
    api_file = OUTPUT_DIR / "api_types.py"
    api_file.write_text(api_types)
    return True

def create_demo_init():
    """Create demo __init__.py"""
    
    init_content = '''"""
OpenADR 3.1.0 Python Types and Validators (Demo Version)
"""

from .models import *
from .responses import *
from .validators import *
from .api_types import *

__version__ = "3.1.0"
__all__ = [
    # Core models
    "Program", "Event", "Report", "Ven", "Subscription", "Notification",
    "EventPayload", "Interval", "Point", "ValuesMap", "Resource", "ObjectID",
    "ProgramType", "ObjectType",
    
    # Response types
    "ApiResponse", "ErrorResponse",
    "ProgramResponse", "EventResponse", "ReportResponse", 
    "VenResponse", "SubscriptionResponse", "NotificationResponse",
    
    # API endpoint types
    "SearchAllProgramsParamsQuery", "SearchAllProgramsResponse", "SearchAllProgramsError",
    "CreateProgramBody", "CreateProgramResponse", "CreateProgramError",
    "SearchProgramByProgramIdParamsPath", "SearchProgramByProgramIdResponse",
    "SearchAllEventsParamsQuery", "SearchAllEventsResponse",
    "SearchAllVensParamsQuery", "SearchAllVensResponse",
    "SearchAllReportsParamsQuery", "SearchAllReportsResponse",
    
    # Validation
    "ValidationResult",
    "validate_program", "validate_event", "validate_report", 
    "validate_ven", "validate_subscription", "validate_openadr_object",
    "validate_api_params", "validate_api_body",
]
'''
    
    output_file = OUTPUT_DIR / "__init__.py"
    output_file.write_text(init_content)
    return True

def main():
    """Generate demo OpenADR 3 Python types"""
    print("🚀 Generating demo OpenADR 3.1.0 Python types")
    print("📁 Output directory:", OUTPUT_DIR)
    
    # Ensure output directory exists
    ensure_output_dir()
    
    success = True
    
    print("🔧 Creating demo pydantic models...")
    if not create_demo_models():
        success = False
    else:
        print("✅ Demo models created")
    
    print("🔧 Creating demo response types...")
    if not create_demo_responses():
        success = False
    else:
        print("✅ Demo responses created")
    
    print("🔧 Creating demo validators...")
    if not create_demo_validators():
        success = False
    else:
        print("✅ Demo validators created")
    
    print("🔧 Creating demo API types...")
    if not create_demo_api_types():
        success = False
    else:
        print("✅ Demo API types created")
    
    print("🔧 Creating demo __init__.py...")
    if not create_demo_init():
        success = False
    else:
        print("✅ Demo __init__.py created")
    
    if success:
        print("\n🎉 Demo types generated successfully!")
        print("📝 Features demonstrated:")
        print("   • Pydantic v2 models with validation")
        print("   • Field constraints and descriptions")
        print("   • Type hints for Python 3.11+")
        print("   • API endpoint parameter and response types")
        print("   • Response type definitions")
        print("   • Validation functions with error handling")
        print("\n📦 Generated demo files:")
        for file in OUTPUT_DIR.glob("*.py"):
            print(f"   • {file.name}")
        print("\nTo test: cd ../test && python test_types.py")
    else:
        print("\n❌ Demo generation failed!")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())