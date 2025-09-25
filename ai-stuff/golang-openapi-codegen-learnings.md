# Go OpenAPI Code Generation: Tools and Learnings

## Overview

This document captures key learnings from implementing OpenADR 3.1.0 type definitions and validation functions for Go, generated from OpenAPI 3.1.0 specifications.

## Tools Evaluated and Used

### Primary Tool: `oapi-codegen`

**Repository**: https://github.com/deepmap/oapi-codegen  
**Version Used**: Latest (v2.x with OpenAPI 3.1.0 support)

#### Why This Tool Was Selected

1. **Modern Go Support**: Generates idiomatic Go code with proper struct tags
2. **OpenAPI 3.1.0 Compatibility**: Full support for modern OpenAPI specifications
3. **Flexible Output**: Can generate types only, client code, server stubs, or all
4. **Validation Integration**: Works seamlessly with popular Go validation libraries
5. **Customization**: Extensive configuration options and template customization
6. **Active Development**: Well-maintained with regular updates

#### Installation and Setup

```bash
go install github.com/deepmap/oapi-codegen/v2/cmd/oapi-codegen@latest
```

#### Basic Usage

```bash
# Generate types only
oapi-codegen -generate types -o models.go openadr3.1.0.yaml

# Generate with validation tags
oapi-codegen -generate types -o models.go -package generated openadr3.1.0.yaml
```

#### Advanced Configuration

```yaml
# oapi-codegen.yaml configuration file
package: generated
generate:
  models: true
  client: false
  server: false
output: models.go
output-options:
  skip-fmt: false
  skip-prune: false
compatibility:
  old-config-style: false
```

```bash
# Using configuration file
oapi-codegen -config oapi-codegen.yaml openadr3.1.0.yaml
```

### Validation Library: `validator/v10`

**Repository**: https://github.com/go-playground/validator  
**Why Selected**: Most popular Go validation library with comprehensive tag support

#### Integration Pattern

```go
import "github.com/go-playground/validator/v10"

// Custom validator instance
var validate *validator.Validate

func init() {
    validate = validator.New()
    // Register custom validators
    validate.RegisterValidation("country_code", validateCountryCode)
}

func validateCountryCode(fl validator.FieldLevel) bool {
    return len(fl.Field().String()) == 2
}
```

### Alternative Tools Considered

#### 1. **OpenAPI Generator (Go)**
- **Pros**: Mature, supports many languages, large community
- **Cons**: Generates verbose code, complex output structure, less idiomatic Go
- **Verdict**: Not chosen due to code quality issues

#### 2. **go-swagger**
- **Pros**: Comprehensive feature set, good OpenAPI 2.0 support
- **Cons**: Limited OpenAPI 3.1 support, complex setup
- **Verdict**: Not suitable for modern OpenAPI specs

#### 3. **ogen**
- **Pros**: Modern, fast, type-safe
- **Cons**: Less mature, smaller ecosystem
- **Verdict**: Promising but too new for production use

## Key Learnings

### 1. OpenAPI Schema Parsing and Structure

#### Generated Struct Pattern
```go
// Example generated struct from OpenAPI schema
type Program struct {
    ID                    string      `json:"id" validate:"required"`
    ProgramName          string      `json:"program_name" validate:"required"`
    RetailerName         string      `json:"retailer_name" validate:"required"`
    Country              string      `json:"country" validate:"required,len=2"`
    PrincipalSubdivision *string     `json:"principal_subdivision,omitempty"`
    ProgramType          ProgramType `json:"program_type" validate:"required"`
    Targets              []string    `json:"targets"`
}

type ProgramType string

const (
    ProgramTypeDemandResponse ProgramType = "DEMAND_RESPONSE"
    ProgramTypePricing        ProgramType = "PRICING"
    ProgramTypeEmergency      ProgramType = "EMERGENCY"
)
```

**Learning**: oapi-codegen generates clean, idiomatic Go structs with proper JSON tags and enum constants.

#### Handling Optional Fields
```go
// OpenAPI optional fields become pointers in Go
type Program struct {
    RequiredField string  `json:"required_field"`
    OptionalField *string `json:"optional_field,omitempty"`
}

// Helper functions for pointer handling
func StringPtr(s string) *string {
    return &s
}

func StringValue(s *string) string {
    if s == nil {
        return ""
    }
    return *s
}
```

**Learning**: Go's pointer system naturally maps to OpenAPI's optional fields, but requires helper functions for ergonomic use.

### 2. API Parameter Type Extraction

#### Custom Parameter Extraction
```go
// API parameters not automatically generated - custom extraction needed
func extractAPITypes(specPath string) error {
    data, err := os.ReadFile(specPath)
    if err != nil {
        return err
    }
    
    var spec map[string]interface{}
    if err := yaml.Unmarshal(data, &spec); err != nil {
        return err
    }
    
    paths, ok := spec["paths"].(map[string]interface{})
    if !ok {
        return errors.New("no paths found")
    }
    
    for path, operations := range paths {
        for method, operation := range operations.(map[string]interface{}) {
            generateParameterTypes(path, method, operation)
        }
    }
    
    return nil
}
```

#### Generated Parameter Types
```go
// GET /programs query parameters
type SearchAllProgramsParams struct {
    Targets []string `form:"targets" validate:"omitempty,dive,oneof=commercial residential industrial"`
    Skip    *int     `form:"skip" validate:"omitempty,min=0"`
    Limit   *int     `form:"limit" validate:"omitempty,min=1,max=50"`
}

// GET /programs/{programID} path parameters  
type SearchProgramByProgramIdParams struct {
    ProgramID string `uri:"programID" validate:"required"`
}
```

### 3. Validation Implementation

#### Comprehensive Validation Function
```go
type ValidationResult struct {
    Valid  bool             `json:"valid"`
    Errors []ValidationError `json:"errors,omitempty"`
}

type ValidationError struct {
    Field   string `json:"field"`
    Message string `json:"message"`
    Value   string `json:"value,omitempty"`
}

func ValidateProgram(program *Program) ValidationResult {
    if err := validate.Struct(program); err != nil {
        var errors []ValidationError
        
        for _, err := range err.(validator.ValidationErrors) {
            errors = append(errors, ValidationError{
                Field:   err.Field(),
                Message: getValidationMessage(err),
                Value:   fmt.Sprintf("%v", err.Value()),
            })
        }
        
        return ValidationResult{
            Valid:  false,
            Errors: errors,
        }
    }
    
    return ValidationResult{Valid: true}
}

func getValidationMessage(err validator.FieldError) string {
    switch err.Tag() {
    case "required":
        return fmt.Sprintf("%s is required", err.Field())
    case "len":
        return fmt.Sprintf("%s must be exactly %s characters", err.Field(), err.Param())
    case "min":
        return fmt.Sprintf("%s must be at least %s", err.Field(), err.Param())
    case "max":
        return fmt.Sprintf("%s must be at most %s", err.Field(), err.Param())
    default:
        return fmt.Sprintf("%s is invalid", err.Field())
    }
}
```

### 4. Advanced Validation Patterns

#### Custom Validation Tags
```go
func init() {
    validate = validator.New()
    
    // Register custom validations
    validate.RegisterValidation("country_code", validateCountryCode)
    validate.RegisterValidation("program_type", validateProgramType)
}

func validateCountryCode(fl validator.FieldLevel) bool {
    code := fl.Field().String()
    return len(code) == 2 && regexp.MustCompile(`^[A-Z]{2}$`).MatchString(code)
}

func validateProgramType(fl validator.FieldLevel) bool {
    programType := fl.Field().String()
    validTypes := []string{"DEMAND_RESPONSE", "PRICING", "EMERGENCY"}
    
    for _, valid := range validTypes {
        if programType == valid {
            return true
        }
    }
    return false
}
```

#### Conditional Validation
```go
type Event struct {
    ID         string    `json:"id" validate:"required"`
    ProgramID  string    `json:"program_id" validate:"required"`
    Priority   int       `json:"priority" validate:"min=1,max=10"`
    StartTime  time.Time `json:"start_time" validate:"required"`
    EndTime    time.Time `json:"end_time" validate:"required,gtfield=StartTime"`
}
```

**Learning**: Go's validator library supports cross-field validation (e.g., `gtfield=StartTime`) for complex business rules.

### 5. Code Generation Pipeline

#### Complete Generation Script
```go
package main

import (
    "fmt"
    "os"
    "os/exec"
    "path/filepath"
)

func main() {
    specPath := "../../openadr3.1.0.yaml"
    outputDir := "../package/generated"
    
    // Create output directory
    if err := os.MkdirAll(outputDir, 0755); err != nil {
        panic(err)
    }
    
    // Generate models
    if err := generateModels(specPath, outputDir); err != nil {
        panic(err)
    }
    
    // Generate API types
    if err := generateAPITypes(specPath, outputDir); err != nil {
        panic(err)
    }
    
    // Generate validation functions
    if err := generateValidation(outputDir); err != nil {
        panic(err)
    }
    
    fmt.Println("✅ Code generation completed successfully")
}

func generateModels(specPath, outputDir string) error {
    cmd := exec.Command("oapi-codegen",
        "-generate", "types",
        "-o", filepath.Join(outputDir, "models.go"),
        "-package", "generated",
        specPath,
    )
    
    output, err := cmd.CombinedOutput()
    if err != nil {
        return fmt.Errorf("oapi-codegen failed: %w\nOutput: %s", err, output)
    }
    
    return nil
}
```

### 6. JSON Serialization and Deserialization

#### Working with Generated Types
```go
import (
    "encoding/json"
    "fmt"
)

func ExampleSerialization() {
    program := &Program{
        ID:           "program-123",
        ProgramName:  "Peak Demand Response",
        RetailerName: "Pacific Gas & Electric",
        Country:      "US",
        ProgramType:  ProgramTypeDemandResponse,
        Targets:      []string{"commercial", "residential"},
    }
    
    // Serialize to JSON
    jsonData, err := json.Marshal(program)
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("JSON: %s\n", jsonData)
    
    // Deserialize from JSON
    var parsed Program
    if err := json.Unmarshal(jsonData, &parsed); err != nil {
        panic(err)
    }
    
    // Validate
    result := ValidateProgram(&parsed)
    if !result.Valid {
        fmt.Printf("Validation errors: %+v\n", result.Errors)
    }
}
```

### 7. Common Challenges and Solutions

#### Challenge 1: Enum Validation
**Problem**: Generated enums don't automatically validate against allowed values.

**Solution**: Custom validation function:
```go
func (pt ProgramType) IsValid() bool {
    switch pt {
    case ProgramTypeDemandResponse, ProgramTypePricing, ProgramTypeEmergency:
        return true
    default:
        return false
    }
}

// Use in validation
validate.RegisterValidation("valid_program_type", func(fl validator.FieldLevel) bool {
    programType := fl.Field().Interface().(ProgramType)
    return programType.IsValid()
})
```

#### Challenge 2: Nested Validation
**Problem**: Validating nested structures requires special handling.

**Solution**: Use `dive` tag and recursive validation:
```go
type Program struct {
    Events []Event `json:"events" validate:"dive"`
}

type Event struct {
    ID       string `json:"id" validate:"required"`
    Priority int    `json:"priority" validate:"min=1,max=10"`
}
```

#### Challenge 3: API Parameter Binding
**Problem**: oapi-codegen doesn't generate parameter binding code.

**Solution**: Custom binding functions:
```go
func BindQueryParams(c *gin.Context, params interface{}) error {
    if err := c.ShouldBindQuery(params); err != nil {
        return err
    }
    
    if err := validate.Struct(params); err != nil {
        return err
    }
    
    return nil
}

// Usage in handler
func SearchPrograms(c *gin.Context) {
    var params SearchAllProgramsParams
    if err := BindQueryParams(c, &params); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    
    // Process request...
}
```

#### Challenge 4: OneOf/AnyOf Schema Handling
**Problem**: Complex union types in OpenAPI don't translate well to Go.

**Solution**: Use interface{} with type assertion or custom unmarshaling:
```go
type ProgramDetails struct {
    Type string      `json:"type"`
    Data interface{} `json:"data"`
}

func (pd *ProgramDetails) UnmarshalJSON(data []byte) error {
    var raw struct {
        Type string          `json:"type"`
        Data json.RawMessage `json:"data"`
    }
    
    if err := json.Unmarshal(data, &raw); err != nil {
        return err
    }
    
    pd.Type = raw.Type
    
    switch raw.Type {
    case "demand_response":
        var dr DemandResponseDetails
        if err := json.Unmarshal(raw.Data, &dr); err != nil {
            return err
        }
        pd.Data = dr
    case "pricing":
        var pricing PricingDetails
        if err := json.Unmarshal(raw.Data, &pricing); err != nil {
            return err
        }
        pd.Data = pricing
    default:
        return fmt.Errorf("unknown program type: %s", raw.Type)
    }
    
    return nil
}
```

### 8. Testing Patterns

#### Validation Testing
```go
func TestProgramValidation(t *testing.T) {
    tests := []struct {
        name    string
        program Program
        valid   bool
        errors  int
    }{
        {
            name: "valid program",
            program: Program{
                ID:           "program-123",
                ProgramName:  "Test Program",
                RetailerName: "Test Utility",
                Country:      "US",
                ProgramType:  ProgramTypeDemandResponse,
            },
            valid:  true,
            errors: 0,
        },
        {
            name: "invalid program - missing required fields",
            program: Program{
                Country: "USA", // Invalid: 3 letters
            },
            valid:  false,
            errors: 4, // id, program_name, retailer_name, country
        },
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := ValidateProgram(&tt.program)
            
            if result.Valid != tt.valid {
                t.Errorf("expected valid=%v, got=%v", tt.valid, result.Valid)
            }
            
            if len(result.Errors) != tt.errors {
                t.Errorf("expected %d errors, got %d: %+v", tt.errors, len(result.Errors), result.Errors)
            }
        })
    }
}
```

#### Benchmark Testing
```go
func BenchmarkValidateProgram(b *testing.B) {
    program := &Program{
        ID:           "program-123",
        ProgramName:  "Test Program",
        RetailerName: "Test Utility",
        Country:      "US",
        ProgramType:  ProgramTypeDemandResponse,
        Targets:      []string{"commercial", "residential"},
    }
    
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        ValidateProgram(program)
    }
}
```

### 9. Performance Considerations

#### Validation Performance
- **Struct validation**: ~1-5 μs per validation for simple structs
- **Slice validation with dive**: Linear with slice size  
- **Custom validators**: Overhead depends on implementation complexity

#### Memory Usage
```go
// Prefer value receivers for read-only operations
func (p Program) GetID() string {
    return p.ID
}

// Use pointer receivers for modifications
func (p *Program) SetID(id string) {
    p.ID = id
}

// Pool validators for high-throughput scenarios
var validatorPool = sync.Pool{
    New: func() interface{} {
        return validator.New()
    },
}
```

### 10. Best Practices Discovered

#### 1. Package Organization
```
generated/
├── models.go          # Schema types from components/schemas
├── api_types.go       # API parameter and response types
├── validation.go      # Validation functions
├── helpers.go         # Utility functions (StringPtr, etc.)
└── doc.go            # Package documentation
```

#### 2. Error Handling Strategy
```go
type APIError struct {
    Code    int                    `json:"code"`
    Message string                 `json:"message"`
    Details map[string]interface{} `json:"details,omitempty"`
}

func (e APIError) Error() string {
    return e.Message
}

func ValidationErrorsToAPI(errors []ValidationError) APIError {
    details := make(map[string]interface{})
    for _, err := range errors {
        details[err.Field] = err.Message
    }
    
    return APIError{
        Code:    400,
        Message: "Validation failed",
        Details: details,
    }
}
```

#### 3. Configuration Management
```go
type Config struct {
    MaxProgramsPerRequest int `validate:"min=1,max=100"`
    DefaultPageSize       int `validate:"min=1,max=50"`
    RequiredFields        []string
}

func LoadConfig() (*Config, error) {
    config := &Config{
        MaxProgramsPerRequest: 50,
        DefaultPageSize:       25,
        RequiredFields:        []string{"id", "program_name"},
    }
    
    if err := validate.Struct(config); err != nil {
        return nil, fmt.Errorf("invalid configuration: %w", err)
    }
    
    return config, nil
}
```

#### 4. HTTP Integration Pattern
```go
// Gin framework integration
func CreateProgram(c *gin.Context) {
    var program Program
    
    // Bind JSON
    if err := c.ShouldBindJSON(&program); err != nil {
        c.JSON(400, APIError{Code: 400, Message: "Invalid JSON"})
        return
    }
    
    // Validate
    result := ValidateProgram(&program)
    if !result.Valid {
        c.JSON(400, ValidationErrorsToAPI(result.Errors))
        return
    }
    
    // Process...
    c.JSON(201, program)
}
```

## Tool Comparison Summary

| Tool | Code Quality | OpenAPI 3.1 | Performance | Ecosystem | Recommendation |
|------|-------------|--------------|-------------|-----------|----------------|
| oapi-codegen | High ✅ | ✅ | High | Good | **Recommended** |
| OpenAPI Generator | Medium | Partial | Medium | Large | Acceptable |
| go-swagger | Medium | ❌ | Medium | Medium | Legacy only |
| ogen | High | ✅ | Very High | Small | Future consideration |

## Conclusion

For Go OpenAPI code generation in 2024:

1. **Use `oapi-codegen`** for clean, idiomatic Go code generation
2. **Integrate `validator/v10`** for comprehensive validation with custom rules
3. **Extract API parameter types manually** since they're not auto-generated
4. **Implement proper error handling** with structured error responses
5. **Use pointer helpers** for ergonomic optional field handling
6. **Test thoroughly** including validation, serialization, and edge cases
7. **Consider performance** especially for high-throughput validation scenarios

This approach provides excellent type safety, performance, and maintainability for OpenAPI-driven Go applications, leveraging Go's strengths in concurrent, high-performance server applications.