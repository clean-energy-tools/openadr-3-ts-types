
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    Event, eventSchema
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';


describe('EVENT', function() {
    let data;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'event.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    it('should parse event', function() {
        const event: Event = eventSchema.parse(data.events[0]) as Event;
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
        const event: Event = eventSchema.passthrough().parse(data.events[0]) as Event;
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
            const event: Event = eventSchema.strict().parse(data.events[0]) as Event;
        } catch (err) {
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
        const event: Event = eventSchema.parse(data.eventsDefaults[0]) as Event;
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
            const event: Event = eventSchema.parse(data.eventsBadValues[0]) as Event;
        } catch (err) {
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
