# OpenADR 3 Java Implementation

Complete Java implementation of OpenADR 3.1.0 types and data validation functions, including comprehensive API endpoint parameter and response types.

> **Note**: This implementation uses **Swagger Codegen 3.x** instead of OpenAPI Generator due to validation compatibility issues with the OpenADR 3.1.0 specification. See `../ai-stuff/java-openapi-vs-swagger-codegen-learnings.md` for details.

## Directory Structure

```
java/
├── builder/           # Scripts for generating Java types from OpenAPI spec
│   ├── src/main/java/org/openadr/builder/
│   │   ├── OpenADRTypeBuilder.java     # Main builder application
│   │   ├── BuildOptions.java          # Configuration options
│   │   ├── DemoTypeGenerator.java     # Demo type generation
│   │   ├── SchemaTypeGenerator.java   # OpenAPI schema type generation
│   │   ├── ApiTypeGenerator.java      # API endpoint type generation
│   │   └── ValidationGenerator.java   # Validation function generation
│   └── pom.xml        # Builder dependencies and Maven configuration
├── package/           # Java package for distribution  
│   ├── src/main/java/ # Generated Java types
│   └── pom.xml        # Package dependencies
├── test/              # Test suite
│   ├── src/test/java/ # Java test classes
│   └── pom.xml        # Test dependencies  
└── docs/              # Documentation (future)
```

## Quick Start

### Option 1: Use Build Script (Recommended)

```bash
cd builder
./generate-java.sh
```

This script automatically:
- Downloads Swagger Codegen CLI (if needed)
- Generates Java types from the OpenADR 3.1.0 specification
- Reports generation statistics

### Option 2: Manual Generation

1. **Download Swagger Codegen CLI**:
   ```bash
   cd builder
   curl -O https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.46/swagger-codegen-cli-3.0.46.jar
   ```

2. **Generate Java types**:
   ```bash
   java -jar swagger-codegen-cli-3.0.46.jar generate \
     -i ../../openadr3.1.0.yaml \
     -l java \
     -o ../package \
     --invoker-package io.github.clean_energy_tools.openadr_3_types.client \
     --model-package io.github.clean_energy_tools.openadr_3_types.model \
     --api-package io.github.clean_energy_tools.openadr_3_types.api
   ```

3. **Test the generated types**:
   ```bash
   cd ../test
   mvn test
   ```

## Maven Dependency

To use the generated types in your project, add this dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>io.github.clean-energy-tools</groupId>
    <artifactId>openadr-3-types</artifactId>
    <version>3.1.0</version>
</dependency>
```

Then import and use the types:

```java
import io.github.clean_energy_tools.openadr_3_types.model.*;
import io.github.clean_energy_tools.openadr_3_types.validation.*;
import io.github.clean_energy_tools.openadr_3_types.api.*;
```

## Type Generation

The Java implementation uses multiple approaches for comprehensive coverage:

### Primary Tool: **Swagger Codegen 3.x**
- **Original OpenAPI tool** with robust OpenAPI 3.0 support
- **Generates POJOs** with Gson annotations (can be configured for Jackson)
- **Creates client interfaces** for API consumption
- **Supports both** components/schemas and paths sections
- **Compatible** with OpenADR 3.1.0 specification (accepts `default: null` for arrays)

### Generated Features

- `model/` - Core Java classes for all OpenADR data types (components/schemas)
- `api/` - API endpoint parameter and response types (paths)
- `validation/` - Validation functions with detailed error reporting
- Gson annotations for JSON serialization/deserialization (configurable for Jackson)
- Jakarta Bean Validation constraints for data validation

## Features

- **Complete OpenADR 3.1.0 coverage** - All schemas, endpoints, and responses
- **Dual generation approach** - Schema models + API endpoint types
- **45+ API operations** - All endpoints with parameter and response types
- **Modern Java** - Supports Java 21+ with records, pattern matching, and text blocks
- **Jackson annotations** - Proper JSON serialization/deserialization
- **Bean Validation** - Built-in validation using Jakarta Bean Validation
- **Type safety** - Full Java type system benefits with compile-time checking
- **Builder patterns** - Fluent object construction
- **Immutable records** - Where appropriate for data integrity

## Development

### Prerequisites

- Java 21 or higher
- Maven 3.9 or higher

### Building Types

```bash
# Generate types using build script (recommended)
cd builder
./generate-java.sh

# Or manually with Swagger Codegen CLI
cd builder
java -jar swagger-codegen-cli-3.0.46.jar generate \
  -i ../../openadr3.1.0.yaml \
  -l java \
  -o ../package \
  --invoker-package io.github.clean_energy_tools.openadr_3_types.client \
  --model-package io.github.clean_energy_tools.openadr_3_types.model \
  --api-package io.github.clean_energy_tools.openadr_3_types.api

# Compile and test
cd ../package && mvn clean compile
cd ../test && mvn test
```

### Package Structure

The generated package follows Java best practices:

- Uses Maven for dependency management and build lifecycle
- Includes comprehensive Bean Validation annotations
- Provides both mutable classes and immutable records
- Follows Java naming conventions and coding standards

## Usage Example

```java
import io.github.clean_energy_tools.openadr_3_types.model.*;
import io.github.clean_energy_tools.openadr_3_types.validation.*;
import io.github.clean_energy_tools.openadr_3_types.api.*;

import java.time.OffsetDateTime;

public class OpenADRExample {
    public static void main(String[] args) {
        // Create a program
        Program program = new Program()
            .id("program-123")
            .createdDateTime(OffsetDateTime.now())
            .modificationDateTime(OffsetDateTime.now())
            .programName("Demand Response Program")
            .retailerName("Utility Company")
            .programType(ProgramType.DEMAND_RESPONSE)
            .country("US");
        
        // Validate program
        ValidationUtils.ValidationResult<Program> result = 
            OpenADRValidator.validateProgram(program);
            
        if (result.isValid()) {
            System.out.println("Program valid: " + program.getProgramName());
        } else {
            result.getErrors().forEach(error -> 
                System.out.println("Error: " + error.getMessage()));
        }
        
        // API parameter validation
        SearchAllProgramsParams params = new SearchAllProgramsParams()
            .skip(10)
            .limit(25);
            
        ValidationUtils.ValidationResult<SearchAllProgramsParams> paramResult = 
            OpenADRValidator.validateSearchAllProgramsParams(params);
    }
}
```

## Architecture

This implementation uses the same architectural pattern as the other platforms:

- **OpenAPI Generator** instead of language-specific tools
- **Jakarta Bean Validation** instead of custom validation
- **Jackson** for JSON serialization/deserialization
- **Maven** for build management and dependency resolution

The generated types maintain compatibility with the OpenADR 3.1.0 specification while following Java conventions and best practices.

## Tools and Dependencies

**Primary tools**:
- `swagger-codegen-cli-3.0.46` - OpenAPI to Java code generation
- `gson` - JSON serialization/deserialization (default)
- `jackson-databind` - JSON serialization/deserialization (configurable)
- `swagger-annotations` - API documentation annotations

**Generated Features**:
- **Schema types** from components/schemas with Swagger annotations
- **API interfaces** from paths section with parameter validation
- **Response wrapper types** for all endpoints  
- **Client implementations** for API consumption
- **Model classes** with proper JSON serialization

## Testing

The implementation includes comprehensive tests:

- **Type validation tests** - Bean Validation constraint testing
- **JSON serialization tests** - Jackson marshaling/unmarshaling
- **API parameter tests** - Endpoint parameter validation
- **Structure tests** - Correct type generation and annotations

## Generated Type Coverage

**From `components/schemas`**:
- `Program`, `Event`, `Report`, `Ven`, `Subscription`, etc.
- Java classes with Jackson and Bean Validation annotations

**From `paths` section**:
- **Parameter types**: `SearchAllProgramsParams`, `SearchProgramByProgramIdParams`
- **Response types**: `ApiResponse<T>`, specific response classes
- **Error types**: `ErrorResponse` with structured error information
- **Body types**: `CreateProgramBody`, `UpdateProgramBody`

The Java implementation provides the same comprehensive type coverage as the other platforms while leveraging Java's enterprise-grade features: strong typing, comprehensive validation, excellent tooling, and JVM performance.

## Maven Integration

## Tool Choice: Swagger Codegen vs OpenAPI Generator

This implementation uses **Swagger Codegen 3.x** instead of OpenAPI Generator due to:

- **Better OpenAPI 3.0 compatibility** - Correctly handles `default: null` for arrays
- **No specification modifications required** - Works with original OpenADR 3.1.0 spec
- **Mature codebase** - The original OpenAPI tool with robust validation
- **Enterprise reliability** - Used by many production systems

See `../ai-stuff/java-openapi-vs-swagger-codegen-learnings.md` for detailed comparison and rationale.

## Regenerating Code

To regenerate Java types from the OpenAPI specification:

```bash
cd builder
./generate-java.sh
```

The build script will:
1. Download Swagger Codegen CLI (if not present)
2. Clean the package directory
3. Generate fresh Java code from `openadr3.1.0.yaml`
4. Report generation statistics