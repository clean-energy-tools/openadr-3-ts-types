#!/usr/bin/env python3
"""
Modern build script for generating OpenADR 3.1.0 Python types using pydantic
Preserves validation constraints and generates comprehensive type definitions
"""

import subprocess
import sys
from pathlib import Path
from typing import Optional

import typer
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn

from common import SPEC_PATH, OUTPUT_DIR, GENERATION_OPTIONS, ensure_output_dir

console = Console()
app = typer.Typer()


def run_command(cmd: list[str], description: str) -> bool:
    """Run a command and return success status"""
    try:
        console.print(f"🔄 {description}...")
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        console.print(f"✅ {description} completed")
        return True
    except subprocess.CalledProcessError as e:
        console.print(f"❌ {description} failed:")
        console.print(f"   Command: {' '.join(cmd)}")
        console.print(f"   Return code: {e.returncode}")
        console.print(f"   Error: {e.stderr}")
        return False


def generate_pydantic_models() -> bool:
    """Generate pydantic models from OpenAPI schema"""
    
    output_file = OUTPUT_DIR / "models.py"
    
    # Use virtual environment datamodel-codegen if available
    venv_path = Path(__file__).parent / "venv"
    datamodel_codegen = venv_path / "bin" / "datamodel-codegen"
    if not datamodel_codegen.exists():
        datamodel_codegen = venv_path / "Scripts" / "datamodel-codegen.exe"  # Windows
    
    if not datamodel_codegen.exists():
        datamodel_codegen = "datamodel-codegen"  # Fall back to system installation
    
    cmd = [
        str(datamodel_codegen),
        "--input", str(SPEC_PATH),
        "--output", str(output_file),
        "--input-file-type", "openapi",
        "--output-model-type", "pydantic_v2.BaseModel",
        "--snake-case-field",
        "--use-title-if-available", 
        "--use-default-kwonly",
        "--use-subclass-enum",
        "--use-union-operator",
        "--target-python-version", "3.11",
        "--use-standard-collections",
        "--use-schema-description",
        "--use-field-description",
        "--field-constraints",
        "--validation",
        "--wrap-string-literal",
        "--use-one-literal-as-default",
        "--use-double-quotes",
    ]
    
    return run_command(cmd, "Generating pydantic models from OpenAPI schema")


def generate_response_types() -> bool:
    """Generate response type definitions"""
    
    # This will extract response schemas and create separate response type definitions
    response_code = '''"""
OpenADR 3.1.0 API Response Types
Auto-generated from OpenADR specification - do not edit manually
"""

from typing import Dict, Any, Union, Optional, List
from pydantic import BaseModel
from .models import *

# Response type mappings for OpenADR 3.1.0 API endpoints
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

# Program endpoint responses
ProgramResponse = Union[Program, List[Program], ErrorResponse]
ProgramCreateResponse = Union[Program, ErrorResponse]

# Event endpoint responses  
EventResponse = Union[Event, List[Event], ErrorResponse]
EventCreateResponse = Union[Event, ErrorResponse]

# Report endpoint responses
ReportResponse = Union[Report, List[Report], ErrorResponse]
ReportCreateResponse = Union[Report, ErrorResponse]

# VEN endpoint responses
VenResponse = Union[Ven, List[Ven], ErrorResponse]
VenCreateResponse = Union[Ven, ErrorResponse]

# Subscription endpoint responses
SubscriptionResponse = Union[Subscription, List[Subscription], ErrorResponse]
SubscriptionCreateResponse = Union[Subscription, ErrorResponse]

# Notification endpoint responses
NotificationResponse = Union[Notification, List[Notification], ErrorResponse]

# Authentication responses
TokenResponse = Union[Dict[str, str], ErrorResponse]
'''
    
    response_file = OUTPUT_DIR / "responses.py"
    response_file.write_text(response_code)
    console.print("✅ Generated response type definitions")
    return True


def generate_validators() -> bool:
    """Generate validation functions"""
    
    validator_code = '''"""
OpenADR 3.1.0 Data Validators
Auto-generated validation functions - do not edit manually
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
    
    validator_file = OUTPUT_DIR / "validators.py"
    validator_file.write_text(validator_code)
    console.print("✅ Generated validation functions")
    return True


def generate_init_file() -> bool:
    """Generate __init__.py for the generated package"""
    
    init_code = '''"""
OpenADR 3.1.0 Python Types and Validators
Auto-generated from OpenADR specification - do not edit manually
"""

from .models import *
from .responses import *
from .validators import *

__version__ = "3.1.0"
__all__ = [
    # Core models (exported from models.py)
    "Program", "Event", "Report", "Ven", "Subscription", "Notification",
    "EventPayload", "ReportPayload", "Interval", "Point", "ValuesMap",
    "Resource", "ReportDescriptor", "IntervalPeriod", "ObjectID",
    
    # Response types
    "ApiResponse", "ErrorResponse",
    "ProgramResponse", "EventResponse", "ReportResponse", 
    "VenResponse", "SubscriptionResponse", "NotificationResponse",
    
    # Validation
    "ValidationResult",
    "validate_program", "validate_event", "validate_report", 
    "validate_ven", "validate_subscription", "validate_openadr_object",
]
'''
    
    init_file = OUTPUT_DIR / "__init__.py"
    init_file.write_text(init_code)
    console.print("✅ Generated package __init__.py")
    return True


@app.command()
def main():
    """Generate OpenADR 3.1.0 Python types and validators"""
    
    console.print("🚀 [bold]Generating OpenADR 3.1.0 Python types with pydantic validation[/bold]")
    console.print(f"📄 Source spec: {SPEC_PATH}")
    console.print(f"📁 Output directory: {OUTPUT_DIR}")
    
    # Ensure output directory exists
    ensure_output_dir()
    
    # Check if spec file exists
    if not SPEC_PATH.exists():
        console.print(f"❌ OpenAPI spec file not found: {SPEC_PATH}")
        raise typer.Exit(1)
    
    success = True
    
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:
        
        # Generate pydantic models
        task = progress.add_task("Generating pydantic models...", total=None)
        if not generate_pydantic_models():
            success = False
        progress.update(task, completed=True)
        
        # Generate response types
        task = progress.add_task("Generating response types...", total=None)  
        if not generate_response_types():
            success = False
        progress.update(task, completed=True)
        
        # Generate validators
        task = progress.add_task("Generating validators...", total=None)
        if not generate_validators():
            success = False
        progress.update(task, completed=True)
        
        # Generate API endpoint types
        task = progress.add_task("Generating API endpoint types...", total=None)
        try:
            from build_api_types import generate_api_types, generate_api_operations_index
            if not generate_api_types() or not generate_api_operations_index():
                success = False
        except Exception as e:
            console.print(f"[red]API types generation failed: {e}[/red]")
            success = False
        progress.update(task, completed=True)
        
        # Generate __init__.py
        task = progress.add_task("Generating package init...", total=None)
        if not generate_init_file():
            success = False
        progress.update(task, completed=True)
    
    if success:
        console.print("\n✅ [bold green]Types generated successfully![/bold green]")
        console.print("📝 [cyan]Features included:[/cyan]")
        console.print("   • Pydantic v2 models with full validation")
        console.print("   • Field constraints and descriptions preserved")
        console.print("   • Type hints for Python 3.11+")
        console.print("   • API endpoint parameter and response types")
        console.print("   • Response type definitions for all endpoints")
        console.print("   • Validation functions with detailed error reporting")
        console.print("   • Snake_case field names (Python convention)")
        console.print(f"\n📦 Generated files in {OUTPUT_DIR}:")
        for file in OUTPUT_DIR.glob("*.py"):
            console.print(f"   • {file.name}")
    else:
        console.print("\n❌ [bold red]Generation failed![/bold red]")
        raise typer.Exit(1)


if __name__ == "__main__":
    app()