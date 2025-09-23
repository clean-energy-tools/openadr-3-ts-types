/// OpenADR 3.1.0 Zig Types Demo - Minimal Version
const std = @import("std");

const ProgramType = enum {
    demand_response,
    pricing,
    emergency,
};

const Program = struct {
    id: []const u8,
    program_name: []const u8,
    retailer_name: []const u8,
    country: []const u8,
    program_type: ProgramType,
};

pub fn main() void {
    std.debug.print("🚀 OpenADR 3.1.0 Zig Types Demo\n", .{});
    std.debug.print("===============================\n", .{});

    // Create a program
    const program = Program{
        .id = "program-123",
        .program_name = "Peak Demand Response",
        .retailer_name = "Pacific Gas & Electric",
        .country = "US",
        .program_type = .demand_response,
    };

    std.debug.print("\n🔧 Core Models Example\n", .{});
    std.debug.print("======================\n", .{});
    std.debug.print("✅ Program created: {s}\n", .{program.program_name});
    std.debug.print("   ID: {s}\n", .{program.id});
    std.debug.print("   Country: {s}\n", .{program.country});

    // Simple validation
    const is_valid = program.id.len > 0 and
        program.program_name.len > 0 and
        program.retailer_name.len > 0 and
        program.country.len == 2;

    std.debug.print("\n🔧 Validation Example\n", .{});
    std.debug.print("=====================\n", .{});
    if (is_valid) {
        std.debug.print("✅ Program validation passed\n", .{});
    } else {
        std.debug.print("❌ Program validation failed\n", .{});
    }

    // Invalid program test
    const invalid_program = Program{
        .id = "",
        .program_name = "Test",
        .retailer_name = "",
        .country = "USA",
        .program_type = .demand_response,
    };

    const invalid_check = invalid_program.id.len > 0 and
        invalid_program.program_name.len > 0 and
        invalid_program.retailer_name.len > 0 and
        invalid_program.country.len == 2;

    if (!invalid_check) {
        std.debug.print("✅ Invalid program correctly rejected\n", .{});
    }

    // Demonstrate exhaustive switch
    std.debug.print("\n🔧 Type Safety Example\n", .{});
    std.debug.print("======================\n", .{});

    const message = switch (program.program_type) {
        .demand_response => "Handling demand response program",
        .pricing => "Handling pricing program",
        .emergency => "Handling emergency program",
    };

    std.debug.print("🎯 Zig provides:\n", .{});
    std.debug.print("   • Compile-time memory safety\n", .{});
    std.debug.print("   • Zero-cost abstractions\n", .{});
    std.debug.print("   • Exhaustive switch statements\n", .{});
    std.debug.print("   • Optional types prevent null errors\n", .{});
    std.debug.print("   • Explicit memory management\n", .{});
    std.debug.print("✅ {s}\n", .{message});
}
