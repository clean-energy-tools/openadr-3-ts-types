package test

import (
	"encoding/json"
	"reflect"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	openadr3 "github.com/clean-energy-tools/openadr-3-types/golang/package/generated"
)

func TestProgramSerialization(t *testing.T) {
	now := time.Now()
	program := openadr3.Program{
		ID:                   "test-program-1",
		CreatedDateTime:      now,
		ModificationDateTime: now,
		ProgramName:          "Test Program",
		ProgramLongName:      stringPtr("Test Demand Response Program"),
		RetailerName:         "Test Utility",
		RetailerLongName:     stringPtr("Test Utility Company"),
		ProgramType:          openadr3.ProgramTypeDemandResponse,
		Country:              "US",
		PrincipalSubdivision: stringPtr("CA"),
	}

	// Test JSON marshaling
	jsonData, err := json.Marshal(program)
	require.NoError(t, err)
	assert.Contains(t, string(jsonData), "test-program-1")
	assert.Contains(t, string(jsonData), "DEMAND_RESPONSE")

	// Test JSON unmarshaling
	var unmarshaled openadr3.Program
	err = json.Unmarshal(jsonData, &unmarshaled)
	require.NoError(t, err)

	assert.Equal(t, program.ID, unmarshaled.ID)
	assert.Equal(t, program.ProgramName, unmarshaled.ProgramName)
	assert.Equal(t, program.ProgramType, unmarshaled.ProgramType)
	assert.Equal(t, program.Country, unmarshaled.Country)
}

func TestEventSerialization(t *testing.T) {
	now := time.Now()
	event := openadr3.Event{
		ID:                   "test-event-1",
		CreatedDateTime:      now,
		ModificationDateTime: now,
		ProgramID:            "test-program-1",
		EventName:            stringPtr("Test Event"),
		Priority:             intPtr(5),
		Intervals: []openadr3.Interval{
			{
				ID:       1,
				Start:    now,
				Duration: "PT1H",
				Points: []openadr3.Point{
					{
						Timestamp: now,
						Value:     100.5,
					},
				},
			},
		},
		EventPayloads: []openadr3.EventPayload{
			{
				Type: "SIMPLE",
				Values: &openadr3.ValuesMap{
					Type: "PRICE",
					Values: map[string]interface{}{
						"price": 0.15,
						"unit":  "USD/kWh",
					},
				},
			},
		},
	}

	// Test JSON marshaling
	jsonData, err := json.Marshal(event)
	require.NoError(t, err)
	assert.Contains(t, string(jsonData), "test-event-1")
	assert.Contains(t, string(jsonData), "PT1H")

	// Test JSON unmarshaling
	var unmarshaled openadr3.Event
	err = json.Unmarshal(jsonData, &unmarshaled)
	require.NoError(t, err)

	assert.Equal(t, event.ID, unmarshaled.ID)
	assert.Equal(t, event.ProgramID, unmarshaled.ProgramID)
	assert.Len(t, unmarshaled.Intervals, 1)
	assert.Equal(t, "PT1H", unmarshaled.Intervals[0].Duration)
}

func TestVenSerialization(t *testing.T) {
	now := time.Now()
	ven := openadr3.Ven{
		ID:                   "test-ven-1",
		CreatedDateTime:      now,
		ModificationDateTime: now,
		VenName:              "Test VEN",
		Attributes: []map[string]interface{}{
			{
				"type":  "METER",
				"value": "smart-meter-123",
			},
		},
		Resources: []openadr3.Resource{
			{
				ID:           "resource-1",
				ResourceName: "Main Load",
				VenID:        "test-ven-1",
				Attributes: []map[string]interface{}{
					{
						"type":     "LOAD_TYPE",
						"value":    "HVAC",
						"priority": 1,
					},
				},
			},
		},
	}

	// Test JSON marshaling
	jsonData, err := json.Marshal(ven)
	require.NoError(t, err)
	assert.Contains(t, string(jsonData), "test-ven-1")
	assert.Contains(t, string(jsonData), "Test VEN")

	// Test JSON unmarshaling
	var unmarshaled openadr3.Ven
	err = json.Unmarshal(jsonData, &unmarshaled)
	require.NoError(t, err)

	assert.Equal(t, ven.ID, unmarshaled.ID)
	assert.Equal(t, ven.VenName, unmarshaled.VenName)
	assert.Len(t, unmarshaled.Resources, 1)
	assert.Equal(t, "resource-1", unmarshaled.Resources[0].ID)
}

func TestAPITypesSerialization(t *testing.T) {
	t.Run("SearchAllProgramsParams", func(t *testing.T) {
		params := openadr3.SearchAllProgramsParams{
			Targets: []string{"commercial", "residential"},
			Skip:    intPtr(10),
			Limit:   intPtr(25),
		}

		jsonData, err := json.Marshal(params)
		require.NoError(t, err)
		assert.Contains(t, string(jsonData), "commercial")
		assert.Contains(t, string(jsonData), "10")

		var unmarshaled openadr3.SearchAllProgramsParams
		err = json.Unmarshal(jsonData, &unmarshaled)
		require.NoError(t, err)

		assert.Equal(t, params.Targets, unmarshaled.Targets)
		assert.Equal(t, *params.Skip, *unmarshaled.Skip)
		assert.Equal(t, *params.Limit, *unmarshaled.Limit)
	})

	t.Run("SearchProgramByProgramIdParams", func(t *testing.T) {
		params := openadr3.SearchProgramByProgramIdParams{
			ProgramID: "program-123",
		}

		jsonData, err := json.Marshal(params)
		require.NoError(t, err)
		assert.Contains(t, string(jsonData), "program-123")

		var unmarshaled openadr3.SearchProgramByProgramIdParams
		err = json.Unmarshal(jsonData, &unmarshaled)
		require.NoError(t, err)

		assert.Equal(t, params.ProgramID, unmarshaled.ProgramID)
	})

	t.Run("ErrorResponse", func(t *testing.T) {
		errorResp := openadr3.ErrorResponse{
			Error:   "Bad Request",
			Message: "Invalid parameter format",
			Details: map[string]interface{}{
				"field": "limit",
				"value": "invalid",
			},
		}

		jsonData, err := json.Marshal(errorResp)
		require.NoError(t, err)
		assert.Contains(t, string(jsonData), "Bad Request")

		var unmarshaled openadr3.ErrorResponse
		err = json.Unmarshal(jsonData, &unmarshaled)
		require.NoError(t, err)

		assert.Equal(t, errorResp.Error, unmarshaled.Error)
		assert.Equal(t, errorResp.Message, unmarshaled.Message)
		assert.Equal(t, "limit", unmarshaled.Details["field"])
	})
}

func TestAPIOperationsRegistry(t *testing.T) {
	// Test that all expected operations are present
	expectedOps := []string{
		"searchAllPrograms",
		"createProgram",
		"searchProgramByProgramId",
		"searchAllEvents",
		"createEvent",
		"searchAllVens",
		"createVen",
		"searchAllReports",
		"createReport",
	}

	for _, opID := range expectedOps {
		op, exists := openadr3.APIOperations[opID]
		require.True(t, exists, "Operation %s should exist", opID)

		assert.NotEmpty(t, op.Method)
		assert.NotEmpty(t, op.Path)
		assert.NotEmpty(t, op.OperationID)
		assert.NotEmpty(t, op.Summary)
		assert.NotEmpty(t, op.ResponseCodes)

		// Verify specific operation details
		switch opID {
		case "searchAllPrograms":
			assert.Equal(t, "GET", op.Method)
			assert.Equal(t, "/programs", op.Path)
			assert.Equal(t, 3, op.Parameters)
			assert.False(t, op.HasBody)
		case "createProgram":
			assert.Equal(t, "POST", op.Method)
			assert.Equal(t, "/programs", op.Path)
			assert.Equal(t, 0, op.Parameters)
			assert.True(t, op.HasBody)
		}
	}

	// Test total operations count
	assert.Equal(t, len(openadr3.APIOperations), openadr3.TotalOperations)
	assert.Greater(t, openadr3.TotalOperations, 5) // Should have multiple operations
}

func TestEnumTypes(t *testing.T) {
	t.Run("ProgramType", func(t *testing.T) {
		assert.Equal(t, "DEMAND_RESPONSE", string(openadr3.ProgramTypeDemandResponse))
		assert.Equal(t, "PRICING_TARIFF", string(openadr3.ProgramTypePricingTariff))
		assert.Equal(t, "EMERGENCY", string(openadr3.ProgramTypeEmergency))
	})

	t.Run("ObjectType", func(t *testing.T) {
		assert.Equal(t, "PROGRAM", string(openadr3.ObjectTypeProgram))
		assert.Equal(t, "EVENT", string(openadr3.ObjectTypeEvent))
		assert.Equal(t, "VEN", string(openadr3.ObjectTypeVen))
		assert.Equal(t, "REPORT", string(openadr3.ObjectTypeReport))
	})
}

func TestStructTags(t *testing.T) {
	// Test that JSON tags are properly set
	program := openadr3.Program{}
	programType := reflect.TypeOf(program)

	// Check some key fields have proper JSON tags
	idField, found := programType.FieldByName("ID")
	require.True(t, found)
	jsonTag := idField.Tag.Get("json")
	assert.Equal(t, "id", jsonTag)

	nameField, found := programType.FieldByName("ProgramName")
	require.True(t, found)
	jsonTag = nameField.Tag.Get("json")
	assert.Equal(t, "programName", jsonTag)

	// Check validation tags exist
	validateTag := idField.Tag.Get("validate")
	assert.Contains(t, validateTag, "required")
}

// Helper functions
func stringPtr(s string) *string {
	return &s
}

func intPtr(i int) *int {
	return &i
}
