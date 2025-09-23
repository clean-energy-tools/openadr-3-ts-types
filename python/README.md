# OpenADR 3 Python Implementation

Complete Python implementation of OpenADR 3.1.0 types and data validation functions, including comprehensive API endpoint parameter and response types.

## Directory Structure

```
python/
├── builder/           # Scripts for generating Python types from OpenAPI spec
│   ├── build_types.py    # Main type generation script
│   ├── common.py         # Common configuration and utilities
│   ├── setup.py         # Environment setup script
│   └── requirements.txt  # Dependencies for type generation
├── package/           # Python package for distribution
│   ├── src/             # Package source code
│   │   ├── generated/   # Auto-generated types and validators
│   │   └── __init__.py  # Package initialization
│   ├── pyproject.toml   # Package configuration
│   └── README.md        # Package documentation
├── test/              # Test suite
│   └── test_types.py    # Type generation and validation tests
└── docs/              # Documentation (future)
```

## Quick Start

1. **Setup the build environment**:
   ```bash
   cd builder
   python setup.py
   ```

2. **Generate types from OpenAPI specification**:
   ```bash
   python build_types.py
   ```

3. **Test the generated types**:
   ```bash
   cd ../test
   python test_types.py
   ```

## Type Generation

The type generation process uses `datamodel-code-generator` to create:

- **Pydantic v2 models** with full validation from OpenAPI schemas
- **Response types** for all API endpoints  
- **Validation functions** with detailed error reporting
- **Type annotations** for modern Python IDE support

### Generated Files

- `models.py` - Core pydantic models for all OpenADR data types (components/schemas)
- `api_types.py` - API endpoint parameter and response types (paths section)
- `api_operations.py` - Registry of all API operations with metadata
- `responses.py` - Response type definitions for API endpoints
- `validators.py` - Validation functions with error handling
- `__init__.py` - Package exports and version info

## Features

- **Complete OpenADR 3.1.0 coverage** - All schemas, endpoints, and responses
- **Dual generation approach** - Schema models + API endpoint types
- **45 API operations** - All endpoints with parameter and response types
- **Modern Python** - Supports Python 3.11+ with Union operators and type hints
- **Pydantic validation** - Built-in data validation with detailed error messages
- **Field constraints** - Preserves all validation rules from OpenAPI spec
- **Snake case naming** - Follows Python conventions
- **Type safety** - Full type annotations for IDE support

## Development

### Prerequisites

- Python 3.11 or higher
- pip package manager

### Building Types

```bash
# Setup environment
cd builder
python setup.py

# Generate types 
python build_types.py

# Run tests
cd ../test  
python test_types.py
```

### Package Structure

The generated package follows Python best practices:

- Uses `pyproject.toml` for modern package configuration
- Includes type stub files (`py.typed`)
- Provides development dependencies for testing and linting
- Follows semantic versioning

## Usage Example

```python
from openadr_3_types import Program, validate_program

# Create program data
program_data = {
    "id": "program-1",
    "created_date_time": "2024-01-01T00:00:00Z",
    "modification_date_time": "2024-01-01T00:00:00Z", 
    "program_name": "Demand Response Program",
    "program_type": "PRICING_TARIFF",
    "country": "US"
}

# Validate and create typed object
result = validate_program(program_data)
if result.success:
    program: Program = result.data
    print(f"Created program: {program.program_name}")
```

## Architecture

This implementation mirrors the Node.js structure but uses Python-specific tools:

- **datamodel-code-generator** instead of openapi-codegen for type generation  
- **Pydantic v2** instead of TypeScript for type definitions and validation
- **pytest** instead of Node.js test runners for testing
- **Python packaging** instead of npm for distribution

The generated types maintain compatibility with the OpenADR 3.1.0 specification while following Python conventions and best practices.