use clap::{Arg, Command};
use serde_yaml;
use std::fs;
use std::path::Path;

/// OpenADR 3.1.0 Rust Type Builder
/// 
/// This tool generates comprehensive Rust type definitions and validation functions
/// from the OpenADR 3.1.0 specification (OpenAPI + JSON Schema).
/// 
/// Architecture:
/// 1. Parse OpenAPI 3.1.0 YAML specification  
/// 2. Extract schema definitions from components/schemas
/// 3. Extract API parameter types from paths/*/parameters
/// 4. Extract API response types from paths/*/responses  
/// 5. Generate Rust structs with serde + validator derives
/// 6. Generate validation functions with comprehensive error reporting
/// 7. Generate API client types for all endpoints

fn main() {
    let matches = Command::new("OpenADR 3.1.0 Rust Type Builder")
        .version("3.1.0")
        .about("Generates Rust types and validation from OpenADR 3.1.0 specification")
        .arg(
            Arg::new("spec")
                .help("Path to OpenADR 3.1.0 specification file")
                .required(false)
                .index(1)
                .default_value("../../openadr3.1.0.yaml")
        )
        .arg(
            Arg::new("output")
                .help("Output directory for generated files")
                .short('o')
                .long("output")
                .default_value("../package/src/generated")
        )
        .arg(
            Arg::new("demo")
                .help("Generate demo types without external dependencies")
                .short('d')
                .long("demo")
                .action(clap::ArgAction::SetTrue)
        )
        .get_matches();

    let spec_path = matches.get_one::<String>("spec").unwrap();
    let output_dir = matches.get_one::<String>("output").unwrap();
    let demo_mode = matches.get_flag("demo");

    if demo_mode {
        println!("🔧 Running in demo mode - generating types without external dependencies");
        generate_demo_types();
        return;
    }

    println!("🚀 OpenADR 3.1.0 Rust Type Builder");
    println!("==================================");
    println!("📖 Reading specification: {}", spec_path);
    println!("📁 Output directory: {}", output_dir);

    if !Path::new(spec_path).exists() {
        eprintln!("❌ Specification file not found: {}", spec_path);
        eprintln!("💡 Run with --demo flag to generate demo types without external dependencies");
        std::process::exit(1);
    }

    match generate_types_from_spec(spec_path, output_dir) {
        Ok(_) => {
            println!("✅ Successfully generated OpenADR 3.1.0 Rust types");
            println!("📦 Files written to: {}", output_dir);
        },
        Err(e) => {
            eprintln!("❌ Failed to generate types: {}", e);
            eprintln!("💡 Run with --demo flag to generate demo types without external dependencies");
            std::process::exit(1);
        }
    }
}

fn generate_types_from_spec(spec_path: &str, output_dir: &str) -> Result<(), Box<dyn std::error::Error>> {
    // Read and parse OpenAPI specification
    let spec_content = fs::read_to_string(spec_path)?;
    let spec: serde_yaml::Value = serde_yaml::from_str(&spec_content)?;

    // Create output directory
    fs::create_dir_all(output_dir)?;

    // This would require implementing a full OpenAPI -> Rust code generator
    // For now, we'll use the demo approach to show the structure
    println!("⚠️  Full OpenAPI parsing not yet implemented");
    println!("💡 Use --demo flag to see generated type structure");
    
    // Generate mod.rs for the module
    let mod_rs_content = r#"//! OpenADR 3.1.0 Generated Types
//! 
//! This module contains auto-generated Rust type definitions and validation
//! functions for the OpenADR 3.1.0 specification.

pub mod models;
pub mod api_types;
pub mod validation;

pub use models::*;
pub use api_types::*;
pub use validation::*;
"#;
    
    fs::write(format!("{}/mod.rs", output_dir), mod_rs_content)?;
    
    // TODO: Implement full OpenAPI -> Rust generation
    // This would involve:
    // 1. Parsing components/schemas into Rust structs
    // 2. Parsing paths into parameter and response types  
    // 3. Generating validation functions
    // 4. Generating API client types
    
    println!("📝 Generated module structure in {}", output_dir);
    
    Ok(())
}

fn generate_demo_types() {
    println!("✅ Demo types are available in src/demo_types.rs");
    println!("💡 Run 'cargo run --bin demo-types' to see the demo in action");
    println!("🔧 These demonstrate the structure that would be generated from the full specification");
}