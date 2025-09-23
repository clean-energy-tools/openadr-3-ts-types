/// Simplified OpenADR 3.1.0 Rust Types Demo - No External Dependencies
/// This demonstrates the type structure that would be generated from the full specification

use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct DemoProgram {
    pub id: String,
    pub program_name: String,
    pub retailer_name: String,
    pub country: String,
    pub principal_subdivision: Option<String>,
    pub program_type: DemoProgramType,
    pub targets: Vec<DemoTargetType>,
}

#[derive(Debug, Clone)]
pub enum DemoProgramType {
    DemandResponse,
    Pricing,
    Emergency,
}

#[derive(Debug, Clone)]
pub enum DemoTargetType {
    Commercial,
    Residential,
    Industrial,
}

#[derive(Debug, Clone)]
pub struct DemoSearchAllProgramsParams {
    pub targets: Option<Vec<String>>,
    pub skip: Option<u32>,
    pub limit: Option<u32>,
}

#[derive(Debug, Clone)]
pub struct DemoSearchProgramByIdParams {
    pub program_id: String,
}

#[derive(Debug, Clone)]
pub struct DemoSearchAllProgramsResponse {
    pub programs: Vec<DemoProgram>,
    pub count: u32,
}

#[derive(Debug, Clone)]
pub struct DemoErrorResponse {
    pub status: u16,
    pub title: String,
    pub detail: String,
    pub instance: Option<String>,
    pub additional_properties: HashMap<String, String>,
}

// Simple validation functions
pub fn validate_program(program: &DemoProgram) -> Result<(), Vec<String>> {
    let mut errors = Vec::new();
    
    if program.id.is_empty() {
        errors.push("ID is required".to_string());
    }
    
    if program.program_name.is_empty() {
        errors.push("Program name is required".to_string());
    }
    
    if program.retailer_name.is_empty() {
        errors.push("Retailer name is required".to_string());
    }
    
    if program.country.len() != 2 {
        errors.push("Country must be a 2-letter code".to_string());
    }
    
    if errors.is_empty() {
        Ok(())
    } else {
        Err(errors)
    }
}

pub fn validate_search_params(params: &DemoSearchAllProgramsParams) -> Result<(), Vec<String>> {
    let mut errors = Vec::new();
    
    if let Some(limit) = params.limit {
        if limit == 0 || limit > 50 {
            errors.push("Limit must be between 1 and 50".to_string());
        }
    }
    
    if errors.is_empty() {
        Ok(())
    } else {
        Err(errors)
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
    println!("✅ Rust structs provide zero-cost abstractions");
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
    additional_props.insert("issue".to_string(), "exceeds maximum".to_string());
    additional_props.insert("field".to_string(), "limit".to_string());
    
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
                println!("   {}", error);
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
    
    println!("🎯 Rust's type system provides unmatched benefits:");
    println!("   • Zero-cost abstractions - no runtime overhead");
    println!("   • Memory safety without garbage collection");
    println!("   • Thread safety through ownership system");
    println!("   • Exhaustive pattern matching catches all cases");
    println!("   • Compile-time guarantees prevent runtime errors");
    println!("   • Trait system enables flexible validation");
    println!("");
    println!("Example with type safety:");
    println!("impl ProgramService {{");
    println!("    pub async fn search_programs(&self, params: SearchAllProgramsParams)");
    println!("        -> Result<Vec<Program>, ApiError> {{");
    println!("        // Ownership system prevents data races");
    println!("        // Type system ensures params is correct type");
    println!("        // Result type forces error handling");
    println!("        self.api_client.get_programs(params).await");
    println!("    }}");
    println!("");
    println!("    pub fn process_program(&self, program: Program) {{");
    println!("        // Pattern matching is exhaustive - compiler error if cases missing");
    println!("        match program.program_type {{");
    println!("            ProgramType::DemandResponse => {{");
    println!("                self.handle_demand_response(program)");
    println!("            }},");
    println!("            ProgramType::Pricing => {{");
    println!("                self.handle_pricing(program)");
    println!("            }},");
    println!("            ProgramType::Emergency => {{");
    println!("                self.handle_emergency(program)");
    println!("            }},");
    println!("            // Compiler ensures all enum variants are handled");
    println!("        }}");
    println!("    }}");
    println!("}}");
}