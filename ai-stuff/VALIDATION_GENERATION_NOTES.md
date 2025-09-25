# Generating Data Validation Functions from OpenAPI Specifications

## Overview

This document captures lessons learned and best practices for generating TypeScript types and validation functions from OpenAPI 3.x specifications, based on extensive experimentation with the OpenADR 3.1.0 specification.

## Key Requirements

1. **Type Generation**: Generate complete TypeScript types from OpenAPI schemas
2. **Validation Functions**: Generate runtime validation that enforces all OpenAPI constraints
3. **Constraint Preservation**: Maintain validation rules like `pattern`, `minLength`, `maxLength`, `minimum`, `maximum`
4. **API Endpoint Types**: Generate parameter and response types for all REST endpoints
5. **Single Source of Truth**: OpenAPI spec should be the only place constraints are defined

## Tool Evaluation Summary

### Tools Tested

Based on experiments in `node-old/builder/` and `~/Projects/nodejs/typescript-generate-types-from-openapi/`:

1. **@openapi-codegen** ✅ **WINNER**
   - Preserves JSDoc validation constraints in generated types
   - Generates clean TypeScript interfaces
   - Supports OpenAPI 3.1 features
   - Requires post-processing to remove unwanted fetcher code

2. **Fern** ❌ **FAILED**
   - Generates types but loses validation constraints
   - No JSDoc annotations for validation rules
   - Forces specific SDK structure

3. **openapi-typescript** ⚠️ **PARTIAL**
   - Excellent for generating raw types
   - No built-in validation generation
   - Requires separate validation layer

4. **openapi-generator** ⚠️ **PARTIAL**
   - Heavy, generates entire SDKs
   - Inconsistent TypeScript output quality

### Validation Library Evaluation

1. **AJV** ✅ **WINNER**
   - Direct JSON Schema support
   - Can consume OpenAPI schemas directly
   - Automatic constraint enforcement
   - High performance

2. **Zod** ⚠️ **MANUAL WORK**
   - Requires manual schema translation
   - Type-first approach conflicts with schema-first OpenAPI
   - Good TypeScript integration but maintenance overhead

3. **Joi** ⚠️ **MANUAL WORK**
   - Requires manual schema translation
   - Less TypeScript-native than Zod

## Winning Architecture

### Current Solution (`/node/`)

```
OpenAPI Spec → @openapi-codegen → Types + JSDoc
            ↓
         Post-process (remove fetchers)
            ↓
OpenAPI Schemas → AJV → Validation Functions
            ↓
        Package Assembly
```

### Key Components

1. **Type Generation** (`builder/openapi-codegen.config.ts`)
   ```typescript
   export default {
     openadr3: {
       from: {
         source: 'file',
         file: '../openadr3.1.0.yaml'
       },
       outputDir: './generated',
       to: 'plugins/typescript',
     }
   }
   ```

2. **Post-Processing** (`builder/extract-types-simple.js`)
   - Removes fetcher functions
   - Preserves only type definitions and schemas
   - Maintains JSDoc constraint annotations

3. **AJV Validator Generation** (`builder/generate-ajv-validators.js`)
   - Extracts schemas from OpenAPI spec
   - Generates individual validation functions
   - Preserves all constraint validation

### Generated Artifacts

1. **Schema Types** (`openadr3Schemas.ts`)
   - All OpenADR data types with JSDoc constraints
   - Example: Duration, Program, Event, VEN, etc.

2. **Endpoint Types** (`openadr3Components.ts`)
   - Request/response parameter types for all REST endpoints
   - 117+ generated endpoint type definitions

3. **Validators** (`validators.ts`)
   - 47 AJV validation functions
   - One validator per schema with full constraint checking

## Critical Success Factors

### 1. JSDoc Constraint Preservation

**Problem**: Most tools strip validation constraints during type generation.

**Solution**: @openapi-codegen preserves constraints as JSDoc:
```typescript
/**
 * @pattern ^-?P(?:\d+(?:\.\d+)?Y)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?D)?(?:T(?:\d+(?:\.\d+)?H)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?S)?)?$
 */
export type Duration = string;
```

### 2. Schema-Driven Validation

**Problem**: Manual validation schema creation leads to drift from OpenAPI spec.

**Solution**: Generate AJV validators directly from OpenAPI JSON schemas:
```javascript
const schemas = spec.components.schemas;
for (const [name, schema] of Object.entries(schemas)) {
  const validate = ajv.compile(schema);
  // Generate validation function
}
```

### 3. Post-Processing Pipeline

**Problem**: No single tool does everything perfectly.

**Solution**: Chain tools with post-processing:
1. Generate types with @openapi-codegen
2. Strip unwanted code with custom scripts
3. Generate validators with separate AJV pipeline
4. Combine outputs into clean package

## Lessons Learned

### What Works

1. **Tool Chaining**: Combine strengths of multiple tools rather than seeking one perfect tool
2. **Schema-First**: Let OpenAPI schemas drive validation, don't translate to other schema languages
3. **Constraint Preservation**: JSDoc annotations enable tooling while maintaining human readability
4. **Separate Concerns**: Generate types and validators separately, then combine

### What Doesn't Work

1. **Fern for Validation**: Loses critical constraint information
2. **Manual Schema Translation**: Creates maintenance burden and drift risk
3. **All-in-One Tools**: Usually compromise on some aspect of the requirements
4. **Type-First Validation**: Conflicts with schema-first OpenAPI approach

### Anti-Patterns to Avoid

1. **Duplicating Constraints**: Don't define validation rules in both OpenAPI and validation code
2. **Tool Lock-in**: Don't depend on proprietary formats that can't be migrated
3. **Over-Engineering**: Simple post-processing scripts > complex custom tools
4. **Ignoring Constraints**: Type-only generation without validation is incomplete

## Implementation Guide

### 1. Setup @openapi-codegen
```bash
npm install @openapi-codegen/cli @openapi-codegen/typescript
```

### 2. Configure Type Generation
Create `openapi-codegen.config.ts` with TypeScript plugin targeting your OpenAPI spec.

### 3. Create Post-Processing Script
Remove unwanted fetcher code while preserving types and JSDoc constraints.

### 4. Setup AJV Validation Generation
Extract schemas from OpenAPI spec and generate individual validation functions.

### 5. Package Assembly
Export types, schemas, and validators from a clean package interface.

## Future Considerations

1. **OpenAPI 3.1 Features**: Ensure tooling supports latest JSON Schema features
2. **Performance**: AJV provides excellent performance for high-volume validation
3. **Maintenance**: Schema-driven approach minimizes ongoing maintenance
4. **Extension**: Additional validation layers can be built on top of generated base

## Conclusion

The combination of @openapi-codegen for type generation with AJV for schema-driven validation provides the best balance of:
- Complete constraint preservation
- Minimal maintenance overhead  
- High runtime performance
- Clean developer experience

This approach successfully makes the OpenAPI specification the single source of truth for both TypeScript types and runtime validation.