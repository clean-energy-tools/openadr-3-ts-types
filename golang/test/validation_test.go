package test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	openadr3 "github.com/clean-energy-tools/openadr-3-types/golang/package/generated"
)

func TestValidateProgram(t *testing.T) {
	tests := []struct {
		name      string
		program   interface{}
		wantValid bool
		wantError string
	}{
		{
			name: "valid program",
			program: openadr3.Program{
				ID:                   "program-123",
				CreatedDateTime:      time.Now(),
				ModificationDateTime: time.Now(),
				ProgramName:          "Test Program",
				RetailerName:         "Test Utility",
				ProgramType:          openadr3.ProgramTypeDemandResponse,
				Country:              "US",
			},
			wantValid: true,
		},
		{
			name: "missing ID",
			program: openadr3.Program{
				CreatedDateTime:      time.Now(),
				ModificationDateTime: time.Now(),
				ProgramName:          "Test Program",
				RetailerName:         "Test Utility",
				ProgramType:          openadr3.ProgramTypeDemandResponse,
				Country:              "US",
			},
			wantValid: false,
			wantError: "ID is required",
		},
		{
			name: "invalid country code",
			program: openadr3.Program{
				ID:                   "program-123",
				CreatedDateTime:      time.Now(),
				ModificationDateTime: time.Now(),
				ProgramName:          "Test Program",
				RetailerName:         "Test Utility",
				ProgramType:          openadr3.ProgramTypeDemandResponse,
				Country:              "USA", // Should be 2 letters
			},
			wantValid: false,
			wantError: "Country must be a 2-letter code",
		},
		{
			name: "program from map",
			program: map[string]interface{}{
				"id":                   "program-456",
				"createdDateTime":      time.Now().Format(time.RFC3339),
				"modificationDateTime": time.Now().Format(time.RFC3339),
				"programName":          "Map Program",
				"retailerName":         "Map Utility",
				"programType":          "DEMAND_RESPONSE",
				"country":              "CA",
			},
			wantValid: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := openadr3.ValidateProgram(tt.program)

			assert.Equal(t, tt.wantValid, result.Valid)

			if !tt.wantValid {
				require.NotEmpty(t, result.Errors)
				assert.Contains(t, result.Errors[0].Message, tt.wantError)
			} else {
				assert.Empty(t, result.Errors)
				assert.NotNil(t, result.Data)
			}
		})
	}
}

func TestValidateEvent(t *testing.T) {
	tests := []struct {
		name      string
		event     interface{}
		wantValid bool
		wantError string
	}{
		{
			name: "valid event",
			event: openadr3.Event{
				ID:                   "event-123",
				CreatedDateTime:      time.Now(),
				ModificationDateTime: time.Now(),
				ProgramID:            "program-123",
				Intervals: []openadr3.Interval{
					{
						ID:       1,
						Start:    time.Now(),
						Duration: "PT1H",
					},
				},
			},
			wantValid: true,
		},
		{
			name: "missing intervals",
			event: openadr3.Event{
				ID:                   "event-123",
				CreatedDateTime:      time.Now(),
				ModificationDateTime: time.Now(),
				ProgramID:            "program-123",
				Intervals:            []openadr3.Interval{}, // Empty
			},
			wantValid: false,
			wantError: "At least one interval is required",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := openadr3.ValidateEvent(tt.event)

			assert.Equal(t, tt.wantValid, result.Valid)

			if !tt.wantValid {
				require.NotEmpty(t, result.Errors)
				assert.Contains(t, result.Errors[0].Message, tt.wantError)
			}
		})
	}
}

func TestValidateAPIParams(t *testing.T) {
	tests := []struct {
		name        string
		operationID string
		paramType   string
		params      interface{}
		wantValid   bool
		wantError   string
	}{
		{
			name:        "valid search params",
			operationID: "searchAllPrograms",
			paramType:   "query",
			params: map[string]interface{}{
				"skip":  10,
				"limit": 25,
			},
			wantValid: true,
		},
		{
			name:        "invalid skip parameter",
			operationID: "searchAllPrograms",
			paramType:   "query",
			params: map[string]interface{}{
				"skip":  -1, // Invalid negative value
				"limit": 25,
			},
			wantValid: false,
			wantError: "Skip must be >= 0",
		},
		{
			name:        "invalid limit parameter",
			operationID: "searchAllPrograms",
			paramType:   "query",
			params: map[string]interface{}{
				"skip":  10,
				"limit": 100, // Exceeds maximum of 50
			},
			wantValid: false,
			wantError: "Limit must be between 0 and 50",
		},
		{
			name:        "unknown operation",
			operationID: "unknownOperation",
			paramType:   "query",
			params:      map[string]interface{}{},
			wantValid:   false,
			wantError:   "Unknown operation",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := openadr3.ValidateAPIParams(tt.operationID, tt.paramType, tt.params)

			assert.Equal(t, tt.wantValid, result.Valid)

			if !tt.wantValid {
				require.NotEmpty(t, result.Errors)
				assert.Contains(t, result.Errors[0].Message, tt.wantError)
			}
		})
	}
}

func TestValidateOpenADRObject(t *testing.T) {
	program := openadr3.Program{
		ID:                   "program-123",
		CreatedDateTime:      time.Now(),
		ModificationDateTime: time.Now(),
		ProgramName:          "Test Program",
		RetailerName:         "Test Utility",
		ProgramType:          openadr3.ProgramTypeDemandResponse,
		Country:              "US",
	}

	tests := []struct {
		name       string
		objectType string
		data       interface{}
		wantValid  bool
		wantError  string
	}{
		{
			name:       "valid program object",
			objectType: "program",
			data:       program,
			wantValid:  true,
		},
		{
			name:       "case insensitive type",
			objectType: "PROGRAM",
			data:       program,
			wantValid:  true,
		},
		{
			name:       "unknown object type",
			objectType: "unknown",
			data:       map[string]interface{}{},
			wantValid:  false,
			wantError:  "Unknown object type",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := openadr3.ValidateOpenADRObject(tt.objectType, tt.data)

			assert.Equal(t, tt.wantValid, result.Valid)

			if !tt.wantValid {
				require.NotEmpty(t, result.Errors)
				assert.Contains(t, result.Errors[0].Message, tt.wantError)
			}
		})
	}
}

func TestValidationUtilities(t *testing.T) {
	t.Run("IsValidObjectID", func(t *testing.T) {
		tests := []struct {
			input string
			want  bool
		}{
			{"valid-id-123", true},
			{"ValidID123", true},
			{"123_valid", true},
			{"", false},
			{"-invalid", false},
			{"invalid space", false},
			{"invalid@symbol", false},
		}

		for _, tt := range tests {
			assert.Equal(t, tt.want, openadr3.IsValidObjectID(tt.input), "input: %s", tt.input)
		}
	})

	t.Run("IsValidDuration", func(t *testing.T) {
		tests := []struct {
			input string
			want  bool
		}{
			{"", true},       // Empty is valid for optional fields
			{"PT1H", true},   // 1 hour
			{"P1D", true},    // 1 day
			{"PT30M", true},  // 30 minutes
			{"P1DT2H", true}, // 1 day 2 hours
			{"invalid", false},
			{"P", false},  // Invalid incomplete
			{"1H", false}, // Missing P prefix
		}

		for _, tt := range tests {
			assert.Equal(t, tt.want, openadr3.IsValidDuration(tt.input), "input: %s", tt.input)
		}
	})

	t.Run("IsValidDateTime", func(t *testing.T) {
		now := time.Now()
		tests := []struct {
			input string
			want  bool
		}{
			{now.Format(time.RFC3339), true},
			{"2024-01-01T12:00:00Z", true},
			{"2024-01-01T12:00:00+05:00", true},
			{"invalid-datetime", false},
			{"2024-01-01", false}, // Missing time
			{"", false},
		}

		for _, tt := range tests {
			assert.Equal(t, tt.want, openadr3.IsValidDateTime(tt.input), "input: %s", tt.input)
		}
	})
}
