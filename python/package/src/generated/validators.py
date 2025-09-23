"""
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
