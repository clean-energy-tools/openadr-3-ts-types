// Package openadr3 provides OpenADR 3.1.0 types and validation
// This is a demo implementation showing the structure of generated types
package openadr3

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
	ID         string      `json:"id" validate:"required,objectid"`
	ObjectType *ObjectType `json:"objectType,omitempty"`
}

// Point represents a data point with timestamp and value
type Point struct {
	Timestamp time.Time `json:"timestamp" validate:"required"`
	Value     float64   `json:"value" validate:"required"`
}

// Interval represents a time interval with data points
type Interval struct {
	ID       int      `json:"id" validate:"required,min=0"`
	Start    time.Time `json:"start" validate:"required"`
	Duration string   `json:"duration" validate:"required,duration"`
	Points   []Point  `json:"points,omitempty"`
}

// ValuesMap represents key-value mapping for flexible data
type ValuesMap struct {
	Type   string                 `json:"type" validate:"required"`
	Values map[string]interface{} `json:"values" validate:"required"`
}

// Program represents an OpenADR program definition
type Program struct {
	ID                     string       `json:"id" validate:"required,objectid"`
	CreatedDateTime        time.Time    `json:"createdDateTime" validate:"required"`
	ModificationDateTime   time.Time    `json:"modificationDateTime" validate:"required"`
	ProgramName            string       `json:"programName" validate:"required,max=128"`
	ProgramLongName        *string      `json:"programLongName,omitempty" validate:"omitempty,max=255"`
	RetailerName           string       `json:"retailerName" validate:"required,max=128"`
	RetailerLongName       *string      `json:"retailerLongName,omitempty" validate:"omitempty,max=255"`
	ProgramType            ProgramType  `json:"programType" validate:"required"`
	Country                string       `json:"country" validate:"required,len=2"`
	PrincipalSubdivision   *string      `json:"principalSubdivision,omitempty" validate:"omitempty,max=10"`
	TimeZoneOffset         *string      `json:"timeZoneOffset,omitempty"`
	ProgramDescriptions    []ValuesMap  `json:"programDescriptions,omitempty"`
	BindingEvents          *bool        `json:"bindingEvents,omitempty"`
	LocalPrice             *bool        `json:"localPrice,omitempty"`
}

// EventPayload represents event payload data
type EventPayload struct {
	Type   string     `json:"type" validate:"required"`
	Values *ValuesMap `json:"values,omitempty"`
}

// Event represents an OpenADR event definition
type Event struct {
	ID                   string         `json:"id" validate:"required,objectid"`
	CreatedDateTime      time.Time      `json:"createdDateTime" validate:"required"`
	ModificationDateTime time.Time      `json:"modificationDateTime" validate:"required"`
	ProgramID            string         `json:"programId" validate:"required,objectid"`
	EventName            *string        `json:"eventName,omitempty" validate:"omitempty,max=128"`
	Priority             *int           `json:"priority,omitempty" validate:"omitempty,min=0,max=10"`
	Intervals            []Interval     `json:"intervals" validate:"required,min=1"`
	EventPayloads        []EventPayload `json:"eventPayloads,omitempty"`
}

// Resource represents a VEN resource definition
type Resource struct {
	ID           string                   `json:"id" validate:"required,objectid"`
	ResourceName string                   `json:"resourceName" validate:"required,max=128"`
	VenID        string                   `json:"venId" validate:"required,objectid"`
	Attributes   []map[string]interface{} `json:"attributes,omitempty"`
}

// Ven represents a Virtual End Node definition
type Ven struct {
	ID                   string                   `json:"id" validate:"required,objectid"`
	CreatedDateTime      time.Time                `json:"createdDateTime" validate:"required"`
	ModificationDateTime time.Time                `json:"modificationDateTime" validate:"required"`
	VenName              string                   `json:"venName" validate:"required,max=128"`
	Attributes           []map[string]interface{} `json:"attributes,omitempty"`
	Resources            []Resource               `json:"resources,omitempty"`
}

// Report represents an OpenADR report definition
type Report struct {
	ID                   string      `json:"id" validate:"required,objectid"`
	CreatedDateTime      time.Time   `json:"createdDateTime" validate:"required"`
	ModificationDateTime time.Time   `json:"modificationDateTime" validate:"required"`
	ProgramID            string      `json:"programId" validate:"required,objectid"`
	EventID              *string     `json:"eventId,omitempty" validate:"omitempty,objectid"`
	ClientName           string      `json:"clientName" validate:"required,max=128"`
	Intervals            []Interval  `json:"intervals,omitempty"`
}

// Subscription represents an event/program subscription
type Subscription struct {
	ID                   string     `json:"id" validate:"required,objectid"`
	CreatedDateTime      time.Time  `json:"createdDateTime" validate:"required"`
	ModificationDateTime time.Time  `json:"modificationDateTime" validate:"required"`
	CallbackURL          string     `json:"callbackUrl" validate:"required,url"`
	ObjectType           ObjectType `json:"objectType" validate:"required"`
	ObjectID             *string    `json:"objectId,omitempty" validate:"omitempty,objectid"`
}

// Notification represents a system notification
type Notification struct {
	ID          string     `json:"id" validate:"required,objectid"`
	CreatedDateTime time.Time  `json:"createdDateTime" validate:"required"`
	ObjectType  ObjectType `json:"objectType" validate:"required"`
	ObjectID    string     `json:"objectId" validate:"required,objectid"`
	Operation   string     `json:"operation" validate:"required"`
	CallbackURL string     `json:"callbackUrl" validate:"required,url"`
}
