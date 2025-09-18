# OpenADR 3.1.0 TypeScript Types

Modern TypeScript type definitions for OpenADR 3.1.0 with preserved JSDoc validation constraints.

## ✨ Features

- **Complete OpenADR 3.1.0 Coverage**: All types from the OpenADR 3.1.0 specification
- **Schema Types**: All OpenADR data types (Program, Event, VEN, etc.)
- **API Endpoint Types**: Request parameters, path parameters, and response types for all REST endpoints
- **AJV Validation Functions**: 47 schema-driven validators with automatic constraint enforcement
- **JSDoc Validation Constraints**: Preserves critical validation information as JSDoc tags:
  - `@pattern` for regex patterns (e.g., Duration, ObjectID)
  - `@minimum`/`@maximum` for numeric constraints  
  - `@minLength`/`@maxLength` for string constraints
- **Modern ESM**: Native ES modules targeting Node.js 22+
- **TypeScript 5.x**: Latest TypeScript with proper declaration files

## 📦 Usage

```typescript
import * as OpenADR from 'openadr-3-ts-types';

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

## ✅ **AJV Validation**

This package includes **47 automatically generated AJV validators** that enforce all OpenADR validation constraints without requiring manual wrapper functions.

### Key Advantages

- **Schema-Driven**: Validators generated directly from OpenAPI schemas
- **Zero Manual Work**: No need to write wrapper functions like with Zod/Joi
- **Perfect Constraint Preservation**: All `@pattern`, `@minLength`, `@minimum`, etc. automatically enforced
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

## 🛠 Development

### Prerequisites
- Node.js 22+
- npm 10+

### Scripts

```bash
# Generate types from OpenADR specification
npm run generate

# Build TypeScript declarations and JavaScript
npm run build

# Clean generated files
npm run clean

# Run validation tests
npm run test:types
```

### Build Process

1. **Generate**: Uses `@openapi-codegen/typescript` to generate types from `openadr3.1.0.yaml`
2. **Preserve Constraints**: JSDoc validation tags are automatically preserved from the OpenAPI spec
3. **Compile**: TypeScript compiler generates `.d.ts` declarations and ESM `.js` files
4. **Output**: Clean, modern TypeScript types with full validation metadata

## 📋 JSDoc Validation Tags

The generated types include essential validation constraints as JSDoc tags:

### Pattern Constraints
```typescript
/**
 * @pattern ^(-?)P(?=\d|T\d)(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)([DW]))?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$
 */
export type Duration = string;
```

### Numeric Constraints  
```typescript
/**
 * @minimum 0
 * @maximum 100
 */
confidence?: number;
```

### String Length Constraints
```typescript
/**
 * @minLength 1
 * @maxLength 128
 */
programName: string;
```

## 🎯 Advantages over Fern

Unlike Fern, this approach preserves OpenADR's critical validation constraints:

| Feature | This Package | Fern |
|---------|-------------|------|
| JSDoc Validation Tags | ✅ Full support | ❌ Not supported |
| Regex Patterns | ✅ `@pattern` preserved | ❌ Lost |
| Length Constraints | ✅ `@minLength/@maxLength` | ❌ Lost |
| Numeric Ranges | ✅ `@minimum/@maximum` | ❌ Lost |
| Modern ESM | ✅ Yes | ✅ Yes |
| Node.js 22+ | ✅ Yes | ✅ Yes |

## 📄 License

MIT - See LICENSE file for details.