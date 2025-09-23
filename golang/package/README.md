# OpenADR 3 Go Types

Go types and data validation for OpenADR v3.1.0 specification.

## Features

- **Complete Type Coverage**: Full Go struct definitions for all OpenADR 3.1.0 data structures
- **JSON Tags**: Proper JSON serialization/deserialization support
- **Validation**: Built-in data validation using struct tags and validator library
- **Modern Go**: Supports Go 1.21+ with generics and latest features
- **Field Constraints**: Preserves all validation constraints from the OpenAPI specification
- **API Types**: Type definitions for all API endpoint parameters and responses
- **Client Types**: Generated client interfaces for API consumption

## Installation

```bash
go get github.com/clean-energy-tools/openadr-3-types/golang/package
```

## Quick Start

```go
package main

import (
    "fmt"
    "log"
    "time"
    
    openadr3 "github.com/clean-energy-tools/openadr-3-types/golang/package/generated"
)

func main() {
    // Create a program instance
    program := openadr3.Program{
        ID:                   "program-1",
        CreatedDateTime:      time.Now(),
        ModificationDateTime: time.Now(),
        ProgramName:          "Demand Response Program",
        ProgramLongName:      stringPtr("Commercial Demand Response Program"),
        RetailerName:         "Utility Company",
        RetailerLongName:     stringPtr("Local Utility Company"),
        ProgramType:          openadr3.ProgramTypeDemandResponse,
        Country:              "US",
        PrincipalSubdivision: stringPtr("CA"),
    }
    
    // Validate program
    result := openadr3.ValidateProgram(program)
    if result.Valid {
        fmt.Printf("Program created: %s\n", program.ProgramName)
    } else {
        for _, err := range result.Errors {
            fmt.Printf("Validation error: %s - %s\n", err.Field, err.Message)
        }
    }
}

func stringPtr(s string) *string {
    return &s
}
```

## Available Types

### Core Models (components/schemas)
- `Program` - Energy programs
- `Event` - Demand response events  
- `Report` - Energy reports and telemetry
- `Ven` - Virtual End Node (customer device/system)
- `Subscription` - Event subscriptions
- `Notification` - System notifications

### Supporting Types
- `EventPayload` - Event data payloads
- `Interval` - Time intervals with data points
- `Point` - Individual data measurements
- `ValuesMap` - Key-value data mappings
- `Resource` - Energy resources
- `ObjectID` - OpenADR object identifiers

### API Parameter Types (paths section)
- `SearchAllProgramsParams` - Query parameters for GET /programs
- `SearchProgramByProgramIdParams` - Path parameters for GET /programs/{id}
- `CreateProgramBody` - Request body for POST /programs
- `SearchAllEventsParams` - Query parameters for GET /events
- `CreateEventBody` - Request body for POST /events

### Response Types
- `SearchAllProgramsResponse` - Program list responses
- `CreateProgramResponse` - Program creation responses
- `ErrorResponse` - Standard error responses
- `APIResponse` - Generic API response wrapper

## Validation

```go
import openadr3 "github.com/clean-energy-tools/openadr-3-types/golang/package/generated"

// Validate any OpenADR object by type
result := openadr3.ValidateOpenADRObject("program", programData)
if !result.Valid {
    for _, err := range result.Errors {
        fmt.Printf("Error: %s\n", err.Message)
    }
}

// Validate API parameters
params := map[string]interface{}{
    "skip": 10,
    "limit": 25,
}
result = openadr3.ValidateAPIParams("searchAllPrograms", "query", params)
```

## Type Safety

All models include complete struct tags for JSON and validation:

```go
type Program struct {
    ID                   string       `json:"id" validate:"required,objectid"`
    CreatedDateTime      time.Time    `json:"createdDateTime" validate:"required"`
    ProgramName          string       `json:"programName" validate:"required,max=128"`
    ProgramType          ProgramType  `json:"programType" validate:"required"`
    Country              string       `json:"country" validate:"required,len=2"`
    // ... more fields
}

func ProcessProgram(program Program) error {
    // Type-safe access to all program fields
    if program.ProgramType == ProgramTypeDemandResponse {
        return handleDemandResponse(program)
    }
    return nil
}
```

## API Operations

Access metadata for all 45+ API operations:

```go
// Get operation metadata
op := openadr3.APIOperations["searchAllPrograms"]
fmt.Printf("Method: %s, Path: %s\n", op.Method, op.Path)
fmt.Printf("Parameters: %d, Has Body: %t\n", op.Parameters, op.HasBody)

// Total operations count
fmt.Printf("Total operations: %d\n", openadr3.TotalOperations)
```

## Development

### Prerequisites

- Go 1.21 or higher

### Building Types

```bash
# Setup and generate types
cd builder
go mod tidy
go run . -demo  # Generate demo types without external dependencies

# Or with full OpenAPI generation (requires oapi-codegen)
go install github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen@latest
go run .
```

### Testing

```bash
cd package
go test ./...
```

## Architecture

This implementation uses:

- **oapi-codegen** for OpenAPI to Go type generation
- **validator/v10** for struct validation
- **JSON tags** for proper serialization
- **Go generics** for type-safe validation

The generated types maintain compatibility with the OpenADR 3.1.0 specification while following Go conventions and idioms.

## Generated Files

- `models.go` - Core OpenADR data types (components/schemas)
- `api_types.go` - API endpoint parameter and response types (paths)
- `client.go` - Generated client interfaces (optional)
- `server.go` - Generated server interfaces (optional)
- `validation.go` - Validation functions with error handling

## License

MIT License - see LICENSE file for details.