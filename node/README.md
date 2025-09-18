# @clean-energy-tools/openadr-3-ts-types -- OpenADR 3.1.0 TypeScript Types

Modern TypeScript type definitions for OpenADR 3.1.0

## Features

- **Complete OpenADR 3.1.0 Coverage**: All types from the OpenADR 3.1.0 specification
- **Schema Types**: All OpenADR data types (Program, Event, VEN, etc.)
- **API Endpoint Types**: Request parameters, path parameters, and response types for all REST endpoints
- **AJV Validation Functions**: Schema-driven data validation functions
- **Modern ESM**: Native ES modules targeting Node.js 22+
- **TypeScript 5.x**: Latest TypeScript with proper declaration files

## Usage

In your project directory, run:

```shell
$ npm install @clean-energy-tools/openadr-3-ts-types --save
```

In your code:

```typescript
import * as OpenADR from '@clean-energy-tools/openadr-3-ts-types';

// Schema Types with validation constraints
const duration: OpenADR.Duration = "PT1H"; 
// @pattern ^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$

const objectId: OpenADR.ObjectID = "object-123";
// @pattern ^[a-zA-Z0-9_-]*$, @minLength 1, @maxLength 128

// API Endpoint Types
const searchParams: OpenADR.SearchAllProgramsQueryParams = {
  targets: ["group-1"],
  skip: 0,   // @minimum 0  
  limit: 25  // @minimum 0, @maximum 50
};

// AJV Validation (Schema-Driven - No Manual Wrappers!)
const durationResult = OpenADR.Validators.validateduration("PT1H");
if (durationResult.success) {
  console.log("Valid duration:", durationResult.data);
} else {
  console.log("Validation errors:", durationResult.errors);
}

const eventData = {
  programID: "program-123",
  priority: 1,  // @minimum 0 automatically enforced
  eventName: "Test Event"
};

const eventResult = OpenADR.Validators.validateeventRequest(eventData);
// Automatically validates: pattern, minLength, maxLength, min/max values!
```

## AJV Validation

This package includes automatically generated AJV validation objects that can be used to enforce all OpenADR validation constraints without requiring manual wrapper functions.

### Key Advantages

- **Schema-Driven**: Validators generated directly from OpenAPI schemas
- **High Performance**: AJV is the fastest JSON Schema validator
- **Detailed Errors**: Get precise validation error messages with paths

### Validation Examples

```typescript
// Duration validation (regex pattern)
const result = OpenADR.Validators.validateduration("PT1H");
if (!result.success) {
  console.log(result.errors[0].message); 
  // "must match pattern ^(-?)P(?=\d|T\d)..."
}

// ObjectID validation (pattern + length)
const idResult = OpenADR.Validators.validateobjectID("object-123");

// Complex object validation
const eventResult = OpenADR.Validators.validateeventRequest({
  programID: "program-123",
  priority: -1  // Will fail: must be >= 0
});

// Dynamic validation by schema name
const dynamic = OpenADR.Validators.validateBySchemaName("Duration", data);
```

## Development

### Prerequisites
- Node.js 22+
- npm 10+

## License

MIT - See LICENSE file for details.