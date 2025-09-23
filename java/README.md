# OpenADR 3 Java Implementation

Complete Java implementation of OpenADR 3.1.0 types and data validation functions, including comprehensive API endpoint parameter and response types.

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

1. **Setup the build environment**:
   ```bash
   cd builder
   mvn clean compile
   ```

2. **Generate demo types** (no external dependencies):
   ```bash
   mvn exec:java -Dexec.args="--demo"
   ```

3. **Generate types from OpenAPI specification**:
   ```bash
   mvn exec:java -Dexec.args="--types --validation"
   ```

4. **Test the generated types**:
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

### Primary Tool: **OpenAPI Generator**
- **Industry standard** for OpenAPI to Java generation
- **Generates POJOs** with Jackson annotations and Bean Validation
- **Creates client interfaces** for API consumption
- **Supports both** components/schemas and paths sections

### Generated Features

- `model/` - Core Java classes for all OpenADR data types (components/schemas)
- `api/` - API endpoint parameter and response types (paths)
- `validation/` - Validation functions with detailed error reporting
- Jackson annotations for JSON serialization/deserialization
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
# Setup environment
cd builder
mvn clean compile

# Generate demo types (no external dependencies)
mvn exec:java -Dexec.args="--demo"

# Generate full types from OpenAPI (requires OpenAPI Generator setup)
mvn clean generate-sources

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
- `openapi-generator-maven-plugin` - OpenAPI to Java code generation
- `jackson-databind` - JSON serialization/deserialization
- `jakarta.validation-api` - Bean Validation specifications
- `hibernate-validator` - Bean Validation implementation

**Generated Features**:
- **Schema types** from components/schemas with full Bean Validation
- **API parameter types** from paths section with validation
- **Response wrapper types** for all endpoints
- **Client interfaces** for API consumption (optional)
- **Validation utilities** with detailed error reporting

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

For full OpenAPI generation, the project includes Maven plugin configuration:

```xml
<plugin>
    <groupId>org.openapitools</groupId>
    <artifactId>openapi-generator-maven-plugin</artifactId>
    <version>7.2.0</version>
    <executions>
        <execution>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <inputSpec>../../openadr3.1.0.yaml</inputSpec>
                <generatorName>java</generatorName>
                <configOptions>
                    <dateLibrary>java8</dateLibrary>
                    <serializationLibrary>jackson</serializationLibrary>
                    <useBeanValidation>true</useBeanValidation>
                    <useOptional>true</useOptional>
                    <generateBuilders>true</generateBuilders>
                </configOptions>
            </configuration>
        </execution>
    </executions>
</plugin>
```

This enables `mvn generate-sources` to create complete Java types from the OpenAPI specification.