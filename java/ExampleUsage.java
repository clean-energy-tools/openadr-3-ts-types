import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

/**
 * Example usage of OpenADR 3.1.0 Java types
 * 
 * This demonstrates the structure and approach of the generated Java types.
 * In a real implementation, these would be imported from the generated packages:
 * 
 * import org.openadr.types.model.*;
 * import org.openadr.types.validation.*;
 * import org.openadr.types.api.*;
 */
public class ExampleUsage {
    
    public static void main(String[] args) {
        System.out.println("🚀 OpenADR 3.1.0 Java Types Usage Examples");
        System.out.println("==========================================");
        
        exampleCoreModels();
        exampleApiParameters();
        exampleApiResponses();
        exampleValidation();
        exampleTypeSafety();
    }
    
    static void exampleCoreModels() {
        System.out.println("\n🔧 Core Models Example");
        System.out.println("======================");
        
        // Create a program instance using builder pattern
        var program = new DemoProgram.Builder()
            .id("program-123")
            .createdDateTime(OffsetDateTime.now())
            .modificationDateTime(OffsetDateTime.now())
            .programName("Peak Demand Response")
            .programLongName("Commercial Peak Demand Response Program")
            .retailerName("Pacific Gas & Electric")
            .retailerLongName("Pacific Gas & Electric Company")
            .programType(DemoProgramType.DEMAND_RESPONSE)
            .country("US")
            .principalSubdivision("CA")
            .build();
        
        System.out.println("✅ Program created: " + program.programName());
        System.out.println("   ID: " + program.id());
        System.out.println("   Type: " + program.programType());
        System.out.println("   Country: " + program.country());
        
        // JSON serialization would work with Jackson annotations
        System.out.println("✅ JSON serialization ready with Jackson annotations");
    }
    
    static void exampleApiParameters() {
        System.out.println("\n🔧 API Parameters Example");
        System.out.println("=========================");
        
        // Query parameters for GET /programs
        var queryParams = new DemoSearchAllProgramsParams(
            List.of("commercial", "residential"), // targets
            10,  // skip
            25   // limit
        );
        
        System.out.println("✅ Query params: skip=" + queryParams.skip() + ", limit=" + queryParams.limit());
        System.out.println("   Targets: " + queryParams.targets());
        
        // Path parameters for GET /programs/{programID}
        var pathParams = new DemoSearchProgramByProgramIdParams("program-123");
        System.out.println("✅ Path params: program_id=" + pathParams.programId());
        
        // Request body for POST /programs - create a new program for API call
        var createProgram = new DemoProgram.Builder()
            .id("new-program-456")
            .programName("New API Program")
            .programType(DemoProgramType.DEMAND_RESPONSE)
            .country("US")
            .principalSubdivision("NY")
            .build();
        
        System.out.println("✅ Request body ready for POST /programs: " + createProgram.programName());
    }
    
    static void exampleApiResponses() {
        System.out.println("\n🔧 API Responses Example");
        System.out.println("========================");
        
        // Success response - list of programs
        var programs = List.of(
            new DemoProgram.Builder()
                .id("program-1")
                .createdDateTime(OffsetDateTime.now())
                .modificationDateTime(OffsetDateTime.now())
                .programName("Program One")
                .retailerName("Utility Co")
                .programType(DemoProgramType.DEMAND_RESPONSE)
                .country("US")
                .build()
        );
        
        var apiResponse = new DemoApiResponse<>(200, programs);
        System.out.println("✅ Response contains " + programs.size() + " programs");
        
        // Error response
        var errorResponse = new DemoErrorResponse(
            "Bad Request",
            "Invalid query parameters",
            Map.of("field", "limit", "issue", "exceeds maximum")
        );
        
        System.out.println("✅ Error response: " + errorResponse.error() + " - " + errorResponse.message());
        System.out.println("   Details: " + errorResponse.details());
    }
    
    static void exampleValidation() {
        System.out.println("\n🔧 Validation Examples");
        System.out.println("======================");
        
        // Valid program validation
        var validProgram = new DemoProgram.Builder()
            .id("program-456")
            .createdDateTime(OffsetDateTime.now())
            .modificationDateTime(OffsetDateTime.now())
            .programName("Valid Program")
            .retailerName("Test Utility")
            .programType(DemoProgramType.DEMAND_RESPONSE)
            .country("CA")
            .build();
        
        var result = validateProgram(validProgram);
        if (result.isValid()) {
            System.out.println("✅ Valid program validation passed");
        } else {
            System.out.println("❌ Valid program validation failed");
            result.errors().forEach(error -> 
                System.out.println("   " + error.field() + ": " + error.message()));
        }
        
        // Invalid program validation
        var invalidProgram = new DemoProgram.Builder()
            .programName("Incomplete Program")
            // Missing required fields like ID, retailerName, country, etc.
            .build();
        
        result = validateProgram(invalidProgram);
        if (!result.isValid()) {
            System.out.println("✅ Invalid program correctly rejected with " + result.errors().size() + " errors");
            result.errors().forEach(error -> 
                System.out.println("   " + error.field() + ": " + error.message()));
        }
        
        // API parameter validation
        var invalidParams = new DemoSearchAllProgramsParams(
            List.of("commercial"),
            -1,  // Invalid negative value
            100  // Exceeds maximum of 50
        );
        
        var paramResult = validateApiParams("searchAllPrograms", "query", invalidParams);
        if (!paramResult.isValid()) {
            System.out.println("✅ Invalid parameters correctly rejected");
        }
    }
    
    static void exampleTypeSafety() {
        System.out.println("\n🔧 Type Safety Example");
        System.out.println("======================");
        
        System.out.println("🎯 Java's type system provides excellent benefits:");
        System.out.println("   • Compile-time type checking");
        System.out.println("   • IDE auto-completion and refactoring");
        System.out.println("   • Runtime safety with Bean Validation");
        System.out.println("   • Immutable records where appropriate");
        System.out.println("   • Builder patterns for complex objects");
        System.out.println();
        System.out.println("Example with type safety:");
        System.out.println("""
            public List<Program> searchPrograms(SearchAllProgramsParams params) {
                // Compiler ensures params has correct type
                // Bean Validation ensures params.getLimit() <= 50
                // Return type is guaranteed to be List<Program>
                return apiClient.getPrograms(params);
            }
            
            public void processProgram(Program program) {
                // Type-safe access to all program fields
                if (program.getProgramType() == ProgramType.DEMAND_RESPONSE) {
                    handleDemandResponse(program);
                }
            }""");
    }
    
    // Demo classes - in real implementation these would be generated with full annotations
    
    enum DemoProgramType {
        PRICING_TARIFF, DEMAND_RESPONSE, EMERGENCY
    }
    
    record DemoProgram(
        String id,
        OffsetDateTime createdDateTime,
        OffsetDateTime modificationDateTime,
        String programName,
        String programLongName,
        String retailerName, 
        String retailerLongName,
        DemoProgramType programType,
        String country,
        String principalSubdivision
    ) {
        static class Builder {
            private String id;
            private OffsetDateTime createdDateTime;
            private OffsetDateTime modificationDateTime;
            private String programName;
            private String programLongName;
            private String retailerName;
            private String retailerLongName;
            private DemoProgramType programType;
            private String country;
            private String principalSubdivision;
            
            public Builder id(String id) { this.id = id; return this; }
            public Builder createdDateTime(OffsetDateTime dt) { this.createdDateTime = dt; return this; }
            public Builder modificationDateTime(OffsetDateTime dt) { this.modificationDateTime = dt; return this; }
            public Builder programName(String name) { this.programName = name; return this; }
            public Builder programLongName(String name) { this.programLongName = name; return this; }
            public Builder retailerName(String name) { this.retailerName = name; return this; }
            public Builder retailerLongName(String name) { this.retailerLongName = name; return this; }
            public Builder programType(DemoProgramType type) { this.programType = type; return this; }
            public Builder country(String country) { this.country = country; return this; }
            public Builder principalSubdivision(String subdivision) { this.principalSubdivision = subdivision; return this; }
            
            public DemoProgram build() {
                return new DemoProgram(id, createdDateTime, modificationDateTime, 
                    programName, programLongName, retailerName, retailerLongName,
                    programType, country, principalSubdivision);
            }
        }
    }
    
    record DemoSearchAllProgramsParams(List<String> targets, Integer skip, Integer limit) {}
    
    record DemoSearchProgramByProgramIdParams(String programId) {}
    
    record DemoApiResponse<T>(int statusCode, T data) {}
    
    record DemoErrorResponse(String error, String message, Map<String, Object> details) {}
    
    record ValidationResult<T>(boolean valid, T data, List<ValidationError> errors) {
        boolean isValid() { return valid; }
    }
    
    record ValidationError(String field, String message) {}
    
    // Demo validation functions
    static ValidationResult<DemoProgram> validateProgram(DemoProgram program) {
        var errors = new java.util.ArrayList<ValidationError>();
        
        if (program.id() == null || program.id().isEmpty()) {
            errors.add(new ValidationError("id", "ID is required"));
        }
        if (program.programName() == null || program.programName().isEmpty()) {
            errors.add(new ValidationError("programName", "Program name is required"));
        }
        if (program.retailerName() == null || program.retailerName().isEmpty()) {
            errors.add(new ValidationError("retailerName", "Retailer name is required"));
        }
        if (program.country() == null || program.country().length() != 2) {
            errors.add(new ValidationError("country", "Country must be a 2-letter code"));
        }
        
        if (errors.isEmpty()) {
            return new ValidationResult<>(true, program, List.of());
        } else {
            return new ValidationResult<>(false, null, errors);
        }
    }
    
    static ValidationResult<?> validateApiParams(String operationId, String paramType, Object params) {
        var errors = new java.util.ArrayList<ValidationError>();
        
        if ("searchAllPrograms".equals(operationId) && "query".equals(paramType) && 
            params instanceof DemoSearchAllProgramsParams searchParams) {
            
            if (searchParams.skip() != null && searchParams.skip() < 0) {
                errors.add(new ValidationError("skip", "Skip must be >= 0"));
            }
            if (searchParams.limit() != null && (searchParams.limit() < 0 || searchParams.limit() > 50)) {
                errors.add(new ValidationError("limit", "Limit must be between 0 and 50"));
            }
        }
        
        if (errors.isEmpty()) {
            return new ValidationResult<>(true, params, List.of());
        } else {
            return new ValidationResult<>(false, null, errors);
        }
    }
}