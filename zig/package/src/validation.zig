//! OpenADR 3.1.0 Validation Functions
//!
//! This module provides validation functions for all OpenADR 3.1.0 types
//! with detailed error reporting.

const std = @import("std");
const types = @import("types.zig");
const Program = types.Program;
const SearchAllProgramsParams = types.SearchAllProgramsParams;
const Allocator = std.mem.Allocator;
const ArrayList = std.ArrayList;

pub const ValidationError = struct {
    field: []const u8,
    message: []const u8,

    pub fn init(field: []const u8, message: []const u8) ValidationError {
        return ValidationError{
            .field = field,
            .message = message,
        };
    }
};

pub const ValidationResult = struct {
    valid: bool,
    errors: []ValidationError,

    pub fn success() ValidationResult {
        return ValidationResult{
            .valid = true,
            .errors = &[_]ValidationError{},
        };
    }

    pub fn failure(errors: []ValidationError) ValidationResult {
        return ValidationResult{
            .valid = false,
            .errors = errors,
        };
    }

    pub fn deinit(self: *ValidationResult, allocator: Allocator) void {
        allocator.free(self.errors);
    }
};

pub fn validateProgram(allocator: Allocator, program: *const Program) !ValidationResult {
    var errors = ArrayList(ValidationError).init(allocator);
    defer errors.deinit();

    // Validate ID
    if (program.id.len == 0) {
        try errors.append(ValidationError.init("id", "ID is required"));
    }

    // Validate program name
    if (program.program_name.len == 0) {
        try errors.append(ValidationError.init("program_name", "Program name is required"));
    }

    // Validate retailer name
    if (program.retailer_name.len == 0) {
        try errors.append(ValidationError.init("retailer_name", "Retailer name is required"));
    }

    // Validate country code
    if (program.country.len != 2) {
        try errors.append(ValidationError.init("country", "Country must be a 2-letter code"));
    }

    if (errors.items.len == 0) {
        return ValidationResult.success();
    } else {
        const error_slice = try allocator.dupe(ValidationError, errors.items);
        return ValidationResult.failure(error_slice);
    }
}

pub fn validateSearchParams(allocator: Allocator, params: *const SearchAllProgramsParams) !ValidationResult {
    var errors = ArrayList(ValidationError).init(allocator);
    defer errors.deinit();

    // Validate limit
    if (params.limit) |limit| {
        if (limit == 0 or limit > 50) {
            try errors.append(ValidationError.init("limit", "Limit must be between 1 and 50"));
        }
    }

    // Validate skip
    if (params.skip) |skip| {
        if (skip < 0) {
            try errors.append(ValidationError.init("skip", "Skip must be non-negative"));
        }
    }

    if (errors.items.len == 0) {
        return ValidationResult.success();
    } else {
        const error_slice = try allocator.dupe(ValidationError, errors.items);
        return ValidationResult.failure(error_slice);
    }
}

// Tests
test "validateProgram with valid program" {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var program = try Program.init(allocator, "test-123", "Test Program", "Test Utility", "US", .demand_response);
    defer program.deinit(allocator);

    var result = try validateProgram(allocator, &program);
    defer result.deinit(allocator);

    try std.testing.expect(result.valid);
    try std.testing.expect(result.errors.len == 0);
}

test "validateProgram with invalid program" {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var program = try Program.init(allocator, "", "", "", "USA", .demand_response);
    defer program.deinit(allocator);

    var result = try validateProgram(allocator, &program);
    defer result.deinit(allocator);

    try std.testing.expect(!result.valid);
    try std.testing.expect(result.errors.len == 4); // id, program_name, retailer_name, country
}
