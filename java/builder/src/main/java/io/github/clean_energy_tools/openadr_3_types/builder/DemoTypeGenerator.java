package io.github.clean_energy_tools.openadr_3_types.builder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Generates demo Java types without requiring external dependencies
 */
public class DemoTypeGenerator {
    private static final Logger logger = LoggerFactory.getLogger(DemoTypeGenerator.class);
    
    private final BuildOptions options;
    
    public DemoTypeGenerator(BuildOptions options) {
        this.options = options;
    }
    
    public boolean generate() {
        try {
            logger.info("🔧 Generating demo Java types...");
            
            // Ensure output directory exists
            ensureOutputDirectory();
            
            // Generate demo models
            if (!generateDemoModels()) {
                return false;
            }
            
            // Generate demo API types
            if (!generateDemoApiTypes()) {
                return false;
            }
            
            logger.info("✅ Demo types generated successfully");
            return true;
            
        } catch (Exception e) {
            logger.error("❌ Demo type generation failed", e);
            return false;
        }
    }
    
    private void ensureOutputDirectory() throws IOException {
        Path outputPath = Paths.get(options.getOutputDir());
        Files.createDirectories(outputPath);
        
        // Create package structure
        Path modelDir = outputPath.resolve("model");
        Path apiDir = outputPath.resolve("api");
        Files.createDirectories(modelDir);
        Files.createDirectories(apiDir);
    }
    
    private boolean generateDemoModels() {
        try {
            String modelsContent = generateModelsContent();
            Path modelsFile = Paths.get(options.getOutputDir(), "model", "OpenADRModels.java");
            Files.write(modelsFile, modelsContent.getBytes());
            
            logger.info("✅ Generated demo models: {}", modelsFile);
            return true;
            
        } catch (IOException e) {
            logger.error("❌ Failed to generate demo models", e);
            return false;
        }
    }
    
    private boolean generateDemoApiTypes() {
        try {
            String apiContent = generateApiTypesContent();
            Path apiFile = Paths.get(options.getOutputDir(), "api", "OpenADRApiTypes.java");
            Files.write(apiFile, apiContent.getBytes());
            
            logger.info("✅ Generated demo API types: {}", apiFile);
            return true;
            
        } catch (IOException e) {
            logger.error("❌ Failed to generate demo API types", e);
            return false;
        }
    }
    
    private String generateModelsContent() {
        return String.format("""
package %s.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * OpenADR 3.1.0 Core Data Models
 * Auto-generated demo implementation - shows structure of generated types
 */

/**
 * Program type enumeration
 */
public enum ProgramType {
    @JsonProperty("PRICING_TARIFF")
    PRICING_TARIFF,
    
    @JsonProperty("DEMAND_RESPONSE") 
    DEMAND_RESPONSE,
    
    @JsonProperty("EMERGENCY")
    EMERGENCY
}

/**
 * Object type enumeration
 */
public enum ObjectType {
    @JsonProperty("PROGRAM")
    PROGRAM,
    
    @JsonProperty("EVENT")
    EVENT,
    
    @JsonProperty("REPORT")
    REPORT,
    
    @JsonProperty("VEN")
    VEN,
    
    @JsonProperty("RESOURCE")
    RESOURCE,
    
    @JsonProperty("SUBSCRIPTION")
    SUBSCRIPTION
}

/**
 * OpenADR object identifier
 */
public static class ObjectID {
    @JsonProperty("id")
    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9][a-zA-Z0-9_-]*$", message = "Invalid object ID format")
    private String id;
    
    @JsonProperty("objectType")
    private ObjectType objectType;
    
    // Constructors
    public ObjectID() {}
    
    public ObjectID(String id) {
        this.id = id;
    }
    
    public ObjectID(String id, ObjectType objectType) {
        this.id = id;
        this.objectType = objectType;
    }
    
    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public ObjectType getObjectType() { return objectType; }
    public void setObjectType(ObjectType objectType) { this.objectType = objectType; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ObjectID)) return false;
        ObjectID objectID = (ObjectID) o;
        return Objects.equals(id, objectID.id) && objectType == objectID.objectType;
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, objectType);
    }
    
    @Override
    public String toString() {
        return "ObjectID{id='" + id + "', objectType=" + objectType + "}";
    }
}

/**
 * Data point with timestamp and value
 */
public static class Point {
    @JsonProperty("timestamp")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @NotNull
    private OffsetDateTime timestamp;
    
    @JsonProperty("value")
    @NotNull
    private Double value;
    
    public Point() {}
    
    public Point(OffsetDateTime timestamp, Double value) {
        this.timestamp = timestamp;
        this.value = value;
    }
    
    public OffsetDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(OffsetDateTime timestamp) { this.timestamp = timestamp; }
    
    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Point)) return false;
        Point point = (Point) o;
        return Objects.equals(timestamp, point.timestamp) && Objects.equals(value, point.value);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(timestamp, value);
    }
    
    @Override
    public String toString() {
        return "Point{timestamp=" + timestamp + ", value=" + value + "}";
    }
}

/**
 * Time interval with data points
 */
public static class Interval {
    @JsonProperty("id")
    @NotNull
    @Min(0)
    private Integer id;
    
    @JsonProperty("start")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @NotNull
    private OffsetDateTime start;
    
    @JsonProperty("duration")
    @NotNull
    @Pattern(regexp = "^P(?!$)(\\\\d+Y)?(\\\\d+M)?(\\\\d+D)?(T(?=\\\\d)(\\\\d+H)?(\\\\d+M)?(\\\\d+(\\\\.\\\\d+)?S)?)?$", 
             message = "Invalid ISO 8601 duration format")
    private String duration;
    
    @JsonProperty("points")
    private List<Point> points;
    
    public Interval() {}
    
    public Interval(Integer id, OffsetDateTime start, String duration) {
        this.id = id;
        this.start = start;
        this.duration = duration;
    }
    
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public OffsetDateTime getStart() { return start; }
    public void setStart(OffsetDateTime start) { this.start = start; }
    
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    
    public List<Point> getPoints() { return points; }
    public void setPoints(List<Point> points) { this.points = points; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Interval)) return false;
        Interval interval = (Interval) o;
        return Objects.equals(id, interval.id) && 
               Objects.equals(start, interval.start) && 
               Objects.equals(duration, interval.duration);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, start, duration);
    }
    
    @Override
    public String toString() {
        return "Interval{id=" + id + ", start=" + start + ", duration='" + duration + "'}";
    }
}

/**
 * Key-value mapping for flexible data
 */
public static class ValuesMap {
    @JsonProperty("type")
    @NotNull
    private String type;
    
    @JsonProperty("values")
    @NotNull
    private Map<String, Object> values;
    
    public ValuesMap() {}
    
    public ValuesMap(String type, Map<String, Object> values) {
        this.type = type;
        this.values = values;
    }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public Map<String, Object> getValues() { return values; }
    public void setValues(Map<String, Object> values) { this.values = values; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ValuesMap)) return false;
        ValuesMap valuesMap = (ValuesMap) o;
        return Objects.equals(type, valuesMap.type) && Objects.equals(values, valuesMap.values);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(type, values);
    }
    
    @Override
    public String toString() {
        return "ValuesMap{type='" + type + "', values=" + values + "}";
    }
}

/**
 * OpenADR Program definition
 */
public static class Program {
    @JsonProperty("id")
    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9][a-zA-Z0-9_-]*$", message = "Invalid object ID format")
    private String id;
    
    @JsonProperty("createdDateTime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @NotNull
    private OffsetDateTime createdDateTime;
    
    @JsonProperty("modificationDateTime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @NotNull
    private OffsetDateTime modificationDateTime;
    
    @JsonProperty("programName")
    @NotNull
    @Size(max = 128, message = "Program name must not exceed 128 characters")
    private String programName;
    
    @JsonProperty("programLongName")
    @Size(max = 255, message = "Program long name must not exceed 255 characters")
    private String programLongName;
    
    @JsonProperty("retailerName")
    @NotNull
    @Size(max = 128, message = "Retailer name must not exceed 128 characters")
    private String retailerName;
    
    @JsonProperty("retailerLongName")
    @Size(max = 255, message = "Retailer long name must not exceed 255 characters")
    private String retailerLongName;
    
    @JsonProperty("programType")
    @NotNull
    private ProgramType programType;
    
    @JsonProperty("country")
    @NotNull
    @Size(min = 2, max = 2, message = "Country must be a 2-letter code")
    private String country;
    
    @JsonProperty("principalSubdivision")
    @Size(max = 10, message = "Principal subdivision must not exceed 10 characters")
    private String principalSubdivision;
    
    @JsonProperty("timeZoneOffset")
    private String timeZoneOffset;
    
    @JsonProperty("programDescriptions")
    private List<ValuesMap> programDescriptions;
    
    @JsonProperty("bindingEvents")
    private Boolean bindingEvents;
    
    @JsonProperty("localPrice")
    private Boolean localPrice;
    
    // Constructors
    public Program() {}
    
    public Program(String id, String programName, String retailerName, ProgramType programType, String country) {
        this.id = id;
        this.programName = programName;
        this.retailerName = retailerName;
        this.programType = programType;
        this.country = country;
        this.createdDateTime = OffsetDateTime.now();
        this.modificationDateTime = OffsetDateTime.now();
    }
    
    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public OffsetDateTime getCreatedDateTime() { return createdDateTime; }
    public void setCreatedDateTime(OffsetDateTime createdDateTime) { this.createdDateTime = createdDateTime; }
    
    public OffsetDateTime getModificationDateTime() { return modificationDateTime; }
    public void setModificationDateTime(OffsetDateTime modificationDateTime) { this.modificationDateTime = modificationDateTime; }
    
    public String getProgramName() { return programName; }
    public void setProgramName(String programName) { this.programName = programName; }
    
    public String getProgramLongName() { return programLongName; }
    public void setProgramLongName(String programLongName) { this.programLongName = programLongName; }
    
    public String getRetailerName() { return retailerName; }
    public void setRetailerName(String retailerName) { this.retailerName = retailerName; }
    
    public String getRetailerLongName() { return retailerLongName; }
    public void setRetailerLongName(String retailerLongName) { this.retailerLongName = retailerLongName; }
    
    public ProgramType getProgramType() { return programType; }
    public void setProgramType(ProgramType programType) { this.programType = programType; }
    
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    
    public String getPrincipalSubdivision() { return principalSubdivision; }
    public void setPrincipalSubdivision(String principalSubdivision) { this.principalSubdivision = principalSubdivision; }
    
    public String getTimeZoneOffset() { return timeZoneOffset; }
    public void setTimeZoneOffset(String timeZoneOffset) { this.timeZoneOffset = timeZoneOffset; }
    
    public List<ValuesMap> getProgramDescriptions() { return programDescriptions; }
    public void setProgramDescriptions(List<ValuesMap> programDescriptions) { this.programDescriptions = programDescriptions; }
    
    public Boolean getBindingEvents() { return bindingEvents; }
    public void setBindingEvents(Boolean bindingEvents) { this.bindingEvents = bindingEvents; }
    
    public Boolean getLocalPrice() { return localPrice; }
    public void setLocalPrice(Boolean localPrice) { this.localPrice = localPrice; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Program)) return false;
        Program program = (Program) o;
        return Objects.equals(id, program.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
    
    @Override
    public String toString() {
        return "Program{" +
                "id='" + id + "'" +
                ", programName='" + programName + "'" +
                ", programType=" + programType +
                ", country='" + country + "'" +
                "}";
    }
}

// Additional model classes would follow the same pattern...
// Event, Report, Ven, Subscription, etc.
""", options.getModelPackage());
    }
    
    private String generateApiTypesContent() {
        return String.format("""
package %s.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import %s.model.*;

/**
 * OpenADR 3.1.0 API Parameter and Response Types  
 * Auto-generated demo implementation - shows structure of generated types
 */

/**
 * Query parameters for GET /programs
 */
public static class SearchAllProgramsParams {
    @JsonProperty("targets")
    private List<String> targets;
    
    @JsonProperty("skip")
    @Min(0)
    private Integer skip;
    
    @JsonProperty("limit")
    @Min(0)
    @Max(50)
    private Integer limit;
    
    public SearchAllProgramsParams() {}
    
    public List<String> getTargets() { return targets; }
    public void setTargets(List<String> targets) { this.targets = targets; }
    
    public Integer getSkip() { return skip; }
    public void setSkip(Integer skip) { this.skip = skip; }
    
    public Integer getLimit() { return limit; }
    public void setLimit(Integer limit) { this.limit = limit; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SearchAllProgramsParams)) return false;
        SearchAllProgramsParams that = (SearchAllProgramsParams) o;
        return Objects.equals(targets, that.targets) && 
               Objects.equals(skip, that.skip) && 
               Objects.equals(limit, that.limit);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(targets, skip, limit);
    }
    
    @Override
    public String toString() {
        return "SearchAllProgramsParams{" +
                "targets=" + targets +
                ", skip=" + skip +
                ", limit=" + limit +
                "}";
    }
}

/**
 * Path parameters for GET /programs/{programID}
 */
public static class SearchProgramByProgramIdParams {
    @JsonProperty("programId")
    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9][a-zA-Z0-9_-]*$", message = "Invalid object ID format")
    private String programId;
    
    public SearchProgramByProgramIdParams() {}
    
    public SearchProgramByProgramIdParams(String programId) {
        this.programId = programId;
    }
    
    public String getProgramId() { return programId; }
    public void setProgramId(String programId) { this.programId = programId; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SearchProgramByProgramIdParams)) return false;
        SearchProgramByProgramIdParams that = (SearchProgramByProgramIdParams) o;
        return Objects.equals(programId, that.programId);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(programId);
    }
    
    @Override
    public String toString() {
        return "SearchProgramByProgramIdParams{programId='" + programId + "'}";
    }
}

/**
 * Request body for POST /programs
 */
public static class CreateProgramBody extends Program {
    // Inherits all Program fields and methods
}

/**
 * Generic API response wrapper
 */
public static class ApiResponse<T> {
    @JsonProperty("statusCode")
    private int statusCode;
    
    @JsonProperty("headers")
    private Map<String, String> headers;
    
    @JsonProperty("data")
    private T data;
    
    public ApiResponse() {}
    
    public ApiResponse(int statusCode, T data) {
        this.statusCode = statusCode;
        this.data = data;
    }
    
    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }
    
    public Map<String, String> getHeaders() { return headers; }
    public void setHeaders(Map<String, String> headers) { this.headers = headers; }
    
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApiResponse)) return false;
        ApiResponse<?> that = (ApiResponse<?>) o;
        return statusCode == that.statusCode && 
               Objects.equals(headers, that.headers) && 
               Objects.equals(data, that.data);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(statusCode, headers, data);
    }
    
    @Override
    public String toString() {
        return "ApiResponse{" +
                "statusCode=" + statusCode +
                ", data=" + data +
                "}";
    }
}

/**
 * Standard error response
 */
public static class ErrorResponse {
    @JsonProperty("error")
    @NotNull
    private String error;
    
    @JsonProperty("message")
    @NotNull
    private String message;
    
    @JsonProperty("details")
    private Map<String, Object> details;
    
    public ErrorResponse() {}
    
    public ErrorResponse(String error, String message) {
        this.error = error;
        this.message = message;
    }
    
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public Map<String, Object> getDetails() { return details; }
    public void setDetails(Map<String, Object> details) { this.details = details; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ErrorResponse)) return false;
        ErrorResponse that = (ErrorResponse) o;
        return Objects.equals(error, that.error) && 
               Objects.equals(message, that.message) && 
               Objects.equals(details, that.details);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(error, message, details);
    }
    
    @Override
    public String toString() {
        return "ErrorResponse{" +
                "error='" + error + "'" +
                ", message='" + message + "'" +
                "}";
    }
}

/**
 * API operation metadata
 */
public static class ApiOperation {
    private final String method;
    private final String path;
    private final String operationId;
    private final String summary;
    private final int parameters;
    private final boolean hasBody;
    private final List<String> responseCodes;
    
    public ApiOperation(String method, String path, String operationId, String summary, 
                       int parameters, boolean hasBody, List<String> responseCodes) {
        this.method = method;
        this.path = path;
        this.operationId = operationId;
        this.summary = summary;
        this.parameters = parameters;
        this.hasBody = hasBody;
        this.responseCodes = responseCodes;
    }
    
    public String getMethod() { return method; }
    public String getPath() { return path; }
    public String getOperationId() { return operationId; }
    public String getSummary() { return summary; }
    public int getParameters() { return parameters; }
    public boolean isHasBody() { return hasBody; }
    public List<String> getResponseCodes() { return responseCodes; }
    
    @Override
    public String toString() {
        return "ApiOperation{" +
                "method='" + method + "'" +
                ", path='" + path + "'" +
                ", operationId='" + operationId + "'" +
                "}";
    }
}

/**
 * Registry of all API operations
 */
public static final Map<String, ApiOperation> API_OPERATIONS = Map.of(
    "searchAllPrograms", new ApiOperation(
        "GET", "/programs", "searchAllPrograms", "searches all programs",
        3, false, List.of("200", "400", "401", "403", "500")
    ),
    "createProgram", new ApiOperation(
        "POST", "/programs", "createProgram", "create a program", 
        0, true, List.of("201", "400", "401", "403", "409", "500")
    ),
    "searchProgramByProgramId", new ApiOperation(
        "GET", "/programs/{programID}", "searchProgramByProgramId", "searches programs by program ID",
        1, false, List.of("200", "400", "401", "403", "404", "500")
    ),
    "searchAllEvents", new ApiOperation(
        "GET", "/events", "searchAllEvents", "searches all events",
        3, false, List.of("200", "400", "401", "403", "500")
    ),
    "createEvent", new ApiOperation(
        "POST", "/events", "createEvent", "create an event",
        0, true, List.of("201", "400", "401", "403", "409", "500")
    ),
    "searchAllVens", new ApiOperation(
        "GET", "/vens", "searchAllVens", "searches all vens", 
        2, false, List.of("200", "400", "401", "403", "500")
    ),
    "createVen", new ApiOperation(
        "POST", "/vens", "createVen", "create a ven",
        0, true, List.of("201", "400", "401", "403", "409", "500")
    ),
    "searchAllReports", new ApiOperation(
        "GET", "/reports", "searchAllReports", "searches all reports",
        4, false, List.of("200", "400", "401", "403", "500")
    ),
    "createReport", new ApiOperation(
        "POST", "/reports", "createReport", "create a report",
        0, true, List.of("201", "400", "401", "403", "409", "500")
    )
);

/**
 * Total number of API operations
 */
public static final int TOTAL_OPERATIONS = API_OPERATIONS.size();
""", options.getApiPackage(), options.getModelPackage());
    }
}