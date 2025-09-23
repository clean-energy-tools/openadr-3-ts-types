# OpenADR 3 Python Types

Python types and data validation for OpenADR v3.1.0 specification.

## Features

- **Complete Type Coverage**: Full Python type definitions for all OpenADR 3.1.0 data structures
- **Pydantic Validation**: Built-in data validation using Pydantic v2 with detailed error reporting
- **Modern Python**: Supports Python 3.11+ with modern type hints and Union operators
- **Field Constraints**: Preserves all validation constraints from the OpenAPI specification
- **Response Types**: Type definitions for all API endpoint responses
- **Snake Case**: Follows Python naming conventions with snake_case field names

## Installation

```bash
pip install openadr-3-types
```

## Quick Start

```python
from openadr_3_types import Program, validate_program, ValidationResult

# Create a program instance
program_data = {
    "id": "program-1",
    "created_date_time": "2024-01-01T00:00:00Z", 
    "modification_date_time": "2024-01-01T00:00:00Z",
    "program_name": "Demand Response Program",
    "program_long_name": "Commercial Demand Response Program",
    "retailer_name": "Utility Company",
    "retailer_long_name": "Local Utility Company",
    "program_type": "PRICING_TARIFF",
    "country": "US",
    "principal_subdivision": "CA"
}

# Validate and create typed object
result: ValidationResult = validate_program(program_data)

if result.success:
    program: Program = result.data
    print(f"Program created: {program.program_name}")
else:
    print(f"Validation errors: {result.errors}")

# Direct instantiation with validation
try:
    program = Program(**program_data)
    print(f"Program: {program.program_name}")
except ValidationError as e:
    print(f"Validation failed: {e}")
```

## Available Types

### Core Models
- `Program` - Energy programs
- `Event` - Demand response events  
- `Report` - Energy reports and telemetry
- `Ven` - Virtual End Node (customer device/system)
- `Subscription` - Event subscriptions
- `Notification` - System notifications

### Supporting Types
- `EventPayload` - Event data payloads
- `ReportPayload` - Report data payloads
- `Interval` - Time intervals with data points
- `Point` - Individual data measurements
- `ValuesMap` - Key-value data mappings
- `Resource` - Energy resources
- `ReportDescriptor` - Report metadata

### Response Types
- `ProgramResponse` - Program API responses
- `EventResponse` - Event API responses
- `ReportResponse` - Report API responses
- `VenResponse` - VEN API responses
- `SubscriptionResponse` - Subscription API responses

## Validation

```python
from openadr_3_types import validate_openadr_object

# Validate any OpenADR object by type
result = validate_openadr_object("program", program_data)
result = validate_openadr_object("event", event_data)
result = validate_openadr_object("ven", ven_data)
```

## Type Safety

All models include complete type annotations for excellent IDE support:

```python
from openadr_3_types import Event, EventPayload
from typing import Optional
from datetime import datetime

def process_event(event: Event) -> Optional[str]:
    """Process an OpenADR event with full type safety"""
    if event.event_payloads:
        payload: EventPayload = event.event_payloads[0]
        return f"Event {event.id} scheduled for {event.intervals[0].start}"
    return None
```

## Development

This package is auto-generated from the OpenADR 3.1.0 specification. 

To regenerate types:
```bash
cd builder
pip install -r requirements.txt
python build_types.py
```

## License

MIT License - see LICENSE file for details.