/// OpenADR 3.1.0 Zig Types Demo - Simple Implementation
/// This demonstrates the type structure that would be generated from the full specification
const std = @import("std");
const print = std.debug.print;
const Allocator = std.mem.Allocator;
const ArrayList = std.ArrayList;

// Core enum types
const ProgramType = enum {
    demand_response,
    pricing,
    emergency,

    pub fn toString(self: ProgramType) []const u8 {
        return switch (self) {
            .demand_response => "DEMAND_RESPONSE",
            .pricing => "PRICING",
            .emergency => "EMERGENCY",
        };
    }
};

const TargetType = enum {
    commercial,
    residential,
    industrial,

    pub fn toString(self: TargetType) []const u8 {
        return switch (self) {
            .commercial => "commercial",
            .residential => "residential",
            .industrial => "industrial",
        };
    }
};

// Core data structures
const Program = struct {
    id: []const u8,
    program_name: []const u8,
    retailer_name: []const u8,
    country: []const u8,
    principal_subdivision: ?[]const u8,
    program_type: ProgramType,
    targets: []const TargetType,
};

const SearchAllProgramsParams = struct {
    targets: ?[]const []const u8,
    skip: ?u32,
    limit: ?u32,
};

const SearchProgramByIdParams = struct {
    program_id: []const u8,
};

const SearchAllProgramsResponse = struct {
    programs: []const Program,
    count: u32,
};

const ErrorResponse = struct {
    status: u16,
    title: []const u8,
    detail: []const u8,
    instance: ?[]const u8,
};

// Validation functions
const ValidationError = struct {
    field: []const u8,
    message: []const u8,
};

fn validateProgram(allocator: Allocator, program: Program) ![]ValidationError {
    var errors = ArrayList(ValidationError).init(allocator);
    defer errors.deinit();

    if (program.id.len == 0) {
        try errors.append(ValidationError{ .field = "id", .message = "ID is required" });
    }

    if (program.program_name.len == 0) {
        try errors.append(ValidationError{ .field = "program_name", .message = "Program name is required" });
    }

    if (program.retailer_name.len == 0) {
        try errors.append(ValidationError{ .field = "retailer_name", .message = "Retailer name is required" });
    }

    if (program.country.len != 2) {
        try errors.append(ValidationError{ .field = "country", .message = "Country must be a 2-letter code" });
    }

    return allocator.dupe(ValidationError, errors.items);
}

fn validateSearchParams(allocator: Allocator, params: SearchAllProgramsParams) ![]ValidationError {
    var errors = ArrayList(ValidationError).init(allocator);
    defer errors.deinit();

    if (params.limit) |limit| {
        if (limit == 0 or limit > 50) {
            try errors.append(ValidationError{ .field = "limit", .message = "Limit must be between 1 and 50" });
        }
    }

    return allocator.dupe(ValidationError, errors.items);
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    print("🚀 OpenADR 3.1.0 Zig Types Demo\n", .{});
    print("===============================\n", .{});

    // Example schema types
    try demoSchemaTypes(allocator);

    // Example API parameters
    try demoApiParameters(allocator);

    // Example API responses
    try demoApiResponses(allocator);

    // Example validation
    try demoValidation(allocator);

    // Example type safety
    demoTypeSafety();
}

fn demoSchemaTypes(allocator: Allocator) !void {
    print("\n🔧 Core Models Example\n", .{});
    print("======================\n", .{});

    const targets = [_]TargetType{ .commercial, .residential };

    const program = Program{
        .id = "program-123",
        .program_name = "Peak Demand Response",
        .retailer_name = "Pacific Gas & Electric",
        .country = "US",
        .principal_subdivision = "CA",
        .program_type = .demand_response,
        .targets = &targets,
    };

    print("✅ Program created: {s}\n", .{program.program_name});
    print("   ID: {s}\n", .{program.id});
    print("   Type: {s}\n", .{program.program_type.toString()});
    print("   Country: {s}\n", .{program.country});
    print("✅ Zig provides compile-time type safety and zero-cost abstractions\n", .{});

    _ = allocator; // Suppress unused parameter warning
}

fn demoApiParameters(allocator: Allocator) !void {
    print("\n🔧 API Parameters Example\n");
    print("=========================\n");

    // Query parameters for GET /programs
    const target_strings = [_][]const u8{ "commercial", "residential" };
    const query_params = SearchAllProgramsParams{
        .targets = &target_strings,
        .skip = 10,
        .limit = 25,
    };

    print("✅ Query params: skip={?d}, limit={?d}\n", .{ query_params.skip, query_params.limit });
    if (query_params.targets) |targets| {
        print("   Targets: [");
        for (targets, 0..) |target, i| {
            if (i > 0) print(", ");
            print("\"{s}\"", .{target});
        }
        print("]\n", .{});
    }

    // Path parameters for GET /programs/{programID}
    const path_params = SearchProgramByIdParams{
        .program_id = "program-123",
    };
    print("✅ Path params: program_id={s}\n", .{path_params.program_id});

    // Request body for POST /programs
    const create_targets = [_]TargetType{.commercial};
    const create_program = Program{
        .id = "new-program-456",
        .program_name = "New API Program",
        .retailer_name = "Example Utility",
        .country = "US",
        .principal_subdivision = "NY",
        .program_type = .demand_response,
        .targets = &create_targets,
    };

    print("✅ Request body ready for POST /programs: {s}\n", .{create_program.program_name});

    _ = allocator; // Suppress unused parameter warning
}

fn demoApiResponses(allocator: Allocator) !void {
    print("\n🔧 API Responses Example\n");
    print("========================\n");

    // Successful response from GET /programs
    const response_targets = [_]TargetType{.commercial};
    const response_programs = [_]Program{Program{
        .id = "program-123",
        .program_name = "Example Program",
        .retailer_name = "Example Utility",
        .country = "US",
        .principal_subdivision = "CA",
        .program_type = .demand_response,
        .targets = &response_targets,
    }};

    const response = SearchAllProgramsResponse{
        .programs = &response_programs,
        .count = 1,
    };

    print("✅ Response contains {d} programs\n", .{response.count});

    // Error response
    const error_response = ErrorResponse{
        .status = 400,
        .title = "Bad Request",
        .detail = "Invalid query parameters",
        .instance = null,
    };

    print("✅ Error response: {s} - {s}\n", .{ error_response.title, error_response.detail });
    print("   Status: {d}\n", .{error_response.status});

    _ = allocator; // Suppress unused parameter warning
}

fn demoValidation(allocator: Allocator) !void {
    print("\n🔧 Validation Examples\n");
    print("======================\n");

    // Valid program
    const valid_targets = [_]TargetType{.commercial};
    const valid_program = Program{
        .id = "program-123",
        .program_name = "Valid Program",
        .retailer_name = "Valid Retailer",
        .country = "US",
        .principal_subdivision = "CA",
        .program_type = .demand_response,
        .targets = &valid_targets,
    };

    const valid_errors = try validateProgram(allocator, valid_program);
    defer allocator.free(valid_errors);

    if (valid_errors.len == 0) {
        print("✅ Valid program validation passed\n");
    } else {
        print("❌ Unexpected validation errors\n");
    }

    // Invalid program
    const invalid_targets = [_]TargetType{.commercial};
    const invalid_program = Program{
        .id = "", // Invalid: empty
        .program_name = "Valid Program",
        .retailer_name = "", // Invalid: empty
        .country = "USA", // Invalid: not 2 letters
        .principal_subdivision = "CA",
        .program_type = .demand_response,
        .targets = &invalid_targets,
    };

    const invalid_errors = try validateProgram(allocator, invalid_program);
    defer allocator.free(invalid_errors);

    if (invalid_errors.len > 0) {
        print("✅ Invalid program correctly rejected with {d} errors\n", .{invalid_errors.len});
        for (invalid_errors) |err| {
            print("   {s}: {s}\n", .{ err.field, err.message });
        }
    } else {
        print("❌ Invalid program incorrectly passed validation\n");
    }

    // Invalid parameters
    const invalid_params = SearchAllProgramsParams{
        .targets = null,
        .skip = 0,
        .limit = 100, // Invalid: exceeds max of 50
    };

    const param_errors = try validateSearchParams(allocator, invalid_params);
    defer allocator.free(param_errors);

    if (param_errors.len > 0) {
        print("✅ Invalid parameters correctly rejected\n");
    } else {
        print("❌ Invalid params incorrectly passed validation\n");
    }
}

fn demoTypeSafety() void {
    print("\n🔧 Type Safety Example\n");
    print("======================\n");

    print("🎯 Zig's type system provides exceptional benefits:\n");
    print("   • Compile-time memory safety with manual control\n");
    print("   • Zero-cost abstractions with no hidden allocations\n");
    print("   • Comptime evaluation for advanced metaprogramming\n");
    print("   • Exhaustive switch statements catch all cases\n");
    print("   • Optional types prevent null pointer errors\n");
    print("   • Error unions force explicit error handling\n");
    print("\n");
    print("Example with type safety:\n");
    print("const ProgramService = struct {{\n");
    print("    pub fn searchPrograms(self: *ProgramService, allocator: Allocator, \n");
    print("                         params: SearchAllProgramsParams) ![]Program {{\n");
    print("        // Allocator is explicit - no hidden memory management\n");
    print("        // Error union forces handling of potential failures\n");
    print("        // Type system ensures params has correct structure\n");
    print("        return self.api_client.getPrograms(allocator, params);\n");
    print("    }}\n");
    print("\n");
    print("    pub fn processProgram(self: *ProgramService, program: Program) void {{\n");
    print("        // Switch is exhaustive - compile error if cases missing\n");
    print("        switch (program.program_type) {{\n");
    print("            .demand_response => self.handleDemandResponse(program),\n");
    print("            .pricing => self.handlePricing(program),\n");
    print("            .emergency => self.handleEmergency(program),\n");
    print("            // Compiler ensures all enum values are handled\n");
    print("        }}\n");
    print("    }}\n");
    print("}};\n");
}
