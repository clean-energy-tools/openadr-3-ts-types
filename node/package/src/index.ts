/**
 * OpenADR 3.1.0 TypeScript Type Definitions
 * 
 * Auto-generated from OpenADR 3.1.0 OpenAPI specification
 * Preserves JSDoc validation constraints including:
 * - @pattern for regex patterns (e.g., Duration, ObjectID)
 * - @minimum/@maximum for numeric constraints 
 * - @minLength/@maxLength for string constraints
 * 
 * These JSDoc tags provide essential validation information for
 * implementing proper OpenADR 3.1.0 compliance.
 */

// Export all OpenADR 3.1.0 schema types with validation constraints
export * from './generated/openadr3Schemas.js';

// Export API response types for all operations
export * from './generated/openadr3Responses.js';

// Export API component types (request parameters, path params, etc.)
export * from './generated/openadr3Components.js';

// Export AJV validation functions with preserved constraints
export * as Validators from './generated/validators.js';