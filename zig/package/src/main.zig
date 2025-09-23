//! OpenADR 3.1.0 Zig Types
//!
//! This library provides comprehensive type definitions and validation functions
//! for the OpenADR 3.1.0 specification.
//!
//! Features:
//! - Complete type coverage from components/schemas
//! - API parameter and response types from paths section
//! - Compile-time type safety with Zig's type system
//! - JSON serialization/deserialization
//! - Validation functions with detailed error reporting
//! - Zero-cost abstractions with compile-time guarantees

const std = @import("std");
const print = std.debug.print;
const Allocator = std.mem.Allocator;
const ArrayList = std.ArrayList;
const HashMap = std.HashMap;

// Re-export all types for convenient access
pub const types = @import("types.zig");
pub const validation = @import("validation.zig");
pub const json = @import("json.zig");

// Re-export commonly used types
pub const Program = types.Program;
pub const ProgramType = types.ProgramType;
pub const TargetType = types.TargetType;
pub const Event = types.Event;
pub const Interval = types.Interval;
pub const Payload = types.Payload;

// API types
pub const SearchAllProgramsParams = types.SearchAllProgramsParams;
pub const SearchProgramByIdParams = types.SearchProgramByIdParams;
pub const CreateProgramBody = types.CreateProgramBody;
pub const SearchAllProgramsResponse = types.SearchAllProgramsResponse;
pub const ErrorResponse = types.ErrorResponse;

// Validation functions
pub const validateProgram = validation.validateProgram;
pub const validateSearchParams = validation.validateSearchParams;

// JSON functions
pub const programToJson = json.programToJson;
pub const programFromJson = json.programFromJson;

test "import tests" {
    std.testing.refAllDecls(@This());
}
