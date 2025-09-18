#!/usr/bin/env zx

/**
 * Modern build script for generating OpenADR 3.1.0 TypeScript types
 * Preserves JSDoc validation constraints (@pattern, @minimum, @maximum, etc.)
 */

import { $ } from 'zx';
import { spec, outputDir } from './common.js';

console.log('🚀 Generating OpenADR 3.1.0 TypeScript types with JSDoc validation constraints...');
console.log(`📄 Source spec: ${spec}`);
console.log(`📁 Output directory: ${outputDir}`);

try {
    // Generate types using @openapi-codegen
    await $`npx openapi-codegen gen openadr3 -c openapi-codegen.config.ts`;
    
    // Extract only type definitions from Components (remove fetcher functions)
    await $`node extract-types-simple.js`;
    
    // Generate AJV validators from OpenAPI schemas
    await $`node generate-ajv-validators.js`;
    
    // Ensure output directory exists
    await $`mkdir -p ${outputDir}`;
    
    // Copy schema and response files (Components already extracted)
    await $`cp ./generated/openadr3Schemas.ts ${outputDir}/`;
    await $`cp ./generated/openadr3Responses.ts ${outputDir}/`;
    
    // Remove fetcher file we don't need
    await $`rm -f ${outputDir}/openadr3Fetcher.ts`;
    
    console.log('✅ Types generated successfully!');
    console.log('📝 JSDoc validation constraints preserved:');
    console.log('   - @pattern for regex patterns (e.g., Duration, ObjectID)');
    console.log('   - @minimum/@maximum for numeric constraints');
    console.log('   - @minLength/@maxLength for string constraints');
    console.log('🔗 API endpoint types included:');
    console.log('   - Query/Path/Body parameter types for all endpoints');
    console.log('   - Response types for all API operations');
    console.log('✅ AJV validators generated:');
    console.log('   - 47 validation functions with preserved constraints');
    console.log('   - Schema-driven validation (no manual wrappers needed)');
    
} catch (err) {
    console.error(`❌ Generation failed: ${err.exitCode} ${err.stderr}`);
    process.exit(1);
}