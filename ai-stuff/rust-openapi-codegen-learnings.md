# Rust OpenAPI Code Generation: Tools and Learnings

## Overview

This document captures key learnings from implementing OpenADR 3.1.0 type definitions and validation functions for Rust, generated from OpenAPI 3.1.0 specifications.

## Tools Evaluated and Used

### Primary Approach: Manual Implementation with Modern Rust Patterns

**Rationale**: Due to the current state of Rust OpenAPI tooling and to demonstrate idiomatic Rust patterns, a manual implementation approach was chosen to showcase best practices.

#### Core Dependencies

```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
chrono = { version = "0.4", features = ["serde"] }
uuid = { version = "1.0", features = ["serde", "v4"] }
url = { version = "2.4", features = ["serde"] }
regex = "1.10"
validator = { version = "0.16", features = ["derive"] }
thiserror = "1.0"
```

### Alternative Tools Evaluated

#### 1. **openapi-generator (Rust)**
- **Pros**: Part of the official OpenAPI Generator project
- **Cons**: Generated code quality issues, not idiomatic Rust, limited validation support
- **Verdict**: Not recommended for production use

#### 2. **paperclip**
- **Pros**: Rust-native, good Actix Web integration
- **Cons**: Limited OpenAPI 3.1 support, development stalled
- **Verdict**: Good for legacy projects but not actively maintained

#### 3. **utoipa**
- **Pros**: Modern, active development, proc-macro based
- **Cons**: Primarily for generating OpenAPI from Rust code (reverse direction)
- **Verdict**: Excellent for documenting existing Rust APIs, not for code generation

#### 4. **progenitor**
- **Pros**: Modern, type-safe client generation
- **Cons**: Client-focused, limited server-side type generation
- **Verdict**: Good for API clients, not comprehensive type generation

#### 5. **typify**
- **Pros**: JSON Schema to Rust type generation
- **Cons**: Limited OpenAPI support, requires manual extraction
- **Verdict**: Useful component but requires additional tooling

## Key Learnings

### 1. Rust Type System Advantages

#### Zero-Cost Abstractions
```rust
// Rust enums with associated data - zero runtime overhead
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", content = "data")]
pub enum ProgramDetails {
    #[serde(rename = "demand_response")]
    DemandResponse(DemandResponseConfig),
    #[serde(rename = "pricing")]
    Pricing(PricingConfig),
    #[serde(rename = "emergency")]
    Emergency(EmergencyConfig),
}

// Pattern matching is exhaustive - compiler enforces all cases
impl ProgramDetails {
    pub fn get_duration(&self) -> Duration {
        match self {
            ProgramDetails::DemandResponse(config) => config.duration,
            ProgramDetails::Pricing(config) => config.billing_period,
            ProgramDetails::Emergency(config) => config.max_duration,
            // Compiler error if any variant is missing
        }
    }
}
```

**Learning**: Rust's enum system provides type-safe unions that map perfectly to OpenAPI's `oneOf`/`anyOf` patterns with compile-time exhaustiveness checking.

#### Ownership and Borrowing Benefits
```rust
#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct Program {
    #[validate(length(min = 1, message = "ID is required"))]
    pub id: String,
    
    #[validate(length(min = 1, message = "Program name is required"))]
    pub program_name: String,
    
    #[validate(length(min = 1, message = "Retailer name is required"))]
    pub retailer_name: String,
    
    #[validate(length(equal = 2, message = "Country must be a 2-letter code"))]
    pub country: String,
    
    pub principal_subdivision: Option<String>,
    pub program_type: ProgramType,
    pub targets: Vec<TargetType>,
}

// Borrowing prevents unnecessary clones
impl Program {
    pub fn validate_business_rules(&self) -> Result<(), ValidationError> {
        // Access fields by reference - no ownership transfer
        if self.targets.is_empty() && matches!(self.program_type, ProgramType::DemandResponse) {
            return Err(ValidationError::new("demand_response_requires_targets"));
        }
        Ok(())
    }
}
```

**Learning**: Rust's ownership system provides memory safety without garbage collection overhead, perfect for high-performance API applications.

### 2. Serde Integration Patterns

#### Advanced Serialization Control
```rust
use serde::{Deserialize, Serialize, Deserializer, Serializer};
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Event {
    pub id: String,
    pub program_id: String,
    
    // Custom date format handling
    #[serde(with = "iso8601")]
    pub start_time: DateTime<Utc>,
    
    #[serde(with = "iso8601")]
    pub end_time: DateTime<Utc>,
    
    // Skip serializing empty vectors
    #[serde(skip_serializing_if = "Vec::is_empty", default)]
    pub intervals: Vec<Interval>,
    
    // Flatten nested objects
    #[serde(flatten)]
    pub metadata: EventMetadata,
}

// Custom serialization module
mod iso8601 {
    use super::*;
    use serde::{de::Error, Deserialize, Deserializer, Serializer};
    
    const FORMAT: &str = "%Y-%m-%dT%H:%M:%S%.3fZ";
    
    pub fn serialize<S>(date: &DateTime<Utc>, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = date.format(FORMAT).to_string();
        serializer.serialize_str(&s)
    }
    
    pub fn deserialize<'de, D>(deserializer: D) -> Result<DateTime<Utc>, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        DateTime::parse_from_rfc3339(&s)
            .map(|dt| dt.with_timezone(&Utc))
            .map_err(D::Error::custom)
    }
}
```

#### Handling Optional and Nullable Fields
```rust
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchAllProgramsParams {
    // Optional query parameter - missing or null becomes None
    pub targets: Option<Vec<String>>,
    
    // Optional with default value
    #[serde(default = "default_skip")]
    pub skip: u32,
    
    // Optional with validation when present
    #[serde(default = "default_limit")]
    #[validate(range(min = 1, max = 50, message = "Limit must be between 1 and 50"))]
    pub limit: u32,
}

fn default_skip() -> u32 { 0 }
fn default_limit() -> u32 { 25 }

// Custom deserializer for complex optional logic
impl<'de> Deserialize<'de> for SearchAllProgramsParams {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        #[derive(Deserialize)]
        struct Helper {
            targets: Option<Vec<String>>,
            skip: Option<u32>,
            limit: Option<u32>,
        }
        
        let helper = Helper::deserialize(deserializer)?;
        
        Ok(SearchAllProgramsParams {
            targets: helper.targets,
            skip: helper.skip.unwrap_or_else(default_skip),
            limit: helper.limit.unwrap_or_else(default_limit),
        })
    }
}
```

### 3. Validation Framework Integration

#### Validator Crate Usage
```rust
use validator::{Validate, ValidationError, ValidationErrors};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct Program {
    #[validate(length(min = 1, message = "ID is required"))]
    pub id: String,
    
    #[validate(length(min = 1, message = "Program name is required"))]
    pub program_name: String,
    
    #[validate(length(min = 1, message = "Retailer name is required"))]
    pub retailer_name: String,
    
    #[validate(length(equal = 2, message = "Country must be a 2-letter code"))]
    #[validate(custom = "validate_country_code")]
    pub country: String,
    
    pub principal_subdivision: Option<String>,
    
    #[validate(custom = "validate_program_type")]
    pub program_type: ProgramType,
    
    #[validate(length(min = 1, message = "At least one target is required"))]
    pub targets: Vec<TargetType>,
}

// Custom validation functions
fn validate_country_code(country: &str) -> Result<(), ValidationError> {
    const VALID_COUNTRIES: &[&str] = &["US", "CA", "GB", "DE", "FR", "JP", "AU"];
    
    if VALID_COUNTRIES.contains(&country) {
        Ok(())
    } else {
        Err(ValidationError::new("invalid_country_code"))
    }
}

fn validate_program_type(program_type: &ProgramType) -> Result<(), ValidationError> {
    // Custom business logic validation
    match program_type {
        ProgramType::Emergency => {
            // Emergency programs might have special validation
            Ok(())
        }
        _ => Ok(())
    }
}
```

#### Advanced Validation Patterns
```rust
use validator::{Validate, ValidationError};

// Cross-field validation using custom validator
#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
#[validate(schema(function = "validate_event_times"))]
pub struct Event {
    pub id: String,
    pub program_id: String,
    pub start_time: DateTime<Utc>,
    pub end_time: DateTime<Utc>,
    
    #[validate(range(min = 1, max = 10))]
    pub priority: u8,
    
    #[validate(length(min = 1))]
    pub targets: Vec<TargetType>,
    
    #[validate]
    pub intervals: Vec<Interval>,
}

fn validate_event_times(event: &Event) -> Result<(), ValidationError> {
    if event.end_time <= event.start_time {
        return Err(ValidationError::new("end_time_must_be_after_start_time"));
    }
    
    let duration = event.end_time - event.start_time;
    if duration > chrono::Duration::hours(24) {
        return Err(ValidationError::new("event_duration_too_long"));
    }
    
    Ok(())
}

// Nested validation
#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct Interval {
    pub id: u32,
    
    #[validate]
    pub payloads: Vec<Payload>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct Payload {
    #[validate(length(min = 1))]
    pub payload_type: String,
    
    #[validate(custom = "validate_payload_values")]
    pub values: HashMap<String, f64>,
}

fn validate_payload_values(values: &HashMap<String, f64>) -> Result<(), ValidationError> {
    if values.is_empty() {
        return Err(ValidationError::new("payload_values_required"));
    }
    
    // Validate specific payload value constraints
    for (key, value) in values {
        if key == "price" && *value < 0.0 {
            return Err(ValidationError::new("price_cannot_be_negative"));
        }
    }
    
    Ok(())
}
```

### 4. Error Handling with thiserror

#### Structured Error Types
```rust
use thiserror::Error;
use validator::ValidationErrors;

#[derive(Error, Debug)]
pub enum OpenADRError {
    #[error("Validation failed")]
    Validation(#[from] ValidationErrors),
    
    #[error("Serialization failed: {0}")]
    Serialization(#[from] serde_json::Error),
    
    #[error("HTTP request failed: {0}")]
    Http(#[from] reqwest::Error),
    
    #[error("Business rule violation: {message}")]
    BusinessRule { message: String },
    
    #[error("Resource not found: {resource_type} with id {id}")]
    NotFound { resource_type: String, id: String },
    
    #[error("Unauthorized access to {resource}")]
    Unauthorized { resource: String },
    
    #[error("Internal server error: {0}")]
    Internal(#[from] Box<dyn std::error::Error + Send + Sync>),
}

// Custom result type for convenience
pub type Result<T> = std::result::Result<T, OpenADRError>;

// Error conversion utilities
impl OpenADRError {
    pub fn business_rule(message: impl Into<String>) -> Self {
        Self::BusinessRule {
            message: message.into(),
        }
    }
    
    pub fn not_found(resource_type: impl Into<String>, id: impl Into<String>) -> Self {
        Self::NotFound {
            resource_type: resource_type.into(),
            id: id.into(),
        }
    }
    
    pub fn unauthorized(resource: impl Into<String>) -> Self {
        Self::Unauthorized {
            resource: resource.into(),
        }
    }
}

// HTTP response conversion
impl From<OpenADRError> for warp::http::StatusCode {
    fn from(error: OpenADRError) -> Self {
        match error {
            OpenADRError::Validation(_) => warp::http::StatusCode::BAD_REQUEST,
            OpenADRError::NotFound { .. } => warp::http::StatusCode::NOT_FOUND,
            OpenADRError::Unauthorized { .. } => warp::http::StatusCode::UNAUTHORIZED,
            OpenADRError::BusinessRule { .. } => warp::http::StatusCode::UNPROCESSABLE_ENTITY,
            _ => warp::http::StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}
```

### 5. Async/Await Integration

#### Async Validation Service
```rust
use tokio;
use std::sync::Arc;

#[derive(Clone)]
pub struct ValidationService {
    // Could include async database connections, external validation services, etc.
    config: Arc<ValidationConfig>,
}

impl ValidationService {
    pub fn new(config: ValidationConfig) -> Self {
        Self {
            config: Arc::new(config),
        }
    }
    
    // Basic synchronous validation
    pub fn validate_program(&self, program: &Program) -> Result<()> {
        program.validate().map_err(OpenADRError::from)?;
        self.validate_business_rules(program)?;
        Ok(())
    }
    
    // Async validation with external checks
    pub async fn validate_program_async(&self, program: &Program) -> Result<()> {
        // First, run synchronous validations
        self.validate_program(program)?;
        
        // Then run async validations (e.g., database checks)
        self.validate_unique_program_id(&program.id).await?;
        self.validate_retailer_exists(&program.retailer_name).await?;
        
        Ok(())
    }
    
    async fn validate_unique_program_id(&self, id: &str) -> Result<()> {
        // Simulated async database check
        tokio::time::sleep(tokio::time::Duration::from_millis(10)).await;
        
        // In real implementation, check database
        if id == "duplicate-id" {
            return Err(OpenADRError::business_rule("Program ID already exists"));
        }
        
        Ok(())
    }
    
    async fn validate_retailer_exists(&self, retailer_name: &str) -> Result<()> {
        // Simulated async external service check
        tokio::time::sleep(tokio::time::Duration::from_millis(5)).await;
        
        if !self.config.valid_retailers.contains(retailer_name) {
            return Err(OpenADRError::business_rule("Unknown retailer"));
        }
        
        Ok(())
    }
    
    fn validate_business_rules(&self, program: &Program) -> Result<()> {
        // Synchronous business logic validation
        if program.targets.is_empty() {
            return Err(OpenADRError::business_rule("Program must have at least one target"));
        }
        
        if matches!(program.program_type, ProgramType::Emergency) && program.targets.len() > 1 {
            return Err(OpenADRError::business_rule(
                "Emergency programs can only target one customer segment"
            ));
        }
        
        Ok(())
    }
}

#[derive(Debug, Clone)]
pub struct ValidationConfig {
    pub valid_retailers: HashSet<String>,
    pub max_program_duration: chrono::Duration,
    pub require_subdivision: bool,
}
```

### 6. Web Framework Integration

#### Warp Framework Example
```rust
use warp::{Filter, Reply, Rejection};
use serde_json;

// Error handling for web responses
#[derive(Debug)]
struct CustomRejection(OpenADRError);
impl warp::reject::Reject for CustomRejection {}

// Program creation endpoint
pub fn create_program(
    validation_service: Arc<ValidationService>,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    warp::path("programs")
        .and(warp::post())
        .and(warp::body::json())
        .and(with_validation_service(validation_service))
        .and_then(create_program_handler)
}

async fn create_program_handler(
    program: Program,
    validation_service: Arc<ValidationService>,
) -> Result<impl Reply, Rejection> {
    // Validate the program
    validation_service
        .validate_program_async(&program)
        .await
        .map_err(|e| warp::reject::custom(CustomRejection(e)))?;
    
    // In real implementation, save to database
    // let saved_program = program_repository.save(program).await?;
    
    Ok(warp::reply::with_status(
        warp::reply::json(&program),
        warp::http::StatusCode::CREATED,
    ))
}

// Query parameters handling
pub fn search_programs(
    validation_service: Arc<ValidationService>,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    warp::path("programs")
        .and(warp::get())
        .and(warp::query::<SearchAllProgramsParams>())
        .and(with_validation_service(validation_service))
        .and_then(search_programs_handler)
}

async fn search_programs_handler(
    params: SearchAllProgramsParams,
    validation_service: Arc<ValidationService>,
) -> Result<impl Reply, Rejection> {
    // Validate query parameters
    params
        .validate()
        .map_err(|e| warp::reject::custom(CustomRejection(OpenADRError::from(e))))?;
    
    // In real implementation, query database
    let programs = vec![]; // placeholder
    
    let response = SearchAllProgramsResponse {
        programs,
        count: 0,
    };
    
    Ok(warp::reply::json(&response))
}

// Utility filter for dependency injection
fn with_validation_service(
    service: Arc<ValidationService>,
) -> impl Filter<Extract = (Arc<ValidationService>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || service.clone())
}

// Error handling
pub async fn handle_rejection(err: Rejection) -> Result<impl Reply, std::convert::Infallible> {
    let code;
    let message;

    if err.is_not_found() {
        code = warp::http::StatusCode::NOT_FOUND;
        message = "NOT_FOUND";
    } else if let Some(CustomRejection(open_adr_error)) = err.find() {
        match open_adr_error {
            OpenADRError::Validation(validation_errors) => {
                code = warp::http::StatusCode::BAD_REQUEST;
                let error_response = ErrorResponse {
                    status: code.as_u16(),
                    title: "Validation Failed".to_string(),
                    detail: format_validation_errors(validation_errors),
                    instance: None,
                    additional_properties: HashMap::new(),
                };
                return Ok(warp::reply::with_status(warp::reply::json(&error_response), code));
            }
            _ => {
                code = warp::http::StatusCode::from(open_adr_error.clone());
                message = &format!("{}", open_adr_error);
            }
        }
    } else {
        code = warp::http::StatusCode::INTERNAL_SERVER_ERROR;
        message = "UNHANDLED_REJECTION";
    }

    let json = warp::reply::json(&ErrorResponse {
        status: code.as_u16(),
        title: code.canonical_reason().unwrap_or("Unknown").to_string(),
        detail: message.to_string(),
        instance: None,
        additional_properties: HashMap::new(),
    });

    Ok(warp::reply::with_status(json, code))
}

fn format_validation_errors(errors: &ValidationErrors) -> String {
    let mut formatted = Vec::new();
    
    for (field, field_errors) in errors.field_errors() {
        for error in field_errors {
            let message = error
                .message
                .as_ref()
                .map(|m| m.to_string())
                .unwrap_or_else(|| format!("Invalid value for field '{}'", field));
            formatted.push(format!("{}: {}", field, message));
        }
    }
    
    formatted.join(", ")
}
```

### 7. Performance Optimization

#### Zero-Copy Deserialization
```rust
use serde::Deserialize;
use std::borrow::Cow;

// Using Cow (Clone on Write) for potential zero-copy deserialization
#[derive(Debug, Deserialize)]
pub struct ProgramRef<'a> {
    #[serde(borrow)]
    pub id: Cow<'a, str>,
    
    #[serde(borrow)]
    pub program_name: Cow<'a, str>,
    
    #[serde(borrow)]
    pub retailer_name: Cow<'a, str>,
    
    #[serde(borrow)]
    pub country: Cow<'a, str>,
    
    pub program_type: ProgramType,
}

// Convert from borrowed to owned when needed
impl<'a> From<ProgramRef<'a>> for Program {
    fn from(program_ref: ProgramRef<'a>) -> Self {
        Program {
            id: program_ref.id.into_owned(),
            program_name: program_ref.program_name.into_owned(),
            retailer_name: program_ref.retailer_name.into_owned(),
            country: program_ref.country.into_owned(),
            principal_subdivision: None,
            program_type: program_ref.program_type,
            targets: Vec::new(),
        }
    }
}
```

#### Validation Caching
```rust
use std::sync::RwLock;
use std::collections::HashMap;
use std::hash::{Hash, Hasher};

// Cache validation results for identical objects
pub struct CachedValidationService {
    validation_cache: RwLock<HashMap<u64, Result<(), ValidationErrors>>>,
    business_cache: RwLock<HashMap<String, bool>>,
    max_cache_size: usize,
}

impl CachedValidationService {
    pub fn new(max_cache_size: usize) -> Self {
        Self {
            validation_cache: RwLock::new(HashMap::new()),
            business_cache: RwLock::new(HashMap::new()),
            max_cache_size,
        }
    }
    
    pub fn validate_program_cached(&self, program: &Program) -> Result<()> {
        let hash = self.hash_program(program);
        
        // Check cache first
        {
            let cache = self.validation_cache.read().unwrap();
            if let Some(result) = cache.get(&hash) {
                return result.clone().map_err(OpenADRError::from);
            }
        }
        
        // Validate and cache result
        let result = program.validate();
        
        // Update cache
        {
            let mut cache = self.validation_cache.write().unwrap();
            if cache.len() >= self.max_cache_size {
                cache.clear(); // Simple eviction strategy
            }
            cache.insert(hash, result.clone());
        }
        
        result.map_err(OpenADRError::from)
    }
    
    fn hash_program(&self, program: &Program) -> u64 {
        use std::collections::hash_map::DefaultHasher;
        
        let mut hasher = DefaultHasher::new();
        program.id.hash(&mut hasher);
        program.program_name.hash(&mut hasher);
        program.retailer_name.hash(&mut hasher);
        program.country.hash(&mut hasher);
        // Hash other relevant fields...
        hasher.finish()
    }
}
```

### 8. Testing Patterns

#### Property-Based Testing with quickcheck
```rust
use quickcheck::{quickcheck, Arbitrary, Gen};
use quickcheck_macros::quickcheck;

// Generate arbitrary valid programs for testing
impl Arbitrary for ProgramType {
    fn arbitrary(g: &mut Gen) -> Self {
        match g.choose(&[0, 1, 2]).unwrap() {
            0 => ProgramType::DemandResponse,
            1 => ProgramType::Pricing,
            _ => ProgramType::Emergency,
        }
    }
}

impl Arbitrary for TargetType {
    fn arbitrary(g: &mut Gen) -> Self {
        match g.choose(&[0, 1, 2]).unwrap() {
            0 => TargetType::Commercial,
            1 => TargetType::Residential,
            _ => TargetType::Industrial,
        }
    }
}

impl Arbitrary for Program {
    fn arbitrary(g: &mut Gen) -> Self {
        // Generate valid programs for property testing
        Program {
            id: format!("program-{}", u32::arbitrary(g)),
            program_name: format!("Program {}", u32::arbitrary(g)),
            retailer_name: format!("Retailer {}", u32::arbitrary(g)),
            country: g.choose(&["US", "CA", "GB", "DE", "FR"]).unwrap().to_string(),
            principal_subdivision: if bool::arbitrary(g) {
                Some(g.choose(&["CA", "NY", "TX", "FL"]).unwrap().to_string())
            } else {
                None
            },
            program_type: ProgramType::arbitrary(g),
            targets: (0..3).map(|_| TargetType::arbitrary(g)).collect(),
        }
    }
}

// Property-based tests
#[quickcheck]
fn prop_valid_programs_serialize_deserialize(program: Program) -> bool {
    // All valid programs should round-trip through JSON
    let json = serde_json::to_string(&program).unwrap();
    let deserialized: Program = serde_json::from_str(&json).unwrap();
    program.id == deserialized.id && program.program_name == deserialized.program_name
}

#[quickcheck]
fn prop_valid_programs_pass_validation(program: Program) -> bool {
    // All generated programs should pass validation
    program.validate().is_ok()
}

// Traditional unit tests
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_program_validation_success() {
        let program = Program {
            id: "program-123".to_string(),
            program_name: "Test Program".to_string(),
            retailer_name: "Test Utility".to_string(),
            country: "US".to_string(),
            principal_subdivision: Some("CA".to_string()),
            program_type: ProgramType::DemandResponse,
            targets: vec![TargetType::Commercial],
        };
        
        assert!(program.validate().is_ok());
    }
    
    #[test]
    fn test_program_validation_failure() {
        let program = Program {
            id: "".to_string(), // Invalid: empty
            program_name: "Test Program".to_string(),
            retailer_name: "".to_string(), // Invalid: empty
            country: "USA".to_string(), // Invalid: 3 characters
            principal_subdivision: None,
            program_type: ProgramType::DemandResponse,
            targets: vec![],
        };
        
        let result = program.validate();
        assert!(result.is_err());
        
        let errors = result.unwrap_err();
        assert!(errors.field_errors().contains_key("id"));
        assert!(errors.field_errors().contains_key("retailer_name"));
        assert!(errors.field_errors().contains_key("country"));
    }
    
    #[tokio::test]
    async fn test_async_validation_service() {
        let config = ValidationConfig {
            valid_retailers: ["Test Utility"].iter().map(|s| s.to_string()).collect(),
            max_program_duration: chrono::Duration::hours(24),
            require_subdivision: false,
        };
        
        let service = ValidationService::new(config);
        
        let program = Program {
            id: "unique-id".to_string(),
            program_name: "Test Program".to_string(),
            retailer_name: "Test Utility".to_string(),
            country: "US".to_string(),
            principal_subdivision: None,
            program_type: ProgramType::DemandResponse,
            targets: vec![TargetType::Commercial],
        };
        
        let result = service.validate_program_async(&program).await;
        assert!(result.is_ok());
    }
}
```

#### Benchmark Testing
```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};

fn benchmark_validation(c: &mut Criterion) {
    let program = Program {
        id: "program-123".to_string(),
        program_name: "Benchmark Program".to_string(),
        retailer_name: "Benchmark Utility".to_string(),
        country: "US".to_string(),
        principal_subdivision: Some("CA".to_string()),
        program_type: ProgramType::DemandResponse,
        targets: vec![TargetType::Commercial, TargetType::Residential],
    };
    
    c.bench_function("validate_program", |b| {
        b.iter(|| {
            black_box(program.validate())
        })
    });
}

fn benchmark_serialization(c: &mut Criterion) {
    let program = Program {
        id: "program-123".to_string(),
        program_name: "Benchmark Program".to_string(),
        retailer_name: "Benchmark Utility".to_string(),
        country: "US".to_string(),
        principal_subdivision: Some("CA".to_string()),
        program_type: ProgramType::DemandResponse,
        targets: vec![TargetType::Commercial, TargetType::Residential],
    };
    
    c.bench_function("serialize_program", |b| {
        b.iter(|| {
            black_box(serde_json::to_string(&program).unwrap())
        })
    });
    
    let json = serde_json::to_string(&program).unwrap();
    c.bench_function("deserialize_program", |b| {
        b.iter(|| {
            black_box(serde_json::from_str::<Program>(&json).unwrap())
        })
    });
}

criterion_group!(benches, benchmark_validation, benchmark_serialization);
criterion_main!(benches);
```

### 9. Code Generation Strategies

#### Macro-Based Code Generation
```rust
use proc_macro::TokenStream;
use quote::quote;
use syn;

// Custom derive macro for OpenADR validation
#[proc_macro_derive(OpenADRValidate, attributes(openadr))]
pub fn derive_openadr_validate(input: TokenStream) -> TokenStream {
    let input = syn::parse(input).unwrap();
    impl_openadr_validate(&input)
}

fn impl_openadr_validate(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        impl OpenADRValidate for #name {
            fn validate_openadr(&self) -> Result<(), OpenADRError> {
                // Generated validation logic based on attributes
                self.validate().map_err(OpenADRError::from)
            }
        }
    };
    gen.into()
}

// Usage
#[derive(Debug, Serialize, Deserialize, Validate, OpenADRValidate)]
pub struct Program {
    #[openadr(required, min_length = 1)]
    pub id: String,
    // ... other fields
}
```

#### Build Script Integration
```rust
// build.rs - executed at compile time
use std::env;
use std::fs;
use std::path::Path;

fn main() {
    let out_dir = env::var_os("OUT_DIR").unwrap();
    let dest_path = Path::new(&out_dir).join("generated_types.rs");
    
    // In a real implementation, this would parse OpenAPI spec
    let generated_code = generate_types_from_openapi("../openadr3.1.0.yaml");
    
    fs::write(&dest_path, generated_code).unwrap();
    
    println!("cargo:rerun-if-changed=../openadr3.1.0.yaml");
}

fn generate_types_from_openapi(spec_path: &str) -> String {
    // This would contain the actual OpenAPI parsing and Rust code generation
    r#"
    // Generated OpenADR types
    #[derive(Debug, Clone, Serialize, Deserialize, Validate)]
    pub struct GeneratedProgram {
        pub id: String,
        pub name: String,
    }
    "#.to_string()
}
```

### 10. Best Practices Summary

#### 1. Type Design Patterns
```rust
// Use newtype pattern for domain-specific validation
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProgramId(String);

impl ProgramId {
    pub fn new(id: String) -> Result<Self, OpenADRError> {
        if id.is_empty() {
            return Err(OpenADRError::business_rule("Program ID cannot be empty"));
        }
        if id.len() > 64 {
            return Err(OpenADRError::business_rule("Program ID too long"));
        }
        Ok(ProgramId(id))
    }
    
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

// Use builder pattern for complex types
impl Program {
    pub fn builder() -> ProgramBuilder {
        ProgramBuilder::default()
    }
}

#[derive(Default)]
pub struct ProgramBuilder {
    id: Option<String>,
    program_name: Option<String>,
    retailer_name: Option<String>,
    country: Option<String>,
    principal_subdivision: Option<String>,
    program_type: Option<ProgramType>,
    targets: Vec<TargetType>,
}

impl ProgramBuilder {
    pub fn id(mut self, id: impl Into<String>) -> Self {
        self.id = Some(id.into());
        self
    }
    
    pub fn program_name(mut self, name: impl Into<String>) -> Self {
        self.program_name = Some(name.into());
        self
    }
    
    // ... other setters
    
    pub fn build(self) -> Result<Program> {
        let program = Program {
            id: self.id.ok_or_else(|| OpenADRError::business_rule("ID is required"))?,
            program_name: self.program_name.ok_or_else(|| OpenADRError::business_rule("Program name is required"))?,
            retailer_name: self.retailer_name.ok_or_else(|| OpenADRError::business_rule("Retailer name is required"))?,
            country: self.country.ok_or_else(|| OpenADRError::business_rule("Country is required"))?,
            principal_subdivision: self.principal_subdivision,
            program_type: self.program_type.ok_or_else(|| OpenADRError::business_rule("Program type is required"))?,
            targets: self.targets,
        };
        
        // Validate during construction
        program.validate().map_err(OpenADRError::from)?;
        
        Ok(program)
    }
}
```

#### 2. Error Handling Strategy
```rust
// Use Result types consistently
pub type Result<T> = std::result::Result<T, OpenADRError>;

// Implement conversions for easy error handling
impl From<serde_json::Error> for OpenADRError {
    fn from(err: serde_json::Error) -> Self {
        OpenADRError::Serialization(err)
    }
}

// Use context for better error messages
use anyhow::Context;

pub fn load_program_from_file(path: &Path) -> Result<Program> {
    let content = std::fs::read_to_string(path)
        .with_context(|| format!("Failed to read program file: {}", path.display()))?;
    
    let program: Program = serde_json::from_str(&content)
        .with_context(|| "Failed to parse program JSON")?;
    
    program.validate()
        .with_context(|| "Program validation failed")?;
    
    Ok(program)
}
```

## Tool Comparison Summary

| Approach | Code Quality | Type Safety | Performance | Ecosystem | Effort | Recommendation |
|----------|-------------|-------------|-------------|-----------|--------|----------------|
| Manual Implementation | Very High ✅ | Very High ✅ | Very High ✅ | Full ✅ | High | **Recommended** |
| openapi-generator | Low | Medium | Medium | Partial | Low | Not recommended |
| paperclip | Medium | High | High | Limited | Medium | Legacy projects |
| utoipa | High | Very High | High | Good | Medium | Reverse direction only |
| typify + custom | High | High | High | Good | High | Component approach |

## Conclusion

For Rust OpenAPI code generation in 2024:

1. **Manual implementation is currently the best approach** due to tooling limitations and to achieve idiomatic Rust
2. **Leverage Rust's type system** for compile-time guarantees and zero-cost abstractions
3. **Use serde extensively** for serialization with custom serializers when needed
4. **Integrate validator crate** for declarative validation with custom validators
5. **Design for async** from the beginning using tokio and async/await
6. **Use thiserror** for structured, ergonomic error handling
7. **Implement comprehensive testing** including property-based testing
8. **Consider performance** from the start - Rust excels at zero-cost abstractions
9. **Use newtype patterns** for domain-specific validation and type safety
10. **Build composable services** that work well with Rust's ownership system

While the current OpenAPI generation tooling for Rust is limited, manually implementing types with modern Rust patterns provides superior type safety, performance, and maintainability. The effort investment pays off through Rust's compile-time guarantees, memory safety, and excellent performance characteristics.

The Rust ecosystem's focus on zero-cost abstractions, fearless concurrency, and memory safety makes it an excellent choice for high-performance OpenADR 3.1.0 implementations, especially in scenarios requiring low latency, high throughput, or systems programming constraints.