# OpenADR 3 Go Implementation

Complete Go implementation of OpenADR 3.1.0 types and data validation functions, including comprehensive API endpoint parameter and response types.

## Directory Structure

```
golang/
├── builder/           # Scripts for generating Go types from OpenAPI spec
│   ├── build_types.go    # Main type generation using oapi-codegen
│   ├── build_validation.go # Validation function generation
│   ├── demo_types.go     # Demo type generation (no external deps)
│   ├── common.go         # Common configuration and utilities
│   ├── main.go          # Main entry point with CLI options
│   └── go.mod           # Builder dependencies
├── package/           # Go package for distribution
│   ├── generated/       # Auto-generated types and validators
│   ├── go.mod          # Package dependencies
│   └── README.md       # Package documentation
├── test/              # Test suite
│   ├── validation_test.go # Validation function tests
│   └── types_test.go     # Type serialization and structure tests
└── docs/              # Documentation (future)
```

## Quick Start

1. **Setup the build environment**:
   ```bash
   cd builder
   go mod tidy
   ```

2. **Generate demo types** (no external dependencies):
   ```bash
   go run . -demo
   ```

3. **Generate types from OpenAPI specification** (requires oapi-codegen):
   ```bash
   go install github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen@latest
   go run .
   ```

4. **Test the generated types**:
   ```bash
   cd ../test
   go test ./...
   ```

## Type Generation

The Go implementation uses multiple tools to provide comprehensive coverage:

### Primary Tool: **oapi-codegen**
- **Industry standard** for OpenAPI to Go generation
- **Generates types** with proper JSON tags and validation
- **Creates client interfaces** for API consumption
- **Supports both** components/schemas and paths sections

### Generated Files

- `models.go` - Core Go structs for all OpenADR data types (components/schemas)
- `api_types.go` - API endpoint parameter and response types (paths)
- `client.go` - Generated client interfaces (optional)
- `server.go` - Generated server interfaces (optional)
- `validation.go` - Validation functions with detailed error reporting
- `validation_utils.go` - Validation utilities and custom validators

## Features

- **Complete OpenADR 3.1.0 coverage** - All schemas, endpoints, and responses
- **Dual generation approach** - Schema models + API endpoint types
- **45+ API operations** - All endpoints with parameter and response types
- **Modern Go** - Supports Go 1.21+ with generics and latest features
- **JSON tags** - Proper serialization/deserialization support
- **Struct validation** - Built-in validation using validator/v10
- **Type safety** - Full Go type system benefits
- **Field constraints** - Preserves all validation rules from OpenAPI spec

## Development

### Prerequisites

- Go 1.21 or higher
- Optional: oapi-codegen for full OpenAPI generation

### Building Types

```bash
# Setup environment
cd builder
go mod tidy

# Generate demo types (no external dependencies)
go run . -demo

# Generate full types from OpenAPI (requires oapi-codegen)
go install github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen@latest
go run . -types -validation

# Run tests
cd ../package && go mod tidy
cd ../test && go test ./...
```

### Package Structure

The generated package follows Go best practices:

- Uses Go modules for dependency management
- Includes comprehensive struct tags for JSON and validation
- Provides both high-level and low-level validation APIs
- Follows Go naming conventions and idioms

## Usage Example

```go
package main

import (
    "fmt"
    "time"
    
    openadr3 "github.com/clean-energy-tools/openadr-3-types/golang/package/generated"
)

func main() {
    // Create program data
    program := openadr3.Program{
        ID:                   "program-1",
        CreatedDateTime:      time.Now(),
        ModificationDateTime: time.Now(),
        ProgramName:          "Demand Response Program",
        RetailerName:         "Utility Company",
        ProgramType:          openadr3.ProgramTypeDemandResponse,
        Country:              "US",
    }

    // Validate and use typed object
    result := openadr3.ValidateProgram(program)
    if result.Valid {
        fmt.Printf("Created program: %s\n", program.ProgramName)
    } else {
        for _, err := range result.Errors {
            fmt.Printf("Validation error: %s\n", err.Message)
        }
    }
}
```

## Architecture

This implementation uses the same architectural pattern as the Node.js and Python versions:

- **oapi-codegen** instead of openapi-codegen for type generation
- **validator/v10** instead of Joi/Zod for validation
- **Go structs** instead of TypeScript interfaces for type definitions
- **Go modules** instead of npm for package management

The generated types maintain compatibility with the OpenADR 3.1.0 specification while following Go conventions and best practices.

## Tools and Dependencies

**Primary tools**:
- `oapi-codegen` - OpenAPI to Go code generation
- `validator/v10` - Struct validation with tags
- `kin-openapi` - OpenAPI 3 parsing and validation

**Generated Features**:
- **Schema types** from components/schemas
- **API parameter types** from paths section
- **Response types** for all endpoints
- **Client interfaces** for API consumption
- **Server interfaces** for API implementation
- **Validation functions** with detailed error reporting

## Testing

The implementation includes comprehensive tests:

- **Type serialization tests** - JSON marshaling/unmarshaling
- **Validation tests** - All validation functions and edge cases
- **API parameter tests** - Endpoint parameter validation
- **Structure tests** - Correct type generation and tags

## Generated Type Coverage

**From `components/schemas`**:
- `Program`, `Event`, `Report`, `Ven`, `Subscription`, etc.
- Go structs with JSON and validation tags

**From `paths` section**:
- **Parameter types**: `SearchAllProgramsParams`, `SearchProgramByProgramIdParams`
- **Response types**: `SearchAllProgramsResponse`, `CreateProgramResponse`
- **Error types**: `ErrorResponse` with structured error information
- **Body types**: `CreateProgramBody`, `UpdateProgramBody`

The Go implementation provides the same comprehensive type coverage as the Node.js and Python versions while leveraging Go's type system and performance benefits.