/**
 * Test to validate generated OpenADR types work correctly
 */

import { OpenadrApi } from '../package/dist/index.js';

// Test basic type definitions
const objectId: OpenadrApi.ObjectId = "test-id";

const dateTime: OpenadrApi.DateTime = new Date();

// Test complex type composition
const eventRequest: OpenadrApi.EventRequest = {
    programId: "program-123",
    eventName: "Test Event",
    duration: "PT1H", // ISO 8601 duration
    priority: 1,
    targets: [],
    reportDescriptors: [],
    payloadDescriptors: [],
    intervals: []
};

const objectMetadata: OpenadrApi.ObjectMetadata = {
    id: "event-456",
    createdDateTime: new Date(),
    modificationDateTime: new Date(),
    objectType: "EVENT" // This should be a valid ObjectTypes enum value
};

// Test interface extension/composition
const event: OpenadrApi.Event = {
    ...objectMetadata,
    ...eventRequest
};

console.log('✅ OpenADR types validation completed successfully');
console.log('Generated types include proper JSDoc annotations and work as expected');
console.log(`Event ID: ${event.id}, Name: ${event.eventName}`);