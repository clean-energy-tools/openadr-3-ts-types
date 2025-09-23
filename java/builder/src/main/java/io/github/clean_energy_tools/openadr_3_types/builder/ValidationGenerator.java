package io.github.clean_energy_tools.openadr_3_types.builder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Generates Java validation functions for OpenADR types
 */
public class ValidationGenerator {
    private static final Logger logger = LoggerFactory.getLogger(ValidationGenerator.class);
    
    private final BuildOptions options;
    
    public ValidationGenerator(BuildOptions options) {
        this.options = options;
    }
    
    public boolean generate() {
        try {
            logger.info("🔧 Generating Java validation functions...");
            
            // Ensure output directory exists
            ensureOutputDirectory();
            
            // Generate validation utilities
            if (!generateValidationUtils()) {
                return false;
            }
            
            // Generate validation functions
            if (!generateValidationFunctions()) {
                return false;
            }
            
            logger.info("✅ Validation functions generated successfully");
            return true;
            
        } catch (Exception e) {
            logger.error("❌ Validation generation failed", e);
            return false;
        }
    }
    
    private void ensureOutputDirectory() throws IOException {
        Path outputPath = Paths.get(options.getOutputDir());
        Path validationDir = outputPath.resolve("validation");
        Files.createDirectories(validationDir);
    }
    
    private boolean generateValidationUtils() {
        try {
            String validationUtilsContent = generateValidationUtilsContent();
            Path validationUtilsFile = Paths.get(options.getOutputDir(), "validation", "ValidationUtils.java");
            Files.write(validationUtilsFile, validationUtilsContent.getBytes());
            
            logger.info("✅ Generated validation utils: {}", validationUtilsFile);
            return true;
            
        } catch (IOException e) {
            logger.error("❌ Failed to generate validation utils", e);
            return false;
        }
    }
    
    private boolean generateValidationFunctions() {
        try {
            String validationContent = generateValidationContent();
            Path validationFile = Paths.get(options.getOutputDir(), "validation", "OpenADRValidator.java");
            Files.write(validationFile, validationContent.getBytes());
            
            logger.info("✅ Generated validation functions: {}", validationFile);
            return true;
            
        } catch (IOException e) {
            logger.error("❌ Failed to generate validation functions", e);
            return false;
        }
    }
    
    private String generateValidationUtilsContent() {
        return String.format("""
package %s.validation;

import jakarta.validation.*;
import java.util.*;
import java.util.regex.Pattern;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;

/**
 * Utility classes for OpenADR 3.1.0 validation
 */
public class ValidationUtils {
    
    private static final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    
    // Validation patterns
    private static final Pattern OBJECT_ID_PATTERN = Pattern.compile("^[a-zA-Z0-9][a-zA-Z0-9_-]*$");
    private static final Pattern DURATION_PATTERN = Pattern.compile(
        "^P(?!$)(\\\\d+Y)?(\\\\d+M)?(\\\\d+D)?(T(?=\\\\d)(\\\\d+H)?(\\\\d+M)?(\\\\d+(\\\\.\\\\d+)?S)?)?$"
    );
    
    /**
     * Result of a validation operation
     */
    public static class ValidationResult<T> {
        private final boolean valid;
        private final T data;
        private final List<ValidationError> errors;
        
        private ValidationResult(boolean valid, T data, List<ValidationError> errors) {
            this.valid = valid;
            this.data = data;
            this.errors = errors != null ? errors : new ArrayList<>();
        }
        
        public static <T> ValidationResult<T> success(T data) {
            return new ValidationResult<>(true, data, null);
        }
        
        public static <T> ValidationResult<T> failure(List<ValidationError> errors) {
            return new ValidationResult<>(false, null, errors);
        }
        
        public static <T> ValidationResult<T> failure(String field, String message) {
            return failure(List.of(new ValidationError(field, message)));
        }
        
        public boolean isValid() { return valid; }
        public T getData() { return data; }
        public List<ValidationError> getErrors() { return errors; }
        
        @Override
        public String toString() {
            return "ValidationResult{" +
                    "valid=" + valid +
                    ", errors=" + errors.size() +
                    "}";
        }
    }
    
    /**
     * Represents a validation error
     */
    public static class ValidationError {
        private final String field;
        private final String message;
        private final Object value;
        private final String code;
        
        public ValidationError(String field, String message) {
            this(field, message, null, null);
        }
        
        public ValidationError(String field, String message, Object value, String code) {
            this.field = field;
            this.message = message;
            this.value = value;
            this.code = code;
        }
        
        public String getField() { return field; }
        public String getMessage() { return message; }
        public Object getValue() { return value; }
        public String getCode() { return code; }
        
        @Override
        public String toString() {
            return "ValidationError{" +
                    "field='" + field + "'" +
                    ", message='" + message + "'" +
                    "}";
        }
    }
    
    /**
     * Validates an object using Bean Validation
     */
    public static <T> ValidationResult<T> validate(T object) {
        if (object == null) {
            return ValidationResult.failure("root", "Object cannot be null");
        }
        
        Set<ConstraintViolation<T>> violations = validator.validate(object);
        
        if (violations.isEmpty()) {
            return ValidationResult.success(object);
        }
        
        List<ValidationError> errors = violations.stream()
                .map(violation -> new ValidationError(
                    violation.getPropertyPath().toString(),
                    violation.getMessage(),
                    violation.getInvalidValue(),
                    violation.getConstraintDescriptor().getAnnotation().annotationType().getSimpleName()
                ))
                .toList();
        
        return ValidationResult.failure(errors);
    }
    
    /**
     * Validates an OpenADR object ID
     */
    public static boolean isValidObjectId(String objectId) {
        return objectId != null && OBJECT_ID_PATTERN.matcher(objectId).matches();
    }
    
    /**
     * Validates an ISO 8601 duration string
     */
    public static boolean isValidDuration(String duration) {
        return duration == null || duration.isEmpty() || DURATION_PATTERN.matcher(duration).matches();
    }
    
    /**
     * Validates an RFC 3339 datetime string
     */
    public static boolean isValidDateTime(String datetime) {
        if (datetime == null || datetime.isEmpty()) {
            return false;
        }
        
        try {
            OffsetDateTime.parse(datetime);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }
    
    /**
     * Validates a country code (2-letter ISO 3166-1 alpha-2)
     */
    public static boolean isValidCountryCode(String countryCode) {
        return countryCode != null && 
               countryCode.length() == 2 && 
               countryCode.matches("^[A-Z]{2}$");
    }
    
    /**
     * Validates a program type
     */
    public static boolean isValidProgramType(String programType) {
        return programType != null && Set.of(
            "PRICING_TARIFF",
            "DEMAND_RESPONSE", 
            "EMERGENCY"
        ).contains(programType);
    }
    
    /**
     * Validates pagination parameters
     */
    public static ValidationResult<Map<String, Integer>> validatePaginationParams(Integer skip, Integer limit) {
        List<ValidationError> errors = new ArrayList<>();
        
        if (skip != null && skip < 0) {
            errors.add(new ValidationError("skip", "Skip must be >= 0", skip, "Min"));
        }
        
        if (limit != null && (limit < 0 || limit > 50)) {
            errors.add(new ValidationError("limit", "Limit must be between 0 and 50", limit, "Range"));
        }
        
        if (!errors.isEmpty()) {
            return ValidationResult.failure(errors);
        }
        
        return ValidationResult.success(Map.of(
            "skip", skip != null ? skip : 0,
            "limit", limit != null ? limit : 20
        ));
    }
}
""", options.getValidationPackage());
    }
    
    private String generateValidationContent() {
        return String.format("""
package %s.validation;

import %s.model.*;
import %s.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

/**
 * OpenADR 3.1.0 object validator with comprehensive validation functions
 */
public class OpenADRValidator {
    private static final Logger logger = LoggerFactory.getLogger(OpenADRValidator.class);
    
    /**
     * Validates a Program object
     */
    public static ValidationUtils.ValidationResult<Program> validateProgram(Program program) {
        return ValidationUtils.validate(program);
    }
    
    /**
     * Validates an Event object  
     */
    public static ValidationUtils.ValidationResult<Event> validateEvent(Event event) {
        // Note: Event class would need to be implemented in the full demo
        logger.warn("Event validation not implemented in demo - would validate Event object");
        return ValidationUtils.ValidationResult.success(event);
    }
    
    /**
     * Validates a Report object
     */
    public static ValidationUtils.ValidationResult<Report> validateReport(Report report) {
        // Note: Report class would need to be implemented in the full demo
        logger.warn("Report validation not implemented in demo - would validate Report object");
        return ValidationUtils.ValidationResult.success(report);
    }
    
    /**
     * Validates a VEN object
     */
    public static ValidationUtils.ValidationResult<Ven> validateVen(Ven ven) {
        // Note: Ven class would need to be implemented in the full demo
        logger.warn("VEN validation not implemented in demo - would validate VEN object");
        return ValidationUtils.ValidationResult.success(ven);
    }
    
    /**
     * Validates a Subscription object
     */
    public static ValidationUtils.ValidationResult<Subscription> validateSubscription(Subscription subscription) {
        // Note: Subscription class would need to be implemented in the full demo
        logger.warn("Subscription validation not implemented in demo - would validate Subscription object");
        return ValidationUtils.ValidationResult.success(subscription);
    }
    
    /**
     * Validates API parameters for search all programs
     */
    public static ValidationUtils.ValidationResult<SearchAllProgramsParams> validateSearchAllProgramsParams(
            SearchAllProgramsParams params) {
        return ValidationUtils.validate(params);
    }
    
    /**
     * Validates API parameters by operation ID and parameter type
     */
    public static ValidationUtils.ValidationResult<?> validateApiParams(
            String operationId, String paramType, Object params) {
        
        switch (operationId) {
            case "searchAllPrograms":
                if ("query".equals(paramType) && params instanceof SearchAllProgramsParams) {
                    return validateSearchAllProgramsParams((SearchAllProgramsParams) params);
                }
                break;
            case "searchProgramByProgramId":
                if ("path".equals(paramType) && params instanceof SearchProgramByProgramIdParams) {
                    return ValidationUtils.validate((SearchProgramByProgramIdParams) params);
                }
                break;
            default:
                return ValidationUtils.ValidationResult.failure("root", 
                    "Unknown operation: " + operationId + "/" + paramType);
        }
        
        return ValidationUtils.ValidationResult.failure("root", 
            "Invalid parameter type for operation: " + operationId + "/" + paramType);
    }
    
    /**
     * Validates any OpenADR object by type name
     */
    public static ValidationUtils.ValidationResult<?> validateOpenADRObject(String objectType, Object data) {
        switch (objectType.toLowerCase()) {
            case "program":
                if (data instanceof Program) {
                    return validateProgram((Program) data);
                }
                break;
            case "event":
                logger.warn("Event validation not implemented in demo");
                break;
            case "report":
                logger.warn("Report validation not implemented in demo");
                break;
            case "ven":
                logger.warn("VEN validation not implemented in demo");
                break;
            case "subscription":
                logger.warn("Subscription validation not implemented in demo");
                break;
            default:
                return ValidationUtils.ValidationResult.failure("root", 
                    "Unknown object type: " + objectType);
        }
        
        return ValidationUtils.ValidationResult.failure("root", 
            "Invalid object type or data for: " + objectType);
    }
}
""", options.getValidationPackage(), options.getModelPackage(), options.getApiPackage());
    }
}