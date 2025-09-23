package io.github.clean_energy_tools.openadr_3_types;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

/**
 * Test suite for OpenADR 3.1.0 Java types validation
 * 
 * Note: This test imports generated classes. In a real implementation,
 * you would import from the actual generated package:
 * import org.openadr.types.model.*;
 * import org.openadr.types.validation.*;
 * import org.openadr.types.api.*;
 */
class ValidationTest {
    
    // For demo purposes, we'll test validation concepts
    // In a real implementation, these would be the generated classes
    
    @Test
    void testValidationUtilsConcept() {
        // Test validation utility concepts
        
        // Object ID validation
        assertThat(isValidObjectId("valid-id-123")).isTrue();
        assertThat(isValidObjectId("ValidID123")).isTrue();
        assertThat(isValidObjectId("123_valid")).isTrue();
        assertThat(isValidObjectId("")).isFalse();
        assertThat(isValidObjectId("-invalid")).isFalse();
        assertThat(isValidObjectId("invalid space")).isFalse();
        assertThat(isValidObjectId("invalid@symbol")).isFalse();
    }
    
    @ParameterizedTest
    @ValueSource(strings = {"", "PT1H", "P1D", "PT30M", "P1DT2H"})
    void testValidDurations(String duration) {
        assertThat(isValidDuration(duration)).isTrue();
    }
    
    @ParameterizedTest  
    @ValueSource(strings = {"invalid", "P", "1H"})
    void testInvalidDurations(String duration) {
        assertThat(isValidDuration(duration)).isFalse();
    }
    
    @Test
    void testProgramValidationConcept() {
        // Test program validation concept
        
        // Valid program
        var validProgram = createValidProgram();
        var result = validateProgram(validProgram);
        assertThat(result.isValid()).isTrue();
        assertThat(result.getData()).isNotNull();
        assertThat(result.getErrors()).isEmpty();
        
        // Invalid program - missing required fields
        var invalidProgram = createInvalidProgram();
        result = validateProgram(invalidProgram);
        assertThat(result.isValid()).isFalse();
        assertThat(result.getErrors()).isNotEmpty();
        assertThat(result.getErrors()).anyMatch(error -> 
            error.getField().equals("id") && error.getMessage().contains("required"));
    }
    
    @Test
    void testApiParameterValidationConcept() {
        // Test API parameter validation concept
        
        // Valid search parameters
        var validParams = Map.of(
            "skip", 10,
            "limit", 25,
            "targets", List.of("commercial", "residential")
        );
        
        var result = validateApiParams("searchAllPrograms", "query", validParams);
        assertThat(result.isValid()).isTrue();
        
        // Invalid parameters
        var invalidParams = Map.of(
            "skip", -1,  // Invalid negative value
            "limit", 100 // Exceeds maximum of 50
        );
        
        result = validateApiParams("searchAllPrograms", "query", invalidParams);
        assertThat(result.isValid()).isFalse();
        assertThat(result.getErrors()).hasSizeGreaterThan(0);
    }
    
    @Test
    void testJsonSerializationConcept() {
        // Test JSON serialization concept
        var program = createValidProgram();
        
        // In a real implementation, this would use Jackson:
        // ObjectMapper mapper = new ObjectMapper();
        // String json = mapper.writeValueAsString(program);
        // Program deserialized = mapper.readValue(json, Program.class);
        
        // For demo, we'll just verify the object structure
        assertThat(program.getId()).isNotNull();
        assertThat(program.getProgramName()).isNotNull();
        assertThat(program.getRetailerName()).isNotNull();
        assertThat(program.getCountry()).hasSize(2);
    }
    
    // Demo helper methods - in real implementation these would use generated classes
    
    private boolean isValidObjectId(String objectId) {
        return objectId != null && 
               !objectId.isEmpty() && 
               objectId.matches("^[a-zA-Z0-9][a-zA-Z0-9_-]*$");
    }
    
    private boolean isValidDuration(String duration) {
        if (duration == null || duration.isEmpty()) {
            return true; // Allow empty for optional fields
        }
        return duration.matches("^P(?!$)(\\\\d+Y)?(\\\\d+M)?(\\\\d+D)?(T(?=\\\\d)(\\\\d+H)?(\\\\d+M)?(\\\\d+(\\\\.\\\\d+)?S)?)?$");
    }
    
    private DemoProgram createValidProgram() {
        return new DemoProgram(
            "program-123",
            "Test Program", 
            "Test Utility",
            "DEMAND_RESPONSE",
            "US"
        );
    }
    
    private DemoProgram createInvalidProgram() {
        return new DemoProgram(
            null, // Missing required ID
            "Incomplete Program",
            "", // Missing retailer name
            "INVALID_TYPE",
            "USA" // Invalid country code (should be 2 letters)
        );
    }
    
    private ValidationResult validateProgram(DemoProgram program) {
        var errors = new java.util.ArrayList<ValidationError>();
        
        if (program.getId() == null || program.getId().isEmpty()) {
            errors.add(new ValidationError("id", "ID is required"));
        }
        if (program.getProgramName() == null || program.getProgramName().isEmpty()) {
            errors.add(new ValidationError("programName", "Program name is required"));
        }
        if (program.getRetailerName() == null || program.getRetailerName().isEmpty()) {
            errors.add(new ValidationError("retailerName", "Retailer name is required"));
        }
        if (program.getCountry() == null || program.getCountry().length() != 2) {
            errors.add(new ValidationError("country", "Country must be a 2-letter code"));
        }
        
        if (errors.isEmpty()) {
            return new ValidationResult(true, program, List.of());
        } else {
            return new ValidationResult(false, null, errors);
        }
    }
    
    private ValidationResult validateApiParams(String operationId, String paramType, Map<String, Object> params) {
        var errors = new java.util.ArrayList<ValidationError>();
        
        if ("searchAllPrograms".equals(operationId) && "query".equals(paramType)) {
            var skip = (Integer) params.get("skip");
            var limit = (Integer) params.get("limit");
            
            if (skip != null && skip < 0) {
                errors.add(new ValidationError("skip", "Skip must be >= 0"));
            }
            if (limit != null && (limit < 0 || limit > 50)) {
                errors.add(new ValidationError("limit", "Limit must be between 0 and 50"));
            }
        }
        
        if (errors.isEmpty()) {
            return new ValidationResult(true, params, List.of());
        } else {
            return new ValidationResult(false, null, errors);
        }
    }
    
    // Demo classes - in real implementation these would be generated
    
    record DemoProgram(String id, String programName, String retailerName, String programType, String country) {
        public String getId() { return id; }
        public String getProgramName() { return programName; }
        public String getRetailerName() { return retailerName; }
        public String getProgramType() { return programType; }
        public String getCountry() { return country; }
    }
    
    record ValidationResult(boolean valid, Object data, List<ValidationError> errors) {
        public boolean isValid() { return valid; }
        public Object getData() { return data; }
        public List<ValidationError> getErrors() { return errors; }
    }
    
    record ValidationError(String field, String message) {
        public String getField() { return field; }
        public String getMessage() { return message; }
    }
}