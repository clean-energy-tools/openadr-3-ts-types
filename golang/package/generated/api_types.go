package openadr3

import (
	"time"
)

// API parameter types for OpenADR 3.1.0 endpoints

// SearchAllProgramsParams represents query parameters for GET /programs
type SearchAllProgramsParams struct {
	Targets []string `json:"targets,omitempty" form:"targets"`
	Skip    *int     `json:"skip,omitempty" form:"skip" validate:"omitempty,min=0"`
	Limit   *int     `json:"limit,omitempty" form:"limit" validate:"omitempty,min=0,max=50"`
}

// SearchProgramByProgramIdParams represents path parameters for GET /programs/{programID}
type SearchProgramByProgramIdParams struct {
	ProgramID string `json:"programId" path:"programID" validate:"required,objectid"`
}

// CreateProgramBody represents request body for POST /programs
type CreateProgramBody = Program

// SearchAllEventsParams represents query parameters for GET /events
type SearchAllEventsParams struct {
	ProgramID *string `json:"programId,omitempty" form:"programId" validate:"omitempty,objectid"`
	Skip      *int    `json:"skip,omitempty" form:"skip" validate:"omitempty,min=0"`
	Limit     *int    `json:"limit,omitempty" form:"limit" validate:"omitempty,min=0,max=50"`
}

// CreateEventBody represents request body for POST /events
type CreateEventBody = Event

// SearchAllVensParams represents query parameters for GET /vens
type SearchAllVensParams struct {
	Skip  *int `json:"skip,omitempty" form:"skip" validate:"omitempty,min=0"`
	Limit *int `json:"limit,omitempty" form:"limit" validate:"omitempty,min=0,max=50"`
}

// CreateVenBody represents request body for POST /vens
type CreateVenBody = Ven

// SearchAllReportsParams represents query parameters for GET /reports
type SearchAllReportsParams struct {
	ProgramID *string `json:"programId,omitempty" form:"programId" validate:"omitempty,objectid"`
	EventID   *string `json:"eventId,omitempty" form:"eventId" validate:"omitempty,objectid"`
	Skip      *int    `json:"skip,omitempty" form:"skip" validate:"omitempty,min=0"`
	Limit     *int    `json:"limit,omitempty" form:"limit" validate:"omitempty,min=0,max=50"`
}

// CreateReportBody represents request body for POST /reports
type CreateReportBody = Report

// API response types

// APIResponse represents a generic API response
type APIResponse struct {
	StatusCode int                    `json:"statusCode"`
	Headers    map[string]string      `json:"headers,omitempty"`
	Data       interface{}            `json:"data,omitempty"`
}

// ErrorResponse represents a standard error response
type ErrorResponse struct {
	Error   string                 `json:"error"`
	Message string                 `json:"message"`
	Details map[string]interface{} `json:"details,omitempty"`
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
	Method      string   `json:"method"`
	Path        string   `json:"path"`
	OperationID string   `json:"operationId"`
	Summary     string   `json:"summary"`
	Parameters  int      `json:"parameters"`
	HasBody     bool     `json:"hasBody"`
	ResponseCodes []string `json:"responseCodes"`
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
