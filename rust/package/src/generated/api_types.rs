//! Generated API parameter and response types from OpenADR 3.1.0 paths
//! 
//! This would contain all the API endpoint parameter and response types
//! generated from the OpenAPI paths section.

// Re-export demo types as generated types for now
pub use crate::demo_types::{
    DemoSearchAllProgramsParams as SearchAllProgramsParams,
    DemoSearchProgramByIdParams as SearchProgramByIdParams,
    DemoCreateProgramBody as CreateProgramBody,
    DemoSearchAllProgramsResponse as SearchAllProgramsResponse,
    DemoErrorResponse as ErrorResponse,
};