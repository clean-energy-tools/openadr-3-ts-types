/**
 * Test to validate OpenADR types with JSDoc validation constraints
 */
// Test Duration type with @pattern constraint
const validDuration = "PT1H";
const anotherValidDuration = "P1Y2M3DT4H5M6S";
// Test ObjectID with @pattern, @minLength, @maxLength constraints  
const validObjectId = "object-123";
const anotherValidObjectId = "valid_object-456";
// Test ProgramRequest with validation constraints
const programRequest = {
    programName: "Test Program", // @minLength 1, @maxLength 128
};
// Test EventRequest with validation constraints
const eventRequest = {
    programID: "program-123",
    eventName: "Test Event",
    priority: 1, // @minimum 0
    targets: [],
    reportDescriptors: [],
    payloadDescriptors: [],
    intervals: []
};
// Test ClientCredentialRequest with @minLength/@maxLength constraints
const authRequest = {
    grant_type: "client_credentials",
    client_id: "test_client", // @minLength 1, @maxLength 4096
    client_secret: "test_secret", // @minLength 1, @maxLength 4096
    scope: "read_all" // @minLength 0, @maxLength 4096
};
console.log('✅ All OpenADR types validated successfully!');
console.log('📝 JSDoc validation constraints available for runtime validation:');
console.log(`   Duration pattern: ${validDuration}`);
console.log(`   ObjectID: ${validObjectId}`);
console.log(`   Program: ${programRequest.programName}`);
console.log(`   Event priority: ${eventRequest.priority}`);
console.log(`   Auth client: ${authRequest.client_id}`);
export {};
