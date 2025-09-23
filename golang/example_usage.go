package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	openadr3 "./package/generated"
)

func main() {
	fmt.Println("🚀 OpenADR 3.1.0 Go Types Usage Examples")
	fmt.Println("=====================================")

	exampleCoreModels()
	exampleAPIParameters()
	exampleAPIResponses()
	exampleAPIOperationsRegistry()
	exampleTypeSafety()
}

func exampleCoreModels() {
	fmt.Println("\n🔧 Core Models Example")
	fmt.Println("=====================")

	// Create a program instance
	program := openadr3.Program{
		ID:                   "program-123",
		CreatedDateTime:      time.Now(),
		ModificationDateTime: time.Now(),
		ProgramName:          "Peak Demand Response",
		ProgramLongName:      stringPtr("Commercial Peak Demand Response Program"),
		RetailerName:         "Pacific Gas & Electric",
		RetailerLongName:     stringPtr("Pacific Gas & Electric Company"),
		ProgramType:          openadr3.ProgramTypeDemandResponse,
		Country:              "US",
		PrincipalSubdivision: stringPtr("CA"),
	}

	// Validate program
	result := openadr3.ValidateProgram(program)
	if result.Valid {
		fmt.Printf("✅ Program created: %s\n", program.ProgramName)
		fmt.Printf("   ID: %s\n", program.ID)
		fmt.Printf("   Type: %s\n", program.ProgramType)
		fmt.Printf("   Country: %s\n", program.Country)
	} else {
		fmt.Printf("❌ Validation failed:\n")
		for _, err := range result.Errors {
			fmt.Printf("   %s: %s\n", err.Field, err.Message)
		}
	}

	// JSON serialization example
	jsonData, err := json.MarshalIndent(program, "", "  ")
	if err != nil {
		log.Printf("JSON marshaling failed: %v", err)
	} else {
		fmt.Printf("✅ JSON serialization successful (%d bytes)\n", len(jsonData))
	}
}

func exampleAPIParameters() {
	fmt.Println("\n🔧 API Parameters Example")
	fmt.Println("=========================")

	// Query parameters for GET /programs
	queryParams := openadr3.SearchAllProgramsParams{
		Targets: []string{"commercial", "residential"},
		Skip:    intPtr(10),
		Limit:   intPtr(25),
	}

	fmt.Printf("✅ Query params: skip=%d, limit=%d\n", *queryParams.Skip, *queryParams.Limit)
	fmt.Printf("   Targets: %v\n", queryParams.Targets)

	// Validate query parameters
	result := openadr3.ValidateAPIParams("searchAllPrograms", "query", queryParams)
	if result.Valid {
		fmt.Printf("✅ Query parameters are valid\n")
	} else {
		fmt.Printf("❌ Query parameter validation failed:\n")
		for _, err := range result.Errors {
			fmt.Printf("   %s: %s\n", err.Field, err.Message)
		}
	}

	// Path parameters for GET /programs/{programID}
	pathParams := openadr3.SearchProgramByProgramIdParams{
		ProgramID: "program-123",
	}

	fmt.Printf("✅ Path params: program_id=%s\n", pathParams.ProgramID)
}

func exampleAPIResponses() {
	fmt.Println("\n🔧 API Responses Example")
	fmt.Println("========================")

	// Success response - list of programs
	now := time.Now()
	programs := openadr3.SearchAllProgramsResponse{
		{
			ID:                   "program-1",
			CreatedDateTime:      now,
			ModificationDateTime: now,
			ProgramName:          "Program One",
			RetailerName:         "Utility Co",
			ProgramType:          openadr3.ProgramTypeDemandResponse,
			Country:              "US",
		},
	}

	fmt.Printf("✅ Response would contain %d programs\n", len(programs))

	// Error response
	errorResponse := openadr3.ErrorResponse{
		Error:   "Bad Request",
		Message: "Invalid query parameters",
		Details: map[string]interface{}{
			"field": "limit",
			"issue": "exceeds maximum",
		},
	}

	fmt.Printf("✅ Error response: %s - %s\n", errorResponse.Error, errorResponse.Message)
	fmt.Printf("   Details: %v\n", errorResponse.Details)
}

func exampleAPIOperationsRegistry() {
	fmt.Println("\n🔧 API Operations Registry Example")
	fmt.Println("==================================")

	fmt.Printf("📊 Total API operations: %d\n", openadr3.TotalOperations)
	fmt.Println("\n📋 Sample operations:")

	// Show some example operations
	samples := []string{"searchAllPrograms", "createProgram", "searchAllEvents", "createVen"}

	for _, opID := range samples {
		if op, exists := openadr3.APIOperations[opID]; exists {
			fmt.Printf("  • %s %s\n", op.Method, op.Path)
			fmt.Printf("    Operation: %s\n", op.OperationID)
			fmt.Printf("    Summary: %s\n", op.Summary)
			fmt.Printf("    Parameters: %d, Has Body: %t\n", op.Parameters, op.HasBody)
			fmt.Printf("    Response Codes: %v\n", op.ResponseCodes)
			fmt.Println()
		}
	}

	// Group operations by method
	methods := make(map[string]int)
	for _, op := range openadr3.APIOperations {
		methods[op.Method]++
	}

	fmt.Println("📈 Operations by HTTP method:")
	for method, count := range methods {
		fmt.Printf("   %s: %d operations\n", method, count)
	}
}

func exampleTypeSafety() {
	fmt.Println("\n🔧 Type Safety Example")
	fmt.Println("======================")

	fmt.Println("🎯 Go's type system provides excellent benefits:")
	fmt.Println("   • Compile-time type checking")
	fmt.Println("   • IDE auto-completion and refactoring")
	fmt.Println("   • Runtime safety with struct validation")
	fmt.Println("   • Zero-cost abstractions")
	fmt.Println()
	fmt.Println("Example with type safety:")
	fmt.Println(`
    func SearchPrograms(params openadr3.SearchAllProgramsParams) ([]openadr3.Program, error) {
        // Compiler ensures params.Skip is *int
        // Compiler ensures params.Limit has constraints
        // Compiler ensures return type is []Program
        return api.GetPrograms(params)
    }
    
    func ProcessProgram(program openadr3.Program) error {
        // Type-safe access to all program fields
        if program.ProgramType == openadr3.ProgramTypeDemandResponse {
            return handleDemandResponse(program)
        }
        return nil
    }`)
}

func exampleValidation() {
	fmt.Println("\n🔧 Validation Examples")
	fmt.Println("======================")

	// Example 1: Valid program
	validProgram := map[string]interface{}{
		"id":                   "program-456",
		"createdDateTime":      time.Now().Format(time.RFC3339),
		"modificationDateTime": time.Now().Format(time.RFC3339),
		"programName":          "Valid Program",
		"retailerName":         "Test Utility",
		"programType":          "DEMAND_RESPONSE",
		"country":              "CA",
	}

	result := openadr3.ValidateOpenADRObject("program", validProgram)
	if result.Valid {
		fmt.Println("✅ Valid program validation passed")
	} else {
		fmt.Println("❌ Valid program validation failed")
		for _, err := range result.Errors {
			fmt.Printf("   %s: %s\n", err.Field, err.Message)
		}
	}

	// Example 2: Invalid program (missing required fields)
	invalidProgram := map[string]interface{}{
		"programName": "Incomplete Program",
		// Missing required fields like ID, retailerName, country, etc.
	}

	result = openadr3.ValidateOpenADRObject("program", invalidProgram)
	if !result.Valid {
		fmt.Printf("✅ Invalid program correctly rejected with %d errors\n", len(result.Errors))
		for _, err := range result.Errors {
			fmt.Printf("   %s: %s\n", err.Field, err.Message)
		}
	}
}

// Helper functions
func stringPtr(s string) *string {
	return &s
}

func intPtr(i int) *int {
	return &i
}