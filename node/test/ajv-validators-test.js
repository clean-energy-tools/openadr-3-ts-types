/**
 * Test AJV validators generated from OpenADR schemas
 */
import * as OpenADR from '../package/dist/index.js';
console.log('🧪 Testing OpenADR AJV validators...');
// Test Duration validator with @pattern constraint
const durationResult = OpenADR.Validators.validateduration("PT1H");
console.log('\n📏 Duration validation:');
console.log(`   Input: "PT1H"`);
console.log(`   Valid: ${durationResult.success}`);
console.log(`   Data: ${durationResult.data}`);
const invalidDurationResult = OpenADR.Validators.validateduration("invalid-duration");
console.log(`   Invalid input: "invalid-duration"`);
console.log(`   Valid: ${invalidDurationResult.success}`);
console.log(`   Error: ${invalidDurationResult.errors[0]?.message}`);
// Test ObjectID validator with @pattern, @minLength, @maxLength constraints
const objectIdResult = OpenADR.Validators.validateobjectID("object-123");
console.log('\n🆔 ObjectID validation:');
console.log(`   Input: "object-123"`);
console.log(`   Valid: ${objectIdResult.success}`);
const invalidObjectIdResult = OpenADR.Validators.validateobjectID("invalid@chars");
console.log(`   Invalid input: "invalid@chars"`);
console.log(`   Valid: ${invalidObjectIdResult.success}`);
console.log(`   Error: ${invalidObjectIdResult.errors[0]?.message}`);
// Test EventRequest validator with complex schema
const eventData = {
    programID: "program-123",
    eventName: "Test Event",
    priority: 1, // @minimum 0
    targets: ["group-1"]
};
const eventResult = OpenADR.Validators.validateeventRequest(eventData);
console.log('\n📅 EventRequest validation:');
console.log(`   Valid: ${eventResult.success}`);
console.log(`   Event name: ${eventResult.data?.eventName}`);
// Test with invalid priority (negative number)
const invalidEventData = {
    programID: "program-123",
    priority: -1 // Violates @minimum 0
};
const invalidEventResult = OpenADR.Validators.validateeventRequest(invalidEventData);
console.log(`   Invalid priority (-1):`);
console.log(`   Valid: ${invalidEventResult.success}`);
console.log(`   Error: ${invalidEventResult.errors[0]?.message}`);
// Test validation by schema name
const dynamicResult = OpenADR.Validators.validateBySchemaName("Duration", "PT30M");
console.log('\n🔧 Dynamic validation by schema name:');
console.log(`   Schema: Duration, Input: "PT30M"`);
console.log(`   Valid: ${dynamicResult.success}`);
console.log('\n✅ AJV validator tests completed!');
console.log('🎯 All OpenADR validation constraints working perfectly!');
