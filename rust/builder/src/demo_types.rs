use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use validator::{Validate, ValidationError};

/// Demo types for OpenADR 3.1.0 - working without external dependencies
/// These demonstrate the structure and validation patterns that would be generated
/// from the full OpenADR 3 specification.

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct DemoProgram {
    #[validate(length(min = 1, message = "ID is required"))]
    pub id: String,
    
    #[validate(length(min = 1, message = "Program name is required"))]
    pub program_name: String,
    
    #[validate(length(min = 1, message = "Retailer name is required"))]
    pub retailer_name: String,
    
    #[validate(length(equal = 2, message = "Country must be a 2-letter code"))]
    pub country: String,
    
    pub principal_subdivision: Option<String>,
    pub program_type: DemoProgramType,
    pub targets: Vec<DemoTargetType>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum DemoProgramType {
    #[serde(rename = "DEMAND_RESPONSE")]
    DemandResponse,
    #[serde(rename = "PRICING")]
    Pricing,
    #[serde(rename = "EMERGENCY")]
    Emergency,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum DemoTargetType {
    #[serde(rename = "commercial")]
    Commercial,
    #[serde(rename = "residential")]
    Residential,
    #[serde(rename = "industrial")]
    Industrial,
}

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct DemoEvent {
    #[validate(length(min = 1))]
    pub id: String,
    
    #[validate(length(min = 1))]
    pub program_id: String,
    
    #[validate(length(min = 1))]
    pub event_name: String,
    
    pub priority: u8,
    pub targets: Vec<DemoTargetType>,
    pub intervals: Vec<DemoInterval>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct DemoInterval {
    pub id: u32,
    pub payloads: Vec<DemoPayload>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DemoPayload {
    #[serde(rename = "type")]
    pub payload_type: String,
    pub values: HashMap<String, f64>,
}

// API Parameter types

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct DemoSearchAllProgramsParams {
    pub targets: Option<Vec<String>>,
    
    #[validate(range(min = 0))]
    pub skip: Option<u32>,
    
    #[validate(range(min = 1, max = 50, message = "Limit must be between 1 and 50"))]
    pub limit: Option<u32>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Validate)]
pub struct DemoSearchProgramByIdParams {
    #[validate(length(min = 1))]
    pub program_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DemoCreateProgramBody {
    pub program: DemoProgram,
}

// API Response types

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DemoSearchAllProgramsResponse {
    pub programs: Vec<DemoProgram>,
    pub count: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DemoErrorResponse {
    pub status: u16,
    pub title: String,
    pub detail: String,
    pub instance: Option<String>,
    pub additional_properties: HashMap<String, serde_json::Value>,
}

// Validation functionality

pub fn validate_program(program: &DemoProgram) -> Result<(), Vec<ValidationError>> {
    match program.validate() {
        Ok(_) => Ok(()),
        Err(errors) => {
            let mut error_list = Vec::new();
            for (field, field_errors) in errors.field_errors() {
                for error in field_errors {
                    let mut validation_error = ValidationError::new("validation");
                    validation_error.message = error.message.clone();
                    validation_error.add_param(std::borrow::Cow::from("field"), field);
                    error_list.push(validation_error);
                }
            }
            Err(error_list)
        }
    }
}

pub fn validate_search_params(params: &DemoSearchAllProgramsParams) -> Result<(), Vec<ValidationError>> {
    match params.validate() {
        Ok(_) => Ok(()),
        Err(errors) => {
            let mut error_list = Vec::new();
            for (field, field_errors) in errors.field_errors() {
                for error in field_errors {
                    let mut validation_error = ValidationError::new("validation");
                    validation_error.message = error.message.clone();
                    validation_error.add_param(std::borrow::Cow::from("field"), field);
                    error_list.push(validation_error);
                }
            }
            Err(error_list)
        }
    }
}

fn main() {
    println!("🚀 OpenADR 3.1.0 Rust Types Demo");
    println!("=================================");
    
    // Example schema types
    demo_schema_types();
    
    // Example API parameters
    demo_api_parameters();
    
    // Example API responses
    demo_api_responses();
    
    // Example validation
    demo_validation();
    
    // Example type safety
    demo_type_safety();
}

fn demo_schema_types() {
    println!("\n🔧 Core Models Example");
    println!("======================");
    
    let program = DemoProgram {
        id: "program-123".to_string(),
        program_name: "Peak Demand Response".to_string(),
        retailer_name: "Pacific Gas & Electric".to_string(),
        country: "US".to_string(),
        principal_subdivision: Some("CA".to_string()),
        program_type: DemoProgramType::DemandResponse,
        targets: vec![DemoTargetType::Commercial, DemoTargetType::Residential],
    };
    
    println!("✅ Program created: {}", program.program_name);
    println!("   ID: {}", program.id);
    println!("   Type: {:?}", program.program_type);
    println!("   Country: {}", program.country);
    
    // JSON serialization
    match serde_json::to_string_pretty(&program) {
        Ok(json) => println!("✅ JSON serialization successful"),
        Err(e) => println!("❌ JSON serialization failed: {}", e),
    }
}

fn demo_api_parameters() {
    println!("\n🔧 API Parameters Example");
    println!("=========================");
    
    // Query parameters for GET /programs
    let query_params = DemoSearchAllProgramsParams {
        targets: Some(vec!["commercial".to_string(), "residential".to_string()]),
        skip: Some(10),
        limit: Some(25),
    };
    
    println!("✅ Query params: skip={:?}, limit={:?}", query_params.skip, query_params.limit);
    println!("   Targets: {:?}", query_params.targets);
    
    // Path parameters for GET /programs/{programID}
    let path_params = DemoSearchProgramByIdParams {
        program_id: "program-123".to_string(),
    };
    println!("✅ Path params: program_id={}", path_params.program_id);
    
    // Request body for POST /programs
    let create_program = DemoProgram {
        id: "new-program-456".to_string(),
        program_name: "New API Program".to_string(),
        retailer_name: "Example Utility".to_string(),
        country: "US".to_string(),
        principal_subdivision: Some("NY".to_string()),
        program_type: DemoProgramType::DemandResponse,
        targets: vec![DemoTargetType::Commercial],
    };
    
    println!("✅ Request body ready for POST /programs: {}", create_program.program_name);
}

fn demo_api_responses() {
    println!("\n🔧 API Responses Example");
    println!("========================");
    
    // Successful response from GET /programs
    let response = DemoSearchAllProgramsResponse {
        programs: vec![DemoProgram {
            id: "program-123".to_string(),
            program_name: "Example Program".to_string(),
            retailer_name: "Example Utility".to_string(),
            country: "US".to_string(),
            principal_subdivision: Some("CA".to_string()),
            program_type: DemoProgramType::DemandResponse,
            targets: vec![DemoTargetType::Commercial],
        }],
        count: 1,
    };
    
    println!("✅ Response contains {} programs", response.count);
    
    // Error response
    let mut additional_props = HashMap::new();
    additional_props.insert("issue".to_string(), serde_json::Value::String("exceeds maximum".to_string()));
    additional_props.insert("field".to_string(), serde_json::Value::String("limit".to_string()));
    
    let error_response = DemoErrorResponse {
        status: 400,
        title: "Bad Request".to_string(),
        detail: "Invalid query parameters".to_string(),
        instance: None,
        additional_properties: additional_props,
    };
    
    println!("✅ Error response: {} - {}", error_response.title, error_response.detail);
    println!("   Details: {:?}", error_response.additional_properties);
}

fn demo_validation() {
    println!("\n🔧 Validation Examples");
    println!("======================");
    
    // Valid program
    let valid_program = DemoProgram {
        id: "program-123".to_string(),
        program_name: "Valid Program".to_string(),
        retailer_name: "Valid Retailer".to_string(),
        country: "US".to_string(),
        principal_subdivision: Some("CA".to_string()),
        program_type: DemoProgramType::DemandResponse,
        targets: vec![DemoTargetType::Commercial],
    };
    
    match validate_program(&valid_program) {
        Ok(_) => println!("✅ Valid program validation passed"),
        Err(errors) => println!("❌ Unexpected validation errors: {:?}", errors),
    }
    
    // Invalid program
    let invalid_program = DemoProgram {
        id: "".to_string(), // Invalid: empty
        program_name: "Valid Program".to_string(),
        retailer_name: "".to_string(), // Invalid: empty
        country: "USA".to_string(), // Invalid: not 2 letters
        principal_subdivision: Some("CA".to_string()),
        program_type: DemoProgramType::DemandResponse,
        targets: vec![DemoTargetType::Commercial],
    };
    
    match validate_program(&invalid_program) {
        Ok(_) => println!("❌ Invalid program incorrectly passed validation"),
        Err(errors) => {
            println!("✅ Invalid program correctly rejected with {} errors", errors.len());
            for error in errors {
                if let Some(field) = error.params.get("field") {
                    println!("   {}: {:?}", field, error.message.unwrap_or_default());
                }
            }
        }
    }
    
    // Invalid parameters
    let invalid_params = DemoSearchAllProgramsParams {
        targets: Some(vec!["commercial".to_string()]),
        skip: Some(0),
        limit: Some(100), // Invalid: exceeds max of 50
    };
    
    match validate_search_params(&invalid_params) {
        Ok(_) => println!("❌ Invalid params incorrectly passed validation"),
        Err(_) => println!("✅ Invalid parameters correctly rejected"),
    }
}

fn demo_type_safety() {
    println!("\n🔧 Type Safety Example");
    println!("======================");
    
    println!("🎯 Rust's type system provides excellent benefits:");
    println!("   • Compile-time memory safety and type checking");
    println!("   • Zero-cost abstractions with optimal performance");
    println!("   • Exhaustive pattern matching on enums");
    println!("   • Ownership system prevents data races");
    println!("   • Trait system for flexible validation");
    println!("");
    println!("Example with type safety:");
    println!("impl ProgramService {{");
    println!("    pub fn search_programs(&self, params: SearchAllProgramsParams)");
    println!("        -> Result<Vec<Program>, ApiError> {{");
    println!("        // Compiler ensures params has correct type");
    println!("        // Validation ensures params.limit <= 50");
    println!("        // Return type is guaranteed by type system");
    println!("        self.api_client.get_programs(params)");
    println!("    }}");
    println!("");
    println!("    pub fn process_program(&self, program: Program) {{");
    println!("        // Pattern matching is exhaustive - compiler ensures all cases handled");
    println!("        match program.program_type {{");
    println!("            ProgramType::DemandResponse => self.handle_demand_response(program),");
    println!("            ProgramType::Pricing => self.handle_pricing(program),");
    println!("            ProgramType::Emergency => self.handle_emergency(program),");
    println!("        }}");
    println!("    }}");
    println!("}}");
}