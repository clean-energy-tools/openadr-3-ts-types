package main

import (
	"fmt"
	"os"
	"path/filepath"
	"text/template"
)

// generateDemoTypes creates demo Go types without requiring external tools
func generateDemoTypes(opts BuildOptions) error {
	PrintBanner("Generating demo Go types")
	
	// Ensure output directory exists
	if err := EnsureOutputDir(opts.OutputDir); err != nil {
		return err
	}
	
	// Generate demo models
	if err := generateDemoModels(opts); err != nil {
		return fmt.Errorf("failed to generate demo models: %w", err)
	}
	
	// Generate demo API types
	if err := generateDemoAPITypes(opts); err != nil {
		return fmt.Errorf("failed to generate demo API types: %w", err)
	}
	
	// Generate demo validation
	if err := generateDemoValidation(opts); err != nil {
		return fmt.Errorf("failed to generate demo validation: %w", err)
	}
	
	PrintSuccess("Demo types generated successfully")
	return nil
}

// generateDemoModels creates demo model types
func generateDemoModels(opts BuildOptions) error {
	outputFile := filepath.Join(opts.OutputDir, "models.go")
	
	tmpl := `// Package {{.PackageName}} provides OpenADR 3.1.0 types and validation
// This is a demo implementation showing the structure of generated types
package {{.PackageName}}

import (
	"time"
)

// ProgramType represents the type of OpenADR program
type ProgramType string

const (
	ProgramTypePricingTariff  ProgramType = "PRICING_TARIFF"
	ProgramTypeDemandResponse ProgramType = "DEMAND_RESPONSE"
	ProgramTypeEmergency      ProgramType = "EMERGENCY"
)

// ObjectType represents the type of OpenADR object
type ObjectType string

const (
	ObjectTypeProgram      ObjectType = "PROGRAM"
	ObjectTypeEvent        ObjectType = "EVENT"
	ObjectTypeReport       ObjectType = "REPORT"
	ObjectTypeVen          ObjectType = "VEN"
	ObjectTypeResource     ObjectType = "RESOURCE"
	ObjectTypeSubscription ObjectType = "SUBSCRIPTION"
)

// ObjectID represents an OpenADR object identifier
type ObjectID struct {
	ID         string      ` + "`json:\"id\" validate:\"required,objectid\"`" + `
	ObjectType *ObjectType ` + "`json:\"objectType,omitempty\"`" + `
}

// Point represents a data point with timestamp and value
type Point struct {
	Timestamp time.Time ` + "`json:\"timestamp\" validate:\"required\"`" + `
	Value     float64   ` + "`json:\"value\" validate:\"required\"`" + `
}

// Interval represents a time interval with data points
type Interval struct {
	ID       int      ` + "`json:\"id\" validate:\"required,min=0\"`" + `
	Start    time.Time ` + "`json:\"start\" validate:\"required\"`" + `
	Duration string   ` + "`json:\"duration\" validate:\"required,duration\"`" + `
	Points   []Point  ` + "`json:\"points,omitempty\"`" + `
}

// ValuesMap represents key-value mapping for flexible data
type ValuesMap struct {
	Type   string                 ` + "`json:\"type\" validate:\"required\"`" + `
	Values map[string]interface{} ` + "`json:\"values\" validate:\"required\"`" + `
}

// Program represents an OpenADR program definition
type Program struct {
	ID                     string       ` + "`json:\"id\" validate:\"required,objectid\"`" + `
	CreatedDateTime        time.Time    ` + "`json:\"createdDateTime\" validate:\"required\"`" + `
	ModificationDateTime   time.Time    ` + "`json:\"modificationDateTime\" validate:\"required\"`" + `
	ProgramName            string       ` + "`json:\"programName\" validate:\"required,max=128\"`" + `
	ProgramLongName        *string      ` + "`json:\"programLongName,omitempty\" validate:\"omitempty,max=255\"`" + `
	RetailerName           string       ` + "`json:\"retailerName\" validate:\"required,max=128\"`" + `
	RetailerLongName       *string      ` + "`json:\"retailerLongName,omitempty\" validate:\"omitempty,max=255\"`" + `
	ProgramType            ProgramType  ` + "`json:\"programType\" validate:\"required\"`" + `
	Country                string       ` + "`json:\"country\" validate:\"required,len=2\"`" + `
	PrincipalSubdivision   *string      ` + "`json:\"principalSubdivision,omitempty\" validate:\"omitempty,max=10\"`" + `
	TimeZoneOffset         *string      ` + "`json:\"timeZoneOffset,omitempty\"`" + `
	ProgramDescriptions    []ValuesMap  ` + "`json:\"programDescriptions,omitempty\"`" + `
	BindingEvents          *bool        ` + "`json:\"bindingEvents,omitempty\"`" + `
	LocalPrice             *bool        ` + "`json:\"localPrice,omitempty\"`" + `
}

// EventPayload represents event payload data
type EventPayload struct {
	Type   string     ` + "`json:\"type\" validate:\"required\"`" + `
	Values *ValuesMap ` + "`json:\"values,omitempty\"`" + `
}

// Event represents an OpenADR event definition
type Event struct {
	ID                   string         ` + "`json:\"id\" validate:\"required,objectid\"`" + `
	CreatedDateTime      time.Time      ` + "`json:\"createdDateTime\" validate:\"required\"`" + `
	ModificationDateTime time.Time      ` + "`json:\"modificationDateTime\" validate:\"required\"`" + `
	ProgramID            string         ` + "`json:\"programId\" validate:\"required,objectid\"`" + `
	EventName            *string        ` + "`json:\"eventName,omitempty\" validate:\"omitempty,max=128\"`" + `
	Priority             *int           ` + "`json:\"priority,omitempty\" validate:\"omitempty,min=0,max=10\"`" + `
	Intervals            []Interval     ` + "`json:\"intervals\" validate:\"required,min=1\"`" + `
	EventPayloads        []EventPayload ` + "`json:\"eventPayloads,omitempty\"`" + `
}

// Resource represents a VEN resource definition
type Resource struct {
	ID           string                   ` + "`json:\"id\" validate:\"required,objectid\"`" + `
	ResourceName string                   ` + "`json:\"resourceName\" validate:\"required,max=128\"`" + `
	VenID        string                   ` + "`json:\"venId\" validate:\"required,objectid\"`" + `
	Attributes   []map[string]interface{} ` + "`json:\"attributes,omitempty\"`" + `
}

// Ven represents a Virtual End Node definition
type Ven struct {
	ID                   string                   ` + "`json:\"id\" validate:\"required,objectid\"`" + `
	CreatedDateTime      time.Time                ` + "`json:\"createdDateTime\" validate:\"required\"`" + `
	ModificationDateTime time.Time                ` + "`json:\"modificationDateTime\" validate:\"required\"`" + `
	VenName              string                   ` + "`json:\"venName\" validate:\"required,max=128\"`" + `
	Attributes           []map[string]interface{} ` + "`json:\"attributes,omitempty\"`" + `
	Resources            []Resource               ` + "`json:\"resources,omitempty\"`" + `
}

// Report represents an OpenADR report definition
type Report struct {
	ID                   string      ` + "`json:\"id\" validate:\"required,objectid\"`" + `
	CreatedDateTime      time.Time   ` + "`json:\"createdDateTime\" validate:\"required\"`" + `
	ModificationDateTime time.Time   ` + "`json:\"modificationDateTime\" validate:\"required\"`" + `
	ProgramID            string      ` + "`json:\"programId\" validate:\"required,objectid\"`" + `
	EventID              *string     ` + "`json:\"eventId,omitempty\" validate:\"omitempty,objectid\"`" + `
	ClientName           string      ` + "`json:\"clientName\" validate:\"required,max=128\"`" + `
	Intervals            []Interval  ` + "`json:\"intervals,omitempty\"`" + `
}

// Subscription represents an event/program subscription
type Subscription struct {
	ID                   string     ` + "`json:\"id\" validate:\"required,objectid\"`" + `
	CreatedDateTime      time.Time  ` + "`json:\"createdDateTime\" validate:\"required\"`" + `
	ModificationDateTime time.Time  ` + "`json:\"modificationDateTime\" validate:\"required\"`" + `
	CallbackURL          string     ` + "`json:\"callbackUrl\" validate:\"required,url\"`" + `
	ObjectType           ObjectType ` + "`json:\"objectType\" validate:\"required\"`" + `
	ObjectID             *string    ` + "`json:\"objectId,omitempty\" validate:\"omitempty,objectid\"`" + `
}

// Notification represents a system notification
type Notification struct {
	ID          string     ` + "`json:\"id\" validate:\"required,objectid\"`" + `
	CreatedDateTime time.Time  ` + "`json:\"createdDateTime\" validate:\"required\"`" + `
	ObjectType  ObjectType ` + "`json:\"objectType\" validate:\"required\"`" + `
	ObjectID    string     ` + "`json:\"objectId\" validate:\"required,objectid\"`" + `
	Operation   string     ` + "`json:\"operation\" validate:\"required\"`" + `
	CallbackURL string     ` + "`json:\"callbackUrl\" validate:\"required,url\"`" + `
}
`

	// Execute template
	t, err := template.New("models").Parse(tmpl)
	if err != nil {
		return fmt.Errorf("failed to parse models template: %w", err)
	}
	
	file, err := os.Create(outputFile)
	if err != nil {
		return fmt.Errorf("failed to create models file: %w", err)
	}
	defer file.Close()
	
	data := struct {
		PackageName string
	}{
		PackageName: opts.PackageName,
	}
	
	if err := t.Execute(file, data); err != nil {
		return fmt.Errorf("failed to execute models template: %w", err)
	}
	
	PrintSuccess(fmt.Sprintf("Generated demo models: %s", outputFile))
	return nil
}

// generateDemoAPITypes creates demo API endpoint types
func generateDemoAPITypes(opts BuildOptions) error {
	outputFile := filepath.Join(opts.OutputDir, "api_types.go")
	
	tmpl := `package {{.PackageName}}

import (
	"time"
)

// API parameter types for OpenADR 3.1.0 endpoints

// SearchAllProgramsParams represents query parameters for GET /programs
type SearchAllProgramsParams struct {
	Targets []string ` + "`json:\"targets,omitempty\" form:\"targets\"`" + `
	Skip    *int     ` + "`json:\"skip,omitempty\" form:\"skip\" validate:\"omitempty,min=0\"`" + `
	Limit   *int     ` + "`json:\"limit,omitempty\" form:\"limit\" validate:\"omitempty,min=0,max=50\"`" + `
}

// SearchProgramByProgramIdParams represents path parameters for GET /programs/{programID}
type SearchProgramByProgramIdParams struct {
	ProgramID string ` + "`json:\"programId\" path:\"programID\" validate:\"required,objectid\"`" + `
}

// CreateProgramBody represents request body for POST /programs
type CreateProgramBody = Program

// SearchAllEventsParams represents query parameters for GET /events
type SearchAllEventsParams struct {
	ProgramID *string ` + "`json:\"programId,omitempty\" form:\"programId\" validate:\"omitempty,objectid\"`" + `
	Skip      *int    ` + "`json:\"skip,omitempty\" form:\"skip\" validate:\"omitempty,min=0\"`" + `
	Limit     *int    ` + "`json:\"limit,omitempty\" form:\"limit\" validate:\"omitempty,min=0,max=50\"`" + `
}

// CreateEventBody represents request body for POST /events
type CreateEventBody = Event

// SearchAllVensParams represents query parameters for GET /vens
type SearchAllVensParams struct {
	Skip  *int ` + "`json:\"skip,omitempty\" form:\"skip\" validate:\"omitempty,min=0\"`" + `
	Limit *int ` + "`json:\"limit,omitempty\" form:\"limit\" validate:\"omitempty,min=0,max=50\"`" + `
}

// CreateVenBody represents request body for POST /vens
type CreateVenBody = Ven

// SearchAllReportsParams represents query parameters for GET /reports
type SearchAllReportsParams struct {
	ProgramID *string ` + "`json:\"programId,omitempty\" form:\"programId\" validate:\"omitempty,objectid\"`" + `
	EventID   *string ` + "`json:\"eventId,omitempty\" form:\"eventId\" validate:\"omitempty,objectid\"`" + `
	Skip      *int    ` + "`json:\"skip,omitempty\" form:\"skip\" validate:\"omitempty,min=0\"`" + `
	Limit     *int    ` + "`json:\"limit,omitempty\" form:\"limit\" validate:\"omitempty,min=0,max=50\"`" + `
}

// CreateReportBody represents request body for POST /reports
type CreateReportBody = Report

// API response types

// APIResponse represents a generic API response
type APIResponse struct {
	StatusCode int                    ` + "`json:\"statusCode\"`" + `
	Headers    map[string]string      ` + "`json:\"headers,omitempty\"`" + `
	Data       interface{}            ` + "`json:\"data,omitempty\"`" + `
}

// ErrorResponse represents a standard error response
type ErrorResponse struct {
	Error   string                 ` + "`json:\"error\"`" + `
	Message string                 ` + "`json:\"message\"`" + `
	Details map[string]interface{} ` + "`json:\"details,omitempty\"`" + `
}

// Specific response types for each endpoint
type (
	SearchAllProgramsResponse    = []Program
	CreateProgramResponse        = Program
	SearchProgramByIdResponse    = Program
	SearchAllEventsResponse      = []Event
	CreateEventResponse          = Event
	SearchAllVensResponse        = []Ven
	CreateVenResponse            = Ven
	SearchAllReportsResponse     = []Report
	CreateReportResponse         = Report
)

// API operation metadata
type APIOperation struct {
	Method      string   ` + "`json:\"method\"`" + `
	Path        string   ` + "`json:\"path\"`" + `
	OperationID string   ` + "`json:\"operationId\"`" + `
	Summary     string   ` + "`json:\"summary\"`" + `
	Parameters  int      ` + "`json:\"parameters\"`" + `
	HasBody     bool     ` + "`json:\"hasBody\"`" + `
	ResponseCodes []string ` + "`json:\"responseCodes\"`" + `
}

// APIOperations contains metadata for all OpenADR 3.1.0 API operations
var APIOperations = map[string]APIOperation{
	"searchAllPrograms": {
		Method:        "GET",
		Path:          "/programs",
		OperationID:   "searchAllPrograms",
		Summary:       "searches all programs",
		Parameters:    3,
		HasBody:       false,
		ResponseCodes: []string{"200", "400", "401", "403", "500"},
	},
	"createProgram": {
		Method:        "POST",
		Path:          "/programs",
		OperationID:   "createProgram",
		Summary:       "create a program",
		Parameters:    0,
		HasBody:       true,
		ResponseCodes: []string{"201", "400", "401", "403", "409", "500"},
	},
	"searchProgramByProgramId": {
		Method:        "GET",
		Path:          "/programs/{programID}",
		OperationID:   "searchProgramByProgramId",
		Summary:       "searches programs by program ID",
		Parameters:    1,
		HasBody:       false,
		ResponseCodes: []string{"200", "400", "401", "403", "404", "500"},
	},
	"searchAllEvents": {
		Method:        "GET",
		Path:          "/events",
		OperationID:   "searchAllEvents",
		Summary:       "searches all events",
		Parameters:    3,
		HasBody:       false,
		ResponseCodes: []string{"200", "400", "401", "403", "500"},
	},
	"createEvent": {
		Method:        "POST",
		Path:          "/events",
		OperationID:   "createEvent",
		Summary:       "create an event",
		Parameters:    0,
		HasBody:       true,
		ResponseCodes: []string{"201", "400", "401", "403", "409", "500"},
	},
	"searchAllVens": {
		Method:        "GET",
		Path:          "/vens",
		OperationID:   "searchAllVens",
		Summary:       "searches all vens",
		Parameters:    2,
		HasBody:       false,
		ResponseCodes: []string{"200", "400", "401", "403", "500"},
	},
	"createVen": {
		Method:        "POST",
		Path:          "/vens",
		OperationID:   "createVen",
		Summary:       "create a ven",
		Parameters:    0,
		HasBody:       true,
		ResponseCodes: []string{"201", "400", "401", "403", "409", "500"},
	},
	"searchAllReports": {
		Method:        "GET",
		Path:          "/reports",
		OperationID:   "searchAllReports",
		Summary:       "searches all reports",
		Parameters:    4,
		HasBody:       false,
		ResponseCodes: []string{"200", "400", "401", "403", "500"},
	},
	"createReport": {
		Method:        "POST",
		Path:          "/reports",
		OperationID:   "createReport",
		Summary:       "create a report",
		Parameters:    0,
		HasBody:       true,
		ResponseCodes: []string{"201", "400", "401", "403", "409", "500"},
	},
}

// TotalOperations is the total number of API operations
const TotalOperations = len(APIOperations)
`

	// Execute template
	t, err := template.New("api_types").Parse(tmpl)
	if err != nil {
		return fmt.Errorf("failed to parse API types template: %w", err)
	}
	
	file, err := os.Create(outputFile)
	if err != nil {
		return fmt.Errorf("failed to create API types file: %w", err)
	}
	defer file.Close()
	
	data := struct {
		PackageName string
	}{
		PackageName: opts.PackageName,
	}
	
	if err := t.Execute(file, data); err != nil {
		return fmt.Errorf("failed to execute API types template: %w", err)
	}
	
	PrintSuccess(fmt.Sprintf("Generated demo API types: %s", outputFile))
	return nil
}

// generateDemoValidation creates demo validation functions
func generateDemoValidation(opts BuildOptions) error {
	outputFile := filepath.Join(opts.OutputDir, "validation.go")
	
	// Use the same validation template but mark it as demo
	return generateValidationFile(opts, outputFile, true)
}

// generateValidationFile creates a validation file
func generateValidationFile(opts BuildOptions, outputFile string, isDemo bool) error {
	var imports string
	if isDemo {
		imports = `import (
	"encoding/json"
	"fmt"
	"reflect"
	"regexp"
	"strings"
	"time"
)`
	} else {
		imports = `import (
	"encoding/json"
	"fmt"
	"reflect"
	"strings"
	
	"github.com/go-playground/validator/v10"
)`
	}

	tmpl := `package ` + opts.PackageName + `

` + imports + `

// ValidationResult contains the result of a validation operation
type ValidationResult struct {
	Valid  bool              ` + "`json:\"valid\"`" + `
	Errors []ValidationError ` + "`json:\"errors,omitempty\"`" + `
	Data   interface{}       ` + "`json:\"data,omitempty\"`" + `
}

// ValidationError represents a single validation error
type ValidationError struct {
	Field   string      ` + "`json:\"field\"`" + `
	Tag     string      ` + "`json:\"tag\"`" + `
	Value   interface{} ` + "`json:\"value\"`" + `
	Message string      ` + "`json:\"message\"`" + `
}

// ValidateProgram validates a Program object
func ValidateProgram(data interface{}) ValidationResult {
	var program Program
	
	if err := convertToStruct(data, &program); err != nil {
		return ValidationResult{
			Valid:  false,
			Errors: []ValidationError{{Field: "root", Message: err.Error()}},
		}
	}
	
	// Basic validation
	var errors []ValidationError
	
	if program.ID == "" {
		errors = append(errors, ValidationError{Field: "id", Message: "ID is required"})
	}
	if program.ProgramName == "" {
		errors = append(errors, ValidationError{Field: "programName", Message: "Program name is required"})
	}
	if program.RetailerName == "" {
		errors = append(errors, ValidationError{Field: "retailerName", Message: "Retailer name is required"})
	}
	if program.Country == "" || len(program.Country) != 2 {
		errors = append(errors, ValidationError{Field: "country", Message: "Country must be a 2-letter code"})
	}
	
	if len(errors) > 0 {
		return ValidationResult{Valid: false, Errors: errors}
	}
	
	return ValidationResult{Valid: true, Data: program}
}

// ValidateEvent validates an Event object
func ValidateEvent(data interface{}) ValidationResult {
	var event Event
	
	if err := convertToStruct(data, &event); err != nil {
		return ValidationResult{
			Valid:  false,
			Errors: []ValidationError{{Field: "root", Message: err.Error()}},
		}
	}
	
	var errors []ValidationError
	
	if event.ID == "" {
		errors = append(errors, ValidationError{Field: "id", Message: "ID is required"})
	}
	if event.ProgramID == "" {
		errors = append(errors, ValidationError{Field: "programId", Message: "Program ID is required"})
	}
	if len(event.Intervals) == 0 {
		errors = append(errors, ValidationError{Field: "intervals", Message: "At least one interval is required"})
	}
	
	if len(errors) > 0 {
		return ValidationResult{Valid: false, Errors: errors}
	}
	
	return ValidationResult{Valid: true, Data: event}
}

// ValidateVen validates a Ven object
func ValidateVen(data interface{}) ValidationResult {
	var ven Ven
	
	if err := convertToStruct(data, &ven); err != nil {
		return ValidationResult{
			Valid:  false,
			Errors: []ValidationError{{Field: "root", Message: err.Error()}},
		}
	}
	
	var errors []ValidationError
	
	if ven.ID == "" {
		errors = append(errors, ValidationError{Field: "id", Message: "ID is required"})
	}
	if ven.VenName == "" {
		errors = append(errors, ValidationError{Field: "venName", Message: "VEN name is required"})
	}
	
	if len(errors) > 0 {
		return ValidationResult{Valid: false, Errors: errors}
	}
	
	return ValidationResult{Valid: true, Data: ven}
}

// ValidateReport validates a Report object
func ValidateReport(data interface{}) ValidationResult {
	var report Report
	
	if err := convertToStruct(data, &report); err != nil {
		return ValidationResult{
			Valid:  false,
			Errors: []ValidationError{{Field: "root", Message: err.Error()}},
		}
	}
	
	var errors []ValidationError
	
	if report.ID == "" {
		errors = append(errors, ValidationError{Field: "id", Message: "ID is required"})
	}
	if report.ProgramID == "" {
		errors = append(errors, ValidationError{Field: "programId", Message: "Program ID is required"})
	}
	if report.ClientName == "" {
		errors = append(errors, ValidationError{Field: "clientName", Message: "Client name is required"})
	}
	
	if len(errors) > 0 {
		return ValidationResult{Valid: false, Errors: errors}
	}
	
	return ValidationResult{Valid: true, Data: report}
}

// ValidateSubscription validates a Subscription object
func ValidateSubscription(data interface{}) ValidationResult {
	var subscription Subscription
	
	if err := convertToStruct(data, &subscription); err != nil {
		return ValidationResult{
			Valid:  false,
			Errors: []ValidationError{{Field: "root", Message: err.Error()}},
		}
	}
	
	var errors []ValidationError
	
	if subscription.ID == "" {
		errors = append(errors, ValidationError{Field: "id", Message: "ID is required"})
	}
	if subscription.CallbackURL == "" {
		errors = append(errors, ValidationError{Field: "callbackUrl", Message: "Callback URL is required"})
	}
	
	if len(errors) > 0 {
		return ValidationResult{Valid: false, Errors: errors}
	}
	
	return ValidationResult{Valid: true, Data: subscription}
}

// ValidateAPIParams validates API endpoint parameters
func ValidateAPIParams(operationID string, paramType string, data interface{}) ValidationResult {
	switch operationID {
	case "searchAllPrograms":
		if paramType == "query" {
			var params SearchAllProgramsParams
			if err := convertToStruct(data, &params); err != nil {
				return ValidationResult{Valid: false, Errors: []ValidationError{{Field: "root", Message: err.Error()}}}
			}
			
			var errors []ValidationError
			if params.Skip != nil && *params.Skip < 0 {
				errors = append(errors, ValidationError{Field: "skip", Message: "Skip must be >= 0"})
			}
			if params.Limit != nil && (*params.Limit < 0 || *params.Limit > 50) {
				errors = append(errors, ValidationError{Field: "limit", Message: "Limit must be between 0 and 50"})
			}
			
			if len(errors) > 0 {
				return ValidationResult{Valid: false, Errors: errors}
			}
			return ValidationResult{Valid: true, Data: params}
		}
	}
	
	return ValidationResult{
		Valid:  false,
		Errors: []ValidationError{{Field: "root", Message: fmt.Sprintf("Unknown operation: %s/%s", operationID, paramType)}},
	}
}

// ValidateOpenADRObject validates any OpenADR object by type name
func ValidateOpenADRObject(objectType string, data interface{}) ValidationResult {
	switch strings.ToLower(objectType) {
	case "program":
		return ValidateProgram(data)
	case "event":
		return ValidateEvent(data)
	case "report":
		return ValidateReport(data)
	case "ven":
		return ValidateVen(data)
	case "subscription":
		return ValidateSubscription(data)
	default:
		return ValidationResult{
			Valid:  false,
			Errors: []ValidationError{{Field: "root", Message: fmt.Sprintf("Unknown object type: %s", objectType)}},
		}
	}
}

// convertToStruct converts interface{} to a specific struct type using JSON marshaling
func convertToStruct(input interface{}, output interface{}) error {
	if reflect.TypeOf(input) == reflect.TypeOf(output).Elem() {
		reflect.ValueOf(output).Elem().Set(reflect.ValueOf(input))
		return nil
	}
	
	jsonData, err := json.Marshal(input)
	if err != nil {
		return fmt.Errorf("failed to marshal input: %w", err)
	}
	
	if err := json.Unmarshal(jsonData, output); err != nil {
		return fmt.Errorf("failed to unmarshal to target type: %w", err)
	}
	
	return nil
}

// IsValidObjectID checks if a string is a valid object ID
func IsValidObjectID(objectID string) bool {
	if objectID == "" {
		return false
	}
	matched, _ := regexp.MatchString(` + "`^[a-zA-Z0-9][a-zA-Z0-9_-]*$`" + `, objectID)
	return matched
}

// IsValidDuration validates ISO 8601 duration strings
func IsValidDuration(duration string) bool {
	if duration == "" {
		return true
	}
	durationRegex := regexp.MustCompile(` + "`^P(?!$)(\\d+Y)?(\\d+M)?(\\d+D)?(T(?=\\d)(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)?)?$`" + `)
	return durationRegex.MatchString(duration)
}

// IsValidDateTime checks if a string is a valid RFC3339 datetime
func IsValidDateTime(datetime string) bool {
	_, err := time.Parse(time.RFC3339, datetime)
	return err == nil
}
`

	file, err := os.Create(outputFile)
	if err != nil {
		return fmt.Errorf("failed to create validation file: %w", err)
	}
	defer file.Close()

	if _, err := file.WriteString(tmpl); err != nil {
		return fmt.Errorf("failed to write validation file: %w", err)
	}

	PrintSuccess(fmt.Sprintf("Generated validation functions: %s", outputFile))
	return nil
}