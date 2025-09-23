//! OpenADR 3.1.0 Type Definitions
//!
//! This module contains all the core data types for OpenADR 3.1.0,
//! including schema types, API parameter types, and response types.

const std = @import("std");
const Allocator = std.mem.Allocator;
const ArrayList = std.ArrayList;
const HashMap = std.HashMap;

// Core schema types from components/schemas

pub const ProgramType = enum {
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

    pub fn fromString(str: []const u8) ?ProgramType {
        if (std.mem.eql(u8, str, "DEMAND_RESPONSE")) return .demand_response;
        if (std.mem.eql(u8, str, "PRICING")) return .pricing;
        if (std.mem.eql(u8, str, "EMERGENCY")) return .emergency;
        return null;
    }
};

pub const TargetType = enum {
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

    pub fn fromString(str: []const u8) ?TargetType {
        if (std.mem.eql(u8, str, "commercial")) return .commercial;
        if (std.mem.eql(u8, str, "residential")) return .residential;
        if (std.mem.eql(u8, str, "industrial")) return .industrial;
        return null;
    }
};

pub const Program = struct {
    id: []const u8,
    program_name: []const u8,
    retailer_name: []const u8,
    country: []const u8,
    principal_subdivision: ?[]const u8,
    program_type: ProgramType,
    targets: []TargetType,

    pub fn init(allocator: Allocator, id: []const u8, program_name: []const u8, retailer_name: []const u8, country: []const u8, program_type: ProgramType) !Program {
        return Program{
            .id = try allocator.dupe(u8, id),
            .program_name = try allocator.dupe(u8, program_name),
            .retailer_name = try allocator.dupe(u8, retailer_name),
            .country = try allocator.dupe(u8, country),
            .principal_subdivision = null,
            .program_type = program_type,
            .targets = &[_]TargetType{},
        };
    }

    pub fn deinit(self: *Program, allocator: Allocator) void {
        allocator.free(self.id);
        allocator.free(self.program_name);
        allocator.free(self.retailer_name);
        allocator.free(self.country);
        if (self.principal_subdivision) |subdivision| {
            allocator.free(subdivision);
        }
        allocator.free(self.targets);
    }

    pub fn setSubdivision(self: *Program, allocator: Allocator, subdivision: []const u8) !void {
        if (self.principal_subdivision) |old| {
            allocator.free(old);
        }
        self.principal_subdivision = try allocator.dupe(u8, subdivision);
    }

    pub fn setTargets(self: *Program, allocator: Allocator, targets: []const TargetType) !void {
        allocator.free(self.targets);
        self.targets = try allocator.dupe(TargetType, targets);
    }
};

pub const Payload = struct {
    payload_type: []const u8,
    values: HashMap([]const u8, f64, std.hash_map.StringContext, std.hash_map.default_max_load_percentage),

    pub fn init(allocator: Allocator, payload_type: []const u8) !Payload {
        return Payload{
            .payload_type = try allocator.dupe(u8, payload_type),
            .values = HashMap([]const u8, f64, std.hash_map.StringContext, std.hash_map.default_max_load_percentage).init(allocator),
        };
    }

    pub fn deinit(self: *Payload, allocator: Allocator) void {
        allocator.free(self.payload_type);
        self.values.deinit();
    }
};

pub const Interval = struct {
    id: u32,
    payloads: []Payload,

    pub fn init(allocator: Allocator, id: u32) !Interval {
        return Interval{
            .id = id,
            .payloads = &[_]Payload{},
        };
    }

    pub fn deinit(self: *Interval, allocator: Allocator) void {
        for (self.payloads) |*payload| {
            payload.deinit(allocator);
        }
        allocator.free(self.payloads);
    }
};

pub const Event = struct {
    id: []const u8,
    program_id: []const u8,
    event_name: []const u8,
    priority: u8,
    targets: []TargetType,
    intervals: []Interval,

    pub fn init(allocator: Allocator, id: []const u8, program_id: []const u8, event_name: []const u8, priority: u8) !Event {
        return Event{
            .id = try allocator.dupe(u8, id),
            .program_id = try allocator.dupe(u8, program_id),
            .event_name = try allocator.dupe(u8, event_name),
            .priority = priority,
            .targets = &[_]TargetType{},
            .intervals = &[_]Interval{},
        };
    }

    pub fn deinit(self: *Event, allocator: Allocator) void {
        allocator.free(self.id);
        allocator.free(self.program_id);
        allocator.free(self.event_name);
        allocator.free(self.targets);

        for (self.intervals) |*interval| {
            interval.deinit(allocator);
        }
        allocator.free(self.intervals);
    }
};

// API parameter types from paths section

pub const SearchAllProgramsParams = struct {
    targets: ?[][]const u8,
    skip: ?u32,
    limit: ?u32,

    pub fn init(allocator: Allocator) SearchAllProgramsParams {
        _ = allocator;
        return SearchAllProgramsParams{
            .targets = null,
            .skip = null,
            .limit = null,
        };
    }

    pub fn deinit(self: *SearchAllProgramsParams, allocator: Allocator) void {
        if (self.targets) |targets| {
            for (targets) |target| {
                allocator.free(target);
            }
            allocator.free(targets);
        }
    }
};

pub const SearchProgramByIdParams = struct {
    program_id: []const u8,

    pub fn init(allocator: Allocator, program_id: []const u8) !SearchProgramByIdParams {
        return SearchProgramByIdParams{
            .program_id = try allocator.dupe(u8, program_id),
        };
    }

    pub fn deinit(self: *SearchProgramByIdParams, allocator: Allocator) void {
        allocator.free(self.program_id);
    }
};

pub const CreateProgramBody = struct {
    program: Program,

    pub fn init(program: Program) CreateProgramBody {
        return CreateProgramBody{
            .program = program,
        };
    }

    pub fn deinit(self: *CreateProgramBody, allocator: Allocator) void {
        self.program.deinit(allocator);
    }
};

// API response types

pub const SearchAllProgramsResponse = struct {
    programs: []Program,
    count: u32,

    pub fn init(allocator: Allocator, programs: []Program) SearchAllProgramsResponse {
        _ = allocator;
        return SearchAllProgramsResponse{
            .programs = programs,
            .count = @intCast(programs.len),
        };
    }

    pub fn deinit(self: *SearchAllProgramsResponse, allocator: Allocator) void {
        for (self.programs) |*program| {
            program.deinit(allocator);
        }
        allocator.free(self.programs);
    }
};

pub const ErrorResponse = struct {
    status: u16,
    title: []const u8,
    detail: []const u8,
    instance: ?[]const u8,
    additional_properties: HashMap([]const u8, []const u8, std.hash_map.StringContext, std.hash_map.default_max_load_percentage),

    pub fn init(allocator: Allocator, status: u16, title: []const u8, detail: []const u8) !ErrorResponse {
        return ErrorResponse{
            .status = status,
            .title = try allocator.dupe(u8, title),
            .detail = try allocator.dupe(u8, detail),
            .instance = null,
            .additional_properties = HashMap([]const u8, []const u8, std.hash_map.StringContext, std.hash_map.default_max_load_percentage).init(allocator),
        };
    }

    pub fn deinit(self: *ErrorResponse, allocator: Allocator) void {
        allocator.free(self.title);
        allocator.free(self.detail);
        if (self.instance) |instance| {
            allocator.free(instance);
        }

        var iterator = self.additional_properties.iterator();
        while (iterator.next()) |entry| {
            allocator.free(entry.key_ptr.*);
            allocator.free(entry.value_ptr.*);
        }
        self.additional_properties.deinit();
    }
};

// Tests
test "ProgramType enum" {
    const program_type = ProgramType.demand_response;
    try std.testing.expect(std.mem.eql(u8, program_type.toString(), "DEMAND_RESPONSE"));
    try std.testing.expect(ProgramType.fromString("DEMAND_RESPONSE") == .demand_response);
}

test "TargetType enum" {
    const target_type = TargetType.commercial;
    try std.testing.expect(std.mem.eql(u8, target_type.toString(), "commercial"));
    try std.testing.expect(TargetType.fromString("commercial") == .commercial);
}

test "Program creation" {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var program = try Program.init(allocator, "test-123", "Test Program", "Test Utility", "US", .demand_response);
    defer program.deinit(allocator);

    try std.testing.expect(std.mem.eql(u8, program.id, "test-123"));
    try std.testing.expect(std.mem.eql(u8, program.program_name, "Test Program"));
    try std.testing.expect(program.program_type == .demand_response);
}
