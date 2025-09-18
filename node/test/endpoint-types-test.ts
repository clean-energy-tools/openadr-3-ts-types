/**
 * Test to validate OpenADR API endpoint types with JSDoc validation constraints
 */

import type * as OpenADR from '../package/dist/index.js';

// Test Programs endpoint types
const searchProgramsParams: OpenADR.SearchAllProgramsQueryParams = {
  targets: ["group-1", "group-2"],
  skip: 0,    // @minimum 0
  limit: 25   // @minimum 0, @maximum 50
};

const searchProgramsResponse: OpenADR.SearchAllProgramsResponse = [
  {
    id: "program-123",
    createdDateTime: new Date().toISOString(),
    modificationDateTime: new Date().toISOString(),
    objectType: "PROGRAM",
    programName: "Test Program"
  }
];

// Test Events endpoint types  
const searchEventsParams: OpenADR.SearchAllEventsQueryParams = {
  targets: ["ven-1"],
  skip: 10,   // @minimum 0
  limit: 20   // @minimum 0, @maximum 50
};

const eventPathParams: OpenADR.SearchEventsByIDPathParams = {
  eventID: "event-456"
};

// Test VENs endpoint types
const searchVensParams: OpenADR.SearchVensQueryParams = {
  targets: ["group-A"],
  skip: 0,    // @minimum 0
  limit: 50   // @minimum 0, @maximum 50
};

const venPathParams: OpenADR.SearchVenByIDPathParams = {
  venID: "ven-789"
};

// Test Subscription endpoint types
const subscriptionPathParams: OpenADR.SearchSubscriptionByIDPathParams = {
  subscriptionID: "sub-101"
};

// Test error response types
const badRequestError: OpenADR.CreateProgramError = {
  status: 400,
  payload: {
    type: "https://example.com/problem/bad-request",
    title: "Bad Request",
    status: 400,
    detail: "Invalid program data provided"
  }
};

// Test MQTT notifier endpoint types
const mqttTopicsParams: OpenADR.ListAllMqttNotifierTopicsProgramPathParams = {
  programID: "program-xyz"
};

console.log('✅ All OpenADR API endpoint types validated successfully!');
console.log('📝 JSDoc validation constraints available in endpoint types:');
console.log(`   Search programs skip: ${searchProgramsParams.skip} (min: 0)`);
console.log(`   Search programs limit: ${searchProgramsParams.limit} (min: 0, max: 50)`);
console.log(`   Event ID path param: ${eventPathParams.eventID}`);
console.log(`   VEN ID path param: ${venPathParams.venID}`);
console.log(`   Error status: ${badRequestError.status}`);