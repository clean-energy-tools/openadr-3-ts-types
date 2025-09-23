package openadr3

import (
	"encoding/json"
	"fmt"
	"reflect"
	"regexp"
	"strings"
	"time"
)

// ValidationResult contains the result of a validation operation
type ValidationResult struct {
	Valid  bool              `json:"valid"`
	Errors []ValidationError `json:"errors,omitempty"`
	Data   interface{}       `json:"data,omitempty"`
}

// ValidationError represents a single validation error
type ValidationError struct {
	Field   string      `json:"field"`
	Tag     string      `json:"tag"`
	Value   interface{} `json:"value"`
	Message string      `json:"message"`
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
	matched, _ := regexp.MatchString(`^[a-zA-Z0-9][a-zA-Z0-9_-]*$`, objectID)
	return matched
}

// IsValidDuration validates ISO 8601 duration strings
func IsValidDuration(duration string) bool {
	if duration == "" {
		return true
	}
	durationRegex := regexp.MustCompile(`^P(?!$)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$`)
	return durationRegex.MatchString(duration)
}

// IsValidDateTime checks if a string is a valid RFC3339 datetime
func IsValidDateTime(datetime string) bool {
	_, err := time.Parse(time.RFC3339, datetime)
	return err == nil
}
