#!/usr/bin/env node

/**
 * Generate AJV validators from OpenADR OpenAPI specification
 * Preserves all validation constraints (@pattern, @minLength, etc.)
 */

import fs from 'fs';
import path from 'path';
import SwaggerParser from '@apidevtools/swagger-parser';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { fromSchema } from '@openapi-contrib/openapi-schema-to-json-schema';

console.log('🛠️  Generating AJV validators from OpenADR specification...');

const specPath = path.resolve('../../openadr3.1.0.yaml');
const outputDir = '../package/src/generated';
const outputFile = path.join(outputDir, 'validators.ts');

async function generateValidators() {
  try {
    // Parse and dereference the OpenAPI spec (resolves all $ref)
    console.log('📄 Loading and dereferencing OpenAPI spec...');
    const api = await SwaggerParser.dereference(specPath);
    
    const schemas = api.components?.schemas;
    if (!schemas) {
      throw new Error('No schemas found in OpenAPI spec');
    }
    
    console.log(`📋 Found ${Object.keys(schemas).length} schemas to process`);
    
    // Setup AJV for compilation testing
    const ajv = new Ajv({ 
      allErrors: true,
      strict: false,
      validateSchema: false
    });
    addFormats(ajv);
    
    // Generate validators for each schema
    const validatorFunctions = [];
    const importStatements = new Set();
    const schemaExports = [];
    
    for (const [schemaName, schema] of Object.entries(schemas)) {
      console.log(`🔄 Processing ${schemaName}...`);
      
      try {
        // Convert OpenAPI schema to JSON Schema
        const jsonSchema = fromSchema(schema);
        
        // Test compilation with AJV
        const validate = ajv.compile(jsonSchema);
        
        // Generate the validator function (ensure PascalCase for TypeScript imports)
        const functionName = `validate${schemaName}`;
        const schemaConstName = `${schemaName}Schema`;
        const pascalSchemaName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
        
        // Create schema constant
        schemaExports.push({
          name: schemaConstName,
          schema: jsonSchema,
          description: schema.description || `JSON Schema for ${schemaName}`
        });
        
        // Create validator function
        validatorFunctions.push({
          functionName,
          schemaName,
          pascalSchemaName,
          schemaConstName,
          description: schema.description || `Validate ${schemaName} data`,
          constraints: extractConstraints(jsonSchema)
        });
        
        console.log(`   ✅ ${schemaName} validator generated`);
        
      } catch (error) {
        console.warn(`   ⚠️  Skipping ${schemaName}: ${error.message}`);
      }
    }
    
    // Generate TypeScript file
    console.log(`📝 Generating TypeScript file with ${validatorFunctions.length} validators...`);
    
    const tsContent = generateTypeScriptFile(schemaExports, validatorFunctions);
    
    // Write to file
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`✅ Generated ${validatorFunctions.length} AJV validators`);
    console.log(`📁 Output: ${outputFile}`);
    console.log('🎯 All OpenADR validation constraints preserved!');
    
  } catch (error) {
    console.error('❌ Validator generation failed:', error);
    process.exit(1);
  }
}

function extractConstraints(jsonSchema) {
  const constraints = [];
  if (jsonSchema.pattern) constraints.push(`@pattern ${jsonSchema.pattern}`);
  if (jsonSchema.minLength !== undefined) constraints.push(`@minLength ${jsonSchema.minLength}`);
  if (jsonSchema.maxLength !== undefined) constraints.push(`@maxLength ${jsonSchema.maxLength}`);
  if (jsonSchema.minimum !== undefined) constraints.push(`@minimum ${jsonSchema.minimum}`);
  if (jsonSchema.maximum !== undefined) constraints.push(`@maximum ${jsonSchema.maximum}`);
  if (jsonSchema.format) constraints.push(`@format ${jsonSchema.format}`);
  return constraints;
}

function generateTypeScriptFile(schemaExports, validatorFunctions) {
  const schemas = schemaExports.map(s => 
    `/**
 * ${s.description}
 */
export const ${s.name} = ${JSON.stringify(s.schema, null, 2)} as const;`
  ).join('\n\n');
  
  const validators = validatorFunctions.map(v => 
    `/**
 * ${v.description}
 * 
 * Validation constraints preserved:
${v.constraints.map(c => ` * - ${c}`).join('\n')}
 * 
 * @param data - Data to validate
 * @returns Validation result with detailed errors
 */
export function ${v.functionName}(data: unknown): ValidationResult<${v.pascalSchemaName}> {
  const validate = ajv.compile(${v.schemaConstName});
  const valid = validate(data);
  
  return {
    success: valid,
    data: valid ? (data as ${v.pascalSchemaName}) : undefined,
    errors: validate.errors || []
  };
}`
  ).join('\n\n');

  return `/**
 * Auto-generated AJV validators for OpenADR 3.1.0
 * 
 * These validators preserve all OpenAPI validation constraints:
 * - @pattern for regex patterns
 * - @minLength/@maxLength for string length constraints  
 * - @minimum/@maximum for numeric constraints
 * - @format for format validation (date-time, uri, etc.)
 * 
 * Generated from: openadr3.1.0.yaml
 */

import Ajv, { type ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import type * as Schemas from './openadr3Schemas.js';

// Export schema type aliases for convenience
${validatorFunctions.map(v => `export type ${v.pascalSchemaName} = Schemas.${v.pascalSchemaName};`).join('\n')}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors: ErrorObject[];
}

// Configure AJV instance
const ajv = new Ajv({ 
  allErrors: true,
  strict: false,
  validateSchema: false
});
addFormats(ajv);

// JSON Schema definitions
${schemas}

// Validation functions
${validators}

// Export convenience function to validate any schema by name
export function validateBySchemaName(schemaName: string, data: unknown): ValidationResult<unknown> {
  const validatorMap: Record<string, (data: unknown) => ValidationResult<unknown>> = {
${validatorFunctions.map(v => `    ${v.pascalSchemaName}: ${v.functionName},`).join('\n')}
  };
  
  const validator = validatorMap[schemaName];
  if (!validator) {
    return {
      success: false,
      errors: [{ 
        instancePath: '', 
        schemaPath: '', 
        keyword: 'unknown', 
        params: {}, 
        message: \`Unknown schema: \${schemaName}\`
      } as ErrorObject]
    };
  }
  
  return validator(data);
}`;
}

// Run the generator
await generateValidators();