/// OpenADR 3.1.0 Zig Types Demo - Simplified
const std = @import("std");

const ProgramType = enum {
    demand_response,
    pricing,
    emergency,
};

const TargetType = enum {
    commercial,
    residential,
    industrial,
};

const Program = struct {
    id: []const u8,
    program_name: []const u8,
    retailer_name: []const u8,
    country: []const u8,
    program_type: ProgramType,
    targets: []const TargetType,
};

const ValidationError = struct {
    field: []const u8,
    message: []const u8,
};

fn validateProgram(allocator: std.mem.Allocator, program: Program) ![]ValidationError {
    var errors = std.ArrayList(ValidationError){ .allocator = allocator, .items = &[_]ValidationError{}, .capacity = 0 };
    defer errors.deinit();

    if (program.id.len == 0) {
        try errors.append(.{ .field = "id", .message = "ID is required" });
    }
    if (program.program_name.len == 0) {
        try errors.append(.{ .field = "program_name", .message = "Program name is required" });
    }
    if (program.retailer_name.len == 0) {
        try errors.append(.{ .field = "retailer_name", .message = "Retailer name is required" });
    }
    if (program.country.len != 2) {
        try errors.append(.{ .field = "country", .message = "Country must be a 2-letter code" });
    }

    return allocator.dupe(ValidationError, errors.items);
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    std.debug.print("🚀 OpenADR 3.1.0 Zig Types Demo\n", .{});
    std.debug.print("===============================\n", .{});

    // Create a valid program
    const targets = [_]TargetType{ .commercial, .residential };
    const program = Program{
        .id = "program-123",
        .program_name = "Peak Demand Response",
        .retailer_name = "Pacific Gas & Electric",
        .country = "US",
        .program_type = .demand_response,
        .targets = &targets,
    };

    std.debug.print("\n🔧 Core Models Example\n", .{});
    std.debug.print("======================\n", .{});
    std.debug.print("✅ Program created: {s}\n", .{program.program_name});
    std.debug.print("   ID: {s}\n", .{program.id});
    std.debug.print("   Country: {s}\n", .{program.country});
    std.debug.print("   Targets: {} items\n", .{program.targets.len});

    // Test validation with valid program
    const valid_errors = try validateProgram(allocator, program);
    defer allocator.free(valid_errors);

    std.debug.print("\n🔧 Validation Examples\n", .{});
    std.debug.print("======================\n", .{});
    if (valid_errors.len == 0) {
        std.debug.print("✅ Valid program validation passed\n", .{});
    }

    // Test validation with invalid program
    const invalid_program = Program{
        .id = "",
        .program_name = "Valid Program",
        .retailer_name = "",
        .country = "USA",
        .program_type = .demand_response,
        .targets = &targets,
    };

    const invalid_errors = try validateProgram(allocator, invalid_program);
    defer allocator.free(invalid_errors);

    if (invalid_errors.len > 0) {
        std.debug.print("✅ Invalid program correctly rejected with {} errors\n", .{invalid_errors.len});
        for (invalid_errors) |err| {
            std.debug.print("   {s}: {s}\n", .{ err.field, err.message });
        }
    }

    std.debug.print("\n🔧 Type Safety Example\n", .{});
    std.debug.print("======================\n", .{});
    std.debug.print("🎯 Zig's type system provides:\n", .{});
    std.debug.print("   • Compile-time memory safety\n", .{});
    std.debug.print("   • Zero-cost abstractions\n", .{});
    std.debug.print("   • Exhaustive switch statements\n", .{});
    std.debug.print("   • Optional types prevent null errors\n", .{});
    std.debug.print("   • Explicit memory management\n", .{});

    // Demonstrate exhaustive switch
    const message = switch (program.program_type) {
        .demand_response => "Handling demand response program",
        .pricing => "Handling pricing program",
        .emergency => "Handling emergency program",
    };
    std.debug.print("✅ {s}\n", .{message});
}
