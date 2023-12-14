
import { assert } from 'chai';
import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { promises as fsp } from 'node:fs';
import {
    EventPayloadDescriptor, parseEventPayloadDescriptor
} from '../../package/dist/index.js';
// from 'openadr-3-ts-types';
import YAML from 'js-yaml';

describe('EVENT PAYLOAD DESCRIPTOR', function() {
    let data;
    before(async function() {

        const file = await fsp.readFile(
            path.join(__dirname, '..', 'data', 'eventPayload.yml'),
            'utf8');
        const doc: any = YAML.load(file);
        data = doc;
    });

    it('should parse eventPayload', function() {
        // console.log(data.intervals[0]);
        const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.parse(data.eventPayloadDescriptors[0]) as EventPayloadDescriptor;
        // console.log(eventPayload);
        assert.deepEqual(eventPayload, {
            objectType: 'EVENT_PAYLOAD_DESCRIPTOR',
            payloadType: 'PRICE',
            units: 'KWH',
            currency: 'USD'
          } as any);
    });

    it('should parse eventPayload w/o objectType', function() {
        // console.log(data.intervals[0]);
        const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.parse(data.eventPayloadDescriptors[1]) as EventPayloadDescriptor;
        // console.log(eventPayload);
        assert.deepEqual(eventPayload, {
            objectType: 'EVENT_PAYLOAD_DESCRIPTOR',
            payloadType: 'PRICE',
            units: 'KWH',
            currency: 'USD'
          } as any);
    });

    it('should parse eventPayload w/o units', function() {
        // console.log(data.intervals[0]);
        const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.parse(data.eventPayloadDescriptors[2]) as EventPayloadDescriptor;
        // console.log(eventPayload);
        assert.deepEqual(eventPayload, {
            objectType: 'EVENT_PAYLOAD_DESCRIPTOR',
            payloadType: 'PRICE',
            units: null,
            currency: 'USD'
          } as any);
    });

    it('should parse eventPayload w/o currency', function() {
        // console.log(data.intervals[0]);
        const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.parse(data.eventPayloadDescriptors[3]) as EventPayloadDescriptor;
        // console.log(eventPayload);
        assert.deepEqual(eventPayload, {
            objectType: 'EVENT_PAYLOAD_DESCRIPTOR',
            payloadType: 'PRICE',
            units: 'KWH',
            currency: null
          } as any);
    });

    it('should parse eventPayload w/o objectType, units, currency', function() {
        // console.log(data.intervals[0]);
        const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.parse(data.eventPayloadDescriptors[4]) as EventPayloadDescriptor;
        // console.log(eventPayload);
        assert.deepEqual(eventPayload, {
            objectType: 'EVENT_PAYLOAD_DESCRIPTOR',
            payloadType: 'PRICE',
            units: null,
            currency: null
          } as any);
    });

    it('should parse eventPayload w/ extra data not seen', function() {
        // console.log(data.intervals[0]);
        const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.parse(data.eventPayloadDescriptors[5]) as EventPayloadDescriptor;
        // console.log(eventPayload);
        assert.deepEqual(eventPayload, {
            objectType: 'EVENT_PAYLOAD_DESCRIPTOR',
            payloadType: 'EXTRA',
            units: 'KWH',
            currency: 'USD'
          } as any);
    });

    it('should parse eventPayload w/ extra data seen w/ passthrough', function() {
        // console.log(data.intervals[0]);
        const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.passthrough().parse(data.eventPayloadDescriptors[5]) as EventPayloadDescriptor;
        // console.log(eventPayload);
        assert.deepEqual(eventPayload, {
            objectType: 'EVENT_PAYLOAD_DESCRIPTOR',
            payloadType: 'EXTRA',
            units: 'KWH',
            currency: 'USD',
            extraData: "Something else"
          } as any);
    });

    it('should fail to parse eventPayload w/ extra data w/ strict', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.strict().parse(data.eventPayloadDescriptors[5]) as EventPayloadDescriptor;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                  code: 'unrecognized_keys',
                  keys: [ 'extraData' ],
                  path: [],
                  message: "Unrecognized key(s) in object: 'extraData'"
                }
            ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse eventPayload w/ short payloadType', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.strict().parse(data.BADeventPayloadDescriptors[0]) as EventPayloadDescriptor;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                  code: 'too_small',
                  minimum: 1,
                  type: 'string',
                  inclusive: true,
                  exact: false,
                  message: 'String must contain at least 1 character(s)',
                  path: [ 'payloadType' ]
                }
              ]);
        }
        assert.isOk(didFail);
    });

    it('should fail to parse eventPayload w/ extra-long payloadType', function() {
        // console.log(data.intervals[0]);
        let didFail = false;
        try {
            const eventPayload: EventPayloadDescriptor = parseEventPayloadDescriptor.strict().parse(data.BADeventPayloadDescriptors[1]) as EventPayloadDescriptor;
        } catch (err) {
            didFail = true;
            // console.log(err.issues);
            assert.deepEqual(err.issues, [
                {
                    code: 'too_big',
                    maximum: 128,
                    type: 'string',
                    inclusive: true,
                    exact: false,
                    message: 'String must contain at most 128 character(s)',
                    path: [ 'payloadType' ]
                }
            ]);
        }
        assert.isOk(didFail);
    });


});
