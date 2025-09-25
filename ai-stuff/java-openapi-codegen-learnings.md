# Java OpenAPI Code Generation: Tools and Learnings

## Overview

This document captures key learnings from implementing OpenADR 3.1.0 type definitions and validation functions for Java, generated from OpenAPI 3.1.0 specifications.

## Tools Evaluated and Used

### Primary Tool: OpenAPI Generator (Java)

**Repository**: https://github.com/OpenAPITools/openapi-generator  
**Version Used**: 7.2.0+ (with OpenAPI 3.1.0 support)

#### Why This Tool Was Selected

1. **Mature and Comprehensive**: Most established OpenAPI code generation tool
2. **Java Ecosystem Integration**: Excellent support for Maven/Gradle builds
3. **Multiple Java Variants**: Supports various HTTP clients (OkHttp, Apache HttpClient, etc.)
4. **Validation Integration**: Works with Jakarta Bean Validation and Jackson
5. **Extensive Customization**: Templates, configuration options, and plugins
6. **Enterprise Ready**: Used widely in production environments

#### Installation and Setup

```xml
<!-- Maven Plugin -->
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
                <inputSpec>${project.basedir}/../../openadr3.1.0.yaml</inputSpec>
                <generatorName>java</generatorName>
                <output>${project.build.directory}/generated-sources</output>
                <modelPackage>org.openadr.types.generated</modelPackage>
                <configOptions>
                    <useJakartaEe>true</useJakartaEe>
                    <serializationLibrary>jackson</serializationLibrary>
                    <useBeanValidation>true</useBeanValidation>
                    <performBeanValidation>true</performBeanValidation>
                    <library>native</library>
                </configOptions>
            </configuration>
        </execution>
    </executions>
</plugin>
```

#### Command Line Usage

```bash
# Generate Java models only
openapi-generator generate \
  -i openadr3.1.0.yaml \
  -g java \
  -o ./generated \
  --model-package org.openadr.types \
  --additional-properties=useJakartaEe=true,useBeanValidation=true
```

### Validation Framework: Jakarta Bean Validation

**Specification**: Jakarta Bean Validation 3.0+  
**Implementation**: Hibernate Validator 8.0+

#### Why Jakarta Bean Validation

1. **Standard Specification**: Official Jakarta EE standard for validation
2. **Annotation-Based**: Clean, declarative validation approach
3. **Extensive Validators**: Built-in validators for common patterns
4. **Custom Validators**: Easy to create domain-specific validation rules
5. **Framework Integration**: Works with Spring Boot, JAX-RS, etc.

#### Dependencies

```xml
<dependencies>
    <!-- Jakarta Bean Validation API -->
    <dependency>
        <groupId>jakarta.validation</groupId>
        <artifactId>jakarta.validation-api</artifactId>
        <version>3.0.2</version>
    </dependency>
    
    <!-- Hibernate Validator Implementation -->
    <dependency>
        <groupId>org.hibernate.validator</groupId>
        <artifactId>hibernate-validator</artifactId>
        <version>8.0.1.Final</version>
    </dependency>
    
    <!-- Jackson for JSON serialization -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.16.1</version>
    </dependency>
</dependencies>
```

### Serialization: Jackson

**Library**: Jackson 2.16+ with Jakarta annotations  
**Features**: JSON serialization/deserialization with validation integration

### Alternative Tools Considered

#### 1. **Swagger Codegen**
- **Pros**: Legacy support, established
- **Cons**: Deprecated in favor of OpenAPI Generator
- **Verdict**: Superseded by OpenAPI Generator

#### 2. **Custom Code Generation with JavaPoet**
- **Pros**: Complete control, modern Java features
- **Cons**: Significant development effort, need to parse OpenAPI manually
- **Verdict**: Too much effort for standard use cases

#### 3. **Spring Boot OpenAPI Integration**
- **Pros**: Tight Spring integration
- **Cons**: Framework-specific, limited customization
- **Verdict**: Good for Spring-only projects

## Key Learnings

### 1. Generated Java Class Patterns

#### Basic Model Class Structure
```java
// Generated from OpenAPI schema
@JsonPropertyOrder({
    Program.JSON_PROPERTY_ID,
    Program.JSON_PROPERTY_PROGRAM_NAME,
    Program.JSON_PROPERTY_RETAILER_NAME,
    Program.JSON_PROPERTY_COUNTRY,
    Program.JSON_PROPERTY_PROGRAM_TYPE
})
@JsonTypeName("Program")
@Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen")
public class Program {
    
    public static final String JSON_PROPERTY_ID = "id";
    @JsonProperty(JSON_PROPERTY_ID)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)
    @NotNull
    @Size(min = 1)
    private String id;
    
    public static final String JSON_PROPERTY_PROGRAM_NAME = "program_name";
    @JsonProperty(JSON_PROPERTY_PROGRAM_NAME)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)
    @NotNull
    @Size(min = 1)
    private String programName;
    
    public static final String JSON_PROPERTY_COUNTRY = "country";
    @JsonProperty(JSON_PROPERTY_COUNTRY)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)
    @NotNull
    @Size(min = 2, max = 2)
    @Pattern(regexp = "^[A-Z]{2}$")
    private String country;
    
    public static final String JSON_PROPERTY_PROGRAM_TYPE = "program_type";
    @JsonProperty(JSON_PROPERTY_PROGRAM_TYPE)
    @JsonInclude(value = JsonInclude.Include.ALWAYS)
    @NotNull
    @Valid
    private ProgramType programType;
    
    // Constructors, getters, setters, equals, hashCode, toString...
}
```

**Learning**: OpenAPI Generator creates comprehensive Java classes with Jackson annotations, Bean Validation constraints, and proper encapsulation.

#### Enum Generation Pattern
```java
@JsonPropertyOrder()
@JsonTypeName("ProgramType")
@Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen")
public enum ProgramType {
    
    @JsonProperty("DEMAND_RESPONSE")
    DEMAND_RESPONSE("DEMAND_RESPONSE"),
    
    @JsonProperty("PRICING")
    PRICING("PRICING"),
    
    @JsonProperty("EMERGENCY")
    EMERGENCY("EMERGENCY");
    
    private final String value;
    
    ProgramType(String value) {
        this.value = value;
    }
    
    @JsonValue
    public String getValue() {
        return value;
    }
    
    @Override
    public String toString() {
        return String.valueOf(value);
    }
    
    @JsonCreator
    public static ProgramType fromValue(String value) {
        for (ProgramType b : ProgramType.values()) {
            if (b.value.equals(value)) {
                return b;
            }
        }
        throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
}
```

**Learning**: Generated enums include proper Jackson serialization/deserialization with type safety.

### 2. API Parameter and Response Types

#### Parameter Class Generation
```java
// Query parameters for GET /programs
public class SearchAllProgramsParams {
    
    @JsonProperty("targets")
    @Valid
    private List<@Valid String> targets = null;
    
    @JsonProperty("skip")
    @Min(0)
    private Integer skip = null;
    
    @JsonProperty("limit")
    @Min(1)
    @Max(50)
    private Integer limit = 25;
    
    // Builder pattern methods
    public SearchAllProgramsParams targets(List<String> targets) {
        this.targets = targets;
        return this;
    }
    
    public SearchAllProgramsParams addTargetsItem(String targetsItem) {
        if (this.targets == null) {
            this.targets = new ArrayList<>();
        }
        this.targets.add(targetsItem);
        return this;
    }
    
    // Getters and setters...
}

// Path parameters for GET /programs/{programID}
public class SearchProgramByProgramIdParams {
    
    @JsonProperty("programID")
    @NotNull
    @Size(min = 1)
    private String programId;
    
    // Constructor, getters, setters...
}
```

#### Response Type Generation
```java
// Response wrapper for API endpoints
public class SearchAllProgramsResponse {
    
    @JsonProperty("programs")
    @JsonInclude(value = JsonInclude.Include.ALWAYS)
    @NotNull
    @Valid
    private List<@Valid Program> programs = new ArrayList<>();
    
    @JsonProperty("count")
    @JsonInclude(value = JsonInclude.Include.ALWAYS)
    @NotNull
    @Min(0)
    private Integer count;
    
    // Constructors, methods...
}

// Error response type
public class ErrorResponse {
    
    @JsonProperty("status")
    @NotNull
    @Min(100)
    @Max(599)
    private Integer status;
    
    @JsonProperty("title")
    @NotNull
    private String title;
    
    @JsonProperty("detail")
    @NotNull
    private String detail;
    
    @JsonProperty("instance")
    private URI instance = null;
    
    @JsonProperty("additional_properties")
    @Valid
    private Map<String, Object> additionalProperties = null;
    
    // Methods...
}
```

### 3. Validation Implementation

#### Comprehensive Validation Service
```java
import jakarta.validation.*;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class ValidationService {
    
    private final Validator validator;
    
    public ValidationService() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        this.validator = factory.getValidator();
    }
    
    public <T> ValidationResult<T> validate(T object) {
        Set<ConstraintViolation<T>> violations = validator.validate(object);
        
        if (violations.isEmpty()) {
            return ValidationResult.success(object);
        }
        
        List<ValidationError> errors = violations.stream()
            .map(this::toValidationError)
            .collect(Collectors.toList());
            
        return ValidationResult.failure(errors);
    }
    
    private <T> ValidationError toValidationError(ConstraintViolation<T> violation) {
        return new ValidationError(
            violation.getPropertyPath().toString(),
            violation.getMessage(),
            violation.getInvalidValue() != null ? violation.getInvalidValue().toString() : null
        );
    }
    
    public <T> void validateAndThrow(T object) {
        ValidationResult<T> result = validate(object);
        if (!result.isValid()) {
            throw new ValidationException("Validation failed: " + result.getErrors());
        }
    }
}

// Validation result wrapper
public class ValidationResult<T> {
    private final boolean valid;
    private final T data;
    private final List<ValidationError> errors;
    
    private ValidationResult(boolean valid, T data, List<ValidationError> errors) {
        this.valid = valid;
        this.data = data;
        this.errors = errors != null ? errors : Collections.emptyList();
    }
    
    public static <T> ValidationResult<T> success(T data) {
        return new ValidationResult<>(true, data, null);
    }
    
    public static <T> ValidationResult<T> failure(List<ValidationError> errors) {
        return new ValidationResult<>(false, null, errors);
    }
    
    // Getters...
}

// Validation error details
public class ValidationError {
    private final String field;
    private final String message;
    private final String invalidValue;
    
    public ValidationError(String field, String message, String invalidValue) {
        this.field = field;
        this.message = message;
        this.invalidValue = invalidValue;
    }
    
    // Getters, toString, equals, hashCode...
}
```

### 4. Advanced Validation Patterns

#### Custom Validators
```java
// Custom country code validator
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CountryCodeValidator.class)
@Documented
public @interface CountryCode {
    String message() default "Invalid country code";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class CountryCodeValidator implements ConstraintValidator<CountryCode, String> {
    
    private static final Set<String> VALID_CODES = Set.of(
        "US", "CA", "GB", "DE", "FR", "JP", "AU", "NZ"
        // ... more codes
    );
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // Let @NotNull handle null values
        }
        
        return value.length() == 2 && VALID_CODES.contains(value.toUpperCase());
    }
}

// Usage in generated classes
public class Program {
    @CountryCode
    @NotNull
    private String country;
    
    // ...
}
```

#### Conditional Validation
```java
// Cross-field validation example
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EventTimeValidator.class)
@Documented
public @interface ValidEventTime {
    String message() default "End time must be after start time";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

@ValidEventTime
public class Event {
    @NotNull
    private OffsetDateTime startTime;
    
    @NotNull
    private OffsetDateTime endTime;
    
    // getters, setters...
}

public class EventTimeValidator implements ConstraintValidator<ValidEventTime, Event> {
    
    @Override
    public boolean isValid(Event event, ConstraintValidatorContext context) {
        if (event.getStartTime() == null || event.getEndTime() == null) {
            return true; // Let field-level @NotNull handle nulls
        }
        
        return event.getEndTime().isAfter(event.getStartTime());
    }
}
```

#### Validation Groups
```java
// Validation groups for different scenarios
public interface CreateValidation {}
public interface UpdateValidation {}

public class Program {
    @NotNull(groups = {CreateValidation.class, UpdateValidation.class})
    @Size(min = 1, groups = {CreateValidation.class, UpdateValidation.class})
    private String id;
    
    @NotNull(groups = CreateValidation.class)
    @Size(min = 1, groups = CreateValidation.class)
    private String programName;
    
    // Fields that can be updated but not required for updates
    @Size(min = 1, groups = UpdateValidation.class)
    private String description;
    
    // ...
}

// Usage
ValidationResult<Program> createResult = validationService.validate(program, CreateValidation.class);
ValidationResult<Program> updateResult = validationService.validate(program, UpdateValidation.class);
```

### 5. JSON Serialization Integration

#### Jackson Configuration
```java
@Configuration
public class JacksonConfig {
    
    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        
        // Configure for generated classes
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        
        // Register modules
        mapper.registerModule(new JavaTimeModule());
        mapper.registerModule(new ParameterNamesModule());
        
        // Set property naming strategy if needed
        mapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
        
        return mapper;
    }
}
```

#### Serialization with Validation
```java
@Service
public class ProgramService {
    
    private final ValidationService validationService;
    private final ObjectMapper objectMapper;
    
    public ProgramService(ValidationService validationService, ObjectMapper objectMapper) {
        this.validationService = validationService;
        this.objectMapper = objectMapper;
    }
    
    public String programToJson(Program program) throws JsonProcessingException {
        // Validate before serialization
        ValidationResult<Program> result = validationService.validate(program);
        if (!result.isValid()) {
            throw new IllegalArgumentException("Invalid program: " + result.getErrors());
        }
        
        return objectMapper.writeValueAsString(program);
    }
    
    public Program programFromJson(String json) throws JsonProcessingException {
        Program program = objectMapper.readValue(json, Program.class);
        
        // Validate after deserialization
        ValidationResult<Program> result = validationService.validate(program);
        if (!result.isValid()) {
            throw new IllegalArgumentException("Invalid program data: " + result.getErrors());
        }
        
        return program;
    }
}
```

### 6. Spring Boot Integration

#### REST Controller with Validation
```java
@RestController
@RequestMapping("/api/v1/programs")
@Validated
public class ProgramController {
    
    private final ProgramService programService;
    private final ValidationService validationService;
    
    public ProgramController(ProgramService programService, ValidationService validationService) {
        this.programService = programService;
        this.validationService = validationService;
    }
    
    @GetMapping
    public ResponseEntity<SearchAllProgramsResponse> searchPrograms(
            @Valid SearchAllProgramsParams params) {
        
        List<Program> programs = programService.searchPrograms(params);
        
        SearchAllProgramsResponse response = new SearchAllProgramsResponse()
            .programs(programs)
            .count(programs.size());
            
        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    public ResponseEntity<?> createProgram(@Valid @RequestBody Program program) {
        // Additional business validation
        ValidationResult<Program> businessValidation = programService.validateBusinessRules(program);
        if (!businessValidation.isValid()) {
            return ResponseEntity.badRequest().body(
                new ErrorResponse()
                    .status(400)
                    .title("Business Validation Failed")
                    .detail("Program violates business rules")
                    .additionalProperties(Map.of("errors", businessValidation.getErrors()))
            );
        }
        
        Program created = programService.createProgram(program);
        return ResponseEntity.status(201).body(created);
    }
    
    @GetMapping("/{programId}")
    public ResponseEntity<Program> getProgram(
            @PathVariable @Valid SearchProgramByProgramIdParams params) {
        
        Optional<Program> program = programService.findById(params.getProgramId());
        
        return program.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
}
```

#### Global Exception Handler
```java
@ControllerAdvice
public class ValidationExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        
        List<ValidationError> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> new ValidationError(
                error.getField(),
                error.getDefaultMessage(),
                error.getRejectedValue() != null ? error.getRejectedValue().toString() : null
            ))
            .collect(Collectors.toList());
        
        ErrorResponse errorResponse = new ErrorResponse()
            .status(400)
            .title("Validation Failed")
            .detail("Request validation failed")
            .additionalProperties(Map.of("validation_errors", errors));
            
        return ResponseEntity.badRequest().body(errorResponse);
    }
    
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(ConstraintViolationException ex) {
        
        List<ValidationError> errors = ex.getConstraintViolations()
            .stream()
            .map(violation -> new ValidationError(
                violation.getPropertyPath().toString(),
                violation.getMessage(),
                violation.getInvalidValue() != null ? violation.getInvalidValue().toString() : null
            ))
            .collect(Collectors.toList());
        
        ErrorResponse errorResponse = new ErrorResponse()
            .status(400)
            .title("Constraint Violation")
            .detail("Request constraints violated")
            .additionalProperties(Map.of("constraint_errors", errors));
            
        return ResponseEntity.badRequest().body(errorResponse);
    }
}
```

### 7. Testing Patterns

#### Unit Testing with Validation
```java
@ExtendWith(MockitoExtension.class)
class ProgramValidationTest {
    
    private ValidationService validationService;
    
    @BeforeEach
    void setUp() {
        validationService = new ValidationService();
    }
    
    @Test
    void testValidProgram() {
        Program program = new Program()
            .id("program-123")
            .programName("Test Program")
            .retailerName("Test Utility")
            .country("US")
            .programType(ProgramType.DEMAND_RESPONSE);
        
        ValidationResult<Program> result = validationService.validate(program);
        
        assertThat(result.isValid()).isTrue();
        assertThat(result.getErrors()).isEmpty();
        assertThat(result.getData()).isEqualTo(program);
    }
    
    @Test
    void testInvalidProgram() {
        Program program = new Program()
            .id("") // Invalid: empty
            .programName("Test Program")
            .retailerName("") // Invalid: empty
            .country("USA") // Invalid: 3 characters
            .programType(ProgramType.DEMAND_RESPONSE);
        
        ValidationResult<Program> result = validationService.validate(program);
        
        assertThat(result.isValid()).isFalse();
        assertThat(result.getErrors()).hasSize(3);
        
        List<String> errorFields = result.getErrors().stream()
            .map(ValidationError::getField)
            .collect(Collectors.toList());
        
        assertThat(errorFields).contains("id", "retailerName", "country");
    }
    
    @ParameterizedTest
    @ValueSource(strings = {"", "A", "USA", "ABCD", "us", "Us"})
    void testInvalidCountryCodes(String countryCode) {
        Program program = createValidProgram().country(countryCode);
        
        ValidationResult<Program> result = validationService.validate(program);
        
        assertThat(result.isValid()).isFalse();
        assertThat(result.getErrors().stream()
            .anyMatch(error -> error.getField().equals("country")))
            .isTrue();
    }
    
    @ParameterizedTest
    @ValueSource(strings = {"US", "CA", "GB", "DE", "FR", "JP"})
    void testValidCountryCodes(String countryCode) {
        Program program = createValidProgram().country(countryCode);
        
        ValidationResult<Program> result = validationService.validate(program);
        
        assertThat(result.isValid()).isTrue();
    }
    
    private Program createValidProgram() {
        return new Program()
            .id("program-123")
            .programName("Test Program")
            .retailerName("Test Utility")
            .country("US")
            .programType(ProgramType.DEMAND_RESPONSE);
    }
}
```

#### Integration Testing
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ProgramControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void testCreateValidProgram() throws JsonProcessingException {
        Program program = new Program()
            .id("program-123")
            .programName("Integration Test Program")
            .retailerName("Test Utility")
            .country("US")
            .programType(ProgramType.DEMAND_RESPONSE);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Program> request = new HttpEntity<>(program, headers);
        
        ResponseEntity<Program> response = restTemplate.postForEntity(
            "/api/v1/programs", 
            request, 
            Program.class
        );
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo("program-123");
    }
    
    @Test
    void testCreateInvalidProgram() {
        Program invalidProgram = new Program()
            .id("") // Invalid
            .programName("Test")
            .country("USA"); // Invalid
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Program> request = new HttpEntity<>(invalidProgram, headers);
        
        ResponseEntity<ErrorResponse> response = restTemplate.postForEntity(
            "/api/v1/programs", 
            request, 
            ErrorResponse.class
        );
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getStatus()).isEqualTo(400);
    }
}
```

### 8. Performance Considerations

#### Validation Performance
```java
@Component
public class OptimizedValidationService {
    
    // Cache validator instances
    private final Map<Class<?>, Set<ConstraintDescriptor<?>>> constraintCache = new ConcurrentHashMap<>();
    private final Validator validator;
    
    public OptimizedValidationService() {
        // Configure validator for performance
        Configuration<?> config = Validation.byDefaultProvider().configure();
        ValidatorFactory factory = config.buildValidatorFactory();
        this.validator = factory.getValidator();
    }
    
    // Fast validation for known valid objects (e.g., from database)
    public <T> boolean isLikelyValid(T object) {
        Class<?> clazz = object.getClass();
        Set<ConstraintDescriptor<?>> constraints = constraintCache.computeIfAbsent(clazz, 
            k -> validator.getConstraintsForClass(k).getConstraintDescriptors());
        
        // Quick checks for common constraints
        return constraints.isEmpty() || performQuickValidation(object, constraints);
    }
    
    private boolean performQuickValidation(Object object, Set<ConstraintDescriptor<?>> constraints) {
        // Implement fast path validation for common cases
        // Return false if definitely invalid, true if might be valid
        return true; // Simplified
    }
}
```

#### Memory Optimization
```java
// Use records for immutable data transfer objects (Java 14+)
public record ProgramSummary(
    String id,
    String programName,
    ProgramType programType
) {
    // Compact constructor for validation
    public ProgramSummary {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("ID cannot be null or blank");
        }
        if (programName == null || programName.isBlank()) {
            throw new IllegalArgumentException("Program name cannot be null or blank");
        }
        if (programType == null) {
            throw new IllegalArgumentException("Program type cannot be null");
        }
    }
}

// Builder pattern for complex objects
public class Program {
    // ... fields
    
    public static class Builder {
        private String id;
        private String programName;
        private String retailerName;
        private String country;
        private ProgramType programType;
        
        public Builder id(String id) {
            this.id = id;
            return this;
        }
        
        // ... other setters
        
        public Program build() {
            Program program = new Program();
            program.setId(this.id);
            program.setProgramName(this.programName);
            program.setRetailerName(this.retailerName);
            program.setCountry(this.country);
            program.setProgramType(this.programType);
            
            // Validate during construction
            ValidationService validator = new ValidationService();
            ValidationResult<Program> result = validator.validate(program);
            if (!result.isValid()) {
                throw new IllegalArgumentException("Invalid program: " + result.getErrors());
            }
            
            return program;
        }
    }
}
```

### 9. Best Practices Discovered

#### 1. Package Organization
```
org.openadr.types/
├── generated/          # Generated classes (do not modify)
│   ├── model/         # Schema models
│   ├── api/           # API parameter/response types
│   └── client/        # Generated client code
├── validation/        # Custom validation logic
├── service/           # Business logic services
├── controller/        # REST controllers
└── config/           # Configuration classes
```

#### 2. Configuration Management
```java
@ConfigurationProperties(prefix = "openadr.validation")
@Data
public class ValidationConfig {
    
    private boolean failFast = false;
    private int maxViolations = 100;
    private boolean validateReturnValues = true;
    private boolean validateParameters = true;
    
    @Valid
    private Constraints constraints = new Constraints();
    
    @Data
    public static class Constraints {
        @Min(1) @Max(1000)
        private int maxProgramsPerRequest = 100;
        
        @Min(1) @Max(100)
        private int defaultPageSize = 25;
        
        @NotEmpty
        private Set<String> allowedCountries = Set.of("US", "CA", "GB");
    }
}
```

#### 3. Error Response Standardization
```java
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiErrorResponse {
    
    private final int status;
    private final String error;
    private final String message;
    private final String path;
    private final Instant timestamp;
    private final List<FieldError> fieldErrors;
    
    public ApiErrorResponse(int status, String error, String message, String path) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.timestamp = Instant.now();
        this.fieldErrors = new ArrayList<>();
    }
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class FieldError {
        private final String field;
        private final String message;
        private final Object rejectedValue;
        
        // Constructor, getters...
    }
    
    // Builder methods for fluent API
    public ApiErrorResponse addFieldError(String field, String message, Object rejectedValue) {
        this.fieldErrors.add(new FieldError(field, message, rejectedValue));
        return this;
    }
}
```

#### 4. Logging and Monitoring
```java
@Component
public class ValidationMetrics {
    
    private final MeterRegistry meterRegistry;
    private final Counter validationSuccessCounter;
    private final Counter validationFailureCounter;
    private final Timer validationTimer;
    
    public ValidationMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        this.validationSuccessCounter = Counter.builder("validation.success")
            .description("Number of successful validations")
            .register(meterRegistry);
        this.validationFailureCounter = Counter.builder("validation.failure")
            .description("Number of failed validations")
            .register(meterRegistry);
        this.validationTimer = Timer.builder("validation.duration")
            .description("Validation execution time")
            .register(meterRegistry);
    }
    
    public <T> ValidationResult<T> timedValidation(Supplier<ValidationResult<T>> validation) {
        return Timer.Sample.start(meterRegistry)
            .stop(validationTimer, () -> {
                ValidationResult<T> result = validation.get();
                if (result.isValid()) {
                    validationSuccessCounter.increment();
                } else {
                    validationFailureCounter.increment();
                }
                return result;
            });
    }
}
```

## Tool Comparison Summary

| Tool | Java Version | OpenAPI 3.1 | Code Quality | Enterprise Ready | Recommendation |
|------|-------------|--------------|--------------|------------------|----------------|
| OpenAPI Generator | 8+ ✅ | ✅ | High | ✅ | **Recommended** |
| Swagger Codegen | 8+ ✅ | Partial | Medium | ✅ | Legacy only |
| Custom JavaPoet | Any | Custom | Very High | Depends | High effort |
| Spring Boot Gen | 8+ ✅ | ✅ | Good | ✅ | Spring-specific |

## Conclusion

For Java OpenAPI code generation in 2024:

1. **Use OpenAPI Generator** with Jakarta EE and Bean Validation support
2. **Integrate Jakarta Bean Validation** for comprehensive, annotation-based validation
3. **Leverage Jackson** for robust JSON serialization with validation integration
4. **Implement custom validators** for domain-specific business rules
5. **Use validation groups** for different validation scenarios (create vs. update)
6. **Standardize error responses** with detailed field-level error information
7. **Consider performance** especially for high-throughput validation scenarios
8. **Integrate with Spring Boot** for enterprise-grade REST APIs
9. **Use records and builders** for modern, immutable data structures
10. **Monitor validation metrics** for production observability

This approach provides excellent type safety, comprehensive validation, and enterprise-grade features while leveraging Java's strengths in large-scale, high-performance server applications with robust tooling and ecosystem support.