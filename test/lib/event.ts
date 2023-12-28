
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Event, parseEvent, joiEvent
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import Joi from 'joi';
import YAML from 'js-yaml';


describe('EVENT', function() {
    let data: any;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'event.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    describe('ZOD', function() {

        it('should parse event', function() {
            // console.log(`to parse`, data.events[0]);
            const event: Event = parseEvent.parse(data.events[0]) as Event;
            // console.log(event);
            assert.deepEqual(event, {
                programID: '0',
                eventName: 'First event',
                priority: 99,
                targets: [ { 
                    type: 'GROUP_NAME', values: ["VEN99"]
                } ],
                reportDescriptors: [
                {
                    payloadType: 'USAGE',
                    readingType: 'DIRECT_READ',
                    units: null,
                    targets: [{
                        type: "GROUP_NAME",
                        values: [ "VEN99" ]
                    }],
                    aggregate: false,
                    startInterval: -1,
                    numIntervals: -1,
                    historical: true,
                    frequency: -1,
                    repeat: 1
                }
                ],
                payloadDescriptors: null,
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                intervals: [ {
                    id: 0,
                    payloads: [ {
                        type: "EMPTY",
                        values: []
                    }]
                } ]
            });
        });

        it('should parse event with extra fields and passthrough', function() {
            const event: Event = parseEvent.passthrough().parse(data.events[0]) as Event;
            // console.log(event);
            assert.deepEqual(event, {
                programID: '0',
                eventName: 'First event',
                extraField: 'With unknown value',
                priority: 99,
                targets: [ { 
                    type: 'GROUP_NAME', values: ["VEN99"]
                } ],
                reportDescriptors: [
                {
                    payloadType: 'USAGE',
                    readingType: 'DIRECT_READ',
                    units: null,
                    targets: [{
                        type: "GROUP_NAME",
                        values: [ "VEN99" ]
                    }],
                    aggregate: false,
                    startInterval: -1,
                    numIntervals: -1,
                    historical: true,
                    frequency: -1,
                    repeat: 1
                }
                ],
                payloadDescriptors: null,
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                intervals: [ {
                    id: 0,
                    payloads: [ {
                        type: "EMPTY",
                        values: []
                    }]
                } ]
            } as any);
        });

        it('should fail to parse event with extra fields and strict', function() {
            let didFail = false;
            try {
                const event: Event = parseEvent.strict().parse(data.events[0]) as Event;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                    code: 'unrecognized_keys',
                    keys: [
                        "extraField"
                    ],
                    path: [],
                    message: "Unrecognized key(s) in object: 'extraField'"
                    }
                ])
            }
            assert.isOk(didFail);
        });

        it('should parse event with default values', function() {
            const event: Event = parseEvent.parse(data.eventsDefaults[0]) as Event;
            // console.log(event);
            assert.deepEqual(event, {
                programID: '0',
                eventName: 'Event with defaults',
                priority: null,
                targets: null,
                reportDescriptors: null,
                payloadDescriptors: null,
                intervalPeriod: {
                    start: '2023-02-20T00:00:00Z',
                    duration: 'P3M',
                    randomizeStart: "PT0S"
                },
                intervals: [ {
                    id: 0,
                    payloads: [ {
                        type: "EMPTY",
                        values: []
                    }]
                } ]
            } as any);
        });

        it('should fail to parse event wtih bad values', function() {
            let didFail = false;
            try {
                const event: Event = parseEvent.parse(data.eventsBadValues[0]) as Event;
            } catch (err: any) {
                didFail = true;
                // console.log(err);
                assert.deepEqual(err.issues, [
                    {
                        "code": "invalid_type",
                        "expected": "string",
                        "received": "number",
                        "path": [
                        "programID"
                        ],
                        "message": "Expected string, received number"
                    },
                    {
                        "code": "too_small",
                        "minimum": 0,
                        "type": "number",
                        "inclusive": true,
                        "exact": false,
                        "message": "Number must be greater than or equal to 0",
                        "path": [
                        "priority"
                        ]
                    },
                    {
                        "code": "invalid_type",
                        "expected": "array",
                        "received": "string",
                        "path": [
                        "targets"
                        ],
                        "message": "Expected array, received string"
                    },
                    {
                        "code": "invalid_type",
                        "expected": "array",
                        "received": "string",
                        "path": [
                        "reportDescriptors"
                        ],
                        "message": "Expected array, received string"
                    },
                    {
                        "code": "invalid_type",
                        "expected": "array",
                        "received": "string",
                        "path": [
                        "payloadDescriptors"
                        ],
                        "message": "Expected array, received string"
                    },
                    {
                        "code": "invalid_type",
                        "expected": "array",
                        "received": "string",
                        "path": [
                        "intervals"
                        ],
                        "message": "Expected array, received string"
                    }
                ]);
            }
            assert.isOk(didFail);
        });
    });

    describe('JOI', function() {

        // This test validates that an object
        // with unknown fields is validated, and that
        // the unknown fields are passed through.
        //
        // The stripUnknown option is not working.

        it('should parse event with unknown fields and default values', function() {
            // console.log(`to parse`, data.events[0]);
            // Joi.assert(data.events[0], joiEvent);

            const options = {
                // abortEarly: false,
                allowUnknown: true,
                // stripUnknown: true,
                // stripUnknown: {
                //     arrays: true,
                //     objects: true
                // },
            };
            
            const result = joiEvent
            // .prefs({
            //   allowUnknown: false,
            //   stripUnknown: true,
            // })
                // .unknown()
                .validate(data.events[0], options);
            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error === 'undefined');
            assert.isOk(typeof result.value === 'object');
            // console.log(result.value);
            assert.deepEqual(result.value, {
                programID: '0',
                eventName: 'First event',
                priority: 99,
                // With stripUnknown, this field should
                // have been removed.  But I was unable
                // to figure out why it was not removed.
                extraField: 'With unknown value',
                targets: [ {
                    type: 'GROUP_NAME',
                    values: [ 'VEN99' ]
                } ],
                reportDescriptors: [
                  {
                    payloadType: 'USAGE',
                    readingType: 'DIRECT_READ',
                    reportingRate: 'P15M',
                    targets: [ {
                        type: 'GROUP_NAME',
                        values: [ 'VEN99' ]
                    } ],
                    units: null,
                    aggregate: false,
                    startInterval: -1,
                    numIntervals: -1,
                    historical: true,
                    frequency: -1,
                    repeat: 1
                  }
                ],
                intervalPeriod: {
                  start: '2023-02-20T00:00:00Z',
                  duration: 'P3M',
                  randomizeStart: 'PT0S'
                },
                intervals: [ { id: 0, payloads: [
                    {
                        type: 'EMPTY',
                        values: []
                    }
                ] } ],
                payloadDescriptors: null
            });
            assert.isOk('units' in result.value.reportDescriptors[0]);
            assert.equal(result.value.reportDescriptors[0].units, null);
            assert.isOk('aggregate' in result.value.reportDescriptors[0]);
            assert.equal(result.value.reportDescriptors[0].aggregate, false);
        });

        // it('should parse event with extra fields and passthrough', function() {
        //     Joi.assert(data.events[0], joiEvent, { allowUnknown: true });
        // });

        // it('should fail to parse event with extra fields and strict', function() {
        //     Joi.assert(data.events[0], joiEvent, { stripUnknown: true });
        // });

        // it('should parse event with default values', function() {
        //     Joi.assert(data.eventsDefaults[0], joiEvent);
            // TODO ensure the defaults are correct

            // const event: Event = parseEvent.parse(data.eventsDefaults[0]) as Event;
            // // console.log(event);
            // assert.deepEqual(event, {
            //     programID: '0',
            //     eventName: 'Event with defaults',
            //     priority: null,
            //     targets: null,
            //     reportDescriptors: null,
            //     payloadDescriptors: null,
            //     intervalPeriod: {
            //         start: '2023-02-20T00:00:00Z',
            //         duration: 'P3M',
            //         randomizeStart: "PT0S"
            //     },
            //     intervals: [ {
            //         id: 0,
            //         payloads: [ {
            //             type: "EMPTY",
            //             values: []
            //         }]
            //     } ]
            // } as any);
        // });

        it('should fail to parse event with no intervals', function() {

            const options = {
                // abortEarly: false,
                // allowUnknown: false,
                // stripUnknown: true,
                // stripUnknown: {
                //     arrays: true,
                //     objects: true
                // },
            };
            
            const result = joiEvent
            // .prefs({
            //   allowUnknown: false,
            //   stripUnknown: true,
            // })
                // .unknown()
                .validate(data.eventNoTargets[0], options);
            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined', 'no error');
            assert.equal(result.error.message,
                '"reportDescriptors[0].reportingRate" is not allowed');
        });

        it('should fail to parse event with bad priority', function() {

            const options = {
                // abortEarly: false,
                // allowUnknown: false,
                // stripUnknown: true,
                // stripUnknown: {
                //     arrays: true,
                //     objects: true
                // },
            };
            
            const result = joiEvent
            // .prefs({
            //   allowUnknown: false,
            //   stripUnknown: true,
            // })
                // .unknown()
                .validate(data.eventsBadPriority[0], options);
            if (result.error) {
                // console.log(result.error);
            }
            assert.isOk(typeof result.error !== 'undefined', 'no error');
            assert.equal(result.error.message, '"priority" must be greater than or equal to 0');
        });

        // it('should fail to parse event wtih bad values', function() {
        //     let didFail = false;
        //     try {
        //         const event: Event = parseEvent.parse(data.eventsBadValues[0]) as Event;
        //     } catch (err: any) {
        //         didFail = true;
        //         // console.log(err);
        //         assert.deepEqual(err.issues, [
        //             {
        //                 "code": "invalid_type",
        //                 "expected": "string",
        //                 "received": "number",
        //                 "path": [
        //                 "programID"
        //                 ],
        //                 "message": "Expected string, received number"
        //             },
        //             {
        //                 "code": "too_small",
        //                 "minimum": 0,
        //                 "type": "number",
        //                 "inclusive": true,
        //                 "exact": false,
        //                 "message": "Number must be greater than or equal to 0",
        //                 "path": [
        //                 "priority"
        //                 ]
        //             },
        //             {
        //                 "code": "invalid_type",
        //                 "expected": "array",
        //                 "received": "string",
        //                 "path": [
        //                 "targets"
        //                 ],
        //                 "message": "Expected array, received string"
        //             },
        //             {
        //                 "code": "invalid_type",
        //                 "expected": "array",
        //                 "received": "string",
        //                 "path": [
        //                 "reportDescriptors"
        //                 ],
        //                 "message": "Expected array, received string"
        //             },
        //             {
        //                 "code": "invalid_type",
        //                 "expected": "array",
        //                 "received": "string",
        //                 "path": [
        //                 "payloadDescriptors"
        //                 ],
        //                 "message": "Expected array, received string"
        //             },
        //             {
        //                 "code": "invalid_type",
        //                 "expected": "array",
        //                 "received": "string",
        //                 "path": [
        //                 "intervals"
        //                 ],
        //                 "message": "Expected array, received string"
        //             }
        //         ]);
        //     }
        //     assert.isOk(didFail);
        // });
    });
});
