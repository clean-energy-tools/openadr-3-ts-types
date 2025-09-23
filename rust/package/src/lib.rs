//! OpenADR 3.1.0 Rust Types
//! 
//! This crate provides comprehensive type definitions and validation functions
//! for the OpenADR 3.1.0 specification.
//! 
//! # Features
//! 
//! - **Complete Type Coverage**: All schema types from components/schemas
//! - **API Parameter Types**: Generated from path parameters and query parameters  
//! - **API Response Types**: Generated from all endpoint responses
//! - **Validation**: Using `validator` crate with detailed error reporting
//! - **Serialization**: Full serde support for JSON serialization/deserialization
//! - **Type Safety**: Leverage Rust's type system for compile-time guarantees
//! 
//! # Quick Start
//! 
//! ```rust
//! use openadr3_types::*;
//! 
//! // Create a program
//! let program = DemoProgram {
//!     id: "program-123".to_string(),
//!     program_name: "Peak Demand Response".to_string(),
//!     retailer_name: "Pacific Gas & Electric".to_string(),
//!     country: "US".to_string(),
//!     principal_subdivision: Some("CA".to_string()),
//!     program_type: DemoProgramType::DemandResponse,
//!     targets: vec![DemoTargetType::Commercial],
//! };
//! 
//! // Validate the program
//! match validate_program(&program) {
//!     Ok(_) => println!("Program is valid"),
//!     Err(errors) => println!("Validation errors: {:?}", errors),
//! }
//! 
//! // Serialize to JSON
//! let json = serde_json::to_string(&program)?;
//! ```

pub mod generated;

// Re-export all types for convenient access
pub use generated::*;

// For demo purposes, also include demo types directly
pub use crate::demo_types::*;

/// Demo types module - contains working examples without external dependencies
pub mod demo_types {
    include!("../../builder/src/demo_types.rs");
}